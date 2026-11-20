# Journal plan — City Garden

The weekly scheduled task reads this file, takes the **first row whose Status is
`todo`**, writes that post, and sends the draft to Arsh for approval. Only after he
approves does it publish and change that row's Status to `done` with the live date.

If every row is `done`, the task does not invent a topic. It proposes three new rows,
asks which to add, and stops.

## Linking rules — every post must satisfy all of these

These are the whole point of the exercise, so they are not optional and the draft sent
for approval must list which links it used.

1. **One link to the enquiry section** (`/#contact`), in the closing paragraph, with
   natural anchor text — never "click here" or a bare URL.
2. **At least two links to other journal posts**, with descriptive anchor text that
   describes the destination ("what a wedding here actually costs"), placed where the
   sentence genuinely calls for it.
3. **At least one link to a home-page section** — `/#venue`, `/#services`, `/#gallery`
   or `/#rituals` — using the keyword the target section is meant to rank for.
4. **One to three outbound links**, and only where the post states a checkable fact
   that deserves a source: a government or tourism page, a transport or weather
   authority, a recognised news outlet. Add `target="_blank" rel="noopener"`. Never
   link to another Varanasi venue, and never to a directory the business has not
   claimed.
5. **Anchor text is never reused** for two different destinations anywhere on the site,
   and the exact-match keyword is used at most once per post. Vary it.
6. **No more than eight links in a post.** Past that it reads as spam and Google
   treats it that way.

## House rules for the writing

- 700–1,000 words. Longer is not better; the posts are read on phones.
- Plain, specific, first-person-plural where it fits. No adjective stacking, no
  "nestled in the heart of". Match the voice of the three posts already published.
- The target keyword appears in the H1, in the first 100 words, in one H2, in the meta
  title and in the meta description. Nowhere else by force.
- Never invent a business fact — price, capacity, year, award, number of weddings. If
  a post needs one, ask Arsh for it rather than guessing.
- Every post gets a `<figure>` image cropped 4:3 from the existing `images/` library,
  plus `-m` variants and WebP, same as the published posts.
- Dates in the byline are the publish date.

## Calendar

Three posts are already live. Status `todo` rows are the queue, in order.

| # | Date | Working title | Target keywords | Status |
|---|------|---------------|-----------------|--------|
| 1 | 2026-11-12 | Lawn or banquet hall: how to choose | marriage lawn in varanasi, banquet hall in varanasi | done |
| 2 | 2026-11-06 | A wedding timeline that holds up | wedding planner varanasi | done |
| 3 | 2026-10-30 | Questions worth asking before you book | wedding venues in varanasi | done |
| 4 | 2026-11-28 | What a wedding at City Garden costs | banquet hall in varanasi with price, marriage lawn price in varanasi, wedding cost in varanasi | todo |
| 5 | 2026-12-05 | How to choose a wedding venue in Varanasi | wedding venues in varanasi, best wedding venues in varanasi, varanasi wedding venues | todo |
| 6 | 2026-12-12 | Planning a destination wedding in Varanasi | destination wedding in varanasi, wedding in varanasi | todo |
| 7 | 2026-12-19 | A winter wedding in Varanasi: what the cold changes | marriage lawn in varanasi, wedding in varanasi | todo |
| 8 | 2026-12-26 | Wedding dates in 2027 and what books first | shubh muhurat 2027, marriage hall in varanasi | todo |
| 9 | 2027-01-02 | How many guests a marriage lawn can really hold | best marriage lawn in varanasi, lawn for marriage in varanasi | todo |
| 10 | 2027-01-09 | AC banquet hall or open lawn | ac banquet hall in varanasi | todo |
| 11 | 2027-01-16 | What a wedding caterer should give you | wedding catering varanasi | todo |
| 12 | 2027-01-23 | Baraat logistics: entry, parking, the first twenty minutes | marriage lawn in varanasi | todo |
| 13 | 2027-01-30 | Mandap styles and what each needs from the venue | wedding venues in varanasi | todo |
| 14 | 2027-02-06 | A wedding weekend itinerary for out-of-town guests | destination wedding in varanasi | todo |
| 15 | 2027-02-13 | Wedding photography at a marriage lawn | marriage lawn in varanasi | todo |
| 16 | 2027-02-20 | Haldi, mehendi and sangeet: the smaller functions | banquet hall in varanasi | todo |
| 17 | 2027-02-27 | What a wedding in Varanasi costs in 2027 | wedding cost in varanasi | todo |
| 18 | 2027-03-06 | Booking for next season: why March is the month to look | best banquet hall in varanasi | todo |
| 19 | 2027-03-13 | Reception or wedding day: where the money goes further | wedding hall in varanasi | todo |
| 20 | 2027-03-20 | Summer weddings and how to make them comfortable | ac banquet hall in varanasi | todo |
| 21 | 2027-03-27 | Decor that photographs well without costing the most | wedding venues in varanasi | todo |
| 22 | 2027-04-03 | The venue contract: what to read before you sign | banquet hall in varanasi with price | todo |
| 23 | 2027-04-10 | Corporate events and conferences at the hall | banquet hall in varanasi | todo |
| 24 | 2027-04-17 | Engagement and roka: planning a smaller function | marriage hall in varanasi | todo |
| 25 | 2027-04-24 | Vendor coordination: who talks to whom on the day | wedding planner varanasi | todo |
| 26 | 2027-05-01 | Food counters and menus for 500 guests and up | banquet hall in varanasi | todo |
| 27 | 2027-05-08 | Elderly guests and accessibility at a wedding venue | wedding venues in varanasi | todo |
| 28 | 2027-05-15 | Monsoon weddings: the honest version | marriage lawn in varanasi | todo |

## How a post is built

The three published posts are the template. `/home/.../site/blog/<slug>/index.html` is
generated static HTML — there is no build step on the site, so the file is written
directly and must carry its own head, nav, footer, structured data and the inline
script. Copy an existing post and replace the content rather than writing one from
scratch.

Each new post also needs:

- A card added to the `.journal-row` on `index.html` — and the **oldest** card removed,
  so the home page always shows the newest three.
- A card on `blog/index.html` (that page shows all of them, newest first).
- Cross-links updated on the other posts' "More from the journal" rows.
- A `<url>` entry in `sitemap.xml`.
- Images at `images/blog-<slug-word>.{jpg,webp}` and `-m` variants, 760x570 and 480x360.
