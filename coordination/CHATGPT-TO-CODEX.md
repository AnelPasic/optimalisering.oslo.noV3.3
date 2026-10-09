# ChatGPT to Codex

## Active handoff — H-010

**Date:** 2026-10-09  
**Authority:** STRATEGY_CONTENT D-030/D-031 + OWNER/STRATEGY_CONTENT D-032  
**Scope:** controlled propagation of validated service pattern to `/konvertering/` only

### Objective

H-009 validates the service-page system on /synlighet/.

Apply that same system to /konvertering/ using the exact D-031 locked content. Do not redesign the service pattern and do not independently rewrite copy.

### Authoritative content

Use the current exact bytes of:

`app/src/content/pages/konvertering.json`

locked at:
`8b8f4c4eecda1458e45c392dfabe3d4ac4fbc8d5`

Key locked text:

**Eyebrow**
> Fra besøk til henvendelser og kjøp

**H1**
> Det er ikke alltid kunden som må overbevises. Noen ganger må nettsiden slutte å stå i veien.

**First section heading**
> Det skal være enklere å kjøpe enn å gi opp.

Do not shorten or replace these in implementation.

### 1. Reuse the validated service-page pattern

Use the D-030 /synlighet/ pattern:
- accepted header/footer;
- 1440px max shell and controlled text measures;
- Instrument Sans / Figtree roles;
- current plum/teal/mint/lavender family;
- text-led service hero;
- quiet breadcrumb;
- open editorial sections;
- cards only where they improve comprehension;
- one compact commercial bridge;
- bounded free-check block;
- FAQ.

Do not create a new Konvertering design language.

### 2. Hero

Render:
- breadcrumb;
- locked eyebrow;
- locked H1;
- locked intro;
- primary CTA: Ta en gratis sjekk;
- secondary CTA: Se priser.

The H1 is intentionally longer than Synlighet's. Handle line length/responsive wrapping with layout/measure, not copy edits.

Do not add a second headline or fake CRO dashboard.

### 3. Page sequence

Render the locked sections in this order:

1. Hero
2. “Det skal være enklere å kjøpe enn å gi opp.”
3. “Flere skjema er lite verdt hvis henvendelsene ikke passer.”
4. “Vi starter med hindringen som står mest i veien.”
5. “Hvis de rette besøkene ikke kommer, er ikke konvertering hele svaret.”
6. Shared-data commercial pricing bridge
7. “Send siden der du vil at kunden skal handle.”
8. FAQ
9. Footer

No filler sections.

### 4. First section

The three items are:
- Før kunden bestemmer seg
- Når kunden vil videre
- Etter handlingen

Use the same clear card language as the first Synlighet section, but preserve the exact copy.

The section should visually communicate a simple path from interest → action → useful outcome. Do not add arrows/steps if they make the page feel like a SaaS funnel diagram.

### 5. Quality section

The three locked items:
- Tjenestebedrift
- Nettbutikk
- Måling

This section explains that more form submissions/orders are not automatically better business outcomes.

Use a calm, competent treatment. It may use open columns rather than cards if that matches the validated service pattern better.

Do not invent benchmarks, conversion rates, margins or client results.

### 6. Prioritization section

Keep this editorial/open.

The message is:
- find the biggest friction;
- prioritize it;
- implement agreed work;
- measure effect;
- no promised uplift.

Do not add generic CRO checklists.

### 7. Conversion × visibility section

Use the same strong contrasting section treatment that works for Synlighet × Konvertering on /synlighet/.

Locked heading:
> Hvis de rette besøkene ikke kommer, er ikke konvertering hele svaret.

Links:
- Se Synlighet → /synlighet/
- Se pakker og priser → /priser/

Do not imply that traffic volume alone is the answer. Relevant traffic is the distinction.

### 8. Generalize the service pricing bridge

Current `ServicePricingBridge.astro` hard-codes “Synlighet” in its two context lines.

Refactor it so the active service supplies/derives the service name, producing:

For /synlighet/:
- Når Synlighet er det ene prioriterte området.
- Når Synlighet jobber sammen med et annet område.

For /konvertering/:
- Når Konvertering er det ene prioriterte området.
- Når Konvertering jobber sammen med et annet område.

Do not duplicate prices or create a second package source.

The package names/prices/recommendation/VAT still come from the existing shared CMS package source.

Prove /synlighet/ rendered output remains unchanged after this refactor.

### 9. Free check

Use locked copy exactly.

It must say:
- 3 most important findings;
- within 2 business days;
- manual/bounded;
- not a full CRO audit;
- not a complete error list;
- not a forecast;
- not free implementation.

Route CTA to:
`/#sjekk`

Do not create a second form.

### 10. SEO / authority

Preserve:
- SEO title includes **Konverteringsoptimalisering (CRO)**;
- one semantic H1;
- clean H2/H3 hierarchy;
- internal links to /synlighet/ and /priser/.

Do not stuff “CRO” repeatedly into headings. The page should read naturally to a Norwegian business owner.

### 11. Renderer architecture

Extend the validated ServicePage route to /konvertering/.

Allowed:
- reusable service-name/context props;
- small renderer generalization;
- shared service visual mode.

Not allowed:
- automatically converting /seo/, /ai-synlighet/ or other pages to ServicePage;
- broad schema migrations;
- visual changes to /synlighet/.

### 12. Proof

No client proof in H-010.

Do not change proof registry or guards.

### 13. Frozen scope

Must remain materially unchanged:
- homepage
- /priser/
- /synlighet/
- /seo/
- /ai-synlighet/
- /nettbutikkoptimalisering/
- /vurdering/
- /om/
- /kontakt/
- legal pages
- insight pages/articles
- backend/intake
- /system/
- /project/

### Acceptance criteria

1. /konvertering/ renders exact D-031 locked copy.
2. Exact H1 and first-section hook are preserved.
3. Page clearly belongs to the D-030 service-page system.
4. Lead/order quality distinction is understandable without specialist knowledge.
5. Conversion × visibility relationship is clear.
6. Pricing bridge uses the shared package source.
7. Service pricing bridge is generalized; no hard-coded Synlighet remains in reusable logic.
8. /synlighet/ output is unchanged after bridge refactor.
9. Homepage and /priser/ remain unchanged.
10. No fake metrics/proof/benchmarks or invented terms.
11. Other pages stay frozen.
12. 1440 / 390 / 320 QA passes.

### Evidence / delivery

- Run full verify/tests/browser checks.
- Add exact-copy checks for H1/eyebrow/first-section heading/order.
- Add renderer regression covering both Synlighet and Konvertering bridge context.
- Capture /konvertering/:
  - full 1440 + 390;
  - hero + first section 1440 + 390;
  - quality/prioritization 1440 + 390;
  - conversion×visibility + pricing bridge + free check 1440 + 390.
- Compare /synlighet/ output against H-009 baseline.
- Recheck homepage and /priser/.
- Push to main and verify Worker.
- Update coordination state/report/evidence.
- Stop for STRATEGY_CONTENT review of /konvertering/.

Do not continue to /seo/ or /ai-synlighet/ until the next handoff.


---

## Completed handoff — H-009

**Date:** 2026-10-09  
**Authority:** STRATEGY_CONTENT D-027/D-028 + OWNER/STRATEGY_CONTENT D-029  
**Scope:** controlled visual/commercial propagation to `/synlighet/` only

### Objective

The homepage and /priser/ patterns are now validated.

Use `/synlighet/` as the first service-page test.

Do not rewrite the page. Render the exact D-028 content and give it the accepted visual confidence, airiness and commercial clarity without turning it into another homepage.

### Authoritative content

Use the current exact bytes of:

`app/src/content/pages/synlighet.json`

locked at:
`cc02995a5b43d3d0ee28df23a4588ff09a16cd21`

Key locked signals include:

**Eyebrow**
> SEO, lokal SEO og AI-synlighet

**H1**
> De søker etter løsningen. Så etter deg.

Do not restore the earlier “Du skal bli funnet…” version.

### 1. Visual system

Apply the accepted H-006/H-008 system:
- Instrument Sans headings/major figures;
- Figtree body/UI;
- 1440px max shell with narrower text measures;
- current plum/teal/mint/lavender family;
- current accepted header/footer;
- Storebrand-like whitespace and task clarity;
- Mementor-like competence and commercial restraint.

Do not create a generic old inner-page clone.

Do not introduce a new brand direction.

### 2. Hero

The hero should be simpler than the old InnerPage hero and clearly service-specific.

Use:
- breadcrumb, but visually quiet;
- locked eyebrow;
- locked H1;
- locked intro;
- primary CTA: Ta en gratis sjekk.

Add one restrained secondary path:
- Se priser → /priser/

Do not add a second keyword-heavy headline.

For visual balance, a restrained semantic side treatment may show the three concepts:
- SEO
- Lokal SEO
- AI-synlighet

This may be typographic/graphic, but:
- no fake search rankings;
- no fake AI citations;
- no analytics dashboard;
- no stock image;
- no invented metrics;
- no visual that needs a paragraph to explain it.

If the page is stronger without that side treatment, keep the hero text-led. Clarity wins.

### 3. Section hierarchy

Render the locked content in this sequence:

