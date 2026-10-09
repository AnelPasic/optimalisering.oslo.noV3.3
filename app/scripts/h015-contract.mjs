import { readFileSync } from 'node:fs';
export function getH015Captions() {
  const contract=readFileSync('../coordination/H015-PRICING-VISUAL-POLISH.md','utf8').replaceAll('\r\n','\n');
  return ['Optimalisering','Vekst','Partner'].map(title=>{
    const section=contract.split(`### ${title}`)[1].split(/\n### |\n## /)[0];
    return { label:section.match(/Optional micro-label[^\n]*\n> (.*)/)[1], support:section.match(/Optional support:\n> (.*)/)[1] };
  });
}
