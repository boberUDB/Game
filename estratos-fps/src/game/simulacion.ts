// Simulación sencilla de la economía (no es un bot que juegue): compara ingresos por minuto según la
// profundidad con el costo de las mejoras y estima tiempos de hitos. Se ejecuta con `npm run simular`.
// La densidad de minerales sale de generar mundos de verdad, así que el modelo sigue al juego real.
import {
  CALOR, CAPAS, COLAPSO, CRECIMIENTO_MEJORA, MASCOTA, MEJORAS, MINERALES, MOCHILA, PICO, MUNDO, TIENDA, VALOR_POR_METRO, VIDA,
} from '../config/balance';
import { generarMundo } from './generacion';
import { MEJORA_IDS, MINERAL_IDS, BloqueId, mineralDeBloque } from './tipos';
import type { MejoraId, MineralId } from './tipos';

/** Supuestos de comportamiento del jugador (no son reglas del juego). */
export const SIM_PARAMS = {
  BLOQUES_POR_METRO: 3.0,      // bloques que pica por cada metro que baja (tiro más vetas laterales)
  SEG_POR_BLOQUE_EXTRA: 0.28,  // apuntar, moverse y recoger entre golpes
  SELECCION: 2.0,              // el jugador apunta a lo que brilla: veces más minerales que la densidad pura
  EMPAQUE: 0.88,               // qué tan bien se acomoda la mochila antes de llenarse
  CALOR_PARA_SUBIR: 82,
  SEG_VIAJE_BASE: 9,           // T, vender, comprar y bajar en ascensor
  SEG_CAMINO_POR_METRO: 0.09,  // regreso hasta el frente desde la última parada
  FOSIL_VELOCIDAD: 1.2,        // efecto promedio de los fósiles tras un colapso
  LIMITE_BASE: 5,              // profundidad cómoda sin mejoras
  LIMITE_POR_NIVEL: 0.62,       // metros más que se animan a bajar por cada nivel de mejora comprado
  MINUTOS_MAX: 90,
};

/** Densidad real de cada mineral por metro de profundidad, medida en mundos generados. */
let densidad: Record<MineralId, number[]> | null = null;
let solidosPorMetro: number[] = [];

function medirDensidad(): void {
  if (densidad) return;
  const d = { azufre: [], oro: [], esmeralda: [], rubi: [], zafiro: [] } as Record<MineralId, number[]>;
  const prof = 72;
  const cuenta: Record<MineralId, number[]> = { azufre: [], oro: [], esmeralda: [], rubi: [], zafiro: [] };
  const solidos: number[] = new Array(prof).fill(0);
  for (const m of MINERAL_IDS) cuenta[m] = new Array(prof).fill(0);
  const semillas = [11, 22, 33];
  for (const s of semillas) {
    const mundo = generarMundo(s, []);
    for (let p = 0; p < prof - 1; p++) {
      const y = MUNDO.SUELO_Y - 1 - p;
      for (let z = 16; z < 40; z++)
        for (let x = 16; x < 40; x++) {
          const b = mundo.get(x, y, z);
          if (b === BloqueId.aire) continue;
          solidos[p]++;
          const m = mineralDeBloque(b);
          if (m) cuenta[m][p]++;
        }
    }
  }
  for (const m of MINERAL_IDS) {
    const crudo = cuenta[m].map((c, p) => (solidos[p] > 0 ? c / solidos[p] : 0));
    // Promedio móvil de 5 m para quitar el ruido de tres mundos.
    d[m] = crudo.map((_, p) => { let a = 0, n = 0; for (let k = -2; k <= 2; k++) if (crudo[p + k] !== undefined) { a += crudo[p + k]; n++; } return a / n; });
  }
  densidad = d;
  solidosPorMetro = solidos;
}

function areaDe(m: MineralId): number {
  let n = 0;
  for (const f of MINERALES[m].forma) for (const v of f) n += v;
  return n;
}

