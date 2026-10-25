import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { homeSectionDataSchema } from '../src/lib/home-section-data.ts';
import { cmsJsonSave, entryForFile } from './helpers/pages-cms-json.ts';

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const header = read('src/content/site-chrome/header.json');
const footer = read('src/content/site-chrome/footer.json');
const appearance = read('src/content/site-chrome/appearance.json');
const home = read('src/content/pages/home.json');
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const headerEntry = entryForFile(cms, 'app/src/content/site-chrome/header.json');
const footerEntry = entryForFile(cms, 'app/src/content/site-chrome/footer.json');
const appearanceEntry = entryForFile(cms, 'app/src/content/site-chrome/appearance.json');
const schema = homeSectionDataSchema.shape.chrome;
const combined = (h: typeof header = header, f: typeof footer = footer, a: typeof appearance = appearance) =>
  ({...h, ...f, themes: a.themes, headerOptions: {...h.headerOptions, showThemeSwitch: a.showThemeSwitch}});

test('Three global CMS editors are distinct from home and content masters', () => {
  const group = cms.content.find((x: any) => x.name === 'globalUi');
  assert.equal(group.label, 'Globale Elementer');
  assert.deepEqual(group.items.map((x:any)=>x.label), ['Toppmeny', 'Tema og utseende', 'Footer']);
  assert.equal(cms.content.find((x:any)=>x.name==='globalElements')?.label,'Global Innhold');
  for (const entry of [headerEntry, footerEntry, appearanceEntry]) assert.equal(entry?.type, 'file');
  assert.equal(entryForFile(cms,'app/src/content/pages/home.json').fields.some((x:any)=>x.name==='homepage'),false);
  assert.deepEqual(home.homepage,{});
  assert.ok(schema.safeParse(combined()).success);
});

test('Header keeps current navigation controls and CTA, but no theme code or toggle', () => {
  assert.equal(Object.hasOwn(header, 'themes'), false);
  assert.equal(Object.hasOwn(header.headerOptions, 'showThemeSwitch'),false);
  const options = headerEntry.fields.find((x:any)=>x.name==='headerOptions');
  for (const key of ['sticky','showLanguageSwitch','showSearch','showCta'])
    assert.equal(options.fields.find((x:any)=>x.name===key)?.type,'boolean');
  assert.equal(options.fields.some((x:any)=>x.name==='showThemeSwitch'), false);
  assert.equal(headerEntry.fields.some((x:any)=>x.name==='themes'),false);
  const cta = headerEntry.fields.find((x:any)=>x.name==='assessmentLink');
  assert.deepEqual(cta.fields.map((x:any)=>x.name), ['label','href','variant']);
});

test('Independent header CMS edit preserves OWNER menu and separate appearance and footer', () => {
  const edited = structuredClone(header);
  edited.headerOptions.sticky = false;
  edited.assessmentLink = {label:'Kontakt oss',href:'/kontakt/',variant:'secondary'};
  const saved = JSON.parse(cmsJsonSave(header,edited,headerEntry,cms));
  assert.deepEqual(saved, edited);
  assert.deepEqual(schema.parse(combined(saved)), schema.parse(combined(edited)));
  assert.deepEqual(read('src/content/site-chrome/appearance.json'), appearance);
  assert.deepEqual(read('src/content/site-chrome/footer.json'), footer);
  assert.deepEqual(read('src/content/pages/home.json'), home);
});

test('Appearance owns the full owner-authored Light and sunset Dark blocks and switch visibility', async () => {
  const {parseDaisyTheme} = await import('../src/lib/site-chrome-theme.ts');
  assert.equal(appearance.showThemeSwitch, true);
  assert.equal(parseDaisyTheme(appearance.themes.lightCss,'light').name,'optimalisering');
  assert.equal(parseDaisyTheme(appearance.themes.darkCss,'dark').name,'sunset');
  assert.equal(appearance.themes.defaultMode,'light');
  const show = appearanceEntry.fields.find((x:any)=>x.name==='showThemeSwitch');
  assert.equal(show.type,'boolean');
  const fields = appearanceEntry.fields.find((x:any)=>x.name==='themes').fields;
  assert.equal(fields.find((x:any)=>x.name==='lightCss')?.type,'text');
  assert.equal(fields.find((x:any)=>x.name==='darkCss')?.type,'text');
  const edited = structuredClone(appearance);
  edited.showThemeSwitch = false;
  edited.themes.lightLabel = 'Lys';
  const saved = JSON.parse(cmsJsonSave(appearance,edited,appearanceEntry,cms));
  assert.deepEqual(saved,edited);
  assert.equal(saved.themes.darkCss,appearance.themes.darkCss);
  assert.ok(schema.safeParse(combined(header,footer,saved)).success);
  assert.deepEqual(read('src/content/site-chrome/header.json'),header);
});

