// Sonidos sintetizados con Web Audio API. Sin archivos de audio. Los sonidos se disparan desde eventos.
// Adaptado de estratos-demo/src/audio/sonido.ts.
import { LUGARES, MUNDO, SENSACION } from '../config/balance';
import { on } from '../game/eventos';
import type { Juego, MineralId } from '../game/tipos';
import { mineralDeBloque } from '../game/tipos';

export type SonidoId =
  | 'golpe' | 'rotura' | 'mineral_azufre' | 'mineral_oro' | 'mineral_esmeralda' | 'mineral_rubi' | 'mineral_zafiro'
  | 'recoger' | 'mochila_llena' | 'venta' | 'compra' | 'fosil' | 'momia' | 'momia_muerta' | 'desmayo' | 'colapso'
  | 'latido' | 'ascensor' | 'clic' | 'error' | 'silbido' | 'record' | 'golpeado' | 'torogoz';

let ctx: AudioContext | null = null;
let maestro: GainNode | null = null;
let bufferRuido: AudioBuffer | null = null;
let volumen = 0.7;
let silencio = false;

export function iniciarAudio(): void {
  if (ctx) { void ctx.resume(); return; }
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  maestro = ctx.createGain();
  maestro.connect(ctx.destination);
  bufferRuido = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = bufferRuido.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  aplicarVolumen();
  crearAmbiente();
}

function aplicarVolumen(): void {
  if (maestro) maestro.gain.value = silencio ? 0 : volumen * 0.6;
}

export function ponerVolumen(v: number): void { volumen = Math.min(1, Math.max(0, v)); aplicarVolumen(); }
export function silenciar(b: boolean): void { silencio = b; aplicarVolumen(); }
export function estaSilenciado(): boolean { return silencio; }

function tono(freq: number, dur: number, tipo: OscillatorType, vol: number, cuando = 0, freqFin = freq): void {
  if (!ctx || !maestro) return;
  const t0 = ctx.currentTime + cuando;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, t0);
  if (freqFin !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqFin), t0 + dur);
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(maestro);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function ruido(dur: number, vol: number, corte: number, cuando = 0, corteFin = corte): void {
  if (!ctx || !maestro || !bufferRuido) return;
  const t0 = ctx.currentTime + cuando;
  const src = ctx.createBufferSource();
  src.buffer = bufferRuido;
  src.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.setValueAtTime(corte, t0);
  if (corteFin !== corte) f.frequency.exponentialRampToValueAtTime(Math.max(40, corteFin), t0 + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f).connect(g).connect(maestro);
  src.start(t0, Math.random() * 0.5);
  src.stop(t0 + dur + 0.02);
}

