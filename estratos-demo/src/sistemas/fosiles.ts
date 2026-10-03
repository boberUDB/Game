// Fósiles: cada uno cambia cómo se juega durante toda la partida.
import { FOSIL_NUM } from '../config';
import { emit, on } from '../events';
import { estado } from '../state';
import type { FosilId } from '../tipos';
import { celdaEn, daniarCelda } from '../world/mina';

export function tieneFosil(id: FosilId): boolean {
  return estado.fosilesActivos.includes(id);
}

export function activarFosil(id: FosilId, x = 0, y = 0): void {
  if (tieneFosil(id)) return;
  estado.fosilesActivos.push(id);
  if (id === 'don_chepe') {
    estado.chepe = { activo: true, x, y, reloj: FOSIL_NUM.CHEPE_SEG_POR_BLOQUE };
  }
  emit('fosil:hallado', { id });
}

/** Don Chepe rompe el bloque de abajo y baja. Con Rompefilas pica también la columna de la derecha. */
function turnoDeChepe(): void {
  const ch = estado.chepe;
  const abajo = celdaEn(ch.x, ch.y + 1);
  if (!abajo || abajo.tipo === 'borde') { ch.activo = false; return; }
  if (abajo.tipo !== 'aire') daniarCelda(ch.x, ch.y + 1, Infinity);
  if (tieneFosil('rompefilas')) {
    const lado = celdaEn(ch.x + 1, ch.y + 1);
    if (lado && lado.tipo !== 'aire' && lado.tipo !== 'borde') daniarCelda(ch.x + 1, ch.y + 1, Infinity);
  }
  ch.y++;
}

export function actualizarFosiles(dt: number): void {
  const ch = estado.chepe;
  if (!ch.activo) return;
  ch.reloj -= dt;
  if (ch.reloj <= 0) {
    ch.reloj += FOSIL_NUM.CHEPE_SEG_POR_BLOQUE;
    turnoDeChepe();
  }
}

export function iniciarFosiles(): void {
  on('bloque:roto', (e) => {
    if (e.fosilId) activarFosil(e.fosilId, e.x, e.y);
  });
}
