import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve,join,sep,dirname,basename} from 'node:path';
import {randomUUID} from 'node:crypto';
const base=resolve(new URL('../',import.meta.url).pathname);
const pageDir=resolve(base,'src/content/pages'),globalDir=resolve(base,'src/content/global-promoted');
const arg=name=>{const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]:undefined;};
const idPattern=/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const protectedIds=new Set(['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal']);
const supported=new Set(['_block','id','uid','name','visibility','eyebrow','heading','headingAlign','layout','surface','body','items','links']);
const hrefValid=x=>{
 if(typeof x!=='string'||!x.trim()||/[\u0000-\u001f\u007f<>"\\\s]/.test(x))return false;
 if(x.startsWith('/'))return !x.startsWith('//');
 try{const u=new URL(x);return ['http:','https:'].includes(u.protocol)&&!u.username&&!u.password;}catch{return false;}
};
const shape={
 surface:new Set(['default','base','soft','mint','lavender','dark']),
 headingAlign:new Set(['center','left']),layout:new Set(['default','two-columns','three-columns','stacked']),
 boxVariant:new Set(['default','plain','card'])
};
function verifyLink(link,needLabel){
 if(!link||typeof link!=='object'||Array.isArray(link)||Object.keys(link).some(k=>!['label','href','suggestedHref'].includes(k)))throw new Error('Unsupported nested link data');
 if(needLabel&&(!link.label||typeof link.label!=='string'))throw new Error('Missing link label');
 if((link.href!==undefined&&!hrefValid(link.href))||(link.suggestedHref!==undefined&&link.suggestedHref!==''&&!hrefValid(link.suggestedHref)))throw new Error('Unsafe link in content');
}
export function planPilotPromotion(page,sectionId,globalId,globalName,mode,uid='00000000-0000-4000-8000-000000000001'){
 if(!['copy','replace'].includes(mode))throw new Error('Mode must be copy or replace');
 if(!idPattern.test(globalId)||protectedIds.has(globalId)||!idPattern.test(sectionId)||!globalName?.trim())throw new Error('Invalid or protected ID/name');
 if(!page||!Array.isArray(page.sections))throw new Error('Invalid page data');
 const indexes=page.sections.map((x,i)=>x?.id===sectionId?i:-1).filter(x=>x>=0);
 if(indexes.length!==1)throw new Error('Select one saved local content section');
 const source=page.sections[indexes[0]];
 if(source._block!=='content'||protectedIds.has(source.id)||source.globalElement)throw new Error('Only ordinary local content is promotable');
 if(Object.keys(source).some(key=>!supported.has(key)))throw new Error('Unsupported field in local block; refusing data loss');
 if(typeof source.heading!=='string'||!source.heading.trim()||!Array.isArray(source.body)||!source.body.every(p=>typeof p==='string'))throw new Error('Invalid section paragraphs');
 for(const key of ['surface','headingAlign','layout'])if(source[key]!=null&&!shape[key].has(source[key]))throw new Error('Invalid section layout or color');
 if(source.eyebrow!=null&&typeof source.eyebrow!=='string')throw new Error('Invalid eyebrow');
 if(source.visibility!=null&&source.visibility!=='hidden')throw new Error('Invalid visibility');
 for(const key of ['items','links'])if(source[key]!=null&&!Array.isArray(source[key]))throw new Error('Invalid nested content');
 for(const l of source.links||[])verifyLink(l,true);
 for(const item of source.items||[]){
  if(!item||Object.keys(item).some(k=>!['title','text','href','suggestedHref','label','boxVariant','surface'].includes(k))||
     typeof item.title!=='string'||typeof item.text!=='string')throw new Error('Invalid content item');
  if(item.href!==undefined||item.suggestedHref!==undefined)verifyLink({label:item.label||item.title,href:item.href,suggestedHref:item.suggestedHref},true);
  if(item.surface!=null&&!shape.surface.has(item.surface)||item.boxVariant!=null&&!shape.boxVariant.has(item.boxVariant))throw new Error('Unsupported box appearance');
 }
 const data=structuredClone(source),content=Object.fromEntries(Object.entries(data).filter(([k])=>!['_block','id','uid','name','visibility'].includes(k)));
 const global={_block:'content',uid,id:globalId,name:globalName.trim(),...content};
 const next=structuredClone(page);
 if(mode==='replace')next.sections[indexes[0]]={_block:'global',element:globalId,id:sectionId,...(source.visibility?{visibility:source.visibility}:{})};
 return {global,page:next,source};
}
if(process.argv[1]&&resolve(process.argv[1])===new URL(import.meta.url).pathname){
 const name=arg('--page'),id=arg('--section'),newId=arg('--global-id'),globalName=arg('--name'),mode=arg('--mode')??'copy';
 if(!name||!id||!newId||!globalName||!/^[-a-z0-9]+\.json$/.test(name))throw new Error('Missing/invalid promotion arguments');
 const pageFile=resolve(pageDir,name),masterFile=resolve(globalDir,newId+'.json');
 if(!pageFile.startsWith(pageDir+sep)||!masterFile.startsWith(globalDir+sep)||!existsSync(pageFile)||existsSync(masterFile))throw new Error('Invalid/missing page or existing global ID');
 const page=JSON.parse(readFileSync(pageFile,'utf8'));
 const planned=planPilotPromotion(page,id,newId,globalName,mode,randomUUID());
 if(process.argv.includes('--write')){
  mkdirSync(globalDir,{recursive:true});
  writeFileSync(masterFile,JSON.stringify(planned.global,null,2)+'\n',{flag:'wx'});
  if(mode==='replace')writeFileSync(pageFile,JSON.stringify(planned.page,null,2)+'\n');
 }
 console.log(JSON.stringify({page:name,section:id,global:newId,mode,write:process.argv.includes('--write')}));
}
