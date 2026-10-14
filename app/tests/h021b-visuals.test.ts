import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import YAML from 'yaml';
import { listingSchema, pageListSchema, resolvePageList } from '../src/lib/page-list.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent } from './helpers/pages-cms-json.ts';
const page=(visual?:any,slug='innsikt/test')=>({slug,kind:'article',title:slug,intro:'Test ingress',listing:{title:slug,visible:true,visual}});
const config=(edit:any={})=>({mode:'automatic',sort:'title',limit:6,layout:'alternating',...edit});
const image={kind:'image',src:'/images/listing/test.png',alt:'Syntetisk testmønster'};

test('listing supports discriminated image/icon/none and safe crop defaults',()=>{
 assert.deepEqual(listingSchema.parse({visual:image}).visual,{...image,positionX:50,positionY:50});
 for(const icon of ['search','conversion','analytics','trend','page','route'])assert.deepEqual(listingSchema.parse({visual:{kind:'icon',icon}}).visual,{kind:'icon',icon});
 assert.equal(listingSchema.parse({}).visual,undefined);
 assert.deepEqual(listingSchema.parse({visual:{kind:'none'}}).visual,{kind:'none'});
});
test('visual schema rejects arbitrary icons, remote/path traversal/SVG imagery, blank alt, unsafe crop and irrelevant fields',()=>{
 for(const visual of [{kind:'icon',icon:'fa-anything'},{kind:'icon',icon:'route',src:image.src},{kind:'none',alt:'ignored'},{...image,src:'https://example.com/photo.png'},{...image,src:'/images/home/test.png'},{...image,src:'/images/listing/../test.png'},{...image,src:'/images/listing/test.svg'},{...image,alt:' '},{...image,positionX:-1},{...image,positionY:101},{...image,icon:'route'}]){
  assert.equal(listingSchema.safeParse({visual}).success,false,JSON.stringify(visual));
 }
});
test('both visual layouts are explicit; config rejects duplicated page-owned media',()=>{
 for(const layout of ['cards','mediaCards','alternating','compact','links'])assert.equal(pageListSchema.safeParse(config({layout})).success,true);
 for(const edit of [{visual:image},{src:image.src},{icon:'route'},{layout:'custom-html'}])assert.equal(pageListSchema.safeParse(config(edit)).success,false);
});
test('resolver carries only validated page-owned visuals and omits absent/missing/invalid assets safely',()=>{
 const directory=mkdtempSync(join(tmpdir(),'h021b-'));
 try{
  mkdirSync(join(directory,'images/listing'),{recursive:true});
  writeFileSync(join(directory,'images/listing/test.png'),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6d4sAAAAASUVORK5CYII=','base64'));
  assert.deepEqual(resolvePageList(config(),[page(image)],directory)[0].visual,{...image,positionX:50,positionY:50});
  assert.deepEqual(resolvePageList(config(),[page({kind:'icon',icon:'analytics'})],directory)[0].visual,{kind:'icon',icon:'analytics'});
  for(const visual of [undefined,{kind:'none'},{...image,src:'/images/listing/missing.png'},{...image,src:'/images/listing/folder.png'},{kind:'icon',icon:'bad'},{...image,positionX:999}]){
   assert.equal(resolvePageList(config(),[page(visual)],directory)[0].visual,undefined);
  }
 }finally{rmSync(directory,{recursive:true,force:true});}
});
test('final result index remains the alternation authority after filtering, exclusion, sorting and limit',()=>{
 const records:any[]=Array.from({length:4},(_,i)=>({...page({kind:'icon',icon:'route'},`innsikt/${i}`),listing:{visible:i!==1,order:4-i,visual:{kind:'icon',icon:'route'}}}));
 assert.deepEqual(resolvePageList(config({sort:'editorial',excluded:[{slug:'innsikt/2'}],limit:2}),records).map(p=>p.slug),['innsikt/3','innsikt/0']);
 assert.deepEqual(resolvePageList(config({mode:'manual',selected:[{slug:'innsikt/3'},{slug:'innsikt/1'},{slug:'innsikt/0'}],limit:1}),records).map(p=>p.slug),['innsikt/3','innsikt/0']);
});
test('CMS visual blocks expose only kind-specific fields and dedicated safe raster media',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const article=entryForFile(cms,'app/src/content/pages/hva-bor-optimaliseres-forst.json');
 const listing=article.fields.find((f:any)=>f.name==='listing');
 const visual=resolveField(listing.fields.find((f:any)=>f.name==='visual'),cms.components);
 assert.equal(visual.label,'Listevisual');assert.equal(visual.type,'block');assert.equal(visual.blockKey,'kind');
 assert.equal(visual.list.max,1);
 assert.deepEqual(visual.blocks.map((b:any)=>[b.name,b.label]),[['none','Ingen'],['image','Bilde'],['icon','Ikon']]);
 const media=cms.media.find((m:any)=>m.name==='listingImages');assert.equal(media.input,'app/public/images/listing');assert.equal(media.output,'/images/listing');assert.deepEqual(media.extensions,['webp','png','jpg','jpeg','avif']);
 const imageBlock=resolveField(visual.blocks.find((b:any)=>b.name==='image'),cms.components);
 assert.equal(imageBlock.fields.find((f:any)=>f.name==='src').options.media,'listingImages');
 assert.deepEqual(imageBlock.fields.map((f:any)=>f.name),['src','alt','positionX','positionY']);
 const original=JSON.parse(readFileSync('src/content/pages/hva-bor-optimaliseres-forst.json','utf8'));let previous=original;
 for(const visual of [[image],[{kind:'icon',icon:'trend'}],[{kind:'none'}],[]]){
  const form=structuredClone(original);form.listing.visual=visual;
  const saved=JSON.parse(cmsJsonSave(previous,form,article,cms));assertPreservedContent(form,saved);
  const parsed=listingSchema.parse(saved.listing);assert.deepEqual(parsed.visual,visual.length?listingSchema.parse({visual:visual[0]}).visual:undefined);
  previous=saved;
 }
 const restored=JSON.parse(cmsJsonSave(previous,structuredClone(original),article,cms));assertPreservedContent(original,restored);
 assert.equal(listingSchema.safeParse({visual:[{kind:'none'},{kind:'none'}]}).success,false);
});
