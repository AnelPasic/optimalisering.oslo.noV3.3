# H-017A connected Worker verification

Published source: merged main `2efb777f707d4404625cf962b27c06f269e3f6f4`, preserving OWNER main `4257b9414bd87e46d26c4d489065faef8e06eb1e`; intake source/native-submit fix `0678ceb21227e07aa0ffe29e4c35fc596d5f2c5c`.

Native connected build **success**: Build `440ae9fc-018a-4be4-bb9d-defbdd1727e3`, Worker version `841284c3-4033-407c-8174-ef15b6e84bcf`. Exact source/build URL/version and per-file SHA256/status/header comparisons are in `deployment.json`.

29 assets match the locally tested build: 15 page HTML, 5 browser JavaScript bundles (including gated order/native-submit fix), 4 accepted CSS, 3 selected/alternate homepage WebP, robots and sitemap. CSS-only line-ending equivalence is explicitly distinguished from byte equality. All 15 page responses retain `X-Robots-Tag: noindex, nofollow`; review metadata/robots remain blocked. Static intake probe uses **GET only**, returning 404.

`browser-results.json` / `browser.log`: 7 live review groups at 1440/390px, all three package keys selected correctly; public order `data-enabled=false`, native/no-JS button disabled and preview notice retained. Programmatic submit-event/native-instance order calls and existing assessment event flows produce **zero POST** and no false success. Native-call regression additionally intercepts the API defensively; no submitted body reaches the Worker. All recorded browser requests are GET; zero notifications, zero real leads/emails/errors.

Current OWNER CMS saves are now rendered by this successful merged H-017A build. This does not prove a subsequent real save/revert round trip or accept the editor UX. H-017B remains queued and unexecuted under D-065. H-017A stops for OWNER + STRATEGY_CONTENT technical review; no production intake, launch, secrets, domain/index or material/content approval follows.

The subsequent evidence/coordination-only commit is identifiable from Git history and is verified read-only after pushing; its rendered output must continue matching these tested assets. No receipt embeds its own commit hash.
