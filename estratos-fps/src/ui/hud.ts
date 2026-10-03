// HUD: colones, multiplicador, profundidad, récord, calor, mini mochila, fósiles, mascota, bloque apuntado y pistas.
import { CALOR, MUNDO, SILBIDO } from '../config/balance';
import { objetivoInteraccion } from '../game/ascensor';
import { multiplicador } from '../game/colapso';
import { on } from '../game/eventos';
import { estaLlena, mapaMinerales } from '../game/mochila';
import { NOMBRE_BLOQUE, TEXTOS, TEXTO_FOSIL, formatoColones, nombreMineral } from '../game/textos';
import type { Juego } from '../game/tipos';
import { FOSIL_IDS } from '../game/tipos';
import { aviso, numeroFlotante } from './avisos';

const $ = (id: string) => document.getElementById(id)!;
const cache: Record<string, string> = {};

function poner(el: HTMLElement, clave: string, valor: string): void {
  if (cache[clave] === valor) return;
  cache[clave] = valor;
  el.textContent = valor;
}

export function iniciarHud(obtener: () => Juego): void {
  const cuadros: HTMLElement[] = [];
  const mini = $('hud-mochila');
  for (let i = 0; i < 16; i++) { const s = document.createElement('span'); mini.appendChild(s); cuadros.push(s); }
  (mini as HTMLElement & { _cuadros?: HTMLElement[] })._cuadros = cuadros;

  on('record:nuevo', (e) => aviso(e.tipo === 'bloques' ? `${TEXTOS.record} ${e.valor} bloques en una partida` : `${TEXTOS.record} ${e.valor} m de profundidad`, 'record'));
  on('mochila:llena', () => aviso(TEXTOS.mochilaLlena, 'alerta'));
  on('mineral:recogido', (e) => numeroFlotante(`+${formatoColones(e.valor)} ${nombreMineral(e.mineral)}`, { mineral: e.mineral }));
  on('venta:hecha', (e) => numeroFlotante(`+${formatoColones(e.total)}`, { venta: true }));
  on('chepe:venta', (e) => numeroFlotante(`+${formatoColones(e.total)} Don Chepe`));
  on('momia:muerta', (e) => numeroFlotante(`+${formatoColones(e.colones)}`, { venta: true }));
  on('calor:desmayo', () => aviso(TEXTOS.desmayo, 'malo', 4500));
  on('silbido:cancelado', () => aviso(TEXTOS.silbidoCancelado, 'malo'));
  on('jugador:golpeado', () => aviso('La momia te golpeó: +20 % de calor', 'malo', 1800));
  on('ascensor:viaje', (e) => aviso(e.parada === 0 ? 'Llegaste a la superficie' : `Llegaste a la parada de ${e.parada} m`, 'info', 2200));
  void obtener;
}

export function actualizarHud(juego: Juego): void {
  const j = juego.jugador;
  const prof = Math.max(0, MUNDO.SUELO_Y - j.pos.y);
  poner($('hud-colones'), 'col', formatoColones(juego.colones));
  poner($('hud-prof'), 'prof', `${Math.floor(prof)} m`);
  const mult = multiplicador(juego);
  const multEl = $('hud-mult');
  multEl.hidden = mult <= 1;
  poner(multEl, 'mult', `x${mult.toLocaleString('es-SV')}`);
  poner($('hud-record'), 'rec', `Récord: ${juego.records.profundidadMax} m, ${juego.records.bloquesTotal} bloques picados`);

  // Calor.
  const calor = $('hud-calor');
  const nivel = j.calor >= CALOR.CRITICO ? 'critico' : j.calor >= CALOR.ALTO ? 'alto' : 'normal';
  if (calor.dataset.nivel !== nivel) { calor.dataset.nivel = nivel; $('vineta-calor').dataset.nivel = nivel; }
  const pct = Math.round(j.calor);
  if (cache.calor !== String(pct)) {
    cache.calor = String(pct);
    (calor.querySelector('.relleno') as HTMLElement).style.transform = `scaleX(${j.calor / 100})`;
    calor.setAttribute('aria-valuenow', String(pct));
  }

  // Mini mochila.
  const mini = $('hud-mochila') as HTMLElement & { _cuadros?: HTMLElement[] };
  const mapa = mapaMinerales(juego).map((m) => m ?? '').join(',');
  if (cache.mini !== mapa) {
    cache.mini = mapa;
    mapaMinerales(juego).forEach((m, i) => { if (m) mini._cuadros![i].dataset.mineral = m; else delete mini._cuadros![i].dataset.mineral; });
    mini.dataset.llena = String(estaLlena(juego));
  }

  // Fósiles activos y mascota.
  const claveF = juego.fosilesActivos.join(',');
  if (cache.fosiles !== claveF) {
    cache.fosiles = claveF;
    const ul = $('hud-fosiles');
    ul.replaceChildren();
    for (const id of FOSIL_IDS) {
      if (!juego.fosilesActivos.includes(id)) continue;
      const li = document.createElement('li');
      li.title = TEXTO_FOSIL[id].nombre;
      const img = document.createElement('img');
      img.src = `./iconos/fosil_${id}.png`;
      img.alt = TEXTO_FOSIL[id].nombre;
      li.appendChild(img);
      ul.appendChild(li);
    }
  }
  ($('hud-mascota') as HTMLImageElement).hidden = !juego.mascota.comprada;

  // Bloque apuntado.
  const info = $('bloque-info');
  const o = juego.pantalla === 'jugando' ? juego.picado.objetivo : null;
  if (o) {
    const b = juego.mundo.get(o.x, o.y, o.z);
    const max = juego.mundo.vidaMax(o.x, o.y, o.z);
    const resto = juego.mundo.vidaRestante(o.x, o.y, o.z);
    const nombre = NOMBRE_BLOQUE[b] ?? 'Bloque';
    poner(info.querySelector('.nombre') as HTMLElement, 'bn', nombre);
    poner(info.querySelector('.vida') as HTMLElement, 'bv', max > 0 ? `${Math.ceil(resto)} / ${Math.ceil(max)}` : 'indestructible');
    info.hidden = false;
  } else info.hidden = true;

  // Interacción con E.
  const inter = $('interaccion');
  const t = juego.pantalla === 'jugando' ? objetivoInteraccion(juego) : null;
  if (t) { poner(inter, 'inter', t.texto); inter.hidden = false; } else inter.hidden = true;

  // Silbido.
  const sil = $('silbido');
  sil.hidden = !j.silbando;
  if (j.silbando) {
    const p = 1 - juego.silbido.reloj / SILBIDO.SEG;
    (sil.querySelector('.relleno') as HTMLElement).style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    sil.setAttribute('aria-valuenow', String(Math.round(p * 100)));
  }

  // Pistas del principio y aviso del fondo.
  const pista = $('pista');
  let texto = '';
  if (juego.pantalla === 'jugando') {
    if (prof > juego.mundo.profundidadMina - 6 && prof > 8) texto = TEXTOS.algoDuerme;
    else if (!juego.tutorial.movio) texto = TEXTOS.pistaMoverse;
    else if (!juego.tutorial.pico) texto = TEXTOS.pistaPicar;
    else if (!juego.tutorial.vendio && juego.mochila.piezas.length > 0) texto = TEXTOS.pistaVender;
  }
  pista.hidden = texto === '';
  if (texto) poner(pista, 'pista', texto);
}
