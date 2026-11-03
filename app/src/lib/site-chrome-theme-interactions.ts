/**
 * Shared Light/Dark behavior for the daisyUI swap-rotate theme-controller.
 * Precedence: explicit visitor choice > OS preference > CMS defaultMode.
 * Desktop and mobile checkboxes are kept in sync so Daisy's :has(...:checked)
 * never disagrees with the canonical html[data-theme].
 */
type Mode = 'light' | 'dark';
const preferenceKey = 'mws-theme-mode';
let inPageOverride: Mode | undefined;
let listeningSystem = false;

function storedChoice(): Mode | undefined {
  try {
    const choice = localStorage.getItem(preferenceKey);
    if (choice === 'light' || choice === 'dark') return choice;
  } catch { /* Private browsing / blocked storage still permits switching. */ }
  return undefined;
}
function syncControls(): void {
  const mode = document.documentElement.dataset.mwsThemeMode;
  document.querySelectorAll<HTMLInputElement>('input[data-mws-theme-toggle]').forEach(input => {
    input.checked = mode === 'dark';
    input.setAttribute('aria-label', mode === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema');
    input.parentElement?.setAttribute('title', mode === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema');
  });
}
function applyMode(mode: Mode): void {
  const root = document.documentElement;
  const name = mode === 'light' ? root.dataset.mwsLightTheme : root.dataset.mwsDarkTheme;
  if (!name) return;
  root.dataset.theme = name;
  root.dataset.mwsThemeMode = mode;
  syncControls();
}
function onSystemChange(event: MediaQueryListEvent): void {
  if (document.documentElement.dataset.mwsThemeSwitchEnabled !== 'true') return;
  if (inPageOverride || storedChoice()) return;
  applyMode(event.matches ? 'dark' : 'light');
}
/** Shared explicit theme choice for both header toggles and the QA gallery.
 * A single implementation persists and synchronizes the canonical html theme.
 */
export function setChromeThemeMode(mode: Mode): void {
  inPageOverride = mode;
  try { localStorage.setItem(preferenceKey, mode); }
  catch { /* Preserve the current document choice if storage is unavailable. */ }
  applyMode(mode);
}

export function mountChromeThemeSwitchers(): void {
  document.querySelectorAll<HTMLInputElement>('input[data-mws-theme-toggle]').forEach(input => {
    if (input.dataset.mwsThemeMounted === '1') return;
    input.dataset.mwsThemeMounted = '1';
    input.addEventListener('change', () => {
      setChromeThemeMode(input.checked ? 'dark' : 'light');
    });
  });
  if (!listeningSystem && typeof window.matchMedia === 'function') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onSystemChange);
    listeningSystem = true;
  }
  syncControls();
}