/** Reproduce un sonido. `p` sube o baja el tono (1 = normal). */
export function sonar(id: SonidoId, p = 1): void {
  if (!ctx || ctx.state !== 'running') return;
  switch (id) {
    case 'golpe': ruido(0.06, 0.35, 1800 * p); tono(150 * p, 0.07, 'square', 0.12, 0, 90 * p); break;
    case 'rotura': ruido(0.2, 0.5, 1400, 0, 200); tono(110, 0.14, 'triangle', 0.25, 0, 50); break;
    case 'mineral_azufre': ruido(0.14, 0.3, 2400, 0, 500); tono(740, 0.12, 'triangle', 0.22); tono(988, 0.18, 'triangle', 0.16, 0.06); break;
    case 'mineral_oro': ruido(0.16, 0.3, 2800, 0, 500); tono(880, 0.14, 'triangle', 0.22); tono(1320, 0.2, 'sine', 0.18, 0.06); break;
    case 'mineral_esmeralda': ruido(0.16, 0.3, 3000, 0, 600); tono(660, 0.14, 'sine', 0.22); tono(990, 0.14, 'sine', 0.2, 0.05); tono(1480, 0.22, 'sine', 0.16, 0.1); break;
    case 'mineral_rubi': ruido(0.18, 0.35, 2200, 0, 400); tono(523, 0.18, 'triangle', 0.24); tono(784, 0.18, 'triangle', 0.2, 0.07); tono(1046, 0.24, 'triangle', 0.16, 0.13); break;
    case 'mineral_zafiro': ruido(0.2, 0.35, 3400, 0, 700); [880, 1109, 1319, 1760].forEach((f, i) => tono(f, 0.22, 'sine', 0.18, i * 0.05)); break;
    case 'recoger': tono(660 * p, 0.09, 'sine', 0.25, 0, 1180 * p); break;
    case 'mochila_llena': tono(180, 0.12, 'square', 0.14); tono(140, 0.18, 'square', 0.14, 0.13); break;
    case 'venta': [523, 659, 784, 1047].forEach((f, i) => tono(f, 0.16, 'triangle', 0.22, i * 0.07)); break;
    case 'compra': tono(440, 0.1, 'square', 0.12); tono(660, 0.16, 'square', 0.12, 0.09); break;
    case 'fosil': [392, 494, 587, 784].forEach((f, i) => tono(f, 0.9, 'sine', 0.16, i * 0.11)); ruido(0.5, 0.15, 5000, 0, 600); break;
    case 'momia': tono(90, 0.4, 'sawtooth', 0.14, 0, 60); tono(95, 0.4, 'sawtooth', 0.1, 0.02, 58); break;
    case 'momia_muerta': ruido(0.5, 0.4, 900, 0, 120); tono(120, 0.5, 'triangle', 0.25, 0, 40); break;
    case 'golpeado': ruido(0.12, 0.5, 700, 0, 150); tono(70, 0.2, 'square', 0.3, 0, 40); break;
    case 'desmayo': tono(420, 0.7, 'sawtooth', 0.16, 0, 70); break;
    case 'colapso': ruido(3.6, 0.9, 300, 0, 60); tono(60, 3.2, 'sine', 0.5, 0, 26); break;
    case 'latido': tono(70, 0.14, 'sine', 0.5 * p, 0, 40); tono(62, 0.14, 'sine', 0.35 * p, 0.16, 38); break;
    case 'ascensor': ruido(0.9, 0.25, 500, 0, 200); tono(110, 0.9, 'triangle', 0.12, 0, 160); break;
    case 'silbido': tono(1500, 0.5, 'sine', 0.14, 0, 2300); tono(2300, 0.5, 'sine', 0.12, 0.55, 1700); break;
    case 'record': [659, 784, 988].forEach((f, i) => tono(f, 0.14, 'triangle', 0.18, i * 0.08)); break;
    case 'torogoz': tono(1800, 0.08, 'sine', 0.12, 0, 2600); tono(2600, 0.08, 'sine', 0.12, 0.1, 1900); tono(2200, 0.12, 'sine', 0.1, 0.22, 3000); break;
    case 'clic': tono(520, 0.04, 'square', 0.07); break;
    case 'error': tono(160, 0.12, 'square', 0.1); break;
  }
}

// --- Ambiente: cueva (zumbido grave) y fogata (chisporroteo) ---------------------------------

let ganCueva: GainNode | null = null;
let ganFogata: GainNode | null = null;
let ultimoLatido = 0;
let ultimoChispazo = 0;

