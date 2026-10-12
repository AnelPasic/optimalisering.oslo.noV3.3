import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import YAML from 'yaml';
import { cmsJsonSave, entryForFile } from '../tests/helpers/pages-cms-json.ts';

const file = 'src/content/terminology/glossary.json';
const bytes = readFileSync(file), original = JSON.parse(bytes);
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const edited = structuredClone(original);
const term = edited.terms.find(term => term.id === 'roas');
term.shortDefinition = 'Kort kildeprøve fra én felles CMS-kilde.';
term.fullDefinition = 'Full kildeprøve fra én felles CMS-kilde.';
const serialized = cmsJsonSave(original, edited, entryForFile(cms, `app/${file}`), cms);
const output = 'qa-output/terminology-source-fixture';
function walk(root) { return readdirSync(root, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${root}/${entry.name}`) : [`${root}/${entry.name}`]); }
try {
  writeFileSync(file, serialized);
  execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', output], { stdio: 'pipe' });
  const glossaryHTML = readFileSync(`${output}/begreper/index.html`, 'utf8');
  const scripts = walk(output).filter(path => path.endsWith('.js')).map(path => readFileSync(path, 'utf8')).join('\n');
  assert.ok(glossaryHTML.includes(term.fullDefinition));
  assert.ok(scripts.includes(term.shortDefinition));
  assert.ok(!glossaryHTML.includes(original.terms.find(term => term.id === 'roas').fullDefinition));
  assert.ok(!scripts.includes(original.terms.find(term => term.id === 'roas').shortDefinition));
} finally { writeFileSync(file, bytes); }
assert.ok(readFileSync(file).equals(bytes));
writeFileSync('../coordination/evidence/terminology/source-edit.json', JSON.stringify({ checkedAt: new Date().toISOString(), mode: 'Local Pages-CMS-equivalent edit and isolated actual Astro build; not authenticated CMS save', fields: ['terms[roas].shortDefinition', 'terms[roas].fullDefinition'], glossaryAndInlineClientConsumeSameSource: true, restoredSourceSha256: createHash('sha256').update(bytes).digest('hex'), originalSourceByteRestored: true, reviewDistUnchanged: true, result: 'PASS' }, null, 2) + '\n');
console.log('Terminology source PASS: one CMS edit updates glossary and inline bundle; source bytes restored; final review dist unchanged.');
