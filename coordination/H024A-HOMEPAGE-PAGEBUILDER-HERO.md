# H-024A - Homepage CMS page builder + reusable Hero primitive

Date: 2026-10-15
Authority: OWNER + STRATEGY_CONTENT / D-086
Status: AUTHORIZED

## Scope and purpose

Pilot two system-level capabilities on the homepage only:

1. **All non-Hero homepage sections become an ordered Pages CMS block list.**
2. **Hero becomes a reusable structured primitive with safe layout variants.**

Do not yet migrate every service/pricing/utility page to the page-builder schema.
That broader rollout is H-024B after OWNER tests the real CMS editor experience.

H-023B architecture is accepted and must remain intact.
H-022 proof visual acceptance remains PARKED.

## External CMS capability

Pages CMS supports:
- `type: block` for page-builder-style sections
- `list: true` for ordered repeated block items
- collapsible list summaries
- UUID fields for stable v4 identifiers independent of array position

Use those native capabilities.
Do not build a custom page-builder UI.

## Structural rule

Homepage storage becomes conceptually:

```
seo
hero
homepageSharedData
sections: [
  typed ordered blocks...
]
```

Hero is rendered first and is NOT part of the reorderable sections list.

The array order of `sections` is the render order.

Do not render homepage sections through a hard-coded component sequence.

## Preserve source-of-truth data

This project already has complex accepted singleton sources:
- selector
- calculator
- packages
- proof
- assessment form
- FAQ
- commercial chrome

Do NOT duplicate their content merely to make them movable.

Use the ordered block list as composition/order authority while preserving existing singleton data authority.

Preferred model:

```
sections:
  - type: selector
    uid: ...
    id: behov
  - type: calculator
    uid: ...
    id: regneeksempel
  - type: packages
    uid: ...
    id: priser
  - type: proof
    uid: ...
    id: resultater
  - type: content
    uid: ...
    id: mekanisme
    ...
  - type: content
    uid: ...
    id: passer
    ...
  - type: assessment
    uid: ...
    id: sjekk
    ...
  - type: faq
    uid: ...
    id: sporsmal
```

Exact block keys may differ if there is a cleaner typed design.

Special blocks resolve their existing approved singleton data:
- selector -> current homepage.selector
- calculator -> current homepage.calculator
- packages -> current homepage.packages
- proof -> current homepage.proof + proof registry
- assessment -> current homepage.form + its section copy
- faq -> current page.faq + homepage FAQ labels

No duplicate package/proof/calculator/form/FAQ source is allowed.

## Stable identity

Every block gets a stable UUID field independent of list position.

Pages CMS UUID configuration:
- type: uuid
- editable: false

Existing anchor IDs must remain stable.

Reordering must not change:
- section anchors
- proof selection/authority
- pricing/package source
- form identity
- analytics identifiers
- internal links

Do not derive identity from array index.

## Allowed homepage block types in H-024A

### Singleton blocks
At most one each:
- selector
- calculator
- packages
- proof
- assessment
- faq

### Repeatable blocks
- content

A future system may add media/cards/PageList/CTA block families.
Do not expand H-024A merely to imitate the future system.

Schema/runtime must fail closed on duplicate singleton blocks.

A missing optional singleton should simply not render.

For this pilot:
- selector, calculator, packages, assessment and FAQ should remain present in the migrated default homepage.
- proof may render only through its existing publication gates.
- do not invent required proof if it is removed.

## Add/remove behavior

OWNER must be able to:
- reorder all non-Hero blocks
- add a normal content block
- remove an optional content block

Singleton blocks may be removable only if doing so is safe for the page.
Do not allow duplicate singletons.

Do NOT silently make lead intake operational because the assessment block can move.

The H-024A acceptance focus is reorder first; add/remove is secondary but should be structurally safe.

## Pages CMS UX

Homepage editor structure should become clearly:

1. SEO
2. Hero
3. Shared/special content sources where still separately edited
4. Page sections / Seksjonsrekkefølge

The block list must:
- start collapsed where practical
- use useful summaries, not "Item #4"
- show block type + human section title/name
- make drag/reorder affordance obvious if Pages CMS provides it
- avoid exposing raw implementation metadata

Suggested label:
**Seksjoner og rekkefølge**

Description:
**Hero ligger alltid øverst. Flytt seksjonene her for å endre rekkefølgen på siden.**

## Hero primitive

Create a reusable component, conceptually:
`CommercialHero.astro`

The homepage becomes its first production consumer.

Do not hard-code it to this specific homepage's title or image.

### Structured content

Hero owns:
- eyebrow
- title / H1
- support / lead
- primary CTA
- optional secondary CTA
- optional visual
- layout

Preserve current homepage public strings exactly.

### Base layout enum

Allowed:
- `split-right` — default; text left, visual right
- `split-left` — visual left, text right
- `centered` — centered text; optional visual below

CMS labels:
- Tekst venstre / bilde høyre
- Bilde venstre / tekst høyre
- Sentrert

No arbitrary CSS/grid field.

