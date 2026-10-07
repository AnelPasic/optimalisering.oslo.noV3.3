# Content handoff — Optimalisering Oslo

## OUTCOME

15 complete Norwegian page drafts cover every `BUILD_NOW` row in the complete seed portfolio. They route buyers to Synlighet, Konvertering or both and use the same bounded manual gratis sjekk. Content lives in `app/src/content/pages/*.json` as semantic fields without visual component instructions.

State: `DRAFT_CONTENT / REVIEW_REQUIRED`. These are reviewable local drafts, not owner-approved locks or publication permission. Implementation may render them in the protected local preview. Strategy/Content changed no file in `system/` or `project/`.

## AUTHORITATIVE INPUTS

- Latest owner task: build under `/app/`, leaving `/system/` and `/project/` unchanged.
- System: `START-HERE.md`, `WORKFLOW-v3.3.md`, `governance/ROLE-OWNERSHIP.md`, `content/CONTENT-OPERATING-MODEL.md`, `content/content-copy-standard.md`, `content/PAGE-CONTRACT.md`, `content/HEADING-ONLY-STORY.md` under `system/medon-web-system-v3.3/`.
- Curated seed: `README-FIRST.md`, `PROJECT-BRIEF.md`, `COMMERCIAL-TRUTH.md`, complete `PAGE-PORTFOLIO.csv`, `COPY-SEEDS.md`, `PROOF-STATUS.md`, `PROOF-REGISTRY.csv`, `DESIGN-PRIORS.md` under `project/optimalisering-oslo-v3.3-pilot-seed/`.
- New owner integration direction relayed by Implementation: Resend notifications and server-side local storage of submissions and conversion/source data until a shared system is chosen. Source tags are limited to landing path, referring origin and UTM values associated with a submission. No persistent anonymous IDs or browser storage of submitted personal data.

No old project history, public client names, historic price locks, fabricated offices or inherited results were used. Copy seeds were optional candidates.

## LOCKED / DO NOT CHANGE

- Medon AS owns and delivers Optimalisering Oslo. Norway first; other Nordic businesses remain eligible. No separate legal business or Oslo office is established by the brand name.
- Synlighet and Konvertering are the two primary needs. The combination path is `/priser/#begge`; no separate combination URL.
- The free check is bounded and manual: short reasoned guidance on what Medon would start with, why, and whether visibility, conversion or both should come first.
- No automatic score, full audit, complete issue list, forecast, free implementation or promised turnaround.
- Recurring work means investigating, performing agreed work and following effects. Exact boundaries, deliverables and contract terms remain unresolved.
- Main website/store is the standard starting scope. Extra sites/landing pages are conditional. Ad budget and applicable external platform costs are separate unless expressly included.
- No historic prices, discounts, hour quotas, onboarding economics, client logos, guarantees or fake urgency.
- Arithmetic is explicitly illustrative. It describes units and dependencies, never results or expected uplift.
- SEO and AI are distinct. Rankings, AI mentions, source citations, visits and customers are different observations. No current platform-specific promises.
- Draft content does not authorize production collection, deployment or publication.

## FREEDOM / MAY CHANGE

Implementation may adapt semantic structure, section layout, responsive fit and visual presentation while preserving meaning and source boundaries. Fix typos. Do not turn draft language into approved prices, terms, proofs or timing promises. Material copy changes should be reviewed as a coherent page or offer, not as individual line approvals.

## SHARED WORDING

Navigation: `Synlighet`, `Konvertering`, `Priser`, `Innsikt`, `Om`, `Kontakt`. Primary CTA: `Ta en gratis sjekk` → `/vurdering/`. Provider: `Optimalisering Oslo er en tjeneste fra Medon AS.` Footer links: `Personvern`, `Vilkår`.

Form wording:

