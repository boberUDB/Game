# Estratos - Juego de Minería FPS

🎮 **Jugar ahora en el navegador:** [https://boberUDB.github.io/Game/](https://boberUDB.github.io/Game/)

---

## 📖 Descripción

**Estratos** es un juego en primera persona para PC (navegador con teclado y mouse) ambientado en las profundidades de un volcán salvadoreño.

El ciclo principal:
1. **Picá** bloques voxel en busca de minerales (azufre, oro, esmeralda, rubí, zafiro).
2. **Llená** la mochila y gestioná tu inventario.
3. **Vendé** en la tienda en superficie o en los refugios subterráneos.
4. **Mejorá** tu pico, mochila y mascotas (Torogoz).
5. **Bajá** a mayor profundidad con más riesgo y calor.
6. **Colapsá** la mina (prestige) cuando alcances el límite para renacer con multiplicador permanente y descubrir los **fósiles** dejados por tus partidas anteriores.
7. Al fondo te espera una tumba egipcia ancestral.

---

## 🎮 Controles

| Tecla | Acción |
|---|---|
| **W, A, S, D** | Moverse |
| **Mouse** | Mirar |
| **Clic Izquierdo** (mantener) | Picar / Golpear |
| **Shift** | Correr |
| **Espacio** | Saltar |
| **E** | Interactuar (tienda, ascensor, vendedor) |
| **Tab** | Abrir / Cerrar mochila |
| **Q / R / Supr** | En mochila: ordenar / rotar / desechar |
| **T** | Silbar al ascensor para subir a la superficie |
| **Esc** | Menú de pausa |
| **M** | Silenciar audio |
| **F3** | Estadísticas de rendimiento (FPS, llamadas de dibujo, chunks) |

---

## 🛠️ Tecnologías y Estructura

- **Motor:** TypeScript, Vite, Three.js (renderizado en primera persona a 64 px/metro con texturas pixel art y mipmaps).
- **Audio:** Web Audio API con síntesis procedural (sin archivos externos).
- **Arte:** Procedural / generado mediante scripts Python con paleta unificada de 32 colores (`tools/`).

### Estructura de carpetas:
- `assets/`: Texturas, sprites de personajes, bloques, partículas y props.
- `estratos-fps/`: Código fuente principal de la versión en primera persona (lógica desacoplada en `src/game/`).
- `tools/`: Scripts de Python para generación de arte y verificación de paleta.
- `referencia/` y `out/`: Documentación, capturas y previews.

---

## 🚀 Cómo ejecutar en desarrollo

1. Navegar a `estratos-fps`:
   ```bash
   cd estratos-fps
   npm install
   npm run dev
   ```
2. Abrir la URL que muestra Vite (`http://localhost:5173/`).
