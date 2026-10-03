// Pantalla de la tienda: venta con desglose, mejoras del pico, Torogoz y colapso con confirmación.
import { COLAPSO, MASCOTA, MEJORAS, TIENDA } from '../config/balance';
import { colapsar, multiplicador, profundidadRequerida, puedeColapsar } from '../game/colapso';
import { on } from '../game/eventos';
import { comprarMascota } from '../game/mascota';
import { comprar, costoDe, efectoEnNivel, estaAlMaximo, puedeComprar } from '../game/mejoras';
import { desgloseVenta, venderTodo } from '../game/tienda';
import { TEXTOS, formatoColones, nombreMineral, textoMascota, textoVendedor, fraseMejora } from '../game/textos';
import { MEJORA_IDS, MINERAL_IDS } from '../game/tipos';
import type { Juego, MejoraId } from '../game/tipos';
import { sonar } from '../audio/sonido';
import { aviso } from './avisos';

const $ = (id: string) => document.getElementById(id)!;
let obtener: () => Juego;
const botonesMejora = {} as Record<MejoraId, HTMLButtonElement>;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, clase = '', texto = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (clase) e.className = clase;
  if (texto) e.textContent = texto;
  return e;
}

function llenarMejora(b: HTMLButtonElement, nombre: string, nivel: string, efecto: Node[], costo: string, nota: string, estado: 'disponible' | 'caro' | 'maximo'): void {
  const n = el('span', 'nombre', nombre);
  if (nivel) n.appendChild(el('small', '', nivel));
  const c = el('span', 'costo', costo);
  if (nota) { c.appendChild(document.createElement('br')); c.appendChild(el('small', '', nota)); }
  const ef = el('span', 'efecto');
  ef.append(...efecto);
  b.replaceChildren(n, c, ef);
  b.dataset.estado = estado;
  b.setAttribute('aria-disabled', String(estado !== 'disponible'));
}

function textoEfecto(id: MejoraId, nivel: number, max: boolean): Node[] {
  const actual = nivel === 0 ? 'Sin efecto todavía' : efectoEnNivel(id, nivel);
  if (max) return [document.createTextNode(`Ahora: ${actual}. Es el máximo.`)];
  const b = el('b', '', efectoEnNivel(id, nivel + 1));
  return [document.createTextNode(`${fraseMejora(id)} Ahora: ${actual}. Siguiente: `), b];
}

function pintarVenta(juego: Juego): void {
  const tienda = juego.tiendaActual;
  const d = desgloseVenta(juego, tienda);
  const lista = $('lista-venta');
  lista.replaceChildren();
  for (const m of MINERAL_IDS) {
    const piezas = juego.mochila.piezas.filter((p) => p.mineral === m);
    if (piezas.length === 0) continue;
    const sat = juego.saturacion[tienda][m];
    const suma = piezas.reduce((s, p) => s + p.valor * (1 - sat), 0) * d.tiendaMult;
    const li = el('li');
    li.dataset.mineral = m;
    const nombre = el('span', '', `${nombreMineral(m)} x${piezas.length}`);
    nombre.appendChild(el('small', '', sat > 0 ? `Precio bajo por saturación: -${Math.round(sat * 100)} %` : 'Precio completo'));
    li.append(nombre, el('b', '', formatoColones(suma)));
    lista.appendChild(li);
  }
  $('venta-vacia').hidden = d.piezas > 0;
  ($('btn-vender') as HTMLButtonElement).disabled = d.piezas === 0;

  const desglose = $('venta-desglose');
  desglose.replaceChildren();
  const fila = (nombre: string, valor: string, activo: boolean, clase = '') => {
    const dt = el('dt', clase, nombre), dd = el('dd', clase, valor);
    if (activo) { dt.dataset.activo = ''; dd.dataset.activo = ''; }
    desglose.append(dt, dd);
  };
  desglose.hidden = d.piezas === 0;
  fila('Minerales', formatoColones(d.base), false);
  if (d.perdidaSaturacion > 0) fila('Saturación', `-${formatoColones(d.perdidaSaturacion)}`, false);
  if (d.tiendaMult !== 1) fila('Precio de la tienda', `x${d.tiendaMult}`, true);
  fila('Mochila sin huecos', d.bonusLlena ? '+50 %' : 'no aplica', d.bonusLlena);
  if (juego.mascota.comprada) fila(MASCOTA.nombre, `+${Math.round(MASCOTA.BONUS_VENTA * 100)} %`, true);
  if (d.multiplicador > 1) fila('Multiplicador de colapso', `x${d.multiplicador.toLocaleString('es-SV')}`, true);
  fila('Te pago', formatoColones(d.total), false, 'total');
}

function pintarMejoras(juego: Juego): void {
  for (const id of MEJORA_IDS) {
    const def = MEJORAS[id];
    const nivel = juego.mejoras[id];
    const costo = costoDe(juego, id);
    const etiquetaNivel = `nivel ${nivel} de ${def.max}`;
    if (estaAlMaximo(juego, id)) llenarMejora(botonesMejora[id], def.nombre, etiquetaNivel, textoEfecto(id, nivel, true), 'Al máximo', '', 'maximo');
    else if (puedeComprar(juego, id)) llenarMejora(botonesMejora[id], def.nombre, etiquetaNivel, textoEfecto(id, nivel, false), formatoColones(costo), '', 'disponible');
    else llenarMejora(botonesMejora[id], def.nombre, etiquetaNivel, textoEfecto(id, nivel, false), formatoColones(costo), `faltan ${formatoColones(costo - juego.colones)}`, 'caro');
  }
  const b = $('btn-mascota') as HTMLButtonElement;
  const ef = [document.createTextNode(textoMascota())];
  if (juego.mascota.comprada) llenarMejora(b, MASCOTA.nombre, '', ef, 'Ya te acompaña', '', 'maximo');
  else if (juego.colones >= MASCOTA.costo) llenarMejora(b, MASCOTA.nombre, '', ef, formatoColones(MASCOTA.costo), '', 'disponible');
  else llenarMejora(b, MASCOTA.nombre, '', ef, formatoColones(MASCOTA.costo), `faltan ${formatoColones(MASCOTA.costo - juego.colones)}`, 'caro');
}

