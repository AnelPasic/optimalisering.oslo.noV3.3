# H-023A theme and dependency receipt

Incoming main: `2ee159c23e62b6e7217812cd8a35be3cc69b2b04` (use Git history for the full SHA). Astro stays. Tailwind uses `@tailwindcss/vite` in `astro.config.mjs`; no Tailwind 3 config or legacy integration. Exact versions in package-lock:

- `tailwindcss`: `4.3.3`
- `@tailwindcss/vite`: `4.3.3`
- `daisyui`: `5.7.50`

One UI entry: `src/styles/app.css`, imported by SiteLayout. `optimalisering` is the explicit document default and custom daisyUI default; `light` is bundled solely for the internal Theme Controller. No localStorage, cookies or public theme selector. New review wording remains DRAFT / NON-AUTHORITATIVE under the existing shared-copy registry.

## Exact palette mapping

Conversion uses the standard sRGB transfer function and OKLab matrices, then polar OKLCH. Browser canvas checks all entries against the original sRGB value (maximum one channel value tolerance); WCAG audit converts computed OKLCH to sRGB before measuring contrast. No AnLast values.

| Existing role | daisyUI / extension token | sRGB source | OKLCH |
| --- | --- | --- | --- |
| --paper / --surface-base | `--color-base-100` | `#ffffff` | `oklch(0.99999999 0.00000004 89.875563)` |
| --cream / --surface-soft | `--color-base-200` | `#fbf9fc` | `oklch(0.98448538 0.00447018 314.805168)` |
| --line | `--color-base-300` | `#e0dbe6` | `oklch(0.89858076 0.01576479 306.393763)` |
| --ink | `--color-base-content` | `#302238` | `oklch(0.27871246 0.04378087 312.743227)` |
| --green | `--color-primary` | `#087b73` | `oklch(0.52558456 0.09022346 186.796455)` |
| primary button text | `--color-primary-content` | `#ffffff` | `oklch(0.99999999 0.00000004 89.875563)` |
| --surface-dark | `--color-secondary` | `#320c43` | `oklch(0.25075315 0.10077263 313.031100)` |
| dark selector text / --surface-mint | `--color-secondary-content` | `#e0f0ef` | `oklch(0.94297432 0.01697831 192.350958)` |
| --surface-mint-strong | `--color-accent` | `#b9e8d4` | `oklch(0.89248500 0.05576943 167.275491)` |
| --ink on mint-strong | `--color-accent-content` | `#302238` | `oklch(0.27871246 0.04378087 312.743227)` |
| --ink | `--color-neutral` | `#302238` | `oklch(0.27871246 0.04378087 312.743227)` |
| white on ink | `--color-neutral-content` | `#ffffff` | `oklch(0.99999999 0.00000004 89.875563)` |
| --surface-mint | `--color-info` | `#e0f0ef` | `oklch(0.94297432 0.01697831 192.350958)` |
| --ink | `--color-info-content` | `#302238` | `oklch(0.27871246 0.04378087 312.743227)` |
| --surface-mint-strong | `--color-success` | `#b9e8d4` | `oklch(0.89248500 0.05576943 167.275491)` |
| --ink | `--color-success-content` | `#302238` | `oklch(0.27871246 0.04378087 312.743227)` |
| --surface-notice | `--color-warning` | `#f5eedc` | `oklch(0.94976849 0.02496090 89.213447)` |
| Invite notice copy | `--color-warning-content` | `#6b4b25` | `oklch(0.43944197 0.06880803 69.030808)` |
| existing .field-error #9e372d | `--color-error` | `#9e372d` | `oklch(0.48326547 0.13904820 28.765185)` |
| white on error | `--color-error-content` | `#ffffff` | `oklch(0.99999999 0.00000004 89.875563)` |
| --surface-mint | `--color-mint` | `#e0f0ef` | `oklch(0.94297432 0.01697831 192.350958)` |
| --surface-lavender | `--color-lavender` | `#f1edf8` | `oklch(0.95236592 0.01522005 302.554194)` |
| --muted | `--color-muted` | `#655d6d` | `oklch(0.49158061 0.02696654 307.853282)` |
| --surface-cta | `--color-cta` | `#e5f2ed` | `oklch(0.95004242 0.01526395 171.047231)` |
| --surface-dark-muted | `--color-dark-muted` | `#e0d9e7` | `oklch(0.89496413 0.02032388 308.208563)` |
| --surface-dark-line | `--color-dark-line` | `#65536e` | `oklch(0.47041354 0.04809311 314.327700)` |
| --border-control color | `--color-control-line` | `#cbc2d4` | `oklch(0.82684622 0.02665445 308.103296)` |
| Invite focus ring | `--color-focus` | `#a86613` | `oklch(0.57093736 0.12197198 64.769138)` |

| Geometry | Theme contract | Legacy semantic alias |
| --- | --- | --- |
| Button/selector 6px | `--radius-selector: .375rem` | `--radius-button` |
| Field 8px | `--radius-field: .5rem` | `--radius-sm` |
| Ordinary card 20px | `--radius-box: 1.25rem` | `--radius-card` |
| Feature 24px | Tailwind `--radius-feature: 1.5rem` | `--radius-card-lg` |
| Field | `--size-field: .25rem` plus shared 48px minimum | `--control-height` |
| Selector | `--size-selector: .25rem` | radio/range dimensions from daisyUI |
| Border/depth/noise | `1px / 0 / 0` | flat approved geometry |

Typography stays in `typography.css` with Instrument Sans + Figtree and the existing 14px floor. `project.css` selects these roles for daisyUI components and adapts existing semantic surface names; it contains no independent palette. Special proof/calculator/SVG compositions keep their existing colors and logic.

## Cascade and visible changes

Layer order is declared before the conditional external styles because Astro hoists its bundle after those links: `theme, base, legacy, components, utilities, project`. Retained Invite sheets join `legacy`; imports preserve original specificity within it. DaisyUI components use their own layers above legacy; scoped special compositions remain intact. This is coexistence, not H-023B completion.

OWNER should inspect: daisyUI button spacing/height/states; native range appearance; field borders; FAQ generated plus/minus and spacing; shared header menu hit areas. The Vekst CTA keeps its secondary plum intent. Theme, fonts, type scale, content and section order stay preserved. Compare before/after captures at 1440/390.

## MCP

Executed the exact authorized `codex mcp add daisyui-gitmcp -- npx -y mcp-remote https://gitmcp.io/saadeghi/daisyui`; command succeeded. Direct MCP initialize and tools/list succeeded after retaining the returned MCP session header. `fetch_daisyui_documentation` succeeds; component/theme search succeeds but returns no semantic matches, with repository README fallback. This is an indexing/content limitation, not a connection failure. The session cannot dynamically expose newly configured MCP tools, so protocol calls verify/use the free server directly. See mcp-probe.log and mcp-guidance.json.

Current official documentation supplements the incomplete search: [Astro/Vite installation](https://daisyui.com/docs/install/astro/), [custom themes](https://daisyui.com/docs/themes/), [Theme Controller](https://daisyui.com/components/theme-controller/). The installed daisyUI 5 component source additionally confirms the exact selectors. No stale remembered syntax is the authority.
