// Guardado: el mundo se guarda como semilla más la lista de bloques cambiados.
import { AJUSTES_DEFECTO, GUARDADO } from '../config/balance';
import { generarMundo } from './generacion';
import { crearJuego } from './juego';
import { BloqueId, FOSIL_IDS, MEJORA_IDS, MINERAL_IDS, TIENDA_IDS, esFosil } from './tipos';
import type { Ajustes, Estrato, FosilId, Juego, MejoraId, MineralId, Pieza, Suelto, TiendaId } from './tipos';

export interface Guardado {
  version: number;
  fecha: string;
  semilla: number;
  cambios: [number, number][];
  jugador: { x: number; y: number; z: number; guinada: number; cabeceo: number; calor: number };
  mochila: Pieza[];
  sueltos: Suelto[];
  chepe: { activo: boolean; x: number; y: number; z: number; reloj: number };
  colones: number;
  mejoras: Record<MejoraId, number>;
  mascota: { comprada: boolean };
  fosilesActivos: FosilId[];
  saturacion: Record<TiendaId, Record<MineralId, number>>;
  paradas: number[];
  colapsos: number;
  estratos: Estrato[];
  records: Juego['records'];
  ajustes: Ajustes;
  tutorial: Juego['tutorial'];
  uid: number;
}

export function serializar(juego: Juego): Guardado {
  const j = juego.jugador;
  return {
    version: GUARDADO.VERSION,
    fecha: new Date().toISOString(),
    semilla: juego.semilla,
    cambios: [...juego.mundo.cambios.entries()],
    jugador: { x: j.pos.x, y: j.pos.y, z: j.pos.z, guinada: j.guinada, cabeceo: j.cabeceo, calor: j.calor },
    mochila: juego.mochila.piezas.map((p) => ({ ...p })),
    sueltos: juego.sueltos.map((s) => ({ ...s })),
    chepe: { ...juego.chepe },
    colones: juego.colones,
    mejoras: { ...juego.mejoras },
    mascota: { ...juego.mascota },
    fosilesActivos: [...juego.fosilesActivos],
    saturacion: JSON.parse(JSON.stringify(juego.saturacion)),
    paradas: [...juego.paradas],
    colapsos: juego.colapsos,
    estratos: juego.estratos.map((e) => ({ ...e })),
    records: { ...juego.records },
    ajustes: { ...juego.ajustes },
    tutorial: { ...juego.tutorial },
    uid: juego.uid,
  };
}

const esNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const esObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function ajustesPorDefecto(): Ajustes {
  return { ...AJUSTES_DEFECTO };
}

/**
 * Valida un guardado y lo lleva a la versión actual. Acepta la versión 0 (sin ajustes de mouse,
 * sin paradas ni mapa de tutorial) y devuelve null si algo no cuadra.
 */