1. Hero
2. “Hvis bare de som kjenner navnet ditt finner deg…”
3. “SEO, lokal SEO og AI-synlighet løser ulike deler av samme jobb.”
4. “Vi starter med det som kan gjøre det lettere for en relevant kunde å finne deg.”
5. “Mer trafikk er lite verdt hvis de rette besøkende ikke går videre.”
6. Compact commercial/pricing bridge using the shared package source
7. Free manual check
8. FAQ
9. Footer

Do not add filler sections.

### 4. Cards / open composition

Use cards only where they improve choice/comprehension:
- the three need/path items in the first main section;
- SEO / Lokal SEO / AI-synlighet can use three clear service cards or open columns.

The prioritization and Synlighet × Konvertering sections should feel more editorial/open, not another wall of cards.

Use asymmetry/whitespace where useful, but keep the information obvious.

### 5. Commercial bridge — no duplicated prices

Add a compact price block after the Synlighet × Konvertering section.

It must consume the existing shared package source from the homepage, not hard-code prices again.

Customer logic:
- **Optimalisering — 4 500 kr/mnd eks. mva.** when Synlighet is the one prioritized area.
- **Vekst — 6 900 kr/mnd eks. mva.** when Synlighet works together with another area.
- Link to full `/priser/`.
- Partner does not need a full third card here unless required for layout; the goal is routing, not reproducing the entire pricing page.

The source must remain one-source-of-truth and CMS-editable.

Do not expose internal hour guardrails or invent terms.

### 6. Free check

Use the locked D-028 copy:
- 3 most important findings;
- within 2 business days;
- manual/bounded;
- no complete SEO audit;
- no forecast/guarantee/free implementation.

Route the CTA to the current accepted homepage check:
`/#sjekk`

Do not create a second form on /synlighet/ in H-009.

### 7. Authority / SEO structure

The page is an umbrella authority page for:
- SEO;
- Lokal SEO;
- AI-synlighet.

Preserve clear internal links:
- /seo/
- /ai-synlighet/
- /konvertering/
- /priser/

Do not create `/lokal-seo/` in H-009.

Do not force AEO/AIO/GEO synonym lists into the page. Those belong under the AI visibility topic when useful.

Use semantic headings cleanly:
- one H1;
- section H2s;
- item H3s.

### 8. Current proofs

Do not publish Nysta or Oslo Privatklinikk on this page.

D-025 proof candidates remain non-public.

Do not change proof registry fields or renderer guards.

### 9. Code/system direction

The old generic InnerPage renderer may be insufficient for the accepted service-page system.

You may:
- add a dedicated ServicePage component or service visual mode;
- extract reusable service section patterns;
- add a service-specific stylesheet based on the accepted tokens.

Prefer reusable architecture because /konvertering/, /seo/ and /ai-synlighet/ may follow after review.

But do **not** automatically switch the other service pages to the new component/styles in H-009.

Gate the new renderer to `/synlighet/` only until reviewed.

### 10. Frozen scope

Do not redesign/rewrite:
- /konvertering/
- /seo/
- /ai-synlighet/
- /nettbutikkoptimalisering/
- /vurdering/
- /om/
- /kontakt/
- /personvern/
- /vilkar/
- /innsikt/ and articles
- backend/intake
- /system/
- /project/

Homepage and /priser/ must remain materially unchanged apart from any safe shared-component refactor with proven identical output.

### Acceptance criteria

1. /synlighet/ renders exact D-028 copy.
2. Locked H1 is exactly “De søker etter løsningen. Så etter deg.”
3. Page visually belongs to homepage + /priser/ system.
4. SEO / Lokal SEO / AI-synlighet are immediately understandable as distinct but related.
5. The page explains commercial relevance before technical detail.
6. Compact pricing bridge derives from the shared package source.
7. No duplicated package price source is introduced.
8. No fake rankings, AI proof, client proof or invented claims appear.
9. Free check retains exact bounded promise.
10. Homepage and /priser/ remain unchanged.
11. Other pages remain frozen.
12. 1440 / 390 / 320 responsive QA passes.

### Evidence / delivery

- Run full verify/tests/browser checks.
- Add exact-copy checks for D-028 H1/eyebrow/section order.
- Add regression proving the service pricing bridge reads shared package values.
- Capture:
  - /synlighet/ full page 1440 and 390;
  - hero + first section 1440 and 390;
  - three-area section 1440 and 390;
  - commercial bridge + free check 1440 and 390.
- Recheck homepage and /priser/ after shared-component changes.
- Push to main and verify Worker.
- Update coordination state/report/evidence.
- Stop for STRATEGY_CONTENT review of /synlighet/.

Do not continue to /konvertering/ or deeper service pages until the next handoff.

### Implementation receipt — no new approval

2026-10-09, IMPLEMENTATION: incoming main **fd48a91a4c7353aa37cb55b9abd30efd8e18a9f7** consumed; implementation/local evidence **36c305f62c82897e54dd99384e2fcc9c1d96e356**. D-027's corrected pricing revision and D-028's exact Synlighet bytes/status/authority remain untouched. New service renderer/style is gated only to `/synlighet/`; text-led hero, locked sections, compact shared two-package bridge and bounded homepage-check routing. The same source binds its repeated price FAQ. All 187 frozen files and home/pricing HTML/styles/geometry match the incoming baseline. Full verify (74 files, zero diagnostics; 34 tests; 445 links), 40 browser checks, actual shared-source/optional-navigation regression and responsive 1440/390/320 pass. Eight captures, technical review/fix and CMS guide are in evidence/h009 and app/docs/h009-service-cms.md. Main/Worker receipt belongs in CODEX-TO-CHATGPT. **Stop for STRATEGY_CONTENT review of /synlighet/; no further implementation handoff is active.** D-025 proof remains hidden, other 12 pages stay frozen and no full-page visual acceptance, proof/launch or broader propagation approval is inferred.


---

## Completed handoff — H-008

**Date:** 2026-10-09  
**Authority:** STRATEGY_CONTENT D-024 + OWNER/STRATEGY_CONTENT D-026  
**Proof direction:** D-025  
**Scope:** render locked commercial copy + controlled propagation to `/priser/` only

### Objective

H-007 is commercially accepted after STRATEGY_CONTENT refined the content layer directly.

Do not rewrite that copy.

Now make `/priser/` the first controlled propagation page using the accepted H-006 homepage visual system and one package source of truth.

### Authoritative content revisions

Preserve exactly:

- homepage commercial content from commit `10c5890b2e4d678340384dd399a1785e3e01ba36`
- pricing-page supporting copy from commit `a37bf7a9067f18f4eafd59e2efd753240aecc96c`

If main has advanced, consume the current bytes of those files; do not restore older H-007 generated wording.

### 1. Homepage

Render the current locked commercial wording exactly.

Do not change:
- hero;
- selector;
- calculator;
- package wording/prices;
- free-check wording;
- related FAQ wording;
- selected hero image;
- current owner color tweaks;
- section order.

Component refactoring for shared package rendering is allowed only if rendered homepage output remains materially identical.

### 2. One package source of truth

Homepage and `/priser/` must not contain independently maintained package numbers/rules.

Preferred implementation:
- factor the package rendering into a reusable component;
- use one content source for package names, prices, descriptors, fit/scope, recommendation state, work areas and shared cost notes;
- keep that source editable through Pages CMS.

Do not duplicate 4 500 / 6 900 / 14 900 in a second editable content object if avoidable.

If the least-risk implementation is for `/priser/` to consume the homepage package object, that is acceptable for this phase. Do not perform a broad content migration merely for architectural purity.

### 3. /priser/ visual propagation

Apply the accepted representative visual language to `/priser/`:
- Instrument Sans headings/major price figures;
- Figtree body/UI;
- max 1440px shell with narrower readable measures;
- current plum/teal/mint/lavender family;
- Storebrand-like air and clear task hierarchy;
- current header/footer direction;
- restrained open sections rather than a wall of cards.

Do not invent a second design direction.

### 4. /priser/ information order

The pricing page should be immediately useful to a buyer:

1. concise pricing hero using the locked `priser.json` title/intro;
2. the same three packages and prices used on the homepage;
3. work areas / what can be optimized;
4. what is additional / separately priced;
5. free-check section with the 3-findings / 2-business-days promise;
6. pricing FAQ;
7. footer.

Do not add filler sections.

### 5. Package rendering

Use the exact locked commercial facts:

- Optimalisering — 4 500 kr/mnd eks. mva.
- Vekst — 6 900 kr/mnd eks. mva. — Anbefalt
- Partner — 14 900 kr/mnd eks. mva.
- no Sprint
- ad budget additional
- external tools/platform costs additional when necessary and not agreed included
- smaller work/adjustments on existing landing pages may fit agreed scope
- larger new landing pages, websites, substantial technical work and redesign are separately priced
- monthly capacity does not roll forward

Do not expose internal hour guardrails.

Do not invent binding, cancellation, minimum term, setup fee or invoice terms.

### 6. Proof

Do not publish proof in H-008.

D-025 sets future order only:
1. Oslo Privatklinikk = preferred homepage proof candidate
2. Nysta = preferred ecommerce/conversion supporting case

Both remain blocked because current imported records still lack required intervention, attribution/limitations wording and confirmed comparable periods.

Do not set:
- strategyReviewStatus=CONTENT_LOCKED
- publicationStatus=PUBLISHABLE
- publicationApproved=true

