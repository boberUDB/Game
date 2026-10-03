// Bus de eventos tipado. Los sistemas emiten; render, audio e interfaz escuchan.
import type { Calidad, Estrato, FosilId, MejoraId, MineralId, Pantalla, Suelto, TipoBloque } from './tipos';

export interface Eventos {
  'bloque:golpeado': { x: number; y: number; danio: number; restante: number };
  'bloque:roto': { x: number; y: number; tipo: TipoBloque; fosilId?: FosilId };
  'suelto:creado': { suelto: Suelto };
  'mineral:recogido': { mineral: MineralId; valor: number; x: number; y: number };
  'mochila:cambio': {};
  'mochila:llena': {};
  'venta:hecha': { total: number; bonusLlena: boolean; bonusMascota: boolean };
  'mejora:comprada': { id: MejoraId; nivel: number };
  'mascota:comprada': {};
  'calor:cambio': { valor: number };
  'calor:desmayo': { perdidas: number };
  'fosil:hallado': { id: FosilId };
  'colapso:inicio': { estrato: Estrato };
  'colapso:fin': { multiplicador: number };
  'mina:regenerada': {};
  'record:nuevo': { tipo: 'bloques' | 'profundidad'; valor: number };
  'pantalla:cambio': { de: Pantalla; a: Pantalla };
  'calidad:cambio': { calidad: Calidad };
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
  for (let i = 0; i < lista.length; i++) lista[i](datos);
}
