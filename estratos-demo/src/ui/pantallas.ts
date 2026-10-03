// Cambio de pantallas, teclas de la interfaz, pausa, confirmaciones y la cinemática del colapso.
import { iniciarAudio, ponerVolumen, silenciar, sonar } from '../audio/sonido';
import { COLAPSO, FOSILES, MASCOTA, MOCHILA, PALETA, RENDER } from '../config';
import { emit, on } from '../events';
import { soltarInput } from '../input';
import { aplicarCalidad } from '../render/calidad';
import { iniciarCaida } from '../render/bloques';
import { css, movimientoReducido, vista } from '../render/compartido';
import { centrarCamara } from '../render/escena';
import { colocarDeGolpe } from '../render/sprites';
import { colapsar, multiplicador, puedeColapsar } from '../sistemas/colapso';
import { cercaDeTienda } from '../sistemas/tienda';
import { estado, guardarEstado, hayPartida, reiniciarTodo } from '../state';
import type { Calidad, Pantalla } from '../tipos';
import { acomodar } from './mochilaUI';
import { cartel, colones, toast } from './toasts';

const $ = (id: string) => document.getElementById(id)!;
let ui: HTMLElement;
const PANELES: Partial<Record<Pantalla, string>> = {
  titulo: 'pantalla-titulo', mochila: 'panel-mochila', tienda: 'panel-tienda', pausa: 'pantalla-pausa',
};
const FOCO_INICIAL: Partial<Record<Pantalla, string>> = {
  titulo: 'btn-jugar', mochila: 'btn-acomodar', tienda: 'btn-cerrar-tienda', pausa: 'btn-continuar',
};

export function irA(p: Pantalla): void {
  const de = estado.pantalla;
  if (de === p) return;
  estado.pantalla = p;
  ui.dataset.pantalla = p;
  soltarInput();
  for (const [pantalla, id] of Object.entries(PANELES)) $(id).toggleAttribute('inert', pantalla !== p);
  $('hud').toggleAttribute('inert', true);
  const foco = FOCO_INICIAL[p];
  if (foco) $(foco).focus({ preventScroll: true });
  else (document.activeElement as HTMLElement | null)?.blur?.();
  if (p === 'titulo') pintarTitulo();
  if (p === 'pausa') pintarPausa();
  emit('pantalla:cambio', { de, a: p });
}

// ---------- Confirmación ----------
let resolverConfirmacion: ((v: boolean) => void) | null = null;
let focoAntes: HTMLElement | null = null;

function cerrarConfirmacion(valor: boolean): void {
  if (!resolverConfirmacion) return;
  $('dialogo-confirmar').hidden = true;
  const r = resolverConfirmacion;
  resolverConfirmacion = null;
  focoAntes?.focus();
  r(valor);
}

export function confirmar(titulo: string, lineas: string[], textoSi: string): Promise<boolean> {
  focoAntes = document.activeElement as HTMLElement | null;
  $('confirmar-titulo').textContent = titulo;
  const cuerpo = $('confirmar-texto');
  cuerpo.replaceChildren(...lineas.map((l) => {
    const p = document.createElement('p');
    p.textContent = l;
    return p;
  }));
  $('confirmar-si').textContent = textoSi;
  $('dialogo-confirmar').hidden = false;
  $('confirmar-no').focus();
  return new Promise((res) => { resolverConfirmacion = res; });
}

// ---------- Título y pausa ----------
function pintarTitulo(): void {
  $('btn-jugar').textContent = hayPartida() ? 'Seguir picando' : 'Bajar a la mina';
  ($('btn-borrar-partida') as HTMLButtonElement).hidden = !hayPartida();
}

function pintarPausa(): void {
  const a = estado.ajustes;
  const radio = document.querySelector<HTMLInputElement>(`#ajuste-calidad input[value="${a.calidad}"]`);
  if (radio) radio.checked = true;
  ($('ajuste-volumen') as HTMLInputElement).value = String(a.volumen);
  pintarSilencio();
  const r = estado.records;
  const datos: [string, string][] = [
    ['Bloques picados en total', r.bloquesTotal.toLocaleString('es-SV')],
    ['Bloques en esta partida', r.bloquesPartida.toLocaleString('es-SV')],
    ['Mejor partida', r.mejorPartida.toLocaleString('es-SV')],
    ['Profundidad récord', r.profundidadMax + ' m'],
    ['Colapsos', String(estado.colapsos)],
  ];
  const dl = $('pausa-records');
  dl.replaceChildren();
  for (const [k, v] of datos) {
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    dl.append(dt, dd);
  }
}

