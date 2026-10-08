# H-008 shared commercial content and pricing page

D-024 locks the homepage commercial layer at 10c5890b2e4d678340384dd399a1785e3e01ba36 and pricing support copy at a37bf7a9067f18f4eafd59e2efd753240aecc96c. H-008 consumes their current bytes from incoming main 73ce60d8789ba0b44661ce5222adff53a4831127. Neither JSON file, authority field nor proof record changes. D-026 authorizes visual propagation to `/priser/` only; STRATEGY_CONTENT review of the resulting page remains pending.

## One editable package source

In Pages CMS, open **Forside og felles pakker – D-024 kommersiell del-lås → Forsidens innhold → Felles pakker for forsiden og /priser/**. This edits `app/src/content/pages/home.json → homepage.packages`.

Both pages use that object for package names, descriptors, fit/scope, numeric NOK prices, price/VAT suffixes, recommendation/badge, CTAs, work areas, measurement foundation and shared cost/capacity rules. Both use `PackageSection.astro`. No second package object was added to `priser.json`. The pricing page retains the legacy `#begge` link on its second package independently of the recommendation setting.

Repeated commercial facts in homepage/pricing FAQ and metadata bind to these same fields at build time through `commercial-text.ts`. Changing the shared price or rule does not require a parallel FAQ/metadata value edit. This binding preserves today's approved wording exactly, including the pricing sentence's “kommer også i tillegg” and the homepage FAQ's existing external-cost phrasing. A controlled future commercial change must still have its own content authority; CMS editability does not unlock D-024.

## Pricing supporting copy

The existing pages collection still edits `app/src/content/pages/priser.json`. Hero, work-area explanations, free-check support/CTA and FAQ connective wording remain here as D-024 supporting copy. There is no pricing enquiry form; free-check links go to the existing homepage form.

The `kostnader.body` paragraphs and first pricing FAQ answer retain the exact approved reference prose in JSON. Their repeated facts are resolved from the shared homepage package source when rendering. The CMS body-field description identifies this inheritance and the authoritative editing location. To change a cost rule, edit the shared package field after a scoped handoff, rather than editing a mirrored pricing paragraph. The current reference template enumerates three monthly package prices in package order, three cost paragraphs and a single common VAT statement; changing that structure requires an explicit implementation/content handoff. Invalid reference structure or inconsistent VAT suffixes fail the build rather than silently publishing a contradictory statement.

## Preserved controls and limits

Hero image/crop, selector, calculator, form and proof editing remain in their existing locations. The selected first photo and inactive alternatives remain a single hero asset selection. No CMS fields were migrated, no gallery added and no proof approval or renderer guard changed. Both cases remain non-public under D-025.

Authenticated Pages CMS GitHub App/repository connection and a real authorized editor-save/rebuild remain manual OWNER/editor actions. Follow the account steps in `h007-content-cms.md`; no authenticated save is claimed by local schema/build checks. Other 13 non-home pages, backend/intake and protected reference inputs remain unchanged. Stop for STRATEGY_CONTENT R-06 before service-page propagation.
