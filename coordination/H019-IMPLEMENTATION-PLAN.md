# H-019 CMS surface controls implementation plan

> Execute inline with the executing-plans skill; obtain one fresh final technical review before delivery.

Goal: safe optional surface choices for ordinary sections/items, with unchanged default rendering and separate protected CMS models.

Spec: `H019-CMS-SURFACE-CONTROLS.md`, incoming main `188478e`, plus direct OWNER clarification: **Separate protected CMS models**.

Architecture: one typed six-value surface definition shared by schema and validated renderer mapping. Extend the central H-018 surface layer with color-only scoped overrides and automatically paired light/dark text. Reuse Pages CMS native block lists with two section models; `_block` is editor metadata only, while section IDs/order and copy stay intact. Protected check/CTA/form rows have no color control. No new dependency/framework or frontend editor.

Files: new `app/src/lib/surface.ts`, `app/tests/h019-surfaces.test.ts`, `app/scripts/qa-h019.mjs`; modify `content-schema.ts`, the two shared section renderers, `styles/surfaces.css`, root `.pages.yml`, existing CMS test helper. Migrate existing section objects with only `_block` metadata so the CMS recognizes their model. No surface choices are written into real content. Protected homepage calculator/proof/packages/hero/form sources are otherwise exact.

- [x] Capture default baseline at 1440/900/390/320. Write focused schema/CMS-scope/save/protection tests; observe RED.
- [x] Implement enum, optional/default handling, validated mapping, native ordinary/protected CMS models, metadata-only migration and color-only CSS; focused tests GREEN.
- [x] Verify all six section/card variants, nested dark/light/default interactions, exact default restoration/geometry/type/content/protected scopes and four-width contrast. Full verify and CMS round-trip; inspect compact review matrix/screenshots.
- [ ] Fresh technical review, main push, exact native Worker/assets/live-default checks, coordination receipt and STOP for OWNER visual/CMS review.

Review focus: CMS array replacement must not lose IDs/order/links/unmodeled data; protected type cannot be switched to an ordinary color-bearing model; light default cards within dark sections retain contrast; explicit light cards reset inherited dark palette; default absence/empty select and section heading/copy geometry remain exact.

Ruling: OWNER explicitly chose separate protected CMS models over an inert select. Use supported native block models and add only `_block` metadata to sections. This prevents protected controls appearing, without moving/deleting section records or changing customer copy. Cost if wrong: CMS model correction; authenticated UI compatibility remains a separately reported check.

Authority: main/connected review Worker delivery explicitly requested. Existing OWNER image directory is untracked and untouched. `system/`/`project/`, typography/geometry/layout/copy/pricing/proof/math/chart/art/noindex/intake remain frozen. No acceptance or launch follows implementation.

Ledger: RED four expected failures, then focused7/7; full verify96/96, zero errors/warnings/one preexisting hint, CMS20 JSON hash preservation, typography196 zero failures. Default64 groups exact stable rendering; four37-state matrices with allsixchoices/cards, flat/process and nestedauto variants, minimumcontrast4.74:1, zeroerrors/POST/overflow. Preservation2060 blobs, 15pages/66sections only editor metadata, 3protected rows, geometrytokens exact. Fresh review no findings, independently focused7/7; formal role/launch acceptance deferred by governance. Authenticated CMS available; one reversible edit/restore and native/live receipts follow push.
