// Pointer Lock: pedirlo en un clic (con unadjustedMovement y respaldo), detectar cuándo se pierde
// y avisar si el navegador lo rechaza (Chrome lo bloquea cerca de 1 s después de un Esc).
export interface OpcionesPuntero {
  elemento: HTMLElement;
  /** Con ?sinbloqueo no se pide Pointer Lock. */
  sinBloqueo: boolean;
  alPerder: () => void;
  alGanar: () => void;
  alRechazar: () => void;
}

type PedirConOpciones = (opciones?: { unadjustedMovement?: boolean }) => Promise<void> | void;

export class Puntero {
  private ultimoPedido = 0;

  constructor(private o: OpcionesPuntero) {
    document.addEventListener('pointerlockchange', () => {
      if (this.bloqueado) o.alGanar(); else o.alPerder();
    });
    document.addEventListener('pointerlockerror', () => o.alRechazar());
  }

  get bloqueado(): boolean {
    return this.o.sinBloqueo ? false : document.pointerLockElement === this.o.elemento;
  }

  get activo(): boolean { return !this.o.sinBloqueo; }

  /** Pide el puntero. Si falla con unadjustedMovement, reintenta sin esa opción. */
  async pedir(): Promise<boolean> {
    if (this.o.sinBloqueo) { this.o.alGanar(); return true; }
    if (this.bloqueado) return true;
    this.ultimoPedido = performance.now();
    const pedir = this.o.elemento.requestPointerLock.bind(this.o.elemento) as PedirConOpciones;
    try {
      await pedir({ unadjustedMovement: true });
      return true;
    } catch {
      try {
        await pedir();
        return true;
      } catch {
        this.o.alRechazar();
        return false;
      }
    }
  }

  soltar(): void {
    if (!this.o.sinBloqueo && document.pointerLockElement) document.exitPointerLock();
  }

  get msDesdePedido(): number { return performance.now() - this.ultimoPedido; }
}
