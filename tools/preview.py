"""Render de prueba: falso primera persona vertical de 270x480.

Uso:  python tools/preview.py   ->  out/preview.png (x3, vecino más cercano)

Es un raycaster sencillo estilo Wolfenstein sobre un pasillo de mina, con los
sprites como billboards y un pase de luz y posproceso para juzgar el look.
No es código del juego: solo sirve para ver los assets juntos.
"""
import math
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import BRILLO, CRISTALES, c  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(RAIZ, "assets")
OUT = os.path.join(RAIZ, "out")

W, H = 270, 480
ESCALA = 3
T = 64
PROY = (W / 2) / math.tan(math.radians(62 / 2))  # distancia al plano de proyección
HORIZ = H * 0.47
OJO, ALTO = 1.0, 2.0   # altura de la cámara y del pasillo, en metros

# Mapa: '.' es hueco. P piedra, T tierra, O obsidiana, A arenisca, E esmeralda, R rubí.
# Cada fila es un valor de y (la cámara mira hacia y creciente).
NIVEL_BAJO = [
    "PPPPPPPP",
    "PP..PPPP",
    "PP..PPPP",
    "PE..PPPP",
    "PP..RPPP",
    "PT..PPPP",
    "PT..OPPP",
    "PP..OPPP",
    "PP....PP",
    "PP....PP",
    "PAAAAAAP",
]
NIVEL_ALTO = [
    "PPPPPPPP",
    "PP..PPPP",
    "PP..OPPP",
    "PP..PPPP",
    "PE..PPPP",
    "PT..RPPP",
    "PP..PPPP",
    "PP..OPPP",
    "PP....PP",
    "PP....PP",
    "PAAAAAAP",
]
NIVELES = (NIVEL_BAJO, NIVEL_ALTO)
ARCHIVO = {"P": "piedra", "T": "tierra", "O": "obsidiana", "A": "arenisca_jeroglificos",
           "E": "piedra_esmeralda", "R": "piedra_rubi"}

CAM = np.array([3.0, 1.15])
GIRO = math.radians(-2.0)
FRENTE = np.array([math.sin(GIRO), math.cos(GIRO)])
DERECHA = np.array([math.cos(GIRO), -math.sin(GIRO)])

FAROL = (2.38, 4.2)        # farol visible, a la izquierda
MOMIA = (3.15, 5.2)
FAROL_LEJOS = (2.5, 9.3)   # farol del fondo: queda desenfocado

CALIDA = np.array([1.0, 0.60, 0.26])
AMBIENTE = np.array([0.17, 0.30, 0.64])
# Luces puntuales: posición (x, y, z), color, intensidad y caída.
LUCES = [
    ((FAROL[0] + 0.05, FAROL[1] - 0.18, 0.62), CALIDA, 3.2, 1.5),
    ((5.0, 8.7, 0.9), CALIDA, 4.5, 0.9),
    ((FAROL_LEJOS[0], FAROL_LEJOS[1] - 0.2, 0.62), CALIDA, 2.6, 1.5),                      # farol oculto tras la esquina
    ((2.12, 3.5, 0.5), np.array([0.25, 1.0, 0.5]), 0.9, 4.0),  # esmeralda
    ((2.12, 4.5, 1.5), np.array([0.25, 1.0, 0.5]), 0.7, 4.0),
    ((3.88, 4.5, 0.5), np.array([1.0, 0.25, 0.3]), 0.9, 4.0),  # rubí
    ((3.88, 5.5, 1.5), np.array([1.0, 0.25, 0.3]), 0.7, 4.0),
]


