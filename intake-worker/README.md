# Medon form intake — D-128 candidate

**Status:** SOURCE CANDIDATE / LOCAL TESTS ONLY; **not deployed and not authorized for production.**

A small, independent Cloudflare Worker + D1 receiver for Medon-owned commercial sites. Stores a durable D1 receipt before returning HTTP 201/200, notifies Resend asynchronously, and retries with one Cron Trigger. Admin is read-only/export-only with **cryptographically verified Cloudflare Access RS256 JWT** and explicit administrator email allowlist. The current implementation is NOT a CRM, and LeadProof does not yet accept lead PII.

## Deployment model

- One Worker and one shared D1 database **only for websites Medon owns/controls**, each distinguished by an allowlisted `site` and HTTPS Origin. A public Origin is *not authentication*; add Cloudflare WAF/Turnstile, abuse controls and approved privacy/retention before public release.
- For unrelated external customer data, deploy separate Worker/D1 or a thoroughly reviewed tenant model. Do not place multiple customers with unrelated Access policies into this admin simply because the database supports a `site_id`.
- Resend sender/recipient are one internally approved pair in this candidate, not customer-configurable. Sender domains and quotas are Resend account-level constraints.
- No direct calls from browsers to Resend. `RESEND_API_KEY` remains Worker-only. No secrets, user leads or DB identifiers in the repository.
- One cron (`*/10 * * * *`) handles pending/failed notifications. A claim/lease and fixed Resend idempotency key avoid most duplicate sends. After Resend's idempotency window, uncertain sends require manual review instead of blind replay.
- A future LeadProof integration will exchange a stable `submission_id`, while browser-side Gate 1 events must remain **PII-free**. No LeadProof forwarding in this candidate.

## What exists

- `POST /api/leads`: same JSON shape as the existing `createLeadPayload` and `createOrderPayload`, explicit `Idempotency-Key`, per-site Origin allowlist, 16KiB maximum JSON, D1 insert-or-idempotent read, 409 for same key/new payload. The response **only** confirms durable storage, never successful email delivery. CORS is limited to configured origins.
- `scheduled`: single notification retry for up to five attempts, capped to Resend's 24-hour idempotency safety window; exhausted/uncertain entries are flagged for manual review.
- `/admin/`, `/admin/api/sites`, `/admin/api/leads`, `/admin/api/export?site=...&offset=...`: a minimal login-protected reader, JSON export in 500-item pages, no create/edit/delete and no processing statuses beyond delivery. Dashboard exports all pages in-browser; larger archives should use an authenticated operator backup job.
- `migrations/0001_init.sql`: D1 schema with unique `(site_id, submission_id)` and separate Resend/LeadProof states.

## Safe local preparation

1. Review `src/`, migration and the tests. Run `cd intake-worker && node --test tests/*.test.mjs` on Node >=22. Tests use **in-memory Node SQLite and fake Resend responses**; they never send live mail or touch Cloudflare.
2. After separate operational approval, create a D1 database, copy `wrangler.example.jsonc` to `wrangler.jsonc`, fill the database ID, supply secrets using Cloudflare's secret configuration, apply migration first to a disposable D1 test database, and run `wrangler dev`/authenticated staging browser tests.
3. Configure the dedicated intake Worker on a custom HTTPS endpoint and allow only approved site origins in `SITES_JSON`. Frontend integration of `/#sjekk`, `/vurdering/` and package ordering is **a separate site task**: do not change preview flags or public forms before staging delivery is verified.
4. Protect **every** `/admin/*` URL with Cloudflare Access **and** set the correct `ACCESS_ISSUER`, `ACCESS_AUD`, `ALLOWED_ADMIN_EMAILS`. Cryptographic verification is a defense in depth even if `workers.dev` is reachable. A missing/unverifiable JWT fails closed.
5. Verify three actual synthetic flows: gratis sjekk, each package key and Resend outage/recovery including real monitored inbox delivery, exact D1 receipts, no false user-facing mail success, duplicate submissions and monitoring.

### Remaining release blockers (not solved by this PR)

- Verified sender, real Resend credentials, mailbox ownership, Cloudflare account, origin and production destination, legal privacy basis, data controller, processors, retention/deletion and DPA, backup/restore and operations.
- Real anti-spam controls (WAF rate limits / Turnstile and trusted edge client identity); the CORS Origin check and website honeypot alone **do not stop non-browser spam**.
- Separate role- and provider-approved production domain/routing, Cloudflare Access policy, D1 migration receipt, staging→live cutover and rollback.
- The original live sender's actual infrastructure is not reused here; that could be reevaluated if a compatible and safely verifiable existing endpoint is discovered.
- Current site `HomeAssessment.astro` has no transport; `AssessmentForm` and `PackageOrder` remain gated. Integration must reuse existing three-field order schema, correct old test fixtures and address conflicting response-time/privacy/terms copy before launching.
- Validation is **unit tests on a D1-shaped local SQLite adapter**, not authenticated Cloudflare Worker+D1 integration tests, live Resend nor site/browser testing. This PR cannot be called production ready until those tests pass.

## Billing

Cloudflare Free currently includes 100k Workers invocations/day shared per account and at most 10 D1 databases/account; the D1 total storage/counter ceilings also apply. Keeping 10–15 Medon-owned sites in one appropriately isolated database *can* stay in free tier at small volumes. For client-separated storage, Workers Paid base is about $5/account/month plus any usage. Resend Free has its own per-team/domain/month/day limits, not 15 independent allowances.

Sources: https://developers.cloudflare.com/workers/platform/limits/ , https://developers.cloudflare.com/d1/platform/limits/ , https://developers.cloudflare.com/d1/wrangler-commands/ , https://developers.cloudflare.com/workers/configuration/cron-triggers/ , https://resend.com/pricing .
