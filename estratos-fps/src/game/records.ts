// Contadores permanentes, récords y paradas del ascensor.
import { ASCENSOR, MUNDO } from '../config/balance';
import { emit } from './eventos';
import type { Juego } from './tipos';

export function registrarBloque(juego: Juego): void {
  const r = juego.records;
  r.bloquesTotal++;
  r.bloquesPartida++;
  if (r.bloquesPartida > r.mejorPartida) {
    // Un solo aviso por partida, y solo si ya había un récord que superar.
    if (r.mejorPartida > 0 && r.bloquesPartida === r.mejorPartida + 1) emit('record:nuevo', { tipo: 'bloques', valor: r.bloquesPartida });
    r.mejorPartida = r.bloquesPartida;
  }
}

/** Profundidad (m) en la que está un punto. */
export function profundidadActual(juego: Juego): number {
  return Math.max(0, MUNDO.SUELO_Y - juego.jugador.pos.y);
}

export function registrarProfundidad(juego: Juego): void {
  const r = juego.records;
  const p = Math.floor(profundidadActual(juego));
  if (p > r.profundidadPartida) r.profundidadPartida = p;
  if (p > r.profundidadMax) {
    const antes = r.profundidadMax;
    r.profundidadMax = p;
    // Se avisa cada 10 m nuevos para no cansar.
    if (antes > 0 && Math.floor(p / 10) > Math.floor(antes / 10)) emit('record:nuevo', { tipo: 'profundidad', valor: p });
  }
  for (let d = ASCENSOR.CADA; d <= r.profundidadPartida; d += ASCENSOR.CADA) {
    if (!juego.paradas.includes(d)) juego.paradas.push(d);
  }
}
