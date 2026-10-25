import { homeSectionDataSchema } from './home-section-data.ts';
import header from '../content/site-chrome/header.json' with { type: 'json' };
import footer from '../content/site-chrome/footer.json' with { type: 'json' };

/** Single runtime authority for all routes.
 * Two independent stock Pages CMS files (header/footer), never Home page data.
 * Validate before rendering: no stale hardcoded brands, routes or themes.
 */
export const siteChrome = homeSectionDataSchema.shape.chrome.parse({ ...header, ...footer });
export type SiteChrome = typeof siteChrome;
