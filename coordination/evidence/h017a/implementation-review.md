# Fresh H-017A technical code review

Reviewer: separate read-only Implementation agent `h017a_technical_review`. Pinned range: incoming `d74c623c7306c8962bce188b69800ad28cf7c49b` to `a506bb24b2935427bc4b5aad0726ddf1d5479f32`. One review pass; no second reviewer/pass. The reviewer did not mutate, run builds or contact live intake/email. This is not OWNER, STRATEGY_CONTENT or RED_TEAM approval.

## Verdict and resolution

Original verdict: **REVISE**, one Important finding, no Critical/Minor findings. Ordinary `form.submit()` bypassed disabled button/submit-event listener, attempting a native POST in review mode. Root independently reproduced the finding using a local synthetic browser fixture with every API request intercepted: one attempted POST versus expected zero (`h017a-native-submit-red.log`). The fix routes only this order instance's `submit()` through `requestSubmit()`, applying native validation and the same gated handler. Original assessment sources are preserved.

Reviewer concluded: after this scoped fix and verification, no other issue from the pass blocks H-017A technical delivery; live Worker verification remains required. Root verifies the repair with the full intake browser matrix, existing browser suite and full verification; exact fix revision is identified in the outbound packet/Git history. No post-fix reviewer PASS or formal incoming role verdict is invented.

## Strengths recorded by reviewer

Dedicated default-off public order flag/explicit valid endpoint; independent backend/shared gates; reuse of normalized payload/attribution/transport/transactional store; canonical intent and durable acknowledgement; bounded validation/honeypot/busy/retained inputs/stable retry; synthetic all-key/error/notification coverage; accurate static-only/backend/homepage/operations dependencies; preserved content/art/assessment/calculator.

## Executor rulings on every considered-but-declined behavior

| Behavior | Reviewer reason / executor ruling |
| --- | --- |
| Public flag not server authorization | Accept: independent API gates are authoritative; documented UI limit |
| Preview can exercise enabled isolated fixtures | Accept: local synthetic builds only; default published review stays off |
| Deployment attestation does not probe API | Accept: explicit manual OWNER/OPS evidence gate, clearly disclosed |
| Homepage assessment remains hard-off | Accept: H-017A requires preservation; next customer entry-point connection is a documented launch dependency |
| Orders require shared backend lead flag | Accept: existing shared privacy/email/intake prerequisite; public lead flag alone cannot activate order frontend |
| Acknowledgement precedes email | Accept: durable acceptance contract; pending state and operational mail prerequisites remain |
| Retry key does not survive reload | Accept: parity with existing assessment page-session behavior; no browser PII persistence added |
| Rate/backup/retention/retry schedule incomplete | Accept as OWNER/OPS launch blockers, not hidden production-readiness claims |
| UTM can contain personal names | Accept: actual campaign/privacy policy is required; normalizer is not a semantic PII detector |
| Shared transport endpoint validation is stricter | Accept: existing valid relative endpoint preserved; credential/query/fragment-bearing targets intentionally rejected |
| Schema/math/arrow/calculator-fixture compatibility | Accept: observed incoming failures repaired narrowly; supplied source copy/defaults/calculator preserved |
| Prototype-level native calls/hostile page scripts | Accept: UI cannot prevent arbitrary script requests; backend remains authoritative. Ordinary order instance `submit()` is fixed, not dismissed |
| Verbatim whitespace in logs | Accept: evidence output only, no runtime effect |

Unchanged assessment native-submit behavior is explicitly documented as a pre-existing UI limitation. H-017A does not authorize broad assessment changes. Review tests cover its existing normal/event-driven submit paths and the order's ordinary native-submit regression. No submitted customer body left the process in the negative native regression.
