# H-022 - Proof showcase redesign

Date: 2026-10-15
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED / SUPERSEDES EARLIER H-022 PRESENTATION DIRECTION

## Scope

Presentation only.

Proof data, case selection and public claims are accepted and LOCKED for this task.

Do NOT reopen:
- proof research
- proof values
- periods
- permissions
- provenance
- limitations
- publication gates
- case selection
- service-page case assignment

The current problem is not proof quality.
The current presentation is materially behind the visual/commercial benchmark.

## Benchmark lesson

The Mementor result section is useful as a composition benchmark because it does NOT render proof as three generic metric cards.

It uses:
- one large visual case anchor
- customer/project context
- separate high-impact result tiles
- asymmetrical editorial composition
- strong whitespace
- clear metric hierarchy

Do NOT clone Mementor's exact styling, colors, typography or content.

Generalize the composition principle into the approved Optimalisering Oslo design language.

## Objective

Turn homepage proof into a **case showcase**, not a dashboard.

The first impression should be:

> real customer -> real work -> obvious measurable movement

A visitor should understand the strongest result in 1-2 seconds.

## Homepage composition

Desktop direction:

### Main featured case shell

Use one large two-column showcase.

LEFT / VISUAL AREA:
- real Eurotents visual
- customer name
- discipline/source label may overlay or sit directly adjacent
- the visual should make the proof feel connected to a real business, not an abstract metric

RIGHT / RESULT AREA:
- result tiles / editorial metric composition
- dominant ROAS movement: 4,3x -> 17,2x
- secondary support: 20 % lavere annonseforbruk
- periods remain visible but subordinate

Do not leave a giant empty dark rectangle.
Do not place all information in one corner.

### Supporting cases

Below the featured showcase:
- Nysta
- Helt Opplagt

Two balanced supporting result modules.

They may remain more compact than Eurotents, but should still feel like proof modules rather than generic content cards.

Do not make all three cases equal.

## Eurotents media

There is currently no approved case image in the repo.

For the noindex review site, create a factual review visual based on the current public Eurotents website, preferably a clean website/product/camping screenshot or other non-personal public Eurotents imagery that clearly identifies the real business.

Current public site:
https://eurotents.com/

Requirements:
- do NOT fabricate customer photography
- do NOT use unrelated stock imagery
- do NOT imply a person is the client unless source material actually establishes that
- avoid personal/customer information
- optimize and commit as a local static web asset
- use an honest alt text
- treat this as presentation media, NOT metric evidence
- record source URL/date in the implementation evidence

This visual is approved for **review presentation only** by this handoff.
OWNER visual review decides whether it remains for production.

If a clean defensible Eurotents visual cannot be sourced, STOP and use a deliberately designed non-photographic branded/site-preview treatment rather than fake imagery.

## Presentation media architecture

Do not put presentation media into the evidence/provenance authority fields.

Add a small controlled presentation-media field to the homepage proof presentation config, conceptually:

featuredVisual:
- caseId
- src
- alt
- positionX
- positionY

This is presentation metadata only.

It must not influence:
- publicationApproved
- naming permission
- evidence validation
- source/provenance
- numerical claims

Pages CMS may expose:
- image
- alt
- crop X/Y

Do not expose arbitrary CSS/classes.

If this can be implemented more cleanly as another existing safe media primitive, reuse it.

## Featured result hierarchy

Eurotents:

PRIMARY:
- 4,3x -> 17,2x

SECONDARY:
- 20 % lavere annonseforbruk

TERTIARY:
- Google Ads / ROAS label
- April 2025 / April 2026

The before/after ROAS movement must be visually dominant.

Do not let "20 % lavere annonseforbruk" become a bigger headline than 4,3x -> 17,2x.

## Result tiles

Use 2 result tiles for Eurotents because we have 2 approved public result stories.

Do NOT invent a third metric just to imitate Mementor.

Suggested composition:

Tile 1:
- ROAS
- 4,3x -> 17,2x
- periods

Tile 2:
- Annonseforbruk
- 20 % lavere
- supporting context already present in approved public text

Exact wording must remain within the existing approved public projection.

No new derived percentages.

## Supporting proof

Nysta and Helt Opplagt remain current approved public strings/values.

Improve hierarchy:
- client name
- metric/source
- before -> after OR dominant delta
- periods

Use space efficiently.

They may use:
- one result surface each
- compact split metric treatment
- subtle visual distinction

Do NOT add fake images merely to make them match Eurotents.

If future real case media is available, the architecture may support it later.

## Section heading

Keep current:
- eyebrow
- heading

Do not add a long intro paragraph.

The proof itself should carry the section.

## Full-case link

Do NOT fabricate a "Les hele caset" link because no approved public case route currently exists.

A proof module without a case-detail route is acceptable.

Do not link to a nonexistent /resultater/ route.

## Styling

Use current shared/global design system.

Consume:
- current typography
- current surfaces
- current radius
- current spacing
- current buttons/links where used

Do not create a second proof-only design system.

However, a **featured proof showcase is a legitimate semantic composition**, so it does not need to look like an ordinary generic card.

This is the exact distinction learned in the pilot:
shared primitives underneath; special composition above.

## Desktop target

At 1440px:
- section should feel editorial and premium
- featured module should use the available width
- visual and result area should feel intentionally balanced
- no large dead areas
- no dashboard feel
- no collection of three nearly identical boxes

## Mobile target

At 390/320:
- visual can stack above result tiles
- ROAS before/after remains readable at a glance
- result tiles stack cleanly
- supporting proof remains compact
- no horizontal metric squeeze

## Service pages

Preserve current single-proof service-page behavior unless shared component refactor requires markup changes.

Do not force the large homepage showcase onto /synlighet/ or /konvertering/.

Those pages can keep a compact primary-proof variant.

## CMS

If featuredVisual is added:
- safe image selector/upload
- alt
- crop X/Y
- no raw class
- no arbitrary styling
- default/no visual must fail gracefully

Do not unlock proof authority records.

## QA

Focused presentation QA.

Review:
- homepage proof 1440
- homepage proof 900
- homepage proof 390
- homepage proof 320
- /synlighet/ single proof
- /konvertering/ single proof

Assert:
- exact public proof strings/values unchanged
- no proof authority/gate drift
- no clipped metrics
- no dead featured region
- image crop works
- no broken media
- no overflow
- service proof unchanged semantically

Run one full verify after focused checks.

Do NOT produce another oversized QA ceremony for a presentation task.

## Delivery

Pull latest main.

Implement this revised H-022 only.

Push main.
Verify connected Worker.
Update CODEX-TO-CHATGPT concisely.

Then STOP for OWNER visual review.
