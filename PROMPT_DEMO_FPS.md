# PROMPT_DEMO_FPS.md: demo jugable de Estratos en primera persona (una sola pasada)

Lee `CLAUDE.md` completo antes de empezar, y después el código de `estratos-demo/src/` y de `tools/`. Este documento es la tarea. Donde choque con `CLAUDE.md`, manda este documento en los puntos de la sección 2: ya están decididos y no hace falta preguntar por ellos.

## 0. Cómo trabajar en esta tarea

- La meta es una demo **completa y jugable de principio a fin, en una sola pasada**. Roberto la abre en su PC, juega 30 minutos y vive el ciclo entero: picar, llenar la mochila, vender, mejorar, bajar, colapsar y encontrar fósiles.
- **No te detengas a preguntar.** Si algo es ambiguo, toma la opción más simple que cumpla este documento, anótala en `estratos-fps/DECISIONES.md` y sigue. Detente solo si algo requiere pagar o borrar trabajo existente.
- Arma una lista de tareas con las etapas de la sección 7 y márcalas al terminar cada una.
- Si git está instalado, haz `git init` en `estratos-fps/` y un commit al cerrar cada etapa verificada.
- **No modifiques** `estratos-demo/`, `hd2d-prueba/` ni `referencia/`. Son solo referencia.
- Idioma: código y comentarios en español. **Los textos del juego van en español salvadoreño con voseo** ("Picá", "Vendé", "Llevás"), como en `estratos-demo`.
- Todo gratis. Dependencias permitidas: `three`, `@fontsource/pixelify-sans` y `@fontsource/atkinson-hyperlegible` (ya se usan), y como devDependencies `typescript`, `vite`, `vitest` (pruebas de lógica) y `playwright` (capturas). Si agregas cualquier otra, justifícala en `DECISIONES.md`.
- Estás en Windows. Python 3.12 con numpy y Pillow ya funciona (`python tools/gen_assets.py`).

## 1. Qué hay ya en la carpeta

- `estratos-demo/`: MVP jugable de la dirección anterior, en **2.5D lateral** sobre una rejilla 2D (x, y). **Reutiliza su lógica copiándola y adaptándola**: el acomodo de la mochila (`sistemas/mochila.ts`), la tienda con saturación, las mejoras con `base × 1.15^nivel`, el colapso y su multiplicador, los 4 fósiles, el calor, los récords, la mascota Torogoz, el audio sintetizado con Web Audio (`audio/sonido.ts`), el bus de eventos, el generador aleatorio con semilla, los tokens de la interfaz y los textos. **No reutilices** el mundo 2D, la cámara, el input ni el render. Ojo: ahí `sistemas/picado.ts` importa `input.ts`. En el proyecto nuevo la lógica no puede depender del input ni del DOM.
- `assets/` y `tools/`: arte nuevo para primera persona a **64 px por metro**. Lo genera `tools/gen_assets.py` con la paleta de `tools/palette.py`, y lo verifica `tools/check_palette.py` (paleta, tamaño por carpeta y costuras). Hay bloques `piedra`, `tierra`, `obsidiana`, `arenisca_jeroglificos`, `piedra_esmeralda` y `piedra_rubi` (64×64); el pico en mano en 5 cuadros (96×96); la momia en idle ×2 y daño (64×96); el farol ×2 (32×64); una gema (32×32); y chispa y polvo (8×8).
- `out/preview.png`: maqueta del look (pasillo frío, farol ámbar, minerales que brillan, momia, pico abajo a la derecha). **Es vertical, pero solo vale como referencia de look, no de formato.**
- `referencia/descarga (3).jpg`: ambiente de la superficie (campamento nocturno azul con luces cálidas).

## 2. Decisiones que fija este prompt (escríbelas en CLAUDE.md al final)

