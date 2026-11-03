import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';

test('Lokal SEO full service page is CMS-editable with commercial content and preserved owned Hero fields',()=>{
 const file='src/content/pages/lokal-seo.json';
 const page=JSON.parse(readFileSync(file,'utf8'));
 assert.equal(page.slug,'lokal-seo');
 assert.equal(page.kind,'service');


 assert.equal(pageSchema.safeParse(page).success,true);
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const entry=entryForFile(cms,'app/'+file);
 assert.equal(entry?.type,'collection');
 const edited=structuredClone(page);
 edited.hero.title='Lokal SEO - syntetisk CMS-test';
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
 // The owner explicitly requested a complete commercial page, superseding the old empty shell fixture.
 assert.match(page.seo.title,/Lokal SEO/);
 assert.match(page.hero.title,/Lokal SEO.*henvendelser/);
 assert.match(page.hero.support,/Vi prioriterer.*følger opp/);
 assert.equal(page.hero.primaryCta.href,'/lokal-seo/#sjekk');
 assert.equal(page.hero.secondaryCta.href,'/priser/');
 assert.deepEqual(page.hero.toneOverrides,{eyebrowPreset:'spissplushysterisk',titlePreset:'spissplushysterisk',supportPreset:'spissplushysterisk'});
 assert.equal(page.hero.featuredProofCaseId,'helt-opplagt');
 assert.deepEqual(page.sections.filter((s:{_block:string})=>s._block==='global').map((s:{element:string})=>s.element),['priser','sjekk']);
 const owned=page.sections.filter((s:{_block:string})=>s._block==='content');
 assert.equal(owned.length,7);
 assert.equal(new Set(owned.map((s:{id:string})=>s.id)).size,owned.length);
 for(const id of ['vi-tar-ansvaret','fra-sjekk-til-arbeid','maal-og-forventninger'])
  assert.ok(owned.some((s:{id:string})=>s.id===id),id);
 assert.equal(page.faq.length,8);
 const commercial=[page.hero.support,...owned.flatMap((s:{body?:string[]})=>s.body??[]),...page.faq.map((f:{answer:string})=>f.answer)].join(' ');
 assert.match(commercial,/Vi tar|Vi gjennomfører|Medon tar/);
 assert.match(commercial,/kan ikke love|lover ikke|kan ikke.*love/);
 assert.deepEqual(pageSchema.parse(JSON.parse(cmsJsonSave(page,page,entry,cms))),pageSchema.parse(page));
 assert.ok(!readFileSync('src/content.config.ts','utf8').includes('drafts'));
});
