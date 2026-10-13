# H-018 component / box system review packet

Spec: `coordination/H018-COMPONENT-BOX-SYSTEM.md`; active OWNER + STRATEGY_CONTENT handoff at incoming main `9354087`. Latest main was pulled ff-only before work. Typography is a locked prerequisite; its source file and every existing font/weight/line-height/tracking/foreground declaration remain exact.

## Before / after inventory

Complete declaration inventories (path, CSS/style-block line, selector, property and value): `before/source-inventory.json`, `after/source-inventory.json`. Rendered repeated-shell inventories: `before/checks.json`, `after/checks.json`, seven representative routes × 1440/900/390/320. They record surface, border, radius, shadow, padding, gap, dimensions, responsive behavior and button focus/hover. Hover/focus selectors for the other shells are in the source inventories; other cards intentionally have no raised/hover state.

| Source measure | Before | After |
| --- | --- | --- |
| Radius expressions | 14 | 6 shared radius roles, plus flat 0 and intrinsic circles 50% |
| Shadow declarations | 2 different recipes | 1 shared soft recipe, used only in the same two existing elevated contexts |
| Component-local literal border colors | 18 | 5 deliberate state/series colors |
| Distinct border declarations | 41 | 26, including zero/state/side-specific forms and token references |
| Component-local literal background colors | 33 | 22, with ordinary repeats centralized and intentional art/context/CTA colors retained |
| Distinct background expressions | 42 | 38, including semantic variables, gradients and transparent/none |
| Distinct padding expressions, all CSS | 87 | 78; macro/illustration spacing stays intentional |
| Duplicate shell declarations removed | — | 16 |

Literal-color counts exclude central token definitions and include existing button/state/illustration paints. These are source inventory measures, not a claim that inherited context colors disappear. Full exact declarations and rendered values remain inspectable in JSON.

## Shared primitives and families

One `app/src/styles/surfaces.css` layer; no utility classes, wrappers, dependencies or framework migration. Existing semantic selectors consume the primitives.

| Role | Value / use |
| --- | --- |
| Button radius | 6px; normal CTAs remain rectangular |
| Small UI radius | 8px; inputs/select/textarea/menu/status badges |
| Inset/data radius | 12px; results/chart/tooltip/attached proof/visual strip/example |
| Card radius | 20px; ordinary content, service/value/package/form shells |
| Feature radius | 24px; proof, hero/service visual frames, existing large illustration |
| Pill radius | 999px; existing glossary category chips only |
| Base / soft surfaces | Existing `--paper` / `--cream` resolved in the current palette context |
| Mint / lavender / dark | Existing `#e0f0ef` / `#f1edf8` / `#320c43` |
| Strong mint / CTA / notice | Existing `#b9e8d4` / `#e5f2ed` / `#f5eedc` |
| Subtle / control / dark / featured border | 1px current `--line`; 1px `#cbc2d4`; 1px `#65536e`; 2px plum |
| Soft shadow | `0 8px 24px #320c4314`; no new shadow-bearing cards |
| Panel inset scale | 12 / 16 / 24 / 32px; featured proof fluid 24–40px |
| Internal gaps | 8 / 12 / 16 / 24 / 32px |
| Controls | Minimum 48px, compact controls 44px, 10px × 16px inset |
| Buttons / focus | 14px × 24px main inset, 10px × 12px compact inset; 3px focus offset |

Palette-derived aliases are recomputed on the existing body and dark service section. Otherwise CSS would inherit an alias already resolved against the legacy root palette, defeating the current Invite colors. This introduces no new palette or theme architecture.

The families remain distinct: ordinary/soft cards use 20px; functional containment uses larger inset hierarchy; data/chart and image-attached proof use 12px; dominant proof uses 24px and its existing full-width plum emphasis; CTA bands stay full-width/bare; glossary/FAQ/process/footer rows stay divider/whitespace-first. Recommended packages keep the existing plum 2px border, lavender background and CTA hierarchy. No new pill headings, nested wrappers, raised cards or decorative effects.

## Padding normalization

| Repeated shell | Before | After |
| --- | --- | --- |
| Value cards | 36 / 28 / 24px | 32 desktop, 24 smaller screens |
| Ordinary content cards | 30×31 / 32 / 25 / 24px | 32 desktop, 24 smaller screens; existing bare rows stay bare |
| Forms | 40 / 32 / 28 / 24 / 20px | 32 desktop, 24 smaller screens |
| Packages | 20 / 19 / 18 / 17 / 24×20 / 23×19px | 24; recommended 23 via `calc(24px - 1px)` to compensate its additional border |
| Result cards | 24 / 16×13 / 16×11px | 24 desktop, 16×12 narrow |
| Tooltip / example | 16×18 / 14×15px | 16px |
| Attached hero proof | 14×18 / 12×16px | 12×16px, keeping its unique attachment offsets |
| Proof | fluid 24–44px | fluid 24–40px |

## Intentional exceptions

