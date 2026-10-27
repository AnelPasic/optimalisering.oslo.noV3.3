import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
const run=(command,args,env)=>{
 const result=spawnSync(command,args,{encoding:'utf8',stdio:'pipe',env:env||process.env});
 if(result.status!==0)throw new Error(command+' failed: '+(result.stderr||result.stdout));
 return result.stdout.trim();
};
export function validatePilotPromotionPayload(payload,repo,ref,sha){
 if(payload?.source!=='pages-cms'||payload?.action?.name!=='promote-content-section')throw new Error('Unknown Pages CMS action');
 // GitHub repository and owner names are case-insensitive; stock Pages CMS lowercases them.
 const actionRepo=payload?.repository?.owner+'/'+payload?.repository?.repo;
 if(actionRepo.toLowerCase()!==repo.toLowerCase())throw new Error('Repository mismatch');
 if(payload.repository.ref!==ref||payload.repository.sha!==sha)throw new Error('Page action requires latest saved Git revision; reopen Pages CMS and retry');
 if(!['file','entry'].includes(payload.context?.type)||typeof payload.context?.path!=='string'||
     !/^app\/src\/content\/pages\/[a-z0-9-]+\.json$/.test(payload.context.path))throw new Error('Only page JSON editors can promote sections');
 const fields=payload.inputs||{};
 for(const field of ['section_id','global_id'])if(!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(fields[field]||''))throw new Error('Invalid '+field);
 if(typeof fields.global_name!=='string'||!fields.global_name.trim()||fields.global_name.length>100||/[\r\n]/.test(fields.global_name))throw new Error('Invalid name');
 if(!['copy','replace'].includes(fields.mode))throw new Error('Unknown promotion mode');
 return {page:payload.context.path.slice('app/src/content/pages/'.length),section:fields.section_id,id:fields.global_id,name:fields.global_name,mode:fields.mode};
}
if(process.argv[1]&&resolve(process.argv[1])===new URL(import.meta.url).pathname){
 if(!process.env.PAGES_ACTION_PAYLOAD||!process.env.GITHUB_REPOSITORY||!process.env.GITHUB_REF_NAME||!process.env.GITHUB_RUN_ID)throw new Error('Missing verified workflow context');
 const head=run('git',['rev-parse','HEAD']);
 const opts=validatePilotPromotionPayload(JSON.parse(process.env.PAGES_ACTION_PAYLOAD),process.env.GITHUB_REPOSITORY,process.env.GITHUB_REF_NAME,head);
 if(run('git',['status','--porcelain']))throw new Error('Working tree not clean');
 const branch='cms/global-copy-'+process.env.GITHUB_RUN_ID+'-'+opts.id;
 run('git',['switch','-c',branch]);
 run('node',['app/scripts/promote-local-section.mjs','--page',opts.page,'--section',opts.section,
   '--global-id',opts.id,'--name',opts.name,'--mode',opts.mode,'--write']);
 run('node',['app/scripts/sync-pilot-promoted.mjs','--write']);
 const targets=['app/src/content/global-promoted/'+opts.id+'.json','app/src/lib/promoted-global.generated.ts','.pages.yml'];
 if(opts.mode==='replace')targets.push('app/src/content/pages/'+opts.page);
 run('git',['add','--',...targets]);
 run('git',['diff','--cached','--check']);
 run('git',['-c','user.name=Medon CMS Actions','-c','user.email=actions@users.noreply.github.com','commit','-m','feat(cms): promote section '+opts.id]);
 run('git',['push','origin',branch]);
 const title='CMS: Global Innhold – '+opts.name+' ('+opts.mode+')';
 const body='Kilde: allerede lagret '+opts.page+', seksjon '+opts.section+'\nModus: '+opts.mode+
   '\n\nKontroller global kilde, anker, alle lenker, seksjonsdesign og eventuelt lokal plassering før merge. Automatisk deploy/publisering er ikke utført.';
 const ghEnv={...process.env,GH_TOKEN:process.env.GITHUB_TOKEN};
 console.log(run('gh',['pr','create','--base',process.env.GITHUB_REF_NAME,'--head',branch,'--title',title,'--body',body],ghEnv));
}
