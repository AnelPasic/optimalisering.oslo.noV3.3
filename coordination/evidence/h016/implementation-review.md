# H-016 fresh technical review

2026-10-09. One fresh read-only reviewer, `h016_technical_review`, reviewed the whole working-tree implementation against incoming main `9068011f73ec263a82ab8f19d9bf20bae014398b`, AGENTS and exact H-016 / D-053–D-057. The reviewer read code, config, docs and evidence; no build, file, Git, deployment mutation or further reviewer delegation.

## Findings and resolution

1. **P1 — Pages CMS select configuration.** Three package select fields and the inherited `heroVisual.kind` used array-form `options`. Current [official select documentation](https://pagescms.org/docs/configuration/fields/select/) and [actual select schema](https://raw.githubusercontent.com/pages-cms/pages-cms/main/fields/core/select/index.tsx) require `options.values`; the old shape supplies no choices. All four now use the documented object, with identical allowed values. The inherited field change is the necessary whole-config validation prerequisite, without changing any service content/art or approval. A new test traverses all CMS selects. This test failed before the fix and passes afterward.

2. **P2 — Reprocessing edited CMS strings.** The repeated-copy binding could turn a current `Vekst Pro` selection sentence into `Vekst Pro Pro`, because a later substitution processed newly inserted source text. Binding now scans the original reference prose once and returns inserted CMS strings verbatim. Regression covers both edited selection and external-cost text, plus numeric-ending package names and all three changed prices. The new selection/cost regression failed before the fix and passes afterward.

The same reviewer independently rechecked both fixes and ran the seven targeted tests: **7/7 PASS**, no residual issue. No additional rendering/order/safety regression found in shared anatomy, native disclosure defaults, scoped cleanup, protected routes, independent assets or preserved pages. Final restored full verification and local/live browser receipts are recorded separately.

## Considered and set aside

- Larger initial `/priser/` height: explicitly authorized open details; native user collapse retained.
- Protected package ordering/anchors: explicitly required routing safeguards.
- Exact historical audits outside active verification: retained history; their text/closed-state locks conflict with D-054/D-055.
- Unchanged order-form wording: outside routine package-label fields, preserving direct-order architecture.
- Authenticated CMS save/revert: actual connected session reaches sign-in; exact remaining OWNER workflow is documented, without claiming live editing is proven.

This is an IMPLEMENTATION technical check, **not** a formal OWNER / STRATEGY_CONTENT / RED_TEAM verdict, material content lock or production approval. Stop for OWNER H-016 review.
