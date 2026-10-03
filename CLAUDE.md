# CLAUDE.md — Proyecto "Estratos" (nombre tentativo)

Este archivo es el contexto completo del proyecto. Léelo entero antes de escribir código o proponer cambios. Si algo de aquí choca con lo que te pido en el momento, pregúntame antes de asumir.

---

## 1. Resumen en una frase

Juego móvil de minería y farmeo adictivo, estilo simulador de Roblox, donde cada vez que "colapsas" la mina pierdes todo pero la mina nueva se construye con tus partidas anteriores, y al fondo te espera un boss de estética egipcia que suelta un pico rotísimo.

## 2. Objetivo y público

- **Plataforma principal (decidido el 3 de octubre de 2026, ver §14):** por ahora, **PC en el navegador, horizontal 16:9, con teclado y mouse**, sesiones de unos 30 minutos. Nada vertical ni táctil en esta etapa; la interfaz y la resolución se leen de configuración para pasar a móvil vertical después. Meta de más adelante: móvil (Android primero), vertical, una mano, sesiones cortas de 2 a 10 minutos.
- **Público:** el de los juegos de Roblox tipo Mining Simulator: muchos jugadores jóvenes que buscan ver números subir, abrir cosas y presumir.
- **Meta de diseño:** adicción sana de farmeo. El jugador siempre tiene algo a punto de mejorar.
- **Meta de negocio:** micropagos como atajo, nunca como única vía (ver sección 9).

## 3. Motor y estilo visual

- **Motor (demo actual):** TypeScript + Vite + Three.js, en `estratos-fps/`. La lógica está separada del dibujo (`src/game/` no importa three), de modo que migrar a Godot 4 (GDScript, Android) sigue siendo posible si el juego prospera.
- **Cámara:** **primera persona**, horizontal 16:9 en PC por ahora (vertical en móvil más adelante). Inspiración: Guns 'n Goblins.
- **Mundo:** 3D de bloques con **texturas pixeladas**.
- **Sprites:** todo lo que se mueve o se recoge (enemigos, boss, mascotas, botín, faroles) es un **sprite pixel art billboard**.
- **Pico:** se ve en la mano de la cámara, con animación de golpe.
- **Ambiente:** noche fría de azules, teal y violetas, con puntos de luz cálida (faroles, antorchas, minerales que brillan), niebla azulada, partículas flotando y desenfoque suave en la lejanía. Referencia principal: `referencia/descarga (3).jpg` (campamento de noche).
- **Los minerales y fósiles emiten luz de colores.** Es parte de la identidad y se ve bien en videos cortos.
- **Rendimiento:** desenfoque, glow, niebla y partículas deben poder apagarse. Ajuste de calidad bajo/medio/alto desde el inicio, que fija la resolución interna (480×270, 640×360 o 960×540, escalada con vecino más cercano). Objetivo actual: 60 fps en una PC normal; el de 60 fps en un teléfono de gama media queda para cuando haya versión móvil.
- **Assets:** todo el arte se genera con código (`tools/gen_assets.py`, Pillow y numpy). **No usar packs externos.**

### 3.1 Reglas de estilo (obligatorias)

1. **Una sola paleta** en `tools/palette.py`, de unos 32 colores, en rampas de 4 a 5 tonos con cambio de matiz: sombras hacia azul o violeta, luces hacia cálido. Si cambia la paleta, se regeneran los assets.
2. **Una sola densidad de píxel:** texturas y sprites sobre rejilla de 64 px (64 px = 1 m). El pico en mano, 96x96. No mezclar resoluciones. Para que las texturas no parpadeen a distancia se usan mipmaps (`magFilter = NearestFilter`, `minFilter = NearestMipmapLinearFilter`, elegido con mediciones en el smoke) y una resolución interna por calidad. Esto reemplaza lo de "sin mipmaps" y los 16 px que decían versiones anteriores.
3. **Sin contornos negros puros.** Los sprites llevan contorno de un tono oscuro de su misma rampa. Las texturas no llevan contorno.
4. **Poco dithering.** Cada superficie se sombrea con 3 tonos.
5. **Texturas tileables**, sin costuras visibles.
6. **Cada mineral lleva un píxel de brillo claro**, porque luego emite luz.

`tools/check_palette.py` falla si algún píxel de `assets/` no pertenece a la paleta, si un PNG no mide lo que toca por carpeta o si una textura de bloque tiene costura. **Aplica a los PNG de `assets/`, no al frame final:** la niebla, las luces, el bloom y la viñeta generan colores fuera de la paleta a propósito.

## 4. Identidad

- **Ambientación base:** un volcán salvadoreño (inspiración: Izalco, Santa Ana, San Miguel). Jerga y detalles locales en textos, nombres de mineros, jefes y eventos.
- **Capa profunda:** bajo el volcán hay una tumba egipcia enterrada. Es el giro de tono del juego y el hogar del boss principal (sección 7).

