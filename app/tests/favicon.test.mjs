import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync,realpathSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {tmpdir} from 'node:os';
import sharp from 'sharp';
import YAML from 'yaml';
import {faviconSchema,resolveSiteFavicon,renderSiteFavicon,faviconSize} from '../src/lib/site-favicon.ts';
import {siteChrome} from '../src/lib/site-chrome-data.ts';
import {homeSectionDataSchema} from '../src/lib/home-section-data.ts';
const parseChrome = favicon => homeSectionDataSchema.shape.chrome.parse({...siteChrome,favicon});

const logo = color => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50"><rect width="100" height="50" fill="'+color+'"/></svg>';
function fixture(t) {
  const parent = realpathSync(tmpdir());
  const directory = mkdtempSync(join(parent,'mws-favicon-'));
  mkdirSync(join(directory,'images/branding'),{recursive:true});
  mkdirSync(join(directory,'images/favicons'),{recursive:true});
  t.after(() => {
    assert.equal(dirname(directory),parent);
    rmSync(directory,{recursive:true,force:true});
  });
  writeFileSync(join(directory,'images/branding/logo.svg'),logo('red'));
  return directory;
}

test('CMS favicon field belongs to the header and accepts clearing the override', () => {
  const cms = YAML.parse(readFileSync('../.pages.yml','utf8'));
  const header = cms.content.find(entry=>entry.name==='globalUi').items.find(entry=>entry.name==='siteHeader');
  const field = header.fields.find(field=>field.name==='favicon');
  assert.equal(field.type,'image');
  assert.equal(field.options.media,'faviconImages');
  assert.deepEqual(cms.media.find(media=>media.name==='faviconImages').extensions,['svg','png','ico']);
  for(const value of [undefined,null,'']) assert.equal(faviconSchema.parse(value),undefined);
  for(const source of ['/images/favicons/site.png','/images/favicons/site.svg','/images/favicons/site.ico']) {
    assert.equal(faviconSchema.parse(source),source);
    assert.equal(parseChrome(source).favicon,source);
  }
  assert.equal(parseChrome('').favicon,undefined);
  assert.equal(faviconSchema.safeParse('https://example.com/icon.svg').success,false);
  assert.equal(faviconSchema.safeParse('/images/../icon.svg').success,false);
});

test('logos become square PNGs with transparent padding and versioned filenames', async t => {
  const directory = fixture(t);
  const config = {logoLight:'/images/branding/logo.svg'};
  const icon = resolveSiteFavicon(config,directory);
  assert.equal(icon.type,'image/png');
  assert.equal(icon.sizes,'48x48');
  assert.equal(icon.generated.source,config.logoLight);
  const bytes = await renderSiteFavicon(icon.generated.source,directory);
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.format,'png');
  assert.equal(metadata.width,faviconSize);
  assert.equal(metadata.height,faviconSize);
  const {data,info} = await sharp(bytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(data[3],0,'Landscape logos have transparent space above and below');
  const center = (24*info.width+24)*info.channels;
  assert.equal(data[center],255);
  assert.equal(data[center+3],255);
  writeFileSync(join(directory,'images/branding/logo.svg'),logo('blue'));
  assert.notEqual(resolveSiteFavicon(config,directory).href,icon.href);
  const pngSource='/images/branding/raster.png';
  writeFileSync(join(directory,pngSource.slice(1)),bytes);
  assert.equal((await sharp(await renderSiteFavicon(pngSource,directory)).metadata()).format,'png');
});

test('custom favicons take precedence and clearing them returns to the logo', async t => {
  const directory = fixture(t);
  const file = '/images/favicons/custom.png';
  const custom = await sharp({create:{width:32,height:32,channels:4,background:'green'}}).png().toBuffer();
  writeFileSync(join(directory,file.slice(1)),custom);
  const config = {logoLight:'/images/branding/logo.svg',favicon:file};
  const icon = resolveSiteFavicon(config,directory);
  assert.ok(icon.href.startsWith(file+'?v='));
  assert.equal(icon.type,'image/png');
  assert.equal(icon.generated,undefined);
  writeFileSync(join(directory,file.slice(1)),await sharp(custom).negate().png().toBuffer());
  assert.notEqual(resolveSiteFavicon(config,directory).href,icon.href);
  writeFileSync(join(directory,'images/favicons/custom.svg'),logo('black'));
  assert.equal(resolveSiteFavicon({...config,favicon:'/images/favicons/custom.svg'},directory).type,'image/svg+xml');
  assert.ok(resolveSiteFavicon({...config,favicon:undefined},directory).generated);
});

test('mobile logos, legacy logos, missing files and absent logos have defined fallbacks', async t => {
  const directory = fixture(t);
  const logoSrc='/images/branding/logo.svg';
  writeFileSync(join(directory,'images/branding/mobile.svg'),logo('green'));
  assert.equal(resolveSiteFavicon({logoLight:logoSrc,mobileLogoLight:'/images/branding/mobile.svg'},directory).generated.source,'/images/branding/mobile.svg');
  assert.equal(resolveSiteFavicon({logoLight:logoSrc,mobileLogoDark:'/images/branding/mobile.svg'},directory).generated.source,'/images/branding/mobile.svg');
  assert.equal(resolveSiteFavicon({logoDark:logoSrc},directory).generated.source,logoSrc);
  assert.equal(resolveSiteFavicon({brand:{logoSrc}},directory).generated.source,logoSrc);
  assert.equal(resolveSiteFavicon({logoLight:'/images/branding/missing.svg',logoDark:logoSrc},directory).generated.source,logoSrc);
  assert.equal(resolveSiteFavicon({},directory),undefined);
  assert.equal(resolveSiteFavicon({},directory,'/favicon.svg').href,'/favicon.svg');
  assert.throws(()=>resolveSiteFavicon({favicon:'/images/favicons/missing.png'},directory),/missing/);
  await assert.rejects(renderSiteFavicon('/images/branding/missing.svg',directory),/missing/);
  assert.equal(resolveSiteFavicon({logoLight:'/../outside.svg'},directory),undefined);
});
