"""Arte nuevo de la demo en primera persona (lo llama gen_assets.py).

Bloques, mapas de emisión, grietas, sprites, naturaleza y íconos a 64 px
por metro. Los colores salen solo de tools/palette.py.
"""
import numpy as np

import gen_assets as G
from gen_assets import (DESTELLO, LUZ, MEDIO, SOMBRA, T, Lienzo, colorear, guardar, mayoria,
                        ruido_periodico, tex_mineral, tonos_piedra, vecino, voronoi)
from palette import BRILLO, CRISTALES, ENGASTE, c

yy, xx = np.mgrid[0:T, 0:T]

# ---------------------------------------------------------------------------
# Bloques
# ---------------------------------------------------------------------------


def tex_roca_madre():
    """Roca madre: piedra violeta muy oscura, dura y lisa."""
    tono = tonos_piedra(77)
    return colorear(tono, [c("obsidiana", 0), c("violeta", 0), c("obsidiana", 1), c("violeta", 1), c("violeta", 2)])


CRISTALES_AZUFRE = [(13, 16, 5, 5), (23, 22, 3, 3.5), (44, 36, 6, 5), (52, 44, 3, 3.5),
                    (37, 46, 3, 3), (24, 50, 3.5, 3)]
CRISTALES_ORO = [(16, 14, 4, 3), (24, 18, 3, 3), (46, 30, 5, 4), (40, 38, 3, 3),
                 (18, 46, 4, 3), (52, 52, 3, 2.5)]
CRISTALES_ZAFIRO = [(15, 13, 3, 7), (23, 22, 2.5, 5), (46, 33, 3.5, 8), (53, 47, 2.5, 5),
                    (30, 48, 3, 6), (10, 40, 2.5, 4)]

MINERALES_COL = {
    "azufre": (c("calida", 2), c("calida", 3), c("arena", 2)),
    "oro": (c("oro", 0), c("oro", 2), c("arena", 2)),
    "zafiro": (c("noche", 3), c("zafiro", 0), c("noche", 6)),
}


def mineral(nombre, cristales, semilla_base=None):
    """Bloque con cristales; devuelve (textura, máscara de los cristales)."""
    if nombre in MINERALES_COL:
        CRISTALES[nombre] = MINERALES_COL[nombre]
    return tex_mineral(nombre, cristales, con_mascara=True)


def tex_estrato(k):
    """Capas onduladas de un solo color; k elige la rampa (violeta, teal, oro)."""
    rampas = [
        [c("violeta", 0), c("violeta", 1), c("violeta", 2), c("violeta", 3)],
        [c("teal", 0), c("teal", 1), c("teal", 2), c("teal", 3)],
        [c("oro", 0), c("oro", 1), c("oro", 2), c("arena", 2)],
    ]
    rng = np.random.default_rng(40 + k)
    r = ruido_periodico(4, rng)
    f = ruido_periodico(16, rng)
    v = np.sin(2 * np.pi * (4 * yy / T + 0.9 * r)) + 0.35 * f
    q = np.quantile(v, [0.25, 0.6, 0.9])
    tono = np.digitize(v, q)
    tono = mayoria(tono, 2)
    # Una veta fina más clara que atraviesa la capa.
    linea = (np.floor(yy + 5 * np.sin(2 * np.pi * xx / T)).astype(int) % 21) == 0
    tono[linea & (tono == 1)] = 0
    return colorear(tono, rampas[k]), rampas[k]


def mascara_capsula(x0, y0, x1, y1, r):
    vx, vy = x1 - x0, y1 - y0
    k = np.clip(((xx + .5 - x0) * vx + (yy + .5 - y0) * vy) / (vx * vx + vy * vy), 0, 1)
    return np.hypot(xx + .5 - (x0 + k * vx), yy + .5 - (y0 + k * vy)) <= r


def mascara_elipse(cx, cy, rx, ry):
    return ((xx + .5 - cx) / rx) ** 2 + ((yy + .5 - cy) / ry) ** 2 <= 1


