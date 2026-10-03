// Bucle del juego (paso fijo de 1/60 s, máximo 5 pasos por cuadro), pegamento entre capas y API de depuración.
import '@fontsource/pixelify-sans/400.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './styles/tokens.css';
import './styles/ui.css';

import { GUARDADO, MUNDO, SENSACION, SIM } from './config/balance';
import { actualizarAmbiente, conectarSonidos, iniciarAudio, ponerVolumen, silenciar } from './audio/sonido';
import { viajar } from './game/ascensor';
import { valorMineral } from './game/botin';
import { colapsar } from './game/colapso';
import { entradaVacia } from './game/entrada';
import { emit, on } from './game/eventos';
import { deserializar, serializar } from './game/guardado';
import { cambiarPantalla, crearJuego, nuevaPartida, pasoJuego } from './game/juego';
import { direccionMirada, teletransportar } from './game/jugador';
import { comprar } from './game/mejoras';
import { agregarAuto } from './game/mochila';
import { crearMomia } from './game/momia';
import { venderTodo } from './game/tienda';
import { TEXTO_FOSIL, TEXTOS } from './game/textos';
import type { Juego, MejoraId, MineralId, Pantalla, TiendaId } from './game/tipos';
import { Puntero } from './input/puntero';
import { TecladoMouse } from './input/tecladoMouse';
import { Render } from './render/render';
import { cargarTexturas } from './render/texturas';
import { aviso, cartel } from './ui/avisos';
import { actualizarHud, iniciarHud } from './ui/hud';
import { acomodar as acomodarMochila, iniciarMochilaUI } from './ui/mochilaUI';
import { actualizarColapso, iniciarPantallas, mostrarMensajeTitulo, prepararTitulo } from './ui/pantallas';
import { actualizarPico, iniciarPico } from './ui/pico';
import { cerrarConfirmacion, iniciarTiendaUI } from './ui/tiendaUI';

const params = new URLSearchParams(location.search);
const debug = params.has('debug');
const sinBloqueo = params.has('sinbloqueo');
const app = document.getElementById('app')!;
const lienzo = document.getElementById('lienzo') as HTMLCanvasElement;

// --- Guardado ---------------------------------------------------------------------------------
let hayGuardado = false;
let puedeGuardar = false;

function guardar(): void {
  if (!puedeGuardar) return;
  try {
    localStorage.setItem(GUARDADO.CLAVE, JSON.stringify(serializar(juego)));
    hayGuardado = true;
  } catch { /* almacenamiento lleno o bloqueado: se sigue jugando sin guardar */ }
}

function cargar(): { juego: Juego; danado: boolean } {
  let texto: string | null = null;
  try { texto = localStorage.getItem(GUARDADO.CLAVE); } catch { /* sin almacenamiento */ }
  if (!texto) return { juego: crearJuego(), danado: false };
  try {
    const j = deserializar(JSON.parse(texto));
    if (j) { hayGuardado = true; puedeGuardar = true; return { juego: j, danado: false }; }
  } catch { /* JSON roto */ }
  try { localStorage.removeItem(GUARDADO.CLAVE); } catch { /* sin almacenamiento */ }
  return { juego: crearJuego(), danado: true };
}

const inicial = cargar();
let juego: Juego = inicial.juego;
juego.pantalla = 'titulo';
app.dataset.calidad = juego.ajustes.calidad;

// --- Entrada y puntero ---------------------------------------------------------------------------
const teclado = new TecladoMouse(lienzo, sinBloqueo);
let render: Render | null = null;

const puntero = new Puntero({
  elemento: lienzo,
  sinBloqueo,
  alGanar: () => { rechazado = false; },
  alPerder: () => { if (juego.pantalla === 'jugando') pausar(); },
  alRechazar: () => { rechazado = true; },
});
let rechazado = false;

teclado.jugando = () => juego.pantalla === 'jugando';
teclado.mouseActivo = () => juego.pantalla === 'jugando' && (sinBloqueo || puntero.bloqueado);
teclado.tabEsMochila = () => juego.pantalla === 'jugando' || juego.pantalla === 'mochila';

