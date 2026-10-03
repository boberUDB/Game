// Panel de la mochila: arrastrar, rotar, tirar y acomodar solo. También se maneja con teclado.
import { MINERALES, MOCHILA } from '../config';
import { on } from '../events';
import { acomodarSolo, cabe, celdasOcupadas, formaRotada, mover, quitar, rotarPieza } from '../sistemas/mochila';
import { sonar } from '../audio/sonido';
import { estado } from '../state';
import type { Pieza } from '../tipos';
import { colones, toast } from './toasts';

let rejilla: HTMLElement, resumen: HTMLElement, vacia: HTMLElement;
let paso = 68; // tamaño de celda más separación, se lee del CSS
let seleccion = -1; // uid de la última pieza tocada o enfocada

interface Arrastre { uid: number; el: HTMLElement; x0: number; y0: number; rot: number; cx: number; cy: number; valida: boolean }
let arrastre: Arrastre | null = null;

function construirPieza(p: Pieza, rot: number): HTMLButtonElement {
  const f = formaRotada(p.mineral, rot);
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'pieza';
  el.dataset.mineral = p.mineral;
  el.dataset.uid = String(p.uid);
  el.setAttribute('aria-label', `${MINERALES[p.mineral].nombre}, vale ${colones(p.valor)}, columna ${p.x + 1}, fila ${p.y + 1}`);
  el.style.setProperty('--px', String(p.x));
  el.style.setProperty('--py', String(p.y));
  el.style.setProperty('--pw', String(f[0].length));
  for (const fila of f) for (const v of fila) {
    const s = document.createElement('span');
    if (v) s.dataset.lleno = '';
    el.appendChild(s);
  }
  return el;
}

function pintar(): void {
  if (arrastre) return;
  const foco = document.activeElement instanceof HTMLElement ? document.activeElement.dataset.uid : undefined;
  rejilla.querySelectorAll('.pieza').forEach((e) => e.remove());
  const piezas = estado.mochila.piezas;
  let total = 0;
  for (const p of piezas) {
    total += p.valor;
    rejilla.appendChild(construirPieza(p, p.rot));
  }
  if (foco) (rejilla.querySelector(`.pieza[data-uid="${foco}"]`) as HTMLElement | null)?.focus();
  vacia.hidden = piezas.length > 0;
  resumen.textContent = piezas.length > 0
    ? `${celdasOcupadas()} de ${MOCHILA.COLUMNAS * MOCHILA.FILAS} espacios. Llevás ${colones(total)}.`
    : `0 de ${MOCHILA.COLUMNAS * MOCHILA.FILAS} espacios.`;
}

function piezaDe(uid: number): Pieza | undefined {
  return estado.mochila.piezas.find((p) => p.uid === uid);
}

function evaluarArrastre(a: Arrastre, dx: number, dy: number): void {
  const p = piezaDe(a.uid)!;
  a.cx = p.x + Math.round(dx / paso);
  a.cy = p.y + Math.round(dy / paso);
  a.valida = cabe({ ...p, x: a.cx, y: a.cy, rot: a.rot as Pieza['rot'] });
  a.el.dataset.arrastre = a.valida ? 'valida' : 'invalida';
}

function alBajar(e: PointerEvent): void {
  const el = (e.target as HTMLElement).closest('.pieza') as HTMLElement | null;
  if (!el || e.button !== 0) return;
  const uid = Number(el.dataset.uid);
  const p = piezaDe(uid);
  if (!p) return;
  seleccion = uid;
  arrastre = { uid, el, x0: e.clientX, y0: e.clientY, rot: p.rot, cx: p.x, cy: p.y, valida: true };
  el.dataset.arrastre = 'valida';
  rejilla.setPointerCapture(e.pointerId);
}

