// Localiza el intérprete de Python (PATH y luego %LOCALAPPDATA%\Programs\Python) y ejecuta un script.
// Uso: node scripts/python.mjs ruta/al/script.py [argumentos]
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const aquí = dirname(fileURLToPath(import.meta.url));

function candidatos() {
  const lista = [];
  const base = process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Programs', 'Python');
  if (base && existsSync(base)) {
    for (const d of readdirSync(base).sort().reverse()) lista.push(join(base, d, 'python.exe'));
  }
  // Los alias de la tienda de Windows fallan, por eso se prueba el PATH al final y con verificación.
  lista.push('python', 'python3', 'py');
  return lista;
}

function sirve(exe) {
  const r = spawnSync(exe, ['-c', 'import numpy, PIL'], { stdio: 'ignore' });
  return r.status === 0;
}

const [script, ...resto] = process.argv.slice(2);
if (!script) { console.error('Falta el script de Python.'); process.exit(2); }
const exe = candidatos().find((c) => (/[\\/]/.test(c) ? existsSync(c) : true) && sirve(c));
if (!exe) { console.error('No encontré un Python con numpy y Pillow.'); process.exit(2); }
const r = spawnSync(exe, [resolve(aquí, '..', script), ...resto], { stdio: 'inherit' });
process.exit(r.status ?? 1);
