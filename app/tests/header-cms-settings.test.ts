import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { homeSectionDataSchema } from '../src/lib/home-section-data.ts';
import { cmsJsonSave, entryForFile } from './helpers/pages-cms-json.ts';

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const header = read('src/content/site-chrome/header.json');
const footer = read('src/content/site-chrome/footer.json');
const home = read('src/content/pages/home.json');
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const headerEntry = entryForFile(cms, 'app/src/content/site-chrome/header.json');
const footerEntry = entryForFile(cms, 'app/src/content/site-chrome/footer.json');
const schema = homeSectionDataSchema.shape.chrome;

test('Global CMS owns two independent editors; homepage no longer exposes Header or Footer', () => {
  assert.equal(cms.content.find((x: any) => x.name === 'globalUi')?.label, 'Globale Elementer');
  assert.equal(cms.content.find((x: any) => x.name === 'globalElements')?.label, 'Global Innhold');
  assert.equal(headerEntry?.type, 'file');
  assert.equal(footerEntry?.type, 'file');
  const homepageEntry = entryForFile(cms, 'app/src/content/pages/home.json');
  assert.equal(homepageEntry.fields.some((x: any) => x.name === 'homepage'), false);
  assert.deepEqual(home.homepage, {});
  assert.ok(schema.safeParse({ ...header, ...footer }).success);
});

test('Header CMS exposes each switch and editable CTA label/link/variant', () => {
  const options = headerEntry.fields.find((x: any) => x.name === 'headerOptions');
  for (const key of ['sticky', 'showLanguageSwitch', 'showSearch', 'showCta', 'showThemeSwitch']) {
    assert.equal(options.fields.find((x: any) => x.name === key)?.type, 'boolean');
  }
  const cta = headerEntry.fields.find((x: any) => x.name === 'assessmentLink');
  assert.deepEqual(cta.fields.map((x: any) => x.name), ['label', 'href', 'variant']);
  assert.equal(cta.fields.at(-1)?.type, 'select');
});

test('Independent stock Pages CMS save preserves theme, navigation and other editor', () => {
  const edited = structuredClone(header);
  edited.headerOptions = {
    sticky: false, showLanguageSwitch: false, showSearch: false, showCta: false, showThemeSwitch: false,
  };
  edited.assessmentLink = { label: 'Kontakt oss', href: '/kontakt/', variant: 'secondary' };
  const saved = JSON.parse(cmsJsonSave(header, edited, headerEntry, cms));
  assert.deepEqual(saved.headerOptions, edited.headerOptions);
  assert.deepEqual(saved.assessmentLink, edited.assessmentLink);
  assert.deepEqual(saved.navigation, header.navigation);
  assert.deepEqual(saved.themes, header.themes);
  assert.deepEqual(schema.parse({ ...saved, ...footer }), schema.parse({ ...edited, ...footer }));
  assert.deepEqual(read('src/content/site-chrome/footer.json'), footer);
  assert.deepEqual(read('src/content/pages/home.json'), home);
});

test('CTA only accepts supported daisyUI palette variants', () => {
  for (const variant of ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error']) {
    assert.ok(schema.safeParse({ ...header, ...footer,
      assessmentLink: { ...header.assessmentLink, variant } }).success, variant);
  }
  assert.equal(schema.safeParse({ ...header, ...footer,
    assessmentLink: { ...header.assessmentLink, variant: 'custom-pink' } }).success, false);
});

test('Theme keeps complete owner-pasted daisyUI blocks and system preference switch', async () => {
  const { parseDaisyTheme } = await import('../src/lib/site-chrome-theme.ts');
  assert.equal(header.headerOptions.showThemeSwitch, true);
  assert.equal(parseDaisyTheme(header.themes.lightCss, 'light').name, 'optimalisering');
  assert.equal(parseDaisyTheme(header.themes.darkCss, 'dark').name, 'sunset');
  assert.equal(header.themes.defaultMode, 'light');
  const fields = headerEntry.fields.find((x: any) => x.name === 'themes').fields;
  assert.equal(fields.find((x: any) => x.name === 'lightCss')?.type, 'text');
  assert.equal(fields.find((x: any) => x.name === 'darkCss')?.type, 'text');
  const edited = structuredClone(header);
  edited.themes.lightLabel = 'Lys';
  edited.headerOptions.showThemeSwitch = false;
  const saved = JSON.parse(cmsJsonSave(header, edited, headerEntry, cms));
  assert.equal(saved.themes.lightLabel, 'Lys');
  assert.equal(saved.headerOptions.showThemeSwitch, false);
  assert.equal(saved.themes.darkCss, header.themes.darkCss);
});

test('Footer has independent editable link groups and conditional heading destination', () => {
  const columns = footerEntry.fields.find((x: any) => x.name === 'footerGroups');
  assert.ok(columns.fields.some((x: any) => x.name === 'headingHref'));
  const edited = structuredClone(footer);
  edited.footerGroups[0].headingHref = '/synlighet/';
  edited.footerGroups[0].links[0].label = 'Søkemotoroptimalisering';
  edited.footerGroups[0].links.push({ label: 'Innsikt', href: '/innsikt/' });
  const saved = JSON.parse(cmsJsonSave(footer, edited, footerEntry, cms));
  assert.deepEqual(saved, edited);
  assert.deepEqual(schema.parse({ ...header, ...saved }), schema.parse({ ...header, ...edited }));
  assert.deepEqual(read('src/content/site-chrome/header.json'), header);
});

test('native sun and moon switch uses real CMS dark name and OS preference', () => {
  const toggle = readFileSync('src/components/SiteChromeThemeSwitch.astro', 'utf8');
  const head = readFileSync('src/components/SiteChromeThemeHead.astro', 'utf8');
  const runtime = readFileSync('src/lib/site-chrome-theme-interactions.ts', 'utf8');
  assert.match(toggle, /swap-rotate/);
  assert.match(toggle, /class="theme-controller"/);
  assert.match(toggle, /value=\{darkName\}/);
  assert.match(head, /prefers-color-scheme: dark/);
  assert.match(runtime, /onSystemChange/);
  assert.match(runtime, /localStorage\.setItem\(preferenceKey, mode\)/);
});
