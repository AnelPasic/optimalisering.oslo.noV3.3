# Lokale Phosphor Regular-ikoner

Kilde: [phosphor-icons/core](https://github.com/phosphor-icons/core/tree/2b75f3ad12b420c9504ef05df8d2564a28f8500e/assets/regular) – pinned commit `2b75f3ad12b420c9504ef05df8d2564a28f8500e`, MIT-lisens ved `app/public/licenses/phosphor-icons.txt`.

**Pages CMS → Tjenester med ikoner → Phosphor-ikonnavn**: Skriv et av filnavnene nedenfor **uten** `.svg`. Navnet må stemme nøyaktig. Feltet er valgfritt; `Generisk ikon` er fortsatt fallback for eldre innhold. Bare lokale, tillatte ikonnavn fungerer. Ingen ekstern ikonfont, CDN, fjerntilgang eller brukerdefinert SVG/HTML.

- `magnifying-glass`
- `cursor-click`
- `sparkle`
- `map-pin`
- `target`
- `chat-circle-dots`
- `megaphone`
- `shopping-cart`
- `browser`
- `credit-card`
- `wrench`
- `chart-line-up`
- `eye`
- `grid-four`
- `binoculars`
- `toolbox`
- `robot`
- `map-trifold`
- `chat-teardrop-dots`
- `chart-bar`

`PackageFocusIcon.astro` bruker disse ikonene på pakkekortene, mens eldre generiske ikonformer fortsatt kan brukes i andre komponenter. SVGene bruker `fill=currentColor` og skjules for skjermlesere fordi tjenestenavnet står ved siden av.
