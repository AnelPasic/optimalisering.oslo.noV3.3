import source from '../content/terminology/glossary.json';

export function initTerminology() {
  const panel = document.querySelector<HTMLElement>('[data-term-panel]');
  // Older browsers retain the accessible glossary links without enhancement.
  if (!panel || typeof panel.showPopover !== 'function') return;
  const description = panel.querySelector<HTMLElement>('[data-term-description]')!;
  const more = panel.querySelector<HTMLAnchorElement>('[data-term-more]')!;
  const definitions = new Map(source.terms.map(term => [term.id, term.shortDefinition]));
  let active: HTMLAnchorElement | null = null;
  let pinned = false;
  let touchFocus = false;
  const supportsPopover = typeof panel.showPopover === 'function';
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  const trigger = (target: EventTarget | null) => target instanceof Element ? target.closest<HTMLAnchorElement>('a[data-term]') : null;
  const cancelClose = () => clearTimeout(closeTimer);
  const inside = (target: EventTarget | null) => target instanceof Node && (!!active?.contains(target) || panel.contains(target));
  function position() {
    if (!active) return;
    const rect = active.getBoundingClientRect();
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft ?? 0, top = viewport?.offsetTop ?? 0;
    const width = viewport?.width ?? innerWidth, height = viewport?.height ?? innerHeight;
    panel!.style.maxWidth = `${Math.min(320, width - 24)}px`;
    panel!.style.maxHeight = `${height - 24}px`;
    const box = panel!.getBoundingClientRect();
    panel!.style.left = `${Math.max(left + 12, Math.min(rect.left, left + width - box.width - 12))}px`;
    const below = rect.bottom + 8;
    panel!.style.top = `${Math.max(top + 12, Math.min(below + box.height <= top + height - 12 ? below : rect.top - box.height - 8, top + height - box.height - 12))}px`;
  }
  function close() {
    cancelClose();
    if (supportsPopover && panel!.matches(':popover-open')) panel!.hidePopover();
    panel!.hidden = true;
    active?.setAttribute('aria-expanded', 'false');
    active?.removeAttribute('aria-describedby');
    active = null;
    pinned = false;
  }
  function open(link: HTMLAnchorElement) {
    const definition = definitions.get(link.dataset.term!);
    if (!definition) return;
    cancelClose();
    if (active !== link) close();
    active = link;
    description.textContent = definition;
    more.href = link.href;
    // Place the shared panel after its trigger for natural keyboard/reading order.
    if (link.nextElementSibling !== panel) link.after(panel!);
    panel!.hidden = false;
    if (supportsPopover && !panel!.matches(':popover-open')) panel!.showPopover();
    link.setAttribute('aria-expanded', 'true');
    link.setAttribute('aria-describedby', description.id);
    position();
  }
  function scheduleClose() {
    cancelClose();
    closeTimer = setTimeout(() => { if (!pinned) close(); }, 180);
  }
  document.querySelectorAll<HTMLAnchorElement>('a[data-term]').forEach(link => {
    link.setAttribute('role', 'button');
    link.setAttribute('aria-expanded', 'false');
    link.setAttribute('aria-controls', panel.id);
  });
  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse') return;
    const link = trigger(event.target);
    if (link) open(link);
    else if (panel.contains(event.target as Node)) cancelClose();
  });
  document.addEventListener('pointerout', event => {
    if (event.pointerType === 'mouse' && inside(event.target) && !inside(event.relatedTarget) && !inside(document.activeElement)) scheduleClose();
  });
  document.addEventListener('focusin', event => {
    const link = trigger(event.target);
    if (link && !touchFocus) open(link);
    else if (!inside(event.target)) close();
  });
  document.addEventListener('focusout', event => {
    if (inside(event.target) && !inside(event.relatedTarget)) close();
  });
  document.addEventListener('pointerdown', event => {
    touchFocus = event.pointerType === 'touch';
    if (!trigger(event.target) && !panel.contains(event.target as Node)) close();
  });
  document.addEventListener('click', event => {
    const link = trigger(event.target);
    if (!link) return;
    // Modified clicks keep the normal direct-link behavior.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (active === link && pinned) close();
    else { open(link); pinned = true; }
  });
  document.addEventListener('keydown', event => {
    touchFocus = false;
    if (event.key === 'Escape' && active) {
      const link = active;
      // Restore focus before closing, so focusin cannot reopen the panel.
      if (panel.contains(document.activeElement)) link.focus();
      close();
    }
    const link = trigger(event.target);
    if (link && event.key === ' ') { event.preventDefault(); link.click(); }
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, true);
  window.visualViewport?.addEventListener('resize', position);
}
