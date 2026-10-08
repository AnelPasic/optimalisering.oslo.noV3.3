# Homepage hero options

OWNER supplied three generated images on 2026-10-08 and explicitly selected the first for the homepage. These are illustrative generated assets, not verified clients, testimonials or case proof.

| Option | Supplied original | Web image | Use |
| --- | --- | --- | --- |
| 1 | happycustomer.png | hero-customer.webp | Selected hero |
| 2 | happycustomer2.png | hero-customer-02.webp | Alternate for later review |
| 3 | happycustomer3.png | hero-customer-03.webp | Alternate for later review |

Original PNGs are preserved. WebP copies retain the source dimensions/composition and use quality 85 encoding through the already installed Sharp runtime. Only the selected image is referenced/rendered by the homepage. No slider/gallery or additional public wording is added.

To switch options, select the WebP in Pages CMS → homepage → Forsidens innhold → Forsidefoto → Valgt bilde, or edit homepage.heroPhoto.src in app/src/content/pages/home.json. The single-image field uses named media heroImages with repository input app/public/images/home and public output /images/home. The existing crop fields remain editable (default 50%/45%); layout/aspect ratios stay unchanged. Missing files retain the neutral preview fallback.

CMS configuration follows the official [image field](https://pagescms.org/docs/configuration/fields/image/) and [named media](https://pagescms.org/docs/configuration/media/) documentation. Authenticated editor/upload/save is not proven by local configuration checks. OWNER whole-page R-03 and fresh formal RED_TEAM R-04 remain pending.
