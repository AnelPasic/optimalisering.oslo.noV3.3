import {z} from 'astro/zod';
import {heroSchema} from './home-builder.ts';
import {heroLayoutSchema,heroPresentationSchema} from './hero-presentation.ts';
import {resolveRouteFamily} from './route-family.ts';
import {resolveServiceVisual,type ServiceVisual} from './service-visual.ts';
import {synlighetHeroSchema} from './synlighet-hero.ts';

const link=z.object({label:z.string().trim().min(1),href:z.string().startsWith('/')}).strict();
const image=z.object({src:z.string().regex(/^\/images\/(?:home|services)\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif|svg)$/),alt:z.string(),positionX:z.number().min(0).max(100),positionY:z.number().min(0).max(100),kind:z.enum(['photo','illustration']),origin:z.enum(['home','page'])}).strict();
export const heroViewSchema=z.object({
 family:z.enum(['home','service','pricing','index','article','assessment','utility','glossary','error']),layout:heroLayoutSchema,
 eyebrow:z.string(),title:z.string().trim().min(1),support:z.string(),primaryCta:link.optional(),secondaryCta:link.optional(),
 visual:z.discriminatedUnion('kind',[z.object({kind:z.literal('none')}).strict(),z.object({kind:z.literal('image'),image}).strict()]),
 titleEmphasis:z.enum(['none','first-sentence']).default('none'),
 breadcrumbs:z.array(z.object({label:z.string(),href:z.string().startsWith('/').optional()}).strict()).default([]),
}).strict().transform(({layout,...view})=>({
 ...view,layout:layout==='centered-none'?'centered' as const:layout,
 // Presentation only: saved image/crop/alt and proof authority remain untouched.
 visual:layout==='centered-none'?{kind:'none' as const}:view.visual,
}));
export type HeroView=z.infer<typeof heroViewSchema>;
type Source={slug?:string;kind:string;hero?:unknown;eyebrow?:string;title?:string;intro?:string;cta?:{label:string;href:string};heroVisual?:ServiceVisual;composition?:unknown;proof?:unknown;sections:{id:string;links?:{label:string;href:string}[]}[]};
type Commercial={packages:{eyebrow:string;heading:string;intro:string}};
/** One-way adapters project existing owned content; no second editable source. */
export function resolvePageHero(page:Source,commercial?:Commercial):HeroView{
 const route=resolveRouteFamily(page);
 if(route.family==='home'){
  const hero=heroSchema.parse(page.hero);
  return heroViewSchema.parse({...hero,family:'home',visual:hero.visual.kind==='image'?{kind:'image',image:{...hero.visual.image,alt:'',kind:'photo',origin:'home'}}:{kind:'none'}});
 }
 if(page.slug==='synlighet'&&page.hero&&typeof page.hero==='object'&&'primaryCta' in page.hero){
  const hero=synlighetHeroSchema.parse(page.hero),media=hero.visual.image?resolveServiceVisual(hero.visual.image):undefined;
  return heroViewSchema.parse({...hero,family:'service',visual:hero.visual.kind==='image'&&media?{kind:'image',image:{...media,origin:'page'}}:{kind:'none'},breadcrumbs:[{label:'Forsiden',href:'/'},{label:route.service.pricingBridge?.serviceName??hero.eyebrow}]});
 }
 const layout=heroPresentationSchema.parse(page.hero??{}).layout;
 const media=resolveServiceVisual(page.heroVisual),family=route.family;
 const copy=family==='pricing'?commercial?.packages:undefined;
 if(family==='pricing'&&!copy)throw new Error('Pricing Hero requires the shared Packages source');
 const crumbs=family==='pricing'?[]:[{label:'Forsiden',href:'/'},...(family==='article'?[{label:'Innsikt',href:'/innsikt/'}]:[]),{label:family==='service'?(route.service.pricingBridge?.serviceName??page.eyebrow):page.eyebrow}];
 return heroViewSchema.parse({family,layout,eyebrow:copy?.eyebrow??page.eyebrow,title:copy?.heading??page.title,support:copy?.intro??page.intro,primaryCta:family==='assessment'?undefined:page.cta,secondaryCta:family==='service'&&route.service.pricingBridge?{label:'Se priser',href:route.service.pricingBridge.link.href}:undefined,visual:media?{kind:'image',image:{...media,origin:'page'}}:{kind:'none'},breadcrumbs:crumbs});
}
export function resolveGlossaryHero(content:{title:string;intro:string;hero?:unknown}):HeroView{
 return heroViewSchema.parse({family:'glossary',layout:heroPresentationSchema.parse(content.hero??{}).layout,eyebrow:'Ordbok for normale mennesker',title:content.title,support:content.intro,visual:{kind:'none'}});
}
export function resolveNotFoundHero(presentation:unknown):HeroView{
 return heroViewSchema.parse({family:'error',layout:heroPresentationSchema.parse(presentation).layout,eyebrow:'404 · Siden finnes ikke',title:'Her var det\ningen vei videre.',support:'Gå til forsiden, eller finn tjenesten du trenger.',primaryCta:{label:'Til forsiden',href:'/'},visual:{kind:'none'}});
}
