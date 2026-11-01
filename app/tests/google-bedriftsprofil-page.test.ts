import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {resolvePageList} from '../src/lib/page-list.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';

test('Google bedriftsprofil is one genuine Innsikt page with CMS editing and Lokal SEO link',()=>{
 const file='src/content/pages/managed-articles/innsikt-google-bedriftsprofil.json';
 const article=JSON.parse(readFileSync(file,'utf8'));
 const hub=JSON.parse(readFileSync('src/content/pages/lokal-seo.json','utf8'));
 const index=JSON.parse(readFileSync('src/content/pages/innsikt.json','utf8'));
 assert.equal(article.slug,'innsikt/google-bedriftsprofil');
 assert.equal(article.kind,'article');


 assert.equal(pageSchema.safeParse(article).success,true);
 const ids=article.sections.map((section:{id:string})=>section.id);
 assert.equal(ids.length,new Set(ids).size);
 assert.ok(article.sections.some((section:{id:string})=>section.id==='sjekkliste'));
 assert.equal(hub.slug,'lokal-seo');
 assert.deepEqual(hub.sections,[],'Lokal SEO is deliberately empty until rewritten');
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const entry=entryForFile(cms,'app/'+file);
 assert.equal(entry?.type,'collection');
 const edited=structuredClone(article);
 edited.sections[0].body.push('Kun syntetisk CMS-test.');
 const saved=JSON.parse(cmsJsonSave(article,edited,entry,cms));
 assertPreservedContent(edited,saved);
 assert.deepEqual(pageSchema.parse(saved),pageSchema.parse(edited));
 const list=resolvePageList(index.sections.find((s:{id:string})=>s.id==='guider').pageList,[article]);
 assert.equal(list[0].href,'/innsikt/google-bedriftsprofil/');
});
