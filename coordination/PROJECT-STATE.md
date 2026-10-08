# Project state

Updated: 2026-10-08. Owner: Medon AS. Implementation repository: AnelPasic/optimalisering.oslo.noV3.3.

**State: EXPLORATORY BASELINE / REVIEW PENDING.** Page/content expansion is paused. The current build is preserved for inspection, not approved production. No representative-page, complete-content or visual-system approval has been received. Technical QA does not supply those approvals.

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

There are **zero complete production page-copy locks** in this build. All 15 page records remain `REVIEW_REQUIRED` and explicitly carry `authority: DRAFT / NON-AUTHORITATIVE`. This applies to every generated title, SEO description, heading, paragraph, example, FAQ, item and CTA in those records. Reused seed wording has not become locked by reuse.

`app/src/config/copy-authority.json` explicitly marks all shared/source-embedded customer-facing wording **DRAFT / NON-AUTHORITATIVE**, including the following inventory. Existing displayed wording is preserved; this is an authority correction, not a visual revision.

| Source | Covered draft wording |
| --- | --- |
| `app/src/content/pages/*.json` | All page content, SEO text, FAQs, pricing/scope explanations, privacy/terms drafts, insight articles and CTAs |
| `app/src/config/site.ts`, `app/src/components/Header.astro`, `Footer.astro`, `app/src/layouts/SiteLayout.astro` | Navigation, provider sentence, wordmark arrangement, preview labels, accessibility/link labels and shared footer text |
| `HomePage.astro`, `InnerPage.astro`, `AssessmentSection.astro`, `ContentSection.astro`, `Faq.astro` under `app/src/components/` | Template-written hero/support/breadcrumb/section/closing CTA text and all fallback/shared wording |
| `Journey.astro`, `Leverage.astro` under `app/src/components/` | Illustration labels, teaching/tool labels, illustrative values and explanatory caveats |
| `app/src/components/AssessmentForm.astro`, `app/src/lib/*.ts`, `app/server/*.mjs` | Form labels/options/helpers, validation/error/success text and generated customer-facing response/notification wording |
| `app/src/pages/404.astro`, any other source-embedded public text | Error-page wording and all public text not otherwise listed |

Supplied factual inputs are distinct from approved phrasing. The seed identifies Medon AS as provider; Synlighet and Konvertering as the two primary needs; a combination path; recurring agreed work; a bounded manual free check; main website/store as standard starting scope; and separately charged applicable external costs. These facts constrain drafts. They do not approve the resulting public argument or every sentence. `project/.../COPY-SEEDS.md` expressly says its lines are not production locks. Historical price candidates and unapproved proof were excluded.

The previous STRATEGY_CONTENT subtask produced the 15 complete draft records and `app/docs/content-handoff.md`. That handoff was draft authorship and reasoning, not final content QA/lock from the connected ChatGPT workspace or owner approval. Implementation also generated shared UI text. Both remain non-authoritative. The older handoff's “LOCKED / DO NOT CHANGE” section describes source-fact constraints; it does not lock its generated page copy.

## Inferred visual and content decisions

The implementation selected a new homepage hook (“De rette må finne deg. Så må de velge deg.”), complete-page arguments, section sequences, FAQ answers, educational examples, article explanations, price-by-agreement presentation and shared form/CTA phrasing. These are generated interpretations, including where informed by the seed.

Design priors suggested Instrument Sans/Figtree, comfortable Nordic presentation, controlled rounded shapes and prominent useful teaching. Implementation inferred their execution: warm cream `#f5f3ec`, forest green `#214f3e`, paper `#fffef9`, sage `#dce6d8`, apricot `#efc4a2`, ink `#223a30`; 1200px shell; headline weight/scale/spacing; lowercase wordmark with a custom arch/arrow symbol; rotated find/choose illustration cards; section/card/form treatments and responsive composition. These are exploratory visual choices, not an approved identity/system.

Templates were applied across the portfolio before a representative full-page review was passed. This missed the intended sequence. The correction preserves the work as a review baseline and freezes further expansion; it does not retroactively approve that scaling. `app/docs/build-spec.md` and `implementation-plan.md` are implementation-authored interpretations, not approved production specifications. Completed checkboxes mean implementation work was done.

## Representative page and review boundary

Proposed representative page: **the complete homepage `/`**, using `app/src/content/pages/home.json`, `app/src/components/HomePage.astro`, its child components and `app/src/styles/global.css`. Review the entire page at desktop and mobile widths, including service hub, teaching/calculator, manual-check section, provider and footer. Existing baseline captures are linked from `REVIEW-QUEUE.md`.

`/vurdering/` supports review of the form flow; it is not a second design-direction candidate. All other pages remain frozen. Homepage approval is scoped to the reviewed content/visual revision; each remaining page still needs appropriate content review before publication. Implementation revisions require a concrete inbound handoff.

## Unresolved dependencies

| Dependency | Required role | Effect |
| --- | --- | --- |
| Complete homepage argument, offer/CTA boundaries, metadata, proof/certainty and shared wording review/lock | STRATEGY_CONTENT; OWNER for consequential offer choices | BLOCKS_CURRENT_GATE: content/direction review |
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

Fresh coordination-revision validation is reported in `CODEX-TO-CHATGPT.md`. No real customer submission, live email/inbox test, production deployment, external analytics activation, content lock or owner visual approval is claimed. The protected `system/` and `project/` inputs remain unchanged.