function alMover(e: PointerEvent): void {
  if (!arrastre) return;
  const dx = e.clientX - arrastre.x0, dy = e.clientY - arrastre.y0;
  arrastre.el.style.transform = `translate(${dx}px, ${dy - 4}px)`;
  evaluarArrastre(arrastre, dx, dy);
}

function alSoltar(e: PointerEvent): void {
  if (!arrastre) return;
  const a = arrastre;
  arrastre = null;
  if (rejilla.hasPointerCapture(e.pointerId)) rejilla.releasePointerCapture(e.pointerId);
  const movida = a.valida && mover(a.uid, a.cx, a.cy, a.rot);
  if (!movida) { sonar('error'); pintar(); } else sonar('clic');
  (rejilla.querySelector(`.pieza[data-uid="${a.uid}"]`) as HTMLElement | null)?.focus();
}

/** R: rota la pieza agarrada o la seleccionada. */
function rotar(): void {
  if (arrastre) {
    const a = arrastre;
    const p = piezaDe(a.uid)!;
    a.rot = (a.rot + 1) % 4;
    const nuevo = construirPieza(p, a.rot);
    nuevo.style.transform = a.el.style.transform;
    a.el.replaceWith(nuevo);
    a.el = nuevo;
    evaluarArrastre(a, 0, 0);
    return;
  }
  if (seleccion < 0) return;
  if (rotarPieza(seleccion)) sonar('clic'); else sonar('error');
}

function tirar(): void {
  const uid = arrastre ? arrastre.uid : seleccion;
  if (uid < 0) return;
  arrastre = null;
  if (quitar(uid)) { toast('Tiraste una pieza.'); seleccion = -1; }
  pintar();
}

function alTeclear(e: KeyboardEvent): void {
  if (estado.pantalla !== 'mochila') return;
  if (e.code === 'KeyR') { rotar(); return; }
  if (e.code === 'Delete' || e.code === 'Backspace') { e.preventDefault(); tirar(); return; }
  const el = document.activeElement as HTMLElement | null;
  if (!el?.classList.contains('pieza')) return;
  const p = piezaDe(Number(el.dataset.uid));
  if (!p) return;
  const d: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const dir = d[e.code];
  if (!dir) return;
  e.preventDefault();
  if (mover(p.uid, p.x + dir[0], p.y + dir[1], p.rot)) sonar('clic'); else sonar('error');
}

export function acomodar(): void {
  if (estado.mochila.piezas.length === 0) return;
  if (acomodarSolo()) sonar('compra');
  else toast('No encontré un acomodo mejor.');
}

export function iniciarMochilaUI(): void {
  rejilla = document.getElementById('rejilla-mochila')!;
  resumen = document.getElementById('mochila-resumen')!;
  vacia = document.getElementById('mochila-vacia')!;
  for (let i = 0; i < MOCHILA.COLUMNAS * MOCHILA.FILAS; i++) {
    const c = document.createElement('div');
    c.className = 'celda';
    rejilla.appendChild(c);
  }
  const cs = getComputedStyle(document.documentElement);
  const celda = parseFloat(cs.getPropertyValue('--celda'));
  const gap = parseFloat(cs.getPropertyValue('--sp-1'));
  if (!Number.isNaN(celda) && !Number.isNaN(gap)) paso = celda + gap;

  rejilla.addEventListener('pointerdown', alBajar);
  rejilla.addEventListener('pointermove', alMover);
  rejilla.addEventListener('pointerup', alSoltar);
  rejilla.addEventListener('pointercancel', alSoltar);
  rejilla.addEventListener('focusin', (e) => {
    const uid = (e.target as HTMLElement).dataset.uid;
    if (uid) seleccion = Number(uid);
  });
  window.addEventListener('keydown', alTeclear);
  document.getElementById('btn-acomodar')!.addEventListener('click', acomodar);
  on('mochila:cambio', pintar);
  on('pantalla:cambio', (e) => { if (e.a === 'mochila') { arrastre = null; pintar(); } });
  pintar();
}
