# H-007 commercial content and proof editing

Authoritative facts: coordination/H007-COMMERCIAL-INPUT.md and D-022/D-023 in coordination/DECISIONS.md. Current full homepage remains REVIEW_REQUIRED / DRAFT / NON-AUTHORITATIVE; only the supplied package labels/prices/descriptors/rules and free-check promise have the handoff's specific authority. Generated headings, fit/scope connective copy, CTA reuse and two reconciled pricing/cost FAQ answers need STRATEGY_CONTENT review. No remaining page content is approved by this change.

## Homepage editor

The existing `homepage` file editor in root .pages.yml edits app/src/content/pages/home.json. Package heading/intro, names, descriptors, integer NOK price, unit, VAT suffix, recommended boolean/badge, fit/scope copy, CTA label/href and shared area/cost/capacity notes are explicit fields. Major price figures retain Instrument Sans. `homepage.form.promise` contains the supplied 3-findings/2-business-days promise; section body retains the bounded/manual/no-guarantee wording. The form keeps three fields and disabled intake. Hero/selector/calculator/form/FAQ editing and the single-image hero media picker remain intact.

Internal delivery-hour guardrails are not fields in homepage marketing content or the CMS. The input document is an internal coordination reference, outside public assets. Do not add hours, contract terms, prices or benefits beyond an authorized commercial revision.

## Evidence-only case registry

The `proofCases` collection edits app/src/content/proof/*.json. Nysta and Oslo Privatklinikk retain all supplied measurements, including follow-on periods and partial ratios. Source statements identify the separate registries; original source files/screenshots have not been imported or independently re-verified here. Unknown exact comparison dates, intervention details, attribution caveats, anonymized label and permission evidence remain null. `period.comparable` is false, not an invented comparability verdict. Nysta's former-customer/no-ownership/no-current-operation context is retained.

Both records are EVIDENCE_ONLY / NEEDS_PERMISSION, publicationApproved=false, artifactStatus=NOT_IMPORTED, artifactReferences=[]. They produce no public HTML, JS or JSON. Secondary evidence measurements, source registry identity, relationship and artifact references are never part of the renderer's public projection. No case route or public anonymized claim is created by H-007.

The reserved proof position remains directly after packages. A later documented publication requires all of the following, through the existing content/CMS layer:

1. A complete metric definition and before/after values with explicit comparable before/after periods, intervention, source/provenance and limitations/attribution caveat.
2. NAME_APPROVED or ANONYMIZED_APPROVED, documented permissionEvidence and the corresponding nonempty public name/anonymous label. An anonymous public projection containing the private client name is refused.
3. Case publicationStatus=PUBLISHABLE and publicationApproved=true.
4. The homepage proof slot explicitly selecting that unique case ID and publicationApproved=true.

Missing/empty required fields, ambiguous IDs, false/string approvals, environment or fixture overrides fail closed. No defaults promote proof. Artifact status/references are editable evidence fields; this handoff does not invent a requirement that a screenshot must exist when the documented source and publication permission otherwise suffice. Imported artifacts must never contain lead personal data or secrets. All actual approvals still belong in coordination/DECISIONS.md.

## Manual authentication/connection still required

Local schema/configuration, field coverage, reference options and safe defaults are validated. This does not prove an authenticated Pages CMS session, GitHub App installation or editor save/rebuild.

OWNER or the designated repository editor must open [the hosted Pages CMS app](https://app.pagescms.org), sign in with GitHub, install/authorize its GitHub App for AnelPasic/optimalisering.oslo.noV3.3, select that repository and main, and load the existing .pages.yml. Check the homepage commercial editor and proofCases collection/reference picker, then perform an authorized reversible editor save and confirm the Git commit/review Worker rebuild. Keep the two imported cases unapproved during that check. This manual step has not been performed by IMPLEMENTATION; it does not block the local H-007 content handoff.

Official documentation used for configuration checks: [quick start](https://pagescms.org/docs/quick-start/), [collections/files](https://pagescms.org/docs/configuration/content/), [references](https://pagescms.org/docs/configuration/fields/reference/), [select options](https://pagescms.org/docs/configuration/fields/select/), [filename templates](https://pagescms.org/docs/configuration/content/filename/).
