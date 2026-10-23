# D-127 — Synlighet dropdown, topical authority and Resend-first launch path

Date 2026-10-23. State **OWNER DIRECTION RECEIVED / SCOPED REVIEW IMPLEMENTATION REQUEST**, not a public launch or production lead-intake approval.
Canonical project: `AnelPasic/optimalisering.oslo.noV3.3`; read fresh main. Supersedes the C0/C1 consultant's recommendation of a permanently **flat** desktop navigation; preserves H-024C1/D-119 accepted CMS, content/master proof/price/voice, NOINDEX preview and launch controls. The prior C0/C1 local report may exist only in OWNER/Codex workspace; never assume it is committed without checking.

## OWNER correction

- OWNER wants **Synlighet** as BOTH a real clickable main-level hub at `/synlighet/` AND an expandable submenu listing **SEO (short explanation), AIO/AI-synlighet (short explanation), Lokal SEO (short explanation)**. Do NOT replace the parent page with an unclickable toggle.
- OWNER wants Optimalisering Oslo to become a more complete topical authority around optimization (service + educational intent) instead of a very small brochure. Prioritize customer utility and documented expertise, not arbitrary page volume or mass-generated doorway copy.
- OWNER reports the **existing live website uses Resend** and wants forms enabled as soon as genuinely functioning. Do not confuse a working Resend sender on the old site with deployed form ingress/lead storage on the new static Worker. Choose the least-complex **verified** reuse route, rather than gratuitously deploying a separate Node/SQLite service.

## N1 — Dropdown/navigation implementation (NOW, preview scope)

- Existing `app/src/components/HomeHeader.astro`: flat `chrome.navigation` links; `app/src/content/pages/home.json` has Synlighet, Konvertering, Priser, Innsikt and header CTA Gratis sjekk. Keep existing top-level identity, order, CTA and house design. Replace only Synlighet presentation with a **clickable link** + adjacent **separate disclosure button** (`aria-expanded`, `aria-controls`), never one anchor whose click both navigates and opens.
- Dropdown destinations and descriptive Norwegian labels:
  - `/synlighet/`: clickable parent hub, visible in child submenu too as “Oversikt over synlighet” if it helps mobile discoverability;
  - `/seo/`: **SEO** — “Bli funnet i Googles organiske søkeresultater”;
  - `/ai-synlighet/`: **AI-synlighet (AIO)** — “Bli lettere å forstå og finne i AI-søk og svar”;
  - `/lokal-seo/`: **Lokal SEO** — “Google Maps, Google bedriftsprofil og lokale søk” (**new page not yet implemented**).
- Add **no dead menu item**: stage the local SEO route in the same scoped branch when content/schema/build is ready or keep the item visibly out of actual deployed menu until its valid route exists. New page content must be researched, accurate and MWS-031 reviewed before OWNER content/publication approval. No fabricated rankings, map guarantees, customer evidence, results or prices.
- Use one structured, validated nav authority: extend Pages CMS `homepage.chrome.navigation` and matching content schema with **typed optional children**, stable href/label/description, without free HTML/CSS, or document a simpler safe alternative with no duplicate hardcoded links. Maintain the same nav on every page. Preserve CMS master/global sections and avoid an unrelated page builder migration.
- Native daisyUI navbar/menu/dropdown parts where suitable; accessibility and responsive controls at 320/390/900/1440. Pointer + keyboard + touch; Escape closes, focus is managed, opening one menu closes others, no hover-only access, active route `aria-current=page` applies to the destination link and parent category is indicated in context without falsely marking multiple page links current.
- On mobile, parent hub link and submenu disclosure are **separate** targets, each approximately 44x44 px or with equivalent clear hitboxes. Fix known 320px hamburger shrink; preserve visible Gratis sjekk CTA. Desktop dropdown should not hide link navigation behind extra click. Assess sticky as a **separate optional comparison**, do not automatically apply it.
- Keep top-level Konvertering/Priser/Innsikt flat for now; more dropdowns should follow real page taxonomy/need, not automatic expansion. Preserve direct crawlable links from `/synlighet/` to all three specializations, not menu-only JS links.
- Report focused unit/build/links/anchors, keyboard/Escape/screen widths, noindex preview visuals and any direct CMS round-trip validation as applicable. No live form POSTs or production cutover as part of N1.

## N2 — Authority content architecture (parallel research, staged draft)

