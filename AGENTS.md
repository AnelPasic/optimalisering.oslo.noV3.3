# Project coordination rules

## Read before substantial work

Read `coordination/CHATGPT-TO-CODEX.md` and `coordination/DECISIONS.md` before substantial work. Then read `coordination/PROJECT-STATE.md` and the relevant entries in `coordination/REVIEW-QUEUE.md`. Repository paths in these rules are relative to this repository root.

The repository is the durable coordination layer between ChatGPT / STRATEGY_CONTENT / RED_TEAM / OWNER and Codex / IMPLEMENTATION. A chat suggestion, generated draft, implementation plan, successful test or commit is not a content lock or material approval.

## Current scope: preserve the exploratory baseline

The existing 15-page website in `app/` is an exploratory baseline, not approved production. D-021 accepts the complete homepage representative; D-019/D-020 retain genuine RED_TEAM layout/photo passes and the photo positioning caveat. D-024/D-027/D-028/D-030/D-031 preserve their named commercial, pricing and service scopes; D-033 accepts H-010 Konvertering. H-011 / D-034–D-038 hardens the accepted four-page system only: commercial landing-page/optional dream-outcome media contract, provider-neutral chrome, exact D-037 home qualification/provider revision, minimal dormant nb/en architecture. H-011 implementation is complete. Stop for STRATEGY_CONTENT/OWNER review and ChatGPT-generated/selected Synlighet/Konvertering hero assets. Other 11 pages and SEO/AI service rollout remain frozen; no translations or English routes are authorized.

Do not expand, redesign or polish the remaining pages until the representative page and content/visual direction have passed the reviews recorded in `coordination/REVIEW-QUEUE.md` and the resulting approvals are recorded in `coordination/DECISIONS.md`. A review request alone does not authorize a representative-page revision; wait for an explicit, scoped handoff in `coordination/CHATGPT-TO-CODEX.md`.

The baseline and H-001 through H-011 are completed implementation history. H-011 delivery to `main` uses the connected review Worker with preview/noindex and intake disabled. Preserve the single CMS-driven homepage photo and two inactive alternatives, shared home package source, exact service text and provider-neutral home/pricing source. Normal accepted chrome uses one required footer disclosure, Tjenesten drives av Medon AS.; legal company metadata derives from provider config. Required disclosure is read-only in marketing CMS. Only Synlighet/Konvertering use ServicePage; optional service media uses `/images/services/` with text-only missing-file fallback. No final service artwork is supplied/generated yet. Locale config/helpers/header slot are dormant; no dead EN switch or /en/ placeholders. D-025 proof registry/guards remain unchanged, evidence-only and non-public. Current JSON/status/authority bytes remain unchanged. Future writes/pushes/deployments require their actual handoff; no proof publication, production intake, domain cutover, translation or further propagation follows technical success.

## Missing decisions are dependencies

When STRATEGY_CONTENT, OWNER or RED_TEAM input is required, write the request or blocker to `coordination/CODEX-TO-CHATGPT.md`. Include the affected gate, responsible role, concrete question, source paths/commit, and what can continue independently. Keep the corresponding review-queue entry current.

Never resolve these blockers by inventing production content, commercial positioning, offers, prices, service boundaries, proof, legal/privacy terms or material brand decisions. Do not fabricate incoming approvals or treat silence as approval. Preserve existing drafts while review is pending.

STRATEGY_CONTENT owns complete customer-facing content and its review/lock. OWNER owns consequential commercial/brand decisions and representative-page approval. RED_TEAM reviews independently and records a verdict with evidence. IMPLEMENTATION owns code, integration and technical verification within the handed-off scope. Review meaningful wholes rather than creating owner gates for individual lines or spacing values.

## Copy authority and evidence

All generated customer-facing copy without an explicit applicable lock is `DRAFT / NON-AUTHORITATIVE`, including metadata, navigation, form/interface/error wording, illustrations, legal drafts and 404 content. Page JSON records carry `authority`; `app/src/config/copy-authority.json` covers shared/source-embedded wording. The inventory and exceptions policy are in `coordination/PROJECT-STATE.md`.

Do not promote a draft by merely changing a status/authority field. Record the actual reviewed content revision, role, decision, scope and evidence in `coordination/DECISIONS.md`, and consume the corresponding inbound handoff. An approval of the homepage does not approve the other 14 pages or unlock launch.

After authorized implementation, update `coordination/CODEX-TO-CHATGPT.md` with the resulting commit, changes, validation, remaining dependencies and next requested review. Use Git history to identify the exact delivered coordination revision rather than embedding its own commit hash inside itself.

`system/` and `project/` are read-only reference inputs. Do not modify them unless the owner explicitly instructs it. No lead personal data, secrets or operational database files belong in Git or Pages CMS.
