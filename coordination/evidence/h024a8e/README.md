# H024A8E — global elements and three-zone page builder

**IN PROGRESS — phase 1 only. No completion or OWNER acceptance claimed.**

Authority D-102, incoming main `bc5fc9324a04eeaab7d57ee43aa4290766aba338`. The binding contract requires a genuine one-master/reference native roundtrip before migrating the wider catalogue. This first delivery extracts only calculator content into one named JSON master under **Globale elementer**, protected from CMS UI create/rename/delete. Its current homepage slot is a temporary optional one-reference native list. Other seven source records and OWNER's `forbehovsvelger` stay exact. No commercial, component, CSS, Hero/theme/intake/indexing change.

Implementation plan and ledger: [PLAN.md](PLAN.md). A fixed catalogue of typed files + human-labelled native select was chosen; the official [group/file model](https://pagescms.org/docs/configuration/content/) and [operations controls](https://pagescms.org/docs/configuration/content/operations/) support this configuration. Protection concerns ordinary CMS UI operations, not arbitrary Git deletion.

Pilot checks: 151/151 tests and full verify PASS, CMS20, static/surface and typography196 with zero findings. [pilot-verify.log](pilot-verify.log). [Native-render baseline](baseline/checks.json) and [pilot-local comparison](pilot-local/checks.json) contain72 equal route/width snapshots at1440/900/390/320, no overflow/duplicate IDs/JS errors/public POSTs. All incoming content retained; default compiled appearance unchanged.

Incoming elevated baseline had six stale test assumptions caused by OWNER's new optional Top item. Existing tests now locate the intended original by ID, not the first rendered ordinary section. The static copy guard also rejected the exact incoming OWNER sentence containing navigation arrows; one exact existing sentence is retained without weakening new-copy checks, which now include master files. A temporary-fixture test verifies this exception. Initial sandbox HTTP failure and a Windows error overwriting an old typography screenshot are environment failures; final successful verification writes to this task's own supported QA_OUTPUT_DIR.

Next: actual logged-in master edit→Git→native build→Worker→exact restore; reference hide/remove/re-add with master unchanged. Broader library/three-zone source migration has not begun. STOP only if native preflight is unsuitable; otherwise continue the authorized implementation. H024A3 OPEN, H024B BLOCKED, H022 PARKED, no launch authority.