Do not weaken renderer guards.

### 7. Pages CMS

Ensure the shared package source remains straightforward to edit.

If fields move as part of the one-source-of-truth refactor:
- preserve values exactly;
- update `.pages.yml`;
- preserve hero/selector/calculator/form/proof editing;
- document the new location clearly.

Authenticated live CMS testing remains a manual owner/editor action and is not a reason to block implementation.

### 8. Frozen scope

Do not redesign or rewrite:
- /synlighet/
- /konvertering/
- /seo/
- /ai-synlighet/
- /nettbutikkoptimalisering/
- /vurdering/
- /om/
- /kontakt/
- /personvern/
- /vilkar/
- /innsikt/ or its articles
- any other non-home/non-pricing page
- backend/intake
- /system/
- /project/

### Acceptance criteria

1. Homepage still renders the exact D-024 commercial copy.
2. /priser/ renders the exact package ladder and locked supporting copy.
3. Homepage and /priser/ use one package content source.
4. /priser/ visually belongs to the accepted H-006 system.
5. Vekst is clearly but tastefully recommended.
6. No Sprint or invented terms appear.
7. Ad-budget/external-cost/separate-work rules remain visible and understandable.
8. Free check clearly states 3 findings within 2 business days.
9. Proof remains completely non-public.
10. Remaining 13 non-home pages and protected inputs remain unchanged.
11. 1440 / 390 / 320 responsive QA passes for both homepage and /priser/.

### Evidence / delivery

- Run full verify/tests/browser checks.
- Add regression test proving homepage/pricing package data cannot drift.
- Capture /priser/ full page at 1440 and 390.
- Capture package block at 1440 and 390.
- Recheck homepage at 1440 and 390 after any component/content refactor.
- Push to `main` and verify the review Worker.
- Update coordination state/report/evidence.
- Stop for STRATEGY_CONTENT review of `/priser/`.

Do not continue to service-page propagation without the next handoff.

### Implementation receipt — no new approval

2026-10-09, IMPLEMENTATION: incoming main **73ce60d8789ba0b44661ce5222adff53a4831127** consumed; implementation/local evidence **87a839216db412305337daae24c01858176db15e**. Both D-024 JSON records and authority/status fields are unchanged. Shared CMS homepage packages render both pages and bind repeated FAQ/metadata facts; only `/priser/` receives visual propagation. Exact homepage DOM/styles/geometry and all 182 frozen files match the pre-implementation baseline. Full verify (69 files, zero diagnostics; 34 tests; 445 links), 40 browser checks, real-Astro source regression and both routes at 1440/390/320 pass. Six required captures, CMS guide and technical review are in evidence/h008 and app/docs/h008-pricing-cms.md. Main/Worker receipt follows in CODEX-TO-CHATGPT.md. **Stop for STRATEGY_CONTENT R-06; no further implementation handoff is active.** D-025 proof stays non-public, other 13 pages and backend/reference inputs stay frozen, no production intake/launch or new role approval is inferred.


---

## Completed handoff — H-007

**IMPLEMENTATION receipt, 2026-10-09:** consumed incoming main 7b98ff8184e7a8063682877b1edfcff3d4941f20; implementation/evidence fdcdaf84020ae4ecf8446806329b74cb3e4320d2. Exact ladder, free-check promise, evidence-only guarded registry and CMS fields delivered. Final verification and responsive/preservation checks pass. Main/review Worker receipt is maintained in CODEX-TO-CHATGPT.md. Stop for STRATEGY_CONTENT review; no further implementation handoff is active. The original authorized scope below is retained.

**Date:** 2026-10-08  

**Latest-main clarification consumed:** 209063989df3911acde3c4d95c06a2ea76457216 confirms OWNER name/case permission GRANTED. Final H-007 records are EVIDENCE_ONLY / READY_FOR_STRATEGY_REVIEW; exact public presentation remains unpublished pending STRATEGY_CONTENT lock. Permission follow-up implementation is fdcdaf84020ae4ecf8446806329b74cb3e4320d2.

**Authority:** OWNER R-03 PASS + STRATEGY_CONTENT / COMMERCIAL  
**Decisions:** D-021, D-022, D-023  
**Authoritative commercial input:** `coordination/H007-COMMERCIAL-INPUT.md`  
**Scope:** homepage commercial layer + proof data model + Pages CMS wiring

### Objective

Stop iterating on the representative layout.

Use the accepted current homepage as the visual/IA baseline and move the project forward commercially:

1. implement the previously locked V3 package ladder;
2. prepare the real case/proof evidence as structured evidence-only records with hard publication gating;
3. make the commercial fields cleanly editable through Pages CMS;
4. preserve the rest of the current homepage architecture and current visual direction.

Codex is implementation. Do not improvise marketing strategy or customer-facing claims beyond the exact factual inputs supplied.

### 1. Replace the temporary package section with the D-022 ladder

The current temporary Synlighet / Konvertering / Begge price placeholders are superseded as **packages**.

The need selector above remains:
- Bli funnet
- Gjør flere besøk til henvendelser og salg
- Begge deler

The package/pricing section must instead use:

#### Optimalisering
- **4 500 kr/mnd eks. mva.**
- descriptor: **Ett prioritert hovedområde**
- one main area / one priority at a time

#### Vekst
- **6 900 kr/mnd eks. mva.**
- badge: **Anbefalt**
- descriptor: **To områder som jobber sammen**
- two connected areas

#### Partner
- **14 900 kr/mnd eks. mva.**
- descriptor: **Helheten + større kapasitet**
- greater capacity across relevant areas
- never describe it as unlimited

Use Instrument Sans for major price figures per the established typography rule.

Do not publicly expose internal hourly guardrails unless later authorized.

### 2. Package scope facts

The monthly work can combine these four areas:
- Konvertering
- Synlighet: SEO + Lokal SEO + AI-søk / AI-synlighet
- Google Ads
- Meta Ads

Måling & sporing is a shared foundation, not a fifth package/service card.

Make this understandable without turning each pricing card into a feature dump.

Hard rules that must be visible near pricing where relevant:
- **Annonsebudsjett kommer i tillegg.**
- applicable external platform costs are additional unless explicitly agreed otherwise
- larger/new landing pages, websites, substantial technical work and redesigns are quoted separately

Do not invent:
- binding period
- cancellation period
- minimum term
- setup/onboarding fee
- invoice terms
- unlimited work

Do not reintroduce Sprint.

### 3. Free check

Integrate the established offer:
> **Få våre 3 viktigste funn innen 2 virkedager.**

Keep the existing bounded/manual wording and safeguards:
- not a complete audit
- not free implementation
- not a forecast/result guarantee
- not an automated score presented as human expertise

Do not make the form longer.

### 4. Proof/case registry

Create a structured proof/case content model that can later drive homepage proof and result pages without code changes.

Import the exact evidence records from `coordination/H007-COMMERCIAL-INPUT.md`:
- Nysta
- Oslo Privatklinikk

Both must remain during H-007:
- `EVIDENCE_ONLY`
- `READY_FOR_STRATEGY_REVIEW`
- `naming/publication permission = GRANTED`
- non-rendering on public pages until ChatGPT/STRATEGY_CONTENT locks the exact public presentation

Required model fields should support at minimum:
- id
- client/display name
- anonymized label
- result/dominant metric
- before
- after
- delta
- period/timeframe
- intervention/change
- source/provenance
- limitations/attribution caveat
- naming permission
- artifact/screenshot status
- publication status
- publicationApproved boolean

Implement a hard renderer guard so no case can appear publicly unless publication status/approval explicitly permits it.

No test fixture, environment flag or missing field may accidentally make a case public.

Do not create fake testimonials, fake logos or public anonymized claims in H-007.

### 5. Homepage proof slot

Keep the homepage proof position in the established sequence.

For now, although publication permission is confirmed, no exact public case presentation has yet been STRATEGY_CONTENT-locked:
- do not render a fake proof card;
- do not fill the space with generic praise;
- it is acceptable for the public proof slot to remain omitted.

The purpose of H-007 is to make the real proof data ready for immediate STRATEGY_CONTENT selection after implementation, not to manufacture or prematurely publish raw registry claims.

### 6. Pages CMS

Make the following commercially meaningful data editable through Pages CMS without touching component code:

Homepage:
- package section eyebrow/heading/intro
- package names
- descriptor
- price
- VAT suffix
- recommended badge/state
- customer-facing fit/scope copy
- CTA label/href
- external-cost note
- free-check promise/copy
- existing hero/selector/calculator/form/FAQ fields

Proof registry:
- all evidence/status/permission fields listed above
- publication controls must be explicit and safe

Do not make internal delivery-hour guardrails a public CMS marketing field. If stored, keep them in a non-public operational field/file.

Authenticated Pages CMS account/GitHub-app operation is still not proven. Validate schema/config locally and report the exact manual authentication/connection step that remains; do not claim it works live unless actually tested.

### 7. Visual/layout preservation

Preserve the current visual baseline including OWNER's direct small color/selector changes.

Do not:
- reopen hero design
- change image
- change section order
- rework palette
- redesign need cards
- redesign calculator
- propagate homepage visual system to the other 14 pages

You may make minimal pricing/proof/CMS layout adjustments required to render the new package ladder cleanly.

### 8. Content authority

