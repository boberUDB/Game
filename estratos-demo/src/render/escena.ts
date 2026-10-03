// Renderer, cámara, luces, niebla, fondo y composer con bloom.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { MINA, PALETA, RENDER } from '../config';
import { estado } from '../state';
import { movimientoReducido, posMinero, vista } from './compartido';
import { texturaCielo, texturaRelleno } from './texturas';

export const escena = new THREE.Scene();
export const camara = new THREE.PerspectiveCamera(RENDER.FOV, 16 / 9, 0.1, 220);
export let renderer: THREE.WebGLRenderer;

let composer: EffectComposer;
let bloom: UnrealBloomPass;
let usarBloom = true;
let pixelRatioMax = 1.5;

const ambiente = new THREE.AmbientLight(0xffffff, 0.9);
const sol = new THREE.DirectionalLight(PALETA.sol, 1.4);
const lampara = new THREE.PointLight(PALETA.lampara, 16, 9, 1.6);
const luzTienda = new THREE.PointLight(PALETA.lava, 10, 8, 1.6);
const niebla = new THREE.Fog(PALETA.niebla, RENDER.NIEBLA_CERCA, RENDER.NIEBLA_LEJOS);

const foco = new THREE.Vector3(MINA.ANCHO / 2, 0, 0);
let zoom = 0;
let reloj = 0;
let cielo: THREE.Mesh;
let fondoInferior: THREE.Mesh;

const blanco = new THREE.Color(0xffffff);
const colorLava = new THREE.Color(PALETA.lava);
const ALTO_MAX = MINA.ALTO_BASE + MINA.MAX_ESTRATOS * MINA.FILAS_POR_ESTRATO;

function construirFondo(): void {
  cielo = new THREE.Mesh(
    new THREE.PlaneGeometry(98, 49),
    new THREE.MeshBasicMaterial({ map: texturaCielo(), fog: false }),
  );
  cielo.position.set(MINA.ANCHO / 2, 2.5, -40);
  escena.add(cielo);

  // Llanura de la superficie, detrás de la mina.
  const llano = new THREE.Mesh(
    new THREE.PlaneGeometry(180, 8),
    new THREE.MeshStandardMaterial({ map: texturaRelleno(PALETA.tierra, 0.55, 180, 8), roughness: 1 }),
  );
  llano.rotation.x = -Math.PI / 2;
  llano.position.set(MINA.ANCHO / 2, -0.5, -4.5);
  llano.receiveShadow = true;
  escena.add(llano);

  // Pared del fondo: lo que se ve dentro de los túneles.
  const altoPared = ALTO_MAX + 40;
  const pared = new THREE.Mesh(
    new THREE.PlaneGeometry(MINA.ANCHO + 80, altoPared),
    new THREE.MeshStandardMaterial({ map: texturaRelleno(PALETA.roca, 0.42, MINA.ANCHO + 80, altoPared), roughness: 1 }),
  );
  pared.position.set(MINA.ANCHO / 2 - 0.5, -0.5 - altoPared / 2, -0.5);
  pared.receiveShadow = true;
  escena.add(pared);

  // Roca maciza a los lados y debajo de la mina.
  const matRelleno = (repX: number, repY: number) =>
    new THREE.MeshStandardMaterial({ map: texturaRelleno(PALETA.borde, 1, repX, repY), roughness: 1 });
  const altoLado = ALTO_MAX + 40;
  for (const lado of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(40, altoLado, 1), matRelleno(40, altoLado));
    m.position.set(lado < 0 ? -20.5 : MINA.ANCHO - 0.5 + 20, -0.5 - altoLado / 2, 0);
    escena.add(m);
  }
  fondoInferior = new THREE.Mesh(new THREE.BoxGeometry(MINA.ANCHO, 30, 1), matRelleno(MINA.ANCHO, 30));
  fondoInferior.position.set(MINA.ANCHO / 2 - 0.5, 0, 0);
  escena.add(fondoInferior);
  ajustarFondo();
}

/** La mina crece con cada estrato: el relleno inferior baja con ella. */
export function ajustarFondo(): void {
  fondoInferior.position.y = -(estado.mina.alto - 1) - 0.5 - 15;
}

export function iniciarEscena(canvas: HTMLCanvasElement): void {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  escena.background = new THREE.Color(PALETA.fondo);
  escena.fog = niebla;

  sol.shadow.mapSize.set(1024, 1024);
  sol.shadow.camera.left = -16; sol.shadow.camera.right = 16;
  sol.shadow.camera.top = 12; sol.shadow.camera.bottom = -12;
  sol.shadow.camera.near = 1; sol.shadow.camera.far = 50;
  sol.shadow.bias = -0.002;
  luzTienda.position.set(3, 0.6, 1.6);
  escena.add(ambiente, sol, sol.target, lampara, luzTienda);

  construirFondo();

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(escena, camara));
  bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), RENDER.BLOOM_FUERZA, RENDER.BLOOM_RADIO, RENDER.BLOOM_UMBRAL);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  window.addEventListener('resize', redimensionar);
  redimensionar();
  foco.set(posMinero.x, posMinero.y, 0);
}

