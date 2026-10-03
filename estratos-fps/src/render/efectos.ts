// Partículas (chispas, polvo, fósiles), polvo flotante, sacudida de cámara y bloques que caen en el colapso.
import * as THREE from 'three';
import { mulberry32 } from '../game/rng';

export class Particulas {
  readonly puntos: THREE.Points;
  private pos: Float32Array;
  private col: Float32Array;
  private vel: Float32Array;
  private vida: Float32Array;
  private vidaMax: Float32Array;
  private base: Float32Array;
  private siguiente = 0;

  constructor(readonly max: number, textura: THREE.Texture, tam: number, private gravedad: number, aditivo = true) {
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 3);
    this.base = new Float32Array(max * 3);
    this.vel = new Float32Array(max * 3);
    this.vida = new Float32Array(max);
    this.vidaMax = new Float32Array(max).fill(1);
    for (let i = 0; i < max; i++) this.pos[i * 3 + 1] = -1000;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.puntos = new THREE.Points(g, new THREE.PointsMaterial({
      map: textura, size: tam, sizeAttenuation: true, vertexColors: true, transparent: true, alphaTest: 0.05,
      depthWrite: false, blending: aditivo ? THREE.AdditiveBlending : THREE.NormalBlending,
    }));
    this.puntos.frustumCulled = false;
  }

  emitir(x: number, y: number, z: number, vx: number, vy: number, vz: number, vida: number, r: number, g: number, b: number): void {
    const i = this.siguiente;
    this.siguiente = (i + 1) % this.max;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.base[i * 3] = r; this.base[i * 3 + 1] = g; this.base[i * 3 + 2] = b;
    this.vida[i] = vida; this.vidaMax[i] = vida;
  }

  actualizar(dt: number): void {
    for (let i = 0; i < this.max; i++) {
      if (this.vida[i] <= 0) { this.col[i * 3] = this.col[i * 3 + 1] = this.col[i * 3 + 2] = 0; this.pos[i * 3 + 1] = -1000; continue; }
      this.vida[i] -= dt;
      this.vel[i * 3 + 1] -= this.gravedad * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      const f = Math.max(0, this.vida[i] / this.vidaMax[i]);
      this.col[i * 3] = this.base[i * 3] * f; this.col[i * 3 + 1] = this.base[i * 3 + 1] * f; this.col[i * 3 + 2] = this.base[i * 3 + 2] * f;
    }
    (this.puntos.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.puntos.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }

  vaciar(): void { this.vida.fill(0); }
}

/** Polvo flotando cerca de la cámara: partículas que se envuelven alrededor de ella. */
export class PolvoFlotante {
  readonly puntos: THREE.Points;
  private pos: Float32Array;
  private fase: Float32Array;

  constructor(private n: number, textura: THREE.Texture) {
    const azar = mulberry32(5);
    this.pos = new Float32Array(n * 3);
    this.fase = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      this.pos[i * 3] = (azar() - 0.5) * 12; this.pos[i * 3 + 1] = (azar() - 0.5) * 6; this.pos[i * 3 + 2] = (azar() - 0.5) * 12;
      this.fase[i] = azar() * 6.28;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.puntos = new THREE.Points(g, new THREE.PointsMaterial({
      map: textura, size: 0.035, sizeAttenuation: true, transparent: true, opacity: 0.55, color: 0x8aa0cf,
      alphaTest: 0.05, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.puntos.frustumCulled = false;
  }

  actualizar(cam: THREE.Vector3, t: number, cantidad: number): void {
    const a = this.puntos.geometry.attributes.position as THREE.BufferAttribute;
    const arr = a.array as Float32Array;
    for (let i = 0; i < this.n; i++) {
      const visible = i < cantidad;
      const wx = (((this.pos[i * 3] + Math.sin(t * 0.2 + this.fase[i]) * 0.5 - cam.x + 6) % 12) + 12) % 12 - 6;
      const wy = (((this.pos[i * 3 + 1] + t * 0.05 * (1 + (i % 3)) - cam.y + 3) % 6) + 6) % 6 - 3;
      const wz = (((this.pos[i * 3 + 2] + Math.cos(t * 0.17 + this.fase[i]) * 0.5 - cam.z + 6) % 12) + 12) % 12 - 6;
      arr[i * 3] = cam.x + wx; arr[i * 3 + 1] = visible ? cam.y + wy : -1000; arr[i * 3 + 2] = cam.z + wz;
    }
    a.needsUpdate = true;
  }
}

/** Bloques que caen durante la cinemática del colapso. */
export class BloquesCayendo {
  readonly malla: THREE.InstancedMesh;
  private estado: { x: number; y: number; z: number; vy: number; giro: number; ry: number }[] = [];
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();
  private activo = false;

  constructor(private n: number, material: THREE.Material) {
    this.malla = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), material, n);
    this.malla.frustumCulled = false;
    this.malla.visible = false;
    for (let i = 0; i < n; i++) this.estado.push({ x: 0, y: -1000, z: 0, vy: 0, giro: 0, ry: 0 });
  }

  iniciar(): void { this.activo = true; this.malla.visible = true; for (let i = 0; i < this.n; i++) this.estado[i].y = -1000; }
  detener(): void { this.activo = false; this.malla.visible = false; }

  actualizar(dt: number, cam: THREE.Vector3, intensidad: number): void {
    if (!this.activo) return;
    for (let i = 0; i < this.n; i++) {
      const s = this.estado[i];
      if (s.y < cam.y - 14 || s.y > 1e5 || s.y === -1000) {
        if (Math.random() < intensidad * dt * 20) {
          s.x = cam.x + (Math.random() - 0.5) * 8; s.z = cam.z + (Math.random() - 0.5) * 8; s.y = cam.y + 6 + Math.random() * 4;
          s.vy = -2 - Math.random() * 3; s.giro = (Math.random() - 0.5) * 4; s.ry = Math.random() * 6;
        }
      } else {
        s.vy -= 20 * dt; s.y += s.vy * dt; s.ry += s.giro * dt;
      }
      this.e.set(s.ry * 0.7, s.ry, s.ry * 0.3);
      this.q.setFromEuler(this.e);
      this.m.compose(new THREE.Vector3(s.x, s.y, s.z), this.q, new THREE.Vector3(1, 1, 1));
      this.malla.setMatrixAt(i, this.m);
    }
    this.malla.instanceMatrix.needsUpdate = true;
  }
}

export class Sacudida {
  valor = 0;
  añadir(v: number, max = 0.6): void { this.valor = Math.min(max, this.valor + v); }
  actualizar(dt: number, decae: number): void { this.valor = Math.max(0, this.valor - (this.valor / Math.max(0.001, decae)) * dt - 0.0005); }
}

export function colorDeMineral(m: string): [number, number, number] {
  switch (m) {
    case 'azufre': return [0.96, 0.72, 0.26];
    case 'oro': return [0.89, 0.73, 0.33];
    case 'esmeralda': return [0.18, 0.75, 0.44];
    case 'rubi': return [0.84, 0.22, 0.31];
    case 'zafiro': return [0.24, 0.55, 1.0];
    default: return [1, 1, 1];
  }
}

/** Punto de 8x8 blanco, en cruz, para partículas que se tiñen con su color (chispas, fósiles). */
export function texturaPunto(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 8;
  const x = c.getContext("2d")!;
  x.fillStyle = "#fff";
  x.fillRect(3, 1, 2, 6);
  x.fillRect(1, 3, 6, 2);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  return t;
}