1. **Solo horizontal 16:9, en PC, con teclado y mouse.** Nada vertical ni táctil por ahora. Eso sí, la interfaz y la resolución se leen de configuración (sección 3.14), para pasar a vertical después.
2. **Densidad de 64 px por bloque**, la de los assets nuevos. Para que las texturas no parpadeen a distancia: `magFilter = NearestFilter`, `minFilter = NearestMipmapNearestFilter` (o `NearestMipmapLinearFilter` si se ve mejor; decide con capturas), mipmaps activados y una resolución interna por calidad (bajo 480×270, medio 640×360, alto 960×540). Esto reemplaza lo de "sin mipmaps" y los 16 px de CLAUDE.md §5.
3. **El verificador de paleta aplica a los PNG de `assets/`, no al frame final.** La niebla, las luces, el bloom y la viñeta generan colores fuera de la paleta a propósito. No los "corrijas".
4. **Minerales de la demo:** azufre, oro, esmeralda, rubí y zafiro. Reemplazan al azufre, hierro, obsidiana y jade de la versión 2.5D. La obsidiana pasa a ser un bloque duro de las capas hondas.
5. **Fósiles:** los 4 de `estratos-demo`, cada uno con su mecánica. Después de cada colapso aparecen 3 al azar.
6. **La demo no tiene monetización**: ni tienda de pago, ni anuncios, ni botones falsos.
7. **Todo el arte de esta demo es propio y sale de `tools/gen_assets.py`.** No descargues packs en esta pasada.

## 3. Qué construir: proyecto nuevo `estratos-fps/` (TypeScript + Vite + Three.js)

### 3.1 Estructura

- `src/game/`: lógica pura. Mundo voxel, generación, raycast por voxels (DDA), física del jugador, picado, mochila, tiendas, mejoras, calor, colapso, estratos, fósiles, mascota, IA del enemigo, récords y serialización del guardado. **No importa `three` ni toca `window`, `document` ni `localStorage`.**
- `src/render/`: todo lo de Three.js. `src/input/`: los controles, detrás de una interfaz común. `src/ui/`: el DOM. `src/audio/`: Web Audio.
- `src/config/balance.ts`: **todos** los números del juego. `src/config/pantalla.ts`: la orientación, las resoluciones internas y las anclas del HUD.
- `scripts/check-arquitectura`: falla si `src/game/` importa `three` o usa `window`, `document` o `localStorage`.
- Una sola fuente de arte: `Videojuego/assets/`, servida con `publicDir` de Vite o con un script de copia automático. Nada de copiar a mano. `npm run assets` corre `gen_assets.py` y `check_palette.py`.
- Simulación a paso fijo de 1/60 s y render en cada frame, como en `estratos-demo/src/main.ts`.

### 3.2 Mundo

- El mundo voxel incluye la plaza de la superficie (por ejemplo 56×56) con la mina en el centro. Fuera de la mina el suelo no se pica.
- La mina es un cuadrado de **24×24 bloques** al nivel del suelo y **72 m de hondo**, más 6 m por cada estrato, hasta 3. Todos esos números van en `balance.ts`. Se pica desde arriba y en cualquier dirección.
- Las paredes laterales y el fondo son indestructibles (`roca_madre`). El fondo es un muro de `arenisca_jeroglificos` que brilla y, al acercarse, dice "Algo duerme debajo…". Es solo un adelanto de la fase 2, sin boss.
- Capas por profundidad, ajustables: de 0 a 10 m, tierra con algo de piedra; de 10 a 30 m, piedra; de 30 a 50 m, piedra con obsidiana; de 50 m al fondo, obsidiana y piedra. La vida de los bloques crece con la profundidad.
- **Cuevas** hechas con ruido 3D desde los 12 m (≈10 % del volumen), para que haya dónde caminar y dónde aparezca el enemigo.
- **Minerales en vetas** de 2 a 5 bloques, no sueltos:

| Mineral | Desde | Forma en la mochila | Valor base |
|---|---|---|---|
| Azufre | 1 m | 1×1 | 4 |
| Oro | 8 m | 1×2 | 12 |
| Esmeralda | 18 m | L de 3 | 30 |
| Rubí | 30 m | 2×2 | 70 |
| Zafiro | 45 m | 1×3 | 160 |

  Valor final = base × (1 + profundidad × 0.03). Es un punto de partida; se ajusta en la sección 4.
