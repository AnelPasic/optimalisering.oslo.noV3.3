# H-009 technical review and fix

2026-10-09. Read-only reviewer `/root/h009_technical_review`, requested through the requesting-code-review skill. Base: incoming main fd48a91a4c7353aa37cb55b9abd30efd8e18a9f7; scope: H-009 working-tree app/scripts/CMS/evidence. This is technical review only, not STRATEGY_CONTENT/OWNER acceptance or formal RED_TEAM.

Reviewer inspected all eight local captures, independently ran H-009's static audit and checked all 187 frozen SHA-256 hashes. Locked source files match the recorded D-027/D-028 revisions after checkout newline normalization and retain incoming byte hashes. No material visual/semantic problem, extra scope or public-proof issue found.

**One P2 finding:** ServicePage breadcrumb assumed that shared navigation always contained an exact `/synlighet/` entry. Removing that entry is valid under the CMS schema but caused `undefined.label` to fail the entire static build. Reviewer requested a stable label or safe fallback before delivery.

**Resolved:** optional navigation lookup now falls back to the locked page eyebrow. The actual Astro source regression removes the menu entry and checks that fallback, alongside the shared commercial changes. It failed before the fix with `Cannot read properties of undefined (reading 'label')`, then passed after the one-line fix. Original homepage bytes were restored and full verify rebuilt the real content. Normal current breadcrumb/output remains unchanged. No second role approval or reviewer verdict is inferred from this fix.

Final implementation verification: 74 files/zero diagnostics, 34 tests, 445 links, H-007/H-008/H-009 static audits, actual shared-source/optional-navigation regression and focused service/home/pricing 1440/390/320 all pass. Existing synthetic browser regression passes 40 checks. All 187 frozen files and home/pricing styles/geometry match. No other material finding is outstanding.

Stop for STRATEGY_CONTENT review of `/synlighet/`; authenticated CMS operation, formal content/design verdicts and production readiness remain outside technical review.
