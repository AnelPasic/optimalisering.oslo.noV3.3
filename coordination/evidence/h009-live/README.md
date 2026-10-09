# H-009 live review evidence

Review target: https://optimalisering-oslo-v33.anel.workers.dev/synlighet/. Main/connected build source **463c683de92fe34ce66cb0001e722ff146a9ce19**, implementation/local evidence **36c305f62c82897e54dd99384e2fcc9c1d96e356**, incoming H-009 **fd48a91a4c7353aa37cb55b9abd30efd8e18a9f7**.

Connected Workers Build **c44cf193-26a9-42fb-a630-9b012cf6d80e** completed successfully. Verified Worker version **2074e8cd-ccc2-44a5-9a13-b31b5c671d9f**. Native build status/summary, source revisions and asset hashes are in [deployment.json](deployment.json). No direct deployment, configuration/account changes or domain cutover. The following receipt/evidence commit changes no website assets; use its Git history for its own revision.

Verification:

- All **15 public route HTML** responses match the tested build byte-for-byte, including D-027's corrected pricing heading and exact D-028 service text. Home/pricing/service CSS match, allowing only repository line-ending normalization; selected hero and both inactive alternative WebPs match bytes/hashes.
- All HTML response noindex headers, robots disallow and empty preview sitemap match. Static intake `GET /api/leads` returns 404. No real POST or live email.
- `QA_BASE_URL=https://optimalisering-oslo-v33.anel.workers.dev QA_EVIDENCE_DIR=../coordination/evidence/h009-live node scripts/qa-synlighet-h009.mjs` passes service **1440/390/320**: exact copy/order, shared two-package prices, typography/CTA/internal links, no overflow, menu/FAQ, noindex, no form/image/client proof. [checks.json](checks.json).
- Both home and pricing geometry/computed styles match the immutable incoming baseline at all three widths. All **187** frozen files match, including all page JSON/status/authority, protected reference/proof/backend/config, 15 non-Synlighet HTML outputs including 404, and accepted CSS. No baseline reset or other-page propagation.

Eight required live captures: [full 1440](synlighet-1440.png), [390](synlighet-390.png); [hero + first 1440](hero-first-1440.png), [390](hero-first-390.png); [three areas 1440](areas-1440.png), [390](areas-390.png); [bridge + check 1440](bridge-check-1440.png), [390](bridge-check-390.png). Local full verify/34 tests, 40 synthetic browser checks, actual shared-source/optional-navigation regression and technical review/fix are in ../h009/.

**Stop for STRATEGY_CONTENT review of the complete /synlighet/ page.** D-027/D-028 are preserved; this supplies no new role verdict, proof approval or production launch/intake authorization. Other 12 pages remain frozen. CMS authentication/editor-save remains manual/unproven; new bridge contextual wording remains draft pending review. No Konvertering/deeper service propagation without the next handoff.
