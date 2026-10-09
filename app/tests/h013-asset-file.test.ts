import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync,mkdirSync,writeFileSync,rmSync } from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,sep} from 'node:path';
import {resolvePackageAsset} from '../src/lib/package-visual.ts';
test('package assets resolve only existing dedicated files with meaningful alt and missing-file fallback',()=>{
  const root=mkdtempSync(join(tmpdir(),'h013-pricing-'));
  const asset={src:'/images/pricing/concept.svg',alt:'Conceptual movement'};
  try {
    assert.equal(resolvePackageAsset(undefined,root),undefined);
    assert.equal(resolvePackageAsset(asset,root),undefined);
    mkdirSync(join(root,'images/pricing'),{recursive:true});
    writeFileSync(join(root,'images/pricing/concept.svg'),'<svg xmlns="http://www.w3.org/2000/svg"/>');
    assert.deepEqual(resolvePackageAsset(asset,root),asset);
    for(const src of ['/images/home/hero-customer.webp','/images/pricing/../a.svg','https://example.test/a.svg']) assert.equal(resolvePackageAsset({...asset,src},root),undefined);
    assert.equal(resolvePackageAsset({...asset,alt:''},root),undefined);
  } finally {assert.ok(resolve(root).startsWith(resolve(tmpdir())+sep));rmSync(root,{recursive:true,force:true});}
});
