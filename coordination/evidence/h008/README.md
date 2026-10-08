# H-008 local implementation evidence

Incoming main: **73ce60d8789ba0b44661ce5222adff53a4831127**. D-024 content references: home commercial layer **10c5890b2e4d678340384dd399a1785e3e01ba36**, pricing supporting copy **a37bf7a9067f18f4eafd59e2efd753240aecc96c**. Current input bytes are consumed without changes to either JSON record or its authority/status. The exact implementation SHA belongs in the subsequent coordination receipt.

`/priser/` alone receives the accepted H-006 font/palette/shell/chrome/open-section system. Order: locked hero, shared three packages, work areas, additional costs/separate work, bounded free check, pricing FAQ, footer. No proof, new terms, hours, form or filler sections. Homepage packages are factored into `PackageSection.astro`; the homepage package object is the sole commercial source for both routes, including repeated FAQ/metadata facts. Pages CMS labels/descriptions and app/docs/h008-pricing-cms.md identify that location and supporting-copy inheritance.

## Verification

- `npm run verify`: Astro check, 69 files, zero errors/warnings/hints; **34 tests PASS**; build; **15 content routes + 404, 445 links/anchors**. H-007 leak scan: 19 outputs, zero public cases. H-008 static audit: actual matching package cards and exact D-024 pricing support text. Full output: [verification.txt](verification.txt).
- Existing `node scripts/qa-browser.mjs`: **40 checks PASS**, 15 routes, desktop/mobile plus 320px homepage, menu/calculator/form/privacy/no-JS recovery and isolated synthetic API/SQLite/email transport. [browser-checks.json](browser-checks.json). No real lead submission or live email.
- `node scripts/qa-home-pricing-h008.mjs`: both routes at **1440/390/320**, package facts/Instrument Sans/CTA, pricing order and locked support copy, menu/FAQ, no overflow, preview indexing and no public proof. [checks.json](checks.json).
- [baseline.json](baseline.json) was captured before implementation from the incoming build. All **182 frozen files** match: system/project, private proof, backend/config, other 13 page JSON records, 14 non-home/non-pricing HTML outputs including 404, and generated global CSS. Both D-024 input hashes match. At all three widths, homepage section/header/footer DOM hashes, every element's computed style and absolute geometry match that baseline exactly. The baseline was not reset to accommodate refactoring.
- `node scripts/qa-h008-package-source.mjs`: temporary changes to only homepage price, fit, work area, cost/capacity rules and recommendation state reach both actual Astro routes; FAQ/metadata retain no stale original price and `#begge` survives recommendation removal. No second pricing-content edit or public proof. [package-source-regression.json](package-source-regression.json). Original homepage bytes restored in `finally`; full verify then rebuilds the real locked content.

The new static pricing audit was first run against the incoming build and failed because `/priser/` had no shared package cards. The expanded source integration regression also failed on a stale original FAQ price before repeated facts were bound to the shared source. Both pass on the final implementation. Technical review findings and verification are in [implementation-review.md](implementation-review.md); these are not formal role approvals.

## Required captures

[Pricing full 1440](pricing-1440.png), [390](pricing-390.png); [packages 1440](packages-1440.png), [390](packages-390.png); [unchanged homepage 1440](home-1440.png), [390](home-390.png). Pricing desktop/mobile and mobile package captures were visually inspected. Live Worker verification/captures belong in a separate h008-live folder after main delivery.

## Remaining gates

Stop for STRATEGY_CONTENT R-06 review of the complete `/priser/` page and commercial consistency. No service-page propagation without a new scoped handoff. D-025 proof still needs comparable periods/intervention/limitations and exact approved presentation. Authenticated CMS connection/editor-save remains unverified and manual. No production intake, real notification, domain cutover, final legal/operations approval or new content lock is supplied by implementation.
