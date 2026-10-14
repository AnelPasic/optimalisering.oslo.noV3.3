# H-021 - CMS PageList pilot for Innsikt

Date: 2026-10-14
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Objective

Build a reusable query-backed PageList primitive, piloted on /innsikt/.

The goal is the useful part of Concrete CMS PageList:
- pages are the source of truth
- list cards do not duplicate page titles/descriptions/URLs
- OWNER can choose automatic or manual listing behavior in Pages CMS
- new list presentation remains design-system controlled

Do not build a database or client-side search system.
This is a static Astro build-time collection query backed by Git/Pages CMS.

## Pilot boundary

Implement this first for the Innsikt index and Innsikt article collection.

Architect the resolver/component so it can later support service lists, related-content blocks and other page families.

Do NOT expose a universal all-pages query in CMS yet.

Do NOT add the rule to MedonWebSystem in this task.
After OWNER acceptance, the validated generalized lesson can be promoted separately.

## Current problem

/innsikt/ currently duplicates article metadata inside innsikt.json:

- card title
- card description
- href
- link label

This means an article can change while the index card stays stale.

H-021 must move list metadata to the article itself and make the index query actual article records.

## Article listing metadata

Add an optional/defaulted listing object to page schema.

For article pages support:

- title
- summary
- label
- order
- visible

Semantics:

### title
Short card/list title.
May differ from H1 when the H1 is deliberately editorial.

Fallback: page.title.

### summary
Short list/card description.

Fallback: page.intro.

### label
Link label for card layouts.

Fallback: "Les mer".

### order
Integer editorial order for automatic lists.

Lower values appear first.

This is editorial position, NOT a publication date.

Do not invent publication dates.

### visible
Boolean, default true.

When false, automatic PageLists do not include the page.
Manual lists must also fail closed / omit a page marked not visible.

Do not make this field control route existence or indexing.
It controls PageList inclusion only.

## Preserve current public text

For the two existing Innsikt articles, seed listing metadata from the current manual cards so the default migrated /innsikt/ display keeps today's visible wording.

Article 1:
- listing title: "Hva bør optimaliseres først?"
- listing summary: use the current matching card description from innsikt.json
- listing label: "Les startguiden"
- listing order: 10

Article 2:
- listing title: "Hvordan måle effekten?"
- listing summary: use the current matching card description from innsikt.json
- listing label: "Les måleguiden"
- listing order: 20

Do not rewrite those texts in this implementation task.

## PageList section model

Add a dedicated section block for the Innsikt pilot.

Conceptual model:

_block: pageList

Shared section presentation:
- id
- eyebrow optional
- heading
- body
- headingAlign
- surface

PageList config:
- mode
- sort
- limit
- layout
- selected
- excluded

### mode

Allowed:
- automatic
- manual

CMS labels:
- Automatisk
- Manuelt valgt

### automatic mode

Query:
- kind === article
- slug starts with "innsikt/"
- listing.visible !== false

Sorting:
- editorial
- title

Editorial sort:
1. listing.order ascending when supplied
2. unordered pages after ordered pages
3. title as deterministic tie-breaker

Title sort:
- listing.title fallback page.title
- Norwegian locale-aware ascending if practical/deterministic

Do not use Git commit date or filesystem mtime as publication date.

### manual mode

OWNER selects actual Innsikt article entries through Pages CMS reference fields.

Persist stable page slugs, not copied title/description/href.

Preserve selected order if Pages CMS reference multiple preserves array order.
Verify this behavior.
If multiple reference ordering cannot be relied upon, use a repeated object with one reference per row so OWNER can reorder rows explicitly.

Manual list output:
- includes only selected article slugs
- follows the stored manual order
- omits/fails closed for missing or listing.visible === false records
- never fabricates placeholder content

### excluded

Automatic mode may exclude selected Innsikt article references.

Manual mode does not need exclusions; selected is authoritative.

### limit

Integer:
- min 1
- max 12
- default 6

Applied after automatic filtering/sorting/exclusion.

Manual mode should not silently truncate selected items unless the configured limit explicitly applies and CMS makes that clear.
Prefer manual selected list itself as the count authority.

### layout

Pilot variants:
- cards
- compact
- links

CMS labels:
- Kort
- Kompakt
- Lenker

Do not add arbitrary template/class input.

The existing /innsikt/ migrated list uses cards.

## CMS information architecture

Improve Innsikt CMS structure enough to support clean references.

Preferred:

Innsikt
- Oversiktsside
- Artikler

Use a Pages CMS group if appropriate.

The article reference picker must target only article records, not the Innsikt index page and unrelated service/utility files.

Do not create a confusing second editable duplicate collection.

