# Estratos FPS

Demo jugable en el navegador, en primera persona, de un juego de minería con prestige. Se juega en PC con teclado y mouse y dura unos 30 minutos: picás, llenás la mochila, vendés, mejorás, bajás, colapsás la mina y encontrás fósiles de tu partida anterior.

TypeScript, Vite y Three.js. Todo el arte y el sonido son propios (ver `CREDITS.md`). Las decisiones que no estaban en la especificación están en `DECISIONES.md`.

## Cómo correrlo

```
npm install
npm run dev
```

Abrí la dirección que muestra Vite (normalmente `http://localhost:5173`; si ese puerto está ocupado Vite usa otro, lo dice en la consola). Hacé clic en "Hacé clic para empezar". El juego captura el mouse: con Esc se suelta y se abre la pausa.

El arte vive en `../assets/` y Vite lo sirve directamente (`publicDir`). `npm run assets` lo regenera con Python (numpy y Pillow) y lo verifica.

Parámetros útiles de la URL: `?debug` (API `window.__estratos`), `?sinbloqueo` (no pide Pointer Lock) y `?filtro=mipcercano` (otro filtro de texturas, para comparar).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm run build` | `tsc` y `vite build` hacia `dist/` (base `./`) |
| `npm run preview` | sirve `dist/` |
| `npm run check` | `tsc`, `vitest`, `check-arquitectura` y `check_palette.py` |
| `npm run test` | solo las pruebas de lógica |
| `npm run assets` | genera el arte y revisa la paleta |
| `npm run simular` | simulación de la economía (tabla de abajo) |
| `npm run smoke` | ruta guionada con Playwright a 1600×900; capturas en `../out/capturas/` |
| `npm run itch` | construye y deja `../out/estratos-itch.zip` |

`npm run smoke` usa el Edge o el Chrome que ya tengas instalados (no descarga navegadores). Si WebGL falla sin ventana, se repite con ventana.

## Build y zip para itch.io

```
npm run itch
```

Deja `../out/estratos-itch.zip` con `index.html` en la raíz. En itch.io: proyecto nuevo, tipo "HTML", subir el zip y marcar "This file will be played in the browser". Tamaño de ventana sugerido: 1280×720 o pantalla completa.

## Controles

| Tecla | Acción |
|---|---|
| WASD | moverte |
| Mouse | mirar |
| Clic izquierdo (mantenido) | picar o golpear |
| Shift | correr |
| Espacio | saltar |
| E | usar la tienda, el vendedor o el ascensor |
| Tab | abrir y cerrar la mochila |
| Q, R, Supr | en la mochila: acomodar solo, rotar, tirar |
| T | silbar al ascensor (2 s) y volver a la superficie |
| Esc | pausa (o cerrar la mochila y la tienda) |
| M | silenciar |
| F3 | diagnóstico: fps, ms por cuadro, llamadas de dibujo, triángulos y chunks |

En la pausa: sensibilidad, invertir Y, campo de visión (60 a 90), calidad (baja 480×270, media 640×360, alta 960×540) y volumen.

## Dónde tocar el balance

Todo está en `src/config/balance.ts`: tamaño de la mina, capas, vida de los bloques, minerales (forma, valor, profundidad, densidad), pico, mejoras, mochila, saturación, calor, momia, colapso, fósiles, Torogoz, ascensor y las constantes de sensación (`SENSACION`: sacudidas, pausa de impacto, cámara lenta, balanceo del pico). La resolución y las anclas del HUD están en `src/config/pantalla.ts`. Los colores, espacios y tiempos de la interfaz están en `src/styles/tokens.css`.

Después de tocar números, corré `npm run simular` y mirá si los tiempos siguen donde querés.

## Tabla de balance

Salida de `npm run simular`. La simulación no es un bot: calcula, con la densidad de minerales de mundos generados de verdad, cuánto rinde picar a cada profundidad y cuánto tardaría un jugador que apunta a lo que brilla y solo baja cuando sus mejoras lo aguantan (los supuestos están al principio de `src/game/simulacion.ts`). No modela la tienda de los 30 m, que paga ×1.35.

Sin mejoras:

| Profundidad | ₡ por minuto | Llenar la mochila | Valor de una mochila llena |
|---|---|---|---|
| 2 m | 22 | 2 min 45 s | ₡90 |
| 5 m | 42 | 1 min 34 s | ₡97 |
| 10 m | 51 | 1 min 44 s | ₡133 |
| 15 m | 52 | 1 min 55 s | ₡151 |
| 20 m | 108 | 1 min 21 s | ₡217 |
| 30 m | 110 | 2 min 11 s | ₡360 |
| 40 m | 125 | 2 min 26 s | ₡454 |
| 50 m | 186 | 3 min 31 s | ₡982 |
| 60 m | 194 | 4 min 2 s | ₡1173 |
| 70 m | 93 | 8 min 43 s | ₡1213 |

Con filo 10, mango 6, suerte 4 y temple 6:

| Profundidad | ₡ por minuto | Llenar la mochila | Valor de una mochila llena |
|---|---|---|---|
| 2 m | 56 | 1 min 4 s | ₡90 |
| 5 m | 107 | 0 min 36 s | ₡97 |
| 10 m | 188 | 0 min 28 s | ₡133 |
| 15 m | 170 | 0 min 35 s | ₡151 |
| 20 m | 350 | 0 min 25 s | ₡217 |
| 30 m | 453 | 0 min 32 s | ₡360 |
| 40 m | 500 | 0 min 36 s | ₡454 |
| 50 m | 861 | 0 min 46 s | ₡982 |
| 60 m | 870 | 0 min 54 s | ₡1173 |
| 70 m | 464 | 1 min 45 s | ₡1213 |

Costo de cada mejora por nivel:

| Mejora | Nivel 0 | Nivel 5 | Nivel 10 | Nivel 15 |
|---|---|---|---|---|
| Filo | ₡20 | ₡40 | ₡81 | ₡163 |
| Mango ligero | ₡30 | ₡60 | ₡121 | ₡244 |
| Alcance | ₡150 | max | max | max |
| Suerte | ₡60 | ₡121 | ₡243 | ₡488 |
| Temple | ₡40 | ₡80 | ₡162 | ₡325 |

Hitos simulados:

- Primera venta: 1 min 40 s
- Primera mejora: 1 min 49 s
- Primera mochila llena: 1 min 40 s
- Llegar a 30 m: 16 min 37 s
- Tras el colapso 1, volver a la profundidad requerida: 8 min 20 s
- Tras el colapso 2, volver a la profundidad requerida: 5 min 48 s
- Viajes entre mejoras: 1.0 en promedio, 1 como máximo (41 viajes en total)

Objetivos y resultado: primera venta y primera mejora en menos de 2 minutos (1 min 40 s y 1 min 49 s), mochila llena en 1 a 2 minutos en los primeros 10 m (1 min 40 s), 30 m en 15 a 25 minutos (16 min 37 s), la mitad del tiempo tras el primer colapso (8 min 20 s) y una mejora comprable en cada viaje. Es un modelo: el tiempo real depende de cómo juegue cada quien.

## Rendimiento medido

Medido por `npm run smoke` con Edge a 1600×900 en esta PC, calidad media (640×360 internos). La escena es lo que dibuja Three.js; el total incluye las pasadas de post-proceso (bloom, viñeta, salida).

| Lugar | Llamadas de dibujo (escena / total) | Triángulos (escena) | Chunks con malla |
|---|---|---|---|
| Superficie, mirando la tienda | 82 a 86 / 97 a 101 | 4 300 a 5 400 | 37 a 39 |
| A 40 m, en un túnel | 98 a 108 / 113 a 123 | 5 600 a 7 400 | 37 a 39 |

Son rangos de cinco corridas del smoke: cada una genera una mina distinta, y las cuevas cambian los números.

Los fps que mostró el smoke fueron 112 a 144 (el tope de la pantalla), pero eso es sin mouse real y no vale como medida. Los fps reales los tenés que medir vos con F3.

## Estructura

```
src/config/     balance.ts (todos los números) y pantalla.ts
src/game/       lógica pura: mundo, generación, DDA, física, picado, mochila, tienda, mejoras,
                calor, colapso, fósiles, mascota, momia, ascensor, récords, guardado, simulación
