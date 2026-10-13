# H-019 - CMS surface controls

Date: 2026-10-13
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Objective

Give OWNER a safe Pages CMS presentation control for section and ordinary content-card background colour without exposing raw CSS classes or design-system geometry.

This is a narrow presentation/CMS task.

The existing design system remains authoritative for radius, border, shadow, typography and spacing.

## Principle

CMS may choose an approved surface variant.

CMS must NOT edit:
- raw class names
- arbitrary colours
- radius
- padding
- border width
- shadow
- typography
- layout/grid behaviour

Colour is editable presentation.
Geometry remains design-system controlled.

## Allowed surface values

Use one typed enum/source of truth:

- default - preserve the component/section's existing automatic styling
- base - white/base surface
- soft - current light/cream soft surface
- mint - current mint surface
- lavender - current lavender surface
- dark - current deep-plum surface

Pages CMS labels:

- Standard
- Hvit
- Lys
- Mint
- Lavendel
- Plomme

Do not accept arbitrary hex values or user-entered class names.

## Data model

Add a safe optional/defaulted surface field to:

1. ordinary page sections[]
2. ordinary sections[].items[]

Use the same enum in schema and renderer.

Existing JSON without the field must render exactly as before through default.

Prefer a reusable schema constant instead of repeating literal enums.

## CMS

Expose:

### Section
Field label: **Seksjonsfarge**

### Item/card
Field label: **Boksfarge**

Use a select control with the six approved choices.

Apply this consistently anywhere the shared page-section editor appears in Pages CMS, including homepage/service/editorial section models where relevant.

Do not expose this control on:
- proof registry/case cards
- package cards
- calculator
- hero / hero proof
- forms as a whole
- protected CTA bands
- glossary terminology records

Those have dedicated semantic styling.

## Rendering

Map safe data values to controlled presentation classes/attributes.

Do not interpolate arbitrary values into class names without validating against the enum.

A clean pattern is acceptable, for example:

- surface-base
- surface-soft
- surface-mint
- surface-lavender
- surface-dark

or an equivalent data-attribute mapping.

default should add no override and preserve the existing section/card styling.

## Override precedence

CMS colour choice is an explicit presentation override.

When surface is not default, it should override the ordinary automatic background choice for that section/card.

It must NOT override:
- hierarchy/size
- card geometry
- layout
- proof/package/calculator special styling

For dark/plum surfaces, apply the existing dark-surface text system automatically:
- readable foreground
- readable muted text
- readable dividers/links
- AA contrast

OWNER should not need a separate text-colour control.

## Current design tokens

Reuse current H-018/current-main surface tokens.

Do not duplicate hardcoded colour values if the existing token already exists.

Expected family includes:
- --surface-base
- --surface-soft
- --surface-mint
- --surface-lavender
- --surface-dark

Use current main as source of truth.

## Scope

Apply controls to the ordinary section/card renderer(s), especially shared content sections such as:
- mechanism/process cards
- fit/not-fit cards
- service-page informational cards
- ordinary editorial/service content sections using the shared section schema

Do not force every component in the site through this system.

## Preserve recent OWNER layout correction

Preserve current main including:
- no max-width cap on .invite-home .body-copy
- no max-width cap on .invite-home .section-heading h2
- one centered full-width .section-heading
- no .section-heading-split

Do not reopen typography or section-heading layout.

## CMS safety

Pages CMS round-trip must preserve:
- section IDs/order
- links
- proof authority
- package identity/routing
- noindex
- intake flags
- all unrelated fields

Authenticated saving of the new control should use the existing H-017B Pages CMS architecture.

If authenticated save can be tested safely, verify one reversible surface edit and restore it exactly.
If not, do not block implementation; report it explicitly.

## QA

Required tests:

1. Existing content with no surface fields renders identically before the new overrides are used.
2. Schema accepts all six values and rejects arbitrary class/colour strings.
3. Pages CMS exposes select fields, not free text.
4. A section can be changed through every approved surface variant.
5. A normal content card can be changed through every approved surface variant.
6. default restores/preserves existing automatic styling.
7. Dark variant automatically gets readable foreground/link/muted colours.
8. No surface choice changes typography, radius, padding, grid or content.
9. Proof/packages/calculator/hero are unaffected.
10. 1440 / 900 / 390 / 320 have no overflow/regression.

Use current full verify plus focused CMS/surface tests.

## Evidence

Provide a compact review matrix/screenshots demonstrating at least:
- default
- mint
- lavender
- dark

on one ordinary section and ordinary card.

Show Pages CMS field configuration in the audit.

## Delivery

Pull latest main first.

Implement H-019 only.

Run full verify.
Push to main.
Verify connected Worker.
Update CODEX-TO-CHATGPT with exact commits, QA and evidence.

Then STOP for OWNER visual/CMS review.
