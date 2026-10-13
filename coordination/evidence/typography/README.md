# Typography system pass — OWNER review packet

Incoming main: `e0adeec4379776bcbe764204da236c1f403bf0da` (ff-only pull, 2026-10-13). Scope: actual direct OWNER typography-only request; delivery is technical evidence, not visual/content/launch acceptance.

## Before / after inventory

`source-inventory.json` records every original selector and size: **250 local font-size declarations**, plus a 15px font shorthand and both server/client character-count result shrinkers. There are **71 declarations below 14px**: 8px × 1, 9px × 2, 10px × 8, 11px × 15, 12px × 28, 13px × 17. Other values include 14–36px, individual 40–65px values and unrelated fluid expressions. The original result shrinkers can reach 12px. The original files and their precise declarations remain recoverable at incoming main.

`after-source-inventory.json` records the final selectors: **175 semantic role consumers**, **zero raw local font sizes or sized font shorthands**. **154 redundant responsive declarations** (size plus line height) were removed. No selector-to-utility-class migration or new dependency.

## Shared roles

All sizes are defined once in `app/src/styles/typography.css`. Values below assume the default 16px root. User font-size preferences remain supported.

| Role | Size | Line height |
| --- | --- | --- |
| Display / H1 | fluid 36–64px | 1.08 |
| H2 | fluid 32–48px | 1.12 |
| H3 | fluid 24–32px | 1.2 |
| H4 / compact card heading | fluid 22–26px | 1.25 |
| Lead | fluid 20–24px | 1.45 |
| Body large | fluid 18–20px | 1.6 |
| Body | fluid 17–19px | 1.6 |
| Body small | 16px | 1.6 |
| Label / form label | 14px | 1.5 |
| Eyebrow | 14px, 600, existing uppercase policy, .055em tracking | 1.5 |
| Meta / caption | 14px | 1.5 |
| Helper / caveat | 14px | 1.5 |
| Button / compact button | 16px / 14px, 600 | 1.5 |
| Numeric result | fluid 32–56px | 1.15 |
| Non-text glyph | 24px | 1.5 |

Instrument Sans + Figtree are unchanged. Headings/card headings/buttons/labels use weight 600; body uses 400. Featured proof values use the display role while supporting values use the numeric role. Calculator values wrap instead of shrinking by character count; result calculations, ratio formatting, monthly compounding, chart helper/client operations and all 12 tick positions remain unchanged. Only tick tracking changes slightly for separation at 320px.

## Readability and contrast

**No text below 14px and no allowlist.** The browser guard checks actual visible text nodes, form values/placeholders and SVG graph labels. It excludes native closed-details content, hidden accessibility content and explicitly non-text glyphs. Its synthetic fixture proves small text, low contrast and clipping fail, while hidden/closed-details/glyph text is excluded. Disabled controls retain their existing opacity and are contrast-exempt under WCAG; their text still passes the size/containment checks.

Four text colors were corrected: shared wordmark punctuation `#ad6b45` and shared footer punctuation `#a7643c` → `#925536`; glossary category eyebrows `#0b877b` → existing teal `#087b73`; shared form-process numbers `#638263` → darker sage `#526f52`. Normal text uses a 4.5:1 AA threshold; large text uses 3:1. Backgrounds, decorative strokes, surfaces and palette variables stay exact. Inherited muted plum/grey, mint/lavender/plum text, captions/caveats, placeholders, chart fills and active validation/status states pass the rendered check.

## Evidence and verification

- `before/`: original responsive full-page screenshots for home, Synlighet, pricing, glossary and assessment at **1440 / 900 / 390 / 320**; original rendered inventory. The early baseline scanner included closed-details layout rectangles; use the source inventory and expanded-details groups for precise before comparisons. The final guard explicitly excludes closed details, verified by its fixture.
- `after/`: final full-page/top captures for the same five routes at all four widths, expanded glossary and isolated calculator/proof/form/footer captures. `checks.json` passes **196 groups** and covers every route and default/expanded/menu/tooltip/calculator maximum-valid/error/form-validation/disabled-status states.
- `verify.log`: full verification, **89/89 tests**, zero Astro errors/warnings, one preexisting `qa-intake-h017a.mjs` hint; **16 content routes / 544 links**, COPY-STYLE, proof, commercial and CMS guards. The typography source/browser guard is part of `npm run verify`.
- `browser.log`: existing **40 whole-site checks**, including calculator, menu and isolated synthetic intake behavior. No live email.
- `terminology.log`, `local/checks.json`: existing **28 four-width terminology groups**, all 25 direct anchors and native no-JS accordions, hover/focus/tap/outside/Escape/keyboard/full-explanation links; zero page errors/review POST.
- `preservation.json`: **1,206 existing protected Git blobs exact**; all nine modified stylesheets/component style blocks preserve every non-typographic declaration in order. Component markup/copy/client code are exact after excluding only the former presentation-only result shrinking. Layout differs only by the shared typography import. All content/CMS/authority/prices/proof/math/chart helpers/art/reference inputs/intake/noindex remain exact; untracked OWNER images are untouched.

IMPLEMENTATION inspected desktop and narrow hero/service/pricing/glossary, calculator, proof, form and footer captures. Hierarchy remains coherent; native reflow increases some heights. No clipping, horizontal overflow, broken buttons or overlapping graph ticks. Existing content-column widths are preserved, including the OWNER full-width glossary correction; 19px desktop full definitions make that column easier to read without a width/layout change. Heading wraps remain usable within the existing columns.

## Delivery gate

Push main and verify the connected native Worker build, exact tested live assets and the same live typography checks. Native/live receipts will be added after delivery. Retain noindex, disabled real intake and all separate content/CMS/privacy/backend/launch review dependencies. **STOP for OWNER visual review; no component/box standardization or next implementation is authorized.**