function pausar(): void {
  if (juego.pantalla !== 'jugando') return;
  cambiarPantalla(juego, 'pausa');
  puntero.soltar();
  guardar();
}

function reanudar(): void {
  cambiarPantalla(juego, 'jugando');
  void puntero.pedir();
}

function cerrarOverlay(): void {
  if (juego.pantalla === 'tienda' && cerrarConfirmacion()) return;
  if (juego.pantalla === 'tienda' || juego.pantalla === 'mochila') { cambiarPantalla(juego, 'jugando'); void puntero.pedir(); }
}

teclado.globales = {
  tab: () => {
    if (juego.pantalla === 'jugando') cambiarPantalla(juego, 'mochila');
    else if (juego.pantalla === 'mochila') cerrarOverlay();
  },
  escape: () => {
    if (juego.pantalla === 'jugando') pausar();
    else if (juego.pantalla === 'pausa') reanudar();
    else cerrarOverlay();
  },
  silenciar: () => {
    juego.ajustes.silencio = !juego.ajustes.silencio;
    silenciar(juego.ajustes.silencio);
    if (juego.pantalla !== 'titulo') aviso(juego.ajustes.silencio ? 'Sonido apagado' : 'Sonido encendido', 'info', 1500);
  },
  diagnostico: () => { const d = document.getElementById('diagnostico')!; d.hidden = !d.hidden; },
  acomodar: () => { if (juego.pantalla === 'mochila') acomodarMochila(); },
};

document.addEventListener('visibilitychange', () => { if (document.hidden) teclado.soltarTodo(); });
lienzo.addEventListener('mousedown', () => {
  if (juego.pantalla === 'jugando' && puntero.activo && !puntero.bloqueado) void puntero.pedir();
});
document.getElementById('clic-seguir')!.addEventListener('click', () => { void puntero.pedir(); });

on('pantalla:cambio', (e) => {
  if (e.a === 'mochila' || e.a === 'tienda') puntero.soltar();
  if (e.a === 'titulo') puntero.soltar();
  if (e.a === 'jugando' && (e.de === 'mochila' || e.de === 'tienda')) void puntero.pedir();
});

// --- Pantallas y acciones de la interfaz -------------------------------------------------------------------
function empezar(nueva: boolean): void {
  iniciarAudio();
  if (nueva) {
    try { localStorage.removeItem(GUARDADO.CLAVE); } catch { /* sin almacenamiento */ }
    hayGuardado = false;
    nuevaPartida(juego);
  }
  puedeGuardar = true;
  mostrarMensajeTitulo('');
  cambiarPantalla(juego, 'jugando');
  void puntero.pedir();
}

function borrarPartida(): void {
  try { localStorage.removeItem(GUARDADO.CLAVE); } catch { /* sin almacenamiento */ }
  hayGuardado = false;
  puedeGuardar = false;
  nuevaPartida(juego);
  cambiarPantalla(juego, 'titulo');
}

function salirAlTitulo(): void {
  guardar();
  cambiarPantalla(juego, 'titulo');
}

const accionesUI = {
  juego: () => juego,
  hayGuardado: () => hayGuardado,
  empezar,
  reanudar,
  salirAlTitulo,
  borrarPartida,
  aplicarCalidad: (c: Juego['ajustes']['calidad']) => { app.dataset.calidad = c; render?.aplicarCalidad(c); },
  ponerVolumen,
  guardar,
};

iniciarPantallas(accionesUI);
iniciarHud(() => juego);
iniciarMochilaUI(() => juego);
iniciarTiendaUI(() => juego);
iniciarPico();
conectarSonidos(() => juego);
silenciar(juego.ajustes.silencio);
ponerVolumen(juego.ajustes.volumen);
prepararTitulo(hayGuardado);
if (inicial.danado) mostrarMensajeTitulo(TEXTOS.guardadoDanado);

on('fosil:hallado', (e) => { const f = TEXTO_FOSIL[e.id]; cartel(f.nombre, f.detalle, 5500); });
for (const ev of ['venta:hecha', 'mejora:comprada', 'mascota:comprada', 'colapso:fin'] as const) on(ev, () => guardar());
window.addEventListener('beforeunload', guardar);

