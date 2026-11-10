/** Shared, stable grouping for package service icons. A missing CMS group falls back by icon. */
export const SERVICE_GROUPS = ["Organisk Synlighet","Betalt Synlighet","Konverteringsoptimalisering","Systemer"] as const;
export type ServiceGroup = (typeof SERVICE_GROUPS)[number];
export type PackageServiceIcon = {icon:string; group?:ServiceGroup};
const fallbackGroup=(icon:string):ServiceGroup => {
  if(icon==='paid-search'||icon==='social-paid')return 'Betalt Synlighet';
  if(icon==='conversion'||icon==='page')return 'Konverteringsoptimalisering';
  if(icon==='analytics')return 'Systemer';
  return 'Organisk Synlighet';
};
export function groupPackageServices<T extends PackageServiceIcon>(items:readonly T[]){
  return SERVICE_GROUPS.map(label=>({label,items:items.filter(item=>(item.group??fallbackGroup(item.icon))===label)}))
    .filter(group=>group.items.length>0);
}
