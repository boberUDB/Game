// Teclado y mouse. Recorta los saltos absurdos de movementX/Y y hace preventDefault en Tab.
import { entradaVacia } from '../game/entrada';
import type { Entrada } from '../game/entrada';
import type { FuenteDeEntrada } from './entrada';

const SALTO_MAX = 200; // píxeles: más que eso es un salto de Pointer Lock, se descarta

export interface TeclasGlobales {
  tab: () => void;
  escape: () => void;
  silenciar: () => void;
  diagnostico: () => void;
  acomodar: () => void;
}

export class TecladoMouse implements FuenteDeEntrada {
  private teclas = new Set<string>();
  private dx = 0;
  private dy = 0;
  private picar = false;
  private interactuar = false;
  private subir = false;
  /** ¿Se leen movimiento y clics del mouse? Lo decide main según la pantalla y el Pointer Lock. */
  mouseActivo: () => boolean = () => true;
  /** Teclas que no son de juego (Tab, Esc, M, F3). Las atiende main. */
  globales: Partial<TeclasGlobales> = {};
  /** ¿El juego está en 'jugando'? Si no, las teclas de movimiento se ignoran. */
  jugando: () => boolean = () => true;
  /** Tab abre y cierra la mochila solo en juego y en la mochila; en los demás menús sirve para moverse entre botones. */
  tabEsMochila: () => boolean = () => true;

  constructor(private lienzo: HTMLElement, private sinBloqueo: boolean) {
    window.addEventListener('keydown', (e) => this.alBajar(e));
    window.addEventListener('keyup', (e) => this.teclas.delete(e.code));
    window.addEventListener('blur', () => this.soltarTodo());
    window.addEventListener('mousemove', (e) => {
      if (!this.mouseActivo() || (!this.sinBloqueo && document.pointerLockElement !== this.lienzo)) return;
      const x = e.movementX, y = e.movementY;
      if (Math.abs(x) > SALTO_MAX || Math.abs(y) > SALTO_MAX) return;
      this.dx += x; this.dy += y;
    });
    lienzo.addEventListener('mousedown', (e) => {
      if (e.button === 0 && this.mouseActivo()) this.picar = true;
    });
    window.addEventListener('mouseup', (e) => { if (e.button === 0) this.picar = false; });
    window.addEventListener('contextmenu', (e) => { if (e.target === lienzo) e.preventDefault(); });
  }

  private alBajar(e: KeyboardEvent): void {
    if (e.code === 'Tab' && this.tabEsMochila()) { e.preventDefault(); if (!e.repeat) this.globales.tab?.(); return; }
    if (e.code === 'Escape') { if (!e.repeat) this.globales.escape?.(); return; }
    if (e.code === 'F3') { e.preventDefault(); if (!e.repeat) this.globales.diagnostico?.(); return; }
    if (e.code === 'KeyM' && !e.repeat) { this.globales.silenciar?.(); return; }
    if (e.code === 'KeyQ' && !e.repeat) { this.globales.acomodar?.(); }
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && this.jugando()) e.preventDefault();
    if (e.repeat) return;
    this.teclas.add(e.code);
    if (!this.jugando()) return;
    if (e.code === 'KeyE') this.interactuar = true;
    if (e.code === 'KeyT') this.subir = true;
  }

  leer(): Entrada {
    const e = entradaVacia();
    if (this.jugando()) {
      const t = this.teclas;
      e.moverZ = (t.has('KeyW') || t.has('ArrowUp') ? 1 : 0) - (t.has('KeyS') || t.has('ArrowDown') ? 1 : 0);
      e.moverX = (t.has('KeyD') || t.has('ArrowRight') ? 1 : 0) - (t.has('KeyA') || t.has('ArrowLeft') ? 1 : 0);
      e.correr = t.has('ShiftLeft') || t.has('ShiftRight');
      e.saltar = t.has('Space');
      e.picar = this.picar;
      e.mirarDX = this.dx; e.mirarDY = this.dy;
      e.interactuar = this.interactuar; e.subir = this.subir;
    }
    this.dx = this.dy = 0;
    this.interactuar = this.subir = false;
    return e;
  }

  soltarTodo(): void {
    this.teclas.clear();
    this.picar = false;
    this.dx = this.dy = 0;
    this.interactuar = this.subir = false;
  }
}
