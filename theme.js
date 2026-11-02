// Independent theme control: content-rendering errors cannot disable this button.
(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('cv-theme'); } catch {}
  const valid = value => value === 'light' || value === 'dark';
  root.dataset.theme = valid(saved) ? saved : valid(root.dataset.theme) ? root.dataset.theme : (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function init() {
    const button = document.getElementById('theme');
    const label = document.getElementById('theme-label');
    if (!button) return;
    function refresh() {
      const dark = root.dataset.theme === 'dark';
      if (label) label.textContent = dark ? 'Light' : 'Dark';
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('cv-theme', root.dataset.theme); } catch {}
      refresh();
    });
    refresh();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
