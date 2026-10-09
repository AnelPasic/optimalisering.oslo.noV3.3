import { readFileSync } from 'node:fs';
// Read the authoritative handoff rather than maintaining another offer source.
export function getH014Compact() {
  const contract = readFileSync('../coordination/H014-COMPACT-PRICING.md', 'utf8').replaceAll('\r\n', '\n');
  return ['Optimalisering', 'Vekst', 'Partner'].map(title => {
    const section = contract.split(`### ${title}`)[1].split(/\n## /)[0].split(/\n### /)[0];
    const bullets = heading => section.split(heading)[1].split(/\n\n/)[0].split(/\r?\n/).filter(line => line.startsWith('- ')).map(line => line.slice(2));
    return { fit: section.match(/Visible fit:\s*> (.*)/)[1].trim(), situations: bullets('Visible situations:\n'), iconLabels: bullets(title === 'Vekst' ? 'Visible icon/combo items:\n' : 'Visible icon items:\n') };
  });
}
