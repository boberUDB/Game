// Interfaz común de entrada. Hoy la implementan el teclado y el mouse (tecladoMouse.ts).
// Aquí queda el hueco para controles táctiles: bastaría otra clase que devuelva la misma Entrada.
export type { Entrada } from '../game/entrada';
export { entradaVacia } from '../game/entrada';

import type { Entrada } from '../game/entrada';

export interface FuenteDeEntrada {
  /** Devuelve la entrada acumulada desde la última lectura y consume movimientos y flancos. */
  leer(): Entrada;
  /** Suelta teclas y botones (al perder el foco o cambiar de pantalla). */
  soltarTodo(): void;
}