function redimensionar(): void {
  const w = window.innerWidth, h = window.innerHeight;
  const pr = Math.min(window.devicePixelRatio || 1, pixelRatioMax);
  renderer.setPixelRatio(pr);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(pr);
  composer.setSize(w, h);
  // El bloom trabaja a media resolución.
  bloom.resolution.set(Math.round((w * pr) / 2), Math.round((h * pr) / 2));
  camara.aspect = w / h;
  camara.updateProjectionMatrix();
}

export function configurarCalidad(opc: { bloom: boolean; sombras: boolean; pixelRatio: number }): void {
  usarBloom = opc.bloom;
  sol.castShadow = opc.sombras;
  pixelRatioMax = opc.pixelRatio;
  redimensionar();
}

/** Coloca la cámara de golpe, sin transición (al cargar o tras un colapso). */
export function centrarCamara(): void {
  foco.set(posMinero.x, posMinero.y, 0);
}

function actualizarCamara(dt: number): void {
  reloj += dt;
  const j = estado.jugador;
  const enTitulo = estado.pantalla === 'titulo';
  let objX: number, objY: number, zoomObjetivo: number;

  if (vista.cine) {
    objX = MINA.ANCHO / 2 - 0.5; objY = vista.cineY; zoomObjetivo = vista.cineZoom;
  } else if (enTitulo) {
    objX = MINA.ANCHO / 2 + (movimientoReducido() ? 0 : Math.sin(reloj * 0.12) * 4);
    objY = -1.5; zoomObjetivo = 5;
  } else {
    const ax = j.mirando === 'izq' ? -1 : j.mirando === 'der' ? 1 : 0;
    const ay = j.mirando === 'arriba' ? 1 : j.mirando === 'abajo' ? -1 : 0;
    objX = Math.min(MINA.ANCHO - 8, Math.max(7, posMinero.x + ax * RENDER.CAM_ADELANTO));
    objY = posMinero.y + ay * RENDER.CAM_ADELANTO;
    zoomObjetivo = 0;
  }

  const k = 1 - Math.exp(-RENDER.CAM_SEGUIMIENTO * dt);
  const kLento = 1 - Math.exp(-2.5 * dt);
  foco.x += (objX - foco.x) * (enTitulo ? kLento : k);
  foco.y += (objY - foco.y) * (enTitulo ? kLento : k);
  zoom += (zoomObjetivo - zoom) * kLento;

  let sx = 0, sy = 0;
  if (vista.sacudida > 0.001 && !movimientoReducido()) {
    sx = (Math.random() - 0.5) * 2 * vista.sacudida;
    sy = (Math.random() - 0.5) * 2 * vista.sacudida;
    if (!vista.cine) vista.sacudida *= Math.exp(-dt / RENDER.SACUDIDA_DECAE_SEG * 3);
  } else if (!vista.cine) vista.sacudida = 0;

  camara.position.set(foco.x + sx, foco.y + RENDER.CAM_ALTURA + zoom * 0.25 + sy, RENDER.CAM_DISTANCIA + zoom);
  camara.lookAt(foco.x + sx, foco.y + sy, 0);

  niebla.near = RENDER.NIEBLA_CERCA + zoom;
  niebla.far = RENDER.NIEBLA_LEJOS + zoom * 1.6;
  cielo.position.x = MINA.ANCHO / 2 + (foco.x - MINA.ANCHO / 2) * 0.85;

  // Luces según la profundidad: abajo hay menos sol y, desde la fila 30, tinte de lava.
  const prof = Math.max(0, -foco.y);
  const t = Math.min(1, prof / 12);
  ambiente.intensity = 0.95 - 0.5 * t;
  sol.intensity = 1.5 - 0.95 * t;
  const lava = Math.min(1, Math.max(0, (prof - RENDER.FILA_TINTE_LAVA + 6) / 12)) * 0.4;
  ambiente.color.copy(blanco).lerp(colorLava, lava);
  sol.position.set(foco.x - 7, foco.y + 12, 10);
  sol.target.position.set(foco.x, foco.y, 0);
  lampara.position.set(posMinero.x, posMinero.y + 0.2, 1.6);
  lampara.intensity = 6 + 12 * t;
}

export function renderizar(dt: number): void {
  actualizarCamara(dt);
  if (usarBloom) composer.render(dt);
  else renderer.render(escena, camara);
}
