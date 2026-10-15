# H-024A2 - CMS section co-location + safe reorder correction

Date: 2026-10-15
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED CORRECTION / H-024A OWNER REVISE

## Owner finding

H-024A technical delivery is NOT accepted as the final page-builder UX.

Actual OWNER testing found:

1. "Seksjoner og rekkefølge" sits at the bottom as a separate ordering registry, while actual section content is edited elsewhere.
2. Native "Add an item" allows a second singleton block such as Calculator.
3. OWNER moved sections but did not get clear visible feedback in the preview workflow.

Actual CMS commits confirm:
- a1c8031 reordered packages before selector and its Cloudflare Workers check succeeded.
- e2e2420 added a second calculator singleton.

The second state is invalid and must be removed.

## Core correction

A section that is dragged/reordered must be the SAME CMS block that contains that section's editable content/presentation fields.

Do NOT keep:
- one area for editing Calculator/Packages/Selector/Proof/Form/FAQ
- plus another area at the bottom that only controls their order

That is an indirection registry, not the editor experience OWNER asked for.

## Editor hierarchy

Homepage CMS should read approximately:

1. SEO
2. Hero
3. Sections
4. Site-wide/shared chrome/settings only if truly global

The ordered section list must appear directly after Hero.

Label:
**Seksjoner**

Description:
**Dra seksjonene for å endre rekkefølgen. Hero ligger alltid øverst. Åpne en seksjon for å redigere innholdet.**

Each collapsed row must be both:
- reorder handle
- actual editor entry

## One source per block

Migrate homepage section-specific editable data INTO the corresponding ordered block.

### Selector block owns
- heading
- selector items
- item links/copy

### Calculator block owns
- eyebrow
- heading
- intro
- formula
- labels/defaults/caveat source already used by calculator

### Packages block owns
- current complete package source
- all package editor fields currently under separate homepage/packages object

The pricing page must resolve its shared package source from this packages block.
Do not duplicate packages for /priser/.

### Proof block owns
- current homepage proof slot/presentation config
- featured visual config

Proof registry/case authority remains external/protected exactly as today.
Only homepage proof presentation/selection slot moves with the block.

Hero proof must resolve from the homepage proof block.

### Assessment block owns
- existing section heading/body
- current homepage form copy/config

Transport/intake authority remains protected/default-off.

### FAQ block owns
- faq eyebrow
- faq heading
- FAQ items

### Content block owns
- its existing content fields exactly as H-024A already does

After migration there must be no duplicate editable homepage source for these section-specific fields elsewhere.

The remaining `homepage`/shared object may retain only data that is genuinely site-wide/shared and not owned by one movable section (for example chrome), or may be renamed if a cleaner migration requires it.

## Reorder-only in this pilot

OWNER asked for moving sections.
OWNER did NOT ask for arbitrary section creation/removal in this pilot.

Pages CMS native block lists allow adding another block shape and do not provide a documented per-block singleton-count constraint.

Therefore H-024A2 must NOT expose unsafe Add/Delete controls for the current homepage singleton list.

For this current homepage:
- preserve exactly 8 section rows
- configure list min/max to the same required count so Add/Delete is unavailable when Pages CMS honors those constraints
- all 8 remain draggable/reorderable
- every row remains editable

Current required block identities:
- selector
- calculator
- packages
- proof
- content: mekanisme
- content: passer
- assessment
- faq

Do not add a second content section in H-024A2.

Future add/remove support is a separate capability after we have a safe uniqueness model/editor UX.

## Runtime/schema guard - fix current weakness

The application must reject duplicate singleton block types in the primary page schema itself.

Do not rely only on a secondary parse inside HomePage.

Specifically prove:
- duplicate calculator fails Astro/content validation before render
- duplicate packages fails
- duplicate proof fails
- duplicate selector fails
- duplicate assessment fails
- duplicate faq fails
- duplicate UID fails
- duplicate anchor fails
- missing required block fails for this fixed eight-block homepage pilot

Fail with a useful message.

## Restore clean source before implementation

Current main includes OWNER test edits:
- packages moved before selector
- duplicate calculator inserted

These were explicit editor tests, not a new commercial order.

Restore the H-024A original/default order before final delivery:

1. selector
2. calculator
3. packages
4. proof
5. mekanisme
6. passer
7. assessment
8. faq

Remove the test duplicate calculator.

Do not overwrite any unrelated OWNER edit.

## Preview/deploy feedback proof

The first move actually reached Git and Cloudflare successfully but OWNER did not perceive the visual change.

H-024A2 acceptance must therefore prove the user-visible chain clearly.

Authenticated CMS test:

1. Starting from clean original order.
2. Move **Packages** to the first position after Hero. This is intentionally obvious.
3. Save.
4. Record the exact Pages CMS Git commit.
5. Verify the Git diff changes only section order.
6. Verify Cloudflare Workers check/build for THAT commit reaches success.
7. Verify the live Worker page visibly renders Packages immediately after Hero.
8. Record screenshot + exact version/commit.
9. Move Packages back to position 3.
10. Save.
11. Verify the restore commit gets a successful Worker build.
12. Verify live Worker has original order again.

Do not call reorder "proven" merely because JSON changed.

If the browser needs an explicit refresh after Worker deployment, document that honestly in the editor note/evidence.
Do not invent instant-preview behavior Pages CMS does not provide.

## CMS summary rows

Collapsed row summary should be human-first:
- Behovsvelger
- Regneeksempel
- Pakker og priser
- Kunderesultater
- Slik virker optimalisering
- Hvem passer det for
- Gratis sjekk
- Ofte stilte spørsmål

Do not show duplicate type chips if they add no value.
A type badge is acceptable only when it genuinely helps distinguish repeatable content rows.

No hidden UUID clutter in the visible editor.

## Hero

Keep H-024A CommercialHero implementation and safe variants unless a bug is found.

Hero remains separate/fixed first.

Hero editor stays immediately above Sections.

No hero redesign in this correction.

## Design-system

No new design-system expansion required beyond keeping the accepted Hero examples intact.

## Preserve

Do not change:
- public homepage copy
- default public section order after final restore
- calculator behavior/math
- packages/pricing/order logic
- proof registry/claims/publication gates
- current H-022 proof presentation state
- form transport/intake
- service pages
- PageList
- global daisyUI theme/type system
- H-023B route architecture
- noindex
- disabled intake

## QA

Focused:
1. .pages.yml shows Hero then Sections before other shared settings.
2. section content is edited inside the draggable row itself.
3. no separate order-only registry remains.
4. Add/Delete unavailable for this fixed pilot list.
5. eight rows exactly.
6. all singleton duplicates fail schema.
7. duplicate UID/anchor fail.
8. exact default order preserved.
9. all current section copy/data preserved.
10. /priser/ consumes packages from the packages block.
11. hero proof consumes proof from proof block.
12. calculator consumes calculator block.
13. assessment consumes assessment block.
14. FAQ consumes FAQ block.
15. all three Hero layouts still pass.

Authenticated:
- perform the obvious Packages-to-top move/save/build/live proof and restore sequence above.

Run one full verify after correction.

## Delivery

Pull latest main INCLUDING OWNER CMS test commits.

Implement H-024A2 only.

Push main.
Verify clean Worker.
Update coordination/evidence.

Then STOP for OWNER CMS/editor review.

Do not start H-024B.
Do not reopen H-022.
