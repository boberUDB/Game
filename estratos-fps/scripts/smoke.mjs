// Ruta guionada con Playwright (Edge o Chrome ya instalados, sin descargar nada) a 1600x900.
// Guarda las capturas en ../out/capturas/ y termina con error si hay errores de consola o falla algo.
import { mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const carpeta = resolve(raiz, '..', 'out', 'capturas');
rmSync(carpeta, { recursive: true, force: true });
mkdirSync(carpeta, { recursive: true });

const servidor = await createServer({ root: raiz, server: { port: 5191, strictPort: false }, logLevel: 'error' });
await servidor.listen();
const puerto = servidor.config.server.port;
const base = `http://localhost:${servidor.httpServer.address().port ?? puerto}/`;

const errores = [];
const fallos = [];
const verificar = (cond, msg) => { if (!cond) { fallos.push(msg); console.error('FALLA:', msg); } else console.log('ok  ', msg); };

async function lanzar(conVentana) {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: !conVentana, args: ['--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
    } catch (e) { console.warn(`No abrió ${channel}: ${e.message.split('\n')[0]}`); }
  }
  throw new Error('No hay Edge ni Chrome instalados.');
}

let browser = await lanzar(false);
let page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const tieneWebGL = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'));
if (!tieneWebGL) {
  console.warn('WebGL no está disponible sin ventana: se repite con ventana.');
  await browser.close();
  browser = await lanzar(true);
  page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
}

function escuchar(p) {
  p.on('console', (m) => { if (m.type() === 'error') errores.push(`console.error: ${m.text()}`); });
  p.on('pageerror', (e) => errores.push(`pageerror: ${e.message}`));
  p.on('requestfailed', (r) => errores.push(`requestfailed: ${r.url()}`));
}
escuchar(page);

const espera = (ms) => page.waitForTimeout(ms);
let n = 0;
const captura = async (nombre) => {
  n++;
  const ruta = resolve(carpeta, `${String(n).padStart(2, '0')}_${nombre}.png`);
  await page.screenshot({ path: ruta });
  console.log('captura', ruta);
};
const api = (fn, arg) => page.evaluate(fn, arg);

async function abrir(extra = '') {
  await page.goto(`${base}?debug&sinbloqueo${extra}`);
  await page.waitForFunction(() => window.__listo === true, null, { timeout: 60000 });
  await espera(400);
}

// Utilidades dentro de la página: encontrar sitios y excavar para armar las escenas.
async function instalarAyudas() {
  await page.evaluate(() => {
    const A = window.__estratos;
    const SUELO = 96, W = 56;
    const h = {
      get: (x, y, z) => A.juego.mundo.get(x, y, z),
      set: (x, y, z, id) => A.juego.mundo.set(x, y, z, id),
      tunelX: (x0, x1, y, z0, z1, alto) => {
        for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) {
          for (let k = 0; k < alto; k++) h.set(x, y + k, z, 0);
          if (h.get(x, y - 1, z) === 0) h.set(x, y - 1, z, 2);
        }
      },
      buscar: (id, pMin, pMax) => {
        const b = A.juego.mundo.bloques;
        for (let y = SUELO - 1 - pMin; y >= SUELO - 1 - pMax; y--)
          for (let z = 22; z < 34; z++) for (let x = 22; x < 34; x++) if (b[x + z * W + y * W * W] === id) return { x, y, z };
        return null;
      },
    };
    window.__h = h;
  });
}

// Mide cuánto cambia la imagen al girar la cámara una fracción de píxel: menos es menos parpadeo.
async function parpadeo() {
  const tomar = async () => (await page.screenshot({ clip: { x: 400, y: 250, width: 800, height: 400 } })).toString('base64');
  const a = await tomar();
  await api(() => { const A = window.__estratos, e = A.estado(); A.mirar(e.guinada + 0.004, e.cabeceo); });
  await espera(200);
  const b = await tomar();
  await api(() => { const A = window.__estratos, e = A.estado(); A.mirar(e.guinada - 0.004, e.cabeceo); });
  return page.evaluate(async ([x, y]) => {
    const cargar = async (t) => { const img = new Image(); img.src = 'data:image/png;base64,' + t; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0); return g.getImageData(0, 0, c.width, c.height).data; };
    const A = await cargar(x), B = await cargar(y);
    let suma = 0;
    for (let i = 0; i < A.length; i += 4) suma += Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]);
    return +(suma / (A.length / 4)).toFixed(3);
  }, [a, b]);
}
const medidas = {};

