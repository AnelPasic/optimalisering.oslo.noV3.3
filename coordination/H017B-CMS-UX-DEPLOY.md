# H-017B - Pages CMS client-grade UX + deploy reliability

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT
Status: QUEUED - execute after H-017A

## Smoke-test findings

Actual OWNER smoke test proved:
- Pages CMS authentication works.
- Saves create commits on main.
- Example edit "Ja takk - Begge deler" is present in app/src/content/pages/home.json.
- Cloudflare Workers Builds attached to the Pages CMS commits are failing, so saved content is not reaching the review Worker.
- Current CMS information architecture is too generic and technical for customer delivery: "Nettsider", generic sections, technical status/authority fields and oversized uncollapsed content.
- The older live optimalisering.oslo.no Pages CMS is a better UX reference: explicit Forside/Tjenester/etc., human labels, grouped SEO/Hero/sections, collapsible lists.

## Immediate safety rule already applied

.pages.yml now has:

settings:
  content:
    merge: true

This is required so Pages CMS preserves fields that are not exposed in the editor instead of rewriting/dropping them.

Do not remove this.

## Objective

Make Pages CMS suitable for an ordinary customer/editor and make a CMS save reliably reach the review Worker.

No website redesign or offer/content strategy change.

## 1. Client-grade CMS information architecture

Use the old live repository's .pages.yml as a UX reference, adapted to the V3.3 data model.

Top-level sidebar should read approximately:

- Forside
- Tjenester
- Priser
- Innsikt
- Om tjenesten
- Optimaliseringssjekk
- Kontakt
- Personvern
- Vilkår
- Case/evidens (intern)
- Media

Do not expose a generic "Nettsider" bucket as the primary customer workflow.

## 2. Tjenester collection

The Tjenester collection should contain only actual service/landing pages:
- Synlighet
- Konvertering
- SEO
- AI-synlighet
- Nettbutikkoptimalisering
- later service pages when explicitly added

Do not mix legal, contact, pricing or editorial guide pages into Tjenester.

Use human editor labels:
- Tjenestenavn
- SEO
- Toppseksjon (Hero)
- Hero-bilde / drømmeutfall
- Innholdsseksjoner
- Ofte stilte spørsmål
- Neste steg

Technical values such as slug/kind/status/authority/translation keys should be preserved by merge mode but not clutter the normal customer editor unless there is a real editing reason.

## 3. Collapsible repeaters

Any list of:
- sections
- FAQ
- package items
- icon items
- cards/steps

should use Pages CMS collapsible summaries where supported.

Examples:
- section summary: {heading}
- FAQ summary: {question}
- package summary: {title}
- icon summary: {label}

Default nested repeaters collapsed where that improves scanning.

The editor should not open into a several-screen wall of fields.

## 4. Dedicated file editors

Use dedicated file entries rather than a generic page collection for:
- Forside
- Priser
- Om tjenesten
- Optimaliseringssjekk
- Kontakt
- Personvern
- Vilkår

Innsikt may be a small collection if that fits the current data model cleanly.

Do not duplicate data sources.

Shared package data remains sourced only from home.json.

## 5. Field labels

Prefer customer language:
- SEO
- Sidetittel
- Metabeskrivelse
- Toppseksjon (Hero)
- Overtekst
- Hovedoverskrift
- Ingress
- Bilde
- Alternativer
- Typiske situasjoner
- Spørsmål og svar
- Knappetekst

Avoid implementation language in the normal UI:
- authority
- publication lock
- translation contract
- source key
- route contract
- H-0xx references

Internal evidence/proof workflows may remain explicitly marked "(intern)".

## 6. Preserve all V3.3 data safely

CMS round-trip must not remove or silently rewrite fields that the editor does not expose.

Test this explicitly:
1. take SHA256/hash of every JSON content file;
2. use a representative Pages-CMS-equivalent serialization/edit fixture;
3. edit one visible field;
4. confirm only intended content changes;
5. confirm unmodeled fields remain byte/semantic-equivalent as applicable.

merge:true is mandatory.

Do not depend on field omission deleting empty values.

## 7. Deploy reliability

Current fact: all recent Pages CMS commits create a Cloudflare Workers Builds check that concludes failure.

Diagnose and fix the repository-side cause if possible.

Required investigation:
- compare last known successful Worker build commit 21b4e9f3e7127f3cf92b325d269414c19b0d38c7 against the first failing Pages CMS commit 7acf47ae002c0471820870fb7db8ad114784e583;
- reproduce the current Cloudflare build/deploy command locally using the documented project root/path assumptions;
- identify whether failure is caused by content validation, build command/path, deploy command, or external Cloudflare configuration;
- make a normal CMS content-only commit capable of passing the repository build/QA path.

If the remaining failure is Cloudflare-account configuration outside Git:
- do not guess;
- document the exact setting the OWNER must change in Cloudflare;
- include the failing Build ID/check URL and expected value.

## 8. CMS edits must be deployable

A legitimate customer content edit must not fail because an old historical audit freezes editable copy.

Tests may validate:
- schema
- required structure
- safety claims
- protected routes
- price invariants when locked

Tests must not freeze ordinary CMS-editable wording that OWNER/customer is explicitly allowed to change.

Audit old H-00x tests for accidental conflicts with the CMS editing contract.

Do not weaken:
- proof safeguards
- pricing keys/routing
- production intake guards
- noindex preview guard
- required commercial invariants

## 9. Smoke test acceptance

After implementation:
1. OWNER can find the Forside editor immediately.
2. OWNER can find Tjenester and sees only services.
3. Editor fields are grouped and readable, comparable to the old live CMS UX.
4. Technical metadata does not dominate the editor.
5. Change "Ja takk - Begge deler" -> a temporary harmless variant in CMS.
6. Save creates exactly one expected content commit.
7. Cloudflare build succeeds.
8. Review Worker updates.
9. Revert in CMS.
10. Cloudflare build succeeds again and Worker reverts.

The real authenticated OWNER save/revert remains the final proof if Codex cannot authenticate.

## Do not touch

- website visual design
- package strategy/prices
- service copy except a temporary smoke-test value that is reverted
- proof publication
- order/lead feature enablement
- noindex
- English rollout

## Delivery

Run full verify plus a dedicated CMS round-trip test.

Capture:
- sidebar/overview screenshots if authenticated access is available
- service editor screenshot
- package/home editor screenshot
- successful Cloudflare check if available
- exact external Cloudflare step if not fixable from Git

Stop for OWNER CMS review.
