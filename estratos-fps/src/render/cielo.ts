// Cielo nocturno: cúpula con degradado, estrellas, luna y la silueta del volcán al fondo.
import * as THREE from 'three';
import { MUNDO, RENDER } from '../config/balance';
import { mulberry32 } from '../game/rng';
import type { Texturas } from './texturas';

export class Cielo {
  readonly grupo = new THREE.Group();
  private volcan: THREE.Mesh;
  readonly direccionLuna = new THREE.Vector3(-0.35, 0.75, -0.55).normalize();

  constructor(tex: Texturas) {
    const cupula = new THREE.Mesh(
      new THREE.SphereGeometry(100, 24, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: {
          arriba: { value: new THREE.Color(0x080a1c) },
          medio: { value: new THREE.Color(0x1a2352) },
          horizonte: { value: new THREE.Color(0x2a7b80) },
        },
        vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: `varying vec3 vP; uniform vec3 arriba; uniform vec3 medio; uniform vec3 horizonte;
          void main(){ float h = normalize(vP).y;
            vec3 c = mix(horizonte, medio, smoothstep(-0.05, 0.22, h));
            c = mix(c, arriba, smoothstep(0.18, 0.85, h));
            c = mix(c * 0.5, c, step(0.0, h));
            gl_FragColor = vec4(c, 1.0); }`,
      }),
    );
    cupula.renderOrder = -10;
    cupula.frustumCulled = false;
    this.grupo.add(cupula);

    // Estrellas.
    const azar = mulberry32(99);
    const pos: number[] = [], col: number[] = [];
    for (let i = 0; i < RENDER.ESTRELLAS; i++) {
      const u = azar(), v = azar();
      const th = u * Math.PI * 2, ph = Math.acos(1 - v * 0.95);
      pos.push(Math.sin(ph) * Math.cos(th) * 95, Math.cos(ph) * 95, Math.sin(ph) * Math.sin(th) * 95);
      const b = 0.5 + azar() * 0.5;
      col.push(0.91 * b, 0.83 * b, 0.63 * b + 0.2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    const estrellas = new THREE.Points(g, new THREE.PointsMaterial({ size: 2, sizeAttenuation: false, vertexColors: true, fog: false, depthWrite: false }));
    estrellas.renderOrder = -9;
    estrellas.frustumCulled = false;
    this.grupo.add(estrellas);

    // Luna.
    const lienzo = document.createElement('canvas');
    lienzo.width = lienzo.height = 64;
    const c = lienzo.getContext('2d')!;
    const grad = c.createRadialGradient(32, 32, 6, 32, 32, 32);
    grad.addColorStop(0, 'rgba(232,211,160,1)');
    grad.addColorStop(0.35, 'rgba(138,160,207,0.9)');
    grad.addColorStop(0.5, 'rgba(138,160,207,0.15)');
    grad.addColorStop(1, 'rgba(138,160,207,0)');
    c.fillStyle = grad;
    c.fillRect(0, 0, 64, 64);
    const luna = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(lienzo), fog: false, depthWrite: false, transparent: true }));
    luna.position.copy(this.direccionLuna).multiplyScalar(90);
    luna.scale.set(22, 22, 1);
    luna.renderOrder = -8;
    this.grupo.add(luna);

    // Volcán: silueta fija hacia el norte.
    this.volcan = new THREE.Mesh(
      new THREE.PlaneGeometry(170, 64),
      new THREE.MeshBasicMaterial({ map: tex.sprites.volcan, transparent: true, alphaTest: 0.5, fog: false, depthWrite: false }),
    );
    this.volcan.position.set(0, 8, -96);
    this.volcan.renderOrder = -7;
    this.volcan.frustumCulled = false;
    this.grupo.add(this.volcan);
  }

  /** La cúpula sigue a la cámara; el volcán queda a una altura fija sobre el horizonte del suelo. */
  actualizar(cam: THREE.Vector3): void {
    this.grupo.position.set(cam.x, cam.y, cam.z);
    this.volcan.position.y = MUNDO.SUELO_Y - cam.y + 22;
  }
}
