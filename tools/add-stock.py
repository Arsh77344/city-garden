#!/usr/bin/env python3
"""
Bring a downloaded stock photograph into the journal image library.

Crops it 4:3, writes the four files a card needs, and -- the part that
matters -- records where it came from in images/ritual-inspiration/SOURCES.md.
An image on a commercial site whose licence nobody can produce is a
liability, so this tool refuses to add one without its source URL.

  python3 tools/add-stock.py ~/Downloads/pexels-haldi.jpg \
      --slug blog-haldi \
      --platform pexels \
      --url https://www.pexels.com/photo/12345/ \
      --photographer "A. Name" \
      --alt "Turmeric paste being applied during a haldi ceremony" \
      --focus 0.45

--focus is the vertical centre of the crop, 0 (top) to 1 (bottom).
"""
import argparse, os, datetime
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEDGER = os.path.join(ROOT, "images", "ritual-inspiration", "SOURCES.md")
LICENCES = {
    "pexels":   "Pexels License -- commercial use permitted, no attribution required",
    "unsplash": "Unsplash License -- commercial use permitted, no attribution required",
    "pixabay":  "Pixabay Content License -- commercial use permitted, no attribution required",
    "owned":    "Photographed by or for City Garden",
}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source", help="the downloaded file")
    ap.add_argument("--slug", required=True, help="output stem, e.g. blog-haldi")
    ap.add_argument("--platform", required=True, choices=list(LICENCES))
    ap.add_argument("--url", required=True, help="the page the image was downloaded from")
    ap.add_argument("--photographer", default="", help="credit, if the page gives one")
    ap.add_argument("--alt", required=True,
                    help="describes what the photo SHOWS. Never 'at City Garden' "
                         "for a stock image -- see IMAGES.md.")
    ap.add_argument("--focus", type=float, default=0.5)
    a = ap.parse_args()

    bad = ("city garden", "citygarden")
    if a.platform != "owned" and any(b in a.alt.lower() for b in bad):
        raise SystemExit(
            "Refusing: the alt text names City Garden on a stock photograph.\n"
            "Describe what the image shows instead. See IMAGES.md.")

    im = Image.open(a.source).convert("RGB")
    w, h = im.size
    cw, ch = (w, w / (4 / 3)) if w / (4 / 3) <= h else (h * (4 / 3), h)
    cw, ch = int(cw), int(ch)
    top = max(0, min(h - ch, int(a.focus * h - ch / 2)))
    box = im.crop(((w - cw) // 2, top, (w - cw) // 2 + cw, top + ch))

    out = os.path.join(ROOT, "images")
    for wid, suf in ((760, ""), (480, "-m")):
        r = box.resize((wid, round(wid * 3 / 4)), Image.LANCZOS)
        r.save(f"{out}/{a.slug}{suf}.jpg", quality=82, optimize=True, progressive=True)
        r.save(f"{out}/{a.slug}{suf}.webp", quality=80, method=6)

    if not os.path.exists(LEDGER):
        raise SystemExit(f"Missing {LEDGER} -- create it before adding stock.")
    with open(LEDGER, "a") as f:
        f.write(
            f"\n### `{a.slug}`\n"
            f"- **Shows:** {a.alt}\n"
            f"- **Source:** {a.url}\n"
            f"- **Platform:** {a.platform}\n"
            f"- **Photographer:** {a.photographer or 'not credited on the page'}\n"
            f"- **Licence:** {LICENCES[a.platform]}\n"
            f"- **Added:** {datetime.date.today().isoformat()}\n")
    print(f"wrote {a.slug} (4 files) and recorded the source in SOURCES.md")

if __name__ == "__main__":
    main()
