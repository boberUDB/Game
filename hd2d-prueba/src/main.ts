// Prueba de estilo HD-2D: sprites pixel art iluminados dentro de un mundo 3D de bloques,
// con desenfoque arriba y abajo, brillo, viñeta, luz cálida de faroles contra noche fría.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader.js';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader.js';
import { COL, MINERO, SPR, TEX, crearArte } from './arte';
import { ANCHO, alto, bloqueada, construirMundo, crearSprite } from './mundo';

crearArte();

// ---------------------------------------------------------------- Render
const canvas = document.getElementById('lienzo') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(30, 16 / 9, 0.5, 120);
const CAM = new THREE.Vector3(0, 9.5, 13.5);
const niebla = new THREE.Fog(0x0a0f24, 24, 58);
escena.fog = niebla;
escena.background = new THREE.Color(0x0a0f24);

const mundo = construirMundo(escena);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(escena, camara));
const focoH = new ShaderPass(HorizontalTiltShiftShader);
const focoV = new ShaderPass(VerticalTiltShiftShader);
composer.addPass(focoH);
composer.addPass(focoV);
const brillo = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.4, 0.6, 0.92);
composer.addPass(brillo);
const final = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, vineta: { value: 0.55 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float vineta; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      float d = length((vUv - 0.5) * vec2(1.0, 1.15));
      c.rgb *= mix(1.0, 1.0 - vineta, smoothstep(0.3, 0.85, d));
      float gris = dot(c.rgb, vec3(0.299, 0.587, 0.114));
      c.rgb = mix(vec3(gris), c.rgb, 1.12);
      gl_FragColor = c;
    }`,
});
composer.addPass(final);
composer.addPass(new OutputPass());

const FUERZA_FOCO = 3.2;
function redimensionar(): void {
  const w = window.innerWidth, h = window.innerHeight;
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pr);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(pr);
  composer.setSize(w, h);
  camara.aspect = w / h;
  // En pantallas angostas se abre el campo de visión para no perder los lados.
  camara.fov = camara.aspect < 1 ? 42 : 30;
  camara.updateProjectionMatrix();
  focoH.uniforms.h.value = ajustes.foco ? FUERZA_FOCO / w : 0;
  focoV.uniforms.v.value = ajustes.foco ? FUERZA_FOCO / h : 0;
  focoH.uniforms.r.value = focoV.uniforms.r.value = 0.5;
}

// ---------------------------------------------------------------- Ajustes y luz
const ajustes = { foco: true, brillo: true, noche: true };

function aplicarLuz(): void {
  const n = ajustes.noche;
  mundo.hemi.color.setHex(n ? 0x3b4f8f : 0xffc79a);
  mundo.hemi.groundColor.setHex(n ? 0x1a1420 : 0x3a2a30);
  mundo.hemi.intensity = n ? 0.7 : 1.1;
  mundo.luna.color.setHex(n ? 0x9fb4ff : 0xffa25e);
  mundo.luna.intensity = n ? 1.0 : 2.2;
  mundo.luna.userData.desde = n ? new THREE.Vector3(-8, 14, 6) : new THREE.Vector3(-14, 7, 5);
  const fondo = n ? 0x0a0f24 : 0x3a2230;
  niebla.color.setHex(fondo);
  (escena.background as THREE.Color).setHex(fondo);
  const bases = n ? [16, 15, 15] : [7, 6, 6];
  mundo.faroles.forEach((f, i) => { f.userData.base = bases[i]; });
  mundo.lava.userData.base = n ? 14 : 9;
  mundo.rayos.forEach((r) => {
    const m = r.material as THREE.MeshBasicMaterial;
    m.color.setHex(n ? 0x9fb4ff : 0xffb070);
    m.opacity = n ? 0.1 : 0.2;
  });
  document.getElementById('e-luz')!.textContent = n ? 'noche' : 'atardecer';
}

// ---------------------------------------------------------------- Minero y mascota
const minero = crearSprite(SPR.minero, MINERO.columnas, MINERO.filas, 1.5, 2);
escena.add(minero.malla);
const torogoz = crearSprite(SPR.torogoz, 2, 1, 1, 1);
escena.add(torogoz.malla);

const sombraTex = new THREE.CanvasTexture(SPR.sombra);
sombraTex.magFilter = sombraTex.minFilter = THREE.NearestFilter;
const sombra = new THREE.Mesh(
  new THREE.PlaneGeometry(1.2, 0.6),
  new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false }),
);
sombra.rotation.x = -Math.PI / 2;
escena.add(sombra);

// Lámpara del casco
const lampara = new THREE.PointLight(0xffd9a0, 3.5, 6, 2);
escena.add(lampara);

const jugador = { x: 18, z: 15, y: 0.5, fila: 0, espejo: 1, tAnim: 0, picando: -1 };
const mascota = new THREE.Vector3(jugador.x - 1, 2, jugador.z);
const VELOCIDAD = 4.2;

const teclas = new Set<string>();
const assetsEl = document.getElementById('assets')!;
window.addEventListener('keydown', (e) => {
  if (e.code === 'Tab') { e.preventDefault(); assetsEl.toggleAttribute('data-abierto'); return; }
  if (e.repeat) return;
  teclas.add(e.code);
  if (e.code === 'Space') { e.preventDefault(); if (jugador.picando < 0) jugador.picando = 0; }
  if (e.code === 'KeyF') { ajustes.foco = !ajustes.foco; redimensionar(); document.getElementById('e-foco')!.textContent = ajustes.foco ? 'sí' : 'no'; }
  if (e.code === 'KeyB') { ajustes.brillo = !ajustes.brillo; brillo.enabled = ajustes.brillo; document.getElementById('e-brillo')!.textContent = ajustes.brillo ? 'sí' : 'no'; }
  if (e.code === 'KeyN') { ajustes.noche = !ajustes.noche; aplicarLuz(); }
  if (e.code === 'KeyH') { const a = document.getElementById('ayuda')!; a.hidden = !a.hidden; }
});
window.addEventListener('keyup', (e) => teclas.delete(e.code));
window.addEventListener('blur', () => teclas.clear());
canvas.addEventListener('pointerdown', () => { if (jugador.picando < 0) jugador.picando = 0; });

function puedeEntrar(x: number, z: number): boolean {
  const cx = Math.round(x), cz = Math.round(z);
  if (bloqueada(cx, cz)) return false;
  return Math.abs(alto(cx, cz) - alto(Math.round(jugador.x), Math.round(jugador.z))) <= 1;
}

function actualizarJugador(dt: number): void {
  let dx = (teclas.has('KeyD') || teclas.has('ArrowRight') ? 1 : 0) - (teclas.has('KeyA') || teclas.has('ArrowLeft') ? 1 : 0);
  let dz = (teclas.has('KeyS') || teclas.has('ArrowDown') ? 1 : 0) - (teclas.has('KeyW') || teclas.has('ArrowUp') ? 1 : 0);
  const largo = Math.hypot(dx, dz);
  const moviendo = largo > 0 && jugador.picando < 0;
  if (moviendo) {
    dx /= largo; dz /= largo;
    const nx = jugador.x + dx * VELOCIDAD * dt, nz = jugador.z + dz * VELOCIDAD * dt;
    if (puedeEntrar(nx, jugador.z)) jugador.x = nx;
    if (puedeEntrar(jugador.x, nz)) jugador.z = nz;
    if (Math.abs(dx) > Math.abs(dz) + 0.01) { jugador.fila = 2; jugador.espejo = dx < 0 ? -1 : 1; }
    else { jugador.fila = dz > 0 ? 0 : 1; jugador.espejo = 1; }
  }
  const suelo = alto(Math.round(jugador.x), Math.round(jugador.z)) + 0.5;
  jugador.y += (suelo - jugador.y) * (1 - Math.exp(-14 * dt));

  jugador.tAnim += dt;
  let col: number;
  if (jugador.picando >= 0) {
    jugador.picando += dt;
    col = COL.picar + Math.min(2, Math.floor(jugador.picando / 0.09));
    if (jugador.picando > 0.36) jugador.picando = -1;
  } else if (moviendo) col = COL.caminar + (Math.floor(jugador.tAnim * 8) % 4);
  else col = COL.reposo + (Math.floor(jugador.tAnim * 2) % 2);
  minero.cuadro(col, jugador.fila);
  minero.malla.scale.x = jugador.espejo;
  minero.malla.position.set(jugador.x, jugador.y, jugador.z);
  sombra.position.set(jugador.x, suelo + 0.02, jugador.z + 0.05);
  lampara.position.set(jugador.x, jugador.y + 1.6, jugador.z + 0.8);

  // El Torogoz sigue con retraso y flota.
  const k = 1 - Math.exp(-3.5 * dt);
  mascota.x += (jugador.x - jugador.espejo * 1.1 - mascota.x) * k;
  mascota.z += (jugador.z - 0.2 - mascota.z) * k;
  mascota.y += (jugador.y + 1.5 - mascota.y) * k;
  torogoz.malla.position.set(mascota.x, mascota.y + Math.sin(jugador.tAnim * 4.5) * 0.15, mascota.z);
  torogoz.malla.scale.x = jugador.x >= mascota.x ? 1 : -1;
  torogoz.cuadro(Math.floor(jugador.tAnim * 7) % 2, 0);
}

const foco = new THREE.Vector3(jugador.x, 1.5, jugador.z);
function actualizarCamara(dt: number): void {
  const k = 1 - Math.exp(-5 * dt);
  const ox = Math.min(ANCHO - 12, Math.max(11, jugador.x));
  const oz = Math.min(19, Math.max(9, jugador.z));
  foco.x += (ox - foco.x) * k;
  foco.z += (oz - foco.z) * k;
  foco.y += (jugador.y + 1 - foco.y) * k;
  camara.position.copy(foco).add(CAM);
  camara.lookAt(foco);
  const desde = mundo.luna.userData.desde as THREE.Vector3;
  mundo.luna.position.copy(foco).add(desde);
  mundo.luna.target.position.copy(foco);
}

// ---------------------------------------------------------------- Visor de assets
function construirVisor(): void {
  const cuerpo = document.getElementById('assets-cuerpo')!;
  const seccion = (titulo: string, items: [string, HTMLCanvasElement][], escala: number) => {
    const h = document.createElement('h3');
    h.textContent = titulo;
    const r = document.createElement('div');
    r.className = 'rejilla';
    for (const [nombre, c] of items) {
      const fig = document.createElement('figure');
      const copia = document.createElement('canvas');
      copia.width = c.width; copia.height = c.height;
      copia.getContext('2d')!.drawImage(c, 0, 0);
      copia.style.width = c.width * escala + 'px';
      copia.style.height = c.height * escala + 'px';
      const cap = document.createElement('figcaption');
      cap.textContent = `${nombre}  ${c.width}x${c.height}`;
      fig.append(copia, cap);
      r.appendChild(fig);
    }
    cuerpo.append(h, r);
  };
  const de = (o: Record<string, HTMLCanvasElement>, nombres: string[]) => nombres.map((n) => [n, o[n]] as [string, HTMLCanvasElement]);
  seccion('Minero: filas frente, espalda y lado; columnas reposo (2), caminar (4), picar (3)', de(SPR, ['minero']), 4);
  seccion('Personajes y mascota', de(SPR, ['tere', 'torogoz']), 5);
  seccion('Bloques de terreno', de(TEX, ['tierra', 'roca', 'basalto', 'basalto_lava', 'estrato', 'empedrado']), 6);
  seccion('Minerales y fósil', de(TEX, ['azufre', 'hierro', 'obsidiana', 'jade', 'fosil']), 6);
  seccion('Construcción', de(TEX, ['adobe', 'madera', 'teja', 'caja', 'barril', 'rotulo']), 6);
  seccion('Plantas y objetos', de(SPR, ['izote', 'maguey', 'arbusto', 'farol']), 5);
}

/** Devuelve todos los assets como PNG en base64, para guardarlos en disco. */
(window as unknown as Record<string, unknown>).__exportar = () => {
  const res: Record<string, string> = {};
  for (const [n, c] of Object.entries(TEX)) if (n !== 'rayo') res['texturas/' + n] = c.toDataURL('image/png');
  for (const [n, c] of Object.entries(SPR)) res['sprites/' + n] = c.toDataURL('image/png');
  return res;
};

// ---------------------------------------------------------------- Loop
construirVisor();
aplicarLuz();
window.addEventListener('resize', redimensionar);
redimensionar();

let antes = performance.now();
let tiempo = 0;
function frame(ahora: number): void {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (ahora - antes) / 1000);
  antes = ahora;
  if (document.hidden || assetsEl.hasAttribute('data-abierto')) return;
  tiempo += dt;
  actualizarJugador(dt);
  actualizarCamara(dt);
  mundo.actualizar(dt, tiempo);
  composer.render(dt);
}
requestAnimationFrame(frame);
