# H-024A execution ledger

Authority: D-086 and H024A-HOMEPAGE-PAGEBUILDER-HERO.md, pulled at 8100c53.

1. Capture the current homepage; add failing composition/Hero contract tests.
2. Add typed validated blocks and structured Hero, migrate homepage/CMS, replace sequence with dispatcher, demonstrate Hero variants.
3. Prove reorder/add/remove/layout fixtures and unchanged default rendering; run independent review and one final full verify.
4. Push main; verify connected Worker; exercise authenticated CMS reorder/save/build/restore; record exact receipts and stop.

Interfaces: schema defines storage; CMS models every array item field because arrays replace on save; dispatcher consumes validated discriminated blocks. Singleton payloads remain separate. Hero storage is canonical; legacy generic page fields may be derived at parse time for shared consumers.

Preserve: five untracked OWNER PNG files, all unrelated content, reference inputs, H-023B architecture, proof gates, noindex and disabled intake. No H-024B/H-022 work.

Initial inspection: authenticated Pages CMS session available. Native block/UUID/collapsible configuration checked against official Pages CMS documentation. Current order: behov, regneeksempel, priser, resultater, mekanisme, passer, sjekk, sporsmal.

Implementation/focused/render/review/local full verify complete. Initial baseline exact. Both independent review defects fixed. Final maintained suite allows real CMS reorder/layout changes. Next: main push and authenticated CMS/Worker delivery proof.

Authenticated CMS c7a5bf5 reorder and6f9c871 restore each passed exact native/live verification.53 assets match; restored default four-width/ten-Hero QA passes. Final125 tests pass. Technical work complete; final receipt and OWNER stop gate recorded.
