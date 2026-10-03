// Venta de minerales: saturación por tienda, bonus de mochila llena, Torogoz y multiplicador de colapso.
import { MASCOTA, MOCHILA, TIENDA } from '../config/balance';
import { emit } from './eventos';
import { multiplicador } from './colapso';
import { estaLlena } from './mochila';
import type { Juego, MineralId, Pieza, TiendaId } from './tipos';
import { MINERAL_IDS } from './tipos';

export function saturacionEnCero(): Record<MineralId, number> {
  return { azufre: 0, oro: 0, esmeralda: 0, rubi: 0, zafiro: 0 };
}

export function multiplicadorTienda(tiendaId: TiendaId): number {
  return tiendaId === 'abajo' ? TIENDA.ABAJO_MULT : 1;
}

/** Lo que paga la tienda por una pieza, con saturación y precio de la tienda (sin bonus de venta). */
export function precioDe(juego: Juego, tiendaId: TiendaId, pieza: Pieza): number {
  return pieza.valor * (1 - juego.saturacion[tiendaId][pieza.mineral]) * multiplicadorTienda(tiendaId);
}

export interface Desglose {
  piezas: number;
  base: number;            // suma del valor de las piezas
  perdidaSaturacion: number; // lo que se pierde por saturación
  tiendaMult: number;
  bonusLlena: boolean;
  bonusMascota: boolean;
  multiplicador: number;   // del colapso
  total: number;
}

export function desgloseVenta(juego: Juego, tiendaId: TiendaId): Desglose {
  let base = 0, sat = 0;
  for (const p of juego.mochila.piezas) {
    base += p.valor;
    sat += p.valor * juego.saturacion[tiendaId][p.mineral];
  }
  const tiendaMult = multiplicadorTienda(tiendaId);
  const bonusLlena = estaLlena(juego);
  const bonusMascota = juego.mascota.comprada;
  const mult = multiplicador(juego);
  const total = Math.round(
    (base - sat) * tiendaMult * (1 + (bonusLlena ? MOCHILA.BONUS_LLENA : 0))
    * (1 + (bonusMascota ? MASCOTA.BONUS_VENTA : 0)) * mult,
  );
  return {
    piezas: juego.mochila.piezas.length, base: Math.round(base), perdidaSaturacion: Math.round(sat),
    tiendaMult, bonusLlena, bonusMascota, multiplicador: mult, total,
  };
}

/** Vende toda la mochila. Devuelve lo cobrado (0 si no había nada). */
export function venderTodo(juego: Juego, tiendaId: TiendaId): number {
  const d = desgloseVenta(juego, tiendaId);
  if (d.piezas === 0) return 0;
  const sat = juego.saturacion[tiendaId];
  for (const p of juego.mochila.piezas) sat[p.mineral] = Math.min(TIENDA.SATURACION_MAX, sat[p.mineral] + TIENDA.SATURACION_POR_UNIDAD);
  juego.mochila.piezas = [];
  juego.colones += d.total;
  juego.tutorial.vendio = true;
  emit('mochila:cambio', {});
  emit('venta:hecha', { total: d.total, tiendaId, bonusLlena: d.bonusLlena, bonusMascota: d.bonusMascota });
  return d.total;
}

/** La saturación se recupera 0.02 cada 10 s, por tienda. */
export function actualizarSaturacion(juego: Juego, dt: number): void {
  juego.relojSaturacion += dt;
  if (juego.relojSaturacion < TIENDA.RECUPERACION_CADA_SEG) return;
  juego.relojSaturacion -= TIENDA.RECUPERACION_CADA_SEG;
  for (const t of Object.keys(juego.saturacion) as TiendaId[])
    for (const m of MINERAL_IDS) juego.saturacion[t][m] = Math.max(0, juego.saturacion[t][m] - TIENDA.RECUPERACION);
}
