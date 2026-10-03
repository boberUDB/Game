// Sprites pixel art dibujados por código: minero, Torogoz, Don Chepe, minerales sueltos y la tienda.
import * as THREE from 'three';
import { MINERALES, PALETA } from '../config';
import { on } from '../events';
import { posMascota } from '../sistemas/mascota';
import { golpe } from '../sistemas/picado';
import { estado } from '../state';
import { MINERAL_IDS } from '../tipos';
import type { MineralId } from '../tipos';
import { aTextura, css, lienzo, movimientoReducido, posMinero } from './compartido';
import { escena } from './escena';

type Ctx = CanvasRenderingContext2D;
const Z_SPRITE = 0.62;
const CONTORNO = '#140c0a';

/** Agrega un contorno oscuro de 1 px alrededor de lo dibujado. */
function contornear(c: HTMLCanvasElement, ctx: Ctx): void {
  const { width: w, height: h } = c;
  const img = ctx.getImageData(0, 0, w, h);
  const a = (x: number, y: number) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : img.data[(y * w + x) * 4 + 3]);
  ctx.fillStyle = CONTORNO;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (a(x, y) === 0 && (a(x - 1, y) || a(x + 1, y) || a(x, y - 1) || a(x, y + 1))) ctx.fillRect(x, y, 1, 1);
}

interface PaletaMinero { casco: string; cascoSombra: string; piel: string; camisa: string; pantalon: string; bota: string; ala: number }
const MINERO: PaletaMinero = { casco: '#f2c14e', cascoSombra: '#c9952f', piel: '#d9a074', camisa: '#3f6fb5', pantalon: '#2c3e63', bota: '#3a2a22', ala: 1 };
const CHEPE: PaletaMinero = { casco: '#e3cf94', cascoSombra: '#b59a5a', piel: '#b9805a', camisa: '#efe6d6', pantalon: '#6b4a36', bota: '#3a2a22', ala: 3 };

const FW = 20, FH = 26; // cuadro del minero, con margen para el contorno

// Cuadros: 0 y 1 reposo, 2 y 3 paso, 4 golpe arriba, 5 golpe abajo.
function dibujarMinero(ctx: Ctx, ox: number, cuadro: number, p: PaletaMinero): void {
  const R = (x: number, y: number, w: number, h: number, c: string) => { ctx.fillStyle = c; ctx.fillRect(ox + 2 + x, 1 + y, w, h); };
  const bob = cuadro === 1 ? 1 : 0;
  const la = cuadro === 2 ? -1 : cuadro === 3 ? 1 : 0;
  const lb = -la;
  // Piernas y botas
  R(5 + la, 18, 3, 4, p.pantalon); R(5 + la, 22, 3, 2, p.bota);
  R(8 + lb, 18, 3, 4, p.pantalon); R(8 + lb, 22, 3, 2, p.bota);
  // Brazo de atrás, cuerpo y tirantes
  R(3, 12 + bob, 1, 4, p.camisa);
  R(4, 11 + bob, 8, 7 - bob, p.camisa);
  R(5, 14 + bob, 6, 4 - bob, p.pantalon);
  R(5, 11 + bob, 1, 3, p.pantalon); R(10, 11 + bob, 1, 3, p.pantalon);
  // Cabeza
  R(5, 6 + bob, 6, 5, p.piel);
  R(9, 8 + bob, 1, 1, '#1b1210');
  R(6, 10 + bob, 4, 1, '#b97f58');
  // Casco o sombrero
  R(4, 2 + bob, 8, 4, p.casco);
  R(4 - p.ala, 5 + bob, 8 + p.ala * 2, 1, p.cascoSombra);
  if (p === MINERO) R(10, 3 + bob, 2, 2, '#fff6c8');
  // Brazo delantero y pico
  const madera = '#8a5a34', metal = '#c9d2d9', filo = '#f4f8fb';
  if (cuadro === 4) {
    R(11, 7, 2, 5, p.camisa);
    R(12, 1, 1, 7, madera);
    R(9, -1, 7, 2, metal); R(8, 0, 1, 2, filo); R(16, 0, 1, 2, filo);
  } else if (cuadro === 5) {
    R(11, 12, 3, 2, p.camisa);
    R(13, 12, 3, 1, madera);
    R(15, 8, 2, 8, metal); R(14, 8, 1, 1, filo); R(14, 15, 1, 1, filo);
  } else {
    R(11, 12 + bob, 2, 4, p.camisa);
    R(12, 16 + bob, 1, 1, p.piel);
    R(13, 7 + bob, 1, 10, madera);
    R(11, 6 + bob, 5, 2, metal); R(10, 7 + bob, 1, 2, filo); R(16, 7 + bob, 1, 2, filo);
  }
}

