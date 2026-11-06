# City Garden website

Plain HTML, CSS and JavaScript. No build step.

## Replace the placeholders
All photos are in `images/`. Keep the same filename and just overwrite:

| File | Where it appears |
|---|---|
| hero.jpg | Hero poster (shows until the hero video loads) |
| about-1.jpg, about-2.jpg | About section |
| lawn.jpg, banquet.jpg, stay.jpg, parking.jpg | Venue journey (horizontal scroll) |
| catering.jpg, decor.jpg, coordination.jpg | Services (sticky image that swaps as you scroll) |
| reel-1.jpg, reel-2.jpg, reel-3.jpg | Reel thumbnails |
| g1.jpg ... g9.jpg | Gallery (any aspect ratio works) |

## Decorative artwork (already in place)

| File | Where it appears |
|------|------------------|
| mandala.webp | Loader, hero, services image, footer. Transparent gold on dark; the three rings turn at different speeds |
| pattern-wall.jpg | Background of the reviews section |
| art-elephant.webp, art-pavilion.webp | Either side of the contact heading (pavilion hidden on phones) |

These came from images supplied during the build. If any were taken from Pinterest or a design site, confirm they are free to use or licensed before launch, or swap them for your own artwork using the same filenames.

Tips: use JPG or WebP, about 1600px on the long side for most images, under ~300 KB each.
If you change a file extension (e.g. to .webp), update the name in `index.html`.

## Videos (in place)
All four are cut from venue footage and encoded for the web (H.264, faststart).

| File | Length | What it shows |
|---|---|---|
| hero.mp4 | 11.8s | Lawn, then the emerald canopy sweep, then the red floral decor. Muted. |
| reel-1.mp4 | 8.7s | Emerald lounge: mandap reveal into the gold arcade |
| reel-2.mp4 | 8.1s | The lawn with gold seating, then the catering counters |
| reel-3.mp4 | 4.6s | Red floral decor and the garlanded walkway |

All four are **vertical 9:16 (720x1280)**, including the hero. That is deliberate: the hero
uses `object-fit:cover`, so on a desktop the browser crops the centre band and scales it up
exactly as a pre-cropped landscape file would — same sharpness — while a phone gets the whole
frame instead of a 2.3x upscale. Every source clip was shot vertically, so cropping to
landscape first would only have thrown away the mobile quality.

Poster images are each video's own first frame: `hero-poster.jpg`, `reel-1.jpg`,
`reel-2.jpg`, `reel-3.jpg`. If you replace a video, regenerate its poster to match:

```
ffmpeg -i videos/reel-1.mp4 -frames:v 1 -q:v 5 images/reel-1.jpg -y
```

`images/hero.jpg` is a separate landscape image used only as the `og:image` for link
previews — it is not the video poster. If a video is missing, its poster is shown instead.

Reels keep their original audio and start muted; the circular button on each one toggles
sound. reel-3 carries music that was playing at the event, so check you are happy to publish
that before launch — otherwise re-encode it with `-an`.

## Things to update in index.html
- Reviews: search for "PLACEHOLDER REVIEWS" and paste real Google reviews.
- Phone/WhatsApp: `919919696288` (in the form script `js/main.js`, the dock and the contact section).
- Capacity (1,000+), room count, parking: confirm and edit the wording.

## Publish on GitHub Pages
1. Create a repository and upload everything in this folder (index.html at the top level).
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your site goes live at https://<username>.github.io/<repo>/

## Section colours
Each section has a `data-theme` (dark, wine, green, light, parch). As a section reaches the middle of the screen,
the whole page background fades to that colour. Change a section's theme by editing its `data-theme` attribute.

## Screen sizes
One responsive site, no separate mobile file:
- Phone (under 600px): stacked layout, swipe carousels, Call/WhatsApp bar at the bottom.
- Tablet (600 to 959px): two-column services and contact, three reels side by side.
- Laptop and desktop (960px and up): full menu, pinned horizontal venue journey, sticky services image, custom cursor.
- Short laptop screens (1366x768): tighter spacing so headings and images fit the screen.
- Large monitors (1600px and up): wider layout, 4-column gallery, type scales up.
