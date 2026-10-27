import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
const root=resolve(new URL('../',import.meta.url).pathname);
const arg=name=>{const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]:undefined;};
const config=resolve(arg('--config')??join(root,'../.pages.yml'));
const folder=resolve(arg('--pages')??join(root,'src/content/pages'));
const shortcuts=JSON.parse(readFileSync(resolve(arg('--shortcuts')??join(root,'src/content/link-shortcuts.json')),'utf8'));
const pages=readdirSync(folder).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(join(folder,f),'utf8')));
const options=[];
const slugPattern=/^(?:home|[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?)$/;
for(const page of pages){
  if(!slugPattern.test(page.slug)||page.slug.includes('//')||!page.seo?.title?.trim())throw new Error('Invalid CMS page slug/SEO title');
  const href=page.slug==='home'?'/':'/'+page.slug+'/';
  options.push({href,label:page.seo.title+' — '+href});
}
for(const row of shortcuts){
  if(!row.title?.trim()||typeof row.href!=='string'||!/^\/(?!\/|\\)[^<>"\s]*$/.test(row.href))throw new Error('Invalid shortcut');
  options.push({href:row.href,label:row.title+' — '+row.href});
}
if(new Set(options.map(x=>x.href)).size!==options.length)throw new Error('Duplicate selectable URL');
options.sort((a,b)=>a.href.localeCompare(b.href,'nb'));
const raw=readFileSync(config,'utf8'), start='# PILOT_URL_CHOICES_BEGIN',end='# PILOT_URL_CHOICES_END';
if(raw.split(start).length!==2||raw.split(end).length!==2)throw new Error('URL marker missing or duplicated');
const pos=raw.indexOf(start)+start.length,finish=raw.indexOf(end);
if(finish<pos)throw new Error('URL markers reversed');
const rows=options.map(x=>'        - name: '+JSON.stringify(x.href)+'\n          label: '+JSON.stringify(x.label)).join('\n');
const result=raw.slice(0,pos)+'\n'+rows+'\n'+raw.slice(finish);
if(process.argv.includes('--write')){
 if(raw!==result)writeFileSync(config,result);
 console.log('Generated '+options.length+' selectable URLs');
}else if(result!==raw){
 console.error('CMS URL selector stale; run node scripts/sync-cms-url-options.mjs --write');
 process.exitCode=1;
}else console.log('CMS URL selector matches '+options.length+' page/shortcut links');
