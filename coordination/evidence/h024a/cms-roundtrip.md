# Authenticated H-024A CMS round trip

Authenticated Anel Pasic session in the existing Pages CMS GitHub installation, homepage editor on main. No custom editor, API substitute or synthetic save was used for this workflow.

1. Opened the homepage with native collapsed typed block list and UUID fields. `cms-hero.png` records the structured Hero editor. Native drag handles expose keyboard instructions.
2. Moved only `mekanisme` after `passer` using the native UI. Saved once: `c7a5bf577ee12581bc56a6eb5d5f196e769df1aa`. Pulled ff-only; exact source comparison proves only this swap and unchanged UUID/anchor pairs/payloads. `cms-reordered.png` and `cms-reorder-source.json`.
3. Native build `73970d35-fe48-4d1b-aeb7-cf1909bdbf93` SUCCESS at that exact CMS SHA; Worker version `b1050dcd-7fae-4bc4-abd0-09bf42a20f9b` at100%. Real preview order and all53 byte-exact assets pass. `cms-reorder-native.json`, `cms-reorder-assets.json`, `cms-preview-reorder.json/png`.
4. Reloaded the editor and used native ordering controls to put `mekanisme` back before `passer`. Checked the whole list before Save; only the intended original order was saved. One upward keyboard movement initially jumped farther than intended in the editor; it was corrected before saving. This is not represented as comprehensive CMS keyboard usability acceptance.
5. Restore save: `6f9c8712b3ed561fde5b8520ee8793d4432b04c5`. Pulled ff-only. Homepage is semantically identical to implementation `d4bc857`; differences are two content-block JSON key orders and final newline. Other source files are byte-exact. `cms-restore-source.json`.
6. Native build `f7a9dcbd-8a71-4efb-b846-6ba1e65b11af` SUCCESS at the exact restore SHA; Worker version `2ae2b5d1-5e3b-433d-970e-9165c77228ae` at100%. Restored preview order,53 byte-exact assets, four-width homepage/default geometry and ten Hero variant checks pass. `cms-restore-native.json`, `cms-preview-restore.json/png`, `live-assets.json`, `live/`.
7. UI-only config refinement `3fcc2db9e04a2929631049acf01354eb7ca2cd83` removes the repeated row description/raw English keys: one field-label instruction, human summaries and native translated type badges. Reloaded the actual authenticated editor and verified the resulting labels; `cms-final-editor.png`. Content, schema, IDs and website assets are unchanged by this label-only refinement.

The requested authenticated reorder/save/Git/build/preview/restore proof is complete. OWNER still reviews the whole editor and Hero visual pilot. This evidence does not create a role verdict, launch permission or H-024B authority.