The exact package labels/prices/rules in D-022 are authoritative.

Generated connective copy remains DRAFT / REVIEW_REQUIRED unless supplied verbatim by this handoff.

Do not mark the entire homepage CONTENT_LOCKED.

ChatGPT will perform the next copy/content refinement directly against the CMS/content layer after H-007.

### 9. Existing pages

Do not expand/redesign the remaining 14 pages in this handoff.

A later controlled propagation/content phase will decide:
- which service pages stay
- page-specific copy
- /priser/ synchronization
- result/case URLs
- authority/insight expansion

### Acceptance criteria

1. Homepage visually preserves the accepted D-021 baseline.
2. Pricing section renders 4 500 / 6 900 / 14 900 kr/mnd eks. mva. accurately.
3. Vekst is visibly but tastefully marked Anbefalt.
4. Sprint is absent.
5. Ad-budget-extra rule is visible.
6. No invented contract/term language appears.
7. Free check states 3 key findings within 2 business days while retaining bounded/manual safeguards.
8. Nysta and Oslo Privatklinikk exist as structured evidence-only records with publication/name permission = GRANTED and render nowhere publicly until STRATEGY_CONTENT locks the exact public presentation.
9. Automated tests prove proof cannot render without explicit publishability.
10. Pages CMS exposes the intended homepage commercial fields and proof registry safely.
11. Other 14 pages, `system/`, `project/` and backend/intake behavior remain unchanged.
12. 1440 / 390 / 320 responsive checks pass.

### Delivery

- Run full verify/tests/browser QA.
- Add focused H-007 tests for exact package prices, VAT suffix, recommended state, Sprint absence, ad-budget note, free-check promise and proof-publication guard.
- Capture homepage package section at 1440 and 390.
- Capture free-check section at 1440 and 390.
- Do not create screenshots of hidden proof as if public.
- Push to `main` and verify the review Worker.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`.
- Stop after H-007 for STRATEGY_CONTENT review.

Do not independently continue into remaining-page propagation.


---

## Completed OWNER selector follow-up — H-006

**IMPLEMENTATION receipt:** consumed at 7b7a970f301a1cb47dff7307a61f97175c5589d1. Local verification/evidence passes; exact delivery and live receipt belong in CODEX-TO-CHATGPT and Git history. Stop for OWNER R-03. D-019/D-020 remain the genuine prior layout/photo verdicts, not an invented review of this selector delta.

2026-10-08, actual OWNER instruction in Codex after selected-photo delivery 4d1e6e7: set `.invite-home .discipline` to `font-size: 17px`; use exact combined label **Synlighet X Konvertering**; replace its symbol with upward arrows or another progress icon; set `.invite-home .need-card-2` background to `#320c43` and text to `#e0f0ef`. This authorizes only those homepage selector changes under D-018. Preserve CMS-driven copy, selected single hero/alternatives, remaining homepage structure and all other pages. Continue the existing static review workflow, synchronize implementation/verification receipts, then return to OWNER R-03. D-019/D-020 remain genuine RED_TEAM verdicts on their exact reviewed revisions; this instruction supplies no whole-page acceptance or launch/scale-out authority.

## Completed OWNER asset follow-up — H-006 selected hero image

**IMPLEMENTATION receipt:** consumed at dc045748180897c20efa418ac739b4135bf5e517. First supplied image is selected; all three originals and optimized single-hero options are retained. Layout/content remain unchanged; CMS field now uses a single-image media picker. Verification and static-review delivery are in CODEX-TO-CHATGPT and evidence/h006-photo. Return to OWNER R-03 and fresh formal RED_TEAM R-04; no further implementation is active.

**Concurrent review reconciliation:** upstream main 33ad5bd returns the genuine D-019 H-006 layout R-04 PASS, with final-photo exclusion, preserved below. The remaining review on the photo-integrated revision is OWNER R-03 plus that separate photo review; implementation does not reset the layout PASS or approve the asset's authenticity/crop/proof implications.

2026-10-08, actual OWNER instruction in Codex after H-006 delivery 1e5f5edfee8127a4726a9b05ca4fbf7e13af9a81: use the first generated image as the homepage hero; retain a clean CMS-editable/content-driven asset field for later swaps without layout changes; do not introduce a slider/gallery; keep the other two generated images available as later review alternatives. Supplied repository assets: app/public/images/home/happycustomer.png, happycustomer2.png, happycustomer3.png. This explicitly authorizes the narrow asset integration following D-018; it does not approve the complete homepage, other pages, content/terms/proof or production launch. Deliver within the existing static review workflow, synchronize evidence, then return to OWNER R-03 and fresh formal RED_TEAM R-04. Use this entry's Git history and outbound receipt for the implementation/delivery revision.

## Completed handoff — H-006

**IMPLEMENTATION receipt (2026-10-08):** incoming main 99734a73a3f3cd0ba93a1155cfbdd95395a91245 consumed at implementation/evidence 7e69c079d57281d5126d2c94dbc3f1dfac90f265. Delivery and live verification are recorded in CODEX-TO-CHATGPT.md and its Git history. H-006 is complete; no further implementation handoff is active. Stop for OWNER R-03 and fresh formal RED_TEAM R-04. Final generated photo remains a separately supplied asset; no acceptance, content lock or launch approval is inferred.

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT / DESIGN + CRO POLISH  
**Decision:** D-018  
**Baseline:** H-005B implementation `1d4bdf77bd234783b68a7f581bdb88ab6ef2af38`  
**Scope:** representative homepage visual/layout polish only

### Objective

H-005B has the right information architecture and the clearest hero so far, but the page still feels too compact and slightly too component-designed.

Move it toward:
- **Storebrand-like airiness and task clarity**
- **Mementor-like competence and commercial confidence**
- while keeping the existing Invite-derived visual life.

This is **not a redesign** and not a content rewrite.

### 1. Large-screen width

Set the homepage large-screen shell to a **maximum content width of 1440px**.

Do not stretch readable text to 1440px.

Use nested measures:
- full homepage shell: max 1440px;
- hero content/photo composition: can use most of the shell;
- normal body/readable copy: roughly 650–760px where appropriate;
- split explanatory sections: keep each text column comfortably readable;
- FAQ/form content may use narrower internal widths even inside the larger shell.

Use responsive side gutters rather than allowing content to touch viewport edges.

The goal is more breathing room, not simply bigger components.

### 2. Spacing / page rhythm

Increase whitespace materially across the homepage.

Target direction, not rigid pixel law:
- major desktop sections: roughly 96–120px vertical padding where the section job benefits from it;
- tighter utility/transition sections may be smaller;
- tablet: roughly 72–88px;
- mobile: roughly 52–64px.

Also increase:
- space between section eyebrow/title/body;
- space between section intro and cards/tools;
- internal card padding;
- space around calculator and package grids.

Do not make the page feel sparse for its own sake. The visitor should feel that every block has room to breathe.

### 3. Reduce “card wall” feeling

The homepage currently relies heavily on similarly sized rounded cards.

Keep the need selector as clear cards, but make the overall page feel less like a component gallery.

Allowed:
- more open sections with typography + whitespace instead of containers;
- lighter borders;
- calmer radii;
- stronger difference between primary choice cards and secondary informational blocks;
- fewer unnecessary panel backgrounds where open space communicates better.

Do not flatten everything into white rectangles. Preserve visual rhythm and color.

### 4. Competence / hierarchy

Strengthen the sense of a competent optimization partner through:
- confident typography;
- clear section hierarchy;
- disciplined alignment;
- fewer decorative micro-elements;
- deliberate use of color;
- visibly separated decision points;
- less “cute UI demo” treatment.

Do not add claims, awards, logos, fake metrics or proof.

The page should feel like a firm that understands commercial optimization, not a SaaS template.

### 5. Hero composition

Keep the exact H-005B content structure:
- eyebrow;
- one H1;
- one short support paragraph;
- `Ta en gratis sjekk`;
- `Se priser`.

Keep the current H1 wording.

Replace the current UI-style dream-outcome illustration with a **real-photo hero slot** prepared for an image that ChatGPT will generate separately.

The desired eventual image:
- authentic-looking happy/relieved business customer;
- Nordic/European business context;
- believable small/medium-business owner or decision-maker;
- natural expression, not exaggerated stock-photo happiness;
- bright, calm, credible environment;
- conveys “things are working / I have more control / business is going well”;
- should complement the copy rather than explain SEO literally.

Do **not** fetch or introduce a stock image.

For H-006:
- create the photo composition/slot using a stable asset path such as `/images/home/hero-customer.webp`;
- preserve build stability if the final asset is not present yet, using a neutral preview placeholder/fallback that is clearly non-production and does not become public copy;
- use an image aspect ratio/composition that can accept a generated photo later without redesign;
- plan for responsive crop via `object-fit: cover` / `object-position`;
- use rounded treatment consistent with the design system, but avoid looking like another UI card.

A subtle overlay may be supported later, but **do not add fake metric/outcome overlays now**.

### 6. Hero size and first-screen behavior

Do not undo H-005B's simplification.

The photo must not make the hero tall again.

On desktop:
- hero should use a balanced text/photo split;
- task selector should remain visually close after the hero.

On mobile:
- text first;
- photo second;
- selector should still arrive quickly;
- avoid a tall portrait photo that consumes an entire screen.

