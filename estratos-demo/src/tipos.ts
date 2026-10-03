// Tipos compartidos por todo el juego.

export type TipoBloque =
  | 'aire' | 'tierra' | 'roca' | 'basalto' | 'estrato' | 'fosil'
  | 'azufre' | 'hierro' | 'obsidiana' | 'jade' | 'borde';
export type MineralId = 'azufre' | 'hierro' | 'obsidiana' | 'jade';
export type FosilId = 'rompefilas' | 'don_chepe' | 'iman' | 'brasa';
export type MejoraId = 'filo' | 'mango' | 'alcance' | 'suerte' | 'temple';
export type Pantalla = 'titulo' | 'jugando' | 'mochila' | 'tienda' | 'pausa' | 'colapso';
export type Calidad = 'bajo' | 'medio' | 'alto';
export type Mirando = 'izq' | 'der' | 'arriba' | 'abajo';

export interface Celda {
  tipo: TipoBloque;
  vida: number;
  vidaMax: number;
  estratoId?: number;
  fosilId?: FosilId;
}
export interface Pieza { uid: number; mineral: MineralId; x: number; y: number; rot: 0 | 1 | 2 | 3; valor: number }
export interface Suelto { uid: number; mineral: MineralId; x: number; y: number; valor: number }
export interface Estrato { id: number; profundidadMax: number; bloquesPicados: number; fecha: string }

export interface GameState {
  version: 1;
  pantalla: Pantalla;
  semilla: number;
  mina: { ancho: number; alto: number; celdas: Celda[] }; // índice = y*ancho + x
  jugador: {
    x: number; y: number; desdeX: number; desdeY: number; t: number;
    mirando: Mirando; calor: number; desmayado: boolean;
  };
  chepe: { activo: boolean; x: number; y: number; reloj: number };
  mochila: { piezas: Pieza[] };
  sueltos: Suelto[];
  colones: number;
  mejoras: Record<MejoraId, number>;
  mascota: { comprada: boolean };
  fosilesActivos: FosilId[];
  saturacion: Record<MineralId, number>;
  colapsos: number;
  estratos: Estrato[];
  records: {
    bloquesTotal: number; bloquesPartida: number; mejorPartida: number;
    profundidadPartida: number; profundidadMax: number;
  };
  ajustes: { calidad: Calidad; volumen: number; silencio: boolean };
  tutorial: { movio: boolean; pico: boolean; vendio: boolean };
}

export const MINERAL_IDS: MineralId[] = ['azufre', 'hierro', 'obsidiana', 'jade'];
export const MEJORA_IDS: MejoraId[] = ['filo', 'mango', 'alcance', 'suerte', 'temple'];
export const FOSIL_IDS: FosilId[] = ['rompefilas', 'don_chepe', 'iman', 'brasa'];

export function esMineral(t: TipoBloque): t is MineralId {
  return t === 'azufre' || t === 'hierro' || t === 'obsidiana' || t === 'jade';
}
