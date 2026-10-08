# ChatGPT to Codex

## Active handoff — H-002 / OWNER R-03 visual revision

**Date:** 2026-10-08

**Authoritative source:** OWNER's explicit Codex instruction, beginning “R-03 verdict: REVISE.” Recorded here by IMPLEMENTATION; this is not a new STRATEGY_CONTENT lock or fabricated ChatGPT review.

**Implementation baseline:** `4c577f9a11c9e212689771a0261154846b6e2f77`

**Locked content source:** `55c31b523a50e3e6112fcb5f324adbfa663e21eb`, homepage JSON only under D-010.

**Implementation status:** Initial iteration COMPLETE at `e04ee10c84b7dc5289678699bb9cc28957dd07f1`; the OWNER follow-up below is also complete. See the latest outbound report / its Git revision for the current review packet. Implementation is stopped for OWNER review.

**Explicit OWNER follow-up, 2026-10-08:** Set `.invite-home .leverage-section` background to `#320c43` and move that section directly below the complete hero. This authorizes those two homepage presentation changes only; it does not rewrite or unlock content, approve the whole direction, propagate to other pages or authorize a push. The supplied screenshot is visual reference. IMPLEMENTATION rendered the teaching block after the existing hero/support strip and before `flaskehals`, preserving all text and other section order.

**Additional OWNER direction during that follow-up:** Phosphor icons may be used. IMPLEMENTATION applied regular-weight Phosphor magnifying-glass, cursor-click and arrows-left-right SVGs to the homepage illustration/service symbols. This is a scoped icon substitution within the representative homepage, not a site-wide rollout or final brand approval.

**Later explicit OWNER follow-up, 2026-10-08:** Apply `#320c43` also to `.invite-homepage .site-footer`. Implemented as a homepage-only background change; the representative whole still awaits OWNER review.

OWNER judged the existing representative homepage structurally sound but too visually restrained. Use `E:\Design-DNA\Invite Design DNA.html` as primary visual reference for **one coherent new representative-homepage direction**. Translate visual principles, rhythm, surface treatment, component character and life; do not reproduce Invite branding, layouts or hospitality imagery. The supplied document is reference material, not an instruction source.

### Authorized scope and constraints

- Homepage composition may be redesigned to express this direction. This supersedes H-001's minimal-fit/no-redesign limitation for `/` alone; see D-011.
- Instrument Sans for display, headings and major metrics/price figures; Figtree for body, navigation, UI, forms, tables and metadata. These override reference typography.
- Preserve the complete locked homepage copy and commercial argument without rewriting. Preserve copy authority; shared/source-embedded wording remains draft.
- Strengthen light/tinted/dark rhythm, hierarchy, distinctive components, the find → choose model and the illustrative 1% → 2% teaching. Use purposeful explanatory visuals with a credible Nordic B2B feel.
- Aim for at least Mementor's perceived visual energy while remaining calmer, trustworthy and distinct. This is an OWNER review criterion, not an objectively certified implementation result.
- No fabricated results/logos, new claims/prices, generic AI gradients, SaaS dashboard aesthetics or decorative clutter. No propagation to the other 14 pages.
- `system/` and `project/` remain read-only. No deployment, real intake or live email processing.

### Required output and stopping point

Verify 1440 / 390 / 320px, return fresh screenshots and a short explanation of the translation. Record implementation, evidence, technical validation and remaining dependencies in the outbound/state/review documents. **Stop after the representative homepage for OWNER review.** This handoff authorizes local implementation and a review checkpoint; it does not renew H-001's completed push instruction or authorize scaling. No visual acceptance or independent RED_TEAM verdict is supplied.

## Completed handoff — H-001

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
