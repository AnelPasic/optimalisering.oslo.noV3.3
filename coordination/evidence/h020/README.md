# H-020 — CMS section-heading alignment

Incoming main: `844b034`. H-019 is already accepted under D-081. This pass adds only a Center/Left heading alignment control.

## Result and scope

`app/src/lib/heading-alignment.ts` defines one typed enum, defaulting missing/cleared values to `center`, rejecting arbitrary values. Both shared section renderers emit only validated `data-heading-align="left"` directly on `.section-heading`. One CSS rule changes only text alignment. No content migration or default attributes are needed.

Pages CMS exposes **Overskriftsjustering** directly after **Overskrift**, using **Sentrert (standard)** / **Venstrejustert** and the exact requested description. Ordinary and protected service models share the select. Protected rows retain no surface controls. Actual OWNER clarification: **Leave homepage form intro unchanged**. That existing `.assessment-copy` and its separate `sectionForm` CMS model remain outside alignment scope, with no inert alignment field.

Prerequisite repairs preserve incoming OWNER intent: quote the URL-slug description's colon to make the incoming YAML parse; permit only a read-only visible slug in the older metadata test; verify the historical H-019 migration against its actual implementation commit rather than rejecting later OWNER content edits. No content, wording, prices, logic, type, card geometry, surfaces or safeguards are changed.

## Local evidence

- [Full verify](verify.log): 101/101 tests; zero Astro errors/warnings, one preexisting intake-script hint. Static/copy/proof/commercial/CMS/surface/typography guards pass. All 20 CMS content hashes unchanged. Typography: 196 rendered states; zero size, contrast, clipping, button or overflow failures; no sub-14px allowlist.
- [Focused tests](focused.log): 14/14 H-020 + existing CMS tests. [Initial CMS RED](unit-red.log) records missing-field/round-trip failures before CMS implementation. The schema/helper were already present at that RED checkpoint.
- [Before fingerprints](before/checks.json), [after fingerprints and variants](after/checks.json): all 16 routes × 1440/900/390/320, **64 exact default groups**. Hashes include content, stable geometry, typography, color, padding, border/radius/shadow, cards/links/grid/crop. Only the unchanged animated calculator endpoint-circle y coordinate is excluded.
- **16 Center/Left/restore groups** cover homepage ordinary, Synlighet ordinary/protected and SEO's second shared renderer. Whole-page styles/geometry/content remain exact after normalizing only heading descendant text alignment; default restoration is exact. No split heading, Invite max-width cap, overflow, browser error or public POST.
- [Preservation](preservation.json): **2,217 protected Git blobs** match incoming main, including all content JSON, homepage assessment, surface/typography/service CSS, calculator/proof/package logic, imagery, `system/` and `project/`. OWNER's untracked `app/src/assets/images/` remains untouched.

## Screenshot matrix

Full page before/after: `before/home-{width}.png`, `after/home-{width}.png`, and the equivalent `synlighet` files. Heading details: `after/{home,seo}-ordinary-{center,left}-{width}.png` and `after/synlighet-{ordinary,protected}-{center,left}-{width}.png`, for all four widths. Source-backed captures are in `source-render/`.

## CMS limitation and source-backed proof

The authenticated Chrome MCP browser could not attach: its profile was already in use. No active browser was stopped and no authenticated CMS save is claimed. H-020 makes authenticated testing conditional on safe availability. Shared-select ordering, values, omission/protection and save/restore are verified through the real CMS configuration and CMS-equivalent serializer fixture in focused tests.

`app/scripts/qa-h020-source.mjs` temporarily writes only alignment values in three existing JSON files, builds Astro for Left and Center, checks actual rendered attributes/alignment at all four widths, and restores the exact original bytes plus a clean default build in `finally`. See [source-backed results](source-render/checks.json) and [log](source-render.log). This is explicitly distinct from an authenticated CMS round trip.

Native Worker/live receipts and the final implementation revision are recorded in CODEX-TO-CHATGPT and adjacent receipt files after delivery. STOP for OWNER visual/CMS review; no acceptance, launch, indexing, intake or subsequent implementation authority follows.
