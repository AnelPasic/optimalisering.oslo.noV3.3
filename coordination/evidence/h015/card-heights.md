# H-015 card heights — H-014 preserved

Measured default card heights in CSS pixels; columns follow Optimalisering / Vekst / Partner. Baseline: incoming 041be18218543f89c0e69f3031165b31b42ea110, delivered H-014 layout c9dc8dc7ff3b92fc640c3f6850f62f8e13380d4a. No screenshot estimation.

| Route / width | H-014 before | H-015 after |
| --- | --- | --- |
| /:1440 | 482 / 488.38 / 482 | 482 / 488.38 / 482 |
| /priser/:1440 | 770 / 770 / 770 | 770 / 770 / 770 |
| /:390 | 482 / 516.38 / 482 | 482 / 516.38 / 482 |
| /priser/:390 | 758.89 / 813.39 / 721.89 | 758.89 / 813.39 / 721.89 |
| /:320 | 521.17 / 521.17 / 521.17 | 521.17 / 521.17 / 521.17 |
| /priser/:320 | 809.25 / 840.56 / 863.75 | 809.25 / 840.56 / 863.75 |

All heights are exactly preserved. Frames stay home 100px, pricing desktop 120px/mobile 110px. All card HTML and geometry outside the SVG/caption interiors match H-014. Expanded native details remain readable without overflow and without JavaScript.
