# H-026 — genuine daisyUI Hero / Footer reuse

2026-10-17. Actual D-092 and `H026-DAISYUI-HERO-FOOTER-REUSE.md` authorize this scoped implementation after OWNER accepts H-024A4/H-024A5 Card appearance/readability. Incoming main173f6c3 includes that approval. No further Card changes; no full H-024A3 editor acceptance, H-024B, H-022 or launch authority.

## Actual reuse and scope

See [component/cascade map](component-map.md) for before/after structure and justified exceptions. All9 Hero families use actual `hero > hero-content` in the existing shared CommercialHero renderer. Native flex handles single-content layouts; Tailwind composes approved image/form columns, gaps and profile widths. Outer semantic page/header/shell/breadcrumbs remain. One wrapper keeps breadcrumbs outside daisyUI's shared grid row without moving the approved outer shell. No overlay/min-screen-height or generic redesign.

Footer uses native footer grid and footer-vertical/horizontal direction. Its existing brand is the actual footer-title; no new customer-facing heading/label or duplicated invisible copy. Native navigation child grid replaces bespoke nav flex. Existing provider/glossary/legal/privacy/copyright/preview/links/order/nav labels stay intact. A shell outside the width100% Footer avoids container conflicts; existing2/3-column proportions and spacing are Tailwind. Accepted case/opacity, block identity sizing and type roles are preserved. Footer bottom row, Hero semantic type/spacing/media/proof/assessment/glossary/404 profiles stay where required.

PostCSS census: **61 custom CSS declarations removed (Hero46, shared Footer15), zero added**. No new component system, dependency, CSS specificity escalation or !important. Existing template props/schema/CMS options unchanged. No CMS save is necessary or performed.

## Before / after and functional evidence

- **Actual Worker before first:** before/checks.json and32 screenshots were captured from the real Worker before product edits. local-before/checks.json verifies the fresh local build matches that actual source/visual reference at all72 route/width groups (17 public pages + actual design-system ×1440/900/390/320).
- **Actual source presets before/after:** before-variants/ and after-variants/ cover208 groups each: split-right/split-left/centered/centered-none, image/no-image,9 families and4 widths. The real source resolver/renderer is built per case. Homepage/service/pricing/assessment test images and no-image; utility/article/index/glossary/404 test all four text presets. Includes assessment image+auxiliary form, source media/alt/crop, home-only proof and commercial source authority. All9 source files restore byte-for-byte in finally, then the normal build is restored. These are synthetic source/build fixtures, not authenticated CMS saves.
- **Parity:** after/checks.json preserves all72 ordinary/DS snapshots; after-variants/checks.json preserves208 source snapshots. Browser checks allow1px; independent recursive comparison finds **zero numeric differences** and exact captured content/SEO/IDs/order/type/styles/links and Card roles. component-parts-red.log demonstrates missing true parts before edits. Native Hero/Footer structure and computed native Footer navigation grid are asserted after.
- **Screenshots:** screenshot-parity.json records29/32 byte-identical ordinary before/after PNGs, including every actual page Hero and every Footer. Three desktop DS image-Hero screenshots differ only by subtle photo raster pixels (max6/255 per independent review), with identical crop/geometry/text/layout. screenshot-differences.json records the small channel deltas; do not claim all screenshots pixel-identical.
- **Actions:** local-actions.json verifies actual Hero primary CTA and Footer glossary navigation with keyboard1440 and touch390, one H1/glossary navigation, existing homepage disabled button and standalone assessment transport flag false. No submit is performed; zero errors/POSTs. The standalone AssessmentForm already enables its JS button for local validation while refusing transport; preserve this deliberate existing behavior.
- **Full gate:** verify.log passes142/142 tests, CMS/static/surface checks,196 typography groups,0 small/contrast/clipping/buttons/overflow/errors/POSTs. Astro0 errors/warnings with existing hint. No additional full-suite loop.
- **Review/protection:** independent-review.md records one independent read-only code/visual/UX review with no blocker. preservation.json protects174 content/config/reference/accepted media/theme/Card/type/calculator files plus five untracked OWNER PNGs; all hashes match independently. Only four product files change: CommercialHero, HomeFooter, hero.css, shared.css.

Browser screenshots/computed records distinguish unchanged approved appearance from real component structure. No acceptance is inferred from tests, classes or technical delivery alone.

## Reproduction and next gate

From app/: `QA_PHASE=before|after|live node scripts/qa-h026.mjs`, optional QA_BASE_URL actual Worker. Source matrix: `QA_PHASE=before|after node scripts/qa-h026-variants.mjs` (restores source/build in finally). Keyboard/touch: `node scripts/qa-h026-actions.mjs`, optional QA_BASE_URL/QA_PHASE live. Full `npm run verify` uses task-specific QA_OUTPUT_DIR. Existing asset checker uses QA_OUTPUT_PATH for this evidence folder; historical evidence stays intact.

STOP for OWNER Hero/Footer visual review of actual home/service/pricing/assessment/glossary/404 and the four shared design-system choices. D-088/D-092 Card/Hero acceptances remain their existing scoped verdicts; H-026 needs its own review. H-024A3 whole-editor remains separate, H-024B blocked, H-022 parked, noindex/intake/launch unchanged.
