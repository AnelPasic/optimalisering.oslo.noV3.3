# Project Proof Registry

Use for project-specific proof. Do not mix Medon-owned evidence into a client registry.

## Site ownership

- `MEDON_OWNED`: project may reference `proof/MEDON-PROOF-LIBRARY.md` through the Proof Router.
- `CLIENT_OWNED`: only client proof belongs here.

## Record fields

| Field | Meaning |
|---|---|
| proof_id | stable ID |
| claim_supported | exact claim scope |
| audience/segment | where relevant |
| evidence_status | verified/confirmed/observed/etc. |
| source | provenance/artifact |
| checked_at | freshness |
| metric definition | numerator/denominator/unit if quantitative |
| baseline/result/period | where applicable |
| intervention | what actually changed |
| attribution limitations | confounders/causality limit |
| wording status | draft/approved |
| permission status | naming/media/metric use |
| allowed locations | hero/service/case/etc. |
| recheck | expiry/trigger |

Use `proof/PROOF-ROUTER.md` for placement and claim matching.
