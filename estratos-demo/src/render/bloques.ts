// Bloques de la mina: un InstancedMesh por tipo. Cada celda ocupa siempre el mismo índice de instancia.
import * as THREE from 'three';
import { MINA, MINERALES, PALETA } from '../config';
import { on } from '../events';
import { estado } from '../state';
import type { Celda, TipoBloque } from '../tipos';
import { movimientoReducido } from './compartido';
import { ajustarFondo, escena } from './escena';
import { texturaBloque } from './texturas';

const TIPOS: TipoBloque[] = ['tierra', 'roca', 'basalto', 'estrato', 'fosil', 'azufre', 'hierro', 'obsidiana', 'jade', 'borde'];
const CAP = MINA.ANCHO * (MINA.ALTO_BASE + MINA.MAX_ESTRATOS * MINA.FILAS_POR_ESTRATO);
const mallas: THREE.InstancedMesh[] = [];
const mostrado = new Int8Array(CAP).fill(-1); // índice del tipo que se dibuja en cada celda

const m4 = new THREE.Matrix4();
const cero = new THREE.Matrix4().makeScale(0, 0, 0);
const color = new THREE.Color();
const pos = new THREE.Vector3();
const escala = new THREE.Vector3();
const quat = new THREE.Quaternion();
const coloresEstrato = PALETA.estrato.map((c) => new THREE.Color(c));

// Pulsos de golpe: encogen el bloque y lo destellan un instante.
const MAX_PULSOS = 24;
const DUR_PULSO = 0.09, DUR_DESTELLO = 0.045;
const pulsoIdx = new Int32Array(MAX_PULSOS).fill(-1);
const pulsoT = new Float32Array(MAX_PULSOS);

/** Caída de bloques de la cinemática del colapso. */
export const caida = { activa: false, t: 0 };
const GRAVEDAD_CAIDA = 26;

function colorCelda(c: Celda, salida: THREE.Color): void {
  if (c.estratoId !== undefined) salida.copy(coloresEstrato[(c.estratoId - 1) % coloresEstrato.length]);
  else salida.setRGB(1, 1, 1);
  if (c.vidaMax > 0) salida.multiplyScalar(0.62 + 0.38 * Math.max(0, c.vida / c.vidaMax));
}

function sucio(malla: THREE.InstancedMesh, colorTambien: boolean): void {
  malla.instanceMatrix.needsUpdate = true;
  if (colorTambien && malla.instanceColor) malla.instanceColor.needsUpdate = true;
}

export function construirBloques(): void {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  for (const tipo of TIPOS) {
    const tex = texturaBloque(tipo);
    const mat = new THREE.MeshStandardMaterial({ map: tex.map, roughness: 1, metalness: 0 });
    if (tex.emissiveMap) {
      mat.emissiveMap = tex.emissiveMap;
      mat.emissive = new THREE.Color(0xffffff);
      mat.emissiveIntensity = tipo in MINERALES ? 1.5 : 1.3;
    }
    const malla = new THREE.InstancedMesh(geo, mat, CAP);
    malla.frustumCulled = false;
    malla.castShadow = true;
    malla.receiveShadow = true;
    color.setRGB(1, 1, 1);
    for (let i = 0; i < CAP; i++) { malla.setMatrixAt(i, cero); malla.setColorAt(i, color); }
    mallas.push(malla);
    escena.add(malla);
  }
  reconstruirTodo();

  on('bloque:golpeado', (e) => { pintarColor(e.x, e.y); pulsar(e.x, e.y); });
  on('bloque:roto', (e) => actualizarCelda(e.x, e.y));
  on('mina:regenerada', () => { caida.activa = false; reconstruirTodo(); });
}

export function reconstruirTodo(): void {
  pulsoIdx.fill(-1);
  for (let i = 0; i < CAP; i++) {
    const t = mostrado[i];
    if (t >= 0) mallas[t].setMatrixAt(i, cero);
    mostrado[i] = -1;
  }
  const m = estado.mina;
  for (let y = 0; y < m.alto; y++) for (let x = 0; x < m.ancho; x++) actualizarCelda(x, y, false);
  for (const malla of mallas) sucio(malla, true);
  ajustarFondo();
}

