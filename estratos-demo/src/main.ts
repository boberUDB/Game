// Arranque y loop único: simulación a paso fijo, render en cada frame.
import '@fontsource/pixelify-sans/400.css';
import '@fontsource/pixelify-sans/700.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './styles/tokens.css';
import './styles/ui.css';

import { conectarSonidos } from './audio/sonido';
import { SIM } from './config';
import { direccion, iniciarInput } from './input';
import { actualizarBloques, construirBloques } from './render/bloques';
import { aplicarCalidad } from './render/calidad';
import { vista } from './render/compartido';
import { actualizarEfectos, iniciarEfectos } from './render/efectos';
import { camara, centrarCamara, iniciarEscena, renderizar } from './render/escena';
import { actualizarSprites, construirSprites } from './render/sprites';
import { actualizarCalor } from './sistemas/calor';
import { actualizarFosiles, iniciarFosiles } from './sistemas/fosiles';
import { actualizarJugador, intentarMover } from './sistemas/jugador';
import { actualizarMascota } from './sistemas/mascota';
import { actualizarPicado, iniciarPicado, objetivo } from './sistemas/picado';
import { actualizarSaturacion } from './sistemas/tienda';
import { cargarEstado, estado, guardarEstado } from './state';
import { actualizarHud, iniciarHud } from './ui/hud';
import { iniciarMochilaUI } from './ui/mochilaUI';
import { actualizarPantallas, iniciarPantallas, pedirColapso } from './ui/pantallas';
import { iniciarTiendaUI } from './ui/tiendaUI';
import { iniciarToasts, toast } from './ui/toasts';

const canvas = document.getElementById('juego') as HTMLCanvasElement;
const carga = cargarEstado();

iniciarEscena(canvas);
construirBloques();
construirSprites();
centrarCamara();
iniciarEfectos();
iniciarInput(canvas, camara);
iniciarPicado();
iniciarFosiles();
conectarSonidos();

iniciarToasts();
iniciarHud();
iniciarMochilaUI();
iniciarTiendaUI(() => { void pedirColapso(); });
iniciarPantallas();
aplicarCalidad(estado.ajustes.calidad);
if (carga === 'corrupto') toast('El guardado estaba dañado. Empezás una mina nueva.', 'alerta');

let acumulado = 0;
let relojGuardado = 0;
let antes = performance.now();

/** Un paso de simulación de 1/60 s. */
function paso(dt: number): void {
  const d = direccion();
  if (d) intentarMover(d[0], d[1]);
  actualizarJugador(dt);
  actualizarPicado(dt);
  actualizarCalor(dt);
  actualizarFosiles(dt);
  actualizarMascota(dt);
  actualizarSaturacion(dt);
  relojGuardado += dt;
  if (relojGuardado >= SIM.GUARDAR_CADA_SEG) { relojGuardado = 0; guardarEstado(); }
}

function frame(ahora: number): void {
  requestAnimationFrame(frame);
  const dtReal = Math.min(0.1, (ahora - antes) / 1000);
  antes = ahora;
  if (document.hidden) return;

  if (estado.pantalla === 'jugando') {
    if (vista.pausaImpacto > 0) vista.pausaImpacto -= dtReal;
    else {
      let escala = 1;
      if (vista.tiempoLento > 0) { vista.tiempoLento -= dtReal; escala = 0.3; }
      acumulado += dtReal * escala;
      let pasos = 0;
      while (acumulado >= SIM.PASO && pasos < SIM.MAX_PASOS) { paso(SIM.PASO); acumulado -= SIM.PASO; pasos++; }
      if (pasos === SIM.MAX_PASOS) acumulado = 0;
    }
  } else acumulado = 0;

  actualizarPantallas(dtReal);
  actualizarBloques(dtReal);
  actualizarSprites(dtReal, estado.pantalla === 'jugando', objetivo);
  actualizarEfectos(dtReal);
  actualizarHud(dtReal);
  renderizar(dtReal);
}

if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__estratos = { estado };
requestAnimationFrame(frame);
