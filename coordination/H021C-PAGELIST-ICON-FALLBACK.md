# H-021C - PageList alternating icon fallback polish

Date: 2026-10-14
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED CORRECTION TO H-021B

## Review verdict

H-021/H-021B architecture is accepted in principle:
- page-owned listing metadata/media
- automatic/manual selection
- sort/limit/exclude
- mediaCards / alternating / compact / links
- single-source-of-truth resolver

OWNER visual review does NOT accept the current alternating icon fallback as final.

Problem:
- real images deserve a large alternating media field
- generic icons do not
- current icon fallback consumes roughly the same large visual area as photography, creating oversized pastel empty panels and weak visual density

This is a narrow visual correction only.

## Core rule

Alternating layout must adapt to the visual kind.

### Image
Keep the large media-led alternating composition.

Desktop:
- approximately balanced two-column composition
- image may consume ~45-55% of row width
- current large editorial rhythm remains

### Icon
Use a smaller visual block.

Desktop direction:
- text remains the dominant content area
- icon visual should normally consume roughly 28-36% of row width, not 50%
- visual block should have a restrained fixed/fluid height rather than a wide 16:9 billboard
- icon remains generously sized but should not float in excessive empty space

Suggested intent, not mandatory exact values:
- grid around 1.4fr / .6fr or similar for text+icon
- icon panel max-height around 220-280px desktop
- max-width/containment where useful

Even rows must still alternate correctly.

### No visual
Continue intentional one-column text fallback.

## Mobile

For alternating items with icons:
- keep a single-column reading order
- text remains primary
- icon panel becomes shallow/compact
- avoid a large 16:9 block after a short text item
- target roughly 140-190px visual height depending on width
- preserve comfortable spacing

For alternating items with images:
- full-width image treatment remains appropriate
- image keeps useful editorial aspect ratio

Do not use client-side JS.

## Implementation

Prefer explicit semantic state on the listing item, e.g.:

- data-visual-kind="image"
- data-visual-kind="icon"
- data-visual-kind="none"

Do not rely on fragile selector tricks if explicit state is cleaner.

The renderer already knows item.visual.kind.

Use current shared tokens:
- surfaces
- radius
- spacing
- typography

Do not create new arbitrary color palette/radius system.

## ListingVisual

It is acceptable to make icon and image visual geometry context-aware.

Do not globally shrink icons in mediaCards if that harms that layout.

If needed:
- ListingVisual remains generic
- PageList alternating layout supplies contextual constraints

No duplicated visual renderer.

## Preserve

Do not change:
- PageList query/resolver behavior
- schema/CMS fields
- image upload/crop
- selected icons
- article copy/SEO
- listing copy
- sorting
- default alternating layout
- mediaCards layout except necessary no-regression adjustments
- compact/links
- H-019/H-020 controls
- unrelated routes
- noindex/intake

## QA

Focused visual checks:

1. current two-icon /innsikt/ alternating desktop looks materially denser than H-021B.
2. icon panels no longer resemble empty photo placeholders.
3. first/second icon items still alternate.
4. synthetic image items retain large media-led 50/50-ish alternating layout.
5. mixed image/icon/image list maintains coherent rhythm.
6. 1/2/3/4-item alternation remains correct.
7. mobile icon blocks are shallow/compact.
8. mobile image blocks remain useful.
9. mediaCards unchanged.
10. no overflow at 1440/900/390/320.
11. JS-disabled works.
12. content/accessibility/source-of-truth unchanged.

Do not run an unnecessarily huge evidence campaign for this narrow CSS/markup correction.
Use focused PageList tests + the existing full verify once.

## Evidence

Primary screenshots:
- /innsikt/ 1440
- /innsikt/ 390
- mixed image/icon alternating 1440
- mixed image/icon alternating 390

A before/after comparison against H-021B is useful.

## Delivery

Pull latest main.
Implement H-021C only.
Run focused QA + one full verify.
Push main.
Verify connected Worker.
Update CODEX-TO-CHATGPT.

Then STOP for OWNER visual review.
