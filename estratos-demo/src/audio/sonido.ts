// Sonidos sintetizados con Web Audio API. Sin archivos de audio.
import { on } from '../events';
import { estado } from '../state';
import { celdaEn } from '../world/mina';

export type SonidoId =
  | 'golpe' | 'rotura' | 'mineral' | 'recoger' | 'mochila_llena' | 'venta' | 'compra'
  | 'fosil' | 'desmayo' | 'colapso' | 'latido' | 'clic' | 'error';

let ctx: AudioContext | null = null;
let maestro: GainNode | null = null;
let bufferRuido: AudioBuffer | null = null;

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
}

function aplicarVolumen(): void {
  if (!maestro) return;
  maestro.gain.value = estado.ajustes.silencio ? 0 : estado.ajustes.volumen * 0.6;
}

export function ponerVolumen(v: number): void {
  estado.ajustes.volumen = Math.min(1, Math.max(0, v));
  aplicarVolumen();
}

export function silenciar(b: boolean): void {
  estado.ajustes.silencio = b;
  aplicarVolumen();
}

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
    case 'golpe':
      ruido(0.06, 0.35, 1800 * p);
      tono(150 * p, 0.07, 'square', 0.12, 0, 90 * p);
      break;
    case 'rotura':
      ruido(0.2, 0.5, 1400, 0, 200);
      tono(110, 0.14, 'triangle', 0.25, 0, 50);
      break;
    case 'mineral':
      ruido(0.16, 0.35, 2600, 0, 400);
      tono(880 * p, 0.12, 'triangle', 0.22);
      tono(1320 * p, 0.2, 'triangle', 0.18, 0.06);
      break;
    case 'recoger':
      tono(660 * p, 0.09, 'sine', 0.25, 0, 1180 * p);
      break;
    case 'mochila_llena':
      tono(180, 0.12, 'square', 0.14);
      tono(140, 0.18, 'square', 0.14, 0.13);
      break;
    case 'venta':
      [523, 659, 784, 1047].forEach((f, i) => tono(f, 0.16, 'triangle', 0.22, i * 0.07));
      break;
    case 'compra':
      tono(440, 0.1, 'square', 0.12);
      tono(660, 0.16, 'square', 0.12, 0.09);
      break;
    case 'fosil':
      [392, 494, 587, 784].forEach((f, i) => tono(f, 0.9, 'sine', 0.16, i * 0.11));
      ruido(0.5, 0.15, 5000, 0, 600);
      break;
    case 'desmayo':
      tono(420, 0.7, 'sawtooth', 0.16, 0, 70);
      break;
    case 'colapso':
      ruido(3.2, 0.9, 300, 0, 60);
      tono(60, 2.8, 'sine', 0.5, 0, 28);
      break;
    case 'latido':
      tono(70, 0.14, 'sine', 0.5 * p, 0, 40);
      break;
    case 'clic':
      tono(520, 0.04, 'square', 0.07);
      break;
    case 'error':
      tono(160, 0.12, 'square', 0.1);
      break;
  }
}

/** Conecta cada evento del juego con su sonido. */
export function conectarSonidos(): void {
  on('bloque:golpeado', (e) => {
    const c = celdaEn(e.x, e.y);
    // El tono sube a medida que el bloque pierde vida.
    const f = c && c.vidaMax > 0 ? 1 - c.vida / c.vidaMax : 0;
    sonar('golpe', 0.85 + f * 0.7);
  });
  on('bloque:roto', (e) => sonar(e.tipo === 'azufre' || e.tipo === 'hierro' || e.tipo === 'obsidiana' || e.tipo === 'jade' ? 'mineral' : 'rotura'));
  on('mineral:recogido', () => sonar('recoger', 0.9 + Math.random() * 0.3));
  on('mochila:llena', () => sonar('mochila_llena'));
  on('venta:hecha', () => sonar('venta'));
  on('mejora:comprada', () => sonar('compra'));
  on('mascota:comprada', () => sonar('fosil'));
  on('fosil:hallado', () => sonar('fosil'));
  on('calor:desmayo', () => sonar('desmayo'));
  on('record:nuevo', () => sonar('compra'));
}
