# H-013 package presentation and review ordering

Authority: D-044–D-046 and `coordination/H013-PRICING-VISUAL-ORDER.md`. D-044 accepts H-012 offer/copy/shared-source logic while requiring visual revision. H-013 changes presentation and primary package CTAs only; whole-page draft/status fields remain unchanged. OWNER + STRATEGY_CONTENT review and final package artwork supply are required after delivery.

## Shared CMS source and assets

Pages CMS: **Forside og felles pakker → Forsidens innhold → Felles pakker**. One `home.homepage.packages` object still supplies home/pricing/service bridges and financial references, including price/VAT/Partner prefix. `key` is a read-only stable order identifier. Primary CTA label/path are read-only safe values; schema requires matching `/priser/?pakke=<key>#bestill`. Detail links remain editable and real pricing anchors, including the legacy `#begge` alias.

Each package has an independent optional `visualAsset` object: `src`, truthful nonempty `alt`, optional `positionX`/`positionY` (0–100). Dedicated **packageVisuals** media points to `app/public/images/pricing` → `/images/pricing/`, accepting SVG/WebP/PNG. SVG uses contain; raster uses cover with default centered crop or supplied coordinates. Only an existing file resolved within the dedicated directory renders an image. Missing/unconfigured files use the original conceptual fallback; final supplied artwork completely replaces the inline curve. No final package artwork was generated or supplied in H-013. The three approved assets/alt/crops require a subsequent scoped supply/integration handoff.

`iconItems` replaces flat `focusAreas`/`combinations` in the shared source, avoiding duplicate editable copy. Items carry a generic icon enum, exact H-012 label, and optional description (Vekst's exact combination explanation). Both CRO-leading combinations and their order are preserved. CMS supports search/conversion/local/paid-search/social-paid/analytics/page/route; existing licensed Phosphor search/click assets and original generic local line icons are used without emojis/brand logos. Homepage omits all focus/situation rows; pricing groups fit/situations/focus/work/distinction/selection. Typical-business detail remains expandable, without deleting approved copy or forcing equal heights.

## Ordering UX and safety

All six package primary buttons are direct orders. Three stable query values select one `/priser/#bestill` form; unknown values are not accepted/reflected. Pricing-page clicks update selection/URL and focus the selector; browser history and manual selection stay synchronized. Home links also preselect. Partner's contextual note and displayed price inherit the shared numeric price/prefix/suffix. No JavaScript permits manual package selection with a disabled submit button.

The form displays all required package/company/website/contact/email and optional phone/comment fields. Exact handoff heading/support/submit/uncertainty copy is used. Preview notice states nothing is sent. The button is disabled in HTML and stays disabled; JavaScript also cancels programmatic submission. The form contains no transport, success state, tracking or storage. Changing `PUBLIC_LEADS_ENABLED` cannot open this order form. The UI notice/new utility headings are implementation draft copy outside the exact H-013 supplied wording; they await the whole review rather than a fabricated lock.

`createOrderPayload` reuses unchanged assessment website/email/comment/source validation, then validates fixed order intent/package and bounded required company/contact/optional phone. Backend `/api/leads` recognizes the order intent only behind a separate `ORDERS_ENABLED=true` gate **and** existing enabled intake/privacy/email configuration. Order payloads store package/contact/company/phone in the existing JSON model atomically/idempotently, with `order_received` instead of `assessment_received`. Notifications distinguish order intent/selected key/business/contact, without deriving an offer price from a second source. Assessment payload/API/notification behavior stays intact. Enabled-order storage/notifications were tested only in isolated memory and stub email transport.

## Final enablement dependency

Nothing below is authorized by H-013. A later explicit OWNER/operations handoff must:

1. Record OWNER + STRATEGY_CONTENT acceptance of H-013 and supplied final assets; finish required public/privacy/controller/retention/processor/terms review without inventing contract terms.
2. Approve and deploy the persistent API/HTTPS/origin/spam/access/deletion/export/backup operations; configure `PRIVACY_APPROVED`, `PUBLIC_LEADS_ENABLED`, verified Resend sender/recipient/key, plus the **separate `ORDERS_ENABLED`** backend gate. The current static review Worker exposes no live intake; no secret or production flag was changed here.
3. Implement/authorize the frontend submission connection using `createOrderPayload` + existing `submitLead`, with actual endpoint, validated fields, honeypot, attribution policy, idempotency/retry/error preservation and acknowledgment only after durable acceptance. Remove the hard-disabled review guard only under that scoped handoff; an environment flag alone does not activate it.
4. Verify synthetic end-to-end order persistence/conversion, notification/inbox receipt and failure/retry/no-JS behavior before any real order. Confirm launch/domain/indexing authorization separately. Existing production-readiness guard remains.

Authenticated Pages CMS GitHub App/editor save remains manual/unproven; see `h007-content-cms.md`. File-based CMS tests and real Astro fixtures prove schema/rendering, not authenticated editor operations.

## Checks

`npm run verify`; `node scripts/qa-browser.mjs`; `node scripts/qa-pricing-h013.mjs`; `node scripts/qa-h013-package-source.mjs` (temporarily edits shared source and installs neutral test SVG/PNG files; restores/removes them in finally; run full verify afterwards). Evidence is in `coordination/evidence/h013/`. H-012 offer audit projects structured focus fields back to the exact authority and changes only D-045 primary CTA expectations. Backend changes are explicitly scoped intent/gating/storage/notification code; protected references, other 11 pages and accepted service/chrome content remain frozen.
