import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import YAML from 'yaml';
const out='../coordination/evidence/h024a8e',file='src/content/pages/home.json';
const home=JSON.parse(readFileSync(file)),cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
if(Array.isArray(home.sections))throw new Error('Already migrated');
const original=JSON.parse(readFileSync(`${out}/incoming-home.json`)),editor=cms.content.find(e=>e.name==='homepage');
const fields=editor.fields.find(f=>f.name==='sections').fields;
const ids=['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal'];
const labels={behov:'Behovsvelger',regneeksempel:'Konverteringskalkulator',sjekk:'Gratis sjekk / kontaktskjema',priser:'Pakker og priser',resultater:'Kunderesultater',mekanisme:'Slik jobber vi',passer:'Hvem det passer for',sporsmal:'Ofte stilte spørsmål'};
const names={behov:'globalSelector',regneeksempel:'globalCalculator',sjekk:'globalAssessment',priser:'globalPackages',resultater:'globalProof',mekanisme:'globalMechanism',passer:'globalFit',sporsmal:'globalFaq'};
const library=cms.content.find(e=>e.name==='globalElements');
const previousLibrary=structuredClone(library.items);
const placements=[],masters=[];
for(const id of ids){
 const current=id==='regneeksempel'?JSON.parse(readFileSync(`src/content/global-elements/${id}.json`)):home.sections[id];
 const {visibility,...master}=current;
 assert.deepEqual(master,Object.fromEntries(Object.entries(original.sections[id]).filter(([key])=>key!=='visibility')),'Unexpected OWNER source change: '+id);
 writeFileSync(`src/content/global-elements/${id}.json`,JSON.stringify(master,null,2));masters.push({id,uid:master.uid});
 const definition=id==='regneeksempel'?previousLibrary.find(e=>e.name==='globalCalculator'):fields.find(f=>f.name===id);
 const masterFields=structuredClone(definition.fields.filter(f=>f.name!=='visibility'));
 const first=masterFields.find(f=>!f.hidden);if(first)first.description='Endringer her gjelder alle plasseringer på dette nettstedet. Fjern eller skjul en plassering på siden for å beholde originalinnholdet her.';
 const entry={name:names[id],label:labels[id],type:'file',path:`app/src/content/global-elements/${id}.json`,format:'json',operations:{create:false,rename:false,delete:false},fields:masterFields};
 if(id==='behov')library.items=[];library.items.push(entry);
 placements.push({_block:'global',element:id,...(visibility?{visibility}:{})});
}
const top=[],bottom=[];
for(const item of home.optionalSections??[]){
 const {placement,...content}=item;
 if(placement==='before:behov')top.push(content);else if(placement==='after:sporsmal')bottom.push(content);else throw new Error(`OWNER placement choice required: ${item.id} ${placement}`);
}
assert.deepEqual(home.optionalSections,original.optionalSections,'Preserve actual OWNER optional content');
writeFileSync(`${out}/pre-library-home.json`,JSON.stringify(home,null,2));
const {sections,optionalSections,...base}=home;
writeFileSync(file,JSON.stringify({...base,...(top.length?{topSections:top}:{}),sections:placements,...(bottom.length?{bottomSections:bottom}:{})},null,2));
const contentFields=editor.fields.find(f=>f.name==='optionalSections').fields.filter(f=>!['_block','placement'].includes(f.name));
const referenceFields=[{name:'element',label:'Globalt element',type:'select',required:true,options:{values:ids.map(name=>({name,label:labels[name]}))}},{name:'visibility',label:'Visning på denne siden',component:'sectionVisibility',description:'Fjerning sletter bare plasseringen. Eksisterende lenker til #sjekk og #priser må få et gyldig mål før disse skjules eller fjernes.'}];
const zones=[['topSections','Valgfrie seksjoner Topp'],['sections','Hovedseksjoner'],['bottomSections','Valgfrie seksjoner Bunn']].map(([name,label])=>({name,label,type:'block',blockKey:'_block',description:'Dra for å sortere innenfor gruppen. Globalt innhold redigeres under Globale elementer og brukes på tvers av dette nettstedet. Fjern her betyr fjern fra denne siden, ikke slett originalen. Vanlig innhold redigeres i raden.',list:{max:name==='sections'?24:16,collapsible:{collapsed:true,summary:'{element}{name}'}},blocks:[{name:'global',label:'Globalt element',fields:referenceFields},{name:'content',label:'Innholdsseksjon',fields:contentFields}]}));
const index=editor.fields.findIndex(f=>f.name==='sections');editor.fields.splice(index,2,...zones);
cms.components.sectionContent.fields.find(f=>f.name==='body').description='Avsnitt i denne seksjonen. Felles pakketekster og priser redigeres under Globale elementer → Pakker og priser.';
writeFileSync('../.pages.yml',YAML.stringify(cms,{lineWidth:0}));
writeFileSync(`${out}/library-migration.json`,JSON.stringify({masters,allOriginalValuesAndUidsPreserved:true,ownerInsertPreserved:true,mainOrder:placements.map(p=>p.element),top:top.map(p=>p.id),bottom:bottom.map(p=>p.id),referenceIdentity:'Stable element ID. Master UUID retained only in master, not duplicated in page references.',dataModel:'Eight preserved masters, zero required page instances.'},null,2));
