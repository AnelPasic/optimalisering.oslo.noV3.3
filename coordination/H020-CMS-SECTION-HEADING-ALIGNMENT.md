# H-020 - CMS section-heading alignment

Date: 2026-10-14
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Objective

Add one safe Pages CMS presentation control for section-heading alignment.

Current approved default remains centered.

OWNER may explicitly change an individual section heading block to left-aligned from Pages CMS.

This is a narrow presentation/CMS task.

## Allowed values

Use one typed enum/source of truth:

- `center` - default/current behavior
- `left` - left-align the section heading block

Pages CMS labels:

- Sentrert (standard)
- Venstrejustert

Do not expose arbitrary CSS classes or free-text alignment values.

## Data model

Add a safe defaulted field to page section records:

`headingAlign: 'center' | 'left'`

Default:
`center`

Existing JSON without the field must render exactly as today.

Prefer a reusable schema constant rather than repeated literals.

## CMS

Expose the field directly after the section Heading field.

Field label:
**Overskriftsjustering**

Description:
**Sentrert er standard. Velg Venstrejustert når seksjonen leses bedre som en vanlig tekstseksjon.**

Expose the same control for:
- ordinary content sections
- protected section rows

This control changes alignment only. It does not unlock protected surfaces or other geometry.

## Rendering

Use a validated data attribute or equally safe mapping.

Preferred pattern:

`data-heading-align="left"`

on the section-heading element or its parent.

Do not interpolate unvalidated arbitrary classes.

Current centered layout remains the base/default CSS.

Add only the narrow override needed for left alignment.

Example intent:

```css
.section-heading {
  text-align: center;
}

.section-heading[data-heading-align="left"] {
  text-align: left;
}
```

Do not reintroduce `.section-heading-split`.

Do not re-add max-width caps removed by OWNER.

## Scope of alignment

The control applies to the complete `.section-heading` block:
- eyebrow
- H2
- body-copy directly belonging to the heading block

It does NOT:
- change card/item alignment
- change section links
- change grid layout
- move columns
- change padding
- change typography
- change section/card colour

## Preserve current OWNER decisions

Preserve current main including:
- centered section-heading as default
- no `.section-heading-split`
- no previous max-width caps on Invite body-copy / section H2
- H-019 surface controls
- latest same-surface handling
- latest service channel-card padding/radius correction
- current typography tokens
- current card geometry

## CMS safety

Pages CMS round-trip must preserve all unrelated fields.

Existing content without `headingAlign` must remain semantically/render-equivalent to `center`.

If safe authenticated CMS testing is available, verify:
1. one section Center -> Left save
2. Worker build/preview
3. Left -> Center restore
4. exact unrelated-content preservation

## QA

Required:
- schema accepts center/left only
- arbitrary alignment strings rejected
- Pages CMS uses select, not free text
- default/current pages remain centered
- explicit left section aligns eyebrow/H2/body-copy left
- item/card content remains unchanged
- no max-width regression
- no split-heading regression
- no typography/radius/padding/surface changes
- 1440 / 900 / 390 / 320 checks
- no overflow

Use representative:
- one service content section
- one protected section
- homepage ordinary section if same shared model applies

## Delivery

Pull latest main first.

Implement H-020 only.

Run focused alignment/CMS tests + full verify.

Push to main.
Verify connected Worker.
Update CODEX-TO-CHATGPT with implementation SHA, QA and evidence.

Then STOP for OWNER visual/CMS review.
