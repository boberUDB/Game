// Texturas pixel art de 16x16 generadas por código, con una sola paleta.
import * as THREE from 'three';
import { MINERALES, PALETA } from '../config';
import { mulberry32 } from '../rng';
import type { MineralId, TipoBloque } from '../tipos';
import { aTextura, css, lienzo } from './compartido';

const T = 16;
const TONOS = [0.8, 0.9, 1, 1, 1.1];
type Ctx = CanvasRenderingContext2D;

function px(ctx: Ctx, x: number, y: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function ruido(ctx: Ctx, base: number, rnd: () => number): void {
  for (let y = 0; y < T; y++)
    for (let x = 0; x < T; x++) px(ctx, x, y, css(base, TONOS[Math.floor(rnd() * TONOS.length)]));
}

/** Borde claro arriba e izquierda, oscuro abajo y derecha: da lectura de bloque. */
function bisel(ctx: Ctx): void {
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fillRect(0, 0, T, 1); ctx.fillRect(0, 0, 1, T);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, T - 1, T, 1); ctx.fillRect(T - 1, 0, 1, T);
}

function pintarTerreno(ctx: Ctx, tipo: TipoBloque, rnd: () => number): void {
  switch (tipo) {
    case 'tierra':
      ruido(ctx, PALETA.tierra, rnd);
      for (let i = 0; i < 5; i++) {
        const x = 1 + Math.floor(rnd() * 13), y = 1 + Math.floor(rnd() * 13);
        ctx.fillStyle = css(PALETA.tierra, 0.62);
        ctx.fillRect(x, y, 2, 1);
      }
      break;
    case 'roca':
      ruido(ctx, PALETA.roca, rnd);
      for (let i = 0; i < 3; i++) {
        let x = 2 + Math.floor(rnd() * 12), y = 1 + Math.floor(rnd() * 6);
        for (let k = 0; k < 6; k++) {
          px(ctx, x, y, css(PALETA.roca, 0.55));
          px(ctx, x + 1, y, css(PALETA.roca, 1.2));
          y++; if (rnd() < 0.5) x += rnd() < 0.5 ? -1 : 1;
          if (x < 1 || x > 14 || y > 14) break;
        }
      }
      break;
    case 'basalto':
      ruido(ctx, PALETA.basalto, rnd);
      for (const x of [4, 9, 13]) {
        ctx.fillStyle = css(PALETA.basalto, 0.6);
        ctx.fillRect(x, 0, 1, T);
        ctx.fillStyle = css(PALETA.basalto, 1.25);
        ctx.fillRect(x + 1, 0, 1, T);
      }
      break;
    case 'estrato':
    case 'fosil': {
      // Casi blanco: el color de cada estrato se aplica por instancia.
      const bandas = [0.95, 0.8, 0.9, 0.72, 0.88, 0.78];
      for (let y = 0; y < T; y++) {
        const f = bandas[Math.floor(y / 3) % bandas.length];
        for (let x = 0; x < T; x++) {
          const onda = (x + Math.floor(y / 3) * 5) % 7 === 0 ? 0.9 : 1;
          const v = Math.round(235 * f * onda * (0.96 + rnd() * 0.08));
          px(ctx, x, y, `rgb(${v},${v},${v})`);
        }
      }
      break;
    }
    case 'borde':
      ruido(ctx, PALETA.borde, rnd);
      for (let i = 0; i < 4; i++) px(ctx, Math.floor(rnd() * T), Math.floor(rnd() * T), css(PALETA.lava, 0.35));
      break;
    default:
      ruido(ctx, PALETA.roca, rnd);
  }
}

const ANFITRION: Record<MineralId, TipoBloque> = {
  azufre: 'tierra', hierro: 'roca', obsidiana: 'roca', jade: 'basalto',
};

export interface TexturaBloque { map: THREE.Texture; emissiveMap?: THREE.Texture }

export function texturaBloque(tipo: TipoBloque): TexturaBloque {
  const rnd = mulberry32(tipo.length * 977 + tipo.charCodeAt(0) * 31 + tipo.charCodeAt(1));
  const [c, ctx] = lienzo(T, T);
  const mineral = tipo in MINERALES ? (tipo as MineralId) : null;

  pintarTerreno(ctx, mineral ? ANFITRION[mineral] : tipo, rnd);
  bisel(ctx);

  if (!mineral && tipo !== 'fosil') return { map: aTextura(c) };

  const [ce, ctxE] = lienzo(T, T);
  ctxE.fillStyle = '#000';
  ctxE.fillRect(0, 0, T, T);

  if (mineral) {
    const color = MINERALES[mineral].color;
    const grupos = mineral === 'azufre' ? 5 : 4;
    for (let g = 0; g < grupos; g++) {
      const x = 2 + Math.floor(rnd() * 10), y = 2 + Math.floor(rnd() * 10);
      const forma = [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [1, 2]].slice(0, 3 + Math.floor(rnd() * 4));
      for (const [dx, dy] of forma) {
        px(ctx, x + dx, y + dy, css(color, 0.9));
        px(ctxE, x + dx, y + dy, css(color, 1));
      }
      px(ctx, x, y, css(color, 1.5));
      px(ctxE, x, y, css(color, 1.5));
    }
  } else {
    // Fósil: un costillar con cráneo, en color hueso que brilla dorado.
    const hueso: [number, number][] = [];
    for (let x = 4; x <= 12; x++) hueso.push([x, 8]);
    for (const x of [6, 8, 10, 12]) { hueso.push([x, 6], [x, 7], [x, 9], [x, 10]); }
    for (let y = 6; y <= 9; y++) for (let x = 2; x <= 4; x++) hueso.push([x, y]);
    for (const [x, y] of hueso) {
      px(ctx, x, y, '#fff6dc');
      px(ctxE, x, y, css(PALETA.oro, 1));
    }
    px(ctx, 3, 7, '#3a2a1a');
    px(ctxE, 3, 7, '#000');
  }
  return { map: aTextura(c), emissiveMap: aTextura(ce) };
}

