// Teclado y ratón. El ratón se convierte en celda con un rayo contra el plano frontal de los bloques.
import * as THREE from 'three';

const DIRECCIONES: Record<string, readonly [number, number]> = {
  KeyW: [0, -1], ArrowUp: [0, -1],
  KeyS: [0, 1], ArrowDown: [0, 1],
  KeyA: [-1, 0], ArrowLeft: [-1, 0],
  KeyD: [1, 0], ArrowRight: [1, 0],
};

const sostenidas: string[] = []; // teclas de dirección, la última apretada manda
export const raton = { ndcX: 0, ndcY: 0, presionado: false, dentro: false };

let camara: THREE.Camera | null = null;
const rayo = new THREE.Raycaster();
const plano = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.5); // z = 0.5
const punto = new THREE.Vector3();
const ndc = new THREE.Vector2();
const celda = { x: 0, y: 0 };

function soltarTodo(): void {
  sostenidas.length = 0;
  raton.presionado = false;
}

export function iniciarInput(canvas: HTMLCanvasElement, cam: THREE.Camera): void {
  camara = cam;
  window.addEventListener('keydown', (e) => {
    if (!(e.code in DIRECCIONES)) return;
    const el = document.activeElement;
    // En los paneles las flechas son de la interfaz, no del minero.
    if (el && el !== document.body && el !== canvas) return;
    e.preventDefault();
    if (!sostenidas.includes(e.code)) sostenidas.push(e.code);
  });
  window.addEventListener('keyup', (e) => {
    const i = sostenidas.indexOf(e.code);
    if (i >= 0) sostenidas.splice(i, 1);
  });
  window.addEventListener('blur', soltarTodo);
  window.addEventListener('pointermove', (e) => {
    raton.ndcX = (e.clientX / window.innerWidth) * 2 - 1;
    raton.ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
    raton.dentro = e.target === canvas;
  });
  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    raton.presionado = true;
    raton.dentro = true;
    (document.activeElement as HTMLElement | null)?.blur?.();
  });
  window.addEventListener('pointerup', () => { raton.presionado = false; });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('pointerleave', () => { raton.dentro = false; });
}

/** Dirección sostenida, o null. */
export function direccion(): readonly [number, number] | null {
  if (sostenidas.length === 0) return null;
  return DIRECCIONES[sostenidas[sostenidas.length - 1]];
}

export function soltarInput(): void { soltarTodo(); }

/** Celda bajo el cursor (objeto reutilizado), o null si el cursor está fuera del juego. */
export function celdaRaton(): { x: number; y: number } | null {
  if (!camara || !raton.dentro) return null;
  ndc.set(raton.ndcX, raton.ndcY);
  rayo.setFromCamera(ndc, camara);
  if (!rayo.ray.intersectPlane(plano, punto)) return null;
  celda.x = Math.round(punto.x);
  celda.y = Math.round(-punto.y);
  return celda;
}
