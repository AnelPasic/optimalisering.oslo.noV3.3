# H-022 - Proof presentation redesign

Date: 2026-10-15
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Scope

Presentation only.

Do NOT reopen:
- proof data
- proof case selection
- proof wording/claims
- periods
- permissions
- provenance
- limitations
- publication gates
- source registry
- proof hierarchy
- CMS authority

Current public proof content is accepted.

The problem is visual composition only.

## Objective

Turn the homepage proof section from three oversized metric boxes into a strong commercial proof composition.

The section should feel like:
- one dominant result
- two supporting results
- clear before -> after storytelling
- efficient use of space
- strong visual hierarchy
- credible, calm presentation

Do not add more public text.

Do not add caveats or footnotes to the public cards.

Do not add graphs.

Do not add logos unless already explicitly approved.

## Featured Eurotents

Eurotents remains the dominant proof.

Current problem:
- full-width card
- content occupies only the left portion
- large dead area on the right
- support metric competes with the actual before/after result

Redesign the featured card as a real two-part composition.

Desktop direction:

LEFT:
- client name
- metric/source label
- support result: 20 % lavere annonseforbruk

RIGHT:
- dominant before -> after story
- 4,3x -> 17,2x
- period labels directly under values

The ROAS movement must be the strongest visual element in the card.

"20 % lavere annonseforbruk" is secondary support, not the headline.

Use the width of the card intentionally.

Do not make the right side look like a separate unrelated card.

Do not add decorative charts or fake dashboards.

## Supporting cards

Nysta and Helt Opplagt remain two equal supporting cards beneath the featured card.

They should share one visual structure:
- client
- metric/source
- optional delta/support
- before -> after
- periods

Their layout should be compact enough that the numbers dominate.

Avoid:
- large empty vertical space
- giant headings
- inconsistent spacing
- unnecessary nested boxes

## Section composition

Keep:
- eyebrow
- heading
- featured Eurotents
- two supporting cards

Do not add additional intro text.

Desktop:
- featured card full width
- two supporting cards in a balanced two-column row

Mobile:
- all cards stack
- before/after remains immediately understandable
- no cramped arrows or wrapped number pairs
- featured card should collapse naturally to one column

## Visual hierarchy

Priority order:

1. before/after metric movement
2. client
3. metric/source label
4. delta/support
5. period labels

The metric change should be understandable in under two seconds.

Do not let delta text overpower the before/after figures.

## Typography

Use the current global type system.

Do not introduce new type tokens.

Avoid tiny labels.

Do not change the global typography scale.

## Surfaces / geometry

Use existing global tokens/primitives.

Preserve:
- current deep-plum featured surface
- current mint supporting surface
- current radii
- current spacing system

Do not invent another card system.

This task may restructure the proof component markup/layout, but it must consume the current global design primitives.

## Interaction / accessibility

No JS needed.

Keep semantic article/dl structure or equivalent accessible structure.

Arrow is decorative.

Reading order must remain logical without CSS.

## Preserve exact content

Public visible strings and values must remain unchanged unless layout requires punctuation-only normalization.

Exact cases:
- Eurotents
- Nysta
- Helt Opplagt

Do not alter source JSON.

Do not change service-page proof content.

If shared component changes affect service pages, preserve their current single-proof behavior and verify it visually.

## QA

Focused QA only.

Required visual checks:
- homepage proof 1440
- homepage proof 900
- homepage proof 390
- homepage proof 320
- /synlighet/ proof
- /konvertering/ proof

Check:
- no overflow
- no clipped numbers
- no awkward wrapping
- good use of featured-card width
- support cards remain balanced
- service-page single-proof rendering remains correct

Run one full verify after focused visual checks.

Do not create an excessive evidence campaign.

## Delivery

Pull latest main.

Implement H-022 only.

Push main.
Verify connected Worker.
Update CODEX-TO-CHATGPT with concise evidence.

Then STOP for OWNER visual review.
