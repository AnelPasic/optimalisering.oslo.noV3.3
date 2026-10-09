# H-015 — Pricing visual polish using isolated illustration motifs

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED FOR IMPLEMENTATION REVIEW

## Verdict on H-014

H-014 materially fixes the density problem. The package cards are now compact enough to compare.

The remaining gap is visual quality.

The current line-chart fallbacks are technically correct but visually too plain compared with the approved mockup direction.

Do **not** reopen package copy, price logic, card density or direct ordering.

The next pass is visual polish only.

## Core idea

Use only the **useful visual motifs** from the previously approved pricing illustration direction.

Do not rasterize or paste the whole mockup.

Recreate the package-specific visual fragments as clean standalone SVG assets/components so:
- they stay crisp;
- they can inherit our palette;
- they remain editable;
- the card stays semantic HTML;
- there is no text baked into raster artwork.

## Package visual motifs

### Optimalisering

Target:
- one clear upward path;
- controlled moderate rise;
- one small visual cue that communicates **one lever / one priority**;
- calmer than Vekst;
- not exponential.

Optional micro-label outside the artwork, in HTML:
> Én spak

Optional support:
> Tydelig fremgang

Do not show a percentage.

### Vekst

Target:
- one dominant steeper exponential-style growth path;
- visual should clearly feel more powerful than Optimalisering;
- imply two reinforcing inputs without drawing two permanent parallel arrows;
- recommended card gets the strongest visual emphasis.

Optional micro-label in HTML:
> To grep

Optional support:
> Forsterker hverandre

No numeric uplift.

### Partner

Target:
- three distinct upward tracks;
- clearly read as several customer journeys / growth tracks;
- slightly stronger overall rise than H-014;
- controlled and coordinated, not chaotic.

Optional micro-label in HTML:
> Flere kundereiser

Optional support:
> Prioriteres løpende

No numeric uplift.

## Composition

Each card visual should feel like a small editorial infographic, not a bare chart.

Preferred composition:
- horizontal 16:7-ish visual strip;
- subtle tinted background;
- curve/track graphic on the left/center;
- one compact semantic callout on the right if it improves comprehension;
- no giant empty box;
- no decorative clutter.

Keep the visual height in the H-014 compact range.

## Icons

Retain the compact icon rows from H-014.

Do not turn icons into another paragraph layer.

## Asset implementation

Preferred:
- standalone SVG files under /images/pricing/
- or a reusable SVG component with package-specific variants

Do not use a low-resolution crop from the mockup in production.

The mockup is the visual reference, not the final asset.

If SVG files are used, keep them free of unsupported fonts and external dependencies.

## Preserve

Preserve exactly:
- H-014 compact default card heights/density;
- H-012/H-013 package copy and long-detail disclosures;
- direct order CTAs;
- free check as secondary;
- one shared package source;
- Vekst Anbefalt;
- Partner fra 14 900;
- all order preselection behavior;
- disabled review submission;
- all accepted page structures outside the visual strip.

## Acceptance

1. Cards remain approximately H-014 height.
2. Visuals feel materially closer to the approved pricing illustration than the bare H-014 line charts.
3. Optimalisering reads as one controlled lever.
4. Vekst reads as a clearly stronger compounding/reinforcing option.
5. Partner reads as multiple parallel customer journeys.
6. No visual contains numeric performance claims.
7. No whole-card raster artwork is introduced.
8. Mobile remains compact and readable.
9. Direct ordering remains unchanged.
10. No copy/price/CTA hierarchy regressions.

## Evidence

Capture:
- three pricing cards 1440
- each visual strip close-up
- 390 mobile cards
- homepage compact package cards

Stop for OWNER + STRATEGY_CONTENT visual review.
