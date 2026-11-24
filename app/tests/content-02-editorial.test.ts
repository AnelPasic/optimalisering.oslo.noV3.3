import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';
import {sharedContentSchema} from '../src/lib/shared-content.ts';
import {pageFilePaths} from './helpers/page-sources.ts';

const read = (path:string) => JSON.parse(readFileSync(path,'utf8'));
const home=read('src/content/pages/home.json');
const local=read('src/content/pages/lokal-seo.json');
const facts=read('src/content/global-content/lafoitems.json');

test('CONTENT-02: live pages no longer contain the two identified obsolete test blocks',()=>{
 assert.equal(home.sections.some((s:any)=>s.id==='forbehovsvelger'),false);
 assert.equal((local.sections??[]).some((s:any)=>s.id==='testing-links'),false);
 const globals=home.sections.filter((s:any)=>s._block==='global').map((s:any)=>s.element);
 assert.equal(new Set(globals).size,globals.length);
 for(const required of ['priser','sjekk'])assert.ok(globals.includes(required));
 // OWNER later approved a new complete commercial page, while deleted test blocks stay absent.
 assert.deepEqual(local.sections.filter((s:any)=>s._block==='global').map((s:any)=>s.element),['priser','sjekk']);
});

test('CONTENT-02: SEO fakta preserves three independent cards and source-backed numbers without repetition',()=>{
 assert.equal(facts.id,'lafoitems');
 assert.equal(facts.layout,'three-columns');
 assert.equal(facts.items.length,3);
 assert.equal(sharedContentSchema.safeParse(facts).success,true);
 const final=facts.items[2];
 assert.match(final.title,/71 %/);
 assert.doesNotMatch(final.title,/10\s*[–-]\s*71 %/);
 assert.match(final.text,/1 419 av 2 000/);
 assert.match(final.text,/36 dager/);
 assert.match(final.text,/3 %/);
 assert.match(final.text,/Kilde: SE Ranking/);
 assert.equal((final.text.match(/1 419 av 2 000/g)||[]).length,1);
});

test('CONTENT-02: all existing page files still validate and keep safe section anchors',()=>{
 const names=pageFilePaths();
 for(const name of names){
   const raw=read('src/content/pages/'+name);
   const check=pageSchema.safeParse(raw);
   assert.equal(check.success,true,name+': '+(check.success?'':check.error.issues.map(x=>x.message).join('; ')));
 }
 assert.equal(pageSchema.parse(home).faq.length,0,'Homepage has no duplicate local FAQ');
 const sharedFaq=read('src/content/global-elements/sporsmal.json');
 assert.ok(Array.isArray(sharedFaq.content.items));
 assert.ok(sharedFaq.content.items.every((item:any)=>item.question?.trim()&&item.answer?.trim()));
});