- Mallado por chunks de 16³, sin las caras ocultas y con **oclusión ambiental por vértice**. Al romper un bloque se vuelve a mallar solo su chunk (y el vecino si el bloque está en el borde). Para que los mipmaps no mezclen texturas vecinas, no uses un atlas simple: usa un material por tipo de bloque (grupos de geometría) o un `DataArrayTexture`.
- Los bloques con mineral llevan un mapa de emisión (solo los píxeles del cristal) para que brillen con el bloom.

### 3.3 Jugador y controles

- Primera persona con **Pointer Lock**. Caja de colisión de 0.6 × 1.7 m, ojos a 1.55 m, gravedad, un salto que supera 1 bloque, colisión con los voxels eje por eje y sin daño por caída.
- Teclas: WASD para moverse, mouse para mirar, Shift para correr, Espacio para saltar, clic izquierdo sostenido para picar o golpear, E para interactuar, Tab para la mochila, Q para acomodar solo, R para rotar y Supr para tirar (en la mochila), T para volver a la superficie, Esc para la pausa, M para silenciar y F3 para el diagnóstico.
- Detalles de Pointer Lock que hay que resolver:
  - Pedirlo en un clic, con `unadjustedMovement: true` y un respaldo si el navegador lo rechaza.
  - Recortar los saltos absurdos de `movementX/Y`.
  - Hacer `preventDefault` en Tab.
  - Al abrir la mochila o la tienda, soltar el puntero; al cerrarlas, volver a pedirlo.
  - Si se sale con Esc, abrir la pausa.
  - Si `requestPointerLock` falla (Chrome lo bloquea más o menos 1 s después de un Esc), mostrar "Hacé clic para seguir".
- `src/input/` expone una interfaz (`mover`, `mirar`, `picar`, `saltar`, `correr`, `interactuar`…). Hoy la implementan el teclado y el mouse; deja el hueco para lo táctil sin implementarlo.
- Ajustes en la pausa: sensibilidad, invertir Y, FOV (de 60 a 90, 75 por defecto), calidad y volumen.

### 3.4 Picar y botín

- Raycast DDA desde la cámara, con 3 m de alcance base. El bloque apuntado se resalta con un contorno fino y muestra **grietas** por etapas (4 o 5) según la vida que le queda.
- Cada golpe tiene su cuadro del pico, chispas, sonido y una sacudida leve. Al romperse el bloque salen polvo y sonido, el contador suma 1 y, si era mineral, el mineral sale como un sprite flotante que brilla. Se recoge solo a 1.5 m.
- Si la mochila no tiene espacio, el mineral se queda en el piso y aparece "Mochila llena: T para subir o Tab para acomodar".
- El primer bloque bajo el punto de aparición siempre es tierra fácil.

### 3.5 Mochila (reutiliza la lógica de la demo 2.5D)

- Cuadrícula de 4×4 con piezas de distinta forma: arrastrarlas con el mouse, rotarlas, tirarlas y **acomodar solo**. Sin huecos, la venta paga 50 % más. La mini mochila siempre está visible en el HUD.

### 3.6 Superficie, tiendas y ascensor

- La superficie es el campamento nocturno de la referencia: una plaza de empedrado alrededor de la boca de la mina, cielo con estrellas, la silueta del volcán al fondo, árboles e izotes como billboards en el borde (con límites invisibles), y una fogata y faroles con luz cálida que parpadea.
- **Tienda de la Niña Tere**, construida con bloques (adobe, madera y teja) y con el rótulo "TIENDA". Con E cerca del mostrador se abre la tienda. Ahí se vende todo, con un desglose de la saturación, el bonus de mochila llena, la mascota y el multiplicador. También se compran mejoras y la mascota, y se colapsa la mina.
- **Segunda tienda en la parada de 30 m**: un vendedor con farol en una salita ya excavada (ponle nombre y una frase con voseo). Paga ×1.35, tiene su propia saturación y solo compra minerales; las mejoras siguen siendo de la Niña Tere. Así hay una decisión real entre vender abajo mejor pagado o subir a enfriarse y mejorar.
- **Ascensor** junto a la boca de la mina: lleva a las paradas cada 10 m que ya alcanzaste en esta partida. Al llegar se excava una salita de 3×3×3 con un farol, si hace falta.
- **T, desde cualquier lado:** silbás al ascensor durante 2 s y aparecés en la superficie. Se cancela si te golpean.

