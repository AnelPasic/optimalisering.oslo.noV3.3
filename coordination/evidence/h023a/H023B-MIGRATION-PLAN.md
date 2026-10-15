# H-023B semantic route/template migration plan

PROPOSED ONLY. Execute only after OWNER accepts the H-023A Visual Shell/design-system and sends a scoped handoff. H-022 proof visual acceptance stays parked and separate. No draft content or launch gate is promoted by this plan.

## Current routing and the concrete break risk

`src/pages/[...slug].astro` binds commercial placeholders for `home/priser/synlighet/konvertering`, selects ServicePage with `['synlighet','konvertering']`, and assigns Invite styles/chrome by slug. SiteLayout still conditionally links retained page-family CSS. `InnerPage` renders all remaining services through ContentSection/global legacy styling.

`ServicePage.astro` cannot simply receive every service: it dereferences `sammenheng.links` and a `/priser/` link with non-null assertions, inserts proof only after `prioritering`, inserts pricing only after `sammenheng`, maps `friksjon/kvalitet` to visual variants, and derives service labels from slugs. SEO, AI and e-commerce content have different section IDs and no mandatory sammenheng/prioritering. A slug-list expansion would throw or silently omit content relationships.

## Target semantic renderer

1. Introduce a pure typed resolver keyed by `page.kind`, returning renderer family, shared chrome and optional capabilities. Every `kind: service` gets ServiceFamilyPage and the same theme/chrome automatically, including a synthetic future service slug. No slug array selects its visual system.
2. Build ServiceFamilyPage around the generic page fields and ordered `page.sections`. Optional hero media uses the existing validated resolver and text fallback. Preserve every supplied section and FAQ, including absent optional links/items. Default rendering requires no special section IDs.
3. Introduce typed, optional presentation/commercial capabilities for special compositions (commercial binding, pricing bridge insertion anchor/link/label, proof slot insertion anchor, section visual role). Capabilities use semantic identifiers and approved enums; no arbitrary classes. Validate targets exist and fail closed if absent. Existing content is unchanged; any needed metadata migration must be enumerated and reviewed in H-023B. Commercial capabilities never grant price/proof/copy authority.
4. Translate existing `surface`, card surface, headingAlign and PageList variants through shared semantic adapters. Keep protected models/rows excluded. Use the same normal controls across route families while retaining unique layouts and authority.
5. Replace conditional palette/component CSS loading with composition imports owned by each family/component. Delete redundant rules only after no remaining consumer is found. Final global entry owns Tailwind, daisyUI theme, typography and semantic adapters; route styles own layout alone.

## Exact route batches

| Routes | Current renderer | Proposed family / preservation constraints |
| --- | --- | --- |
| `/synlighet/`, `/konvertering/` | ServicePage, Invite | First adapters preserve current structure, `prioritering` proof placement, `sammenheng` bridge, hero media and locked copy. |
| `/seo/` | InnerPage, legacy | Service family; preserve sok-side/teknisk/prioritering/effekt/ai/sjekk, no invented pricing link/capability. |
| `/ai-synlighet/` | InnerPage, legacy | Service family; preserve informasjon/observasjoner/arbeid/begreper/grenser/sjekk; optional hero and bridge absent by default. |
| `/nettbutikkoptimalisering/` | InnerPage, legacy | Service family; preserve kjeden/beslutning/okonomi/tjenester/sjekk; no forced sammenheng. |
| `/innsikt/` | InsightIndexPage, service CSS | Semantic index family; accepted PageList query/order/media/alternation unchanged. |
| `/innsikt/hva-bor-optimaliseres-forst/`, `/innsikt/male-effekt-av-optimalisering/` | InnerPage/article | Article family with shared shell, readable measure, exact article text/anchors. |
| `/priser/` | PricingPage, pricing CSS | Pricing family; shared package source, expanded native details and independent default-off order gate preserved. |
| `/vurdering/` | InnerPage/assessment | Assessment family; preserve transport validation/gates; synthetic checks only. |
| `/kontakt/`, `/om/`, `/personvern/`, `/vilkar/` | InnerPage/utility | Utility family; content/authority and legal drafts remain exact. |
| `/`, `/begreper/`, `/404.html`, `/design-system/` | Dedicated | Keep dedicated semantic compositions; migrate only remaining shared primitives as required. Internal route remains noindex/unlisted. |

Order: resolver and service adapters -> three legacy service routes -> index/articles -> pricing/assessment -> utilities/shared residuals. Review each coherent family against the approved foundation before wider propagation if the eventual handoff requires that gate.

## Required future verification

- Resolver unit fixtures: every current kind, unknown kind failure, future arbitrary service slug, absent/invalid optional capability, absent hero/link/items, duplicate/missing insertion anchors.
- Rendering fixtures: accepted two services preserve copy/order/hero/proof/bridge; SEO/AI/e-commerce need no special IDs; no unapproved proof or invented commercial copy.
- CMS fixtures: current safe surface/heading/media variants, dark inheritance, protected model exclusions, clearing optional values; content/schema hashes and authenticated save only when that scope is authorized.
- Responsive 1440/900/390/320 per migrated family, keyboard menu/FAQ/forms, no-JS links, 14px floor/contrast; all routes build with unchanged canonicals, titles/metadata, noindex/intake gates, no persistence.
- Remove slug arrays from renderer/style selection and prove new service inheritance with a fixture; commercial/publication authority remains explicit and fail closed. Inventory obsolete CSS and delete only then.
- Run current full verify and focused migration checks, push/Worker receipt if authorized, then stop at the actual OWNER review boundary.
