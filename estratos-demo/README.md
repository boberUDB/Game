# Estratos, demo web para PC

MVP jugable del diseño descrito en `../CLAUDE.md`, hecho para navegador de escritorio con ratón y teclado.
El juego final está pensado para Godot 4 y móvil; esta demo sirve para probar si el ciclo engancha.

## Correrlo

```bash
npm install
npm run dev      # abre la dirección que imprime Vite
npm run build    # revisa tipos y genera dist/
```

Necesita una ventana de al menos 1024 px de ancho.

## Controles

| Tecla | Acción |
|---|---|
| WASD o flechas | Moverse. Empujar contra un bloque lo pica |
| Clic izquierdo sostenido | Picar el bloque bajo el cursor, si está en alcance |
| E | Entrar a la tienda (en la superficie, junto a la tiendita) |
| Tab | Abrir o cerrar la mochila |
| Q | Acomodar solo |
| R / Supr | Rotar o tirar la pieza elegida en la mochila |
| Esc | Pausa, calidad gráfica y volumen |
| M | Silencio |

## Qué incluye

- Una zona (volcán), cámara 2.5D fija, minero en pixel art.
- 4 minerales con forma propia: azufre 1x1, hierro 1x2, obsidiana en L, jade 2x2.
- Mochila 4x4 con arrastre, rotación y acomodo automático. Sin huecos, la venta paga 50 % más.
- Tienda con precios que bajan por saturación.
- 5 mejoras del pico con `costo = base * 1.15 ^ nivel`.
- Barra de calor: sube desde los 10 m y al 100 % el minero se desmaya.
- El Torogoz, mascota que sube 20 % cada venta y sobrevive al colapso.
- Colapso: se pierde casi todo, se gana multiplicador y la mina nueva trae un estrato por colapso (hasta 3) con 3 fósiles.
- 4 fósiles que cambian la forma de jugar: Pico Rompefilas, Don Chepe, Imán de talpetate y Brasa antigua.
- Contador permanente de bloques picados y récords que sobreviven al colapso.
- Calidad baja, media y alta. Guardado automático en `localStorage`.

## Dónde tocar

- **Balance:** todo en `src/config.ts`. No hay números de juego en otro archivo.
- **Colores, espacios y tiempos de la interfaz:** `src/styles/tokens.css`.
- **Un script por sistema:** `src/sistemas/` (mochila, tienda, colapso, mascota, calor, fósiles, picado, mejoras, récords).
- **Render 3D:** `src/render/`. Texturas y sprites se dibujan por código, no hay archivos de imagen.

## Dependencias

- `three`: render 3D del mundo voxel, luces, niebla y bloom.
- `@fontsource/*`: las dos fuentes, servidas en local.
- Nada más. El audio se sintetiza con Web Audio API.
