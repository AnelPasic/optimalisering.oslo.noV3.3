# Review queue

State: REVIEW PENDING / EXPANSION FROZEN. No completed approval or final PASS is implied by this queue. Requests are detailed in `CODEX-TO-CHATGPT.md`.

| Order / ID | Scope | Responsible role | State / completion evidence |
| --- | --- | --- | --- |
| 1 / R-01 | Consequential offer constraints and complete homepage argument, metadata, CTA/manual-check and shared wording; content certainty/proof | STRATEGY_CONTENT; OWNER for material commercial decisions | OPEN (C-01, C-02). Return complete reviewed content and explicit lock/revision scope; unresolved dependencies remain named. |
| 2 / R-02 | Homepage heading-only story, section/persuasion sequence, proof placement, service routing and form role | STRATEGY_CONTENT / CRO review | OPEN. Review a coherent whole; record macro direction and evidence. Technical rendering is not content/CRO acceptance. |
| 3 / R-03 | Proposed full representative homepage `/`, visual system and desktop/mobile usability | OWNER, informed by DESIGN/STRATEGY_CONTENT | OPEN (C-03). Accept the inspected revision or give a bounded change direction; no automatic redesign. |
| 4 / R-04 | Independent commercial/content/visual representative-page review, including boundaries relevant to privacy/SEO/AIO | RED_TEAM | OPEN (C-04). Record PASS / FAIL / BLOCKED, inspected SHA/files, findings and receiving roles. An earlier implementation-only audit is not a final PASS here. |
| 5 / R-05 | Scoped resumption/scale handoff after representative content/CRO/visual reviews pass | STRATEGY_CONTENT + OWNER; IMPLEMENTATION receives | BLOCKED by R-01 through R-04. Write actual authorized scope in `CHATGPT-TO-CODEX.md` and decisions in `DECISIONS.md` before remaining pages are expanded/redesigned/polished. |
| Later / R-06 | Remaining 14 page-specific content locks, page-role/search evidence, prices/scope/proof/contact/legal terms | STRATEGY_CONTENT + OWNER where material | DEFERRED. Preserve current drafts. Homepage acceptance does not approve these pages. |
| Later / R-07 | Privacy/processing operations, Resend delivery, persistent backend, CMS/Cloudflare/DNS/redirects, measurement/Search Console, final launch QA/authorization | OWNER / operations + IMPLEMENTATION + RED_TEAM | DEFERRED / BLOCKS LIVE USE (C-05, C-06). No real intake, deployment or launch is authorized by this queue. |

## Representative review packet

Inspect original baseline `a98dbaefbb10a9039c9b025e5c3907e83f24de8b` and the latest coordination revision. Authority metadata does not change its displayed content or visual composition.

- Content: `app/src/content/pages/home.json`; draft rationale: `app/docs/content-handoff.md`.
- Composition: `app/src/components/HomePage.astro`, child components, `app/src/styles/global.css`; shared wording authority: `app/src/config/copy-authority.json`.
- Existing full-page baseline screenshots: [desktop, 1440px](evidence/home-desktop-baseline.png), [mobile, 390px](evidence/home-mobile-baseline.png). These are preserved captures from technical QA, not new design studies or approval evidence.
- Render locally from `app/`: `npm ci`, `npm run build`, `npm run preview`, then `http://127.0.0.1:4321/`. Keep default preview/intake settings; use no real personal data. Screenshot evidence does not replace reviewing the whole running page where interaction matters.
- Supporting form route `/vurdering/` can be inspected without selecting a second representative direction.

For each completed review, append date, actual reviewer/role, inspected SHA, scope, verdict, evidence/findings, resulting decision IDs and next receiving role. Keep history rather than silently rewriting a FAIL into a PASS. Implementation regression tests cannot replace an independent verdict or owner acceptance.