- `Nettside eller nettbutikk` — required URL; placeholder `https://bedriften.no`.
- `E-post for bedriften` — required email; placeholder `deg@bedriften.no`. Do not infer eligibility from the email domain.
- `Hva ønsker du hjelp med?` — optional. Options: `Usikker – hjelp meg å finne starten`, `Bli funnet av relevante kunder`, `Flere relevante henvendelser`, `Flere nyttige kjøp`, `Et annet spørsmål`.
- `Kort melding` — optional. Helper: `Fortell gjerne hva du ønsker flere av, eller hva du er usikker på.`
- Shared helper: `Ikke send innlogging, sensitive opplysninger eller personopplysninger om andre.`
- Submit: `Send nettsiden`.
- Privacy link in preview: `Les personvernutkastet`. Before production, link to finalized information about actual processing.
- URL validation: `Oppgi en gyldig nettadresse som begynner med https:// eller http://.`
- Email validation: `Oppgi en gyldig e-postadresse.`
- Submission error: `Innsendingen kunne ikke registreres. Prøv igjen.`
- Success wording must state only what the server verified. Identify local tests as local tests; do not claim inbox delivery or human review.

Do not require name, phone, company size, budget or login. No marketing subscription or tracking consent was authorized. Do not invent a checkbox as a substitute for resolving actual processing requirements.

Suggested preview banner: `Lokal forhåndsvisning · innhold til gjennomgang`. Keep preview indexing and accidental production publication blocked.

## PAGE CONTRACTS / CONTENT REASONING

Each JSON contains the complete heading-only story, section order, answers, internal routes and metadata. These compact briefs document page job, information gain and hook candidates. Shared primary CTA applies unless stated otherwise. Claims use the seed and cautious explanatory reasoning; no approved quantitative proof IDs are available.

| Route | Audience and page job | Information gain / chosen angle | Three hook candidates |
| --- | --- | --- | --- |
| `/` | Owner arriving by direct/search/referral; understand two limiting steps and provider. | Find/choose distinction; illustrative traffic × conversion; concrete manual check. Chosen: whole customer path. | De rette må finne deg. Så må de velge deg. / Hvor stopper veien til kunde? / Gjør neste prioritering tydeligere. |
| `/synlighet/` | Owner with visibility need; route to SEO, AI or conversion. | Brand vs solution discovery; SEO/AI boundaries; relevant vs raw traffic. Chosen: relevant discovery. | Du skal bli funnet av folk som kan bli kunder. / De søker etter løsningen. Finner de deg? / Synlighet begynner med riktig behov. |
| `/konvertering/` | Owner with relevant visits; evaluate friction before useful action. | Offer/form/purchase hindrances; qualified enquiries; purchase economics. Chosen: simpler customer choice. | Gjør det enklere å velge deg. / Hvor stopper interessen? / Nettsiden skal hjelpe kunden videre. |
| `/seo/` | Buyer selecting SEO help; understand investigation. | Search need → page → action; consolidation rather than keyword proliferation; outcome boundaries. Chosen: relevant searches and clear answers. | Bli funnet når kunden leter etter det du tilbyr. / Et relevant søk trenger en tydelig side. / Du trenger nyttige besøk, ikke bare flere søkeord. |
| `/ai-synlighet/` | Buyer investigating AI representation; understand uncertainty. | Mention/citation/visit/customer distinction; observation limits; merge acronyms. Chosen: correct factual identity and offer. | Gjør det tydelig hvem du er og hva du tilbyr. / En AI-omtale er ikke det samme som en kunde. / Start med informasjonen kunden trenger. |
| `/nettbutikkoptimalisering/` | Store owner; select across catalog-to-order journey. | Discover/choose/order/economics; cart as middle step; operational constraints. Chosen: completed purchase with value. | Fra et produkt kunden finner til en bestilling som er verdt noe. / Hvor stopper veien til kjøp? / En handlekurv er ikke en bestilling. |
| `/priser/` | Buyer comparing one service, both or custom scope. | Fit by bottleneck; main-site vs extra scope; external costs. Chosen: scope before usable quote. | Riktig hjelp begynner med riktig omfang. / Velg etter behovet på nettsiden. / Hva trenger bedriften først? |
| `/vurdering/` | Buyer requesting a check; understand inputs and limits. | URL/email only; optional need/message; no access requirement; no score/timing. Chosen: small input, start direction. | Send en lenke. Finn et sted å begynne. / En gratis sjekk. En tydelig start. / Hva ville vi startet med? |
| `/innsikt/hva-bor-optimaliseres-forst/` | Owner choosing a first investigation. | Ordered questions; hypothetical cases; unit-correct math; paid speed and data limits. Chosen: constraint before channel. | Hva bør du optimalisere først? / Begynn der veien til kunde stopper. / Et bedre første spørsmål gir en bedre prioritering. |
| `/innsikt/male-effekt-av-optimalisering/` | Owner judging work before purchase or during service. | Three metric levels; qualification vs store economics; numerator/denominator; attribution limits. Chosen: value beyond a graph. | En bedre graf er ikke hele svaret. / Hva betyr forbedringen for bedriften? / Mål handlingen og verdien av den. |

