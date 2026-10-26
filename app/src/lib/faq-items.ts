/** The global FAQ owns shared copy; each page may append its own questions.
 * Avoid two visible occurrences of an identical question without mutating CMS data.
 */
export type FaqItem = { question: string; answer: string };

export function combineFaqItems(globalItems: readonly FaqItem[], localItems: readonly FaqItem[] = []): FaqItem[] {
  const keys = new Set<string>();
  return [...globalItems, ...localItems].filter(item => {
    const key = item.question.trim().replace(/\s+/g,' ').toLocaleLowerCase('nb-NO');
    if (keys.has(key)) return false;
    keys.add(key);
    return true;
  });
}

export function hasGlobalFaq(sections: readonly { globalElement?: string; visibility?: string }[]): boolean {
  return sections.some(section => section.globalElement === 'sporsmal' && section.visibility !== 'hidden');
}
