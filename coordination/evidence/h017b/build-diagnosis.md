# H-017B build diagnosis

Compared required known-success `21b4e9f3e7127f3cf92b325d269414c19b0d38c7` and first-failure `7acf47ae002c0471820870fb7db8ad114784e583`. GitHub's connected Workers Builds checks confirm success and failure respectively; exact check/build links are in build-checks.json. Latest incoming main ce1c951 already succeeds.

The only application-content change between those named revisions is home.json (other changes are CMS/documentation/evidence). Parsing each named home.json against the schema at the failing revision reproduces:

- successful home: schema PASS;
- first CMS home: missing sections.1.body, homepage.packages.items.0.badge and items.2.badge.

Pages CMS sanitizes empty arrays/strings. The previous schema required those empty values. H-017A already defaults empty section bodies/badges and repairs formal calculator notation/escaped arrow compatibility. H-017B additionally handles missing empty FAQ and nullable internal evidence through separate content normalization; strict publication validation remains unchanged. Current records pass full verification. This proves a repository content-validation cause; the inaccessible native first-failure log is not represented as inspected.

Current documented root/path assumptions reproduced locally: cwd app/, package.json and wrangler.jsonc in that directory, npm run verify, static assets ./dist, npx wrangler deploy --dry-run --outdir qa-output/h017b-worker-dry-run. Full verify passes with 70 tests/zero diagnostics and all active audits; dry-run reads 69 static files, no bindings, exits successfully. No backend deploy occurs. Current 29 asset comparisons against the connected review Worker match (15 pages retain noindex/nofollow; intake GET 404).

Account-side build settings/logs were attempted read-only through the existing Wrangler authentication. The Builds API returned HTTP 401 Authentication error for all three named build records; connected browser opens a Cloudflare sign-in/security-check page. Thus the account's exact stored root/build/deploy strings and historical native log are not verified. No account setting, credential, token, hook or domain was changed. There is no demonstrated remaining configuration failure: incoming main's native build succeeds. The fresh authenticated content-only save and revert must supply native success/live-update proof before completion.

Active normal QA path: COPY-STYLE, build, H-007/008/009/010/011/013/016. H-007, H-008 and H-016 check packages against current CMS data. Historical exact H-012/H-014/H-015 wording/initial detail-state snapshots are not in that path (H-016 already superseded them). Remaining exact service/support locks and free-check promise are applicable content/commercial gates and are retained. H-017B's selector-label smoke edit is allowed by the current normal path; the actual content-only source is verified again after save.

This diagnosis is IMPLEMENTATION evidence, not OWNER/STRATEGY_CONTENT acceptance or production approval.
