# Intake launch readiness - H-017A

Technical capability prepared for review on 2026-10-09 under D-062. This is not launch approval, a privacy assessment, proof of a deployed API or proof of mailbox delivery. No real lead or email was generated. See `coordination/H017A-INTAKE-READINESS.md` and the H-017A evidence packet.

## Implemented paths and current review boundary

`/vurdering/` uses the existing assessment payload, attribution, transport and idempotency path. Its review behavior is unchanged: valid submissions show the disabled notice and send no POST. The homepage's separate `HomeAssessment.astro` remains deliberately hard-disabled, regardless of the lead flag; it has no transport. Current homepage/service/free-check links target `/#sjekk`. **OWNER/STRATEGY_CONTENT INPUT REQUIRED:** authorize a separate scoped connection of that homepage form, or explicitly select the existing `/vurdering/` path before opening those customer entry points. H-017A does not change the homepage/form routing.

`/priser/` preserves the single form, package preselection/history, prices, support copy and layout. It now uses `createOrderPayload`, `captureAttribution` and `submitLead` when the dedicated public gate and an explicitly configured valid endpoint are present. It validates the three protected keys, required business/contact fields, website/email and optional phone/comment lengths; blocks honeypot/double submit; retains inputs and the same key after an uncertain response. An edited normalized payload gets a new key. Only a positive API acknowledgement containing a stored ID produces success. This means request received for follow-up, not a contract, payment, start date or work commencement.

The connected Worker is **static assets only**, with preview/noindex and default-off intake. `/api/leads` has no deployed Node handler there. No current backend, credentials, persistent data, DNS or real flags were changed. Enabled browser fixtures are separate ignored local builds; synthetic API stores are in memory and notification transports are injected fakes.

## Environment flags

| Setting | Consumer / meaning | Review / launch dependency |
| --- | --- | --- |
| `SITE_STAGE` | Build: production additionally invokes content/shared-copy/privacy/email/launch guards | Review stays preview; changing stage requires actual content and launch approval |
| `PUBLIC_LEADS_ENABLED` | Assessment frontend and shared API intake prerequisite | False on review; alone never opens orders |
| `PUBLIC_ORDERS_ENABLED` | Order frontend gate | Default false; additionally requires explicit valid `PUBLIC_LEAD_ENDPOINT` |
| `PUBLIC_LEAD_ENDPOINT` | Existing JSON transport, both intents | Root-relative safe path or credential/query/fragment-free HTTPS URL; production guard requires it explicitly |
| `ORDERS_ENABLED` | API order gate | Default false; API also requires all shared prerequisites |
| `ORDERS_DEPLOYMENT_APPROVED` | Non-secret production-build attestation for an enabled public order form | Default false. OWNER/OPS must document actual API deployment, matching gate, persistence, origin configuration and synthetic acceptance before setting true. It is not an automatic probe or approval from Implementation |
| `PRIVACY_APPROVED` | Shared API gate and production build guard | False until applicable factual/privacy review is recorded |
| `LAUNCH_APPROVED` | Existing production build guard | Explicit OWNER launch decision, not supplied by H-017A |
| `ALLOWED_ORIGINS`, `LEAD_SITE`, `LEAD_DATA_DIR` | API deployment configuration | Exact public origin/site and private persistent path required |
| `SOURCE_CAPTURE_ENABLED` | API source capture | Existing default true; OWNER must approve actual attribution handling |

Order builds require `ORDERS_ENABLED=true` and `ORDERS_DEPLOYMENT_APPROVED=true` when `PUBLIC_ORDERS_ENABLED=true`, as well as existing privacy/email/content/launch gates. The build's backend flags are an attested configuration mirror; they cannot prove that a separate running API has that configuration. Frontend/backend mismatch returns failure without success or a new record. The public flag is UX control, not server authorization: direct clients are governed by the API gates. Preview fixtures can exercise the public flag locally without production approval; they must never be published as the review build.

