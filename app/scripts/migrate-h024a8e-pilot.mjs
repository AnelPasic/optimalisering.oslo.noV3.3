// One-master preflight only. Do not migrate the remaining catalogue before native proof.
import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import YAML from 'yaml';
const out='../coordination/evidence/h024a8e';mkdirSync(out,{recursive:true});
const file='src/content/pages/home.json',bytes=readFileSync(file),home=JSON.parse(bytes);
if(home.sections.regneeksempel._block!=='calculator')throw new Error('Pilot already migrated or unexpected source');
const config=readFileSync('../.pages.yml','utf8'),cms=YAML.parse(config),editor=cms.content.find(e=>e.name==='homepage');
const originalField=editor.fields.find(f=>f.name==='sections').fields.find(f=>f.name==='regneeksempel');
writeFileSync(`${out}/incoming-home.json`,bytes);
writeFileSync(`${out}/incoming-home-editor.json`,JSON.stringify(editor,null,2));
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):`${p}/${e.name}`);
writeFileSync(`${out}/incoming-assets.json`,JSON.stringify(Object.fromEntries(walk('dist').map(p=>[p.slice(5),createHash('sha256').update(readFileSync(p)).digest('hex')])),null,2));
const master=home.sections.regneeksempel,{visibility,...payload}=master;
mkdirSync('src/content/global-elements',{recursive:true});
writeFileSync('src/content/global-elements/regneeksempel.json',JSON.stringify(payload,null,2));
home.sections.regneeksempel=[{_block:'global',element:'regneeksempel',uid:master.uid,...(visibility?{visibility}:{})}];
writeFileSync(file,JSON.stringify(home,null,2));
const referenceFields=[
 {name:'uid',type:'uuid',hidden:true,required:true,options:{editable:false,generate:false}},
 {name:'element',label:'Globalt element',type:'select',required:true,options:{values:[{name:'regneeksempel',label:'Konverteringskalkulator'}]}},
 {name:'visibility',label:'Visning på denne siden',component:'sectionVisibility'},
];
const placement={name:'regneeksempel',label:'Konverteringskalkulator – plassering',type:'block',description:'Innhold redigeres under Globale elementer → Konverteringskalkulator. Endring der gjelder alle bruk på dette nettstedet. Fjerning her sletter bare plasseringen, aldri originalinnholdet.',list:{max:1,collapsible:{collapsed:true,summary:'{element}'}},blocks:[{name:'global',label:'Globalt element',fields:referenceFields}]};
const library={name:'globalElements',label:'Globale elementer',type:'group',items:[{name:'globalCalculator',label:'Konverteringskalkulator',type:'file',path:'app/src/content/global-elements/regneeksempel.json',format:'json',operations:{create:false,rename:false,delete:false},fields:originalField.fields.filter(f=>f.name!=='visibility')}]};
const start=config.indexOf('          - name: regneeksempel\n')>=0?config.indexOf('          - name: regneeksempel\n'):config.indexOf('          - name: regneeksempel\r\n');
const tail=config.slice(start),next=tail.search(/\r?\n          - name: (?!regneeksempel)/);
if(start<0||next<0)throw new Error('Cannot locate calculator editor boundary');
const indent=s=>s.trimEnd().split('\n').map(l=>'          '+l).join('\n')+'\n';
const updated=config.slice(0,start)+indent(YAML.stringify([placement],{lineWidth:0}))+config.slice(start+next).replace(/^\r?\n/,'');
writeFileSync('../.pages.yml',updated.trimEnd()+'\n'+YAML.stringify([library],{lineWidth:0}).trimEnd().split('\n').map(l=>'  '+l).join('\n')+'\n');
