// Orientación, resolución interna por calidad y anclas del HUD.
// El CSS depende de data-orientacion en la raíz; el modo vertical sería solo CSS y esta configuración.
import { RENDER } from './balance';
import type { Calidad } from '../game/tipos';

export type Orientacion = 'horizontal' | 'vertical';

export const PANTALLA = {
  orientacion: 'horizontal' as Orientacion,
  /** Resolución interna base de cada calidad (ancho x alto en horizontal). */
  resolucion: {
    bajo: { ancho: RENDER.CALIDAD.bajo.ancho, alto: RENDER.CALIDAD.bajo.alto },
    medio: { ancho: RENDER.CALIDAD.medio.ancho, alto: RENDER.CALIDAD.medio.alto },
    alto: { ancho: RENDER.CALIDAD.alto.ancho, alto: RENDER.CALIDAD.alto.alto },
  } as Record<Calidad, { ancho: number; alto: number }>,
  /** Anclas del HUD: cada bloque se pega a una esquina o borde. */
  anclas: {
    horizontal: {
      'hud-izquierda-arriba': 'arriba izquierda',
      'hud-derecha-arriba': 'arriba derecha',
      'hud-izquierda-abajo': 'abajo izquierda',
      avisos: 'arriba centro',
      mira: 'centro',
    },
    vertical: {
      'hud-izquierda-arriba': 'arriba izquierda',
      'hud-derecha-arriba': 'arriba derecha',
      'hud-izquierda-abajo': 'abajo centro',
      avisos: 'arriba centro',
      mira: 'centro',
    },
  } as Record<Orientacion, Record<string, string>>,
};

/** Tamaño interno para una ventana dada: el alto lo fija la calidad, el ancho sigue el aspecto de la ventana. */
export function resolucionInterna(calidad: Calidad, anchoVentana: number, altoVentana: number): { ancho: number; alto: number } {
  const base = PANTALLA.resolucion[calidad];
  if (PANTALLA.orientacion === 'vertical') {
    const ancho = base.alto;
    return { ancho, alto: Math.max(1, Math.round(ancho * altoVentana / Math.max(1, anchoVentana))) };
  }
  const alto = base.alto;
  return { ancho: Math.max(1, Math.round(alto * anchoVentana / Math.max(1, altoVentana))), alto };
}
