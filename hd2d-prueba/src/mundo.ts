// Construye la escena de prueba: terreno por bloques, el hoyo de la mina con estratos a la vista,
// la Tienda de la Niña Tere, faroles, plantas y partículas.
import * as THREE from 'three';
import { PALETA, SPR, TEX } from './arte';
import type { Lienzo } from './arte';

export const ANCHO = 40, FONDO = 28;
const PISO_MIN = -5;
const HOYO = { x0: 22, x1: 31, z0: 9, z1: 18 };
const COLOR_ESTRATO = [0xa07cb8, 0x62a39f];

const texturas = new Map<string, THREE.CanvasTexture>();
/** Textura con filtro de vecino más cercano. Se cachea por nombre y repetición. */
export function tex(c: Lienzo, repX = 1, repY = 1): THREE.CanvasTexture {
  const clave = `${Object.keys(TEX).find((k) => TEX[k] === c) ?? Object.keys(SPR).find((k) => SPR[k] === c)}|${repX}|${repY}`;
  let t = texturas.get(clave);
  if (!t) {
    t = new THREE.CanvasTexture(c);
    t.magFilter = t.minFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repX, repY);
    texturas.set(clave, t);
  }
  return t;
}

function mulberry32(a: number): () => number {
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Altura (índice del bloque de arriba) de cada columna. */
export function alto(x: number, z: number): number {
  if (z <= 4) return Math.min(4, 1 + (4 - z)) + ((x * 7 + z * 3) % 5 === 0 ? 1 : 0); // risco del fondo
  if (x >= HOYO.x0 && x <= HOYO.x1 && z >= HOYO.z0 && z <= HOYO.z1) {
    // Escalones por tres lados; el lado norte es una pared recta que enseña los estratos.
    const d = Math.min(x - HOYO.x0, HOYO.x1 - x, HOYO.z1 - z);
    return -Math.min(d + 1, 3);
  }
  return 0;
}

const bloqueadas = new Set<number>();
function bloquear(x: number, z: number): void { bloqueadas.add(z * ANCHO + x); }
export function bloqueada(x: number, z: number): boolean {
  return x < 2 || z < 5 || x > ANCHO - 3 || z > 20 || bloqueadas.has(z * ANCHO + x);
}

/** Caja con textura a 16 px por metro en todas sus caras. */
function caja(w: number, h: number, d: number, nombre: string, emision?: { nombre: string; fuerza: number }): THREE.Mesh {
  const reps: [number, number][] = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  const mats = reps.map(([rx, ry]) => {
    const m = new THREE.MeshStandardMaterial({ map: tex(TEX[nombre], rx, ry), roughness: 1 });
    if (emision) { m.emissiveMap = tex(TEX[emision.nombre], rx, ry); m.emissive.set(0xffffff); m.emissiveIntensity = emision.fuerza; }
    return m;
  });
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats);
  m.castShadow = m.receiveShadow = true;
  return m;
}

export interface Sprite { malla: THREE.Mesh; cuadro(col: number, fila: number): void }

/** Plano con un sprite que recibe luz y proyecta sombra. El origen queda en los pies. */
export function crearSprite(c: Lienzo, cols: number, filas: number, anchoM: number, altoM: number, inclinar = true): Sprite {
  const t = new THREE.CanvasTexture(c);
  t.magFilter = t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(1 / cols, 1 / filas);
  t.offset.set(0, 1 - 1 / filas);
  const mat = new THREE.MeshStandardMaterial({
    map: t, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 1,
    emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.06,
  });
  const geo = new THREE.PlaneGeometry(anchoM, altoM);
  geo.translate(0, altoM / 2, 0);
  const malla = new THREE.Mesh(geo, mat);
  malla.castShadow = true;
  malla.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: t, alphaTest: 0.5 });
  if (inclinar) malla.rotation.x = -0.22; // compensa la cámara inclinada
  return { malla, cuadro: (col, fila) => t.offset.set(col / cols, 1 - (fila + 1) / filas) };
}

export interface Mundo {
  luna: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  faroles: THREE.PointLight[];
  lava: THREE.PointLight;
  rayos: THREE.Mesh[];
  tere: Sprite;
  actualizar(dt: number, t: number): void;
}

