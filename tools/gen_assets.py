"""Genera todos los assets del juego con Pillow y numpy.

Uso:  python tools/gen_assets.py
Los colores salen solo de tools/palette.py: si cambia la paleta, basta
con volver a ejecutar este script.
"""
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import BLOQUES, BRILLO, CRISTALES, ENGASTE, MATERIALES, c  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(RAIZ, "assets")
T = 64  # rejilla base: 64 px = 1 m


def guardar(arr, *ruta):
    destino = os.path.join(ASSETS, *ruta)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    Image.fromarray(arr.astype(np.uint8)).save(destino)
    return destino


# ---------------------------------------------------------------------------
# Texturas de bloque (tileables: todo se calcula con envoltura en los bordes)
# ---------------------------------------------------------------------------

def vecino(mascara, dy, dx):
    """Máscara desplazada con envoltura: el resultado en (y, x) es mascara[y-dy, x-dx]."""
    return np.roll(np.roll(mascara, dy, 0), dx, 1)


def voronoi(n_lado, semilla, estirar=1.0, metrica="euclidea"):
    """Celdas periódicas. Devuelve id de celda, distancias y desplazamiento a la semilla."""
    rng = np.random.default_rng(semilla)
    paso = T / n_lado
    pts = np.array([((i + rng.uniform(0.2, 0.8)) * paso, (j + rng.uniform(0.2, 0.8)) * paso)
                    for j in range(n_lado) for i in range(n_lado)])
    yy, xx = np.mgrid[0:T, 0:T]
    dx = (xx[..., None] - pts[:, 0] + T / 2) % T - T / 2
    dy = ((yy[..., None] - pts[:, 1] + T / 2) % T - T / 2) * estirar
    d = np.hypot(dx, dy) if metrica == "euclidea" else np.abs(dx) + np.abs(dy)
    orden = np.argsort(d, axis=2)

    def tomar(a, k):
        return np.take_along_axis(a, orden[..., k:k + 1], 2)[..., 0]

    return orden[..., 0], tomar(d, 0), tomar(d, 1), tomar(dx, 0), tomar(dy, 0), rng


def ruido_periodico(n, rng):
    """Ruido de valor suave que se repite cada T píxeles."""
    g = rng.random((n, n))
    yy, xx = np.mgrid[0:T, 0:T]
    fx, fy = xx * n / T, yy * n / T
    x0, y0 = fx.astype(int), fy.astype(int)
    tx, ty = fx - x0, fy - y0
    tx, ty = tx * tx * (3 - 2 * tx), ty * ty * (3 - 2 * ty)
    x1, y1 = (x0 + 1) % n, (y0 + 1) % n
    arriba = g[y0, x0] * (1 - tx) + g[y0, x1] * tx
    abajo = g[y1, x0] * (1 - tx) + g[y1, x1] * tx
    return arriba * (1 - ty) + abajo * ty


def mayoria(tono, pasadas=2):
    """Filtro de moda 3x3: quita píxeles sueltos para que no parezca dithering."""
    for _ in range(pasadas):
        cuenta = np.stack([
            sum(vecino(tono == v, dy, dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1)).astype(int)
            for v in range(tono.max() + 1)])
        tono = cuenta.argmax(0)
    return tono


def colorear(tono, colores):
    return np.array(colores, dtype=np.uint8)[tono]


def tonos_piedra(semilla=11):
    """Rocas encajadas: grieta, cara en sombra, cara media y canto iluminado."""
    ident, d1, d2, _, _, rng = voronoi(4, semilla, estirar=1.3)
    grieta = (d2 - d1) < 1.5
    solido = ~grieta
    luz = solido & (vecino(grieta, 1, 0) | vecino(grieta, 0, 1) | vecino(grieta, 2, 0))
    sombra = solido & (vecino(grieta, -1, 0) | vecino(grieta, 0, -1)
                       | vecino(grieta, -2, 0) | vecino(grieta, 0, -2))
    tono = np.full((T, T), 2)
    tono[sombra] = 1
    tono[luz] = 3
    # Algunas rocas quedan un tono más apagadas para romper la uniformidad.
    apagada = (rng.random(ident.max() + 1) < 0.35)[ident] & solido
    tono[apagada] = np.maximum(tono[apagada] - 1, 1)
    tono[grieta] = 0
    # Unas pocas motas claras de dos píxeles.
    for _ in range(10):
        x, y = rng.integers(0, T, 2)
        x2 = (x + 1) % T
        if tono[y, x] == 2 and tono[y, x2] == 2:
            tono[y, x] = tono[y, x2] = 4
    return tono


