// Avisos arriba al centro, tarjetas grandes (fósil, estrato) y números flotantes.
const MAX_AVISOS = 3;

function cont(): HTMLElement { return document.getElementById('avisos')!; }

function quitar(el: HTMLElement, ms: number): void {
  setTimeout(() => {
    el.dataset.saliendo = '';
    setTimeout(() => el.remove(), 420);
  }, ms);
}

export type TipoAviso = 'info' | 'alerta' | 'record' | 'malo';

export function aviso(texto: string, tipo: TipoAviso = 'info', ms = 2800): void {
  const c = cont();
  // Un aviso igual no se repite mientras siga en pantalla.
  for (const el of Array.from(c.querySelectorAll('.aviso'))) if (el.textContent === texto) return;
  const el = document.createElement('div');
  el.className = 'aviso';
  el.dataset.tipo = tipo;
  el.textContent = texto;
  c.appendChild(el);
  while (c.querySelectorAll('.aviso').length > MAX_AVISOS) c.querySelector('.aviso')?.remove();
  quitar(el, ms);
}

export function cartel(titulo: string, texto: string, ms = 4200): void {
  const c = cont();
  const el = document.createElement('div');
  el.className = 'cartel';
  el.setAttribute('role', 'status');
  const h = document.createElement('h3');
  h.textContent = titulo;
  const p = document.createElement('p');
  p.textContent = texto;
  el.append(h, p);
  c.appendChild(el);
  quitar(el, ms);
}

export function numeroFlotante(texto: string, opciones: { mineral?: string; venta?: boolean } = {}): void {
  const hud = document.getElementById('hud')!;
  const el = document.createElement('div');
  el.className = 'numero-flotante';
  el.textContent = texto;
  if (opciones.mineral) el.dataset.mineral = opciones.mineral;
  if (opciones.venta) el.dataset.venta = '';
  el.style.marginLeft = `${Math.round((Math.random() - 0.5) * 120)}px`;
  hud.appendChild(el);
  setTimeout(() => el.remove(), 800);
}