// --- Bucle ----------------------------------------------------------------------------------------------------
let acumulador = 0;
let ultimo = performance.now();
let pausaHasta = 0;
let lentoHasta = 0;
let relojAdorno = 0;
let guardadoReloj = 0;
let frames = 0, ultimoFps = performance.now(), fps = 0, msFrame = 0, pasosUltimo = 0;
let mirarDX = 0, mirarDY = 0;
const reducirMovimiento = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function simulacionActiva(): boolean {
  const p = juego.pantalla;
  if (p === 'titulo' || p === 'pausa') return false;
  if (p === 'jugando' && puntero.activo && !puntero.bloqueado) return false; // espera el clic
  return true;
}

function frame(ahora: number): void {
  requestAnimationFrame(frame);
  const dtReal = Math.min(0.1, (ahora - ultimo) / 1000);
  msFrame = ahora - ultimo;
  ultimo = ahora;
  relojAdorno += dtReal;
  frames++;
  if (ahora - ultimoFps >= 500) { fps = Math.round((frames * 1000) / (ahora - ultimoFps)); frames = 0; ultimoFps = ahora; }

  const activa = simulacionActiva();
  const overlay = document.getElementById('clic-seguir')!;
  overlay.hidden = !(juego.pantalla === 'jugando' && puntero.activo && !puntero.bloqueado);

  pasosUltimo = 0;
  mirarDX = mirarDY = 0;
  if (activa && ahora >= pausaHasta) {
    const escala = ahora < lentoHasta ? SENSACION.CAMARA_LENTA_ESCALA : 1;
    acumulador += dtReal * escala;
    while (acumulador >= SIM.PASO && pasosUltimo < SIM.MAX_PASOS) {
      render?.asignarPrevio();
      const e = teclado.leer();
      mirarDX += e.mirarDX; mirarDY += e.mirarDY;
      pasoJuego(juego, e, SIM.PASO);
      acumulador -= SIM.PASO;
      pasosUltimo++;
    }
    if (pasosUltimo === SIM.MAX_PASOS) acumulador = 0;
    if (juego.pantalla !== 'titulo') {
      guardadoReloj += dtReal;
      if (guardadoReloj >= SIM.GUARDAR_CADA_SEG) { guardadoReloj = 0; guardar(); }
    }
  } else {
    teclado.leer();
    if (!activa) acumulador = 0;
  }

  if (render) {
    render.dibujar(Math.min(1, acumulador / SIM.PASO), dtReal, relojAdorno);
    actualizarAmbiente(juego);
    actualizarHud(juego);
    actualizarPico(juego, relojAdorno, mirarDX, mirarDY, dtReal);
    actualizarColapso(juego);
    const d = document.getElementById('diagnostico')!;
    if (!d.hidden) {
      d.textContent = `fps ${fps}\nms ${msFrame.toFixed(1)}\nllamadas ${render.stats.llamadas}\ntriangulos ${render.stats.triangulos}\nchunks ${render.stats.chunks}\npasos ${pasosUltimo}`;
    }
  }
}

// --- Arranque ---------------------------------------------------------------------------------------------------
async function arrancar(): Promise<void> {
  const tex = await cargarTexturas();
  render = new Render(lienzo, juego, tex);
  render.alImpacto = (tipo) => {
    if (reducirMovimiento) return;
    const ahora = performance.now();
    if (tipo === 'fosil') { lentoHasta = ahora + SENSACION.CAMARA_LENTA_FOSIL_SEG * 1000; pausaHasta = ahora + SENSACION.PAUSA_IMPACTO_FOSIL_MS; }
    else pausaHasta = ahora + SENSACION.PAUSA_IMPACTO_MINERAL_MS;
  };
  render.aplicarCalidad(juego.ajustes.calidad);
  window.addEventListener('resize', () => render?.redimensionar(window.innerWidth, window.innerHeight));
  (window as unknown as { __listo: boolean }).__listo = true;
  requestAnimationFrame((t) => { ultimo = t; frame(t); });
}

