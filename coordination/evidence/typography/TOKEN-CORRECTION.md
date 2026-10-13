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

Delivered to main at **32ab54d82c101b50b2ba125b333417f18c3f5d01**. Exact native Build **f2c3d287-e146-4d32-8c15-12bcf64f2f14 SUCCESS**, Worker **19c3ac14-8f5c-46fd-b615-c3f2f9d64376**. **53 assets match** the tested build with preview/noindex/robots/empty-sitemap/disabled-intake/custom404 safeguards intact. **196 live rendered groups** pass at all four widths with zero failures/errors/POST. Receipts: `tokens-native-build.json`, `tokens-live-assets.json`, `tokens-live/checks.json`, `tokens-live.log` and captures. Previous evidence is preserved separately. CODEX-TO-CHATGPT/PROJECT-STATE/REVIEW-QUEUE are updated; this subsequent evidence receipt changes no website asset. **STOP for OWNER visual review.** No content lock, launch authority or box/card scope is added.
