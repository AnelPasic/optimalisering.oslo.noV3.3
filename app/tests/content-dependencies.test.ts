import test from 'node:test';
import assert from 'node:assert/strict';
import {withContentDependencies} from '../src/lib/content-dependencies.ts';

test('an unchanged page is reparsed when its external master changes, with stable caching otherwise',async()=>{
 let master='original',content='same-page';
 const digests:string[]=[];
 const loader={name:'fixture',async load(context:any){digests.push(context.generateDigest(content));}};
 const context={generateDigest:JSON.stringify} as any;
 const wrapped=withContentDependencies(loader,()=>master);
 await wrapped.load(context);await wrapped.load(context);
 assert.equal(digests[0],digests[1]);
 master='CMS edit';await wrapped.load(context);
 assert.notEqual(digests[2],digests[0],'master-only edit invalidates the parsed page');
 master='original';await wrapped.load(context);assert.equal(digests[3],digests[0]);
 content='page-edit';await wrapped.load(context);assert.notEqual(digests[4],digests[0]);
});
