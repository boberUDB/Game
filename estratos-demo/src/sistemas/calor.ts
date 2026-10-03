// Calor del volcán: sube con la profundidad, baja en superficie y al 100 % el minero se desmaya.
import { CALOR, JUGADOR, MEJORAS } from '../config';
import { emit } from '../events';
import { estado } from '../state';

let relojDesmayo = 0;
let ultimoEmitido = -1;

function desmayar(): void {
  const j = estado.jugador;
  const piezas = estado.mochila.piezas;
  const perdidas = Math.floor(piezas.length * CALOR.PIERDE_AL_DESMAYO);
  for (let i = 0; i < perdidas; i++) piezas.splice(Math.floor(Math.random() * piezas.length), 1);
  j.x = j.desdeX = JUGADOR.INICIO_X;
  j.y = j.desdeY = JUGADOR.INICIO_Y;
  j.t = 1;
  j.calor = 0;
  j.desmayado = true;
  relojDesmayo = CALOR.SEG_DESMAYADO;
  emit('mochila:cambio', {});
  emit('calor:desmayo', { perdidas });
}

export function actualizarCalor(dt: number): void {
  const j = estado.jugador;
  if (j.desmayado) {
    relojDesmayo -= dt;
    if (relojDesmayo <= 0) j.desmayado = false;
    return;
  }
  if (j.y <= CALOR.FILA_SUPERFICIE) j.calor -= CALOR.ENFRIA_SUPERFICIE * dt;
  else if (j.y < CALOR.FILA_INICIO) j.calor -= CALOR.ENFRIA_ARRIBA * dt;
  else {
    const temple = Math.max(0, 1 - MEJORAS.temple.porNivel * estado.mejoras.temple);
    j.calor += (j.y - CALOR.FILA_INICIO) * CALOR.GANANCIA_POR_FILA * temple * dt;
  }
  j.calor = Math.min(100, Math.max(0, j.calor));
  if (j.calor >= 100) desmayar();

  const redondo = Math.round(j.calor);
  if (redondo !== ultimoEmitido) {
    ultimoEmitido = redondo;
    emit('calor:cambio', { valor: redondo });
  }
}
