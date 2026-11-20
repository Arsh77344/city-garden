# Journal plan — City Garden

The weekly scheduled task reads this file, takes the **first row whose Status is
`todo`**, writes that post, and sends the draft to Arsh for approval. Only after he
approves does it publish and change that row's Status to `done` with the live date.

If every row is `done`, the task does not invent a topic. It proposes three new rows,
asks which to add, and stops.

---

## What these posts are for

Two audiences, and they want the same thing from different directions.

**Search.** Someone types "haldi ceremony planning" or "wedding budget India" into
Google. The post should be the page that answers it properly, and should mention City
Garden at the end as somewhere that hosts the thing being described.

**AI answers.** The same question gets asked to ChatGPT, Gemini or Google's AI
Overviews. What those systems reward is not the same as what ranked in 2015: they pull
from pages that answer a clear question directly, in the first paragraph, with specific
checkable detail and clean headings. So every post is built around a real question, and
every H2 is a question or a plain statement of what that section answers. Lists and
short paragraphs get quoted; walls of text do not.

### One thing to be straight about: keyword stuffing

Repeating a keyword until it reads oddly now works **against** both goals. Google has
penalised it since 2011, and the language models behind AI answers skip padded text and
quote the page that reads like a person wrote it. So the approach here is coverage, not
density: use the target keyword in the places listed below, use its natural variants
freely, and cover the topic thoroughly enough that the page genuinely deserves the
ranking. That gets the keyword presence without the penalty.

Where the keyword goes, every time:

- the `<h1>`
- the first 100 words
- at least one `<h2>`
- the `<title>` and the meta description
- the image `alt`

Variants and related terms — "marriage lawn", "banquet hall", "wedding venue",
"marriage hall", "Varanasi", "Chaukaghat" — are used wherever a sentence genuinely
calls for them. Exact-match repetition beyond the list above is not.

---

## Voice

Clean and professional, with the Indian wedding actually in it. The tone is a
well-organised cousin who has done this a few times and is telling you how it really
goes — not a brochure, not a stand-up set.

**Open with a question.** The first line of the body is a question a real family asks,
and it can be the quirky one. The `<h1>` stays plain English with the keyword in it,
because that is what gets searched and indexed; the personality starts one line below.

Openers in the right register:

- *Har shaadi mein fufaji naaraz kyun ho jaate hain?*
- *Kitne log aayenge? — the question no Indian family has ever answered honestly.*
- *Mehendi was called for four o'clock. Everyone knows it starts at seven.*
- *Who decided the sangeet practice should begin two days before the sangeet?*

**Hinglish, lightly.** Roman script, two or three touches in a post, and only words a
non-Hindi reader can work out from the sentence around them — shaadi, baraat, fufaji,
kitne log, jugaad, muhurat, rasm. Never in the `<h1>`, the `<title>` or the meta
description, which have to stay searchable in English. Never a whole paragraph in
Hindi. If a Hindi word carries the point, give the English in the same sentence the
first time: *the vidaai, the farewell at the end*.

**Humour, lightly.** The joke is recognition, not punchlines — the uncle who brings
eleven uninvited guests, the dupatta that nobody can find, the DJ who starts at full
volume. One or two moments in a post. Never at the expense of a family, a religion, a
region, a caste, or anyone's budget. The family reading it may be spending more than
they can comfortably afford; the writing never looks down on that.

**What this is not.** No "nestled in the heart of". No adjective stacking. No "in
today's fast-paced world". No fake enthusiasm, no exclamation marks, no emoji.

### Both communities, always

The venue hosts Hindu and Muslim functions — the site names pheras, varmala and
mandap alongside nikah, walima and mehendi. The writing reflects that:

- A post about weddings in general covers both, or is explicitly scoped in its title
  ("Planning a nikah at a banquet hall") so it is not pretending to be universal.
- Never treat Hindu custom as the default and everything else as a variation.
- Get the terms right. Nikah is the marriage contract, walima the reception the groom's
  family hosts after it; mangni is the engagement. Baraat, haldi, mehendi and sangeet
  appear in both communities with different shapes. If a post is unsure of a detail of
  practice, search for it or leave it out — do not guess at someone's religious custom.
