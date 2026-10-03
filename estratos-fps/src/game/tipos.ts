// Tipos compartidos por la lógica pura. Nada de three ni del navegador.
import type { Mundo } from './mundo';

export enum BloqueId {
  aire, tierra, piedra, obsidiana, roca_madre, arenisca_jeroglificos,
  piedra_azufre, piedra_oro, piedra_esmeralda, piedra_rubi, piedra_zafiro,
  estrato_0, estrato_1, estrato_2, fosil_0, fosil_1, fosil_2,
  empedrado, adobe, madera, teja,
}
export const NOMBRES_BLOQUE: string[] = [
  'aire', 'tierra', 'piedra', 'obsidiana', 'roca_madre', 'arenisca_jeroglificos',
  'piedra_azufre', 'piedra_oro', 'piedra_esmeralda', 'piedra_rubi', 'piedra_zafiro',
  'estrato_0', 'estrato_1', 'estrato_2', 'fosil_0', 'fosil_1', 'fosil_2',
  'empedrado', 'adobe', 'madera', 'teja',
];

export type MineralId = 'azufre' | 'oro' | 'esmeralda' | 'rubi' | 'zafiro';
export type FosilId = 'rompefilas' | 'don_chepe' | 'iman' | 'brasa';
export type MejoraId = 'filo' | 'mango' | 'alcance' | 'suerte' | 'temple';
export type Pantalla = 'titulo' | 'jugando' | 'mochila' | 'tienda' | 'pausa' | 'colapso' | 'desmayo';
export type Calidad = 'bajo' | 'medio' | 'alto';
export type TiendaId = 'tere' | 'abajo';

export const MINERAL_IDS: MineralId[] = ['azufre', 'oro', 'esmeralda', 'rubi', 'zafiro'];
export const MEJORA_IDS: MejoraId[] = ['filo', 'mango', 'alcance', 'suerte', 'temple'];
export const FOSIL_IDS: FosilId[] = ['rompefilas', 'don_chepe', 'iman', 'brasa'];
export const TIENDA_IDS: TiendaId[] = ['tere', 'abajo'];

export const BLOQUE_DE_MINERAL: Record<MineralId, BloqueId> = {
  azufre: BloqueId.piedra_azufre, oro: BloqueId.piedra_oro, esmeralda: BloqueId.piedra_esmeralda,
  rubi: BloqueId.piedra_rubi, zafiro: BloqueId.piedra_zafiro,
};

export function mineralDeBloque(b: number): MineralId | null {
  switch (b) {
    case BloqueId.piedra_azufre: return 'azufre';
    case BloqueId.piedra_oro: return 'oro';
    case BloqueId.piedra_esmeralda: return 'esmeralda';
    case BloqueId.piedra_rubi: return 'rubi';
    case BloqueId.piedra_zafiro: return 'zafiro';
    default: return null;
  }
}
export function esEstrato(b: number): boolean { return b >= BloqueId.estrato_0 && b <= BloqueId.estrato_2; }
export function esFosil(b: number): boolean { return b >= BloqueId.fosil_0 && b <= BloqueId.fosil_2; }
/** Bloques que ningún pico rompe. */
export function esIndestructible(b: number): boolean {
  return b === BloqueId.roca_madre || b === BloqueId.arenisca_jeroglificos || b === BloqueId.empedrado
    || b === BloqueId.adobe || b === BloqueId.madera || b === BloqueId.teja;
}

export interface Vec3 { x: number; y: number; z: number }
export interface Pieza { uid: number; mineral: MineralId; x: number; y: number; rot: 0 | 1 | 2 | 3; valor: number }
export interface Suelto { uid: number; mineral: MineralId; x: number; y: number; z: number; valor: number }
export interface Estrato { id: number; profundidadMax: number; bloquesPicados: number; fecha: string }
export interface Momia {
  uid: number; x: number; y: number; z: number; vx: number; vz: number; vy: number;
  vida: number; reloj: number; rumbo: number; cambioRumbo: number; dano: number; persigue: boolean;
}
export interface Impacto { x: number; y: number; z: number; cara: number; distancia: number }

export interface Jugador {
  pos: Vec3; vel: Vec3; guinada: number; cabeceo: number; enSuelo: boolean;
  calor: number; desmayado: boolean; silbando: boolean;
}

export interface Ajustes {
  calidad: Calidad; volumen: number; silencio: boolean; sensibilidad: number; invertirY: boolean; fov: number;
}

export interface Juego {
  semilla: number;
  mundo: Mundo;
  jugador: Jugador;
  mochila: { piezas: Pieza[] };
  sueltos: Suelto[];
  momias: Momia[];
  chepe: { activo: boolean; x: number; y: number; z: number; reloj: number };
  colones: number;
  mejoras: Record<MejoraId, number>;
  mascota: { comprada: boolean };
  fosilesActivos: FosilId[];
  fosilesMapa: { id: FosilId; x: number; y: number; z: number }[];
  saturacion: Record<TiendaId, Record<MineralId, number>>;
  paradas: number[];
  colapsos: number;
  estratos: Estrato[];
  records: {
    bloquesTotal: number; bloquesPartida: number; mejorPartida: number;
    profundidadPartida: number; profundidadMax: number;
  };
  ajustes: Ajustes;
  tutorial: { movio: boolean; pico: boolean; vendio: boolean };
  pantalla: Pantalla;
  // Estado de ejecución (no se guarda).
  tiendaActual: TiendaId;
  tiempo: number;
  uid: number;
  picado: {
    reloj: number; picando: boolean; fase: number; objetivo: Impacto | null;
    golpesSeg: number; ultimoAvisoLlena: number;
  };
  silbido: { reloj: number };
  colapso: { reloj: number; estrato: Estrato | null };
  desmayoReloj: number;
  relojSaturacion: number;
  relojMomias: number;
  estratoActual: number;
  ascensorSel: number;
  ultimoAvisoFondo: number;
}
