// Golpes, rotura de bloques y minerales sueltos.
import { ESCALA_VALOR_POR_FILA, FOSIL_NUM, JUGADOR, MEJORAS, MINERALES, PICO, SIM } from '../config';
import { emit, on } from '../events';
import { celdaRaton, raton } from '../input';
import { estado, nuevoUid } from '../state';
import { esMineral } from '../tipos';
import type { MineralId } from '../tipos';
import { daniarCelda, esPicable } from '../world/mina';
import { multiplicador } from './colapso';
import { tieneFosil } from './fosiles';
import { agregarAuto } from './mochila';
import { registrarBloque } from './records';

/** Celda apuntada con el ratón, para que el render la resalte. */
export const objetivo = { activo: false, x: 0, y: 0, enAlcance: false };
/** Estado del golpe para animar al minero. */
export const golpe = { activo: false, x: 0, y: 0 };

let reloj = 0;
let tiempo = 0;
let ultimoAvisoLlena = -Infinity;
let hayEmpuje = false, empujeX = 0, empujeY = 0;
let versionMochila = 0;
const intentos = new Map<number, number>(); // uid del suelto -> versión de mochila en que ya se probó

export function danioActual(): number {
  let d = PICO.DANIO_BASE * (1 + MEJORAS.filo.porNivel * estado.mejoras.filo) * multiplicador();
  if (tieneFosil('brasa') && estado.jugador.calor > FOSIL_NUM.BRASA_UMBRAL) d *= FOSIL_NUM.BRASA_MULT;
  return d;
}

export function golpesPorSegActual(): number {
  return PICO.GOLPES_POR_SEG * (1 + MEJORAS.mango.porNivel * estado.mejoras.mango);
}

export function alcanceActual(): number {
  return PICO.ALCANCE_BASE + MEJORAS.alcance.porNivel * estado.mejoras.alcance;
}

function enAlcance(x: number, y: number): boolean {
  const j = estado.jugador;
  // El medio punto extra hace que el alcance base incluya las diagonales.
  return Math.hypot(x - j.x, y - j.y) <= alcanceActual() + 0.5;
}

/** El jugador empuja contra un bloque con el teclado: se pica en este paso. */
export function empujar(x: number, y: number): void {
  hayEmpuje = true; empujeX = x; empujeY = y;
}

export function golpear(x: number, y: number): void {
  if (!esPicable(x, y)) return;
  const j = estado.jugador;
  const danio = danioActual();
  estado.tutorial.pico = true;
  if (x < j.x) j.mirando = 'izq'; else if (x > j.x) j.mirando = 'der';
  daniarCelda(x, y, danio);
  if (tieneFosil('rompefilas')) {
    let dx = Math.sign(x - j.x), dy = Math.sign(y - j.y);
    // En diagonal manda el eje con más distancia.
    if (dx !== 0 && dy !== 0) { if (Math.abs(x - j.x) >= Math.abs(y - j.y)) dy = 0; else dx = 0; }
    if (dx === 0 && dy === 0) dy = 1;
    for (let i = 1; i <= FOSIL_NUM.ROMPEFILAS_EXTRA; i++) daniarCelda(x + dx * i, y + dy * i, danio);
  }
}

function crearSuelto(mineral: MineralId, x: number, y: number): void {
  const valor = Math.round(MINERALES[mineral].valor * (1 + y * ESCALA_VALOR_POR_FILA));
  const suelto = { uid: nuevoUid(), mineral, x, y, valor };
  estado.sueltos.push(suelto);
  emit('suelto:creado', { suelto });
}

function actualizarSueltos(dt: number): void {
  const j = estado.jugador;
  if (j.desmayado) return;
  const s = estado.sueltos;
  const iman = tieneFosil('iman');
  for (let i = s.length - 1; i >= 0; i--) {
    const su = s[i];
    const dx = j.x - su.x, dy = j.y - su.y;
    const d = Math.hypot(dx, dy);
    const yaProbado = intentos.get(su.uid) === versionMochila;
    if (iman && !yaProbado && d <= FOSIL_NUM.IMAN_RADIO && d > 0.6) {
      const v = Math.min(d, FOSIL_NUM.IMAN_VELOCIDAD * dt);
      su.x += (dx / d) * v;
      su.y += (dy / d) * v;
    }
    if (Math.max(Math.abs(dx), Math.abs(dy)) > JUGADOR.RADIO_RECOGER + 0.01 || yaProbado) continue;
    if (agregarAuto(su.mineral, su.valor)) {
      s.splice(i, 1);
      intentos.delete(su.uid);
      emit('mineral:recogido', { mineral: su.mineral, valor: su.valor, x: su.x, y: su.y });
    } else {
      intentos.set(su.uid, versionMochila);
      if (tiempo - ultimoAvisoLlena >= SIM.SEG_ENTRE_AVISOS_LLENA) {
        ultimoAvisoLlena = tiempo;
        emit('mochila:llena', {});
      }
    }
  }
}

export function actualizarPicado(dt: number): void {
  tiempo += dt;
  reloj = Math.max(0, reloj - dt);
  const j = estado.jugador;

  let hay = false, tx = 0, ty = 0;
  objetivo.activo = false;
  const cr = celdaRaton();
  if (cr && esPicable(cr.x, cr.y)) {
    objetivo.activo = true;
    objetivo.x = cr.x; objetivo.y = cr.y;
    objetivo.enAlcance = enAlcance(cr.x, cr.y);
    if (raton.presionado && objetivo.enAlcance) { hay = true; tx = cr.x; ty = cr.y; }
  }
  if (!hay && hayEmpuje && esPicable(empujeX, empujeY)) { hay = true; tx = empujeX; ty = empujeY; }
  hayEmpuje = false;

  golpe.activo = hay && !j.desmayado;
  if (golpe.activo) {
    golpe.x = tx; golpe.y = ty;
    if (reloj <= 0) {
      golpear(tx, ty);
      reloj = 1 / golpesPorSegActual();
    }
  }
  actualizarSueltos(dt);
}

export function iniciarPicado(): void {
  on('bloque:roto', (e) => {
    registrarBloque();
    if (!esMineral(e.tipo)) return;
    crearSuelto(e.tipo, e.x, e.y);
    if (Math.random() < MEJORAS.suerte.porNivel * estado.mejoras.suerte) crearSuelto(e.tipo, e.x, e.y);
  });
  on('mochila:cambio', () => { versionMochila++; });
  on('mina:regenerada', () => { intentos.clear(); });
}
