# Optimalisering Oslo v3.3

**Exploratory baseline; expansion paused.** H-004 / D-014 revises the homepage into a task-first representative page, superseding conflicting H-001 / D-010 copy/order. The revised homepage is `REVIEW_REQUIRED` / **DRAFT / NON-AUTHORITATIVE** pending review; the other 14 pages and shared wording remain draft and frozen. OWNER R-03 and independent RED_TEAM R-04 are pending. Read `../coordination/PROJECT-STATE.md`, `CHATGPT-TO-CODEX.md` and `DECISIONS.md` before substantial work. Preserve the remaining pages until the recorded gates pass. See root `../AGENTS.md` for durable coordination rules.

The actual website is in this directory. `../system/` and `../project/` are read-only reference inputs. There are 15 Norwegian content routes, a responsive homepage, two service pillars, SEO and AI pages, store optimization, two distinct guides, a pricing decision page, and assessment/contact/provider/legal pages.

## Run locally

Requires Node 24.12 or newer. Install with `npm ci`, build with `npm run build`, then start `npm run preview`.

Open http://127.0.0.1:4321. Preview serves static `dist/` and the local lead API. For active development run `npm run dev` and, in a second terminal, `npm run dev:api`. The Astro dev server proxies `/api` to port 4322.

This checkout defaults to a noindex review preview. All current page records are `REVIEW_REQUIRED`. H-004's homepage form has only website/email/optional comment and stays disabled; enabling it requires a separate authorized integration. Existing other-page form behavior is preserved, with default intake disabled. Public prices and terms remain unresolved; the homepage uses an explicit non-price state and renders no client proof.

## Content and CMS

Source: `src/content/pages/*.json`, validated by `src/content.config.ts`. `slug` controls static URLs; `kind` chooses the template. Content owns commercial wording. Normal CMS edits change this semantic layer, rather than a separate hard-coded copy fallback.

Repository-root `../.pages.yml` points into these JSON files. Pages CMS requires its configuration at the repository root. Connect the repository to Pages CMS when repository/app permissions are available; this build creates the schema, not an authenticated CMS account. Slugs, page types, approval states and copy authority are read-only in the CMS. Each page has explicit authority metadata; `src/config/copy-authority.json` covers shared wording. Changing a field alone is not approval: actual review/lock scope and evidence belong in `../coordination/DECISIONS.md`. Material changes to approved commercial meaning must return to content/owner review.

The homepage has its own file editor; the remaining-page collection excludes `home.json`. Hero, selector, calculator, package placeholders, mechanism, fit, assessment, provider, FAQ, navigation and footer copy live in that JSON. The actual schema is in `src/lib/content-schema.ts`, consumed by Astro's collection configuration. Required homepage sections/order and calculator defaults are validated. The readonly proof slot is reserved for a future verified publication handoff. CMS field coverage is checked locally; authenticated editor/save integration remains unverified.

The site uses self-hosted Instrument Sans/Figtree fonts and local explanatory SVGs. No external font requests, client proof/logos, analytics cookies, localStorage tracking, pixels or persistent anonymous visitor identifiers are included.

## Interim enquiries and conversions

The owner selected Resend notifications plus local server-side storage until a better system is ready. This implementation uses a reusable Node HTTP API and SQLite, with no separate CRM interface.

Copy `.env.example` to `.env` and enter the verified Resend sender, server-only API key and notification recipient. Set `PUBLIC_LEADS_ENABLED=true` and `PRIVACY_APPROVED=true` only when the actual processing details are settled. Rebuild the frontend after changing public configuration and restart the API after changing server configuration. Never enter secrets through Pages CMS or PUBLIC_ variables.

The API validates and stores an enquiry and one `assessment_received` conversion atomically before acknowledgement. Campaign/source fields belong to the submitted enquiry. They are attribution clues, not proof of the full customer journey or won revenue. Internal links carry sanitized UTM values, landing path and referring origin in URLs; no cookies or browser storage are used. No raw referrer query, click IDs or cross-session visitor IDs are retained.