**OWNER/OPS INPUT REQUIRED:** deployed-backend configuration/evidence and a separately authorized enablement plan. Do not enable any real flag in this handoff.

## Secrets

The API requires server-only `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_TO_EMAIL`. No credential is a `PUBLIC_` value, CMS field or Git file. Existing build readiness also checks these keys; OPS must choose secure API/build secret provisioning and verify that built HTML/JS, logs and error responses expose none. Values in `.env.example` remain empty. **OWNER/OPS INPUT REQUIRED:** secret owner, least-privilege access, rotation/revocation and deployment method. No live secret was read or installed.

## Resend sender and recipient

`notifyLead` sends to the configured recipient and uses the enquiry email as reply-to. Assessment and order subjects/bodies differ; order contains selected key/company/contact/optional phone. Injected transport tests prove that distinction without calling Resend. Durable acceptance is independent of email: failures leave a pending notification with a coarse error code. **OWNER/OPS INPUT REQUIRED:** verified sender/domain, correct monitored recipient, processor/account configuration, delivery/inbox test under separate authorization, and operational handling of failed or suppressed mail. No real send or mailbox result is claimed.

## Persistent storage

`server/index.mjs` runs the API on localhost, creates `LEAD_DATA_DIR` and opens `leads.sqlite`. The Node/SQLite API needs separate persistent hosting and a trusted HTTPS reverse proxy or approved shared endpoint; Wrangler deploys only `dist` assets. SQLite stores normalized payload, unique idempotency key, timestamp, pending/sent notification state, attempts, first attempt, error code and Resend message ID. `leads` and one `conversions` row commit in a single transaction before HTTP 201. Conversion types distinguish `assessment_received` from `order_received`.

**OWNER/OPS INPUT REQUIRED:** chosen backend host/runtime, private persistent volume/path, filesystem permissions/encryption, capacity/durability requirements and tested restart behavior. An in-memory test proves application transactions, not operational disk durability. No database belongs in Git, CMS or public assets.

## Backup and recovery

WAL mode is enabled. No backup schedule, restore automation or disaster recovery plan is implemented. **OWNER/OPS INPUT REQUIRED:** a consistent SQLite-aware snapshot/backup method accounting for WAL, backup encryption/access/location, recovery objectives, operator and restore rehearsal. Restores must preserve idempotency, conversions and notification state; do not blindly replay already delivered mail.

## Retention, deletion and export

The store has `export()` and `delete(id)` helpers; foreign-key cascade removes the associated conversion. There is no authenticated operator UI, automatic retention job or documented approved retention duration. **OWNER/OPS INPUT REQUIRED:** lawful retention and deletion rules, authorised operator workflow, identity/access checks, secure export delivery, deletion from provider/backups, and audit evidence that avoids unnecessary personal data. These helpers alone are not an operational procedure or a privacy approval.

## Spam and rate limiting

Orders have a bounded hidden honeypot, native/client bounds and authoritative server validation. API accepts only allowed Origin, JSON POST, correct site/intent and at most 16 KiB; it limits to 10 requests per socket peer per 10 minutes. The in-process rate map resets on restart and is not shared across replicas. Origin is not authentication and scripted bots can forge it. Behind a reverse proxy the socket peer can be the proxy, causing a shared rate bucket; forwarded IP headers are currently not trusted or parsed.

**OWNER/OPS INPUT REQUIRED:** trusted-proxy topology and an appropriate upstream abuse/rate policy, size/time limits, replica behavior and monitoring. Do not expose the API directly or assume the existing socket limit is sufficient production anti-spam. Honeypot is defence in depth, not proof of a human enquiry.

## HTTPS, Origin and CORS

Same-origin `/api/leads` requires a deployed reverse-proxy route to the Node API. A separate endpoint must use HTTPS and allow the exact frontend Origin. API rejects absent/unapproved Origin, allows only POST/OPTIONS and `Content-Type, Idempotency-Key`, sets the allow-origin response to the matched origin, uses `Vary: Origin`, and sets no-store. Transport uses `credentials: omit` and no browser cookies/storage. **OWNER/OPS INPUT REQUIRED:** actual URL, TLS, allowlist, trusted proxy, request timeout, limits and CORS/preflight checks from the real frontend. No production domain or noindex change is authorized here.

