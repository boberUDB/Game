// Único archivo de balance: TODOS los números del juego viven aquí.
// Se ajusta con `npm run simular`. Los números de render y de sensación también están aquí.
import type { FosilId, MejoraId, MineralId } from '../game/tipos';

// ---------------------------------------------------------------------------
// Mundo
// ---------------------------------------------------------------------------
export const MUNDO = {
  ANCHO: 56, LARGO: 56, ALTO: 112,
  SUELO_Y: 96,                       // cara superior del suelo. Profundidad = SUELO_Y - y
  SUPERFICIE_CALOR: 1.5, SUPERFICIE_ASCENSOR: 2.5,  // por encima de estas profundidades cuenta como superficie
  LIMITE_MIN: 5, LIMITE_MAX: 51,     // paredes invisibles de la plaza
  CHUNK: 16,
};

export const MINA = {
  X0: 16, Z0: 16, LADO: 24,          // la mina ocupa x y z de 16 a 39
  PROFUNDIDAD_BASE: 72, POR_ESTRATO: 6, MAX_ESTRATOS: 3,
  ESTRATO_DESDE: 6,                  // los estratos empiezan a los 6 m
};

export const CAPAS = {
  TIERRA_HASTA: 10, TIERRA_PROB_PIEDRA: 0.15,
  PIEDRA_HASTA: 30,
  OBSIDIANA_DESDE: 30, OBSIDIANA_PROB_MEDIA: 0.22,   // 30 a 50 m
  OBSIDIANA_PROFUNDA_DESDE: 50, OBSIDIANA_PROB_PROFUNDA: 0.55,
  CUEVAS_DESDE: 12, CUEVAS_FRACCION: 0.10, CUEVAS_ESCALA: 0.13,
  CUEVAS_PESO_A: 0.65, CUEVAS_PESO_B: 0.35, CUEVAS_ESCALA_B: 2.1, CUEVAS_ALARGADO: 1.3,
};

export const VIDA = {
  tierra: 2, piedra: 5, obsidiana: 12, estrato: 6, fosil: 10, MINERAL_MULT: 1.2,
  POR_METRO: 0.03,                   // vida final = base * (1 + profundidad * 0.03)
};

export const MINERALES: Record<MineralId, {
  nombre: string; forma: number[][]; valor: number; desde: number; probVeta: number; apagaDesde: number; color: string;
}> = {
  // apagaDesde: a partir de esa profundidad la veta se vuelve más rara (baja hasta 35 % en 20 m), para que
  // los minerales baratos no llenen la mochila cuando ya se pagan los caros.
  azufre: { nombre: 'Azufre', forma: [[1]], valor: 4, desde: 1, probVeta: 0.027, apagaDesde: 14, color: 'var(--azufre)' },
  oro: { nombre: 'Oro', forma: [[1], [1]], valor: 12, desde: 8, probVeta: 0.011, apagaDesde: 30, color: 'var(--oro)' },
  esmeralda: { nombre: 'Esmeralda', forma: [[1, 0], [1, 1]], valor: 30, desde: 18, probVeta: 0.0075, apagaDesde: 48, color: 'var(--esmeralda)' },
  rubi: { nombre: 'Rubí', forma: [[1, 1], [1, 1]], valor: 70, desde: 30, probVeta: 0.0055, apagaDesde: 999, color: 'var(--rubi)' },
  zafiro: { nombre: 'Zafiro', forma: [[1], [1], [1]], valor: 160, desde: 45, probVeta: 0.0045, apagaDesde: 999, color: 'var(--zafiro)' },
};
export const VETA = { MIN: 2, MAX: 5, APAGA_FRACCION: 0.65, APAGA_METROS: 20 };
export const VALOR_POR_METRO = 0.03; // valor = base * (1 + profundidad * 0.03)

// ---------------------------------------------------------------------------
// Pico y mejoras
// ---------------------------------------------------------------------------
export const PICO = { DANIO_BASE: 1, GOLPES_POR_SEG: 4, ALCANCE_BASE: 3 };

export const CRECIMIENTO_MEJORA = 1.15; // costo = base * 1.15 ^ nivel
export const MEJORAS: Record<MejoraId, { nombre: string; base: number; max: number; porNivel: number; unidad: string }> = {
  filo: { nombre: 'Filo', base: 20, max: 25, porNivel: 0.25, unidad: '% de daño' },
  mango: { nombre: 'Mango ligero', base: 30, max: 20, porNivel: 0.08, unidad: '% de golpes por segundo' },
  alcance: { nombre: 'Alcance', base: 150, max: 4, porNivel: 0.5, unidad: ' m de alcance' },
  suerte: { nombre: 'Suerte', base: 60, max: 20, porNivel: 0.03, unidad: '% de botín doble' },
  temple: { nombre: 'Temple', base: 40, max: 20, porNivel: 0.03, unidad: '% menos calor' },
};