def tex_piedra():
    return colorear(tonos_piedra(), BLOQUES["piedra"])


def tex_tierra():
    rng = np.random.default_rng(5)
    r = ruido_periodico(8, rng) + 0.6 * ruido_periodico(16, rng)
    q1, q2 = np.quantile(r, [0.38, 0.93])
    tono = mayoria(np.where(r < q1, 1, np.where(r < q2, 2, 3)), 3)
    # Guijarros: cara clara, cuerpo y sombra debajo.
    for _ in range(9):
        x, y = rng.integers(0, T, 2)
        for dx in range(3):
            tono[y % T, (x + dx) % T] = 4
            tono[(y + 2) % T, (x + dx + 1) % T] = 0
        for dx in range(-1, 4):
            tono[(y + 1) % T, (x + dx) % T] = 3
    # Hoyitos oscuros.
    for _ in range(7):
        x, y = rng.integers(0, T, 2)
        tono[y, x] = tono[y, (x + 1) % T] = 0
    return colorear(tono, BLOQUES["tierra"])


def tex_obsidiana():
    """Vidrio volcánico: facetas angulosas partidas en cara clara y cara oscura."""
    _, d1, d2, sdx, sdy, _ = voronoi(3, 23, metrica="manhattan")
    clara = (sdx + 0.6 * sdy) < 0
    borde = (d2 - d1) < 1.3
    tono = np.where(clara, 1, 0)
    tono[borde & clara] = 2
    # Veta fina dentro de la cara clara y un destello por faceta.
    veta = clara & ~borde & (np.round(sdx - 0.5 * sdy) == -7)
    tono[veta] = 2
    rx, ry = np.round(sdx), np.round(sdy)
    tono[((rx == -3) & (ry == -5)) | ((rx == -5) & (ry == -3))] = 2
    tono[(rx == -4) & (ry == -4)] = 3
    return colorear(tono, BLOQUES["obsidiana"])


JEROGLIFICOS = {
    "ankh": [
        "....####....",
        "...##..##...",
        "...##..##...",
        "...##..##...",
        "....####....",
        ".....##.....",
        ".##########.",
        ".##########.",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        "............",
    ],
    "ojo": [
        "............",
        "............",
        "..########..",
        ".##......##.",
        "##..####..##",
        "....####....",
        "##..####..##",
        ".##########.",
        "....##.##...",
        "...##...##..",
        "..##.....##.",
        "..#......###",
        "............",
        "............",
    ],
    "sol": [
        "............",
        "....####....",
        "...##..##...",
        "..##.##.##..",
        "..##.##.##..",
        "...##..##...",
        "....####....",
        "............",
        "..#...#...#.",
        ".###.###.###",
        "##.###.###.#",
        "............",
        "............",
        "............",
    ],
    "ave": [
        "............",
        "..###.......",
        ".##.##......",
        ".#####......",
        "...##.......",
        "...###......",
        "...#####....",
        "...#######..",
        "...######...",
        "....####....",
        "....#..#....",
        "....#..#....",
        "...##.##....",
        "............",
    ],
}


def tex_arenisca():
    """Sillares de arenisca con un jeroglífico grabado en cada uno."""
    rng = np.random.default_rng(31)
    yy, xx = np.mgrid[0:T, 0:T]
    fila = yy // 32
    bx = (xx - 16 * fila) % 32
    by = yy % 32
    tono = np.full((T, T), 2)
    # Desgaste: manchas grandes de sombra, sin píxeles sueltos.
    r = ruido_periodico(4, rng)
    tono[mayoria((r > np.quantile(r, 0.86)).astype(int), 2) == 1] = 1
    tono[(bx == 31) | (by == 31)] = 1
    tono[(bx == 1) | (by == 1)] = 3
    tono[(bx == 0) | (by == 0)] = 0

    grabado = np.zeros((T, T), bool)
    encendido = np.zeros((T, T), bool)
    bloques = [(0, 0, "ankh"), (32, 0, "ojo"), (16, 32, "sol"), (48, 32, "ave")]
    for ox, oy, nombre in bloques:
        for j, linea in enumerate(JEROGLIFICOS[nombre]):
            for i, ch in enumerate(linea):
                if ch == "#":
                    y, x = (oy + 9 + j) % T, (ox + 10 + i) % T
                    grabado[y, x] = True
                    encendido[y, x] = nombre == "ojo"
    labio = vecino(grabado, 1, 1) & ~grabado  # canto iluminado del grabado
    tono[labio] = 3
    tono[grabado] = 0
    tono[encendido] = 4  # el ojo brilla en turquesa
    return colorear(tono, BLOQUES["arenisca"])


