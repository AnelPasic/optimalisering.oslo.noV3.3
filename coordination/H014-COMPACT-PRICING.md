# H-014 — Compact pricing decision surface

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT
Status: LOCKED FOR IMPLEMENTATION REVIEW

## Verdict on H-013

H-013 passes technically and the direct-order architecture is correct.

H-013 does **not** pass visually.

The problem is not lack of information. The problem is that the full cards try to display almost all information at once. At desktop they become long brochure columns; on mobile the user faces three very long documents before reaching the rest of the page.

The next revision must make the package comparison a **decision surface**, not a content dump.

Do not rewrite the offer strategy.

## 1. Do not turn the whole card into an image

Use semantic HTML for:
- package name;
- price;
- descriptor;
- fit;
- situations;
- CTA;
- accessible details.

Use SVG/image only for:
- the conceptual package visual;
- small professional icons.

This keeps the page editable, accessible, responsive and CMS-driven.

## 2. Desktop target

At 1440px, the three package cards should read like the previously approved compact mockup direction.

The visitor should be able to compare all three cards in one visual scan.

Target:
- 3 equal columns;
- approximately 680–780px card height before optional expanded detail;
- no card should become ~1200–1500px tall by default;
- Vekst remains visually favored;
- natural text size; do not solve compactness with tiny typography.

The default cards should contain only what is needed to choose.

## 3. Compact card hierarchy

Each full /priser/ card default state:

1. Top row: package name + price
2. Descriptor
3. Conceptual visual
4. Short “Passer for” sentence
5. “Typiske situasjoner” — maximum 3 concise bullets
6. One compact icon row/grid
7. Primary direct-order CTA
8. Secondary “Se detaljer” disclosure

Do not show long scope paragraphs, distinction paragraphs, typical-business paragraphs and long combination descriptions in the default card.

## 4. Exact compact visible copy

### Optimalisering

Descriptor:
> Ett viktig problem om gangen.

Visible fit:
> For små og mellomstore bedrifter med én tydelig kundereise eller én flaskehals som er viktigst nå.

Visible situations:
- Blir ikke funnet når kundene søker.
- Har trafikk, men får for få henvendelser eller kjøp.
- Får for lite ut av Google Ads eller en annen viktig kanal.

Visible icon items:
- SEO / AI-synlighet
- Konvertering
- Lokal SEO
- Google Ads

CTA:
> Bestill Optimalisering

### Vekst

Descriptor:
> To grep som forsterker hverandre.

Badge:
> Anbefalt

Visible fit:
> For bedrifter som trenger fremgang på to deler av samme kundereise samtidig.

Visible situations:
- Trenger fart nå og vil bygge organisk synlighet over tid.
- Har trafikk, men vil få mer ut av den med bedre konvertering.
- Resultatet avhenger av at to områder forbedres samtidig.

Visible icon/combo items:
- Google Ads + konvertering
- SEO / AI-synlighet + konvertering
- Google Ads + SEO / AI-synlighet

CTA:
> Bestill Vekst

### Partner

Descriptor:
> Flere tjenester og kundereiser.

Visible fit:
> For bedrifter med flere tjenester, markeder eller kundereiser som må prioriteres løpende.

Visible situations:
- Flere tjenester konkurrerer i ulike markeder.
- Ulike kundereiser trenger ulike grep.
- Trenger løpende prioritering på tvers.

Visible icon items:
- SEO / AI-synlighet
- Google Ads
- Meta Ads
- Konvertering
- Analyse

CTA:
> Bestill Partner

Price:
> fra 14 900 kr/mnd

## 5. Long copy remains available — but collapsed

Preserve the full H-012/H-013 copy in the same shared CMS source.

Move these into a native, accessible disclosure per package:
> Se detaljer

Collapsed by default.

The expanded detail may include:
- typical business example;
- full scope/work model;
- full distinction;
- full combination descriptions;
- selection rule;
- Partner price note.

Use native <details>/<summary> where practical.

