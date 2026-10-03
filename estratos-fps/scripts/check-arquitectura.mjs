// Falla si src/game/ importa three o toca window, document o localStorage.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'game');
const prohibidos = [
  [/from\s+['"]three(\/[^'"]*)?['"]/, 'importa three'],
  [/import\s+['"]three/, 'importa three'],
  [/\bwindow\b/, 'usa window'],
  [/\bdocument\b/, 'usa document'],
  [/\blocalStorage\b/, 'usa localStorage'],
  [/from\s+['"]\.\.\/(render|ui|input|audio)\//, 'importa capas de fuera de game/'],
];

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : p.endsWith('.ts') ? [p] : [];
  });
}

let errores = 0;
for (const f of archivos(raiz)) {
  // Los comentarios no cuentan.
  const texto = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  texto.split('\n').forEach((linea, i) => {
    for (const [re, motivo] of prohibidos) {
      if (re.test(linea)) { console.error(`${f}:${i + 1}: ${motivo}`); errores++; }
    }
  });
}
if (errores) { console.error(`check-arquitectura: ${errores} problema(s)`); process.exit(1); }
console.log('check-arquitectura: OK, src/game/ no depende de three ni del navegador');
