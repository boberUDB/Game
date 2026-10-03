// Ascensor junto a la boca, salitas de parada y la segunda tienda a los 30 m.
import { ASCENSOR, LUGARES, MUNDO, TIENDA } from '../config/balance';
import { emit } from './eventos';
import { excavarSalita } from './generacion';
import { teletransportar } from './jugador';
import { profundidadActual } from './records';
import type { Juego } from './tipos';

export type Objetivo =
  | { tipo: 'tienda'; tienda: 'tere' | 'abajo'; texto: string }
  | { tipo: 'ascensor'; destino: number; texto: string }
  | null;

/** Paradas ya alcanzadas, de la más cercana a la más honda. */
export function paradasDisponibles(juego: Juego): number[] {
  return [...juego.paradas].sort((a, b) => a - b);
}

export function posicionVendedor(): { x: number; z: number } {
  return { x: ASCENSOR.SALITA_X + LUGARES.VENDEDOR.dx, z: ASCENSOR.SALITA_Z + LUGARES.VENDEDOR.dz };
}

/** ¿Está en la salita de una parada? Devuelve la profundidad de la parada o null. */
export function paradaActual(juego: Juego): number | null {
  const { x, z } = juego.jugador.pos;
  const lado = ASCENSOR.SALITA_LADO;
  if (x < ASCENSOR.SALITA_X - ASCENSOR.MARGEN || x > ASCENSOR.SALITA_X + lado + ASCENSOR.MARGEN || z < ASCENSOR.SALITA_Z - ASCENSOR.MARGEN || z > ASCENSOR.SALITA_Z + lado + ASCENSOR.MARGEN) return null;
  const prof = profundidadActual(juego);
  const d = Math.round(prof / ASCENSOR.CADA) * ASCENSOR.CADA;
  if (d < ASCENSOR.CADA || Math.abs(prof - d) > ASCENSOR.TOLERANCIA_Y) return null;
  return juego.paradas.includes(d) ? d : null;
}

function cerca(juego: Juego, x: number, z: number, radio: number): boolean {
  return Math.hypot(juego.jugador.pos.x - x, juego.jugador.pos.z - z) <= radio;
}

/** Qué hace E en este momento (para el aviso del HUD y para la acción). */
export function objetivoInteraccion(juego: Juego): Objetivo {
  const j = juego.jugador;
  const prof = profundidadActual(juego);
  if (prof < MUNDO.SUPERFICIE_ASCENSOR) {
    const t = LUGARES.TIENDA;
    if (cerca(juego, t.mostrador.x, t.mostrador.z, t.RADIO)) return { tipo: 'tienda', tienda: 'tere', texto: `E: tienda de la ${TIENDA.NOMBRE_TERE}` };
    if (cerca(juego, LUGARES.ASCENSOR.x, LUGARES.ASCENSOR.z, LUGARES.ASCENSOR.RADIO)) {
      const p = paradasDisponibles(juego);
      if (p.length === 0) return null;
      return { tipo: 'ascensor', destino: p[p.length - 1], texto: `E: bajar en el ascensor a ${p[p.length - 1]} m` };
    }
    return null;
  }
  const d = paradaActual(juego);
  if (d === null) return null;
  const v = posicionVendedor();
  if (d === TIENDA.ABAJO_PROFUNDIDAD && Math.hypot(j.pos.x - v.x, j.pos.z - v.z) <= LUGARES.VENDEDOR.RADIO) {
    return { tipo: 'tienda', tienda: 'abajo', texto: `E: vender a ${TIENDA.NOMBRE_ABAJO} (paga x${TIENDA.ABAJO_MULT})` };
  }
  const menores = paradasDisponibles(juego).filter((p) => p < d);
  const destino = menores.length ? menores[menores.length - 1] : 0;
  return { tipo: 'ascensor', destino, texto: destino === 0 ? 'E: subir a la superficie' : `E: subir a ${destino} m` };
}

/** Lleva al jugador a una parada (0 es la superficie). */
export function viajar(juego: Juego, parada: number): boolean {
  if (parada !== 0 && !juego.paradas.includes(parada)) return false;
  if (parada === 0) {
    teletransportar(juego, LUGARES.ASCENSOR.x, MUNDO.SUELO_Y, LUGARES.ASCENSOR.z + 2);
  } else {
    const s = excavarSalita(juego.mundo, parada);
    teletransportar(juego, s.x - 1, s.y, s.z - 1);
  }
  juego.jugador.silbando = false;
  juego.silbido.reloj = 0;
  juego.momias = [];
  emit('ascensor:viaje', { parada });
  return true;
}
