// Todo el pixel art de la prueba, dibujado por código a 16 píxeles por metro.
// Cada asset queda en un canvas con nombre, para usarlo en la escena y exportarlo como PNG.

export type Lienzo = HTMLCanvasElement;
type Ctx = CanvasRenderingContext2D;

/** Texturas de 16x16 (1 m) y otras superficies. */
export const TEX: Record<string, Lienzo> = {};
/** Hojas de sprites. */
export const SPR: Record<string, Lienzo> = {};

export const MINERO = { ancho: 24, alto: 32, columnas: 9, filas: 3 }; // filas: frente, espalda, lado
export const COL = { reposo: 0, caminar: 2, picar: 6 };

function lienzo(w: number, h: number): [Lienzo, Ctx] {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

function mulberry32(a: number): () => number {
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tono(hex: number, f: number): string {
  const r = Math.min(255, Math.round(((hex >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((hex >> 8) & 255) * f));
  const b = Math.min(255, Math.round((hex & 255) * f));
  return `rgb(${r},${g},${b})`;
}

function px(ctx: Ctx, x: number, y: number, c: string): void { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); }
function rect(ctx: Ctx, x: number, y: number, w: number, h: number, c: string): void { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

/** Línea de píxeles (Bresenham). */
function linea(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, c: string): void {
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    px(ctx, x0, y0, c);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
}

/** Contorno oscuro de 1 px alrededor de lo dibujado. */
function contornear(c: Lienzo, ctx: Ctx, color = '#161020'): void {
  const { width: w, height: h } = c;
  const img = ctx.getImageData(0, 0, w, h);
  const a = (x: number, y: number) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : img.data[(y * w + x) * 4 + 3]);
  ctx.fillStyle = color;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (a(x, y) === 0 && (a(x - 1, y) || a(x + 1, y) || a(x, y - 1) || a(x, y + 1))) ctx.fillRect(x, y, 1, 1);
}

// ---------------------------------------------------------------- Texturas

const T = 16;
const TONOS = [0.82, 0.9, 1, 1, 1.08];

function ruido(ctx: Ctx, base: number, rnd: () => number, tonos = TONOS): void {
  for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) px(ctx, x, y, tono(base, tonos[Math.floor(rnd() * tonos.length)]));
}
function bisel(ctx: Ctx, fuerza = 1): void {
  ctx.fillStyle = `rgba(255,255,255,${0.12 * fuerza})`;
  ctx.fillRect(0, 0, T, 1); ctx.fillRect(0, 0, 1, T);
  ctx.fillStyle = `rgba(0,0,0,${0.28 * fuerza})`;
  ctx.fillRect(0, T - 1, T, 1); ctx.fillRect(T - 1, 0, 1, T);
}

const P = {
  tierra: 0x8a6448, ceniza: 0x6e625c, roca: 0x857c76, basalto: 0x4c4652, empedrado: 0x9a8f86,
  adobe: 0xc4946a, madera: 0x8a5a34, teja: 0xc05a3c, lava: 0xff6a2b,
  azufre: 0xe8d44d, hierro: 0xe07a3a, obsidiana: 0x9b6be8, jade: 0x3fd9b4, oro: 0xf2c14e,
};

function texturaTerreno(nombre: string, pintar: (ctx: Ctx, rnd: () => number) => void): void {
  const [c, ctx] = lienzo(T, T);
  let h = 7;
  for (let i = 0; i < nombre.length; i++) h = (h * 31 + nombre.charCodeAt(i)) | 0;
  pintar(ctx, mulberry32(h));
  TEX[nombre] = c;
}

function grietas(ctx: Ctx, rnd: () => number, base: number, n: number): void {
  for (let i = 0; i < n; i++) {
    let x = 2 + Math.floor(rnd() * 12), y = 1 + Math.floor(rnd() * 6);
    for (let k = 0; k < 6; k++) {
      px(ctx, x, y, tono(base, 0.55));
      px(ctx, x + 1, y, tono(base, 1.18));
      y++; if (rnd() < 0.5) x += rnd() < 0.5 ? -1 : 1;
      if (x < 1 || x > 13 || y > 14) break;
    }
  }
}

/** Mineral incrustado en una roca anfitriona, con mapa de emisión aparte. */
function texturaMineral(nombre: string, anfitrion: string, color: number, grupos: number): void {
  const [c, ctx] = lienzo(T, T);
  ctx.drawImage(TEX[anfitrion], 0, 0);
  const [e, ctxE] = lienzo(T, T);
  rect(ctxE, 0, 0, T, T, '#000');
  const rnd = mulberry32(color);
  for (let g = 0; g < grupos; g++) {
    const x = 2 + Math.floor(rnd() * 10), y = 2 + Math.floor(rnd() * 10);
    const forma = [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [1, 2]].slice(0, 3 + Math.floor(rnd() * 4));
    for (const [dx, dy] of forma) { px(ctx, x + dx, y + dy, tono(color, 0.85)); px(ctxE, x + dx, y + dy, tono(color, 1)); }
    px(ctx, x + 1, y + 1, tono(color, 0.6));
    px(ctx, x, y, tono(color, 1.5)); px(ctxE, x, y, tono(color, 1.4));
  }
  TEX[nombre] = c;
  TEX[nombre + '_emision'] = e;
}

function crearTexturas(): void {
  texturaTerreno('tierra', (ctx, rnd) => {
    ruido(ctx, P.tierra, rnd);
    for (let i = 0; i < 5; i++) rect(ctx, 1 + Math.floor(rnd() * 13), 1 + Math.floor(rnd() * 13), 2, 1, tono(P.tierra, 0.62));
    for (let i = 0; i < 3; i++) px(ctx, Math.floor(rnd() * T), Math.floor(rnd() * T), tono(P.ceniza, 1.2));
    bisel(ctx, 0.6);
  });
  texturaTerreno('roca', (ctx, rnd) => { ruido(ctx, P.roca, rnd); grietas(ctx, rnd, P.roca, 3); bisel(ctx); });
  texturaTerreno('basalto', (ctx, rnd) => {
    ruido(ctx, P.basalto, rnd, [0.9, 1, 1, 1.06]);
    for (const x of [4, 9, 13]) { rect(ctx, x, 0, 1, T, tono(P.basalto, 0.6)); rect(ctx, x + 1, 0, 1, T, tono(P.basalto, 1.25)); }
    bisel(ctx);
  });
  texturaTerreno('basalto_lava', (ctx, rnd) => {
    ctx.drawImage(TEX.basalto, 0, 0);
    let x = 3;
    for (let y = 0; y < T; y++) { px(ctx, x, y, tono(P.lava, 1)); if (rnd() < 0.5) x += rnd() < 0.5 ? -1 : 1; x = Math.max(1, Math.min(14, x)); }
  });
  {
    const [e, ctxE] = lienzo(T, T);
    rect(ctxE, 0, 0, T, T, '#000');
    const d = TEX.basalto_lava.getContext('2d')!.getImageData(0, 0, T, T).data;
    for (let i = 0; i < T * T; i++) if (d[i * 4] > 200 && d[i * 4 + 2] < 90) px(ctxE, i % T, Math.floor(i / T), tono(P.lava, 1));
    TEX.basalto_lava_emision = e;
  }
  // Estrato: casi blanco, cada estrato se tiñe con su color en la escena.
  texturaTerreno('estrato', (ctx, rnd) => {
    const bandas = [0.95, 0.8, 0.9, 0.72, 0.88, 0.78];
    for (let y = 0; y < T; y++) {
      const f = bandas[Math.floor(y / 3) % bandas.length];
      for (let x = 0; x < T; x++) {
        const onda = (x + Math.floor(y / 3) * 5) % 7 === 0 ? 0.9 : 1;
        const v = Math.round(235 * f * onda * (0.96 + rnd() * 0.08));
        px(ctx, x, y, `rgb(${v},${v},${v})`);
      }
    }
    bisel(ctx);
  });
  texturaTerreno('empedrado', (ctx, rnd) => {
    rect(ctx, 0, 0, T, T, tono(P.empedrado, 0.45));
    // Piedras irregulares en cuatro hiladas desfasadas.
    for (let fila = 0; fila < 4; fila++) {
      let x = fila % 2 ? -2 : 0;
      while (x < T) {
        const w = 3 + Math.floor(rnd() * 3);
        const f = 0.85 + rnd() * 0.3;
        rect(ctx, x, fila * 4, w, 3, tono(P.empedrado, f));
        rect(ctx, x, fila * 4, w, 1, tono(P.empedrado, f * 1.15));
        rect(ctx, x, fila * 4 + 2, w, 1, tono(P.empedrado, f * 0.82));
        x += w + 1;
      }
    }
  });
  texturaTerreno('adobe', (ctx, rnd) => {
    ruido(ctx, P.adobe, rnd, [0.92, 1, 1, 1.05]);
    for (let y = 3; y < T; y += 4) rect(ctx, 0, y, T, 1, tono(P.adobe, 0.84));
    for (let i = 0; i < 6; i++) rect(ctx, Math.floor(rnd() * 14), Math.floor(rnd() * T), 2, 1, tono(P.adobe, 1.18));
    for (let i = 0; i < 3; i++) px(ctx, Math.floor(rnd() * T), Math.floor(rnd() * T), tono(P.adobe, 0.65));
  });
  texturaTerreno('madera', (ctx, rnd) => {
    for (let t = 0; t < 4; t++) {
      const f = 0.88 + rnd() * 0.24;
      rect(ctx, t * 4, 0, 4, T, tono(P.madera, f));
      rect(ctx, t * 4, 0, 1, T, tono(P.madera, f * 0.62));
      rect(ctx, t * 4 + 1, 0, 1, T, tono(P.madera, f * 1.15));
      for (let i = 0; i < 3; i++) rect(ctx, t * 4 + 2, Math.floor(rnd() * 14), 1, 2, tono(P.madera, f * 0.8));
    }
  });
  texturaTerreno('teja', (ctx, rnd) => {
    rect(ctx, 0, 0, T, T, tono(P.teja, 0.55));
    for (let fila = 0; fila < 4; fila++) {
      const des = fila % 2 ? 2 : 0;
      for (let x = -2; x < T; x += 4) {
        const f = 0.9 + rnd() * 0.2;
        rect(ctx, x + des, fila * 4, 3, 3, tono(P.teja, f));
        rect(ctx, x + des, fila * 4, 1, 3, tono(P.teja, f * 1.2));
        rect(ctx, x + des + 2, fila * 4, 1, 3, tono(P.teja, f * 0.78));
      }
    }
  });
  texturaTerreno('caja', (ctx, rnd) => {
    ruido(ctx, P.madera, rnd, [0.95, 1, 1.05]);
    for (let y = 4; y < T; y += 4) rect(ctx, 0, y, T, 1, tono(P.madera, 0.7));
    ctx.strokeStyle = tono(P.madera, 0.55);
    rect(ctx, 0, 0, T, 2, tono(P.madera, 0.68)); rect(ctx, 0, T - 2, T, 2, tono(P.madera, 0.68));
    rect(ctx, 0, 0, 2, T, tono(P.madera, 0.68)); rect(ctx, T - 2, 0, 2, T, tono(P.madera, 0.68));
    linea(ctx, 2, 13, 13, 2, tono(P.madera, 0.6)); linea(ctx, 2, 12, 12, 2, tono(P.madera, 1.2));
  });
  texturaTerreno('barril', (ctx, rnd) => {
    ctx.drawImage(TEX.madera, 0, 0);
    void rnd;
    for (const y of [2, 12]) { rect(ctx, 0, y, T, 2, '#4b4f58'); rect(ctx, 0, y, T, 1, '#7a808c'); }
  });

  texturaMineral('azufre', 'tierra', P.azufre, 5);
  texturaMineral('hierro', 'roca', P.hierro, 4);
  texturaMineral('obsidiana', 'roca', P.obsidiana, 4);
  texturaMineral('jade', 'basalto', P.jade, 4);

  // Fósil: costillar con cráneo sobre estrato.
  {
    const [c, ctx] = lienzo(T, T);
    ctx.drawImage(TEX.estrato, 0, 0);
    const [e, ctxE] = lienzo(T, T);
    rect(ctxE, 0, 0, T, T, '#000');
    const hueso: [number, number][] = [];
    for (let x = 4; x <= 12; x++) hueso.push([x, 8]);
    for (const x of [6, 8, 10, 12]) hueso.push([x, 6], [x, 7], [x, 9], [x, 10]);
    for (let y = 6; y <= 9; y++) for (let x = 2; x <= 4; x++) hueso.push([x, y]);
    for (const [x, y] of hueso) { px(ctx, x, y, '#fff6dc'); px(ctxE, x, y, tono(P.oro, 1)); }
    px(ctx, 3, 7, '#3a2a1a'); px(ctxE, 3, 7, '#000');
    TEX.fosil = c; TEX.fosil_emision = e;
  }
}

// ---------------------------------------------------------------- Personajes

interface Paleta {
  casco: string; cascoS: string; cascoL: string; lampara: string | null;
  piel: string; pielS: string; pelo: string;
  camisa: string; camisaS: string; overol: string; overolS: string; bota: string;
}
const PAL_MINERO: Paleta = {
  casco: '#f2c14e', cascoS: '#c9952f', cascoL: '#ffe08a', lampara: '#fff6c8',
  piel: '#e0a878', pielS: '#b97f58', pelo: '#3a2a22',
  camisa: '#4a7fc9', camisaS: '#35609c', overol: '#2f4573', overolS: '#243558', bota: '#3a2a22',
};
const MOCHILA = '#9a6a3c', MOCHILA_S = '#6b4426', MADERA = '#8a5a34', METAL = '#c9d2d9', FILO = '#f4f8fb', OJO = '#1b1210';

type Dir = 'frente' | 'espalda' | 'lado';
interface Pose { bob: number; pI: number; pD: number; brazo: number; pico: 0 | 1 | 2 | 3 }

function pico(ctx: Ctx, ox: number, oy: number, x0: number, y0: number, x1: number, y1: number, cabeza: [number, number, number, number]): void {
  linea(ctx, ox + x0, oy + y0, ox + x1, oy + y1, MADERA);
  rect(ctx, ox + cabeza[0], oy + cabeza[1], cabeza[2], cabeza[3], METAL);
  // Puntas del pico
  if (cabeza[2] >= cabeza[3]) { px(ctx, ox + cabeza[0], oy + cabeza[1] + cabeza[3], FILO); px(ctx, ox + cabeza[0] + cabeza[2] - 1, oy + cabeza[1] + cabeza[3], FILO); }
  else { px(ctx, ox + cabeza[0] - 1, oy + cabeza[1], FILO); px(ctx, ox + cabeza[0] - 1, oy + cabeza[1] + cabeza[3] - 1, FILO); }
}

function dibujarMinero(ctx: Ctx, ox: number, oy: number, dir: Dir, pose: Pose, p: Paleta): void {
  const R = (x: number, y: number, w: number, h: number, c: string) => rect(ctx, ox + x, oy + y, w, h, c);
  const b = pose.bob;

  if (dir === 'lado') {
    const s = pose.pI; // zancada: -1, 0, 1
    R(6, 17 + b, 3, 6, MOCHILA); R(6, 22 + b, 3, 1, MOCHILA_S); R(6, 17 + b, 1, 6, MOCHILA_S);
    R(10 - s, 24, 3, 5, p.overolS); R(10 - s, 29, 4, 2, p.bota);
    R(11 + s, 24, 3, 5, p.overol); R(11 + s, 29, 4, 2, p.bota);
    R(9, 16 + b, 6, 8, p.camisa); R(10, 18 + b, 5, 6, p.overol); R(11, 16 + b, 1, 2, p.overol);
    R(8, 9 + b, 9, 7, p.piel); R(8, 15 + b, 9, 1, p.pielS); R(8, 9 + b, 3, 6, p.pelo);
    R(14, 12 + b, 1, 2, OJO); R(17, 13 + b, 1, 1, p.piel);
    R(8, 4 + b, 9, 5, p.casco); R(8, 4 + b, 9, 1, p.cascoL); R(7, 8 + b, 12, 1, p.cascoS);
    if (p.lampara) R(16, 5 + b, 2, 2, p.lampara);
    if (pose.pico === 0) {
      pico(ctx, ox, oy, 12, 21 + b, 15, 11 + b, [12, 9 + b, 7, 2]);
      R(11, 16 + b + pose.brazo, 2, 6, p.camisaS); R(11, 22 + b + pose.brazo, 2, 1, p.piel);
    } else if (pose.pico === 1) {
      pico(ctx, ox, oy, 12, 13, 8, 3, [4, 1, 8, 2]);
      R(11, 11, 2, 6, p.camisaS); R(11, 11, 2, 1, p.piel);
    } else if (pose.pico === 2) {
      pico(ctx, ox, oy, 13, 15, 19, 8, [16, 5, 7, 2]);
      R(11, 14, 3, 3, p.camisaS); R(13, 14, 1, 2, p.piel);
    } else {
      pico(ctx, ox, oy, 14, 19, 20, 24, [21, 20, 2, 8]);
      R(11, 16, 2, 4, p.camisaS); R(12, 19, 3, 2, p.camisaS); R(14, 19, 1, 2, p.piel);
    }
    return;
  }

  const frente = dir === 'frente';
  // De espaldas el pico cargado y el golpe quedan delante del cuerpo: se dibujan antes.
  const picoDetras = !frente;
  const dibujarPico = () => {
    if (pose.pico === 0) pico(ctx, ox, oy, 18, 22 + b, 18, 11 + b, [15, 9 + b, 7, 2]);
    else if (pose.pico === 1) pico(ctx, ox, oy, 17, 11, 17, 2, [13, 0, 8, 2]);
    else if (pose.pico === 2) pico(ctx, ox, oy, 17, 15, 21, 9, [19, 6, 2, 7]);
    else pico(ctx, ox, oy, 16, 20, 12, 27, [8, 27, 8, 2]);
  };
  if (picoDetras && pose.pico === 3) dibujarPico();

  R(8, 24, 3, 5 - pose.pI, p.overol); R(7, 29 - pose.pI, 4, 2, p.bota);
  R(13, 24, 3, 5 - pose.pD, p.overol); R(13, 29 - pose.pD, 4, 2, p.bota);
  R(8, 16 + b, 8, 8, p.camisa);
  if (frente) { R(9, 18 + b, 6, 6, p.overol); R(9, 16 + b, 1, 2, p.overol); R(14, 16 + b, 1, 2, p.overol); R(11, 20 + b, 2, 1, p.cascoS); }
  else { R(9, 17 + b, 6, 6, MOCHILA); R(9, 22 + b, 6, 1, MOCHILA_S); R(9, 17 + b, 6, 1, '#b98552'); R(11, 19 + b, 2, 2, MOCHILA_S); R(8, 23 + b, 8, 1, p.overol); }
  // Brazo izquierdo (el que no lleva el pico)
  R(6, 16 + b + pose.brazo, 2, 6, p.camisaS); R(6, 22 + b + pose.brazo, 2, 1, p.piel);
  // Cabeza
  if (frente) {
    R(7, 9 + b, 10, 7, p.piel); R(7, 15 + b, 10, 1, p.pielS);
    R(7, 9 + b, 1, 4, p.pelo); R(16, 9 + b, 1, 4, p.pelo);
    R(9, 12 + b, 1, 2, OJO); R(14, 12 + b, 1, 2, OJO); R(11, 14 + b, 2, 1, p.pielS);
  } else {
    R(7, 9 + b, 10, 6, p.pelo); R(9, 15 + b, 6, 1, p.pielS);
  }
  R(7, 4 + b, 10, 5, p.casco); R(8, 4 + b, 8, 1, p.cascoL); R(6, 8 + b, 12, 1, p.cascoS);
  if (frente && p.lampara) R(11, 5 + b, 2, 2, p.lampara);
  // Brazo derecho según la pose del pico
  if (pose.pico === 0) { R(16, 16 + b - pose.brazo, 2, 6, p.camisaS); R(16, 22 + b - pose.brazo, 2, 1, p.piel); }
  else if (pose.pico === 1) { R(16, 10, 2, 7, p.camisaS); R(16, 10, 2, 1, p.piel); }
  else if (pose.pico === 2) { R(16, 14, 2, 4, p.camisaS); R(17, 14, 1, 1, p.piel); }
  else { R(15, 17, 2, 5, p.camisaS); R(15, 21, 2, 1, p.piel); }
  if (!(picoDetras && pose.pico === 3)) dibujarPico();
}

function hojaMinero(): void {
  const { ancho: W, alto: H, columnas } = MINERO;
  const [c, ctx] = lienzo(W * columnas, H * 3);
  const dirs: Dir[] = ['frente', 'espalda', 'lado'];
  dirs.forEach((dir, fila) => {
    const poses: Pose[] = [
      { bob: 0, pI: 0, pD: 0, brazo: 0, pico: 0 },
      { bob: 1, pI: 0, pD: 0, brazo: 0, pico: 0 },
      ...(dir === 'lado'
        ? [
          { bob: 0, pI: 1, pD: 0, brazo: -1, pico: 0 as const }, { bob: 1, pI: 0, pD: 0, brazo: 0, pico: 0 as const },
          { bob: 0, pI: -1, pD: 0, brazo: 1, pico: 0 as const }, { bob: 1, pI: 0, pD: 0, brazo: 0, pico: 0 as const },
        ]
        : [
          { bob: 0, pI: 1, pD: 0, brazo: 1, pico: 0 as const }, { bob: 1, pI: 0, pD: 0, brazo: 0, pico: 0 as const },
          { bob: 0, pI: 0, pD: 1, brazo: -1, pico: 0 as const }, { bob: 1, pI: 0, pD: 0, brazo: 0, pico: 0 as const },
        ]),
      { bob: 0, pI: 0, pD: 0, brazo: 0, pico: 1 },
      { bob: 0, pI: 0, pD: 0, brazo: 0, pico: 2 },
      { bob: 1, pI: 0, pD: 0, brazo: 0, pico: 3 },
    ];
    poses.forEach((pose, col) => dibujarMinero(ctx, col * W, fila * H, dir, pose, PAL_MINERO));
  });
  contornear(c, ctx);
  SPR.minero = c;
}

/** La Niña Tere, de frente, dos cuadros de reposo. */
function hojaTere(): void {
  const W = 24, H = 32;
  const [c, ctx] = lienzo(W * 2, H);
  for (let i = 0; i < 2; i++) {
    const R = (x: number, y: number, w: number, h: number, col: string) => rect(ctx, i * W + x, y + i, w, h, col);
    R(7, 22, 10, 9 - i, '#b5472f'); R(7, 30 - i, 10, 1, '#8c3522');           // falda
    R(9, 22, 6, 8 - i, '#f1e6d2'); R(9, 22, 6, 1, '#d9c9ac');                 // delantal
    R(8, 15, 8, 7, '#c2502e'); R(10, 15, 4, 2, '#f1e6d2');                    // blusa
    R(6, 16, 2, 6, '#c2502e'); R(16, 16, 2, 6, '#c2502e');                    // brazos
    R(6, 22, 2, 1, '#b9805a'); R(16, 22, 2, 1, '#b9805a');
    R(7, 7, 10, 8, '#b9805a'); R(7, 14, 10, 1, '#9a6644');                    // cara
    R(9, 10, 1, 2, OJO); R(14, 10, 1, 2, OJO); R(11, 12, 2, 1, '#8c3522');
    R(6, 5, 12, 4, '#2b1d1a'); R(6, 8, 1, 4, '#2b1d1a'); R(17, 8, 1, 4, '#2b1d1a'); // pelo
    R(10, 2, 4, 3, '#2b1d1a'); R(11, 2, 2, 1, '#c2502e');                     // moño con listón
  }
  contornear(c, ctx);
  SPR.tere = c;
}

/** Torogoz de lado, dos cuadros de aleteo. */
function hojaTorogoz(): void {
  const W = 16;
  const [c, ctx] = lienzo(W * 2, W);
  for (let i = 0; i < 2; i++) {
    const R = (x: number, y: number, w: number, h: number, col: string) => rect(ctx, i * W + x, y, w, h, col);
    R(5, 6, 6, 5, '#2fb8a6'); R(6, 9, 4, 2, '#e8873a');
    R(9, 2, 5, 5, '#2f8fd0'); R(9, 2, 5, 1, '#3fd9b4');
    R(10, 4, 4, 1, '#1b1210'); R(12, 4, 1, 1, '#f4f8fb'); R(14, 5, 1, 1, '#2a2222');
    if (i === 0) { R(2, 3, 4, 4, '#2f8fd0'); R(2, 3, 4, 1, '#6ab8ea'); } else { R(2, 8, 4, 4, '#2f8fd0'); R(2, 11, 4, 1, '#1f6aa0'); }
    R(5, 11, 1, 3, '#2f8fd0'); R(4, 14, 3, 1, '#3fd9b4');
  }
  contornear(c, ctx);
  SPR.torogoz = c;
}

// ---------------------------------------------------------------- Objetos y fondo

function spriteIzote(): void {
  const [c, ctx] = lienzo(24, 40);
  rect(ctx, 11, 20, 3, 19, '#6b5a44'); rect(ctx, 11, 20, 1, 19, '#4d3f2f');
  for (let y = 22; y < 38; y += 3) px(ctx, 12, y, '#8a775c');
  const hojas: [number, number, string][] = [[2, 14, '#2f6b3a'], [4, 8, '#3d8a48'], [8, 3, '#4fa85a'], [12, 1, '#5fbf68'], [16, 3, '#4fa85a'], [20, 8, '#3d8a48'], [22, 14, '#2f6b3a'], [5, 19, '#2a5c33'], [19, 19, '#2a5c33']];
  for (const [x, y, col] of hojas) { linea(ctx, 12, 20, x, y, col); linea(ctx, 12, 21, x, y + 1, col); }
  rect(ctx, 11, 0, 2, 4, '#f6ebdd'); px(ctx, 10, 2, '#f6ebdd'); px(ctx, 13, 2, '#f6ebdd'); // flor de izote
  contornear(c, ctx);
  SPR.izote = c;
}

function spriteMaguey(): void {
  const [c, ctx] = lienzo(24, 16);
  const hojas: [number, number, string][] = [[1, 9, '#3a7a6a'], [4, 3, '#4a9a84'], [9, 0, '#5ab89c'], [14, 0, '#5ab89c'], [19, 3, '#4a9a84'], [22, 9, '#3a7a6a']];
  for (const [x, y, col] of hojas) { linea(ctx, 11, 15, x, y, col); linea(ctx, 12, 15, x + 1, y, col); linea(ctx, 12, 14, x, y + 1, '#2c5c50'); }
  contornear(c, ctx);
  SPR.maguey = c;
}

function spriteArbusto(): void {
  const [c, ctx] = lienzo(32, 20);
  const rnd = mulberry32(77);
  for (let i = 0; i < 60; i++) {
    const x = 3 + Math.floor(rnd() * 24), y = 3 + Math.floor(rnd() * 13);
    const d = Math.hypot((x - 15) / 14, (y - 12) / 9);
    if (d > 1) continue;
    rect(ctx, x, y, 3, 3, ['#274f2e', '#2f6b3a', '#3d8a48'][Math.floor(rnd() * 3)]);
  }
  rect(ctx, 6, 14, 20, 5, '#213f27');
  contornear(c, ctx);
  SPR.arbusto = c;
}

/** Linterna encendida, para el mapa de emisión del farol. */
function spriteFarol(): void {
  const [c, ctx] = lienzo(8, 12);
  rect(ctx, 2, 0, 4, 1, '#2b2630'); rect(ctx, 1, 1, 6, 2, '#3d3644');
  rect(ctx, 1, 3, 6, 6, '#ffb347'); rect(ctx, 2, 4, 4, 4, '#ffe9a8'); rect(ctx, 3, 5, 2, 2, '#ffffff');
  rect(ctx, 1, 3, 1, 6, '#3d3644'); rect(ctx, 6, 3, 1, 6, '#3d3644');
  rect(ctx, 1, 9, 6, 2, '#3d3644'); rect(ctx, 2, 11, 4, 1, '#2b2630');
  SPR.farol = c;
}

const LETRAS: Record<string, string[]> = {
  T: ['111', '010', '010', '010', '010'], I: ['111', '010', '010', '010', '111'], E: ['111', '100', '110', '100', '111'],
  N: ['101', '111', '111', '101', '101'], D: ['110', '101', '101', '101', '110'], A: ['010', '101', '111', '101', '101'],
};
function texturaRotulo(): void {
  const texto = 'TIENDA';
  const [c, ctx] = lienzo(32, 16);
  rect(ctx, 0, 0, 32, 16, tono(P.madera, 0.75));
  rect(ctx, 0, 0, 32, 1, tono(P.madera, 1.1)); rect(ctx, 0, 15, 32, 1, tono(P.madera, 0.5));
  rect(ctx, 0, 0, 1, 16, tono(P.madera, 0.5)); rect(ctx, 31, 0, 1, 16, tono(P.madera, 0.5));
  for (let y = 4; y < 16; y += 5) rect(ctx, 1, y, 30, 1, tono(P.madera, 0.62));
  let x = 5;
  for (const ch of texto) {
    LETRAS[ch].forEach((fila, fy) => [...fila].forEach((v, fx) => { if (v === '1') { px(ctx, x + fx, 6 + fy, '#3a2416'); px(ctx, x + fx, 5 + fy, '#ffe08a'); } }));
    x += 4;
  }
  TEX.rotulo = c;
}

/** Degradado para los rayos de luz. */
function texturaRayo(): void {
  const [c, ctx] = lienzo(32, 64);
  const g = ctx.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 32, 64);
  const lado = ctx.createLinearGradient(0, 0, 32, 0);
  lado.addColorStop(0, 'rgba(0,0,0,1)'); lado.addColorStop(0.5, 'rgba(0,0,0,0)'); lado.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = lado; ctx.fillRect(0, 0, 32, 64);
  TEX.rayo = c;
}

function spriteSombra(): void {
  const [c, ctx] = lienzo(16, 8);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 16; x++) {
    const d = Math.hypot((x - 7.5) / 8, (y - 3.5) / 4);
    if (d < 1) px(ctx, x, y, `rgba(0,0,0,${d < 0.6 ? 0.45 : 0.25})`);
  }
  SPR.sombra = c;
}

export const PALETA = P;

export function crearArte(): void {
  crearTexturas();
  texturaRotulo();
  texturaRayo();
  hojaMinero();
  hojaTere();
  hojaTorogoz();
  spriteIzote();
  spriteMaguey();
  spriteArbusto();
  spriteFarol();
  spriteSombra();
}
