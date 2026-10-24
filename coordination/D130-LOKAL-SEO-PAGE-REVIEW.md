# D-130 — Lokal SEO side + navigasjon (review candidate, not launch approval)

2026-10-24 · Branch `feat/content-lokal-seo-page`, based on source-verified `main` at `df4bfdd0506dc25b8db0bb4c1d888e5884386dac`. No OWNER content/release approval inferred. No production or noindex Worker deployed by this branch.

## Commercial/page brief (MWS-031 Lane C)

- **Buyer:** Norwegian owner/manager of a service-area company (e.g. plumbing, trade service) or local shop with a real physical or service-area presence. Not every national webshop needs local SEO.
- **Job / search intent:** Find out whether local Google visibility is a problem; distinguish incorrect Google Business Profile information, missing service/coverage detail and poor contact conversion; learn what to check and when paid help is useful.
- **Page:** `/lokal-seo/`, kind `service`, independent from `/synlighet/` hub, `/seo/` organic SEO and `/ai-synlighet/` AI-source/recommendation topic. No invented alternative `/aio/` route.
- **Unique value:** Practical profile-vs-website-vs-contact diagnostic, accurate constraints for staffed office versus service-area businesses, realistic ranking factors and a concrete first check anyone can perform; no cloned city landing pages.
- **Offer:** Current Synlighet/pricing and free manual check, no invented Lokal SEO bundle, guarantee, case, rank, fee or SLA.
- **Evidence:** Google official pages linked below for ranking rules, business eligibility and schema limitations; illustration “rørlegger i Ski” is not claimed as a Medon case or customer.
- **CRO:** Identify the problem and choose `/#sjekk` or `/priser/`; form remains disabled on preview pending D-129. No new confirmation promises.

## Git changes in this review branch

- Promote and lightly polish existing D-127 research draft to `app/src/content/pages/lokal-seo.json`. Preserve seven section IDs and existing FAQ, add one explicit self-check and one answer about competitor ranking. The original editor-only draft is removed to avoid diverging content authority.
- Change only the “Lokal SEO” submenu destination in `app/src/content/pages/home.json` from `/synlighet/#lokal-synlighet` to `/lokal-seo/`. Parent “Synlighet” stays clickable, other menu links unchanged. Existing Synlighet hub section remains valuable and unchanged.
- Migrate existing dedicated Pages CMS editor from draft path to `app/src/content/pages/lokal-seo.json`, remove the new file from the generic “Øvrige tjenester” CMS collection to prevent duplicate editors, maintain read-only `REVIEW_REQUIRED` and `DRAFT / NON-AUTHORITATIVE` authority. No new arbitrary editor.
- Update focused source test to assert real route source, schema, editable CMS round-trip fixture, menu href/description and nonpublished authority.
- Do not touch global elements, approved price/proof, D-126 FAQ, service hub copy, app forms, Worker, LeadProof or the active D-129 PR.

## Source research and limits

- [Google - Slik kan du få bedre lokal rangering](https://support.google.com/business/answer/7091?hl=no): Relevans, avstand og prominens/popularitet; fullstendige nøyaktige profiler; reviews. No way to buy a better organic local ranking.
- [Google - Retningslinjer for å representere bedrifter](https://support.google.com/business/answer/3038177?hl=no): Storefront vs. service-area eligibility, actual staffing and customers, hide residential address for service-area business; no invented staffed “office”/virtual-address pages.
- [Google Search Central - LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business): Mark up verifiable existing information; structured data does not guarantee a visible feature or position. No new site schema introduced.
- [Google Search Central - people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): Distinct useful information, not page counts or SEO-only automated content.
- [Google Search Central - spam policies](https://developers.google.com/search/docs/essentials/spam-policies): Avoid scaled near-duplicate city/keyword pages and doorway intent.

## Quality gate / disposition

**Editorial self-check before candidate commit:**
- ELI10/clarity: Each section answers a buyer question, maps back to a real task.
- Evidence: Ranking, eligibility, structured data and limits sourced; no unapproved proof/result/company location. Ranking is not guaranteed.
- SEO/AIO: Distinct local intent; descriptive title/meta/H1, service scope, FAQ and contextual internal links. No unsupported AI recommendation.
- CRO: Relevant buyer can find next action in existing free check and pricing, with privacy/lead gates unchanged.
- Voice: Existing Medon site-specific `coordination/CONTENT-TONE.json` (Medon service copy / Spiss+ FAQ and explanations), `COPY-STYLE.md`, and `MedonWebSystem/docs/CONTENT-QUALITY-AND-VOICE.md`. Dry observation is sparse and accuracy outranks wit.
- Product owner still reviews business delivery claims and user-facing copy before content authority changes.

**Technical verification still required:** On this branch run focused `node --test tests/lokal-seo-page.test.ts tests/header-navigation.test.ts`, Astro build/check and link audit; verify generated `/lokal-seo/` HTML, all internal links and default noindex/canonical in the existing review environment, responsive 320/390/1440 and real authenticated CMS Save→Git readback if any editor shape changed. Run from `app/`. GitHub source-only inspection cannot substitute for these tests. No merge, worker deployment, public indexing or `status: PUBLISHED` granted by this document.

## Next content opportunities (research/backlog, NOT automatic publishing)

1. **Google bedriftsprofil - kontroll og vanlige feil**, under Innsikt. Concrete walkthrough for the owner, paired with Lokal SEO service page; requires actual screenshots/rules review.
2. **Hva er forskjellen mellom SEO, lokal SEO og AI-synlighet?** Can extend existing Synlighet hub with original simple decision aid instead of immediately creating a redundant fourth page.
3. **Hvorfor gir trafikk ingen henvendelser?** Troubleshooting guide anchored to current Konvertering and Gratis sjekk; avoid generic CRO checklist.
4. **Hvordan måler vi reelle henvendelser fra SEO og AI-søk?** Reuse existing measurement article where possible; do not imply current LeadProof can verify every ChatGPT-originated visit or conversion.

Prioritize by helpfulness, own evidence, commercial fit and actual GSC/search demand after launch. **Do not create 10-15 generic articles merely to enlarge the site.**
