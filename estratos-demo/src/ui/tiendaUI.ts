// Panel de la tienda: venta con desglose, mejoras del pico, mascota y colapso.
import { MASCOTA, MEJORAS, MINERALES, MOCHILA } from '../config';
import { on } from '../events';
import { sonar } from '../audio/sonido';
import { filaRequerida, multiplicador, puedeColapsar } from '../sistemas/colapso';
import { comprarMascota } from '../sistemas/mascota';
import { comprar, costoDe, estaAlMaximo, puedeComprar } from '../sistemas/mejoras';
import { desgloseVenta, venderTodo } from '../sistemas/tienda';
import { estado } from '../state';
import { MEJORA_IDS, MINERAL_IDS } from '../tipos';
import type { MejoraId } from '../tipos';
import { COLAPSO } from '../config';
import { colones, toast } from './toasts';

const $ = (id: string) => document.getElementById(id)!;
let elColones: HTMLElement, elLista: HTMLElement, elVacia: HTMLElement, elDesglose: HTMLElement;
let btnVender: HTMLButtonElement, btnMascota: HTMLButtonElement, btnColapsar: HTMLButtonElement, elColapso: HTMLElement;
const botonesMejora = {} as Record<MejoraId, HTMLButtonElement>;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, clase: string, texto = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (clase) e.className = clase;
  if (texto) e.textContent = texto;
  return e;
}

/** Rellena un botón de mejora: nombre con nivel, efecto y costo. */
function llenarMejora(b: HTMLButtonElement, nombre: string, nivel: string, efecto: string, costo: string, nota: string, estadoBtn: 'disponible' | 'cara' | 'maxima'): void {
  const n = el('span', 'mejora-nombre', nombre);
  if (nivel) n.appendChild(el('small', '', nivel));
  const c = el('span', 'mejora-costo', costo);
  if (nota) c.appendChild(el('small', '', nota));
  b.replaceChildren(n, el('span', 'mejora-efecto', efecto), c);
  b.dataset.estado = estadoBtn;
  b.setAttribute('aria-disabled', String(estadoBtn !== 'disponible'));
}

function pintarVenta(): void {
  const d = desgloseVenta();
  elLista.replaceChildren();
  for (const m of MINERAL_IDS) {
    const piezas = estado.mochila.piezas.filter((p) => p.mineral === m);
    if (piezas.length === 0) continue;
    const sat = estado.saturacion[m];
    const suma = piezas.reduce((s, p) => s + p.valor * (1 - sat), 0);
    const li = el('li', '');
    li.dataset.mineral = m;
    const nombre = el('span', '', `${MINERALES[m].nombre} x${piezas.length}`);
    nombre.appendChild(el('small', '', sat > 0 ? `Precio bajo por saturación: -${Math.round(sat * 100)} %` : 'Precio completo'));
    li.append(nombre, el('b', '', colones(suma)));
    elLista.appendChild(li);
  }
  elVacia.hidden = d.piezas > 0;
  elDesglose.hidden = d.piezas === 0;
  btnVender.disabled = d.piezas === 0;

  const fila = (nombre: string, valor: string, activo: boolean, clase = '') => {
    const dt = el('dt', clase, nombre), dd = el('dd', clase, valor);
    if (activo) { dt.dataset.activo = ''; dd.dataset.activo = ''; }
    elDesglose.append(dt, dd);
  };
  elDesglose.replaceChildren();
  fila('Minerales', colones(d.base), false);
  fila('Mochila sin huecos', d.bonusLlena ? `+${MOCHILA.BONUS_LLENA * 100} %` : 'no aplica', d.bonusLlena);
  if (estado.mascota.comprada) fila(MASCOTA.nombre, `+${MASCOTA.BONUS_VENTA * 100} %`, true);
  if (d.multiplicador > 1) fila('Multiplicador de colapso', 'x' + d.multiplicador.toLocaleString('es-SV'), true);
  fila('Te pago', colones(d.total), false, 'total');
}

