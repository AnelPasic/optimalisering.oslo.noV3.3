import { projectSelectedLinks } from './cms-link-choice.ts';
import { homeSectionDataSchema } from './home-section-data.ts';
import header from '../content/site-chrome/header.json' with { type: 'json' };
import footer from '../content/site-chrome/footer.json' with { type: 'json' };
import appearance from '../content/site-chrome/appearance.json' with { type: 'json' };

/** Single runtime authority for all routes.
 * Three independent stock Pages CMS files (header/footer/appearance), never Home page data.
 * Validate before rendering: no stale hardcoded brands, routes or themes.
 */
export const siteChrome = homeSectionDataSchema.shape.chrome.parse(projectSelectedLinks({
  ...header, ...footer,
  themes: appearance.themes,
  headerOptions: { ...header.headerOptions, showThemeSwitch: appearance.showThemeSwitch },
}));
export type SiteChrome = typeof siteChrome;
