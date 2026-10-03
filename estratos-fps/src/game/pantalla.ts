// Cambio de pantalla con aviso por el bus de eventos.
import { emit } from './eventos';
import type { Juego, Pantalla } from './tipos';

export function cambiarPantalla(juego: Juego, a: Pantalla): void {
  const de = juego.pantalla;
  if (de === a) return;
  juego.pantalla = a;
  if (a !== 'jugando') { juego.picado.picando = false; juego.picado.reloj = 0; juego.picado.fase = 0; }
  emit('pantalla:cambio', { de, a });
}
