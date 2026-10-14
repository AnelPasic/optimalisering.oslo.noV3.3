# H-021B - PageList visual media + alternating layouts

Date: 2026-10-14
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED CORRECTION TO H-021

## Why this exists

H-021 proves the correct data/source architecture, but OWNER visual review finds the delivered PageList too text-heavy.

The source-of-truth model is correct and must remain.

The correction is visual/editorial:
- a listed page should be able to own an image or icon used by PageLists
- PageList needs media-rich presentation
- PageList needs an alternating image/text layout for visual rhythm

Reference direction:
- Invite reference/case lists: large media-led rows with strong content rhythm
- Storebrand: image cards and larger alternating image/text content blocks

Do not clone either brand. Generalize the pattern into Medon's current design system.

## Core rule

The PAGE owns its listing metadata and visual.

The PageList section owns:
- selection/query
- sorting
- count
- presentation layout

Do not store duplicate image/title/summary/href data inside the PageList config.

## Extend article listing metadata

Extend the existing article-level `listing` object with a controlled optional visual:

```
listing:
  title
  summary
  label
  order
  visible
  visual
```

### visual kinds

Support:

1. **image**
2. **icon**
3. **none** / omitted

Preferred typed shape:

```
visual:
  kind: image | icon
  src?: ...
  alt?: ...
  positionX?: ...
  positionY?: ...
  icon?: ...
```

Use a discriminated schema if practical so irrelevant fields are rejected.

### Image

Use a dedicated listing-media path, for example:

`/images/listing/`

Allow:
- webp
- png
- jpg/jpeg
- avif

SVG should normally be handled as an icon/illustration primitive rather than arbitrary uploaded article imagery unless current media architecture gives a clear safe reason.

Required:
- src
- truthful alt
- crop X/Y with safe defaults 50/50

Reuse the existing safe file/crop conventions where practical.

Pages CMS must allow selecting/uploading the media cleanly.

### Icon

Use the existing local icon strategy.

Prefer the already shipped/pinned Phosphor/local generic icon vocabulary.

For this pilot provide a small controlled enum suitable for editorial/service lists, e.g.:
- search
- conversion
- analytics
- trend
- page
- route

Do not accept arbitrary icon class names or remote icon URLs.

Icons are decorative when the adjacent title already names the topic; hide decorative icon SVGs from assistive technology.

## Resolver

Extend `PageListItem` so the resolved item can carry the page-owned visual.

The resolver remains the single source for:
- title
- summary
- label
- href
- visual

No PageList layout should query the raw page record again independently.

Invalid/missing visual asset:
- fail safe
- do not break the page
- fall back to no-media/icon-safe presentation
- test explicitly

## PageList layouts

H-021 currently has:
- cards
- compact
- links

Keep those for compatibility.

Add:

### 1. mediaCards

CMS label:
**Bildekort**

Behavior:
- responsive grid
- image/visual occupies the top visual area
- title + summary + link below
- image aspect ratio consistent across cards
- card heights should remain visually coherent without forcing equal text length
- at desktop normally 3 columns where width/count make sense
- 2/1 columns as viewport requires
- if item uses icon, render a designed icon field/visual area rather than leaving a blank image slot
- if item has no visual, use an intentional text-only fallback; do not show broken/empty media chrome

This should cover the Storebrand-style three-up media-card family without copying Storebrand styling.

### 2. alternating

CMS label:
**Bilde og tekst annenhver side**

Behavior:
- one large row per result
- two-column composition on desktop
- item 1: text left / visual right
- item 2: visual left / text right
- continue alternating by displayed index
- stack cleanly on mobile
- mobile reading order should remain sensible and consistent; prefer visual then text OR text then visual deliberately, not DOM-order chaos
- sufficiently generous spacing so it does not become a dense card wall
- surface/radius/padding consume the approved H-018/H-019 primitives
- explicit PageList/section surface still works

This should cover the Invite/Storebrand visual rhythm pattern without cloning either site.

## Existing layouts

### cards
Keep current text-card layout semantics.

If a visual exists, do NOT silently change current `cards` into media cards.
The OWNER should choose `Bildekort` explicitly.

