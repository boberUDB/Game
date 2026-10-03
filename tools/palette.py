"""Paleta única del juego.

Todo el arte sale de aquí. Si cambias un color, vuelve a ejecutar
tools/gen_assets.py y los assets se regeneran con la paleta nueva.
"""

# Rampas ordenadas de oscuro a claro. Las sombras tiran a azul o violeta
# y las luces a cálido.
RAMPAS = {
    "noche": ["#080a1c", "#10153a", "#1a2352", "#27366e", "#3a4f8c", "#5671ad", "#8aa0cf"],
    "teal": ["#0e2a36", "#174a55", "#2a7b80", "#62b5a5"],
    "violeta": ["#231338", "#3f2461", "#6b3f8f", "#9d6bbd"],
    "calida": ["#4a2218", "#8f3b1c", "#d9732a", "#f5b942", "#fff0b3"],
    "oro": ["#5e421c", "#a87c2c", "#e3bb55"],
    "arena": ["#8a6a4a", "#c9a56e", "#e8d3a0"],
    "esmeralda": ["#2fbf71", "#8fe6a0"],
    "rubi": ["#7a1f3a", "#d6384f", "#ff8a7a"],
    "zafiro": ["#3d8bff"],
    "obsidiana": ["#120b1c", "#2b1f3d"],
}


def rgb(hexa):
    """'#rrggbb' -> (r, g, b)."""
    hexa = hexa.lstrip("#")
    return tuple(int(hexa[i:i + 2], 16) for i in (0, 2, 4))


def c(rampa, i):
    """Color i de una rampa, como tupla RGB."""
    return rgb(RAMPAS[rampa][i])


# Lista plana de todos los colores permitidos (la usa check_palette.py).
PALETA = sorted({rgb(h) for tonos in RAMPAS.values() for h in tonos})

# Materiales de los sprites: (contorno, sombra, medio, luz, brillo).
# El contorno es siempre un tono oscuro de la propia rampa, nunca negro.
MATERIALES = {
    "acero": (c("noche", 1), c("noche", 4), c("noche", 5), c("noche", 6), c("calida", 4)),
    "hierro": (c("noche", 0), c("noche", 1), c("noche", 2), c("noche", 3), c("noche", 4)),
    "madera": (c("calida", 0), c("oro", 0), c("arena", 0), c("arena", 1), c("arena", 2)),
    "oro": (c("calida", 0), c("oro", 0), c("oro", 1), c("oro", 2), c("calida", 4)),
    "guante": (c("teal", 0), c("teal", 1), c("teal", 2), c("teal", 3), c("teal", 3)),
    "manga": (c("violeta", 0), c("violeta", 1), c("violeta", 2), c("violeta", 3), c("violeta", 3)),
    "vendas": (c("oro", 0), c("arena", 0), c("arena", 1), c("arena", 2), c("calida", 4)),
    "hueco": (c("obsidiana", 0), c("obsidiana", 0), c("obsidiana", 1), c("violeta", 1), c("violeta", 2)),
    "ojo": (c("teal", 1), c("teal", 2), c("teal", 3), c("teal", 3), c("calida", 4)),
    "ojo_dano": (c("rubi", 0), c("rubi", 0), c("rubi", 1), c("rubi", 2), c("calida", 4)),
    "fuego": (c("calida", 0), c("calida", 1), c("calida", 2), c("calida", 3), c("calida", 4)),
    "zafiro": (c("noche", 2), c("noche", 3), c("zafiro", 0), c("noche", 6), c("calida", 4)),
    "rubi": (c("rubi", 0), c("rubi", 0), c("rubi", 1), c("rubi", 2), c("calida", 4)),
    # Materiales de la demo en primera persona.
    "piel": (c("calida", 0), c("calida", 1), c("arena", 0), c("arena", 1), c("arena", 2)),
    "tela": (c("noche", 1), c("noche", 3), c("noche", 4), c("noche", 5), c("noche", 6)),
    "pino": (c("noche", 1), c("teal", 0), c("teal", 1), c("teal", 2), c("teal", 3)),
    "izote": (c("teal", 0), c("teal", 1), c("teal", 2), c("teal", 3), c("esmeralda", 1)),
    "azufre": (c("calida", 1), c("calida", 2), c("calida", 3), c("arena", 2), c("calida", 4)),
    "esmeralda": (c("teal", 1), c("teal", 2), c("esmeralda", 0), c("esmeralda", 1), c("calida", 4)),
    "volcan": (c("violeta", 0), c("noche", 1), c("noche", 2), c("noche", 3), c("calida", 2)),
    "volcan_lejano": (c("noche", 1), c("noche", 2), c("noche", 3), c("noche", 4), c("calida", 2)),
    "pluma_cola": (c("noche", 1), c("noche", 3), c("zafiro", 0), c("noche", 6), c("calida", 4)),
}

# Tonos de las texturas de bloque (sin contorno).
BLOQUES = {
    # grieta, sombra, medio, luz, mota
    "piedra": [c("noche", 2), c("noche", 3), c("noche", 4), c("noche", 5), c("noche", 6)],
    # hueco, sombra, medio, luz, guijarro
    "tierra": [c("violeta", 0), c("calida", 0), c("oro", 0), c("arena", 0), c("arena", 1)],
    # cara oscura, cara clara, arista, destello
    "obsidiana": [c("obsidiana", 0), c("obsidiana", 1), c("violeta", 1), c("violeta", 3)],
    # junta y grabado, sombra, medio, luz, jeroglífico encendido
    "arenisca": [c("oro", 0), c("arena", 0), c("arena", 1), c("arena", 2), c("teal", 3)],
}

# Rampas de los cristales incrustados: (sombra, medio, luz). El brillo es calida[4].
CRISTALES = {
    "esmeralda": (c("teal", 2), c("esmeralda", 0), c("esmeralda", 1)),
    "rubi": (c("rubi", 0), c("rubi", 1), c("rubi", 2)),
}
BRILLO = c("calida", 4)
ENGASTE = c("noche", 1)