export function actualizarCelda(x: number, y: number, marcar = true): void {
  const m = estado.mina;
  const i = y * m.ancho + x;
  const c = m.celdas[i];
  const nuevo = c.tipo === 'aire' ? -1 : TIPOS.indexOf(c.tipo);
  const viejo = mostrado[i];
  if (viejo >= 0 && viejo !== nuevo) {
    mallas[viejo].setMatrixAt(i, cero);
    if (marcar) sucio(mallas[viejo], false);
  }
  mostrado[i] = nuevo;
  if (nuevo < 0) return;
  m4.makeTranslation(x, -y, 0);
  mallas[nuevo].setMatrixAt(i, m4);
  colorCelda(c, color);
  mallas[nuevo].setColorAt(i, color);
  if (marcar) sucio(mallas[nuevo], true);
}

function pintarColor(x: number, y: number): void {
  const m = estado.mina;
  const i = y * m.ancho + x;
  const t = mostrado[i];
  if (t < 0) return;
  colorCelda(m.celdas[i], color);
  mallas[t].setColorAt(i, color);
  mallas[t].instanceColor!.needsUpdate = true;
}

function pulsar(x: number, y: number): void {
  if (movimientoReducido()) return;
  const idx = y * estado.mina.ancho + x;
  let libre = -1;
  for (let k = 0; k < MAX_PULSOS; k++) {
    if (pulsoIdx[k] === idx) { libre = k; break; }
    if (pulsoIdx[k] < 0 && libre < 0) libre = k;
  }
  if (libre < 0) return;
  pulsoIdx[libre] = idx;
  pulsoT[libre] = 0;
}

function actualizarPulsos(dt: number): void {
  const m = estado.mina;
  for (let k = 0; k < MAX_PULSOS; k++) {
    const idx = pulsoIdx[k];
    if (idx < 0) continue;
    const t = mostrado[idx];
    if (t < 0) { pulsoIdx[k] = -1; continue; }
    pulsoT[k] += dt;
    const x = idx % m.ancho, y = Math.floor(idx / m.ancho);
    const fin = pulsoT[k] >= DUR_PULSO;
    const s = fin ? 1 : 0.92 + 0.08 * (pulsoT[k] / DUR_PULSO);
    pos.set(x, -y, 0); escala.set(s, s, s);
    m4.compose(pos, quat, escala);
    mallas[t].setMatrixAt(idx, m4);
    colorCelda(m.celdas[idx], color);
    if (pulsoT[k] < DUR_DESTELLO) color.multiplyScalar(2.2);
    mallas[t].setColorAt(idx, color);
    sucio(mallas[t], true);
    if (fin) pulsoIdx[k] = -1;
  }
}

function actualizarCaida(dt: number): void {
  caida.t += dt;
  const m = estado.mina;
  for (let y = 1; y < m.alto; y++) {
    for (let x = 0; x < m.ancho; x++) {
      const i = y * m.ancho + x;
      const t = mostrado[i];
      if (t < 0) continue;
      // Las columnas caen escalonadas, 20 ms entre una y otra.
      const tt = Math.max(0, caida.t - x * 0.02 - ((x * 7 + y * 13) % 10) * 0.012);
      m4.makeTranslation(x, -y - 0.5 * GRAVEDAD_CAIDA * tt * tt, 0);
      mallas[t].setMatrixAt(i, m4);
    }
  }
  for (const malla of mallas) malla.instanceMatrix.needsUpdate = true;
}

export function actualizarBloques(dt: number): void {
  if (caida.activa) actualizarCaida(dt);
  else actualizarPulsos(dt);
}

export function iniciarCaida(): void {
  caida.activa = true;
  caida.t = 0;
}
