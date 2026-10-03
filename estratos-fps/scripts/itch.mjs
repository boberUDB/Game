// Comprime dist/ en ../out/estratos-itch.zip con Compress-Archive de PowerShell.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(raiz, 'dist');
const salida = resolve(raiz, '..', 'out', 'estratos-itch.zip');
if (!existsSync(dist)) { console.error('No hay dist/. Corré npm run build.'); process.exit(1); }
mkdirSync(dirname(salida), { recursive: true });
if (existsSync(salida)) rmSync(salida);
const r = spawnSync('powershell', ['-NoProfile', '-Command',
  `Compress-Archive -Path '${dist}\\*' -DestinationPath '${salida}' -Force`], { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log('Listo:', salida);
