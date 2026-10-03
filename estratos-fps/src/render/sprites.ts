// Todo lo que se mueve o se recoge es un sprite pixel art billboard: momias, Don Chepe, vendedor,
// Torogoz, minerales sueltos, árboles, izotes, fogata, faroles y el rótulo de la tienda.
import * as THREE from 'three';
import { ASCENSOR, LUGARES, MOMIA, MUNDO } from '../config/balance';
import { posicionVendedor } from '../game/ascensor';
import { direccionMirada } from '../game/jugador';
import { mulberry32 } from '../game/rng';
import type { Juego, MineralId } from '../game/tipos';
import { colorDeMineral } from './efectos';
import type { Texturas } from './texturas';

const GIRO = new THREE.Euler();

/** Plano con el pivote abajo, que gira solo sobre Y para mirar a la cámara. */
function crearBillboard(tex: THREE.Texture, ancho: number, alto: number, emision = 0.35): THREE.Mesh {
  const g = new THREE.PlaneGeometry(ancho, alto);
  g.translate(0, alto / 2, 0);
  const mat = new THREE.MeshLambertMaterial({
    map: tex, alphaTest: 0.5, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: emision,
  });
  const m = new THREE.Mesh(g, mat);
  m.frustumCulled = false;
  return m;
}

function mirarACamara(m: THREE.Object3D, cam: THREE.Vector3): void {
  GIRO.set(0, Math.atan2(cam.x - m.position.x, cam.z - m.position.z), 0);
  m.rotation.copy(GIRO);
}

function halo(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const x = c.getContext('2d')!;
  const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(c);
}

interface Suelto3D { icono: THREE.Sprite; aura: THREE.Sprite }

export class Sprites {
  readonly grupo = new THREE.Group();
  private tex: Texturas;
  private momias = new Map<number, THREE.Mesh>();
  private sueltos = new Map<number, Suelto3D>();
  private chepe: THREE.Mesh;
  private vendedor: THREE.Mesh;
  private farolSalita: THREE.Mesh;
  private fogata: THREE.Mesh;
  private faroles: THREE.Mesh[] = [];
  private naturaleza: THREE.Mesh[] = [];
  private torogoz: THREE.Mesh;
  private auraTex = halo();
  private torogozEstado = { modo: 'orbita' as 'orbita' | 'cuadro', reloj: 14, dur: 0 };
  readonly posFogata = new THREE.Vector3(LUGARES.FOGATA.x, MUNDO.SUELO_Y, LUGARES.FOGATA.z);

