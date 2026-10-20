import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import * as builder from '../src/lib/home-builder.ts';
import {pageSchema} from '../src/lib/content-schema.ts';

const local=(id:string)=>({_block:'content',id,uid:randomUUID(),name:id,heading:id,body:[]});
const reference=(element:string)=>({_block:'global',element});
test('one native list preserves mixed local/global order and allows optional placements',()=>{
 const source={sections:[local('topp'),reference('regneeksempel'),reference('sporsmal'),local('bunn')]};
 assert.deepEqual(builder.resolveHomepageSections(source).map(b=>b.id),['topp','regneeksempel','sporsmal','bunn']);
 assert.deepEqual(builder.resolveHomepageSections({sections:[]}),[]);
 const before=readFileSync('src/content/global-elements/regneeksempel.json');
 assert.deepEqual(builder.resolveHomepageSections({sections:source.sections.slice(2)}).map(b=>b.id),['sporsmal','bunn']);
 assert.ok(readFileSync('src/content/global-elements/regneeksempel.json').equals(before));
});
test('global references cannot duplicate interactive modules in one list or take copied content',()=>{
 assert.throws(()=>builder.resolveHomepageSections({sections:[reference('regneeksempel'),reference('regneeksempel')]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[reference('unknown')]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[{...reference('regneeksempel'),content:{heading:'copied'}}]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[local('regneeksempel')]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[{...reference('sporsmal'),visibility:'published'}]}));
});
test('absent/hidden page placements retain shared commercial authority but fail real incoming-anchor dependencies',()=>{
 const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
 const p={...home,sections:[]};
 assert.ok(builder.resolveHomepageContent(p).packages.items.length);
 assert.equal(builder.resolveHomepageContent(p).faqVisible,false);
 assert.throws(()=>builder.validateHomepagePublicLinks(p,[]),/sjekk|priser/);
 const available={...p,sections:[reference('sjekk'),reference('priser')]};
 assert.doesNotThrow(()=>builder.validateHomepagePublicLinks(available,[]));
 assert.throws(()=>builder.validateHomepagePublicLinks({...available,sections:[reference('sjekk'),{...reference('priser'),visibility:'hidden'}]},[]),/priser/);
});


test('stale area arrays are rejected with migration guidance, never silently discarded',()=>{
 for(const key of ['topSections','bottomSections','optionalSections'])for(const value of [[],[local('behold-meg')]]){
  const page={sections:[reference('sjekk')],[key]:value};
  assert.throws(()=>builder.resolveHomepageSections(page),/Migrer Topp.*last CMS/);
  assert.throws(()=>builder.getHomepageBlocks(page),/Migrer Topp.*last CMS/);
  assert.equal(builder.homepageSourceSchema.safeParse(page).success,false);
  const raw=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));raw[key]=value;
  const parsed=pageSchema.safeParse(raw);assert.equal(parsed.success,false);assert.match(parsed.error!.message,/Migrer Topp/);
 }
});

test('single list supports up to 56 placements, retains hidden records and validates local identities',()=>{
 const rows:any[]=Array.from({length:56},(_,i)=>local('rad-'+i));
 assert.equal(builder.resolveHomepageSections({sections:rows}).length,56);
 assert.throws(()=>builder.resolveHomepageSections({sections:[...rows,local('for-mange')]}));
 const before=structuredClone(rows);rows[0].visibility='hidden';
 assert.equal(builder.resolveHomepageSections({sections:rows})[0].visibility,'hidden');
 for(const bad of [{...rows[1],uid:rows[0].uid},{...rows[1],id:rows[0].id},{...rows[1],uid:'ugyldig'}])assert.throws(()=>builder.resolveHomepageSections({sections:[rows[0],bad]}));
 assert.deepEqual(rows.slice(1),before.slice(1));
});