/** Vida media de un bloque a cierta profundidad (mezcla de capas de balance.ts). */
export function vidaMedia(prof: number): number {
  let base: number;
  if (prof < CAPAS.TIERRA_HASTA) base = VIDA.tierra * (1 - CAPAS.TIERRA_PROB_PIEDRA) + VIDA.piedra * CAPAS.TIERRA_PROB_PIEDRA;
  else if (prof < CAPAS.OBSIDIANA_DESDE) base = VIDA.piedra;
  else if (prof < CAPAS.OBSIDIANA_PROFUNDA_DESDE) base = VIDA.piedra * (1 - CAPAS.OBSIDIANA_PROB_MEDIA) + VIDA.obsidiana * CAPAS.OBSIDIANA_PROB_MEDIA;
  else base = VIDA.piedra * (1 - CAPAS.OBSIDIANA_PROB_PROFUNDA) + VIDA.obsidiana * CAPAS.OBSIDIANA_PROB_PROFUNDA;
  return base * (1 + prof * VIDA.POR_METRO);
}

/** Fracción esperada de bloques picados que son mineral X a una profundidad (con la selección del jugador). */
export function fraccionMineral(m: MineralId, prof: number): number {
  medirDensidad();
  const p = Math.max(0, Math.min(70, Math.floor(prof)));
  return Math.min(0.4 / MINERAL_IDS.length * 2, densidad![m][p] * SIM_PARAMS.SELECCION);
}

export interface Niveles { filo: number; mango: number; alcance: number; suerte: number; temple: number }

export function costoNivel(id: MejoraId, nivel: number): number {
  return Math.round(MEJORAS[id].base * Math.pow(CRECIMIENTO_MEJORA, nivel));
}

/** Segundos que toma romper un bloque de la profundidad dada. */
export function segPorBloque(prof: number, niv: Niveles, bono = 1): number {
  const danio = PICO.DANIO_BASE * (1 + MEJORAS.filo.porNivel * niv.filo);
  const gps = PICO.GOLPES_POR_SEG * (1 + MEJORAS.mango.porNivel * niv.mango);
  const golpes = Math.max(1, Math.ceil(vidaMedia(prof) / danio));
  return (golpes / gps + SIM_PARAMS.SEG_POR_BLOQUE_EXTRA) / bono;
}

/** Valor esperado en colones (sin bonus de venta) que suelta un bloque a esa profundidad. */
export function valorPorBloque(prof: number, niv: Niveles): number {
  let v = 0;
  for (const m of MINERAL_IDS) v += fraccionMineral(m, prof) * MINERALES[m].valor * (1 + prof * VALOR_POR_METRO);
  return v * (1 + MEJORAS.suerte.porNivel * niv.suerte);
}

export function celdasPorBloque(prof: number, niv: Niveles): number {
  let c = 0;
  for (const m of MINERAL_IDS) c += fraccionMineral(m, prof) * areaDe(m);
  return c * (1 + MEJORAS.suerte.porNivel * niv.suerte);
}

export interface FilaIngreso { prof: number; coloresPorMin: number; segLlenar: number; valorMochila: number }

/** Ingresos por minuto picando a una profundidad fija (sin contar viajes), con los niveles dados. */
export function tablaIngresos(niv: Niveles, mult = 1): FilaIngreso[] {
  const filas: FilaIngreso[] = [];
  for (const prof of [2, 5, 10, 15, 20, 30, 40, 50, 60, 70]) {
    const s = segPorBloque(prof, niv);
    const vb = valorPorBloque(prof, niv);
    const cb = celdasPorBloque(prof, niv);
    const celdas = MOCHILA.COLUMNAS * MOCHILA.FILAS * SIM_PARAMS.EMPAQUE;
    const bloquesLlenar = cb > 0 ? celdas / cb : Infinity;
    filas.push({ prof, coloresPorMin: (60 / s) * vb * mult, segLlenar: bloquesLlenar * s, valorMochila: bloquesLlenar * vb * (1 + MOCHILA.BONUS_LLENA) * mult });
  }
  return filas;
}

export interface Hitos {
  primeraVentaSeg: number;
  primeraMejoraSeg: number;
  primeraMochilaLlenaSeg: number;
  seg30m: number;
  seg30mTrasColapso: number[];
  viajesPorMejora: number[];
  viajes: number;
}