function construirTerreno(escena: THREE.Scene): void {
  const rnd = mulberry32(2026);
  type Tipo = 'tierra' | 'roca' | 'basalto' | 'basalto_lava' | 'empedrado' | 'estrato' | 'azufre' | 'hierro' | 'obsidiana' | 'jade' | 'fosil';
  const lista: Record<Tipo, { x: number; y: number; z: number; color: number }[]> = {
    tierra: [], roca: [], basalto: [], basalto_lava: [], empedrado: [], estrato: [], azufre: [], hierro: [], obsidiana: [], jade: [], fosil: [],
  };
  const h = (x: number, z: number) => (x < 0 || z < 0 || x >= ANCHO || z >= FONDO ? 99 : alto(x, z));

  for (let z = 0; z < FONDO; z++) for (let x = 0; x < ANCHO; x++) {
    const tope = alto(x, z);
    const vecinoMin = Math.min(h(x - 1, z), h(x + 1, z), h(x, z - 1), h(x, z + 1));
    for (let y = Math.max(PISO_MIN, Math.min(tope, vecinoMin)); y <= tope; y++) {
      const enHoyo = x >= HOYO.x0 - 1 && x <= HOYO.x1 + 1 && z >= HOYO.z0 - 1 && z <= HOYO.z1 + 1;
      let tipo: Tipo, color = 0xffffff;
      const r = rnd();
      if (y > 0) tipo = r < 0.35 ? 'roca' : y > 2 ? 'basalto' : 'tierra';
      else if (y === 0) tipo = x >= 7 && x <= 19 && z >= 7 && z <= 16 ? 'empedrado' : r < 0.1 ? 'roca' : 'tierra';
      else if (y === -1) { tipo = 'estrato'; color = COLOR_ESTRATO[0]; }
      else if (y === -2) { tipo = 'estrato'; color = COLOR_ESTRATO[1]; }
      else tipo = r < 0.3 ? 'basalto_lava' : 'basalto';
      // Minerales solo donde se ven: dentro y alrededor del hoyo.
      if (enHoyo && y < 0) {
        const m = rnd();
        if (m < 0.1) tipo = y === -1 ? (m < 0.06 ? 'azufre' : 'hierro') : y === -2 ? (m < 0.05 ? 'hierro' : 'obsidiana') : m < 0.05 ? 'jade' : 'obsidiana';
      }
      lista[tipo].push({ x, y, z, color });
    }
  }
  // Un fósil y dos minerales fijos en la pared norte, donde la cámara los ve de frente.
  const fijar = (tipo: Tipo, x: number, y: number, z: number, color = 0xffffff) => {
    for (const k of Object.keys(lista) as Tipo[]) lista[k] = lista[k].filter((b) => !(b.x === x && b.y === y && b.z === z));
    lista[tipo].push({ x, y, z, color });
  };
  fijar('fosil', 27, -1, 8, COLOR_ESTRATO[0]);
  fijar('azufre', 24, 0, 8); fijar('obsidiana', 29, -2, 8); fijar('jade', 26, -3, 13); fijar('jade', 27, -3, 14);

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const m4 = new THREE.Matrix4();
  const col = new THREE.Color();
  for (const tipo of Object.keys(lista) as Tipo[]) {
    const bloques = lista[tipo];
    if (bloques.length === 0) continue;
    const mat = new THREE.MeshStandardMaterial({ map: tex(TEX[tipo]), roughness: 1 });
    if (TEX[tipo + '_emision']) {
      mat.emissiveMap = tex(TEX[tipo + '_emision']);
      mat.emissive.set(0xffffff);
      mat.emissiveIntensity = tipo === 'basalto_lava' ? 1.5 : 1.7;
    }
    const malla = new THREE.InstancedMesh(geo, mat, bloques.length);
    bloques.forEach((b, i) => {
      malla.setMatrixAt(i, m4.makeTranslation(b.x, b.y, b.z));
      malla.setColorAt(i, col.setHex(b.color));
    });
    malla.castShadow = malla.receiveShadow = true;
    escena.add(malla);
  }
}

