// Render con Three.js. Lee el Juego y escucha eventos; nunca escribe en el Juego.
import * as THREE from 'three';
import { JUGADOR, LUGARES, MUNDO, RENDER, SENSACION, ASCENSOR } from '../config/balance';
import { resolucionInterna } from '../config/pantalla';
import { NORMALES } from '../game/dda';
import { on } from '../game/eventos';
import { direccionMirada } from '../game/jugador';
import { chunkDeClave } from '../game/mundo';
import { BloqueId, NOMBRES_BLOQUE, mineralDeBloque } from '../game/tipos';
import type { Calidad, Juego } from '../game/tipos';
import { Cielo } from './cielo';
import { BloquesCayendo, Particulas, PolvoFlotante, Sacudida, colorDeMineral, texturaPunto } from './efectos';
import { mallarChunk } from './mallado';
import { Post } from './post';
import { Sprites } from './sprites';
import type { Texturas } from './texturas';

const EMISION: Record<number, number> = {
  [BloqueId.piedra_azufre]: RENDER.EMISION_MINERAL, [BloqueId.piedra_oro]: RENDER.EMISION_MINERAL,
  [BloqueId.piedra_esmeralda]: RENDER.EMISION_MINERAL, [BloqueId.piedra_rubi]: RENDER.EMISION_MINERAL,
  [BloqueId.piedra_zafiro]: RENDER.EMISION_MINERAL,
  [BloqueId.fosil_0]: RENDER.EMISION_FOSIL, [BloqueId.fosil_1]: RENDER.EMISION_FOSIL, [BloqueId.fosil_2]: RENDER.EMISION_FOSIL,
  [BloqueId.arenisca_jeroglificos]: RENDER.EMISION_FONDO,
};

const COLOR_POLVO: Record<number, [number, number, number]> = {
  [BloqueId.tierra]: [0.54, 0.42, 0.29], [BloqueId.piedra]: [0.34, 0.44, 0.68], [BloqueId.obsidiana]: [0.42, 0.25, 0.56],
  [BloqueId.estrato_0]: [0.62, 0.42, 0.74], [BloqueId.estrato_1]: [0.38, 0.71, 0.65], [BloqueId.estrato_2]: [0.89, 0.73, 0.33],
};
const COLOR_FOSIL: [number, number, number][] = [[0.62, 0.42, 0.74], [0.38, 0.71, 0.65], [0.89, 0.73, 0.33]];

export interface Estadisticas { llamadas: number; triangulos: number; chunks: number; geometrias: number }

export class Render {
  readonly renderer: THREE.WebGLRenderer;
  readonly escena = new THREE.Scene();
  readonly camara: THREE.PerspectiveCamera;
  private post: Post;
  private cielo: Cielo;
  private sprites: Sprites;
  private materiales: THREE.MeshLambertMaterial[] = [];
  private chunks = new Map<number, THREE.Mesh>();
  private luzAmbiente = new THREE.AmbientLight(0x4a63a8, 1);
  private luna = new THREE.DirectionalLight(0x8aa0cf, 1);
  private farol = new THREE.PointLight(0xffc474, RENDER.LUZ_FAROL.intensidad, RENDER.LUZ_FAROL.distancia, RENDER.LUZ_FAROL.decae);
  private luzFogata = new THREE.PointLight(0xd9732a, 20, 22, 1.5);
  private lucesFaroles: THREE.PointLight[] = [];
  private luzSalita = new THREE.PointLight(0xf5b942, 0, 12, 1.6);
  private chispas: Particulas;
  private polvo: Particulas;
  private fosilP: Particulas;
  private flotante: PolvoFlotante;
  private caida: BloquesCayendo;
  private sacudida = new Sacudida();
  private contorno: THREE.LineSegments;
  private grieta: THREE.Mesh;
  private fovActual = RENDER.FOV_DEFECTO;
  private previo = { x: 0, y: 0, z: 0, guinada: 0, cabeceo: 0 };
  private reconstruirTodo = true;
  private calidad: Calidad = 'medio';
  reducirMovimiento = false;
  private juego: Juego;
  readonly stats: Estadisticas = { llamadas: 0, triangulos: 0, chunks: 0, geometrias: 0 };
  /** Se llama cuando un fósil se rompe (para cámara lenta y pausa de impacto en main). */
  alImpacto: ((tipo: 'mineral' | 'fosil') => void) | null = null;

