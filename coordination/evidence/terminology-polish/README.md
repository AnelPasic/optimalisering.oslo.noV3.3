# Terminology polish QA only - 2026-10-13

Incoming main: `94be07f041438f210422832f81fd2963fff8f00a`. Consume the actual **TERMINOLOGY POLISH QA ONLY** packet in `coordination/CHATGPT-TO-CODEX.md`. The incoming glossary copy, examples, layout and selective inline placements are preserved.

Two minimal technical corrections:

- COPY-STYLE previously rejected `«»` in the new quoted explanations/examples. A field-specific glossary exception preserves that copy. Regression tests still reject quotation marks in short definitions, other forbidden punctuation and template phrases. No other content guard is relaxed.
- The glossary anchor handler previously threw `URI malformed` for an invalid percent-encoded fragment. It now ignores invalid fragments. Correct anchors retain automatic native-details opening.

The browser harness now tests the incoming native-details presentation rather than the superseded all-visible article markup. It checks every full definition/example, all 25 direct anchors at every width, the full-explanation tooltip link, keyboard details toggling, collapsed versus expanded height, expanded overflow, malformed anchors and native no-JS operation. No glossary source edit is performed.

Evidence:

- `verify.log`: final full verify; 89 tests, all static/COPY-STYLE/proof/hero/CMS checks, 20 unchanged CMS JSON hashes.
- `browser.log`: existing whole-site 40 browser checks, including calculator and synthetic-only intake regression.
- `local/checks.json` / `live/checks.json`: 28 route/width groups each, all explanations/interactions, glossary details and anchors at 1440/900/390/320; zero page errors/review POST.
- `local/` / `live/`: hero ROAS, collapsed full glossary, glossary top and expanded SEO captures at all four widths.
- `edge-checks.json`: four viewport corners, hover leave, second tap, older-browser direct-link fallback.
- `layout-preservation.json`: all 60 existing main text and measured section/hero/proof/package snapshots exact against the original terminology baseline.
- `preservation.json`: 259 protected Git blobs exact against incoming main, including the new glossary JSON, CMS configuration, terminology styles/client/placements, calculator, proof, pricing, intake/noindex and read-only references. Only the anchor decoding code is allowed to change among existing runtime files.
- `implementation-native-build.json` / `live-assets.json`: exact implementation revision connected-build and tested-asset Worker receipt.

Authenticated editing of the terminology CMS entry remains untested. The existing schema/field tests and CMS round-trip prove safe source compatibility locally. No content lock, role verdict, launch approval, real submission, direct/backend deployment, secrets or domain change is inferred. Stop for OWNER + STRATEGY_CONTENT review after the connected Worker checks.

Final native/live receipt: implementation `0acfe8bfc79082b7a46af3f2871d69559f5d1c56`; connected Build `44dc9538-d111-4dbc-8f6c-66aa05ced1b2` succeeds, Worker `f627fc60-16a4-4ec1-b834-8da90a570ea9`. All 53 assets match the tested build; all 28 live browser route/width groups and every glossary anchor/no-JS accordion pass with zero page errors/review POST. Stop for review.
