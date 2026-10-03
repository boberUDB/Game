// Mochila en cuadrícula: encaje de piezas con forma, rotación y acomodo automático.
import { MINERALES, MOCHILA } from '../config';
import { emit } from '../events';
import { estado, nuevoUid } from '../state';
import type { MineralId, Pieza } from '../tipos';

const COLS = MOCHILA.COLUMNAS;
const FILAS = MOCHILA.FILAS;
type Rot = 0 | 1 | 2 | 3;

function rotar90(m: number[][]): number[][] {
  const h = m.length, w = m[0].length;
  const r: number[][] = [];
  for (let x = 0; x < w; x++) {
    const fila: number[] = [];
    for (let y = h - 1; y >= 0; y--) fila.push(m[y][x]);
    r.push(fila);
  }
  return r;
}

const cacheFormas = new Map<string, number[][]>();
/** Forma del mineral ya rotada (rot * 90 grados). */
export function formaRotada(mineral: MineralId, rot: number): number[][] {
  const clave = mineral + rot;
  let f = cacheFormas.get(clave);
  if (!f) {
    f = MINERALES[mineral].forma;
    for (let i = 0; i < rot; i++) f = rotar90(f);
    cacheFormas.set(clave, f);
  }
  return f;
}

function area(mineral: MineralId): number {
  let n = 0;
  for (const fila of MINERALES[mineral].forma) for (const v of fila) n += v;
  return n;
}

/** Mapa de ocupación: 0 libre, uid de la pieza si está ocupada. */
function ocupacion(ignorarUid = -1): Int32Array {
  const o = new Int32Array(COLS * FILAS);
  for (const p of estado.mochila.piezas) {
    if (p.uid === ignorarUid) continue;
    marcar(o, p.mineral, p.x, p.y, p.rot, p.uid);
  }
  return o;
}

function marcar(o: Int32Array, mineral: MineralId, x: number, y: number, rot: number, valor: number): void {
  const f = formaRotada(mineral, rot);
  for (let fy = 0; fy < f.length; fy++)
    for (let fx = 0; fx < f[fy].length; fx++)
      if (f[fy][fx]) o[(y + fy) * COLS + x + fx] = valor;
}

function cabeEn(o: Int32Array, mineral: MineralId, x: number, y: number, rot: number): boolean {
  const f = formaRotada(mineral, rot);
  if (x < 0 || y < 0 || y + f.length > FILAS || x + f[0].length > COLS) return false;
  for (let fy = 0; fy < f.length; fy++)
    for (let fx = 0; fx < f[fy].length; fx++)
      if (f[fy][fx] && o[(y + fy) * COLS + x + fx] !== 0) return false;
  return true;
}

/** ¿La pieza cabe donde dice, sin contar su propia posición anterior? */
export function cabe(p: Pieza): boolean {
  return cabeEn(ocupacion(p.uid), p.mineral, p.x, p.y, p.rot);
}

/** Mete un mineral en el primer hueco donde encaje, probando las 4 rotaciones. */
export function agregarAuto(mineral: MineralId, valor: number): boolean {
  const o = ocupacion();
  for (let y = 0; y < FILAS; y++)
    for (let x = 0; x < COLS; x++)
      for (let rot = 0; rot < 4; rot++)
        if (cabeEn(o, mineral, x, y, rot)) {
          estado.mochila.piezas.push({ uid: nuevoUid(), mineral, x, y, rot: rot as Rot, valor });
          emit('mochila:cambio', {});
          return true;
        }
  return false;
}

export function mover(uid: number, x: number, y: number, rot: number): boolean {
  const p = estado.mochila.piezas.find((q) => q.uid === uid);
  if (!p) return false;
  const r = (((rot % 4) + 4) % 4) as Rot;
  if (!cabeEn(ocupacion(uid), p.mineral, x, y, r)) return false;
  p.x = x; p.y = y; p.rot = r;
  emit('mochila:cambio', {});
  return true;
}

/** Rota la pieza; si no cabe en su sitio busca el hueco más cercano. */
export function rotarPieza(uid: number): boolean {
  const p = estado.mochila.piezas.find((q) => q.uid === uid);
  if (!p) return false;
  const rot = (p.rot + 1) % 4;
  const o = ocupacion(uid);
  let mejor: { x: number; y: number } | null = null;
  let mejorDist = Infinity;
  for (let y = 0; y < FILAS; y++)
    for (let x = 0; x < COLS; x++) {
      if (!cabeEn(o, p.mineral, x, y, rot)) continue;
      const d = Math.abs(x - p.x) + Math.abs(y - p.y);
      if (d < mejorDist) { mejorDist = d; mejor = { x, y }; }
    }
  if (!mejor) return false;
  return mover(uid, mejor.x, mejor.y, rot);
}

export function quitar(uid: number): boolean {
  const piezas = estado.mochila.piezas;
  const i = piezas.findIndex((q) => q.uid === uid);
  if (i < 0) return false;
  piezas.splice(i, 1);
  emit('mochila:cambio', {});
  return true;
}

/** Recoloca todo de mayor a menor con backtracking. Si no encuentra solución deja todo como estaba. */
export function acomodarSolo(): boolean {
  const piezas = [...estado.mochila.piezas].sort((a, b) => area(b.mineral) - area(a.mineral));
  if (piezas.length === 0) return false;
  const o = new Int32Array(COLS * FILAS);
  const res: { x: number; y: number; rot: Rot }[] = [];
  let intentos = 0;

  const colocar = (i: number): boolean => {
    if (i === piezas.length) return true;
    const m = piezas[i].mineral;
    for (let y = 0; y < FILAS; y++)
      for (let x = 0; x < COLS; x++)
        for (let rot = 0; rot < 4; rot++) {
          if (++intentos > MOCHILA.INTENTOS_ACOMODO) return false;
          if (!cabeEn(o, m, x, y, rot)) continue;
          marcar(o, m, x, y, rot, 1);
          res[i] = { x, y, rot: rot as Rot };
          if (colocar(i + 1)) return true;
          marcar(o, m, x, y, rot, 0);
        }
    return false;
  };

  if (!colocar(0)) return false;
  piezas.forEach((p, i) => { p.x = res[i].x; p.y = res[i].y; p.rot = res[i].rot; });
  emit('mochila:cambio', {});
  return true;
}

export function celdasOcupadas(): number {
  let n = 0;
  for (const p of estado.mochila.piezas) n += area(p.mineral);
  return n;
}

export function estaLlena(): boolean {
  return celdasOcupadas() === COLS * FILAS;
}

/** Mapa de qué mineral ocupa cada celda, para la mini mochila del HUD. */
export function mapaMinerales(): (MineralId | null)[] {
  const res: (MineralId | null)[] = new Array(COLS * FILAS).fill(null);
  for (const p of estado.mochila.piezas) {
    const f = formaRotada(p.mineral, p.rot);
    for (let fy = 0; fy < f.length; fy++)
      for (let fx = 0; fx < f[fy].length; fx++)
        if (f[fy][fx]) res[(p.y + fy) * COLS + p.x + fx] = p.mineral;
  }
  return res;
}
