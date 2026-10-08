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


## RED_TEAM return — R-04 COMPLETE

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed implementation:** `e6261de18ed4a7b1877dbf06a450d1b23a980e6e`  
**Locked content:** `55c31b523a50e3e6112fcb5f324adbfa663e21eb`

**Verdict:** PASS for the representative direction; NOT production approval.

### Findings

- The find → choose commercial model is understandable and aligns with the project brief.
- The 1% → 2% section now teaches the leverage directly instead of hiding it behind abstract wording.
- The bounded manual assessment remains visible and commercially coherent.
- No historical prices, fabricated proof, guaranteed uplift, ranking promises or AI-placement promises were introduced.
- IMPLEMENTATION respected scope: only grouped-number wrapping changed in the rendered homepage; the visual system was not silently redesigned.
- H-001 evidence reports clean 1440/390/320 responsive checks and no horizontal overflow.
- The current visual direction is sufficiently coherent to continue testing rather than restart.

### Production caveats — DO NOT silently solve

- No quantitative/client proof is currently publication-ready.
- Public pricing, standard inclusions/exclusions and contract economics remain unresolved.
- Shared/source-embedded form/footer/illustration/legal wording remains DRAFT / NON-AUTHORITATIVE unless separately locked.
- Privacy, retention, Resend/persistent backend and production lead-processing operations remain unresolved.
- This RED_TEAM PASS does not substitute for OWNER visual acceptance.

### NEXT RECEIVER

OWNER for R-03 only.

If OWNER accepts the representative homepage direction, record that exact scope in `DECISIONS.md` and create a new scoped handoff for controlled scale-out. If OWNER rejects part of the direction, return a bounded diagnosis/change direction rather than a broad redesign.