// ---------------------------------------------------------------------------
// Mochila y tiendas
// ---------------------------------------------------------------------------
export const MOCHILA = { COLUMNAS: 4, FILAS: 4, BONUS_LLENA: 0.5, INTENTOS_ACOMODO: 4000 };

export const TIENDA = {
  SATURACION_POR_UNIDAD: 0.03, SATURACION_MAX: 0.5, RECUPERACION: 0.02, RECUPERACION_CADA_SEG: 10,
  ABAJO_MULT: 1.35, ABAJO_PROFUNDIDAD: 30,
  NOMBRE_TERE: 'Niña Tere', NOMBRE_ABAJO: 'Don Mauricio',
  FRASE_ABAJO: 'Acá abajo se paga mejor, vos. Traeme lo que brilla.',
};

export const CALOR = {
  DESDE: 10, GANANCIA_POR_METRO: 0.12, ENFRIA_SUPERFICIE: 25, ENFRIA_ARRIBA: 5,
  PIERDE_AL_DESMAYO: 0.5, SEG_DESMAYADO: 2.5, ALTO: 70, CRITICO: 90,
};

export const JUGADOR = {
  ANCHO: 0.6, ALTO: 1.7, OJOS: 1.55, CAMINA: 4.3, CORRE: 6.5, GRAVEDAD: 24, SALTO: 7.8,
  RADIO_RECOGER: 1.5, PECHO: 1.0, CAIDA_MAX: 32, ACEL_SUELO: 60, ACEL_AIRE: 18, RAD_POR_PIXEL: 0.0022,
  CABECEO_MAX: 1.5533,               // 89 grados
};

export const MOMIA = {
  DESDE: 20, MAX: 3, DIST_APARICION: 10, VE: 10, VELOCIDAD: 2.2, VELOCIDAD_PASEO: 0.9,
  CALOR_GOLPE: 20, ESPERA: 1.2, VIDA_GOLPES: 6, COLONES: 25, PROB_ZAFIRO: 0.10,
  ALTO: 1.8, ANCHO: 0.6, HITBOX: 0.7, REACH: 1.1, REACH_Y: 1.7, DIST_MIN_PERSEGUIR: 0.2, RETROCESO: 5, SEG_ENTRE_APARICIONES: 6,
  SEG_DANO: 0.25, EMPUJE: 7, GIRO_CAMBIO: 3,
};

export const COLAPSO = {
  REQUERIDO_BASE: 30, EXTRA_POR_COLAPSO: 5, REQUERIDO_MAX: 55, MULT_POR_COLAPSO: 0.75,
  FOSILES_POR_PARTIDA: 3, SEG: 4.6, FASE_FUNDIDO: 2.6, FASE_TARJETA: 3.4,
};

export const FOSILES: Record<FosilId, { nombre: string; detalle: string }> = {
  rompefilas: { nombre: 'Pico Rompefilas', detalle: 'Cada golpe también daña los 2 bloques que siguen en línea.' },
  don_chepe: { nombre: 'Don Chepe', detalle: 'Lo rescataste. Pica solo una columna de 2×2 hacia abajo y vende al 50 %.' },
  iman: { nombre: 'Imán de talpetate', detalle: 'Los minerales sueltos a menos de 5 m vuelan hacia vos, aunque haya paredes.' },
  brasa: { nombre: 'Brasa antigua', detalle: 'Con el calor arriba de 60 % pegás el doble.' },
};
export const FOSIL = {
  ROMPEFILAS_EXTRA: 2, CHEPE_SEG: 1.2, CHEPE_VENDE: 0.5, CHEPE_LADO: 2, CHEPE_LADO_ROMPEFILAS: 3,
  IMAN_RADIO: 5, IMAN_VELOCIDAD: 12, BRASA_CALOR: 60, BRASA_MULT: 2, BRILLO_RADIO: 40,
};

export const MASCOTA = { nombre: 'Torogoz', costo: 250, BONUS_VENTA: 0.2 };
export const ASCENSOR = { MARGEN: 0.2, TOLERANCIA_Y: 1.4, CADA: 10, SALITA_X: 27, SALITA_Z: 27, SALITA_LADO: 3, ALTO_SALITA: 3 };
export const SILBIDO = { SEG: 2 };

