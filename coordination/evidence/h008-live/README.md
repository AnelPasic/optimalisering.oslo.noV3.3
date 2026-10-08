# H-008 live review evidence

Review target: https://optimalisering-oslo-v33.anel.workers.dev/priser/. Main build source **dd0fdbbf53735e02a0b93edd8cf83e876ef4b22e**, implementation/local evidence **87a839216db412305337daae24c01858176db15e**, incoming H-008 **73ce60d8789ba0b44661ce5222adff53a4831127**.

Connected **Workers Builds** succeeded for that source, build **77a51b43-8d04-417e-b41b-5e4ed0f847c5**, verified Worker version **e2c87262-83ee-455f-9755-7e11dff89612**. Native build status/summary and complete asset hashes are in [deployment.json](deployment.json). No direct deployment, account/configuration change or domain cutover was needed. The following coordination/live-evidence receipt commit changes no website assets; its own SHA is identified from Git history.

Verification:

- All 15 public route HTML responses match the locally tested build byte-for-byte. Both homepage/pricing public stylesheets match, allowing only repository line-ending normalization. Selected hero and both inactive alternative WebPs match bytes and hashes.
- HTML response noindex headers, robots disallow and empty preview sitemap match. Static intake `GET /api/leads` returns 404. No real POST or email.
- `QA_BASE_URL=https://optimalisering-oslo-v33.anel.workers.dev QA_EVIDENCE_DIR=../coordination/evidence/h008-live node scripts/qa-home-pricing-h008.mjs` passes both routes at **1440/390/320**: exact shared package/support text, price font, CTA, section order, menu/FAQ interaction, no overflow, noindex and hidden proof. [checks.json](checks.json).
- Homepage DOM/styles/absolute geometry match the immutable pre-H-008 baseline at all widths. Both locked JSON input hashes and all 182 frozen files match. No baseline was recaptured after implementation.

Required live captures: [pricing full 1440](pricing-1440.png), [390](pricing-390.png); [packages 1440](packages-1440.png), [390](packages-390.png); [unchanged homepage 1440](home-1440.png), [390](home-390.png). Local verify/source-regression/40-check browser results and technical review are in ../h008/.

**Stop for STRATEGY_CONTENT R-06 review of the complete pricing page.** D-024 remains a partial commercial lock, not a new full-page approval. D-025 proof remains non-public; other 13 pages, backend/reference inputs and authenticated-CMS/production gates remain unchanged. Authenticated editor connection/save is manual and unproven. No service-page propagation or launch authorization is inferred.
