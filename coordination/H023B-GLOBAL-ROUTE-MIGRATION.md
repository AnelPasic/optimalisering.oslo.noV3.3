# H-023B - Global semantic route + design-system migration

Date: 2026-10-15
Authority: OWNER + STRATEGY_CONTENT / D-085
Status: AUTHORIZED

## Objective

Complete the architectural migration started in H-023A.

Every public route must inherit one shared Tailwind/daisyUI visual system.
Remove hard-coded slug-based visual-system selection and the current old/new site split.

This is a renderer/component/CSS migration.
Do not reopen content, proof claims, pricing logic, calculator math, CMS authority or launch gates.

## Source plan

Use:
- coordination/evidence/h023a/H023B-MIGRATION-PLAN.md
- coordination/evidence/h023a/legacy-css-inventory.md

Those documents are the implementation baseline.

## Target architecture

### Semantic route resolver

Replace slug-whitelist renderer/style selection with a typed semantic resolver keyed primarily by page.kind and explicit safe capabilities.

Required route families:
- home
- service
- index
- article
- pricing
- assessment
- utility

A future arbitrary page with kind: service must inherit the service-family design without adding its slug to a code list.

Unknown/unsupported kind must fail closed.

### Service family

Create a generic ServiceFamilyPage that can render all service pages without requiring specific section IDs.

It must:
- render hero from generic page fields
- render optional hero media
- render every ordered section
- render FAQ
- preserve CTA
- support optional proof/pricing/special section capabilities only when explicitly configured and valid

Do not non-null assert special anchors such as sammenheng/prioritering.

Existing Synlighet and Konvertering special behavior must be preserved through explicit safe capability metadata/adapters, not slug branches.

SEO, AI-synlighet and Nettbutikkoptimalisering must work with no invented pricing/proof capabilities.

### Other families

Migrate:
- /innsikt/ index
- insight articles
- /priser/
- /vurdering/
- /kontakt/
- /om/
- /personvern/
- /vilkar/
- other current utility routes

Dedicated routes/components may remain dedicated where semantically justified:
- /
- /begreper/
- /design-system/
- 404

But shared primitives/theme must remain global.

## Global UI ownership

Final state:
- src/styles/app.css = global Tailwind+daisyUI/theme entry
- typography.css = approved semantic typography
- project/shared semantic adapters as needed
- component-scoped CSS = special composition only

No route may require an alternate palette/type/button/card/form system.

Page-specific/family CSS may control:
- grid
- placement
- responsive composition
- unique media/calculator/proof/PageList geometry

It may NOT redefine:
- brand palette
- button language
- routine card primitive
- form primitive
- typography scale
- core radii

## Legacy CSS removal

Use the H-023A inventory.

For each migrated family:
1. migrate consumer
2. prove route visually/functionally
3. remove rules/files that now have zero consumers
4. keep genuinely unique compositions

Goal:
- remove conditional visual-system stylesheet loading from SiteLayout
- no homeVisual/serviceVisual/pricingVisual flags whose purpose is selecting the design system
- retained composition imports must be component/family-owned, not palette ownership

Do not delete a rule merely because it looks old.
Prove it has no remaining consumer.

## daisyUI rule

Routine controls/components use:
1. daisyUI
2. Tailwind composition
3. custom CSS only for unique composition

Use the already configured daisyUI GitMCP/current docs when component behavior is uncertain.

Do not expose raw daisyUI classes in CMS.

## CMS presentation controls

Preserve and route through the shared semantic system:
- section surface
- card surface
- heading alignment
- PageList layouts/media
- proof presentation media

Protected models stay protected.

No content JSON rewrite unless required for explicit typed capability metadata.
If capability metadata is needed:
- keep it presentation/composition-only
- enumerate every added field
- expose only safe CMS controls if OWNER would actually need to edit it
- do not give it proof/pricing authority

## Route-specific requirements

### /synlighet/ + /konvertering/
Preserve:
- current hero
- service media
- section order/copy
- proof placement
- pricing bridge
- CTA
- FAQ
- current CMS controls

### /seo/
This is the main canary for fixing the old/new split.
It must look like the same site as the homepage without changing its content.
Preserve all existing sections and CTA.
Do not invent proof/pricing.

### /ai-synlighet/
Same shared service system.
No invented commercial inserts.

### /nettbutikkoptimalisering/
Same shared service system.
No invented commercial inserts.