// ---------------------------------------------------------------------------
// Lugares de la superficie (x, z en metros)
// ---------------------------------------------------------------------------
export const LUGARES = {
  SPAWN: { x: 26.5, z: 37.5, guinada: Math.atan2(-(36 - 26.5), -(44.5 - 37.5)) },   // sobre la tierra de la mina, mirando la tienda
  TIENDA: { x0: 32, x1: 39, z0: 44, z1: 49, altoMuro: 3, mostrador: { x: 36, z: 44.5 }, RADIO: 3.4 },
  ASCENSOR: { x: 13.5, z: 28.5, RADIO: 2.4 },
  FOGATA: { x: 22.5, z: 47.5 },
  FAROLES: [{ x: 30.5, z: 41.5 }, { x: 14.5, z: 42.5 }, { x: 27.5, z: 13.5 }],
  VENDEDOR: { dx: 2.5, dz: 2.5, RADIO: 2.0 },   // posición dentro de la salita
  ARBOLES: 26, IZOTES: 14,
};

// ---------------------------------------------------------------------------
// Simulación y guardado
// ---------------------------------------------------------------------------
export const AJUSTES_DEFECTO = { calidad: 'medio' as const, volumen: 0.7, silencio: false, sensibilidad: 1, invertirY: false, fov: 75 };
export const SIM = { PASO: 1 / 60, MAX_PASOS: 5, GUARDAR_CADA_SEG: 10, SEG_ENTRE_AVISOS_LLENA: 3 };
export const GUARDADO = { CLAVE: 'estratos-fps.save.v1', VERSION: 1 };

// ---------------------------------------------------------------------------
// Sensación (sacudidas, pausas, balanceo). Valores provisionales, listos para pulir.
// ---------------------------------------------------------------------------
export const SENSACION = {
  SACUDIDA_GOLPE: 0.012, SACUDIDA_ROTURA: 0.03, SACUDIDA_MINERAL: 0.05, SACUDIDA_DECAE_SEG: 0.16,
  SACUDIDA_COLAPSO: 0.35, SACUDIDA_GOLPE_MOMIA: 0.08,
  PAUSA_IMPACTO_MINERAL_MS: 45, PAUSA_IMPACTO_FOSIL_MS: 90,
  CAMARA_LENTA_FOSIL_SEG: 0.5, CAMARA_LENTA_ESCALA: 0.25,
  BALANCEO_PICO_PX: 6, BALANCEO_PICO_FREC: 9, RETRASO_PICO: 0.04, RETRASO_PICO_MAX_PX: 40,
  BALANCEO_CAMARA: 0.012, GOLPE_PICO_RETROCESO_PX: 10,
  FOV_CORRER: 6, FOV_SUAVIZADO: 8,
  LATIDO_DESDE_CALOR: 70,
};

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
export const RENDER = {
  CALIDAD: {
    bajo: { ancho: 480, alto: 270, bloom: false, dof: false, polvo: 60, particulas: 128 },
    medio: { ancho: 640, alto: 360, bloom: true, dof: false, polvo: 120, particulas: 256 },
    alto: { ancho: 960, alto: 540, bloom: true, dof: true, polvo: 200, particulas: 512 },
  },
  FOV_DEFECTO: 75, FOV_MIN: 60, FOV_MAX: 90, CERCA: 0.05, LEJOS: 140,
  NIEBLA_SUPERFICIE: 0.012, NIEBLA_MINA: 0.045, NIEBLA_POR_METRO: 0.0006, NIEBLA_MAX: 0.095,
  LUZ_FAROL: { intensidad: 8, distancia: 30, decae: 1.4 },
  LUZ_AMBIENTE_MINA: 1.9, LUZ_AMBIENTE_SUPERFICIE: 2.6, LUZ_LUNA: 3.0,
  EMISION_MINERAL: 1.4, EMISION_FOSIL: 1.8, EMISION_FONDO: 1.6,
  BLOOM: { umbral: 0.8, fuerza: 0.65, radio: 0.5 },
  VINETA: { fuerza: 0.55, suavidad: 0.5 },
  AO: [0.5, 0.68, 0.84, 1.0],
  ALCANCE_PARTICULAS_FOSIL: 24,
  ESTRELLAS: 700,
};

export const COLORES_ESTRATO = [0x9d6bbd, 0x62b5a5, 0xe3bb55];