function pintarSilencio(): void {
  const b = $('btn-silencio');
  b.setAttribute('aria-pressed', String(estado.ajustes.silencio));
  b.firstChild!.textContent = estado.ajustes.silencio ? 'Activar sonido ' : 'Silenciar ';
}

function alternarSilencio(): void {
  silenciar(!estado.ajustes.silencio);
  pintarSilencio();
  guardarEstado();
}

// ---------- Colapso ----------
const cine = { activo: false, t: 0, fase: 0, reducido: false };

export async function pedirColapso(): Promise<void> {
  if (!puedeColapsar()) return;
  const sig = (multiplicador() + COLAPSO.MULT_POR_COLAPSO).toLocaleString('es-SV');
  const ok = await confirmar('¿Colapsar la mina?', [
    'Perdés los colones, las mejoras del pico y lo que llevás en la mochila.',
    `Conservás el ${MASCOTA.nombre} si lo tenés, tus récords y los estratos.`,
    `Volvés con multiplicador x${sig} en daño y ventas, y con 3 fósiles enterrados en tu mina vieja.`,
  ], 'Colapsar la mina');
  if (!ok) return;
  cine.activo = true; cine.t = 0; cine.fase = 0; cine.reducido = movimientoReducido();
  irA('colapso');
  $('pantalla-colapso').dataset.fase = cine.reducido ? 'estrato' : 'caida';
  $('colapso-etiqueta').textContent = '';
  sonar('colapso');
  if (!cine.reducido) {
    vista.cine = true;
    vista.cineZoom = RENDER.COLAPSO_ZOOM;
    vista.cineY = -Math.min(estado.mina.alto, 34) / 2;
  }
}

function faseEstrato(): void {
  const estrato = colapsar();
  vista.sacudida = 0;
  if (!estrato) return;
  const pc = $('pantalla-colapso');
  pc.style.setProperty('--color-estrato', css(PALETA.estrato[(estrato.id - 1) % PALETA.estrato.length]));
  pc.dataset.fase = 'estrato';
  $('colapso-etiqueta').textContent = `Estrato ${estrato.id}, llegaste a ${estrato.profundidadMax} m`;
}

function actualizarCine(dt: number): void {
  cine.t += dt;
  // Tiempos de cada fase: caída, estrato, multiplicador, fin.
  const T = cine.reducido ? [0, 0.4, 1.6, 2.8] : [1, 2.5, 3.5, RENDER.COLAPSO_SEG];
  if (!cine.reducido && cine.t < T[1]) vista.sacudida = 0.04 + Math.min(1, cine.t) * 0.22;
  if (cine.fase === 0 && cine.t >= T[0]) { cine.fase = 1; if (!cine.reducido) iniciarCaida(); }
  if (cine.fase === 1 && cine.t >= T[1]) { cine.fase = 2; faseEstrato(); }
  if (cine.fase === 2 && cine.t >= T[2]) {
    cine.fase = 3;
    $('pantalla-colapso').dataset.fase = 'mult';
    $('colapso-mult').textContent = 'x' + multiplicador().toLocaleString('es-SV');
    sonar('fosil');
    vista.cine = false;
    colocarDeGolpe();
    centrarCamara();
  }
  if (cine.fase === 3 && cine.t >= T[3]) {
    cine.activo = false;
    delete $('pantalla-colapso').dataset.fase;
    irA('jugando');
  }
}

// ---------- Avisos por frame ----------
let avisoColapsoDado = false;
let relojLatido = 0;

