// Consultas y mutación de las celdas de la mina.
import { emit } from '../events';
import { estado } from '../state';
import type { Celda } from '../tipos';

export function celdaEn(x: number, y: number): Celda | null {
  const m = estado.mina;
  if (x < 0 || y < 0 || x >= m.ancho || y >= m.alto) return null;
  return m.celdas[y * m.ancho + x];
}

export function esTransitable(x: number, y: number): boolean {
  const c = celdaEn(x, y);
  return c !== null && c.tipo === 'aire';
}

export function esPicable(x: number, y: number): boolean {
  const c = celdaEn(x, y);
  return c !== null && c.tipo !== 'aire' && c.tipo !== 'borde';
}

/** Aplica daño a una celda. Devuelve true si se rompió. */
export function daniarCelda(x: number, y: number, danio: number): boolean {
  const c = celdaEn(x, y);
  if (!c || c.tipo === 'aire' || c.tipo === 'borde') return false;
  c.vida -= danio;
  if (c.vida <= 0) {
    const tipo = c.tipo;
    const fosilId = c.fosilId;
    c.tipo = 'aire';
    c.vida = 0;
    delete c.fosilId;
    emit('bloque:roto', { x, y, tipo, fosilId });
    return true;
  }
  emit('bloque:golpeado', { x, y, danio, restante: c.vida });
  return false;
}