If the current collection must be split into:
- one file editor for innsikt.json
- one article collection over the same directory with explicit exclusions

that is acceptable, provided:
- the same source files remain authoritative
- editor operations remain safe
- existing URLs/files do not move
- no content is duplicated

Article collection list view should show useful identifiers:
- listing.title or page title
- slug
- SEO title if useful

## Pages CMS PageList editor

On the Innsikt overview PageList section expose human labels approximately:

- Overskrift
- Avsnitt
- Overskriftsjustering
- Seksjonsfarge
- Innholdsliste
  - Utvalg: Automatisk / Manuelt valgt
  - Sortering: Redaksjonell / Tittel
  - Maks antall
  - Visning: Kort / Kompakt / Lenker
  - Velg artikler
  - Ekskluder artikler

Pages CMS currently has no conditional-field requirement here; if both manual and automatic-only fields are visible, add concise descriptions explaining which mode uses them.

Do not expose raw query syntax.

## Rendering architecture

Create a reusable resolver/library, not query logic buried in the template.

Preferred concepts:

- page-list.ts
- PageList.astro

The resolver should accept:
- current PageList config
- available pages

and return validated list items.

A rendered item should resolve from the page record:

- title = listing.title ?? page.title
- summary = listing.summary ?? page.intro
- href = "/" + normalized page.slug + "/"
- label = listing.label ?? "Les mer"

Do not persist href separately in the PageList config.

Normalize root/trailing slash safely.

## Component output

### cards

Reuse the existing accepted card/surface primitives.
Do not create a new visual language.

Cards may use the same broad information hierarchy as the existing /innsikt/ cards:
- title
- summary
- link

### compact

Less visual containment and shorter vertical footprint.

### links

Simple link list; no card shell.

All variants:
- semantic links
- keyboard accessible
- no client-side JS requirement
- no duplicated marketing text in the list config

## Migration of /innsikt/

Replace the current manual section items under id "guider" with the PageList section.

Preserve:
- section ID / anchor where practical
- current heading
- current explanatory body
- existing card wording through article listing metadata
- current card order
- current visual page rhythm

The second "egen-side" section remains normal content.

Do not redesign /innsikt/.

## Safety and validation

Schema must reject:
- unknown mode
- unknown sort
- unknown layout
- arbitrary source/query
- invalid limit
- manual references outside Innsikt article family
- duplicate manual slugs where practical

Automatic query must not include:
- innsikt index itself
- service pages
- utilities
- hidden listing records

Missing manual references:
- do not render fake cards
- fail closed and surface a useful build/test error where appropriate

## Existing authority

PageList does not change content authority.

A list may display only data already present in the source page record.

Do not promote REVIEW_REQUIRED / DRAFT records to authoritative status.

Current preview/noindex and production guards remain unchanged.

## QA

Required focused tests:

1. automatic list discovers both current Innsikt articles from collection data.
2. migrated cards match current visible card title/summary/label/href/order.
3. adding a synthetic third article to test fixtures makes automatic mode include it without editing innsikt.json.
4. listing.visible=false removes it from automatic output.
5. editorial order works.
6. title order works deterministically.
7. exclude works.
8. manual selection renders exactly the selected pages in selected order.
9. manual selections do not duplicate page copy in PageList config.
10. invalid/non-article reference fails closed.
11. cards / compact / links render accessibly.
12. PageList works with JS disabled.
13. existing /innsikt/ default page has no unintended visual/content regression.
14. all other routes remain unchanged except shared schema/component plumbing that has no rendered effect.
15. 1440 / 900 / 390 / 320 no overflow.

Pages CMS:
- reference picker targets only Innsikt articles
- save/restore fixture preserves unrelated fields
- authenticated CMS save/build/revert if safely available
- if browser profile is unavailable, report that truthfully; do not block a technically complete implementation when prior CMS pipeline proof remains applicable

## Evidence

Provide:

- old duplicated source vs new source-of-truth map
- CMS screenshots/config explanation
- /innsikt/ default before/after
- automatic mode with a fixture third item
- manual mode
- compact and links variants
- four-width default QA
- exact Worker receipt

## Preserve

Do not alter:
- article body copy
- current article H1/SEO
- typography
- H-019 surfaces
- H-020 heading alignment
- proof
- packages
- calculator
- hero
- pricing
- intake/noindex
- unrelated page order
- current OWNER CMS edits

## Delivery

Pull latest main.

Implement H-021 only.

Run focused PageList/CMS tests and full verify.
Push main.
Verify connected Worker.
Update CODEX-TO-CHATGPT with exact implementation/evidence.

Then STOP for OWNER CMS/visual review.