function construirTienda(escena: THREE.Scene): { tere: Sprite; luz: THREE.PointLight } {
  const g = new THREE.Group();
  const PISO = 0.5;
  const pon = (m: THREE.Object3D, x: number, y: number, z: number) => { m.position.set(x, y, z); g.add(m); return m; };

  pon(caja(6, 3.2, 0.3, 'adobe'), 12.5, PISO + 1.6, 7.65);
  pon(caja(0.3, 3.2, 2.4, 'adobe'), 9.65, PISO + 1.6, 8.7);
  pon(caja(0.3, 3.2, 2.4, 'adobe'), 15.35, PISO + 1.6, 8.7);
  pon(caja(5.4, 0.06, 2.6, 'madera'), 12.5, PISO + 0.03, 8.9);
  pon(caja(0.3, 3.2, 0.3, 'madera'), 9.65, PISO + 1.6, 10.35);
  pon(caja(0.3, 3.2, 0.3, 'madera'), 15.35, PISO + 1.6, 10.35);
  pon(caja(5.4, 1, 0.6, 'caja'), 12.5, PISO + 0.5, 10.2);       // mostrador
  pon(caja(5.6, 0.1, 0.8, 'madera'), 12.5, PISO + 1.05, 10.2);
  pon(caja(6.6, 0.2, 0.2, 'madera'), 12.5, PISO + 4.2, 9);        // viga cumbrera
  // Techo de teja a dos aguas
  const frente = caja(7, 0.16, 2.3, 'teja'); frente.rotation.x = 0.5; pon(frente, 12.5, PISO + 3.72, 9.95);
  const atras = caja(7, 0.16, 2.3, 'teja'); atras.rotation.x = -0.5; pon(atras, 12.5, PISO + 3.72, 8.05);
  // Rótulo colgado a la izquierda
  const rotulo = caja(2, 1, 0.1, 'rotulo');
  (rotulo.material as THREE.MeshStandardMaterial[]).forEach((m) => { m.map = tex(TEX.rotulo); });
  pon(rotulo, 10.9, PISO + 2.75, 10.62);
  // Minerales de muestra sobre el mostrador
  const muestras: [number, number][] = [[11.2, PALETA.azufre], [11.8, PALETA.hierro], [13.6, PALETA.obsidiana], [14.2, PALETA.jade]];
  for (const [x, color] of muestras) {
    const gema = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.1 }));
    gema.rotation.y = 0.6;
    pon(gema, x, PISO + 1.23, 10.3);
  }
  // Farol de la tienda
  pon(caja(0.9, 0.08, 0.08, 'madera'), 15.0, PISO + 2.95, 10.6);
  const farol = caja(0.5, 0.75, 0.5, 'adobe');
  (farol.material as THREE.MeshStandardMaterial[]).forEach((m) => {
    m.map = tex(SPR.farol); m.emissiveMap = tex(SPR.farol); m.emissive.set(0xffffff); m.emissiveIntensity = 1.3;
  });
  farol.castShadow = false;
  pon(farol, 14.75, PISO + 2.5, 10.6);
  const luz = new THREE.PointLight(0xffa040, 16, 12, 2);
  luz.position.set(14.75, PISO + 2.4, 11.1);
  g.add(luz);
  // Luz tenue dentro de la tienda para que se vea a la Niña Tere
  const interior = new THREE.PointLight(0xffc27a, 5, 6, 2);
  interior.position.set(12.5, PISO + 2.4, 9.6);
  g.add(interior);

  // Cajas y barril al lado
  pon(caja(1, 1, 1, 'caja'), 16.7, PISO + 0.5, 9.6);
  const cajita = caja(0.8, 0.8, 0.8, 'caja'); cajita.rotation.y = 0.4; pon(cajita, 16.7, PISO + 1.4, 9.6);
  const barril = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 1, 8),
    new THREE.MeshStandardMaterial({ map: tex(TEX.barril, 3, 1), roughness: 1, flatShading: true }),
  );
  barril.castShadow = barril.receiveShadow = true;
  pon(barril, 17.8, PISO + 0.5, 10.3);

  const tere = crearSprite(SPR.tere, 2, 1, 1.5, 2);
  tere.malla.position.set(12.9, PISO + 0.06, 9.5);
  g.add(tere.malla);

  for (let x = 10; x <= 15; x++) for (let z = 8; z <= 10; z++) bloquear(x, z);
  bloquear(17, 10); bloquear(17, 9); bloquear(18, 10);
  escena.add(g);
  return { tere, luz };
}

