#!/usr/bin/env python3
"""
Make a journal card image for a post that has no matching photograph.

Half the queued topics -- the wedding budget, the guest list, the venue
contract -- have no photograph at City Garden and never will, because
nobody photographs a spreadsheet. A mismatched wedding-stage photo on
those posts reads as filler. This draws a typographic card in the brand
instead: parchment or burgundy, the mandala, the lotus rule, and the
post's own words set in Cormorant.

It renders through headless Chrome so the real self-hosted brand fonts
are used, then writes the four files a card needs.

  python3 tools/make-card-image.py \
      --slug blog-budget \
      --kicker "Planning" \
      --line "Where the money\nactually goes" \
      --theme parch

Themes: parch (default), burg, wine.
"""
import argparse, os, subprocess, tempfile, shutil
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THEMES = {
    "parch": dict(bg="linear-gradient(168deg,#F7EFE0,#EDE0C9 48%,#E2D0B2)",
                  ink="#31070F", sub="#9A4038", orn="#8E6A3A", mand=".10"),
    "burg":  dict(bg="radial-gradient(120% 90% at 50% 0%,#4A1018,#31070F 62%,#250A10)",
                  ink="#F4EDE3", sub="#DCBB7E", orn="#DCBB7E", mand=".16"),
    "wine":  dict(bg="radial-gradient(120% 90% at 50% 0%,#6B1428,#570E20 60%,#3D0A17)",
                  ink="#F4EDE3", sub="#DCBB7E", orn="#DCBB7E", mand=".15"),
}

HTML = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:CG;font-weight:500;src:url('file://{root}/fonts/cormorant-garamond-latin-500-normal.woff2')format('woff2')}}
@font-face{{font-family:CGi;font-style:italic;font-weight:400;src:url('file://{root}/fonts/cormorant-garamond-latin-400-italic.woff2')format('woff2')}}
@font-face{{font-family:DM;font-weight:600;src:url('file://{root}/fonts/dm-sans-latin-600-normal.woff2')format('woff2')}}
*{{margin:0;box-sizing:border-box}}
body{{width:760px;height:570px;overflow:hidden}}
.c{{position:relative;width:760px;height:570px;background:{bg};
   display:flex;flex-direction:column;align-items:center;justify-content:center;
   text-align:center;padding:0 72px;overflow:hidden}}
.m{{position:absolute;left:50%;top:50%;width:700px;height:700px;
   transform:translate(-50%,-50%);opacity:{mand};
   background:{orn};-webkit-mask:url('file://{root}/images/mandala.png') center/contain no-repeat}}
.k{{position:relative;font-family:DM;font-size:15px;font-weight:600;letter-spacing:.2em;
   text-transform:uppercase;color:{sub};margin-bottom:22px}}
.l{{position:relative;font-family:CG;font-size:{size}px;line-height:1.1;letter-spacing:-.015em;
   color:{ink};white-space:pre-line}}
.o{{position:relative;margin-top:26px;width:190px;height:32px;color:{orn}}}
</style></head><body><div class="c">
<div class="m"></div>
<div class="k">{kicker}</div>
<div class="l">{line}</div>
<svg class="o" viewBox="0 0 240 40" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
<path d="M4,30 H92"/><path d="M148,30 H236"/>
<path d="M120,32 C112,24 110,14 120,4 C130,14 128,24 120,32Z"/>
<path d="M120,32 C108,30 98,22 96,12 C106,14 116,22 120,32Z"/>
<path d="M120,32 C132,30 142,22 144,12 C134,14 124,22 120,32Z"/>
<path d="M120,32 C106,34 94,32 86,24 C98,22 112,26 120,32Z"/>
<path d="M120,32 C134,34 146,32 154,24 C142,22 128,26 120,32Z"/>
<circle cx="86" cy="30" r="2"/><circle cx="154" cy="30" r="2"/></svg>
</div></body></html>"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", required=True, help="output stem, e.g. blog-budget")
    ap.add_argument("--kicker", required=True, help="small uppercase label")
    ap.add_argument("--line", required=True, help="the phrase; \\n for a line break")
    ap.add_argument("--theme", default="parch", choices=list(THEMES))
    ap.add_argument("--size", type=int, default=0, help="override type size in px")
    a = ap.parse_args()

    t = dict(THEMES[a.theme])
    line = a.line.replace("\\n", "\n")
    longest = max((len(x) for x in line.split("\n")), default=1)
    t["size"] = a.size or max(38, min(68, int(1500 / max(longest, 10))))

    html = HTML.format(root=ROOT, kicker=a.kicker, line=line, **t)
    tmp = tempfile.mkdtemp()
    page = os.path.join(tmp, "card.html")
    open(page, "w").write(html)
    shot = os.path.join(tmp, "card.png")

    subprocess.run([
        "/usr/bin/google-chrome", "--headless", "--no-sandbox",
        "--disable-gpu", "--hide-scrollbars",
        "--allow-file-access-from-files",
        "--window-size=760,570", "--default-background-color=00000000",
        "--virtual-time-budget=2500",
        f"--screenshot={shot}", f"file://{page}",
    ], check=True, capture_output=True)

    im = Image.open(shot).convert("RGB")
    out = os.path.join(ROOT, "images")
    for w, suf in ((760, ""), (480, "-m")):
        r = im.resize((w, round(w * 570 / 760)), Image.LANCZOS)
        r.save(f"{out}/{a.slug}{suf}.jpg", quality=86, optimize=True, progressive=True)
        r.save(f"{out}/{a.slug}{suf}.webp", quality=84, method=6)
    shutil.rmtree(tmp)
    print("wrote", ", ".join(f"{a.slug}{s}.{e}" for s in ("", "-m") for e in ("jpg", "webp")))


if __name__ == "__main__":
    main()
