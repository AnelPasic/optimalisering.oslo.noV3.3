import type { z } from 'astro/zod';
import { homeSectionDataSchema } from './home-section-data.ts';
import {projectSelectedLinks} from './cms-link-choice.ts';
import header from '../content/site-chrome/header.json' with { type: 'json' };
import footer from '../content/site-chrome/footer.json' with { type: 'json' };
import appearance from '../content/site-chrome/appearance.json' with { type: 'json' };

type Appearance = typeof appearance & Pick<z.input<typeof homeSectionDataSchema.shape.chrome>, 'typography' | 'sectionSurfaceDefaults'>;
const { themes, typography, showThemeSwitch, sectionSurfaceDefaults } = appearance as Appearance;

/** Single runtime authority for all routes.
 * Three independent stock Pages CMS files (header/footer/appearance), never Home page data.
 * Validate before rendering: no stale hardcoded brands, routes or themes.
 */
export const siteChrome = homeSectionDataSchema.shape.chrome.parse(projectSelectedLinks({
  ...header, ...footer,
  themes, typography, sectionSurfaceDefaults,
  headerOptions: { ...header.headerOptions, showThemeSwitch },
}));
export type SiteChrome = typeof siteChrome;
