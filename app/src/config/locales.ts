// English is a future supported locale, not a currently published route set.
export const defaultLocale = 'nb' as const;
export const supportedLocales = ['nb', 'en'] as const;
export type Locale = typeof supportedLocales[number];
export const localeLabels: Record<Locale, string> = { nb: 'Norsk', en: 'English' };
