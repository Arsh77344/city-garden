# City Garden website

Plain HTML, CSS and JavaScript. No build step.

## Replace the placeholders
All photos are in `images/`. Keep the same filename and just overwrite:

| File | Where it appears | Status |
|---|---|---|
| hero.jpg | Social-share / link-preview image (`og:image`) only — not shown on the page itself | ✅ filled |
| about-1.jpg, about-2.jpg | About section | ✅ filled |
| lawn.jpg | Venue journey — open lawn | ✅ filled (frame grab from supplied footage) |
| banquet.jpg | Venue journey — indoor banquet hall | ✅ filled |
| stay.jpg | Venue journey — guest rooms | ⚠️ no real photo supplied — this is a styled on-brand graphic, not a photo. Replace with an actual guest-room photo. |
| parking.jpg | Venue journey — entrance & parking | ✅ filled |
| catering.jpg, decor.jpg, coordination.jpg | Services (sticky image that swaps as you scroll) | ✅ filled |
| reel-1.jpg, reel-2.jpg, reel-3.jpg | Reel thumbnails (auto-generated from each video's first frame) | ✅ filled |
| g8.jpg, g9.jpg | Gallery (any aspect ratio works) | ✅ filled |

No more bokeh "placeholder — replace with X.jpg" graphics remain, except `stay.jpg` (above). `g1.jpg`–`g7.jpg` were unused leftover placeholder files and have been deleted; the gallery's real photos are the `city-garden-*.jpg` files plus `g8.jpg`/`g9.jpg`.

`images/hero-poster.jpg` is the hero **video's** poster (its own first frame) — don't hand-replace it, regenerate it from `videos/hero.mp4` if you change that video (see the Videos section below).

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
- Phone/WhatsApp: `919919696288` — checked against the live citygarden.co.in site (same number in its
  header and footer, `contact@citygarden.co.in`), so this is confirmed correct. It's wired into the
  form script `js/main.js`, the floating call/WhatsApp buttons, and the contact section — change it in
  one place and it updates everywhere `tel:+919919696288` / `919919696288` appears.
- Capacity (1,000+), room count, parking: confirm and edit the wording.

## Call / WhatsApp button
A floating button pair sits bottom-right on desktop/tablet (two round icon buttons, phone pulses gently
to draw the eye) and as a full-width bar on mobile once you've scrolled a bit. Both call `tel:+919919696288`
and open a WhatsApp chat to the same number — edit `.dock-call`/`.dock-wa` in `index.html` to change either.

## SEO
`robots.txt` and `sitemap.xml` are in this folder (update `sitemap.xml`'s `<lastmod>` when content changes
meaningfully). Title (54 chars) and meta description (153 chars) are sized to Google's display limits;
Open Graph/Twitter image tags include explicit width/height so social previews render without a fetch
delay. If the domain changes from citygarden.co.in, update it in `sitemap.xml`, `robots.txt`, and the
canonical/OG/JSON-LD tags in `index.html`.

## Going live

DNS for citygarden.co.in is at a registrar (not Wix). The plan is to prove the new site on a
subdomain first, then move the main domain — so the live Wix site is never at risk.

### Phase 1 — test on new.citygarden.co.in

1. **GitHub:** repo > Settings > Pages > Source `Deploy from a branch`, branch `main`,
   folder `/ (root)`. Save. Wait for the green tick in the Actions tab, then confirm
   https://arsh77344.github.io/city-garden/ loads.
2. **Registrar:** add ONE new record. Nothing else changes.
   | Type | Host/Name | Value | TTL |
   |---|---|---|---|
   | CNAME | `new` | `arsh77344.github.io` | 300 (or lowest allowed) |
3. **GitHub:** Settings > Pages > Custom domain > `new.citygarden.co.in` > Save.
   GitHub writes a CNAME file to the repo itself — don't add one by hand.
4. Wait for the DNS check to pass, then tick **Enforce HTTPS** (the certificate can take
   up to an hour). Test https://new.citygarden.co.in on a phone and a laptop: the map,
   the videos, the gallery, the enquiry form (check the row lands in Supabase), /review/
   and /privacy/.

While this runs, citygarden.co.in still serves Wix exactly as before.

**Useful prep:** a day before phase 2, drop the TTL on the existing `@` and `www` records to
300 seconds. The switch then propagates in minutes instead of hours.

### Phase 2 — move the main domain

Only once phase 1 is proven.

1. **GitHub:** Settings > Pages > Custom domain > change to `www.citygarden.co.in` > Save.
2. **Registrar:** change the website records only.
   | Type | Host/Name | Value |
   |---|---|---|
   | CNAME | `www` | `arsh77344.github.io` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

   With both sets present, citygarden.co.in redirects to www automatically.
3. Re-tick **Enforce HTTPS** once the new certificate issues.
4. Delete the temporary `new` CNAME, and in Google Search Console submit
   https://www.citygarden.co.in/sitemap.xml.

### The one thing that can actually go wrong

`contact@citygarden.co.in` depends on **MX records** in the same DNS zone you are editing.
Delete or overwrite them and email stops arriving — with no error, no bounce you'd notice,
just enquiries vanishing.

Before phase 2: screenshot or export the whole current DNS zone. Then change **only** the
`A` and `CNAME` records for the website. Leave every MX record alone, and leave every TXT
record alone (SPF, DKIM, domain verification). If the registrar offers a "point nameservers
at Wix" style setting, do not touch it — changing nameservers moves the entire zone and is
how MX records get lost.

Afterwards, send a test email to contact@citygarden.co.in and confirm it arrives.

## Section colours
Each section has a `data-theme` (dark, wine, green, light, parch). As a section reaches the middle of the screen,
the whole page background fades to that colour (slowed slightly to 1.4s for a smoother morph), and several
sections (Celebrations, Reels, Contact) now bloom with a faint theme-tinted glow as they take over. Most sections
also ease upward into view as you scroll to them (the pinned venue journey and sticky services image are left
alone so their own scroll math stays exact). Change a section's theme by editing its `data-theme` attribute.

## Gallery
Tiles cascade in with a staggered delay, tilt gently toward the cursor on desktop, and the lightbox now has a
blurred cinematic backdrop of the current photo plus a directional slide when you move next/previous.

## Where enquiries go (Supabase)

The contact form does two things at once: it opens a pre-filled WhatsApp message (your main
channel, unchanged) **and** saves the enquiry to a database, so nothing is lost if someone
fills the form and never presses send in WhatsApp.

- Project: **city-garden**, org *Skaira ltd*, region Mumbai (ap-south-1)
- Table: `enquiries` — name, phone, event_type, preferred_date, guests, message, created_at
- Read them at **supabase.com → city-garden → Table Editor → enquiries** (or export CSV there)

**Security.** The key in `js/main.js` is the *publishable* key and is meant to be public.
What protects the data is row-level security on the table: the browser role (`anon`) is
granted `INSERT` and nothing else, and has no `SELECT` policy or privilege. So the page can
add an enquiry and literally cannot read one back — verified by running an insert and a
select as that role. Never put the `service_role` key in this site; it bypasses all of that.

**Free tier.** Supabase pauses a free project after about a week with no activity, which
would stop enquiries saving. Because WhatsApp still opens either way you would not lose
enquiries, but you would lose the record of them. If the venue is quiet for stretches,
either log in occasionally or move the project to a paid plan.

A hidden "website" field in the form is a spam honeypot — people never see it, bots fill it,
and those submissions are not stored.

## Review page (/review/)

`review/index.html` is a standalone page for collecting Google reviews. Point your QR code at
**https://www.citygarden.co.in/review/** — it needs no other link to work, and it's also in the
site footer as "Share a review".

How it works: the guest picks a rating, ticks the parts of the day they actually experienced,
optionally adds a line in their own words (typing or voice), and the page drafts a review from
those answers. They can edit every word, switch length (short/medium/long), or ask for a
different version. "Copy review & open Google" copies the text and opens your Google review
form, where they choose their own star rating and publish. **Nothing is ever posted automatically.**

Deliberate choices worth keeping:
- Every rating takes the same route to Google, and the private-email option is offered to
  everyone. Filtering unhappy guests away from Google breaks Google's policies and can get a
  listing penalised, so the flow doesn't do it.
- Search phrases are capped at two per review, never on 1–2 star reviews, and never twice on the
  same noun. Google removes reviews that read like advertisements, so restraint protects the listing.
- The page writes nothing the guest didn't tell it. No invented guest counts, dates or dishes.
- The page is `noindex` (it's a utility page, thin on content) and is not in `sitemap.xml`.
  The footer link is still followed.

To change the Google link, the email, or the wording, everything is at the top of the `<script>`
block in `review/index.html` under `BUSINESS`.

### Optional: let an AI model write the drafts
The page drafts on the device by default — instant, free, works offline, no account needed.
If you'd rather have a model write them, deploy `review/ai-worker.example.js` (a Cloudflare
Worker; instructions are in the file, about five minutes) and set `aiEndpoint` in
`review/index.html` to its URL. If the endpoint is slow, down, or out of credit, the page
falls back to local drafting and the guest sees nothing unusual.

**Never put an API key into `review/index.html`.** It's a public file — anyone can read it in
the page source and spend your credit. That's the only reason the Worker exists.

## Screen sizes
One responsive site, no separate mobile file:
- Phone (under 600px): stacked layout, swipe carousels, Call/WhatsApp bar at the bottom.
- Tablet (600 to 959px): two-column services and contact, three reels side by side.
- Laptop and desktop (960px and up): full menu, pinned horizontal venue journey, sticky services image, custom cursor.
- Short laptop screens (1366x768): tighter spacing so headings and images fit the screen.
- Large monitors (1600px and up): wider layout, 4-column gallery, type scales up.
