# Decisiones tomadas sin preguntar

Fecha: 3 de octubre de 2026. Cada punto es la opción más simple que cumplía el contrato y PROMPT_DEMO_FPS.md.

## Conflictos entre documentos

- Donde chocaron un nombre o una ruta, mandó el contrato: bloques `estrato_0..2` y `fosil_0..2` (tres PNG sueltos, uno por color) en vez de una sola textura `estrato` con variantes, y la carpeta `assets/emision/` con el mismo nombre que su bloque.
- `PROMPT_DEMO_FPS.md` menciona §4, §5, §11 y §16 de CLAUDE.md. No existen: CLAUDE.md tiene 13 secciones. Se actualizaron §2, §3, §3.1 y §10, y se agregó la §14.
- Hay otro `CLAUDE.md` en `C:\Users\rober\Downloads\` con 16 secciones. No se tocó: la carpeta de trabajo es `Videojuego`.

## Mundo y mecánica

- **Aparición.** El jugador aparece sobre la tierra de la mina (26.5, 37.5), mirando la tienda. Así "el primer bloque bajo el punto de aparición siempre es tierra" se cumple de verdad: las dos primeras capas de la mina son tierra pura.
- **Boca de la mina.** Es el cuadrado de 24×24 de tierra en medio de la plaza de empedrado, con un poste de madera en cada esquina. Fuera de ese cuadrado todo es roca madre o empedrado y no se pica.
- **Fondo.** El último metro de la mina es un muro de `arenisca_jeroglificos` indestructible con emisión. El aviso "Algo duerme debajo…" sale a menos de 5 m del fondo.
- **Ascensor.** En la superficie, E baja a la parada más honda ya alcanzada. Dentro de una salita, E sube a la parada anterior (o a la superficie). Todas las salitas están en el mismo lugar de la mina (x y z de 27 a 29), así que se excavan en un sitio conocido.
- **Parada de 30 m.** La salita ya viene excavada desde la generación. El vendedor, Don Mauricio, está en una esquina: junto a él, E abre su tienda; en la esquina contraria, E usa el ascensor.
- **Calor.** Se leyó literal: +0.12 puntos porcentuales por segundo por cada metro bajo los 10. A 30 m son 2.4 %/s. El Temple lo baja 3 % por nivel.
- **Momia.** No usa búsqueda de caminos: persigue en línea recta si hay línea de vista (DDA), salta un bloque si choca y, si no ve al jugador, camina hacia un rumbo al azar. Su dinero y el zafiro se escalan con la profundidad de la momia.
- **Estratos.** Un estrato por colapso, máximo 3: el cuarto colapso borra el más viejo. El color sale de `id % 3`.
- **Fósiles.** Aparecen solo dentro de los estratos, nunca en la primera partida. Don Chepe vende al 50 % × el multiplicador de colapso y su pozo cuenta como bloques picados.
- **Colapso.** `colapsar(juego)` arranca la cinemática (pantalla `colapso`, 4.6 s) y el reinicio ocurre al terminar. `colapsar(juego, true)` reinicia al instante (pruebas y depuración). Fases: temblor, fundido a los 2.6 s y tarjeta a los 3.4 s.
- **Silbido.** T solo funciona a más de 2.5 m de profundidad; un golpe de la momia lo cancela.
- **Guardado.** No se guardan momias, partículas ni el progreso de un golpe a medias. Un bloque dañado a medias se cura al recargar.

## Balance

- `npm run simular` mide la densidad de minerales en mundos generados de verdad (tres semillas) y no en una fórmula aparte. Supone un jugador que apunta a lo que brilla (2× la densidad pura) y que solo baja cuando sus mejoras lo aguantan (`LIMITE_BASE` y `LIMITE_POR_NIVEL`). Esos supuestos están al principio de `src/game/simulacion.ts` y se dicen en el README.
- La densidad de las vetas es mucho mayor que la del primer borrador (0.0042 de probabilidad de veta para el azufre) porque con eso la mochila tardaba 17 minutos en llenarse. Quedó en 0.027 para el azufre y bajó en proporción para los demás.
- Se agregó `apagaDesde`: a partir de esa profundidad cada mineral barato se vuelve más raro (hasta 35 % en 20 m), para que el azufre no llene la mochila cuando ya se pagan los caros. No está en la especificación.
- Don Mauricio paga ×1.35 y tiene su propia saturación. No se modeló en el simulador (es una ventaja extra para el jugador).

## Render

- **Filtro de texturas: `NearestMipmapLinear`.** El smoke gira la cámara 0.004 rad frente a paredes a 1, 4 y 8 m y mide cuánto cambia la imagen (menos es menos parpadeo). Última medición: NearestMipmapLinear 13.3, 12.8 y 10.9; NearestMipmapNearest 13.7, 15.7 y 10.8. A 1 y 4 m cambia menos con Linear y a 8 m empatan (la diferencia es menor que el ruido), así que se dejó NearestMipmapLinear. `?filtro=mipcercano` activa el otro para comparar.
- **Desenfoque lejano** (solo calidad alta): `BokehPass` de three/examples. Es una pasada de profundidad extra, por eso solo va en alta.
- La luz del farol del minero está 30 cm detrás de la cámara para que no se queme el bloque pegado a la cara.
- Los colores del frame final (niebla, luces, bloom, viñeta) no pasan por la paleta, a propósito.
- La resolución interna fija el alto (270, 360 o 540) y el ancho sigue la forma de la ventana, así no se deforma si la ventana no es 16:9.
- Reducir movimiento (`prefers-reduced-motion`): sin sacudida de cámara, sin balanceo de cámara ni del pico, sin pausa de impacto ni cámara lenta, sin animaciones de la interfaz.

## Arquitectura y herramientas

- `Entrada` vive en `src/game/entrada.ts` para que la lógica no dependa de `src/input/`; `src/input/entrada.ts` la reexporta, como pide el contrato.
- `src/game/pantalla.ts` tiene `cambiarPantalla` (la usan el colapso y el calor sin importarse entre sí); `juego.ts` la reexporta.
- `check-arquitectura.mjs` también prohíbe que `src/game/` importe de `render`, `ui`, `input` o `audio`.
- Con Pointer Lock activo y sin el puntero capturado, la simulación se pausa y aparece "Hacé clic para seguir".
- Tab abre y cierra la mochila solo en juego y en la mochila. En los demás menús Tab recorre los botones, para que todo se pueda operar con teclado.
- Playwright usa `msedge` y, si no está, `chrome`. No se descargan navegadores. En esta PC el smoke corrió sin ventana, con WebGL por ANGLE.
- `scripts/python.mjs` busca primero `%LOCALAPPDATA%\Programs\Python\Python3xx\python.exe` y solo después el PATH (el alias de Windows falla), y comprueba que tenga numpy y Pillow.
- `scripts/simular.mjs` y `scripts/smoke.mjs` usan `esbuild` y `vite`, que ya vienen con Vite. No hay más dependencias que las del contrato.
- **Git.** El repositorio está en `estratos-fps/`, como se pidió. `tools/` y `assets/` están un nivel arriba y quedan fuera de los commits. Las etapas 2 a 5 se commitearon juntas porque la lógica del juego se escribió de corrido antes de poder verificar el render.

## Arte

- Se agregaron materiales a `tools/palette.py` (piel, tela, pino, izote, azufre, esmeralda, volcán, pluma de cola) usando solo colores que ya estaban en la paleta de 34. `tools/gen_assets_fps.py` genera el arte nuevo y lo llama `gen_assets.py`.
- `tools/check_palette.py` ahora también revisa: tamaño de cada carpeta nueva, que la emisión sea transparente salvo los píxeles que brillan, que haya un bloque con el mismo nombre, y el píxel de brillo claro de los cristales.
- Los mapas de emisión se calculan con la misma máscara que dibuja el cristal, así no se desfasan.
