import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
const pageSchema=homepageBlockSchema.options[2];
const home = JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
test('compact CMS copy stays editable; invalid decision summaries fail validation', () => {
  const fixture = structuredClone(home);
  fixture.content.items[0].compact.fit = 'CMS short fit';
  const parsed = pageSchema.parse(fixture).content.items[0];
  assert.equal(parsed.compact.fit,'CMS short fit');
  for (const change of ['empty-fit','four-situations']) {
    const invalid=structuredClone(fixture), item=invalid.content.items[0];
    if(change==='empty-fit')item.compact.fit=' ';
    if(change==='four-situations')item.compact.situations=['First','Second','Third','Fourth'];
    assert.equal(pageSchema.safeParse(invalid).success,false);
  }
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const fields=homepageBlockEditor(cms,'packages').fields.find((f:any)=>f.name==='items').fields;
  assert.deepEqual(fields.find((f:any)=>f.name==='compact').fields.map((f:any)=>f.name),['fit','situations']);
  assert.equal(fields.find((f:any)=>f.name==='iconItems'),undefined);
});
