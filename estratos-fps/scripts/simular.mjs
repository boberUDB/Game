// Empaqueta src/game/simulacion.ts con esbuild (viene con vite) y lo ejecuta.
import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const salida = resolve(raiz, 'node_modules', '.cache', 'simulacion.mjs');
mkdirSync(dirname(salida), { recursive: true });
await build({
  entryPoints: [resolve(raiz, 'src', 'game', 'simulacion.ts')],
  bundle: true, platform: 'node', format: 'esm', outfile: salida, logLevel: 'error',
});
const modulo = await import(pathToFileURL(salida).href + '?t=' + Date.now());
console.log(modulo.informe());
