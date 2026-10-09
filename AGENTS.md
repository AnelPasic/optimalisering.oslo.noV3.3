# Project coordination rules

## Read before substantial work

Read `coordination/CHATGPT-TO-CODEX.md` and `coordination/DECISIONS.md` before substantial work. Then read `coordination/PROJECT-STATE.md` and the relevant entries in `coordination/REVIEW-QUEUE.md`. Repository paths in these rules are relative to this repository root.

The repository is the durable coordination layer between ChatGPT / STRATEGY_CONTENT / RED_TEAM / OWNER and Codex / IMPLEMENTATION. A chat suggestion, generated draft, implementation plan, successful test or commit is not a content lock or material approval.

## Current scope: preserve the exploratory baseline

The existing 15-page website in `app/` is an exploratory baseline, not approved production. D-021 accepts the homepage representative; D-019/D-020 preserve layout/photo passes. Named commercial/pricing/service scopes D-024/D-027/D-028/D-030/D-031/D-033 and H-011 system PASS D-039 remain. D-044 accepts H-012 offer logic/copy/shared source; D-047 passes H-013 technical/order/CMS architecture while rejecting its visual density. H-014 / D-048–D-049 implements the exact compact decision surface: short shared copy, horizontal visual/icon strips, all long copy under native collapsed Se detaljer, concise decision/multiplier. H-012/H-013 prices/offer and direct-order behavior remain. D-050 accepts H-014 compactness. H-015 / D-051–D-052 implements only the package visual-strip polish, using OWNER’s subsequently supplied illustration as visual basis while preserving locked copy, compactness and ordering. Reusable SVG variants and exact optional semantic HTML captions remain CMS-driven; supplied assets still replace the motif/caption. H-015 implementation is complete. Stop for OWNER + STRATEGY_CONTENT visual review; later external artwork integration requires its own scoped handoff. Other 11 pages, SEO/AI rollout, English and proof publication remain frozen.

Do not expand, redesign or polish the remaining pages until the representative page and content/visual direction have passed the reviews recorded in `coordination/REVIEW-QUEUE.md` and the resulting approvals are recorded in `coordination/DECISIONS.md`. A review request alone does not authorize a representative-page revision; wait for an explicit, scoped handoff in `coordination/CHATGPT-TO-CODEX.md`.

The baseline and H-001 through H-015 are completed implementation history. H-015 delivery to `main` uses the connected static review Worker with noindex/intake disabled. Preserve the single CMS-driven home photo/two inactive alternatives and one shared `home.homepage.packages` offer/visual/icon/order source. H-014 extends the same CMS package items with compact fit/situations and short icon labels, retaining every full offer field and H-013 order behavior; full-record authority/status stays unchanged. Independent optional pricing assets resolve within `/images/pricing/`; missing assets use the conceptual fallback. H-015 adds local conceptual SVG artwork for visual review; independent final external package files remain absent. The supplied whole-card reference is retained only in coordination evidence. The single pricing order form is hard-disabled and has no transport/success state. Backend order intent reuses assessment validation with an independent default-off order gate and existing intake/privacy/email gate, tested only synthetically; enabling real orders requires the documented new scoped handoff. Normal provider/chrome/D-037 fit, optional service media/text-only fallback, dormant locale architecture and D-025 non-public proof guards remain. Final service artwork is also separate. Future writes/pushes/deployments require their actual handoff; no real submission, domain cutover, translation, proof publication or propagation follows technical success.

## Missing decisions are dependencies

When STRATEGY_CONTENT, OWNER or RED_TEAM input is required, write the request or blocker to `coordination/CODEX-TO-CHATGPT.md`. Include the affected gate, responsible role, concrete question, source paths/commit, and what can continue independently. Keep the corresponding review-queue entry current.

Never resolve these blockers by inventing production content, commercial positioning, offers, prices, service boundaries, proof, legal/privacy terms or material brand decisions. Do not fabricate incoming approvals or treat silence as approval. Preserve existing drafts while review is pending.

STRATEGY_CONTENT owns complete customer-facing content and its review/lock. OWNER owns consequential commercial/brand decisions and representative-page approval. RED_TEAM reviews independently and records a verdict with evidence. IMPLEMENTATION owns code, integration and technical verification within the handed-off scope. Review meaningful wholes rather than creating owner gates for individual lines or spacing values.

## Copy authority and evidence

All generated customer-facing copy without an explicit applicable lock is `DRAFT / NON-AUTHORITATIVE`, including metadata, navigation, form/interface/error wording, illustrations, legal drafts and 404 content. Page JSON records carry `authority`; `app/src/config/copy-authority.json` covers shared/source-embedded wording. The inventory and exceptions policy are in `coordination/PROJECT-STATE.md`.

Do not promote a draft by merely changing a status/authority field. Record the actual reviewed content revision, role, decision, scope and evidence in `coordination/DECISIONS.md`, and consume the corresponding inbound handoff. An approval of the homepage does not approve the other 14 pages or unlock launch.

After authorized implementation, update `coordination/CODEX-TO-CHATGPT.md` with the resulting commit, changes, validation, remaining dependencies and next requested review. Use Git history to identify the exact delivered coordination revision rather than embedding its own commit hash inside itself.

`system/` and `project/` are read-only reference inputs. Do not modify them unless the owner explicitly instructs it. No lead personal data, secrets or operational database files belong in Git or Pages CMS.
