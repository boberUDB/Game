// Textos del juego en español salvadoreño, con voseo. Sin rayas largas ni relleno.
import { MASCOTA, MEJORAS, MINERALES, TIENDA } from '../config/balance';
import type { Estrato, FosilId, MejoraId, MineralId } from './tipos';
import { BloqueId } from './tipos';

export const NOMBRE_BLOQUE: Record<number, string> = {
  [BloqueId.aire]: 'Aire',
  [BloqueId.tierra]: 'Tierra',
  [BloqueId.piedra]: 'Piedra',
  [BloqueId.obsidiana]: 'Obsidiana',
  [BloqueId.roca_madre]: 'Roca madre',
  [BloqueId.arenisca_jeroglificos]: 'Muro de jeroglíficos',
  [BloqueId.piedra_azufre]: 'Veta de azufre',
  [BloqueId.piedra_oro]: 'Veta de oro',
  [BloqueId.piedra_esmeralda]: 'Veta de esmeralda',
  [BloqueId.piedra_rubi]: 'Veta de rubí',
  [BloqueId.piedra_zafiro]: 'Veta de zafiro',
  [BloqueId.estrato_0]: 'Estrato violeta',
  [BloqueId.estrato_1]: 'Estrato teal',
  [BloqueId.estrato_2]: 'Estrato dorado',
  [BloqueId.fosil_0]: 'Fósil',
  [BloqueId.fosil_1]: 'Fósil',
  [BloqueId.fosil_2]: 'Fósil',
  [BloqueId.empedrado]: 'Empedrado',
  [BloqueId.adobe]: 'Adobe',
  [BloqueId.madera]: 'Madera',
  [BloqueId.teja]: 'Teja',
};

export const TEXTOS = {
  titulo: 'ESTRATOS',
  fraseTitulo: 'Picá, vendé y derrumbá la mina. Lo que perdás te espera enterrado.',
  hacerClic: 'Hacé clic para empezar',
  hacerClicSeguir: 'Hacé clic para seguir',
  pistaMoverse: 'WASD para moverte',
  pistaPicar: 'Mantené el clic para picar',
  pistaVender: 'Vendé en la tienda con E',
  mochilaLlena: 'Mochila llena: T para subir o Tab para acomodar',
  algoDuerme: 'Algo duerme debajo…',
  record: '¡Récord!',
  guardadoDanado: 'El guardado estaba dañado. Empezás con una mina nueva.',
  punteroRechazado: 'El navegador no dejó capturar el mouse. Hacé clic para seguir.',
  mochilaVacia: 'Todavía no llevás nada. Picá algo que brille.',
  tiendaVacia: 'Traé minerales y te los compro.',
  sinPartida: 'Todavía no hay partida guardada.',
  silbando: 'Silbando al ascensor…',
  silbidoCancelado: 'Te golpearon, se cortó el silbido.',
  yaEstasArriba: 'Ya estás arriba.',
  desmayo: 'Te desmayaste por el calor. Perdiste la mitad de lo que llevabas.',
  despertas: 'Despertás en la superficie.',
  tiraste: 'Tiraste una pieza.',
  sinAcomodo: 'No encontré un acomodo mejor.',
  ayudaMochila: ['Arrastrá una pieza para moverla.', 'R la rota, Supr la tira.', 'Con teclado: elegí una pieza y usá las flechas.', 'Sin huecos, la tienda paga 50 % más.'],
};

export function nombreMineral(m: MineralId): string { return MINERALES[m].nombre; }
export function nombreMejora(m: MejoraId): string { return MEJORAS[m].nombre; }

export function fraseMejora(id: MejoraId): string {
  switch (id) {
    case 'filo': return 'Cada golpe rompe más.';
    case 'mango': return 'Golpeás más veces por segundo.';
    case 'alcance': return 'Llegás más lejos con el pico.';
    case 'suerte': return 'A veces el bloque suelta dos minerales.';
    case 'temple': return 'El calor te pega más despacio.';
  }
}

export const TEXTO_FOSIL: Record<FosilId, { nombre: string; detalle: string }> = {
  rompefilas: { nombre: 'Pico Rompefilas', detalle: 'Cada golpe también daña los 2 bloques que siguen en línea.' },
  don_chepe: { nombre: 'Don Chepe', detalle: 'Lo rescataste. Pica solo una columna de 2×2 hacia abajo, a un bloque cada 1.2 s, y vende al 50 %.' },
  iman: { nombre: 'Imán de talpetate', detalle: 'Los minerales sueltos a menos de 5 m vuelan hacia vos, aunque haya paredes.' },
  brasa: { nombre: 'Brasa antigua', detalle: 'Con el calor arriba de 60 % pegás el doble.' },
};

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export function fechaCorta(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'una fecha perdida';
  return `${d.getDate()} de ${MESES[d.getMonth()]}`;
}

export function textoEstratoEntrada(e: Estrato): string {
  return `Estrato ${e.id}: tu partida del ${fechaCorta(e.fecha)}, ${e.profundidadMax} m, ${e.bloquesPicados} bloques`;
}
export function textoEstratoEnterrado(e: Estrato): string {
  return `Estrato ${e.id} enterrado: ${e.profundidadMax} m, ${e.bloquesPicados} bloques`;
}

export function textoVendedor(): string {
  return `${TIENDA.NOMBRE_ABAJO}: ${TIENDA.FRASE_ABAJO}`;
}

export function textoMascota(): string {
  return `Te sigue y sube ${Math.round(MASCOTA.BONUS_VENTA * 100)} % cada venta. Sobrevive al colapso.`;
}

export function formatoColones(n: number): string {
  return '₡' + Math.round(n).toLocaleString('es-SV');
}
