# Fresh technical review - H-017B

Read-only reviewer assessed ce1c951..29d389f against H017B-CMS-UX-DEPLOY.md. This is IMPLEMENTATION QA, not a formal RED_TEAM/OWNER/STRATEGY_CONTENT verdict.

Initial assessment: ready with fixes; no Critical issue or proof-publication bypass. Independently checked 14 focused tests and the raw serialization of all 17 current records. Current data had only documented empty/null removal.

Important findings, accepted by executor:

1. CMS allowed clearing required source text, then sanitizer omitted it and application validation failed. Examples: home SEO title, service overtext, section heading and FAQ question. Added regression failed before config repair. CMS now marks mandatory fields and supported list bounds consistently; optional/default/null evidence fields remain optional. The representative fixture checks required input/list bounds before serialization, matching the pinned upstream subset. Actual UI validation remains separate evidence.
2. Comparing only parsed Zod values hid unknown-key loss inside replaced arrays. Added an independent raw JSON comparison permitting documented empty/null cleanup but rejecting any nonempty content loss/addition. A future unmodeled package-item metadata fixture now proves that such loss is detected. This audit also runs in normal verify before future content delivery. All 17 current records pass.

Minor finding: representative selector edit targeted the second heading, while the exact smoke value is the third title, homepage.selector.items[2].title. Corrected; optional --expect-smoke-label checks the specified starting value without freezing normal CMS wording.

Second read-only review assessed 29d389f..8243ba8, independently passed 16 focused tests plus qa:cms, and confirmed the initial fixes. It found one Important new regression: caseIds is already a multiple reference, so an added outer list:{} would produce nested arrays in the actual upstream reference transformation. Executor accepts the finding. The reference transformation and dedicated flat-array configuration test both fail before removing that outer list and pass afterward; options.multiple:true and publication gates are preserved. Final exact correction commit is reviewed in the third and final implementation review round. No website content changes.

Reviewer considered/set aside, with executor rulings:

- Authenticated save/build/live-update/revert: required after configuration delivery; stays an outstanding concrete completion step, not dropped.
- Historical native logs/account settings: unavailable (API401/browser sign-in); diagnosis explicitly distinguishes source-schema reproduction from uninspected native logs. Fresh native content-only builds must prove operation.
- Formal role acceptance: separate required OWNER review; no approval inferred from implementation QA.
- Production intake/email/indexing/domains/English and website copy/prices/redesign: preserved, outside scope; no expansion authorized.
- Singleton/scalar-list collapsing: supported object repeaters used; unsupported object collapse settings not invented.
- Optional-object deletion in merge mode: documented preservation limitation; removal requires explicit safe scoped change when editor cannot express it.
- Future service creation: remains protected until scoped addition.
- Service/commercial audit locks: applicable locks retained; current package wording checked from CMS source.
- Null/empty proof normalization: unknown meaning restored separately from strict publication guard; missing-field rejection passes.
- YAML anchors/view/repeater summaries: supported; no unsupported-setting finding.
- Concurrent uncommitted changes: excluded from initial fixed-head review; the correction batch is submitted for a second read-only review at its exact commit.
