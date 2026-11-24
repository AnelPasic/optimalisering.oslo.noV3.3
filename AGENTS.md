# Optimalisering Oslo - active agent instructions

**OWNER 2026-11-24 - Rule 01:** Read this short router, not the project history. Historical coordination files are archives, consulted only for a concrete task-specific decision, dependency or unresolved issue. The original AGENTS is preserved verbatim in [coordination/archive/AGENTS-2026-11-24.md](coordination/archive/AGENTS-2026-11-24.md). This simplification changes reading requirements, not existing approved facts, commercial authority or safety gates.

## 1. Scope and authority

- Inspect current main in this repository and MedonWebSystem, the actual source and the requested scope. Current explicit OWNER decisions and verified facts govern; preserve concurrent edits. Resolve material conflicts explicitly.
- All existing pages are live content. Do not use editorial draft/lock/authority status fields as edit, build or publication gates. Protect actual approved offers, prices, proof, design, legal terms and operational settings. Do not infer approval for unrelated changes.
- OWNER owns consequential commercial/brand decisions; STRATEGY_CONTENT owns content; IMPLEMENTATION owns technical delivery; independent RED_TEAM review is used where required, not routinely. A draft, test or commit does not confer approval.
- Reuse existing MWS components and native Pages CMS. [Content source of truth](coordination/CONTENT-SOURCE-OF-TRUTH.md) defines the actual owners of page copy, shared sources, global masters, proof and chrome. Do not duplicate global data or revive retired CMS promotion workflows.

## 2. Customer-facing content

For every copy edit read the current canonical [MWS Content Quality and Voice](https://github.com/AnelPasic/MedonWebSystem/blob/main/docs/CONTENT-QUALITY-AND-VOICE.md), [CONTENT-TONE.json](coordination/CONTENT-TONE.json), [CONTENT-VOICE-PROFILE.md](coordination/CONTENT-VOICE-PROFILE.md) and [COPY-STYLE.md](coordination/COPY-STYLE.md). For important new commercial copy also read [CREATIVE-DNA.md](coordination/CREATIVE-DNA.md). Use the appropriate A/B/C lane. The MWS flagship quality gate applies before CMS implementation to new or substantially rewritten commercial pages.

- Preserve the current Commercial Value Gate in the voice profile for sales-intent copy before tone: buyer outcome, credible delivery, realistic time, responsibilities, reason to hire and approved next action. Do not turn genuine guides into sales pitches. Truth, buyer comprehension and commercial value outrank humor.
- For new or substantially rewritten important H1s read [H1-LAB.md](coordination/H1-LAB.md). The existing Oslo requirement remains pending Rule 02 review: H1 alone must communicate recognizable service/intent and concrete buyer value; eyebrow/support are not a rescue. This conflicts with the newer MWS whole-Hero rule; resolve explicitly, not silently. Skip H1 Lab for minor edits.
- Resolve optional per-field `hero.toneOverrides` against the live JSON presets; CTA follows site tone. Tone changes never rewrite existing content automatically. Preserve approved hooks and apply copy QA after drafting.
- Follow any explicit OWNER review sequence for the specific task (including the research/idea/write/check/publish sequence when requested). Do not treat old page-specific STOP or preview instructions as global requirements for unrelated work.

## 3. Engineering, QA and publication

- Reuse current MWS components, design and CMS contracts; no speculative redesign, parallel sources or changes to protected content. Validate affected behavior, anchors, schema and generated CMS choices when relevant.
- Apply the 2026-11-03 risk-based QA budget: content/styling gets relevant checks, sound build and representative mobile/desktop preview where available; changes to real submission, privacy, persistence, credentials, lead/order/Worker/D1/Resend require full relevant safeguards and tests. Consult [intake launch readiness](app/docs/intake-launch-readiness.md) only for affected intake work and verify current implementation/provider state. Do not activate real intake, alter indexing or cut over domains without authority.
- Run available copy QA; verify exact diff and readback. Report unrun checks and distinguish Git source, build, actual Cloudflare deployment, authenticated CMS acceptance and OWNER visual approval. No redundant AI reviews or documentation-only PR cycles by default.
- No lead personal data, secrets or operational database files in Git or Pages CMS. `system/` and `project/` remain read-only references unless OWNER explicitly authorizes changes.

## 4. Coordination archive (on demand only)

[PROJECT-STATE](coordination/PROJECT-STATE.md), [DECISIONS](coordination/DECISIONS.md), [REVIEW-QUEUE](coordination/REVIEW-QUEUE.md), [CHATGPT-TO-CODEX](coordination/CHATGPT-TO-CODEX.md), [CODEX-TO-CHATGPT](coordination/CODEX-TO-CHATGPT.md) and archived AGENTS retain historical evidence. Retrieve only relevant entries by topic, issue, decision or date. Do not preload or re-execute historical handoffs.

If an actual decision/blocker needs OWNER, STRATEGY_CONTENT or RED_TEAM input, record the precise question, scope and evidence in the relevant coordination record; update the affected queue entry if one exists. After authorized implementation record the commit, validation, unresolved dependencies and next review in CODEX-TO-CHATGPT as applicable. Use Git history for exact revision identity. These records are not additional required reading for every task.
