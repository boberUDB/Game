// Bus de eventos tipado. La lógica emite; render, audio e interfaz escuchan.
import type { Estrato, FosilId, MejoraId, MineralId, Pantalla, TiendaId } from './tipos';

export interface Eventos {
  'bloque:golpeado': { x: number; y: number; z: number; restante: number };
  'bloque:roto': { x: number; y: number; z: number; bloque: number; fosilId?: FosilId };
  'suelto:creado': { uid: number };
  'mineral:recogido': { mineral: MineralId; valor: number };
  'mochila:cambio': Record<string, never>;
  'mochila:llena': Record<string, never>;
  'venta:hecha': { total: number; tiendaId: TiendaId; bonusLlena: boolean; bonusMascota: boolean };
  'mejora:comprada': { id: MejoraId; nivel: number };
  'mascota:comprada': Record<string, never>;
  'calor:cambio': { valor: number };
  'calor:desmayo': { perdidas: number };
  'chepe:venta': { total: number };
  'momia:golpe': { uid: number };
  'momia:muerta': { uid: number; colones: number };
  'jugador:golpeado': Record<string, never>;
  'fosil:hallado': { id: FosilId };
  'estrato:entrada': { estratoId: number };
  'colapso:inicio': { estrato: Estrato };
  'colapso:fin': { multiplicador: number };
  'mundo:regenerado': Record<string, never>;
  'ascensor:viaje': { parada: number };
  'silbido:inicio': Record<string, never>;
  'silbido:cancelado': Record<string, never>;
  'record:nuevo': { tipo: string; valor: number };
  'pantalla:cambio': { de: Pantalla; a: Pantalla };
}

type Oyente<K extends keyof Eventos> = (datos: Eventos[K]) => void;
const oyentes: { [K in keyof Eventos]?: Oyente<K>[] } = {};

export function on<K extends keyof Eventos>(evento: K, fn: Oyente<K>): void {
  ((oyentes[evento] ??= []) as Oyente<K>[]).push(fn);
}

export function off<K extends keyof Eventos>(evento: K, fn: Oyente<K>): void {
  const lista = oyentes[evento] as Oyente<K>[] | undefined;
  if (!lista) return;
  const i = lista.indexOf(fn);
  if (i >= 0) lista.splice(i, 1);
}

export function emit<K extends keyof Eventos>(evento: K, datos: Eventos[K]): void {
  const lista = oyentes[evento] as Oyente<K>[] | undefined;
  if (!lista) return;
  for (const fn of [...lista]) fn(datos);
}
