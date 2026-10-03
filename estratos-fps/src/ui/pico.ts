// El pico en mano: elemento del DOM con 5 cuadros, a escala entera de píxel, cerca de la mitad del alto.
import { SENSACION } from '../config/balance';
import type { Juego } from '../game/tipos';

let el: HTMLElement;
let lagX = 0;
let lagY = 0;
let reducir = false;

export function iniciarPico(): void {
  el = document.getElementById('pico')!;
  reducir = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  escalar();
  window.addEventListener('resize', escalar);
}

/** Escala entera: 96 px por cuadro, lo más cerca posible de la mitad del alto de la ventana. */
export function escalar(): void {
  const escala = Math.max(1, Math.round((window.innerHeight * 0.5) / 96));
  el.style.setProperty('--pico-escala', String(escala));
}

let cuadroActual = -1;

export function actualizarPico(juego: Juego, t: number, mirarDX: number, mirarDY: number, dt: number): void {
  const fase = juego.picado.fase;
  if (fase !== cuadroActual) { cuadroActual = fase; el.dataset.cuadro = String(fase); }
  if (reducir) { el.style.transform = ''; return; }
  const j = juego.jugador;
  const vel = Math.hypot(j.vel.x, j.vel.z);
  const camina = j.enSuelo ? Math.min(1, vel / 4.3) : 0;
  const bobX = Math.sin(t * SENSACION.BALANCEO_PICO_FREC * 0.5) * SENSACION.BALANCEO_PICO_PX * camina;
  const bobY = Math.abs(Math.sin(t * SENSACION.BALANCEO_PICO_FREC * 0.5)) * SENSACION.BALANCEO_PICO_PX * camina;
  // Retraso al mirar: el pico se queda un poco atrás y vuelve.
  lagX += (-mirarDX * 1.2 - lagX) * Math.min(1, dt / Math.max(0.001, SENSACION.RETRASO_PICO));
  lagY += (-mirarDY * 1.2 - lagY) * Math.min(1, dt / Math.max(0.001, SENSACION.RETRASO_PICO));
  const m = SENSACION.RETRASO_PICO_MAX_PX;
  const cx = Math.max(-m, Math.min(m, lagX)), cy = Math.max(-m, Math.min(m, lagY));
  const golpe = fase === 3 ? SENSACION.GOLPE_PICO_RETROCESO_PX : 0;
  el.style.transform = `translate(${(bobX + cx).toFixed(1)}px, ${(bobY + cy * 0.5 + golpe).toFixed(1)}px)`;
}