### 7. Need selector

Keep the H-005B copy and three choices.

Do not rewrite.

Use the increased 1440px shell to give the cards more horizontal breathing room on desktop.

Cards should feel clear and confident, not oversized.

### 8. Lower homepage

Preserve content and section order.

You may adjust **spacing, max-widths, alignment, open-vs-contained treatment, padding and visual hierarchy** across:
- calculator;
- packages;
- mechanism;
- fit/not-fit;
- free check;
- provider;
- FAQ/footer.

Do not rewrite their content or change their jobs.

Particularly:
- keep the calculator prominent, but give it more breathing room;
- packages should feel like a serious buying decision, not generic feature cards;
- mechanism can use more open space and less card treatment;
- free-check form should remain obvious but not visually cramped.

### 9. Typography

Keep:
- Instrument Sans = display / headings / major metrics / future major price figures
- Figtree = body / navigation / UI / forms / tables / metadata

Do not change font families.

Use improved width/spacing/hierarchy rather than simply making headings larger.

### 10. Color / visual DNA

Keep the current general plum / teal / mint / lavender family and the H-005B brand direction.

Use color more deliberately:
- white/cream/open space should carry more of the page;
- stronger color blocks should become meaningful peaks, not constant background noise;
- preserve the dark plum calculator/footer role unless a minor spacing/composition adjustment is needed.

Do not introduce a new palette.

### 11. CMS / content / code boundaries

Do not change public copy unless strictly required to remove a preview-only placeholder label.

Keep meaningful content CMS-driven.

Do not modify:
- other 14 page content/design;
- `system/`;
- `project/`;
- pricing/commercial terms;
- proof;
- backend/intake behavior.

### Acceptance criteria

1. Homepage shell supports max 1440px on sufficiently large screens.
2. Text measures remain comfortably narrow; no 1440px-wide paragraphs.
3. Whole page is visibly airier than H-005B at 1440px.
4. Hero remains simpler/shorter than H-004 and does not regress into layered messaging.
5. Hero composition is ready for a real generated customer photo without structural redesign.
6. No external/stock image is introduced.
7. Need selector remains immediately understandable and close to the hero.
8. Lower-page IA and copy stay unchanged.
9. Card-wall feeling is reduced.
10. Calculator and package decision areas remain prominent.
11. 1440 / 390 / 320px pass with no overflow or awkward crop.
12. Other pages and protected reference inputs remain unchanged.

### Evidence

Capture:
- full page at 1440 / 390 / 320;
- hero + need selector at 1440 / 390 / 320;
- calculator + packages at 1440;
- at least one wider desktop check (e.g. 1600 or 1920) proving the 1440px max shell behaves correctly.

Record:
- old vs new shell width;
- key section vertical spacing before/after;
- hero height before/after;
- any card/radius/container changes;
- exact asset path reserved for the generated hero image.

Run:
- full verify/test suite;
- existing browser regression;
- focused H-006 visual/fit checks.

Push to `main` so the connected review Worker rebuilds, verify the live review version, update coordination/evidence, then **stop for OWNER R-03 and new formal RED_TEAM R-04**.

Do not propagate H-006 to the remaining pages.


---

## Completed handoff — H-005B

**IMPLEMENTATION receipt (2026-10-08):** consumed at 1d4bdf77bd234783b68a7f581bdb88ab6ef2af38; delivery/evidence in CODEX-TO-CHATGPT.md. Stop for OWNER R-03 and formal independent RED_TEAM R-04. No acceptance or content lock is inferred. This handoff is completed; no further implementation handoff is active.

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT + STRATEGY_CONTENT / CRO  
**Decisions:** D-015 + D-016  
**Baseline:** H-004 / current main  
**Scope:** homepage hero + need-selector copy only

### Objective

Keep the H-005 simplification direction, but do **not** leave the hero visually empty.

We want a simpler hero with one strong message and one restrained visual that helps the buyer picture the dream outcome.

### Hero structure

Keep exactly:
- one eyebrow;
- one semantic H1;
- one short support paragraph;
- two CTAs;
- one outcome-oriented visual.

Use:

**Eyebrow**
> For bedrifter som konkurrerer om kundene

**H1**
> Bli funnet. Gjør flere besøk til henvvendelser og salg.

If the repository already contains the correct spelling “henvendelser”, preserve that spelling. Do not introduce typos.

**Support**
Use one short paragraph that naturally communicates:
- SEO;
- AI-synlighet;
- konverteringsoptimalisering;
- for businesses in Oslo and the rest of Norway;
- Medon starts where the customer journey stops.

**CTAs**
- Ta en gratis sjekk
- Se priser

Remove:
- the separate small SEO/category H1;
- hero note;
- the current repetitive explanatory hero illustration.

### New hero visual

Replace the current visual with **one calmer, realistic-ish “dream outcome” visual**.

The visual should plausibly suggest:
- improved visibility / being found by relevant customers;
- a clearer path from visit to enquiry or purchase;
- better commercial outcome.

Preferred character:
- believable UI/editorial hybrid;
- simple, productized;
- grounded and Nordic;
- visually supportive, not dominant.

It may combine a plausible search/discovery cue, a webpage/landing-page cue and a simple enquiry/purchase outcome cue, but should remain one coherent composition.

Do not use:
- generic stock-photo business people;
- fake client logos or case numbers;
- dense analytics dashboards;
- SaaS admin-panel aesthetics;
- generic AI gradients;
- decorative abstract shapes with no communication role;
- a visual that simply repeats the H1 in card form.

The buyer should understand the text first. The visual should make the outcome easier to imagine.

### Need selector

Keep:
> Hva trenger du hjelp med?

Use the same three cards and links, but shorten the descriptions:

**Bli funnet**
> SEO, AI-synlighet og lokal synlighet når kundene leter etter det du tilbyr.

**Gjør flere besøk til henvendelser og salg**
> Konverteringsoptimalisering for nettsider, landingssider og nettbutikker.

**Begge deler**
> Vi finner flaskehalsen og starter der det kan gi mest effekt.

Tiny grammar/fit edits are allowed. Do not expand them.

### Everything else

Do not redesign or rewrite:
- calculator;
- packages/pricing;
- mechanism;
- fit/not-fit;
- free check;
- Medon/provider;
- FAQ/footer.

Do not touch the other 14 pages.

Keep:
- Invite-derived palette and visual DNA;
- Instrument Sans / Figtree roles;
- current content-driven / Pages CMS-ready architecture.

### Acceptance criteria

1. Hero is materially shorter and calmer than H-004.
2. Only one headline layer exists.
3. One restrained dream-outcome visual exists.
4. The visual does not repeat the headline or resemble a fake dashboard/case.
5. Need selector appears sooner, especially on mobile.
6. Need-card descriptions are materially shorter.
7. Everything from calculator downward remains unchanged except unavoidable layout ripple.
8. 1440 / 390 / 320px QA passes with no overflow.
9. Other pages and `system/` / `project/` remain untouched.

### Evidence / delivery

- Run existing verify/tests/browser QA.
- Add focused H-005B checks for hero structure and visual presence.
- Capture:
  - full page 1440 / 390 / 320;
  - hero + selector 1440;
  - hero + selector 390 / 320.