### /innsikt/
Preserve approved H-021 PageList behavior exactly.

### Articles
Improve only shell consistency/readable composition.
Exact article text, anchors and SEO stay unchanged.

### /priser/
Preserve package data/order/preselection and disabled intake.
Routine controls migrate to shared primitives.

### Assessment/contact/utilities/legal
Shared typography/forms/header/footer/surfaces.
No legal/content rewrite.

## Header/footer

One shared commercial chrome system should serve all normal public routes where appropriate.

Do not leave old Header/Footer on some pages and HomeHeader/HomeFooter on others merely because of historical renderer choice.

If utility/legal pages deliberately use reduced chrome, make that a semantic family decision, not a legacy side effect.

## Design-system route

Update /design-system/ as migration discovers/locks any missing shared primitive.

OWNER visual feedback after H-023A: the page is technically useful but visually too dense and reads like a component dump. In particular, typography specimens and adjacent section headings are visually glued together.

Treat /design-system/ as a real Visual Shell review artifact.

### Required polish

Create page-local review composition primitives, for example:
- `ds-section`
- `ds-group`
- `ds-specimen`
- `ds-type-specimen`
- `ds-grid-demo`

Names may differ, but the intent must be explicit.

Required outcomes:
- clear vertical separation between major demo sections
- consistent spacing between section heading, explanation and examples
- typography specimens separated into deliberate rows/cards/groups instead of H1/H2/H3/H4 stacked tightly together
- each typography role clearly identifiable (Display, H1, H2, H3, H4, Lead, Body, Meta/Eyebrow)
- long-heading stress test visually separated from the normal type scale
- 2/3/4-card demos each get their own labelled block and breathing room
- button/status examples grouped instead of running into the next block
- form controls have consistent field-group spacing
- surface examples have equal outer gaps and internal padding
- pricing/PageList examples are separated from surrounding explanatory text
- mobile spacing remains generous enough to inspect components without becoming a giant wall of tiny samples

Use Tailwind spacing utilities and the approved theme/components first.

Do NOT solve this by adding generic global margins to all `h1/h2/h3/h4`.
Global heading elements are intentionally composition-neutral; spacing belongs to the section/content-stack primitive.

Do NOT change the approved type scale merely to make the demo page look less dense.

It remains:
- internal
- noindex
- unlisted
- Theme Controller QA only

Do not turn it into a public style guide.

## Proof H-022

H-022 remains PARKED.

Preserve its current delivered state through the migration.
Do not redesign it in H-023B.

## QA strategy

This is high-risk architecture work.

Unit:
- resolver family for every current kind
- future arbitrary service slug inherits service family
- unknown kind fails
- optional capabilities absent/present/invalid
- no slug whitelist selects style/renderer

Rendering:
- exact copy/order snapshots for every route
- no invented proof/pricing
- H-021 PageList unchanged
- calculator behavior unchanged
- package logic unchanged

Responsive:
- 1440 / 900 / 390 / 320 for each representative family
- specifically compare /, /seo/, /synlighet/, /ai-synlighet/, /nettbutikkoptimalisering/, /innsikt/, article, /priser/, /vurdering/, legal/utility

Interaction:
- menu keyboard/Escape
- FAQ
- forms/validation
- PageList links
- pricing selection
- no-JS where applicable

Safeguards:
- noindex
- intake disabled
- no real POST
- proof gates
- CMS roundtrip
- canonical/metadata unchanged

Run one full verify at the end after focused migration checks.

## Visual acceptance target

The test is simple:

Open /, /seo/, /synlighet/, /ai-synlighet/, /nettbutikkoptimalisering/, /innsikt/ and /priser/ in separate tabs.

They must obviously look like pages from the same website:
- same header/footer family
- same typography
- same buttons/forms
- same surfaces/cards
- same spacing logic

while still allowing page-family-specific composition.

## Evidence

Keep evidence useful, not ceremonial:
- semantic resolver map
- before/after /seo/ desktop/mobile
- route-family montage or representative screenshots
- removed/retained CSS summary
- remaining custom CSS ownership
- source preservation summary
- final Worker receipt

## Delivery

Pull latest main.

Implement H-023B fully.

Push main.
Verify connected Worker.
Update coordination.

Then STOP for OWNER whole-site visual review.

Do not continue into H-022 proof redesign/polish or launch work.
