// Generación del mundo a partir de una semilla y de los estratos de las partidas anteriores.
import { ASCENSOR, CAPAS, COLAPSO, LUGARES, MINA, MINERALES, MUNDO, VETA } from '../config/balance';
import { mulberry32, ruido3 } from './rng';
import { ANCHO, LARGO, Mundo, SUELO_Y } from './mundo';
import { BloqueId, BLOQUE_DE_MINERAL, FOSIL_IDS, MINERAL_IDS } from './tipos';
import type { Estrato, FosilId } from './tipos';

export function profundidadMinaPara(estratos: number): number {
  return MINA.PROFUNDIDAD_BASE + MINA.POR_ESTRATO * Math.min(estratos, MINA.MAX_ESTRATOS);
}

export function indiceColorEstrato(estratoId: number): number {
  return ((estratoId % 3) + 3) % 3;
}

function esNatural(b: number): boolean {
  return b === BloqueId.tierra || b === BloqueId.piedra || b === BloqueId.obsidiana;
}

/** Excava una salita de 3x3x3 con el piso a `profundidad` metros, si hace falta. */
export function excavarSalita(mundo: Mundo, profundidad: number): { x: number; y: number; z: number } {
  const y0 = SUELO_Y - profundidad;
  const lado = ASCENSOR.SALITA_LADO;
  for (let dz = 0; dz < lado; dz++)
    for (let dx = 0; dx < lado; dx++) {
      const x = ASCENSOR.SALITA_X + dx, z = ASCENSOR.SALITA_Z + dz;
      for (let dy = 0; dy < ASCENSOR.ALTO_SALITA; dy++) if (mundo.get(x, y0 + dy, z) !== BloqueId.aire) mundo.set(x, y0 + dy, z, BloqueId.aire);
      if (mundo.get(x, y0 - 1, z) === BloqueId.aire) mundo.set(x, y0 - 1, z, BloqueId.piedra);
    }
  return { x: ASCENSOR.SALITA_X + lado / 2, y: y0, z: ASCENSOR.SALITA_Z + lado / 2 };
}

function construirSuperficie(m: Mundo): void {
  const t = LUGARES.TIENDA;
  const y0 = SUELO_Y;
  // Tienda de la Niña Tere: muros de adobe, mostrador de madera, techo de teja.
  for (let z = t.z0; z <= t.z1; z++)
    for (let x = t.x0; x <= t.x1; x++) {
      const borde = x === t.x0 || x === t.x1 || z === t.z0 || z === t.z1;
      if (!borde) continue;
      for (let dy = 0; dy < t.altoMuro; dy++) m.poner(x, y0 + dy, z, BloqueId.adobe);
    }
  for (let x = t.x0 + 1; x < t.x1; x++) {
    m.poner(x, y0, t.z0, BloqueId.madera);                       // mostrador
    for (let dy = 1; dy < t.altoMuro; dy++) m.poner(x, y0 + dy, t.z0, BloqueId.aire);  // ventana
  }
  for (let dz = 2; dz <= 3; dz++) for (let dy = 0; dy < 2; dy++) m.poner(t.x0, y0 + dy, t.z0 + dz, BloqueId.aire); // puerta
  for (let z = t.z0 - 1; z <= t.z1 + 1; z++)
    for (let x = t.x0 - 1; x <= t.x1 + 1; x++) m.poner(x, y0 + t.altoMuro, z, BloqueId.teja);
  for (let z = t.z0 + 1; z < t.z1; z++) for (let x = t.x0 + 1; x < t.x1; x++) m.poner(x, y0 - 1, z, BloqueId.madera);

  // Ascensor: piso, cuatro postes y techo.
  const cx = Math.floor(LUGARES.ASCENSOR.x), cz = Math.floor(LUGARES.ASCENSOR.z);
  for (let dz = -1; dz <= 1; dz++)
    for (let dx = -1; dx <= 1; dx++) {
      m.poner(cx + dx, y0 - 1, cz + dz, BloqueId.madera);
      m.poner(cx + dx, y0 + 3, cz + dz, BloqueId.teja);
      if (dx !== 0 && dz !== 0) for (let dy = 0; dy < 3; dy++) m.poner(cx + dx, y0 + dy, cz + dz, BloqueId.madera);
    }

  // Postes en las esquinas de la boca de la mina.
  for (const [x, z] of [[MINA.X0, MINA.Z0], [MINA.X0 + MINA.LADO - 1, MINA.Z0], [MINA.X0, MINA.Z0 + MINA.LADO - 1], [MINA.X0 + MINA.LADO - 1, MINA.Z0 + MINA.LADO - 1]]) {
    m.poner(x, y0, z, BloqueId.madera);
    m.poner(x, y0 + 1, z, BloqueId.madera);
  }
}

