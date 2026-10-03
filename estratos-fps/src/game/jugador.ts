// Creación y utilidades del jugador.
import { JUGADOR, LUGARES, MUNDO } from '../config/balance';
import { desatascar } from './fisica';
import type { Juego, Jugador, Vec3 } from './tipos';

export function crearJugador(): Jugador {
  const s = LUGARES.SPAWN;
  return {
    pos: { x: s.x, y: MUNDO.SUELO_Y, z: s.z }, vel: { x: 0, y: 0, z: 0 },
    guinada: s.guinada, cabeceo: 0, enSuelo: false, calor: 0, desmayado: false, silbando: false,
  };
}

/** Posición de los ojos. */
export function ojos(j: Jugador): Vec3 {
  return { x: j.pos.x, y: j.pos.y + JUGADOR.OJOS, z: j.pos.z };
}

/** Dirección hacia donde mira: guinada 0 mira hacia -z, cabeceo positivo mira arriba. */
export function direccionMirada(j: Jugador): Vec3 {
  const c = Math.cos(j.cabeceo);
  return { x: -Math.sin(j.guinada) * c, y: Math.sin(j.cabeceo), z: -Math.cos(j.guinada) * c };
}

export function teletransportar(juego: Juego, x: number, y: number, z: number): void {
  const j = juego.jugador;
  j.pos.x = x; j.pos.y = y; j.pos.z = z;
  j.vel.x = j.vel.y = j.vel.z = 0;
  desatascar(juego.mundo, j);
}

/** Vuelve a la plaza, mirando hacia la tienda. */
export function aparecerEnSuperficie(juego: Juego): void {
  const s = LUGARES.SPAWN;
  teletransportar(juego, s.x, MUNDO.SUELO_Y, s.z);
  juego.jugador.guinada = s.guinada;
  juego.jugador.cabeceo = 0;
}
