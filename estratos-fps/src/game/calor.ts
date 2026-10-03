// Calor del volcán: sube con la profundidad, baja en superficie y al 100 % el minero se desmaya.
import { CALOR, MUNDO } from '../config/balance';
import { emit } from './eventos';
import { factorCalor } from './mejoras';
import { aparecerEnSuperficie } from './jugador';
import { profundidadActual } from './records';
import type { Juego } from './tipos';

/** Cambia de pantalla emitiendo el evento. Vive aquí para que calor.ts no importe juego.ts. */
export function desmayar(juego: Juego): void {
  const j = juego.jugador;
  const piezas = juego.mochila.piezas;
  const perdidas = Math.floor(piezas.length * CALOR.PIERDE_AL_DESMAYO);
  for (let i = 0; i < perdidas; i++) piezas.splice(Math.floor(Math.random() * piezas.length), 1);
  j.calor = 0;
  j.desmayado = true;
  j.silbando = false;
  juego.momias = [];
  juego.desmayoReloj = CALOR.SEG_DESMAYADO;
  aparecerEnSuperficie(juego);
  emit('mochila:cambio', {});
  emit('calor:desmayo', { perdidas });
}

let ultimoEmitido = -1;

export function actualizarCalor(juego: Juego, dt: number): void {
  const j = juego.jugador;
  if (j.desmayado) return;
  const prof = profundidadActual(juego);
  if (prof < MUNDO.SUPERFICIE_CALOR) j.calor -= CALOR.ENFRIA_SUPERFICIE * dt;
  else if (prof < CALOR.DESDE) j.calor -= CALOR.ENFRIA_ARRIBA * dt;
  else j.calor += (prof - CALOR.DESDE) * CALOR.GANANCIA_POR_METRO * factorCalor(juego) * dt;
  j.calor = Math.min(100, Math.max(0, j.calor));
  const redondo = Math.round(j.calor);
  if (redondo !== ultimoEmitido) {
    ultimoEmitido = redondo;
    emit('calor:cambio', { valor: redondo });
  }
}

/** Suma calor de golpe (la momia). */
export function sumarCalor(juego: Juego, cantidad: number): void {
  juego.jugador.calor = Math.min(100, juego.jugador.calor + cantidad);
}
