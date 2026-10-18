import type {Loader} from 'astro/loaders';

/** A parsed page depends on more than its own JSON when it references masters. */
export function withContentDependencies(loader:Loader,dependencies:()=>unknown):Loader{
 return {...loader,name:`${loader.name}-with-content-dependencies`,async load(context){
  const dependencyData=dependencies();
  await loader.load({...context,generateDigest(data){
   return context.generateDigest({source:data,dependencies:dependencyData});
  }});
 }};
}
