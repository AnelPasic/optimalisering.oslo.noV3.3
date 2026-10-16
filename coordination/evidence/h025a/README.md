# H-025A — four explicit Hero presets / CMS parity

Authority: direct OWNER correction in `coordination/H025A-HERO-PRESETS-CMS-PARITY.md`. Incoming main ea71423518e098c42f83a717be880e01c65b282f. Scoped implementation 71030864a33e0bc808ea019980acdfb3f6d5602e. Review Worker: https://optimalisering-oslo-v33.anel.workers.dev. H-025 remains OWNER REVISE pending review of the corrected live editor/visuals; this technical delivery is not acceptance.

## Correction

The previous three-value select could not independently choose the demonstrated Sentrert uten bilde while retaining an uploaded service image. The existing layout field now offers four exact named choices on all17 mappings:

| Stored preset | Exact CMS / design-system name | Render |
| --- | --- | --- |
| split-right | Tekst venstre / bilde høyre | Existing split default |
| split-left | Bilde venstre / tekst høyre | Existing reversed desktop split |
| centered | Sentrert med bilde | Existing centered layout, source media if available |
| centered-none | Sentrert uten bilde | Centered layout with media suppressed in canonical view |

The source enum accepts the fourth preset; the canonical typed view maps it to centered + no media. Stored image/source/type/alt/crop, CTA, copy and proof data are never cleared or replaced. Selecting an image-visible option reuses the original image. Existing values and missing/cleared default remain compatible. Missing images fall back to text, with no fabricated media. The same shared renderer/CSS/theme and all existing authority gates remain.

The first four design-system demos use the actual page source resolver and exact CMS labels. Short/long headlines are explicitly stress tests; service/pricing are source/context examples, not extra layouts. All source below Knapper og status is byte-exact; all seven served lower demo sections have identical parsed markup at all four widths. No renderer/CSS/redesign below Hero was changed.

## Verification

- `red.log` → `green.log`: regression first fails on missing fourth option; all11 focused tests then pass. Covers all17 mappings, CMS-equivalent full-source round trips, every normal family with/without media, restored copy/media/CTA, shared pricing authority, defaults/fallback and strict enums.
- `verify.log`: complete verification passes142 tests; copy/static/CMS/surface guards and196 typography groups pass with zero errors/POSTs/overflow/contrast/clipping. Astro has zero errors/warnings and the pre-existing intake script hint.
- `local/checks.json`:100 actual-source/build/browser groups (96 home/Konvertering/pricing ×4 presets ×image/no-image ×4 widths; four exact CMS/demo/lower-section comparisons). Native reading order, visible existing CTAs, one H1, source image/alt/crop, home-only guarded proof/hidden proof, text fallback and actual center coordinates pass. Full source bytes and normal build restore in finally.
- Both static image/proof guards also execute for each fixture build. Actual CMS source revealed old assumptions in H-011/H-017E; `actual-cms-static-red.log` and `hidden-proof-static-red.log` reproduce them. Guards now check resolved visibility while retaining the original proof authority/text/uniqueness/home-only and visible media/CTA checks. Complete matrix and actual CMS static QA pass (`actual-cms-static-green.log`).
- `defaults/checks.json`: all68 existing route/width snapshots preserve default public text, SEO, CTA, IDs/order, images/alt/crop and geometry. `preservation.json`: all168 content/config/reference files and five OWNER PNGs are exact before CMS testing.
- `REVIEW.md`: independent code/UX/visual review of ten actual screenshots, all17 mappings and the narrow static-guard follow-up; no blockers. Browser initial diagnostic compared static HTML against live glossary-enhanced DOM; comparison was corrected to served HTML vs the same parsed baseline, without changing product code/lower demos. `browser-initial.log` is diagnostic, not a final pass.

## Authenticated CMS evidence

`cms-four-options.png` shows the actual logged-in Konvertering dropdown with all four exact choices. The saved source retains photo `/images/services/happy-shopowner.png`, kind photo, alt Butikk som selger, crop50/50.

Actual Pages CMS Save creates **c639e80e788f23f558e88de77457c3e39b73abb8** with hero.layout=centered-none. Connected native Build **30152972-f8e2-4e01-8e4f-430907a7dcac SUCCESS**, Worker **15d5df37-2408-457d-82c6-c31eac7f11a8 at100%**. `cms-changed/` verifies actual Worker media-free centered Hero at1440/900/390/320 with exact public text/SEO/CTA/proof/order, retained source media and desktop/mobile screenshots. Source/editor is reloaded before native CMS restore.

Native restore Save **3987e85de748fe170d41c8e12f7d1917b53e0748** selects the original split-right default. Connected Build **369ec0cd-76af-428f-9cbb-194985224eb1 SUCCESS**, Worker **419221cf-be29-4230-ba8e-e879572ae198 at100%**. `cms-restored/` verifies the original image visible with exact source/alt/crop and public text/SEO/proof/order at all four widths. The explicit new Standard field remains; Pages CMS also reserializes one compact existing sectionSurfaces array and removes a terminal newline. All original JSON values, image/type/alt/crop and proof source remain exact. `final-preservation.json` confirms167/168 protected files byte-exact; only that disclosed Konvertering presentation/serialization addition differs. The five OWNER PNGs and lower design-system source remain exact.

Only Konvertering is an authenticated save of the new fourth preset in this correction. Home and pricing are validated using real source → build → browser fixtures and CMS-equivalent source guards, not claimed as new authenticated CMS saves. Earlier H-025 authenticated cycles are historical separate evidence. CMS Save is asynchronous; successful native build/deploy and refreshed Worker evidence are distinct from local tests or OWNER approval.

H-024B remains blocked; H-022 parked. Noindex, disabled intake, theme, source content and authority, page ordering and the OWNER-liked lower design-system remain preserved. STOP for OWNER corrected editor + visual review.
