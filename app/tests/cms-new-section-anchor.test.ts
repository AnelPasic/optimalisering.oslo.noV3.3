import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,resolveField} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const page=JSON.parse(readFileSync('src/content/pages/om.json','utf8'));
const entry=entryForFile(cms,'app/src/content/pages/om.json');
const sections=entry.fields.find((field:any)=>field.name==='sections');
const ordinary=resolveField(sections.blocks.find((block:any)=>block.name==='content'),cms.components);
const protectedSection=resolveField(cms.components.sectionProtected,cms.components);
const newRow={_block:'content',id:'testing-links',heading:'TestingLinks',body:['Ny seksjon i Pages CMS']};

test('ordinary section anchors can be entered when a new CMS block is created',()=>{
 assert.equal(ordinary.fields.find((field:any)=>field.name==='id').required,true);
 const id=ordinary.fields.find((field:any)=>field.name==='id');
 assert.notEqual(id.readonly,true,'new ordinary sections must have an editable id');
 const pattern=new RegExp(id.pattern);
 assert.ok(pattern.test('testing-links'));
 for(const value of ['', 'Mellomrom i id','testing_links','-testing'])assert.equal(pattern.test(value),false,value);
 assert.equal(protectedSection.fields.find((field:any)=>field.name==='id').readonly,true,'protected IDs stay locked');
});

test('new ordinary section survives Pages CMS JSON save, reopen and Zod validation',()=>{
 const edited=structuredClone(page);
 edited.sections.push(newRow);
 const saved=JSON.parse(cmsJsonSave(page,edited,entry,cms));
 assert.deepEqual(saved.sections.slice(0,-1),page.sections,'no owner content may be modified');
 assert.deepEqual(saved.sections.at(-1),newRow);
 const parsed=pageSchema.parse(saved);
 assert.equal(parsed.sections.at(-1)?.id,'testing-links');
 assert.equal(parsed.sections.at(-1)?.heading,'TestingLinks');
 assert.equal(pageSchema.safeParse({...saved,sections:[...page.sections,{...newRow,id:''}]}).success,false);
 assert.throws(()=>cmsJsonSave(page,{...edited,sections:[...page.sections,{...newRow,id:'invalid id'}]},entry,cms),/pattern/);
});