### compact
Remain compact.

May show a small icon when `visual.kind === icon` if it improves scanning, but do not turn compact rows into large media cards.

### links
Remain a simple link list.
No large imagery.

## Pilot content

Do not fabricate editorial photography for the two current Innsikt articles.

For the current pilot, assign controlled icons so the media-capable system can be reviewed without inventing photography:

### Hva bør optimaliseres først?
Use a suitable existing generic icon such as:
- route
or another approved icon that clearly communicates prioritization/path.

### Hvordan måle effekten?
Use:
- analytics
or trend

Choose the clearest existing approved generic icon.

Do not change article title/body/SEO/list summary.

Set the /innsikt/ PageList default layout for OWNER review to:

`alternating`

using the icon visual treatment if no real image is supplied.

Important:
the alternating layout must still look intentional with icons, not like a giant empty photo placeholder.

OWNER can later upload real listing images through Pages CMS without code changes.

## CMS

### Article editor

Under article listing fields add:

**Listevisual**
- Ingen
- Bilde
- Ikon

For Bilde:
- Bilde
- Alternativ tekst
- Horisontalt utsnitt
- Vertikalt utsnitt

For Ikon:
- Ikon

If Pages CMS cannot conditionally hide irrelevant fields, group the object clearly and add concise descriptions.

Do not expose arbitrary CSS, icon class, image URL outside approved media handling.

### PageList editor

Extend `Visning` choices to:

- Kort
- Bildekort
- Bilde og tekst annenhver side
- Kompakt
- Lenker

No raw template field.

## Visual rules

The PageList variants must use the current shared design system:

- current typography tokens
- current surfaces
- current card radii
- current panel spacing
- current borders
- current link/button system

Do not create a separate "Innsikt design language".

Images:
- `object-fit: cover`
- consume crop controls
- responsive
- explicit width/height/aspect ratio to avoid layout shift

Icon visual blocks:
- generous but restrained
- use current color/surface tokens
- icon size should feel editorial, not dashboard-like
- no dark-blue dashboard aesthetics
- no icon clutter

## Alternating algorithm

Alternate based on the final displayed list index AFTER:
- automatic/manual selection
- visible filtering
- exclusion
- sorting
- limit

This guarantees stable visual rhythm for the actual results.

Do not persist "left/right" on each article.

Presentation order is the PageList's job.

## Accessibility

- meaningful images use listing alt
- purely decorative icons have aria-hidden
- title remains a real heading
- links remain semantic
- no visual information may exist only through left/right position
- layouts work with JS disabled

## QA

Focused tests must cover:

1. listing visual schema accepts image/icon/omitted.
2. invalid arbitrary icon rejected.
3. invalid image path rejected/fails safe according to selected architecture.
4. resolver carries visual from page to result.
5. no visual data duplicated in PageList config.
6. mediaCards with image.
7. mediaCards with icon.
8. mediaCards without visual fallback.
9. alternating order at 1/2/3/4 items.
10. alternating happens after filtering/sorting.
11. manual reversed order also reverses visual alternation naturally.
12. image crop values render correctly.
13. compact/links remain appropriately restrained.
14. no broken image layout.
15. 1440 / 900 / 390 / 320.
16. JS disabled.
17. current article body/H1/SEO/list copy unchanged.
18. all unrelated routes/rendering preserved.

## Visual evidence

Provide review captures for:

- alternating, 2 current items, desktop/mobile
- alternating synthetic 3-item fixture
- mediaCards with mixed image/icon/no-media fixture
- compact
- links
- CMS listing visual configuration

Use a local/test fixture image for QA if needed.
Do not commit fabricated customer/editorial imagery as production content.

## H-021 status

H-021 architecture is retained.

Do NOT mark PageList system acceptance complete until H-021B OWNER visual/CMS review passes.

## Delivery

Pull latest main.

Implement H-021B only.

Run focused PageList visual/CMS QA + full verify.

Push main.
Verify connected Worker.
Update CODEX-TO-CHATGPT with exact implementation/evidence.

Then STOP for OWNER visual/CMS review.
