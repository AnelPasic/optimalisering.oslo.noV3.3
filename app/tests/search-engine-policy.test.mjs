import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderHeaders,getNoindex,previewRules} from '../scripts/build-search-engine-headers.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('noindex global editor defaults safely and never alters the saved theme',()=>{
 const cms=read('.pages.yml'),i=cms.indexOf('name: siteAppearance');
 assert.ok(i>0);assert.match(cms.slice(i,i+700),/Skjul nettstedet fra søkemotorer \(noindex\)/);
 const a=JSON.parse(read('src/content/site-chrome/appearance.json'));
 assert.equal(getNoindex(a),true);assert.equal(getNoindex({}),true);assert.equal(getNoindex({searchEngineNoindex:false}),false);
 assert.throws(()=>getNoindex({searchEngineNoindex:'false'}),/boolean/);
});
test('only production custom hosts lose global noindex when the CMS switch goes OFF',()=>{
 const on=renderHeaders(true),off=renderHeaders(false);
 assert.match(on,/\/\*\n  X-Robots-Tag: noindex/);
 assert.doesNotMatch(off,/\n\/\*\n  X-Robots-Tag: noindex/);
 for(const name of [':version.:subdomain.workers.dev',':subdomain.workers.dev',':branch.:project.pages.dev',':project.pages.dev']){
  assert.ok(previewRules.includes('https://'+name+'/*'),name);
  assert.ok(off.includes('https://'+name+'/*'),name);
 }
 assert.match(off,/\/404\.html\n  X-Robots-Tag: noindex/);
 assert.match(off,/\/design-system\/\*\n  X-Robots-Tag: noindex/);
 assert.match(read('public/_headers'),/workers\.dev/);
 assert.match(read('src/layouts/SiteLayout.astro'),/site\.searchEngineNoindex \|\| noindex/);
 assert.match(read('src/pages/robots.txt.ts'),/site\.searchEngineNoindex/);
 assert.match(read('src/pages/sitemap.xml.ts'),/site\.searchEngineNoindex/);
 assert.match(JSON.parse(read('package.json')).scripts.build,/astro build && node scripts\/build-search-engine-headers\.mjs && npm run search:index/);
});
