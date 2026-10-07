# Project Technical Preflight — optimalisering.oslo.no

Date: 2026-10-05 (Europe/Oslo)
Status: APPROVED / LOCKED at architecture level; operational integrations TO_VERIFY.
Authority: owner's explicit Gate 0 approval in this chat. Supersedes the agent's initial recommendations.

## Project
- Project mode: greenfield commercial website.
- Workflow profile: STANDARD.
- Site ownership: MEDON_OWNED.
- Business/project owner: Medon AS.
- Domain: optimalisering.oslo.no.
- Older domain/project versions do not change the greenfield classification. Inspect existing URLs/infrastructure before production cutover.

## Frontend / content / assets
- Astro; static production output for normal public pages.
- Pages CMS is the default editing layer. Git remains the content/source-of-truth layer.
- Astro image pipeline for normal site assets.
- Runtime functionality only for a verified functional requirement.
- Sanity and Nuxt are not approved. Reopening requires a verified editorial/application requirement and formal Change Request.

## Repository / hosting / deployment
- New private GitHub repository under AnelPasic.
- Proposed repository name: optimalisering-oslo-v3; availability/access TO_VERIFY.
- main is the production branch.
- Git from the first meaningful implementation commit.
- Medon AS owns the project/code; AnelPasic is the operational repository host.
- Intended hosting: Cloudflare.
- Prefer native Git deployment: branches/pull requests -> preview; main -> production.
- No GitHub Actions unless a concrete requirement cannot be satisfied by Cloudflare's native Git workflow.
- A protected preview/staging environment may be used where materially useful; avoid unnecessary infrastructure.
- Exact Cloudflare product/native integration, access protection and rollback mechanics TO_VERIFY during integration, without reopening the approved hosting/deployment principles.
- No repository, hosting resources or production deployment created by this documentation step.

## Leads
- Frontend remains backend-agnostic.
- Use a reusable Medon Lead Engine / shared Medon lead backend.
- Resend is the approved notification-provider direction; integration/account/sender TO_VERIFY.
- Do not build a site-specific Worker + D1 + Resend system unless shared architecture is verified materially unsuitable and a Change Request is approved.
- If no suitable shared backend exists, preferred fallback: ONE reusable Medon Lead / Measurement API.
- PHP + MySQL is acceptable, and may be preferable where simplest for reliable shared operation, administration and reporting. No backend language/database is locked yet.
- Target lifecycle: lead -> contacted -> qualified/disqualified -> offer -> won/lost -> revenue/value.
- Shared infrastructure does not authorize cross-site visitor identity tracking.
- No lead PII in Git or Pages CMS.

## Measurement
- Google Search Console: queries, impressions, clicks, landing pages, indexing/search discovery.
- First-party Medon Measurement: page/source measurement, lead attribution, quality, customer outcome and eventual revenue/value.
- No GA4 by default. Adding GA4 requires a concrete requirement and Change Request/owner decision.
- Avoid analytics cookies, localStorage tracking, fingerprinting, cross-site tracking, persistent anonymous visitor IDs and unnecessary user-level behavioral profiling.
- Prefer minimal first-party/server-side measurement.
- Candidate fields, only where justified: timestamp, landing page/page, referrer/source, UTM source/medium/campaign/content, basic device class, form/source identifier.
- Preserve legitimately available attribution at lead creation. Do not promise a complete cross-session/user journey without the identifiers explicitly excluded here.
- Search Console remains separate; its aggregated discovery data is not automatically attributable to individual leads.
- Privacy, retention, legal basis, processor arrangements and exact fields must be resolved BEFORE production measurement implementation.

## Ownership / secrets / operations
- Code: Medon project asset, operationally stored under AnelPasic.
- Content: Git + Pages CMS.
- Lead/customer data: Medon-controlled shared backend.
- Images/content assets: project-owned assets through approved pipeline.
- Secrets: deployment/environment/runtime secret storage only; never Git/client bundles.
- Domain use: optimalisering.oslo.no. Exact domain/DNS control remains TO_VERIFY.
- Account administrators, notification recipient, export/deletion operation and production cutover checks remain operational integration tasks.

## Unknown classification
Every unresolved item must state BLOCKS_CURRENT_GATE or DOES_NOT_BLOCK_CURRENT_GATE, with the gate at which it becomes necessary.

| ID | Unknown | Classification for Gate 1 | Required before |
|---|---|---|---|
| U-OPS-01 | Cloudflare account/admin, exact native Git integration and protected preview | DOES_NOT_BLOCK_CURRENT_GATE | Integration/deployment |
| U-OPS-02 | DNS controller/access, existing URLs/infrastructure and redirect needs; 2026-10-06 read-only inventory attempt inconclusive | DOES_NOT_BLOCK_CURRENT_GATE | Production cutover |
| U-OPS-03 | Repository name availability/permissions, repo not yet created | DOES_NOT_BLOCK_CURRENT_GATE | First meaningful implementation commit |
| U-OPS-04 | Existing shared Lead Engine endpoint/capabilities and reusable fallback | DOES_NOT_BLOCK_CURRENT_GATE | Lead implementation |
| U-OPS-05 | Resend account, verified sender and notification recipient | DOES_NOT_BLOCK_CURRENT_GATE | Lead notification testing |
| U-OPS-06 | Privacy/legal basis, retention/deletion, fields and processor arrangements | DOES_NOT_BLOCK_CURRENT_GATE | Production measurement implementation and real lead processing |
| U-OPS-07 | Search Console verification/access and reporting operation | DOES_NOT_BLOCK_CURRENT_GATE | Launch measurement verification |

## Change control
Locked decisions may be reopened only on a new verified conflicting requirement, demonstrated material implementation unsuitability, or explicit owner reconsideration. First try to solve within the lock. Use governance/DECISION-LOCKS.md and templates/CHANGE-REQUEST.md. Technological preference is not a reopen trigger.
