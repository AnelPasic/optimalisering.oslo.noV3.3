# D-129 implementation evidence — 2026-10-24

Base: freshly fetched GitHub `main` **150f3dc94d19bd8c9e1cdf22155b46d372ed8b81**. Branch: `feat/d129-worker-d1-resend`. Local D-127 branch is still **150f3dc94d19bd8c9e1cdf22155b46d372ed8b81**; `c0d93f0` was already reachable in both main and that branch. No D-127 reset/cherry-pick/merge was performed. The discovered `origin/feat/d128-worker-d1-resend-intake` candidate was inspected but never merged/copied into the D-129 branch. Existing untracked `app/src/assets/images/` was left alone.

Implementation commit: **23c2dc64de3a68b0ed209ae574a768f99ae5a502**. Git history identifies the separate evidence/coordination revision; this document does not embed its own commit ID.

## Verified

| Command / scope | Result |
| --- | --- |
| `node --test intake-worker/tests/*.test.mjs` | **22/22 PASS**, including actual workerd + local D1 and both intents with intercepted provider fetch; [full output](worker-tests.log) |
| Existing `app` intake: `node --test tests/h013-intake.test.mjs tests/h017a-intake.test.mjs tests/http.test.mjs tests/lead.test.ts` | **19/19 PASS**; four old failures caused by blank required-phone fixtures corrected, plus regression for absent legacy company/contact; [full output](legacy-intake-tests.log) |
| `npm run check` in `app` | **0 errors, 0 warnings, 1 existing hint** in old `qa-intake-h017a.mjs` (`form.submit()` on generic element) |
| `npm run build` in `app` | **19 pages built** |
| `node scripts/qa-intake-d129.mjs` in `app` | **10 checks PASS**: all three form paths at **320/390/1440px**, no overflow, noindex, native-submit guards and disabled no-JS buttons; **0 POST, 0 leads, 0 conversions, 0 page errors**. [Machine receipt](browser.json) |
| Wrangler `deploy --dry-run` on separate Worker config | Bundle **20.70 KiB / gzip 6.71 KiB**; closed preview config, dummy local D1 ID, no routes/cron; no upload/deploy |
| Wrangler `d1 migrations apply d129-local-receipts --local --config intake-worker/wrangler.jsonc` | Actual local migration **0001_receipts.sql applied**, four commands succeeded; no remote resource |
| `git diff --check` | PASS |
| Protected diff against base | Empty for all **30 tracked `app/src/content` files**, `.pages.yml`, `system/`, `project/`, site flags/config, static-site Wrangler config, styles and public files |

Local visual evidence: nine full-page PNGs in ignored `app/qa-output/d129/{home,assessment,order}-{320,390,1440}.png`; assessment 390 and order 1440 were visually inspected. CI repeats the local browser gate and uploads the same directory as `d129-local-preview-evidence`. This is local rendering proof, not a Worker deployment or OWNER visual acceptance. Test inputs are synthetic `.test` values only. All Worker outbound fetches in runtime tests are replaced; browser networking permits loopback GET/HEAD only.

## Broad suite remains red — existing unrelated failures

`npm test` in `app`: **184/196 PASS, 12 FAIL**. Every remaining failure was already present in the pre-edit baseline (initial sandbox run: 172/195; localhost-blocked tests failed there too). Localhost-enabled focused intake proves its former failures fixed. No full `verify` PASS is claimed; later static/CMS audits were not used as a substitute for the red suite.

| File | Existing failing test names |
| --- | --- |
| `content-presentation.test.ts` | new presentation fields preserve automatic rendering defaults and reject protected use |
| `h007-commercial.test.ts` | D-024 keeps the exact free-check promise and approved bounded manual safeguards |
| `h017b-cms.test.ts` | customer workflow maps each existing page to its dedicated file or correct service/editorial collection; CMS-equivalent edit preserves every current JSON record semantically and untouched file hashes |
| `h017c-proof.test.ts` | D-075-D-076 selects the final guarded proof placements in order; safe home/service CMS presentation edits preserve authority and case gates |
| `h019-surfaces.test.ts` | all page editors have separate ordinary/protected models and one reusable select; protected CTA/form rows cannot acquire a surface or be retyped as content |
| `h020-heading-alignment.test.ts` | CMS Center/Left save and restore preserve unrelated section, card, surface and commercial fields; protected heading alignment does not grant surface overrides |
| `proof-layout.test.ts` | fixed optional media bindings cannot duplicate Eurotents or carry other case authority |
| `proof.test.ts` | CMS preserves the existing page CTA and exposes only declared proof fields |

These fixtures refer to older content/CMS structures. They remain outside the approved intake scope; current OWNER content/model was not altered to satisfy them. Full raw broad-suite output is local at `app/qa-output/d129-full-test.log`.

## Review and implementation decisions

- Followed the existing D-129 plan without another architecture-planning phase. One fixed server-side tenant per Worker supports optional shared D1 while preserving site-scoped operations; database-level isolation for external customers remains a separate deployment choice.
- Kept HomeAssessment **hard-disabled** as explicitly required. It now records the shared endpoint and guards native submission, but has no activated transport. Connecting it requires the separately documented OWNER scope.
- Pinned the Worker compatibility date to **2026-10-06**, supported by the existing locked workerd. The runtime rejected 2026-10-24 as unsupported; no general dependency upgrade was introduced.
- Full branch read-only review by a separate agent found one P2: a lost lease before freezing the provider body could still send stale recipient/template bytes. Regression **`lease lost before body freeze never sends stale recipient or template`** failed **2 calls vs 1**, then passed after checking the conditional update's affected-row count. The full Worker suite is now **22/22**, also proving retry after a committed write whose response is lost. No other actionable finding or deferred minor was reported. The independent reviewer could run 19 pure tests; its runtime check was sandbox-blocked. The primary run separately passed actual local workerd/D1 with localhost permission.
- Actual runtime verification also caught `redirect:'error'` unsupported by workerd. Provider/JWKS fetches now use `manual`; redirects cannot forward secrets or substitute keys.
- D1 receipt success, provider acceptance and future LeadProof status are distinct. No live provider/mailbox delivery is claimed. No CRM, dashboard or raw-PII forwarding to LeadProof Gate 1 is built.

## Still requires OWNER/OPS

Resource provisioning and actual bindings; sender authorization/secrets and intended recipient; approved privacy/retention/deletion/backup/restore policy; live Access and operator grants; actual end-to-end synthetic receipt → D1 → Resend accepted → mailbox received, failure/retry/dedupe/export; retry schedule/monitoring/quotas; homepage connection and production build approvals. **No production resources, real email/data, public intake flags, deployment, indexing/DNS change, merge or release was performed or authorized.**