  constructor(tex: Texturas) {
    this.tex = tex;
    // Estáticos.
    this.fogata = crearBillboard(tex.sprites.fogata_0, 1.5, 1.5, 0.9);
    this.fogata.position.copy(this.posFogata);
    this.grupo.add(this.fogata);
    for (const f of LUGARES.FAROLES) {
      const m = crearBillboard(tex.sprites.farol_0, 0.9, 1.8, 0.9);
      m.position.set(f.x, MUNDO.SUELO_Y, f.z);
      this.faroles.push(m);
      this.grupo.add(m);
    }
    const rot = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 1.1),
      new THREE.MeshLambertMaterial({ map: tex.sprites.rotulo, alphaTest: 0.5, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: tex.sprites.rotulo, emissiveIntensity: 0.55 }),
    );
    rot.position.set((LUGARES.TIENDA.x0 + LUGARES.TIENDA.x1 + 1) / 2, MUNDO.SUELO_Y + 4.65, LUGARES.TIENDA.z0 - 0.45);
    rot.rotation.y = Math.PI;
    this.grupo.add(rot);

    // Árboles e izotes en el borde, detrás de los límites invisibles.
    const azar = mulberry32(7);
    const colocar = (n: number, clave: 'pino' | 'izote', ancho: number, alto: number, prof: [number, number]) => {
      for (let i = 0; i < n; i++) {
        const lado = Math.floor(azar() * 4);
        const a = 1.5 + azar() * (MUNDO.ANCHO - 3);
        const d = prof[0] + azar() * (prof[1] - prof[0]);
        const x = lado === 0 ? d : lado === 1 ? MUNDO.ANCHO - d : a;
        const z = lado === 2 ? d : lado === 3 ? MUNDO.LARGO - d : a;
        const m = crearBillboard(tex.sprites[clave], ancho, alto, 0.45);
        m.position.set(x, MUNDO.SUELO_Y, z);
        this.naturaleza.push(m);
        this.grupo.add(m);
      }
    };
    colocar(LUGARES.ARBOLES, 'pino', 5, 7.5, [1.5, 4.2]);
    colocar(LUGARES.IZOTES, 'izote', 2, 4, [1.2, 4.6]);

    this.vendedor = crearBillboard(tex.sprites.vendedor, 1.2, 1.8, 0.4);
    this.grupo.add(this.vendedor);
    this.farolSalita = crearBillboard(tex.sprites.farol_0, 0.6, 1.2, 0.9);
    this.grupo.add(this.farolSalita);
    this.chepe = crearBillboard(tex.sprites.chepe_0, 1.2, 1.8, 0.45);
    this.chepe.visible = false;
    this.grupo.add(this.chepe);
    this.torogoz = crearBillboard(tex.sprites.torogoz_0, 0.6, 0.6, 0.6);
    this.torogoz.geometry.translate(0, -0.3, 0);
    this.torogoz.visible = false;
    this.grupo.add(this.torogoz);
  }

  /** Aviso de que se vendió algo: el Torogoz entra en cuadro y canta. */
  cantar(): void {
    this.torogozEstado.modo = 'cuadro';
    this.torogozEstado.dur = 2.2;
    this.torogozEstado.reloj = 14 + Math.random() * 10;
  }

  posicionSalita(juego: Juego): THREE.Vector3 {
    const y = MUNDO.SUELO_Y - 30;
    void juego;
    return new THREE.Vector3(ASCENSOR.SALITA_X + 0.5, y, ASCENSOR.SALITA_Z + 2.3);
  }

  actualizar(juego: Juego, cam: THREE.Vector3, dt: number, t: number): void {
    // Estáticos animados.
    this.fogata.material = this.fogata.material as THREE.MeshLambertMaterial;
    const f = Math.floor(t * 8) % 3;
    (this.fogata.material as THREE.MeshLambertMaterial).map = this.tex.sprites[`fogata_${f}`];
    (this.fogata.material as THREE.MeshLambertMaterial).emissiveMap = this.tex.sprites[`fogata_${f}`];
    mirarACamara(this.fogata, cam);
    const ff = Math.floor(t * 4) % 2;
    for (const m of this.faroles) {
      const mat = m.material as THREE.MeshLambertMaterial;
      mat.map = mat.emissiveMap = this.tex.sprites[`farol_${ff}`];
      mirarACamara(m, cam);
    }
    for (const n of this.naturaleza) mirarACamara(n, cam);

    // Vendedor y farol de la salita de 30 m.
    const v = posicionVendedor();
    this.vendedor.position.set(v.x, MUNDO.SUELO_Y - 30, v.z);
    mirarACamara(this.vendedor, cam);
    this.farolSalita.position.copy(this.posicionSalita(juego));
    this.farolSalita.position.x = ASCENSOR.SALITA_X + 0.4;
    this.farolSalita.position.z = ASCENSOR.SALITA_Z + 2.6;
    mirarACamara(this.farolSalita, cam);

    this.actualizarMomias(juego, cam, t);
    this.actualizarChepe(juego, cam, t);
    this.actualizarSueltos(juego, cam, t);
    this.actualizarTorogoz(juego, cam, dt, t);
  }

  private actualizarMomias(juego: Juego, cam: THREE.Vector3, t: number): void {
    const vivos = new Set<number>();
    for (const mo of juego.momias) {
      vivos.add(mo.uid);
      let m = this.momias.get(mo.uid);
      if (!m) {
        m = crearBillboard(this.tex.sprites.momia_0, 1.2, MOMIA.ALTO, 0.35);
        this.grupo.add(m);
        this.momias.set(mo.uid, m);
      }
      const mat = m.material as THREE.MeshLambertMaterial;
      const clave = mo.dano > 0 ? 'momia_dano' : Math.floor(t * 2.5 + mo.uid) % 2 === 0 ? 'momia_0' : 'momia_1';
      mat.map = mat.emissiveMap = this.tex.sprites[clave];
      m.position.set(mo.x, mo.y, mo.z);
      mirarACamara(m, cam);
    }
    for (const [uid, m] of this.momias) if (!vivos.has(uid)) { this.grupo.remove(m); m.geometry.dispose(); (m.material as THREE.Material).dispose(); this.momias.delete(uid); }
  }

  private actualizarChepe(juego: Juego, cam: THREE.Vector3, t: number): void {
    const ch = juego.chepe;
    this.chepe.visible = ch.activo;
    if (!ch.activo) return;
    const mat = this.chepe.material as THREE.MeshLambertMaterial;
    mat.map = mat.emissiveMap = this.tex.sprites[Math.floor(t * 3) % 2 === 0 ? 'chepe_0' : 'chepe_1'];
    this.chepe.position.set(ch.x, ch.y, ch.z);
    mirarACamara(this.chepe, cam);
  }

  private actualizarSueltos(juego: Juego, cam: THREE.Vector3, t: number): void {
    const vivos = new Set<number>();
    for (const s of juego.sueltos) {
      vivos.add(s.uid);
      let o = this.sueltos.get(s.uid);
      if (!o) {
        const [r, g, b] = colorDeMineral(s.mineral);
        const icono = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.tex.sprites[`mineral_${s.mineral as MineralId}`], alphaTest: 0.5, fog: true }));
        icono.scale.set(0.55, 0.55, 1);
        const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.auraTex, color: new THREE.Color(r, g, b), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.7, fog: true }));
        aura.scale.set(1.5, 1.5, 1);
        this.grupo.add(icono, aura);
        o = { icono, aura };
        this.sueltos.set(s.uid, o);
      }
      const y = s.y + Math.sin(t * 3 + s.uid) * 0.07;
      o.icono.position.set(s.x, y, s.z);
      o.aura.position.set(s.x, y, s.z);
      o.aura.material.opacity = 0.55 + Math.sin(t * 5 + s.uid) * 0.2;
    }
    for (const [uid, o] of this.sueltos) {
      if (vivos.has(uid)) continue;
      this.grupo.remove(o.icono, o.aura);
      o.icono.material.dispose(); o.aura.material.dispose();
      this.sueltos.delete(uid);
    }
    void cam;
  }

  private actualizarTorogoz(juego: Juego, cam: THREE.Vector3, dt: number, t: number): void {
    const m = this.torogoz;
    m.visible = juego.mascota.comprada;
    if (!juego.mascota.comprada) return;
    const e = this.torogozEstado;
    e.reloj -= dt;
    if (e.modo === 'orbita' && e.reloj <= 0) { e.modo = 'cuadro'; e.dur = 3; e.reloj = 16 + Math.random() * 12; }
    if (e.modo === 'cuadro') { e.dur -= dt; if (e.dur <= 0) e.modo = 'orbita'; }
    const j = juego.jugador;
    const dir = direccionMirada(j);
    const objetivo = new THREE.Vector3();
    if (e.modo === 'cuadro') {
      // Delante de la cámara, un poco a la derecha, balanceándose al cantar.
      objetivo.set(j.pos.x + dir.x * 1.6 + Math.cos(j.guinada) * 0.5, j.pos.y + 1.55 + dir.y * 1.6 + 0.1 + Math.sin(t * 9) * 0.05, j.pos.z + dir.z * 1.6 - Math.sin(j.guinada) * 0.5);
    } else {
      const a = t * 0.9;
      objetivo.set(j.pos.x + Math.cos(a) * 1.5, j.pos.y + 2.1 + Math.sin(t * 2.3) * 0.25, j.pos.z + Math.sin(a) * 1.5);
    }
    if (juego.mundo.esSolido(Math.floor(objetivo.x), Math.floor(objetivo.y), Math.floor(objetivo.z))) objetivo.set(j.pos.x, j.pos.y + 1.9, j.pos.z);
    const k = 1 - Math.exp(-6 * dt);
    if (m.position.lengthSq() === 0 || m.position.distanceTo(objetivo) > 12) m.position.copy(objetivo);
    m.position.lerp(objetivo, k);
    const mat = m.material as THREE.MeshLambertMaterial;
    mat.map = mat.emissiveMap = this.tex.sprites[Math.floor(t * 10) % 2 === 0 ? 'torogoz_0' : 'torogoz_1'];
    mirarACamara(m, cam);
  }

  /** Limpia los objetos dinámicos (al regenerar el mundo). */
  reiniciar(): void {
    for (const [, m] of this.momias) this.grupo.remove(m);
    this.momias.clear();
    for (const [, o] of this.sueltos) this.grupo.remove(o.icono, o.aura);
    this.sueltos.clear();
  }
}

