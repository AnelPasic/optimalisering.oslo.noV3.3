# ChatGPT to Codex

## Active handoff — H-001

**Date:** 2026-10-08  
**Author role:** STRATEGY_CONTENT / CRO  
**Source commit reviewed:** `9143d24bb9caa064dbbb56fed9339284055e63d3`  
**Reviewed files:** `app/src/content/pages/home.json`, `app/docs/content-handoff.md`, `coordination/PROJECT-STATE.md`, `coordination/DECISIONS.md`, `coordination/REVIEW-QUEUE.md`, curated commercial/design seed.

### OUTCOME

R-01 and R-02 are complete for the representative homepage content/CRO layer.

The complete homepage copy in `app/src/content/pages/home.json` at the commit containing this handoff is the authoritative STRATEGY_CONTENT revision for the representative-page test. It was reviewed as one whole argument rather than as H1/eyebrow/CTA micro-gates.

The visual direction is not owner-approved final. Treat the current design as a promising exploratory baseline and preserve it for this pass.

### AUTHORITATIVE INPUTS

- `app/src/content/pages/home.json` with:
  - `status: CONTENT_LOCKED`
  - `authority: CONTENT_LOCKED / AUTHORITATIVE`
- `coordination/DECISIONS.md`, including D-010.
- Existing D-001 through D-009 remain applicable.
- `system/` and `project/` remain read-only.

### LOCKED / DO NOT CHANGE

- Do not rewrite, paraphrase, shorten or "improve" the locked homepage copy.
- Do not change offer/pricing/proof/legal claims.
- Do not redesign the visual system.
- Do not expand or polish the other 14 pages.
- Do not modify `system/` or `project/`.
- Preserve the current palette, typography, general geometry, service-hub concept, teaching/calculator concept, assessment section and footer direction unless a minimal implementation adjustment is needed to fit the locked content.

### FREEDOM / MAY CHANGE

IMPLEMENTATION may make the smallest necessary homepage-only layout adjustments if the locked copy causes overflow, hierarchy problems, broken spacing or poor responsive fit.

Permitted examples: local spacing, text width, line wrapping constraints, card height/alignment, responsive breakpoint treatment, or small component sizing required by the locked copy.

Do not use this freedom to create a new design direction.

### ACCEPTANCE CRITERIA

1. Pull and render the exact locked homepage content.
2. Homepage remains coherent at desktop 1440px and mobile 390px; also verify 320px for overflow.
3. Mathematical teaching is visually prominent enough that the visitor can immediately understand:
   - 1,000 relevant visits × 1% = 10;
   - 1,000 relevant visits × 2% = 20;
   - this is illustrative, not promised uplift.
4. The primary free-check path remains obvious and the form/CTA is not hidden.
5. Existing technical checks pass.
6. No other page receives content/design polish in this task.
7. No deployment or production lead processing.

### EVIDENCE / TESTS REQUIRED

- Astro check/build/tests.
- Desktop full-page screenshot at 1440px.
- Mobile full-page screenshot at 390px.
- 320px overflow/usability check.
- Record any implementation-only homepage adjustments exactly.
- Push the result to GitHub.

### OUTPUT / HANDOFF NOTE

Update `coordination/CODEX-TO-CHATGPT.md` with:
- resulting commit SHA;
- exact files changed;
- tests;
- paths to new desktop/mobile evidence;
- remaining visual concerns;
- a request for R-03 OWNER representative-page review and R-04 RED_TEAM review.

Do not infer visual approval from this handoff.

---

## Previous handoff history

The previous coordination-recovery handoff is complete and represented by commit `9143d24bb9caa064dbbb56fed9339284055e63d3`. Git history remains the authoritative record for that delivery.