## 5. Ciclo central (core loop)

1. Picar bloques (tocar o mantener) y llenar la mochila.
2. Volver a la tienda y vender los minerales.
3. Comprar mejoras (pico, mochila, mascotas).
4. Bajar más profundo, donde hay mejores minerales y más riesgo.
5. Al llegar a un tope, hacer **colapso** (prestige): perder casi todo y volver con multiplicador.
6. La mina nueva se genera con **fósiles** de las partidas anteriores.
7. Repetir, con más poder, hasta poder enfrentar al boss de la zona.

La sensación buscada es: "perdí todo pero ahora soy el triple de fuerte y además mi pasado está enterrado ahí abajo".

## 6. Sistemas

### 6.1 Colapso y fósiles (la mecánica firma del juego)
- Al colapsar, la mina se derrumba y se convierte en una capa de roca.
- La siguiente partida se excava **a través de las capas anteriores**.
- En esas capas aparecen **fósiles**: picos viejos, mascotas (como huesos que se pueden revivir), mineros atrapados que se pueden rescatar, objetos con buff.
- El historial de cada jugador genera un mapa distinto.
- **Regla de diseño importante:** cada fósil debe cambiar *cómo se juega*, no solo "+10%". Ejemplos: un pico fósil que rompe en línea, un minero rescatado que pica solo una columna, un fósil que atrae minerales cercanos. Los fósiles se pueden combinar entre sí para crear buffs nuevos.
- Futuro: excavar a través de los estratos de un amigo.

### 6.2 Mochila en cuadrícula
- El límite de la mochila es una **cuadrícula** (estilo Resident Evil/Tetris), no un número.
- Cada mineral tiene una forma (diamante 2x2, veta 1x4, etc.).
- Mejorar la mochila = nuevas formas, esquinas y bolsillos, no solo "+50 espacios".
- La tienda paga **bonus por mochila bien llena** (sin huecos).
- **Obligatorio:** botón de "acomodar solo" desde el primer día (arrastrar con el dedo cansa).
- Las mascotas pueden ocupar espacio en la mochila según su forma (fase posterior).

### 6.3 Tiendas y venta
- Varias tiendas con precios distintos: una cerca (paga poco), una lejos (paga mejor).
- Precios que cambian por **saturación** (si vendes mucho hierro, baja) y por hora real.
- Vender los minerales es el motor de la economía.

### 6.4 Mejoras y equipamiento
- Pico: daño, velocidad, alcance, probabilidad de botín doble.
- Mochila: forma y tamaño.
- Armas/equipamiento para jefes.
- Búsqueda constante de "mejor herramienta": siempre debe haber una siguiente a la vista.

### 6.5 Objetos con buff aleatorio
- Al picar hay una probabilidad de que salga un objeto con buff aleatorio (temporal o por partida).
- Deben verse y sonar especiales (luz, partículas, sonido) para dar la emoción de "salió algo".

### 6.6 Mascotas
- Cada mascota da un **buff distinto** (más velocidad, más venta, más suerte, más espacio, etc.).
- Se consiguen con huevos, fósiles revividos y como premio de jefes.
- Rareza: común, rara, épica, legendaria.
- Las mascotas con cara y personalidad son clave para el apego del jugador.

### 6.7 Zonas
- Se desbloquean por profundidad y por vencer jefes.
- Cada zona tiene su paleta, minerales, enemigos y reglas propias.
- Orden previsto: Superficie del volcán → Cámaras de lava (calor) → Cristales → **Tumba enterrada (Egipto)**.

### 6.7.1 Calor (mecánica de volcán)
- Más profundidad = más calor, y los mineros se sobrecalientan.
- El calor es también un recurso: se captura para alimentar máquinas de producción automática.
- Decisión constante: bajar un nivel más (más riesgo y premio) o subir a enfriarse.
- Esto necesita muchas pruebas de números; calibrarlo es una tarea explícita.

### 6.8 Récords y progreso visible
- Contador permanente de **bloques picados** (récord personal y total).
- Récord por partida, por profundidad y por velocidad.
- Tabla de posiciones entre amigos (fase posterior).
- Números grandes y satisfactorios al romper bloques.

## 7. Boss principal: el Faraón de Obsidiana (nombre tentativo)

**Concepto:** en lo más profundo, bajo las capas del volcán, hay una tumba egipcia sellada. Su guardián es un faraón-momia gigante de obsidiana y oro, dormido hasta que el jugador llega a la profundidad necesaria.

**Estética:** egipcia. Sarcófago dorado, jeroglíficos que brillan, vendas, escarabajos, columnas, arena que cae. Paleta: dorado, turquesa, negro obsidiana, rojo lava (por el volcán encima). Los jeroglíficos son también la UI de la pelea (indican el siguiente ataque).

