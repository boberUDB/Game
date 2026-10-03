// Colapso (prestige): se pierde casi todo y la mina nueva se excava a través de los estratos anteriores.
import { COLAPSO, MINA } from '../config/balance';
import { emit } from './eventos';
import { generarMundo } from './generacion';
import { aparecerEnSuperficie } from './jugador';
import { mejorasEnCero } from './mejoras';
import { cambiarPantalla } from './pantalla';
import { semillaAleatoria } from './rng';
import { saturacionEnCero } from './tienda';
import { TIENDA_IDS } from './tipos';
import type { Estrato, Juego, TiendaId } from './tipos';

export function multiplicador(juego: Juego): number {
  return 1 + COLAPSO.MULT_POR_COLAPSO * juego.colapsos;
}

/** Profundidad que hay que alcanzar en la partida para poder colapsar. */
export function profundidadRequerida(juego: Juego): number {
  return Math.min(COLAPSO.REQUERIDO_BASE + COLAPSO.EXTRA_POR_COLAPSO * juego.colapsos, COLAPSO.REQUERIDO_MAX);
}

export function puedeColapsar(juego: Juego): boolean {
  return juego.records.profundidadPartida >= profundidadRequerida(juego);
}

/**
 * Empieza el colapso: guarda la partida como estrato y arranca la cinemática (pantalla 'colapso').
 * Con `directo` también aplica el reinicio de inmediato (lo usan las pruebas y el modo depuración).
 */
export function colapsar(juego: Juego, directo = false): Estrato | null {
  if (!puedeColapsar(juego) || juego.pantalla === 'colapso') return null;
  const estrato: Estrato = {
    id: juego.colapsos + 1,
    profundidadMax: juego.records.profundidadPartida,
    bloquesPicados: juego.records.bloquesPartida,
    fecha: new Date().toISOString(),
  };
  juego.colapso = { reloj: 0, estrato };
  emit('colapso:inicio', { estrato });
  cambiarPantalla(juego, 'colapso');
  if (directo) { finalizarColapso(juego); cambiarPantalla(juego, 'jugando'); }
  return estrato;
}

/** Aplica el reinicio: conserva Torogoz, récords, estratos y multiplicador. Todo lo demás vuelve a cero. */
export function finalizarColapso(juego: Juego): void {
  const estrato = juego.colapso.estrato;
  if (!estrato) return;
  juego.estratos.push(estrato);
  if (juego.estratos.length > MINA.MAX_ESTRATOS) juego.estratos.shift();
  juego.colapsos++;
  juego.colones = 0;
  juego.mejoras = mejorasEnCero();
  juego.mochila.piezas = [];
  juego.sueltos = [];
  juego.momias = [];
  juego.fosilesActivos = [];
  juego.chepe = { activo: false, x: 0, y: 0, z: 0, reloj: 0 };
  juego.saturacion = Object.fromEntries(TIENDA_IDS.map((t) => [t, saturacionEnCero()])) as Record<TiendaId, ReturnType<typeof saturacionEnCero>>;
  juego.paradas = [];
  juego.records.bloquesPartida = 0;
  juego.records.profundidadPartida = 0;
  juego.semilla = semillaAleatoria();
  juego.mundo = generarMundo(juego.semilla, juego.estratos);
  juego.fosilesMapa = juego.mundo.fosiles.map((f) => ({ ...f }));
  juego.jugador.calor = 0;
  juego.jugador.desmayado = false;
  juego.jugador.silbando = false;
  juego.picado.objetivo = null;
  juego.estratoActual = -1;
  juego.ascensorSel = 0;
  juego.colapso = { reloj: 0, estrato: null };
  aparecerEnSuperficie(juego);
  emit('mundo:regenerado', {});
  emit('mochila:cambio', {});
  emit('colapso:fin', { multiplicador: multiplicador(juego) });
}
