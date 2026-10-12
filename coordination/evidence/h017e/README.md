# H-017E homepage hero proof evidence

Incoming main `3a5958e`, pulled first. Authority: actual OWNER + STRATEGY_CONTENT / D-079, exact `coordination/H017E-HERO-PROOF.md`. H-017D/D-078 and H-017C/D-077 acceptance remain intact.

One small cream/plum panel is attached to the existing photo's lower-left edge; <=650px uses a 16px bottom overlap. It shows only **ROAS 4,3x -> 17,2x** and **Eurotents · Google Ads**. Result 24px desktop / 22px mobile, support 13px, current Instrument Sans/Figtree roles; no shadow/icon/logo/extra evidence. Photo/crop and hero copy/CTAs/layout remain exact. No additional first-screen height is introduced.

`getHeroProof` calls the unchanged `getPublishableCases` on the existing homepage selection/records and formats only its first public projection. The public metric label supplies metric/source; before/after/name remain shared. No second case record, content/CMS field or toggle. Filtering follows the existing first-publishable semantics: an invalid selected case is skipped, and another publishable selected case may become featured; with no publishable selected case, the hero panel is absent. Anonymous public names are preserved.

Validation:

- `focused-tests.log`: 12/12 proof/CMS/hero tests, including exact output, reordered selection, anonymity, missing/duplicate records and failed authority/comparability gates. Expected featured-result assertions were observed failing before implementation, then passing.
- `verify.log`: final full verify, 79/79 tests, zero Astro errors/warnings, one preexisting H-017A QA-script hint; 15 pages / 443 links; static/COPY-STYLE/CMS PASS. New hero output audit was observed failing against incoming output, then passing; it runs in normal verify.
- `proof-renderer-guard.json` / `proof-guard.log`: actual Astro builds reject unapproved, incomplete, non-comparable and missing selected records on the hero and all three lower placements even with environment override. All source bytes restored exactly, followed by final verify.
- `local/checks.json`: 1440/900/390/320, four hero captures, no wrap/clipping/overflow/errors/POST. Hero height/copy/CTA/photo/crop and all lower section text/style/geometry are exact to incoming build; lower proof HTML is exact. All 14 other page body HTML snapshots are exact. Native no-JavaScript proof remains visible; assessment/order stay disabled.
- `preservation.json`: 246 protected Git blobs match incoming main, including all content/proof records, CMS, strict gates, lower proof component, public assets/styles, backend and read-only system/project. Existing package.json changes only to add the hero static audit. Three preexisting untracked OWNER image files remain untouched/untracked.

IMPLEMENTATION reviewed the complete diff against the contract and inspected all four local hero captures plus live 320: subject face remains clear, panel is subordinate to H1/CTA and desktop panel width is approximately 37-40% of the image. This is author verification, not a formal role verdict.

Implementation `13402d0383ab3b2e93aca81145bfc95324abacda`: native Build `de682412-726e-4256-a816-13786a3acfaf` SUCCESS, Worker version `e0011e49-5000-4302-a31b-c8c5eef3fe9a` (`implementation-native-build.json`). All 50 live asset comparisons match the tested build, noindex/robots/empty sitemap/API GET404/custom 404/results-route 404 pass (`live-assets.json`). The same four-width responsive/preservation/native/disabled-intake checks pass live, zero POST/errors (`live/checks.json`), with four captures under `live/`. Exact source and subsequent receipt revision are recorded in CODEX-TO-CHATGPT / Git history.

STOP after delivery for OWNER + STRATEGY_CONTENT visual review. H-017B architecture and separate H-017A/intake/noindex/launch gates remain preserved.