function atlasMinero(p: PaletaMinero): THREE.CanvasTexture {
  const [c, ctx] = lienzo(FW * 6, FH);
  for (let i = 0; i < 6; i++) dibujarMinero(ctx, i * FW, i, p);
  contornear(c, ctx);
  const t = aTextura(c);
  t.repeat.set(1 / 6, 1);
  return t;
}

const TW = 14;
function atlasTorogoz(): THREE.CanvasTexture {
  const [c, ctx] = lienzo(TW * 2, TW);
  for (let i = 0; i < 2; i++) {
    const R = (x: number, y: number, w: number, h: number, col: string) => { ctx.fillStyle = col; ctx.fillRect(i * TW + 1 + x, 1 + y, w, h); };
    R(4, 4, 5, 5, '#2fb8a6');           // cuerpo turquesa
    R(5, 7, 3, 2, '#e8873a');           // pecho naranja
    R(7, 1, 4, 4, '#2f8fd0');           // cabeza azul
    R(7, 1, 4, 1, '#3fd9b4');           // corona
    R(9, 2, 1, 1, '#120c0a');           // ojo
    R(8, 3, 3, 1, '#1b1210');           // antifaz
    R(11, 3, 1, 1, '#2a2222');          // pico
    if (i === 0) R(2, 2, 3, 3, '#2f8fd0'); else R(2, 6, 3, 3, '#2f8fd0'); // ala
    R(4, 9, 1, 2, '#2f8fd0');           // cola larga con raquetas
    R(3, 11, 3, 1, '#3fd9b4');
  }
  contornear(c, ctx);
  const t = aTextura(c);
  t.repeat.set(1 / 2, 1);
  return t;
}

function texturaGema(m: MineralId): THREE.CanvasTexture {
  const [c, ctx] = lienzo(10, 10);
  const col = MINERALES[m].color;
  const filas: Record<MineralId, number[]> = {
    azufre: [2, 4, 6, 6, 6, 4],
    hierro: [4, 6, 8, 8, 6, 4],
    obsidiana: [2, 4, 4, 6, 8, 8],
    jade: [4, 6, 8, 8, 6, 4],
  };
  filas[m].forEach((ancho, i) => {
    ctx.fillStyle = css(col, i < 2 ? 1.25 : i < 4 ? 1 : 0.75);
    ctx.fillRect(5 - ancho / 2, 2 + i, ancho, 1);
  });
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(4, 3, 1, 1);
  contornear(c, ctx);
  return aTextura(c);
}

function texturaTienda(): THREE.CanvasTexture {
  const W = 56, H = 40;
  const [c, ctx] = lienzo(W, H);
  const R = (x: number, y: number, w: number, h: number, col: string) => { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); };
  // Postes y pared de bahareque
  R(5, 12, 3, 28, '#6b4a36'); R(48, 12, 3, 28, '#6b4a36');
  R(8, 14, 40, 26, '#8f6a4a');
  for (let y = 16; y < 40; y += 4) R(8, y, 40, 1, '#7a5840');
  // Hueco del mostrador y la Niña Tere
  R(13, 17, 30, 13, '#2a1a14');
  R(25, 19, 6, 5, '#b9805a'); R(24, 17, 8, 3, '#2b1d1a'); R(30, 16, 3, 3, '#2b1d1a');
  R(27, 21, 1, 1, '#120c0a'); R(29, 21, 1, 1, '#120c0a');
  R(23, 24, 10, 6, '#c2502e'); R(26, 24, 4, 6, '#f6ebdd');
  // Mostrador con minerales de muestra
  R(11, 30, 34, 3, '#a9805a'); R(11, 33, 34, 7, '#6b4a36');
  R(15, 28, 3, 2, css(MINERALES.azufre.color)); R(21, 28, 3, 2, css(MINERALES.hierro.color));
  R(36, 28, 3, 2, css(MINERALES.obsidiana.color)); R(41, 27, 3, 3, css(MINERALES.jade.color));
  // Techo de teja
  for (let i = 0; i < 6; i++) R(2 + i, 11 - i * 2, 52 - i * 2, 2, i % 2 ? '#a8472a' : '#c2502e');
  // Farol
  R(45, 15, 1, 4, '#2b1d1a'); R(44, 19, 3, 3, '#ffb347');
  contornear(c, ctx);
  return aTextura(c);
}

