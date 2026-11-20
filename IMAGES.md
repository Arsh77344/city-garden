# Images for the journal

35 posts are queued. The venue has **23 photographs**, and the home page already uses
essentially all of them. So "crop something from `images/`" does not survive contact
with the calendar, and the gap is not only arithmetic — there is no photograph of a
retirement party, a corporate day, a godh bharai, a nikah or a griha pravesh at City
Garden, because nobody took one.

This is the order to try, per post.

## 1. A real photograph of the venue — always first

An original photograph of City Garden is worth more than any stock image, for two
reasons that both matter: it is evidence the venue exists and looks like this, and
Google's helpful-content signals favour original media over library stock. Use one
whenever the subject genuinely matches.

A single 1200x900 source yields two or three distinct 4:3 crops — a wide one and a
detail — so the library stretches further than the file count suggests. Crop to a focus
point rather than the centre; `tools/` has the approach used for the existing cards.
**Never use the same crop on two posts.**

## 2. A brand card — for anything that cannot be photographed

Roughly half the queue is about a decision, not a scene: the budget, the guest list,
the contract, the timeline, vendor coordination. A wedding-stage photograph on those
posts reads as filler, and reusing one for the fourth time reads as worse.

`tools/make-card-image.py` draws a typographic card in the brand instead — parchment or
burgundy, the mandala at low opacity, the lotus rule, the post's own phrase in
Cormorant. It renders through headless Chrome so the real self-hosted fonts are used,
and writes all four files a card needs.

```
python3 tools/make-card-image.py \
    --slug blog-budget \
    --kicker "Planning" \
    --line "Where the money\nactually goes" \
    --theme parch
```

Themes are `parch`, `burg` and `wine`. Alternate them down the journal index so three
cards in a row are never the same colour. Keep the phrase to two short lines — it is the
post's idea, not its title repeated.

## 3. Licensed stock — last, and labelled

Only when a post needs a scene the venue has no photograph of and a brand card would
not carry it. Then:

- The licence must permit commercial use. Record where it came from.
- It goes in `images/ritual-inspiration/`, which exists for exactly this and is
  quarantined to the Celebrations section on the home page.
- **The alt text must not claim it is City Garden.** Describe what it shows
  ("mehendi being applied to a bride's hands"), never "mehendi at City Garden". A stock
  photo presented as the venue is the kind of thing a family notices on the site visit.

### Open issue: the existing stock has no provenance

`images/ritual-inspiration/` arrived in the initial commit with no licence file,
attribution or record of origin — eleven images whose source nobody can currently
state. That is a real exposure: stock agencies do pursue unlicensed use, and the claim
lands on the business. Worth resolving before adding more. Either the original designer
can say where they came from, or they should be replaced with photographs from the
venue or images whose licence is on file. A `images/ritual-inspiration/SOURCES.md` with
one line per file is the fix.

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
