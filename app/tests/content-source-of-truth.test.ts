import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';

const read=(p:string)=>readFileSync(new URL(p,import.meta.url),'utf8');
const json=(p:string)=>JSON.parse(read(p));
const cms=YAML.parse(read('../../.pages.yml'));
const editor=(id:string)=>cms.content.find((x:any)=>x.name===id);
const local=(file:string)=>json('../src/content/pages/'+(file==='google-bedriftsprofil'?'managed-articles/innsikt-google-bedriftsprofil':file)+'.json');
const fixed=['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal'];

test('CONTENT-01: canonical sources are separate native Pages CMS owners, not duplicate editable copies',()=>{
  const global=editor('globalElements');
  const ui=editor('globalUi');
  const shared=global.items.find((x:any)=>x.name==='sharedContent');
  assert.equal(shared.type,'collection');
  assert.equal(shared.path,'app/src/content/global-content');
  assert.equal(shared.filename,'{fields.id}.json');
  assert.equal(shared.operations.rename,false);
  assert.equal(shared.operations.delete,false);
  assert.deepEqual(ui.items.map((x:any)=>x.name),['siteHeader','siteAppearance','siteFooter']);
  assert.deepEqual(ui.items.map((x:any)=>x.path),[
    'app/src/content/site-chrome/header.json',
    'app/src/content/site-chrome/appearance.json',
    'app/src/content/site-chrome/footer.json'
  ]);
  assert.equal(editor('contentTone').path,'coordination/CONTENT-TONE.json');
  assert.equal(editor('proofCases').path,'app/src/content/proof');
  const globalFiles=global.items.filter((x:any)=>x.name!=='sharedContent').map((x:any)=>x.path);
  assert.deepEqual(globalFiles.map((x:string)=>x.split('/').pop()?.replace('.json','')).sort(),fixed.slice().sort());
  assert.equal(new Set(globalFiles).size,8);
});

test('CONTENT-01: real homepage, service and article use the same one-owner mental model',()=>{
  const home=local('home'),seo=local('seo'),article=local('google-bedriftsprofil');
  for(const [page,kind] of [[home,'home'],[seo,'service'],[article,'article']] as const){
    assert.equal(page.kind,kind);
    assert.equal(typeof page.seo.title,'string');
    assert.equal(typeof page.hero.title,'string');
    assert.ok(Array.isArray(page.sections));
    assert.ok(Array.isArray(page.faq));
    assert.equal(pageSchema.safeParse(page).success,true,kind+' page must still validate');
  }
  const globalRef=(p:any,id:string)=>p.sections.find((s:any)=>s._block==='global'&&s.element===id);
  for(const id of ['priser','sjekk']){assert.ok(globalRef(home,id));assert.ok(globalRef(seo,id));}
  assert.ok(globalRef(home,'resultater'));
  assert.equal(seo.sections.filter((s:any)=>s._block==='content').length>0,true);
  assert.equal(article.sections.every((s:any)=>s._block==='content'),true);
  assert.ok(article.listing);
  assert.equal(Object.hasOwn(home,'header'),false);
  assert.equal(Object.hasOwn(home,'footer'),false);
  assert.equal(Object.hasOwn(seo,'globalMasters'),false);
  assert.equal(Object.hasOwn(article,'globalMasters'),false);
});

test('CONTENT-01: pricing page and pricing master are distinct authorities; section reference is not content copy',()=>{
  const pricing=local('priser');
  const master=json('../src/content/global-elements/priser.json');
  assert.equal(pricing.kind,'pricing');
  assert.equal(master.id,'priser');
  assert.ok(pricing.hero&&pricing.seo);
  assert.ok(master.content);
  const seo=local('seo');
  const placement=seo.sections.find((s:any)=>s._block==='global'&&s.element==='priser');
  assert.deepEqual(Object.keys(placement).sort(),['_block','element','visibility'].filter(k=>Object.hasOwn(placement,k)).sort());
  assert.equal(Object.hasOwn(placement,'content'),false);
  assert.equal(Object.hasOwn(placement,'heading'),false);
});