## Attribution: persisted values versus metadata

Both paths use the same normalizer. Persisted `source` contains internal `page`, optional internal `landing_page`, optional referrer **origin only**, and allowed bounded `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`. Page/landing queries and fragments are removed; arbitrary fields are dropped. Order also persists canonical `intent: order`, `form: pakke-bestilling` and the selected key. Assessment remains `form: gratis-sjekk`. Submitted website query/fragment and credentials are not retained.

Routing `pakke`, `source_page` and `source_referrer` are entry-point metadata; the latter two become normalized landing/referrer values. The raw page URL, full referrer path/query, HTTP Origin and temporary socket rate key are not stored in the payload/conversion. Idempotency-Key **is persisted** to deduplicate requests. With source capture false, user source tags are discarded; the existing normalizer still supplies its `/vurdering/` default page, including orders. OPS must decide whether to retain capture rather than mistake that fallback for observed attribution.

UTM values are untrusted campaign labels, not proven journeys or revenue. The allowlist does not detect every possible personal name in a campaign value. **OWNER/OPS INPUT REQUIRED:** campaign naming/privacy policy and source-capture approval. No fingerprinting, additional analytics, cookie identifier or payload console logging was added.

## Privacy, controller and processor facts

**OWNER/OPS INPUT REQUIRED:** applicable controller identity/contacts, processing purposes and legal basis, categories of data, actual processors/subprocessors/locations/transfers, retention, rights/contact procedure, access/security controls and approved public privacy wording. Do not infer these facts from the provider name, existing draft `/personvern/` or the technical ability to delete/export. No draft is promoted and `PRIVACY_APPROVED` stays off.

## End-to-end synthetic test

`npm run verify`, `node scripts/qa-intake-h017a.mjs`, `node scripts/qa-production-guard.mjs` and the existing browser suite cover the local code. Focused tests exercise all three keys, invalid input/honeypot, normalized attribution, store failure, separate gates, distinct fake notification, double-submit and a lost acknowledgement followed by a stable-key retry. Review browser tests exercise both assessment locations and package preselection at desktop/mobile with **zero POST**. Fake keys/addresses and in-memory storage cannot send real email.

**OWNER/OPS INPUT REQUIRED:** separately authorized synthetic end-to-end rehearsal against the chosen deployed API/private persistent store, restart/backup restore, production Origin/CORS, provider delivery and monitored recipient. Evidence must identify the revision, environment and intentionally synthetic records. No real customer details or live emails are allowed by H-017A.

## Monitoring and failure retry

`/api/health` reports `leadsReady` (shared config only, not order readiness, disk health or email delivery). The retry command processes pending stored enquiries without printing payloads. Resend calls have an 8-second timeout and stable `lead/<id>` key; browser transport has a 12-second timeout. In-process notification deduplication is supplemented by provider idempotency. An uncertain first attempt older than 23 hours is marked `manual-review-required` to avoid blind retries beyond the provider window. No recurring retry schedule, alerting, backoff dashboard or operator ownership is configured.

**OWNER/OPS INPUT REQUIRED:** one coordinated retry worker, pending-age/error/capacity alerts, failure/manual-review runbook, provider window verification before launch, secure log handling and monitoring ownership. Changing sender/recipient or disabling intake while pending records exist requires an explicit processing decision: the retry tool still follows configured shared readiness and does not independently pause stored order notifications when only the order gate is off.

## Stop and next review

H-017A prepares the order frontend and documents these dependencies. OWNER + STRATEGY_CONTENT must review the technical packet. C-05/C-06 remain launch blockers. Authenticated CMS, offer/visual/proof decisions and subsequent launch/content approval stay separate. No production enablement follows passing tests, a commit or a Worker build.