- Push to `main` so the review Worker rebuilds.
- Verify the live review Worker if build timing allows.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md` and `REVIEW-QUEUE.md`.
- Stop for OWNER R-03 and RED_TEAM R-04.

Do not scale to remaining pages.


---

## Superseded handoff — H-005 (D-016 / H-005B replaces the no-visual clause)

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT + STRATEGY_CONTENT / CRO  
**Decision:** D-015  
**Baseline:** H-004 implementation `caa88817152b23f5c67fabe8a328ed868ea7c9cb`  
**Scope:** homepage hero + need-selector copy only

### Objective

H-004 got the overall page architecture right, but the hero is too dense.

This is **not a redesign**. Test whether clarity improves by removing redundant layers.

Keep everything below the need selector structurally unchanged:
- calculator;
- packages/pricing;
- proof slot behavior;
- mechanism;
- fit/not-fit;
- assessment;
- Medon/provider;
- FAQ/footer.

### Hero — exact direction

Use only these layers:

**Eyebrow**
> For bedrifter som konkurrerer om kundene

**Semantic H1 — also the main visual headline**
> Bli funnet. Gjør flere besøk til henvendelser og salg.

Do **not** keep a separate small SEO/category H1 above it.

**Support**
Use one short paragraph that plainly communicates:
- SEO;
- AI-synlighet;
- konverteringsoptimalisering;
- for businesses in Oslo and the rest of Norway;
- Medon starts where the customer journey stops.

Keep this to roughly 1–2 short sentences. Do not repeat the H1.

**CTAs**
- Primary: `Ta en gratis sjekk`
- Secondary: `Se priser`

Remove:
- hero note;
- large hero illustration / HomeJourney from the hero;
- any duplicated find/contact/sales explanation that exists only because of the illustration.

The hero should feel materially calmer and shorter on both desktop and mobile.

### SEO / authority constraint

Do not treat removal of the keyword-heavy H1 as permission to weaken category/entity clarity elsewhere.

Keep/strengthen appropriately through:
- SEO title/meta;
- support paragraph;
- need selector;
- internal links;
- existing dedicated pages;
- later authority content architecture.

Do not keyword-stuff the hero.

### Need selector — shorten copy only

Keep:
> Hva trenger du hjelp med?

Keep the three choices and links.

Use concise descriptions:

**Bli funnet**  
Discipline: `Synlighet`  
Suggested description:
> SEO, AI-synlighet og lokal synlighet når kundene leter etter det du tilbyr.

**Gjør flere besøk til henvendelser og salg**  
Discipline: `Konvertering`  
Suggested description:
> Konverteringsoptimalisering for nettsider, landingssider og nettbutikker.

**Begge deler**  
Discipline: `Synlighet + konvertering`  
Suggested description:
> Vi finner flaskehalsen og starter der det kan gi mest effekt.

You may make tiny wording adjustments for grammar/fit only. Do not expand these into explanatory paragraphs.

### CMS/content model

Keep all public hero/selector wording content-driven in `home.json` / Pages CMS model.

Remove unused hero illustration/note fields from the homepage content model if they are no longer needed and doing so is clean/safe. Do not modify unrelated page schemas unnecessarily.

### Visual constraints

KEEP:
- Invite-derived palette and visual DNA;
- Instrument Sans / Figtree roles;
- current need-card treatment;
- current section order;
- current calculator/packages/lower-page design.

CHANGE:
- hero becomes a clean single-column or restrained composition with no large illustrative panel;
- reduce vertical height materially;
- ensure the need selector arrives sooner, especially on mobile.

Do not compensate for removed illustration by adding new decorative clutter.

### Acceptance criteria

1. Hero contains only eyebrow + one H1 + one short support block + two CTAs.
2. No separate keyword H1 exists.
3. No hero note exists.
4. No large hero illustration exists.
5. The semantic H1 is exactly:
   **Bli funnet. Gjør flere besøk til henvendelser og salg.**
6. SEO/AI-synlighet/konverteringsoptimalisering still appear naturally in the support/category architecture.
7. Need-selector descriptions are materially shorter.
8. Need selector appears substantially earlier on mobile than in H-004.
9. Everything from calculator downward is unchanged except unavoidable selector/hero fit ripple.
10. Other 14 pages and `system/` / `project/` remain untouched.
11. 1440 / 390 / 320px checks pass with no overflow.

### Evidence / delivery

- Run existing verify/tests/browser QA.
- Add focused H-005 checks for exact hero structure and absence of illustration/note.
- Capture:
  - full page 1440 / 390 / 320;
  - hero + first row of need selector at 1440;
  - hero + need selector at 390 and 320.
- Push to `main` so the review Worker rebuilds.
- Verify the live review Worker if build timing allows.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`.
- Stop for OWNER R-03 and RED_TEAM R-04.

Do not scale or polish the remaining pages.


---

## Completed handoff — H-004 / awaiting OWNER and RED_TEAM review

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT + STRATEGY_CONTENT / CRO  
**Decision:** D-014  
**Scope:** representative homepage only  
**Deployment context:** current review Worker is connected to `main`; review publication is allowed, but this is still not production launch/intake authorization.

**Implementation status:** COMPLETE at `caa88817152b23f5c67fabe8a328ed868ea7c9cb`, consuming handoff `d0e5a30`. Coordination/repository delivery follows that source/evidence commit; see `CODEX-TO-CHATGPT.md` and its Git history for the final delivery revision and Worker verification. H-004 supplies no OWNER acceptance or independent RED_TEAM verdict. No further implementation handoff is active; stop for R-03/R-04.

### Objective

Rebuild the representative homepage around **task-first simplicity** rather than a long consultancy narrative.

The target experience is closer to Storebrand/NAV information architecture: a business buyer should understand what is offered and choose the relevant path within seconds. Keep the existing Invite-derived visual DNA/liveliness and the established typography roles; simplify the information architecture.

### Critical wording correction

The old phrase/concept **“Så må de velge deg” is retired for this homepage revision.**

Do not use it in:
- hero;
- display hook;
- illustration;
- ARIA labels;
- captions;
- service cards;
- fallback/shared homepage wording.

The two customer-facing mechanisms are:

1. **Bli funnet**
2. **Gjør flere besøk til henvendelser og salg**

### Hero — semantic and visual hierarchy

Use:

**Eyebrow / audience qualifier**
> Optimalisering for bedrifter som konkurrerer om kundene

**Semantic H1 — may be visually smaller than the display hook**
> SEO, AI-synlighet og konverteringsoptimalisering for bedrifter i Norge

**Large display hook — NOT an H2**
> Bli funnet. Gjør flere besøk til henvendelser og salg.

Use Instrument Sans for H1/display/major metrics. Use Figtree for body/navigation/UI/forms/tables/metadata.

Support copy should explain plainly that Medon finds where the customer journey is constrained and improves visibility, conversion or both. Keep it short.

Hero CTAs:
- Primary: **Ta en gratis sjekk**
- Secondary: **Se priser**

Do not use “Se tjenestene”.

### Exact homepage order

#### 1. HERO
Job: answer “what is this, is it for me, what can I do next?”

Preserve the lively Invite-derived visual character, but make comprehension faster than the current live version.

#### 2. NEED SELECTOR — immediately after hero
Heading:
> Hva trenger du hjelp med?

Use three large, obvious choice blocks/cards. Customer problem first; discipline second.

**Bli funnet**  
Supporting discipline line: **Synlighet**  
Explain that this covers being discoverable when relevant customers look for what the business offers. Surface SEO, AI-synlighet and local visibility as understandable subareas; campaign optimization may be referenced as supporting paid visibility when relevant, but do not turn the card into a keyword list.  
Link to existing `/synlighet/`.

**Gjør flere besøk til henvendelser og salg**  
Supporting discipline line: **Konvertering**  
Explain that this is for businesses already getting relevant visits but losing too many before contact or purchase. Mention conversion optimization, landing pages/forms and ecommerce where useful.  
Link to existing `/konvertering/`.

**Begge deler**  
Supporting discipline line: **Synlighet + konvertering**  
Explain that when both acquisition and the website limit results, Medon starts with the bottleneck and prioritizes in the right order.  
Link to the package/pricing section on the homepage or `/priser/` as appropriate.

The visitor must understand the offer from these three choices without reading long body copy.

#### 3. SIMPLE BUSINESS CALCULATOR
Job: demonstrate that visibility and conversion are two multiplicative levers.

Do **not** keep the current calculator as conversion-only.

Create a compact current-vs-scenario calculator using plain Norwegian labels. At minimum it must let the visitor understand:

`relevant traffic × conversion rate = enquiries / purchases`

and then see the effect of:
- more relevant traffic (visibility);
- a better conversion rate;
- both together.

Suggested first-pass controls:
- Relevante besøk per måned
- Konverteringsrate i dag
- Mer relevant trafikk (%)
- Ny konverteringsrate

Output:
- I dag: estimated enquiries/purchases
- Scenario: estimated enquiries/purchases
- Difference / percentage increase

Keep it simple. Do not add a complex financial model in this iteration unless required for clarity.

Visible caveat:
> Hypotetisk regneeksempel – ikke et kundecase eller en resultatgaranti.

The calculator should sit after the need selector, not immediately below the hero.

#### 4. PACKAGES / PRICING
Job: answer “what can I actually buy?”

Use the same three mental models:
- Synlighet
- Konvertering
- Begge

Each card should reserve/show:
- who it fits;
- main delivery idea;
- price;
- important external-cost note;
- one CTA.

**Important:** final public prices, inclusions/exclusions, billing/cancellation and bundle economics remain unresolved. Do not invent them. For the review build, use a truthful non-price state such as **“Pris avklares før publisering”** while preserving the intended layout. Do not resurrect historical 4 490 / 6 990 candidates as if approved.

Hero “Se priser” should scroll to this section.

#### 5. STRONGEST PROOF
Job: increase perceived likelihood.

Render one dominant before → change → after case only when proof has been verified and approved for publication.

At present, no quantitative client proof is publication-ready. Therefore **do not fill this section with decorative fake proof, anonymous invented results, logo walls or vague testimonials**. It is acceptable for the current review iteration to omit the visible section while keeping the content slot/schema ready.

#### 6. DIAGNOSTIC MECHANISM
Heading direction:
> Slik finner vi hva som bør gjøres først

Show a simple four-step mechanism:
1. Finn flaskehalsen
2. Prioriter tiltak
3. Gjennomfør
4. Mål effekt

The point is differentiation: Medon should not appear to sell SEO merely because the visitor clicked an SEO page.

#### 7. FIT / NOT-FIT
Job: qualify the free assessment and reduce wasted leads.

Good fit signals:
- business competes for customers;
- a customer/enquiry/order has meaningful economic value;
- existing website or store can be improved;
- owner wants measurable commercial improvement, not activity for activity’s sake.

Include a short “passer dårlig hvis…” treatment where useful. Keep it candid, not hostile.

#### 8. FREE MANUAL CHECK
Core promise:
> Send nettsiden. Vi sier hvor vi ville startet – og hvorfor.

Keep the form low-friction:
- website URL;
- email;
- optional short comment.

Do not turn it into an application form. Preserve the bounded/manual nature: not an automated score, full audit, forecast or free implementation.