export function generarMundo(semilla: number, estratos: Estrato[]): Mundo {
  const m = new Mundo();
  const azar = mulberry32(semilla);
  const prof = profundidadMinaPara(estratos.length);
  m.profundidadMina = prof;
  const { X0, Z0, LADO } = MINA;
  const enMina = (x: number, z: number) => x >= X0 && x < X0 + LADO && z >= Z0 && z < Z0 + LADO;

  // 1. Todo roca madre, con el empedrado de la plaza arriba.
  for (let y = 0; y < SUELO_Y - 1; y++)
    for (let z = 0; z < LARGO; z++)
      for (let x = 0; x < ANCHO; x++) m.poner(x, y, z, BloqueId.roca_madre);
  for (let z = 0; z < LARGO; z++) for (let x = 0; x < ANCHO; x++) m.poner(x, SUELO_Y - 1, z, BloqueId.empedrado);

  // 2. Capas naturales de la mina.
  for (let z = Z0; z < Z0 + LADO; z++)
    for (let x = X0; x < X0 + LADO; x++)
      for (let p = 0; p < prof; p++) {
        const y = SUELO_Y - 1 - p;
        let b: number;
        if (p === prof - 1) b = BloqueId.arenisca_jeroglificos;
        else if (p < 2) b = BloqueId.tierra;
        else if (p < CAPAS.TIERRA_HASTA) b = azar() < CAPAS.TIERRA_PROB_PIEDRA ? BloqueId.piedra : BloqueId.tierra;
        else if (p < CAPAS.PIEDRA_HASTA) b = BloqueId.piedra;
        else if (p < CAPAS.OBSIDIANA_PROFUNDA_DESDE) b = azar() < CAPAS.OBSIDIANA_PROB_MEDIA ? BloqueId.obsidiana : BloqueId.piedra;
        else b = azar() < CAPAS.OBSIDIANA_PROB_PROFUNDA ? BloqueId.obsidiana : BloqueId.piedra;
        m.poner(x, y, z, b);
      }

  // 3. Minerales en vetas de 2 a 5 bloques.
  const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  for (const mineral of MINERAL_IDS) {
    const def = MINERALES[mineral];
    for (let p = Math.max(2, def.desde); p < prof - 2; p++) {
      const y = SUELO_Y - 1 - p;
      for (let z = Z0; z < Z0 + LADO; z++)
        for (let x = X0; x < X0 + LADO; x++) {
          const apaga = 1 - VETA.APAGA_FRACCION * Math.max(0, Math.min(1, (p - def.apagaDesde) / VETA.APAGA_METROS));
          if (azar() >= def.probVeta * apaga) continue;
          if (!esNatural(m.get(x, y, z))) continue;
          const n = VETA.MIN + Math.floor(azar() * (VETA.MAX - VETA.MIN + 1));
          let cx = x, cy = y, cz = z;
          for (let i = 0; i < n; i++) {
            if (enMina(cx, cz) && esNatural(m.get(cx, cy, cz)) && SUELO_Y - 1 - cy >= def.desde) m.poner(cx, cy, cz, BLOQUE_DE_MINERAL[mineral]);
            const d = dirs[Math.floor(azar() * 6)];
            cx += d[0]; cy += d[1]; cz += d[2];
          }
        }
    }
  }

  // 4. Cuevas por ruido 3D desde los 12 m, cerca del 10 % del volumen.
  const celdas: { i: number; v: number }[] = [];
  const s = CAPAS.CUEVAS_ESCALA;
  const valores = new Float32Array(LADO * LADO * prof);
  let k = 0;
  const cuevaSemilla = (semilla ^ 0x5bd1e995) | 0;
  for (let p = CAPAS.CUEVAS_DESDE; p < prof - 3; p++) {
    const y = SUELO_Y - 1 - p;
    for (let z = Z0 + 1; z < Z0 + LADO - 1; z++)
      for (let x = X0 + 1; x < X0 + LADO - 1; x++) {
        const sb = s * CAPAS.CUEVAS_ESCALA_B;
        const v = CAPAS.CUEVAS_PESO_A * ruido3(x * s, y * s * CAPAS.CUEVAS_ALARGADO, z * s, cuevaSemilla) + CAPAS.CUEVAS_PESO_B * ruido3(x * sb, y * sb, z * sb, cuevaSemilla + 7);
        valores[k] = v;
        celdas.push({ i: k, v });
        k++;
      }
  }
  if (celdas.length > 0) {
    const orden = Float32Array.from(celdas.map((c) => c.v)).sort();
    const umbral = orden[Math.floor(orden.length * CAPAS.CUEVAS_FRACCION)];
    let q = 0;
    for (let p = CAPAS.CUEVAS_DESDE; p < prof - 3; p++) {
      const y = SUELO_Y - 1 - p;
      for (let z = Z0 + 1; z < Z0 + LADO - 1; z++)
        for (let x = X0 + 1; x < X0 + LADO - 1; x++) {
          if (valores[q++] < umbral) m.poner(x, y, z, BloqueId.aire);
        }
    }
  }

  // 5. Estratos de las partidas anteriores: la más reciente arriba, 6 m cada una.
  const bandas: { desde: number; hasta: number; color: number }[] = [];
  estratos.slice(-MINA.MAX_ESTRATOS).reverse().forEach((e, slot) => {
    const desde = MINA.ESTRATO_DESDE + MINA.POR_ESTRATO * slot;
    bandas.push({ desde, hasta: desde + MINA.POR_ESTRATO, color: indiceColorEstrato(e.id) });
  });
  for (const b of bandas) {
    for (let p = b.desde; p < b.hasta && p < prof - 1; p++) {
      const y = SUELO_Y - 1 - p;
      for (let z = Z0; z < Z0 + LADO; z++)
        for (let x = X0; x < X0 + LADO; x++) if (esNatural(m.get(x, y, z))) m.poner(x, y, z, BloqueId.estrato_0 + b.color);
    }
  }

  // 6. Fósiles: 3 al azar dentro de las capas.
  if (bandas.length > 0) {
    const ids: FosilId[] = [...FOSIL_IDS];
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(azar() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    for (const id of ids.slice(0, COLAPSO.FOSILES_POR_PARTIDA)) {
      for (let intento = 0; intento < 400; intento++) {
        const b = bandas[Math.floor(azar() * bandas.length)];
        const x = X0 + 2 + Math.floor(azar() * (LADO - 4));
        const z = Z0 + 2 + Math.floor(azar() * (LADO - 4));
        const p = b.desde + Math.floor(azar() * (b.hasta - b.desde));
        const y = SUELO_Y - 1 - p;
        const actual = m.get(x, y, z);
        if (actual < BloqueId.estrato_0 || actual > BloqueId.estrato_2) continue;
        m.poner(x, y, z, BloqueId.fosil_0 + b.color);
        m.fosiles.push({ id, x, y, z });
        break;
      }
    }
  }

  // 7. Superficie y la salita de la parada de 30 m.
  construirSuperficie(m);
  m.confirmarBase();
  if (prof > 36) {
    excavarSalita(m, 30);
    m.confirmarBase();
  }
  m.sucios.clear();
  m.marcarTodoSucio();
  return m;
}

export const MUNDO_TAMANO = { ancho: MUNDO.ANCHO, largo: MUNDO.LARGO, alto: MUNDO.ALTO };