def suave(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def desenfocar(img, sigma):
    """Desenfoque gaussiano separable."""
    r = int(math.ceil(sigma * 2.5))
    k = np.exp(-np.arange(-r, r + 1) ** 2 / (2 * sigma ** 2))
    k /= k.sum()
    for eje in (0, 1):
        relleno = [(0, 0)] * img.ndim
        relleno[eje] = (r, r)
        p = np.pad(img, relleno, mode="edge")
        acc = np.zeros_like(img)
        for i, peso in enumerate(k):
            corte = [slice(None)] * img.ndim
            corte[eje] = slice(i, i + img.shape[eje])
            acc += peso * p[tuple(corte)]
        img = acc
    return img


def cargar(*ruta):
    return np.asarray(Image.open(os.path.join(ASSETS, *ruta)).convert("RGBA")).astype(float) / 255


def emision(img, colores, fuerza):
    """Los píxeles de esos colores emiten luz propia."""
    rgb8 = np.round(img[..., :3] * 255).astype(int)
    m = np.zeros(img.shape[:2], bool)
    for col in colores:
        m |= (rgb8 == np.array(col)).all(-1)
    return img[..., :3] * m[..., None] * fuerza


def cargar_texturas():
    emisivos = {
        "E": [*CRISTALES["esmeralda"][1:], BRILLO],
        "R": [*CRISTALES["rubi"][1:], BRILLO],
        "A": [c("teal", 3)],
    }
    tex = {}
    for clave, nombre in ARCHIVO.items():
        img = cargar("bloques", nombre + ".png")
        tex[clave] = (img[..., :3], emision(img, emisivos.get(clave, []), 1.5))
    return tex


def lanzar(dx, dy):
    """DDA: devuelve distancia perpendicular, celda golpeada, coordenada u y normal."""
    mx, my = int(CAM[0]), int(CAM[1])
    ddx = abs(1 / dx) if dx else 1e30
    ddy = abs(1 / dy) if dy else 1e30
    px, py = (1 if dx > 0 else -1), (1 if dy > 0 else -1)
    lx = ((mx + 1 - CAM[0]) if dx > 0 else (CAM[0] - mx)) * ddx
    ly = ((my + 1 - CAM[1]) if dy > 0 else (CAM[1] - my)) * ddy
    while True:
        if lx < ly:
            lx += ddx
            mx += px
            lado = 0
        else:
            ly += ddy
            my += py
            lado = 1
        if NIVEL_BAJO[my][mx] != ".":
            break
    t = (lx - ddx) if lado == 0 else (ly - ddy)
    if lado == 0:
        return t, mx, my, (CAM[1] + t * dy) % 1, (-px, 0)
    return t, mx, my, (CAM[0] + t * dx) % 1, (0, -py)


def trazar_escena(tex):
    """Rellena los búferes: color base, emisión, posición, normal y profundidad."""
    alb = np.zeros((H, W, 3))
    emi = np.zeros((H, W, 3))
    pos = np.zeros((H, W, 3))
    nor = np.zeros((H, W, 3))
    camx = (np.arange(W) + 0.5 - W / 2) / PROY
    pend = (HORIZ - (np.arange(H) + 0.5)) / PROY          # subida por metro de avance
    rayo = FRENTE[None, :] + DERECHA[None, :] * camx[:, None]   # (W, 2)

    # Suelo y techo.
    t = np.where(pend > 0, (ALTO - OJO) / np.maximum(pend, 1e-6), OJO / np.maximum(-pend, 1e-6))
    t = np.minimum(t, 60.0)
    prof = np.repeat(t[:, None], W, 1)
    pos[..., 0] = CAM[0] + prof * rayo[None, :, 0]
    pos[..., 1] = CAM[1] + prof * rayo[None, :, 1]
    pos[..., 2] = np.where(pend > 0, ALTO, 0.0)[:, None]
    nor[..., 2] = np.where(pend > 0, -1.0, 1.0)[:, None]
    tu = (pos[..., 0] % 1 * T).astype(int) % T
    tv = (pos[..., 1] % 1 * T).astype(int) % T
    techo = (pend > 0)[:, None]
    alb[:] = np.where(techo[..., None], tex["P"][0][tv, tu], tex["T"][0][tv, tu])

    # Paredes, columna a columna.
    for x in range(W):
        tw, mx, my, u, n = lanzar(rayo[x, 0], rayo[x, 1])
        z = OJO + tw * pend
        filas = np.where((z >= 0) & (z < ALTO))[0]
        zz = z[filas]
        fila_tex = np.clip(((1 - zz % 1) * T).astype(int), 0, T - 1)
        col_tex = int(u * T) % T
        for nivel in (0, 1):
            sel = (zz >= 1) == bool(nivel)
            base, luz = tex[NIVELES[nivel][my][mx]]
            alb[filas[sel], x] = base[fila_tex[sel], col_tex]
            emi[filas[sel], x] = luz[fila_tex[sel], col_tex]
        pos[filas, x, 0] = CAM[0] + tw * rayo[x, 0]
        pos[filas, x, 1] = CAM[1] + tw * rayo[x, 1]
        pos[filas, x, 2] = zz
        nor[filas, x] = (n[0], n[1], 0)
        prof[filas, x] = tw
    return alb, emi, pos, nor, prof


def proyectar(wx, wy):
    rel = np.array([wx, wy]) - CAM
    t = rel @ FRENTE
    return W / 2 + (rel @ DERECHA) / t * PROY, t, PROY / t


def billboard(buf, spr, luz, wx, wy, ancho_m, alto_m, z0=0.0):
    """Dibuja un sprite mirando a la cámara dentro de los búferes."""
    alb, emi, pos, nor, prof = buf
    cx, t, esc = proyectar(wx, wy)
    x0, x1 = cx - ancho_m * esc / 2, cx + ancho_m * esc / 2
    y0, y1 = HORIZ - (z0 + alto_m - OJO) * esc, HORIZ - (z0 - OJO) * esc
    xs = np.arange(max(0, int(math.floor(x0))), min(W, int(math.ceil(x1))))
    ys = np.arange(max(0, int(math.floor(y0))), min(H, int(math.ceil(y1))))
    u = (xs + 0.5 - x0) / (x1 - x0)
    v = (ys + 0.5 - y0) / (y1 - y0)
    xs, u = xs[(u >= 0) & (u < 1)], u[(u >= 0) & (u < 1)]
    ys, v = ys[(v >= 0) & (v < 1)], v[(v >= 0) & (v < 1)]
    sh, sw = spr.shape[:2]
    iy, ix = np.ix_((v * sh).astype(int), (u * sw).astype(int))
    gy, gx = np.ix_(ys, xs)
    m = (spr[iy, ix, 3] > 0.5) & (prof[gy, gx] > t)
    yy, xx = np.broadcast_arrays(gy, gx)
    yy, xx = yy[m], xx[m]
    uu = np.broadcast_to(u[None, :], m.shape)[m]
    vv = np.broadcast_to(v[:, None], m.shape)[m]
    alb[yy, xx] = spr[iy, ix, :3][m]
    emi[yy, xx] = luz[iy, ix][m]
    lateral = (uu - 0.5) * ancho_m
    pos[yy, xx, 0] = wx + DERECHA[0] * lateral
    pos[yy, xx, 1] = wy + DERECHA[1] * lateral
    pos[yy, xx, 2] = z0 + (1 - vv) * alto_m
    # Normal hacia la cámara, abombada hacia los lados para que la luz modele el sprite.
    n = np.zeros((len(yy), 3))
    n[:, :2] = -FRENTE[None, :] + DERECHA[None, :] * ((uu - 0.5) * 1.6)[:, None]
    nor[yy, xx] = n / np.linalg.norm(n, axis=1, keepdims=True)
    prof[yy, xx] = t


def iluminar(alb, emi, pos, nor):
    # Oclusión falsa: las paredes se oscurecen cerca del suelo y del techo.
    pared = np.abs(nor[..., 2]) < 0.5
    z = pos[..., 2]
    ao = np.where(pared, 0.55 + 0.45 * suave(0, 0.55, np.minimum(z, ALTO - z)),
                  np.where(z > 1, 0.6, 0.9))
    luz = AMBIENTE[None, None, :] * ao[..., None]
    directa = np.zeros_like(alb)
    for lp, col, fuerza, caida in LUCES:
        d = np.array(lp)[None, None, :] - pos
        dist2 = (d * d).sum(-1)
        lam = np.clip((nor * d).sum(-1) / np.sqrt(dist2 + 1e-6) + 0.05, 0, 1)
        directa += col[None, None, :] * (fuerza * lam / (1 + caida * dist2))[..., None]
    luma = (alb @ np.array([0.3, 0.5, 0.2]))[..., None]
    # De noche el color se apaga: la luz ambiente ve el color base medio desaturado.
    frio = alb * 0.3 + luma * 0.7
    # La luz directa multiplica el color base y además lo baña un poco con su tono.
    return frio * luz + alb * directa + directa * luma * 0.22 + emi


def sumar(img, x, y, sprite, fuerza):
    """Suma un sprite pequeño (aditivo) recortando en los bordes."""
    h, w = sprite.shape[:2]
    x, y = int(round(x - w / 2)), int(round(y - h / 2))
    x0, y0, x1, y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if x0 >= x1 or y0 >= y1:
        return
    trozo = sprite[y0 - y:y1 - y, x0 - x:x1 - x]
    img[y0:y1, x0:x1] += trozo[..., :3] * trozo[..., 3:4] * fuerza


def disco(img, x, y, radio, color):
    """Mota desenfocada (bokeh) para el polvo cercano."""
    r = int(math.ceil(radio)) + 1
    yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
    forma = suave(radio + 0.6, radio - 0.6, np.hypot(xx, yy))
    spr = np.concatenate([np.broadcast_to(color, (*forma.shape, 3)), forma[..., None]], -1)
    sumar(img, x, y, spr, 1.0)


def render():
    tex = cargar_texturas()
    buf = trazar_escena(tex)
    alb, emi, pos, nor, prof = buf

    # Sombra redonda bajo la momia y el farol.
    suelo = nor[..., 2] > 0.5
    for (sx, sy), radio, fuerza in ((MOMIA, 0.42, 0.6), (FAROL, 0.2, 0.45)):
        d2 = ((pos[..., 0] - sx) ** 2 + (pos[..., 1] - sy) ** 2) / radio ** 2
        alb *= 1 - (fuerza * np.exp(-d2) * suelo)[..., None]

    momia = cargar("enemigos", "momia_idle_0.png")
    farol = cargar("props", "farol_0.png")
    billboard(buf, momia, emision(momia, [c("teal", 2), c("teal", 3), BRILLO], 1.6),
              *MOMIA, 1.0, 1.5)
    billboard(buf, farol, emision(farol, [c("calida", 2), c("calida", 3), c("calida", 4)], 1.5),
              *FAROL, 0.5, 1.0)
    billboard(buf, farol, emision(farol, [c("calida", 2), c("calida", 3), c("calida", 4)], 2.2),
              *FAROL_LEJOS, 0.5, 1.0)

    img = iluminar(alb, emi, pos, nor)

    # Niebla azul-violeta con la distancia, más violeta hacia arriba.
    yy, xx = np.mgrid[0:H, 0:W]
    niebla = (np.array([0.07, 0.15, 0.30])[None, None, :] * (yy / H)[..., None]
              + np.array([0.15, 0.11, 0.34])[None, None, :] * (1 - yy / H)[..., None])
    f = (1 - np.exp(-(prof * 0.125) ** 1.5))[..., None]
    img = img * (1 - f) + niebla * f

    # Resplandor del farol en la niebla.
    fx, ft, fesc = proyectar(*FAROL)
    fy = HORIZ - (0.6 - OJO) * fesc
    halo = np.exp(-((xx - fx) ** 2 + (yy - fy) ** 2) / (0.8 * fesc) ** 2)
    img += CALIDA[None, None, :] * (halo * 0.30 * (prof > ft - 0.4))[..., None]

    # Haz frío diagonal que entra desde arriba a la izquierda.
    eje = (xx - 28 - yy * 0.24) / (16 + yy * 0.10)
    haz = np.exp(-eje ** 2) * suave(1.05, 0.1, yy / H) * suave(2.0, 4.0, prof)
    img += np.array([0.20, 0.42, 0.85])[None, None, :] * (haz * 0.30)[..., None]

    # Desenfoque: lejanía y franjas superior e inferior.
    cant = np.maximum(suave(5.5, 9.5, prof), 0.85 * suave(0.30, 0.50, np.abs(yy / H - 0.5)))
    medio, fuerte = desenfocar(img, 1.2), desenfocar(img, 3.2)
    a = np.clip(cant * 2, 0, 1)[..., None]
    b = np.clip(cant * 2 - 1, 0, 1)[..., None]
    img = (img * (1 - a) + medio * a) * (1 - b) + fuerte * b

    # Partículas: polvo flotando y chispas sobre el farol.
    rng = np.random.default_rng(3)
    polvo = cargar("particulas", "polvo.png")
    chispa = cargar("particulas", "chispa.png")
    for _ in range(90):
        wx, wy, wz = rng.uniform(2.05, 3.95), rng.uniform(1.7, 9.0), rng.uniform(0.1, 1.9)
        sx, t, esc = proyectar(wx, wy)
        sy = HORIZ - (wz - OJO) * esc
        if not (0 <= sx < W and 0 <= sy < H) or prof[int(sy), int(sx)] < t:
            continue
        calor = 1.6 / (1 + 1.5 * ((wx - FAROL[0]) ** 2 + (wy - FAROL[1]) ** 2 + (wz - 0.6) ** 2))
        color = np.array([0.30, 0.45, 0.75]) * 0.5 + CALIDA * calor
        if t < 2.6:
            disco(img, sx, sy, 0.018 * esc, color * 0.16)
        elif t < 5:
            sumar(img, sx, sy, polvo * np.array([*(color / color.max()), 1.0]), 0.4 * color.max())
        else:
            img[int(sy), int(sx)] += color * 0.5
    for _ in range(12):
        wx = FAROL[0] + rng.uniform(-0.3, 0.3)
        wz = rng.uniform(0.75, 1.75)
        sx, t, esc = proyectar(wx, FAROL[1] - 0.05)
        sumar(img, sx, HORIZ - (wz - OJO) * esc, chispa, 1.3 - 0.6 * wz)

    # Pico en la mano, a doble tamaño y nítido, iluminado por el farol.
    pico = cargar("pico", "pico_0_reposo.png").repeat(2, 0).repeat(2, 1)
    ph, pw = pico.shape[:2]
    px0, py0 = W - pw + 14, H - ph + 10
    zona = img[py0:H, px0:W]
    trozo = pico[:H - py0, :W - px0]
    gy = np.linspace(1.0, 0.72, trozo.shape[0])[:, None, None]
    lit = trozo[..., :3] * (AMBIENTE * 1.1 + CALIDA * 0.95) * gy
    alfa = trozo[..., 3:4]
    zona[:] = zona * (1 - alfa) + lit * alfa

    # Bloom, viñeta y curva de tono.
    brillo = np.maximum(img - 0.62, 0)
    img = img + desenfocar(brillo, 2.5) * 0.8 + desenfocar(brillo, 8.0) * 0.6
    radio = np.hypot((xx - W / 2) / (W / 2), (yy - H * 0.47) / (H / 2))
    img *= (1 - 0.62 * suave(0.55, 1.35, radio))[..., None]
    luma = img @ np.array([0.3, 0.5, 0.2])
    img += np.array([0.010, 0.018, 0.045])[None, None, :] * (1 - np.clip(luma, 0, 1))[..., None]
    img = 1 - np.exp(-img * 1.45)
    # Un punto más de saturación: la curva de tono lava los azules.
    gris = (img @ np.array([0.3, 0.5, 0.2]))[..., None]
    img = gris + (img - gris) * 1.28
    return np.clip(img, 0, 1)


def main():
    img = Image.fromarray((render() * 255).astype(np.uint8))
    img = img.resize((W * ESCALA, H * ESCALA), Image.NEAREST)
    os.makedirs(OUT, exist_ok=True)
    destino = os.path.join(OUT, "preview.png")
    img.save(destino)
    print("ok", os.path.relpath(destino, RAIZ), img.size)


if __name__ == "__main__":
    main()