// --- API de depuración (solo con ?debug) -------------------------------------------------------------
if (debug) {
  const resumen = () => ({
    pantalla: juego.pantalla,
    pos: { x: +juego.jugador.pos.x.toFixed(2), y: +juego.jugador.pos.y.toFixed(2), z: +juego.jugador.pos.z.toFixed(2) },
    guinada: +juego.jugador.guinada.toFixed(3), cabeceo: +juego.jugador.cabeceo.toFixed(3),
    profundidad: +(MUNDO.SUELO_Y - juego.jugador.pos.y).toFixed(2),
    calor: Math.round(juego.jugador.calor), colones: juego.colones, mochila: juego.mochila.piezas.length,
    sueltos: juego.sueltos.length, momias: juego.momias.length, mejoras: { ...juego.mejoras },
    mascota: juego.mascota.comprada, fosilesActivos: [...juego.fosilesActivos], fosilesEnMapa: juego.fosilesMapa.length,
    colapsos: juego.colapsos, estratos: juego.estratos.length, semilla: juego.semilla,
    records: { ...juego.records }, paradas: [...juego.paradas], cambios: juego.mundo.cambios.size,
    profundidadMina: juego.mundo.profundidadMina, tiendaActual: juego.tiendaActual,
  });
  const api = {
    get juego() { return juego; },
    get render() { return render; },
    estado: resumen,
    stats: () => ({ fps, ms: +msFrame.toFixed(1), ...(render ? { llamadas: render.stats.llamadas, triangulos: render.stats.triangulos, chunks: render.stats.chunks, escena: render.medirEscena() } : {}) }),
    teletransportar: (x: number, y: number, z: number) => teletransportar(juego, x, y, z),
    mirar: (guinada: number, cabeceo: number) => { juego.jugador.guinada = guinada; juego.jugador.cabeceo = cabeceo; },
    darColones: (n: number) => { juego.colones += n; emit('mochila:cambio', {}); },
    darMineral: (id: MineralId, n: number) => {
      for (let i = 0; i < n; i++) agregarAuto(juego, id, valorMineral(id, Math.max(0, MUNDO.SUELO_Y - juego.jugador.pos.y)));
    },
    ponerCalor: (n: number) => { juego.jugador.calor = n; },
    picarSeg: (s: number) => {
      const e = entradaVacia();
      e.picar = true;
      for (let i = 0; i < Math.round(s * 60); i++) pasoJuego(juego, e, SIM.PASO);
      e.picar = false;
      pasoJuego(juego, e, SIM.PASO);
    },
    abrir: (p: Pantalla, tienda?: TiendaId) => { if (tienda) juego.tiendaActual = tienda; cambiarPantalla(juego, p); },
    cerrar: () => cambiarPantalla(juego, 'jugando'),
    vender: (t: TiendaId = 'tere') => venderTodo(juego, t),
    comprar: (id: MejoraId) => comprar(juego, id),
    colapsar: () => colapsar(juego),
    saltarCinematica: () => { juego.colapso.reloj = 99; },
    aparecerMomia: () => {
      const d = direccionMirada(juego.jugador);
      const j = juego.jugador.pos;
      let x = j.x + d.x * 4, z = j.z + d.z * 4;
      if (juego.mundo.esSolido(Math.floor(x), Math.floor(j.y + 0.5), Math.floor(z))) { x = j.x - d.x * 2; z = j.z - d.z * 2; }
      return crearMomia(juego, x, j.y, z).uid;
    },
    buscarFosil: () => {
      let mejor: Juego['fosilesMapa'][number] | null = null, md = Infinity;
      for (const f of juego.fosilesMapa) {
        const d = Math.hypot(f.x - juego.jugador.pos.x, f.y - juego.jugador.pos.y, f.z - juego.jugador.pos.z);
        if (d < md) { md = d; mejor = f; }
      }
      return mejor;
    },
    viajar: (parada: number) => viajar(juego, parada),
    guardar: () => { puedeGuardar = true; guardar(); },
  };
  (window as unknown as { __estratos: typeof api }).__estratos = api;
}

void arrancar();
