// Raycast por voxels (Amanatides y Woo).
import { ALTO, ANCHO, LARGO } from './mundo';
import type { Mundo } from './mundo';
import type { Impacto, Vec3 } from './tipos';

/** Caras: 0 +x, 1 -x, 2 +y, 3 -y, 4 +z, 5 -z. La cara es la normal que mira hacia el origen del rayo. */
export const NORMALES: Vec3[] = [
  { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 },
];

/**
 * Recorre los voxels que atraviesa el rayo hasta `alcance`. La función `visita` recibe cada voxel
 * (incluido el primero) y devuelve true para detener el recorrido.
 */
export function recorrerRayo(
  origen: Vec3, direccion: Vec3, alcance: number,
  visita: (x: number, y: number, z: number, cara: number, distancia: number) => boolean,
): void {
  const len = Math.hypot(direccion.x, direccion.y, direccion.z);
  if (len === 0) return;
  const dx = direccion.x / len, dy = direccion.y / len, dz = direccion.z / len;
  let x = Math.floor(origen.x), y = Math.floor(origen.y), z = Math.floor(origen.z);
  const sx = dx > 0 ? 1 : -1, sy = dy > 0 ? 1 : -1, sz = dz > 0 ? 1 : -1;
  const tdx = dx !== 0 ? Math.abs(1 / dx) : Infinity;
  const tdy = dy !== 0 ? Math.abs(1 / dy) : Infinity;
  const tdz = dz !== 0 ? Math.abs(1 / dz) : Infinity;
  let tx = dx !== 0 ? ((dx > 0 ? x + 1 - origen.x : origen.x - x) * tdx) : Infinity;
  let ty = dy !== 0 ? ((dy > 0 ? y + 1 - origen.y : origen.y - y) * tdy) : Infinity;
  let tz = dz !== 0 ? ((dz > 0 ? z + 1 - origen.z : origen.z - z) * tdz) : Infinity;
  let cara = -1;
  let t = 0;
  for (let paso = 0; paso < 512; paso++) {
    if (visita(x, y, z, cara, t)) return;
    if (tx <= ty && tx <= tz) { x += sx; t = tx; tx += tdx; cara = sx > 0 ? 1 : 0; }
    else if (ty <= tz) { y += sy; t = ty; ty += tdy; cara = sy > 0 ? 3 : 2; }
    else { z += sz; t = tz; tz += tdz; cara = sz > 0 ? 5 : 4; }
    if (t > alcance) return;
  }
}

/** Primer bloque sólido que toca el rayo, o null si no hay ninguno dentro del alcance. */
export function lanzarRayo(mundo: Mundo, origen: Vec3, direccion: Vec3, alcance: number): Impacto | null {
  let res: Impacto | null = null;
  recorrerRayo(origen, direccion, alcance, (x, y, z, cara, distancia) => {
    if (!mundo.dentro(x, y, z)) return !(y >= ALTO && x >= 0 && z >= 0 && x < ANCHO && z < LARGO); // por encima sigue; fuera, se corta
    if (mundo.esSolido(x, y, z)) { res = { x, y, z, cara, distancia }; return true; }
    return false;
  });
  return res;
}

/** ¿Hay línea de vista libre entre dos puntos? (sin bloques sólidos en medio) */
export function lineaDeVista(mundo: Mundo, a: Vec3, b: Vec3): boolean {
  const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
  const d = Math.hypot(dx, dy, dz);
  if (d < 1e-6) return true;
  const ax = Math.floor(b.x), ay = Math.floor(b.y), az = Math.floor(b.z);
  let libre = true;
  recorrerRayo(a, { x: dx, y: dy, z: dz }, d, (x, y, z) => {
    if (x === ax && y === ay && z === az) return true;
    if (mundo.esSolido(x, y, z)) { libre = false; return true; }
    return false;
  });
  return libre;
}