function construirFarol(escena: THREE.Scene, x: number, z: number, y: number): THREE.PointLight {
  const poste = caja(0.2, 3.2, 0.2, 'madera'); poste.position.set(x, y + 1.6, z); escena.add(poste);
  const brazo = caja(0.8, 0.1, 0.1, 'madera'); brazo.position.set(x + 0.4, y + 3.05, z); escena.add(brazo);
  const farol = caja(0.45, 0.68, 0.45, 'adobe');
  (farol.material as THREE.MeshStandardMaterial[]).forEach((m) => {
    m.map = tex(SPR.farol); m.emissiveMap = tex(SPR.farol); m.emissive.set(0xffffff); m.emissiveIntensity = 1.3;
  });
  farol.castShadow = false;
  farol.position.set(x + 0.7, y + 2.65, z);
  escena.add(farol);
  const luz = new THREE.PointLight(0xffa040, 15, 12, 2);
  luz.position.set(x + 0.7, y + 2.5, z + 0.3);
  escena.add(luz);
  bloquear(Math.round(x), Math.round(z));
  return luz;
}

function construirPlantas(escena: THREE.Scene): void {
  const pon = (nombre: 'izote' | 'maguey' | 'arbusto', x: number, z: number, escala = 1) => {
    const c = SPR[nombre];
    const s = crearSprite(c, 1, 1, (c.width / 16) * escala, (c.height / 16) * escala);
    s.malla.position.set(x, alto(Math.round(x), Math.round(z)) + 0.5, z);
    escena.add(s.malla);
    if (nombre === 'izote') bloquear(Math.round(x), Math.round(z));
  };
  const izotes: [number, number][] = [[6, 9], [19.4, 6.2], [33.5, 8], [7.5, 18.5], [34, 17], [3.5, 13]];
  for (const [x, z] of izotes) pon('izote', x, z);
  const magueys: [number, number][] = [[8.3, 12.6], [20.6, 17.4], [17.2, 6.4], [32.8, 12.3], [5.2, 16], [14.5, 19.5], [36, 10]];
  for (const [x, z] of magueys) pon('maguey', x, z);
  // Arbustos en primer plano: quedan desenfocados abajo de la pantalla.
  for (let x = 3; x < ANCHO - 2; x += 3.4) pon('arbusto', x + ((x * 13) % 3) * 0.4, 21.4 + ((x * 7) % 3) * 0.5, 1.5);
  // Cerca en el borde norte del hoyo
  for (let x = HOYO.x0 - 0.5; x <= HOYO.x1 + 0.5; x += 1.5) {
    const p = caja(0.16, 1.1, 0.16, 'madera'); p.position.set(x, 1.05, 7.55); escena.add(p);
  }
  for (const y of [1.0, 1.4]) {
    const r = caja(HOYO.x1 - HOYO.x0 + 1, 0.1, 0.08, 'madera'); r.position.set((HOYO.x0 + HOYO.x1) / 2, y, 7.55); escena.add(r);
  }
}