### Hero visual

For H-024A support:
- image
- none

Use existing homepage image/crop fields and hero proof overlay behavior.

Do not invent a second image source.

The architecture should allow future typed visual kinds (illustration/chart/product UI), but do not implement unused complexity in this homepage pilot.

### Accessibility / DOM order

Text/H1 comes before decorative/presentation visual in DOM reading order.

For `split-left`, use CSS grid/order to place the visual left on desktop rather than putting the image first semantically.

Mobile:
- text first
- visual after text when present
- centered remains centered

### Existing title emphasis

Preserve the current homepage visual emphasis on "Bli funnet." without creating an arbitrary rich-style editor.

Use the smallest typed/project-level mechanism possible.

Do not split or rewrite the public H1 copy.

## Hero CMS

Expose:
- layout
- eyebrow
- H1
- support
- primary CTA
- secondary CTA
- existing image
- crop X/Y

Hero is a standalone editor object, not a block in the sections list.

## Design-system route

Update /design-system/ to demonstrate all three Hero variants using realistic Norwegian demo content:

- split-right
- split-left
- centered
- centered without visual
- long heading stress state

Use the actual reusable Hero primitive or its safe demo mode.
Do not create fake parallel markup only for the design-system route.

Keep the page well-spaced under the H-023B accepted review composition.

## Homepage renderer

Replace hard-coded sequence like:

```
Selector
Calculator
Packages
Proof
selected content sections
Assessment
FAQ
```

with an ordered dispatcher over the page sections list.

Conceptual:

```
for (section of page.sections) {
  renderHomepageBlock(section)
}
```

The dispatcher must be typed and exhaustive.

Unknown block type fails closed at build time / validation.

## Existing singleton data cleanup

After migration, remove only genuinely obsolete homepage ordering assumptions.

Do NOT prematurely merge the approved singleton data into generic content blobs.

Do not change pricing page/service bridge source-of-truth.

## CMS reorder acceptance - IMPORTANT

This feature is specifically about the real editor experience.

Synthetic tests alone are not enough for final H-024A CMS acceptance.

Required authenticated Pages CMS proof if access is available:

1. Open homepage.
2. Move one safe section to a visibly different position.
3. Save.
4. Record Git commit.
5. Connected Worker build succeeds.
6. Preview shows the new order.
7. Move it back to the original order.
8. Save/rebuild.
9. Confirm original order and unrelated source bytes restored semantically.

Preferred test move:
- move `mekanisme` relative to `passer`
or another content-only block.

Do NOT move assessment into a place that could confuse live review or touch proof authority for this acceptance test.

If authenticated CMS is unavailable:
- complete schema/render/fixture proof
- STOP with H-024A technically delivered but CMS reorder acceptance PENDING OWNER
- do not claim the editor experience is proven

## Hero layout acceptance

Test all three layouts through source-backed fixtures/CMS-equivalent values.

Default production homepage remains `split-right`.

Do not leave a test layout active after QA.

## Current homepage order

Preserve the CURRENT public order after migration.

The purpose is to enable future reordering, not silently choose a new persuasion sequence.

Any actual commercial reorder requires OWNER/STRATEGY_CONTENT decision.

## Preserve

Do not change:
- homepage public copy
- homepage current final order
- calculator math/behavior
- packages/prices/order logic
- proof registry/claims/gates
- H-022 delivered proof state
- H-021 PageList
- H-019 surfaces
- H-020 heading alignment
- global daisyUI theme/type system
- H-023B route families
- service pages
- SEO metadata
- noindex
- disabled intake

## QA

Focused schema/renderer tests:
1. Hero default split-right.
2. split-left.
3. centered with visual.
4. centered without visual.
5. invalid layout rejected.
6. one H1 only.
7. ordered block list renders exact array order.
8. reorder changes visual order only.
9. UUID/anchors stable after reorder.
10. duplicate singleton rejected.
11. unknown block rejected.
12. removed optional content block omitted cleanly.
13. added content block renders through shared ContentSection.
14. packages/proof/calculator/form singleton data not duplicated.
15. proof still publication-gated.
16. current production order/copy unchanged by default migration.

Browser:
- homepage 1440 / 900 / 390 / 320
- all Hero variants 1440 / 390 on design-system
- menu/CTA/hero proof
- calculator after block dispatcher
- package/order links
- assessment remains disabled
- FAQ keyboard/no-JS
- no overflow

Run one full verify after focused work.

## Evidence

Keep useful:
- old hard-coded homepage sequence vs new block list
- source-of-truth map for each special block
- Pages CMS editor screenshots
- actual reorder commit/build/revert receipt if authenticated
- Hero variant montage
- homepage before/after default
- Worker receipt

## Delivery

Pull latest main.

Implement H-024A only.

Push main.
Verify connected Worker.
Update coordination.

Then STOP:
- for OWNER Hero/page-builder visual review
- and, if authenticated CMS reorder was not proven, for OWNER CMS reorder test

Do not proceed to H-024B automatically.
Do not reopen H-022.
