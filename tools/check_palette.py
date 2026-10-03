"""Comprueba los assets: paleta, tamaños y costuras.

Uso:  python tools/check_palette.py
Sale con error si algún píxel de assets/ no pertenece a la paleta, si un PNG
no mide lo que toca o si una textura de bloque tiene costura al repetirse.
"""
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from palette import BRILLO, PALETA  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(RAIZ, "assets")

# Tamaño esperado (ancho, alto) por carpeta.
TAMANOS = {
    "bloques": (64, 64),
    "pico": (96, 96),
    "botin": (32, 32),
    "enemigos": (64, 96),
    "props": (32, 64),
    "particulas": (8, 8),
    "emision": (64, 64),
    "grietas": (64, 64),
    "mascotas": (32, 32),
    "personajes": (64, 96),
    "naturaleza": None,  # cada archivo tiene su tamaño, ver TAMANOS_ARCHIVO
    "fuego": (64, 64),
    "rotulos": (128, 32),
    "cielo": (256, 96),
    "iconos": (32, 32),
}

TAMANOS_ARCHIVO = {"pino.png": (128, 192), "izote.png": (64, 128)}

# Los bloques con cristal llevan al menos un píxel de brillo claro.
CON_BRILLO = {"piedra_azufre", "piedra_oro", "piedra_esmeralda", "piedra_rubi", "piedra_zafiro"}


def costura(rgb, eje):
    """Compara el salto en el borde que se repite con el mayor salto interior."""
    a = np.moveaxis(rgb.astype(int), eje, 0)
    saltos = np.abs(a - np.roll(a, 1, 0)).sum(axis=(1, 2))  # saltos[0] es la costura
    return saltos[0], saltos[1:].max()


def main():
    permitidos = {(r << 16) | (g << 8) | b for r, g, b in PALETA}
    errores = []
    total = 0
    for carpeta, _, archivos in sorted(os.walk(ASSETS)):
        for nombre in sorted(archivos):
            if not nombre.lower().endswith(".png"):
                continue
            total += 1
            ruta = os.path.join(carpeta, nombre)
            rel = os.path.relpath(ruta, RAIZ)
            img = np.asarray(Image.open(ruta).convert("RGBA")).astype(np.uint32)
            alfa = img[..., 3]

            # 1. Paleta: solo se miran los píxeles visibles.
            if ((alfa != 0) & (alfa != 255)).any():
                errores.append(f"{rel}: tiene píxeles semitransparentes")
            clave = (img[..., 0] << 16) | (img[..., 1] << 8) | img[..., 2]
            fuera = sorted({int(k) for k in np.unique(clave[alfa > 0])} - permitidos)
            if fuera:
                muestra = ", ".join(f"#{k:06x}" for k in fuera[:6])
                errores.append(f"{rel}: {len(fuera)} colores fuera de paleta ({muestra})")

            # 2. Tamaño según la carpeta.
            grupo = os.path.basename(carpeta)
            esperado = TAMANOS.get(grupo)
            if grupo == "naturaleza":
                esperado = TAMANOS_ARCHIVO.get(nombre)
            tam = (img.shape[1], img.shape[0])
            if esperado is None:
                errores.append(f"{rel}: carpeta sin tamaño definido")
            elif tam != esperado:
                errores.append(f"{rel}: mide {tam[0]}x{tam[1]}, se esperaba {esperado[0]}x{esperado[1]}")

            # 2b. Reglas por carpeta nueva.
            base = nombre[:-4]
            if grupo == "emision":
                visibles = int((alfa > 0).sum())
                if visibles == 0 or visibles == alfa.size:
                    errores.append(f"{rel}: la emisión debe ser transparente salvo los píxeles que brillan")
                if not (alfa == 0).any():
                    errores.append(f"{rel}: la emisión no puede ser opaca en todo el lienzo")
                if not (RAIZ and os.path.exists(os.path.join(ASSETS, "bloques", nombre))):
                    errores.append(f"{rel}: no hay un bloque con el mismo nombre")
            if grupo == "grietas" and not (alfa == 0).any():
                errores.append(f"{rel}: las grietas necesitan transparencia")
            if grupo in ("bloques", "emision") and base in CON_BRILLO:
                brillo = (img[..., 0] << 16 | img[..., 1] << 8 | img[..., 2]) == ((BRILLO[0] << 16) | (BRILLO[1] << 8) | BRILLO[2])
                if not (brillo & (alfa > 0)).any():
                    errores.append(f"{rel}: falta el píxel de brillo claro del cristal")

            # 3. Costuras: el borde no puede marcarse más que la línea interior más fuerte.
            if grupo == "bloques":
                if (alfa != 255).any():
                    errores.append(f"{rel}: una textura de bloque no puede tener transparencia")
                for eje, lado in ((0, "horizontal"), (1, "vertical")):
                    borde, interior = costura(img[..., :3], eje)
                    if borde > interior:
                        errores.append(f"{rel}: costura {lado} ({borde} > {interior})")

    if total == 0:
        errores.append("no hay PNG en assets/; ejecuta antes tools/gen_assets.py")
    if errores:
        print("FALLA")
        for e in errores:
            print(" -", e)
        sys.exit(1)
    print(f"OK: {total} PNG, {len(PALETA)} colores en la paleta, tamaños y costuras correctos")


if __name__ == "__main__":
    main()