- Catering language: the site offers vegetarian and non-vegetarian menus. Say that.
  Do not promise halal, jhatka or any specific certification unless Arsh confirms it.

---

## Closing the post

Every post ends with a short paragraph naming City Garden and connecting the topic to
something the venue genuinely does. Two or three sentences, no hard sell, and it links
to the enquiry section.

**What the venue actually offers**, taken from the site — do not go beyond this list:

- An open marriage lawn and an indoor banquet hall, on one ground at Andhrapull,
  Chaukaghat, Grand Trunk Road, near Varanasi Cantt
- In-house catering, vegetarian and non-vegetarian, for weddings, receptions and
  family functions
- Decoration: stage, mandap, lighting, flowers, styled seating
- One point of contact for venue, food and decor; guest rooms and parking organised;
  site visits before booking
- On-site parking, generator backup, security
- Functions named on the site: haldi, mehendi, engagement, sangeet, baraat, varmala,
  pheras, nikah, walima, receptions, birthdays, corporate gatherings, seasonal parties

If a post's subject is something the venue does not do — the honeymoon, the jewellery,
the invitations themselves — the closing paragraph says what the venue *can* take off
the family's hands on the day, rather than implying it handles the rest. Mentioning the
name is the goal; claiming a service it does not offer is not, and would come back as a
complaint from a family who booked on the strength of it.

**Never invent a business fact.** No price, capacity, year, award or number of weddings
unless it is already stated on the site. If a post needs one, ask Arsh.

---

## Linking rules — every post must satisfy all of these

The draft sent for approval must list every link it used.

1. **One link to the enquiry section** (`/#contact`) in the closing paragraph, with
   natural anchor text — never "click here" or a bare URL.
2. **At least two links to other journal posts**, with anchor text that describes the
   destination, placed where the sentence genuinely calls for it.
3. **At least one link to a home-page section** — `/#venue`, `/#services`, `/#gallery`
   or `/#rituals` — using the keyword that section is meant to rank for.
4. **One to three outbound links**, only where the post states a checkable fact that
   deserves a source: a government or tourism page, a transport or weather authority, a
   recognised news outlet. Add `target="_blank" rel="noopener"`. Never link to another
   Varanasi venue, and never to a directory the business has not claimed.
5. **Anchor text is never reused** for two different destinations anywhere on the site.
6. **No more than eight links in a post.**

## Shape of a post

- 800–1,100 words. Read on a phone, so short paragraphs.
- H1 (keyword, plain English) → opening question → two sentences answering it directly,
  because that is the part an AI answer quotes → the body under question-shaped H2s →
  closing City Garden paragraph.
- At least one list or short table. Those get pulled into AI answers and featured
  snippets more than prose does.
- A `<figure>` image cropped 4:3 from the existing `images/` library, with `-m`
  variants and WebP, same as the published posts.
- Byline date is the publish date.

---

## Calendar

Three posts are live. `todo` rows are the queue, in order. Categories: **W** wedding
function, **P** planning, **C** other celebration.

