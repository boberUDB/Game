// Picar: raycast desde la cámara, daño por golpe, rotura de bloques, botín y golpes a la momia.
import { FOSIL, MOMIA } from '../config/balance';
import { crearSuelto, valorMineral } from './botin';
import { lanzarRayo, recorrerRayo } from './dda';
import { emit } from './eventos';
import { activarFosil, multiplicadorDanioFosil, tieneFosil } from './fosiles';
import { direccionMirada, ojos } from './jugador';
import { alcancePico, danioPico, golpesPorSeg, probDoble } from './mejoras';
import { golpearMomia } from './momia';
import { profundidadDeBloque } from './mundo';
import { registrarBloque } from './records';
import { BloqueId, esFosil, esIndestructible, mineralDeBloque } from './tipos';
import type { FosilId, Juego, Vec3 } from './tipos';

// Fracciones del ciclo de golpe: preparar, golpe (llega el impacto), impacto, regreso.
const F_PREPARAR = 0.3, F_IMPACTO = 0.5, F_REGRESO = 0.68;

/** Rompe un bloque: lo quita, suma al contador, suelta el mineral o activa el fósil. */
export function romper(juego: Juego, x: number, y: number, z: number): void {
  const m = juego.mundo;
  const b = m.get(x, y, z);
  if (b === BloqueId.aire || esIndestructible(b)) return;
  const prof = profundidadDeBloque(y);
  let fosilId: FosilId | undefined;
  if (esFosil(b)) {
    fosilId = (juego.fosilesMapa.find((f) => f.x === x && f.y === y && f.z === z)
      ?? m.fosiles.find((f) => f.x === x && f.y === y && f.z === z))?.id;
  }
  m.set(x, y, z, BloqueId.aire);
  registrarBloque(juego);
  const mineral = mineralDeBloque(b);
  if (mineral) {
    const valor = valorMineral(mineral, prof);
    crearSuelto(juego, mineral, x + 0.5, y + 0.5, z + 0.5, valor);
    if (Math.random() < probDoble(juego)) crearSuelto(juego, mineral, x + 0.5, y + 0.3, z + 0.5, valor);
  }
  emit('bloque:roto', { x, y, z, bloque: b, fosilId });
  if (fosilId) activarFosil(juego, fosilId, x, y, z);
}

/** Daña un bloque. Devuelve la vida restante (0 = roto, -1 = no se puede picar). */
function danar(juego: Juego, x: number, y: number, z: number, cantidad: number): number {
  const r = juego.mundo.aplicarDanio(x, y, z, cantidad);
  if (r === 0) romper(juego, x, y, z);
  return r;
}

/** Distancia a la que el rayo toca una caja, o Infinity. */
function rayoContraCaja(o: Vec3, d: Vec3, min: Vec3, max: Vec3): number {
  let t0 = 0, t1 = Infinity;
  for (const eje of ['x', 'y', 'z'] as const) {
    if (Math.abs(d[eje]) < 1e-9) { if (o[eje] < min[eje] || o[eje] > max[eje]) return Infinity; continue; }
    let a = (min[eje] - o[eje]) / d[eje], b = (max[eje] - o[eje]) / d[eje];
    if (a > b) [a, b] = [b, a];
    t0 = Math.max(t0, a); t1 = Math.min(t1, b);
    if (t0 > t1) return Infinity;
  }
  return t0;
}

/** Un golpe de pico en la dirección de la mirada. */
function golpe(juego: Juego): void {
  const j = juego.jugador;
  const o = ojos(j);
  const d = direccionMirada(j);
  const alcance = alcancePico(juego);
  const impacto = lanzarRayo(juego.mundo, o, d, alcance);
  const danio = danioPico(juego) * multiplicadorDanioFosil(juego);
  juego.tutorial.pico = true;

  // La momia tiene prioridad si está más cerca que el bloque.
  let momiaUid = -1, tMomia = Infinity;
  for (const mo of juego.momias) {
    const t = rayoContraCaja(o, d, { x: mo.x - MOMIA.HITBOX / 2, y: mo.y, z: mo.z - MOMIA.HITBOX / 2 }, { x: mo.x + MOMIA.HITBOX / 2, y: mo.y + MOMIA.ALTO, z: mo.z + MOMIA.HITBOX / 2 });
    if (t <= alcance && t < tMomia) { tMomia = t; momiaUid = mo.uid; }
  }
  if (momiaUid >= 0 && tMomia < (impacto ? impacto.distancia + 0.5 : Infinity)) {
    golpearMomia(juego, momiaUid, danio);
    return;
  }
  if (!impacto) return;
  const { x, y, z } = impacto;
  const restante = danar(juego, x, y, z, danio);
  if (restante < 0) return;
  emit('bloque:golpeado', { x, y, z, restante });

  // Pico Rompefilas: también daña los 2 bloques que siguen en línea.
  if (tieneFosil(juego, 'rompefilas')) {
    let extra = 0;
    recorrerRayo(o, d, alcance + FOSIL.ROMPEFILAS_EXTRA + 1, (bx, by, bz, _cara, dist) => {
      if (dist <= impacto.distancia + 1e-6) return false;
      if (!juego.mundo.dentro(bx, by, bz)) return true;
      if (!juego.mundo.esSolido(bx, by, bz)) return false;
      danar(juego, bx, by, bz, danio);
      return ++extra >= FOSIL.ROMPEFILAS_EXTRA;
    });
  }
}

export function actualizarPicado(juego: Juego, picar: boolean, dt: number): void {
  const p = juego.picado;
  const j = juego.jugador;
  p.objetivo = lanzarRayo(juego.mundo, ojos(j), direccionMirada(j), alcancePico(juego));
  p.golpesSeg = golpesPorSeg(juego);
  const periodo = 1 / p.golpesSeg;
  p.picando = picar;
  if (!picar && p.reloj <= 0) { p.fase = 0; return; }
  const antes = p.reloj / periodo;
  p.reloj += dt;
  const f = p.reloj / periodo;
  if (antes < F_IMPACTO && f >= F_IMPACTO) golpe(juego);
  if (f >= 1) {
    if (picar) p.reloj -= periodo; else { p.reloj = 0; p.fase = 0; return; }
  }
  const g = p.reloj / periodo;
  p.fase = g < F_PREPARAR ? 1 : g < F_IMPACTO ? 2 : g < F_REGRESO ? 3 : 4;
}

/** Valor de un mineral recién roto, para que otras capas lo muestren. */
export { valorMineral };
