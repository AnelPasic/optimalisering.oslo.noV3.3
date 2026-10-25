import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {homeSectionDataSchema} from '../src/lib/home-section-data.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';
import {pageSchema} from '../src/lib/content-schema.ts';

const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const header=JSON.parse(readFileSync('src/content/site-chrome/header.json','utf8'));
const footer=JSON.parse(readFileSync('src/content/site-chrome/footer.json','utf8'));
const child={label:'SEO',href:'/seo/',description:'Bli funnet i Googles organiske søkeresultater'};
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
test('typed navigation preserves child destination and explanation instead of dropping it',()=>{
 const chrome=structuredClone({ ...header, ...footer });
 // Exercise legacy dropdown editing on a valid dropdown fixture, not the
 // OWNER-approved mega menu currently stored in homepage.chrome.navigation[0].
 chrome.navigation[0]={label:'Synlighet',href:'/synlighet/',presentation:'dropdown',submenuLabel:'Vis fagområder under Synlighet',children:[child]};
 assert.deepEqual(homeSectionDataSchema.shape.chrome.parse(chrome).navigation[0],chrome.navigation[0]);
});
test('native CMS child edit preserves other navigation and homepage data',()=>{
 const entry=entryForFile(cms,'app/src/content/site-chrome/header.json');
 const nav=entry.fields.find((f:any)=>f.name==='navigation');
 assert.ok(nav.fields.some((f:any)=>f.name==='children'));
 const original=structuredClone(header);original.navigation[0]={label:'Synlighet',href:'/synlighet/',presentation:'dropdown',children:[child],submenuLabel:'Vis fagområder under Synlighet'};
 const edited=structuredClone(original);edited.navigation[0].children[0].description='Forbedret forklaring';
 const saved=JSON.parse(cmsJsonSave(original,edited,entry,cms));
 assert.deepEqual(saved,edited);
 assert.deepEqual(JSON.parse(readFileSync('src/content/pages/home.json','utf8')),home);
});
test('navigation rejects unsafe paths, empty descriptions, duplicate children and nested dropdowns',()=>{
 const schema=homeSectionDataSchema.shape.chrome;
 for(const invalid of [{...child,href:'//external.test/'},{...child,href:'/\\external.test/'},{...child,description:''},{...child,children:[child]}]){
  const chrome=structuredClone({ ...header, ...footer });chrome.navigation[0]={...chrome.navigation[0],submenuLabel:'Vis fagområder',children:[invalid]};
  assert.equal(schema.safeParse(chrome).success,false);
 }
 const chrome=structuredClone({ ...header, ...footer });chrome.navigation[0]={...chrome.navigation[0],submenuLabel:'Vis fagområder',children:[child,child]};
 assert.equal(schema.safeParse(chrome).success,false);
});
test('active child marks only the exact page current and parent category in context',async()=>{
 const {navigationState}=await import('../src/lib/navigation.ts');
 const link={label:'Synlighet',href:'/synlighet/',children:[child,{label:'Lokal SEO',href:'/synlighet/#lokal-synlighet',description:'Lokale søk'}]};
 assert.deepEqual(navigationState(link,'/seo/'),{current:false,within:true});
 assert.deepEqual(navigationState(link,'/synlighet/'),{current:true,within:true});
 assert.deepEqual(navigationState(child,'/seo'),{current:true,within:false});
 assert.deepEqual(navigationState(link.children[1],'/synlighet/'),{current:false,within:false});
 assert.deepEqual(navigationState(link,'/konvertering/'),{current:false,within:false});
});
test('CMS content cannot collide with submenu ARIA targets',()=>{
 for(const slug of ['home','synlighet']){
  const page=JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));
  page.sections.push({_block:'content',uid:'11111111-1111-4111-8111-111111111111',id:'header-desktop-submenu-0',name:'Test',heading:'Test',body:[]});
  assert.equal(pageSchema.safeParse(page).success,false,slug);
 }
});
