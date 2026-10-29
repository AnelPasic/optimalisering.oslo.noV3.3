import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const pagesDir=resolve('src/content/pages'),config=resolve('../.pages.yml');
const shortcuts=JSON.parse(readFileSync(resolve('src/content/link-shortcuts.json'),'utf8'));
const current=readFileSync(config,'utf8');
const choices=readdirSync(pagesDir).filter(name=>name.endsWith('.json')).map(name=>{
 const page=JSON.parse(readFileSync(resolve(pagesDir,name),'utf8'));
 const slug=page.slug;
 if(!/^(home|[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?)$/.test(slug)||slug.includes('//')||!page.seo?.title?.trim())throw Error('Invalid canonical page '+name);
 const href=slug==='home'?'/':'/'+slug+'/';
 return {href,label:(page.listing?.title||page.seo?.title||page.title||slug)+' — '+href};
});
for(const s of shortcuts){
 if(typeof s.title!=='string'||!s.title.trim()||typeof s.href!=='string'||!/^\/(?![\\/])[^<>"\\\s]*$/.test(s.href))throw Error('Unsafe URL shortcut');
 choices.push({href:s.href,label:s.title+' — '+s.href});
}
if(new Set(choices.map(c=>c.href)).size!==choices.length)throw Error('Duplicate CMS URL suggestions');
choices.sort((a,b)=>a.href.localeCompare(b.href,'nb'));
const marker=/# CMS_URL_CHOICES_BEGIN\n([\s\S]*?)# CMS_URL_CHOICES_END/;
if(!marker.test(current))throw Error('Missing CMS URL choice markers');
const generated=choices.map(c=>'        - name: '+JSON.stringify(c.href)+'\n          label: '+JSON.stringify(c.label)).join('\n');
const updated=current.replace(marker,'# CMS_URL_CHOICES_BEGIN\n'+generated+'\n# CMS_URL_CHOICES_END');
if(process.argv.includes('--write')){
 if(updated!==current)writeFileSync(config,updated);
 console.log('Generated '+choices.length+' CMS URL suggestions');
}else if(updated!==current){
 console.error('Stale CMS URL suggestions: run cd app && node scripts/sync-cms-url-options.mjs --write');
 process.exitCode=1;
}else console.log('CMS URL choices synchronized: '+choices.length);