def tex_mineral(nombre, cristales, con_mascara=False):
    """Piedra con cristales incrustados. Cada cristal lleva su píxel de brillo."""
    img = tex_piedra()
    sombra, medio, luz = CRISTALES[nombre]
    yy, xx = np.mgrid[0:T, 0:T]
    mascara = np.zeros((T, T), bool)
    for cx, cy, rx, ry in cristales:
        dx, dy = xx - cx, yy - cy
        dentro = np.abs(dx) / rx + np.abs(dy) / ry <= 1.0
        engaste = (np.abs(dx) / (rx + 1.6) + np.abs(dy) / (ry + 1.6) <= 1.0) & ~dentro
        img[engaste] = ENGASTE
        img[dentro] = medio
        mascara |= dentro
        img[dentro & (dx < 0) & (dy < 0)] = luz
        img[dentro & (dx >= 0) & (dy >= 0)] = sombra
        img[int(round(cy - ry * 0.4)), int(round(cx - rx * 0.3))] = BRILLO
    return (img, mascara) if con_mascara else img


CRISTALES_ESMERALDA = [(14, 17, 4, 6), (21, 23, 3, 4), (45, 38, 5, 7), (52, 45, 3, 5),
                       (38, 44, 2.5, 4), (25, 52, 3, 4)]
CRISTALES_RUBI = [(41, 14, 4, 6), (48, 21, 3, 4), (17, 37, 5, 7), (24, 45, 3, 4),
                  (47, 50, 3, 5), (11, 46, 2.5, 3.5)]


# ---------------------------------------------------------------------------
# Sprites: se pintan por material y tono, y el contorno sale solo al final
# ---------------------------------------------------------------------------

NOMBRES = list(MATERIALES)
SOMBRA, MEDIO, LUZ, DESTELLO = 1, 2, 3, 4


def desplazar(m, dy, dx):
    """Desplaza sin envolver; fuera del lienzo se repite el borde."""
    h, w = m.shape
    p = np.pad(m, ((abs(dy), abs(dy)), (abs(dx), abs(dx))), mode="edge")
    return p[abs(dy) - dy:abs(dy) - dy + h, abs(dx) - dx:abs(dx) - dx + w]


def bisel(m, luz=1, sombra=2):
    """Sombreado de 3 tonos con la luz arriba a la izquierda."""
    t = np.full(m.shape, MEDIO)
    t[m & ~(desplazar(m, -sombra, 0) & desplazar(m, 0, -sombra))] = SOMBRA
    t[m & ~(desplazar(m, luz, 0) & desplazar(m, 0, luz))] = LUZ
    return t


class Lienzo:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.mat = np.zeros((h, w), np.int16)
        self.tono = np.zeros((h, w), np.int16)
        yy, xx = np.mgrid[0:h, 0:w]
        self.x, self.y = xx + 0.5, yy + 0.5

    def pintar(self, m, material, tono=None, luz=1, sombra=2):
        m = np.asarray(m, bool)
        self.mat[m] = NOMBRES.index(material) + 1
        self.tono[m] = bisel(m, luz, sombra)[m] if tono is None else tono

    def retocar(self, m, tono, material):
        """Cambia el tono solo donde ya hay ese material."""
        m = np.asarray(m, bool) & (self.mat == NOMBRES.index(material) + 1)
        self.tono[m] = tono

    def elipse(self, cx, cy, rx, ry):
        return ((self.x - cx) / rx) ** 2 + ((self.y - cy) / ry) ** 2 <= 1

    def rect(self, x0, y0, x1, y1):
        return (self.x >= x0) & (self.x < x1) & (self.y >= y0) & (self.y < y1)

    def capsula(self, x0, y0, x1, y1, r):
        vx, vy = x1 - x0, y1 - y0
        k = np.clip(((self.x - x0) * vx + (self.y - y0) * vy) / (vx * vx + vy * vy), 0, 1)
        return np.hypot(self.x - (x0 + k * vx), self.y - (y0 + k * vy)) <= r

    def render(self):
        out = np.zeros((self.h, self.w, 4), np.uint8)
        for i, nombre in enumerate(NOMBRES):
            for t in (SOMBRA, MEDIO, LUZ, DESTELLO):
                out[(self.mat == i + 1) & (self.tono == t)] = (*MATERIALES[nombre][t], 255)
        # Contorno: píxel vacío pegado a uno lleno, con el tono oscuro de ese material.
        vacio = self.mat == 0
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            vec = np.zeros_like(self.mat)
            src = self.mat[max(-dy, 0):self.h - max(dy, 0), max(-dx, 0):self.w - max(dx, 0)]
            vec[max(dy, 0):self.h + min(dy, 0), max(dx, 0):self.w + min(dx, 0)] = src
            borde = vacio & (vec > 0) & (out[..., 3] == 0)
            for i, nombre in enumerate(NOMBRES):
                out[borde & (vec == i + 1)] = (*MATERIALES[nombre][0], 255)
        return out


