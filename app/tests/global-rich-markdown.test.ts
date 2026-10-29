import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {hasRichMarkdown,renderSafeMarkdown} from '../src/lib/rich-markdown.ts';
import {sharedContentSchema,readSharedContent} from '../src/lib/shared-content.ts';
const read=(path:string)=>readFileSync(new URL(path,import.meta.url),'utf8');

test('Pages CMS edits only global Markdown body and cards; original sources stay byte-identical',()=>{
 const yaml=read('../../.pages.yml');
 const start=yaml.indexOf('  - name: globalElements\n'),end=yaml.indexOf('      - name: globalSelector',start);
 assert.ok(start>0&&end>start);
 const global=yaml.slice(start,end);
 assert.match(global,/name: body\n\s+label: Avsnitt \/ kolonner \(Markdown\)\n\s+component: globalMarkdownBody/);
 assert.match(global,/name: items\n\s+label: Kort \/ alternativer \(Markdown\)\n\s+component: globalMarkdownItems/);
 assert.match(yaml,/globalMarkdownBody:\n\s+type: rich-text\n\s+list: \{\}/);
 assert.match(yaml,/globalMarkdownItems:[\s\S]*?type: rich-text/);
 assert.match(yaml,/media: false/);
 assert.match(yaml,/format: markdown/);
 assert.match(yaml,/&serviceBody\n\s+name: body\n\s+label: Avsnitt\n\s+type: text/);
 const raw=read('../src/content/global-content/lafoitems.json');
 const parsed=JSON.parse(raw),copy=structuredClone(parsed);
 assert.equal(sharedContentSchema.safeParse(parsed).success,true);
 assert.equal(readSharedContent('lafoitems').items?.length,3);
 assert.equal(parsed.layout,'three-columns');
 assert.deepEqual(parsed,copy);
 for(const item of parsed.items)assert.equal(hasRichMarkdown(item.text),false,'legacy SEO fakta must render via old plaintext path');
});

test('Markdown keeps three independently authored content columns separate',()=>{
 const input=['## Kolonne 1\n\n- Første\n- Andre','**Kolonne 2** med [lenke](/kontakt/)','### Kolonne 3\n\n1. En\n2. To'];
 const html=input.map(renderSafeMarkdown);
 assert.equal(html.length,3);
 assert.match(html[0],/<h2>Kolonne 1<\/h2>/);
 assert.match(html[0],/<ul><li>Første<\/li><li>Andre<\/li><\/ul>/);
 assert.match(html[1],/<strong>Kolonne 2<\/strong>/);
 assert.match(html[1],/<a href="\/kontakt\/">lenke<\/a>/);
 assert.match(html[2],/<ol><li>En<\/li><li>To<\/li><\/ol>/);
 assert.ok(html.every((part,i)=>!part.includes('Kolonne '+(i===0?'2':i===1?'3':'1'))));
 const original=structuredClone(input);
 assert.deepEqual(input,original);
});

test('h2-h6, bold, italic, links and lists produce semantic safe HTML',()=>{
 for(let h=2;h<=6;h++)assert.equal(renderSafeMarkdown('#'.repeat(h)+' Kapittel'),'<h'+h+'>Kapittel</h'+h+'>');
 assert.equal(renderSafeMarkdown('En **fet** og *kursiv* tekst'),'<p>En <strong>fet</strong> og <em>kursiv</em> tekst</p>');
 assert.equal(hasRichMarkdown('Noe _kursiv_'),true);
 assert.equal(renderSafeMarkdown('Se [hjelp](https://example.org/kontakt?a=1&b=2)'),'<p>Se <a href="https://example.org/kontakt?a=1&amp;b=2">hjelp</a></p>');
 assert.throws(()=>renderSafeMarkdown('# H1 er forbeholdt Hero'),/H1/);
});

test('raw HTML, script URLs, encoded attacks and image syntax never become executable HTML',()=>{
 const unsafe=[
  ['## Hallo <script>alert(1)</script>','&lt;script&gt;'],
  ['- <img src=x onerror=alert(1)>','&lt;img'],
  ['[click](javascript:alert(1))','<a href='],
  ['[click](data:text/html,aaa)','<a href='],
  ['[click](//evil.test)','<a href='],
  ['[click](https://user:pw@example.org)','<a href='],
  ['![x](https://example.com/a.png)','<img']
 ];
 for(const [md,forbidden] of unsafe){
  const html=renderSafeMarkdown(md);
  if(forbidden.startsWith('&lt;'))assert.ok(html.includes(forbidden),md);
  else assert.equal(html.includes(forbidden),false,md);
  assert.equal(/<script|<img|<iframe|<a href="javascript:/i.test(html),false,md);
 }
});

test('global text still uses same layouts and has no new stored flags',()=>{
 const item={_block:'content',uid:'cc8c071d-1a1d-4d7a-8b75-2964af492a52',id:'rich-test',name:'Rich test',
  heading:'Test',headingAlign:'left',layout:'three-columns',surface:'base-100',
  body:['## A','## B','## C'],items:[{title:'Kort',text:'- Punkt',surface:'info',boxVariant:'card'}]};
 const result=sharedContentSchema.parse(item);
 assert.equal(result.layout,'three-columns');
 assert.deepEqual(result.body,item.body);
 assert.equal(result.items?.[0]?.text,'- Punkt');
 assert.equal(Object.keys(result).includes('richText'),false);
});
