import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderHeaders,getNoindex} from '../scripts/build-search-engine-headers.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('noindex is one Pages CMS switch with safe ON default',()=>{
 const cms=read('.pages.yml'),i=cms.indexOf('name: siteAppearance');
 assert.ok(i>0);assert.match(cms.slice(i,i+700),/Skjul nettstedet fra søkemotorer \(noindex\)/);
 const appearance=JSON.parse(read('src/content/site-chrome/appearance.json'));
 assert.equal(getNoindex(appearance),true);
 assert.equal(getNoindex({}),true);
 assert.equal(getNoindex({searchEngineNoindex:false}),false);
 assert.throws(()=>getNoindex({searchEngineNoindex:'false'}),/boolean/);
});
test('same CMS value generates both meta and headers without manual Cloudflare rules',()=>{
 const on=renderHeaders(true),off=renderHeaders(false);
 assert.match(on,/\/\*\n  X-Robots-Tag: noindex/);
 assert.doesNotMatch(off,/\/\*\n  X-Robots-Tag: noindex/);
 assert.doesNotMatch(off,/workers\.dev|pages\.dev|https:\/\//);
 assert.match(off,/\/404\.html\n  X-Robots-Tag: noindex/);
 assert.match(off,/\/design-system\/\*\n  X-Robots-Tag: noindex/);
 assert.equal(read('public/_headers'),'/*\n  X-Robots-Tag: noindex, nofollow\n'); // safe for raw Astro builds
 assert.match(read('src/layouts/SiteLayout.astro'),/site\.searchEngineNoindex \|\| noindex/);
 assert.match(read('src/pages/robots.txt.ts'),/site\.searchEngineNoindex/);
 assert.match(read('src/pages/sitemap.xml.ts'),/site\.searchEngineNoindex/);
 assert.match(JSON.parse(read('package.json')).scripts.build,/astro build && node scripts\/build-search-engine-headers\.mjs && npm run search:index/);
});
