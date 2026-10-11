# H-017C - Final proof publication

Date: 2026-10-11
Authority: OWNER + STRATEGY_CONTENT
Decision basis: D-075 + D-076
Status: AUTHORIZED FOR IMPLEMENTATION AND REVIEW

## Objective

Publish the strongest OWNER-approved proof set without reopening proof selection.

OWNER has explicitly approved these five client references for public use:
- Eurotents
- Nysta
- Helt Opplagt
- Tankeverksted
- Oracles

Publication permission is not a blocker for these five.

Oslo Privatklinikk remains separate/deferred and must not render.

Do not create five equal homepage cards. The visual/commercial hierarchy is locked below.

## 1. Homepage hierarchy

Use exactly three cases on the homepage:

### Featured / dominant
**Eurotents**
- public hero metric: ROAS 4,3x -> 17,2x
- support: 20 % lower ad spend
- comparison: April 2025 -> April 2026
- source family: Google Ads
- role: strongest broad commercial proof and homepage anchor
- do not publish the disputed GA4 conversion-rate comparison

### Supporting
**Nysta**
- public hero metric: fullført checkout 7,1 % -> 43,6 %
- comparison: 30 days before -> first 30 days after
- next 30 days: 58,1 %
- keep the existing locked caveat

### Supporting
**Helt Opplagt**
- public hero metric: +93 % organic clicks
- support: average position 21,8 -> 12,2
- comparison: March-September 2025 -> March-September 2026
- source family: Google Search Console
- scope the claim to organic visibility
- do not imply total lead growth; recorded total forms were 79 -> 67

Recommended desktop composition:
- one wide featured Eurotents card
- two smaller supporting cards for Nysta and Helt Opplagt
- natural stacked order on mobile

The first selected homepage case is the featured case. Do not flatten all three into equal cards.

## 2. Service-page placement

### /konvertering/
Use Nysta as the primary proof block.

Placement:
- after the conversion mechanism/customer journey is clear
- before the pricing bridge/final conversion path

### /synlighet/
Use Helt Opplagt as the primary proof block.

Placement:
- after the page has explained the visibility mechanism/channels
- before the pricing bridge/final conversion path

### /nettbutikkoptimalisering/
Do not force a new proof block in this task unless the reusable service-proof implementation makes it low-risk.
If added, prefer Nysta first. Oracles may be used only with a claim shape that does not pretend GA4 revenue and Shopify net sales are the same measurement.

### Tankeverksted
OWNER permission is granted, but this is an efficiency snapshot rather than a clean before/after case:
- Mar-Sep 2026 Google Ads spend: 28 181 kr
- 47 actual Gmail bookings/forms
- approximately 600 kr per actual booking
- Sep 2026: approximately 381 kr per actual booking
- do not present Google-reported conversions as actual bookings
- do not invent a before period to satisfy a renderer

Keep it available for a later paid-acquisition placement unless a truthful snapshot-style proof variant already fits cleanly.

### Oracles
OWNER permission is granted, but current measurement systems/scopes differ.
Do not manufacture an apples-to-apples before/after comparison.
Keep it available for later ecommerce context unless a truthful non-comparable/snapshot proof variant is implemented without weakening proof gates.

## 3. Proof registry

Add the OWNER-approved case records needed by the selected public placements.

At minimum, Eurotents and Helt Opplagt must become selectable/publishable records because homepage and /synlighet/ now depend on them.

Nysta remains the existing locked publishable record.

For Eurotents:
- use the exact public Ads claim above
- Ads comparison is April 2025 vs April 2026
- organic support evidence is March-August 2025 vs March-August 2026, but do not mix it into the dominant Ads before/after fields if the component only supports one comparable period
- source systems previously verified: Google Ads, GA4 and Google Search Console via Windsor.ai
- public homepage claim should stay on the clean Google Ads ROAS/spend comparison
- do not publish the GA4 conversion-rate comparison because migration/tracking comparability is disputed

For Helt Opplagt:
- dominant public visibility claim: organic clicks 2 162 -> 4 181 (+93 %)
- average position 21,8 -> 12,2
- March-September 2025 vs March-September 2026
- keep limitations explicit: this is search visibility proof, not a claim of more total forms/revenue

For Tankeverksted and Oracles:
- permission can be recorded as granted
- do not mark a structurally incomplete/non-comparable claim PUBLISHABLE merely to satisfy the UI
- never weaken getPublishableCases

## 4. Reusable proof presentation

Refactor the proof UI only as much as needed.

Requirements:
- continue to use getPublishableCases for normal before/after public proof
- no bypass of proof publication gates
- support homepage hierarchy: first case featured, next two supporting
- support one primary proof placement on /konvertering/ and /synlighet/
- semantic HTML
- responsive at 1440 / 390 / 320
- before/after/result understandable in under 3 seconds
- caveats remain readable, not hidden
- no dashboard styling
- no fake screenshots
- no trophy/badge graphics
- no logo wall
- no raw evidenceMetrics dump

Use current Instrument Sans / Figtree and green/cream/plum site DNA.

## 5. CMS

Pages CMS remains the editor over Git.

Keep the proof registry guarded/internal.

OWNER must be able to edit/select safe presentation fields for supported placements:
- selected case IDs
- eyebrow
- heading
- before/after/work labels

For service pages, add the smallest safe CMS/content-model extension needed to choose the approved case for /konvertering/ and /synlighet/.

Ordinary CMS editing must never change:
- permission state
- publicationStatus
- strategyReviewStatus
- publicationApproved on the underlying proof case
- comparable-period requirement
- evidence/source fields

Do not reopen pricing/package CMS work.

## 6. Copy and claim rules

Follow coordination/COPY-STYLE.md.

Customer-facing copy:
- Bokmal
- clear, concrete, short
- use "-" and "->"
- no unsupported causal wording
- no guarantee language
- do not say Helt Opplagt got more total leads
- do not publish Eurotents disputed GA4 conversion comparison
- do not invent a before period for Tankeverksted
- do not merge Oracles GA4 and Shopify revenue into one metric

## 7. Preserve

Do not redesign or materially change:
- hero
- selector
- calculator
- packages/pricing
- order flow
- service hero artwork
- header/footer
- intake feature flags
- noindex
- English scaffolding

Do not create /resultater/ in H-017C.

## 8. QA

Required:
- full verify
- proof publication gate tests
- incomplete/non-approved proof cannot render
- Oslo Privatklinikk cannot render
- homepage renders Eurotents featured + Nysta + Helt Opplagt in locked order
- /konvertering/ renders Nysta only
- /synlighet/ renders Helt Opplagt only
- no extra evidenceMetrics leakage
- COPY-STYLE QA
- 1440 / 390 / 320 screenshots for homepage proof and both service proof placements
- no layout overflow
- CMS config/schema/content round-trip checks
- preserve all current pricing/order/intake/noindex safeguards

Push to main and verify the connected review Worker.

## Acceptance

1. Homepage shows Eurotents as dominant proof, with Nysta and Helt Opplagt supporting.
2. /konvertering/ shows Nysta in the page flow before the pricing bridge/final CTA path.
3. /synlighet/ shows Helt Opplagt in the equivalent contextual position.
4. Oslo Privatklinikk does not render.
5. No unsupported Tankeverksted/Oracles comparison is manufactured.
6. Proof gates remain strict.
7. Pages CMS can safely select/edit presentation without editing proof authority.
8. Existing commercial, CMS, intake and preview safeguards remain intact.
9. Build/tests/live review Worker pass.

Then STOP for OWNER + STRATEGY_CONTENT visual/content review.