Utility contracts:

- `/om/`: identify Medon and responsibility; prioritization and market eligibility. No unapproved biographies, history, results or offices.
- `/kontakt/`: route other questions through the same UI without invented contact details. CTA: `Gå til skjemaet` → `/vurdering/#skjema`.
- `/personvern/`: conspicuously incomplete draft reflecting chosen integration direction and actual open questions. No generic GDPR declaration.
- `/vilkar/`: incomplete overview of what a real agreement must resolve. No billing, binding, cancellation, payment deadlines or refund policy.
- `/innsikt/`: navigate the two distinct guides. No fake article collection or blog cadence.

Merged combination/acronym/enquiry pages are not separate routes. Later landing-page/case/localized pages and disallowed city grids/internal wrong-job terms are not built. These routes implement portfolio candidates locally, not final public URL approval.

## PROOF / CERTAINTY MAP

Confirmed project facts: provider, two service needs, combination, recurring model, bounded check, main-site scope, external-cost principle and outcome direction.

Reasoned guidance: diagnostic questions, possible friction, hypothetical situations, metric distinctions and comparison limits. None proves that a prospect has a problem or will get uplift.

P001–P005 lack public wording/permission clearance. P101–P105 are not publishable quantitative proof. None is used. No client is named. Performance figures appear only in explicitly illustrative arithmetic.

No external SERP/platform research was done in this pass. Current capabilities, actual AI citations, customer demand and external corroboration are not presented as verified. Live overlap against ChatGPTAds, actual information-gain evidence and current search/platform claims still require review before publication. Drafts maintain distinct roles and avoid platform-specific promises.

## OPEN PUBLICATION DEPENDENCIES

- Coherent owner/content review and content lock, especially representative homepage, offer and service hierarchy interpretation.
- Final standard scope, inclusions/exclusions and public prices. Historic price economics are deliberately absent.
- Billing, commitment, cancellation and exact external-cost wording; final legal terms.
- Resend recipient, verified sender/domain and live inbox delivery; storage access, operating environment and future shared-system handoff.
- Privacy: purpose, lawful basis, controller contact, retention/deletion, actual locations/transfers, processor arrangements, recipients and rights handling.
- Stored URL/referrer/UTM information must exclude unnecessary personal data. Do not add persistent anonymous IDs or browser storage of submitted personal data.
- Verified direct contact details, if desired.
- This content pass documents no production processing, inbox receipt, attribution accuracy or deployment readiness.

## ACCEPTANCE CRITERIA / EVIDENCE

Every BUILD_NOW route must render complete meaningful content. Draft state and indexing/deployment safeguards must remain in the preview. Required form inputs stay minimal. Server results determine success wording. Links must resolve, including `/priser/#begge` and `/vurdering/#skjema`. Source boundaries, illustrative examples and distinct roles must survive rendering.

Content validation checks JSON syntax/schema, 15 distinct slugs, coverage against the full CSV, section IDs, internal links and absence of forbidden price/proof artifacts. Build/browser/responsive/API verification belongs to Implementation. Technical success does not resolve commercial/legal dependencies.

Strategy/Content validation completed: all 15 JSON files parsed with Node, required semantic fields/state/kind and section structure passed, 15 distinct slugs matched all 15 BUILD_NOW rows, all 80 internal links and referenced section anchors resolved, and historic price/client-proof artifact scans passed. Build, browser rendering and actual form delivery were not checked by this role.

## OUTPUT / HANDOFF NOTE

15 page JSON drafts and this document only. Homepage was delivered first for the representative composition. Delivery does not imply owner approval. Other pages extend distinct jobs rather than repeat a sales template under keywords or city names.
