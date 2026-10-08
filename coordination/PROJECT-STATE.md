# Project state

Updated: 2026-10-08. Owner: Medon AS. Implementation repository: AnelPasic/optimalisering.oslo.noV3.3.

**State: HOMEPAGE CONTENT/CRO LOCKED / R-03 REVISE / NEW VISUAL ITERATION READY FOR OWNER REVIEW.** H-001 / D-010 at `55c31b523a50e3e6112fcb5f324adbfa663e21eb` completed R-01/R-02 for the homepage JSON scope. OWNER subsequently returned R-03 REVISE and authorized H-002 / D-011's Invite DNA translation on the homepage only. The new local iteration and 1440/390/320px evidence are ready; see `CODEX-TO-CHATGPT.md` for the exact implementation commit. The 15-page build remains exploratory, not approved production. No OWNER acceptance of this new revision or final independent RED_TEAM PASS has been received. The other 14 pages remain frozen; technical QA does not supply those approvals.

Original exploratory implementation: `a98dbaefbb10a9039c9b025e5c3907e83f24de8b`, pushed to `origin/main` on 2026-10-08. The coordination/draft-label revision follows that commit; use this file's Git history for its exact SHA. A push permits repository inspection; it does not authorize publication or live processing.

## Implemented baseline

- Astro static website under `app/`, with semantic JSON content, responsive shared templates, self-hosted Instrument Sans/Figtree, local SVG illustrations, metadata and internal links.
- 15 exploratory content routes: `/`, `/synlighet/`, `/konvertering/`, `/priser/`, `/vurdering/`, `/om/`, `/kontakt/`, `/personvern/`, `/vilkar/`, `/seo/`, `/ai-synlighet/`, `/nettbutikkoptimalisering/`, `/innsikt/`, `/innsikt/hva-bor-optimaliseres-forst/`, `/innsikt/male-effekt-av-optimalisering/`. A technical 404 also exists. No later portfolio/case/city-grid expansion was implemented.
- Homepage service hub, find/choose illustration, illustrative visits × conversion calculator, manual-check explanation/form, provider information and FAQ. These demonstrate an interpretation of the brief.
- Root `.pages.yml` points Pages CMS to `app/src/content/pages/`; it is configuration, not proof of an authenticated editor/account integration.
- Interim Node HTTP API plus local server-side SQLite storage for enquiries, one `assessment_received` conversion and source tags. Idempotent submissions, separately retryable Resend notifications, input/origin/size checks and basic socket-IP rate limiting. Operational databases/secrets are ignored by Git.
- Source tags travel through internal URLs and are sanitized at submission; no cookies, localStorage tracking or persistent visitor IDs. This is limited submission attribution, not a verified cross-session journey, lead-quality system or revenue pipeline.
- Default noindex preview, disallowed robots crawl, empty preview sitemap, disabled real intake and production-readiness guard. Static Cloudflare hosting remains the intended direction; persistent API hosting is unresolved.
- Technical tests, static audit and browser QA scripts in `app/tests/` and `app/scripts/`. See `app/docs/verification.md` for historical implementation evidence and limits.

## Copy authority: DRAFT / NON-AUTHORITATIVE

There is **one scoped complete homepage content/CRO lock for the representative-page test**, received through H-001 / D-010. `app/src/content/pages/home.json` is `CONTENT_LOCKED` / `CONTENT_LOCKED / AUTHORITATIVE` at source commit `55c31b5`; IMPLEMENTATION preserved its exact content. This is not visual or launch approval. The other 14 page records remain `REVIEW_REQUIRED` / `DRAFT / NON-AUTHORITATIVE`, covering all their generated titles, SEO text, headings, paragraphs, examples, FAQs, items and CTAs. Reused seed wording is not locked by reuse.

`app/src/config/copy-authority.json` explicitly marks all shared/source-embedded customer-facing wording **DRAFT / NON-AUTHORITATIVE**, including the following inventory. Existing displayed wording is preserved; this is an authority correction, not a visual revision.

