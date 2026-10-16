import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const baseline=JSON.parse(readFileSync('../coordination/evidence/h025/preservation.json'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const records=baseline.records.map(record=>{
 const bytes=readFileSync('../'+record.file),sha256=hash(bytes),byteExact=sha256===record.sha256;
 if(!byteExact){assert.ok(['app/src/content/pages/synlighet.json','app/src/content/pages/priser.json'].includes(record.file),'Unexpected protected change: '+record.file);const original=JSON.parse(execFileSync('git',['show',`${baseline.incoming}:${record.file}`],{encoding:'utf8'}));const restored=JSON.parse(bytes);assert.deepEqual(restored.hero,{layout:'split-right'});delete restored.hero;assert.deepEqual(restored,original,'All original data preserved: '+record.file);}
 return {...record,currentSha256:sha256,byteExact,onlyNewExplicitDefault:!byteExact};
});
const ownerImages=baseline.ownerImages.map(record=>{assert.equal(hash(readFileSync('../'+record.file)),record.sha256);return {...record,byteExact:true};});
writeFileSync('../coordination/evidence/h025/final-preservation.json',JSON.stringify({incoming:baseline.incoming,commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),records,ownerImages},null,2)+'\n');
console.log(`H-025 preservation PASS: ${records.filter(r=>r.byteExact).length}/${records.length} protected files byte-exact; only ${records.filter(r=>!r.byteExact).length} new CMS Standard layout fields, all original data exact; ${ownerImages.length} OWNER PNGs byte-exact.`);
