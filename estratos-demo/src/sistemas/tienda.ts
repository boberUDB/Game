// Venta de minerales: saturación de precios, bonus de mochila llena, mascota y multiplicador.
import { MASCOTA, MINERALES, MOCHILA, TIENDA } from '../config';
import { emit } from '../events';
import { estado, guardarEstado } from '../state';
import type { MineralId } from '../tipos';
import { multiplicador } from './colapso';
import { estaLlena } from './mochila';

let relojSaturacion = 0;

/** Precio base actual de una unidad, con la saturación aplicada. */
export function precioDe(mineral: MineralId): number {
  return Math.round(MINERALES[mineral].valor * (1 - estado.saturacion[mineral]));
}

export interface Desglose {
  base: number; bonusLlena: boolean; bonusMascota: boolean; multiplicador: number; total: number; piezas: number;
}

export function desgloseVenta(): Desglose {
  let base = 0;
  for (const p of estado.mochila.piezas) base += p.valor * (1 - estado.saturacion[p.mineral]);
  const bonusLlena = estaLlena();
  const bonusMascota = estado.mascota.comprada;
  const mult = multiplicador();
  const total = Math.round(
    base * (1 + (bonusLlena ? MOCHILA.BONUS_LLENA : 0)) * (1 + (bonusMascota ? MASCOTA.BONUS_VENTA : 0)) * mult,
  );
  return { base: Math.round(base), bonusLlena, bonusMascota, multiplicador: mult, total, piezas: estado.mochila.piezas.length };
}

export function totalVenta(): number {
  return desgloseVenta().total;
}

export function venderTodo(): number {
  const d = desgloseVenta();
  if (d.piezas === 0) return 0;
  for (const p of estado.mochila.piezas) {
    estado.saturacion[p.mineral] = Math.min(
      TIENDA.SATURACION_MAX, estado.saturacion[p.mineral] + TIENDA.SATURACION_POR_UNIDAD,
    );
  }
  estado.mochila.piezas = [];
  estado.colones += d.total;
  estado.tutorial.vendio = true;
  emit('mochila:cambio', {});
  emit('venta:hecha', { total: d.total, bonusLlena: d.bonusLlena, bonusMascota: d.bonusMascota });
  guardarEstado();
  return d.total;
}

export function actualizarSaturacion(dt: number): void {
  relojSaturacion += dt;
  if (relojSaturacion < TIENDA.RECUPERACION_CADA_SEG) return;
  relojSaturacion -= TIENDA.RECUPERACION_CADA_SEG;
  const s = estado.saturacion;
  for (const m of Object.keys(s) as MineralId[]) s[m] = Math.max(0, s[m] - TIENDA.RECUPERACION);
}

/** ¿El minero está parado frente a la tienda? */
export function cercaDeTienda(): boolean {
  const j = estado.jugador;
  return j.y === 0 && j.x >= TIENDA.COLUMNA_DESDE && j.x <= TIENDA.COLUMNA_HASTA;
}
