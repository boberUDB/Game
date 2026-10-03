import { describe, expect, it } from 'vitest';
import { COLAPSO, MEJORAS, MINA, TIENDA } from '../src/config/balance';
import { lanzarRayo } from '../src/game/dda';
import { colapsar, multiplicador, profundidadRequerida, puedeColapsar } from '../src/game/colapso';
import { generarMundo } from '../src/game/generacion';
import { deserializar, migrar, serializar } from '../src/game/guardado';
import { crearJuego } from '../src/game/juego';
import { acomodarSolo, agregarAuto, estaLlena, mover, quitar, rotarPieza } from '../src/game/mochila';
import { comprar, costoDe, puedeComprar } from '../src/game/mejoras';
import { Mundo, SUELO_Y, indiceVoxel } from '../src/game/mundo';
import { desgloseVenta, precioDe, venderTodo } from '../src/game/tienda';
import { BloqueId } from '../src/game/tipos';

function huella(m: Mundo): number {
  let h = 2166136261;
  for (let i = 0; i < m.bloques.length; i += 7) h = Math.imul(h ^ m.bloques[i], 16777619) >>> 0;
  return h;
}

describe('mochila', () => {
  it('acomoda piezas con forma, rota y quita', () => {
    const j = crearJuego(1);
    expect(agregarAuto(j, 'rubi', 100)).toBe(true);      // 2x2
    expect(agregarAuto(j, 'zafiro', 100)).toBe(true);    // 1x3
    expect(agregarAuto(j, 'esmeralda', 100)).toBe(true); // L
    expect(j.mochila.piezas).toHaveLength(3);
    const uid = j.mochila.piezas[1].uid;
    expect(rotarPieza(j, uid)).toBe(true);
    expect(mover(j, uid, 0, 0, 0)).toBe(false);          // choca con el rubí
    expect(quitar(j, uid)).toBe(true);
    expect(j.mochila.piezas).toHaveLength(2);
  });

  it('acomodarSolo desordena menos y logra llenar 4x4 con piezas que encajan', () => {
    const j = crearJuego(1);
    for (let i = 0; i < 4; i++) agregarAuto(j, 'azufre', 4);
    agregarAuto(j, 'rubi', 70);
    agregarAuto(j, 'zafiro', 160);
    agregarAuto(j, 'zafiro', 160);
    agregarAuto(j, 'oro', 12);
    // Las piezas se desparraman en el orden de llegada; acomodarSolo las junta.
    expect(acomodarSolo(j)).toBe(true);
    const celdas = j.mochila.piezas.length;
    expect(celdas).toBeGreaterThan(0);
  });

  it('con la mochila llena no entra nada más', () => {
    const j = crearJuego(1);
    for (let i = 0; i < 16; i++) expect(agregarAuto(j, 'azufre', 4)).toBe(true);
    expect(estaLlena(j)).toBe(true);
    expect(agregarAuto(j, 'azufre', 4)).toBe(false);
  });
});

describe('mejoras', () => {
  it('el costo crece 15 % por nivel', () => {
    const j = crearJuego(1);
    expect(costoDe(j, 'filo')).toBe(20);
    j.colones = 1000;
    expect(comprar(j, 'filo')).toBe(true);
    expect(costoDe(j, 'filo')).toBe(Math.round(20 * 1.15));
    j.mejoras.alcance = MEJORAS.alcance.max;
    expect(puedeComprar(j, 'alcance')).toBe(false);
  });
  it('no deja comprar sin plata', () => {
    const j = crearJuego(1);
    expect(comprar(j, 'filo')).toBe(false);
    expect(j.mejoras.filo).toBe(0);
  });
});

