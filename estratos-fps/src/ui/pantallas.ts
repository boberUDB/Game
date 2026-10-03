// Pantallas: título, pausa, mochila, tienda, colapso y desmayo. El estado va en data-state y data-pantalla.
import { COLAPSO, RENDER } from '../config/balance';
import { multiplicador } from '../game/colapso';
import { on } from '../game/eventos';
import { TEXTOS, textoEstratoEntrada, textoEstratoEnterrado } from '../game/textos';
import type { Calidad, Juego, Pantalla } from '../game/tipos';
import { aviso, cartel } from './avisos';

const $ = (id: string) => document.getElementById(id)!;

const SECCION: Partial<Record<Pantalla, string>> = {
  titulo: 'pantalla-titulo', pausa: 'pantalla-pausa', mochila: 'pantalla-mochila', tienda: 'pantalla-tienda',
  colapso: 'pantalla-colapso', desmayo: 'pantalla-desmayo',
};
const FOCO: Partial<Record<Pantalla, string>> = {
  titulo: 'btn-empezar', pausa: 'btn-continuar-pausa', mochila: 'btn-acomodar', tienda: 'btn-vender', desmayo: '',
};

export interface AccionesPantallas {
  juego: () => Juego;
  hayGuardado: () => boolean;
  empezar: (nueva: boolean) => void;
  reanudar: () => void;
  salirAlTitulo: () => void;
  borrarPartida: () => void;
  aplicarCalidad: (c: Calidad) => void;
  ponerVolumen: (v: number) => void;
  guardar: () => void;
}

export function mostrarMensajeTitulo(texto: string): void {
  const m = $('titulo-mensaje');
  m.textContent = texto;
  m.hidden = texto === '';
}

/** Actualiza qué botones del título se ven según haya o no partida guardada. */
export function prepararTitulo(hay: boolean): void {
  $('btn-continuar').hidden = !hay;
  $('btn-nueva').hidden = !hay;
  $('btn-empezar').hidden = hay;
  $('confirmar-nueva').hidden = true;
  ($(hay ? 'btn-continuar' : 'btn-empezar') as HTMLButtonElement).dataset.principal = '';
}

function pintarRecords(juego: Juego): void {
  const dl = $('pausa-records');
  dl.replaceChildren();
  const fila = (a: string, b: string) => { const dt = document.createElement('dt'); dt.textContent = a; const dd = document.createElement('dd'); dd.textContent = b; dl.append(dt, dd); };
  const r = juego.records;
  fila('Profundidad de esta partida', `${r.profundidadPartida} m`);
  fila('Profundidad máxima', `${r.profundidadMax} m`);
  fila('Bloques de esta partida', String(r.bloquesPartida));
  fila('Bloques en total', String(r.bloquesTotal));
  fila('Mejor partida', `${r.mejorPartida} bloques`);
  fila('Colapsos', String(juego.colapsos));
}

function enlazarAjustes(a: AccionesPantallas): void {
  const sens = $('ajuste-sensibilidad') as HTMLInputElement, inv = $('ajuste-invertir') as HTMLInputElement;
  const fov = $('ajuste-fov') as HTMLInputElement, vol = $('ajuste-volumen') as HTMLInputElement;
  const refrescar = () => {
    const aj = a.juego().ajustes;
    sens.value = String(aj.sensibilidad); $('salida-sensibilidad').textContent = `x${aj.sensibilidad.toFixed(2)}`;
    inv.checked = aj.invertirY;
    fov.min = String(RENDER.FOV_MIN); fov.max = String(RENDER.FOV_MAX);
    fov.value = String(aj.fov); $('salida-fov').textContent = `${aj.fov}°`;
    vol.value = String(aj.volumen); $('salida-volumen').textContent = `${Math.round(aj.volumen * 100)} %`;
    document.querySelectorAll<HTMLInputElement>('input[name="calidad"]').forEach((r) => { r.checked = r.value === aj.calidad; });
  };
  sens.addEventListener('input', () => { a.juego().ajustes.sensibilidad = Number(sens.value); refrescar(); });
  inv.addEventListener('change', () => { a.juego().ajustes.invertirY = inv.checked; });
  fov.addEventListener('input', () => { a.juego().ajustes.fov = Number(fov.value); refrescar(); });
  vol.addEventListener('input', () => { a.juego().ajustes.volumen = Number(vol.value); a.ponerVolumen(Number(vol.value)); refrescar(); });
  document.querySelectorAll<HTMLInputElement>('input[name="calidad"]').forEach((r) => r.addEventListener('change', () => {
    if (r.checked) { a.juego().ajustes.calidad = r.value as Calidad; a.aplicarCalidad(r.value as Calidad); }
  }));
  on('pantalla:cambio', (e) => { if (e.a === 'pausa') refrescar(); });
  refrescar();
}

