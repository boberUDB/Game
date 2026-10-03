// Carga de texturas pixeladas. Nearest para ampliar y mipmaps para que no parpadeen a distancia.
import * as THREE from 'three';
import { NOMBRES_BLOQUE } from '../game/tipos';

export type ModoFiltro = 'nearestMipmapNearest' | 'nearestMipmapLinear' | 'nearest';

/**
 * Filtro de reducción. Por defecto NearestMipmapLinear: en las mediciones del smoke (giro de 0.004 rad
 * frente a paredes a 1, 4 y 8 m) cambió menos la imagen, o sea parpadea menos que NearestMipmapNearest.
 * ?filtro=mipcercano usa NearestMipmapNearest y ?filtro=sin apaga los mipmaps, para comparar.
 */
export function filtroDeUrl(): ModoFiltro {
  const q = new URLSearchParams(location.search).get("filtro");
  if (q === "mipcercano") return "nearestMipmapNearest";
  if (q === "sin") return "nearest";
  return "nearestMipmapLinear";
}

const MIN: Record<ModoFiltro, THREE.TextureFilter> = {
  nearestMipmapNearest: THREE.NearestMipmapNearestFilter,
  nearestMipmapLinear: THREE.NearestMipmapLinearFilter,
  nearest: THREE.NearestFilter,
};

export interface Texturas {
  bloques: Record<string, THREE.Texture>;
  emision: Record<string, THREE.Texture>;
  grietas: THREE.Texture[];
  sprites: Record<string, THREE.Texture>;
  modo: ModoFiltro;
}

const BLOQUES_CON_EMISION = ['piedra_azufre', 'piedra_oro', 'piedra_esmeralda', 'piedra_rubi', 'piedra_zafiro', 'fosil_0', 'fosil_1', 'fosil_2', 'arenisca_jeroglificos'];

const SPRITES: [string, string][] = [
  ['momia_0', 'enemigos/momia_idle_0'], ['momia_1', 'enemigos/momia_idle_1'], ['momia_dano', 'enemigos/momia_dano'],
  ['torogoz_0', 'mascotas/torogoz_0'], ['torogoz_1', 'mascotas/torogoz_1'],
  ['chepe_0', 'personajes/chepe_0'], ['chepe_1', 'personajes/chepe_1'], ['vendedor', 'personajes/vendedor'],
  ['pino', 'naturaleza/pino'], ['izote', 'naturaleza/izote'],
  ['fogata_0', 'fuego/fogata_0'], ['fogata_1', 'fuego/fogata_1'], ['fogata_2', 'fuego/fogata_2'],
  ['rotulo', 'rotulos/tienda'], ['volcan', 'cielo/volcan'],
  ['farol_0', 'props/farol_0'], ['farol_1', 'props/farol_1'],
  ['chispa', 'particulas/chispa'], ['polvo', 'particulas/polvo'],
  ['mineral_azufre', 'iconos/mineral_azufre'], ['mineral_oro', 'iconos/mineral_oro'], ['mineral_esmeralda', 'iconos/mineral_esmeralda'],
  ['mineral_rubi', 'iconos/mineral_rubi'], ['mineral_zafiro', 'iconos/mineral_zafiro'],
];

function cargar(url: string, modo: ModoFiltro, mipmaps: boolean): Promise<THREE.Texture> {
  return new Promise((ok, mal) => {
    new THREE.TextureLoader().load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.magFilter = THREE.NearestFilter;
      t.generateMipmaps = mipmaps && modo !== 'nearest';
      t.minFilter = mipmaps ? MIN[modo] : THREE.NearestFilter;
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.anisotropy = 1;
      ok(t);
    }, undefined, () => mal(new Error('No se pudo cargar ' + url)));
  });
}

export async function cargarTexturas(): Promise<Texturas> {
  const modo = filtroDeUrl();
  const base = import.meta.env.BASE_URL;
  const t: Texturas = { bloques: {}, emision: {}, grietas: [], sprites: {}, modo };
  const tareas: Promise<void>[] = [];
  for (const n of NOMBRES_BLOQUE) {
    if (n === 'aire') continue;
    tareas.push(cargar(`${base}bloques/${n}.png`, modo, true).then((x) => { t.bloques[n] = x; }));
  }
  for (const n of BLOQUES_CON_EMISION) {
    tareas.push(cargar(`${base}emision/${n}.png`, modo, true).then((x) => { t.emision[n] = x; }));
  }
  for (let i = 0; i < 5; i++) tareas.push(cargar(`${base}grietas/grieta_${i}.png`, modo, false).then((x) => { t.grietas[i] = x; }));
  for (const [clave, ruta] of SPRITES) tareas.push(cargar(`${base}${ruta}.png`, modo, false).then((x) => { t.sprites[clave] = x; }));
  await Promise.all(tareas);
  return t;
}