### 3.7 Mejoras del pico

Filo (daño), Mango ligero (golpes por segundo), Alcance (+0.5 m, máximo 4 niveles), Suerte (botín doble) y Temple (menos calor). Costo `base × 1.15^nivel`. Cada mejora muestra el efecto actual, el siguiente y el precio; la que no alcanza se ve, pero en gris.

### 3.8 Calor

Sube desde los 10 m, y más rápido mientras más hondo estás. Baja rápido en la superficie y lento por encima de los 10 m. Arriba del 70 % hay viñeta roja y latido. Al 100 % te desmayás: perdés la mitad de las piezas de la mochila y despertás en la superficie.

### 3.9 Enemigo de ejemplo: la momia

- Es un billboard con los sprites que ya existen. Aparece en las cuevas desde los 20 m, con un máximo de 3 a la vez, a más de 10 m del jugador y fuera de su vista.
- Deambula. Si te ve a menos de 10 m (línea de vista por DDA), te persigue a 2.2 m/s (vos caminás a 4.3 m/s). Choca con los voxels y no pica.
- Si te toca, suma 20 % de calor, te empuja y espera 1.2 s antes de volver a golpear. Se le pega con el pico (6 golpes base); muestra el cuadro de daño y retrocede. Al morir suelta colones directo a la billetera ("+₡25", escalado con la profundidad) y tiene 10 % de probabilidad de soltar un zafiro.

### 3.10 Colapso, estratos y fósiles

- El colapso se desbloquea al llegar a 30 m (+5 m por cada colapso, máximo 55). Hay un botón en la tienda con una confirmación clara: qué conservás (mascota, récords, multiplicador y estratos), qué perdés (colones, mejoras, mochila y fósiles activos) y cuál será el multiplicador nuevo (1 + 0.75 × colapsos).
- Cinemática de 4 a 5 s: temblor, retumbo, polvo, bloques que caen, fundido a negro y la tarjeta "Estrato N enterrado: 34 m, 812 bloques". Después, la mina nueva.
- Cada partida anterior es una capa de 6 m que empieza a los 6 m de profundidad, con la más reciente arriba y un máximo de 3. Usa la textura `estrato` con un color por capa (violeta, teal y oro). Al entrar en una capa aparece "Estrato 2: tu partida del 3 de oct, 41 m, 830 bloques".
- Dentro de las capas hay 3 fósiles al azar. Brillan y sueltan partículas que suben, para que se puedan buscar. Al romper uno hay medio segundo de cámara lenta, un sonido especial y una tarjeta que explica qué hace. Las mecánicas son:
  - **Pico Rompefilas:** cada golpe daña también los 2 bloques que siguen en la línea del rayo.
  - **Don Chepe:** un minero rescatado (sprite) que pica solo una columna de 2×2 hacia abajo desde donde lo encontrás, a un bloque cada 1.2 s. Lo que rompe se vende solo al 50 % ("+₡ Don Chepe"), y su pozo te sirve de atajo para bajar. Con el Rompefilas, la columna es de 3×3.
  - **Imán de talpetate:** los minerales sueltos a menos de 5 m vuelan hacia vos, aunque haya paredes en medio.
  - **Brasa antigua:** con el calor arriba del 60 %, pegás el doble.

### 3.11 Mascota: el Torogoz

Cuesta ₡250 en la tienda, da +20 % en cada venta y sobrevive al colapso. Revolotea cerca del jugador (sprite de 2 cuadros), a veces entra en cuadro y canta al vender. Tiene un ícono en el HUD.

### 3.12 Récords y sensación

- Bloques picados (en total y en la partida), profundidad máxima (de la partida e histórica) y mejor partida. Aviso de "¡Récord!" al superarlos y un resumen al colapsar.
- Números flotantes al vender y al soltar minerales, una pausa breve de impacto en minerales y fósiles, partículas y un sonido distinto por mineral. Picar tiene que sentirse bien desde el primer bloque.

