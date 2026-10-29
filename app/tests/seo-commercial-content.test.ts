import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';

test('SEO page covers consultant, services and Oslo without additional competing slugs',()=>{
 const page=JSON.parse(readFileSync('src/content/pages/seo.json','utf8'));
 const header=JSON.parse(readFileSync('src/content/site-chrome/header.json','utf8'));
 assert.equal(page.slug,'seo');
 assert.equal(page.kind,'service');


 assert.equal(pageSchema.safeParse(page).success,true);
 assert.match(page.seo.title,/SEO-byrå.*Oslo/);
 assert.match(page.hero.title,/SEO/);
 assert.ok(page.sections.some((s:{id:string})=>s.id==='seo-tjenester'));
 assert.ok(page.sections.some((s:{id:string})=>s.id==='seo-oslo'));
 const visible=pageSchema.parse(page).sections;
 assert.equal(new Set(visible.map(s=>s.id)).size,visible.length);
 const links=page.sections.flatMap((s:{links?:Array<{href:string}>})=>s.links??[]);
 for(const url of ['/lokal-seo/','/innsikt/google-bedriftsprofil/','/priser/']) assert.ok(links.some((l:{href:string})=>l.href===url),url);
 const menu=header.navigation.find((l:{href:string})=>l.href==='/synlighet/');
 const childLinks=menu.presentation==='mega'
  ? menu.mega?.columns.flatMap((column:{links:Array<{href:string}>})=>column.links)??[]
  : menu.children??[];
 assert.ok(childLinks.some((c:{href:string})=>c.href==='/seo/'));
 assert.equal(page.faq.length,6);
});

test('SEO service copy is editable in native Pages CMS without modifying commercial globals',()=>{
 const page=JSON.parse(readFileSync('src/content/pages/seo.json','utf8'));
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const entry=entryForFile(cms,'app/src/content/pages/seo.json');
 assert.equal(entry?.type,'file');
 const edited=structuredClone(page);
 edited.sections[0].body.push('Kun syntetisk SEO CMS-fixture.');
 const serialized=JSON.parse(cmsJsonSave(page,edited,entry,cms));
 assertPreservedContent(edited,serialized);
 assert.deepEqual(pageSchema.parse(serialized),pageSchema.parse(edited));
});
