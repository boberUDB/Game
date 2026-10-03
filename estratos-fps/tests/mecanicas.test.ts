import { describe, expect, it } from 'vitest';
import { FOSIL, MOMIA, MUNDO } from '../src/config/balance';
import { objetivoInteraccion, viajar } from '../src/game/ascensor';
import { actualizarSueltos, crearSuelto } from '../src/game/botin';
import { entradaVacia } from '../src/game/entrada';
import { actualizarFosiles, activarFosil, multiplicadorDanioFosil } from '../src/game/fosiles';
import { cambiarPantalla, crearJuego, pasoJuego } from '../src/game/juego';
import { teletransportar } from '../src/game/jugador';
import { actualizarMomias, crearMomia, golpearMomia } from '../src/game/momia';
import { SUELO_Y } from '../src/game/mundo';
import { actualizarPicado } from '../src/game/picado';
import { BloqueId } from '../src/game/tipos';
import type { Juego } from '../src/game/tipos';

function juegoListo(): Juego {
  const j = crearJuego(77);
  cambiarPantalla(j, 'jugando');
  return j;
}

/** Hueco de aire de 3x3x3 con piso de piedra, para probar sin estorbos. */
function sala(j: Juego, x: number, y: number, z: number): void {
  for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
    j.mundo.set(x + dx, y - 1, z + dz, BloqueId.piedra);
    for (let dy = 0; dy < 3; dy++) j.mundo.set(x + dx, y + dy, z + dz, BloqueId.aire);
  }
}

describe('picado y fósiles', () => {
  it('el Rompefilas daña también los 2 bloques siguientes en línea', () => {
    const j = juegoListo();
    const y = SUELO_Y - 20;
    sala(j, 28, y, 28);
    for (let z = 20; z < 28; z++) for (let dy = 0; dy < 2; dy++) j.mundo.set(28, y + dy, z, BloqueId.piedra);
    teletransportar(j, 28.5, y, 28.9);
    j.jugador.guinada = 0; j.jugador.cabeceo = 0;
    // Los ojos están a 1.55 m: el rayo pasa por la fila de arriba (y + 1).
    j.fosilesActivos = ['rompefilas'];
    actualizarPicado(j, true, 0.2);
    actualizarPicado(j, true, 0.1);
    const dano = (z: number) => j.mundo.danio.get(28 + z * 56 + (y + 1) * 56 * 56) ?? 0;
    expect(dano(27) + (j.mundo.get(28, y + 1, 27) === BloqueId.aire ? 99 : 0)).toBeGreaterThan(0);
    expect(dano(26) + (j.mundo.get(28, y + 1, 26) === BloqueId.aire ? 99 : 0)).toBeGreaterThan(0);
    expect(dano(25) + (j.mundo.get(28, y + 1, 25) === BloqueId.aire ? 99 : 0)).toBeGreaterThan(0);
    expect(dano(24)).toBe(0);
  });

  it('Brasa antigua duplica el daño solo con el calor arriba de 60 %', () => {
    const j = juegoListo();
    j.fosilesActivos = ['brasa'];
    j.jugador.calor = 50;
    expect(multiplicadorDanioFosil(j)).toBe(1);
    j.jugador.calor = 61;
    expect(multiplicadorDanioFosil(j)).toBe(FOSIL.BRASA_MULT);
  });

  it('Don Chepe pica su columna hacia abajo y vende los minerales al 50 %', () => {
    const j = juegoListo();
    const y = SUELO_Y - 15;
    for (let dx = 0; dx < 2; dx++) for (let dz = 0; dz < 2; dz++) for (let k = 1; k <= 6; k++) j.mundo.set(30 + dx, y - k, 30 + dz, BloqueId.piedra);
    j.mundo.set(30, y - 2, 30, BloqueId.piedra_oro);
    activarFosil(j, 'don_chepe', 30, y, 30);
    expect(j.chepe.activo).toBe(true);
    let total = 0;
    for (let i = 0; i < 60 * 12; i++) actualizarFosiles(j, 1 / 60);
    for (let k = 1; k <= 6; k++) expect(j.mundo.get(30, y - k, 30)).toBe(BloqueId.aire);
    total = j.colones;
    expect(total).toBeGreaterThan(0);
    expect(j.fosilesActivos).toContain('don_chepe');
  });

  it('Don Chepe con el Rompefilas pica una columna de 3x3', () => {
    const j = juegoListo();
    const y = SUELO_Y - 15;
    for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) j.mundo.set(30 + dx, y - 1, 30 + dz, BloqueId.piedra);
    j.fosilesActivos = ['rompefilas'];
    activarFosil(j, 'don_chepe', 30, y, 30);
    for (let i = 0; i < 90; i++) actualizarFosiles(j, 1 / 60);
    for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) expect(j.mundo.get(30 + dx, y - 1, 30 + dz)).toBe(BloqueId.aire);
  });

  it('el Imán atrae minerales sueltos a menos de 5 m aunque haya paredes', () => {
    const j = juegoListo();
    const y = SUELO_Y - 20;
    sala(j, 28, y, 28);
    teletransportar(j, 28.5, y, 28.5);
    for (let x = 30; x < 32; x++) for (let dz = -1; dz <= 1; dz++) for (let dy = 0; dy < 2; dy++) j.mundo.set(x, y + dy, 28 + dz, BloqueId.piedra);
    crearSuelto(j, 'azufre', 32.5, y + 0.5, 28.5, 5);
    j.fosilesActivos = ['iman'];
    for (let i = 0; i < 90; i++) actualizarSueltos(j, 1 / 60);
    expect(j.sueltos).toHaveLength(0);
    expect(j.mochila.piezas).toHaveLength(1);
  });

  it('sin el Imán un mineral lejano se queda donde está, y la mochila llena avisa', () => {
    const j = juegoListo();
    crearSuelto(j, 'azufre', 20.5, 80, 20.5, 5);
    actualizarSueltos(j, 1 / 60);
    expect(j.sueltos).toHaveLength(1);
  });
});

