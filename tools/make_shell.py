#!/usr/bin/env python3
"""Папка гида «на экран Домой»: /{slug}/index.html + manifest.webmanifest (+ иконки 192/512).

Зачем: iOS и Android при сохранении на экран берут СТАТИЧНЫЙ манифест страницы.
У корня он один (Мадейра), поэтому каждый гид живёт в своей папке со своим манифестом,
start_url и scope внутри папки — тогда гид сохраняется отдельным приложением.
Движок общий: ../engine/engine.js. Новый гид = одна команда:

  python3 tools/make_shell.py malaga malaga-igor --og share/og-malaga.png

Опции: --apple icons/x-180.png (иначе meta.appleIcon), --svg icons/x.svg (иначе meta.icon),
       --og share/og-*.png (картинка превью 1200×630), --lang ru (язык названий в манифесте).
"""
import argparse, json, os, html, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://g.seedwave.pt/"


def pick(v, lang):
    if isinstance(v, dict):
        return v.get(lang) or v.get("ru") or next(iter(v.values()), "")
    return v or ""


def render_png(svg_rel, size, out_rel):
    """SVG → PNG нужного размера (Playwright/Chromium). Без Playwright — пропуск с предупреждением."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(f"  ! нет playwright — {out_rel} не создан", file=sys.stderr)
        return False
    svg = open(os.path.join(ROOT, svg_rel)).read().replace("<svg ", f'<svg width="{size}" height="{size}" ', 1)
    tmp = os.path.join(ROOT, ".shell_tmp.html")
    open(tmp, "w").write('<body style="margin:0;background:transparent">' + svg)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": size, "height": size})
        pg.goto("file://" + tmp)
        pg.screenshot(path=os.path.join(ROOT, out_rel), omit_background=True)
        b.close()
    os.remove(tmp)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("guide_id")
    ap.add_argument("--apple")
    ap.add_argument("--svg")
    ap.add_argument("--og")
    ap.add_argument("--lang", default="ru")
    ap.add_argument("--title", help="если в data нет intro.title")
    ap.add_argument("--desc", help="если в data нет intro.sub")
    a = ap.parse_args()

    d = json.load(open(os.path.join(ROOT, "data", a.guide_id + ".json")))
    m, intro, lang = d["meta"], d.get("intro", {}), a.lang
    assert m["id"] == a.guide_id, "meta.id ≠ имени файла"
    title = pick(intro.get("title"), lang) or a.title or a.guide_id
    city = pick(m.get("city"), lang) or title
    desc = pick(intro.get("sub"), lang) or a.desc or ""
    svg = a.svg or m.get("icon") or "icon.svg"
    apple = a.apple or m.get("appleIcon") or svg
    bg = (m.get("theme") or {}).get("bg", "#1a1014")
    acc = (m.get("themeLight") or {}).get("accent", "#C13A57")

    icons = []
    if svg.endswith(".svg") and os.path.exists(os.path.join(ROOT, svg)):
        for s in (192, 512):
            rel = f"icons/{a.slug}-{s}.png"
            if render_png(svg, s, rel):
                icons.append({"src": "../" + rel, "sizes": f"{s}x{s}", "type": "image/png", "purpose": "any"})
    if apple.endswith(".png"):
        icons.append({"src": "../" + apple, "sizes": "180x180", "type": "image/png", "purpose": "any"})

    folder = os.path.join(ROOT, a.slug)
    os.makedirs(folder, exist_ok=True)
    mf = {"id": "./", "name": title, "short_name": city, "start_url": "./", "scope": "./",
          "display": "standalone", "orientation": "portrait", "background_color": bg,
          "theme_color": acc, "lang": lang, "icons": icons}
    json.dump(mf, open(os.path.join(folder, "manifest.webmanifest"), "w"), ensure_ascii=False, indent=2)

    e = lambda s: html.escape(s, quote=True)
    url = SITE + a.slug + "/"
    og = ""
    if a.og:
        og = (f'<meta property="og:image" content="{SITE}{a.og}">\n'
              f'<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">\n'
              f'<meta name="twitter:card" content="summary_large_image">\n'
              f'<meta name="twitter:image" content="{SITE}{a.og}">\n')
    page = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="icon" href="../{e(svg)}" type="{'image/svg+xml' if svg.endswith('.svg') else 'image/png'}">
<link rel="apple-touch-icon" href="../{e(apple)}">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="{e(acc)}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="{e(city)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Мой Гид · SeedWave">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
{og}<link rel="canonical" href="{url}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Mulish:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../engine/engine.css?v=1">
</head>
<body>
<!-- Папка гида {a.guide_id}: собрано tools/make_shell.py. Движок общий — ../engine/engine.js. Руками не править. -->
<script>window.GUIDE_ID={json.dumps(a.guide_id)};window.GUIDE_BASE='../';window.GUIDE_STATIC=true;</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.9.0/suncalc.min.js"></script>
<script src="../engine/engine.js?v=1"></script>
</body>
</html>
'''
    open(os.path.join(folder, "index.html"), "w").write(page)
    print(f"✓ {a.slug}/ ← {a.guide_id} · «{title}» · иконок {len(icons)} · {url}")


if __name__ == "__main__":
    main()
