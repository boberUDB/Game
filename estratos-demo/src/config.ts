// Único archivo de balance. Todos los números del juego y la paleta 3D viven aquí.
import type { FosilId, MejoraId, MineralId } from './tipos';

export const MINA = { ANCHO: 24, ALTO_BASE: 60, FILAS_POR_ESTRATO: 6, MAX_ESTRATOS: 3, FILA_INICIO_ESTRATOS: 6 };

export const BLOQUES = {
  tierra: { vida: 2 }, roca: { vida: 5 }, basalto: { vida: 10 }, estrato: { vida: 8 }, fosil: { vida: 12 },
  azufre: { vida: 3 }, hierro: { vida: 6 }, obsidiana: { vida: 12 }, jade: { vida: 20 },
  ESCALA_VIDA_POR_FILA: 0.04, // vida = base * (1 + fila * 0.04)
};

export const MINERALES: Record<MineralId, {
  nombre: string; forma: number[][]; valor: number; desdeFila: number; prob: number; color: number;
}> = {
  azufre: { nombre: 'Azufre', forma: [[1]], valor: 4, desdeFila: 1, prob: 0.12, color: 0xE8D44D },
  hierro: { nombre: 'Hierro', forma: [[1, 1]], valor: 10, desdeFila: 8, prob: 0.08, color: 0xE07A3A },
  obsidiana: { nombre: 'Obsidiana', forma: [[1, 0], [1, 1]], valor: 22, desdeFila: 20, prob: 0.05, color: 0x9B6BE8 },
  jade: { nombre: 'Jade', forma: [[1, 1], [1, 1]], valor: 60, desdeFila: 35, prob: 0.03, color: 0x3FD9B4 },
};
export const ESCALA_VALOR_POR_FILA = 0.03; // valor = base * (1 + fila * 0.03), redondeado

export const PICO = { DANIO_BASE: 1, GOLPES_POR_SEG: 4, ALCANCE_BASE: 1 };

export const CRECIMIENTO_MEJORA = 1.15; // costo = base * 1.15 ^ nivel
export const MEJORAS: Record<MejoraId, { nombre: string; base: number; max: number; efecto: string; porNivel: number }> = {
  filo: { nombre: 'Filo', base: 20, max: 25, efecto: '+25 % de daño por nivel', porNivel: 0.25 },
  mango: { nombre: 'Mango ligero', base: 30, max: 20, efecto: '+8 % de golpes por segundo por nivel', porNivel: 0.08 },
  alcance: { nombre: 'Alcance', base: 150, max: 4, efecto: '+0.5 celdas por nivel', porNivel: 0.5 },
  suerte: { nombre: 'Suerte', base: 60, max: 20, efecto: '+3 % de botín doble por nivel', porNivel: 0.03 },
  temple: { nombre: 'Temple', base: 40, max: 20, efecto: '-3 % de calor ganado por nivel', porNivel: 0.03 },
};

export const MOCHILA = { COLUMNAS: 4, FILAS: 4, BONUS_LLENA: 0.5, INTENTOS_ACOMODO: 2000 };

export const TIENDA = {
  SATURACION_POR_UNIDAD: 0.03, SATURACION_MAX: 0.5, RECUPERACION: 0.02, RECUPERACION_CADA_SEG: 10,
  COLUMNA_DESDE: 1, COLUMNA_HASTA: 5, // dónde se puede apretar E en la superficie
};

export const CALOR = {
  FILA_INICIO: 10, GANANCIA_POR_FILA: 0.12, ENFRIA_SUPERFICIE: 25, ENFRIA_ARRIBA: 5,
  FILA_SUPERFICIE: 2, PIERDE_AL_DESMAYO: 0.5, SEG_DESMAYADO: 1.5,
};

export const MASCOTA = { nombre: 'Torogoz', costo: 250, BONUS_VENTA: 0.2 };

export const COLAPSO = {
  FILA_REQUERIDA_BASE: 30, FILA_EXTRA_POR_COLAPSO: 5, FILA_REQUERIDA_MAX: 55,
  MULT_POR_COLAPSO: 0.75, FOSILES_POR_PARTIDA: 3,
};

export const FOSILES: Record<FosilId, { nombre: string; detalle: string }> = {
  rompefilas: { nombre: 'Pico Rompefilas', detalle: 'Cada golpe también daña los 2 bloques que siguen en línea.' },
  don_chepe: { nombre: 'Don Chepe', detalle: 'Lo rescatás y pica solo su columna hacia abajo.' },
  iman: { nombre: 'Imán de talpetate', detalle: 'Los minerales sueltos vuelan hacia vos desde 5 celdas.' },
  brasa: { nombre: 'Brasa antigua', detalle: 'Con el calor arriba de 60 % pegás el doble.' },
};
export const FOSIL_NUM = {
  ROMPEFILAS_EXTRA: 2, CHEPE_SEG_POR_BLOQUE: 1.2, IMAN_RADIO: 5, IMAN_VELOCIDAD: 10,
  BRASA_UMBRAL: 60, BRASA_MULT: 2,
};

export const JUGADOR = { CELDAS_POR_SEG: 7, RADIO_RECOGER: 1, INICIO_X: 12, INICIO_Y: 0 };
export const SIM = { PASO: 1 / 60, GUARDAR_CADA_SEG: 10, MAX_PASOS: 5, SEG_ENTRE_AVISOS_LLENA: 3 };

// Paleta y parámetros del render 3D.
export const PALETA = {
  fondo: 0x120C0A, niebla: 0x120C0A, lava: 0xFF6A2B, cielo: 0x2B1A2E,
  tierra: 0x6B4A36, roca: 0x6A625D, basalto: 0x3A3438, borde: 0x1A1213,
  estrato: [0xA07CB8, 0x62A39F, 0xB88E5E],
  oro: 0xF2C14E, jade: 0x3FD9B4, peligro: 0xFF5A5F,
  lampara: 0xFFC27A, sol: 0xFFD9B0,
};
export const RENDER = {
  FOV: 35, CAM_ALTURA: 4, CAM_DISTANCIA: 14, CAM_SEGUIMIENTO: 8, CAM_ADELANTO: 0.8,
  NIEBLA_CERCA: 17, NIEBLA_LEJOS: 34,
  BLOOM_UMBRAL: 0.75, BLOOM_FUERZA: 0.55, BLOOM_RADIO: 0.6,
  FILA_TINTE_LAVA: 30,
  PARTICULAS: 256, NUMEROS: 32,
  SACUDIDA_BLOQUE: 0.06, SACUDIDA_MINERAL: 0.14, SACUDIDA_DECAE_SEG: 0.18,
  PAUSA_BLOQUE_MS: 0, PAUSA_MINERAL_MS: 50, PAUSA_FOSIL_MS: 90,
  COLAPSO_SEG: 4.5, COLAPSO_ZOOM: 30,
};
