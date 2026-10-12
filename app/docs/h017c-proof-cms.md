# H-017C proof presentation

H-017D (2026-10-12) supersedes the public density described below: the current renderer shows only client, metric/source label, delta/support, before/after and periods. Work/limitations remain required internally and are omitted from public cards. All registry/CMS/gate rules below remain unchanged; historical H-017C evidence is retained.

The existing Pages CMS editors remain in use. No authenticated CMS save/revert is required for this pass; local schema/content round-trip evidence is in `coordination/evidence/h017c/cms-roundtrip.json` and the H-017C tests. H-017B's authenticated architecture proof remains separate and complete.

- Forside -> Forsidens innhold -> Dokumenterte resultater: select case IDs in order, then edit eyebrow, heading and before/after/work labels. The first publishable selected case is featured; subsequent cases support it. Current approved selection: Eurotents, Nysta, Helt Opplagt.
- Tjenester -> Konvertering / Synlighet -> Dokumenterte resultater: choose the primary approved case and edit the same labels. Current selections: Nysta / Helt Opplagt. The proof block appears after prioritization and before the relationship section and pricing bridge. Other services have no new proof placement.
- Clearing the selection removes the whole proof section. Empty references normalize to an empty array. Selection never approves a case.

The existing case/evidence registry is internal and read-only in the CMS, including nested periods/evidence, naming permission, strategy review, publication approval and status. Create/delete/rename are disabled. Slot approval is also read-only. Changes to these guarded records require a new documented scoped handoff and Git implementation. Ordinary presentation editing does not change proof authority.

`getPublishableCases` and its strict raw-case requirements are unchanged. Incomplete, unapproved, non-comparable, withdrawn or permission-pending cases cannot render. The renderer receives only the allowed public projection, never source/provenance or `evidenceMetrics`. A simulated registry serialization that drops required raw keys remains fail-closed; this pass does not weaken that normalization safeguard.

The final H-017C imports the approved handoff evidence for Eurotents and Helt Opplagt; it does not claim a fresh live account query or raw source export. Eurotents uses only the April 2025/2026 Google Ads Telt ROAS/spend comparison. Separate organic periods and disputed GA4 metrics are excluded. Helt Opplagt is organic search visibility proof with explicit limits, including lower total recorded forms. Nysta's locked caveat and subsequent period remain unchanged. Oslo Privatklinikk remains deferred. Tankeverksted and Oracles retain D-075 permission and future context in coordination; no synthetic comparison or public record is manufactured.

No `/resultater/` route, intake enablement, indexing, secret/domain change or launch approval is supplied. Stop for OWNER + STRATEGY_CONTENT visual/content review.
