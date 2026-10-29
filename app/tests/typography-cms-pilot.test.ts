import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {parseTypographyVariables,typographySchema,typographyOverridesCss,typographyVariables} from '../src/lib/site-chrome-typography.ts';
import {siteChrome} from '../src/lib/site-chrome-data.ts';
const read=(path:string)=>readFileSync(path,'utf8');
const appearance=JSON.parse(read('src/content/site-chrome/appearance.json'));
test('existing OWNER theme remains unchanged and optional typography does not affect defaults',()=>{
 assert.equal(appearance.typography,undefined);
 assert.equal(siteChrome.typography,undefined);
 assert.deepEqual(typographyVariables(siteChrome.typography),{});
 assert.equal(typographyOverridesCss(siteChrome.themes,undefined),'');
 assert.match(appearance.themes.darkCss,/name: "sunset"/);
});
test('CMS has structured native Tailwind type controls and advanced token editor',()=>{
 const cms=YAML.parse(read('../.pages.yml'));
 const editor=cms.content.flatMap((x:any)=>x.items??[]).find((x:any)=>x.name==='siteAppearance');
 assert.ok(editor,'siteAppearance CMS entry');
 assert.deepEqual(editor.fields.find((x:any)=>x.name==='typography').fields.map((x:any)=>x.name),
 ['fontFamily','scale','lineHeight','tracking','weight','cssVariables']);
});
test('existing Oslo responsive sizes are preserved exactly by Tailwind token adapters',()=>{
 const base=read('src/styles/app.css');
 const old=read('src/styles/typography.css');
 for(const [name,value] of Object.entries({
  '--text-5xl':'clamp(1.75rem, 4.5vw, 3.25rem)',
  '--text-4xl':'clamp(2rem, 3.2vw, 3rem)',
  '--text-3xl':'clamp(1.5rem, 2.2vw, 2rem)',
  '--text-2xl':'clamp(1.375rem, 1.8vw, 1.625rem)',
  '--text-xl':'clamp(1.25rem, 1.8vw, 1.375rem)',
  '--text-lg':'clamp(1.125rem, 1.4vw, 1.25rem)',
  '--text-base':'clamp(1rem, 1.35vw, 1.125rem)'
 }))assert.ok(base.includes(name+': '+value+';'),name+' default changed');
 const expected={
 '--type-display':'--text-5xl',
 '--type-h2':'--text-4xl',
 '--type-h3':'--text-3xl',
 '--type-h4':'--text-2xl',
 '--type-lead':'--text-xl',
 '--type-body-lg':'--text-lg',
 '--type-body':'--text-base'
 };
 for(const [key,value] of Object.entries(expected))assert.ok(old.includes(key+': var('+value+');'),key+' no longer uses Tailwind');
 assert.ok(base.includes("--font-heading: 'Instrument Sans Variable', sans-serif"));
 assert.ok(base.includes("--font-body: 'Figtree Variable', sans-serif"));
 assert.match(read('src/layouts/SiteLayout.astro'),/typography=\{homeChrome.typography\}/);
});
test('only already installed font stacks and documented Tailwind variables can be saved',()=>{
 const css=':root { --text-5xl: clamp(1.75rem, 4.5vw, 3.25rem); --font-heading: \'Instrument Sans Variable\', sans-serif; --font-body: \'Figtree Variable\', sans-serif; }';
 const parsed=parseTypographyVariables(css);
 assert.equal(parsed['--text-5xl'],'clamp(1.75rem, 4.5vw, 3.25rem)');
 const config=typographySchema.parse({fontFamily:'current',scale:'normal',cssVariables:css});
 const out=typographyOverridesCss(siteChrome.themes,config);
 for(const theme of ['optimalisering','sunset'])assert.ok(out.includes('html[data-theme="'+theme+'"]'));
 for(const invalid of [
 ':root { --site-h1-size: 4rem; }',
 ':root { --color-primary: red; }',
 ':root { --text-5xl: url(https://invalid.example/a); }',
 ':root { --font-heading: "Remote Font", sans-serif; }',
 ':root { --text-5xl: 4rem !important; }',
 ':root { --text-5xl: 4rem; --text-5xl: 8rem; }',
 ':root { --text-5xl: 4rem; } body {display:none}',
 '@import "https://invalid.example/theme.css";',
 '<style>:root { --text-5xl: 4rem }</style>'
 ])assert.throws(()=>parseTypographyVariables(invalid),invalid);
});