def huesos(k):
    """Dibujo de los huesos de un fósil: pico viejo, calavera con fémur, costillar."""
    m = np.zeros((T, T), bool)
    hueco = np.zeros((T, T), bool)
    if k == 0:
        m |= mascara_capsula(14, 50, 44, 20, 2.2)
        m |= mascara_capsula(34, 14, 50, 30, 3.2)
        m |= mascara_elipse(50, 30, 3.5, 3.5)
        m |= mascara_elipse(34, 14, 3.5, 3.5)
    elif k == 1:
        m |= mascara_elipse(32, 24, 12, 10)
        m |= mascara_elipse(32, 35, 7, 5)
        hueco |= mascara_elipse(27, 24, 3, 3.5) | mascara_elipse(37, 24, 3, 3.5)
        hueco |= mascara_elipse(32, 31, 1.5, 2)
        m |= mascara_capsula(10, 52, 52, 46, 2.2)
        m |= mascara_elipse(10, 52, 3.2, 3.2) | mascara_elipse(52, 46, 3.2, 3.2)
    else:
        m |= mascara_capsula(32, 8, 32, 56, 2.2)
        for y in (16, 26, 36, 46):
            m |= mascara_capsula(32, y, 13, y + 7, 1.8)
            m |= mascara_capsula(32, y, 51, y + 7, 1.8)
    m &= ~hueco
    return m, hueco


def tex_fosil(k):
    base, rampa = tex_estrato(k)
    img = base.copy()
    m, hueco = huesos(k)
    borde = (vecino(m, 1, 0) | vecino(m, -1, 0) | vecino(m, 0, 1) | vecino(m, 0, -1)) & ~m
    img[borde] = rampa[0]
    img[m] = c("arena", 1)
    img[m & ~vecino(m, 1, 1)] = c("arena", 0)
    img[m & ~(vecino(m, -1, 0) & vecino(m, 0, -1))] = c("arena", 2)
    img[hueco] = c("obsidiana", 0)
    ys, xs = np.nonzero(m)
    i = np.argmin(ys * 64 + xs)
    img[ys[i], xs[i]] = BRILLO
    return img, m


def tex_empedrado():
    """Adoquines grandes irregulares con juntas oscuras."""
    ident, d1, d2, _, _, rng = voronoi(5, 91, estirar=1.0)
    junta = (d2 - d1) < 2.0
    solido = ~junta
    luz = solido & (vecino(junta, 1, 0) | vecino(junta, 0, 1))
    sombra = solido & (vecino(junta, -1, 0) | vecino(junta, 0, -1) | vecino(junta, -2, 0))
    tono = np.full((T, T), 2)
    tono[sombra] = 1
    tono[luz] = 3
    apagada = (rng.random(ident.max() + 1) < 0.4)[ident] & solido
    tono[apagada] = np.maximum(tono[apagada] - 1, 1)
    tono[junta] = 0
    return colorear(tono, [c("violeta", 0), c("noche", 2), c("noche", 3), c("noche", 4), c("noche", 5)])


def tex_adobe():
    """Ladrillos de adobe con juntas, desgaste suave."""
    rng = np.random.default_rng(3)
    fila = yy // 16
    bx = (xx - 16 * fila) % 32
    by = yy % 16
    tono = np.full((T, T), 2)
    r = ruido_periodico(4, rng)
    tono[mayoria((r > np.quantile(r, 0.8)).astype(int), 2) == 1] = 1
    tono[by == 15] = 1
    tono[bx == 31] = 1
    tono[by == 1] = 3
    tono[(bx == 1)] = 3
    tono[(by == 0) | (bx == 0)] = 0
    return colorear(tono, [c("oro", 0), c("arena", 0), c("arena", 1), c("arena", 2)])


def tex_madera():
    """Tablones verticales con vetas."""
    rng = np.random.default_rng(8)
    tabla = xx // 16
    bx = xx % 16
    tono = np.full((T, T), 2)
    r = ruido_periodico(8, rng)
    veta = (np.floor(bx + 3 * r[(yy % T), (xx % T)] * 4) % 5) == 0
    tono[veta] = 1
    tono[bx == 1] = 3
    tono[bx == 0] = 0
    tono[bx == 15] = 1
    for i in range(4):  # clavos
        tono[(yy == 6) & (bx == 8) & (tabla == i)] = 0
        tono[(yy == 58) & (bx == 8) & (tabla == i)] = 0
    return colorear(tono, [c("calida", 0), c("oro", 0), c("arena", 0), c("arena", 1)])


