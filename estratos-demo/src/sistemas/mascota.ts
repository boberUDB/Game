// El Torogoz: una mascota con buff de venta. Su bonus se aplica en tienda.ts.
import { MASCOTA } from '../config';
import { emit } from '../events';
import { estado, guardarEstado } from '../state';

/** Posición lógica de la mascota: sigue al minero con retraso. El render la suaviza. */
export const posMascota = { x: 0, y: 0 };

export function comprarMascota(): boolean {
  if (estado.mascota.comprada || estado.colones < MASCOTA.costo) return false;
  estado.colones -= MASCOTA.costo;
  estado.mascota.comprada = true;
  posMascota.x = estado.jugador.x;
  posMascota.y = estado.jugador.y;
  emit('mascota:comprada', {});
  guardarEstado();
  return true;
}

export function actualizarMascota(dt: number): void {
  if (!estado.mascota.comprada) return;
  const j = estado.jugador;
  const k = 1 - Math.exp(-4 * dt);
  posMascota.x += (j.x - posMascota.x) * k;
  posMascota.y += (j.y - posMascota.y) * k;
}
