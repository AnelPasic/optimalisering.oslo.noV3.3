import { readdirSync } from 'node:fs';
import { getPublishableCases } from '../src/lib/proof.ts';
import { resolvePageList } from '../src/lib/page-list.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { cardDecorationSchema, badgeClasses } from '../src/lib/card-decoration.ts';
import { PHOSPHOR_ICON_NAMES } from '../src/lib/phosphor-icon-names.ts';

const read = path => readFileSync(path, 'utf8');
const cms = YAML.parse(read('../.pages.yml'));

test('card icon names use the full installed catalog and badge classes are allowlisted', () => {
  assert.ok(PHOSPHOR_ICON_NAMES.length > 1000);
  assert.deepEqual(cms.components.cardBadgeClass.options.values.map(option => option.name), [...badgeClasses]);
  for (const iconName of ['lightning', 'map-pin', 'meta-logo', 'anchor-simple']) {
    assert.equal(cardDecorationSchema.parse({iconName}).iconName, iconName);
  }
  assert.equal(cardDecorationSchema.parse({iconName:' ', badge:'', badgeClass:null}).badge, undefined);
  assert.equal(cardDecorationSchema.safeParse({iconName:'../../asset'}).success, false);
  assert.equal(cardDecorationSchema.safeParse({iconName:'not-a-phosphor-icon'}).success, false);
  assert.equal(cardDecorationSchema.safeParse({badgeClass:'badge-success hidden'}).success, false);
});

test('manual URL cards retain their CMS badge and icon through the PageList resolver', () => {
  const entry = {_block:'url', href:'/om/', title:'Eksempel', iconName:'lightning', badge:'Valgt', badgeClass:'badge-warning'};
  const [item] = resolvePageList({mode:'manual',entries:[entry]},[]);
  assert.equal(item.iconName,entry.iconName);
  assert.equal(item.badge,entry.badge);
  assert.equal(item.badgeClass,entry.badgeClass);
  assert.equal(item.href,entry.href);
});

test('approved cases can have card decorations and anonymized cases suppress them', () => {
  const cases = readdirSync('src/content/proof').filter(file=>file.endsWith('.json')).map(file=>JSON.parse(read('src/content/proof/'+file)));
  const slot = record => ({publicationApproved:true,caseIds:[record.id]});
  const approved = cases.find(record=>['GRANTED','NAME_APPROVED'].includes(record.namingPermission)&&getPublishableCases(slot(record),[record]).length===1);
  assert.ok(approved, 'Need a public fixture from the existing case catalog');
  const decorated = {...approved, iconName:'lightning', badge:'Eksempel', badgeClass:'badge-success'};
  const [named] = getPublishableCases(slot(decorated),[decorated]);
  assert.equal(named.iconName,'lightning');
  assert.equal(named.badge,'Eksempel');
  const anonymous = {...decorated, clientName:'Fixture Private Name', namingPermission:'ANONYMIZED_APPROVED', anonymizedLabel:'Anonymisert kunde'};
  const [publicCase] = getPublishableCases(slot(anonymous),[anonymous]);
  assert.equal(publicCase.displayName,'Anonymisert kunde');
  assert.equal(publicCase.badge,undefined);
  assert.equal(publicCase.iconName,undefined);
  assert.deepEqual(getPublishableCases(slot(decorated),[{...decorated,publicationApproved:false}]),[]);
});
