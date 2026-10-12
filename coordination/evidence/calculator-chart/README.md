# Homepage calculator chart evidence

Incoming main `627a78af0e4d130d850aea1ea5a56f2d06708084`, pulled first. Authority: direct OWNER Codex request, 2026-10-12, for one calculator-only enhancement and main/connected Worker delivery followed by review. Genuine D-080/H-017E acceptance from incoming main remains intact.

Added a compact custom SVG chart between numeric inputs and existing result cards: subdued dashed plum **Uten optimalisering**, solid green **Med optimalisering**, visible endpoint values, six month ticks and **Illustrasjon - ikke prognose**. It interpolates six equal visual steps from the existing current monthly result to the existing scenario monthly result; the current series stays flat. This is a visual illustration, not cumulative results or a forecast. No intermediate numerical claims, customer-proof language, extra data model or chart dependency.

Both conversion-rate number fields retain their original any-step validation/0-100 bounds and now have synchronized native range controls. Number edits preserve arbitrary valid precision; slider edits use one decimal place, without changing the calculator math. All four numeric fields update both the chart and original cards/difference/% outputs. Equal/lower scenarios are shown honestly. Invalid input retains the existing error/output clearing and hides the chart; moving a slider can restore a valid rate. Existing numeric default-result fallback remains without JavaScript, with chart hidden and sliders disabled. Subtle path/end-dot transitions respect reduced motion.

Only existing runtime file changed: `app/src/components/HomeLeverage.astro`; new geometry helper: `app/src/lib/scenario-chart.ts`. Core `calculateScenario`, all content JSON, source copy/authority, CMS, hero/proof, packages, chrome, assets, intake/noindex and dependency files are unchanged.

Validation:

- `focused-tests.log`: 8/8 existing math and new geometry tests. The two geometry tests were observed failing before implementation, then passed for six steps, exact endpoint outcomes, flat baseline and lower/equal/zero/tiny/maximum values.
- `verify.log`: full verify 81/81 tests, zero Astro errors/warnings, one preexisting H-017A QA-script hint; 15 pages / 443 links; static/COPY-STYLE/proof/hero/CMS checks pass, 19 unchanged content hashes.
- `local/checks.json`: 1440/900/390/320, four captures, live independent math/output/end-value/path checks; number/range/keyboard sync including fractional manual percentages; higher/lower/equal/zero/max/invalid inputs and slider recovery; reduced motion; native default result fallback; disabled intake; zero overflow/errors/POST. All section copy/result labels/caveat remain exact. All homepage sections outside calculator preserve HTML/style/size; later sections move only by the calculator's added height. All 14 other page body HTML snapshots are exact.
- `preservation.json`: 250 protected Git blobs match incoming main, including core math, content/CMS, hero/proof, prices/chrome/art/public styles/assets/backend, dependencies/noindex/intake settings and read-only references. Three preexisting untracked OWNER image files remain untouched/untracked.

IMPLEMENTATION inspected desktop and mobile captures and reviewed the diff against the direct request. The plot uses readable 12px labels at each live SVG width; it remains visually subordinate to the original numeric result cards. This is author verification, not a formal review verdict. Main/native build/live evidence follows in CODEX-TO-CHATGPT and this evidence folder.

Implementation `9773fcbb1d11cb7b41630084d16e0c30a3493ed8`: native Build `370665b6-d8dd-492c-ba76-8631da49b962` SUCCESS, Worker version `3b66512e-c0d0-4e03-8cdb-bc551e10db2a` (`implementation-native-build.json`). All 51 live assets match the tested build; noindex, robots, empty sitemap, both API GET404, matching custom 404 and absent results route pass (`live-assets.json`). The same four-width live math/slider/keyboard/preservation/native/reduced-motion checks pass with zero overflow/errors/POST (`live/checks.json`), with four captures under `live/`. Calculator height adds 273.6px at 1440/900/390 and 294.4px at 320; other sections retain their presentation and shift vertically only by that amount.

STOP after delivery for OWNER review. H-017E/D-080, earlier accepted proof, H-017B and separate intake/indexing/launch gates remain preserved.
