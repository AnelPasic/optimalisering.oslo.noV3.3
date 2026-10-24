# D-129 durable form ingress

Development/review implementation under `coordination/D129-WORKER-D1-RESEND-IMPLEMENTATION.md`. No resources, public route, real email, customer data or deployment are created by this directory. `app/wrangler.jsonc` remains the unchanged static review site; this is a separate Worker configuration with a dummy local D1 ID, disabled public routes, no cron and all processing flags off.

## Local verification

Use Node 24.12+ and the existing locked toolchain: `npm ci --prefix app` from repository root. Then:

```powershell
npm --prefix app run test:intake
node app/node_modules/wrangler/bin/wrangler.js deploy --config intake-worker/wrangler.jsonc --dry-run --outdir intake-worker/dist
node app/node_modules/wrangler/bin/wrangler.js d1 migrations apply d129-local-receipts --local --config intake-worker/wrangler.jsonc
npm --prefix app run check
npm --prefix app run build
npm --prefix app run qa:intake:review
```

The test suite uses synthetic `.test` addresses, SQLite executing production SQL, and actual Miniflare/workerd + local D1 with **all outbound Worker fetches replaced** by a test callback. It sends no real email. Browser QA permits only loopback GET/HEAD, asserts zero POST and checks all three forms at 320/390/1440px, including ordinary `form.submit()` and no-JS controls. Local screenshots/report live in ignored `app/qa-output/d129/`; CI uploads them as an artifact. The pinned Miniflare 5 alpha exposes `convertV4MiniflareOptions`; no new dependency tree was added. Compatibility date `2026-10-06` matches that locked runtime; update and reverify at a separately approved release, rather than upgrading the whole site here.

## Receipt contract and site boundary

`POST /api/leads`, JSON ≤16KiB, body deadline 5 seconds. Required `Origin`, JSON content type and `Idempotency-Key` of 8–100 ASCII letters/digits/`_`/`-`. The existing `createLeadPayload` and `createOrderPayload` remain canonical validators. Required assessment fields: website/email. Orders additionally require the existing package key and phone; legacy company/contact remain optional. Attribution is restricted and URL queries removed. Filled `website_confirmation`, malformed types and invalid fields fail before persistence. Browser callers carry no secret.

Each Worker has **one server-configured `SITE_ID`**, one exact HTTPS `INGRESS_ORIGIN` and an exact browser `ALLOWED_ORIGINS` list. A body cannot select another tenant. Host/URL, origin and body-site must all match their bindings. Origin is a browser boundary, not proof of the caller's identity; non-browser clients can forge it. A required Cloudflare Rate Limiting binding enforces the public IP key (10 requests/minute in the checked-in development config), failing closed if unavailable. `CF-Connecting-IP` must be provided by Cloudflare's edge. No public bearer key belongs in browser code. Rate Limiting is approximate/distributed, so quotas and abuse still need monitoring; assess WAF/Turnstile during authorized launch verification if actual traffic requires it.

Independent controls are `SITE_STAGE=production`, `PRIVACY_APPROVED=true`, `PUBLIC_LEADS_ENABLED=true` and, for orders, `PUBLIC_ORDERS_ENABLED=true`. None is enabled in this checkout's configuration. Public flags are operational gates, not authentication. `/vurdering/` and package forms already share `PUBLIC_LEAD_ENDPOINT`/`submitLead`; preview now explicitly closes standalone assessment transport too. `HomeAssessment` remains hard-disabled, with the agreed endpoint recorded and native submits guarded; **no homepage transport activation is implied**. Existing site production build approvals remain separate.

An atomic D1 insert has `UNIQUE(site_id,idempotency_key)`. Only after commit and reading the canonical ID does a response return `{ok:true,id,receipt_status:"stored"}`: 201 new, 200 same normalized content, 409 changed content. Database errors (including uncertain write results) never return success. A retry can recover a committed receipt after a lost response. ACK contains no personal data and promises neither email delivery nor LeadProof delivery. No browser API lists or retrieves a lead by its public receipt ID.

## Notification outbox and retry

Pending receipts are the durable outbox. After storage, `waitUntil` attempts one notification only when `SEND_NOTIFICATIONS=true`, production stage, privacy and all sender secrets are configured. A process canceled before that job runs leaves a pending row for the next sweep. Server-only secrets are `RESEND_API_KEY`, `RESEND_FROM` and `LEAD_TO_EMAIL`; provide them later via the platform secret store. Use a sending-only provider key and an authorized, verified sender/domain and recipient. Never put them in public flags, CMS, Git, logs or static assets. `.dev.vars.example` contains empty placeholders, not usable configuration.

There is one internal notification template per intent. Claiming a row increments durable attempts and obtains a 60-second lease/token. The exact provider body (including recipient/template) is frozen in D1 **before sending**; loss of the lease before freezing prevents sending. All completion updates check the same token. Retries preserve body and `receipt/<opaque-id>` provider key even if sender settings later change. Configuration changes therefore do not reroute pending emails already frozen; review such rows before rotating sender/recipient.

Provider calls time out after 8 seconds (including body read), responses are bounded, and redirects are never followed. A 200/201 with a nonempty provider ID records `accepted`, **not delivered**. Network/timeout/malformed-body outcomes record `resend-uncertain`; 408/409/429/5xx retry with backoff and bounded Retry-After. Definitive other 4xx become `dead_letter`; unexpected success/status becomes `manual_review`. Delays are 1m, 5m, 15m, 1h, 4h, at most five attempts. Expired final leases and attempts beyond the 23-hour safety window become manual review; Resend's idempotency window is 24 hours. There is no guaranteed exactly-once mailbox delivery. Do not blindly reset old/uncertain rows; reconcile the provider ID/logs and intended mailbox first.