src/render/     Three.js: mallado por chunks, texturas, sprites, efectos, cielo, post-proceso
src/input/      interfaz Entrada, teclado y mouse, Pointer Lock
src/ui/         HUD, pantallas, mochila, tienda, avisos, pico en mano
src/audio/      sonidos sintetizados con Web Audio
scripts/        python.mjs, check-arquitectura, simular, smoke, itch
tests/          vitest, solo sobre src/game/
```

`src/game/` no importa three ni toca `window`, `document` o `localStorage`: lo vigila `scripts/check-arquitectura.mjs`.

## Lo que falta o quedó flojo

- **Nadie jugó esto con mouse real todavía.** El smoke prueba el flujo con la API de depuración y sin Pointer Lock. La sensación del mouse, la sacudida y la pausa de impacto están con valores provisionales en `SENSACION`.
- **Los fps reales no están medidos.** Solo hay las llamadas de dibujo y los triángulos del smoke.
- **El sonido no se escuchó.** Se sintetiza y se dispara desde eventos, pero la revisión fue solo de código. Falta afinar volúmenes y tonos de oído.
- **La momia es simple.** Persigue en línea recta y salta un bloque; en una cueva con muchas vueltas se puede trabar. No hay búsqueda de caminos.
- **El desenfoque lejano (calidad alta) es un `BokehPass`.** Cuesta una pasada de profundidad extra y puede dejar halos alrededor de los sprites. No se midió su costo en una GPU de verdad.
- **Arrastrar piezas en la mochila** se probó por código y con los botones; el arrastre con el mouse es lo que hay que probar a mano.
- **Don Chepe** tiene solo dos cuadros de animación y su pozo es un hueco recto.
- **El Torogoz puede atravesar paredes** (es un adorno; no choca con los voxels).
- **El volcán del fondo** solo se ve mirando al norte (hacia z menor) desde la superficie.
- **Don Mauricio** (la tienda de los 30 m) no tiene mejoras ni colapso a propósito: solo compra.
- **Sin boss, sin modo vertical, sin controles táctiles, sin monetización**: fuera de alcance, como pide la especificación.
- El arte generado es correcto pero sencillo. Los sprites con más personalidad (Torogoz, Don Chepe, momia) serían lo primero a encargar a un artista.
- El guardado usa una sola ranura en `localStorage` (si el navegador lo bloquea, se juega sin guardar).

## Diez cosas para probar a mano con el mouse

1. **Pointer Lock.** Hacé clic en "Hacé clic para empezar": el cursor desaparece. Esc abre la pausa. En "Seguir picando", si Chrome rechaza el bloqueo (pasa si volvés dentro de un segundo del Esc) tiene que aparecer "Hacé clic para seguir" y un clic lo arregla.
2. **Sensación del mouse.** Girá rápido y lento, y probá la sensibilidad y "Invertir eje Y" en la pausa. No tiene que haber aceleración rara ni saltos al entrar y salir del bloqueo.
3. **Fps reales.** F3 en la superficie, en un túnel a 40 m y picando mucho; repetí en calidad baja, media y alta. Anotá cuánto marca.
4. **Picar.** Mantené el clic sobre tierra, piedra y una veta: grietas en 5 etapas, chispas, sacudida leve y pausa breve al romper un mineral. El pico tiene que golpear al ritmo de los golpes por segundo (y acelerarse con Mango ligero).
5. **Mochila con el mouse.** Tab, arrastrá piezas, R para rotar, Supr para tirar y Q para acomodar solo. Cerrá con Tab y fijate que el mouse vuelve a quedar capturado.
6. **Tienda.** Con E frente al mostrador: vendé, mirá el desglose (saturación, mochila sin huecos, Torogoz, multiplicador), comprá mejoras y el Torogoz, y probá una mejora que no alcanza (en gris).
7. **Calor y silbido.** Bajá de 30 m: viñeta roja y latido arriba de 70 %, desmayo al 100 %. Probá T (2 s) y que un golpe de la momia lo corte.
8. **Momia.** Entrá a una cueva a más de 20 m. Tiene que perseguirte al verte, pegarte (+20 % de calor y empujón) y morir a los 6 golpes con "+₡".
9. **Ciclo completo.** Llegá a 30 m, colapsá (confirmación de tres columnas, cinemática de 4 a 5 s), mirá la mina nueva con el estrato violeta, teal o dorado y buscá los 3 fósiles que brillan. Rompé uno: cámara lenta, sonido y tarjeta.
10. **Ascensor, vendedor y guardado.** Bajá a la parada de 30 m, hablá con Don Mauricio (E) y subí con el ascensor. Recargá con F5: tiene que aparecer "Continuar" con todo igual. Probá también con "Mostrar animaciones" apagado en Windows (sin sacudidas ni cámara lenta).
