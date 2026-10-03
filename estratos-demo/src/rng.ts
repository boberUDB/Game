// Generador con semilla: la misma semilla da la misma mina.
export function mulberry32(semilla: number): () => number {
  let a = semilla | 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function semillaNueva(): number {
  return (Math.random() * 0x7FFFFFFF) | 0;
}
