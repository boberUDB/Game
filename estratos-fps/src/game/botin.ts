// Minerales sueltos: aparecen al romper una veta, se recogen solos a 1.5 m y el Imán los atrae.
import { FOSIL, JUGADOR, MINERALES, SIM, VALOR_POR_METRO } from '../config/balance';
import { emit } from './eventos';
import { tieneFosil } from './fosiles';
import { agregarAuto } from './mochila';
import type { Juego, MineralId } from './tipos';

export function valorMineral(mineral: MineralId, profundidad: number): number {
  return Math.round(MINERALES[mineral].valor * (1 + Math.max(0, profundidad) * VALOR_POR_METRO));
}

export function crearSuelto(juego: Juego, mineral: MineralId, x: number, y: number, z: number, valor: number): number {
  const uid = juego.uid++;
  juego.sueltos.push({ uid, mineral, x, y, z, valor });
  emit('suelto:creado', { uid });
  return uid;
}

export function actualizarSueltos(juego: Juego, dt: number): void {
  const j = juego.jugador;
  const iman = tieneFosil(juego, 'iman');
  const cx = j.pos.x, cy = j.pos.y + JUGADOR.PECHO, cz = j.pos.z;
  for (let i = juego.sueltos.length - 1; i >= 0; i--) {
    const s = juego.sueltos[i];
    let dx = cx - s.x, dy = cy - s.y, dz = cz - s.z;
    let d = Math.hypot(dx, dy, dz);
    if (iman && d < FOSIL.IMAN_RADIO && d > 0.01) {
      const paso = Math.min(d, FOSIL.IMAN_VELOCIDAD * dt);
      s.x += (dx / d) * paso; s.y += (dy / d) * paso; s.z += (dz / d) * paso;
      dx = cx - s.x; dy = cy - s.y; dz = cz - s.z;
      d = Math.hypot(dx, dy, dz);
    }
    if (d > JUGADOR.RADIO_RECOGER) continue;
    if (agregarAuto(juego, s.mineral, s.valor)) {
      juego.sueltos.splice(i, 1);
      emit('mineral:recogido', { mineral: s.mineral, valor: s.valor });
    } else if (juego.tiempo - juego.picado.ultimoAvisoLlena >= SIM.SEG_ENTRE_AVISOS_LLENA) {
      juego.picado.ultimoAvisoLlena = juego.tiempo;
      emit('mochila:llena', {});
    }
  }
}
