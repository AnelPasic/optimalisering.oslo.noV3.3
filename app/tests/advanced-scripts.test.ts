import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {advancedScriptsSchema,advancedCodeMarkup} from '../src/lib/advanced-scripts.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { homeSectionDataSchema } from '../src/lib/home-section-data.ts';
import { siteChrome } from '../src/lib/site-chrome-data.ts';

const advanced={headerJs:'window.exampleHead = true;',footerJs:'<img src="/pixel.gif?event=page_viewed&data[type]=contents" width="1" height="1" style="display:none" alt="" />'};
test('optional advanced fields preserve JavaScript and HTML through page and appearance schemas',()=>{
 assert.equal(advancedScriptsSchema.parse(undefined),undefined);
 assert.equal(advancedScriptsSchema.parse(null),undefined);
 assert.equal(advancedScriptsSchema.safeParse({headerJs:123}).success,false);
 assert.equal(advancedScriptsSchema.safeParse({other:'not a supported field'}).success,false);
 const page=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
 assert.deepEqual(pageSchema.parse({...page,advanced}).advanced,advanced);
 assert.deepEqual(homeSectionDataSchema.shape.chrome.parse({...siteChrome,advanced}).advanced,advanced);
});
test('code renderer supports raw JavaScript, script tags, noscript and image pixels',()=>{
 assert.equal(advancedCodeMarkup('  '),'');
 assert.equal(advancedCodeMarkup(advanced.footerJs),advanced.footerJs);
 const html='<!-- Vendor snippet -->\n<script src="/vendor.js" async></script><noscript><img src="/fallback.gif" alt=""></noscript>';
 assert.equal(advancedCodeMarkup(html),html);
 const js=advancedCodeMarkup('window.exampleHead = "</script>";');
 assert.ok(js.startsWith('<script>'));
 assert.equal((js.match(/<\/script>/gi)||[]).length,1,'Only the final wrapper closes the raw JavaScript element');
 assert.ok(js.includes('<\\/script>'));
});
test('all native page editors and appearance place Avansert last with HeaderJS and FooterJS',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 assert.equal(cms.components.advancedScripts.label,'Avansert');
 assert.deepEqual(cms.components.advancedScripts.fields.map((f:{label:string})=>f.label),['HeaderJS','FooterJS']);
 const found=[];
 function walk(entries:any[]){for(const entry of entries){if(entry.items){walk(entry.items);continue;}
  const path=entry.path;
  if(typeof path!=='string'||!(path.startsWith('app/src/content/pages')||path.endsWith('/appearance.json')||path.endsWith('/glossary.json')||path.endsWith('/hero-layouts.json')))continue;
  assert.equal(entry.fields.at(-1).name,'advanced',path);
  assert.equal(entry.fields.filter((f:{name:string})=>f.name==='advanced').length,1,path);
  found.push(path);
 }}
 walk(cms.content);assert.equal(found.length,13);
});
