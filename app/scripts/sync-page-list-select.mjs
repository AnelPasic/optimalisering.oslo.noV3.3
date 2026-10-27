import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root=resolve('src/content/pages');
const configPath=resolve('../.pages.yml');
const marker=/# PAGE_LIST_PAGE_OPTIONS_START\n([\s\S]*?)# PAGE_LIST_PAGE_OPTIONS_END/;
const current=readFileSync(configPath,'utf8');
if(!marker.test(current))throw new Error('Missing generated PageList options markers in .pages.yml');
const choices=readdirSync(root).filter(name=>name.endsWith('.json')).map(name=>{
  const page=JSON.parse(readFileSync(resolve(root,name),'utf8'));
  return {name:page.slug,label:page.listing?.title||page.seo?.title||page.title||page.slug};
}).sort((a,b)=>a.name.localeCompare(b.name,'nb'));
const generated=choices.map(row=>`        - name: ${JSON.stringify(row.name)}\n          label: ${JSON.stringify(row.label)}`).join('\n');
const updated=current.replace(marker,`# PAGE_LIST_PAGE_OPTIONS_START\n${generated}\n# PAGE_LIST_PAGE_OPTIONS_END`);
if(process.argv.includes('--write')){
  if(updated!==current)writeFileSync(configPath,updated);
  console.log('Generated PageList choices: '+choices.length);
}else if(updated!==current){
  console.error('PageList selector is outdated. Run: cd app && node scripts/sync-page-list-select.mjs --write');
  process.exitCode=1;
}else console.log('PageList selector synchronized: '+choices.length);