export function simular(): Hitos {
  medirDensidad();
  const niv: Niveles = { filo: 0, mango: 0, alcance: 0, suerte: 0, temple: 0 };
  const hitos: Hitos = {
    primeraVentaSeg: -1, primeraMejoraSeg: -1, primeraMochilaLlenaSeg: -1, seg30m: -1, seg30mTrasColapso: [], viajesPorMejora: [], viajes: 0,
  };
  let t = 0, prof = 0, dinero = 0, calor = 0, colapsos = 0, inicioPartida = 0;
  let celdas = 0, valor = 0, viajesDesdeMejora = 0;
  const piezas: Record<MineralId, number> = { azufre: 0, oro: 0, esmeralda: 0, rubi: 0, zafiro: 0 };
  const sat: Record<MineralId, number> = { azufre: 0, oro: 0, esmeralda: 0, rubi: 0, zafiro: 0 };
  let ultimaRecuperacion = 0;
  const capacidad = MOCHILA.COLUMNAS * MOCHILA.FILAS * SIM_PARAMS.EMPAQUE;
  const prioridad: MejoraId[] = ['filo', 'mango', 'temple', 'suerte'];
  const dt = 0.5;
  let primeraLlena = false;
  let torogoz = false;

  const mult = () => 1 + COLAPSO.MULT_POR_COLAPSO * colapsos;
  const niveles = () => niv.filo + niv.mango + niv.temple + niv.suerte;

  const comprarTodo = (): boolean => {
    let compro = false;
    for (;;) {
      if (!torogoz && dinero >= MASCOTA.costo * 1.5 && niv.filo >= 4) { dinero -= MASCOTA.costo; torogoz = true; compro = true; continue; }
      const opciones = prioridad.filter((id) => niv[id] < MEJORAS[id].max && costoNivel(id, niv[id]) <= dinero);
      if (opciones.length === 0) break;
      opciones.sort((a, b) => costoNivel(a, niv[a]) - costoNivel(b, niv[b]));
      const id = opciones[0];
      dinero -= costoNivel(id, niv[id]);
      niv[id]++;
      compro = true;
      if (hitos.primeraMejoraSeg < 0) hitos.primeraMejoraSeg = t;
    }
    return compro;
  };

  while (t < SIM_PARAMS.MINUTOS_MAX * 60) {
    const bono = colapsos > 0 ? SIM_PARAMS.FOSIL_VELOCIDAD : 1;
    const s = segPorBloque(prof, niv, bono);
    const bloques = dt / s;
    const limite = SIM_PARAMS.LIMITE_BASE + SIM_PARAMS.LIMITE_POR_NIVEL * niveles() * (colapsos > 0 ? 1.15 : 1);
    if (prof < limite) prof += bloques / SIM_PARAMS.BLOQUES_POR_METRO;
    celdas += celdasPorBloque(prof, niv) * bloques;
    valor += valorPorBloque(prof, niv) * bloques;
    for (const m of MINERAL_IDS) piezas[m] += fraccionMineral(m, prof) * bloques;
    if (prof > CALOR.DESDE) calor += (prof - CALOR.DESDE) * CALOR.GANANCIA_POR_METRO * (1 - MEJORAS.temple.porNivel * niv.temple) * dt;
    t += dt;

    if (t - ultimaRecuperacion >= TIENDA.RECUPERACION_CADA_SEG) {
      ultimaRecuperacion = t;
      for (const m of MINERAL_IDS) sat[m] = Math.max(0, sat[m] - TIENDA.RECUPERACION);
    }
    if (celdas >= capacidad && !primeraLlena) { primeraLlena = true; hitos.primeraMochilaLlenaSeg = t - inicioPartida; }

    const llena = celdas >= capacidad;
    const caliente = calor >= SIM_PARAMS.CALOR_PARA_SUBIR;
    if (llena || caliente) {
      const totalPiezas = MINERAL_IDS.reduce((a, m) => a + piezas[m], 0) || 1;
      let perdida = 0;
      for (const m of MINERAL_IDS) perdida += (piezas[m] / totalPiezas) * sat[m];
      const total = valor * (1 - perdida) * (llena ? 1 + MOCHILA.BONUS_LLENA : 1) * (torogoz ? 1 + MASCOTA.BONUS_VENTA : 1) * mult();
      for (const m of MINERAL_IDS) { sat[m] = Math.min(TIENDA.SATURACION_MAX, sat[m] + TIENDA.SATURACION_POR_UNIDAD * piezas[m]); piezas[m] = 0; }
      dinero += total;
      celdas = 0; valor = 0;
      hitos.viajes++;
      viajesDesdeMejora++;
      if (hitos.primeraVentaSeg < 0) hitos.primeraVentaSeg = t;
      t += SIM_PARAMS.SEG_VIAJE_BASE + calor / CALOR.ENFRIA_SUPERFICIE + Math.max(0, prof - Math.floor(prof / 10) * 10) * SIM_PARAMS.SEG_CAMINO_POR_METRO;
      calor = 0;
      if (comprarTodo()) { hitos.viajesPorMejora.push(viajesDesdeMejora); viajesDesdeMejora = 0; }
    }

    // Colapso al llegar a la profundidad requerida (para medir la vuelta siguiente).
    const requerida = Math.min(COLAPSO.REQUERIDO_BASE + COLAPSO.EXTRA_POR_COLAPSO * colapsos, COLAPSO.REQUERIDO_MAX);
    if (prof >= requerida) {
      const duracion = t - inicioPartida;
      if (colapsos === 0) hitos.seg30m = duracion; else hitos.seg30mTrasColapso.push(duracion);
      if (colapsos >= 2) break;
      colapsos++;
      inicioPartida = t;
      prof = 0; dinero = 0; calor = 0; celdas = 0; valor = 0;
      for (const id of MEJORA_IDS) niv[id] = 0;
      for (const m of MINERAL_IDS) { sat[m] = 0; piezas[m] = 0; }
      viajesDesdeMejora = 0;
    }
  }
  void solidosPorMetro;
  return hitos;
}