function crearAmbiente(): void {
  if (!ctx || !maestro || !bufferRuido) return;
  // Cueva: dos senos graves desafinados y viento filtrado.
  ganCueva = ctx.createGain();
  ganCueva.gain.value = 0;
  ganCueva.connect(maestro);
  for (const f of [48, 50.3, 71]) {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.05;
    o.connect(g).connect(ganCueva);
    o.start();
  }
  const viento = ctx.createBufferSource();
  viento.buffer = bufferRuido;
  viento.loop = true;
  const filtro = ctx.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.value = 220;
  const gv = ctx.createGain();
  gv.gain.value = 0.18;
  viento.connect(filtro).connect(gv).connect(ganCueva);
  viento.start();
  // Fogata: ruido de banda alta con volumen modulado desde actualizarAmbiente.
  ganFogata = ctx.createGain();
  ganFogata.gain.value = 0;
  ganFogata.connect(maestro);
  const fuego = ctx.createBufferSource();
  fuego.buffer = bufferRuido;
  fuego.loop = true;
  const pasaAltos = ctx.createBiquadFilter();
  pasaAltos.type = 'highpass';
  pasaAltos.frequency.value = 1800;
  const gf = ctx.createGain();
  gf.gain.value = 0.12;
  fuego.connect(pasaAltos).connect(gf).connect(ganFogata);
  fuego.start();
}

/** Ajusta el ambiente y el latido según dónde está el jugador. Se llama cada cuadro. */
export function actualizarAmbiente(juego: Juego): void {
  if (!ctx) return;
  const j = juego.jugador;
  const prof = Math.max(0, MUNDO.SUELO_Y - j.pos.y);
  const t = ctx.currentTime;
  if (ganCueva) ganCueva.gain.setTargetAtTime(juego.pantalla === 'titulo' ? 0 : Math.min(1, Math.max(0, (prof - 2) / 8)), t, 0.4);
  if (ganFogata) {
    const d = Math.hypot(j.pos.x - LUGARES.FOGATA.x, j.pos.z - LUGARES.FOGATA.z);
    const v = prof < 3 ? Math.max(0, 1 - d / 26) : 0;
    ganFogata.gain.setTargetAtTime(juego.pantalla === 'titulo' ? 0 : v * 0.9, t, 0.3);
    if (v > 0.15 && t - ultimoChispazo > 0.18 + Math.random() * 0.5) { ultimoChispazo = t; ruido(0.03, 0.12 * v, 4000, 0, 2500); }
  }
  if (j.calor > SENSACION.LATIDO_DESDE_CALOR && juego.pantalla === 'jugando') {
    const intervalo = 1.1 - (j.calor - 70) / 30 * 0.55;
    if (t - ultimoLatido > intervalo) { ultimoLatido = t; sonar('latido', 0.7 + (j.calor - 70) / 60); }
  }
}

/** Conecta cada evento del juego con su sonido. */
export function conectarSonidos(obtener: () => Juego): void {
  on('bloque:golpeado', (e) => {
    const j = obtener();
    const max = j.mundo.vidaMax(e.x, e.y, e.z);
    const f = max > 0 ? 1 - e.restante / max : 0;
    sonar('golpe', 0.85 + f * 0.7);
  });
  on('bloque:roto', (e) => {
    const m: MineralId | null = mineralDeBloque(e.bloque);
    sonar(m ? (`mineral_${m}` as SonidoId) : 'rotura');
  });
  on('mineral:recogido', () => sonar('recoger', 0.9 + Math.random() * 0.3));
  on('mochila:llena', () => sonar('mochila_llena'));
  on('venta:hecha', () => { sonar('venta'); setTimeout(() => sonar('torogoz'), 450); });
  on('mejora:comprada', () => sonar('compra'));
  on('mascota:comprada', () => { sonar('compra'); sonar('torogoz'); });
  on('fosil:hallado', () => sonar('fosil'));
  on('momia:golpe', () => sonar('momia'));
  on('momia:muerta', () => sonar('momia_muerta'));
  on('jugador:golpeado', () => sonar('golpeado'));
  on('calor:desmayo', () => sonar('desmayo'));
  on('colapso:inicio', () => sonar('colapso'));
  on('ascensor:viaje', () => sonar('ascensor'));
  on('silbido:inicio', () => sonar('silbido'));
  on('record:nuevo', () => sonar('record'));
  on('chepe:venta', () => sonar('compra'));
}
