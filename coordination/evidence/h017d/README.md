# H-017D proof simplification evidence

Incoming main: `aaa4773`, pulled first. Contract: `coordination/H017D-PROOF-SIMPLIFY.md`, OWNER + STRATEGY_CONTENT, 2026-10-12. H-017C/D-077 acceptance and H-017B completion remain intact.

Subtraction only: removed work/limitations markup and its unused styles; comparison margin is now 24px above and zero below. Existing hierarchy, palette, typography, card padding, metric sizes and placement are unchanged. Latest incoming content already supplies Eurotents' 20 % lower spend and Nysta's Shopify label. No content/proof/CMS/gate fields were edited. Full evidence remains required internally.

Verification:
- Focused proof/CMS gates: 9/9 tests. Updated actual-output test failed against incoming output because internal work/limitations rendered, then passed after subtraction.
- Actual Astro renderer rejects unapproved, incomplete and non-comparable records on all three placements even with an environment override; exact source bytes restored (`proof-renderer-guard.json`).
- Full verify: 76/76 tests, zero Astro errors/warnings, one preexisting H-017A QA-script hint, all static/COPY-STYLE/CMS gates pass (`verify.log`).
- Local responsive QA: 9 route/width groups, 18 captures at 1440/390/320, zero overflow/errors/POST, hierarchy/native results/intake guards intact. Each card is shorter than incoming output. Surrounding section text/geometry/styles and 12 other page presentations are preserved (`local/checks.json`).
- Frozen Git blobs, including all content/proof records, .pages.yml, strict getPublishableCases, commercial/header/footer/hero/art/backend/noindex and read-only references, are verified against incoming main (`preservation.json`). Three preexisting untracked OWNER image files are untouched.

Live/native build and exact source/receipt commits are recorded in CODEX-TO-CHATGPT after delivery. Captures are named `home-proof-{1440,390,320}.png`, `konvertering-proof-{1440,390,320}.png`, `synlighet-proof-{1440,390,320}.png` under `local/` and `live/`, with full-page equivalents. Historical H-017C evidence is preserved; existing QA runners use the current handoff evidence folder.

STOP after delivery for OWNER + STRATEGY_CONTENT review. No launch/intake/indexing or new architecture approval follows this pass.
