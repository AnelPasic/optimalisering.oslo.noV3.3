# Direct OWNER token correction — 2026-10-13

Continues the typography-only scope from main `8a8292c`. Applies the supplied values exactly:

```css
--type-display: clamp(1.75rem, 4.5vw, 3.25rem);
--type-lead: clamp(1.25rem, 1.8vw, 1.375rem);
--type-body: clamp(1rem, 1.35vw, 1.125rem);
--type-meta: 0.9375rem;
```

At the default root these mean display 28–52px, lead 20–22px, body 16–18px and meta/caption 15px. Other tokens and fonts stay exact.

The first actual full verify caught one regression: at 320px with the calculator's maximum valid inputs, the existing compact endpoint string `31 384 283,8 bill.` at 15px reached x=322.5, past the viewport and its light chart surface. The endpoint numbers now use `letter-spacing: -.075em`; their font remains the exact 15px meta role. The same measured label ends at x=303.255 inside the existing surface's x=304 right edge. Screenshot `tokens-local/calculator-maximum-320.png` is inspected. No formatter, numeric value, chart coordinates/math/behavior, box/background/padding/layout or copy changes. The existing browser guard additionally rejects an endpoint label outside its contrasting figure surface.

Final full verify: **89 tests**, zero Astro errors/warnings, one preexisting QA-script hint; all static/COPY-STYLE/CMS/proof/commercial guards, 16 routes/544 links and 20 unchanged CMS JSON hashes. Four-width rendered QA: **196 groups**, zero small-text/contrast/clipping/button/overflow failures, browser errors or POST, empty allowlist. Updated responsive captures/checks: `tokens-local/`; full log: `tokens-verify.log`.

Push the correction to main, verify exact native build/assets and the same live typography checks, update CODEX-TO-CHATGPT and stop for OWNER visual review. This correction adds no content lock, launch authority or box/card scope.
