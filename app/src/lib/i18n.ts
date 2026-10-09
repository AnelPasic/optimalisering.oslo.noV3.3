import { defaultLocale, localeLabels, supportedLocales, type Locale } from '../config/locales.ts';

export interface LocalePage {
  slug: string;
  locale?: Locale;
  translationKey?: string;
}
export interface LanguageLink { locale: Locale; href: string; label: string; }

export function getPagePath(page: LocalePage): string {
  const prefix = (page.locale ?? defaultLocale) === defaultLocale ? '/' : '/en/';
  return page.slug === 'home' ? prefix : prefix + page.slug + '/';
}

// Pass only pages that actually have generated/published routes. A shared
// translationKey maps explicitly chosen slugs; there is no slug translation.
export function getLanguageLinks(current: LocalePage, available: LocalePage[]): LanguageLink[] {
  const locale = current.locale ?? defaultLocale;
  return supportedLocales.filter(target => target !== locale).flatMap(target => {
    const candidates = available.filter(page => (page.locale ?? defaultLocale) === target);
    const equivalent = current.translationKey ? candidates.find(page => page.translationKey === current.translationKey) : undefined;
    const destination = equivalent ?? candidates.find(page => page.slug === 'home');
    return destination ? [{ locale: target, href: getPagePath(destination), label: localeLabels[target] }] : [];
  });
}