# --- Pico en primera persona ------------------------------------------------

PICO_CUADROS = [
    # nombre, base del mango (x, y), ángulo del mango en grados
    ("reposo", 86, 104, -120),
    ("preparar", 66, 106, -95),
    ("golpe", 88, 100, -140),
    ("impacto", 94, 98, -152),
    ("regreso", 87, 102, -131),
]


def pico(px, py, ang, largo=88):
    lz = Lienzo(96, 96)
    a = np.radians(ang)
    ux, uy = np.cos(a), np.sin(a)
    nx, ny = -uy, ux
    s = (lz.x - px) * ux + (lz.y - py) * uy   # a lo largo del mango
    t = (lz.x - px) * nx + (lz.y - py) * ny   # a través del mango
    lado = 1.0 if (nx + ny) < 0 else -1.0     # lado del mango que mira a la luz

    def punto(sv, tv=0.0):
        return px + ux * sv + nx * tv, py + uy * sv + ny * tv

    # Antebrazos: salen por abajo del cuadro.
    manos = [(42, (px - 48, 116)), (21, (px + 18, 118))]
    for s_m, codo in manos:
        cx, cy = punto(s_m, 1.0)
        brazo = lz.capsula(cx, cy, codo[0], codo[1], 7.5)
        d = np.hypot(lz.x - cx, lz.y - cy)
        lz.pintar(brazo, "manga", luz=2, sombra=3)
        lz.pintar(brazo & (d < 19), "oro")        # hebilla del guante
        lz.pintar(brazo & (d < 16), "guante")

    # Mango.
    mango = (np.abs(t) <= 3) & (s >= -30) & (s <= largo - 5)
    lz.pintar(mango, "madera", MEDIO)
    lz.retocar(mango & (t * lado > 1.2), LUZ, "madera")
    lz.retocar(mango & (t * lado < -1.2), SOMBRA, "madera")

    # Cabeza: barra curva que se afila hacia las puntas.
    ancho = 25
    e = s - (largo - 0.014 * t * t)
    grosor = 1.6 + 4.2 * (1 - np.abs(t) / ancho)
    ojo_pico = (np.abs(t) <= 4.5) & (s >= largo - 6) & (s <= largo + 5.5)
    lz.pintar(ojo_pico, "acero")
    hoja = (np.abs(e) <= grosor) & (np.abs(t) <= ancho)
    lz.pintar(hoja, "acero", MEDIO)
    lz.retocar(hoja & (e > grosor * 0.25), LUZ, "acero")
    lz.retocar(hoja & (e < -grosor * 0.3), SOMBRA, "acero")
    lz.retocar(hoja & (e > grosor * 0.25) & (t * lado > ancho * 0.4) & (t * lado < ancho * 0.72),
               DESTELLO, "acero")
    # Abrazadera dorada entre mango y cabeza.
    lz.pintar((np.abs(t) <= 4) & (s >= largo - 11) & (s <= largo - 6.5), "oro")

    # Puños cerrados sobre el mango, con las separaciones de los dedos.
    for s_m, _ in manos:
        puno = ((s - s_m) / 8.5) ** 2 + ((t - 0.5) / 9.0) ** 2 <= 1
        lz.pintar(puno, "guante")
        for k in (-4.2, 0.0, 4.2):
            lz.retocar(puno & (np.abs(s - (s_m + k)) < 0.6) & (t * lado > -4) & (t * lado < 7.5),
                       SOMBRA, "guante")
    return lz.render()


# --- Momia ------------------------------------------------------------------

