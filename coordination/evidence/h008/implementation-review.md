# H-008 technical review

2026-10-09. Read-only implementation review by `/root/h008_technical_review`, requested through the requesting-code-review skill. Scope: H-008 working-tree implementation versus incoming main 73ce60d8789ba0b44661ce5222adff53a4831127. This is technical review only, not STRATEGY_CONTENT, OWNER acceptance or formal RED_TEAM.

Initial findings:

1. **P2:** shared cards alone left literal price/rule facts in pricing/homepage FAQ and metadata vulnerable to drift after CMS edits. Resolved by build-time `commercial-text.ts` binding to the same homepage package fields. No second price object and no approved JSON text changed. The actual Astro source regression now rejects stale prices in full HTML, including metadata.
2. **P3:** legacy `/priser/#begge` depended on the recommended boolean. Resolved by keeping the alias on the second package slot independently of recommendation; the integration regression removes recommendation and verifies the anchor remains unique.
3. **CMS clarity:** the pricing cost paragraphs remain approved reference copy but render shared rules. The CMS body-field description and app/docs/h008-pricing-cms.md now identify inheritance and the authoritative edit location explicitly.

Reviewer follow-up: **no remaining material findings**. Read-only exercises confirmed all 14 current homepage/pricing FAQ and SEO strings remain exactly equal, while shared name/price/budget/external/separate-work edits reach repeated FAQ/metadata. Stable legacy anchor, clear CMS description and no diff in either JSON input confirmed. H-008 static audit plus 10 focused commercial/proof tests passed. Fixed approved three-package order and one common VAT suffix are intentional constraints of this scoped reference template.

Final implementation evidence, completed after the fixes: full verify passes (69 files, zero diagnostics; 34 tests; 445 links); real-Astro one-source regression passes then restores source bytes and rebuilds; focused browser QA passes both pages at 1440/390/320 with unchanged homepage DOM/styles/geometry and all 182 frozen files. Earlier existing browser regression passes 40 checks. See checks.json, package-source-regression.json, verification.txt and browser-checks.json.

Stop for genuine STRATEGY_CONTENT R-06 review of `/priser/`. No new content lock, proof publication, broader propagation or launch permission is inferred.