  constructor(readonly canvas: HTMLCanvasElement, juego: Juego, private tex: Texturas) {
    this.juego = juego;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false });
    this.renderer.setPixelRatio(1);
    this.renderer.info.autoReset = false;
    this.camara = new THREE.PerspectiveCamera(juego.ajustes.fov, 16 / 9, RENDER.CERCA, RENDER.LEJOS);
    this.camara.rotation.order = 'YXZ';
    this.escena.fog = new THREE.FogExp2(0x10153a, RENDER.NIEBLA_SUPERFICIE);

    // Materiales: uno por tipo de bloque.
    this.materiales[0] = new THREE.MeshLambertMaterial();
    for (let id = 1; id < NOMBRES_BLOQUE.length; id++) {
      const n = NOMBRES_BLOQUE[id];
      const e = EMISION[id];
      this.materiales[id] = new THREE.MeshLambertMaterial({
        map: tex.bloques[n], vertexColors: true,
        ...(e ? { emissive: 0xffffff, emissiveMap: tex.emision[n], emissiveIntensity: e } : {}),
      });
    }

    // Luces.
    this.escena.add(this.luzAmbiente, this.luna, this.farol, this.luzFogata, this.luzSalita);
    this.escena.add(this.luna.target);
    for (const f of LUGARES.FAROLES) {
      const l = new THREE.PointLight(0xf5b942, 9, 14, 1.6);
      l.position.set(f.x, MUNDO.SUELO_Y + 1.5, f.z);
      this.lucesFaroles.push(l);
      this.escena.add(l);
    }
    this.luzFogata.position.set(LUGARES.FOGATA.x, MUNDO.SUELO_Y + 0.9, LUGARES.FOGATA.z);

    this.cielo = new Cielo(tex);
    this.escena.add(this.cielo.grupo);
    this.sprites = new Sprites(tex);
    this.escena.add(this.sprites.grupo);

    const q = RENDER.CALIDAD.alto;
    const punto = texturaPunto();
    this.chispas = new Particulas(q.particulas, punto, 0.08, 9);
    this.polvo = new Particulas(q.particulas, tex.sprites.polvo, 0.14, 2.5);
    this.fosilP = new Particulas(q.particulas, punto, 0.1, -0.4);
    this.flotante = new PolvoFlotante(q.polvo, tex.sprites.polvo);
    this.caida = new BloquesCayendo(70, new THREE.MeshLambertMaterial({ map: tex.bloques.piedra }));
    this.escena.add(this.chispas.puntos, this.polvo.puntos, this.fosilP.puntos, this.flotante.puntos, this.caida.malla);

    // Contorno fino y grietas del bloque apuntado.
    this.contorno = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.006, 1.006, 1.006)), new THREE.LineBasicMaterial({ color: 0xfff0b3, transparent: true, opacity: 0.75, fog: false }));
    this.contorno.visible = false;
    this.escena.add(this.contorno);
    const matGrieta = tex.grietas.map((g) => new THREE.MeshBasicMaterial({ map: g, transparent: true, alphaTest: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    this.grieta = new THREE.Mesh(new THREE.BoxGeometry(1.004, 1.004, 1.004), matGrieta[0]);
    (this.grieta.userData as { materiales: THREE.Material[] }).materiales = matGrieta;
    this.grieta.visible = false;
    this.escena.add(this.grieta);

    this.post = new Post(this.renderer, this.escena, this.camara, 640, 360);
    this.reducirMovimiento = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.conectarEventos();
    this.aplicarCalidad(juego.ajustes.calidad);
    this.redimensionar(window.innerWidth, window.innerHeight);
  }

  usarJuego(juego: Juego): void {
    this.juego = juego;
    this.reconstruirTodo = true;
    this.sprites.reiniciar();
  }

  aplicarCalidad(c: Calidad): void {
    this.calidad = c;
    this.post.aplicarCalidad(c);
    this.redimensionar(window.innerWidth, window.innerHeight);
  }

  redimensionar(w: number, h: number): void {
    const { ancho, alto } = resolucionInterna(this.calidad, w, h);
    this.renderer.setSize(ancho, alto, false);
    this.camara.aspect = ancho / alto;
    this.camara.updateProjectionMatrix();
    this.post.redimensionar(ancho, alto);
  }

  asignarPrevio(): void {
    const j = this.juego.jugador;
    this.previo = { x: j.pos.x, y: j.pos.y, z: j.pos.z, guinada: j.guinada, cabeceo: j.cabeceo };
  }

  private conectarEventos(): void {
    on('bloque:golpeado', () => {
      const j = this.juego;
      const o = j.picado.objetivo;
      if (!o) return;
      const n = NORMALES[o.cara >= 0 ? o.cara : 2];
      const e = j.jugador.pos;
      const d = direccionMirada(j.jugador);
      const px = e.x + d.x * o.distancia, py = e.y + JUGADOR.OJOS + d.y * o.distancia, pz = e.z + d.z * o.distancia;
      const b = j.mundo.get(o.x, o.y, o.z);
      const m = mineralDeBloque(b);
      const [r, g, bl] = m ? colorDeMineral(m) : [1, 0.75, 0.3];
      for (let i = 0; i < 6; i++) {
        this.chispas.emitir(px + n.x * 0.05, py + n.y * 0.05, pz + n.z * 0.05,
          n.x * 2 + (Math.random() - 0.5) * 3, n.y * 2 + Math.random() * 2, n.z * 2 + (Math.random() - 0.5) * 3, 0.4 + Math.random() * 0.3, r, g, bl);
      }
      this.sacudida.añadir(SENSACION.SACUDIDA_GOLPE);
    });
    on('bloque:roto', (e) => {
      const c = COLOR_POLVO[e.bloque] ?? [0.4, 0.5, 0.7];
      const m = mineralDeBloque(e.bloque);
      for (let i = 0; i < 12; i++) {
        this.polvo.emitir(e.x + 0.5, e.y + 0.5, e.z + 0.5, (Math.random() - 0.5) * 2.5, Math.random() * 2, (Math.random() - 0.5) * 2.5, 0.6 + Math.random() * 0.5, c[0] * 0.8, c[1] * 0.8, c[2] * 0.8);
      }
      if (m) {
        const [r, g, b] = colorDeMineral(m);
        for (let i = 0; i < 10; i++) this.chispas.emitir(e.x + 0.5, e.y + 0.5, e.z + 0.5, (Math.random() - 0.5) * 4, Math.random() * 4, (Math.random() - 0.5) * 4, 0.7, r, g, b);
        this.sacudida.añadir(SENSACION.SACUDIDA_MINERAL);
        this.alImpacto?.('mineral');
      } else if (e.fosilId) {
        this.sacudida.añadir(SENSACION.SACUDIDA_MINERAL * 2);
        this.alImpacto?.('fosil');
      } else {
        this.sacudida.añadir(SENSACION.SACUDIDA_ROTURA);
      }
    });
    on('momia:golpe', () => this.sacudida.añadir(SENSACION.SACUDIDA_GOLPE_MOMIA));
    on('jugador:golpeado', () => this.sacudida.añadir(SENSACION.SACUDIDA_GOLPE_MOMIA * 3));
    on('venta:hecha', () => this.sprites.cantar());
    on('colapso:inicio', () => { this.caida.iniciar(); });
    on('colapso:fin', () => { this.caida.detener(); });
    on('mundo:regenerado', () => { this.reconstruirTodo = true; this.sprites.reiniciar(); });
  }

  private reconstruirMallas(maxPorFrame: number): void {
    const m = this.juego.mundo;
    if (this.reconstruirTodo) {
      for (const [, mesh] of this.chunks) { this.escena.remove(mesh); mesh.geometry.dispose(); }
      this.chunks.clear();
      m.marcarTodoSucio();
      this.reconstruirTodo = false;
      maxPorFrame = Infinity;
    }
    if (m.sucios.size === 0) return;
    let hechos = 0;
    for (const k of [...m.sucios]) {
      if (hechos++ >= maxPorFrame) break;
      m.sucios.delete(k);
      const { cx, cy, cz } = chunkDeClave(k);
      const malla = mallarChunk(m, cx, cy, cz);
      const viejo = this.chunks.get(k);
      if (viejo) { this.escena.remove(viejo); viejo.geometry.dispose(); this.chunks.delete(k); }
      if (!malla.geometria) continue;
      const mesh = new THREE.Mesh(malla.geometria, malla.materiales.map((id) => this.materiales[id]));
      this.escena.add(mesh);
      this.chunks.set(k, mesh);
    }
  }

  /** Dibuja un cuadro. `alfa` interpola entre el paso anterior y el actual. */
  dibujar(alfa: number, dtReal: number, t: number): void {
    const juego = this.juego;
    const j = juego.jugador;
    this.reconstruirMallas(6);

    // Cámara interpolada.
    let px = j.pos.x, py = j.pos.y, pz = j.pos.z, gu = j.guinada, cab = j.cabeceo;
    const p = this.previo;
    if (Math.hypot(j.pos.x - p.x, j.pos.y - p.y, j.pos.z - p.z) < 3) {
      px = p.x + (j.pos.x - p.x) * alfa; py = p.y + (j.pos.y - p.y) * alfa; pz = p.z + (j.pos.z - p.z) * alfa;
      gu = p.guinada + (j.guinada - p.guinada) * alfa; cab = p.cabeceo + (j.cabeceo - p.cabeceo) * alfa;
    }
    this.sacudida.actualizar(dtReal, SENSACION.SACUDIDA_DECAE_SEG);
    let sh = this.reducirMovimiento ? 0 : this.sacudida.valor;
    if (juego.pantalla === 'colapso') sh = this.reducirMovimiento ? 0 : SENSACION.SACUDIDA_COLAPSO * Math.min(1, juego.colapso.reloj / 1.2);
    const velH = Math.hypot(j.vel.x, j.vel.z);
    const balanceo = this.reducirMovimiento || !j.enSuelo ? 0 : Math.sin(t * 9) * SENSACION.BALANCEO_CAMARA * Math.min(1, velH / 4.3);
    this.camara.position.set(px + (Math.random() - 0.5) * sh * 0.25, py + JUGADOR.OJOS + balanceo * 0.6 + (Math.random() - 0.5) * sh * 0.25, pz + (Math.random() - 0.5) * sh * 0.25);
    this.camara.rotation.set(cab + (Math.random() - 0.5) * sh * 0.5, gu + (Math.random() - 0.5) * sh * 0.5, balanceo * 0.4);

    const objetivoFov = juego.ajustes.fov + (!this.reducirMovimiento && velH > JUGADOR.CAMINA + 0.6 ? SENSACION.FOV_CORRER : 0);
    this.fovActual += (objetivoFov - this.fovActual) * Math.min(1, SENSACION.FOV_SUAVIZADO * dtReal);
    if (Math.abs(this.camara.fov - this.fovActual) > 0.01) { this.camara.fov = this.fovActual; this.camara.updateProjectionMatrix(); }

    // Luz y niebla según la profundidad.
    const prof = Math.max(0, MUNDO.SUELO_Y - py);
    const fuera = Math.max(0, Math.min(1, 1 - (prof - 1) / 5)); // 1 en superficie, 0 a 6 m
    const fog = this.escena.fog as THREE.FogExp2;
    fog.color.setRGB(0.063, 0.082, 0.227).lerp(new THREE.Color(0.031, 0.04, 0.11), 1 - fuera);
    fog.density = THREE.MathUtils.lerp(Math.min(RENDER.NIEBLA_MAX, RENDER.NIEBLA_MINA + prof * RENDER.NIEBLA_POR_METRO), RENDER.NIEBLA_SUPERFICIE, fuera);
    this.renderer.setClearColor(fog.color);
    this.luzAmbiente.intensity = THREE.MathUtils.lerp(RENDER.LUZ_AMBIENTE_MINA, RENDER.LUZ_AMBIENTE_SUPERFICIE, fuera);
    this.luna.intensity = RENDER.LUZ_LUNA * fuera;
    this.luna.position.copy(this.camara.position).addScaledVector(this.cielo.direccionLuna, 30);
    this.luna.target.position.copy(this.camara.position);
    { const d = direccionMirada(j); this.farol.position.set(this.camara.position.x - d.x * 0.3, this.camara.position.y - d.y * 0.3, this.camara.position.z - d.z * 0.3); }
    this.farol.intensity = RENDER.LUZ_FAROL.intensidad * (0.96 + Math.sin(t * 13) * 0.02 + Math.sin(t * 7.3) * 0.02);
    this.luzFogata.intensity = 18 + Math.sin(t * 17) * 3 + Math.sin(t * 29) * 2 + Math.random() * 2;
    this.lucesFaroles.forEach((l, i) => { l.intensity = 8 + Math.sin(t * 5 + i * 2) * 1.2; });
    const sala = this.sprites.posicionSalita(juego);
    this.luzSalita.position.set(ASCENSOR.SALITA_X + 0.6, sala.y + 1.4, ASCENSOR.SALITA_Z + 2.4);
    this.luzSalita.intensity = Math.abs(py - sala.y) < 14 ? 9 + Math.sin(t * 6) : 0;

    this.cielo.actualizar(this.camara.position);
    this.sprites.actualizar(juego, this.camara.position, dtReal, t);

    // Objetivo: contorno y grietas.
    const o = juego.picado.objetivo;
    let mostrar = false;
    if (o && juego.pantalla === 'jugando') {
      const max = juego.mundo.vidaMax(o.x, o.y, o.z);
      if (max > 0) {
        mostrar = true;
        this.contorno.position.set(o.x + 0.5, o.y + 0.5, o.z + 0.5);
        const resto = juego.mundo.vidaRestante(o.x, o.y, o.z);
        if (resto < max - 1e-6) {
          const etapa = Math.min(4, Math.floor((1 - resto / max) * 5));
          this.grieta.material = (this.grieta.userData as { materiales: THREE.Material[] }).materiales[etapa];
          this.grieta.position.copy(this.contorno.position);
          this.grieta.visible = true;
        } else this.grieta.visible = false;
      }
    }
    this.contorno.visible = mostrar;
    if (!mostrar) this.grieta.visible = false;

    // Partículas de los fósiles: suben desde el bloque.
    for (const f of juego.fosilesMapa) {
      const d = Math.hypot(f.x + 0.5 - px, f.y + 0.5 - py, f.z + 0.5 - pz);
      if (d > RENDER.ALCANCE_PARTICULAS_FOSIL * 2 || Math.random() > dtReal * 14) continue;
      const bl = juego.mundo.get(f.x, f.y, f.z);
      const col = COLOR_FOSIL[Math.max(0, bl - BloqueId.fosil_0) % 3] ?? COLOR_FOSIL[0];
      this.fosilP.emitir(f.x + Math.random(), f.y + 0.5 + Math.random() * 0.6, f.z + Math.random(), (Math.random() - 0.5) * 0.3, 0.9 + Math.random() * 0.8, (Math.random() - 0.5) * 0.3, 1.8, col[0] * 1.2, col[1] * 1.2, col[2] * 1.2);
    }
    // Polvo del colapso.
    if (juego.pantalla === 'colapso') {
      const k = Math.min(1, juego.colapso.reloj / 1.5);
      for (let i = 0; i < 3 * k; i++) this.polvo.emitir(px + (Math.random() - 0.5) * 8, py + 3 + Math.random() * 3, pz + (Math.random() - 0.5) * 8, 0, -1 - Math.random(), 0, 1.4, 0.5, 0.55, 0.7);
      this.caida.actualizar(dtReal, this.camara.position, k);
    }
    this.chispas.actualizar(dtReal);
    this.polvo.actualizar(dtReal);
    this.fosilP.actualizar(dtReal);
    this.flotante.actualizar(this.camara.position, t, RENDER.CALIDAD[this.calidad].polvo);

    this.renderer.info.reset();
    this.post.renderizar(dtReal);
    this.stats.chunks = this.chunks.size;
    this.stats.llamadas = this.renderer.info.render.calls;
    this.stats.triangulos = this.renderer.info.render.triangles;
    this.stats.geometrias = this.renderer.info.memory.geometries;
  }

  /** Mide solo la escena (sin post-proceso): llamadas de dibujo y triángulos. */
  medirEscena(): { llamadas: number; triangulos: number } {
    this.renderer.info.reset();
    this.renderer.render(this.escena, this.camara);
    return { llamadas: this.renderer.info.render.calls, triangulos: this.renderer.info.render.triangles };
  }

}
