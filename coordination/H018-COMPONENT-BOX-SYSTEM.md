# H-018 - Component / Box System Pass

Date: 2026-10-13
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Objective

Standardize the component/surface system underneath the approved design without flattening the site's visual hierarchy.

The current site follows the Invite Design DNA plus project-specific spin-offs. The problem is not the visual direction; it is implementation drift: individual boxes/cards/panels have accumulated near-duplicate radii, borders, padding, surfaces and shadows.

This pass must remove accidental variation while preserving intentional variation.

## Locked prerequisite

Typography is complete and OWNER-tuned on current main.

Do not redesign or rescale typography in this task.

Use current main as the typography source of truth. Only touch typography if required to repair an actual inheritance/regression defect caused by this component refactor.

## Reference DNA

Preserve the current Optimalisering Oslo interpretation of Invite DNA.

Use the supplied Invite DNA as a reference for the underlying system:
- restrained button radius around 5px
- small UI radii around 8-12px
- cards commonly around 20px
- large visual/card surfaces may reach around 32px
- subtle 1px light borders
- white / soft lavender / mint / deep-plum surface family
- shadows are soft, low-opacity and used sparingly

Do not copy every reference value mechanically if current approved project styling has a justified variant.

## Step 1 - Audit

Inventory repeated box/component shells across:
- homepage
- hero proof
- service/value cards
- proof cards
- calculator shell
- calculator result/data cards
- graph container
- packages
- forms
- service-page cards
- process/step cards
- glossary/accordion
- FAQ
- CTA bands
- footer groups
- badges/chips/status markers

For each repeated shell, record:
- background
- border
- radius
- shadow
- padding
- internal gap
- hover/focus treatment
- responsive differences

Identify near-duplicates that have no design reason.

## Step 2 - Create central surface/component tokens

Create a small shared system, e.g. a dedicated surface/component token layer.

Prefer semantic tokens such as:

- radius-button
- radius-sm
- radius-md
- radius-card
- radius-card-lg
- radius-pill

- border-subtle
- border-dark

- surface-base
- surface-soft
- surface-mint
- surface-dark

- shadow-soft

- panel-pad-sm
- panel-pad
- panel-pad-lg

Use the existing approved project colours/values.

Do not create a huge token catalogue.

A developer should understand the system in a couple of minutes.

## Step 3 - Normalize component families

Establish a small reusable family underneath existing semantic components.

Conceptually support:

1. Card
   - ordinary grouped content
   - light surface
   - subtle border or no border
   - standard card radius and padding

2. Panel
   - larger functional containment
   - calculator/forms/data groups
   - stronger spacing hierarchy

3. Soft card
   - mint/lavender/approved soft surface

4. Dark card/band
   - deep-plum emphasis
   - used sparingly

5. Feature card
   - image/content composition
   - larger radius/overflow when justified

6. Data/result card
   - calculator results / compact proof metrics
   - related visual language across the site

7. CTA band
   - stronger conversion surface
   - must remain distinct from ordinary cards

8. Accordion row
   - divider/whitespace-first where current design uses it
   - do not turn every FAQ/glossary item into a rounded card

These do not need to become literal utility classes. Existing semantic classes may consume shared variables/primitives.

## Step 4 - Standardize spacing

Audit arbitrary panel padding/gap values and reduce them to a deliberate small scale.

Do not preserve accidental differences such as 26/27/28/29/30px unless they have a visible reason.

Use fluid spacing where helpful, but keep mobile comfortable and not cramped.

## Step 5 - Preserve intentional hierarchy

Do not normalize away approved hierarchy.

Specifically preserve:
- Eurotents as dominant homepage proof
- supporting Nysta/Helt Opplagt hierarchy
- recommended/featured package prominence
- calculator as a major functional panel
- hero proof as a unique image-attached composition
- CTA bands as stronger than normal cards
- glossary/FAQ row-based treatment where appropriate

If standardization makes the site more generic, the task failed.

## Step 6 - Remove accidental one-offs

Search project CSS/components for one-off:
- border-radius values
- near-duplicate border colours
- near-duplicate surface colours
- arbitrary box shadows
- arbitrary panel padding/gaps

Replace accidental duplicates with shared tokens/primitives.

Keep intentional exceptions and document why they remain.

## Buttons

Check shell consistency only:
- radius
- border width
- control height
- internal padding
- focus outline geometry

Preserve current button colours, typography and CTA hierarchy.

Do not make normal CTA buttons into pills.

## Form controls

Normalize shell treatment for:
- inputs
- textarea
- select
- numeric fields
- calculator-associated controls

Use a coherent border/radius/background/focus/control-height system.

Do not change form logic or content.

## Badges / chips / pills

Use pills only when semantically appropriate:
- tag
- filter
- status
- compact category marker

Do not turn headings/labels into pills because a pill token exists.

## Responsive QA

Validate at:
- 1440
- 900
- 390
- 320

Watch for:
- excessive nested-card look
- oversized radii on narrow screens
- cramped mobile padding
- excessive vertical height
- broken stacking
- calculator/graph containment
- proof hierarchy
- package comparison clarity

## Preserve

Do not change:
- typography system or OWNER token correction
- copy
- glossary copy
- calculator math
- chart logic
- proof values
- proof selection/hierarchy
- prices/packages
- CTA wording
- hero image/crop
- page order
- CMS schema unless technically necessary
- noindex
- disabled intake

Do not introduce Tailwind or DaisyUI into this existing project.

That belongs in the Medon Web System starter work, not this cleanup.

## Required audit

Produce before/after inventory for:
- distinct border-radius values
- box-shadow declarations
- border colours
- surface colours
- common card/panel padding values

Then document:
- resulting tokens/primitives
- intentional exceptions and reason

Goal is not zero exceptions.
Goal is that every exception has a reason.

## Regression guard

Add a lightweight guard if practical against accidental new one-off:
- card radii
- near-duplicate border colours
- arbitrary shadows

Do not create a brittle CSS parser.

## Visual evidence

Provide before/after evidence for representative:
- homepage
- proof
- calculator
- package section
- service page
- glossary
- form
- mobile homepage

Primary review screenshots:
- 1440
- 390

Also regression-check 900 / 320.

## Delivery

Run full verify.
Push to main.
Verify the connected Worker.
Update CODEX-TO-CHATGPT with exact implementation/audit/evidence.
Then STOP for OWNER visual review.