def tex_teja():
    """Tejas curvas de barro en hileras desfasadas."""
    fila = yy // 16
    bx = (xx + 8 * (fila % 2)) % 16
    by = yy % 16
    tono = np.full((T, T), 2)
    tono[by >= 12] = 1
    tono[by >= 14] = 0
    tono[by < 2] = 3
    tono[(bx == 0) & (by < 14)] = 1
    tono[(bx == 1) & (by < 12)] = 3
    # Cada teja se curva: dos pixeles claros en el lomo.
    tono[(bx >= 5) & (bx <= 9) & (by >= 4) & (by <= 6)] = 3
    return colorear(tono, [c("violeta", 0), c("calida", 0), c("calida", 1), c("calida", 2)])


# ---------------------------------------------------------------------------
# Emisión (solo los píxeles que brillan; el resto transparente)
# ---------------------------------------------------------------------------


def emision(img, mascara):
    out = np.zeros((T, T, 4), np.uint8)
    out[mascara, :3] = img[mascara]
    out[mascara, 3] = 255
    return out


def emision_arenisca():
    img = G.tex_arenisca()
    m = (img == np.array(c("teal", 3), np.uint8)).all(axis=2)
    return emision(img, m)


# ---------------------------------------------------------------------------
# Grietas
# ---------------------------------------------------------------------------


def grietas():
    rng = np.random.default_rng(12)
    lineas = []
    for _ in range(14):
        x, y = rng.uniform(20, 44, 2)
        ang = rng.uniform(0, 2 * np.pi)
        pts = []
        for _ in range(int(rng.integers(10, 22))):
            pts.append((int(x), int(y)))
            ang += rng.uniform(-0.7, 0.7)
            x += np.cos(ang) * 1.5
            y += np.sin(ang) * 1.5
            if not (2 <= x < 62 and 2 <= y < 62):
                break
        lineas.append(pts)
    cuentas = [2, 4, 7, 10, 14]
    oscuro, claro = c("obsidiana", 0), c("noche", 6)
    salida = []
    for k in range(5):
        out = np.zeros((T, T, 4), np.uint8)
        for pts in lineas[:cuentas[k]]:
            largo = max(3, int(len(pts) * (0.45 + 0.1 * k))) if k < 4 else len(pts)
            for (px, py) in pts[:largo]:
                out[py, px] = (*claro, 255) if (px + py) % 7 == 0 else (*oscuro, 255)
        # Un hilo oscuro más grueso desde el estadio 2.
        if k >= 2:
            capa = out[..., 3] > 0
            lado = vecino(capa, 0, 1) & ~capa
            out[lado, :3] = oscuro
            out[lado, 3] = 255
        salida.append(out)
    return salida


# ---------------------------------------------------------------------------
# Sprites
# ---------------------------------------------------------------------------


def torogoz(cuadro):
    lz = Lienzo(32, 32)
    # Cola larga con la punta azul.
    lz.pintar(lz.capsula(10, 17, 2, 28, 1.4), "pluma_cola", MEDIO)
    lz.pintar(lz.capsula(10, 16, 4, 26, 1.4), "guante", MEDIO)
    lz.pintar(lz.elipse(2.5, 28.5, 2.2, 2.6), "pluma_cola")
    # Cuerpo, pecho rojo y cabeza.
    lz.pintar(lz.elipse(16, 17, 8, 5.5), "guante")
    lz.pintar(lz.elipse(19, 20, 5, 3), "rubi", MEDIO)
    lz.pintar(lz.elipse(22, 13, 5, 5), "guante")
    lz.pintar(lz.rect(26, 12, 30, 14), "oro", MEDIO)  # pico
    lz.pintar(lz.rect(23, 11, 25, 13), "hueco", MEDIO)
    lz.retocar(lz.rect(23, 11, 24, 12), DESTELLO, "hueco")
    # Ala arriba o abajo.
    if cuadro == 0:
        ala = lz.capsula(14, 16, 10, 5, 3.2)
    else:
        ala = lz.capsula(14, 17, 9, 24, 3.2)
    lz.pintar(ala, "izote", MEDIO)
    lz.retocar(ala & (lz.y < 12), LUZ, "izote")
    return lz.render()


