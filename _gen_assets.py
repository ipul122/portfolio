"""One-off generator aset portfolio (Prioritas #2 audit):
- assets/images/og-cover.png         (1200x630, preview LinkedIn/WhatsApp/X)
- assets/images/apple-touch-icon.png (180x180, ikon tab iOS & bookmark)

Palet & font disamakan dengan css/style.css:
  --bg-dark #0a0e17 | --accent #00d9ff | --accent-2 #7c3aed | --text-primary #e6edf3

Jalankan: python _gen_assets.py
"""
import os

from PIL import Image, ImageDraw, ImageFont

FONT_DIR = r"C:\Windows\Fonts"
BG = (10, 14, 23)
CYAN = (0, 217, 255)
PURPLE = (124, 58, 237)
TEXT = (230, 237, 243)
MUTED = (139, 148, 158)

OUT_OG = os.path.join("assets", "images", "og-cover.png")
OUT_ICON = os.path.join("assets", "images", "apple-touch-icon.png")


def pick_font(size, bold=True):
    names = ("segoeuib.ttf", "arialbd.ttf") if bold else ("segoeui.ttf", "arial.ttf")
    for name in names:
        path = os.path.join(FONT_DIR, name)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def mono(size, bold=True):
    names = ("consolab.ttf", "consola.ttf", "cour.ttf") if bold else ("consola.ttf", "cour.ttf")
    for name in names:
        path = os.path.join(FONT_DIR, name)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return pick_font(size, bold)


def text_width(text, font):
    box = ImageDraw.Draw(Image.new("L", (8, 8))).textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def fit_font(text, start_size, max_width, mono_font=False, bold=True):
    """Turunkan ukuran font sampai teks muat, supaya layout tidak pernah meluber."""
    size = start_size
    while size > 12:
        font = mono(size, bold) if mono_font else pick_font(size, bold)
        if text_width(text, font) <= max_width:
            return font
        size -= 3
    return mono(12, bold) if mono_font else pick_font(12, bold)


def gradient(size, c1=CYAN, c2=PURPLE):
    """Gradient horizontal (kiri -> kanan), ekuivalen .text-gradient di CSS."""
    w, h = size
    img = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(img)
    for x in range(w):
        t = x / max(w - 1, 1)
        draw.line([(x, 0), (x, h)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return img


def paste_gradient_text(base, xy, text, font):
    mask = Image.new("L", base.size, 0)
    ImageDraw.Draw(mask).text(xy, text, font=font, fill=255)
    box = mask.getbbox()
    if not box:
        return
    base.paste(gradient((box[2] - box[0], box[3] - box[1])), (box[0], box[1]), mask.crop(box))


def paste_centered_gradient_text(base, text, font):
    mask = Image.new("L", base.size, 0)
    draw = ImageDraw.Draw(mask)
    box = draw.textbbox((0, 0), text, font=font)
    x = (base.size[0] - (box[2] - box[0])) / 2 - box[0]
    y = (base.size[1] - (box[3] - box[1])) / 2 - box[1]
    draw.text((x, y), text, font=font, fill=255)
    final = mask.getbbox()
    if not final:
        return
    base.paste(gradient((final[2] - final[0], final[3] - final[1])),
               (final[0], final[1]), mask.crop(final))


def glow(size, center, radius, color, peak_alpha=34, steps=44):
    """Cahaya lembut sebagai latar (nuansa #neural-canvas di hero)."""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for i in range(steps, 0, -1):
        r = int(radius * i / steps)
        alpha = int(peak_alpha * (1 - i / steps) ** 2)
        if alpha <= 0 or r <= 0:
            continue
        draw.ellipse([center[0] - r, center[1] - r, center[0] + r, center[1] + r],
                     fill=color + (alpha,))
    return layer


def build_og_cover():
    width, height = 1200, 630
    canvas = Image.new("RGBA", (width, height), BG + (255,))
    canvas = Image.alpha_composite(canvas, glow((width, height), (170, 110), 430, CYAN, 30))
    canvas = Image.alpha_composite(canvas, glow((width, height), (1030, 530), 390, PURPLE, 36))

    draw = ImageDraw.Draw(canvas)

    for y in range(height):  # garis aksen gradient di tepi kiri
        t = y / (height - 1)
        draw.line([(0, y), (9, y)],
                  fill=tuple(int(CYAN[i] + (PURPLE[i] - CYAN[i]) * t) for i in range(3)) + (255,))

    draw.text((80, 84), "// PORTFOLIO", font=mono(24, True), fill=CYAN)
    paste_gradient_text(canvas, (78, 138), "Anwar Udin Sayfulloh",
                        fit_font("Anwar Udin Sayfulloh", 84, width - 170))

    draw.text((82, 284), "AI/ML Engineer  ·  Machine Learning & Deep Learning",
              font=pick_font(38, True), fill=TEXT)
    draw.text((82, 344), "End-to-end ML pipelines · Python · PyTorch · XGBoost · MLOps",
              font=pick_font(28, False), fill=MUTED)

    for x in range(80, 620):  # pembatas gradient
        t = (x - 80) / 540
        draw.line([(x, 420), (x, 423)],
                  fill=tuple(int(CYAN[i] + (PURPLE[i] - CYAN[i]) * t) for i in range(3)) + (255,))

    draw.text((82, 466), "1 PUBLISHED PAPER   |   4 CERTIFICATIONS   |   5+ AI PROJECTS",
              font=mono(25, True), fill=MUTED)

    url = "ipul122.github.io/portfolio"
    draw.text((width - 80 - text_width(url, mono(24, False)), height - 74), url,
              font=mono(24, False), fill=CYAN)

    canvas.convert("RGB").save(OUT_OG, "PNG", optimize=True)


def build_apple_touch_icon():
    size = 180
    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=40, fill=BG + (255,))
    draw.rounded_rectangle([6, 6, size - 7, size - 7], radius=34, outline=CYAN + (255,), width=3)
    paste_centered_gradient_text(icon, "AUS", fit_font("AUS", 58, size - 70, mono_font=True))
    icon.convert("RGB").save(OUT_ICON, "PNG", optimize=True)


if __name__ == "__main__":
    build_og_cover()
    build_apple_touch_icon()
    for path in (OUT_OG, OUT_ICON):
        with Image.open(path) as img:
            print(f"OK {path} {img.size[0]}x{img.size[1]} {os.path.getsize(path) / 1024:.1f} KB")
