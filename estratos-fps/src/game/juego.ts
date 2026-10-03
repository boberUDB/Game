// Estado único del juego y el paso de simulación. Solo este código escribe en el Juego.
import { AJUSTES_DEFECTO, CALOR, COLAPSO, JUGADOR, MINA, MUNDO, SILBIDO } from '../config/balance';
import { objetivoInteraccion, viajar } from './ascensor';
import { actualizarSueltos } from './botin';
import { actualizarCalor, desmayar } from './calor';
import { finalizarColapso } from './colapso';
import type { Entrada } from './entrada';
import { emit } from './eventos';
import { moverJugador } from './fisica';
import { actualizarFosiles } from './fosiles';
import { generarMundo } from './generacion';
import { aparecerEnSuperficie, crearJugador } from './jugador';
import { mejorasEnCero } from './mejoras';
import { actualizarMomias } from './momia';
import { Mundo } from './mundo';
import { cambiarPantalla } from './pantalla';
import { actualizarPicado } from './picado';
import { profundidadActual, registrarProfundidad } from './records';
import { semillaAleatoria } from './rng';
import { actualizarSaturacion, saturacionEnCero } from './tienda';
import { TIENDA_IDS } from './tipos';
import type { Juego, Pantalla, TiendaId } from './tipos';
import { indiceColorEstrato } from './generacion';

export function crearJuego(semilla?: number, opciones: { generar?: boolean } = {}): Juego {
  const s = semilla ?? semillaAleatoria();
  const mundo = opciones.generar === false ? new Mundo() : generarMundo(s, []);
  return {
    semilla: s,
    mundo,
    jugador: crearJugador(),
    mochila: { piezas: [] },
    sueltos: [],
    momias: [],
    chepe: { activo: false, x: 0, y: 0, z: 0, reloj: 0 },
    colones: 0,
    mejoras: mejorasEnCero(),
    mascota: { comprada: false },
    fosilesActivos: [],
    fosilesMapa: mundo.fosiles.map((f) => ({ ...f })),
    saturacion: Object.fromEntries(TIENDA_IDS.map((t) => [t, saturacionEnCero()])) as Record<TiendaId, ReturnType<typeof saturacionEnCero>>,
    paradas: [],
    colapsos: 0,
    estratos: [],
    records: { bloquesTotal: 0, bloquesPartida: 0, mejorPartida: 0, profundidadPartida: 0, profundidadMax: 0 },
    ajustes: { ...AJUSTES_DEFECTO },
    tutorial: { movio: false, pico: false, vendio: false },
    pantalla: 'titulo',
    tiendaActual: 'tere',
    tiempo: 0,
    uid: 1,
    picado: { reloj: 0, picando: false, fase: 0, objetivo: null, golpesSeg: 4, ultimoAvisoLlena: -99 },
    silbido: { reloj: 0 },
    colapso: { reloj: 0, estrato: null },
    desmayoReloj: 0,
    relojSaturacion: 0,
    relojMomias: 3,
    estratoActual: -1,
    ascensorSel: 0,
    ultimoAvisoFondo: -99,
  };
}

export { cambiarPantalla };

/** Arranca una partida nueva en el mismo objeto (borra progreso, conserva ajustes). */
export function nuevaPartida(juego: Juego): void {
  const base = crearJuego(undefined);
  const ajustes = juego.ajustes;
  const pantalla = juego.pantalla;
  Object.assign(juego, base, { ajustes, pantalla });
  emit('mundo:regenerado', {});
  emit('mochila:cambio', {});
}

function actualizarEstrato(juego: Juego): void {
  const { x, z } = juego.jugador.pos;
  const dentro = x >= MINA.X0 && x < MINA.X0 + MINA.LADO && z >= MINA.Z0 && z < MINA.Z0 + MINA.LADO;
  const prof = profundidadActual(juego);
  let id = -1;
  if (dentro && juego.estratos.length > 0) {
    const slot = Math.floor((prof - MINA.ESTRATO_DESDE) / MINA.POR_ESTRATO);
    const lista = juego.estratos.slice(-MINA.MAX_ESTRATOS);
    if (prof >= MINA.ESTRATO_DESDE && slot >= 0 && slot < lista.length) id = lista[lista.length - 1 - slot].id;
  }
  if (id !== juego.estratoActual) {
    juego.estratoActual = id;
    if (id >= 0) emit('estrato:entrada', { estratoId: id });
  }
}

