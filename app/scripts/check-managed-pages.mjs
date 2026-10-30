import {readFileSync,readdirSync} from 'node:fs';
import {join,basename} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../src/content/pages/',import.meta.url));
const definitions=[
 {folder:'managed-services',kind:'service',slug:/^[a-z0-9]+(?:-[a-z0-9]+)*$/,file:(s)=>s+'.json'},
 {folder:'managed-articles',kind:'article',slug:/^innsikt\/[a-z0-9]+(?:-[a-z0-9]+)*$/,file:(s)=>s.replace('/', '-')+'.json'}
];
const validText=(v)=>typeof v==='string'&&v.trim().length>0;
const reserved=new Set(['home','404','begreper','design-system','sitemap.xml']);

export function checkManagedPages(base=root){
 const seen=new Set(),files=[];
 const rootFiles=readdirSync(base,{withFileTypes:true}).filter(d=>d.isFile()&&d.name.endsWith('.json'));
 for(const f of rootFiles){
  const p=JSON.parse(readFileSync(join(base,f.name),'utf8'));
  if(seen.has(p.slug))throw new Error('Duplicate canonical slug: '+p.slug);
  seen.add(p.slug);
 }
 for(const def of definitions){
  for(const file of readdirSync(join(base,def.folder),{withFileTypes:true})){
   if(!file.isFile()||!file.name.endsWith('.json'))continue;
   const path=join(base,def.folder,file.name),p=JSON.parse(readFileSync(path,'utf8'));
   if(p.kind!==def.kind)throw new Error('Wrong page kind in '+path);
   if(!def.slug.test(p.slug)||reserved.has(p.slug)||p.slug.includes('//'))throw new Error('Invalid managed slug '+p.slug);
   if(file.name!==def.file(p.slug))throw new Error('Filename/slug mismatch '+path+' -> '+p.slug);
   if(seen.has(p.slug))throw new Error('Duplicate canonical slug: '+p.slug);
   if(!validText(p.seo?.title)||!validText(p.seo?.description)||!validText(p.hero?.title)||!validText(p.hero?.support)||!Array.isArray(p.sections))throw new Error('Missing SEO/Hero/sections in '+path);
   // No invented editorial statuses in a site where all pages are treated as live.
   if('status' in p||'authority' in p)throw new Error('Obsolete approval status in '+path);
   seen.add(p.slug);files.push(path);
  }
 }
 return {slugs:seen,managedFiles:files};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 const result=checkManagedPages();
 console.log('CONTENT-06: '+result.managedFiles.length+' managed pages, '+result.slugs.size+' unique public slugs');
}