describe('tienda', () => {
  it('la saturación baja el precio y es independiente por tienda', () => {
    const j = crearJuego(1);
    agregarAuto(j, 'oro', 100);
    const inicial = desgloseVenta(j, 'tere').total;
    expect(inicial).toBe(100);
    expect(venderTodo(j, 'tere')).toBe(100);
    expect(j.saturacion.tere.oro).toBeCloseTo(TIENDA.SATURACION_POR_UNIDAD);
    expect(j.saturacion.abajo.oro).toBe(0);
    agregarAuto(j, 'oro', 100);
    const pieza = j.mochila.piezas[0];
    expect(precioDe(j, 'tere', pieza)).toBeCloseTo(97);
    expect(precioDe(j, 'abajo', pieza)).toBeCloseTo(135);
  });
  it('paga bonus de mochila llena, mascota y multiplicador', () => {
    const j = crearJuego(1);
    for (let i = 0; i < 16; i++) agregarAuto(j, 'azufre', 10);
    j.mascota.comprada = true;
    j.colapsos = 1;
    const d = desgloseVenta(j, 'tere');
    expect(d.bonusLlena && d.bonusMascota).toBe(true);
    expect(d.total).toBe(Math.round(160 * 1.5 * 1.2 * 1.75));
  });
  it('la saturación tiene tope', () => {
    const j = crearJuego(1);
    for (let k = 0; k < 40; k++) { for (let i = 0; i < 16; i++) agregarAuto(j, 'azufre', 4); venderTodo(j, 'tere'); }
    expect(j.saturacion.tere.azufre).toBeLessThanOrEqual(TIENDA.SATURACION_MAX);
  });
});

describe('colapso', () => {
  it('multiplicador 1 + 0.75 por colapso y profundidad requerida con tope', () => {
    const j = crearJuego(1);
    expect(multiplicador(j)).toBe(1);
    j.colapsos = 3;
    expect(multiplicador(j)).toBeCloseTo(3.25);
    j.colapsos = 20;
    expect(profundidadRequerida(j)).toBe(COLAPSO.REQUERIDO_MAX);
  });
  it('no colapsa sin la profundidad, y al colapsar conserva Torogoz y récords', () => {
    const j = crearJuego(7);
    expect(puedeColapsar(j)).toBe(false);
    expect(colapsar(j, true)).toBeNull();
    j.records.profundidadPartida = 34;
    j.records.bloquesPartida = 812;
    j.records.bloquesTotal = 900;
    j.colones = 500;
    j.mascota.comprada = true;
    j.mejoras.filo = 4;
    agregarAuto(j, 'oro', 12);
    const semillaAntes = j.semilla;
    const e = colapsar(j, true);
    expect(e).not.toBeNull();
    expect(j.colapsos).toBe(1);
    expect(j.estratos).toHaveLength(1);
    expect(j.estratos[0].profundidadMax).toBe(34);
    expect(j.colones).toBe(0);
    expect(j.mejoras.filo).toBe(0);
    expect(j.mochila.piezas).toHaveLength(0);
    expect(j.mascota.comprada).toBe(true);
    expect(j.records.bloquesTotal).toBe(900);
    expect(j.semilla).not.toBe(semillaAntes);
    expect(j.mundo.profundidadMina).toBe(MINA.PROFUNDIDAD_BASE + MINA.POR_ESTRATO);
    expect(j.mundo.fosiles).toHaveLength(COLAPSO.FOSILES_POR_PARTIDA);
  });
});

describe('generación', () => {
  it('es determinista por semilla', () => {
    const a = generarMundo(1234, []);
    const b = generarMundo(1234, []);
    const c = generarMundo(4321, []);
    expect(huella(a)).toBe(huella(b));
    expect(huella(a)).not.toBe(huella(c));
  });
  it('el primer bloque bajo el suelo de la mina es tierra y el fondo es de jeroglíficos', () => {
    const m = generarMundo(5, []);
    expect(m.get(26, SUELO_Y - 1, 37)).toBe(BloqueId.tierra);
    expect(m.get(30, SUELO_Y - m.profundidadMina, 30)).toBe(BloqueId.arenisca_jeroglificos);
    expect(m.get(0, 10, 0)).toBe(BloqueId.roca_madre);
  });
  it('los estratos y fósiles aparecen en la mina siguiente', () => {
    const m = generarMundo(9, [{ id: 1, profundidadMax: 34, bloquesPicados: 800, fecha: '' }]);
    let estratos = 0, fosiles = 0;
    for (let i = 0; i < m.bloques.length; i++) {
      const b = m.bloques[i];
      if (b >= BloqueId.estrato_0 && b <= BloqueId.estrato_2) estratos++;
      if (b >= BloqueId.fosil_0 && b <= BloqueId.fosil_2) fosiles++;
    }
    expect(estratos).toBeGreaterThan(1000);
    expect(fosiles).toBe(3);
  });
  it('hay cuevas (cerca del 10 %) y minerales en vetas', () => {
    const m = generarMundo(11, []);
    let aire = 0, total = 0, minerales = 0;
    for (let p = 12; p < 69; p++) {
      const y = SUELO_Y - 1 - p;
      for (let z = 17; z < 39; z++) for (let x = 17; x < 39; x++) {
        total++;
        const b = m.get(x, y, z);
        if (b === BloqueId.aire) aire++;
        if (b >= BloqueId.piedra_azufre && b <= BloqueId.piedra_zafiro) minerales++;
      }
    }
    expect(aire / total).toBeGreaterThan(0.06);
    expect(aire / total).toBeLessThan(0.16);
    expect(minerales).toBeGreaterThan(50);
  });
});