function pintarColapso(juego: Juego): void {
  const puede = puedeColapsar(juego);
  ($('btn-colapsar') as HTMLButtonElement).disabled = !puede;
  const sig = (multiplicador(juego) + COLAPSO.MULT_POR_COLAPSO).toLocaleString('es-SV');
  $('colapso-texto').textContent = puede
    ? `Derrumbás todo y volvés con multiplicador x${sig}. Tu mina de hoy queda enterrada como estrato.`
    : `Llegá a ${profundidadRequerida(juego)} m para colapsar. Tu marca en esta partida: ${juego.records.profundidadPartida} m.`;
}

export function pintarTienda(): void {
  const juego = obtener();
  const abajo = juego.tiendaActual === 'abajo';
  $('pantalla-tienda').dataset.tienda = juego.tiendaActual;
  $('tienda-titulo').textContent = abajo ? `${TIENDA.NOMBRE_ABAJO}, comprador de la mina` : `Tienda de la ${TIENDA.NOMBRE_TERE}`;
  const frase = $('tienda-frase');
  frase.hidden = !abajo;
  if (abajo) frase.textContent = textoVendedor();
  $('tienda-colones').textContent = formatoColones(juego.colones);
  pintarVenta(juego);
  if (!abajo) { pintarMejoras(juego); pintarColapso(juego); }
}

function marcarComprada(b: HTMLElement): void {
  delete b.dataset.comprada;
  void b.offsetWidth;
  b.dataset.comprada = '';
}

function abrirConfirmacion(): void {
  const juego = obtener();
  if (!puedeColapsar(juego)) return;
  const conserva = $('col-conserva'), pierde = $('col-pierde');
  conserva.replaceChildren(); pierde.replaceChildren();
  const li = (t: string) => el('li', '', t);
  conserva.append(li(juego.mascota.comprada ? 'El Torogoz' : 'Tu mascota, si la comprás'), li('Tus récords'), li('Tu multiplicador'), li(`Tus estratos (${juego.estratos.length} en la mina)`));
  pierde.append(li(`Tus ${formatoColones(juego.colones)}`), li('Las mejoras del pico'), li('La mochila y lo que lleva'), li(`Los fósiles activos (${juego.fosilesActivos.length})`));
  $('col-nuevo').textContent = `x${(multiplicador(juego) + COLAPSO.MULT_POR_COLAPSO).toLocaleString('es-SV')}`;
  $('col-estrato').textContent = `Esta partida queda como estrato: ${juego.records.profundidadPartida} m, ${juego.records.bloquesPartida} bloques.`;
  $('confirmar-colapso').hidden = false;
  ($('btn-colapso-no') as HTMLButtonElement).focus();
}

export function cerrarConfirmacion(): boolean {
  const c = $('confirmar-colapso');
  if (c.hidden) return false;
  c.hidden = true;
  ($('btn-colapsar') as HTMLButtonElement).focus();
  return true;
}

export function iniciarTiendaUI(obtenerJuego: () => Juego): void {
  obtener = obtenerJuego;
  const lista = $('lista-mejoras');
  MEJORA_IDS.forEach((id) => {
    const b = el('button', 'mejora');
    b.type = 'button';
    b.addEventListener('click', () => {
      const juego = obtener();
      if (comprar(juego, id)) { pintarTienda(); marcarComprada(b); }
      else {
        sonar('error');
        if (!estaAlMaximo(juego, id)) aviso(`Te faltan ${formatoColones(costoDe(juego, id) - juego.colones)} para ${MEJORAS[id].nombre}.`, 'malo');
      }
    });
    botonesMejora[id] = b;
    lista.appendChild(b);
  });

  $('btn-vender').addEventListener('click', () => { const j = obtener(); if (venderTodo(j, j.tiendaActual) > 0) pintarTienda(); });
  $('btn-mascota').addEventListener('click', () => {
    const j = obtener();
    if (j.mascota.comprada) return;
    if (comprarMascota(j)) { pintarTienda(); marcarComprada($('btn-mascota')); }
    else { sonar('error'); aviso(`Te faltan ${formatoColones(MASCOTA.costo - j.colones)} para el ${MASCOTA.nombre}.`, 'malo'); }
  });
  $('btn-colapsar').addEventListener('click', abrirConfirmacion);
  $('btn-colapso-no').addEventListener('click', () => { cerrarConfirmacion(); });
  $('btn-colapso-si').addEventListener('click', () => {
    $('confirmar-colapso').hidden = true;
    colapsar(obtener());
  });

  on('pantalla:cambio', (e) => { if (e.a === 'tienda') { $('confirmar-colapso').hidden = true; pintarTienda(); } });
  on('mochila:cambio', () => { if (obtener().pantalla === 'tienda') pintarTienda(); });
  on('chepe:venta', () => { if (obtener().pantalla === 'tienda') pintarTienda(); });
  void TEXTOS;
}
