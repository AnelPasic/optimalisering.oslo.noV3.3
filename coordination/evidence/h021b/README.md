# H-021B PageList visual correction

Spec: `../../H021B-PAGELIST-VISUALS.md`; incoming main `fe225de`.
Implementation/receipt commits are identified in Git history and outbound packet.

## Implementation and CMS

Article-owned `listing.visual` supplies images, controlled local icons or none.
The resolver carries the validated visual with title/summary/label/href; layouts
never re-query raw records. Strict discriminated objects reject irrelevant fields,
arbitrary icons, external/traversal/SVG paths, blank alt and out-of-range crops.
Images are restricted to `/images/listing/` raster media, with truthful alt,
50/50 crop defaults and actual local-file containment/existence checks. Missing,
empty or invalid assets omit media; none creates no empty media wrapper.

Current source uses only route/analytics generic local icons. No photography is
invented. The source copy, body, H1/SEO, listing text/order/visibility/authority and
OWNER's title sorting remain unchanged; only the overview layout becomes alternating.
Automatic/manual/filter/exclusion/sort/limit behavior is preserved. Alternation
uses final displayed DOM order; desktop starts text left/visual right, then flips.
Mobile uses text then visual consistently. Bildekort uses a3/2 media area and
3/2/1-column grid; icon/none fallback is intentional. Cards/compact/links retain
their H-021 presentations and omit large media. Existing cards are screenshot-exact.

Media-card shells consume existing H-019 `data-surface=base`, preserving readable
links/text in dark sections. Other variants inherit the selected section surface.
All radii, typography, padding, borders and links use current design primitives.
Images have explicit dimensions/aspect ratio, cover/crop and lazy loading;
decorative local SVG icons are hidden from assistive technology. No client JS.

Pages CMS → Innsikt → Artikler → Visning i innholdslister → **Listevisual**:
add one native block, choose **Ingen / Bilde / Ikon**. Each kind exposes only its
fields. Image selects from dedicated **Bilder til innholdslister** media; accepts
WebP/PNG/JPG/JPEG/AVIF and exposes Alternativ tekst / Horisontalt utsnitt /
Vertikalt utsnitt. Icon exposes six named choices. Overview **Visning** adds
**Bildekort** and **Bilde og tekst annenhver side**, alongside the existing choices.
No media/copy/href duplicates in overview config and no arbitrary template/class.

The CMS stores visual as an empty or single-item block array. The schema normalizes
it to one typed visual, also accepting the preferred object shape as input.
This storage choice is necessary with preserved merge:true: official Pages CMS
`app/api/[owner]/[repo]/[branch]/files/[path]/route.ts` at commit
`6f4e860a35d934406580287e7042e5e111e207a1`, lines143–147, deep-merges
objects but replaces arrays. A save test caught stale icon data after object
kind switching. Single-item arrays make image/icon/none switches and clearing
replace the previous shape atomically. CMS simulation is not changed to hide this.

Official docs checked 2026-10-14:
[native blocks](https://pagescms.org/docs/configuration/fields/block/),
[media sources](https://pagescms.org/docs/configuration/media/).
Authenticated CMS UI screenshots/save were unavailable: Chrome DevTools reports
its browser profile already running. No other browser/profile was stopped/copied.
`cms-session.json` records the limitation. Config and actual CMS-equivalent
switch/clear/restore plus source-backed renders are tested; no simulated editor
screenshots are presented as authenticated evidence.

## Evidence and reproduction

- `focused-red.log`: six new requirements fail before implementation.
- `focused-green.log`: H-021B plus preserved H-021 tests.
- `verify.log`: full verify,115/115, zero errors/warnings and the existing intake
  script hint; CMS20/static/commercial/proof/surface/source guards pass.
- `typography/checks.json`:196 states, zero size/contrast/clipping/button/overflow
  failures. Unrelated full-audit screenshots omitted to avoid redundant artifacts.
- `before/`, `after/`:64 route/width/no-JS groups each at1440/900/390/320; exact
  unrelated text/style/geometry. Innsikt excludes only guider and its downstream
  vertical offset from equality; hero/egen-side/closing/footer/header stay exact.
  Four default alternating captures and keyboard/semantic/decorative checks pass.
- `variants/`: source-backed four-width/no-JS groups for alternating1/2/3/4,
  filtering/exclusion/manual reversed results, mixed visual/missing/no-media,
  mediaCards mixed and two items, legacy cards/compact/links, dark/left surfaces.
  Image alt/crop/dimensions/decode/cover and responsive grid heights are verified.
  All56 groups pass. Computed heading/summary/link contrast must be at least4.5:1
  in every mediaCards variant.
  Fixture PNG is only local colored panels, never production photography. Finally
  restores all three source files, deletes both synthetic articles and image,
  and rebuilds default dist. Screenshots show test labels explicitly.
- `contrast-red.log`: inherited mint-on-white link failure reproduced before the
  shared base-surface fix. Independent review found the same issue.
- `preservation.json`: protected sources and exact scoped content/CMS changes.

From `app/`: `node --test tests/h021b-visuals.test.ts tests/page-list.test.ts`,
`node scripts/qa-h021b.mjs`, `node scripts/qa-h021b-variants.mjs`,
`node scripts/audit-h021b-preservation.mjs`, `npm run verify`.
Source fixtures must run alone. `QA_PHASE=before` requires the incoming build;
`QA_BASE_URL` selects live, `QA_VARIANT` selects one fixture for diagnosis.
Set `QA_OUTPUT_DIR=../coordination/evidence/h021b/typography` for full verification.

Implementation `58f75acc029c9db80f7699980d211cc450ca4ac7` is pushed. Native Build
`21d1c6e3-5fa2-48d4-90ae-1a7f1340ebe4` succeeds; deploy log/receipt confirms Worker
Version `2615710c-5833-4088-acd7-7e5bad8c8eb3`, deployment
`44bed7d3-7abc-4bf1-86f2-921a7259fa10`. `live-assets.json` compares54 assets with
the tested build and verifies noindex/robots/empty sitemap/disabled APIs/custom404.
`live/` records64 route/width/no-JS groups and four default captures, with unchanged
unrelated rendering and correct alternation/keyboard/decorative icon behavior.
Zero errors/POST/overflow; no direct deployment or infrastructure change.
Technical completion does not
accept the PageList system; STOP for OWNER visual/CMS review. No launch, indexing,
intake, secrets, domain, other-page expansion or MedonWebSystem update.
