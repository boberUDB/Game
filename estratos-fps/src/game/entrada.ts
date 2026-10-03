// Interfaz de entrada que recibe pasoJuego. La implementa src/input/ (hoy teclado y mouse).
// Vive aquí para que la lógica no dependa de la capa de entrada; src/input/entrada.ts la reexporta.
export interface Entrada {
  moverX: number;      // -1 izquierda, 1 derecha
  moverZ: number;      // -1 atrás, 1 adelante
  mirarDX: number;     // píxeles desde el paso anterior
  mirarDY: number;
  picar: boolean;      // sostenido
  correr: boolean;     // sostenido
  saltar: boolean;
  interactuar: boolean; // flanco
  subir: boolean;       // flanco
}

export function entradaVacia(): Entrada {
  return { moverX: 0, moverZ: 0, mirarDX: 0, mirarDY: 0, picar: false, correr: false, saltar: false, interactuar: false, subir: false };
}
