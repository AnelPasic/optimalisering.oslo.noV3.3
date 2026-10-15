# H-022 proof presentation

Baseline: `51c02c3e7d33fcd5da7d523fa7990dee4aaaef1a`. Contract: `../../H022-PROOF-PRESENTATION.md`.

Only production change: `app/src/components/HomeProof.astro`. Homepage Eurotents uses a full-width two-part composition: context and secondary spend support left, dominant numeric comparison with periods right. Nysta and Helt Opplagt remain equal mint supporting cards. Mobile stacks cleanly; arrows align with the values independently of period wrapping. Existing type, spacing, radius and surface tokens are reused. Service proof keeps its exact appearance.

No public wording, proof data, periods, selection, authority, registry, CMS or gates change. All 404 protected source blobs remain exact; see `preservation.json`. Existing untracked OWNER images are untouched.

- `before/` and `after/`: eight no-JS route/width groups each, with exact text and service geometry/type fingerprints. Homepage 1440/900/390/320; both service proofs 1440/390. Final checks enforce dominant numeric hierarchy, equal supporting cards, numeric no-wrap/no-clipping, arrow alignment, semantic comparisons and no overflow/errors/POST.
- `red.log`: expected failure on the old undivided featured composition.
- `focused.log`: existing proof/hero guard tests, 5/5 pass.
- `verify.log`: exactly one full verify, 115/115 tests, zero Astro errors/warnings, one existing intake-script hint; all CMS/static/surface/source guards pass. `typography-summary.json` retains its 196 groups with zero failures/errors/POST rather than a second screenshot campaign.
- Final homepage-only pair/arrow alignment refinement follows that full run. Rebuilt and reran all eight focused groups plus five proof/hero tests; surface and typography source guards pass. The full suite was not repeated.
- Brief independent read-only review of the diff and desktop/320 screenshots: no findings; no duplicated builds/tests or source edits.

Primary review captures: `after/home-1440.png`, `after/home-390.png`, `after/home-320.png`. Service preservation: `after/synlighet-390.png`, `after/konvertering-390.png`.

Native build/live delivery evidence is added in the subsequent coordination receipt. Technical delivery is followed by STOP for OWNER visual review; no content acceptance or launch permission is inferred.