export function iniciarPantallas(a: AccionesPantallas): void {
  const app = $('app');
  enlazarAjustes(a);

  on('pantalla:cambio', (e) => {
    app.dataset.pantalla = e.a;
    for (const [p, id] of Object.entries(SECCION)) $(id!).dataset.state = p === e.a ? 'abierta' : 'cerrada';
    if (e.a === 'jugando' && document.activeElement instanceof HTMLElement) document.activeElement.blur();
    if (e.a === 'pausa') { pintarRecords(a.juego()); $('confirmar-borrar').hidden = true; }
    if (e.a === 'titulo') prepararTitulo(a.hayGuardado());
    if (e.a === 'colapso') { $('pantalla-colapso').dataset.fase = 'temblor'; $('colapso-etiqueta').textContent = ''; $('colapso-mult').textContent = ''; }
    if (e.a === 'desmayo') $('desmayo-texto').textContent = `${TEXTOS.desmayo} ${TEXTOS.despertas}`;
    const foco = FOCO[e.a];
    if (foco) setTimeout(() => (document.getElementById(foco) as HTMLElement | null)?.focus(), 30);
  });

  // Título.
  $('btn-empezar').addEventListener('click', () => a.empezar(false));
  $('btn-continuar').addEventListener('click', () => a.empezar(false));
  $('btn-nueva').addEventListener('click', () => { $('confirmar-nueva').hidden = false; ($('btn-nueva-no') as HTMLButtonElement).focus(); });
  $('btn-nueva-no').addEventListener('click', () => { $('confirmar-nueva').hidden = true; ($('btn-continuar') as HTMLButtonElement).focus(); });
  $('btn-nueva-si').addEventListener('click', () => a.empezar(true));

  // Pausa.
  $('btn-continuar-pausa').addEventListener('click', () => a.reanudar());
  $('btn-salir').addEventListener('click', () => a.salirAlTitulo());
  $('btn-borrar').addEventListener('click', () => { $('confirmar-borrar').hidden = false; ($('btn-borrar-no') as HTMLButtonElement).focus(); });
  $('btn-borrar-no').addEventListener('click', () => { $('confirmar-borrar').hidden = true; ($('btn-borrar') as HTMLButtonElement).focus(); });
  $('btn-borrar-si').addEventListener('click', () => a.borrarPartida());

  // Mensajes de estratos.
  on('estrato:entrada', (e) => {
    const est = a.juego().estratos.find((x) => x.id === e.estratoId);
    if (est) aviso(textoEstratoEntrada(est), 'alerta', 5000);
  });
  on('colapso:inicio', (e) => { $('colapso-etiqueta').dataset.texto = textoEstratoEnterrado(e.estrato); });
  on('colapso:fin', () => cartel('Mina nueva', `Multiplicador x${multiplicador(a.juego()).toLocaleString('es-SV')}. Buscá tus fósiles en los estratos.`, 3200));
}

/** Avanza la cinemática del colapso según el reloj del juego. */
export function actualizarColapso(juego: Juego): void {
  if (juego.pantalla !== 'colapso') return;
  const s = $('pantalla-colapso');
  const t = juego.colapso.reloj;
  const fase = t < COLAPSO.FASE_FUNDIDO ? 'temblor' : t < COLAPSO.FASE_TARJETA ? 'fundido' : 'tarjeta';
  if (s.dataset.fase !== fase) s.dataset.fase = fase;
  if (fase === 'tarjeta' && $('colapso-etiqueta').textContent === '') {
    $('colapso-etiqueta').textContent = $('colapso-etiqueta').dataset.texto ?? '';
    $('colapso-mult').textContent = `Multiplicador nuevo: x${(multiplicador(juego) + COLAPSO.MULT_POR_COLAPSO).toLocaleString('es-SV')}`;
  }
}
