// Movimiento del minero por celdas, sin gravedad.
import { JUGADOR } from '../config';
import { estado } from '../state';
import { esPicable, esTransitable } from '../world/mina';
import { empujar } from './picado';
import { registrarProfundidad } from './records';

/** Mueve una celda. Si el destino es sólido, lo pica en vez de moverse. */
export function intentarMover(dx: number, dy: number): void {
  const j = estado.jugador;
  if (j.desmayado || j.t < 1) return;
  j.mirando = dx < 0 ? 'izq' : dx > 0 ? 'der' : dy < 0 ? 'arriba' : 'abajo';
  const nx = j.x + dx, ny = j.y + dy;
  if (esTransitable(nx, ny)) {
    j.desdeX = j.x; j.desdeY = j.y;
    j.x = nx; j.y = ny;
    j.t = 0;
    estado.tutorial.movio = true;
  } else if (esPicable(nx, ny)) {
    empujar(nx, ny);
  }
}

export function actualizarJugador(dt: number): void {
  const j = estado.jugador;
  if (j.t >= 1) return;
  j.t += dt * JUGADOR.CELDAS_POR_SEG;
  if (j.t >= 1) {
    j.t = 1;
    j.desdeX = j.x; j.desdeY = j.y;
    registrarProfundidad(j.y);
  }
}
