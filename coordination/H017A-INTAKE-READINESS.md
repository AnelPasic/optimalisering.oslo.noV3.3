# H-017A - Intake and ordering readiness, no production enablement

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED FOR IMPLEMENTATION REVIEW

## Why this can run in parallel

OWNER and STRATEGY_CONTENT are reviewing:
- CMS workflow;
- service visuals;
- proof/cases;
- final launch priorities.

Codex can work safely on technical intake plumbing without touching those decisions.

This handoff must not rewrite customer-facing offer copy, service pages, pricing content, proof or visual direction.

## Objective

Make both customer paths technically ready for later launch:

1. Gratis sjekk / assessment
2. Direct package order

The code should be production-ready behind explicit feature gates, while remaining disabled on the current review Worker.

No real submission, Resend email, secret, domain switch or indexing change is authorized.

## Current state to preserve

Assessment:
- already uses `createLeadPayload`, `submitLead`, attribution and idempotency;
- enabled only through existing `PUBLIC_LEADS_ENABLED`;
- review remains disabled.

Package order:
- package selection/preselection works;
- backend order payload and `ORDERS_ENABLED` gate already exist;
- frontend is intentionally hard-disabled and currently has no transport.

H-017A closes that frontend readiness gap without enabling it.

## 1. Separate public order feature gate

Add a customer-side order flag, for example:

`PUBLIC_ORDERS_ENABLED=true|false`

Expose through `site.ordersEnabled`.

Default is false.

Order submit must require all of:
- frontend public order flag;
- configured public lead endpoint;
- backend `ORDERS_ENABLED=true`;
- existing backend/privacy/email prerequisites.

A mismatched frontend/backend configuration must fail safely.

Do not make `PUBLIC_LEADS_ENABLED` alone activate direct ordering.

## 2. Connect package order form to existing lead transport

When and only when `site.ordersEnabled === true`:

- validate package selection;
- validate company;
- validate website;
- validate contact person;
- validate email;
- accept optional phone;
- accept optional short comment;
- include order intent;
- include package key;
- include page/source attribution;
- use idempotency key behavior equivalent to assessment;
- submit through the existing lead transport;
- acknowledge success only after durable backend acceptance.

Reuse existing helpers where possible:
- `normalizeWebsite`
- `submitLead`
- `captureAttribution`
- existing order payload creator

Do not build a second transport stack.

## 3. Spam and accidental-submit protection

Give package order parity with assessment where relevant:

- honeypot;
- bounded lengths;
- server-side validation remains authoritative;
- prevent double submit;
- stable idempotency behavior;
- no false success;
- no payload logging to browser console;
- no PII in URL/query parameters.

The package key in the URL is fine. Customer fields are not.

## 4. Review-safe behavior

On the current review environment:

- order submit button stays disabled;
- preview notice says no information is sent;
- programmatic submit remains blocked;
- no POST request occurs;
- no success message can be faked;
- package preselection still works.

Assessment review behavior must remain unchanged.

## 5. Error and success UX

Prepare the order form for real transport with the same quality as assessment.

Use concise plain-language status messages.

Required states:
- invalid website
- missing required fields
- sending
- accepted
- server unavailable/failure
- duplicate/idempotent retry where relevant

Do not invent contractual claims.

Success may say only that the order request was received and will be followed up.

Do not say:
- contract is active;
- work has started;
- payment is due;
- start date is confirmed.

Follow `coordination/COPY-STYLE.md`.

## 6. Attribution contract

Both assessment and order should use one normalized attribution model.

At minimum preserve:
- current page
- referrer
- supported campaign parameters already captured by the project

Order payload also includes:
- intent = order
- selected package key

Do not add fingerprinting or invasive tracking.

Document which attribution values are persisted and which are merely transport metadata.

## 7. Backend readiness audit

Review the existing API, store, resend and retry code and produce:

`app/docs/intake-launch-readiness.md`

The document must state exactly what is still needed before real launch, grouped as:

- environment flags;
- secrets;
- Resend sender/recipient;
- persistent storage;
- backup/recovery;
- retention/deletion/export procedure;
- spam/rate limiting;
- HTTPS/origin/CORS assumptions;
- privacy/controller/processor facts that OWNER must confirm;
- end-to-end synthetic test;
- monitoring/failure retry.

Do not fill unknown legal or operational facts with guesses.

Mark them as OWNER/OPS INPUT REQUIRED.

## 8. Automated tests

Add focused regression tests for:

### Review mode
- assessment disabled
- order disabled
- no POST
- no false success

### Order enabled in isolated test mode
- all 3 package keys accepted
- unknown package rejected
- package preselection preserved
- attribution included
- honeypot rejected/ignored safely
- duplicate submission is idempotent
- backend gate mismatch fails closed
- success only after durable accept
- notification intent distinguishes assessment vs order

No real email may be sent in automated tests.

## 9. Production guard

Extend existing production-readiness guard so a production build cannot accidentally expose a half-configured order form.

Fail production readiness if:
- public order is enabled but backend order gate/config is not documented/configured for deployment;
- lead endpoint is missing/invalid;
- privacy approval prerequisite is absent;
- required email configuration is absent.

Use the project's existing guard pattern. Do not hard-code secrets.

## 10. Do not touch

Do not change:
- package prices;
- package copy;
- package visual design;
- homepage hero/selector/calculator;
- Synlighet or Konvertering content;
- proof publication;
- SEO/AI page rollout;
- English pages;
- noindex state;
- Cloudflare production domain;
- Resend/live secrets;
- real intake flags.

## Acceptance criteria

1. Package order has a real transport path behind a dedicated public order flag.
2. Review Worker remains unable to submit.
3. Assessment behavior remains unchanged.
4. Order uses existing transport/attribution/idempotency patterns rather than a second stack.
5. Backend remains fail-closed.
6. All 3 package intents are covered by tests.
7. No real email or lead is generated during H-017A.
8. Launch-readiness doc clearly separates implemented capability from OWNER/OPS dependencies.
9. Existing pricing/service/content QA remains green.
10. COPY-STYLE QA remains green.

## Delivery

Run:
- full `npm run verify`;
- browser QA;
- focused intake/order tests;
- production guard tests;
- no-network/no-real-email confirmation.

Push to main and verify the review Worker still shows disabled intake.

Stop for OWNER + STRATEGY_CONTENT technical review.

Do not enable real submissions.
