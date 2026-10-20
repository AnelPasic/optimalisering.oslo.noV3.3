import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { visibleServiceSections } from '../src/lib/service-sections.ts';
import { cmsJsonSave, entryForFile, resolveField } from './helpers/pages-cms-json.ts';

const source = JSON.parse(readFileSync('src/content/pages/synlighet.json', 'utf8'));
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const local = () => ({ _block: 'content', id: 'cms-pilot-test', heading: 'CMS-pilot', body: ['Kun test.'] });

test('Synlighet defaults retain every section and ordinary visibility preserves identity, text and ordering', () => {
  const page = structuredClone(source);
  page.sections.splice(1, 0, { ...local(), visibility: 'hidden' });
  const parsed = pageSchema.parse(page);
  assert.deepEqual(visibleServiceSections(parsed).map(s => s.id), source.sections.map((s: any) => s.id));
  assert.deepEqual(parsed.sections[1].body, ['Kun test.']);
  delete page.sections[1].visibility;
  page.sections.push(page.sections.splice(1, 1)[0]);
  assert.equal(visibleServiceSections(pageSchema.parse(page)).at(-1)?.id, 'cms-pilot-test');
  assert.deepEqual(visibleServiceSections(pageSchema.parse(source)), pageSchema.parse(source).sections);
  const other = { slug: 'konvertering', sections: [{ id: 'unchanged', visibility: 'hidden' as const }] };
  assert.equal(visibleServiceSections(other), other.sections, 'no rollout to another service');
});

test('protected CTA, proof and pricing anchors cannot disappear or be hidden', () => {
  for (const id of ['sjekk', 'prioritering', 'sammenheng']) {
    for (const operation of ['hide', 'remove', 'duplicate']) {
      const page = structuredClone(source), section = page.sections.find((s: any) => s.id === id);
      if (operation === 'hide') section.visibility = 'hidden';
      if (operation === 'remove') page.sections = page.sections.filter((s: any) => s.id !== id);
      if (operation === 'duplicate') page.sections.push(structuredClone(section));
      assert.equal(pageSchema.safeParse(page).success, false, `${id}: ${operation}`);
    }
  }
});

test('ordinary hide/remove is safe while duplicate, reserved and invalid anchors and visibility are rejected', () => {
  for (const id of ['kanaler', 'behov']) {
    const page = structuredClone(source);
    page.sections.find((s: any) => s.id === id).visibility = 'hidden';
    assert.ok(!visibleServiceSections(pageSchema.parse(page)).some(s => s.id === id));
  }
  const page = structuredClone(source);
  page.sections.push(local());
  assert.equal(pageSchema.safeParse(page).success, true);
  page.sections.pop();
  assert.equal(pageSchema.safeParse(page).success, true);
  for (const id of ['kanaler', 'hero', 'service-hero', 'resultater', 'service-priser', 'sporsmal', '', 'a b', 'x" onload="x']) {
    const invalid = structuredClone(source); invalid.sections.push({ ...local(), id });
    assert.equal(pageSchema.safeParse(invalid).success, false, id);
  }
  const invalid = structuredClone(source); invalid.sections.push({ ...local(), visibility: 'raw-css' });
  assert.equal(pageSchema.safeParse(invalid).success, false);
});

test('pilot editor reuses all service fields, adds native visibility and writable validated local anchors only here', () => {
  const entry = entryForFile(cms, 'app/src/content/pages/synlighet.json');
  const group = cms.content.find((e: any) => e.name === 'serviceGroup');
  assert.equal(group?.type, 'group');
  const services = group.items.find((e: any) => e.name === 'services');
  const pilot = group.items.find((e: any) => e.name === 'serviceSynlighet');
  assert.equal(services?.label, 'Øvrige tjenester');
  assert.equal(pilot?.label, 'Synlighet');
  assert.equal(pilot?.path, 'app/src/content/pages/synlighet.json');
  assert.equal(entry.type, 'file');
  assert.ok(services.exclude.includes('synlighet.json'));
  for (const field of services.fields.filter((f: any) => f.name !== 'sections')) assert.deepEqual(entry.fields.find((f: any) => f.name === field.name), field);
  const sections = entry.fields.find((f: any) => f.name === 'sections');
  const content = resolveField(sections.blocks.find((b: any) => b.name === 'content'), cms.components);
  assert.equal(content.fields.find((f: any) => f.name === 'id').readonly, undefined);
  assert.ok(content.fields.find((f: any) => f.name === 'id').pattern);
  assert.ok(content.fields.find((f: any) => f.name === 'visibility'));
  assert.ok(!cms.components.sectionContent.fields.some((f: any) => f.name === 'visibility'));
  assert.ok(!cms.components.sectionProtected.fields.some((f: any) => f.name === 'visibility'));
  const form = structuredClone(source); form.sections.push({ ...local(), visibility: 'hidden' });
  const saved = JSON.parse(cmsJsonSave(source, form, entry, cms));
  assert.deepEqual(saved, form);
  assert.ok(pageSchema.safeParse(saved).success);
});

test('page-owned links cannot become orphaned by hiding or removing a local target', () => {
  const page = structuredClone(source);
  page.sections.push(local());
  page.cta.href = '/synlighet/#cms-pilot-test';
  assert.ok(pageSchema.safeParse(page).success);
  page.sections.at(-1).visibility = 'hidden';
  assert.equal(pageSchema.safeParse(page).success, false);
  page.sections.pop();
  assert.equal(pageSchema.safeParse(page).success, false);
});
