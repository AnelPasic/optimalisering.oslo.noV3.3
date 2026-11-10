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

test('the complete pinned Phosphor Regular catalog is available at build time, not just 20 names',()=>{
  const component=readFileSync('src/components/PackageFocusIcon.astro','utf8');
  assert.ok(PHOSPHOR_ICON_NAMES.length>1000,'Full upstream icon catalog must be available');
  for(const name of ['meta-logo','facebook-logo','instagram-logo','google-logo','sparkle','map-pin','grid-four']){
    assert.equal(isPhosphorIconName(name),true,name+' must be selectable in CMS');
    const path='node_modules/@phosphor-icons/core/assets/regular/'+name+'.svg';
    assert.ok(existsSync(path),'Missing pinned npm asset: '+path);
    assert.ok(readFileSync(path,'utf8').startsWith('<svg'),'Unexpected upstream SVG');
  }
  assert.ok(component.includes('set:html={svgBody}'),'Only the selected SVG markup is inlined in static HTML');
  assert.ok(component.includes('node:fs'),'Icons are loaded while building, not in client JS');
  assert.ok(component.includes('kind ==='),'Legacy generic icon fallback remains available');
});

test('Pages CMS supports free-text local icon names but rejects unknown or unsafe entries',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const items=homepageBlockEditor(cms,'packages').fields.find((f:any)=>f.name==='items').fields;
  const icons=items.find((f:any)=>f.name==='iconItems').fields;
  const input=icons.find((f:any)=>f.name==='iconName');
  assert.equal(input.type,'string');
  assert.notEqual(input.required,true);
  assert.equal(schema.safeParse(doc).success,true);
  const hasMeta=JSON.parse(JSON.stringify(doc));
  hasMeta.content.items[0].iconItems[5].iconName='meta-logo';
  assert.equal(schema.safeParse(hasMeta).success,true,'Meta logo must validate in the full Phosphor catalog');
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
