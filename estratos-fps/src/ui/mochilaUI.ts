// Pantalla de la mochila: arrastrar con el mouse, rotar (R), tirar (Supr) y acomodar solo (Q). También con teclado.
import { MINERALES, MOCHILA } from '../config/balance';
import { on } from '../game/eventos';
import { acomodarSolo, cabe, celdasOcupadas, formaRotada, mover, quitar, rotarPieza } from '../game/mochila';
import { TEXTOS, formatoColones, nombreMineral } from '../game/textos';
import type { Juego, Pieza } from '../game/tipos';
import { sonar } from '../audio/sonido';
import { aviso } from './avisos';

let rejilla: HTMLElement, resumen: HTMLElement, vacia: HTMLElement;
let paso = 68; // tamaño de celda más separación; se lee del CSS
let seleccion = -1;
let obtener: () => Juego;

interface Arrastre { uid: number; el: HTMLElement; x0: number; y0: number; rot: number; cx: number; cy: number; valida: boolean }
let arrastre: Arrastre | null = null;

function construirPieza(p: Pieza, rot: number): HTMLButtonElement {
  const f = formaRotada(p.mineral, rot);
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'pieza';
  el.dataset.mineral = p.mineral;
  el.dataset.uid = String(p.uid);
  el.setAttribute('aria-label', `${nombreMineral(p.mineral)}, vale ${formatoColones(p.valor)}, columna ${p.x + 1}, fila ${p.y + 1}`);
  el.style.setProperty('--px', String(p.x));
  el.style.setProperty('--py', String(p.y));
  el.style.setProperty('--pw', String(f[0].length));
  for (const fila of f) for (const v of fila) {
    const s = document.createElement('span');
    if (v) {
      s.dataset.lleno = '';
      const img = document.createElement('img');
      img.src = `./iconos/mineral_${p.mineral}.png`;
      img.alt = '';
      s.appendChild(img);
    }
    el.appendChild(s);
  }
  return el;
}

export function pintarMochila(): void {
  if (arrastre) return;
  const juego = obtener();
  const foco = document.activeElement instanceof HTMLElement ? document.activeElement.dataset.uid : undefined;
  rejilla.querySelectorAll('.pieza').forEach((e) => e.remove());
  let total = 0;
  for (const p of juego.mochila.piezas) { total += p.valor; rejilla.appendChild(construirPieza(p, p.rot)); }
  if (foco) (rejilla.querySelector(`.pieza[data-uid="${foco}"]`) as HTMLElement | null)?.focus();
  vacia.hidden = juego.mochila.piezas.length > 0;
  resumen.textContent = juego.mochila.piezas.length > 0
    ? `${celdasOcupadas(juego)} de ${MOCHILA.COLUMNAS * MOCHILA.FILAS} espacios. Llevás ${formatoColones(total)}.`
    : `0 de ${MOCHILA.COLUMNAS * MOCHILA.FILAS} espacios.`;
}

function piezaDe(uid: number): Pieza | undefined { return obtener().mochila.piezas.find((p) => p.uid === uid); }

function evaluarArrastre(a: Arrastre, dx: number, dy: number): void {
  const p = piezaDe(a.uid)!;
  a.cx = p.x + Math.round(dx / paso);
  a.cy = p.y + Math.round(dy / paso);
  a.valida = cabe(obtener(), { ...p, x: a.cx, y: a.cy, rot: a.rot as Pieza['rot'] });
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
  const movida = a.valida && mover(obtener(), a.uid, a.cx, a.cy, a.rot);
  if (!movida) { sonar('error'); pintarMochila(); } else sonar('clic');
  (rejilla.querySelector(`.pieza[data-uid="${a.uid}"]`) as HTMLElement | null)?.focus();
}

/** R: rota la pieza agarrada o la seleccionada. */
export function rotar(): void {
  const juego = obtener();
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
  if (rotarPieza(juego, seleccion)) sonar('clic'); else sonar('error');
}

export function tirar(): void {
  const uid = arrastre ? arrastre.uid : seleccion;
  if (uid < 0) return;
  arrastre = null;
  if (quitar(obtener(), uid)) { aviso(TEXTOS.tiraste); seleccion = -1; }
  pintarMochila();
}

export function acomodar(): void {
  const juego = obtener();
  if (juego.mochila.piezas.length === 0) return;
  if (acomodarSolo(juego)) sonar('compra'); else aviso(TEXTOS.sinAcomodo);
}

function alTeclear(e: KeyboardEvent): void {
  if (obtener().pantalla !== 'mochila') return;
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
  if (mover(obtener(), p.uid, p.x + dir[0], p.y + dir[1], p.rot)) sonar('clic'); else sonar('error');
}

export function iniciarMochilaUI(obtenerJuego: () => Juego): void {
  obtener = obtenerJuego;
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
  on('mochila:cambio', pintarMochila);
  on('pantalla:cambio', (e) => { if (e.a === 'mochila') { arrastre = null; pintarMochila(); } });
  pintarMochila();
  void MINERALES;
}