| Source | Covered draft wording |
| --- | --- |
| `app/src/content/pages/*.json` except `home.json` | All remaining page content, SEO text, FAQs, pricing/scope explanations, privacy/terms drafts, insight articles and CTAs. Homepage JSON alone is authoritative for H-001's representative test under D-010. |
| `app/src/config/site.ts`, `app/src/components/Header.astro`, `Footer.astro`, `app/src/layouts/SiteLayout.astro` | Navigation, provider sentence, wordmark arrangement, preview labels, accessibility/link labels and shared footer text |
| `HomePage.astro`, `HomeSection.astro`, `InnerPage.astro`, `AssessmentSection.astro`, `ContentSection.astro`, `Faq.astro` under `app/src/components/` | Template-written hero/support/breadcrumb/section/closing CTA text and all fallback/shared wording |
| `Journey.astro`, `Leverage.astro`, `HomeJourney.astro`, `HomeLeverage.astro` under `app/src/components/` | Illustration labels, teaching/tool labels, illustrative values and explanatory caveats; H-002 preserves the existing wording and adds derived percentage displays only |
| `app/src/components/AssessmentForm.astro`, `app/src/lib/*.ts`, `app/server/*.mjs` | Form labels/options/helpers, validation/error/success text and generated customer-facing response/notification wording |
| `app/src/pages/404.astro`, any other source-embedded public text | Error-page wording and all public text not otherwise listed |

Supplied factual inputs are distinct from approved phrasing. The seed identifies Medon AS as provider; Synlighet and Konvertering as the two primary needs; a combination path; recurring agreed work; a bounded manual free check; main website/store as standard starting scope; and separately charged applicable external costs. These facts constrain drafts. They do not approve the resulting public argument or every sentence. `project/.../COPY-SEEDS.md` expressly says its lines are not production locks. Historical price candidates and unapproved proof were excluded.

The previous STRATEGY_CONTENT subtask produced the 15 complete draft records and `app/docs/content-handoff.md`; that initial authorship/reasoning was not a final content lock or owner approval. ChatGPT subsequently revised and locked the homepage JSON through H-001. The remaining page drafts and implementation-generated shared UI text remain non-authoritative. The older handoff's “LOCKED / DO NOT CHANGE” section describes source-fact constraints, not an additional copy lock.

## Inferred visual and content decisions

The initial implementation selected a new homepage hook (“De rette må finne deg. Så må de velge deg.”), complete-page arguments, section sequences, FAQ answers, educational examples, article explanations, price-by-agreement presentation and shared form/CTA phrasing. These were generated interpretations informed by the seed. H-001 subsequently reviewed/revised the complete homepage JSON and retained its hook; the remainder has not been promoted.

Design priors suggested Instrument Sans/Figtree, comfortable Nordic presentation, controlled rounded shapes and prominent useful teaching. Implementation inferred their execution: warm cream `#f5f3ec`, forest green `#214f3e`, paper `#fffef9`, sage `#dce6d8`, apricot `#efc4a2`, ink `#223a30`; 1200px shell; headline weight/scale/spacing; lowercase wordmark with a custom arch/arrow symbol; rotated find/choose illustration cards; section/card/form treatments and responsive composition. These are exploratory visual choices, not an approved identity/system.

H-002 / D-011 now explicitly selects Invite as the primary homepage visual DNA and defines the font roles. IMPLEMENTATION translated its airy rhythm, teal action, deep plum contrast, soft tinted surfaces and rounded visual panels into an original find/choose illustration, service components, stronger section changes and equally prominent illustrative 10/20 panels. The exact palette, proportions, card treatment and responsive execution remain reviewable implementation decisions, not OWNER acceptance. No reference branding, hospitality imagery, customer logos, proof, prices or copy was imported. Mementor was inspected only as a visual-energy/rhythm benchmark. The supplied local reference was read/rendered without modification and is not published as an app asset.

Templates were applied across the portfolio before a representative full-page review was passed. This missed the intended sequence. The correction preserves the work as a review baseline and freezes further expansion; it does not retroactively approve that scaling. `app/docs/build-spec.md` and `implementation-plan.md` are implementation-authored interpretations, not approved production specifications. Completed checkboxes mean implementation work was done.

## Representative page and review boundary

Representative page: **the complete homepage `/`**, using locked `app/src/content/pages/home.json`, `app/src/components/HomePage.astro`, homepage-only `HomeJourney.astro`, `HomeLeverage.astro`, `HomeSection.astro`, `HomeSymbol.astro` and `app/public/styles/home-invite.css`. `SiteLayout.astro` loads this stylesheet/body class only for the homepage. Shared `app/src/styles/global.css`, form and FAQ implementations remain intact. Review the entire page at desktop and mobile widths, including service hub, teaching/calculator, manual-check section, provider and footer. Fresh captures and historical comparisons are linked from `REVIEW-QUEUE.md`.

