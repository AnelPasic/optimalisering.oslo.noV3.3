/** One site-wide switch shared by desktop, compact desktop and mobile controls. */
function setTheme(mode: 'light' | 'dark'): void {
  const root = document.documentElement;
  const theme = mode === 'light' ? root.dataset.mwsLightTheme : root.dataset.mwsDarkTheme;
  if (!theme) return;
  root.dataset.theme = theme;
  root.dataset.mwsThemeMode = mode;
  try { localStorage.setItem('mws-theme-mode', mode); } catch { /* Nonessential persistence. */ }
  synchronize();
}
export function mountChromeThemeSwitchers(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-mws-theme-select]').forEach(button => {
    if (button.dataset.mwsThemeMounted === '1') return;
    button.dataset.mwsThemeMounted = '1';
    button.addEventListener('click', () => {
      const mode = button.dataset.mwsThemeSelect;
      if (mode === 'light' || mode === 'dark') setTheme(mode);
    });
  });
  document.querySelectorAll<HTMLButtonElement>('[data-mws-theme-cycle]').forEach(button => {
    if (button.dataset.mwsThemeMounted === '1') return;
    button.dataset.mwsThemeMounted = '1';
    button.addEventListener('click', () => {
      setTheme(document.documentElement.dataset.mwsThemeMode === 'dark' ? 'light' : 'dark');
    });
  });
  synchronize();
}
function synchronize(): void {
  const mode = document.documentElement.dataset.mwsThemeMode;
  document.querySelectorAll<HTMLButtonElement>('[data-mws-theme-select]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.mwsThemeSelect === mode));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-mws-theme-cycle]').forEach(button => {
    button.setAttribute('aria-label', mode === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema');
    button.title = mode === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema';
  });
}
