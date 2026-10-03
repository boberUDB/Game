// Partículas, números flotantes, grietas, sacudida y pausa de impacto. Todo con pools, sin crear objetos por frame.
import * as THREE from 'three';
import { MINERALES, PALETA, RENDER } from '../config';
import { on } from '../events';
import { estado } from '../state';
import { esMineral } from '../tipos';
import type { TipoBloque } from '../tipos';
import { celdaEn } from '../world/mina';
import { movimientoReducido, posMinero, vista } from './compartido';
import { camara, escena } from './escena';
import { texturasGrieta } from './texturas';

// ---------- Partículas ----------
const N = RENDER.PARTICULAS;
let particulas: THREE.InstancedMesh;
const px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
const vx = new Float32Array(N), vy = new Float32Array(N), vz = new Float32Array(N);
const vida = new Float32Array(N), vidaMax = new Float32Array(N);
let siguiente = 0;
const m4 = new THREE.Matrix4();
const cero = new THREE.Matrix4().makeScale(0, 0, 0);
const v3 = new THREE.Vector3();
const esc = new THREE.Vector3();
const quat = new THREE.Quaternion();
const color = new THREE.Color();

const COLOR_TIPO: Record<TipoBloque, number> = {
  aire: 0xffffff, tierra: PALETA.tierra, roca: PALETA.roca, basalto: PALETA.basalto, borde: PALETA.borde,
  estrato: 0xb8a8c0, fosil: PALETA.oro,
  azufre: MINERALES.azufre.color, hierro: MINERALES.hierro.color,
  obsidiana: MINERALES.obsidiana.color, jade: MINERALES.jade.color,
};

export function chispas(x: number, y: number, colorHex: number, cantidad: number, fuerza = 3, brillo = 1): void {
  if (movimientoReducido()) cantidad = Math.ceil(cantidad / 4);
  color.setHex(colorHex).multiplyScalar(brillo);
  for (let i = 0; i < cantidad; i++) {
    const k = siguiente;
    siguiente = (siguiente + 1) % N;
    px[k] = x + (Math.random() - 0.5) * 0.7;
    py[k] = -y + (Math.random() - 0.5) * 0.7;
    pz[k] = 0.6;
    const ang = Math.random() * Math.PI * 2;
    const vel = fuerza * (0.4 + Math.random() * 0.8);
    vx[k] = Math.cos(ang) * vel;
    vy[k] = Math.sin(ang) * vel + 2;
    vz[k] = 0.5 + Math.random() * 1.5;
    vida[k] = vidaMax[k] = 0.35 + Math.random() * 0.35;
    particulas.setColorAt(k, color);
  }
  particulas.instanceColor!.needsUpdate = true;
}

function actualizarParticulas(dt: number): void {
  let alguna = false;
  for (let k = 0; k < N; k++) {
    if (vida[k] <= 0) continue;
    alguna = true;
    vida[k] -= dt;
    if (vida[k] <= 0) { particulas.setMatrixAt(k, cero); continue; }
    vy[k] -= 14 * dt;
    px[k] += vx[k] * dt; py[k] += vy[k] * dt; pz[k] += vz[k] * dt;
    const s = vida[k] / vidaMax[k];
    v3.set(px[k], py[k], pz[k]); esc.set(s, s, s);
    m4.compose(v3, quat, esc);
    particulas.setMatrixAt(k, m4);
  }
  if (alguna) particulas.instanceMatrix.needsUpdate = true;
}

// ---------- Números flotantes (DOM) ----------
const numeros: HTMLElement[] = [];
let siguienteNumero = 0;
let durNumero = 600;
const proy = new THREE.Vector3();

export function numeroFlotante(x: number, yMundo: number, texto: string, clase = ''): void {
  const el = numeros[siguienteNumero];
  siguienteNumero = (siguienteNumero + 1) % numeros.length;
  proy.set(x, yMundo, 0.6).project(camara);
  el.textContent = texto;
  el.className = 'numero-flotante ' + clase;
  el.style.left = ((proy.x + 1) / 2) * window.innerWidth + 'px';
  el.style.top = ((1 - proy.y) / 2) * window.innerHeight + 'px';
  const sube = movimientoReducido() ? 0 : -48;
  el.animate(
    [
      { opacity: 1, transform: 'translate(-50%, -50%) scale(1.25)' },
      { opacity: 1, transform: `translate(-50%, calc(-50% + ${sube * 0.4}px)) scale(1)`, offset: 0.25 },
      { opacity: 0, transform: `translate(-50%, calc(-50% + ${sube}px)) scale(1)` },
    ],
    { duration: durNumero, easing: 'ease-out', fill: 'forwards' },
  );
}

