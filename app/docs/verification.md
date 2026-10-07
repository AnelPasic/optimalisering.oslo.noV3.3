# Verification and handoff

Date: 2026-10-08, Europe/Oslo. Outcome: complete local website preview under app/, not a production release.

## Implemented

15 planned Norwegian routes from the seed's BUILD_NOW portfolio, plus 404/robots/sitemap; static Astro HTML; responsive Nordic visual system; local fonts; semantic JSON content; repository-root Pages CMS schema; service/guide/utility/pricing/assessment templates; illustrative interactive arithmetic; accessible navigation and form behavior.

Latest owner integration direction: interim Resend notification adapter and SQLite server storage. Enquiry + assessment_received conversion + minimized submission source are written atomically. Email status and retries are separate. No persistent visitor IDs, analytics cookies or browser storage of personal data.

## Checks passed

- `npm run verify`: Astro check — 0 errors, warnings or hints; 16 functional tests passed; static build passed.
- Static output audit — 15 content pages, 454 internal links/anchors, unique titles, one H1/page, canonical metadata, unique IDs, Norwegian language, every source paragraph rendered, deliberate noindex preview, and unapproved price/proof scan.
- `node scripts/qa-production-guard.mjs`: an actual Astro mode-specific environment attempted SITE_STAGE=production and was refused for draft content. Temporary environment file was removed. Preview build restored afterward.
- `node scripts/qa-browser.mjs`: 40 checks passed. All 15 pages checked at 1440px and 390px, homepage/menu also at 320px. Menu, calculator, keyboard skip link, validation, disabled intake, synthetic browser-to-API conversion/storage, UTM/landing source through internal navigation, failure recovery, and no-JavaScript privacy checks passed. No JavaScript page errors.
- Pages CMS YAML parsed and content path matched the application source. Authenticated Pages CMS editing remains unconfigured.
- SHA-256 comparison: all 144 original files under system/ and project/ matched the starting baseline; no additions/removals or content changes there.

Synthetic tests use in-memory SQLite and injected Resend responses. No real enquiries, emails or inbox delivery were tested. The running preview's operational database remains separate from synthetic fixtures. Node reports its documented experimental SQLite feature warning; Astro diagnostics are clean. No Lighthouse or field-performance claim is made.

Screenshots and browser result JSON are in ignored qa-output/. The local server serves http://127.0.0.1:4321.

## Independent red-team review

The separate reviewer audited without editing and identified four narrow issues:

1. Native no-JavaScript form defaulted to GET, potentially putting entered details in a URL. Fixed with explicit POST fallback and disabled submit until the JavaScript handler initializes. Browser regression failed before fix and passes afterward.
2. #skjema landed on explanatory copy rather than the form. Content role renamed that section to sjekken; the actual form now owns skjema. Static anchor audit passes.
3. Production preflight used a narrower environment than Astro. Guard moved into Vite/Astro's resolved configuration lifecycle. Mode-file regression and an actual blocked production attempt pass.
4. Form-adjacent offer copy was duplicated in code and an arithmetic paragraph was positionally omitted. Homepage assessment now renders its semantic section; all arithmetic paragraphs render. Audit asserts every source paragraph is present.

No unapproved prices, proof, provider identity, service-role or interim backend authority conflict was found. Findings were corrected by Implementation, with the content role handling its section ID. A second audit round was not required; regression checks cover the fixes.

## Decisions and limitations

- The latest explicit request to build authorizes a reviewable local implementation of the curated brief. This does not mark content or visual material as owner-approved, authorize publication, or authorize pushing.
- The owner's Resend/local-storage instruction supersedes the prior dependency on an existing shared Lead Engine. Locally means persistent server storage, not browser storage. A later shared engine can replace the configured endpoint without replacing the frontend.
- Root .pages.yml is CMS configuration only; all actual application source is under app/. This placement follows Pages CMS's repository-root requirement.
- The default form is intentionally unconfigured, clearly labelled in the preview and refuses real intake. Production content, public prices/scope/terms, privacy/contact/retention and sender/recipient details still require review/configuration.
- The Node/SQLite API needs persistent backend hosting and HTTPS/proxy integration before external use; the later Cloudflare frontend remains static. Source tags are attribution clues from a submission, not verified full journeys or won revenue.
- Real Resend send/inbox proof, production storage/backup/privacy operations, proxy-aware rate/spam controls, DNS/redirects/native Git deployment, measurement/Search Console and explicit launch authorization remain launch dependencies.

No deployment, external notification, remote push, analytics activation or real lead processing was performed.