export function actualizarPantallas(dt: number): void {
  if (cine.activo) { actualizarCine(dt); return; }
  if (estado.pantalla !== 'jugando') return;
  if (!avisoColapsoDado && puedeColapsar()) {
    avisoColapsoDado = true;
    cartel('Ya podés colapsar', 'Andá a la tienda cuando querás empezar de nuevo, más fuerte.');
  }
  // Latido que se acelera arriba de 80 % de calor.
  const calor = estado.jugador.calor;
  if (calor >= 80) {
    relojLatido -= dt;
    if (relojLatido <= 0) {
      sonar('latido', 0.6 + (calor - 80) / 50);
      relojLatido = 0.9 - ((calor - 80) / 20) * 0.55;
    }
  } else relojLatido = 0;
}

function alTeclear(e: KeyboardEvent): void {
  if (e.repeat) return;
  if (resolverConfirmacion) {
    if (e.code === 'Escape') { e.preventDefault(); cerrarConfirmacion(false); }
    return;
  }
  const p = estado.pantalla;
  switch (e.code) {
    case 'Escape':
      if (p === 'jugando') irA('pausa');
      else if (p === 'pausa' || p === 'mochila' || p === 'tienda') irA('jugando');
      break;
    case 'Tab':
      if (p === 'jugando') { e.preventDefault(); irA('mochila'); }
      else if (p === 'mochila') { e.preventDefault(); irA('jugando'); }
      break;
    case 'KeyE':
      if (p === 'jugando' && cercaDeTienda()) irA('tienda');
      break;
    case 'KeyQ':
      if (p === 'jugando' || p === 'mochila') acomodar();
      break;
    case 'KeyM':
      if (p !== 'titulo' && p !== 'colapso') alternarSilencio();
      break;
  }
}

export function iniciarPantallas(): void {
  ui = $('ui');
  for (const [pantalla, id] of Object.entries(PANELES)) $(id).toggleAttribute('inert', pantalla !== estado.pantalla);
  $('hud').toggleAttribute('inert', true);
  pintarTitulo();

  $('btn-jugar').addEventListener('click', () => { iniciarAudio(); sonar('compra'); irA('jugando'); });
  $('btn-borrar-partida').addEventListener('click', async () => {
    const ok = await confirmar('¿Borrar la partida?', [
      'Se pierde todo: colones, estratos, récords y mascota.',
      'No se puede deshacer.',
    ], 'Borrar partida');
    if (!ok) return;
    reiniciarTodo();
    avisoColapsoDado = false;
    colocarDeGolpe();
    centrarCamara();
    pintarTitulo();
    toast('Partida borrada. La mina es nueva.');
  });
  $('btn-cerrar-mochila').addEventListener('click', () => irA('jugando'));
  $('btn-cerrar-tienda').addEventListener('click', () => irA('jugando'));
  $('btn-continuar').addEventListener('click', () => irA('jugando'));
  $('btn-salir').addEventListener('click', () => { guardarEstado(); irA('titulo'); });
  $('btn-silencio').addEventListener('click', alternarSilencio);
  $('confirmar-si').addEventListener('click', () => cerrarConfirmacion(true));
  $('confirmar-no').addEventListener('click', () => cerrarConfirmacion(false));

  $('ajuste-calidad').addEventListener('change', (e) => {
    aplicarCalidad((e.target as HTMLInputElement).value as Calidad);
    guardarEstado();
  });
  $('ajuste-volumen').addEventListener('input', (e) => {
    ponerVolumen(Number((e.target as HTMLInputElement).value));
    sonar('clic');
  });
  $('ajuste-volumen').addEventListener('change', guardarEstado);

  window.addEventListener('keydown', alTeclear);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && estado.pantalla === 'jugando') irA('pausa');
  });
  window.addEventListener('beforeunload', () => { if (estado.pantalla !== 'titulo' || hayPartida()) guardarEstado(); });

  on('mina:regenerada', () => { avisoColapsoDado = false; });
  on('fosil:hallado', (e) => cartel(FOSILES[e.id].nombre, FOSILES[e.id].detalle));
  on('mascota:comprada', () => cartel(MASCOTA.nombre, `Te acompaña y sube ${MASCOTA.BONUS_VENTA * 100} % cada venta.`));
  on('venta:hecha', (e) => {
    if (e.bonusLlena) cartel('Mochila sin huecos', `+${MOCHILA.BONUS_LLENA * 100} % en esta venta`);
    toast(`Vendiste por ${colones(e.total)}`, 'bien');
  });
}
