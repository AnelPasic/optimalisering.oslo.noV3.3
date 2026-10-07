# Token Transfer / 1:1 Variable Swaps

Reference testing should isolate variables.

Example baseline:

```text
Typography: current
Palette: current
Geometry: current
Components: current
```

Typography-only test:

```text
Typography: reference-derived
Palette: LOCKED current
Geometry: LOCKED current
Components: LOCKED current
```

Palette-only test follows the same logic.

## Rules

- exact color values may be used in an internal study when supplied;
- production adoption requires brand/accessibility/context review;
- typography is only exact when the actual permitted font is loaded;
- never change section order/copy while evaluating palette or type;
- every study states `LOCKED`, `CHANGED`, `DECISION NEEDED`.
