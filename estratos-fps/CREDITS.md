# Créditos

## Código y fuentes de terceros

| Qué | Autor | Licencia |
|---|---|---|
| [three.js](https://threejs.org) 0.170.0 (incluye los efectos de `examples/jsm`) | mrdoob y colaboradores | MIT |
| [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans), vía `@fontsource/pixelify-sans` | Stefie Justprince | SIL Open Font License 1.1 |
| [Atkinson Hyperlegible](https://brailleinstitute.org/freefont), vía `@fontsource/atkinson-hyperlegible` | Braille Institute of America | SIL Open Font License 1.1 |

Herramientas de desarrollo (no van dentro del juego): TypeScript (Apache 2.0), Vite (MIT), Vitest (MIT) y Playwright (Apache 2.0).

## Arte y sonido propios

Todo el arte sale de `tools/gen_assets.py` y `tools/gen_assets_fps.py` (Pillow y numpy), con la paleta de `tools/palette.py`: texturas de bloques, mapas de emisión, grietas, sprites, íconos, el pico, la momia, el Torogoz, Don Chepe, el vendedor, los árboles, la fogata, el rótulo y la silueta del volcán.

Todo el sonido se sintetiza en el navegador con Web Audio (`src/audio/sonido.ts`). No hay archivos de audio.

No se usó ningún pack, imagen ni sonido de terceros.