function pintarMejoras(): void {
  for (const id of MEJORA_IDS) {
    const def = MEJORAS[id];
    const nivel = estado.mejoras[id];
    const costo = costoDe(id);
    if (estaAlMaximo(id)) llenarMejora(botonesMejora[id], def.nombre, `nivel ${nivel}`, def.efecto, 'Al máximo', '', 'maxima');
    else if (puedeComprar(id)) llenarMejora(botonesMejora[id], def.nombre, `nivel ${nivel}`, def.efecto, colones(costo), '', 'disponible');
    else llenarMejora(botonesMejora[id], def.nombre, `nivel ${nivel}`, def.efecto, colones(costo), `faltan ${colones(costo - estado.colones)}`, 'cara');
  }
  const efecto = `Te sigue y sube ${MASCOTA.BONUS_VENTA * 100} % cada venta. Sobrevive al colapso.`;
  if (estado.mascota.comprada) llenarMejora(btnMascota, MASCOTA.nombre, '', efecto, 'Ya te acompaña', '', 'maxima');
  else if (estado.colones >= MASCOTA.costo) llenarMejora(btnMascota, MASCOTA.nombre, '', efecto, colones(MASCOTA.costo), '', 'disponible');
  else llenarMejora(btnMascota, MASCOTA.nombre, '', efecto, colones(MASCOTA.costo), `faltan ${colones(MASCOTA.costo - estado.colones)}`, 'cara');
}

function pintarColapso(): void {
  const puede = puedeColapsar();
  btnColapsar.disabled = !puede;
  const sig = (multiplicador() + COLAPSO.MULT_POR_COLAPSO).toLocaleString('es-SV');
  elColapso.textContent = puede
    ? `Derrumbás todo y volvés con multiplicador x${sig}. Tu mina de hoy queda enterrada como estrato.`
    : `Llegá a ${filaRequerida()} m para colapsar. Tu marca en esta partida: ${estado.records.profundidadPartida} m.`;
}

export function pintarTienda(): void {
  elColones.textContent = colones(estado.colones);
  pintarVenta();
  pintarMejoras();
  pintarColapso();
}

function marcarComprada(b: HTMLElement): void {
  delete b.dataset.comprada;
  void b.offsetWidth;
  b.dataset.comprada = '';
}

export function iniciarTiendaUI(alColapsar: () => void): void {
  elColones = $('tienda-colones'); elLista = $('lista-venta'); elVacia = $('venta-vacia'); elDesglose = $('venta-desglose');
  btnVender = $('btn-vender') as HTMLButtonElement; btnMascota = $('btn-mascota') as HTMLButtonElement;
  btnColapsar = $('btn-colapsar') as HTMLButtonElement; elColapso = $('colapso-texto');

  const lista = $('lista-mejoras');
  MEJORA_IDS.forEach((id, i) => {
    const b = el('button', 'mejora');
    b.type = 'button';
    b.style.setProperty('--i', String(i));
    b.addEventListener('click', () => {
      if (comprar(id)) { pintarTienda(); marcarComprada(b); }
      else {
        sonar('error');
        if (!estaAlMaximo(id)) toast(`Te faltan ${colones(costoDe(id) - estado.colones)} para ${MEJORAS[id].nombre}.`);
      }
    });
    botonesMejora[id] = b;
    lista.appendChild(b);
  });

  btnVender.addEventListener('click', () => { if (venderTodo() > 0) pintarTienda(); });
  btnMascota.addEventListener('click', () => {
    if (estado.mascota.comprada) return;
    if (comprarMascota()) { pintarTienda(); marcarComprada(btnMascota); }
    else { sonar('error'); toast(`Te faltan ${colones(MASCOTA.costo - estado.colones)} para el ${MASCOTA.nombre}.`); }
  });
  btnColapsar.addEventListener('click', alColapsar);

  on('pantalla:cambio', (e) => { if (e.a === 'tienda') pintarTienda(); });
  pintarTienda();
}
