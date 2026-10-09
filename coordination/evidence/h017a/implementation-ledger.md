# H-017A implementation ledger

Incoming/pulled main: `d74c623c7306c8962bce188b69800ad28cf7c49b`. Authority: active H-017A, D-062 and `coordination/H017A-INTAKE-READINESS.md`; visible statuses follow COPY-STYLE. Main delivery/static review verification are authorized. Protected inputs, content, prices, artwork, routing, noindex, live flags and secrets remain unchanged.

## Bounded execution

1. Audit existing frontend/API/store/notification/retry and production guard; record missing operations/privacy/deployment facts.
2. Demonstrate missing endpoint/production checks and explicit order intent with failing synthetic tests; implement minimal shared-helper changes.
3. Demonstrate missing gated browser transport; connect order only behind explicit public gate and configured endpoint, preserving preselection.
4. Verify review zero-POST, isolated enabled all-key persistence/attribution/error/retry/honeypot and fake email; run full verification/production guard/existing browser QA.
5. Obtain fresh read-only implementation review, resolve concrete findings, publish to main/static Worker, verify deployed assets/gates/noindex and synchronize coordination; stop for OWNER + STRATEGY_CONTENT technical review.

## Incoming verification defects

Incoming full verify failed before implementation: removed empty homepage section body and two empty package badges were still required by the schema. Existing regression suite caught that failure. Defaulting only absent body/badge to empty values preserves incoming content; no page JSON is edited.

After that repair, incoming copy QA incorrectly rejected the homepage calculator's formal multiplication/numeric-unavailable notation, explicitly allowed by COPY-STYLE and protected by H-017A. A failing guard fixture demonstrates the problem. The guard exempts only those functional equation/placeholder contexts and still rejects ornamental prose; the calculator remains untouched. Two raw-JSON/HTML audits also required compatibility: absent section bodies iterate as empty, and H-016 text decoding now recognizes escaped ordinary `->` arrows. No assertion of displayed copy, pricing, proof, noindex or ordering is removed.

The existing browser suite also assumed old CMS calculator defaults (1000 visits), while incoming main supplies 2000 visits. Its observed failure was `40 !== 20`; setting all four synthetic inputs explicitly preserves the actual CMS defaults/calculator and tests the same independently expected 20/30 outputs. The corrected existing browser suite passes 40 checks across all 15 pages.

## Test-first evidence

- `h017a-red.log`: three expected assertion failures for explicit persisted order intent, unsafe endpoint transport, and production endpoint readiness; remaining synthetic backend tests passed.
- `h017a-red-browser.log`: dedicated public flag still left the old hard-disabled form disabled. Corrected a test harness syntax error before recording that behavioral failure.
- `h017a-copy-red.log`: formal calculator notation wrongly failed copy guard.
- Core fixes subsequently passed 14/14 focused tests; enabled browser transport subsequently passed all three protected keys with synthetic-only persistence/notification and stable lost-response retry.
- Fresh technical review identified the ordinary native `form.submit()` bypass of submit listeners. `h017a-native-submit-red.log` confirms one intercepted local POST versus expected zero. Routing only the order instance's `submit()` through `requestSubmit()` applies native validation and the same gated handler. Assessment sources remain unchanged; their pre-existing native-submit semantics are explicitly documented. The native regression is exercised with requests intercepted, including on the live review, so a failing check cannot send a body to the Worker.

Final full verification, technical review and live receipts are recorded in the adjacent evidence files and outbound handoff. Synthetic stores are memory-only; isolated builds/logs are ignored in `app/qa-output/`. No real submission or email is authorized or generated.

## Concurrent OWNER main integration

Pre-push fetch found main advanced to `4257b9414bd87e46d26c4d489065faef8e06eb1e`. OWNER's actual CMS saves, `.pages.yml` merge safety/templates and D-063–D-065/H-017B queue are preserved verbatim. Only three coordination conflicts needed resolution; provisional Implementation D-063 is reconciled to D-066. Full verify (64 tests/static/copy) and both browser suites (14/40 checks) pass again on the merged source. No content was reverted or edited by H-017A, no history rewritten, and H-017B remains unexecuted. Protected-path comparison against this latest OWNER main is clean.