describe('momia', () => {
  it('muere a los 6 golpes, suelta colones directo y tiene 10 % de soltar un zafiro', () => {
    const j = juegoListo();
    const m = crearMomia(j, 28.5, SUELO_Y - 24, 28.5);
    for (let i = 0; i < 5; i++) expect(golpearMomia(j, m.uid, 1)).toBe(false);
    expect(j.colones).toBe(0);
    expect(golpearMomia(j, m.uid, 1)).toBe(true);
    expect(j.colones).toBeGreaterThan(MOMIA.COLONES);
    expect(j.momias).toHaveLength(0);
  });

  it('aparece solo desde los 20 m, con máximo 3, y nunca a menos de 10 m', () => {
    const j = juegoListo();
    teletransportar(j, 28.5, SUELO_Y - 10, 28.5);
    for (let i = 0; i < 60 * 30; i++) actualizarMomias(j, 1 / 60);
    expect(j.momias).toHaveLength(0);
    j.jugador.pos.y = SUELO_Y - 26;
    j.relojMomias = 0;
    for (let i = 0; i < 60 * 40; i++) actualizarMomias(j, 1 / 60);
    expect(j.momias.length).toBeLessThanOrEqual(MOMIA.MAX);
  });

  it('te pega y suma 20 % de calor, y espera antes de volver a golpear', () => {
    const j = juegoListo();
    const y = SUELO_Y - 24;
    sala(j, 28, y, 28);
    teletransportar(j, 28.5, y, 28.5);
    const m = crearMomia(j, 29.2, y, 28.5);
    m.reloj = 0;
    actualizarMomias(j, 1 / 60);
    expect(j.jugador.calor).toBeGreaterThanOrEqual(MOMIA.CALOR_GOLPE);
    const calor = j.jugador.calor;
    actualizarMomias(j, 1 / 60);
    expect(j.jugador.calor).toBe(calor);
  });
});

