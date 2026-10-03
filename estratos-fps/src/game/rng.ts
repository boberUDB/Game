// Generador con semilla y ruido de valor 3D, para que la misma semilla dé la misma mina.
export function mulberry32(semilla: number): () => number {
  let a = semilla | 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function semillaAleatoria(azar: () => number = Math.random): number {
  return (azar() * 0x7FFFFFFF) | 0;
}

/** Hash entero de tres coordenadas a [0, 1). */
export function hash3(x: number, y: number, z: number, semilla: number): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 2147483647) ^ Math.imul(semilla | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function suave(t: number): number { return t * t * (3 - 2 * t); }

/** Ruido de valor 3D suave en [0, 1). */
export function ruido3(x: number, y: number, z: number, semilla: number): number {
  const x0 = Math.floor(x), y0 = Math.floor(y), z0 = Math.floor(z);
  const tx = suave(x - x0), ty = suave(y - y0), tz = suave(z - z0);
  const v = (i: number, j: number, k: number) => hash3(x0 + i, y0 + j, z0 + k, semilla);
  const a = v(0, 0, 0) * (1 - tx) + v(1, 0, 0) * tx;
  const b = v(0, 1, 0) * (1 - tx) + v(1, 1, 0) * tx;
  const c = v(0, 0, 1) * (1 - tx) + v(1, 0, 1) * tx;
  const d = v(0, 1, 1) * (1 - tx) + v(1, 1, 1) * tx;
  return (a * (1 - ty) + b * ty) * (1 - tz) + (c * (1 - ty) + d * ty) * tz;
}
