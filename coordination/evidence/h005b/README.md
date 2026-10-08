# H-005B implementation evidence

Baseline: b6d035a99513d007a905cbc64c2f0e10c1f5421b, freshly built before hero/selector edits. h004-baseline.json records rendered lower-section DOM hashes, all computed-style hashes and relative geometry at 1440/390/320px. files-baseline.json covers 174 frozen/reference/output files.

Local checks: npm run verify; node scripts/qa-browser.mjs; node scripts/qa-home-h005b.mjs; node scripts/qa-production-guard.mjs. For file preservation, set QA_BASELINE_FILE=../coordination/evidence/h005b/files-baseline.json then run node scripts/qa-preservation.mjs from app/. The focused script reads the committed browser baseline by default; it requires the same Chrome version recorded in checks.json for computed-style comparisons. Snapshot mode is only for capturing a fresh pre-change build, never for accepting the current page as its own baseline.

The new focused contract failed on the unchanged H-004 build (hero not shorter), then passed after H-005B. Hidden display:none nodes have zero page rectangles and are excluded only from relative-position comparisons; their DOM and computed styles are still compared.

Six screenshots cover the full page and hero + selector at all three widths. Exact lower content, metadata, CTAs and chrome match the baseline; eight rendered lower blocks (207 elements per width) retain identical DOM/computed styles and geometry within 0.1px. Final files match all 174 baseline hashes.

Implementation QA and the technical review do not supply OWNER R-03 acceptance, a formal RED_TEAM R-04 verdict, a content lock or launch permission. Public visual labels/support remain draft; the visual is explicitly an illustration with a generic business, no real client or measured result. Intake remains disabled; no live email or real lead submission occurred.