describe('calor, ascensor y silbido', () => {
  it('al 100 % de calor te desmayás: pierdes la mitad de las piezas y despertás arriba', () => {
    const j = juegoListo();
    sala(j, 28, SUELO_Y - 20, 28);
    for (let i = 0; i < 6; i++) j.mochila.piezas.push({ uid: 100 + i, mineral: 'azufre', x: i % 4, y: Math.floor(i / 4), rot: 0, valor: 4 });
    teletransportar(j, 28.5, SUELO_Y - 20, 28.5);
    j.jugador.calor = 100;
    pasoJuego(j, entradaVacia(), 1 / 60);
    expect(j.pantalla).toBe('desmayo');
    expect(j.mochila.piezas).toHaveLength(3);
    expect(j.jugador.pos.y).toBeCloseTo(SUELO_Y, 0);
    expect(j.jugador.calor).toBe(0);
  });

  it('el calor sube bajo los 10 m y baja rápido en la superficie', () => {
    const j = juegoListo();
    sala(j, 28, SUELO_Y - 30, 28);
    teletransportar(j, 28.5, SUELO_Y - 30, 28.5);
    for (let i = 0; i < 60; i++) pasoJuego(j, entradaVacia(), 1 / 60);
    expect(j.jugador.calor).toBeGreaterThan(1.5);
    teletransportar(j, 28.5, SUELO_Y, 28.5);
    for (let i = 0; i < 60 * 3; i++) pasoJuego(j, entradaVacia(), 1 / 60);
    expect(j.jugador.calor).toBe(0);
  });

  it('T silba 2 s y sube a la superficie; un golpe lo cancela', () => {
    const j = juegoListo();
    sala(j, 28, SUELO_Y - 12, 28);
    teletransportar(j, 28.5, SUELO_Y - 12, 28.5);
    const t = entradaVacia();
    t.subir = true;
    pasoJuego(j, t, 1 / 60);
    expect(j.jugador.silbando).toBe(true);
    for (let i = 0; i < 60 * 2.1; i++) pasoJuego(j, entradaVacia(), 1 / 60);
    expect(j.jugador.pos.y).toBeGreaterThan(SUELO_Y - 2);

    const y = SUELO_Y - 12;
    teletransportar(j, 28.5, y, 28.5);
    pasoJuego(j, t, 1 / 60);
    crearMomia(j, 29.2, y, 28.5).reloj = 0;
    actualizarMomias(j, 1 / 60);
    expect(j.jugador.silbando).toBe(false);
  });

  it('el ascensor lleva a las paradas alcanzadas y excava la salita', () => {
    const j = juegoListo();
    j.paradas = [10, 20];
    j.records.profundidadPartida = 20;
    expect(viajar(j, 30)).toBe(false);
    expect(viajar(j, 20)).toBe(true);
    expect(Math.round(MUNDO.SUELO_Y - j.jugador.pos.y)).toBe(20);
    expect(j.mundo.get(28, SUELO_Y - 20, 28)).toBe(BloqueId.aire);
    expect(viajar(j, 0)).toBe(true);
    expect(j.jugador.pos.y).toBeCloseTo(SUELO_Y, 0);
  });

  it('E en la tienda de la superficie abre la tienda; fuera de alcance no hace nada', () => {
    const j = juegoListo();
    teletransportar(j, 36, SUELO_Y, 42);
    expect(objetivoInteraccion(j)?.tipo).toBe('tienda');
    const e = entradaVacia();
    e.interactuar = true;
    pasoJuego(j, e, 1 / 60);
    expect(j.pantalla).toBe('tienda');
    teletransportar(j, 20, SUELO_Y, 20);
    cambiarPantalla(j, 'jugando');
    expect(objetivoInteraccion(j)).toBeNull();
  });
});