def personaje(tipo, cuadro):
    """Don Chepe (con pico, dos cuadros) y el vendedor (con farol)."""
    lz = Lienzo(64, 96)
    sub = 0 if cuadro == 0 else 2
    # Piernas y botas.
    for x0 in (23, 33):
        lz.pintar(lz.rect(x0, 62, x0 + 8, 90), "tela")
        lz.pintar(lz.rect(x0 - 1, 87, x0 + 10, 93), "madera", SOMBRA)
    # Torso.
    torso = lz.rect(19, 34, 45, 64)
    lz.pintar(torso, "manga" if tipo == "chepe" else "tela", luz=2, sombra=3)
    if tipo == "vendedor":
        lz.pintar(lz.rect(22, 44, 42, 70), "madera", MEDIO)  # delantal
        lz.retocar(lz.rect(22, 44, 23, 70), LUZ, "madera")
        lz.pintar(lz.rect(28, 56, 36, 63), "madera", SOMBRA)  # bolsillo
    # Cabeza y sombrero.
    lz.pintar(lz.elipse(32, 22, 9.5, 11), "piel", luz=2, sombra=3)
    lz.pintar(lz.rect(26, 21, 29, 23), "hueco", MEDIO)
    lz.pintar(lz.rect(35, 21, 38, 23), "hueco", MEDIO)
    if tipo == "vendedor":
        lz.pintar(lz.rect(28, 28, 37, 30), "hueco", SOMBRA)  # bigote
    if tipo == "chepe":
        lz.pintar(lz.elipse(32, 12, 12, 6.5) & (lz.y < 14), "acero", MEDIO)   # casco
        lz.pintar(lz.rect(18, 12, 46, 15), "acero", SOMBRA)
        lz.pintar(lz.elipse(32, 10, 3, 2.6), "fuego", DESTELLO)               # linterna
    else:
        lz.pintar(lz.elipse(32, 12, 19, 4.5), "madera", MEDIO)                # ala del sombrero
        lz.pintar(lz.elipse(32, 8, 9, 7) & (lz.y < 12), "madera", MEDIO)
    # Brazos.
    if tipo == "chepe":
        mx, my = (50, 24 - 0) if cuadro == 0 else (47, 60)
        lz.pintar(lz.capsula(44, 40, mx, my, 4.2), "manga", luz=2, sombra=3)
        lz.pintar(lz.elipse(mx, my, 5, 5), "piel", MEDIO)
        lz.pintar(lz.capsula(20, 40, 14, 58, 4.2), "manga", luz=2, sombra=3)
        lz.pintar(lz.elipse(14, 60, 5, 5), "piel", MEDIO)
        # Pico: mango y cabeza de acero.
        if cuadro == 0:
            lz.pintar(lz.capsula(mx, my + 3, mx - 5, my - 22, 1.8), "madera", MEDIO)
            lz.pintar(lz.capsula(mx - 15, my - 24, mx + 6, my - 26, 2.6), "acero", MEDIO)
        else:
            lz.pintar(lz.capsula(mx, my - 3, mx + 8, my + 28, 1.8), "madera", MEDIO)
            lz.pintar(lz.capsula(mx + 1, my + 30, mx + 20, my + 27, 2.6), "acero", MEDIO)
    else:
        lz.pintar(lz.capsula(44, 40, 51, 54, 4.2), "tela", luz=2, sombra=3)
        lz.pintar(lz.elipse(51, 56, 5, 5), "piel", MEDIO)
        lz.pintar(lz.capsula(20, 40, 14, 56, 4.2), "tela", luz=2, sombra=3)
        lz.pintar(lz.elipse(14, 58, 5, 5), "piel", MEDIO)
        # Farol en la mano.
        lz.pintar(lz.rect(46, 60, 58, 78), "hierro", MEDIO)
        lz.pintar(lz.rect(48, 63, 56, 76), "fuego", MEDIO)
        lz.pintar(lz.rect(50, 66, 54, 74), "fuego", DESTELLO)
    return lz.render()


def pino():
    lz = Lienzo(128, 192)
    lz.pintar(lz.rect(58, 150, 70, 190), "madera")
    pisos = [(10, 70, 36), (52, 112, 50), (96, 160, 62)]
    for y0, y1, ancho in pisos:
        m = (lz.y >= y0) & (lz.y < y1) & (np.abs(lz.x - 64) <= (lz.y - y0) / (y1 - y0) * ancho + 2)
        lz.pintar(m, "pino", luz=2, sombra=4)
        # Ramas: muescas de sombra en el borde.
        for k in range(1, 4):
            yb = y0 + (y1 - y0) * k / 4
            lz.retocar(m & (np.abs(lz.y - yb) < 1.2), SOMBRA, "pino")
    return lz.render()


