// Las 5 mejoras del pico. Costo = base * 1.15 ^ nivel.
import { CRECIMIENTO_MEJORA, MEJORAS } from '../config';
import { emit } from '../events';
import { estado, guardarEstado } from '../state';
import type { MejoraId } from '../tipos';

export function costoDe(id: MejoraId): number {
  return Math.round(MEJORAS[id].base * Math.pow(CRECIMIENTO_MEJORA, estado.mejoras[id]));
}

export function estaAlMaximo(id: MejoraId): boolean {
  return estado.mejoras[id] >= MEJORAS[id].max;
}

export function puedeComprar(id: MejoraId): boolean {
  return !estaAlMaximo(id) && estado.colones >= costoDe(id);
}

export function comprar(id: MejoraId): boolean {
  if (!puedeComprar(id)) return false;
  estado.colones -= costoDe(id);
  estado.mejoras[id]++;
  emit('mejora:comprada', { id, nivel: estado.mejoras[id] });
  guardarEstado();
  return true;
}
