import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageListSchema} from '../src/lib/page-list.ts';

const read=(path:string)=>readFileSync('src/'+path,'utf8');

test('PageList: 1–3 columns are optional, validated, and preserve old configuration',()=>{
 assert.equal(pageListSchema.parse({layout:'mediaCards'}).columns,undefined);
 assert.equal(pageListSchema.parse({layout:'cards',columns:null}).columns,undefined);
 assert.equal(pageListSchema.parse({layout:'links',columns:''}).columns,undefined);
 for(const layout of ['cards','mediaCards','compact','links','alternating'] as const){
  for(const columns of [1,2,3])
   assert.equal(pageListSchema.parse({layout,columns}).columns,columns);
 }
 for(const columns of [0,4,-1,1.5,'3',true,{},[]])
  assert.equal(pageListSchema.safeParse({layout:'cards',columns}).success,false,String(columns));
});

test('Pages CMS exposes the same numeric column choice on the shared PageList block',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const section=cms.components.sectionPageList;
 const list=section.fields.find((f:any)=>f.name==='pageList');
 const field=list.fields.find((f:any)=>f.name==='columns');
 assert.equal(field.type,'number');
 assert.deepEqual(field.options,{min:1,max:3,step:1});
 assert.ok(field.description.includes('Vekslende'));
 const existing=JSON.parse(read('content/pages/innsikt.json'));
 assert.equal(existing.sections[0].pageList.columns,undefined,
  'published PageList keeps its automatic columns when not explicitly edited');
});

test('PageList uses the real layout and mobile-first CSS for explicitly selected columns',()=>{
 const list=read('components/PageList.astro');
 const home=read('components/HomeSection.astro');
 assert.ok(list.includes('cardLayout = config.columns === 1'));
 assert.ok(list.includes('pageListColumns={config.columns}'));
 assert.ok(home.includes('data-page-list-columns={pageListColumns}'));
 assert.ok(list.includes("config.layout==='alternating'?undefined:config.columns"));
 assert.ok(list.includes('data-columns={'));
 assert.ok(list.includes('@media (min-width: 701px) and (max-width: 1100px)'));
 assert.ok(list.includes('@media (min-width: 1101px)'));
 assert.ok(list.includes('@media (max-width: 700px)'));
});

test('design system shows Light/Dark and all five production PageList types',()=>{
 const ui=read('pages/design-system.astro');
 const switcher=read('lib/site-chrome-theme-interactions.ts');
 for(const key of ['cards','mediaCards','alternating','compact','links'])
  assert.ok(ui.includes("key:'"+key+"'"),key);
 assert.ok(ui.includes('const pageListColumns=[1,2,3] as const;'));
 assert.ok(ui.includes('data-page-list-demo-columns={columns}'));
 assert.ok(ui.includes('<PageList section={{...pageList,'));
 assert.ok(ui.includes('data-design-theme-mode'));
 assert.ok(ui.includes('value="light"')&&ui.includes('value="dark"'));
 assert.ok(ui.includes('setChromeThemeMode(input.value)'));
 assert.ok(switcher.includes('export function setChromeThemeMode'));
 assert.ok(!ui.includes('Light (kun QA, ikke godkjent merkevaretema)'));
 const layout=read('layouts/SiteLayout.astro');
 assert.ok(layout.includes('noindex || Astro.url.pathname.startsWith("/design-system/")'));
});
