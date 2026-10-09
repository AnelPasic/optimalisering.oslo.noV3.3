# H-010 Konvertering propagation and shared service context

Incoming main **cbd7e18ff29c1aff01421df81048eb66c3b3c8ba** supplies H-010. D-030 accepts the service pattern at H-009 implementation **36c305f62c82897e54dd99384e2fcc9c1d96e356**. D-031 locks Konvertering at **8b8f4c4eecda1458e45c392dfabe3d4ac4fbc8d5**. Current page JSON bytes/status/authority remain unchanged; scoped decisions remain in coordination/DECISIONS.md. No new role approval is supplied by implementation.

The existing **Nettsider → konvertering** Pages CMS editor still owns SEO/eyebrow/H1/intro, ordered sections/items/links, FAQ and CTA. Render the long H1 and first-section hook exactly; do not shorten them or change the locked wording/structure without a scoped handoff. No fields moved or schema migration.

Shared commercial values remain at **Forside og felles pakker → Forsidens innhold → Felles pakker for forsiden, /priser/, /synlighet/ og /konvertering/** (`home.json → homepage.packages`). Both service bridges use the same two package names/prices/units/VAT/recommendation fields. Repeated service price/name/VAT facts in FAQ follow this source at build time while preserving today's exact locked answer. No second price/package object. The approved pricing reference-template constraints in h008-pricing-cms.md still apply.

`ServicePricingBridge` now takes a required `serviceName` prop. `ServicePage` derives it from the active canonical slug (first letter uppercase) independently of editable navigation. Current slugs produce the exact H-010-authorized Synlighet and Konvertering context lines. Missing menu entries retain the safe breadcrumb fallback; they do not change bridge context or fail the build. No hard-coded Synlighet remains in reusable context logic. This applies only to the two currently authorized services, not an automatic future-service naming system.

`HomeSection` accepts an optional visualId. Konvertering's locked `friksjon` and `kvalitet` IDs select the already validated `behov` card and `kanaler` open-column styles. Actual section IDs, content and order stay unchanged; the optional prop defaults to the existing section class on every other route. No stylesheet was changed. The service renderer whitelist is exactly Synlighet and Konvertering; SEO/AI/other pages stay on their original renderer.

Hero/primary CTA/secondary pricing path, editorial prioritization, plum conversion×visibility, compact bridge, mint bounded check and FAQ reuse the validated service system. No second form, fake dashboard, metrics, benchmarks, client proof or invented terms. D-025 proof records and guards remain unchanged.

All 188 frozen hashes match incoming main, including all 15 page JSON records, proof/config/backend/reference inputs, 15 non-Konvertering HTML outputs including 404 and accepted CSS. Synlighet HTML also matches its delivered H-009 live asset hash; home/pricing/Synlighet computed styles and geometry match at 1440/390/320. Required Konvertering captures are in coordination/evidence/h010. Authenticated CMS account/editor-save remains a manual OWNER/editor action.

Stop for STRATEGY_CONTENT review of `/konvertering/`. The other 11 pages, SEO/AI propagation and production intake/launch remain gated. No new content/status lock or proof-publication decision is inferred.