Default storage: `var/leads.sqlite`, outside public assets and ignored by Git. Set `LEAD_DATA_DIR` to a persistent protected directory on the eventual backend server. Keep that directory and backups access-controlled. An empty database is created when preview starts; synthetic tests use in-memory databases and do not add sample leads to the operational file.

Resend notifications use server-only credentials, plain-text messages, Reply-To and a deterministic idempotency key. A failed or ambiguous email remains pending without losing the enquiry. `npm run leads:retry` retries pending notifications after configuration. Requests older than the provider's idempotency safety window require manual review to avoid duplicate mail. Resend acceptance proves an API send, not inbox delivery; a real mailbox test still remains.

For local operations, `server/store.mjs` exposes `export()` and `delete(id)`; deletion cascades to the matching conversion. They have no public HTTP endpoints. Do not print exports into chat/logs or store them in Git. Exact retention, deletion schedule and owner-access procedures need approval before live processing. There is no automatic retention policy invented by the build.

The server binds to loopback by default. The intended Cloudflare frontend remains static. This interim Node/SQLite API needs a persistent Node host behind HTTPS/reverse proxy, or later replacement by the shared Medon engine; deploying only `dist/` does not deploy the database or API. Configure an approved HTTPS endpoint with PUBLIC_LEAD_ENDPOINT and corresponding ALLOWED_ORIGINS if the API is hosted separately. API rate limiting currently uses local socket addresses; a reverse-proxy integration must establish trusted client-IP handling before production.

## Verification

- `npm run verify`: Astro diagnostics, functional tests, static build and HTML audit.
- `node scripts/qa-browser.mjs`: installed Chrome browser checks, desktop/mobile screenshots and synthetic form flow. Set CHROME_PATH if Chrome lives elsewhere.
- `node scripts/qa-home-h004.mjs`: current homepage/CMS/calculator/intake checks and nine 1440/390/320px review captures. Optional `QA_BASE_URL` and `QA_EVIDENCE_DIR` select the review host/evidence directory. Historical H-001/Invite scripts target their historical content revisions.
- `node scripts/qa-preservation.mjs snapshot` before implementation, then `node scripts/qa-preservation.mjs` after building: compares protected inputs, remaining-page JSON/HTML and shared CSS against the ignored local snapshot. H-004's receipt is in `../coordination/evidence/h004/`.
- `qa-output/`: ignored screenshots and browser results.

No-JavaScript submission stays disabled and has an explicit POST fallback, so personal details cannot be placed in a GET query. Server intake remains disabled without full local configuration. No real emails are sent by tests.

Node 24's built-in SQLite currently emits an experimental-feature warning. Pin the supported Node runtime and exercise backups/migration when selecting production infrastructure.

## Publication gate

OWNER authorized web publication for review rounds under H-003 / D-013; H-004 specifically delivers to `main` for the connected review Worker. The existing V3.3 target in `wrangler.jsonc` serves static `dist/` through Workers; it does not deploy the Node/SQLite API. Future pushes/deployments require their actual scoped handoff. Keep default preview environment/intake settings. `public/_headers` adds `X-Robots-Tag: noindex, nofollow` to deployed assets, alongside preview metadata/robots. A production launch must revisit that preview header and all readiness gates below.

Astro's build lifecycle checks the same resolved environment files used by Astro, including `.env.local` and `.env.production*`. Setting SITE_STAGE=production requires every page to be CONTENT_LOCKED/PUBLISHED, privacy and lead readiness, Resend configuration and LAUNCH_APPROVED=true. That flag is an operational assertion of an actual owner decision, not a substitute for obtaining one.

Before launch: review complete content and representative desktop/mobile composition; finalize public pricing/scope/terms and privacy/retention; configure and verify real notification delivery; establish persistent hosting/backups, trusted proxy/rate limits, domain/redirect/native Git deployment and production conversion measurement/Search Console; obtain launch authorization. H-003 authorizes review publication only; these production requirements remain unresolved.

Documentation references: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [Pages CMS configuration](https://pagescms.org/docs/configuration/), [Resend send API](https://resend.com/docs/api-reference/emails/send-email), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
