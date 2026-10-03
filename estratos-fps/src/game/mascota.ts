// El Torogoz: una mascota con buff de venta (se aplica en tienda.ts). Sobrevive al colapso.
import { MASCOTA } from '../config/balance';
import { emit } from './eventos';
import type { Juego } from './tipos';

export function comprarMascota(juego: Juego): boolean {
  if (juego.mascota.comprada || juego.colones < MASCOTA.costo) return false;
  juego.colones -= MASCOTA.costo;
  juego.mascota.comprada = true;
  emit('mascota:comprada', {});
  return true;
}
