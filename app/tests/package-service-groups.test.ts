import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import {SERVICE_GROUPS,groupPackageServices} from '../src/lib/package-service-groups.ts';

const source=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
test('all configured services render exactly once, grouped without changing icon data',()=>{
  for(const item of source.content.items){
    const groups=groupPackageServices(item.iconItems);
    const rendered=groups.flatMap(group=>group.items);
    assert.equal(rendered.length,item.iconItems.length);
    assert.equal(new Set(rendered).size,item.iconItems.length);
    for(const service of rendered)assert.ok(item.iconItems.includes(service));
    assert.deepEqual(groups.map(group=>group.label),SERVICE_GROUPS.filter(label=>groups.some(group=>group.label===label)));
    for(const group of groups)for(const service of group.items)if(service.group)assert.equal(service.group,group.label);
  }
});
test('legacy services without CMS groups fall back safely by existing icon',()=>{
  const items=[{icon:'search',label:'SEO'},{icon:'paid-search',label:'Ads'},{icon:'conversion',label:'CRO'},{icon:'analytics',label:'Analyse'},{icon:'route',label:'AI'}];
  assert.deepEqual(groupPackageServices(items).map(group=>[group.label,...group.items.map(item=>item.label)]),[
    ['Organisk Synlighet','SEO','AI'],['Betalt Synlighet','Ads'],
    ['Konverteringsoptimalisering','CRO'],['Systemer','Analyse']
  ]);
});
test('CMS category dropdown uses all requested labels and is optional for old records',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const fields=homepageBlockEditor(cms,'packages').fields.find((field:any)=>field.name==='items').fields;
  const group=fields.find((field:any)=>field.name==='iconItems').fields.find((field:any)=>field.name==='group');
  assert.deepEqual(group.options.values,[...SERVICE_GROUPS]);
  assert.notEqual(group.required,true);
});
