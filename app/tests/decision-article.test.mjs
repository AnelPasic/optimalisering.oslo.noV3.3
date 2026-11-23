import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const article=JSON.parse(readFileSync('src/content/pages/managed-articles/innsikt-hva-bor-optimaliseres-forst.json','utf8'));
const source=readFileSync('src/components/DecisionGrowthChart.astro','utf8');
test('decision guide retains existing public slug and three priorities',()=>{
 assert.equal(article.slug,'innsikt/hva-bor-optimaliseres-forst');
 assert.equal(article.kind,'article');
 assert.match(article.hero.title,/Synlighet, konvertering eller tilbud/);
 assert.equal(article.sections[0].items.length,3);
 assert.equal(article.sections[1].items.length,2);
 assert.equal(article.sections[2].surface,'neutral');
});
test('regneeksempel is consistent and does not promise a result',()=>{
 assert.equal(1500*.01,15);assert.equal(3000*.01,30);
 assert.equal(1500*.02,30);assert.equal(3000*.02,60);
 assert.match(source,/leads: 15/);assert.equal((source.match(/leads: 30/g)||[]).length,2);
 assert.match(source,/leads: 60/);
 assert.match(article.sections[1].afterCards.join(' '),/ikke automatisk billigere/);
 assert.match(article.sections[2].body.join(' '),/ikke en prognose/);
});
test('scoped custom layout and no new tracking',()=>{
 const hero=readFileSync('src/components/CommercialHero.astro','utf8');
 const inner=readFileSync('src/components/InnerPage.astro','utf8');
 assert.match(inner,/isDecisionArticle && section.id === 'kombinasjon'/);
 assert.match(inner,/data-decision-article/);
 assert.match(hero,/decisionSplit/);
 assert.match(source,/max-width:650px/);
 assert.doesNotMatch(source,/oaiq|pixelId|localStorage|cookie-banner/i);
});
