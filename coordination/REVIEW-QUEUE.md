# Review queue

State: HOMEPAGE CONTENT/CRO COMPLETE / R-03 REVISE / NEW ITERATION READY FOR OWNER REVIEW / EXPANSION FROZEN. R-01/R-02 remain complete under H-001/D-010. OWNER requested an Invite DNA homepage revision through H-002/D-011. IMPLEMENTATION has supplied the new local direction/evidence at `e04ee10c84b7dc5289678699bb9cc28957dd07f1`; no acceptance of that revision or final independent RED_TEAM PASS is implied. Requests are detailed in `CODEX-TO-CHATGPT.md`.

| Order / ID | Scope | Responsible role | State / completion evidence |
| --- | --- | --- | --- |
| 1 / R-01 | Consequential offer constraints and complete homepage argument, metadata, CTA/manual-check and shared wording; content certainty/proof | STRATEGY_CONTENT; OWNER for material commercial decisions | **PASS / COMPLETE for homepage content scope.** D-010 locks the reviewed homepage revision. Pricing, legal terms, proof publication and unrelated commercial decisions remain deferred. |
| 2 / R-02 | Homepage heading-only story, section/persuasion sequence, proof placement, service routing and form role | STRATEGY_CONTENT / CRO review | **PASS / COMPLETE.** Reviewed as one whole argument. Locked revision is `app/src/content/pages/home.json` under D-010. |
| 3 / R-03 | Complete representative homepage `/`, visual direction and desktop/mobile usability | OWNER, informed by DESIGN/STRATEGY_CONTENT | **REVISE / NEW ITERATION READY FOR OWNER REVIEW (C-03).** Actual OWNER verdict on the prior direction: structurally sound, too visually restrained. New Invite translation at `e04ee10`, locked content unchanged at `55c31b5`. Await explicit verdict on this new whole; implementation is stopped. |
| 4 / R-04 | Independent commercial/content/visual representative-page review, including boundaries relevant to privacy/SEO/AIO | RED_TEAM | OPEN / PENDING INDEPENDENT REVIEW (C-04). Current representative revision is `e04ee10`. No independent verdict on this new direction is recorded; technical QA is not a final PASS here. OWNER is the immediate receiver of this iteration. |
| 5 / R-05 | Scoped resumption/scale handoff after representative content/CRO/visual reviews pass | STRATEGY_CONTENT + OWNER; IMPLEMENTATION receives | BLOCKED by R-03 and R-04. R-01/R-02 are complete under D-010. Remaining pages stay frozen until representative visual review and independent red-team review pass. |
| Later / R-06 | Remaining 14 page-specific content locks, page-role/search evidence, prices/scope/proof/contact/legal terms | STRATEGY_CONTENT + OWNER where material | DEFERRED. Preserve current drafts. Homepage acceptance does not approve these pages. |
| Later / R-07 | Privacy/processing operations, Resend delivery, persistent backend, CMS/Cloudflare/DNS/redirects, measurement/Search Console, final launch QA/authorization | OWNER / operations + IMPLEMENTATION + RED_TEAM | DEFERRED / BLOCKS LIVE USE (C-05, C-06). No real intake, deployment or launch is authorized by this queue. |

## Representative review packet

Inspect local implementation/evidence commit `e04ee10c84b7dc5289678699bb9cc28957dd07f1`, consuming the unchanged locked homepage JSON at `55c31b523a50e3e6112fcb5f324adbfa663e21eb`. This is one Invite DNA translation authorized by OWNER's R-03 REVISE instruction, not an approved visual system. It is a local review checkpoint, not pushed or deployed. Original baseline `a98dbae` and H-001 implementation `e6261de` remain historical comparison material.

- Content: locked `app/src/content/pages/home.json` under H-001/D-010; earlier draft rationale: `app/docs/content-handoff.md`.
- Composition: `app/src/components/HomePage.astro`, homepage-only `HomeJourney.astro`, `HomeLeverage.astro`, `HomeSection.astro`, `HomeSymbol.astro`, and `app/public/styles/home-invite.css`; shared wording authority: `app/src/config/copy-authority.json`. The conditional layout/routing hookup applies the theme only to `/`.
- Fresh full-page screenshots: [desktop, 1440px](evidence/r03-invite/home-1440.png), [mobile, 390px](evidence/r03-invite/home-390.png), [320px](evidence/r03-invite/home-320.png).
- Hero details: [1440px](evidence/r03-invite/hero-1440.png), [390px](evidence/r03-invite/hero-390.png), [320px](evidence/r03-invite/hero-320.png).
- Teaching details: [1440px](evidence/r03-invite/teaching-1440.png), [390px](evidence/r03-invite/teaching-390.png), [320px](evidence/r03-invite/teaching-320.png); [recorded technical checks](evidence/r03-invite/checks.json). These are implementation evidence, not visual approval.
- Historical H-001 captures: [1440px](evidence/h001/home-1440.png), [390px](evidence/h001/home-390.png), [320px](evidence/h001/home-320.png).
- Preserved earlier baseline captures: [desktop](evidence/home-desktop-baseline.png), [mobile](evidence/home-mobile-baseline.png).
- Render locally from `app/`: `npm ci`, `npm run build`, `npm run preview`, then `http://127.0.0.1:4321/`. Keep default preview/intake settings; use no real personal data. Screenshot evidence does not replace reviewing the whole running page where interaction matters.
- Supporting form route `/vurdering/` can be inspected without selecting a second representative direction.

For each completed review, append date, actual reviewer/role, inspected SHA, scope, verdict, evidence/findings, resulting decision IDs and next receiving role. Keep history rather than silently rewriting a FAIL into a PASS. Implementation regression tests cannot replace an independent verdict or owner acceptance.

## Recorded handoff history

- 2026-10-08: STRATEGY_CONTENT / CRO completed R-01/R-02 for homepage JSON through H-001 / D-010 at `55c31b5`. Scope excludes visual acceptance, other pages, shared wording and launch.
- 2026-10-08: IMPLEMENTATION completed H-001's exact rendering/responsive test at `e6261de`; 17 tests, 40 existing browser checks, focused 1440/390/320px checks, static audit and production guard passed. Grouped-number wrapping only; no other-page or reference-input changes. Next receivers: OWNER for R-03 and independent RED_TEAM for R-04; both remain OPEN.
- 2026-10-08: OWNER returned **R-03 REVISE** in Codex: prior homepage has a good structural foundation but too little visual energy. Required primary Invite DNA translation, explicit Instrument Sans/Figtree roles, locked copy preservation, one homepage direction and 1440/390/320px evidence. Recorded as H-002/D-011; no new copy lock or visual acceptance. OWNER did not supply an inspected commit SHA; the implementation baseline was `4c577f9` following `e6261de`.
- 2026-10-08: IMPLEMENTATION completed that scoped visual revision at `e04ee10`, with exact-copy/font/fit/illustration-occlusion checks, fresh screenshots, 17 tests and 40 browser checks passing. Other 14 built pages/shared stylesheet and all 144 read-only reference files remain unchanged. Next receiver: OWNER for the new whole-page R-03 verdict. R-04 remains independently pending and R-05 remains blocked. No approval, push, deployment or live processing was performed.
