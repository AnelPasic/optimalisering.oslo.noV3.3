import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

test('OWNER-deleted Lokal SEO route is not silently restored by CMS Structure Parity',()=>{
 assert.equal(existsSync('src/content/pages/lokal-seo.json'),false);
 const header=JSON.parse(readFileSync('src/content/site-chrome/header.json','utf8'));
 const footer=JSON.parse(readFileSync('src/content/site-chrome/footer.json','utf8'));
 const hrefs=(object:unknown):string[]=>object&&typeof object==='object'
   ? Object.entries(object).flatMap(([key,value])=>key==='href'&&typeof value==='string'?[value]:hrefs(value))
   : [];
 assert.equal(hrefs(header).includes('/lokal-seo/'),false,'No dead menu destination');
 assert.equal(hrefs(footer).includes('/lokal-seo/'),false,'No dead footer destination');
 assert.ok(existsSync('src/content/pages/seo.json'),'Other service pages are preserved');
});