try {
  // 1. Título y superficie.
  await abrir();
  await instalarAyudas();
  await captura('titulo');
  await page.click('#btn-empezar');
  await espera(900);
  verificar((await api(() => window.__estratos.estado().pantalla)) === 'jugando', 'el clic en empezar pasa a jugando');
  await captura('superficie_mirando_tienda');
  const statsSuperficie = await api(() => window.__estratos.stats());
  await espera(300);
  const superficie = await api(() => window.__estratos.stats());

  // 3. Picando, con grietas.
  await api(() => { const A = window.__estratos; A.mirar(A.estado().guinada, -0.85); A.picarSeg(0.14); });
  await espera(350);
  await captura('picando_con_grietas');

  // 4. Mineral suelto brillando.
  const veta = await api(() => {
    const v = window.__h.buscar(6, 2, 9);
    if (!v) return null;
    const A = window.__estratos;
    window.__h.tunelX(v.x + 1, v.x + 4, v.y, v.z, v.z, 2);
    A.teletransportar(v.x + 3.7, v.y, v.z + 0.5);
    A.mirar(Math.PI / 2, 0);
    return v;
  });
  verificar(!!veta, 'hay una veta de azufre en los primeros 9 m');
  await api(() => { const A = window.__estratos; A.mirar(Math.PI / 2, -0.37); A.picarSeg(3); });
  await espera(500);
  verificar((await api(() => window.__estratos.estado().sueltos)) >= 1, 'romper la veta suelta un mineral');
  await captura('mineral_suelto');

  // 5. Mochila acomodada.
  await api(() => { const A = window.__estratos; A.teletransportar(26.5, 96, 37.5); for (const m of ['rubi', 'zafiro', 'esmeralda', 'oro', 'azufre', 'azufre']) A.darMineral(m, 1); A.abrir('mochila'); });
  await espera(500);
  await page.click('#btn-acomodar');
  await espera(400);
  await captura('mochila_acomodada');
  await api(() => window.__estratos.cerrar());

  // 6. Tienda con mochila vacía y venta.
  await api(() => { const A = window.__estratos; A.juego.mochila.piezas = []; A.teletransportar(36, 96, 42); A.abrir('tienda'); });
  await espera(500);
  await captura('tienda_mochila_vacia');
  await api(() => { const A = window.__estratos; A.cerrar(); A.darColones(60); for (let i = 0; i < 16; i++) A.darMineral('azufre', 1); A.abrir('tienda'); });
  await espera(500);
  await captura('venta_en_tienda_desglose');
  await page.click('#btn-vender');
  await espera(300);
  verificar((await api(() => window.__estratos.estado().colones)) > 60, 'vender suma colones');
  await page.click('#lista-mejoras .mejora:nth-child(1)');
  await espera(300);
  verificar((await api(() => window.__estratos.estado().mejoras.filo)) === 1, 'comprar el filo sube su nivel');
  await captura('venta_hecha_mejora');
  await api(() => window.__estratos.cerrar());

  // 7. Cueva a 25 m con una momia.
  const cueva = await api(() => {
    const A = window.__estratos, W = 56, SUELO = 96;
    const b = A.juego.mundo.bloques;
    let mejor = null, mp = -1;
    for (let p = 23; p <= 30; p++) {
      const y = SUELO - 1 - p;
      for (let z = 19; z < 37; z++) for (let x = 19; x < 37; x++) {
        if (b[x + z * W + y * W * W] !== 0 || b[x + z * W + (y + 1) * W * W] !== 0 || b[x + z * W + (y - 1) * W * W] === 0) continue;
        let libres = 0;
        for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) for (let dy = 0; dy <= 1; dy++) if (b[(x + dx) + (z + dz) * W + (y + dy) * W * W] === 0) libres++;
        if (libres > mp) { mp = libres; mejor = { x, y, z }; }
      }
    }
    return mejor;
  });
  verificar(!!cueva, 'hay una cueva entre 23 y 30 m');
  await api((c) => {
    const A = window.__estratos;
    A.teletransportar(c.x + 0.5, c.y, c.z + 0.5);
    let mejorYaw = 0, md = -1;
    for (let k = 0; k < 16; k++) {
      const yaw = (k / 16) * Math.PI * 2;
      let d = 0;
      for (let s = 1; s <= 6; s++) { const x = Math.floor(c.x + 0.5 - Math.sin(yaw) * s), z = Math.floor(c.z + 0.5 - Math.cos(yaw) * s); if (window.__h.get(x, c.y, z) !== 0) break; d = s; }
      if (d > md) { md = d; mejorYaw = yaw; }
    }
    A.mirar(mejorYaw, -0.05);
    A.aparecerMomia();
  }, cueva);
  await espera(500);
  verificar((await api(() => window.__estratos.estado().momias)) >= 1, 'aparece una momia');
  await captura('cueva_25m_momia');

  // 14. Pausa y estadísticas a 40 m (draw calls).
  await api(() => {
    const A = window.__estratos, W = 56, SUELO = 96;
    A.juego.momias = [];
    const y = SUELO - 40, x0 = 24;
    window.__h.tunelX(x0, x0 + 8, y, 27, 29, 3);
    A.teletransportar(x0 + 1, y, 28.5);
    A.mirar(Math.PI / 2 * 3 + Math.PI, -0.02);
    A.mirar(-Math.PI / 2, 0);
  });
  await espera(900);
  const a40 = await api(() => window.__estratos.stats());
  console.log('stats 40 m', JSON.stringify(a40));
  console.log('stats superficie', JSON.stringify(superficie), JSON.stringify(statsSuperficie));
  await api(() => window.__estratos.abrir('pausa'));
  await espera(400);
  await captura('pausa_ajustes');
  await api(() => window.__estratos.cerrar());

  // 12. Paredes a 1, 4 y 8 m: comparación del filtro de texturas.
  async function paredes(sufijo) {
    for (const d of [1, 4, 8]) {
      await api((dist) => {
        const A = window.__estratos, SUELO = 96;
        const y = SUELO - 18, Xw = 38;
        window.__h.tunelX(Xw - 10, Xw - 1, y, 27, 29, 3);
        for (let z = 26; z <= 30; z++) for (let k = -1; k < 4; k++) window.__h.set(Xw, y + k, z, 2);
        A.teletransportar(Xw - dist, y, 28.5);
        A.mirar(-Math.PI / 2, -0.02);
      }, d);
      await espera(500);
      await captura(`pared_${d}m${sufijo.replace(/[^a-z_]/gi, '')}`);
      medidas[`${d} m${sufijo || ' (NearestMipmapLinear)'}`] = await parpadeo();
    }
  }
  await paredes('');

  // 11. HUD con calor alto.
  await api(() => { const A = window.__estratos; A.teletransportar(31, 96 - 18, 28.5); A.mirar(-Math.PI / 2, -0.02); A.ponerCalor(88); });
  await espera(900);
  await captura('hud_calor_alto');
  await api(() => window.__estratos.ponerCalor(0));

  // 8. Colapso.
  await api(() => {
    const A = window.__estratos;
    A.teletransportar(36, 96, 42);
    A.juego.records.profundidadPartida = 34; A.juego.records.bloquesPartida = 812;
    A.juego.colones = 400; A.juego.mascota.comprada = true;
    A.abrir('tienda');
  });
  await espera(400);
  await page.click('#btn-colapsar');
  await espera(400);
  await captura('colapso_confirmacion');
  await page.click('#btn-colapso-si');
  await espera(1600);
  verificar((await api(() => window.__estratos.estado().pantalla)) === 'colapso', 'la cinemática del colapso corre');
  await captura('colapso_cinematica');
  await espera(2300);
  await captura('colapso_tarjeta');
  await espera(1800);
  const tras = await api(() => window.__estratos.estado());
  verificar(tras.pantalla === 'jugando' && tras.colapsos === 1 && tras.estratos === 1, 'el colapso termina en una mina nueva con un estrato');
  verificar(tras.fosilesEnMapa === 3 && tras.mascota === true && tras.colones === 0, 'la mina nueva trae 3 fósiles y conserva el Torogoz');
  await captura('mina_nueva_superficie_torogoz');

  // 9. Mina nueva con un estrato a la vista.
  await api(() => {
    const A = window.__estratos, SUELO = 96;
    for (let p = 0; p <= 9; p++) window.__h.set(26, SUELO - 1 - p, 37, 0);
    A.teletransportar(26.5, SUELO - 8, 37.5);
    A.mirar(-Math.PI / 2, -0.05);
  });
  await espera(900);
  await captura('mina_nueva_estrato_a_la_vista');

  // 10. Fósil hallado.
  const fosil = await api(() => {
    const A = window.__estratos;
    const f = A.buscarFosil();
    if (!f) return null;
    for (const dz of [1, 2, 3]) for (const dy of [0, 1]) window.__h.set(f.x, f.y + dy, f.z - dz, 0);
    if (window.__h.get(f.x, f.y - 1, f.z - 2) === 0) window.__h.set(f.x, f.y - 1, f.z - 2, 2);
    for (const dz of [1, 2, 3]) if (window.__h.get(f.x, f.y - 1, f.z - dz) === 0) window.__h.set(f.x, f.y - 1, f.z - dz, 2);
    A.teletransportar(f.x + 0.5, f.y, f.z - 1.9);
    A.mirar(Math.PI, -0.3);
    return f;
  });
  verificar(!!fosil, 'hay un fósil en el mapa');
  await espera(800);
  await captura('fosil_brillando');
  await api(() => window.__estratos.picarSeg(5));
  await espera(350);
  verificar((await api(() => window.__estratos.estado().fosilesActivos.length)) === 1, 'romper el fósil lo activa');
  await captura('fosil_hallado_tarjeta');

  // Ascensor, parada de 30 m con el vendedor, tienda de abajo y silbido.
  await api(() => {
    const A = window.__estratos;
    A.juego.paradas = [10, 20, 30];
    A.juego.records.profundidadPartida = Math.max(A.juego.records.profundidadPartida, 30);
    A.viajar(30);
    A.mirar(-3 * Math.PI / 4, 0);
  });
  await espera(700);
  const prof30 = await api(() => window.__estratos.estado().profundidad);
  verificar(Math.abs(prof30 - 30) < 1, 'el ascensor lleva a la parada de 30 m');
  await captura('salita_30m_vendedor');
  await api(() => { const A = window.__estratos; A.teletransportar(28.6, 96 - 30, 28.6); A.mirar(-3 * Math.PI / 4, 0); });
  await espera(400);
  verificar((await api(() => document.getElementById('interaccion').textContent)).includes('Mauricio'), 'junto al vendedor el aviso ofrece vender');
  await page.keyboard.press('KeyE');
  await espera(500);
  verificar((await api(() => window.__estratos.estado().tiendaActual)) === 'abajo' && (await api(() => window.__estratos.estado().pantalla)) === 'tienda', 'E abre la tienda de abajo');
  await api(() => { const A = window.__estratos; A.cerrar(); A.darMineral('oro', 2); A.abrir('tienda', 'abajo'); });
  await espera(400);
  await captura('tienda_abajo_vendedor');
  await page.keyboard.press('Escape');
  await espera(300);
  verificar((await api(() => window.__estratos.estado().pantalla)) === 'jugando', 'Esc cierra la tienda');
  await api(() => { const A = window.__estratos; A.juego.momias = []; A.juego.relojMomias = 999; window.__h.set(26, 95, 37, 1); });
  await page.keyboard.press('KeyT');
  await espera(600);
  verificar(await api(() => window.__estratos.juego.jugador.silbando), 'T empieza el silbido');
  await espera(2000);
  verificar((await api(() => window.__estratos.estado().profundidad)) < 2, 'tras 2 s de silbido aparecés en la superficie');
  await api(() => { const A = window.__estratos; A.teletransportar(13.5, 96, 28.5); });
  await espera(300);
  await page.keyboard.press('KeyE');
  await espera(500);
  verificar(Math.abs((await api(() => window.__estratos.estado().profundidad)) - 30) < 1, 'E en el ascensor de la superficie baja a la parada más honda');

  // Calidad alta (desenfoque lejano) y baja.
  for (const q of ['alto', 'bajo']) {
    await api(() => { const A = window.__estratos; A.teletransportar(26.5, 96, 37.5); A.mirar(Math.atan2(-9.5, -7), 0); A.abrir('pausa'); });
    await espera(300);
    await page.locator(`label:has(input[value="${q}"])`).click();
    await api(() => window.__estratos.cerrar());
    await espera(900);
    verificar((await api(() => document.getElementById('app').dataset.calidad)) === q, `la calidad ${q} se aplica`);
    await captura(`calidad_${q}`);
  }
  await api(() => { const A = window.__estratos; A.abrir('pausa'); });
  await page.locator('label:has(input[value="medio"])').click();
  await api(() => window.__estratos.cerrar());

  // Guardado: recargar y comparar.
  await espera(900);
  const antes = await api(() => { window.__estratos.guardar(); const e = window.__estratos.estado(); return { colones: e.colones, mejoras: e.mejoras, colapsos: e.colapsos, estratos: e.estratos, cambios: e.cambios, semilla: e.semilla, fosilesActivos: e.fosilesActivos, mascota: e.mascota, records: e.records, pos: e.pos, paradas: e.paradas }; });
  await abrir();
  await instalarAyudas();
  await captura('titulo_con_partida');
  await page.click('#btn-continuar');
  await espera(700);
  const despues = await api(() => { const e = window.__estratos.estado(); return { colones: e.colones, mejoras: e.mejoras, colapsos: e.colapsos, estratos: e.estratos, cambios: e.cambios, semilla: e.semilla, fosilesActivos: e.fosilesActivos, mascota: e.mascota, records: e.records, pos: e.pos, paradas: e.paradas }; });
  verificar(JSON.stringify(antes) === JSON.stringify(despues), 'tras recargar el estado es el mismo');
  if (JSON.stringify(antes) !== JSON.stringify(despues)) console.error(JSON.stringify(antes), '\n', JSON.stringify(despues));
  await captura('tras_recargar');

  // Guardado dañado: contexto limpio con un guardado roto antes de que cargue la página.
  const ctxRoto = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  await ctxRoto.addInitScript(() => localStorage.setItem('estratos-fps.save.v1', '{"version":1,"semilla":"roto"'));
  page = await ctxRoto.newPage();
  escuchar(page);
  await abrir();
  verificar(await api(() => !document.getElementById('titulo-mensaje').hidden), 'un guardado dañado muestra un aviso');
  await captura('titulo_guardado_danado');
  await ctxRoto.close();

  // Comparación con el filtro NearestMipmapNearest (contexto limpio).
  const ctxLin = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  page = await ctxLin.newPage();
  escuchar(page);
  await abrir('&filtro=mipcercano');
  await instalarAyudas();
  await page.click('#btn-empezar');
  await espera(600);
  await paredes(' (NearestMipmapNearest)');
  await ctxLin.close();
  console.log('Cambio de imagen por giro de 0.004 rad (menos es menos parpadeo):', JSON.stringify(medidas, null, 1));

  // Reducir movimiento: sin sacudida, balanceo del pico ni cámara lenta.
  const ctxRM = await browser.newContext({ viewport: { width: 1600, height: 900 }, reducedMotion: 'reduce' });
  const p3 = await ctxRM.newPage();
  escuchar(p3);
  await p3.goto(`${base}?debug&sinbloqueo`);
  await p3.waitForFunction(() => window.__listo === true, null, { timeout: 60000 });
  await p3.click('#btn-empezar');
  await p3.waitForTimeout(500);
  await p3.evaluate(() => { const A = window.__estratos; A.mirar(A.estado().guinada, -0.8); A.picarSeg(1); });
  await p3.waitForTimeout(300);
  const rmEstado = await p3.evaluate(() => ({ reducir: window.__estratos.render.reducirMovimiento, pico: document.getElementById('pico').style.transform }));
  verificar(rmEstado.reducir === true && rmEstado.pico === '', 'con prefers-reduced-motion no hay sacudida ni balanceo del pico');
  await ctxRM.close();

  // Pointer Lock real (sin ?sinbloqueo): en headless puede rechazarse y debe verse el aviso.
  const ctxLock = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const p2 = await ctxLock.newPage();
  escuchar(p2);
  await p2.goto(`${base}?debug`);
  await p2.waitForFunction(() => window.__listo === true, null, { timeout: 60000 });
  await p2.click('#btn-empezar');
  await p2.waitForTimeout(800);
  const estadoLock = await p2.evaluate(() => ({ bloqueado: document.pointerLockElement !== null, aviso: !document.getElementById('clic-seguir').hidden }));
  console.log('pointer lock sin ?sinbloqueo:', JSON.stringify(estadoLock));
  await p2.screenshot({ path: resolve(carpeta, `${String(++n).padStart(2, '0')}_pointer_lock.png`) });
  verificar(estadoLock.bloqueado || estadoLock.aviso, 'Pointer Lock concedido o aviso "Hacé clic para seguir" visible');
  await p2.close();
} catch (e) {
  fallos.push(`excepción en la ruta: ${e.stack || e.message}`);
  console.error(e);
  try { await page.screenshot({ path: resolve(carpeta, 'error.png') }); } catch { /* sin captura */ }
}

console.log('\nDRAW CALLS Y TRIANGULOS');
await browser.close();
await servidor.close();
const relevantes = errores.filter((e) => !/favicon/.test(e));
verificar(relevantes.length === 0, `cero errores de consola (${relevantes.length})`);
for (const e of relevantes) console.error(' -', e);
console.log(fallos.length ? `\nSMOKE FALLA con ${fallos.length} problema(s)` : '\nSMOKE OK');
process.exit(fallos.length ? 1 : 0);