/** Color de estrato (0 a 2) de un id, para el render. */
export function colorDeEstrato(id: number): number { return indiceColorEstrato(id); }

export function pasoJuego(juego: Juego, entrada: Entrada, dt: number): void {
  juego.tiempo += dt;
  switch (juego.pantalla) {
    case 'desmayo':
      juego.desmayoReloj -= dt;
      if (juego.desmayoReloj <= 0) { juego.jugador.desmayado = false; cambiarPantalla(juego, 'jugando'); }
      return;
    case 'colapso':
      juego.colapso.reloj += dt;
      if (juego.colapso.reloj >= COLAPSO.SEG) { finalizarColapso(juego); cambiarPantalla(juego, 'jugando'); }
      return;
    case 'jugando':
      break;
    default:
      actualizarSaturacion(juego, dt);
      return;
  }

  const j = juego.jugador;
  // Mirar.
  j.guinada -= entrada.mirarDX * JUGADOR.RAD_POR_PIXEL * juego.ajustes.sensibilidad;
  const signo = juego.ajustes.invertirY ? 1 : -1;
  j.cabeceo = Math.max(-JUGADOR.CABECEO_MAX, Math.min(JUGADOR.CABECEO_MAX, j.cabeceo + signo * entrada.mirarDY * JUGADOR.RAD_POR_PIXEL * juego.ajustes.sensibilidad));

  // Moverse.
  let mx = entrada.moverX, mz = entrada.moverZ;
  const l = Math.hypot(mx, mz);
  if (l > 1) { mx /= l; mz /= l; }
  if (l > 0.01) juego.tutorial.movio = true;
  const sen = Math.sin(j.guinada), cos = Math.cos(j.guinada);
  const dirX = -sen * mz + cos * mx;
  const dirZ = -cos * mz - sen * mx;
  moverJugador(juego.mundo, j, { dirX, dirZ, correr: entrada.correr, saltar: entrada.saltar }, dt);

  registrarProfundidad(juego);
  actualizarEstrato(juego);
  actualizarPicado(juego, entrada.picar, dt);
  actualizarSueltos(juego, dt);
  actualizarCalor(juego, dt);
  if (j.calor >= 100 && !j.desmayado) { desmayar(juego); cambiarPantalla(juego, 'desmayo'); return; }
  actualizarMomias(juego, dt);
  actualizarFosiles(juego, dt);
  actualizarSaturacion(juego, dt);

  // Silbido: T durante 2 s lleva a la superficie. Se cancela si te golpean (ver momia.ts).
  if (entrada.subir && !j.silbando && profundidadActual(juego) >= MUNDO.SUPERFICIE_ASCENSOR) {
    j.silbando = true;
    juego.silbido.reloj = SILBIDO.SEG;
    emit('silbido:inicio', {});
  } else if (j.silbando) {
    juego.silbido.reloj -= dt;
    if (juego.silbido.reloj <= 0) {
      j.silbando = false;
      aparecerEnSuperficie(juego);
      juego.momias = [];
      emit('ascensor:viaje', { parada: 0 });
    }
  }

  // Interactuar.
  if (entrada.interactuar) {
    const o = objetivoInteraccion(juego);
    if (o?.tipo === 'tienda') { juego.tiendaActual = o.tienda; cambiarPantalla(juego, 'tienda'); }
    else if (o?.tipo === 'ascensor') viajar(juego, o.destino);
  }
}

/** Cuánto falta para el calor crítico, etc. (lo usa el HUD). */
export function calorAlto(juego: Juego): boolean { return juego.jugador.calor >= CALOR.ALTO; }