def momia(bajada=0, dano=False):
    lz = Lienzo(64, 96)
    ox = 2 if dano else 0            # al recibir daño se echa hacia atrás
    oy = (-2 if dano else 0) + bajada
    v = "vendas"

    # Piernas y pies.
    for x0 in (22, 34):
        lz.pintar(lz.rect(x0 + ox, 60, x0 + 9 + ox, 90), v)
        lz.pintar(lz.rect(x0 - 2 + ox, 87, x0 + 10 + ox, 93), v)
    # Torso y hombros.
    torso = (np.abs(lz.x - 32 - ox) <= 15 - (lz.y - 32 - oy) * 0.13) & (lz.y >= 32 + oy) & (lz.y < 64)
    lz.pintar(torso, v, luz=2, sombra=3)
    lz.pintar(lz.elipse(32 + ox, 36 + oy, 17, 6), v)
    # Cabeza.
    cab = lz.elipse(32 + ox * 2, 18 + oy, 10.5, 12.5)
    lz.pintar(cab, v, luz=2, sombra=3)

    # Vendas: líneas de sombra con pendiente distinta en cada parte del cuerpo.
    def vendaje(zona, periodo, pendiente, fase=0):
        linea = np.floor(lz.y + pendiente * lz.x + fase) % periodo == 0
        lz.retocar(zona & linea, SOMBRA, v)

    vendaje(cab, 6, 0.22, 2)
    vendaje(torso | lz.elipse(32 + ox, 36 + oy, 17, 6), 7, -0.28, 1)
    vendaje(lz.rect(0, 60, 32 + ox, 96), 6, 0.2)
    vendaje(lz.rect(32 + ox, 60, 64, 96), 6, -0.2, 3)

    # Rendija del rostro con ojos encendidos.
    lz.pintar(cab & lz.rect(0, 14 + oy, 64, 21 + oy), "hueco", MEDIO)
    lz.retocar(lz.rect(0, 14 + oy, 64, 15 + oy), SOMBRA, "hueco")
    ojo = "ojo_dano" if dano else "ojo"
    for ex in (26, 35):
        x = ex + ox * 2
        lz.pintar(lz.rect(x, 16 + oy, x + 3, 19 + oy), ojo, MEDIO)
        lz.pintar(lz.rect(x + 1, 17 + oy, x + 2, 18 + oy), ojo, DESTELLO)

    # Collar de oro con un rubí.
    collar = lz.elipse(32 + ox, 33 + oy, 9, 3.5) & (lz.y >= 32 + oy)
    lz.pintar(collar, "oro")
    lz.pintar(lz.rect(31 + ox, 34 + oy, 33 + ox, 36 + oy), "rubi", MEDIO)

    # Brazos: caídos en reposo, abiertos de golpe al recibir daño.
    for lado in (-1, 1):
        hx = 32 + ox + lado * 16
        if dano:
            mx, my = 32 + ox + lado * 23, 44 + oy
        else:
            mx, my = 32 + ox + lado * 21, 54 + oy + bajada
        brazo = lz.capsula(hx, 37 + oy, mx, my, 4.5)
        mano = lz.elipse(mx, my + 3, 5, 5.5)
        lz.pintar(brazo, v)
        vendaje(brazo, 5, 0.3 * lado, 1)
        lz.pintar(mano, v)
        # Tira de venda suelta que cuelga de la mano.
        lz.pintar(lz.capsula(mx - lado, my + 7, mx - lado * 2, my + 17, 1.2), v, SOMBRA)
    # Otra tira suelta en la cintura.
    lz.pintar(lz.capsula(41 + ox, 63, 44 + ox, 74, 1.2), v, SOMBRA)

    if dano:  # destello de golpe: todo el vendaje sube un tono
        sel = lz.mat == NOMBRES.index(v) + 1
        lz.tono[sel] = np.minimum(lz.tono[sel] + 1, DESTELLO)
    return lz.render()


# --- Farol, gema y partículas -----------------------------------------------

