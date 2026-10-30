import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const pagesDir=resolve('src/content/pages'),config=resolve('../.pages.yml');
const shortcuts=JSON.parse(readFileSync(resolve('src/content/link-shortcuts.json'),'utf8'));
const current=readFileSync(config,'utf8');
const marker=/# CMS_URL_CHOICES_BEGIN\n([\s\S]*?)# CMS_URL_CHOICES_END/;
const match=current.match(marker);
if(!match)throw Error('Missing CMS URL choice markers');

// The legacy static picker is a pinned suggestion list. Never make a new
// service page's first CMS commit depend on rewriting a generated YAML block.
const previous=[...match[1].matchAll(/^\s+- name: ("(?:\\.|[^"\\])*")\n\s+label: ("(?:\\.|[^"\\])*")$/gm)]
 .map(row=>({href:JSON.parse(row[1]),label:JSON.parse(row[2])}));
if(!previous.length||new Set(previous.map(row=>row.href)).size!==previous.length)
 throw Error('Invalid or duplicate pinned CMS URL choices');

const available=new Map();
for(const dir of [pagesDir,resolve(pagesDir,'managed-articles')])for(const name of readdirSync(dir).filter(f=>f.endsWith('.json'))){
 const page=JSON.parse(readFileSync(resolve(dir,name),'utf8')),slug=page.slug;
 if(!/^(home|[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?)$/.test(slug)||slug.includes('//')||!page.seo?.title?.trim())throw Error('Invalid canonical page '+name);
 const href=slug==='home'?'/':'/'+slug+'/';
 available.set(href,{href,label:(page.listing?.title||page.seo?.title||page.title||slug)+' — '+href});
}
for(const s of shortcuts){
 if(typeof s.title!=='string'||!s.title.trim()||typeof s.href!=='string'||!/^\/(?![\\/])[^<>"\\\s]*$/.test(s.href))throw Error('Unsafe URL shortcut');
 available.set(s.href,{href:s.href,label:s.title+' — '+s.href});
}
const choices=previous.map(old=>available.get(old.href)??old).sort((a,b)=>a.href.localeCompare(b.href,'nb'));
const generated=choices.map(c=>'        - name: '+JSON.stringify(c.href)+'\n          label: '+JSON.stringify(c.label)).join('\n');
const updated=current.replace(marker,'# CMS_URL_CHOICES_BEGIN\n'+generated+'\n# CMS_URL_CHOICES_END');
if(process.argv.includes('--write')){
 if(updated!==current)writeFileSync(config,updated);
 console.log('Updated '+choices.length+' pinned CMS URL suggestions');
}else if(updated!==current){
 console.error('Pinned CMS URL labels changed: run node scripts/sync-cms-url-options.mjs --write');
 process.exitCode=1;
}else console.log('Pinned CMS URL suggestions verified: '+choices.length);
