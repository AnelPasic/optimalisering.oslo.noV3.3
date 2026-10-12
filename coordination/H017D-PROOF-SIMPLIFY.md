# H-017D - Simplify public proof presentation

Date: 2026-10-12
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Objective

Make public proof as concise as the current Mementor benchmark.

The H-017C proof is technically correct but over-explains evidence, attribution and limitations in customer-facing cards.

Keep the full evidence internally. Public proof should focus on the verified result.

## Public proof rule

Render only:
- client name
- concise metric/source label
- delta/supporting result when present
- before -> after
- comparison periods

Do not publicly render:
- intervention / Arbeid
- limitations
- internal attribution notes
- unrelated counter-metrics
- evidence/provenance text
- evidenceMetrics

unless omission would make the displayed claim materially misleading.

All underlying proof records, source/provenance, limitations, permission, comparability and publication gates remain intact and internal.

## Current cases

### Eurotents
Public:
- Eurotents
- ROAS - Google Ads
- 4,3x -> 17,2x
- 20 % lavere annonseforbruk
- april 2025 -> april 2026

### Nysta
Public:
- Nysta
- Fullført checkout - Shopify
- +36,5 prosentpoeng
- 7,1 % -> 43,6 %
- 30 dager før -> første 30 dager etter

### Helt Opplagt
Public:
- Helt Opplagt
- Organiske klikk - Google Search Console
- +93 %
- 2 162 -> 4 181
- mars-september 2025 -> mars-september 2026

## Layout

Preserve the accepted H-017C hierarchy:
- homepage: Eurotents dominant; Nysta + Helt Opplagt supporting
- /konvertering/: Nysta
- /synlighet/: Helt Opplagt

Do not redesign the proof section.
This is a subtraction pass only.
With less copy, tighten vertical spacing naturally so cards do not look empty.

## CMS and architecture

Keep the guarded proof registry read-only.
Do not weaken getPublishableCases.
Do not remove internal evidence fields.
No Pages CMS architecture rework.

## Preserve

Do not touch pricing/packages, hero/service art, header/footer, intake/noindex, other pages or H-017B.

## QA

Run focused proof tests plus full verify.
Check homepage, /konvertering/ and /synlighet/ at 1440/390/320.
Confirm no public limitations/intervention text, no evidence leakage, proof gates fail closed, and accepted hierarchy remains intact.
Push to main, verify Worker, update CODEX-TO-CHATGPT, then stop.
