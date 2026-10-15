# H-023A - Tailwind/daisyUI foundation + design-system shell

Date: 2026-10-15
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED
Supersedes priority of the pending H-022 visual review; H-022 remains delivered but PARKED, not accepted/rejected.

## Why this exists

The current project has a deeper architecture problem than any one proof/package/card section:

- Tailwind and daisyUI are not installed.
- accepted visual rules are split between global CSS and route-specific Invite CSS.
- SiteLayout conditionally loads page-family styles.
- route/template selection still contains hard-coded slug logic.
- some service pages therefore render through the newer shell while other service pages such as /seo/ still use the older visual system.

Do not keep polishing individual sections on top of this split foundation.

This pass establishes the new UI foundation and Visual Shell.
Broad route migration follows only after OWNER approves the new foundation.

## Locked direction

For this project:

- Astro remains the application framework.
- Tailwind CSS 4 becomes the utility/build layer.
- daisyUI 5 becomes the semantic UI component/theme layer.
- current approved Optimalisering visual identity remains the brand direction.
- Pages CMS/content/proof/pricing/business logic remain unchanged.
- no public launch/indexing/intake change.

Do NOT use the AnLast theme values.
The AnLast block was an example of the theme-contract format only.

## Current official implementation path

Use the current official Astro/Tailwind 4 approach:
- Tailwind through the Vite plugin
- @tailwindcss/vite
- global CSS import
- daisyUI configured in CSS

Do not introduce legacy @astrojs/tailwind or Tailwind 3 configuration.

Pin compatible package versions through package-lock.

## Codex daisyUI context - REQUIRED

Before substantial UI implementation, verify current daisyUI guidance is available to Codex.

Preferred free MCP:
`daisyui-gitmcp`

Official setup command:

`codex mcp add daisyui-gitmcp -- npx -y mcp-remote https://gitmcp.io/saadeghi/daisyui`

Use the MCP when making daisyUI component/theme decisions.

Fallback:
Context7 MCP.

The daisyUI Codex plugin/skill may also be installed for persistent rules.

If the environment cannot configure or use either free MCP:
- record the exact blocker
- do not silently rely on stale remembered daisyUI syntax
- use the current official daisyUI documentation as the explicit fallback source and report that deviation

## One real theme contract

Create one custom daisyUI theme:

`optimalisering`

Required structure:

```css
@import "tailwindcss";

@plugin "daisyui" {
  themes: light;
}

@plugin "daisyui/theme" {
  name: "optimalisering";
  default: true;
  prefersdark: false;
  color-scheme: "light";

  --color-base-100: ...;
  --color-base-200: ...;
  --color-base-300: ...;
  --color-base-content: ...;

  --color-primary: ...;
  --color-primary-content: ...;
  --color-secondary: ...;
  --color-secondary-content: ...;
  --color-accent: ...;
  --color-accent-content: ...;
  --color-neutral: ...;
  --color-neutral-content: ...;

  --color-info: ...;
  --color-info-content: ...;
  --color-success: ...;
  --color-success-content: ...;
  --color-warning: ...;
  --color-warning-content: ...;
  --color-error: ...;
  --color-error-content: ...;

  --radius-selector: ...;
  --radius-field: ...;
  --radius-box: ...;
  --size-selector: ...;
  --size-field: ...;
  --border: 1px;
  --depth: ...;
  --noise: 0;
}
```

## Theme mapping

Translate the CURRENT approved Optimalisering palette/geometry into semantic daisyUI values.

Current visual source of truth includes:

- base white: current surface-base / #ffffff where Invite applies
- soft page background: #fbf9fc
- base content / ink: #302238
- muted copy: current approved muted role
- primary: #087b73
- dark secondary/showcase surface: #320c43
- mint: #e0f0ef
- lavender: #f1edf8
- mint strong: #b9e8d4
- current notice/error/state colors
- field radius: current ~8px
- ordinary card radius: current ~20px
- feature radius may remain a semantic Tailwind extension if larger than daisyUI radius-box

Convert theme colors to OKLCH.

Do not eyeball replacements that visibly change the accepted palette.
Preserve current WCAG contrast at minimum.

Document the exact old-token -> daisyUI-token mapping.

## Typography

Keep the approved Instrument Sans + Figtree typography and the current semantic type scale.

Do not force typography into daisyUI theme variables if doing so makes the type system less explicit.

Tailwind/daisyUI migration must not reopen:
- display/body font choice
- approved type sizes
- 14px public floor
- line-height hierarchy

Expose the existing semantic type scale through the new global design layer so all routes can consume it.

## Component-first rule

Use implementation priority:

1. daisyUI component
2. Tailwind utility/variant composition
3. scoped custom CSS only for genuinely unique editorial/commercial composition

Inventory the current UI and map routine elements to daisyUI equivalents where suitable.

At minimum evaluate and use where appropriate:
- navbar/menu
- button
- input
- textarea
- select
- range
- card
- badge
- alert
- collapse/details for FAQ
- stats for metric/result groups where semantically suitable
- join/tabs only where the UX actually needs them

Do NOT mechanically wrap every content block in a daisyUI card.

Special compositions such as:
- calculator/chart
- PageList alternating media/text
- featured proof showcase
- unusual hero composition