`/vurdering/` supports review of the form flow; it is not a second design-direction candidate. All other pages remain frozen. Homepage approval is scoped to the reviewed content/visual revision; each remaining page still needs appropriate content review before publication. Implementation revisions require a concrete inbound handoff.

H-001 authorized exact homepage rendering and minimal necessary fit changes only. The single implementation adjustment at `e6261de` keeps existing space-grouped numbers together in `Leverage.astro` paragraph markup; no copy or visual-system changes were made. Fresh full-page 1440/390/320px and teaching captures are in `coordination/evidence/h001/`; see `REVIEW-QUEUE.md` for links and the pending R-03/R-04 requests.

OWNER's later R-03 REVISE replaces that limited visual scope for the homepage through H-002 / D-011. New evidence is in `coordination/evidence/r03-invite/`. Locked homepage JSON and all other page JSON remain unchanged. The other 14 built pages and their shared stylesheet remain byte-for-byte unchanged. This local representative iteration stops for OWNER review; no propagation or renewed push/deployment instruction is inferred.

## Unresolved dependencies

| Dependency | Required role | Effect |
| --- | --- | --- |
| Shared/source-embedded wording and remaining page-specific content locks; consequential commercial choices outside reviewed homepage facts | STRATEGY_CONTENT; OWNER for material commercial decisions | Homepage JSON argument/CRO is COMPLETE under H-001/D-010. Other copy/decisions still block their affected publication scope; no expansion is authorized. |
| Representative full-page desktop/mobile and material visible-brand acceptance | OWNER, informed by design/content and RED_TEAM | BLOCKS_CURRENT_GATE: visual direction and expansion |
| Independent review of the exact representative revision and recorded verdict | RED_TEAM | BLOCKS_CURRENT_GATE: reviewed direction before scale |
| Standard service inclusions/exclusions, public prices, onboarding economics, combination comparison, billing/commitment/cancellation and final terms | OWNER + STRATEGY_CONTENT | Blocks affected commercial locks and production; no invented prices/terms |
| Proof publication permission, verified public contact details, page-role/search/AIO evidence and overlap against other Medon sites | OWNER + STRATEGY_CONTENT | Blocks affected claims/content and launch; not resolved by draft QA |
| Privacy purpose/lawful basis/controller contact, retention/deletion, access/backup operations, processor arrangements, locations/transfers, rights handling and justified stored fields | OWNER + STRATEGY_CONTENT with appropriate privacy review | Blocks finalized privacy copy and real lead/measurement processing; does not block offline draft inspection |
| Resend account/key, verified sender/domain, recipient, synthetic live delivery and inbox receipt | OWNER / operations; IMPLEMENTATION verifies configured flow | Blocks live notification proof; no live send performed |
| Persistent Node/SQLite host or approved shared backend, HTTPS/proxy/IP handling, spam controls, access/deletion/export/backup operations | OWNER / operations + IMPLEMENTATION | Blocks real intake; SQLite choice is provisional, not a hosting commitment |
| Cloudflare native Git/account integration, protected preview, DNS/old URLs/redirects, rollback, Search Console and measurement operations, explicit launch authorization | OWNER / operations + IMPLEMENTATION | Blocks deployment/cutover/launch; does not block repository review |

## Validation and approval limits

Before the original baseline push on 2026-10-08, `npm run verify` passed: Astro check (40 files, zero errors/warnings/hints), 16 tests, static build (15 content routes + 404), and audit of 454 internal links/anchors. Earlier browser QA recorded 40 checks; it was synthetic technical evidence, not business/content/visual acceptance. An earlier independent implementation red-team pass reported issues; fixes were regression-checked, but no final independent production/content/visual PASS has been received.

Fresh H-001 validation is reported in `CODEX-TO-CHATGPT.md`: Astro check/build, 17 tests, static audit of 454 links/anchors, 40 existing browser checks, focused 1440/390/320px exact-copy/fit/math/form checks and production guard passed. All 26 built files outside the homepage and all 144 protected reference files are byte-for-byte unchanged. No real customer submission, live email/inbox test, production deployment, external analytics activation or OWNER visual approval is claimed. Only the actual H-001 homepage JSON content/CRO lock is recorded; protected `system/` and `project/` inputs remain unchanged.