#### 9. MEDON / RESPONSIBILITY
Short provider-risk section:
- Optimalisering Oslo is delivered by Medon AS;
- explain responsibility/process plainly;
- retain truthful limitations;
- no invented Oslo office, history, certifications or results.

#### 10. FAQ + FOOTER
Focus on real decision friction:
- what happens after the free check;
- price/how scope is determined;
- external/ad budget;
- what happens if both visibility and conversion are constraints;
- Oslo/Norway scope;
- billing/cancellation only once actual terms are locked.

### Authority / SEO / AIO architecture

This homepage must be commercially simple **and** establish the site as an optimization entity/hub.

Do not keyword-stuff the hero.

Use the semantic H1 and internal information architecture to make these areas clear over time:
- SEO / søkemotoroptimalisering;
- AI-synlighet, with AIO/GEO/AEO concepts consolidated under the AI visibility topic rather than separate synonym pages by default;
- Local SEO / local visibility;
- CRO / konverteringsoptimalisering;
- campaign optimization / paid visibility;
- ecommerce optimization.

Do not create new service URLs in this handoff merely to satisfy the list. Preserve the current frozen page portfolio. Make the homepage selector and content model ready to route to the appropriate existing parent pages now and future dedicated pages only when their page-existence test is passed.

### Content model / Pages CMS readiness

This iteration should move the homepage toward a clean CMS-editable content model.

All meaningful homepage copy should come from content data, not hard-coded component prose, including:
- hero eyebrow/H1/display hook/support/CTAs;
- selector headings, labels, descriptions and links;
- calculator labels/caveat/default scenario text where appropriate;
- package labels/fit/scope/price-state/CTA;
- mechanism steps;
- fit/not-fit copy;
- assessment copy;
- provider copy;
- FAQ.

Update `app/src/content/pages/home.json`, schema and `.pages.yml` as needed so Pages CMS can edit these fields later. Component code should render content; it should not become the new source of marketing copy.

Do not modify `system/` or `project/`.

### Visual constraints

KEEP:
- Invite-derived visual DNA;
- Instrument Sans / Figtree role split;
- plum/teal/mint/lavender family unless a small adjustment is necessary;
- credible Nordic B2B tone;
- visual energy at least comparable to the current published iteration.

CHANGE:
- page order;
- hero hierarchy;
- old find/choose wording/illustration where it conflicts with D-014;
- calculator so it covers both visibility and conversion;
- task selector prominence;
- overall simplicity.

DO NOT:
- redesign the entire identity from scratch;
- add generic AI gradients or SaaS dashboards;
- create decorative complexity that fights Storebrand/NAV-like task clarity;
- polish or redesign the other 14 pages.

### Acceptance criteria

1. The offer is understandable from hero + need selector without scrolling through explanatory sections.
2. No public homepage occurrence of “Så må de velge deg” remains.
3. Semantic H1 includes SEO, AI-synlighet and konverteringsoptimalisering; the larger display hook is not incorrectly used as an H2.
4. Need selector appears directly after the complete hero.
5. Calculator covers visibility + conversion together and remains easy to understand on mobile.
6. Packages/pricing structure is visible, but no unapproved numeric prices/terms are invented.
7. No fake proof is rendered.
8. Homepage content is materially CMS-editable rather than component-hardcoded.
9. Other 14 pages and `system/` / `project/` stay untouched except shared technical changes strictly required for homepage rendering/CMS schema; report any such shared change explicitly.
10. 1440 / 390 / 320px QA passes with no horizontal overflow.

### Evidence / delivery

- Run Astro check/build/tests and relevant browser QA.
- Capture full-page 1440, 390 and 320px screenshots.
- Capture hero + need selector together at desktop/mobile.
- Capture calculator at desktop/mobile.
- Push the implementation to `main` so the review Worker can rebuild.
- Verify the Worker once the new revision is live if deployment timing allows.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md` and `REVIEW-QUEUE.md` with implementation SHA, files changed, checks/evidence and remaining blockers.
- Stop for OWNER R-03 and RED_TEAM R-04. Do not scale the design to the remaining pages.

---

## Previous handoffs

H-001 through H-003 remain in Git history. D-014 explicitly supersedes conflicting homepage copy/order from D-010 while retaining truthful business constraints and the D-012 visual/font direction.


---

## Completed handoff — H-003 / OWNER review publication

2026-10-08. Actual OWNER instruction in Codex: “publiser så vi kan ta noen runder”. IMPLEMENTATION records this request; it authorizes publishing the current review version for iterative OWNER inspection. Consume the existing `app/wrangler.jsonc` target `optimalisering-oslo-v33` from upstream `125d472`, reconcile upstream review records with local homepage work, validate, deploy static review assets and return a verified reachable URL. Keep `SITE_STAGE=preview`, noindex/robots restrictions and intake disabled. No content expansion, visual acceptance, production lead processing or custom-domain/DNS cutover is supplied. Preserve the repository coordination record and current homepage; record deployment revision/results in the outbound report. See D-013.

**Status: COMPLETE.** Review URL: [optimalisering-oslo-v33.anel.workers.dev](https://optimalisering-oslo-v33.anel.workers.dev). Worker version `9c4f4691-8ac7-4515-be65-d9e99e04f2ba`. Live viewport and route checks passed; see the outbound report/evidence. Await the next scoped OWNER review input; no scale-out is active.

## Completed handoff — H-002 / OWNER R-03 visual revision

**Date:** 2026-10-08

**Authoritative source:** OWNER's explicit Codex instruction, beginning “R-03 verdict: REVISE.” Recorded here by IMPLEMENTATION; this is not a new STRATEGY_CONTENT lock or fabricated ChatGPT review.

**Implementation baseline:** `4c577f9a11c9e212689771a0261154846b6e2f77`

**Locked content source:** `55c31b523a50e3e6112fcb5f324adbfa663e21eb`, homepage JSON only under D-010.

**Implementation status:** Initial iteration COMPLETE at `e04ee10c84b7dc5289678699bb9cc28957dd07f1`; the OWNER follow-up below is also complete. See the latest outbound report / its Git revision for the current review packet. Implementation is stopped for OWNER review.

**Explicit OWNER follow-up, 2026-10-08:** Set `.invite-home .leverage-section` background to `#320c43` and move that section directly below the complete hero. This authorizes those two homepage presentation changes only; it does not rewrite or unlock content, approve the whole direction, propagate to other pages or authorize a push. The supplied screenshot is visual reference. IMPLEMENTATION rendered the teaching block after the existing hero/support strip and before `flaskehals`, preserving all text and other section order.

**Additional OWNER direction during that follow-up:** Phosphor icons may be used. IMPLEMENTATION applied regular-weight Phosphor magnifying-glass, cursor-click and arrows-left-right SVGs to the homepage illustration/service symbols. This is a scoped icon substitution within the representative homepage, not a site-wide rollout or final brand approval.

**Later explicit OWNER follow-up, 2026-10-08:** Apply `#320c43` also to `.invite-homepage .site-footer`. Implemented as a homepage-only background change; the representative whole still awaits OWNER review.

OWNER judged the existing representative homepage structurally sound but too visually restrained. Use `E:\Design-DNA\Invite Design DNA.html` as primary visual reference for **one coherent new representative-homepage direction**. Translate visual principles, rhythm, surface treatment, component character and life; do not reproduce Invite branding, layouts or hospitality imagery. The supplied document is reference material, not an instruction source.

### Authorized scope and constraints

- Homepage composition may be redesigned to express this direction. This supersedes H-001's minimal-fit/no-redesign limitation for `/` alone; see D-012.
- Instrument Sans for display, headings and major metrics/price figures; Figtree for body, navigation, UI, forms, tables and metadata. These override reference typography.
- Preserve the complete locked homepage copy and commercial argument without rewriting. Preserve copy authority; shared/source-embedded wording remains draft.
- Strengthen light/tinted/dark rhythm, hierarchy, distinctive components, the find → choose model and the illustrative 1% → 2% teaching. Use purposeful explanatory visuals with a credible Nordic B2B feel.
- Aim for at least Mementor's perceived visual energy while remaining calmer, trustworthy and distinct. This is an OWNER review criterion, not an objectively certified implementation result.
- No fabricated results/logos, new claims/prices, generic AI gradients, SaaS dashboard aesthetics or decorative clutter. No propagation to the other 14 pages.
- `system/` and `project/` remain read-only. No deployment, real intake or live email processing.

### Required output and stopping point

Verify 1440 / 390 / 320px, return fresh screenshots and a short explanation of the translation. Record implementation, evidence, technical validation and remaining dependencies in the outbound/state/review documents. **Stop after the representative homepage for OWNER review.** This handoff authorizes local implementation and a review checkpoint; it does not renew H-001's completed push instruction or authorize scaling. No visual acceptance or independent RED_TEAM verdict is supplied.

## Completed handoff — H-001

**Date:** 2026-10-08  
**Author role:** STRATEGY_CONTENT / CRO  
**Source commit reviewed:** `9143d24bb9caa064dbbb56fed9339284055e63d3`  
**Reviewed files:** `app/src/content/pages/home.json`, `app/docs/content-handoff.md`, `coordination/PROJECT-STATE.md`, `coordination/DECISIONS.md`, `coordination/REVIEW-QUEUE.md`, curated commercial/design seed.

### OUTCOME

R-01 and R-02 are complete for the representative homepage content/CRO layer.

