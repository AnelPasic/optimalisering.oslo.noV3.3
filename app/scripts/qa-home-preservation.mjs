import { createHash } from 'node:crypto';

// Compare the rendered lower homepage independently of its shifted page position.
export async function captureHomepage(page, content) {
  const rendered = await page.evaluate(() => {
    const hero = document.querySelector('.home-hero').getBoundingClientRect();
    const selector = document.querySelector('#behov').getBoundingClientRect();
    const sections = [...document.querySelectorAll('.invite-home > section')].slice(2);
    sections.push(document.querySelector('.site-footer'));
    const lower = sections.map(section => {
      const origin = section.getBoundingClientRect();
      const elements = [section, ...section.querySelectorAll('*')];
      return {
        id: section.id || 'footer', html: section.outerHTML,
        elements: elements.map(element => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            geometry: [rect.left, rect.top - origin.top, rect.width, rect.height],
            style: [...style].sort().map(property => [property, style.getPropertyValue(property)]),
          };
        }),
      };
    });
    return { heroHeight: hero.height, selectorY: selector.y, lower };
  });
  for (const section of rendered.lower) {
    section.htmlHash = createHash('sha256').update(section.html).digest('hex');
    delete section.html;
    for (const element of section.elements) {
      element.styleHash = createHash('sha256').update(JSON.stringify(element.style)).digest('hex');
      delete element.style;
    }
  }
  const { calculator, packages, proof, form, faqHeading, faqEyebrow, chrome } = content.homepage;
  rendered.content = { seo: content.seo, cta: content.cta, sections: content.sections, faq: content.faq,
    calculator, packages, proof, form, faqHeading, faqEyebrow, chrome };
  return rendered;
}

export function compareLower(assert, current, baseline) {
  assert.deepEqual(current.content, baseline.content, 'Lower copy, metadata, CTAs and chrome stay unchanged');
  assert.equal(current.lower.length, baseline.lower.length);
  let elements = 0;
  for (const [i, section] of current.lower.entries()) {
    const original = baseline.lower[i];
    assert.equal(section.id, original.id);
    assert.equal(section.htmlHash, original.htmlHash, `${section.id}: unchanged rendered DOM`);
    assert.equal(section.elements.length, original.elements.length);
    for (const [j, element] of section.elements.entries()) {
      const before = original.elements[j];
      assert.equal(element.styleHash, before.styleHash, `${section.id} element ${j}: unchanged computed styles`);
      // display:none nodes have a zero page rectangle, unrelated to section position.
      if (element.geometry[2] || element.geometry[3] || before.geometry[2] || before.geometry[3]) {
        element.geometry.forEach((value, k) => assert.ok(Math.abs(value - before.geometry[k]) < 0.1,
          `${section.id} element ${j}: unchanged relative geometry (${element.geometry} / ${before.geometry})`));
      }
      elements++;
    }
  }
  return { sections: current.lower.length, elements, dom: 'identical', computedStyles: 'identical', relativeGeometry: 'within 0.1px' };
}
