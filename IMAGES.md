# Images for the journal

35 posts are queued. The venue has **23 photographs**, and the home page already uses
essentially all of them. So "crop something from `images/`" does not survive contact
with the calendar, and the gap is not only arithmetic — there is no photograph of a
retirement party, a corporate day, a godh bharai, a nikah or a griha pravesh at City
Garden, because nobody took one.

This is the order to try, per post.

## Current position: stock, for now

Arsh has chosen stock images while the venue's own photo library is thin. That works,
with one constraint that shapes the whole process: **nothing in this project can
download them.** The sandbox the weekly task runs in reaches package registries and
GitHub and nothing else — `images.pexels.com`, `images.unsplash.com` and
`cdn.pixabay.com` are all unreachable, with or without an API key.

So the library is built once, by hand, and the weekly task picks from what is already
in the repository. It never tries to fetch.

### How a stock image gets in

1. Download it from **Pexels** or **Unsplash**. Both permit commercial use with no
   attribution required. Pixabay also works.
2. Run it through the tool, which crops it, writes all four files, and records where it
   came from:

```
python3 tools/add-stock.py ~/Downloads/pexels-haldi.jpg \
    --slug blog-haldi \
    --platform pexels \
    --url https://www.pexels.com/photo/12345/ \
    --photographer "A. Name" \
    --alt "Turmeric paste being applied during a haldi ceremony" \
    --focus 0.45
```

It refuses an image with no source URL, and refuses alt text that names City Garden on
a stock photograph. The rules and the ledger live in
`images/ritual-inspiration/SOURCES.md`.

### Choosing well

- **Avoid identifiable faces.** Free stock licences do not include a model release, and
  a recognisable person used to advertise a business is a bigger problem than the
  licence. Hands, mehendi detail, marigolds, a laid table, an empty decorated stage, a
  wide crowd shot — these are safer *and* read better as headers.
- **Never a child's face**, including on the birthday posts.
- **Indian weddings, not generic Western ones.** Search "haldi ceremony", "mehndi
  hands", "indian wedding marigold" rather than "wedding". A white-dress-and-church
  photo on a Varanasi marriage-lawn blog undoes the credibility the post is building.
- **Nothing that looks like a different venue.** A photograph of an obvious five-star
  ballroom sitting on a City Garden post invites the comparison you do not want.

## The order to try, per post

### 1. A real photograph of the venue — first, whenever the subject matches

An original photograph of City Garden is worth more than any stock image, for two
reasons that both matter: it is evidence the venue exists and looks like this, and
Google's helpful-content signals favour original media over library stock. Use one
whenever the subject genuinely matches.

A single 1200x900 source yields two or three distinct 4:3 crops — a wide one and a
detail — so the library stretches further than the file count suggests. Crop to a focus
point rather than the centre. **Never use the same crop on two posts.**

### 2. A brand card — for anything that cannot be photographed

Roughly half the queue is about a decision, not a scene: the budget, the guest list,
the contract, vendor coordination. Stock photographs of those topics are the worst kind
— a stranger pointing at a laptop, a calculator on a notebook — and they read as filler
on a page that is otherwise specific.

`tools/make-card-image.py` draws a typographic card in the brand instead: parchment or
burgundy, the mandala at low opacity, the lotus rule, the post's phrase in Cormorant.

```
python3 tools/make-card-image.py \
    --slug blog-budget \
    --kicker "Planning" \
    --line "Where the money\nactually goes" \
    --theme parch
```

Themes are `parch`, `burg` and `wine`. Alternate them so the journal index never runs
three of one colour together.

### 3. Stock — for the scenes the venue has no photograph of

Haldi, mehendi, a nikah setting, a birthday table, a corporate room. Added as above,
recorded in the ledger, alt text describing the image rather than the venue.

## Longer term

Stock is a bridge, not the destination. Every stock image on the site is one Google
has seen on a thousand other pages, and a venue's own photographs are the one visual
asset no competitor can copy. The shot list below is what closes that gap, and it costs
a phone and someone remembering.

## The shot list — what to ask the venue to photograph

This is the highest-value thing on this page. The venue hosts every one of these
already; it costs a phone and someone remembering. Ask for a handful of each, shot
landscape, in the evening with the lights on where that is the real setting.

**Functions, as they happen**
- Haldi — the yellow, the family, the daytime light
- Mehendi — hands, the artist working, the seating
- Sangeet — the stage mid-performance, the dance floor
- Baraat — the arrival at the gate, the band, the crowd
- Nikah — the seating and setting, respectfully and with permission
- Walima — the reception layout
- Vidaai — the departure, if a family is comfortable with it

**Other events the venue already hosts**
- A children's birthday setup
- A milestone birthday or anniversary — the stage, the cake table
- A corporate day — rows of chairs, a projector, a lectern
- A godh bharai or similar family function

**The venue itself, unglamorous and useful**
- The lawn empty in daylight, so the actual size reads
- The hall empty, same reason
- The parking, full
- Catering counters mid-service, and the kitchen if it is presentable
- The entrance by day and by night

**Permission.** Guests at a private family function have not agreed to appear on a
business website. Ask the host before shooting and before publishing, prefer wide shots
and details over identifiable faces, and never publish a child's face. A photograph of
an empty, beautifully set lawn is more useful for most posts anyway.