may remain custom semantic components built FROM the shared theme/components.

## Design-system route

Create a review-only route:

`/design-system/`

Requirements:
- not in public navigation
- noindex
- clearly marked internal/review
- available on connected Worker
- uses realistic Norwegian examples, not lorem ipsum

Show at minimum:

### Brand/theme
- semantic color swatches
- base/primary/secondary/accent/neutral/state colors
- radii/field sizes

### Typography
- display
- H1/H2/H3/H4
- lead
- body
- meta/eyebrow
- buttons/form labels

Stress:
- short headings
- very long Norwegian heading
- multi-line body copy

### Components
- primary/secondary/ghost/link buttons
- inputs/select/textarea/range
- notice/alert states
- badges
- ordinary card
- soft card
- dark card
- media card
- 2 / 3 / 4-card grids
- FAQ/collapse
- pricing cards when relevant
- PageList media/alternating examples
- proof/result primitive examples without changing actual proof content
- form example

### Sections
- centered heading
- left heading
- white/base
- soft
- mint
- lavender
- dark

### Responsive stress
- deliberately long labels/copy
- varied item count

## Theme Controller

Use daisyUI Theme Controller on the design-system route.

For this pass:
- `optimalisering` is the approved production/default theme.
- built-in `light` may be available only as a QA comparison theme on /design-system/.
- clearly label `light` as comparison/test, not an approved public brand theme.
- do not expose the theme switch in production navigation/pages.
- persistence is NOT required for the QA controller.

The purpose is to prove that components are using semantic theme tokens rather than hard-coded brand colors.

## Homepage migration - representative real page

Migrate the homepage shell/routine controls to consume the new Tailwind/daisyUI foundation.

The homepage is the real Visual Shell proof.

Preserve:
- current content
- current section order
- calculator behavior/math
- pricing content/logic
- H-019 CMS surfaces
- H-020 heading alignment
- H-021 PageList system
- proof data/authority and the delivered H-022 showcase state
- hero media/crop
- noindex
- disabled intake

Do not redesign proof again in H-023A.
Proof is parked for later visual review.

Visual goal:
- preserve the current approved overall direction
- remove redundant bespoke CSS where daisyUI/Tailwind now owns the primitive
- no requirement for pixel-identical output if the new component system is cleaner
- any material visual drift must be shown explicitly for OWNER review

## Global stylesheet architecture

Create a single globally imported UI entrypoint.

Conceptual structure is acceptable:

```
styles/
  app.css              # Tailwind import + daisyUI plugins/theme
  typography.css       # semantic approved type scale
  project.css          # small project-specific compositions if necessary
```

or an equally clear alternative.

Important:
- daisyUI theme is the brand token authority
- typography remains shared
- page-specific CSS must not redefine another palette/component system

Do not create a 5,000-line replacement global stylesheet.

## Legacy CSS treatment

Do NOT delete all legacy Invite CSS in this pass unless a rule is proven unused.

Instead:
- inventory it
- label rules as one of:
  - replaced by daisyUI/Tailwind
  - temporary route-composition dependency
  - genuinely unique component
  - obsolete
- stop adding new design primitives there

H-023B will remove/migrate remaining route-specific visual-system rules after OWNER approves the Visual Shell.

## Routing/template architecture analysis

Do not broadly migrate routes in H-023A.

But produce the exact H-023B migration plan.

Current anti-pattern to remove next:
- hard-coded slug arrays determining ServicePage / style loading

All pages with `kind: "service"` must eventually inherit one service-family visual system through semantic template/capability logic, not slug whitelists.

Specifically call out current /seo/, /ai-synlighet/, /nettbutikkoptimalisering/ and other affected routes.

Do not force them through the current ServicePage blindly if its structural assumptions would break them.
Design the semantic renderer/template solution first.

## CMS

Do not change public content.

Existing safe presentation controls must continue to work:
- surface
- card surface
- heading alignment
- PageList presentation/media
- proof visual config

CMS values should map to semantic theme/component variants rather than raw old palette classes where practical.

Do not expose arbitrary daisyUI class names in CMS.

## QA

This is foundation work, so verify deeply but sensibly.

Required:
- package install/build
- Astro check
- current full test suite
- theme token validity
- no missing daisyUI component styles
- homepage 1440 / 900 / 390 / 320
- /design-system/ 1440 / 390
- theme-controller switches optimalisering <-> light on design-system route
- no theme-controller on normal public routes
- all current routes still build
- noindex/intake safeguards preserved
- CMS schema/content hashes preserved unless implementation metadata requires a documented safe migration

Do not claim broad route visual consistency yet.
That is H-023B.

## Evidence

Keep concise:
- dependency/config receipt
- MCP availability/fallback receipt
- theme mapping table
- homepage before/after at 1440/390
- design-system 1440/390
- legacy CSS inventory
- H-023B route/template migration plan
- Worker receipt

## Delivery

Pull latest main.

Implement H-023A only.

Push main.
Verify connected Worker.
Update CODEX-TO-CHATGPT and PROJECT-STATE.

Then STOP for OWNER Visual Shell / design-system review.

Do not continue automatically into H-023B.
