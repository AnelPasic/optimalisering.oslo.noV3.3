# H-006 OWNER selector follow-up — live review receipt

2026-10-08. Implementation 7b7a970f301a1cb47dff7307a61f97175c5589d1; source main delivery 337eded0a5f72b463040508f64081c5002eec0fc. [Static review URL](https://optimalisering-oslo-v33.anel.workers.dev).

Connected Workers Build 4e0a9f5b-936d-4de5-bbc4-742b9db6f1d6 succeeded. Verified native version **4530c18c-3768-4721-9a8a-0e335120b04c**. Local Wrangler dry-run also passed; no manual deployment, configuration or domain change was required for this revision. The previous photo delivery's missing trigger is historical; no cause/fix is inferred from this successful native build.

[Deployment receipt](deployment.json): all 15 HTML outputs match local tested dist byte-for-byte; CSS is equivalent after LF/CRLF normalization; selected hero and two inactive WebP alternatives match bytes/hashes. Noindex headers, robots/empty sitemap and intake GET 404 pass. No real submission/email occurred.

Existing focused homepage QA passes live 1440/390/320/1920 and stable-scrollbar 901px, calculator/menu/FAQ/CMS checks, preserved lower/chrome DOM and disabled/no-POST/no-JavaScript intake. Only the supplied **Synlighet X Konvertering** label is allowed in the historical copy comparison, without altering its baseline. [Homepage checks](homepage-checks.json).

[Live desktop](selector-1440.png), [390px](selector-390.png), [320px](selector-320.png), [901px stable scrollbar](selector-901.png); [selector checks](selector-checks.json) confirm 17px labels, #320c43 background, #e0f0ef text/icon, decorative/non-focusable progress icon and label/icon fit without clipping.

Verification: QA_BASE_URL set to the review URL; existing scripts/qa-home-h006.mjs with QA_EVIDENCE_DIR=qa-output/h006-selector-live; targeted captures and source/build/asset comparisons recorded above. Historical evidence is untouched. The following receipt/evidence revision changes no website assets; find its SHA in Git history. Stop for OWNER R-03; preserve D-019/D-020 verdicts at their exact reviewed revisions. No whole-page acceptance, expansion or production launch is supplied by QA.