Current content records already include `/synlighet/`, `/seo/`, `/ai-synlighet/` and `/innsikt/`, plus articles, pricing and conversion. There is no `app/src/content/pages/lokal-seo.json` on current main. Keep existing URL slugs (especially `/ai-synlighet/` rather than a new `/aio/` alias without redirect plan).
- `/synlighet/` = commercial *hub*: what is the difference between SEO, AI-synlighet and local SEO, how to decide, proof where approved, and which commercial action follows.
- `/seo/`, `/ai-synlighet/`, `/lokal-seo/` = distinct, thorough customer-facing service/explainer pages with non-overlapping core intents and useful cross-links. “AIO” is understandable professional shorthand, but “AI-synlighet” is the clearer default visitor-facing term; use both appropriately.
- `/innsikt/` = supporting evergreen and original practical guides, research, measurement and case-based explanations with descriptive anchors back to service pages. Candidate subtopics require actual demand/research, not bulk generation for rank manipulation.
- Keep `/konvertering/` as distinct service family; extend later only when content intent and concrete expertise warrant dedicated pages. Do not force all services into the Synlighet dropdown.
- Before promoting a new content page: page's role, unique search/user intent, what Medon can factually deliver, internal links, CTA, data source/claim permission, SEO title/meta and accessible copy. Verify Pages CMS can edit the added page safely. Noindex remains in preview.

References: Google Search Central people-first quality and SEO site structure
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## N3 — Resend-first lead & order completion (FAST PATH, do not assume `enabled=true` alone)

Source audit:
- `app/server/resend.mjs` **already implements Resend outbound API send**, idempotency and stored notification status; `app/server/http.mjs`, `store.mjs`, `config.mjs` implement a separate local Node/SQLite API with origin/retention/notification gates.
- `app/src/components/HomeAssessment.astro` (the main `/#sjekk` CTA) is **hard-disabled and does not submit** even if public lead flag changes.
- `app/src/components/AssessmentForm.astro` (`/vurdering/`) and `PackageOrder.astro` have guarded JS transport using `PUBLIC_LEAD_ENDPOINT`. This endpoint **is not deployed** by current static `app/wrangler.jsonc`, which serves `dist` assets only.
- `app/server/resend.mjs` still references optional legacy `company`/`contact` in order email text; normal modern package form only asks website/email/phone. Adjust template without changing protected three-field UI and correct four old failing phone fixtures.
- OWNER states an existing **live site uses Resend**. **First discover what endpoint and infrastructure are genuinely live**, whether it accepts the needed payload + verified trusted origin, its domain/sender/recipient, retention/privacy and whether it can be safely reused. Do not print or check in keys, recipient secrets or real lead PII.
- Prefer the **shortest safely tested path**. If the existing endpoint is compatible, reuse its nonpublic ingress or add a backward-compatible normalizer without breaking current live submissions. If not, propose a small approved same-origin Cloudflare Worker `/api/leads` with server-only Resend API key, durable receipt/idempotency and reasonable abuse/privacy controls; don't pretend a bare static Worker or browser-side Resend SDK is a safe ingress. A separate long-running Node/SQLite host is NOT a required default if simpler verified infrastructure works.
- Normalize free-check and order events into **one receiving contract**, with per-intent subject/template and selected `package`/phone as applicable, match existing data/attribution controls. No direct browser calls to Resend; secret server-only.
- Prove focused tests + one no-production synthetic inquiry and order through the actual configured endpoint to the **approved monitored inbox**, correct contents, retry/dedupe, redaction, error handling and persistence; no success message without confirmed acceptance.
- Verify/record accountable Medon provider contact, correct privacy/terms, controller/processor and retention facts. Do not self-approve GDPR/privacy, fake contact addresses or flip SITE_STAGE/LAUNCH_APPROVED/PRIVACY_APPROVED/public flags on unsourced assumptions. **OWNER's desired speed is an objective, not evidence of a deployed ingress**. Produce the minimal remaining factual/operational owner checklist rather than building an oversized system.

## Scope, handoff and finish criteria

**First implementation Codex task**: N1 dropdown implementation and 320px fixes + N2 local SEO page *research and editor-ready draft*, plus N3 **read-only endpoint discovery and minimal implementation plan**. Deliver noindex screenshots and exact test evidence. N3 live-email verification/activation is a separate scoped task after endpoint and privacy facts are confirmed. Avoid repeating the C0/C1 full inventory or rewriting approved pages. Preserve approved D-122 package UI, D-126 FAQ copy, global masters, pricing/proof and H-024C1 Page Builder. No Medon starter PR #4 code extraction, NO/EN publishing, dark-theme release or indexed launch here.
