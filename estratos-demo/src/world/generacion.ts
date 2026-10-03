// Genera la mina: terreno por profundidad, minerales, estratos de partidas pasadas y fósiles.
import { BLOQUES, COLAPSO, JUGADOR, MINA, MINERALES } from '../config';
import { mulberry32 } from '../rng';
import type { Celda, Estrato, FosilId, GameState, MineralId, TipoBloque } from '../tipos';
import { FOSIL_IDS } from '../tipos';

const ORDEN_MINERAL: MineralId[] = ['jade', 'obsidiana', 'hierro', 'azufre'];

export function vidaDe(tipo: TipoBloque, fila: number): number {
  if (tipo === 'aire' || tipo === 'borde') return 0;
  return BLOQUES[tipo].vida * (1 + fila * BLOQUES.ESCALA_VIDA_POR_FILA);
}

function celda(tipo: TipoBloque, fila: number): Celda {
  const vida = vidaDe(tipo, fila);
  return { tipo, vida, vidaMax: vida };
}

/** Cuántos estratos entran en la mina. */
export function cantidadEstratos(estratos: Estrato[]): number {
  return Math.min(estratos.length, MINA.MAX_ESTRATOS);
}

/** Estrato que ocupa una fila, o null. El más reciente queda arriba. */
export function estratoEnFila(fila: number, estratos: Estrato[]): Estrato | null {
  const n = cantidadEstratos(estratos);
  const rel = fila - MINA.FILA_INICIO_ESTRATOS;
  if (n === 0 || rel < 0 || rel >= n * MINA.FILAS_POR_ESTRATO) return null;
  const i = Math.floor(rel / MINA.FILAS_POR_ESTRATO);
  return estratos[estratos.length - 1 - i];
}

function terrenoPara(efectiva: number, r: number): TipoBloque {
  if (efectiva < 10) return r < 0.15 ? 'roca' : 'tierra';
  if (efectiva < 30) return r < 0.2 ? 'tierra' : r < 0.3 ? 'basalto' : 'roca';
  return r < 0.3 ? 'roca' : 'basalto';
}

export function generarMina(semilla: number, estratos: Estrato[]): GameState['mina'] {
  const rnd = mulberry32(semilla);
  const n = cantidadEstratos(estratos);
  const ancho = MINA.ANCHO;
  const filasEstrato = n * MINA.FILAS_POR_ESTRATO;
  const alto = MINA.ALTO_BASE + filasEstrato;
  const celdas: Celda[] = new Array(ancho * alto);
  const candidatasFosil: number[] = [];

  for (let y = 0; y < alto; y++) {
    const est = estratoEnFila(y, estratos);
    const efectiva = y < MINA.FILA_INICIO_ESTRATOS ? y : y - filasEstrato;
    for (let x = 0; x < ancho; x++) {
      const i = y * ancho + x;
      const r = rnd();
      const rm = rnd();
      if (y === 0) { celdas[i] = celda('aire', y); continue; }
      if (x === 0 || x === ancho - 1 || y === alto - 1) { celdas[i] = celda('borde', y); continue; }
      if (est) {
        const c = celda('estrato', y);
        c.estratoId = est.id;
        celdas[i] = c;
        candidatasFosil.push(i);
        continue;
      }
      let tipo: TipoBloque = terrenoPara(efectiva, r);
      // Se evalúa del más raro al más común.
      let acumulada = 0;
      for (const m of ORDEN_MINERAL) {
        const def = MINERALES[m];
        if (efectiva < def.desdeFila) continue;
        acumulada += def.prob;
        if (rm < acumulada) { tipo = m; break; }
      }
      celdas[i] = celda(tipo, y);
    }
  }

  // Bajo el punto de aparición siempre hay tierra fácil.
  celdas[1 * ancho + JUGADOR.INICIO_X] = celda('tierra', 1);

  if (n > 0) {
    const ids: FosilId[] = [...FOSIL_IDS];
    for (let i = ids.length - 1; i > 0; i--) {
      const k = Math.floor(rnd() * (i + 1));
      [ids[i], ids[k]] = [ids[k], ids[i]];
    }
    const total = Math.min(COLAPSO.FOSILES_POR_PARTIDA, ids.length, candidatasFosil.length);
    for (let f = 0; f < total; f++) {
      const k = Math.floor(rnd() * candidatasFosil.length);
      const idx = candidatasFosil.splice(k, 1)[0];
      const y = Math.floor(idx / ancho);
      const c = celda('fosil', y);
      c.estratoId = celdas[idx].estratoId;
      c.fosilId = ids[f];
      celdas[idx] = c;
    }
  }

  return { ancho, alto, celdas };
}
