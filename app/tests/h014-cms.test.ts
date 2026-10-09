import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
const home = JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('compact CMS copy stays editable without losing long copy; invalid decision summaries fail validation', () => {
  const fixture = structuredClone(home);
  fixture.homepage.packages.items[0].compact.fit = 'CMS short fit';
  fixture.homepage.packages.items[0].iconItems[0].compactLabel = 'CMS short icon';
  const parsed = pageSchema.parse(fixture).homepage!.packages.items[0];
  assert.equal(parsed.compact.fit,'CMS short fit');
  assert.equal(parsed.iconItems[0].compactLabel,'CMS short icon');
  assert.equal(parsed.fit,home.homepage.packages.items[0].fit);
  assert.equal(parsed.iconItems[0].label,home.homepage.packages.items[0].iconItems[0].label);
  for (const change of ['empty-fit','four-situations','empty-label']) {
    const invalid=structuredClone(fixture), item=invalid.homepage.packages.items[0];
    if(change==='empty-fit')item.compact.fit=' ';
    if(change==='four-situations')item.compact.situations=['First','Second','Third','Fourth'];
    if(change==='empty-label')item.iconItems[0].compactLabel='';
    assert.equal(pageSchema.safeParse(invalid).success,false);
  }
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const fields=cms.content.find((c:any)=>c.name==='homepage').fields.find((f:any)=>f.name==='homepage').fields.find((f:any)=>f.name==='packages').fields.find((f:any)=>f.name==='items').fields;
  assert.deepEqual(fields.find((f:any)=>f.name==='compact').fields.map((f:any)=>f.name),['fit','situations']);
  assert.ok(fields.find((f:any)=>f.name==='iconItems').fields.find((f:any)=>f.name==='compactLabel'));
});
