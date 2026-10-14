# H-021 implementation plan and ledger

Spec: `coordination/H021-CMS-PAGELIST-PILOT.md`; baseline `e41154f`.
Execution: inline, in this checkout, with main delivery explicitly authorized by the handoff.

Architecture: a strict build-time resolver accepts list configuration and page records;
the Innsikt renderer passes its collection into a reusable PageList component. Only
the Innsikt overview exposes the block. Article metadata stays on article records.

Preserve all other source content, article H1/SEO/body, H-019/H-020, safeguards,
read-only inputs and untracked OWNER images. No new dependencies or universal query.

1. Capture baseline source/rendered evidence. Add focused resolver/schema/migration
   tests and run them RED. Implement defaults, filtering, deterministic sorts,
   exclusion, explicit manual order and error handling; run GREEN.
2. Add PageList component and migrate only guider cards to article metadata.
   Preserve cards markup/geometry through the existing HomeSection primitives.
   Add design-controlled compact and links variants, with no JavaScript requirement.
3. Split the Innsikt overview and article CMS editors without duplicate ownership.
   Use reorderable object rows with one slug-valued article reference per row;
   manual rows are count authority, limit applies to automatic mode only.
   Verify CMS save/restore and picker boundaries with fixtures.
4. Run focused browser source/render checks, third-item/manual/layout fixtures,
   four-width no-JS/default comparisons and full verify. Review complete diff.
   Commit/push main, verify exact connected Worker build and matching live assets,
   update outbound/review state, then STOP for OWNER CMS/visual review.

Review focus: blank optional metadata; malformed/outside/missing references;
unordered/tied titles; array replacement during CMS save; protected models.

Ruling: use native repeated object rows for manual references rather than depend
on multiple-picker ordering; supported fallback explicitly authorized by the spec.
Ruling: authenticated browser profile is busy at first access; do not stop another
browser or reuse its profile. Record limitation; fixture/source-render checks continue.

Tasks 1–3 complete: eight focused PageList tests plus 21 CMS compatibility guards
pass; source migration and CMS ownership remain bounded to Innsikt. All four
initial migration/CMS RED failures turn GREEN.

Task 4 local complete: full verify109/109; typography196, all zero failures;
64 before +64 after exact route/width/no-JS comparisons;24 source-backed variant
groups, source restored and fixture removed;381 protected source blobs.
Independent review: no actionable findings, independently reran8/8 focused tests.
Main was checked ff-only again immediately before delivery; no concurrent changes.
Task4 complete: implementation e94b4b5 pushed; native Build3b86e357 succeeds,
Version73bf41fc;53 live assets match,64 live route/width/no-JS groups match baseline
and safeguards pass. Outbound/review state updated. No website source changes in
the subsequent receipt. STOP for OWNER CMS/visual review; no next implementation.