**Pelea (versión mínima):**
- Entre 60 y 90 segundos, por fases.
- Debe tener una mecánica propia, no solo "toca rápido". Propuesta:
  - **Fase 1:** esquivar ataques de arena y escarabajos que marcan su zona antes de golpear.
  - **Fase 2:** romper los jeroglíficos que se encienden en el cuerpo del boss (elegir qué parte golpear, cada una con riesgo distinto).
  - **Fase 3:** el boss se enfurece, el calor sube; hay que balancear daño y enfriamiento.
- Tiene que poder vencerse con habilidad y equipo adecuado, no solo pagando.

**Premio: el Pico del Sol Eterno (nombre tentativo)** — el pico rotísimo.
- Es el mejor pico del juego en su etapa.
- **Sobrevive al colapso** como reliquia: no se pierde al hacer prestige (es la excepción a la regla de perderlo todo). Esto lo hace un objetivo aspiracional enorme.
- Habilidad propia, por ejemplo: cada cierto número de golpes lanza un rayo dorado que rompe en línea; rompe bloques de obsidiana que ningún otro pico puede.
- Se ve distinto: brilla, deja estela, suena distinto.
- Se puede mejorar (niveles de la reliquia) para seguir dando progreso después de conseguirlo.
- Se puede volver a pelear al boss en dificultades mayores para mejorar el pico o conseguir mascotas exclusivas egipcias.

**Otros jefes (futuro):** Gigante Dormido (ver sección 12). Cada zona tiene su jefe con un premio único.

## 8. Curva de progreso (procedural)

Tres tramos pensados:
1. **Primeros 20-30 min:** todo fluye. Mejoras rápidas, muchas recompensas, el jugador se engancha.
2. **Pared suave:** cada mejora cuesta más. Fórmula inicial de costo: `costo = base × 1.15 ^ nivel`, con ingresos creciendo más lento que el costo. Ajustar con pruebas.
3. **Tentación de pagar:** aquí entran los atajos de dinero, sin ser obligatorios.

- La progresión de profundidad, minerales y dificultad es **procedural**: los valores salen de fórmulas, no de tablas escritas a mano, para poder ajustar todo desde pocos parámetros.
- Mantener todas las fórmulas y constantes de balance en **un solo archivo de configuración** para tocar números sin tocar código.
- Debe existir siempre una ruta lenta pero real para quien no paga.

## 9. Monetización (micropagos)

Qué se puede vender:
- Multiplicador de venta (x2).
- Auto-minado.
- Más espacio/formas de mochila.
- Huevos de mascota.
- Pases de temporada o eventos.
- Cosméticos (skins de pico, estelas, mascotas cosméticas).

Reglas:
- **Nada importante debe depender solo de un huevo con probabilidad.**
- **Mostrar las probabilidades** de los huevos (obligatorio en Apple y Google).
- El público es en gran parte menor de edad: evitar presión agresiva, temporizadores engañosos y compras accidentales (confirmación clara antes de pagar).
- Si la pared de progreso es demasiado dura y el dinero es la única salida, la gente se va en lugar de pagar. Dejar la ruta gratuita viable.
- Anuncios con recompensa (ver un anuncio para duplicar una venta) como alternativa gratuita para el jugador.

## 10. Versión mínima (MVP)

**Paso previo (hecho): prueba de estilo.** El look se validó con un set mínimo de assets generados por código y un render de prueba (`tools/preview.py` → `out/preview.png`). La demo actual está en `estratos-fps/` (ver §14).

Construir primero **solo** esto, y que sea jugable en PC con teclado y mouse (el móvil viene después):
- Una zona (superficie del volcán) en primera persona, horizontal, con el pico en la mano.
- 5 minerales con formas distintas (azufre, oro, esmeralda, rubí y zafiro).
- Mochila en cuadrícula 4x4 con "acomodar solo".
- Una tienda para vender (después una segunda con otros precios).
- 5 mejoras de pico con la fórmula de costo.
- Colapso funcionando, con generación de 3 fósiles con buff aleatorio en la siguiente partida.
- Contador de récord de bloques picados.
- Una mascota con buff (sprite billboard).
- Barra de calor básica.
- Segunda tienda en la parada de 30 m, ascensor con paradas cada 10 m, silbido para volver y una momia de ejemplo.
- Guardado en `localStorage`, ajustes de calidad y sin monetización en esta demo.

**Fase 2:** zona de la Tumba con el boss egipcio y el Pico del Sol Eterno.
**Fase 3:** más zonas, más mascotas y huevos, micropagos, eventos diarios, estratos de amigos.

## 11. Riesgos conocidos (tenerlos presentes)

