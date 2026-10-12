# H-017C FINAL implementation evidence

Incoming main: `1c34f27` (pulled before changes). Authority: final `H017C-PROOF-PUBLISH.md`, D-075/D-076. This supersedes the earlier Nysta-only/empty-home handoff. H-017B remains complete.

Execution ledger:
1. Read current coordination/decisions/audit; preserve three untracked OWNER assets in `app/src/assets/images/`.
2. Added failing placement/CMS-protection tests: 0/2 before implementation; 2/2 after implementation. Imported only Eurotents and Helt Opplagt from the exact approved handoff, preserving Nysta and the deferred clinic bytes. No fresh live data-source query claimed.
3. Reused strict proof gate/public projection unchanged. One scoped semantic responsive component supplies home hierarchy and service placements. Safe service proof slot added to current CMS; registry and approval protected as read-only.
4. Updated obsolete zero-proof/text-only-hero QA expectations to current approved proof and existing OWNER artwork; kept commercial, routing, publication and preview safeguards. Raw CMS proof normalization still fails closed when required keys are omitted.
5. Actual Astro guard builds: unapproved, incomplete and non-comparable variants all reject all three placements, even with environment override. All source bytes restored (`proof-renderer-guard.json`).
6. Full `npm run verify`: 76 tests, 0 errors/warnings, one existing audit-script hint; 15 routes / 443 internal links; static/COPY-STYLE/CMS PASS (`verify.log`). CMS equivalent JSON round-trip: 19 source hashes unchanged (`cms-roundtrip.json`). This is not a new authenticated CMS save.
7. Existing whole-site browser suite: 40/40 synthetic checks, no live emails. Dedicated final browser QA: 9 route/width groups, 18 captures at 1440/390/320; readable native caveats, hierarchy/order, zero overflow/errors/POST. Surrounding section text/size/styles equal incoming build at all widths; 12 other page presentations preserved (`local/checks.json`). Home/proof captures visually inspected at 1440/320.
8. Independent technical review found no Critical, Important or Minor findings (`implementation-review.md`). Preservation compares 182 frozen Git blobs and 12 other page JSON, with only the approved proof slots changed on the three scoped pages (`preservation.json`). Main/connected Worker delivery evidence follows in the outbound receipt. Implementation completion does not supply OWNER/STRATEGY_CONTENT acceptance.

Local captures: `local/home-proof-{1440,390,320}.png`, `local/konvertering-proof-{1440,390,320}.png`, `local/synlighet-proof-{1440,390,320}.png`; equivalent full-page captures are included. Live evidence uses the same names under `live/` after connected build verification.

STOP for OWNER + STRATEGY_CONTENT review. H-017A and all launch gates remain separate.

Delivery: implementation `317ae431f1947cddc46173af6fbb6d8b724bb49e`; native Build `fe66802a-ec09-4a6d-8557-87fbf5c9b1a4` succeeded, Worker `b4d7f441-a77f-43de-8be0-18f36ce51beb`. All 50 live assets match the tested build. HTML noindex, robots disallow, empty sitemap, absent intake/order APIs and results route, matching custom 404, 9 live responsive groups and 18 live captures pass with zero POST. `implementation-native-build.json`, `live-assets.json`, `live/checks.json`. Exact outbound evidence is in CODEX-TO-CHATGPT; receipt revision follows through Git history. The live checker distinguishes the available `/404.html` asset (HTTP 200) from a missing route (HTTP 404); this QA correction changes no website asset.
