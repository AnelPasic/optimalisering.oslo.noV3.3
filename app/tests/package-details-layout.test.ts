import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {groupPackageServices} from '../src/lib/package-service-groups.ts';

const markup=readFileSync('src/components/PackageSection.astro','utf8');
const data=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8')).content;

test('Bestill is followed by one native Mer om pakken disclosure containing all lower copy',()=>{
  const tokens=[".filter(group => group.label !== 'Systemer')","<PackageOrder item={item}",'<details class="package-details">','class="package-situations"','class="package-fit-goals"',"group.label === 'Systemer'",'Systemer inkludert'];
  const positions=tokens.map(token=>markup.indexOf(token));
  assert.ok(positions.every((x,i)=>x>=0&&(i===0||x>positions[i-1])),JSON.stringify(positions));
  assert.ok(!markup.includes('open={expanded}'),'Mer om pakken should start closed on both pages');
  assert.ok(markup.includes('{item.scope && <div class="package-scope">'),'Existing scope remains within disclosure');
  assert.ok(markup.includes('{item.priceNote && <p class="package-price-note">'),'Optional package note remains within disclosure');
  assert.equal(data.items.length,3);
  for(const item of data.items)assert.ok(item.detailLink.label.trim(), 'CMS controls the new disclosure heading');
});
test('Systemer flyttes bare i visningen, uten å miste eller kopiere ikondata',()=>{
  for(const item of data.items){
    const groups=groupPackageServices(item.iconItems);
    const visible=groups.filter(group=>group.label!=='Systemer');
    const hidden=groups.filter(group=>group.label==='Systemer');
    assert.equal(visible.flatMap(group=>group.items).length+hidden.flatMap(group=>group.items).length,item.iconItems.length);
    assert.equal(new Set([...visible,...hidden].flatMap(group=>group.items)).size,item.iconItems.length);
    assert.equal(hidden.length,1,'Each current package has a Systemer group');
    assert.equal(hidden[0].items.length,4);
  }
});