- Los fósiles pueden volverse "+10% con otro dibujo": exigir que cambien la jugabilidad.
- Arrastrar piezas en la mochila con el dedo puede cansar: el acomodo automático es obligatorio.
- Calibrar el calor y la curva de costos requiere mucha prueba de números.
- El arte decide el apego: el pico, las mascotas y el boss necesitan personalidad, no sprites genéricos.
- El boss debe tener una mecánica propia o se siente como un saco de golpes.
- El rendimiento en celulares de gama media puede romperse por efectos 3D: medir desde temprano.
- El alcance crece fácil: no empezar la fase 2 hasta que el ciclo básico enganche de verdad.

## 12. Ideas futuras (no construir todavía)

- **El Gigante Dormido:** la mina es el cuerpo de un gigante dormido; cada zona es una parte suya y el jefe es el mapa mismo.
- **Modo dúo/amigos:** dos jugadores excavan desde lados opuestos de la montaña; si se encuentran en el medio ganan un premio grande.
- Volcanes reales como mundos nuevos (San Miguel con erupciones que obligan a evacuar), leyendas salvadoreñas como eventos y jefes.
- Eventos de minerales raros que duran un día para que la gente vuelva a diario.

## 13. Cómo quiero que trabajes (instrucciones para Claude Code)

- Idioma: español. Comentarios del código en español.
- Empieza siempre por la versión mínima; no agregues sistemas de las fases 2 y 3 sin que yo lo pida.
- Mantén el código simple y modular (un script por sistema: mochila, tienda, colapso, mascotas, calor, jefe).
- Todos los números de balance viven en un archivo de configuración único.
- Antes de agregar una librería o plugin, justifica por qué hace falta.
- Piensa en móvil como destino final (controles táctiles, pantalla vertical, rendimiento), pero la demo actual es solo PC horizontal (ver §14).
- Cuando propongas algo que cambie el diseño de este documento, avísame y actualiza este archivo.
- Si algo es ambiguo, pregunta una cosa concreta en lugar de asumir.

---

## 14. Decisiones de la demo FPS (3 de octubre de 2026)

La demo jugable está en `estratos-fps/` (TypeScript + Vite + Three.js). Se construyó en una sola pasada a partir de `PROMPT_DEMO_FPS.md`. Estas decisiones mandan sobre lo que digan las secciones anteriores si chocan:

1. **Solo horizontal 16:9, en PC, con teclado y mouse.** Nada vertical ni táctil por ahora. La orientación, las resoluciones internas por calidad y las anclas del HUD se leen de `src/config/pantalla.ts`, y el CSS depende de `data-orientacion`, para pasar a vertical después sin reescribir.
2. **Densidad de 64 px por bloque**, la de los assets nuevos. Texturas con `magFilter = NearestFilter`, mipmaps y `minFilter = NearestMipmapLinearFilter` (elegido por medición, ver `estratos-fps/DECISIONES.md`). Resolución interna por calidad: bajo 480×270, medio 640×360, alto 960×540.
3. **El verificador de paleta aplica a los PNG de `assets/`, no al frame final.** La niebla, las luces, el bloom y la viñeta salen de la paleta a propósito.
4. **Minerales de la demo:** azufre, oro, esmeralda, rubí y zafiro. La obsidiana es un bloque duro de las capas hondas.
5. **Fósiles:** Pico Rompefilas, Don Chepe, Imán de talpetate y Brasa antigua, cada uno con su mecánica. Tras cada colapso aparecen 3 al azar dentro de los estratos.
6. **Sin monetización** en la demo: ni tienda de pago, ni anuncios, ni botones falsos.
7. **Todo el arte de la demo es propio** y sale de `tools/gen_assets.py` (con `tools/gen_assets_fps.py`). No se descargaron packs.
8. **Arquitectura:** `src/game/` es lógica pura (no importa three ni toca `window`, `document` o `localStorage`; lo vigila `scripts/check-arquitectura.mjs`). Todos los números del juego están en `src/config/balance.ts`. Simulación a paso fijo de 1/60 s.
9. **Balance:** `npm run simular` compara ingresos por minuto con el costo de las mejoras. Resultado actual: primera venta y mejora en menos de 2 minutos, 30 m en unos 16 minutos y la mitad de tiempo tras el primer colapso. La tabla está en `estratos-fps/README.md`.
10. **Fuera de alcance de la demo:** el boss y el Pico del Sol Eterno, más zonas, huevos y más mascotas, objetos con buff aleatorio, mejoras de forma de la mochila, precios por hora real, pagos, anuncios, multijugador y packs de terceros.

Nota: `PROMPT_DEMO_FPS.md` pedía actualizar §4, §5, §11 y §16, que no existen en este archivo (tiene 13 secciones más esta). Los cambios quedaron en §2, §3, §3.1, §10 y aquí.
