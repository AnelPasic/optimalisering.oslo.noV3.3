import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';

test('Lokal SEO is a real service page with editable CMS fields and a working nav destination',()=>{
 const file='src/content/pages/lokal-seo.json';
 const page=JSON.parse(readFileSync(file,'utf8'));
 assert.equal(page.slug,'lokal-seo');
 assert.equal(page.kind,'service');
 assert.equal(page.status,'REVIEW_REQUIRED');
 assert.equal(page.authority,'DRAFT / NON-AUTHORITATIVE');
 assert.equal(pageSchema.safeParse(page).success,true);
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const entry=entryForFile(cms,'app/'+file);
 assert.equal(entry?.type,'file');
 const edited=structuredClone(page);
 edited.sections[0].body.push('Kun syntetisk CMS-fixture.');
 const saved=JSON.parse(cmsJsonSave(page,edited,entry,cms));
 assertPreservedContent(edited,saved);
 assert.deepEqual(pageSchema.parse(saved),pageSchema.parse(edited));
 const header=JSON.parse(readFileSync('src/content/site-chrome/header.json','utf8'));
 const visibility=header.navigation.find((link:{href:string})=>link.href==='/synlighet/');
 const child=visibility?.presentation==='mega'
  ? visibility.mega?.columns.flatMap((column:{links:Array<{label:string;href:string;description:string}>})=>column.links).find((link:{label:string})=>link.label==='Lokal SEO')
  : visibility?.children?.find((link:{label:string})=>link.label==='Lokal SEO');
 assert.equal(child?.href,'/lokal-seo/');
 assert.ok(child?.description?.length>12);
 // Owner-authored CMS may add global blocks; preserve the original seven local sections.
 assert.equal(page.sections.filter((section:any)=>section._block==='content'||section._block==='protected').length,7);
 assert.ok(page.sections.length>=7);
 assert.equal(page.faq.length>=4,true);
 assert.ok(!readFileSync('src/content.config.ts','utf8').includes('drafts'));
});
