# OWNER layout/spacing amendment

Pulled main again during implementation, ff-only from `8eb97ae` to `d81a4133dcd7eeb7cf7558f6796d4554cb60ce83`, preserving the in-progress migration. The updated H-023B contract explicitly requires a less dense internal design-system review page.

Implementation uses page-local `ds-section`, `ds-group`, `ds-specimen`, `ds-type-specimen` and `ds-grid-demo` compositions built from Tailwind spacing and semantic theme/components. Typography roles get individual labelled rows; long-heading stress is separate. Each 2/3/4-card example gets its own label/group. Button variants, badge/status states, form fields, surfaces, pricing and PageList have explicit group spacing. Local demonstration wrappers normalize nested section padding without modifying real-page components.

Global heading margins and typography.css are unchanged. The route stays internal/noindex/unlisted, with QA-only Theme Controller and no persistence. Final screenshots/checks cover desktop/mobile spacing and unchanged type sizes.
