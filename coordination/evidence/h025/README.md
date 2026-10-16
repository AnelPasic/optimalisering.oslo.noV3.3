# H-025 shared page Hero delivery evidence

Authority: `coordination/H025-GLOBAL-PAGE-HERO-VARIANTS.md` and explicit OWNER instruction to implement. Incoming main: 7973ccd. Implementation: 50107aa5f278a07cc41c663d1b852d8abffc73c4; final scoped media correction: d411d7dc4493f2a07170d8f3524dc2a9278cbc76. Review Worker: https://optimalisering-oslo-v33.anel.workers.dev. This is technical implementation evidence; OWNER full-site Hero/editor review remains required.

## One component, existing sources

`CommercialHero.astro` is the single renderer; `HeroMedia.astro` is its media primitive; `page-hero.ts` projects existing page-owned content into a strict canonical view. `hero-presentation.ts` owns the three layout values. Existing family spacing/typography is consolidated into hero.css. Superseded service-copy/media renderers are removed.

CMS **Hero → Oppsett** offers text-left/image-right, image-left/text-right and centered. All three use the actual renderer shown at `/design-system/`. Image/crop/alt and source copy remain independent. Missing layout preserves the prior default; no-image split choices keep legible full-width text. Mobile DOM/visual order stays text first. Assessment retains its existing form; glossary retains category anchors; 404 retains its exact error wording/navigation. Glossary/404 remain text-only semantic headers: their split choices use the same deliberate full-text fallback, with no image or marketing CTA invented.

`cms-map.json` inventories all 17 actual source/editor mappings: homepage; five service entries; pricing; insight overview; two articles; Om, Kontakt, Personvern, Vilkår; assessment; glossary; 404. Normal pages keep root eyebrow/title/intro/CTA/heroVisual and store only hero.layout. Home retains its full existing hero object. Pricing resolves copy from shared homepage Packages; its inactive legacy root text is retained hidden/read-only in CMS, not duplicated as editable Hero copy. Glossary uses its own title/intro plus presentation-only hero. The error editor stores only notFound.layout. No invented CTA, copied commercial data, new proof permissions or page-builder expansion.

## Reproducible local gates

- `verify.log`: final complete verify passes 138 tests, all copy/static/CMS/surface guards, and 196 typography groups with zero errors/POSTs/overflow/contrast/clipping failures. Astro: zero errors/warnings, one pre-existing intake script hint.
- `before/` and `after/`: 68 route/width groups (17 routes ×1440/900/390/320) preserve exact public text, SEO, section IDs/order, CTA, image/alt/crop and default geometry (1px tolerance).
- `variants/`: 216 actual source → Astro build → browser combinations across all families, three layouts, image/no-image and four widths. Includes assessment image+form safety, centered coordinate assertions, mobile text first and CTA keyboard/tap navigation. Raw original source bytes and normal build restored in finally.
- `primary-validation.json`: actual Astro builds reject invalid service/home enums and copied service Hero text before rendering. Original files are restored.
- `after/demos/`: 32 real shared component demos, long/short/no-image/service/pricing; one public H1, equal live Hero typography and no overflow.
- `preservation.json`: all 167 original tracked content/config/reference files and five untracked OWNER PNGs match before implementation delivery. No original content JSON changed in implementation.
- `REVIEW.md`: independent whole-change read-only review, two P2 fixes with red/green browser assertions, then complete green checks.

`diagnosis-initial-default-differences.json` and `verify-initial-guard-failure.log` are diagnostic history, not final passing results. The stale H-009 order expectation was corrected to incoming OWNER's existing order rather than changing public content. The existing 404 arrow is represented by an HTML entity with identical public output. Manual inspection of the first CMS-centered homepage screenshot found its image still right-aligned: unlayered scoped media CSS overrode the shared layered layout. `centered-media-red.log` reproduces this. Alignment now belongs to the shared composition; the complete 216-group matrix asserts both copy and media/form center coordinates. `diagnostic-home-centered-before-media-fix.png` and its explicitly named native/commit records preserve that failed visual state. A fresh home CMS cycle is required after this fix; the earlier cycle is not the final visual proof.

## Native deployment and real CMS gate

`native-implementation.json` records successful connected native build 9db464c3-db2a-4acc-88f3-0def43bf66a8 for implementation 50107aa. Its live checks pass all 68 preserved defaults, 32 demos and all 53 deployed files byte-exact. Native builds run npm build + wrangler deploy; the local full verification is separate.

Authenticated service, pricing and home save/build/live/restore cycles are complete: `CMS-WORKFLOW.md` lists all six final CMS commits, exact native builds and active Worker versions. The corrected home cycle explicitly proves centered media as well as text. Final native restore 123f707 / build 9f421e69 succeeds, Worker 0af4f474 at100%; all 68 preserved-default checks, 32 real demos and 53 deployed assets pass again on that Worker. Native CMS restoration retains two explicit Standard layout fields (Synlighet/Priser) and removes Priser's terminal newline; all original JSON values are exact. `final-preservation.json` confirms 165/167 original files plus all five OWNER images byte-exact, with only those two disclosed presentation additions. An immediate CMS save is not an instant preview: wait for the exact commit's successful native build/deployment and refresh. Do not infer a live change while its build is still running.

H-024B remains blocked pending actual OWNER editor acceptance. H-022 stays parked. Noindex, disabled intake, theme, commercial/proof/calculator authority and launch gates remain intact. STOP for OWNER full-site Hero/editor review after all delivery gates pass.