def izote():
    lz = Lienzo(64, 128)
    lz.pintar(lz.rect(28, 56, 36, 126), "madera")
    for yb in range(62, 120, 9):
        lz.retocar(lz.rect(28, yb, 36, yb + 2), SOMBRA, "madera")
    # Penacho de hojas en abanico.
    for ang in np.linspace(-150, -30, 9):
        a = np.radians(ang)
        lz.pintar(lz.capsula(32, 56, 32 + 28 * np.cos(a), 56 + 30 * np.sin(a) + 8, 2.2), "izote", MEDIO)
    lz.pintar(lz.elipse(32, 52, 6, 6), "izote", LUZ)
    lz.retocar(lz.elipse(32, 49, 2, 2), DESTELLO, "izote")
    return lz.render()


def fogata(cuadro):
    lz = Lienzo(64, 64)
    # Troncos cruzados.
    lz.pintar(lz.capsula(10, 56, 54, 48, 4), "madera", MEDIO)
    lz.pintar(lz.capsula(12, 48, 52, 57, 4), "madera", SOMBRA)
    lz.retocar(lz.rect(0, 0, 64, 52) & (lz.mat > 0), LUZ, "madera")
    # Llama que cambia de forma en los 3 cuadros.
    ancho = (9, 7, 8)[cuadro]
    alto = (36, 42, 33)[cuadro]
    desvio = (0, -2, 2)[cuadro]
    base = lz.elipse(32, 46, ancho, 7)
    cuerpo = (np.abs(lz.x - 32 - desvio * (46 - lz.y) / 46) <= ancho * np.maximum(0, 1 - (46 - lz.y) / alto) ** 0.8) & (lz.y < 46) & (lz.y > 46 - alto)
    lz.pintar(base | cuerpo, "fuego", SOMBRA)
    nucleo = (np.abs(lz.x - 32 - desvio * (46 - lz.y) / 60) <= ancho * 0.6 * np.maximum(0, 1 - (46 - lz.y) / (alto * 0.8)) ** 0.8) & (lz.y < 46) & (lz.y > 46 - alto * 0.8)
    lz.pintar(nucleo | lz.elipse(32, 46, ancho * 0.6, 4.5), "fuego", MEDIO)
    lz.pintar(lz.elipse(32 + desvio / 2, 44, 3, 6), "fuego", LUZ)
    lz.pintar(lz.elipse(32 + desvio / 2, 46, 1.8, 3), "fuego", DESTELLO)
    return lz.render()


