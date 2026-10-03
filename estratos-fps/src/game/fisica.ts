// Física: cajas contra voxels, eje por eje, sin daño por caída. Sirve al jugador y a la momia.
import { JUGADOR, MUNDO } from '../config/balance';
import type { Mundo } from './mundo';
import type { Jugador, Vec3 } from './tipos';

const EPS = 1e-6;

/** ¿La caja con los pies en (x, y, z) toca un voxel sólido o sale de los límites invisibles? */
export function colisionaCaja(mundo: Mundo, x: number, y: number, z: number, hw: number, alto: number): boolean {
  if (x - hw < MUNDO.LIMITE_MIN || x + hw > MUNDO.LIMITE_MAX || z - hw < MUNDO.LIMITE_MIN || z + hw > MUNDO.LIMITE_MAX) return true;
  const x0 = Math.floor(x - hw), x1 = Math.floor(x + hw - EPS);
  const y0 = Math.floor(y), y1 = Math.floor(y + alto - EPS);
  const z0 = Math.floor(z - hw), z1 = Math.floor(z + hw - EPS);
  for (let j = y0; j <= y1; j++)
    for (let k = z0; k <= z1; k++)
      for (let i = x0; i <= x1; i++)
        if (mundo.esSolido(i, j, k)) return true;
  return false;
}

export function colisiona(mundo: Mundo, x: number, y: number, z: number): boolean {
  return colisionaCaja(mundo, x, y, z, JUGADOR.ANCHO / 2, JUGADOR.ALTO);
}

/** Mueve un eje y, si choca, deja la caja pegada a la cara. Devuelve true si chocó. */
export function moverEje(mundo: Mundo, p: Vec3, hw: number, alto: number, eje: 'x' | 'y' | 'z', delta: number): boolean {
  if (delta === 0) return false;
  p[eje] += delta;
  if (!colisionaCaja(mundo, p.x, p.y, p.z, hw, alto)) return false;
  if (eje === 'x') p.x = delta > 0 ? Math.floor(p.x + hw) - hw - 1e-5 : Math.floor(p.x - hw) + 1 + hw + 1e-5;
  else if (eje === 'z') p.z = delta > 0 ? Math.floor(p.z + hw) - hw - 1e-5 : Math.floor(p.z - hw) + 1 + hw + 1e-5;
  else p.y = delta > 0 ? Math.floor(p.y + alto) - alto - 1e-5 : Math.floor(p.y) + 1;
  return true;
}

/** Integra la velocidad de una caja. Devuelve { suelo, choqueX, choqueZ }. */
export function moverCaja(mundo: Mundo, pos: Vec3, vel: Vec3, hw: number, alto: number, dt: number): { suelo: boolean; choqueX: boolean; choqueZ: boolean } {
  const choqueX = moverEje(mundo, pos, hw, alto, 'x', vel.x * dt);
  if (choqueX) vel.x = 0;
  const choqueZ = moverEje(mundo, pos, hw, alto, 'z', vel.z * dt);
  if (choqueZ) vel.z = 0;
  const cayendo = vel.y < 0;
  let suelo = false;
  if (moverEje(mundo, pos, hw, alto, 'y', vel.y * dt)) { suelo = cayendo; vel.y = 0; }
  return { suelo, choqueX, choqueZ };
}

export interface Deseo { dirX: number; dirZ: number; correr: boolean; saltar: boolean }

/** Un paso de física del jugador. `dirX`, `dirZ` ya vienen rotados al mundo (vector de longitud <= 1). */
export function moverJugador(mundo: Mundo, j: Jugador, deseo: Deseo, dt: number): void {
  const vel = deseo.correr ? JUGADOR.CORRE : JUGADOR.CAMINA;
  const objX = deseo.dirX * vel, objZ = deseo.dirZ * vel;
  const acel = (j.enSuelo ? JUGADOR.ACEL_SUELO : JUGADOR.ACEL_AIRE) * dt;
  j.vel.x += Math.max(-acel, Math.min(acel, objX - j.vel.x));
  j.vel.z += Math.max(-acel, Math.min(acel, objZ - j.vel.z));
  if (deseo.saltar && j.enSuelo) { j.vel.y = JUGADOR.SALTO; j.enSuelo = false; }
  j.vel.y = Math.max(-JUGADOR.CAIDA_MAX, j.vel.y - JUGADOR.GRAVEDAD * dt);
  const r = moverCaja(mundo, j.pos, j.vel, JUGADOR.ANCHO / 2, JUGADOR.ALTO, dt);
  j.enSuelo = r.suelo;
}

/** Si el jugador quedó dentro de un bloque (por ejemplo, al aparecer en una salita), lo sube. */
export function desatascar(mundo: Mundo, j: Jugador): void {
  for (let i = 0; i < 64 && colisiona(mundo, j.pos.x, j.pos.y, j.pos.z); i++) j.pos.y += 0.5;
}
