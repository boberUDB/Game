"""Monta todos los assets en una hoja a x4 para revisarlos de un vistazo.

Uso:  python tools/assets_sheet.py   ->  out/assets_sheet.png
La segunda fila repite cada textura 2x2 para ver que no hay costuras.
"""
import os
import sys

import numpy as np
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import PALETA, c  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(RAIZ, "assets")
OUT = os.path.join(RAIZ, "out")
ESCALA = 4
MARGEN = 24

BLOQUES = ["piedra", "tierra", "obsidiana", "arenisca_jeroglificos", "piedra_esmeralda", "piedra_rubi"]
PICO = ["pico_0_reposo", "pico_1_preparar", "pico_2_golpe", "pico_3_impacto", "pico_4_regreso"]
VARIOS = [("enemigos", "momia_idle_0"), ("enemigos", "momia_idle_1"), ("enemigos", "momia_dano"),
          ("props", "farol_0"), ("props", "farol_1"), ("botin", "gema"),
          ("particulas", "chispa"), ("particulas", "polvo")]


def abrir(carpeta, nombre):
    return Image.open(os.path.join(ASSETS, carpeta, nombre + ".png")).convert("RGBA")


def ampliar(img, k=ESCALA):
    return img.resize((img.width * k, img.height * k), Image.NEAREST)


def main():
    filas = [
        [(n, ampliar(abrir("bloques", n))) for n in BLOQUES],
        [(n + " 2x2", ampliar(Image.fromarray(np.tile(np.asarray(abrir("bloques", n)), (2, 2, 1))), 2))
         for n in BLOQUES],
        [(n, ampliar(abrir("pico", n))) for n in PICO],
        [(n, ampliar(abrir(carp, n))) for carp, n in VARIOS],
    ]
    ancho = max(sum(i.width + MARGEN for _, i in f) for f in filas) + MARGEN
    alto = sum(max(i.height for _, i in f) + MARGEN + 16 for f in filas) + MARGEN + 40
    hoja = Image.new("RGBA", (ancho, alto), (*c("noche", 1), 255))
    lapiz = ImageDraw.Draw(hoja)
    y = MARGEN
    for fila in filas:
        x = MARGEN
        h = max(i.height for _, i in fila)
        for nombre, img in fila:
            # Fondo algo más claro bajo cada sprite para que se vea el contorno.
            lapiz.rectangle([x, y, x + img.width - 1, y + h - 1], fill=(*c("noche", 2), 255))
            hoja.alpha_composite(img, (x, y + h - img.height))
            lapiz.text((x, y + h + 3), nombre, fill=(*c("noche", 6), 255))
            x += img.width + MARGEN
        y += h + MARGEN + 16
    # Muestrario de la paleta al pie.
    for i, col in enumerate(PALETA):
        lapiz.rectangle([MARGEN + i * 28, y, MARGEN + i * 28 + 24, y + 24], fill=(*col, 255))
    os.makedirs(OUT, exist_ok=True)
    destino = os.path.join(OUT, "assets_sheet.png")
    hoja.convert("RGB").save(destino)
    print("ok", os.path.relpath(destino, RAIZ), hoja.size)


if __name__ == "__main__":
    main()
