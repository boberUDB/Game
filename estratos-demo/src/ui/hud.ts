// HUD: colones, profundidad, bloques, calor, mini mochila, fósiles y pistas. Solo escribe en el DOM cuando algo cambia.
import { FOSILES, MOCHILA } from '../config';
import { on } from '../events';
import { multiplicador } from '../sistemas/colapso';
import { estaLlena, mapaMinerales } from '../sistemas/mochila';
import { cercaDeTienda } from '../sistemas/tienda';
import { estado } from '../state';
import { estratoEnFila } from '../world/generacion';
import { colones, toast } from './toasts';

const $ = (id: string) => document.getElementById(id)!;
let elColones: HTMLElement, elProf: HTMLElement, elEstrato: HTMLElement, elMult: HTMLElement, elBloques: HTMLElement;
let elFosiles: HTMLElement, elCalor: HTMLElement, elRelleno: HTMLElement, elVineta: HTMLElement;
let elPista: HTMLElement, elAvisoTienda: HTMLElement, elMini: HTMLElement;
const celdasMini: HTMLElement[] = [];

// Últimos valores escritos, para no tocar el DOM de más.
let vColones = -1, vProf = -1, vBloques = -1, vMult = -1, vCalor = -1, vPista = '', vTienda = false, vEstrato = -2;
let mostrado = 0; // colones que se ven, cuentan hacia el valor real

function pintarMini(): void {
  const mapa = mapaMinerales();
  for (let i = 0; i < celdasMini.length; i++) {
    const el = celdasMini[i];
    const antes = el.dataset.mineral;
    const m = mapa[i];
    if (m) {
      if (antes !== m) {
        el.dataset.mineral = m;
        delete el.dataset.late;
        void el.offsetWidth;
        el.dataset.late = '';
      }
    } else if (antes) { delete el.dataset.mineral; delete el.dataset.late; }
  }
  if (estaLlena()) elMini.dataset.llena = ''; else delete elMini.dataset.llena;
}

function pintarFosiles(): void {
  elFosiles.replaceChildren();
  for (const id of estado.fosilesActivos) {
    const li = document.createElement('li');
    li.textContent = FOSILES[id].nombre;
    li.title = FOSILES[id].detalle;
    elFosiles.appendChild(li);
  }
}

function pistaActual(): string {
  const t = estado.tutorial;
  if (!t.movio) return 'Movete con WASD';
  if (!t.pico) return 'Mantené el clic sobre un bloque';
  if (!t.vendio && estado.mochila.piezas.length >= 3) return 'Volvé arriba y apretá E en la tienda';
  return '';
}

export function iniciarHud(): void {
  elColones = $('hud-colones'); elProf = $('hud-profundidad'); elEstrato = $('hud-estrato');
  elMult = $('hud-multiplicador'); elBloques = $('hud-bloques'); elFosiles = $('hud-fosiles');
  elCalor = $('barra-calor'); elRelleno = elCalor.querySelector('.calor-relleno') as HTMLElement;
  elVineta = $('vineta-calor'); elPista = $('pista'); elAvisoTienda = $('aviso-tienda'); elMini = $('mini-mochila');
  for (let i = 0; i < MOCHILA.COLUMNAS * MOCHILA.FILAS; i++) {
    const s = document.createElement('span');
    elMini.appendChild(s);
    celdasMini.push(s);
  }
  mostrado = estado.colones;
  pintarMini();
  pintarFosiles();

  on('mochila:cambio', pintarMini);
  on('fosil:hallado', pintarFosiles);
  on('mina:regenerada', () => { pintarFosiles(); mostrado = estado.colones; vEstrato = -2; });
  on('mochila:llena', () => toast('¡Púchica, mochila llena! Acomodá o andá a vender.', 'alerta'));
  on('calor:desmayo', (e) => toast(
    e.perdidas > 0 ? `Te desmayaste del calor. Perdiste ${e.perdidas} ${e.perdidas === 1 ? 'pieza' : 'piezas'}.` : 'Te desmayaste del calor.',
    'alerta',
  ));
  on('record:nuevo', (e) => toast(
    e.tipo === 'profundidad' ? `Récord de profundidad: ${e.valor} m` : 'Superaste tu récord de bloques en una partida',
    'bien',
  ));
}

export function actualizarHud(dt: number): void {
  const j = estado.jugador;

  // Colones: cuentan hacia arriba en unos 600 ms.
  if (mostrado !== estado.colones) {
    const dif = estado.colones - mostrado;
    const paso = dif * Math.min(1, dt / 0.15);
    mostrado = Math.abs(dif) < 1 ? estado.colones : mostrado + paso;
  }
  const c = Math.round(mostrado);
  if (c !== vColones) {
    if (c > vColones && vColones >= 0) { delete elColones.dataset.sube; void elColones.offsetWidth; elColones.dataset.sube = ''; }
    vColones = c;
    elColones.textContent = colones(c);
  }

  if (j.y !== vProf) {
    vProf = j.y;
    elProf.textContent = j.y + ' m';
    const est = estratoEnFila(j.y, estado.estratos);
    const id = est ? est.id : -1;
    if (id !== vEstrato) {
      vEstrato = id;
      elEstrato.hidden = !est;
      if (est) {
        elEstrato.textContent = 'Estrato ' + est.id;
        toast(`Estrato ${est.id}, llegaste a ${est.profundidadMax} m`, 'bien');
      }
    }
  }

  const b = estado.records.bloquesTotal;
  if (b !== vBloques) {
    vBloques = b;
    elBloques.textContent = b.toLocaleString('es-SV') + (b === 1 ? ' bloque picado' : ' bloques picados');
  }

  const m = multiplicador();
  if (m !== vMult) {
    vMult = m;
    elMult.hidden = m <= 1;
    elMult.textContent = 'x' + m.toLocaleString('es-SV');
  }

  const calor = Math.round(j.calor);
  if (calor !== vCalor) {
    vCalor = calor;
    elRelleno.style.transform = `scaleX(${calor / 100})`;
    elCalor.setAttribute('aria-valuenow', String(calor));
    elCalor.dataset.nivel = calor >= 90 ? 'critico' : calor >= 60 ? 'alto' : 'normal';
    elVineta.style.opacity = String(Math.max(0, (calor - 60) / 40));
  }

  const p = pistaActual();
  if (p !== vPista) {
    vPista = p;
    elPista.hidden = p === '';
    elPista.textContent = p;
  }

  const t = estado.pantalla === 'jugando' && cercaDeTienda();
  if (t !== vTienda) {
    vTienda = t;
    elAvisoTienda.hidden = !t;
  }
}
