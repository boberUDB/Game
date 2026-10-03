// Datos que comparten los módulos de render sin importarse entre sí.
import * as THREE from 'three';

/** Posición suavizada del minero en el mundo 3D. */
export const posMinero = new THREE.Vector3();

export const vista = {
  sacudida: 0,        // fuerza actual de la sacudida de cámara
  pausaImpacto: 0,    // segundos que la simulación queda congelada
  tiempoLento: 0,     // segundos de cámara lenta
  cine: false,        // la cinemática del colapso controla la cámara
  cineZoom: 0,
  cineY: 0,
};

const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
export function movimientoReducido(): boolean { return mq.matches; }

/** Canvas pequeño para dibujar pixel art. */
export function lienzo(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

export function aTextura(c: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Color hex a CSS, con factor de brillo. */
export function css(hex: number, f = 1): string {
  const r = Math.min(255, Math.round(((hex >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((hex >> 8) & 255) * f));
  const b = Math.min(255, Math.round((hex & 255) * f));
  return `rgb(${r},${g},${b})`;
}
