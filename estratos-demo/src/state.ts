// Estado único del juego: crear, cargar y guardar.
import { JUGADOR } from './config';
import { emit } from './events';
import { semillaNueva } from './rng';
import type { GameState, MejoraId, MineralId } from './tipos';
import { generarMina } from './world/generacion';

const CLAVE = 'estratos.save.v1';

export function mejorasEnCero(): Record<MejoraId, number> {
  return { filo: 0, mango: 0, alcance: 0, suerte: 0, temple: 0 };
}
export function saturacionEnCero(): Record<MineralId, number> {
  return { azufre: 0, hierro: 0, obsidiana: 0, jade: 0 };
}
export function jugadorInicial(): GameState['jugador'] {
  return {
    x: JUGADOR.INICIO_X, y: JUGADOR.INICIO_Y, desdeX: JUGADOR.INICIO_X, desdeY: JUGADOR.INICIO_Y,
    t: 1, mirando: 'der', calor: 0, desmayado: false,
  };
}

export function crearEstado(): GameState {
  const semilla = semillaNueva();
  return {
    version: 1,
    pantalla: 'titulo',
    semilla,
    mina: generarMina(semilla, []),
    jugador: jugadorInicial(),
    chepe: { activo: false, x: 0, y: 0, reloj: 0 },
    mochila: { piezas: [] },
    sueltos: [],
    colones: 0,
    mejoras: mejorasEnCero(),
    mascota: { comprada: false },
    fosilesActivos: [],
    saturacion: saturacionEnCero(),
    colapsos: 0,
    estratos: [],
    records: { bloquesTotal: 0, bloquesPartida: 0, mejorPartida: 0, profundidadPartida: 0, profundidadMax: 0 },
    ajustes: { calidad: 'medio', volumen: 0.7, silencio: false },
    tutorial: { movio: false, pico: false, vendio: false },
  };
}

export const estado: GameState = crearEstado();

let partidaGuardada = false;
export function hayPartida(): boolean { return partidaGuardada; }

let uid = 1;
export function nuevoUid(): number { return uid++; }

function esValido(d: unknown): d is GameState {
  const e = d as GameState;
  return !!e && e.version === 1 && !!e.mina && Array.isArray(e.mina.celdas)
    && e.mina.celdas.length === e.mina.ancho * e.mina.alto
    && typeof e.colones === 'number' && !!e.jugador && !!e.mochila && Array.isArray(e.mochila.piezas)
    && !!e.records && !!e.mejoras && Array.isArray(e.estratos) && !!e.ajustes;
}

/** Carga la partida. Un guardado corrupto se descarta sin romper el arranque. */
export function cargarEstado(): 'nuevo' | 'cargado' | 'corrupto' {
  let texto: string | null = null;
  try { texto = localStorage.getItem(CLAVE); } catch { return 'nuevo'; }
  if (!texto) return 'nuevo';
  try {
    const datos: unknown = JSON.parse(texto);
    if (!esValido(datos)) throw new Error('guardado inválido');
    const base = crearEstado();
    Object.assign(estado, base, datos, { pantalla: 'titulo' });
    estado.jugador = { ...base.jugador, ...datos.jugador, t: 1, desmayado: false };
    estado.jugador.desdeX = estado.jugador.x;
    estado.jugador.desdeY = estado.jugador.y;
    estado.sueltos ??= [];
    estado.chepe ??= base.chepe;
    estado.tutorial = { ...base.tutorial, ...datos.tutorial };
    for (const p of estado.mochila.piezas) uid = Math.max(uid, p.uid + 1);
    for (const s of estado.sueltos) uid = Math.max(uid, s.uid + 1);
    partidaGuardada = true;
    return 'cargado';
  } catch {
    try { localStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ }
    return 'corrupto';
  }
}

export function guardarEstado(): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
    partidaGuardada = true;
  } catch { /* almacenamiento lleno o bloqueado: se sigue jugando sin guardar */ }
}

/** Borra la partida. Los ajustes de calidad y sonido se conservan. */
export function reiniciarTodo(): void {
  const ajustes = estado.ajustes;
  Object.assign(estado, crearEstado(), { ajustes });
  try { localStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ }
  partidaGuardada = false;
  emit('mina:regenerada', {});
  emit('mochila:cambio', {});
}
