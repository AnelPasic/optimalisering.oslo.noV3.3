import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultLocale, supportedLocales } from '../src/config/locales.ts';
import { getPagePath, getLanguageLinks } from '../src/lib/i18n.ts';
test('root Norwegian and explicitly mapped future English paths do not auto-translate slugs', () => {
  assert.equal(defaultLocale, 'nb'); assert.deepEqual(supportedLocales, ['nb', 'en']);
  assert.equal(getPagePath({ slug: 'home' }), '/');
  assert.equal(getPagePath({ slug: 'synlighet' }), '/synlighet/');
  assert.equal(getPagePath({ slug: 'home', locale: 'en' }), '/en/');
  assert.equal(getPagePath({ slug: 'visibility', locale: 'en' }), '/en/visibility/');
});
test('language links require real equivalents or a real target-language homepage', () => {
  const current = { slug: 'synlighet', translationKey: 'visibility' };
  assert.deepEqual(getLanguageLinks(current, [current, { slug: 'home' }]), []);
  const english = { slug: 'visibility', locale: 'en' as const, translationKey: 'visibility' };
  assert.deepEqual(getLanguageLinks(current, [current, english]), [{ locale: 'en', href: '/en/visibility/', label: 'English' }]);
  assert.deepEqual(getLanguageLinks(english, [current, english]), [{ locale: 'nb', href: '/synlighet/', label: 'Norsk' }]);
  assert.deepEqual(getLanguageLinks({ slug: 'konvertering' }, [current, english]), [], 'Unrelated translated page is not a fallback');
  assert.deepEqual(getLanguageLinks(current, [{ slug: 'home', locale: 'en' }]), [{ locale: 'en', href: '/en/', label: 'English' }]);
});
