# Visual Review Protocol

Use this for every visual approval round.

## Every review artifact must state

- gate being reviewed;
- exact decision requested from owner;
- what is already locked;
- what changed in this artifact;
- what did not change;
- desktop viewport;
- mobile viewport;
- whether fonts are actually loaded or approximated;
- whether imagery/proof is real, placeholder, generated or hypothetical.

## Comparison rule

Prefer side-by-side comparison where **one major variable changes**.

Bad comparison:
- A uses a serif, dark blue, rounded cards, different hero copy and photography;
- B uses a sans, green, open sections, different copy and illustration.

The owner cannot tell what actually improved.

Good comparison:
- same copy;
- same structure;
- same spacing;
- only typography changes.

Then lock typography before moving to color.

## Review fidelity

Typography, spacing, wrapping and responsive behavior must eventually be reviewed in browser-rendered HTML/CSS. Raster/ImageGen studies may be useful for art direction but cannot approve exact font metrics, reflow, accessibility or interactions.

## Feedback interpretation

Translate qualitative feedback into a likely design variable before revising.

Examples:

- “too boring” → color frequency, contrast, imagery, typography character, or rhythm;
- “too corporate” → type character, imagery, geometry, copy tone;
- “too aggressive” → saturation, scale, dark surfaces, CTA density, headline tone;
- “too empty” → content density, spacing, grouping, not automatically more decoration;
- “too busy” → number of objects, competing emphasis, cardification, section transitions;
- “looks like AI/SaaS” → generic gradient, purple/blue palette, dashboard illustrations, excessive pills/cards, synthetic copy.

Change the smallest plausible set first.
