// Ajuste de calidad: bajo, medio y alto. Se aplica sin recargar.
import { emit } from '../events';
import { estado } from '../state';
import type { Calidad } from '../tipos';
import { configurarCalidad } from './escena';

const PERFILES: Record<Calidad, { bloom: boolean; sombras: boolean; pixelRatio: number }> = {
  bajo: { bloom: false, sombras: false, pixelRatio: 1 },
  medio: { bloom: true, sombras: false, pixelRatio: 1.5 },
  alto: { bloom: true, sombras: true, pixelRatio: 2 },
};

export function aplicarCalidad(c: Calidad): void {
  estado.ajustes.calidad = c;
  configurarCalidad(PERFILES[c]);
  emit('calidad:cambio', { calidad: c });
}
