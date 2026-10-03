// Post-proceso: bloom con umbral alto (solo lo emisivo), viñeta, desenfoque lejano (solo calidad alta).
import * as THREE from 'three';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RENDER } from '../config/balance';
import type { Calidad } from '../game/tipos';

const VINETA = {
  uniforms: { tDiffuse: { value: null }, fuerza: { value: RENDER.VINETA.fuerza }, suavidad: { value: RENDER.VINETA.suavidad } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float fuerza; uniform float suavidad; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5; float v = smoothstep(0.85, 0.85 - suavidad, length(d) * 1.35);
      c.rgb *= mix(1.0 - fuerza, 1.0, v);
      gl_FragColor = c; }`,
};

export class Post {
  readonly composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private bokeh: BokehPass;
  private vineta: ShaderPass;
  private salida: OutputPass;

  constructor(private renderer: THREE.WebGLRenderer, scene: THREE.Scene, private camera: THREE.PerspectiveCamera, ancho: number, alto: number) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.bokeh = new BokehPass(scene, camera, { focus: 7, aperture: 0.00012, maxblur: 0.006 });
    this.composer.addPass(this.bokeh);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(ancho, alto), RENDER.BLOOM.fuerza, RENDER.BLOOM.radio, RENDER.BLOOM.umbral);
    this.composer.addPass(this.bloom);
    this.vineta = new ShaderPass(VINETA);
    this.composer.addPass(this.vineta);
    this.salida = new OutputPass();
    this.composer.addPass(this.salida);
    this.redimensionar(ancho, alto);
  }

  aplicarCalidad(c: Calidad): void {
    const q = RENDER.CALIDAD[c];
    this.bloom.enabled = q.bloom;
    this.bokeh.enabled = q.dof;
  }

  redimensionar(ancho: number, alto: number): void {
    this.composer.setPixelRatio(1);
    this.composer.setSize(ancho, alto);
    this.bloom.setSize(ancho, alto);
  }

  renderizar(dt: number): void {
    this.composer.render(dt);
  }

  get camara(): THREE.PerspectiveCamera { return this.camera; }
}
