// Explicit one-time D-098 source/editor migration; never a build/save hook.
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import YAML from 'yaml';
const file='src/content/pages/home.json',home=JSON.parse(readFileSync(file,'utf8'));
assert.ok(Array.isArray(home.sections),'Run only on the pre-migration source');
const blocks=home.sections,order=blocks.map(b=>b.id);
assert.deepEqual(order,['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal']);
const text=readFileSync('../.pages.yml','utf8').replaceAll('\r\n','\n'),cms=YAML.parse(text),entry=cms.content.find(c=>c.name==='homepage');
const old=entry.fields.find(f=>f.name==='sections'),definition=type=>old.blocks.find(b=>b.name===type);
cms.components.sectionVisibility={type:'select',options:{placeholder:'Publisert',values:[{name:'',label:'Publisert'},{name:'hidden',label:'Skjult – behold i CMS'}]}};
const visibility=(locked=false)=>({name:'visibility',label:'Visning på nettsiden',component:'sectionVisibility',...(locked?{readonly:true,description:'Publisert: eksisterende lenker peker hit. Skjuling krever en egen godkjent løsning for lenkemål.'}:{description:'Publisert er standard. Skjult beholder hele seksjonen i CMS, men fjerner den fra alle offentlige seksjonseksempler og forsiden.'})});
const identity=type=>({name:'_block',type:'string',hidden:true,readonly:true,default:type,required:true});
const fixed={name:'sections',label:'Faste seksjoner',type:'object',description:'De åtte originalene beholdes i fast rekkefølge. Rediger innhold og visning her. Nye seksjoner legges til nedenfor med Før/Etter-plassering; bare ekstraseksjoner kan dras og slettes.',fields:blocks.map(block=>({name:block.id,label:block.name,type:'object',required:true,fields:[identity(block._block),visibility(['sjekk','priser'].includes(block.id)),...structuredClone(definition(block._block).fields).map(field=>['uid','id'].includes(field.name)?{...field,readonly:true}:field)]}))};
const ordinary=structuredClone(definition('content').fields);
for(const f of ordinary){if(f.name==='uid'){f.readonly=true;f.options={editable:false,generate:true};}if(f.name==='id'){f.pattern='^(?!(?:'+order.concat(['skjema','main','mobile-menu','site-menu','order-package','website','email','message']).join('|')+')$)(?!(?:calc-|scenario-|package-home-|term-))[a-z0-9]+(?:-[a-z0-9]+)*$';f.description='Unikt lenkeanker med små bokstaver og bindestrek, for eksempel nyttig-informasjon. Behold ankeret ved flytting.';}}
const optional={name:'optionalSections',label:'Ekstraseksjoner',type:'object',list:{max:16,collapsible:{collapsed:true,summary:'{name} · {placement} {visibility}'}},description:'Bare vanlige innholdsseksjoner. Før/Etter bestemmer plasseringen på siden, også når målseksjonen er skjult. Dra for å ordne ekstraseksjoner med samme plassering. Skjulte beholdes her.',fields:[identity('content'),visibility(),{name:'placement',label:'Plassering på siden',type:'select',default:'before:regneeksempel',required:true,options:{values:blocks.flatMap(b=>[{name:`before:${b.id}`,label:`Før ${b.name}`},{name:`after:${b.id}`,label:`Etter ${b.name}`}])}},...ordinary]};
const start=text.indexOf('      - name: sections',text.indexOf('  - name: homepage'));
const end=text.indexOf('      - name: homepage\n',start);
assert.ok(start>=0&&end>start);
const segment=YAML.stringify([fixed,optional],{lineWidth:0}).split('\n').filter((l,i,a)=>i<a.length-1||l).map(l=>'      '+l).join('\n')+'\n';
const component=YAML.stringify({sectionVisibility:cms.components.sectionVisibility},{lineWidth:0}).split('\n').filter(Boolean).map(l=>'  '+l).join('\n')+'\n';
writeFileSync('../.pages.yml',(text.slice(0,start)+segment+text.slice(end)).replace('components:\n','components:\n'+component));
home.sections=Object.fromEntries(blocks.map(b=>[b.id,b]));
assert.deepEqual(Object.values(home.sections),blocks);
writeFileSync(file,JSON.stringify(home,null,2));
console.log('H024A8B explicit migration: eight records/values/order retained; fixed objects + one optional content list; no visibility materialized.');
