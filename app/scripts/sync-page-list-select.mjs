import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve('src/content/pages'),configPath=resolve('../.pages.yml');
const current=readFileSync(configPath,'utf8');
const marker=/# PAGE_LIST_PAGE_OPTIONS_START\n([\s\S]*?)# PAGE_LIST_PAGE_OPTIONS_END/;
const match=current.match(marker);
if(!match)throw new Error('Missing PageList options markers in .pages.yml');

// Historical static picker choices remain a bounded fixed list. Newly created
// service pages are linked via manual URL or automatic PageList; no YAML edit on Add/Delete.
const previous=[...match[1].matchAll(/^\s+- name: ("(?:\\.|[^"\\])*")\n\s+label: ("(?:\\.|[^"\\])*")$/gm)]
 .map(row=>({name:JSON.parse(row[1]),label:JSON.parse(row[2])}));
if(!previous.length||new Set(previous.map(row=>row.name)).size!==previous.length)
 throw new Error('Invalid or duplicate pinned PageList choices');

const pages=new Map([root,resolve(root,'managed-articles')].flatMap(dir=>
 readdirSync(dir).filter(name=>name.endsWith('.json')).map(name=>{
  const page=JSON.parse(readFileSync(resolve(dir,name),'utf8'));
  return [page.slug,page];
 })
));
const choices=previous.map(old=>{
 const page=pages.get(old.name);
 return page?{name:old.name,label:page.listing?.title||page.seo?.title||page.title||page.slug}:old;
}).sort((a,b)=>a.name.localeCompare(b.name,'nb'));
const generated=choices.map(row=>`        - name: ${JSON.stringify(row.name)}\n          label: ${JSON.stringify(row.label)}`).join('\n');
const updated=current.replace(marker,`# PAGE_LIST_PAGE_OPTIONS_START\n${generated}\n# PAGE_LIST_PAGE_OPTIONS_END`);
if(process.argv.includes('--write')){
 if(updated!==current)writeFileSync(configPath,updated);
 console.log('Updated '+choices.length+' pinned PageList choices');
}else if(updated!==current){
 console.error('Pinned PageList titles changed: run node scripts/sync-page-list-select.mjs --write');
 process.exitCode=1;
}else console.log('Pinned PageList choices verified: '+choices.length);
