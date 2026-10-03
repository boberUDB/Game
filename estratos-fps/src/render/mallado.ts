// Mallado por chunks de 16x16x16: sin caras ocultas, con oclusión ambiental por vértice.
// Un grupo de geometría por tipo de bloque (un material por tipo, nada de atlas).
import * as THREE from 'three';
import { MUNDO, RENDER } from '../config/balance';
import { ALTO, ANCHO, LARGO, Mundo } from '../game/mundo';
import { BloqueId } from '../game/tipos';

const C = MUNDO.CHUNK;

// Cada cara: vértices CCW vistos desde afuera, normal y eje normal.
const CARAS: { n: [number, number, number]; v: [number, number, number][]; eje: number }[] = [
  { n: [1, 0, 0], eje: 0, v: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]] },
  { n: [-1, 0, 0], eje: 0, v: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]] },
  { n: [0, 1, 0], eje: 1, v: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]] },
  { n: [0, -1, 0], eje: 1, v: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
  { n: [0, 0, 1], eje: 2, v: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]] },
  { n: [0, 0, -1], eje: 2, v: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]] },
];
const UV: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]];

interface Acum { pos: number[]; nor: number[]; uv: number[]; col: number[]; idx: number[]; nv: number }

export interface ChunkMalla {
  geometria: THREE.BufferGeometry | null;
  materiales: number[];     // BloqueId de cada grupo, en orden
  triangulos: number;
}

function solido(m: Mundo, x: number, y: number, z: number): number {
  return m.get(x, y, z) !== BloqueId.aire ? 1 : 0;
}

/** Construye la malla de un chunk. Devuelve null en geometria si no tiene caras visibles. */
export function mallarChunk(m: Mundo, cx: number, cy: number, cz: number): ChunkMalla {
  const porTipo = new Map<number, Acum>();
  const x0 = cx * C, y0 = cy * C, z0 = cz * C;
  const x1 = Math.min(x0 + C, ANCHO), y1 = Math.min(y0 + C, ALTO), z1 = Math.min(z0 + C, LARGO);
  for (let y = y0; y < y1; y++)
    for (let z = z0; z < z1; z++)
      for (let x = x0; x < x1; x++) {
        const b = m.bloques[x + z * ANCHO + y * ANCHO * LARGO];
        if (b === BloqueId.aire) continue;
        for (const cara of CARAS) {
          const nx = x + cara.n[0], ny = y + cara.n[1], nz = z + cara.n[2];
          // Sin caras hacia afuera del mundo por los lados ni por abajo.
          if (nx < 0 || nz < 0 || ny < 0 || nx >= ANCHO || nz >= LARGO) continue;
          if (ny < ALTO && m.bloques[nx + nz * ANCHO + ny * ANCHO * LARGO] !== BloqueId.aire) continue;
          let a = porTipo.get(b);
          if (!a) { a = { pos: [], nor: [], uv: [], col: [], idx: [], nv: 0 }; porTipo.set(b, a); }
          const ao: number[] = [];
          const e1 = (cara.eje + 1) % 3, e2 = (cara.eje + 2) % 3;
          for (let k = 0; k < 4; k++) {
            const v = cara.v[k];
            const s1 = v[e1] ? 1 : -1, s2 = v[e2] ? 1 : -1;
            const p1: [number, number, number] = [nx, ny, nz], p2: [number, number, number] = [nx, ny, nz], p3: [number, number, number] = [nx, ny, nz];
            p1[e1] += s1; p2[e2] += s2; p3[e1] += s1; p3[e2] += s2;
            const l1 = solido(m, p1[0], p1[1], p1[2]), l2 = solido(m, p2[0], p2[1], p2[2]), es = solido(m, p3[0], p3[1], p3[2]);
            const nivel = l1 && l2 ? 0 : 3 - (l1 + l2 + es);
            ao.push(nivel);
            a.pos.push(x + v[0], y + v[1], z + v[2]);
            a.nor.push(cara.n[0], cara.n[1], cara.n[2]);
            const br = RENDER.AO[nivel];
            a.col.push(br, br, br);
            a.uv.push(UV[k][0], UV[k][1]);
          }
          const i = a.nv;
          if (ao[0] + ao[2] > ao[1] + ao[3]) a.idx.push(i + 1, i + 2, i + 3, i + 1, i + 3, i);
          else a.idx.push(i, i + 1, i + 2, i, i + 2, i + 3);
          a.nv += 4;
        }
      }
  if (porTipo.size === 0) return { geometria: null, materiales: [], triangulos: 0 };

  let pos: number[] = [], nor: number[] = [], uv: number[] = [], col: number[] = [];
  const idx: number[] = [];
  const materiales: number[] = [];
  const g = new THREE.BufferGeometry();
  let base = 0, inicio = 0;
  for (const [tipo, a] of [...porTipo.entries()].sort((p, q) => p[0] - q[0])) {
    pos = pos.concat(a.pos); nor = nor.concat(a.nor); uv = uv.concat(a.uv); col = col.concat(a.col);
    for (const i of a.idx) idx.push(i + base);
    g.addGroup(inicio, a.idx.length, materiales.length);
    materiales.push(tipo);
    inicio += a.idx.length;
    base += a.nv;
  }
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx.length > 65535 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
  g.computeBoundingSphere();
  g.computeBoundingBox();
  return { geometria: g, materiales, triangulos: idx.length / 3 };
}
