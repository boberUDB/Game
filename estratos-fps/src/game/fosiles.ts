// Fósiles: cada uno cambia cómo se juega durante toda la partida.
import { FOSIL, MINERALES, MUNDO, VALOR_POR_METRO } from '../config/balance';
import { emit } from './eventos';
import { multiplicador } from './colapso';
import { profundidadDeBloque } from './mundo';
import { BloqueId, esIndestructible, mineralDeBloque } from './tipos';
import type { FosilId, Juego } from './tipos';

export function tieneFosil(juego: Juego, id: FosilId): boolean {
  return juego.fosilesActivos.includes(id);
}

/** Activa un fósil hallado en (x, y, z). Don Chepe empieza a picar desde ahí. */
export function activarFosil(juego: Juego, id: FosilId, x: number, y: number, z: number): void {
  if (!tieneFosil(juego, id)) {
    juego.fosilesActivos.push(id);
    if (id === 'don_chepe') juego.chepe = { activo: true, x: x + 0.5, y, z: z + 0.5, reloj: FOSIL.CHEPE_SEG };
  }
  juego.fosilesMapa = juego.fosilesMapa.filter((f) => !(f.x === x && f.y === y && f.z === z));
  emit('fosil:hallado', { id });
}

/** Un turno de Don Chepe: rompe la capa de abajo en su columna y baja. */
function turnoDeChepe(juego: Juego): void {
  const ch = juego.chepe;
  const lado = tieneFosil(juego, 'rompefilas') ? FOSIL.CHEPE_LADO_ROMPEFILAS : FOSIL.CHEPE_LADO;
  const m = juego.mundo;
  const ox = Math.floor(ch.x) - (lado === 3 ? 1 : 0);
  const oz = Math.floor(ch.z) - (lado === 3 ? 1 : 0);
  const yb = Math.floor(ch.y) - 1;
  let total = 0;
  for (let dz = 0; dz < lado; dz++)
    for (let dx = 0; dx < lado; dx++) if (esIndestructible(m.get(ox + dx, yb, oz + dz))) { ch.activo = false; return; }
  for (let dz = 0; dz < lado; dz++)
    for (let dx = 0; dx < lado; dx++) {
      const x = ox + dx, z = oz + dz;
      const b = m.get(x, yb, z);
      if (b === BloqueId.aire) continue;
      const mineral = mineralDeBloque(b);
      m.set(x, yb, z, BloqueId.aire);
      juego.records.bloquesTotal++;
      juego.records.bloquesPartida++;
      if (mineral) {
        const valor = Math.round(MINERALES[mineral].valor * (1 + profundidadDeBloque(yb) * VALOR_POR_METRO));
        total += Math.round(valor * FOSIL.CHEPE_VENDE * multiplicador(juego));
      }
      emit('bloque:roto', { x, y: yb, z, bloque: b });
    }
  ch.y = yb;
  if (total > 0) {
    juego.colones += total;
    emit('chepe:venta', { total });
  }
}

export function actualizarFosiles(juego: Juego, dt: number): void {
  const ch = juego.chepe;
  if (!ch.activo) return;
  ch.reloj -= dt;
  if (ch.reloj <= 0) {
    ch.reloj += FOSIL.CHEPE_SEG;
    if (ch.y - 1 <= 1 || ch.y > MUNDO.ALTO) { ch.activo = false; return; }
    turnoDeChepe(juego);
  }
}

/** Cuántas veces pega el pico por el calor (Brasa antigua). */
export function multiplicadorDanioFosil(juego: Juego): number {
  return tieneFosil(juego, 'brasa') && juego.jugador.calor > FOSIL.BRASA_CALOR ? FOSIL.BRASA_MULT : 1;
}
