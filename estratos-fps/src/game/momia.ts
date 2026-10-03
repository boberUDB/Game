// La momia: deambula en las cuevas, persigue con línea de vista y no pica.
import { JUGADOR, MINA, MOMIA, MUNDO, VALOR_POR_METRO } from '../config/balance';
import { crearSuelto, valorMineral } from './botin';
import { lineaDeVista } from './dda';
import { emit } from './eventos';
import { moverCaja } from './fisica';
import { ojos } from './jugador';
import { profundidadActual } from './records';
import { sumarCalor } from './calor';
import type { Juego, Momia } from './tipos';

const HW = MOMIA.ANCHO / 2;

function centro(m: Momia) { return { x: m.x, y: m.y + MOMIA.ALTO * 0.6, z: m.z }; }

/** Elige un sitio libre en cueva: aire con suelo, a más de 10 m y fuera de la vista del jugador. */
function buscarSitio(juego: Juego): { x: number; y: number; z: number } | null {
  const m = juego.mundo;
  const j = juego.jugador;
  const e = ojos(j);
  for (let i = 0; i < 60; i++) {
    const x = MINA.X0 + 1 + Math.floor(Math.random() * (MINA.LADO - 2));
    const z = MINA.Z0 + 1 + Math.floor(Math.random() * (MINA.LADO - 2));
    const prof = MOMIA.DESDE + Math.random() * Math.max(1, m.profundidadMina - 4 - MOMIA.DESDE);
    const y = MUNDO.SUELO_Y - Math.floor(prof);
    if (m.get(x, y, z) !== 0 || m.get(x, y + 1, z) !== 0 || m.get(x, y - 1, z) === 0) continue;
    const p = { x: x + 0.5, y: y + 0.01, z: z + 0.5 };
    if (Math.hypot(p.x - j.pos.x, p.y - j.pos.y, p.z - j.pos.z) < MOMIA.DIST_APARICION) continue;
    if (lineaDeVista(m, e, { x: p.x, y: p.y + 1, z: p.z })) continue;
    return p;
  }
  return null;
}

export function crearMomia(juego: Juego, x: number, y: number, z: number): Momia {
  const mo: Momia = {
    uid: juego.uid++, x, y, z, vx: 0, vz: 0, vy: 0, vida: MOMIA.VIDA_GOLPES, reloj: MOMIA.ESPERA,
    rumbo: Math.random() * Math.PI * 2, cambioRumbo: MOMIA.GIRO_CAMBIO, dano: 0, persigue: false,
  };
  juego.momias.push(mo);
  return mo;
}

export function actualizarMomias(juego: Juego, dt: number): void {
  const j = juego.jugador;
  const prof = profundidadActual(juego);
  juego.relojMomias -= dt;
  if (prof >= MOMIA.DESDE && juego.momias.length < MOMIA.MAX && juego.relojMomias <= 0) {
    juego.relojMomias = MOMIA.SEG_ENTRE_APARICIONES;
    const s = buscarSitio(juego);
    if (s) crearMomia(juego, s.x, s.y, s.z);
  }
  const e = ojos(j);
  for (let i = juego.momias.length - 1; i >= 0; i--) {
    const mo = juego.momias[i];
    const dx = j.pos.x - mo.x, dz = j.pos.z - mo.z;
    const distH = Math.hypot(dx, dz);
    if (distH > 60 || (prof < MOMIA.DESDE - 8 && distH > 25)) { juego.momias.splice(i, 1); continue; }
    mo.reloj = Math.max(0, mo.reloj - dt);
    mo.dano = Math.max(0, mo.dano - dt);

    const ve = distH < MOMIA.VE && Math.abs(j.pos.y - mo.y) < 6 && lineaDeVista(juego.mundo, centro(mo), { x: e.x, y: e.y, z: e.z });
    mo.persigue = ve;
    let objX = 0, objZ = 0;
    if (ve && distH > MOMIA.DIST_MIN_PERSEGUIR) {
      objX = (dx / distH) * MOMIA.VELOCIDAD; objZ = (dz / distH) * MOMIA.VELOCIDAD;
    } else {
      mo.cambioRumbo -= dt;
      if (mo.cambioRumbo <= 0) { mo.cambioRumbo = MOMIA.GIRO_CAMBIO * (0.6 + Math.random()); mo.rumbo = Math.random() * Math.PI * 2; }
      objX = Math.cos(mo.rumbo) * MOMIA.VELOCIDAD_PASEO; objZ = Math.sin(mo.rumbo) * MOMIA.VELOCIDAD_PASEO;
    }
    // El retroceso por golpe decae solo.
    mo.vx += (objX - mo.vx) * Math.min(1, 8 * dt);
    mo.vz += (objZ - mo.vz) * Math.min(1, 8 * dt);
    mo.vy = Math.max(-JUGADOR.CAIDA_MAX, mo.vy - JUGADOR.GRAVEDAD * dt);
    const pos = { x: mo.x, y: mo.y, z: mo.z };
    const vel = { x: mo.vx, y: mo.vy, z: mo.vz };
    const r = moverCaja(juego.mundo, pos, vel, HW, MOMIA.ALTO, dt);
    if ((r.choqueX || r.choqueZ) && r.suelo) vel.y = 7; // salta un bloque
    if (!ve && (r.choqueX || r.choqueZ)) mo.rumbo += Math.PI * (0.5 + Math.random());
    mo.x = pos.x; mo.y = pos.y; mo.z = pos.z; mo.vx = vel.x; mo.vy = vel.y; mo.vz = vel.z;

    // Golpe al jugador.
    if (distH < MOMIA.REACH && Math.abs(j.pos.y - mo.y) < MOMIA.REACH_Y && mo.reloj <= 0 && !j.desmayado) {
      mo.reloj = MOMIA.ESPERA;
      sumarCalor(juego, MOMIA.CALOR_GOLPE);
      const k = distH > 0.01 ? 1 / distH : 0;
      j.vel.x += dx * k * MOMIA.EMPUJE; j.vel.z += dz * k * MOMIA.EMPUJE; j.vel.y = Math.max(j.vel.y, 3);
      j.enSuelo = false;
      if (j.silbando) { j.silbando = false; juego.silbido.reloj = 0; emit('silbido:cancelado', {}); }
      emit('jugador:golpeado', {});
    }
  }
}

/** El pico le pega a una momia. Devuelve true si murió. */
export function golpearMomia(juego: Juego, uid: number, danio: number): boolean {
  const i = juego.momias.findIndex((m) => m.uid === uid);
  if (i < 0) return false;
  const mo = juego.momias[i];
  const j = juego.jugador;
  mo.vida -= danio;
  mo.dano = MOMIA.SEG_DANO;
  const dx = mo.x - j.pos.x, dz = mo.z - j.pos.z;
  const d = Math.hypot(dx, dz) || 1;
  mo.vx = (dx / d) * MOMIA.RETROCESO; mo.vz = (dz / d) * MOMIA.RETROCESO;
  emit('momia:golpe', { uid });
  if (mo.vida > 0) return false;
  const profMomia = Math.max(0, MUNDO.SUELO_Y - mo.y);
  const colones = Math.round(MOMIA.COLONES * (1 + profMomia * VALOR_POR_METRO));
  juego.colones += colones;
  juego.momias.splice(i, 1);
  if (Math.random() < MOMIA.PROB_ZAFIRO) crearSuelto(juego, 'zafiro', mo.x, mo.y + 0.5, mo.z, valorMineral('zafiro', profMomia));
  emit('momia:muerta', { uid, colones });
  return true;
}