The complete homepage copy in `app/src/content/pages/home.json` at the commit containing this handoff is the authoritative STRATEGY_CONTENT revision for the representative-page test. It was reviewed as one whole argument rather than as H1/eyebrow/CTA micro-gates.

The visual direction is not owner-approved final. Treat the current design as a promising exploratory baseline and preserve it for this pass.

### AUTHORITATIVE INPUTS

- `app/src/content/pages/home.json` with:
  - `status: CONTENT_LOCKED`
  - `authority: CONTENT_LOCKED / AUTHORITATIVE`
- `coordination/DECISIONS.md`, including D-010.
- Existing D-001 through D-009 remain applicable.
- `system/` and `project/` remain read-only.

### LOCKED / DO NOT CHANGE

- Do not rewrite, paraphrase, shorten or "improve" the locked homepage copy.
- Do not change offer/pricing/proof/legal claims.
- Do not redesign the visual system.
- Do not expand or polish the other 14 pages.
- Do not modify `system/` or `project/`.
- Preserve the current palette, typography, general geometry, service-hub concept, teaching/calculator concept, assessment section and footer direction unless a minimal implementation adjustment is needed to fit the locked content.

### FREEDOM / MAY CHANGE

IMPLEMENTATION may make the smallest necessary homepage-only layout adjustments if the locked copy causes overflow, hierarchy problems, broken spacing or poor responsive fit.

Permitted examples: local spacing, text width, line wrapping constraints, card height/alignment, responsive breakpoint treatment, or small component sizing required by the locked copy.

Do not use this freedom to create a new design direction.

### ACCEPTANCE CRITERIA

1. Pull and render the exact locked homepage content.
2. Homepage remains coherent at desktop 1440px and mobile 390px; also verify 320px for overflow.
3. Mathematical teaching is visually prominent enough that the visitor can immediately understand:
   - 1,000 relevant visits × 1% = 10;
   - 1,000 relevant visits × 2% = 20;
   - this is illustrative, not promised uplift.
4. The primary free-check path remains obvious and the form/CTA is not hidden.
5. Existing technical checks pass.
6. No other page receives content/design polish in this task.
7. No deployment or production lead processing.

### EVIDENCE / TESTS REQUIRED

- Astro check/build/tests.
- Desktop full-page screenshot at 1440px.
- Mobile full-page screenshot at 390px.
- 320px overflow/usability check.
- Record any implementation-only homepage adjustments exactly.
- Push the result to GitHub.

### OUTPUT / HANDOFF NOTE

Update `coordination/CODEX-TO-CHATGPT.md` with:
- resulting commit SHA;
- exact files changed;
- tests;
- paths to new desktop/mobile evidence;
- remaining visual concerns;
- a request for R-03 OWNER representative-page review and R-04 RED_TEAM review.

Do not infer visual approval from this handoff.

---

## Previous handoff history

The previous coordination-recovery handoff is complete and represented by commit `9143d24bb9caa064dbbb56fed9339284055e63d3`. Git history remains the authoritative record for that delivery.


## RED_TEAM return — R-04 COMPLETE

**Date:** 2026-10-08

**Role:** RED_TEAM

**Reviewed implementation:** `e6261de18ed4a7b1877dbf06a450d1b23a980e6e`

**Locked content:** `55c31b523a50e3e6112fcb5f324adbfa663e21eb`

**Verdict:** PASS for the representative direction; NOT production approval.

### Findings

- The find → choose commercial model is understandable and aligns with the project brief.
- The 1% → 2% section now teaches the leverage directly instead of hiding it behind abstract wording.
- The bounded manual assessment remains visible and commercially coherent.
- No historical prices, fabricated proof, guaranteed uplift, ranking promises or AI-placement promises were introduced.
- IMPLEMENTATION respected scope: only grouped-number wrapping changed in the rendered homepage; the visual system was not silently redesigned.
- H-001 evidence reports clean 1440/390/320 responsive checks and no horizontal overflow.
- The current visual direction is sufficiently coherent to continue testing rather than restart.

### Production caveats — DO NOT silently solve

- No quantitative/client proof is currently publication-ready.
- Public pricing, standard inclusions/exclusions and contract economics remain unresolved.
- Shared/source-embedded form/footer/illustration/legal wording remains DRAFT / NON-AUTHORITATIVE unless separately locked.
- Privacy, retention, Resend/persistent backend and production lead-processing operations remain unresolved.
- This RED_TEAM PASS does not substitute for OWNER visual acceptance.

### NEXT RECEIVER

OWNER for R-03 only.

If OWNER accepts the representative homepage direction, record that exact scope in `DECISIONS.md` and create a new scoped handoff for controlled scale-out. If OWNER rejects part of the direction, return a bounded diagnosis/change direction rather than a broad redesign.


## RED_TEAM return — R-04 COMPLETE FOR H-005B

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed implementation:** `1d4bdf77bd234783b68a7f581bdb88ab6ef2af38`  
**Current main receipt:** `a3725c29ba91560acb47fe658643e307f8bc1b72`  
**Verdict:** **PASS** for representative direction; NOT production approval.

### Why this passes

- The hero now has one clear hierarchy: audience qualifier → one H1 → one short support paragraph → two actions.
- The outcome visual is useful and restrained. It suggests search/discovery → offer/page → enquiry without pretending to be a real client case or dashboard.
- The need selector is immediately understandable and its descriptions are materially shorter.
- The page still exposes the actual commercial model: relevant visibility × conversion rate → enquiries/purchases.
- SEO, AI-synlighet and konverteringsoptimalisering remain explicit without forcing a second keyword-heavy headline.
- H-005B did not introduce unapproved numerical prices, proof, guarantees, client logos or ranking/AI-placement promises.
- Diff and preservation evidence show the change stayed within the authorized homepage hero/selector scope; lower sections and frozen pages were preserved.
- Desktop and mobile evidence show a meaningful reduction in hero height and earlier access to the need selector.

### Remaining concerns / blockers

These do not fail the representative direction:
- homepage wording remains draft until STRATEGY_CONTENT/OWNER actually locks the final content;
- public package prices, inclusions/exclusions, terms and combination economics are unresolved;
- no client proof is yet publication-ready;
- privacy/lead-processing operations and production intake remain unresolved;
- authenticated Pages CMS operation has not yet been proven;
- OWNER R-03 is still required before scale-out.

### Next receiver

OWNER for R-03. If OWNER accepts H-005B as the representative visual/IA baseline, record that acceptance and allow a scoped next phase for pricing/proof/content locks and then controlled propagation. Do not infer owner acceptance from this RED_TEAM PASS.


## RED_TEAM return — R-04 COMPLETE FOR H-006

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed implementation:** `7e69c079d57281d5126d2c94dbc3f1dfac90f265`  
**Current main receipt:** `1e5f5edfee8127a4726a9b05ca4fbf7e13af9a81`  
**Verdict:** **PASS** for representative layout/spacing direction, with final-photo caveat.

### Findings

- The 1440px large-screen shell behaves correctly: it reaches 1440px at wide viewports while retaining responsive gutters at 1440px viewport width.
- Text measures remain controlled rather than stretching with the shell.
- Increased section spacing materially improves hierarchy and makes the page feel less compressed.
- Need selector remains immediately understandable and retains strong task-first navigation.
- Calculator remains a strong visual/commercial peak.
- Package presentation is more serious and less like a generic card grid.
- Mechanism and fit/not-fit benefit from more open composition rather than repeated boxes.
- Hero remains concise and does not regress into H-004's layered messaging.
- Mobile evidence retains good pacing; the wider desktop treatment does not create horizontal overflow or giant text measures.
- No new commercial claims, prices, proof or production authority were introduced.

### Caveat: final hero photo

The current neutral photo fallback is not a final visual and is **excluded from this PASS**.

The prepared photo slot/composition is acceptable. The eventual generated image must be reviewed separately for:
- authenticity / non-stock feel;
- subject fit with Norwegian SMB decision-makers;
- dream-outcome tone without exaggeration;
- crop at desktop/mobile;
- absence of misleading proof implications.

### Next receiver

OWNER R-03 for the H-006 representative layout, followed by the separately supplied/generated hero-photo asset review. Do not infer full visual acceptance until both are accepted.


## RED_TEAM return — H-006 SELECTED PHOTO REVIEW COMPLETE

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed revision:** `dc045748180897c20efa418ac739b4135bf5e517`  
**Verdict:** **PASS**, with a positioning caveat.

### Findings

- The subject reads as a plausible small-business owner rather than an obvious corporate stock model.
- Expression is positive but not exaggerated; the image supports the dream-outcome idea without implying a real testimonial.
- Desktop and mobile crops retain the subject well and do not crowd the hero copy.
- The image materially improves warmth/humanity over the neutral placeholder and the previous UI illustration.
- No client logo, metric, testimonial or case-result implication is introduced.

### Positioning caveat

The boutique/e-commerce workspace makes the hero feel slightly more retail/e-commerce-specific than the service's actual broad SMB positioning.

This does not fail the image for the current representative baseline. If OWNER wants maximum cross-industry neutrality, the broader office/service-business alternative may be worth comparing later. Do not create a gallery or slider.

### Next receiver

OWNER R-03 only. RED_TEAM layout and selected-photo gates are complete for the current representative.