export function construirMundo(escena: THREE.Scene): Mundo {
  construirTerreno(escena);
  const tienda = construirTienda(escena);
  const faroles = [tienda.luz, construirFarol(escena, 20.5, 13.5, 0.5), construirFarol(escena, 8, 15.5, 0.5)];
  construirPlantas(escena);

  const hemi = new THREE.HemisphereLight(0x3b4f8f, 0x1a1420, 0.9);
  const luna = new THREE.DirectionalLight(0x9fb4ff, 1.1);
  luna.castShadow = true;
  luna.shadow.mapSize.set(2048, 2048);
  luna.shadow.camera.left = -22; luna.shadow.camera.right = 22;
  luna.shadow.camera.top = 18; luna.shadow.camera.bottom = -18;
  luna.shadow.camera.near = 1; luna.shadow.camera.far = 70;
  luna.shadow.bias = -0.0015;
  luna.shadow.normalBias = 0.03;
  escena.add(hemi, luna, luna.target);

  // Resplandor de lava en el fondo del hoyo y brillo de dos minerales.
  const lava = new THREE.PointLight(PALETA.lava, 14, 11, 2);
  lava.position.set(26.5, -1.2, 14);
  const luzJade = new THREE.PointLight(PALETA.jade, 4, 5, 2);
  luzJade.position.set(26.5, -1.8, 13.5);
  const luzFosil = new THREE.PointLight(PALETA.oro, 3, 4, 2);
  luzFosil.position.set(27, -1, 9);
  escena.add(lava, luzJade, luzFosil);

  // Rayos de luz diagonales, aditivos.
  const rayos: THREE.Mesh[] = [];
  const rayoTex = new THREE.CanvasTexture(TEX.rayo);
  rayoTex.colorSpace = THREE.SRGBColorSpace;
  const posRayos: [number, number, number][] = [[10, 9, 12], [15, 10, 9]];
  posRayos.forEach(([x, z, alturaM], i) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, alturaM),
      new THREE.MeshBasicMaterial({ map: rayoTex, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, color: 0x9fb4ff }),
    );
    m.position.set(x, alturaM / 2 + 0.5, z);
    m.rotation.set(-0.45, 0, 0.42 + i * 0.05);
    escena.add(m);
    rayos.push(m);
  });

  // Partículas: brasas que suben del hoyo y polvo que flota en la plaza.
  const N = 140;
  const pos = new Float32Array(N * 3), colores = new Float32Array(N * 3), vel = new Float32Array(N), fase = new Float32Array(N);
  const rnd = mulberry32(99);
  const nacer = (i: number, inicio: boolean) => {
    const brasa = i < 70;
    if (brasa) {
      pos[i * 3] = HOYO.x0 + 2 + rnd() * 6; pos[i * 3 + 2] = HOYO.z0 + 1 + rnd() * 6;
      pos[i * 3 + 1] = -2.4 + (inicio ? rnd() * 6 : 0);
      colores[i * 3] = 1.6; colores[i * 3 + 1] = 0.55 + rnd() * 0.4; colores[i * 3 + 2] = 0.15;
      vel[i] = 0.5 + rnd() * 0.9;
    } else {
      pos[i * 3] = 5 + rnd() * 30; pos[i * 3 + 2] = 6 + rnd() * 15;
      pos[i * 3 + 1] = 0.8 + rnd() * 3.5;
      colores[i * 3] = 0.9; colores[i * 3 + 1] = 0.85; colores[i * 3 + 2] = 0.6;
      vel[i] = 0.05 + rnd() * 0.1;
    }
    fase[i] = rnd() * 6.28;
  };
  for (let i = 0; i < N; i++) nacer(i, true);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colores, 3));
  const puntos = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.09, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  puntos.frustumCulled = false;
  escena.add(puntos);

  const base = faroles.map((f) => f.intensity);
  return {
    luna, hemi, faroles, lava, rayos, tere: tienda.tere,
    actualizar(dt, t) {
      for (let i = 0; i < N; i++) {
        pos[i * 3 + 1] += vel[i] * dt;
        pos[i * 3] += Math.sin(t * 0.8 + fase[i]) * 0.25 * dt;
        if (pos[i * 3 + 1] > (i < 70 ? 4 : 4.6)) nacer(i, false);
      }
      geo.attributes.position.needsUpdate = true;
      // Los faroles titilan un poco, como llama.
      faroles.forEach((f, i) => { f.userData.base ??= base[i]; f.intensity = f.userData.base * (0.92 + 0.08 * Math.sin(t * 9 + i * 2.1) * Math.sin(t * 3.3 + i)); });
      lava.intensity = (lava.userData.base ?? 14) * (0.85 + 0.15 * Math.sin(t * 1.7));
      tienda.tere.cuadro(Math.floor(t * 1.6) % 2, 0);
    },
  };
}