### 3.13 Render y look

- El render va a la resolución interna de la calidad elegida y se escala con vecino más cercano (`image-rendering: pixelated`). La interfaz va en el DOM a resolución nativa, para que el texto se lea nítido.
- Paleta fría: niebla azulada (`FogExp2`) que se cierra con la profundidad, luz ambiente azul y baja, y **el farol del minero** como luz cálida ámbar que sigue a la cámara. En la superficie, luna azul, faroles y fogata. Los minerales brillan por emisión y bloom, no con una luz para cada uno.
- Post-proceso: bloom con umbral alto (solo lo emisivo), viñeta y polvo flotando cerca de la cámara. El desenfoque lejano va solo en calidad alta.
- **Pico en mano** con los 5 cuadros, en una capa aparte abajo a la derecha, a escala entera de píxel y ocupando más o menos la mitad del alto. Se balancea al caminar y se retrasa un poco al mirar. La animación del golpe va sincronizada con los golpes por segundo.
- Compara tus capturas con `out/preview.png` y `referencia/descarga (3).jpg`: sombras azules o violetas, luces ámbar puntuales y nada marrón apagado.

### 3.14 Interfaz (horizontal)

- Arriba a la izquierda: colones, multiplicador, profundidad y récord. Arriba a la derecha: la barra de calor. Abajo a la izquierda: la mini mochila y los fósiles activos. Al centro: la mira y el nombre y la vida del bloque apuntado. Los avisos van arriba al centro.
- `src/config/pantalla.ts` define `orientacion: 'horizontal'`, la resolución interna por calidad y las anclas del HUD. El CSS depende de `data-orientacion` en la raíz, para que el modo vertical sea después solo CSS y configuración.
- Pantallas: título (Continuar, Nueva partida con confirmación, y los controles), pausa con ajustes y "Borrar partida", mochila, tiendas, colapso y desmayo.
- Primeras pistas: "Hacé clic para empezar", "WASD para moverte", "Mantené el clic para picar", "Mochila llena: T para subir" y "Vendé en la tienda con E".
- Reutiliza los tokens, las fuentes y los componentes de `estratos-demo/src/styles/`, pero pasa los colores a la paleta fría del proyecto.

### 3.15 Audio y guardado

- Audio sintetizado (reutiliza `sonido.ts`): golpe, rotura, mineral (uno por tipo), recoger, mochila llena, venta, compra, fósil, momia, desmayo, colapso, latido y ascensor, además de un ambiente de cueva y la fogata en la superficie.
- Guardado en `localStorage` con número de versión. Guarda la semilla y una lista compacta de los bloques modificados (no la mina entera), más el jugador, la mochila, los colones, las mejoras, los fósiles, Don Chepe, los estratos, los récords y los ajustes. Guarda cada 10 s, al vender, al comprar, al colapsar y en `beforeunload`. Si el guardado está dañado, avisa y empieza una mina nueva.

## 4. Balance objetivo

Haz una simulación sencilla de la economía (`npm run simular`) que compare los ingresos por minuto según la profundidad con el costo de cada mejora; no hace falta un bot que juegue. Ajusta `balance.ts` hasta que salga más o menos esto:

- La primera venta y la primera mejora llegan en menos de 2 minutos.
- La mochila se llena en 1 a 2 minutos en los primeros 10 m.
- Llegar a 30 m (colapso desbloqueado) toma de 15 a 25 minutos.
- Después del primer colapso, se vuelve a esa profundidad en la mitad del tiempo.
- Siempre hay una mejora a 2 o 3 viajes de distancia como mucho.

Pon la tabla final en el README.

## 5. Arte nuevo a generar (extiende `tools/gen_assets.py`, a 64 px por metro)

