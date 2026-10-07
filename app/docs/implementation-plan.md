# Optimalisering Oslo implementation plan

> For agentic workers: execute natively with superpowers:executing-plans; use the separately assigned content and red-team roles required by the Medon system.

**Goal:** Build the actual reviewable Norwegian Astro website under app/ from the curated pilot seed.

**Architecture:** Static routes from validated JSON content collections. Shared layouts, service and editorial templates, progressive browser interactions, and a configurable shared lead adapter. Git-backed semantics exposed through Pages CMS.

**Tech Stack:** Astro, TypeScript, local Instrument Sans/Figtree, Node test runner.

**Spec:** build-spec.md.

## Global constraints

- system/ and project/ are read-only; no historical project imports.
- Astro static; Git + Pages CMS; Cloudflare is the intended later host.
- Content remains REVIEW_REQUIRED until material owner review.
- No historical prices, unpublished proof, invented terms or platform guarantees.
- No visitor tracking or lead PII persistence; no custom lead backend.
- All draft previews are noindex; production requires explicit readiness gates.

## Review focus

Bare domains should be easy to enter; unsafe URL schemes must fail. Backend errors and ambiguous acknowledgements must never look like success. Mobile content and menus must work at 320px. CMS edits must render without stale hard-coded commercial text. Hypothetical arithmetic must remain clearly labelled and unit-correct.

## Task 1 — Content and site foundation

- [x] Separate strategy/content role drafts the portfolio as semantic JSON.
- [x] Create validated Astro content collection, static route loader and preview/production guards.
- [x] Create repository-root Pages CMS schema pointing into app/.
- [x] Verify draft statuses, distinct URLs and CMS-compatible JSON.

## Task 2 — Functional adapters

Files: src/lib/lead.ts, src/lib/leverage.ts, tests/lead.test.ts, tests/leverage.test.ts.

Interfaces: normalizeWebsite(string): string|null; createLeadPayload(fields,page): LeadPayload; submitLead(endpoint,payload,options): Promise<void>; calculateLeverage(visits,conversion): number.

- [x] Write failing tests for invalid URL schemes, minimal payload, backend rejection, ambiguous success and timeout.
- [x] Verify failure before adding implementations.
- [x] Implement a minimal configurable transport and clearly illustrative arithmetic.
- [x] Run node --test tests/*.test.ts and verify all pass.

Owner steering: add reusable interim Node/SQLite API and Resend notifications, storing conversions and source locally. Added atomic/idempotent storage, HTTP intake validation, retry state, source forwarding and production-environment guard tests.

## Task 3 — Representative homepage and conversion path

Files: src/layouts/SiteLayout.astro, src/components/, src/styles/global.css, src/pages/[...slug].astro.

- [x] Implement shared navigation/footer, representative homepage, service hub, illustrative arithmetic, process and assessment form using real draft content.
- [x] Build, serve and inspect complete homepage on desktop/mobile.
- [x] Correct observed hierarchy/overflow/accessibility issues inside the selected visual direction.

## Task 4 — Distinct remaining page roles

- [x] Render service, pricing, assessment, article/index and utility templates from strategy/content JSON.
- [x] Keep meaningful in-site links and breadcrumbs; add 404, canonical metadata and deliberate robots/sitemap behavior.
- [x] Verify all BUILD_NOW routes and reject accidental duplicate/BUILD_LATER pages.

## Task 5 — QA and handoff

- [x] Run Astro check, functional tests, preview build and static HTML audit.
- [x] Browser-check responsive navigation, calculator and form validation/unconfigured state.
- [x] Obtain independent red-team findings and fix validated implementation issues.
- [x] Compare system/project hashes to baseline and record launch dependencies.
- [x] Deliver local preview and instructions without publishing or pushing.