| # | Date | Cat | Working title | Target keywords | Status |
|---|------|-----|---------------|-----------------|--------|
| 1 | 2026-11-12 | W | Lawn or banquet hall: how to choose | marriage lawn in varanasi, banquet hall in varanasi | done |
| 2 | 2026-11-06 | P | A wedding timeline that holds up | wedding planner varanasi | done |
| 3 | 2026-10-30 | P | Questions worth asking before you book | wedding venues in varanasi | done |
| 4 | 2026-11-28 | P | Indian wedding budget: where the money actually goes | wedding cost in varanasi, indian wedding budget | todo |
| 5 | 2026-12-05 | P | The guest list problem: kitne log aayenge | wedding guest list india | todo |
| 6 | 2026-12-12 | P | Where will everyone stay? Accommodation for outstation guests | wedding accommodation varanasi | todo |
| 7 | 2026-12-19 | W | Haldi ceremony: planning the yellow morning | haldi ceremony planning, haldi function | todo |
| 8 | 2026-12-26 | W | Mehendi function: artists, timings, and why it runs late | mehendi function planning | todo |
| 9 | 2027-01-02 | W | Sangeet night: performances, practice and running the evening | sangeet ceremony planning | todo |
| 10 | 2027-01-09 | W | Baraat: the band, the ghodi and the first twenty minutes | baraat arrangements, marriage lawn in varanasi | todo |
| 11 | 2027-01-16 | W | Planning a nikah at a banquet hall | nikah ceremony, banquet hall in varanasi | todo |
| 12 | 2027-01-23 | W | Walima: planning the reception that follows | walima reception, marriage hall in varanasi | todo |
| 13 | 2027-01-30 | P | Wedding invitations: wording, timing, print or digital | indian wedding invitation | todo |
| 14 | 2027-02-06 | P | Catering for 500 guests and up | wedding catering varanasi, banquet hall in varanasi | todo |
| 15 | 2027-02-13 | P | Wedding decor that photographs well without costing the most | wedding decoration ideas india | todo |
| 16 | 2027-02-20 | P | Wedding photography: light, timings and the shots families forget | wedding photography varanasi | todo |
| 17 | 2027-02-27 | W | Engagement, roka and mangni: planning the first function | engagement ceremony planning, marriage hall in varanasi | todo |
| 18 | 2027-03-06 | P | Shubh muhurat and the 2027 wedding dates | wedding dates 2027, shubh muhurat | todo |
| 19 | 2027-03-13 | W | Reception or wedding day: where the money goes further | wedding hall in varanasi | todo |
| 20 | 2027-03-20 | W | Vidaai: planning the last hour | vidaai ceremony | todo |
| 21 | 2027-03-27 | P | A wedding weekend in Varanasi: an itinerary for your guests | destination wedding in varanasi | todo |
| 22 | 2027-04-03 | P | Destination wedding in Varanasi: what it really involves | destination wedding in varanasi, wedding in varanasi | todo |
| 23 | 2027-04-10 | P | Summer functions: heat, timings and keeping guests comfortable | ac banquet hall in varanasi | todo |
| 24 | 2027-04-17 | C | Planning a children's birthday party | birthday party venue varanasi | todo |
| 25 | 2027-04-24 | C | Milestone birthdays: the 50th, 60th and 75th | birthday party hall varanasi | todo |
| 26 | 2027-05-01 | C | Anniversary celebrations: the 25th and the 50th | anniversary party venue varanasi | todo |
| 27 | 2027-05-08 | C | Planning a retirement party | party hall in varanasi | todo |
| 28 | 2027-05-15 | C | Godh bharai, baby showers and aqiqah | godh bharai function, banquet hall in varanasi | todo |
| 29 | 2027-05-22 | C | Griha pravesh and house functions held at a hall | griha pravesh function | todo |
| 30 | 2027-05-29 | C | Corporate events, conferences and annual days | conference hall in varanasi, banquet hall in varanasi | todo |
| 31 | 2027-06-05 | P | Monsoon functions: the honest version | marriage lawn in varanasi | todo |
| 32 | 2027-06-12 | P | A small function in a big venue: making 80 guests feel right | marriage hall in varanasi | todo |
| 33 | 2027-06-19 | P | Vendor coordination: who talks to whom on the day | wedding planner varanasi | todo |
| 34 | 2027-06-26 | P | The venue contract: what to read before you sign | banquet hall in varanasi with price | todo |
| 35 | 2027-07-03 | P | Elderly guests: seating, access and the things nobody plans for | wedding venues in varanasi | todo |
| 36 | 2027-07-10 | P | Kids at a wedding: what to do with forty of them | best marriage lawn in varanasi | todo |
| 37 | 2027-07-17 | P | Music, DJ and sound: what works on an open lawn | marriage lawn in varanasi | todo |
| 38 | 2027-07-24 | P | Booking for next season: why July is the month to look | best banquet hall in varanasi | todo |

---

## How a post is built

The three published posts are the template. `site/blog/<slug>/index.html` is generated
static HTML — there is no build step on the site, so the file carries its own head,
nav, footer, structured data and inline script. Copy an existing post and replace the
content rather than writing one from scratch.

Each new post also needs:

- A card added to the `.journal-row` on `index.html`, and the **oldest** card removed,
  so the home page always shows the newest three.
- A card on `blog/index.html`, newest first.
- The "More from the journal" rows on the other posts updated.
- A `<url>` entry in `sitemap.xml`.
- Images at `images/blog-<word>.{jpg,webp}` and `-m` variants, 760x570 and 480x360.