No JavaScript is required merely to read the detail.

On direct anchors such as /priser/#optimalisering, it is acceptable to keep the card compact; do not auto-expand unless implementation remains simple and robust.

## 6. Visual area

The visual should be a **horizontal compact strip**, not a large square panel.

Desktop visual target:
- around 120–150px high;
- fills card width naturally;
- soft background treatment allowed;
- no excessive empty vertical space.

Mobile:
- approximately 100–130px high.

Current three independent visualAsset CMS fields remain.

Final conceptual art can be SVG. Do not make the entire pricing card a raster image.

Fallback curves remain until final assets are supplied.

## 7. Exact conceptual visual semantics

Optimalisering:
- one moderately rising line/arrow;
- near-linear/control feeling;
- not exponential;
- no percentage.

Vekst:
- one visibly steeper exponential-style curve;
- one dominant curve;
- represents two reinforcing levers;
- no two persistent parallel arrows;
- no percentage.

Partner:
- three distinct rising tracks;
- slightly stronger overall rise than current H-013;
- shows several journeys being improved in parallel;
- controlled, not a moonshot.

## 8. Icon row

Icons should help scanning, not make the cards longer.

Desktop:
- horizontal row/grid;
- icon above or beside a short label;
- no long descriptions visible by default.

Vekst combination descriptions move into “Se detaljer”.

Partner may use 5 small icon items.

Use local professional SVG/icon components; no emojis.

## 9. Homepage cards

Homepage should be even more compact.

Keep:
- name + price;
- descriptor;
- small visual strip;
- one short fit sentence;
- Bestill package CTA;
- Se pakken.

No visible situations or icon row required on homepage unless they fit without materially increasing height.

Target: the three homepage cards should feel like a compact chooser, not three mini pricing pages.

## 10. Decision strip

Keep:
> Én flaskehals, to grep eller flere kundereiser?

This should sit close enough below the cards to reinforce the choice.

Do not repeat the same long copy already shown in the cards.

## 11. Multiplier block

Keep the H-012 logic but make it visually concise.

The conceptual row:
> Bli funnet → bli valgt → gå videre

should do most of the visual work.

Do not add another large essay immediately after the cards.

## 12. Direct order

H-013 direct ordering passes and must stay.

Primary buttons remain:
- Bestill Optimalisering
- Bestill Vekst
- Bestill Partner

They preselect one shared order form.

Free check remains the secondary uncertainty path.

Ordering stays safely disabled in review until explicitly enabled later.

## 13. Mobile

Do not stack three giant documents.

Each card default state must remain compact.

Expected order:
1. concise card
2. CTA
3. collapsed Se detaljer

Then next package.

Expanded detail is user-initiated.

## 14. What H-014 must not do

Do not:
- change prices;
- change package names;
- remove direct order;
- reintroduce free check as primary CTA;
- add “Mest valgt”;
- invent performance percentages;
- rewrite service pages;
- enable production ordering;
- build the whole pricing card as an image.

## Acceptance

1. All three package cards can be visually compared quickly at 1440px.
2. Default full /priser/ card height is materially reduced versus H-013.
3. No long paragraph is visible by default merely because it exists in CMS.
4. H-012/H-013 long copy remains accessible under “Se detaljer”.
5. Vekst is visually favored but not dramatically oversized.
6. Package visual area is compact horizontal, not a giant square.
7. Icon areas scan quickly.
8. Homepage package cards are shorter than H-013.
9. Direct-order preselection still works for all three packages.
10. Mobile default experience no longer requires scrolling through three long open brochures.
11. All content still comes from the shared package source.
12. 1440/390/320 QA passes.
13. All other accepted pages remain protected.

## Evidence

Capture:
- homepage cards 1440 + 390
- /priser/ cards default 1440 + 390
- /priser/ one expanded detail at 1440 + 390
- direct order CTA -> selected form
- decision + multiplier block

Record measured card heights before/after at 1440 and 390.
