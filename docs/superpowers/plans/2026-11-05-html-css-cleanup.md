# HTML and CSS cleanup implementation plan

> For agentic workers: use superpowers:executing-plans to implement this plan task by task.

**Goal:** Remove redundant markup/classes and demonstrably unused CSS in MWS and Oslo without changing rendered content, design, themes or behavior.
**Architecture:** Reuse existing daisyUI components and shell/control hooks. Remove wrapper elements only when their layout responsibility can move to existing elements; preserve semantic landmarks, native component parts and interaction/data hooks.
**Tech stack:** Existing Astro 7, Tailwind 4, daisyUI 5.7.50; no dependency/configuration changes.
**Spec:** OWNER chat request, 2026-11-05, cleanup of both projects.

## Constraints and checks
- Preserve every CMS/content/proof/price/theme source, API/form contract and provider/indexing setting.
- Preserve library/web-component classes generated dynamically, responsive rules and state hooks. Static reference counts alone are insufficient evidence of unused CSS.
- Keep native Card/body/title/actions, Hero/content and accessibility/live-region semantics.
- Compare relevant rendered geometry, typography, color and image crop before/after at 390/1440 and Light/Dark. Existing galleries cover optional Hero families.
- Do not add tests for deletion-only changes. Adapt existing source/selector assertions when a retired presentation class changes, then run relevant checks/build and targeted interactions.

## Tasks
- [x] Capture representative markup/style baselines and byte/node counts in local evidence.
- [x] Simplify Hero wrappers and home photo wrapper in both projects; remove Oslo's empty homepage wrapper. Keep wrappers with active page-family/layout/semantic responsibilities.
- [x] Remove verified orphan class tokens and CSS rules; consolidate exact duplicates only in the same cascade context. Preserve future CMS states and generated Pagefind parts.
- [ ] Verify source diffs/protected records, typecheck/build, representative rendering and affected interactions. One coherent PR per repository, followed by authorized integration/preview verification.

Ruling: keep the width-constraining shell for inner Hero families through a tiny server-rendered HeroContainer; native Hero width overrides a shell applied to that same element. Remove the wrapper only for families that already own their shell. Before/after geometry exposed this dependency.

Measured result: 16 MWS and 28 Oslo route/width/theme states preserve content and computed geometry/type/colors/crop. The four before/after homepage captures at 390/1440 are pixel-identical. MWS removes two homepage DOM elements; Oslo removes three. Built CSS decreases by 1,527 bytes and 875 bytes respectively (269/131 bytes gzip). Publication and CI are verified through the associated PR/provider records. No new tests or dependency changes.