`scheduled()` and `POST /admin/retry` run the same bounded sweep (up to three rows for the configured site). Both rediscover expired claims and save-before-job interruptions. Checked-in crons are empty; no automatic retry service has been provisioned. After authorization, choose one hourly cron for the first site or authenticated manual/operator scheduling. Check the **account-wide** cron allowance before adding sites; do not create a cron per site on a shared Free account without checking limits. Sweep cadence/capacity must match volume; three/hour is insufficient for higher volumes. Inspect old `pending`, overdue `retry`, expired `sending`, `dead_letter` and `manual_review` rows; alert via the approved operations channel, without logging payloads. A failed sweep logs a static error code only. Enabling logs later requires explicit redaction/sampling review; HTTP request URLs/exports must not carry PII.

## Private read/export

No dashboard or CRM is built. `GET /admin/receipts`, `GET /admin/export?format=json` and `GET /admin/export?format=csv` return at most 100 records per page, scoped to `SITE_ID`. Supply the returned JSON `next` or CSV `X-Next-Cursor` as `after` to continue until absent/null. UUID keyset order is a paginated backup read, **not a transactional snapshot**: quiesce intake or use D1 backup for a consistent full export during concurrent writes. CSV quotes delimiters/newlines and neutralizes spreadsheet formula prefixes.

All admin paths require a cryptographically valid `Cf-Access-Jwt-Assertion` (RS256, current trusted JWKS, exact issuer, audience, subject and time claims) plus a server-configured email/site/action grant. Configure `ACCESS_ISSUER=https://<team>.cloudflareaccess.com`, exact application `ACCESS_AUD`, and `ADMIN_GRANTS_JSON` such as `{"operator@example.test":[{"site":"optimalisering.oslo.no","permissions":["read","retry"]}]}`. This sample is synthetic; use only approved operators. No wildcard tenant/action grants. This implementation expects user Access tokens with an email claim; service-token automation needs separate identity/permission verification before use. Keys are fetched only from the configured issuer, with size/time bounds; authentication fails closed when unavailable. Bare email headers, unsigned tokens and alternate key URLs grant no access. PII responses have no CORS, use `no-store`/noindex/nosniff, and never expose secrets or raw provider errors. Retry additionally rejects foreign browser Origins. Apply Access protection to `/admin/*` on the eventual hostname; Worker JWT verification remains mandatory even if a direct URL could bypass the Access proxy. No live Access application is configured here.

## Provisioning, privacy, recovery and later integration — OWNER/OPS gates

The following is a runbook for a **later approved** setup, not authorization to execute it:

1. Confirm factual privacy/terms/contact authority, controller/processor responsibilities, data location, retention period, erasure/export handling, recipient access, and content/launch readiness. No real personal data may be used before that review. Set a documented retention schedule and owner; no guessed retention period is encoded here.
2. Create/bind the approved D1, replace the dummy ID in a private deployment config, and apply `migrations/0001_receipts.sql` there. Never run `--remote` using this development handoff. Protect backups/exports outside Git, Pages CMS, public assets and R2 public buckets. D1 is receipt storage, not a contact/follow-up database.
3. For the first site use one dedicated Worker and exact site/ingress/origin configuration. A shared D1 is suitable only for explicitly approved Medon-owned sites: each Worker still fixes its site, and every read/claim/sweep binds that site. This is application isolation, not separate credentials: each shared D1 binding has database-wide capability. For external customers or stronger isolation use separate D1/bindings/accounts and evaluate the paid plan when account database limits require it.
4. Provision authorized sender/recipient and sending-only secrets; configure scoped Access/permissions and abuse controls. No wildcard CORS, secrets in browsers, or unauthenticated backup API. Keep public forms and all submission flags off while validating the approved synthetic environment.
5. Prove endpoint → canonical D1 receipt → Resend accepted → **intended mailbox received**, with duplicate/racing requests, lost ACK, provider failure/uncertainty, retry/window cutoff, site isolation, invalid JWT and paginated JSON/CSV. Current mocked acceptance does not prove Resend credentials, sender authorization, mailbox receipt, production D1 or live Access.
6. Enable one approved retry schedule and monitor age/backlog/manual states and provider/D1 quotas. Verify restore using D1 Time Travel or an authenticated private D1 export in an isolated restore database; keep notification sending off during recovery. Reconcile notification IDs before any recovered outbox runs. Test configuration rollbacks without deleting receipt history.
7. Execute approved retention or data-subject deletion by parameterized site-scoped SQL (`DELETE FROM receipts WHERE site_id=? AND id=?`, or a reviewed cutoff on `created_at_ms`). Deleting a receipt also deletes its frozen notification and idempotency identity; dedupe lasts only as long as retained receipts. Erase private exports/backups/provider copies according to the separately approved policy. No unauthenticated deletion endpoint or automatic unknown-period purge is introduced.
8. LeadProof remains `not_configured`. Preserve the opaque receipt ID/site/intent for a future approved handoff, with its own retry/ACK/privacy contract. Do **not** send raw website/email/phone/message/notification bodies to LeadProof's current event-only Gate 1. No forwarding is implemented or network call made.

OWNER must separately approve resource provisioning, real sender tests/PII, live Access, homepage connection, public form flags, indexing/DNS/production deployment, merge and release. Stop at draft PR here.

## Vendor references checked during implementation

- [Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- [D1 binding API](https://developers.cloudflare.com/d1/worker-api/d1-database/)
- [Workers Rate Limiting accuracy](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/#accuracy)
- [Access JWT validation and rotating keys](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)
- [Resend send API](https://resend.com/docs/api-reference/emails/send-email), [24-hour idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys)