test('Four optional logo uploads are isolated by Header/Footer and validate local brand assets', () => {
  const media = cms.media.find((x:any)=>x.name==='brandLogos');
  assert.equal(media.input,'app/public/images/branding');
  assert.equal(media.output,'/images/branding');
  for(const ext of ['svg','png','webp','jpg','jpeg','avif']) assert.ok(media.extensions.includes(ext),ext);
  for(const field of ['logoLight','logoDark']) {
    const x=headerEntry.fields.find((x:any)=>x.name===field);
    assert.equal(x?.type,'image');
    assert.equal(x.options.media,'brandLogos');
    assert.equal(footerEntry.fields.some((x:any)=>x.name===field),false);
  }
  for(const field of ['footerLogoLight','footerLogoDark']) {
    const x=footerEntry.fields.find((x:any)=>x.name===field);
    assert.equal(x?.type,'image');
    assert.equal(x.options.media,'brandLogos');
    assert.equal(headerEntry.fields.some((x:any)=>x.name===field),false);
  }
  const h=structuredClone(header);h.logoLight='/images/branding/header-light.svg';h.logoDark='/images/branding/header-dark.webp';
  const f=structuredClone(footer);f.footerLogoLight='/images/branding/footer-light.png';f.footerLogoDark='/images/branding/footer-dark.svg';
  assert.ok(schema.safeParse(combined(h,f)).success);
  assert.equal(schema.safeParse(combined({...h,logoDark:'https://evil.test/x.svg'},f)).success,false);
  assert.equal(schema.safeParse(combined(h,{...f,footerLogoDark:'//evil.test/x.svg'})).success,false);
  const editedHeader = JSON.parse(cmsJsonSave(header,h,headerEntry,cms));
  const editedFooter = JSON.parse(cmsJsonSave(footer,f,footerEntry,cms));
  assert.deepEqual(editedHeader.logoLight,h.logoLight);
  assert.deepEqual(editedFooter.footerLogoDark,f.footerLogoDark);
});

test('Header and Footer swap uploaded logo variants with existing theme mode and safe fallbacks', () => {
  const headerAstro=readFileSync('src/components/HomeHeader.astro','utf8');
  const footerAstro=readFileSync('src/components/HomeFooter.astro','utf8');
  const css=readFileSync('src/styles/shared.css','utf8');
  for(const x of ['logoLight','logoDark'])assert.match(headerAstro,new RegExp('content\\.'+x));
  for(const x of ['footerLogoLight','footerLogoDark'])assert.match(footerAstro,new RegExp('content\\.'+x));
  assert.match(headerAstro,/svg viewBox="0 0 42 42"/);
  assert.match(footerAstro,/content\.brand\} \{content\.brandLocation/);
  assert.match(css,/html\[data-mws-theme-mode="dark"\] \.site-brand-image--light/);
  assert.match(css,/html\[data-mws-theme-mode="dark"\] \.site-brand-image--dark/);
  assert.match(css,/\.wordmark > span:not\(\.site-brand-image-pair\)/);
});

test('DaisyUI sun/moon uses real dark name, OS preference, and persistent manual choice', () => {
  const toggle=readFileSync('src/components/SiteChromeThemeSwitch.astro','utf8');
  const head=readFileSync('src/components/SiteChromeThemeHead.astro','utf8');
  const runtime=readFileSync('src/lib/site-chrome-theme-interactions.ts','utf8');
  assert.match(toggle,/swap-rotate/);
  assert.match(toggle,/class="theme-controller"/);
  assert.match(toggle,/value=\{darkName\}/);
  assert.match(head,/prefers-color-scheme: dark/);
  assert.match(runtime,/onSystemChange/);
  assert.match(runtime,/localStorage\.setItem\(preferenceKey, mode\)/);
});