// ---------- Grietas ----------
let grieta: THREE.Mesh;
let texGrieta: THREE.Texture[] = [];
let grietaX = -1, grietaY = -1, grietaReloj = 0;

function mostrarGrieta(x: number, y: number): void {
  const c = celdaEn(x, y);
  if (!c || c.vidaMax <= 0) return;
  const f = c.vida / c.vidaMax;
  if (f > 0.66) { if (x === grietaX && y === grietaY) grieta.visible = false; return; }
  const etapa = f > 0.33 ? 0 : f > 0.1 ? 1 : 2;
  (grieta.material as THREE.MeshBasicMaterial).map = texGrieta[etapa];
  grieta.position.set(x, -y, 0.51);
  grieta.visible = true;
  grietaX = x; grietaY = y; grietaReloj = 2.5;
}

// ---------- Sacudida y pausa ----------
export function sacudir(fuerza: number): void {
  if (movimientoReducido()) return;
  vista.sacudida = Math.max(vista.sacudida, fuerza);
}

export function pausaImpacto(ms: number): void {
  if (movimientoReducido() || ms <= 0) return;
  vista.pausaImpacto = Math.max(vista.pausaImpacto, ms / 1000);
}

export function iniciarEfectos(): void {
  particulas = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.13, 0.13, 0.13),
    new THREE.MeshBasicMaterial(),
    N,
  );
  particulas.frustumCulled = false;
  color.setRGB(1, 1, 1);
  for (let k = 0; k < N; k++) { particulas.setMatrixAt(k, cero); particulas.setColorAt(k, color); }
  escena.add(particulas);

  texGrieta = texturasGrieta();
  grieta = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: texGrieta[0], transparent: true, depthWrite: false }),
  );
  grieta.visible = false;
  escena.add(grieta);

  const capa = document.getElementById('numeros')!;
  for (let i = 0; i < RENDER.NUMEROS; i++) {
    const el = document.createElement('span');
    el.className = 'numero-flotante';
    el.style.opacity = '0';
    capa.appendChild(el);
    numeros.push(el);
  }
  const d = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-numero'));
  if (!Number.isNaN(d)) durNumero = d;

  on('bloque:golpeado', (e) => {
    const c = celdaEn(e.x, e.y);
    if (!c) return;
    const mineral = esMineral(c.tipo);
    chispas(e.x, e.y, COLOR_TIPO[c.tipo], 5, 2.5, mineral ? 1.8 : 1);
    mostrarGrieta(e.x, e.y);
    numeroFlotante(e.x + (Math.random() - 0.5) * 0.5, -e.y + 0.3, formatoDanio(e.danio), 'numero-flotante--danio');
  });
  on('bloque:roto', (e) => {
    const mineral = esMineral(e.tipo);
    const fosil = e.tipo === 'fosil';
    chispas(e.x, e.y, COLOR_TIPO[e.tipo], mineral || fosil ? 18 : 12, mineral ? 4.5 : 3.5, mineral || fosil ? 1.8 : 1);
    sacudir(mineral || fosil ? RENDER.SACUDIDA_MINERAL : RENDER.SACUDIDA_BLOQUE);
    pausaImpacto(fosil ? RENDER.PAUSA_FOSIL_MS : mineral ? RENDER.PAUSA_MINERAL_MS : RENDER.PAUSA_BLOQUE_MS);
    if (e.x === grietaX && e.y === grietaY) grieta.visible = false;
  });
  on('mineral:recogido', (e) => {
    numeroFlotante(posMinero.x, posMinero.y + 0.8, '+₡' + e.valor, 'numero-flotante--' + e.mineral);
  });
  on('fosil:hallado', () => {
    chispas(estado.jugador.x, estado.jugador.y, PALETA.oro, 30, 5, 2);
    if (!movimientoReducido()) vista.tiempoLento = 0.4;
  });
  on('calor:desmayo', () => sacudir(0.3));
  on('mina:regenerada', () => { grieta.visible = false; });
}

function formatoDanio(d: number): string {
  return d >= 10 ? String(Math.round(d)) : String(Math.round(d * 10) / 10);
}

export function actualizarEfectos(dt: number): void {
  actualizarParticulas(dt);
  if (grieta.visible) {
    grietaReloj -= dt;
    if (grietaReloj <= 0) grieta.visible = false;
  }
}
