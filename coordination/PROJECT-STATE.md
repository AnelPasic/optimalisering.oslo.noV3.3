# Project state

Updated: 2026-10-08. Owner: Medon AS. Implementation repository: AnelPasic/optimalisering.oslo.noV3.3.

**State: H-006 IMPLEMENTED AT 7e69c079d57281d5126d2c94dbc3f1dfac90f265; STOP FOR OWNER R-03 AND FRESH FORMAL RED_TEAM R-04; ALL OTHER PAGES FROZEN.** D-018 visual polish preserves H-005B copy/IA, widens the shell, adds air and calmer hierarchy, and prepares a customer-photo composition. Final generated asset is not yet supplied. D-017 remains the genuine historical H-005B PASS, not approval of H-006. No further implementation handoff is active.

Original exploratory implementation: `a98dbaefbb10a9039c9b025e5c3907e83f24de8b`, pushed to `origin/main` on 2026-10-08. The coordination/draft-label revision follows that commit; use this file's Git history for its exact SHA. A push permits repository inspection; it does not authorize publication or live processing.

H-006 current web review: [V3.3 preview](https://optimalisering-oslo-v33.anel.workers.dev), source delivery **df27146cd8a0d42d33bc71cdb8f4487164b9145a**, implementation **7e69c079d57281d5126d2c94dbc3f1dfac90f265**, verified Worker version **5add393e-ceb4-4a05-b03c-0c1879b27216**. Native build succeeded. Live focused 1440/390/320/1920px plus 901px wrapping, eight screenshots, all 15 HTML/build comparisons, CSS/fallback equivalence and preview/disabled-intake checks pass. Separate live evidence is in coordination/evidence/h006-live/. Final generated photo is pending; preview fallback is published. This following receipt-only revision changes no website assets; use Git history for its own SHA. IMPLEMENTATION is stopped for OWNER R-03 and fresh formal RED_TEAM R-04.

Historical publication H-003 / D-013: [V3.3 review target](https://optimalisering-oslo-v33.anel.workers.dev), Worker version `9c4f4691-8ac7-4515-be65-d9e99e04f2ba`. Live 1440/390/320px and all 15 routes are verified in `coordination/evidence/h003-publication/`. Static frontend only; noindex and intake-disabled state remain. See the latest outbound report for the exact delivery Git revision. This OWNER-requested web review is distinct from production launch or representative acceptance.

Historical H-005B web review: [V3.3 preview](https://optimalisering-oslo-v33.anel.workers.dev), source delivery 7b800ceb5ae787638ce113ab1a885a600c13dbaa, verified Worker version **f62c33fe-6391-4fae-a96b-d26922ae1c91**. Native build succeeded; live 1440/390/320px checks, six captures, lower-page preservation, 15 HTML/build comparisons and preview/disabled-intake checks pass. Separate live evidence is in coordination/evidence/h005b-live/. The following receipt-only revision changes no website assets; use Git history for its own SHA. Subsequent formal H-005B RED_TEAM PASS is recorded under D-017; H-006 needs fresh review.

Historical H-004 web review: [V3.3 preview](https://optimalisering-oslo-v33.anel.workers.dev), source delivery `87daa54`, verified Worker version `b2c527a3-e60e-458c-b7f9-c257afda6c21`. Native build succeeded. Live 1440/390/320px focused QA, all 15 HTML byte comparisons, stylesheet equivalence, noindex/robots/sitemap and static-intake GET 404 pass. Separate live evidence is in `coordination/evidence/h004-live/`. The following receipt-only revision changes no website assets; use Git history for its own SHA.

## Implemented baseline

- Astro static website under `app/`, with semantic JSON content, responsive shared templates, self-hosted Instrument Sans/Figtree, local SVG illustrations, metadata and internal links.
- 15 exploratory content routes: `/`, `/synlighet/`, `/konvertering/`, `/priser/`, `/vurdering/`, `/om/`, `/kontakt/`, `/personvern/`, `/vilkar/`, `/seo/`, `/ai-synlighet/`, `/nettbutikkoptimalisering/`, `/innsikt/`, `/innsikt/hva-bor-optimaliseres-forst/`, `/innsikt/male-effekt-av-optimalisering/`. A technical 404 also exists. No later portfolio/case/city-grid expansion was implemented.
- H-006 homepage: unchanged H-005B semantic/display H1, support, two CTAs and immediate need selector; prepared photo slot with neutral fallback; combined traffic/conversion calculator; open non-price package columns; no proof block; diagnosis/fit/manual check/provider/FAQ. Wider max 1440px shell, readable nested widths and increased rhythm preserve all copy/IA. Editable homepage-only header/footer/form keep the remaining pages unchanged.
- Root `.pages.yml` points Pages CMS to `app/src/content/pages/`; it is configuration, not proof of an authenticated editor/account integration.
- Interim Node HTTP API plus local server-side SQLite storage for enquiries, one `assessment_received` conversion and source tags. Idempotent submissions, separately retryable Resend notifications, input/origin/size checks and basic socket-IP rate limiting. Operational databases/secrets are ignored by Git.
- Source tags travel through internal URLs and are sanitized at submission; no cookies, localStorage tracking or persistent visitor IDs. This is limited submission attribution, not a verified cross-session journey, lead-quality system or revenue pipeline.
- Default noindex preview, disallowed robots crawl, empty preview sitemap, disabled real intake and production-readiness guard. Static Cloudflare hosting remains the intended direction; persistent API hosting is unresolved.
- Technical tests, static audit and browser QA scripts in `app/tests/` and `app/scripts/`. See `app/docs/verification.md` for historical implementation evidence and limits.

## Copy authority: DRAFT / NON-AUTHORITATIVE

Historical H-001 / D-010 locked the reviewed homepage at `55c31b5`. H-004 / D-014 reopens conflicting wording/order and produces the new representative revision at `caa88817152b23f5c67fabe8a328ed868ea7c9cb`. Its generated wording is `REVIEW_REQUIRED` / `DRAFT / NON-AUTHORITATIVE`; the exact H-004 phrases/direction are consumed without claiming a fresh complete content lock. The other 14 records remain draft and frozen. Reused source facts constrain wording but do not approve it.

`app/src/config/copy-authority.json` explicitly marks all shared/source-embedded customer-facing wording **DRAFT / NON-AUTHORITATIVE**, including the following inventory. Existing displayed wording is preserved; this is an authority correction, not a visual revision.

| Source | Covered draft wording |
| --- | --- |
| `app/src/content/pages/*.json` | All current records are draft. Revised home JSON supplies meaningful homepage copy, including navigation/calculator/form/footer. H-006 removes only retired illustration wording and adds technical photo config; retained copy is unchanged. D-010 is a lock of its historical revision only. |
| `app/src/config/site.ts`, `app/src/components/Header.astro`, `Footer.astro`, `app/src/layouts/SiteLayout.astro` | Navigation, provider sentence, wordmark arrangement, preview labels, accessibility/link labels and shared footer text |
| `HomePage.astro`, `HomeSection.astro`, `InnerPage.astro`, `AssessmentSection.astro`, `ContentSection.astro`, `Faq.astro` under `app/src/components/` | Template-written hero/support/breadcrumb/section/closing CTA text and all fallback/shared wording |
| `Journey.astro`, `Leverage.astro`, `HomeLeverage.astro`, `HomeHeroPhoto.astro` under `app/src/components/` | Historical shared labels remain draft. HomeLeverage renders homepage JSON; values are hypothetical examples, not proof. H-006 retires HomeJourney and its visual labels; HomeHeroPhoto adds no public wording |
| `app/src/components/AssessmentForm.astro`, `app/src/lib/*.ts`, `app/server/*.mjs` | Form labels/options/helpers, validation/error/success text and generated customer-facing response/notification wording |
| `app/src/pages/404.astro`, any other source-embedded public text | Error-page wording and all public text not otherwise listed |

Supplied factual inputs are distinct from approved phrasing. The seed identifies Medon AS as provider; Synlighet and Konvertering as the two primary needs; a combination path; recurring agreed work; a bounded manual free check; main website/store as standard starting scope; and separately charged applicable external costs. These facts constrain drafts. They do not approve the resulting public argument or every sentence. `project/.../COPY-SEEDS.md` expressly says its lines are not production locks. Historical price candidates and unapproved proof were excluded.

The previous STRATEGY_CONTENT subtask produced the 15 complete draft records and `app/docs/content-handoff.md`; that initial authorship/reasoning was not a final content lock or owner approval. ChatGPT subsequently revised and locked the homepage JSON through H-001. The remaining page drafts and implementation-generated shared UI text remain non-authoritative. The older handoff's “LOCKED / DO NOT CHANGE” section describes source-fact constraints, not an additional copy lock.

## Inferred visual and content decisions

The initial implementation selected a homepage hook (“De rette må finne deg. Så må de velge deg.”), complete-page arguments, section sequences, FAQ answers, educational examples, article explanations, price-by-agreement presentation and shared form/CTA phrasing. These were generated interpretations informed by the seed. H-001 subsequently reviewed/revised the complete homepage JSON and retained its hook; the remainder has not been promoted.

Design priors suggested Instrument Sans/Figtree, comfortable Nordic presentation, controlled rounded shapes and prominent useful teaching. Implementation inferred their execution: warm cream `#f5f3ec`, forest green `#214f3e`, paper `#fffef9`, sage `#dce6d8`, apricot `#efc4a2`, ink `#223a30`; 1200px shell; headline weight/scale/spacing; lowercase wordmark with a custom arch/arrow symbol; rotated find/choose illustration cards; section/card/form treatments and responsive composition. These are exploratory visual choices, not an approved identity/system.

H-002 / D-012 now explicitly selects Invite as the primary homepage visual DNA and defines the font roles. IMPLEMENTATION translated its airy rhythm, teal action, deep plum contrast, soft tinted surfaces and rounded visual panels into an original find/choose illustration, service components, stronger section changes and equally prominent illustrative 10/20 panels. The exact palette, proportions, card treatment and responsive execution remain reviewable implementation decisions, not OWNER acceptance. No reference branding, hospitality imagery, customer logos, proof, prices or copy was imported. Mementor was inspected only as a visual-energy/rhythm benchmark. The supplied local reference was read/rendered without modification and is not published as an app asset.

The subsequent explicit OWNER follow-up sets the teaching background to `#320c43` and places it immediately after the complete hero (including its support strip), before `flaskehals`. This changes render order only; locked JSON copy/order remains intact. The existing `r03-invite` evidence paths have fresh 1440/390/320px captures; Git retains the earlier iteration. See the latest outbound report/Git revision for this current local checkpoint. Whole-page acceptance remains pending.

OWNER additionally permitted Phosphor icons. `HomeSymbol.astro` now renders three official regular-weight SVGs from `app/src/assets/phosphor/`, with pinned source provenance in that directory's README and the MIT notice in `app/public/licenses/phosphor-icons.txt`. This is homepage-only; no runtime icon service, font or package dependency was added.

Templates were applied across the portfolio before a representative full-page review was passed. This missed the intended sequence. The correction preserves the work as a review baseline and freezes further expansion; it does not retroactively approve that scaling. `app/docs/build-spec.md` and `implementation-plan.md` are implementation-authored interpretations, not approved production specifications. Completed checkboxes mean implementation work was done.

## Representative page and review boundary

Representative page: **the complete homepage `/`** at `7e69c079d57281d5126d2c94dbc3f1dfac90f265`, using revised `home.json`, `HomePage`, `HomeHeroPhoto`, `HomeLeverage`, `HomeSection`, and homepage-only `HomeAssessment`, `HomeHeader`, `HomeFooter` plus `home-invite.css`. Shared SiteLayout/routing passes homepage data only; content.config imports the testable schema. Existing global CSS, inner templates and shared form/header/footer stay intact. Current full-page/hero-selector/calculator-packages/wide evidence is in `coordination/evidence/h006/`; historical evidence remains preserved. Review the whole running page where interaction matters.

`/vurdering/` supports review of the form flow; it is not a second design-direction candidate. All other pages remain frozen. Homepage approval is scoped to the reviewed content/visual revision; each remaining page still needs appropriate content review before publication. Implementation revisions require a concrete inbound handoff.

H-001 authorized exact homepage rendering and minimal necessary fit changes only. The single implementation adjustment at `e6261de` keeps existing space-grouped numbers together in `Leverage.astro` paragraph markup; no copy or visual-system changes were made. Fresh full-page 1440/390/320px and teaching captures are in `coordination/evidence/h001/`; see `REVIEW-QUEUE.md` for links and the pending R-03/R-04 requests.

OWNER's later R-03 REVISE replaces that limited visual scope for the homepage through H-002 / D-012. New evidence is in `coordination/evidence/r03-invite/`. Locked homepage JSON and all other page JSON remain unchanged. The other 14 built pages and their shared stylesheet remain byte-for-byte unchanged. H-003 subsequently authorizes web publication for OWNER review, with repository delivery synchronized. The representative still awaits acceptance; no design propagation is authorized.

## Unresolved dependencies

| Dependency | Required role | Effect |
| --- | --- | --- |
| Shared/source-embedded wording and remaining page-specific content locks; consequential commercial choices outside reviewed homepage facts | STRATEGY_CONTENT; OWNER for material commercial decisions | D-010 records historical completion; H-004-generated copy awaits its reviewed lock. Other copy/decisions still block their affected production scope; no expansion is authorized. |
| Representative full-page desktop/mobile and material visible-brand acceptance | OWNER, informed by design/content and RED_TEAM | BLOCKS_CURRENT_GATE: visual direction and expansion |
| Independent review of the exact representative revision and recorded verdict | RED_TEAM | BLOCKS_CURRENT_GATE: reviewed direction before scale |
| Standard service inclusions/exclusions, public prices, onboarding economics, combination comparison, billing/commitment/cancellation and final terms | OWNER + STRATEGY_CONTENT | Blocks affected commercial locks and production; no invented prices/terms |
| Proof publication permission, verified public contact details, page-role/search/AIO evidence and overlap against other Medon sites | OWNER + STRATEGY_CONTENT | Blocks affected claims/content and launch; not resolved by draft QA |
| Privacy purpose/lawful basis/controller contact, retention/deletion, access/backup operations, processor arrangements, locations/transfers, rights handling and justified stored fields | OWNER + STRATEGY_CONTENT with appropriate privacy review | Blocks finalized privacy copy and real lead/measurement processing; does not block offline draft inspection |
| Resend account/key, verified sender/domain, recipient, synthetic live delivery and inbox receipt | OWNER / operations; IMPLEMENTATION verifies configured flow | Blocks live notification proof; no live send performed |
| Persistent Node/SQLite host or approved shared backend, HTTPS/proxy/IP handling, spam controls, access/deletion/export/backup operations | OWNER / operations + IMPLEMENTATION | Blocks real intake; SQLite choice is provisional, not a hosting commitment |
| Production Cloudflare/account controls, protected preview, DNS/old URLs/redirects, rollback, Search Console and measurement operations, explicit launch authorization | OWNER / operations + IMPLEMENTATION | Blocks production cutover/launch; H-003 web review publication is complete |

## Validation and approval limits

Before the original baseline push on 2026-10-08, `npm run verify` passed: Astro check (40 files, zero errors/warnings/hints), 16 tests, static build (15 content routes + 404), and audit of 454 internal links/anchors. Earlier browser QA recorded 40 checks; it was synthetic technical evidence, not business/content/visual acceptance. An earlier independent implementation red-team pass reported issues; fixes were regression-checked, but no final independent production/content/visual PASS has been received.

Fresh H-001 validation is reported in `CODEX-TO-CHATGPT.md`: Astro check/build, 17 tests, static audit of 454 links/anchors, 40 existing browser checks, focused 1440/390/320px exact-copy/fit/math/form checks and production guard passed. All 26 built files outside the homepage and all 144 protected reference files are byte-for-byte unchanged. No real customer submission, live email/inbox test, production deployment, external analytics activation or OWNER visual approval is claimed. Only the actual H-001 homepage JSON content/CRO lock is recorded; protected `system/` and `project/` inputs remain unchanged.


## Current owner direction — D-014

The homepage must now optimize for immediate comprehension by a Norwegian business buyer:

1. Hero: category clarity + who it is for + direct actions.
2. Need selector immediately below hero.
3. Simple calculator showing the combined effect of relevant visibility and conversion rate.
4. Package/pricing decision support.
5. One strongest verified proof block when proof exists; render no decorative substitute while proof is unavailable.
6. Diagnostic mechanism: find bottleneck → prioritize → implement → measure.
7. Fit/not-fit qualification.
8. Bounded free manual check.
9. Medon/provider responsibility.
10. FAQ/footer.

Customer language is **Bli funnet** and **Gjør flere besøk til henvendelser og salg**. Do not reuse “Så må de velge deg” as headline, illustration caption, aria label or substitute concept in the new homepage. Authority architecture must support SEO, AI visibility (AIO/GEO/AEO concepts consolidated rather than synonym-spam), Local SEO, CRO and campaign optimization over time, while keeping the homepage commercially simple.

## Historical H-004 technical delivery

Implementation/evidence `caa88817152b23f5c67fabe8a328ed868ea7c9cb` consumes `d0e5a30`. Astro check: 53 files, zero diagnostics; 24 tests; build; 449-link static audit; 40 browser regression checks; focused 1440/390/320px QA and production guard pass. CMS section/default constraints and rate-precision/overflow fixes have failing-before/passing-after regressions and a separate technical re-review. All 174 protected/frozen output inputs match the fresh baseline (144 reference files, 14 other JSON, 15 non-home HTML including 404, one shared CSS). Nine screenshots and receipts are in `evidence/h004/`. Authenticated CMS save and real intake/delivery remain unverified and unauthorized; the static review form is disabled. See the outbound report for final repository/Worker verification. Stop for R-03/R-04.


## Current owner direction — D-015

H-004 is not being redesigned. The next pass tests whether commercial clarity improves by removing redundant hero layers.

Target hero:
- eyebrow: **For bedrifter som konkurrerer om kundene**
- semantic H1 and main display: **Bli funnet. Gjør flere besøk til henvendelser og salg.**
- short support mentioning **SEO, AI-synlighet og konverteringsoptimalisering for bedrifter i Oslo og resten av Norge**, plus that Medon starts where the customer journey stops
- CTAs: **Ta en gratis sjekk** and **Se priser**
- no separate small keyword H1
- no hero note
- old repetitive illustration removed; D-016 supersedes the no-visual clause with one restrained outcome visual

Need-selector copy should be shortened so each card reads as a clear task choice, not a mini landing page. Calculator, packages, mechanism, fit/not-fit, assessment, provider, FAQ and footer remain structurally unchanged.


## H-005B visual clarification — D-016

Retain the simplified hero structure from H-005, but include one restrained outcome-oriented visual.

The visual should plausibly suggest:
- being found by relevant customers;
- a clearer path from visit to enquiry/purchase;
- improved commercial outcome.

It should feel real-ish/productized, not like a stock photo, fake case, dense dashboard or abstract decoration. The need selector must still arrive quickly below the hero, especially on mobile.


## Historical H-005B technical delivery

Implementation/evidence 1d4bdf77bd234783b68a7f581bdb88ab6ef2af38 consumes b6d035a under D-015/D-016. Only hero/selector copy, hero markup/visual/styles and corresponding CMS/schema/QA changed. Final verify: 55 files without diagnostics, 24 tests, 449 links; 40 existing browser checks; focused 1440/390/320px and production guard pass. Hero heights fall from 607.64/799.42/824.34px to 476.03/665.59/677.80px. All lower DOM/computed styles and relative geometry are preserved across 207 elements per width; all 174 protected/frozen files match the fresh baseline. Six captures, reproducible baselines and a clean technical review are in evidence/h005b/. Generated support/visual wording remains draft. Main/Worker delivery is recorded in CODEX-TO-CHATGPT and its Git history. OWNER R-03 remains REVISE / awaiting this iteration’s verdict; formal RED_TEAM R-04 is ready and pending. No scale-out, real intake, launch or new content lock.


## Current owner direction — D-018 / H-006

This is a **visual polish pass, not a new redesign**.

Keep:
- H-005B page order and IA;
- current hero H1/support/CTAs;
- need selector structure;
- calculator logic/layout intent;
- package/mechanism/fit/check/provider/FAQ order;
- Invite-derived palette and Instrument Sans/Figtree role split.

Change:
- homepage shell max width to 1440px on large screens;
- increase whitespace and section breathing room materially;
- keep text columns narrower than the shell;
- reduce crowded/card-heavy feel;
- strengthen typographic and compositional authority;
- prepare a real-photo hero slot for a generated happy-customer image, replacing the current UI illustration.

The final hero image is not yet supplied. H-006 should create the composition and asset slot cleanly without inventing or fetching a stock image.

## H-006 technical delivery

Implementation/evidence 7e69c079d57281d5126d2c94dbc3f1dfac90f265 consumes incoming main 99734a73a3f3cd0ba93a1155cfbdd95395a91245 under D-018. Shell at 1440px grows 1200→1360px; at 1920px grows 1200→1440px. Major desktop section padding grows 72→104px, mobile 48→56px; tablet uses 80px. Body/split text is capped at 720/650px. Need cards remain primary; packages/mechanism/fit use more open treatments; calculator/form gain space. Hero heights fall from 476.03/665.59/677.80px to 459.95/629.05/606.38px at 1440/390/320. Fonts, palette, retained copy and lower/chrome DOM are unchanged. All 174 protected/frozen files match the fresh baseline.

The reserved asset is app/public/images/home/hero-customer.webp, with CMS/schema local-path and bounded crop config. Missing asset builds a valid neutral wordless SVG; no stock/generated customer photo is introduced. Both missing and temporary synthetic supplied branches passed responsive checks; fixture removed and fallback build restored. Real customer-photo composition/framing/brand acceptance remains a ChatGPT asset dependency.

Final verify: 56 files with zero diagnostics, 24 tests, build and 449-link audit. Existing browser: 40 checks. Focused H-006: 1440/390/320/1920, eight captures, interactions/noindex/intake-disabled/copy/fit checks and a reproduced-then-fixed 901px selector wrap regression. Production-mode guard and preservation pass. Fresh technical review found no blocking issues; it is not formal R-04. Evidence/commands are in evidence/h006/; final main/Worker receipt is in CODEX-TO-CHATGPT. Stop for OWNER R-03 and fresh formal RED_TEAM R-04; R-05 remains blocked. No new content lock, commercial/proof authority, launch or real lead/email processing.