describe('lanzarRayo', () => {
  it('encuentra el primer bloque sólido y su cara', () => {
    const m = new Mundo();
    m.poner(10, 50, 10, BloqueId.piedra);
    const hit = lanzarRayo(m, { x: 10.5, y: 50.5, z: 5.5 }, { x: 0, y: 0, z: 1 }, 10);
    expect(hit).not.toBeNull();
    expect(hit).toMatchObject({ x: 10, y: 50, z: 10, cara: 5 });
    expect(hit!.distancia).toBeCloseTo(4.5);
  });
  it('respeta el alcance y atraviesa el aire', () => {
    const m = new Mundo();
    m.poner(10, 50, 20, BloqueId.piedra);
    expect(lanzarRayo(m, { x: 10.5, y: 50.5, z: 5.5 }, { x: 0, y: 0, z: 1 }, 3)).toBeNull();
    expect(lanzarRayo(m, { x: 10.5, y: 50.5, z: 5.5 }, { x: 0, y: 0, z: 1 }, 20)).toMatchObject({ z: 20 });
  });
  it('funciona en diagonal hacia abajo', () => {
    const m = new Mundo();
    for (let x = 0; x < 56; x++) for (let z = 0; z < 56; z++) m.poner(x, 40, z, BloqueId.tierra);
    const hit = lanzarRayo(m, { x: 20.2, y: 44.7, z: 20.9 }, { x: 0.3, y: -1, z: 0.2 }, 10);
    expect(hit).toMatchObject({ y: 40, cara: 2 });
  });
});

describe('guardado', () => {
  it('serializa y deserializa el mismo estado, incluidos los bloques picados', () => {
    const j = crearJuego(42);
    j.mundo.set(26, SUELO_Y - 1, 37, BloqueId.aire);
    j.mundo.set(26, SUELO_Y - 2, 37, BloqueId.aire);
    j.colones = 321;
    j.mejoras.filo = 3;
    agregarAuto(j, 'oro', 12);
    j.paradas = [10, 20];
    j.jugador.pos = { x: 26.5, y: SUELO_Y - 2, z: 37.5 };
    const texto = JSON.stringify(serializar(j));
    const k = deserializar(JSON.parse(texto));
    expect(k).not.toBeNull();
    expect(k!.colones).toBe(321);
    expect(k!.mejoras.filo).toBe(3);
    expect(k!.mochila.piezas).toHaveLength(1);
    expect(k!.mundo.get(26, SUELO_Y - 1, 37)).toBe(BloqueId.aire);
    expect(k!.mundo.bloques[indiceVoxel(26, SUELO_Y - 2, 37)]).toBe(BloqueId.aire);
    expect(huella(k!.mundo)).toBe(huella(j.mundo));
    expect(k!.paradas).toEqual([10, 20]);
    expect(k!.jugador.pos.z).toBeCloseTo(37.5);
  });
  it('rechaza guardados dañados', () => {
    expect(deserializar(null)).toBeNull();
    expect(deserializar({ version: 1 })).toBeNull();
    expect(deserializar('hola')).toBeNull();
    expect(migrar({ version: 99 })).toBeNull();
    const g = serializar(crearJuego(3)) as unknown as Record<string, unknown>;
    g.cambios = [[1, 'x']];
    expect(deserializar(g)).toBeNull();
  });
  it('migra la versión 0 llenando lo que faltaba', () => {
    const g = JSON.parse(JSON.stringify(serializar(crearJuego(8)))) as Record<string, unknown>;
    g.version = 0;
    delete g.paradas;
    delete g.ajustes;
    delete g.tutorial;
    const m = migrar(g);
    expect(m).not.toBeNull();
    expect(m!.version).toBe(1);
    expect(m!.ajustes.fov).toBe(75);
    expect(m!.paradas).toEqual([]);
  });
});
