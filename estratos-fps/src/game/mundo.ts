// Mundo voxel: bloques en un Uint8Array, daño parcial y lista de cambios para el guardado.
// Índice de voxel = x + z * ANCHO + y * ANCHO * LARGO.
import { MUNDO, VIDA } from '../config/balance';
import { BloqueId, esEstrato, esFosil, mineralDeBloque } from './tipos';

export const ANCHO = MUNDO.ANCHO;
export const LARGO = MUNDO.LARGO;
export const ALTO = MUNDO.ALTO;
export const SUELO_Y = MUNDO.SUELO_Y;
export const CHUNKS_X = Math.ceil(ANCHO / MUNDO.CHUNK);
export const CHUNKS_Y = Math.ceil(ALTO / MUNDO.CHUNK);
export const CHUNKS_Z = Math.ceil(LARGO / MUNDO.CHUNK);

export function indiceVoxel(x: number, y: number, z: number): number {
  return x + z * ANCHO + y * ANCHO * LARGO;
}

/** Profundidad (en bloques) de la capa de un bloque: la capa justo bajo el suelo vale 0. */
export function profundidadDeBloque(y: number): number {
  return SUELO_Y - 1 - y;
}

/** Vida base de un tipo de bloque, sin escala por profundidad. 0 si no se puede picar. */
export function vidaBase(b: number): number {
  if (b === BloqueId.tierra) return VIDA.tierra;
  if (b === BloqueId.piedra) return VIDA.piedra;
  if (b === BloqueId.obsidiana) return VIDA.obsidiana;
  if (esEstrato(b)) return VIDA.estrato;
  if (esFosil(b)) return VIDA.fosil;
  if (mineralDeBloque(b)) return VIDA.piedra * VIDA.MINERAL_MULT;
  return 0;
}

export class Mundo {
  readonly bloques = new Uint8Array(ANCHO * LARGO * ALTO);
  original = new Uint8Array(ANCHO * LARGO * ALTO);
  /** Daño acumulado por voxel (índice -> daño). */
  readonly danio = new Map<number, number>();
  /** Diferencias contra la generación: índice -> bloque actual. */
  readonly cambios = new Map<number, number>();
  /** Chunks que hay que volver a mallar. */
  readonly sucios = new Set<number>();
  fosiles: { id: import('./tipos').FosilId; x: number; y: number; z: number }[] = [];
  profundidadMina = MUNDO.SUELO_Y;
  /** Sube con cada cambio; el render lo usa para saber si hay que mirar `sucios`. */
  version = 0;

  dentro(x: number, y: number, z: number): boolean {
    return x >= 0 && y >= 0 && z >= 0 && x < ANCHO && y < ALTO && z < LARGO;
  }

  /** Bloque en (x, y, z). Fuera del mundo cuenta como roca madre, y por encima como aire. */
  get(x: number, y: number, z: number): number {
    if (y >= ALTO) return BloqueId.aire;
    if (x < 0 || y < 0 || z < 0 || x >= ANCHO || z >= LARGO) return BloqueId.roca_madre;
    return this.bloques[x + z * ANCHO + y * ANCHO * LARGO];
  }

  esSolido(x: number, y: number, z: number): boolean {
    return this.get(x, y, z) !== BloqueId.aire;
  }

  /** Cambia un bloque, lo anota para el guardado y marca los chunks afectados. */
  set(x: number, y: number, z: number, id: number): void {
    if (!this.dentro(x, y, z)) return;
    const i = indiceVoxel(x, y, z);
    if (this.bloques[i] === id) return;
    this.bloques[i] = id;
    this.danio.delete(i);
    if (this.original[i] === id) this.cambios.delete(i); else this.cambios.set(i, id);
    this.marcarSucio(x, y, z);
    this.version++;
  }

  /** Escritura de generación: no cuenta como cambio. */
  poner(x: number, y: number, z: number, id: number): void {
    this.bloques[indiceVoxel(x, y, z)] = id;
  }

  confirmarBase(): void {
    this.original = this.bloques.slice();
    this.cambios.clear();
    this.danio.clear();
  }

  marcarSucio(x: number, y: number, z: number): void {
    const C = MUNDO.CHUNK;
    const cx = Math.floor(x / C), cy = Math.floor(y / C), cz = Math.floor(z / C);
    this.sucios.add(claveChunk(cx, cy, cz));
    const lx = x - cx * C, ly = y - cy * C, lz = z - cz * C;
    if (lx === 0 && cx > 0) this.sucios.add(claveChunk(cx - 1, cy, cz));
    if (lx === C - 1 && cx < CHUNKS_X - 1) this.sucios.add(claveChunk(cx + 1, cy, cz));
    if (ly === 0 && cy > 0) this.sucios.add(claveChunk(cx, cy - 1, cz));
    if (ly === C - 1 && cy < CHUNKS_Y - 1) this.sucios.add(claveChunk(cx, cy + 1, cz));
    if (lz === 0 && cz > 0) this.sucios.add(claveChunk(cx, cy, cz - 1));
    if (lz === C - 1 && cz < CHUNKS_Z - 1) this.sucios.add(claveChunk(cx, cy, cz + 1));
  }

  marcarTodoSucio(): void {
    for (let cx = 0; cx < CHUNKS_X; cx++)
      for (let cy = 0; cy < CHUNKS_Y; cy++)
        for (let cz = 0; cz < CHUNKS_Z; cz++) this.sucios.add(claveChunk(cx, cy, cz));
    this.version++;
  }

  vidaMax(x: number, y: number, z: number): number {
    const base = vidaBase(this.get(x, y, z));
    if (base <= 0) return 0;
    return base * (1 + Math.max(0, profundidadDeBloque(y)) * VIDA.POR_METRO);
  }

  vidaRestante(x: number, y: number, z: number): number {
    const max = this.vidaMax(x, y, z);
    if (max <= 0) return 0;
    return Math.max(0, max - (this.danio.get(indiceVoxel(x, y, z)) ?? 0));
  }

  /** Aplica daño. Devuelve la vida que queda (0 significa que hay que romperlo) o -1 si no se puede picar. */
  aplicarDanio(x: number, y: number, z: number, cantidad: number): number {
    const max = this.vidaMax(x, y, z);
    if (max <= 0) return -1;
    const i = indiceVoxel(x, y, z);
    const total = (this.danio.get(i) ?? 0) + cantidad;
    if (total >= max - 1e-9) return 0;
    this.danio.set(i, total);
    return max - total;
  }

  /** ¿Está dentro de la mina excavable (planta) ? */
  contarSolidos(): number {
    let n = 0;
    for (let i = 0; i < this.bloques.length; i++) if (this.bloques[i] !== 0) n++;
    return n;
  }
}

export function claveChunk(cx: number, cy: number, cz: number): number {
  return cx + cz * CHUNKS_X + cy * CHUNKS_X * CHUNKS_Z;
}
export function chunkDeClave(k: number): { cx: number; cy: number; cz: number } {
  const cx = k % CHUNKS_X;
  const cz = Math.floor(k / CHUNKS_X) % CHUNKS_Z;
  const cy = Math.floor(k / (CHUNKS_X * CHUNKS_Z));
  return { cx, cy, cz };
}

/** Profundidad de un punto: SUELO_Y menos su altura. */
export function profundidadDePunto(y: number): number {
  return SUELO_Y - y;
}

