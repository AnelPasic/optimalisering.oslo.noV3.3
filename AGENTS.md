# Project coordination rules

## Read before substantial work

Read `coordination/CHATGPT-TO-CODEX.md` and `coordination/DECISIONS.md` before substantial work. Then read `coordination/PROJECT-STATE.md` and the relevant entries in `coordination/REVIEW-QUEUE.md`. Repository paths in these rules are relative to this repository root.

The repository is the durable coordination layer between ChatGPT / STRATEGY_CONTENT / RED_TEAM / OWNER and Codex / IMPLEMENTATION. A chat suggestion, generated draft, implementation plan, successful test or commit is not a content lock or material approval.

## Current scope: preserve the exploratory baseline

The existing 15-page website in `app/` is an exploratory baseline, not approved production. Pause page/content expansion. The representative design page is the complete homepage `/`, assessed on desktop and mobile. D-021 records OWNER R-03 PASS for the current H-006-derived visual/IA baseline, including the selected photo and owner selector/color changes. Genuine RED_TEAM layout/spacing/IA PASS remains D-019 at `7e69c07`; selected-photo PASS remains D-020 at `dc04574`, with a retail-positioning caveat. H-007 implements the D-022 commercial ladder, D-023 evidence-only proof model and CMS fields on that accepted baseline. Stop after H-007 for STRATEGY_CONTENT review. Do not redesign, delete or polish the other 14 pages.

Do not expand, redesign or polish the remaining pages until the representative page and content/visual direction have passed the reviews recorded in `coordination/REVIEW-QUEUE.md` and the resulting approvals are recorded in `coordination/DECISIONS.md`. A review request alone does not authorize a representative-page revision; wait for an explicit, scoped handoff in `coordination/CHATGPT-TO-CODEX.md`.

The baseline and H-001 through H-007 are completed implementation history. H-007 includes delivery to `main` for the connected review Worker, with preview/noindex and intake disabled. Retain OWNER's selected first generated hero photo and the two inactive alternatives through the single CMS-driven hero/layout. The two imported proof records remain EVIDENCE_ONLY / NEEDS_PERMISSION and cannot render without complete explicit publication controls. D-022's exact commercial facts are authoritative; generated connective wording and the full homepage remain REVIEW_REQUIRED / DRAFT / NON-AUTHORITATIVE. Keep the repository coordination record synchronized as part of delivery. This does not authorize proof publication, production lead processing, domain cutover or propagation. Future repository writes/pushes/deployments must follow the scope of their actual handoff.

## Missing decisions are dependencies

When STRATEGY_CONTENT, OWNER or RED_TEAM input is required, write the request or blocker to `coordination/CODEX-TO-CHATGPT.md`. Include the affected gate, responsible role, concrete question, source paths/commit, and what can continue independently. Keep the corresponding review-queue entry current.

Never resolve these blockers by inventing production content, commercial positioning, offers, prices, service boundaries, proof, legal/privacy terms or material brand decisions. Do not fabricate incoming approvals or treat silence as approval. Preserve existing drafts while review is pending.

STRATEGY_CONTENT owns complete customer-facing content and its review/lock. OWNER owns consequential commercial/brand decisions and representative-page approval. RED_TEAM reviews independently and records a verdict with evidence. IMPLEMENTATION owns code, integration and technical verification within the handed-off scope. Review meaningful wholes rather than creating owner gates for individual lines or spacing values.

## Copy authority and evidence

All generated customer-facing copy without an explicit applicable lock is `DRAFT / NON-AUTHORITATIVE`, including metadata, navigation, form/interface/error wording, illustrations, legal drafts and 404 content. Page JSON records carry `authority`; `app/src/config/copy-authority.json` covers shared/source-embedded wording. The inventory and exceptions policy are in `coordination/PROJECT-STATE.md`.

Do not promote a draft by merely changing a status/authority field. Record the actual reviewed content revision, role, decision, scope and evidence in `coordination/DECISIONS.md`, and consume the corresponding inbound handoff. An approval of the homepage does not approve the other 14 pages or unlock launch.

After authorized implementation, update `coordination/CODEX-TO-CHATGPT.md` with the resulting commit, changes, validation, remaining dependencies and next requested review. Use Git history to identify the exact delivered coordination revision rather than embedding its own commit hash inside itself.

`system/` and `project/` are read-only reference inputs. Do not modify them unless the owner explicitly instructs it. No lead personal data, secrets or operational database files belong in Git or Pages CMS.
