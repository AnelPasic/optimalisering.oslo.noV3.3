# H-016 — CMS editor-first pricing + homepage/pricing display modes

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED FOR IMPLEMENTATION REVIEW

## Verdict on H-015

H-015 is usable enough visually to stop iterating on package artwork in code.

The next priority is editability.

OWNER wants to tune package copy and visuals directly in Pages CMS instead of routing every wording/image change back through Codex.

Do not reopen pricing strategy, package names, prices or direct-order architecture.

## 1. CMS becomes the normal editing surface

Expose every **safe customer-facing package field** in Pages CMS.

The goal is that OWNER can adjust copy, icon labels and package visuals directly without touching code.

### Shared section fields

Expose/edit:
- eyebrow
- heading
- intro
- fitLabel
- scopeLabel
- areasLabel
- areas[]
- foundationNote
- adBudgetNote
- externalCostsNote
- separateWorkNote
- capacityNote
- decisionStrip.heading
- decisionStrip.items[]
- multiplier.eyebrow
- multiplier.heading
- multiplier.body
- multiplier.conceptualRow
- multiplier.support

### Per-package fields

Expose/edit:
- title
- descriptor
- short/compact fit copy
- full fit copy
- price
- pricePrefix
- priceSuffix
- vatSuffix
- recommended
- badge
- visual variant/fallback
- visualAsset.src
- visualAsset.alt
- visualAsset crop/focus fields
- visualCaption.label
- visualCaption.support
- compact situations[]
- full situations[]
- typicalBusiness
- scope
- distinction / optional long note
- selectionRule
- priceNote
- iconItems[]
  - icon
  - compactLabel
  - label
  - description
- direct-order CTA label
- detail-link label

### Keep routing-critical fields protected

Keep readonly / code-owned:
- package key
- direct-order href/preselection route
- detail-link href/anchor if changing it could break anchors
- form transport / endpoint / package intent value

OWNER wants content control, not the ability to accidentally break ordering routes.

## 2. Image fields

Retain one independent package visual field per package.

CMS must make it obvious:
- choose/upload SVG/WebP/PNG
- edit truthful alt text
- edit optional crop/focus for raster assets
- edit the HTML caption/callout separately from the image

The user must be able to swap any one package visual without code changes.

## 3. Homepage display mode

Use the current H-015 **standard compact /priser/ card presentation** as the package-card presentation on the homepage too.

In other words:
- homepage should use the same compact decision card anatomy as the current default /priser/ cards;
- avoid maintaining a separate, more stripped-down home-card content presentation unless layout truly requires it;
- still preserve the homepage section position and surrounding page layout.

The shared component should support presentation mode rather than duplicated markup/data.

Homepage cards should remain collapsed by default.

## 4. /priser/ display mode

On the dedicated /priser/ page, render each package's detail disclosure **open by default**.

Requirements:
- use native accessible disclosure if retained;
- user can still collapse it;
- full package information is visible on initial /priser/ load;
- direct-order CTA remains obvious;
- page may be longer because the visitor explicitly chose the pricing/details page.

Do not reproduce the pre-H-014 giant-card layout through CSS hacks. Use the existing compact card + expanded detail model.

## 5. Copy cleanup requested by OWNER

Remove this text from Optimalisering entirely:

> Optimalisering er ikke laget for to uavhengige vekstspor samtidig. Hvis resultatet avhenger av at to områder forbedres parallelt, passer Vekst bedre enn å bytte hovedfokus fra måned til måned.

It should not render in compact or expanded state.

The CMS field may remain as an optional generic long-note field only if there is a real future use, but default content must be empty. Prefer a generic label such as “Ekstra forklaring” rather than preserving the old negative framing.

Remove this Vekst line:

> Velg Vekst hvis resultatet avhenger av at to ting forbedres samtidig.

Replace default with:

> Velg Vekst når to forbedringer kan forsterke hverandre.

This stays CMS-editable.

## 6. Avoid the word “problem” in package/customer-facing pricing copy

For the package offer/pricing surface, replace:

> Ett viktig problem om gangen.

with:

> Ett viktig forbedringsområde om gangen.

Also remove other package/pricing uses of “problem” where a natural alternative exists.

Do not perform a blind whole-site replace; this rule applies to the customer-facing package/pricing offer.

Preferred vocabulary:
- forbedringsområde
- flaskehals
- behov
- prioritet
- grep
- kundereise

## 7. CMS labels should stop saying copy is “locked” when OWNER is now expected to edit it

The data model remains one source of truth, but Pages CMS labels/descriptions should be editor-friendly.

Change labels like:
- “låst H-012 copy”
- “låst H-014 copy”

to neutral labels such as:
- Full tekst
- Kort tekst
- Kort etikett
- Forklaring
- Typiske situasjoner
- Populære kombinasjoner

Do not remove Git/decision history. This is about the CMS UI, not rewriting coordination history.

## 8. Direct ordering

Preserve H-013/H-015 ordering exactly:
- Bestill Optimalisering
- Bestill Vekst
- Bestill Partner
- preselected package
- one order form
- safely disabled in review

CTA **labels** should be CMS-editable.

CTA **routes/package keys** remain protected.

Free check remains secondary.

## 9. No accidental content duplication

Homepage and /priser/ still consume the same package object.

Do not create:
- homepagePackageCopy
- pricingPackageCopy
- duplicate prices
- duplicate visual choices

Different presentation state is allowed; different commercial data sources are not.

## 10. Authenticated CMS check

Because this handoff is explicitly about OWNER editing directly, attempt a real authenticated Pages CMS editor check if the environment/session supports it.

At minimum verify:
- package fields appear with sensible labels;
- package image picker points to packageVisuals;
- list/object fields can be edited without schema errors;
- saving one harmless test change and reverting it works, if authenticated access is available.

If authenticated access is not available, report the exact remaining manual step. Do not claim live CMS editing is proven unless it actually is.

## Acceptance criteria

1. All safe package/customer-facing fields are editable in Pages CMS.
2. Package image is independently editable per package.
3. CTA labels are editable; routing-critical href/key fields remain protected.
4. Homepage uses the same H-015 compact card anatomy as current default /priser/.
5. Homepage package details are collapsed/default concise.
6. /priser/ package details are open by default but collapsible.
7. Removed Optimalisering distinction does not render.
8. Vekst default selection rule is “Velg Vekst når to forbedringer kan forsterke hverandre.”
9. Package descriptor is “Ett viktig forbedringsområde om gangen.”
10. No customer-facing package copy uses “problem”.
11. Shared package source remains singular.
12. Direct-order preselection remains unchanged.
13. 1440/390/320 QA passes on home and /priser/.
14. Other accepted pages remain protected.

## Evidence

Capture:
- homepage package section 1440 + 390
- /priser/ initial state 1440 + 390 showing expanded details
- one package collapsed manually on /priser/
- Pages CMS package editor fields if authenticated access is available
- order preselection regression

Run:
- package single-source regression
- CMS schema validation
- copy scan for removed sentences / “problem” in pricing package output
- direct-order safety regression
- full verify/browser QA

Stop for OWNER review. After H-016, routine wording/image tuning should be done directly in CMS rather than through additional code handoffs.