LETRAS = {
    "T": ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
    "I": [".###.", "..#..", "..#..", "..#..", "..#..", "..#..", ".###."],
    "E": ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
    "N": ["#...#", "##..#", "##..#", "#.#.#", "#..##", "#..##", "#...#"],
    "D": ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
    "A": [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
}


def rotulo():
    lz = Lienzo(128, 32)
    lz.pintar(lz.rect(2, 3, 126, 29), "madera", MEDIO, luz=2, sombra=3)
    lz.pintar(lz.rect(2, 3, 126, 5), "madera", LUZ)
    lz.pintar(lz.rect(2, 27, 126, 29), "madera", SOMBRA)
    x0 = 29
    for ch in "TIENDA":
        for j, fila in enumerate(LETRAS[ch]):
            for i, v in enumerate(fila):
                if v == "#":
                    lz.pintar(lz.rect(x0 + i * 2, 9 + j * 2, x0 + i * 2 + 2, 9 + j * 2 + 2), "hueco", MEDIO)
        x0 += 12
    for cx in (8, 120):
        lz.pintar(lz.rect(cx - 1, 15, cx + 1, 17), "hierro", LUZ)
    return lz.render()


def volcan():
    lz = Lienzo(256, 96)
    # Cadena lejana más clara y volcán principal.
    lejos = (lz.y >= 56 + 10 * np.sin(lz.x / 17.0) - np.maximum(0, 18 - np.abs(lz.x - 40) / 3))
    lz.pintar(lejos & (lz.y < 96), "volcan_lejano", MEDIO, luz=2, sombra=6)
    perfil = 90 - np.maximum(0, 74 - np.abs(lz.x - 150) * 0.62) - 3 * np.sin(lz.x / 5.0)
    crater = (np.abs(lz.x - 150) < 14) & (lz.y < 24)
    cono = (lz.y >= perfil) & ~crater
    lz.pintar(cono, "volcan", MEDIO, luz=2, sombra=7)
    # Cara en sombra del lado derecho.
    lz.retocar(cono & (lz.x > 156) & (np.sin(lz.x * 0.9 + lz.y * 0.25) > 0.25), SOMBRA, "volcan")
    # Resplandor del cráter.
    lz.pintar(lz.rect(142, 14, 158, 17) & ~(lz.mat == 0), "volcan", DESTELLO)
    lz.retocar(lz.rect(146, 14, 154, 16), DESTELLO, "volcan")
    return lz.render()


# ---------------------------------------------------------------------------
# Íconos 32x32
# ---------------------------------------------------------------------------


def icono_gema(material):
    lz = Lienzo(32, 32)
    cx = 16
    corona = (lz.y >= 6) & (lz.y < 12) & (np.abs(lz.x - cx) <= 6 + (lz.y - 6) * 0.9)
    pabellon = (lz.y >= 12) & (lz.y < 27) & (np.abs(lz.x - cx) <= 11.4 * (1 - (lz.y - 12) / 15))
    dx = lz.x - cx
    lz.pintar(corona, material, LUZ)
    lz.retocar(corona & (dx > 3), MEDIO, material)
    lz.pintar(pabellon, material, MEDIO)
    lz.retocar(pabellon & (dx > 2 - (lz.y - 12) * 0.1), SOMBRA, material)
    lz.retocar(pabellon & (dx < -3) & (dx > -6 + (lz.y - 12) * 0.25), LUZ, material)
    lz.retocar(lz.rect(4, 12, 28, 13), LUZ, material)
    lz.retocar(lz.rect(10, 7, 13, 9), DESTELLO, material)
    return lz.render()


def icono_azufre():
    lz = Lienzo(32, 32)
    for cx, cy, rx, ry in ((11, 21, 7, 6), (21, 20, 8, 7), (16, 12, 6.5, 6)):
        lz.pintar(lz.elipse(cx, cy, rx, ry), "azufre", luz=2, sombra=3)
    lz.retocar(lz.rect(12, 7, 15, 9), DESTELLO, "azufre")
    return lz.render()


def icono_oro():
    lz = Lienzo(32, 32)
    barra = (lz.y >= 11) & (lz.y < 25) & (np.abs(lz.x - 16) <= 7 + (lz.y - 11) * 0.5)
    lz.pintar(barra, "oro", MEDIO)
    lz.retocar(barra & (lz.y < 14), LUZ, "oro")
    lz.retocar(barra & (lz.y >= 22), SOMBRA, "oro")
    lz.retocar(lz.rect(10, 12, 14, 13), DESTELLO, "oro")
    return lz.render()


def icono_pico():
    lz = Lienzo(32, 32)
    lz.pintar(lz.capsula(7, 27, 22, 10, 1.6), "madera", MEDIO)
    lz.pintar(lz.capsula(11, 6, 27, 20, 2.6), "acero", MEDIO)
    lz.retocar(lz.rect(0, 0, 32, 32) & (lz.y < 11) & (lz.mat > 0), LUZ, "acero")
    lz.retocar(lz.rect(12, 6, 14, 8), DESTELLO, "acero")
    return lz.render()


def icono_chepe():
    lz = Lienzo(32, 32)
    lz.pintar(lz.elipse(16, 17, 9, 9), "piel", luz=2, sombra=3)
    lz.pintar(lz.elipse(16, 10, 11, 6) & (lz.y < 12), "acero", MEDIO)
    lz.pintar(lz.rect(5, 11, 27, 13), "acero", SOMBRA)
    lz.pintar(lz.rect(11, 16, 14, 19), "hueco", MEDIO)
    lz.pintar(lz.rect(18, 16, 21, 19), "hueco", MEDIO)
    lz.pintar(lz.rect(14, 23, 19, 25), "hueco", SOMBRA)
    lz.pintar(lz.elipse(16, 8, 2, 2), "fuego", DESTELLO)
    return lz.render()


def icono_iman():
    lz = Lienzo(32, 32)
    arco = (np.hypot(lz.x - 16, lz.y - 17) <= 11) & (np.hypot(lz.x - 16, lz.y - 17) >= 5) & (lz.y < 18)
    lz.pintar(arco, "rubi", luz=2, sombra=3)
    for x0 in (5, 21):
        lz.pintar(lz.rect(x0, 17, x0 + 6, 26), "rubi", luz=2, sombra=3)
        lz.pintar(lz.rect(x0, 23, x0 + 6, 27), "acero", MEDIO)
    lz.retocar(lz.rect(9, 6, 12, 8), DESTELLO, "rubi")
    return lz.render()


def icono_brasa():
    lz = Lienzo(32, 32)
    lz.pintar(lz.elipse(16, 21, 10, 7), "hierro", MEDIO)
    lz.pintar(lz.elipse(16, 22, 7, 4), "fuego", SOMBRA)
    llama = (np.abs(lz.x - 16) <= 6 * np.maximum(0, 1 - (22 - lz.y) / 18) ** 0.8) & (lz.y < 22) & (lz.y > 5)
    lz.pintar(llama, "fuego", MEDIO)
    lz.pintar(lz.elipse(16, 19, 3, 5), "fuego", LUZ)
    lz.pintar(lz.elipse(16, 21, 1.6, 2.5), "fuego", DESTELLO)
    return lz.render()


# ---------------------------------------------------------------------------


def generar():
    hechos = []

    def g(arr, *ruta):
        hechos.append(guardar(arr, *ruta))

    g(tex_roca_madre(), "bloques", "roca_madre.png")
    minerales = {
        "piedra_azufre": ("azufre", CRISTALES_AZUFRE),
        "piedra_oro": ("oro", CRISTALES_ORO),
        "piedra_zafiro": ("zafiro", CRISTALES_ZAFIRO),
    }
    for archivo, (nombre, lista) in minerales.items():
        img, m = mineral(nombre, lista)
        g(img, "bloques", archivo + ".png")
        g(emision(img, m), "emision", archivo + ".png")
    # Esmeralda y rubí ya existen como bloque; solo se les saca la emisión.
    img, m = tex_mineral("esmeralda", G.CRISTALES_ESMERALDA, con_mascara=True)
    g(emision(img, m), "emision", "piedra_esmeralda.png")
    img, m = tex_mineral("rubi", G.CRISTALES_RUBI, con_mascara=True)
    g(emision(img, m), "emision", "piedra_rubi.png")
    g(emision_arenisca(), "emision", "arenisca_jeroglificos.png")

    for k in range(3):
        g(tex_estrato(k)[0], "bloques", f"estrato_{k}.png")
        img, m = tex_fosil(k)
        g(img, "bloques", f"fosil_{k}.png")
        g(emision(img, m), "emision", f"fosil_{k}.png")
    g(tex_empedrado(), "bloques", "empedrado.png")
    g(tex_adobe(), "bloques", "adobe.png")
    g(tex_madera(), "bloques", "madera.png")
    g(tex_teja(), "bloques", "teja.png")

    for i, arr in enumerate(grietas()):
        g(arr, "grietas", f"grieta_{i}.png")

    g(torogoz(0), "mascotas", "torogoz_0.png")
    g(torogoz(1), "mascotas", "torogoz_1.png")
    g(personaje("chepe", 0), "personajes", "chepe_0.png")
    g(personaje("chepe", 1), "personajes", "chepe_1.png")
    g(personaje("vendedor", 0), "personajes", "vendedor.png")
    g(pino(), "naturaleza", "pino.png")
    g(izote(), "naturaleza", "izote.png")
    for i in range(3):
        g(fogata(i), "fuego", f"fogata_{i}.png")
    g(rotulo(), "rotulos", "tienda.png")
    g(volcan(), "cielo", "volcan.png")

    g(icono_azufre(), "iconos", "mineral_azufre.png")
    g(icono_oro(), "iconos", "mineral_oro.png")
    g(icono_gema("esmeralda"), "iconos", "mineral_esmeralda.png")
    g(icono_gema("rubi"), "iconos", "mineral_rubi.png")
    g(icono_gema("zafiro"), "iconos", "mineral_zafiro.png")
    g(icono_pico(), "iconos", "fosil_rompefilas.png")
    g(icono_chepe(), "iconos", "fosil_don_chepe.png")
    g(icono_iman(), "iconos", "fosil_iman.png")
    g(icono_brasa(), "iconos", "fosil_brasa.png")
    return hechos