export function formatoTiempo(seg: number): string {
  if (seg < 0) return 'no llega';
  const m = Math.floor(seg / 60), s = Math.round(seg % 60);
  return `${m} min ${s} s`;
}

/** Texto completo del informe, para la consola y para el README. */
export function informe(): string {
  const niv0: Niveles = { filo: 0, mango: 0, alcance: 0, suerte: 0, temple: 0 };
  const niv10: Niveles = { filo: 10, mango: 6, alcance: 0, suerte: 4, temple: 6 };
  const lineas: string[] = [];
  const tabla = (titulo: string, niv: Niveles) => {
    lineas.push(titulo);
    lineas.push('| Profundidad | ₡ por minuto | Llenar la mochila | Valor de una mochila llena |');
    lineas.push('|---|---|---|---|');
    for (const f of tablaIngresos(niv)) {
      lineas.push(`| ${f.prof} m | ${Math.round(f.coloresPorMin)} | ${Number.isFinite(f.segLlenar) ? formatoTiempo(f.segLlenar) : 'nunca'} | ₡${Math.round(f.valorMochila)} |`);
    }
    lineas.push('');
  };
  tabla('Sin mejoras:', niv0);
  tabla('Con filo 10, mango 6, suerte 4 y temple 6:', niv10);
  lineas.push('Costo de cada mejora por nivel:');
  lineas.push('| Mejora | Nivel 0 | Nivel 5 | Nivel 10 | Nivel 15 |');
  lineas.push('|---|---|---|---|---|');
  for (const id of MEJORA_IDS) {
    lineas.push(`| ${MEJORAS[id].nombre} | ${[0, 5, 10, 15].map((n) => (n < MEJORAS[id].max ? '₡' + costoNivel(id, n) : 'max')).join(' | ')} |`);
  }
  lineas.push('');
  const h = simular();
  lineas.push('Hitos simulados:');
  lineas.push(`- Primera venta: ${formatoTiempo(h.primeraVentaSeg)}`);
  lineas.push(`- Primera mejora: ${formatoTiempo(h.primeraMejoraSeg)}`);
  lineas.push(`- Primera mochila llena: ${formatoTiempo(h.primeraMochilaLlenaSeg)}`);
  lineas.push(`- Llegar a ${COLAPSO.REQUERIDO_BASE} m: ${formatoTiempo(h.seg30m)}`);
  h.seg30mTrasColapso.forEach((s, i) => lineas.push(`- Tras el colapso ${i + 1}, volver a la profundidad requerida: ${formatoTiempo(s)}`));
  const vm = h.viajesPorMejora.length ? h.viajesPorMejora.reduce((a, b) => a + b, 0) / h.viajesPorMejora.length : 0;
  const mx = h.viajesPorMejora.length ? Math.max(...h.viajesPorMejora) : 0;
  lineas.push(`- Viajes entre mejoras: ${vm.toFixed(1)} en promedio, ${mx} como máximo (${h.viajes} viajes en total)`);
  return lineas.join('\n');
}
