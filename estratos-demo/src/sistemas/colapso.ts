// Colapso (prestige): se pierde casi todo y la mina nueva se excava a través de los estratos anteriores.
import { COLAPSO } from '../config';
import { emit } from '../events';
import { semillaNueva } from '../rng';
import { estado, guardarEstado, jugadorInicial, mejorasEnCero, saturacionEnCero } from '../state';
import type { Estrato } from '../tipos';
import { generarMina } from '../world/generacion';
import { reiniciarAvisosDeRecord } from './records';

export function filaRequerida(): number {
  return Math.min(COLAPSO.FILA_REQUERIDA_BASE + COLAPSO.FILA_EXTRA_POR_COLAPSO * estado.colapsos, COLAPSO.FILA_REQUERIDA_MAX);
}

export function puedeColapsar(): boolean {
  return estado.records.profundidadPartida >= filaRequerida();
}

export function multiplicador(): number {
  return 1 + COLAPSO.MULT_POR_COLAPSO * estado.colapsos;
}

/** Conserva mascota, récords, estratos y multiplicador. Todo lo demás vuelve a cero. */
export function colapsar(): Estrato | null {
  if (!puedeColapsar()) return null;
  const estrato: Estrato = {
    id: estado.colapsos + 1,
    profundidadMax: estado.records.profundidadPartida,
    bloquesPicados: estado.records.bloquesPartida,
    fecha: new Date().toISOString(),
  };
  emit('colapso:inicio', { estrato });

  estado.estratos.push(estrato);
  estado.colapsos++;
  estado.colones = 0;
  estado.mejoras = mejorasEnCero();
  estado.mochila.piezas = [];
  estado.sueltos = [];
  estado.fosilesActivos = [];
  estado.chepe = { activo: false, x: 0, y: 0, reloj: 0 };
  estado.saturacion = saturacionEnCero();
  estado.records.bloquesPartida = 0;
  estado.records.profundidadPartida = 0;
  estado.semilla = semillaNueva();
  estado.mina = generarMina(estado.semilla, estado.estratos);
  estado.jugador = jugadorInicial();
  reiniciarAvisosDeRecord();

  guardarEstado();
  emit('mina:regenerada', {});
  emit('mochila:cambio', {});
  emit('colapso:fin', { multiplicador: multiplicador() });
  return estrato;
}