export function migrar(datos: unknown): Guardado | null {
  if (!esObj(datos)) return null;
  const v = datos.version;
  if (v !== 0 && v !== GUARDADO.VERSION) return null;
  if (!esNum(datos.semilla) || !Array.isArray(datos.cambios) || !esObj(datos.jugador) || !Array.isArray(datos.mochila)) return null;
  const j = datos.jugador;
  if (![j.x, j.y, j.z].every(esNum)) return null;
  if (!esNum(datos.colones) || !esObj(datos.mejoras) || !esObj(datos.records) || !Array.isArray(datos.estratos)) return null;
  for (const par of datos.cambios) {
    if (!Array.isArray(par) || par.length !== 2 || !esNum(par[0]) || !esNum(par[1])) return null;
  }
  for (const p of datos.mochila) {
    if (!esObj(p) || !MINERAL_IDS.includes(p.mineral as MineralId) || !esNum(p.x) || !esNum(p.y) || !esNum(p.valor)) return null;
  }
  const base = crearJuegoBase();
  const mejoras = { ...base.mejoras };
  for (const id of MEJORA_IDS) if (esNum(datos.mejoras[id])) mejoras[id] = datos.mejoras[id] as number;
  const rec = datos.records as Record<string, unknown>;
  const records = { ...base.records };
  for (const k of Object.keys(records) as (keyof Juego['records'])[]) if (esNum(rec[k])) records[k] = rec[k] as number;
  const estratos = (datos.estratos as unknown[]).filter(esObj).map((e) => ({
    id: esNum(e.id) ? e.id : 1, profundidadMax: esNum(e.profundidadMax) ? e.profundidadMax : 0,
    bloquesPicados: esNum(e.bloquesPicados) ? e.bloquesPicados : 0, fecha: typeof e.fecha === 'string' ? e.fecha : '',
  }));
  const sat = base.saturacion;
  if (esObj(datos.saturacion)) {
    for (const t of TIENDA_IDS) {
      const s = (datos.saturacion as Record<string, unknown>)[t];
      if (esObj(s)) for (const m of MINERAL_IDS) if (esNum(s[m])) sat[t][m] = s[m] as number;
    }
  }
  const aj = esObj(datos.ajustes) ? datos.ajustes : {};
  const ajustes = { ...ajustesPorDefecto(), ...(aj as Partial<Ajustes>) };
  const ch = esObj(datos.chepe) ? datos.chepe : {};
  const tut = esObj(datos.tutorial) ? datos.tutorial : {};
  return {
    version: GUARDADO.VERSION,
    fecha: typeof datos.fecha === 'string' ? datos.fecha : '',
    semilla: datos.semilla,
    cambios: datos.cambios as [number, number][],
    jugador: {
      x: j.x as number, y: j.y as number, z: j.z as number,
      guinada: esNum(j.guinada) ? j.guinada : 0, cabeceo: esNum(j.cabeceo) ? j.cabeceo : 0, calor: esNum(j.calor) ? j.calor : 0,
    },
    mochila: (datos.mochila as Record<string, unknown>[]).map((p, i) => ({
      uid: esNum(p.uid) ? p.uid : i + 1, mineral: p.mineral as MineralId, x: p.x as number, y: p.y as number,
      rot: (esNum(p.rot) ? ((p.rot % 4) + 4) % 4 : 0) as Pieza['rot'], valor: p.valor as number,
    })),
    sueltos: Array.isArray(datos.sueltos) ? (datos.sueltos as Record<string, unknown>[]).filter((s) => esObj(s) && MINERAL_IDS.includes(s.mineral as MineralId) && esNum(s.x) && esNum(s.y) && esNum(s.z) && esNum(s.valor)).map((s, i) => ({
      uid: esNum(s.uid) ? s.uid : 100000 + i, mineral: s.mineral as MineralId, x: s.x as number, y: s.y as number, z: s.z as number, valor: s.valor as number,
    })) : [],
    chepe: {
      activo: ch.activo === true, x: esNum(ch.x) ? ch.x : 0, y: esNum(ch.y) ? ch.y : 0, z: esNum(ch.z) ? ch.z : 0, reloj: esNum(ch.reloj) ? ch.reloj : 0,
    },
    colones: datos.colones,
    mejoras,
    mascota: { comprada: esObj(datos.mascota) && datos.mascota.comprada === true },
    fosilesActivos: Array.isArray(datos.fosilesActivos) ? (datos.fosilesActivos as unknown[]).filter((f): f is FosilId => FOSIL_IDS.includes(f as FosilId)) : [],
    saturacion: sat,
    paradas: Array.isArray(datos.paradas) ? (datos.paradas as unknown[]).filter(esNum) : [],
    colapsos: esNum(datos.colapsos) ? datos.colapsos : estratos.length,
    estratos,
    records,
    ajustes,
    tutorial: { movio: tut.movio === true, pico: tut.pico === true, vendio: tut.vendio === true },
    uid: esNum(datos.uid) ? datos.uid : 1000,
  };
}

function crearJuegoBase(): Juego {
  return crearJuego(1, { generar: false });
}

/** Reconstruye un Juego desde un guardado (regenera el mundo y aplica los cambios). Null si está dañado. */
export function deserializar(datos: unknown): Juego | null {
  const g = migrar(datos);
  if (!g) return null;
  const juego = crearJuego(g.semilla, { generar: false });
  juego.estratos = g.estratos;
  juego.colapsos = g.colapsos;
  juego.mundo = generarMundo(g.semilla, g.estratos);
  for (const [i, id] of g.cambios) {
    if (i < 0 || i >= juego.mundo.bloques.length || id < 0 || id > BloqueId.teja) return null;
    const ancho = 56, largo = 56;
    juego.mundo.set(i % ancho, Math.floor(i / (ancho * largo)), Math.floor(i / ancho) % largo, id);
  }
  juego.mundo.danio.clear();
  juego.fosilesMapa = juego.mundo.fosiles.filter((f) => esFosil(juego.mundo.get(f.x, f.y, f.z))).map((f) => ({ ...f }));
  const j = juego.jugador;
  j.pos = { x: g.jugador.x, y: g.jugador.y, z: g.jugador.z };
  j.guinada = g.jugador.guinada; j.cabeceo = g.jugador.cabeceo; j.calor = g.jugador.calor;
  juego.mochila.piezas = g.mochila;
  juego.sueltos = g.sueltos;
  juego.chepe = g.chepe;
  juego.colones = g.colones;
  juego.mejoras = g.mejoras;
  juego.mascota = g.mascota;
  juego.fosilesActivos = g.fosilesActivos;
  juego.saturacion = g.saturacion;
  juego.paradas = g.paradas;
  juego.records = g.records;
  juego.ajustes = g.ajustes;
  juego.tutorial = g.tutorial;
  juego.uid = Math.max(g.uid, ...g.mochila.map((p) => p.uid + 1), ...g.sueltos.map((s) => s.uid + 1), 1);
  return juego;
}