def farol(cuadro):
    lz = Lienzo(32, 64)
    # Poste y base.
    lz.pintar(lz.rect(14, 40, 18, 61), "madera")
    lz.pintar(lz.rect(9, 59, 23, 63), "madera")
    # Plato, vidrio y tapa.
    lz.pintar(lz.rect(7, 37, 25, 40), "hierro")
    lz.pintar(lz.rect(9, 16, 23, 37), "fuego", SOMBRA)
    resplandor = lz.elipse(16, 27, 5.5 + cuadro, 9) & lz.rect(9, 16, 23, 37)
    lz.pintar(resplandor, "fuego", MEDIO)
    lz.pintar(lz.elipse(16, 28, 4, 7), "fuego", LUZ)
    if cuadro == 0:
        llama = lz.elipse(16, 29, 2.2, 4) | lz.elipse(15, 24.5, 1.2, 2.5)
    else:
        llama = lz.elipse(16, 29.5, 2.6, 3.5) | lz.elipse(17, 25.5, 1.2, 2)
    lz.pintar(llama, "fuego", DESTELLO)
    for x0 in (9, 21):                      # barrotes
        lz.pintar(lz.rect(x0, 16, x0 + 2, 37), "hierro", MEDIO)
    lz.pintar(lz.rect(9, 16, 10, 37), "hierro", LUZ)
    tapa = (np.abs(lz.x - 16) <= 4 + (lz.y - 9) * 0.85) & (lz.y >= 9) & (lz.y < 16)
    lz.pintar(tapa, "hierro")
    lz.pintar(lz.rect(14, 6, 18, 9), "hierro")
    anillo = lz.elipse(16, 4, 3.2, 3.2) & ~lz.elipse(16, 4, 1.4, 1.4)
    lz.pintar(anillo, "hierro", LUZ)
    return lz.render()


def gema():
    lz = Lienzo(32, 32)
    cx = 16
    corona = (lz.y >= 6) & (lz.y < 12) & (np.abs(lz.x - cx) <= 6 + (lz.y - 6) * 0.9)
    pabellon = (lz.y >= 12) & (lz.y < 27) & (np.abs(lz.x - cx) <= 11.4 * (1 - (lz.y - 12) / 15))
    dx = lz.x - cx
    lz.pintar(corona, "zafiro", LUZ)
    lz.retocar(corona & (dx > 3), MEDIO, "zafiro")
    lz.pintar(pabellon, "zafiro", MEDIO)
    lz.retocar(pabellon & (dx > 2 - (lz.y - 12) * 0.1), SOMBRA, "zafiro")
    lz.retocar(pabellon & (dx < -3) & (dx > -6 + (lz.y - 12) * 0.25), LUZ, "zafiro")
    lz.retocar(lz.rect(4, 12, 28, 13), LUZ, "zafiro")       # filo entre corona y pabellón
    lz.retocar(lz.rect(10, 7, 13, 9), DESTELLO, "zafiro")   # píxeles de brillo
    lz.retocar(lz.rect(9, 9, 10, 10), DESTELLO, "zafiro")
    return lz.render()


def particula(dibujo, colores):
    out = np.zeros((8, 8, 4), np.uint8)
    for y, linea in enumerate(dibujo):
        for x, ch in enumerate(linea):
            if ch in colores:
                out[y, x] = (*colores[ch], 255)
    return out


CHISPA = ["........", "........", "...o....", "..oWy...", "...y....", "........", "........", "........"]
POLVO = ["........", "........", "...bb...", "..bBBb..", "..bBBb..", "...bb...", "........", "........"]


def main():
    hechos = [
        guardar(tex_piedra(), "bloques", "piedra.png"),
        guardar(tex_tierra(), "bloques", "tierra.png"),
        guardar(tex_obsidiana(), "bloques", "obsidiana.png"),
        guardar(tex_arenisca(), "bloques", "arenisca_jeroglificos.png"),
        guardar(tex_mineral("esmeralda", CRISTALES_ESMERALDA), "bloques", "piedra_esmeralda.png"),
        guardar(tex_mineral("rubi", CRISTALES_RUBI), "bloques", "piedra_rubi.png"),
    ]
    for i, (nombre, px, py, ang) in enumerate(PICO_CUADROS):
        hechos.append(guardar(pico(px, py, ang), "pico", f"pico_{i}_{nombre}.png"))
    hechos += [
        guardar(gema(), "botin", "gema.png"),
        guardar(momia(0), "enemigos", "momia_idle_0.png"),
        guardar(momia(1), "enemigos", "momia_idle_1.png"),
        guardar(momia(0, dano=True), "enemigos", "momia_dano.png"),
        guardar(farol(0), "props", "farol_0.png"),
        guardar(farol(1), "props", "farol_1.png"),
        guardar(particula(CHISPA, {"o": c("calida", 2), "y": c("calida", 3), "W": c("calida", 4)}),
                "particulas", "chispa.png"),
        guardar(particula(POLVO, {"b": c("noche", 5), "B": c("noche", 6)}), "particulas", "polvo.png"),
    ]
    from gen_assets_fps import generar  # arte de la demo en primera persona
    hechos += generar()
    for ruta in hechos:
        print("ok", os.path.relpath(ruta, RAIZ))
    print(f"{len(hechos)} assets generados")


if __name__ == "__main__":
    main()