function plano(tex: THREE.Texture, ancho: number, alto: number, brillo = 1): THREE.Mesh {
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5 });
  mat.color.setScalar(brillo);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(ancho, alto), mat);
  m.frustumCulled = false;
  return m;
}

let minero: THREE.Mesh, texMinero: THREE.CanvasTexture;
let chepe: THREE.Mesh;
let torogoz: THREE.Mesh, texTorogoz: THREE.CanvasTexture;
const gemas: THREE.Mesh[] = [];
const texGema = {} as Record<MineralId, THREE.CanvasTexture>;
const MAX_GEMAS = 48;

// Fantasmas que vuelan hacia el minero al recoger un mineral.
const MAX_VUELOS = 12;
const DUR_VUELO = 0.22;
const vuelos: { malla: THREE.Mesh; t: number; x: number; y: number; activo: boolean }[] = [];

// Resalte de la celda apuntada.
let cursor: THREE.LineSegments;
const colorEnAlcance = new THREE.Color(PALETA.jade);
const colorFuera = new THREE.Color(PALETA.peligro);

let relojAnim = 0;
let tGolpe = 1;       // segundos desde el último golpe
let aplastado = 0;    // aplastamiento al terminar un paso
let tAntes = 1;
let pasos = 0;
const posMascotaVisual = new THREE.Vector3();

export function construirSprites(): void {
  texMinero = atlasMinero(MINERO);
  minero = plano(texMinero, 1 * (FW / FH) * 1.05, 1.05);
  escena.add(minero);

  chepe = plano(atlasMinero(CHEPE), 1 * (FW / FH) * 1.05, 1.05);
  chepe.visible = false;
  escena.add(chepe);

  texTorogoz = atlasTorogoz();
  torogoz = plano(texTorogoz, 0.55, 0.55);
  torogoz.visible = false;
  escena.add(torogoz);

  for (const m of MINERAL_IDS) texGema[m] = texturaGema(m);
  for (let i = 0; i < MAX_GEMAS; i++) {
    const g = plano(texGema.azufre, 0.42, 0.42, 1.7);
    g.visible = false;
    gemas.push(g);
    escena.add(g);
  }
  for (let i = 0; i < MAX_VUELOS; i++) {
    const malla = plano(texGema.azufre, 0.42, 0.42, 1.7);
    malla.visible = false;
    vuelos.push({ malla, t: 0, x: 0, y: 0, activo: false });
    escena.add(malla);
  }

  const tienda = plano(texturaTienda(), 3.6, 3.6 * (40 / 56));
  tienda.position.set(3, -0.5 + (3.6 * (40 / 56)) / 2, 0.1);
  escena.add(tienda);

  cursor = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.03, 1.03, 1.03)),
    new THREE.LineBasicMaterial({ color: PALETA.jade, fog: false }),
  );
  cursor.visible = false;
  escena.add(cursor);

  on('bloque:golpeado', () => { tGolpe = 0; });
  on('bloque:roto', () => { tGolpe = 0; });
  on('mineral:recogido', (e) => {
    const v = vuelos.find((q) => !q.activo);
    if (!v) return;
    v.activo = true; v.t = 0; v.x = e.x; v.y = -e.y;
    (v.malla.material as THREE.MeshBasicMaterial).map = texGema[e.mineral];
    v.malla.visible = true;
  });
  on('mina:regenerada', colocarDeGolpe);
  on('calor:desmayo', colocarDeGolpe);
  colocarDeGolpe();
}

/** Lleva los sprites a su posición sin transición. */
export function colocarDeGolpe(): void {
  const j = estado.jugador;
  posMinero.set(j.x, -j.y, Z_SPRITE);
  posMascota.x = j.x; posMascota.y = j.y;
  posMascotaVisual.set(j.x - 0.6, -j.y + 0.3, Z_SPRITE + 0.05);
}