- Bloques: `roca_madre`, `piedra_azufre`, `piedra_oro`, `piedra_zafiro`, `estrato` (3 variantes de color), `fosil` (huesos y un pico viejo dentro del estrato), `empedrado`, `adobe`, `madera` y `teja`.
- Mapas de emisión de los bloques con mineral y del fósil, en una carpeta propia.
- Grietas: 4 o 5 etapas con transparencia.
- Sprites: el Torogoz (2 cuadros), Don Chepe (2 cuadros picando), el vendedor de la segunda tienda, un árbol tipo pino azul, un izote, la fogata (3 cuadros) y el rótulo "TIENDA".
- Íconos de 32×32 de los 5 minerales y de los 4 fósiles, para la mochila, el botín suelto y el HUD.
- Actualiza `tools/check_palette.py` con el tamaño y las reglas de cada carpeta nueva. Todo tiene que pasar.

## 6. Verificación (definición de terminado)

1. `npm run check` pasa: `tsc`, las pruebas de `vitest` (acomodo de la mochila, costo de mejoras, saturación, multiplicador, colapso, generación determinista por semilla, raycast DDA, y serialización y migración del guardado), `check-arquitectura` y `check_palette.py`.
2. `npm run smoke` usa Playwright con el Edge o el Chrome que ya están instalados (`channel: 'msedge'` o `'chrome'`, sin descargar navegadores), a 1600×900 y sin bloqueo del puntero (`?debug&sinbloqueo`, con una API de depuración en `window.__estratos` que solo exista en ese modo). Si WebGL falla sin ventana, córrelo con ventana. Juega una ruta guionada y guarda capturas en `out/capturas/`:
   - el título;
   - la superficie mirando la tienda;
   - picando, con grietas;
   - un mineral suelto brillando;
   - la mochila acomodada;
   - la venta en la tienda;
   - una cueva a 25 m con una momia;
   - el colapso;
   - la mina nueva con un estrato a la vista;
   - un fósil hallado;
   - el HUD con el calor alto;
   - paredes a 1, 4 y 8 m, para revisar el parpadeo.

   Después de recargar la página, el estado tiene que seguir igual.
3. **Cero errores en la consola** en toda la ruta.
4. **Mira cada captura** y corrige lo que se vea mal frente a las referencias antes de dar por cerrada una etapa.
5. F3 muestra fps, ms por frame, draw calls, triángulos y chunks. Reporta los draw calls y triángulos en la superficie y a 40 m. La meta es 60 fps en una PC normal; Roberto mide los fps reales.
6. `npm run build` genera `dist/` con `base: './'`, y `npm run preview` lo corre bien. `npm run itch` comprime `dist/` en `out/estratos-itch.zip` (con `Compress-Archive` de PowerShell).

## 7. Etapas (verifica y haz commit al cerrar cada una)

1. Proyecto, arquitectura, chequeos y arte nuevo.
2. Mundo voxel, mallado, cámara en primera persona, física y Pointer Lock.
3. Picar, grietas, botín y mochila.
4. Superficie, tiendas, ascensor, T para subir, mejoras y calor.
5. Momia, colapso, estratos, fósiles y mascota.
6. Luz, post-proceso, sonido, interfaz final, guardado y balance.
7. Smoke completo, build, zip y documentación.

## 8. Entrega

- `estratos-fps/README.md`: cómo correrlo (`npm install`, `npm run dev`), cómo generar el build y el zip para itch.io, los controles, dónde tocar el balance, la tabla de balance y **una lista honesta de lo que falta o quedó flojo**.
- `estratos-fps/CREDITS.md`: three.js (MIT), Pixelify Sans y Atkinson Hyperlegible (OFL), y la aclaración de que todo el arte y el sonido son propios.
- `DECISIONES.md` con lo que decidiste sin preguntar.
- **Actualiza `CLAUDE.md`** con la sección 2 de este prompt (en §4, §5, §11 y §16) y la fecha.
- Una lista de 10 cosas para que Roberto pruebe a mano con el mouse: lo que el smoke no puede probar, como el Pointer Lock, la sensación del mouse y los fps reales.

## 9. Fuera de alcance (no lo construyas)

El boss y el Pico del Sol Eterno, el modo vertical y los controles táctiles, más zonas, huevos y más mascotas, los objetos con buff aleatorio, las mejoras de forma de la mochila, los precios por hora real, pagos, anuncios, multijugador y la descarga de packs de terceros.
