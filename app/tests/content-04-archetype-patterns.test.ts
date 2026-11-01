import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';

const page=(name:string)=>JSON.parse(readFileSync('src/content/pages/'+(name==='google-bedriftsprofil'?'managed-articles/innsikt-google-bedriftsprofil':name)+'.json','utf8'));
const home=page('home'),service=page('seo'),article=page('google-bedriftsprofil');

test('CONTENT-04 Oslo pilot: three different intents with native SEO, Hero and independently owned sections',()=>{
 for(const [data,kind] of [[home,'home'],[service,'service'],[article,'article']] as const){
  assert.equal(data.kind,kind);
  assert.ok(data.seo.title?.trim());
  assert.ok(data.seo.description?.trim());
  assert.ok(data.hero.title?.trim());
  assert.ok(Array.isArray(data.sections));
  assert.ok(Array.isArray(data.faq));
  assert.equal(pageSchema.safeParse(data).success,true,kind);
  assert.equal(Object.hasOwn(data,'authority'),false,'Every page is live, no review statuses');
  assert.equal(Object.hasOwn(data,'status'),false);
 }
 assert.equal(home.slug,'home');
 assert.equal(service.slug,'seo');
 assert.equal(article.slug,'innsikt/google-bedriftsprofil');
});

test('CONTENT-04 Home: buyer journey uses canonical global refs; no copied commercial/proof data',()=>{
 const globals=home.sections.filter((s:any)=>s._block==='global').map((s:any)=>s.element);
 assert.deepEqual(globals,['behov','regneeksempel','resultater','priser','sjekk','sporsmal']);
 assert.equal(home.hero.primaryCta.href,'/#sjekk');
 assert.ok(home.faq.length>0);
 assert.ok(home.sections.every((s:any)=>!Object.hasOwn(s,'content')&&!Object.hasOwn(s,'globalElement')));
});

test('CONTENT-04 Service: delivery, context and qualified next step, without a fixed order requirement',()=>{
 assert.ok(service.sections.filter((s:any)=>s._block==='content').length>=3);
 assert.ok(service.sections.some((s:any)=>s._block==='global'&&s.element==='sjekk'));
 assert.ok(service.sections.some((s:any)=>s._block==='global'&&s.element==='priser'));
 assert.equal(service.hero.primaryCta.href,'/seo/#sjekk');
 const links=service.sections.flatMap((s:any)=>s.links??[]).map((l:any)=>l.href);
 for(const href of ['/priser/','/lokal-seo/','/ai-synlighet/']) assert.ok(links.includes(href),href);
});

test('CONTENT-04 Article: substantive local answer, relevant cross-link, no forced sale/proof',()=>{
 assert.ok(article.sections.filter((s:any)=>s._block==='content').length>=3);
 assert.ok(article.listing?.title?.trim()&&article.listing?.summary?.trim());
 assert.equal(article.sections.some((s:any)=>s._block==='global'),false);
 const links=article.sections.flatMap((s:any)=>s.links??[]).map((l:any)=>l.href);
 assert.ok(links.includes('/lokal-seo/'));
 assert.ok(links.includes('/#sjekk'));
 assert.ok(article.faq.length>0);
});