export function actualizarSprites(dt: number, cursorVisible: boolean, objetivo: { activo: boolean; x: number; y: number; enAlcance: boolean }): void {
  relojAnim += dt;
  tGolpe += dt;
  const j = estado.jugador;
  const reducido = movimientoReducido();

  // Minero: interpola entre celdas con una curva suave.
  const s = j.t * j.t * (3 - 2 * j.t);
  posMinero.set(j.desdeX + (j.x - j.desdeX) * s, -(j.desdeY + (j.y - j.desdeY) * s), Z_SPRITE);
  if (j.t >= 1 && tAntes < 1) { aplastado = 1; pasos++; }
  tAntes = j.t;
  aplastado = Math.max(0, aplastado - dt * 9);

  let cuadro: number;
  if (j.desmayado) cuadro = 1;
  else if (golpe.activo || tGolpe < 0.12) cuadro = tGolpe < 0.07 ? 5 : 4;
  else if (j.t < 1) cuadro = 2 + (pasos % 2);
  else cuadro = Math.floor(relojAnim * 2) % 2;
  texMinero.offset.x = cuadro / 6;

  const lado = j.mirando === 'izq' ? -1 : 1;
  const ap = reducido ? 0 : aplastado * 0.06;
  minero.scale.set(lado * (1 + ap), 1 - ap, 1);
  minero.position.set(posMinero.x, posMinero.y + 0.02 - ap * 0.5, Z_SPRITE);
  minero.rotation.z = j.desmayado ? -Math.PI / 2 * lado : 0;

  // Torogoz: sigue con retraso y flota.
  torogoz.visible = estado.mascota.comprada;
  if (torogoz.visible) {
    const k = 1 - Math.exp(-6 * dt);
    const flota = reducido ? 0 : Math.sin(relojAnim * (Math.PI * 2 / 1.4)) * 0.15;
    posMascotaVisual.x += (posMascota.x - lado * 0.65 - posMascotaVisual.x) * k;
    posMascotaVisual.y += (-posMascota.y + 0.3 - posMascotaVisual.y) * k;
    torogoz.position.set(posMascotaVisual.x, posMascotaVisual.y + flota, Z_SPRITE + 0.05);
    torogoz.scale.x = posMinero.x >= posMascotaVisual.x ? 1 : -1;
    texTorogoz.offset.x = (Math.floor(relojAnim * 6) % 2) / 2;
  }

  // Don Chepe
  const ch = estado.chepe;
  chepe.visible = estado.fosilesActivos.includes('don_chepe');
  if (chepe.visible) {
    const picando = ch.activo && ch.reloj < 0.25;
    (chepe.material as THREE.MeshBasicMaterial).map!.offset.x = (picando ? 5 : ch.activo ? 4 : 0) / 6;
    chepe.position.x = ch.x;
    chepe.position.y += (-ch.y - chepe.position.y) * (1 - Math.exp(-12 * dt));
    chepe.position.z = Z_SPRITE - 0.03;
  }

  // Minerales sueltos
  const sueltos = estado.sueltos;
  for (let i = 0; i < MAX_GEMAS; i++) {
    const g = gemas[i];
    if (i >= sueltos.length) { g.visible = false; continue; }
    const su = sueltos[i];
    g.visible = true;
    (g.material as THREE.MeshBasicMaterial).map = texGema[su.mineral];
    const salto = reducido ? 0 : Math.abs(Math.sin(relojAnim * 3 + su.uid)) * 0.12;
    g.position.set(su.x + ((su.uid % 5) - 2) * 0.07, -su.y - 0.2 + salto, Z_SPRITE - 0.06);
  }
  for (const v of vuelos) {
    if (!v.activo) continue;
    v.t += dt;
    const t = Math.min(1, v.t / DUR_VUELO);
    const e = t * t; // acelera hacia el minero
    v.malla.position.set(v.x + (posMinero.x - v.x) * e, v.y + (posMinero.y - v.y) * e + Math.sin(t * Math.PI) * 0.4, Z_SPRITE + 0.08);
    v.malla.scale.setScalar(1 - 0.5 * e);
    if (t >= 1) { v.activo = false; v.malla.visible = false; }
  }

  // Resalte de la celda bajo el cursor
  cursor.visible = cursorVisible && objetivo.activo;
  if (cursor.visible) {
    cursor.position.set(objetivo.x, -objetivo.y, 0);
    (cursor.material as THREE.LineBasicMaterial).color.copy(objetivo.enAlcance ? colorEnAlcance : colorFuera);
  }
}
