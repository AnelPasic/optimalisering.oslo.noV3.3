# H-014 compact pricing / CMS contract

Authority: D-047–D-049, `coordination/H014-COMPACT-PRICING.md`. The H-013 order/data architecture passes; H-014 revises the compact comparison only. Whole-page authority/status remains unchanged. Stop for OWNER + STRATEGY_CONTENT review.

## One source, two reading levels

Pages CMS → Forside og felles pakker → Forsidens innhold → Felles pakker → Alternativer.

Each existing package now has `compact.fit` and `compact.situations` (one to three nonempty short bullets). Existing `iconItems` keep their full `label`/optional `description` and gain `compactLabel`. These are the exact D-048 short sentences/labels. Names, prices, VAT, optional Partner prefix, descriptors, CTA/order keys, recommendation and asset slots remain the existing shared fields. There is no new price source.

Home renders name/price, descriptor, 100px visual strip, short fit, direct Bestill CTA and Se pakken. Pricing renders the same facts plus at most three short situations and a compact professional icon grid. The primary CTA precedes a native, initially collapsed `details/summary` labelled **Se detaljer**. It contains every existing long fit/situation/focus/combination description, business example, scope/work model, distinction, selection rule and Partner price note. Direct card anchors stay compact. Details work with keyboard or without JavaScript; expansion does not stretch the adjacent cards. Text stays semantic HTML and editable.

At 1440px the three default pricing cards are 770px, with 15px fit/situations and 14px icon labels. Height is a minimum rather than clipping; edited or expanded content can grow. Mobile removes the minimum. Pricing visual strips are 120px desktop / 110px mobile. Three independent optional SVG/WebP/PNG asset fields, alt/crop rules, safe local-file resolution, contain for SVG and cover for raster remain. Missing assets use one moderate curve, one steep exponential-style curve, or three distinct controlled rising tracks; Partner's rise is slightly stronger. These remain conceptual fallbacks, with no performance numbers. Final approved artwork is still a separate dependency.

The decision strip retains the exact H-012 heading/rules immediately below the comparison. The multiplier keeps its heading and prominent **Bli funnet → bli valgt → gå videre** row, with the complete existing explanation under a native disclosure using its existing **Hvorfor Vekst finnes** source label.

## Ordering and remaining gates

H-013 order component, payload validation, backend and order styling are unchanged. All package CTAs preselect the single safely disabled form. The homepage's uncertainty link and pricing order section's free-check path remain secondary. No transport, false success, live POST or enablement was added. The scoped operations/frontend/approval requirements in [h013-pricing-order-cms.md](h013-pricing-order-cms.md) still apply, with the current H-014 visual review replacing the superseded H-013 visual review.

Authenticated Pages CMS editor save remains manual/unproven. File-based CMS fixtures prove schema and actual rendering. Final package/service assets, proof publication, real intake and launch have separate gates.

## Reproducible verification

`npm run verify`; `node scripts/qa-browser.mjs`; `node scripts/qa-pricing-h014.mjs`; `node scripts/qa-h014-package-source.mjs`.

The source fixture temporarily edits the real shared JSON and installs neutral test assets, then restores original bytes/removes only its files in `finally`. Run full verify afterwards to restore the actual build. The focused QA uses the preserved H-013 baseline; do not replace it with the new cards. It checks exact short copy, all retained long content, collapsed/default/keyboard/no-JS disclosures, actual before/after heights, horizontal missing/supplied visuals, ordering safety and 1440/390/320 preservation. Evidence lives in `coordination/evidence/h014/`; connected Worker receipt/live evidence is separate in `h014-live/`.
