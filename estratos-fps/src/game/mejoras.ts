// Las 5 mejoras del pico. Costo = base * 1.15 ^ nivel.
import { CRECIMIENTO_MEJORA, MEJORAS, PICO } from '../config/balance';
import { emit } from './eventos';
import type { Juego, MejoraId } from './tipos';

export function mejorasEnCero(): Record<MejoraId, number> {
  return { filo: 0, mango: 0, alcance: 0, suerte: 0, temple: 0 };
}

export function costoDe(juego: Juego, id: MejoraId): number {
  return Math.round(MEJORAS[id].base * Math.pow(CRECIMIENTO_MEJORA, juego.mejoras[id]));
}

export function estaAlMaximo(juego: Juego, id: MejoraId): boolean {
  return juego.mejoras[id] >= MEJORAS[id].max;
}

export function puedeComprar(juego: Juego, id: MejoraId): boolean {
  return !estaAlMaximo(juego, id) && juego.colones >= costoDe(juego, id);
}

/** Compra un nivel. El guardado lo dispara quien llama (main escucha 'mejora:comprada'). */
export function comprar(juego: Juego, id: MejoraId): boolean {
  if (!puedeComprar(juego, id)) return false;
  juego.colones -= costoDe(juego, id);
  juego.mejoras[id]++;
  emit('mejora:comprada', { id, nivel: juego.mejoras[id] });
  return true;
}

// Valores efectivos del pico según las mejoras.
export function danioPico(juego: Juego): number { return PICO.DANIO_BASE * (1 + MEJORAS.filo.porNivel * juego.mejoras.filo); }
export function golpesPorSeg(juego: Juego): number { return PICO.GOLPES_POR_SEG * (1 + MEJORAS.mango.porNivel * juego.mejoras.mango); }
export function alcancePico(juego: Juego): number { return PICO.ALCANCE_BASE + MEJORAS.alcance.porNivel * juego.mejoras.alcance; }
export function probDoble(juego: Juego): number { return MEJORAS.suerte.porNivel * juego.mejoras.suerte; }
export function factorCalor(juego: Juego): number { return Math.max(0, 1 - MEJORAS.temple.porNivel * juego.mejoras.temple); }

/** Texto de lo que da un nivel, para la tienda: efecto actual o siguiente. */
export function efectoEnNivel(id: MejoraId, nivel: number): string {
  const v = MEJORAS[id].porNivel * nivel;
  const pct = Math.round(v * 100);
  switch (id) {
    case 'filo': return `+${pct} % de daño`;
    case 'mango': return `+${pct} % de golpes por segundo`;
    case 'alcance': return `+${v.toLocaleString('es-SV')} m de alcance`;
    case 'suerte': return `${pct} % de botín doble`;
    case 'temple': return `-${pct} % de calor`;
  }
}
