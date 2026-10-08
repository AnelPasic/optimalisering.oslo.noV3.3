# ChatGPT to Codex

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