- **0 radius and no surface:** flat glossary/FAQ/step/footer rows, inline terminology and native range controls. They must not become cards. **50%:** existing small dot and circular expand glyph, not card shells.
- **Graph:** exact 12px plot inset, 24px native slider height, compact legend spacing and original two stroke/key colors. These retain 12 tick and maximum-value containment and unchanged graph behavior. They are shared/named where appropriate without using ordinary card padding.
- **Hero proof:** warm `#f5f3ec`, original absolute offsets including mobile overlap, no new shadow. It remains image-attached rather than an ordinary floating card.
- **Proof band:** existing warm `#f7f6ef` section landmark and existing foreground colors are retained; claims, values, dates, selection and first/supporting hierarchy are untouched.
- **Illustration internals:** fixed-coordinate legacy Journey art, package visual-strip 120/110px height, 104px caption minimum, 6×10/6×8px optical insets, motif-specific lavender paints and editorial gradients. These are graphic geometry/art, not arbitrary ordinary panel spacing. Artwork/files and image framing/crop remain exact. No final artwork is generated.
- **State colors:** five narrowly bounded border exceptions in `audit-surfaces.mjs` retain calculator error, legacy/Invite amber preview notices and current/scenario legend signals. They are count-limited; duplicating an exception elsewhere fails. Zero literal gray border exceptions.
- **Legacy numeric adornments:** existing 64px minimum, 37px right inset and absolute unit positions are retained for the old unit-bearing field. Border/radius/main inset use the shared control roles; this intrinsic adornment space is not a new generic control size.
- **Existing buttons:** brand/hover/featured/disabled colors and opacity remain; only their shell primitives are normalized. The mobile main CTA still has its existing 52px minimum and compact arrow/spacing constraints.
- **Legacy context colors:** existing green/sage/apricot article/utility/illustration backgrounds stay intact. H-018 does not propagate a new page design to those contexts.
- **Macro spacing:** section bands, hero/grid/column proportions, structural section gaps and footer grids retain their existing composition. Text rhythm/margins are not a typography reopening. Residual compact notice/chip/list/illustration insets have those explicit purposes.

## Guards / verification

`npm run qa:surfaces` is part of full verify. It is a lightweight declaration guard, not a custom CSS parser: new literal card radii, near-duplicate border colors, arbitrary shadows, duplicated state exceptions and undefined primitive references fail. Its fixture checks reject 19px radius, an invented gray border and a new shadow while accepting a shared card radius/circle.

- `verify.log`: **89 tests**, zero Astro errors/warnings, one preexisting QA-script hint; 16 content routes / 544 links, COPY-STYLE/commercial/proof/hero/CMS checks; 20 CMS JSON hashes exact.
- `typography-local/checks.json`: **196 rendered groups** across all routes, expanded details/menu/tooltip/maximum/error/form states; zero size/contrast/clipping/button/overflow failures, browser errors or public POST; no sub-14px allowlist.
- `after/checks.json`: **28 shell/page/width groups** with exact text/font metrics/foreground colors/image source-fit-position-dimensions/section order against before; keyboard package disclosure, package query preselection/Partner note and disabled native submit checks; zero overflow/errors/POST.
- `browser.log`: existing **40 whole-site browser checks**, calculator/menu/validation and isolated synthetic intake; no live email.
- `terminology.log`, `terminology/local/checks.json`: **28 groups**, all 25 anchors/native no-JS accordions, selective hover/focus/tap/outside/Escape/keyboard/full-explanation links at all four widths; zero errors/public POST.
- `preservation.json`: **1,532 protected Git blobs exact**, including typography tokens, content/authority/CMS, proof registry/guards, packages/prices/CTAs, calculator/chart/client/ratio helpers, images/art, backend/intake/noindex and read-only `system/` / `project/`. Existing component markup/scripts and all non-shell CSS declarations are exact. Only the shared surface import changes the layout. Typography guard differs only by optional output-directory routing so historical evidence is preserved. Untracked OWNER image files are untouched.

Primary review: before/after `home-1440.png` / `home-390.png`, `hero-*`, `proof-*`, `calculator-*`, `priser-*` / after `packages-*`, `synlighet-*`, `begreper-*` and `form-*`. The original full home/pricing captures contain the complete before package section; isolated after package captures are also provided. 900/320 regression captures and expanded glossary row are included. IMPLEMENTATION inspected desktop and mobile hero, proof, calculator, packages, form, service and glossary captures; no new excessive nesting/overflow or loss of hierarchy is observed. Visual acceptance is still OWNER's decision.

## Delivery

Implementation `e7c210291a138ccb3744677926c83ce15dcc882f` is pushed to main. Native connected Worker Build `fa543e9f-7431-4c58-af8a-9ee3f6e1caef` succeeds, Version `899defd5-4e89-4612-bfec-4b5c81143c03`; `implementation-native-build.json` records the exact head. `live-assets.json` proves all 53 tested assets match `https://optimalisering-oslo-v33.anel.workers.dev` with noindex/robots/empty-sitemap/disabled APIs/custom 404 preserved. `live/checks.json`/`live.log` pass 28 shell groups with exact frozen text/type/crop/order plus functional checks. `typography-live/checks.json`/log pass 196 states with zero failures/empty allowlist. `terminology/live/checks.json`/log pass 28 groups, all 25 anchors/no-JS and interactions with zero errors/POST. Their screenshots reproduce the four-width evidence against the actual Worker.

`implementation-review.md`: fresh separate technical review, no findings; independent source/protection/comparison/screenshot inspection, browser results assessed from recorded evidence. Final QA-only form DOM type refinement removes a new test-script hint; refreshed full verify has zero errors/warnings and only the existing intake-script hint. It changes no rendered assets. Final metadata/evidence commit is identified through Git history, without embedding its own hash.

No direct/backend deployment, secrets/domain/indexing/intake enablement or content lock is inferred. **STOP for OWNER visual review; no next implementation.**
