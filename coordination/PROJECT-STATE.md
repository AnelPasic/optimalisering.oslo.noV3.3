# Project state

Updated: 2026-10-08. Owner: Medon AS. Implementation repository: AnelPasic/optimalisering.oslo.noV3.3.

**State: H-005B IMPLEMENTATION COMPLETE AT 1d4bdf77bd234783b68a7f581bdb88ab6ef2af38; STOPPED FOR OWNER R-03 AND FORMAL RED_TEAM R-04; ALL OTHER PAGES FROZEN.** D-015/D-016’s simpler hero, single outcome visual and shorter selector are delivered. No further implementation handoff is active; no acceptance/content lock is inferred.

Original exploratory implementation: `a98dbaefbb10a9039c9b025e5c3907e83f24de8b`, pushed to `origin/main` on 2026-10-08. The coordination/draft-label revision follows that commit; use this file's Git history for its exact SHA. A push permits repository inspection; it does not authorize publication or live processing.

Historical publication H-003 / D-013: [V3.3 review target](https://optimalisering-oslo-v33.anel.workers.dev), Worker version `9c4f4691-8ac7-4515-be65-d9e99e04f2ba`. Live 1440/390/320px and all 15 routes are verified in `coordination/evidence/h003-publication/`. Static frontend only; noindex and intake-disabled state remain. See the latest outbound report for the exact delivery Git revision. This OWNER-requested web review is distinct from production launch or representative acceptance.

Historical H-004 web review: [V3.3 preview](https://optimalisering-oslo-v33.anel.workers.dev), source delivery `87daa54`, verified Worker version `b2c527a3-e60e-458c-b7f9-c257afda6c21`. Native build succeeded. Live 1440/390/320px focused QA, all 15 HTML byte comparisons, stylesheet equivalence, noindex/robots/sitemap and static-intake GET 404 pass. Separate live evidence is in `coordination/evidence/h004-live/`. The following receipt-only revision changes no website assets; use Git history for its own SHA.

## Implemented baseline

- Astro static website under `app/`, with semantic JSON content, responsive shared templates, self-hosted Instrument Sans/Figtree, local SVG illustrations, metadata and internal links.
- 15 exploratory content routes: `/`, `/synlighet/`, `/konvertering/`, `/priser/`, `/vurdering/`, `/om/`, `/kontakt/`, `/personvern/`, `/vilkar/`, `/seo/`, `/ai-synlighet/`, `/nettbutikkoptimalisering/`, `/innsikt/`, `/innsikt/hva-bor-optimaliseres-forst/`, `/innsikt/male-effekt-av-optimalisering/`. A technical 404 also exists. No later portfolio/case/city-grid expansion was implemented.
- H-005B homepage: one task-focused semantic/display H1, short category/geography support and one restrained outcome visual; immediate need selector; combined traffic/conversion calculator; explicit non-price package cards; no proof block; diagnosis/fit/manual check/provider/FAQ. Editable homepage-only header/footer/form keep the remaining pages unchanged.
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
| `app/src/content/pages/*.json` | All current records are draft. H-004 home JSON supplies meaningful homepage copy, including navigation/illustration/calculator/form/footer. D-010 is a lock of its historical revision only. |
| `app/src/config/site.ts`, `app/src/components/Header.astro`, `Footer.astro`, `app/src/layouts/SiteLayout.astro` | Navigation, provider sentence, wordmark arrangement, preview labels, accessibility/link labels and shared footer text |
| `HomePage.astro`, `HomeSection.astro`, `InnerPage.astro`, `AssessmentSection.astro`, `ContentSection.astro`, `Faq.astro` under `app/src/components/` | Template-written hero/support/breadcrumb/section/closing CTA text and all fallback/shared wording |
| `Journey.astro`, `Leverage.astro`, `HomeJourney.astro`, `HomeLeverage.astro` under `app/src/components/` | Historical source-embedded labels remain draft. Current HomeJourney/HomeLeverage render the H-004 JSON; values are computed hypothetical examples, not proof |
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

Representative page: **the complete homepage `/`** at `1d4bdf77bd234783b68a7f581bdb88ab6ef2af38`, using revised `home.json`, `HomePage`, `HomeJourney`, `HomeLeverage`, `HomeSection`, and homepage-only `HomeAssessment`, `HomeHeader`, `HomeFooter` plus `home-invite.css`. Shared SiteLayout/routing passes homepage data only; content.config imports the testable schema. Existing global CSS, inner templates and shared form/header/footer stay intact. Current full-page/hero-selector evidence is in `coordination/evidence/h005b/`; historical calculator captures remain in `coordination/evidence/h004/`; review the whole running page where interaction matters.

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


## H-005B current technical delivery

Implementation/evidence 1d4bdf77bd234783b68a7f581bdb88ab6ef2af38 consumes b6d035a under D-015/D-016. Only hero/selector copy, hero markup/visual/styles and corresponding CMS/schema/QA changed. Final verify: 55 files without diagnostics, 24 tests, 449 links; 40 existing browser checks; focused 1440/390/320px and production guard pass. Hero heights fall from 607.64/799.42/824.34px to 476.03/665.59/677.80px. All lower DOM/computed styles and relative geometry are preserved across 207 elements per width; all 174 protected/frozen files match the fresh baseline. Six captures, reproducible baselines and a clean technical review are in evidence/h005b/. Generated support/visual wording remains draft. Main/Worker delivery is recorded in CODEX-TO-CHATGPT and its Git history. OWNER R-03 remains REVISE / awaiting this iteration’s verdict; formal RED_TEAM R-04 is ready and pending. No scale-out, real intake, launch or new content lock.
