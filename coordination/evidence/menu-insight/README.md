# OWNER menu / Innsikt correction

2026-10-10; incoming main `2ce3ab2c207387a87444adb341a6f0ee35991b1c`; actual direct OWNER scope recorded in D-067 / CHATGPT-TO-CODEX. Exact implementation and delivery revisions are identified in Git history and the outbound receipt.

- Priser desktop/mobile navigation now targets `/priser/` through the existing CMS chrome source.
- Only the Innsikt overview uses the existing accepted template. Its content record, metadata, authority and guide links are unchanged.
- `verify.log`: 64 tests, zero Astro diagnostics, complete build/static/copy/pricing/service QA PASS.
- `browser.json`: eight focused groups, 1440/390/320 px, navigation clicks, unchanged content/metadata/guide links, no overflow/errors/POST/real leads/emails.
- `existing-browser.json` / `existing-browser.log`: 40 existing whole-site browser checks PASS.
- `preservation.json`: all 15 page records preserved except the intended home CMS navigation href.
- `frozen-pages.json`: ten remaining HTML pages, including both guide articles, byte-equal to the incoming review Worker before delivery.
- `innsikt-1440.png`, `innsikt-390.png`, `innsikt-320.png`: local full-page captures; desktop/mobile visually inspected.

Delivery uses the existing noindex, fail-closed static review Worker. Native deployment and live browser receipts follow after publishing. Stop for OWNER review of this correction; no formal role PASS or wider rollout is supplied. H-017A review and H-017B queue remain separate.
