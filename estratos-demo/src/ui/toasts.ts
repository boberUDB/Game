// Avisos cortos (toasts) y el cartel grande de hallazgos.
const DURACION_TOAST = 2600;
const DURACION_CARTEL = 2800;
const MAX_TOASTS = 3;

let caja: HTMLElement;
let cartelEl: HTMLElement;
let relojCartel = 0;

export function iniciarToasts(): void {
  caja = document.getElementById('toasts')!;
  cartelEl = document.getElementById('cartel')!;
}

export function toast(texto: string, tipo: 'info' | 'alerta' | 'bien' = 'info'): void {
  while (caja.children.length >= MAX_TOASTS) caja.firstElementChild!.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.dataset.tipo = tipo;
  el.textContent = texto;
  caja.appendChild(el);
  window.setTimeout(() => { el.dataset.sale = ''; }, DURACION_TOAST);
  window.setTimeout(() => el.remove(), DURACION_TOAST + 300);
}

export function cartel(titulo: string, detalle: string): void {
  cartelEl.replaceChildren();
  const t = document.createElement('strong');
  t.textContent = titulo;
  const d = document.createElement('span');
  d.textContent = detalle;
  cartelEl.append(t, d);
  cartelEl.hidden = true;
  void cartelEl.offsetWidth; // reinicia la animación de entrada
  cartelEl.hidden = false;
  window.clearTimeout(relojCartel);
  relojCartel = window.setTimeout(() => { cartelEl.hidden = true; }, DURACION_CARTEL);
}

export function colones(n: number): string {
  return '₡' + Math.round(n).toLocaleString('es-SV');
}