/** Textura oscura que se repite: pared del fondo, rellenos y suelo lejano. */
export function texturaRelleno(base: number, brillo: number, repX: number, repY: number): THREE.Texture {
  const rnd = mulberry32(base);
  const [c, ctx] = lienzo(T, T);
  for (let y = 0; y < T; y++)
    for (let x = 0; x < T; x++) px(ctx, x, y, css(base, brillo * TONOS[Math.floor(rnd() * TONOS.length)]));
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = css(base, brillo * 0.6);
    ctx.fillRect(Math.floor(rnd() * 14), Math.floor(rnd() * 15), 2, 1);
  }
  const t = aTextura(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repX, repY);
  return t;
}

/** Tres etapas de grietas para el bloque que se está picando. */
export function texturasGrieta(): THREE.Texture[] {
  const res: THREE.Texture[] = [];
  const rnd = mulberry32(4242);
  const [c, ctx] = lienzo(T, T);
  for (let etapa = 0; etapa < 3; etapa++) {
    for (let rama = 0; rama < 3; rama++) {
      let x = 8, y = 8;
      const largo = 4 + etapa * 3;
      let dx = rnd() < 0.5 ? -1 : 1, dy = rnd() < 0.5 ? -1 : 1;
      for (let k = 0; k < largo; k++) {
        px(ctx, x, y, 'rgba(10,6,5,0.85)');
        if (rnd() < 0.6) x += dx; else y += dy;
        if (rnd() < 0.2) dx = -dx;
        if (rnd() < 0.2) dy = -dy;
        if (x < 1 || x > 14 || y < 1 || y > 14) break;
      }
    }
    const [copia, ctxCopia] = lienzo(T, T);
    ctxCopia.drawImage(c, 0, 0);
    res.push(aTextura(copia));
  }
  return res;
}

/** Cielo de atardecer con el volcán encendido. */
export function texturaCielo(): THREE.Texture {
  const W = 280, H = 140, HORIZONTE = 100;
  const rnd = mulberry32(1917);
  const [c, ctx] = lienzo(W, H);
  const franjas: [number, string][] = [
    [0, '#120b1c'], [22, '#1c1028'], [40, '#2b1630'], [56, '#451d36'], [68, '#6b2636'],
    [78, '#96352f'], [86, '#c2502e'], [93, '#e8782f'], [97, '#f6a94a'],
  ];
  for (let i = 0; i < franjas.length; i++) {
    const hasta = i + 1 < franjas.length ? franjas[i + 1][0] : HORIZONTE;
    ctx.fillStyle = franjas[i][1];
    ctx.fillRect(0, franjas[i][0], W, hasta - franjas[i][0]);
  }
  for (let i = 0; i < 90; i++) px(ctx, Math.floor(rnd() * W), Math.floor(rnd() * 50), rnd() < 0.3 ? '#fff3d6' : '#8f7fa8');

  const cono = (cx: number, alto: number, anchoBase: number, crater: number, color: string) => {
    ctx.fillStyle = color;
    for (let y = 0; y < alto; y++) {
      const t = y / alto;
      const medio = crater + (anchoBase - crater) * Math.pow(t, 1.25) + (rnd() < 0.3 ? 1 : 0);
      ctx.fillRect(Math.round(cx - medio), HORIZONTE - alto + y, Math.round(medio * 2), 1);
    }
  };
  cono(70, 20, 38, 5, '#2a1528');
  cono(232, 14, 30, 4, '#2a1528');
  cono(150, 34, 54, 6, '#1a0f1c');

  // Cráter encendido, hilo de lava y humo.
  const cimaY = HORIZONTE - 34;
  ctx.fillStyle = '#ffb347'; ctx.fillRect(145, cimaY - 1, 10, 2);
  ctx.fillStyle = '#ff6a2b'; ctx.fillRect(144, cimaY + 1, 12, 1);
  let lx = 152;
  for (let y = cimaY + 2; y < cimaY + 26; y++) {
    px(ctx, lx, y, y % 3 === 0 ? '#ffb347' : '#ff6a2b');
    if (rnd() < 0.45) lx += 1;
  }
  for (let i = 0; i < 26; i++) {
    const t = i / 26;
    ctx.fillStyle = `rgba(120,90,110,${0.5 * (1 - t)})`;
    ctx.fillRect(Math.round(146 + t * 30 + rnd() * 4), Math.round(cimaY - 3 - t * 26), 4 + Math.floor(t * 8), 2);
  }
  ctx.fillStyle = '#150d0c';
  ctx.fillRect(0, HORIZONTE, W, H - HORIZONTE);
  return aTextura(c);
}
