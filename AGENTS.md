# Project coordination rules

## Read before substantial work

Read `coordination/CHATGPT-TO-CODEX.md` and `coordination/DECISIONS.md` before substantial work. Then read `coordination/PROJECT-STATE.md` and the relevant entries in `coordination/REVIEW-QUEUE.md`. Repository paths in these rules are relative to this repository root.

The repository is the durable coordination layer between ChatGPT / STRATEGY_CONTENT / RED_TEAM / OWNER and Codex / IMPLEMENTATION. A chat suggestion, generated draft, implementation plan, successful test or commit is not a content lock or material approval.

## Current scope: preserve the exploratory baseline

The existing 15-page website in `app/` is an exploratory baseline, not approved production. D-021 accepts the complete homepage representative; D-019/D-020 preserve genuine layout/photo passes. D-024/D-027/D-028/D-030/D-031 and D-033 preserve their named commercial/pricing/service scopes. D-039 accepts H-011 system hardening (provider-neutral chrome, D-037 qualification, optional service-media contract and dormant nb/en architecture), with final service artwork still separate. H-012 / D-041–D-043 implements exact shared package copy and conceptual visuals on compact homepage/full `/priser/`, with inherited service bridges. H-012 implementation is complete. Stop for OWNER + STRATEGY_CONTENT pricing review. Other 11 pages, SEO/AI rollout and English remain frozen.

Do not expand, redesign or polish the remaining pages until the representative page and content/visual direction have passed the reviews recorded in `coordination/REVIEW-QUEUE.md` and the resulting approvals are recorded in `coordination/DECISIONS.md`. A review request alone does not authorize a representative-page revision; wait for an explicit, scoped handoff in `coordination/CHATGPT-TO-CODEX.md`.

The baseline and H-001 through H-012 are completed implementation history. H-012 delivery to `main` uses the connected review Worker with preview/noindex and intake disabled. Preserve one CMS-driven homepage photo/two inactive alternatives, one shared `home.homepage.packages` source and all accepted content outside the explicit pricing changes. D-041 supersedes earlier package descriptors/selection argument/Partner prefix within its named scope; it does not promote whole-page authority. Pages CMS covers all new package fields. Normal accepted chrome has one required footer disclosure, Tjenesten drives av Medon AS.; legal company metadata derives from provider config. Only Synlighet/Konvertering use ServicePage; optional media uses `/images/services/` with text-only missing-file fallback. No final service artwork is supplied/generated yet. Locale architecture stays dormant, without EN placeholders. D-025 proof guards remain evidence-only/non-public. Current page status/authority is unchanged; only homepage package data changes. Future writes/pushes/deployments require their actual handoff; no proof publication, real intake, domain cutover, translation or propagation follows technical success.

## Missing decisions are dependencies

When STRATEGY_CONTENT, OWNER or RED_TEAM input is required, write the request or blocker to `coordination/CODEX-TO-CHATGPT.md`. Include the affected gate, responsible role, concrete question, source paths/commit, and what can continue independently. Keep the corresponding review-queue entry current.

Never resolve these blockers by inventing production content, commercial positioning, offers, prices, service boundaries, proof, legal/privacy terms or material brand decisions. Do not fabricate incoming approvals or treat silence as approval. Preserve existing drafts while review is pending.

STRATEGY_CONTENT owns complete customer-facing content and its review/lock. OWNER owns consequential commercial/brand decisions and representative-page approval. RED_TEAM reviews independently and records a verdict with evidence. IMPLEMENTATION owns code, integration and technical verification within the handed-off scope. Review meaningful wholes rather than creating owner gates for individual lines or spacing values.

## Copy authority and evidence

All generated customer-facing copy without an explicit applicable lock is `DRAFT / NON-AUTHORITATIVE`, including metadata, navigation, form/interface/error wording, illustrations, legal drafts and 404 content. Page JSON records carry `authority`; `app/src/config/copy-authority.json` covers shared/source-embedded wording. The inventory and exceptions policy are in `coordination/PROJECT-STATE.md`.

Do not promote a draft by merely changing a status/authority field. Record the actual reviewed content revision, role, decision, scope and evidence in `coordination/DECISIONS.md`, and consume the corresponding inbound handoff. An approval of the homepage does not approve the other 14 pages or unlock launch.

After authorized implementation, update `coordination/CODEX-TO-CHATGPT.md` with the resulting commit, changes, validation, remaining dependencies and next requested review. Use Git history to identify the exact delivered coordination revision rather than embedding its own commit hash inside itself.

`system/` and `project/` are read-only reference inputs. Do not modify them unless the owner explicitly instructs it. No lead personal data, secrets or operational database files belong in Git or Pages CMS.
