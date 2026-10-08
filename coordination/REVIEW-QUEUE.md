# Review queue

State: HOMEPAGE CONTENT/CRO COMPLETE / VISUAL REVIEW PENDING / EXPANSION FROZEN. R-01/R-02 are complete under actual H-001/D-010 input. IMPLEMENTATION has delivered the representative test and evidence at `e6261de18ed4a7b1877dbf06a450d1b23a980e6e`; no OWNER visual acceptance or final RED_TEAM PASS is implied. Requests are detailed in `CODEX-TO-CHATGPT.md`.

| Order / ID | Scope | Responsible role | State / completion evidence |
| --- | --- | --- | --- |
| 1 / R-01 | Consequential offer constraints and complete homepage argument, metadata, CTA/manual-check and shared wording; content certainty/proof | STRATEGY_CONTENT; OWNER for material commercial decisions | **PASS / COMPLETE for homepage content scope.** D-010 locks the reviewed homepage revision. Pricing, legal terms, proof publication and unrelated commercial decisions remain deferred. |
| 2 / R-02 | Homepage heading-only story, section/persuasion sequence, proof placement, service routing and form role | STRATEGY_CONTENT / CRO review | **PASS / COMPLETE.** Reviewed as one whole argument. Locked revision is `app/src/content/pages/home.json` under D-010. |
| 3 / R-03 | Proposed full representative homepage `/`, visual system and desktop/mobile usability | OWNER, informed by DESIGN/STRATEGY_CONTENT | OPEN / EVIDENCE READY (C-03). Review exact implementation/evidence commit `e6261de` with locked content at `55c31b5`; accept or give a bounded direction. No automatic redesign. |
| 4 / R-04 | Independent commercial/content/visual representative-page review, including boundaries relevant to privacy/SEO/AIO | RED_TEAM | OPEN / EVIDENCE READY (C-04). Review `e6261de` independently; record PASS / FAIL / BLOCKED, inspected SHA/files, findings and receiving roles. Technical implementation QA is not a final PASS here. |
| 5 / R-05 | Scoped resumption/scale handoff after representative content/CRO/visual reviews pass | STRATEGY_CONTENT + OWNER; IMPLEMENTATION receives | BLOCKED by R-03 and R-04. R-01/R-02 are complete under D-010. Remaining pages stay frozen until representative visual review and independent red-team review pass. |
| Later / R-06 | Remaining 14 page-specific content locks, page-role/search evidence, prices/scope/proof/contact/legal terms | STRATEGY_CONTENT + OWNER where material | DEFERRED. Preserve current drafts. Homepage acceptance does not approve these pages. |
| Later / R-07 | Privacy/processing operations, Resend delivery, persistent backend, CMS/Cloudflare/DNS/redirects, measurement/Search Console, final launch QA/authorization | OWNER / operations + IMPLEMENTATION + RED_TEAM | DEFERRED / BLOCKS LIVE USE (C-05, C-06). No real intake, deployment or launch is authorized by this queue. |

## Representative review packet

Inspect implementation/evidence commit `e6261de18ed4a7b1877dbf06a450d1b23a980e6e`, consuming the complete locked homepage revision at `55c31b523a50e3e6112fcb5f324adbfa663e21eb`. The sole implementation adjustment keeps space-grouped numbers together; source copy and the visual system are preserved. Original baseline `a98dbae` and prior captures remain historical comparison material.

- Content: locked `app/src/content/pages/home.json` under H-001/D-010; earlier draft rationale: `app/docs/content-handoff.md`.
- Composition: `app/src/components/HomePage.astro`, child components, `app/src/styles/global.css`; shared wording authority: `app/src/config/copy-authority.json`.
- Fresh H-001 full-page screenshots: [desktop, 1440px](evidence/h001/home-1440.png), [mobile, 390px](evidence/h001/home-390.png), [320px](evidence/h001/home-320.png).
- Teaching detail: [1440px](evidence/h001/teaching-1440.png), [390px](evidence/h001/teaching-390.png), [320px](evidence/h001/teaching-320.png); [recorded technical checks](evidence/h001/checks.json). These are implementation evidence, not visual approval.
- Preserved earlier baseline captures: [desktop](evidence/home-desktop-baseline.png), [mobile](evidence/home-mobile-baseline.png).
- Render locally from `app/`: `npm ci`, `npm run build`, `npm run preview`, then `http://127.0.0.1:4321/`. Keep default preview/intake settings; use no real personal data. Screenshot evidence does not replace reviewing the whole running page where interaction matters.
- Supporting form route `/vurdering/` can be inspected without selecting a second representative direction.

For each completed review, append date, actual reviewer/role, inspected SHA, scope, verdict, evidence/findings, resulting decision IDs and next receiving role. Keep history rather than silently rewriting a FAIL into a PASS. Implementation regression tests cannot replace an independent verdict or owner acceptance.

## Recorded handoff history

- 2026-10-08: STRATEGY_CONTENT / CRO completed R-01/R-02 for homepage JSON through H-001 / D-010 at `55c31b5`. Scope excludes visual acceptance, other pages, shared wording and launch.
- 2026-10-08: IMPLEMENTATION completed H-001's exact rendering/responsive test at `e6261de`; 17 tests, 40 existing browser checks, focused 1440/390/320px checks, static audit and production guard passed. Grouped-number wrapping only; no other-page or reference-input changes. Next receivers: OWNER for R-03 and independent RED_TEAM for R-04; both remain OPEN.
