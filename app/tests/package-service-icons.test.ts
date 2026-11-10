import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
import {PHOSPHOR_ICON_NAMES,isPhosphorIconName} from '../src/lib/package-icon-names.ts';
import {groupPackageServices} from '../src/lib/package-service-groups.ts';
import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import YAML from 'yaml';

const doc=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
const list=doc.content.items;
const schema=homepageBlockSchema.options[2];

test('every editable package service remains unique, grouped and locally icon-backed',()=>{
  assert.equal(list.length,3);
  for(const item of list){
    assert.ok(item.iconItems.length>0,'CMS must retain at least one service per package');
    assert.equal(groupPackageServices(item.iconItems).flatMap(group=>group.items).length,item.iconItems.length);
    assert.equal(new Set(item.iconItems.map((service:any)=>service.compactLabel)).size,item.iconItems.length);
    for(const service of item.iconItems)if(service.iconName!==undefined)
      assert.equal(isPhosphorIconName(service.iconName),true);
  }
});

test('every selectable Phosphor icon has a pinned, local SVG and a static renderer mapping',()=>{
  const component=readFileSync('src/components/PackageFocusIcon.astro','utf8');
  assert.equal(PHOSPHOR_ICON_NAMES.length,20);
  for(const name of PHOSPHOR_ICON_NAMES){
    const file='src/assets/phosphor/'+name+'.svg';
    assert.ok(existsSync(file),'Missing local icon: '+file);
    assert.match(readFileSync(file,'utf8'),/^<svg[^>]*fill="currentColor"/);
    assert.ok(component.includes("'"+name+"'"),'Renderer not mapped: '+name);
  }
  assert.ok(component.includes('kind ==='), 'Legacy generic icon fallback is preserved');
});

test('Pages CMS supports free-text local icon names but rejects unknown or unsafe entries',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const items=homepageBlockEditor(cms,'packages').fields.find((f:any)=>f.name==='items').fields;
  const icons=items.find((f:any)=>f.name==='iconItems').fields;
  const input=icons.find((f:any)=>f.name==='iconName');
  assert.equal(input.type,'string');
  assert.notEqual(input.required,true);
  assert.equal(schema.safeParse(doc).success,true);
  const bad=JSON.parse(JSON.stringify(doc));
  bad.content.items[0].iconItems[0].iconName='<script>bad</script>';
  assert.equal(schema.safeParse(bad).success,false);
  bad.content.items[0].iconItems[0].iconName='phosphor-icon-not-bundled';
  assert.equal(schema.safeParse(bad).success,false);
  bad.content.items[0].iconItems[0].iconName='';
  assert.equal(schema.safeParse(bad).success,true,'Empty optional CMS field must fall back');
  delete bad.content.items[0].iconItems[0].iconName;
  assert.equal(schema.safeParse(bad).success,true,'Legacy icon without new field must still parse');
});
