import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import * as builder from '../src/lib/home-builder.ts';

const local=(id:string)=>({_block:'content',id,uid:randomUUID(),name:id,heading:id,body:[]});
const reference=(element:string)=>({_block:'global',element});
test('three native zones compose in group/list order without requiring eight original placements',()=>{
 const source={topSections:[local('topp'),reference('regneeksempel')],sections:[reference('sporsmal')],bottomSections:[local('bunn')]};
 assert.deepEqual(builder.resolveHomepageSections(source).map(b=>b.id),['topp','regneeksempel','sporsmal','bunn']);
 assert.deepEqual(builder.resolveHomepageSections({sections:[]}),[]);
 const before=readFileSync('src/content/global-elements/regneeksempel.json');
 assert.deepEqual(builder.resolveHomepageSections({...source,topSections:[]}).map(b=>b.id),['sporsmal','bunn']);
 assert.ok(readFileSync('src/content/global-elements/regneeksempel.json').equals(before));
});
test('global references cannot duplicate interactive modules across zones or take copied content',()=>{
 assert.throws(()=>builder.resolveHomepageSections({topSections:[reference('regneeksempel')],sections:[reference('regneeksempel')]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[reference('unknown')]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[{...reference('regneeksempel'),content:{heading:'copied'}}]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[local('regneeksempel')]}));
 assert.throws(()=>builder.resolveHomepageSections({sections:[{...reference('sporsmal'),visibility:'published'}]}));
});
test('absent/hidden page placements retain shared commercial authority but fail real incoming-anchor dependencies',()=>{
 const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
 const p={...home,topSections:[],sections:[],bottomSections:[]};
 assert.ok(builder.resolveHomepageContent(p).packages.items.length);
 assert.equal(builder.resolveHomepageContent(p).faqVisible,false);
 assert.throws(()=>builder.validateHomepagePublicLinks(p,[]),/sjekk|priser/);
 const available={...p,sections:[reference('sjekk'),reference('priser')]};
 assert.doesNotThrow(()=>builder.validateHomepagePublicLinks(available,[]));
 assert.throws(()=>builder.validateHomepagePublicLinks({...available,sections:[reference('sjekk'),{...reference('priser'),visibility:'hidden'}]},[]),/priser/);
});
