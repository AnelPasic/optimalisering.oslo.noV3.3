# H-017B implementation ledger

Spec: `coordination/H017B-CMS-UX-DEPLOY.md`, introduced at `ba0cb912e3c504020ed22169f8bba99a433d617c`.
Incoming main: `ce1c95155cbfe959428bce58dceca14871785953`. Actual OWNER continuation and its implementation interpretation are recorded in CHATGPT-TO-CODEX.

1. Complete: read old live CMS reference/current official Pages CMS format; required sidebar, service-only collection, supported collapsible lists and omitted technical metadata tested red before changing configuration.
2. Complete locally: minimum CMS information architecture, unchanged content records/data paths, one shared package object and protected identities/routes.
3. Complete locally: dedicated Pages-CMS-equivalent round trip covers all 17 content JSON hashes and one selector edit. Omitted/unmodeled fields, array replacement, empty-value normalization and strict proof publication checked. Active historical audits retain commercial/safety invariants and use current editable package fields.
4. In progress: named historical successful/failing build checks compared; first CMS revision fails its original schema on missing empty body/badges. Current full verify and static Worker dry-run pass under app/. Real authenticated edit/build/revert is next.
5. In progress: final full verify passes (74 tests; 0 Astro errors/warnings; 1 existing QA-script hint), all 29 current review assets equal the tested build. Three technical review/fix rounds are complete; authenticated UI/save/revert follows delivery. Stop for OWNER CMS review.

Constraints: no website design, customer copy/offer/price changes, proof publication, real intake/email, secrets, index/domain change, English or edits to system/project. Existing H-017A role review remains separate.

Initial authenticated check: actual connected browser redirects app.pagescms.org to `/sign-in?redirect=%2F`. OWNER was asked about signing in while independent technical work continues. No sign-in/send/credential action was taken.

OWNER actually replied "Jeg logger inn nå". Connected Chrome now shows the authenticated correct repository/main. Its original generic editor is captured in cms-before.jpg. New editor screenshots and real save/revert require delivering the configuration first.

TDD also caught an unsafe first normalization attempt: adding defaults directly to the strict publication schema made an existing missing-field regression fail. That attempt was replaced by a separate content-input schema which restores unknown/empty meaning while preserving strict rejection of structurally incomplete publication records. Every missing-key publication case is checked again after normalization. No publication guard/test was weakened.
