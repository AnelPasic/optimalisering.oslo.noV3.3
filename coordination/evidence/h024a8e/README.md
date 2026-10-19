# H024A8E — native global library and selective three-zone homepage

D-102 / incoming `bc5fc9324a04eeaab7d57ee43aa4290766aba338`. Implementation `ad29c77`, Astro dependency correction `4b5598c`, exact native restore `f68dd0f`, technical guide correction `df6644d`. **TECHNICAL PASS — STOP for OWNER editor/library and homepage-composition review.** Final native build `054e372a-9ba7-47f4-bb77-61d46870cd76` SUCCESS; Worker `b79d37d4-36a9-432d-9d7d-b64b251d0db3` serves100%. No OWNER acceptance is claimed.

## Editor model

Open **Globale elementer** to edit one of eight named, typed original files. One master is shared by authorized uses on this site; changing it updates those uses after a successful Git-backed build. Native file menus have no Delete/Rename/Create. Original IDs, UUIDs, content and approved components remain intact. The six specialized modules plus original mechanism/fit content are preserved in this one library; new ordinary page content stays inline.

Open **Forside** for fixed-first Hero, then **Valgfrie seksjoner Topp → Hovedseksjoner → Valgfrie seksjoner Bunn**. Each group has native Add, row sorting and Remove:
- **Globalt element** selects a human-labelled library module. Publish/Hide/Remove affects this page placement only. Its fields do not duplicate the master payload.
- **Innholdsseksjon** edits local content, approved layout/box/surface controls and a generated UUID in the same row.
- **Skjult** retains source but omits the placement from public output. Remove deletes the placement; re-add selects the retained original.
- No eight-instance requirement, numeric sort or before/after dropdown. Existing visible composition stays unchanged pending OWNER's selection.
- Existing links to `/#sjekk` and `/#priser` prevent hiding/removing these targets until their real inbound links are resolved. Help explains this. No substitute destinations are invented.

Stock limitations: collapsed global summaries show stable source keys; the actual picker and library use Norwegian labels. Native row Clear/Replace/duplicate references remain possible; invalid/dangling/duplicate interactive references fail the website build, not a claimed custom CMS validation. The library's ordinary UI operations protect masters, not arbitrary Git edits. Native keyboard sorting is proven after a persisted save/reload in all three groups; automated mouse sorting was not exercised. OWNER must review actual pointer/editor usability.

## Actual authenticated proof

[Exact receipts](authenticated-cms.json), [native UI](library-native-ui.json), [hide/remove UI](library-native-hide-remove-ui.json), and [final UI](library-native-restoration-ui.json).

Phase 1 first proved the calculator master/reference path before wider migration: CMS master edit, cache defect discovery/correction, visible Worker edit, exact master restore, hide, remove, re-add and 53 original assets restored exactly. The initial successful build with stale cached output is explicitly rejected as visible-master proof. Astro's supported loader digest now includes master dependencies.

Phase 2/3 genuine hosted CMS commits:
- `db0196a`: master heading edit, native build `820c9714`, Worker `890b55e7`; actual changed heading on **both /** and **/design-system/global-elements/** at four widths.
- `a6a50e7`: native master restore, build `5c8e8758`, Worker `d414ec8c`; calculator blob `0a287aecadf82370de2209661a106453e919c862`, all72 incoming snapshots exact.
- `707851c → ba32195`: add/select global calculator in Top, FAQ in Bottom; add/edit normal Top/Bottom; native keyboard reorder local/global rows and Main. Build `1f972241`, Worker `2f241412`; [actual sorted output](library-zones-sorted/checks.json).
- `eda141b`: native hide Top calculator/local, Main mechanism, Bottom FAQ/local; build `56187817`, Worker `a2d448ee`; [76 browser records](library-hidden/checks.json), [56 exact local/Worker artifacts and absent-master scan](library-hidden-assets.json).
- `aca1b3f`: native Remove those five page instances, master files exact; build `23263f6b`, Worker `ec6e6a2f`; [browser](library-removed/checks.json) / [all56 artifacts](library-removed-assets.json).
- `b40501e`: native re-add/select references in **all three groups**, build `a79d9364`, Worker `7ea754eb`; [browser](library-readded/checks.json) / [all56 artifacts](library-readded-assets.json).
- `49a22a6 → f68dd0f`: native re-add calculator/FAQ to Main and keyboard restore original sequence. All home/master Git blobs equal the migrated canonical source; no test placement remains. Fresh CMS reload has Save disabled.

No dangerous invalid source was committed. Isolated tests reject unknown/copied/dangling references, cross-zone duplicate modules/IDs (including hidden entries), invalid/deleted unused masters and missing published anchors. Shared pricing/form/proof authority remains available independently of homepage placements. Hidden/absent calculator and mechanism content was scanned across all actual public text artifacts, including both design-system routes.

## Preservation and verification

[Restoration](restoration.json): all8 original payloads/UUIDs exact; OWNER `forbehovsvelger` moves losslessly to Top with only obsolete placement removed; all other home fields exact; **240 other protected Git blobs** exact. Five pre-existing untracked OWNER images and the old local H024A8C README edit/stash remain untouched.

[Full verify](final-verify.log): **156/156 tests**, 28 CMS JSON files, static/copy/surface guards and **196 typography groups** pass. A separate fresh-context whole-change review found no actionable issue. [Final local comparison](final-local/checks.json): all68 existing non-design-system route/width snapshots exact, four design-system snapshots retain all components/styles and differ only by two explicitly recorded [technical CMS guide paragraphs](design-system-guide-changes.json) and their resulting footer offset; the controlled shared-master fixture adds4 records. Before that scoped guide correction all72 existing snapshots were exact. 1440/900/390/320, no overflow/duplicate IDs/H1 errors/JS errors/POSTs. [Final Worker comparison](final-worker/checks.json), [all56 exact assets](final-worker-assets.json), and [keyboard/form/indexing checks](final-interactions.json) pass. Numeric steps remain250/0.5/0.5; native sliders/FAQ work from the keyboard, form disabled, robots disallowed, sitemap empty, intake GET404 and no POSTs. Native build/version/deployment receipt is recorded in authenticated-cms.json.

The controlled route reuses **HomeLeverage** and current master only while its homepage placement is visible; it supplies no independent content store or new public launch route. Noindex, disallowed robots/empty sitemap, disabled intake, prices/proof permissions/global theme/H022, other pages and readonly reference inputs remain unchanged. Adding the fixture changes Astro bundle grouping/names; current artifacts are checked against the tested local build instead of requesting retired incoming bundle paths.

## Selective recovery

For a bad raw placement edit, inspect the specific diff and restore **only** `app/src/content/pages/home.json` from a known good revision, or repair only the offending row. For a bad/deleted master, restore only that named `app/src/content/global-elements/<id>.json`; preserve unrelated OWNER commits. Use `git diff <good> -- <file>`, then `git restore --source=<good> -- <file>`, review the staged diff, run `npm run verify`, commit and let the native review build complete. Never reset the repository or restore all content wholesale. Ordinary page Remove needs no master recovery: Add → Globalt element → select its retained original.

## OWNER review boundary

STOP after delivery for the **whole library/editor usability** decision and the separate choice of **which exact homepage sections should remain in a shorter composition**. Current defaults are intentionally preserved. Technical PASS is not content/visual acceptance. H024A3 OPEN, H024B BLOCKED, H022 PARKED. No launch, indexing, real intake/domain change or unrelated redesign.

[Visual comparison](comparison.html), [plan/ledger](PLAN.md).
