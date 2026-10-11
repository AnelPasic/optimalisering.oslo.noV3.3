# H-017C - Publish verified proof/cases

Date: 2026-10-11
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED FOR IMPLEMENTATION REVIEW

## Objective

Publish the two verified case records already curated in the proof registry without exaggeration:

1. Oslo Privatklinikk - broad homepage proof
2. Nysta - conversion/ecommerce proof on /konvertering/

Do not create a logo wall. Do not publish raw evidence dumps. Use one dominant result per placement with visible context and caveat.

## 1. Public case locks already written to proof records

### Oslo Privatklinikk

Public dominant metric:
- Kontaktskjemaer
- 89
- 128
- +44 %

Comparable periods:
- mai-september 2025
- mai-september 2026

Work:
- Google Ads + konverteringsoptimalisering.

Public limitation:
- Skjemaene er totalt antall registrerte henvendelser på nettsiden og kan ikke alle tilskrives Google Ads.
- Google Ads-forbruket var 7 % lavere i samme periode.

Do not call the 448 kr figure a clean Ads CPL in public copy. It is derived from total forms and Ads spend and has an attribution caveat.

### Nysta

Public dominant metric:
- Fullført checkout
- 7,1 %
- 43,6 %
- +36,5 prosentpoeng

Comparable periods:
- 30 dager før
- første 30 dager etter

Work:
- Konverteringsoptimalisering av checkout og innføring av Vipps/MobilePay.

Public limitation:
- Målt blant brukere som startet checkout, ikke alle besøkende.
- Flere endringer ble gjort i samme periode, så effekten kan ikke tilskrives ett tiltak alene.
- Neste 30-dagersperiode var 58,1 %.

Do not simplify this into a guaranteed CRO multiplier.

## 2. Homepage placement

Use only Oslo Privatklinikk on the homepage.

Existing location:
- after packages/pricing;
- before mechanism/fit.

The homepage proof section should feel like a strong evidence block, not a generic info card.

Required hierarchy:
1. eyebrow: Dokumentert resultat
2. heading: 44 % flere registrerte kontaktskjemaer
3. client name: Oslo Privatklinikk
4. large before/after comparison: 89 -> 128
5. period labels
6. work: Google Ads + konverteringsoptimalisering
7. small context/caveat text
8. optional small support fact: "Google Ads-forbruket var 7 % lavere i samme periode."

No CTA is required inside the proof block.

Do not add logos unless OWNER later supplies/approves them.

## 3. /konvertering/ placement

Add a reusable proof block using Nysta.

Placement:
- after the page has explained the conversion mechanism / customer journey;
- before the pricing bridge or final conversion CTA;
- it should function as proof of the page's main promise, not as a footer afterthought.

Required hierarchy:
1. eyebrow: Dokumentert resultat
2. heading: Fra 7,1 % til 43,6 % fullført checkout
3. client name: Nysta
4. large before/after comparison
5. periods
6. work: Konverteringsoptimalisering av checkout og innføring av Vipps/MobilePay
7. caveat in readable small text
8. optional support: "Neste 30-dagersperiode var 58,1 %."

Do not mention historical Strikka branding.

## 4. Reusable proof component

Refactor HomeProof only as much as needed to create one reusable proof presentation.

Requirements:
- one content-safe renderer using getPublishableCases;
- no bypass of proof publication gates;
- supports one dominant case per placement;
- semantic HTML;
- responsive;
- editable labels/headline/selected case through the page CMS configuration where practical;
- client name comes from proof registry;
- source/provenance details stay in registry, not dumped publicly.

Do not weaken the existing getPublishableCases gate.

## 5. CMS

Pages CMS should allow OWNER to:
- choose the published case ID from the proof registry for each supported page placement;
- edit eyebrow;
- edit heading;
- edit before/after/work labels.

Do not allow ordinary CMS editing to:
- change permission state;
- change publicationStatus;
- change strategyReviewStatus;
- bypass comparable-period requirement;
- bypass proof publicationApproved.

The proof registry remains internal/guarded.

## 6. Visual direction

Use current site DNA:
- Instrument Sans for major metric/result;
- Figtree for explanation;
- current green/cream/plum palette;
- generous whitespace;
- one result large enough to scan;
- before/after should be obvious in under 3 seconds.

Avoid:
- dashboard look;
- trophy/badge graphics;
- fake screenshots;
- testimonial quotation marks;
- decorative logo wall;
- confetti;
- huge percentage with no context.

A good pattern:
- left: client/context + work
- right: before -> after / result
or the reverse if it fits the current section rhythm.

Use plain text arrow style per COPY-STYLE: "->", not Unicode arrow characters.

## 7. No standalone /resultater/ page yet

Do not create a new results page in H-017C.

First prove:
- homepage case;
- /konvertering/ case;
- visual hierarchy;
- caveat readability.

A dedicated case/results page can be added later if the two placements work.

## 8. Preserve

Do not change:
- package prices/copy;
- direct order;
- CMS H-017B architecture;
- service hero artwork;
- homepage hero/selector/calculator;
- /synlighet/ content;
- intake feature flags;
- noindex;
- English scaffolding.

## 9. QA

Required:
- full verify
- proof publication gate tests
- one test proving incomplete/non-approved proof cannot render
- one test proving homepage selects only Oslo Privatklinikk
- one test proving /konvertering/ selects only Nysta
- COPY-STYLE QA
- 1440 / 390 / 320 screenshots for both placements
- no layout overflow
- no hidden proof leakage from raw evidenceMetrics

## Acceptance

1. Oslo Privatklinikk is visible on homepage with exact locked public claim and caveat.
2. Nysta is visible on /konvertering/ with exact locked public claim and caveat.
3. No other evidence metrics are rendered.
4. No causal claim exceeds the evidence.
5. No proof gate is weakened.
6. Both blocks are visually strong and readable.
7. CMS can edit placement headings/labels and case selection without changing registry approval state.
8. All existing commercial/intake safeguards remain.

Stop for OWNER + STRATEGY_CONTENT proof review.
