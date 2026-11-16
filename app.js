(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.masthead nav');
  const route = path => (path.split('/').filter(Boolean).pop() || 'index').replace(/\.html$/, '');
  function legacySection() {
    if (route(location.pathname) === 'index' && ['mesa', 'buzon', 'numeros', 'indice'].includes(location.hash.slice(1)))
      location.replace('participar.html' + location.search + '#buzon');
  }
  function setMenu(open) {
    nav?.classList.toggle('open', open);
    menu?.setAttribute('aria-expanded', String(open));
    if (menu) menu.textContent = open ? 'Cerrar −' : 'Menú +';
  }
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false);
    const target = link.hash && document.getElementById(link.hash.slice(1))?.querySelector('h1,h2');
    if (target) { target.tabIndex = -1; target.focus({preventScroll: true}); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
  });
  function closeOutside(event) { if (!event.target.closest('.masthead')) setMenu(false); }
  document.addEventListener('focusin', closeOutside); document.addEventListener('click', closeOutside);
  const compact = matchMedia('(max-width:700px)');
  compact.addEventListener('change', () => {
    const returnFocus = compact.matches && nav?.contains(document.activeElement);
    setMenu(false); if (returnFocus) menu?.focus();
  });
  function replaceURL(url) {
    try { history.replaceState(null, '', url); } catch { /* La interfaz también funciona sin modificar la URL. */ }
  }
  function markLocation() {
    const page = document.body.dataset.record ? 'recortes' : route(location.pathname);
    nav?.querySelectorAll('a').forEach(link => {
      if (route(link.pathname) === page) link.setAttribute('aria-current', document.body.dataset.record ? 'location' : 'page');
      else link.removeAttribute('aria-current');
    });
  }
  legacySection(); markLocation();
  window.addEventListener('hashchange', () => { legacySection(); markLocation(); });

  const form = document.getElementById('submission');
  if (form && new URLSearchParams(location.search).get('tipo') === 'studio') form.elements.kind.value = 'studio';
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const payload = {kind: data.kind, name: data.name, title: data.title, url: data.url, message: data.message,
      data_consent: true, status: 'local_draft', created_at: new Date().toISOString()};
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'}));
    const link = document.createElement('a'); link.href = url; link.download = 'rummor-propuesta.json';
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById('form-status').textContent = 'Borrador preparado. No se ha enviado.';
  });
  document.querySelector('[data-share]')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    try { await navigator.clipboard.writeText(location.href); button.textContent = 'Enlace copiado'; }
    catch { button.textContent = 'Copia la dirección del navegador'; }
  });

  document.querySelector('[data-save]')?.addEventListener('click', event => {
    try {
      localStorage.setItem('rummor:saved-' + document.body.dataset.record,
        JSON.stringify({title: document.querySelector('h1').innerText.replace(/\s+/g, ' ').trim(), url: location.href}));
      event.currentTarget.textContent = 'Lectura guardada en este navegador';
    } catch { event.currentTarget.textContent = 'El navegador no permite guardar'; }
  });
  const openedKey = 'rummor:opened';
  function opened() {
    try {
      const ids = JSON.parse(localStorage.getItem(openedKey) || '[]');
      return Array.isArray(ids) ? ids.filter(id => typeof id === 'string').slice(-50) : [];
    } catch { return null; }
  }
  if (document.body.dataset.record) {
    try { localStorage.setItem(openedKey, JSON.stringify([...new Set([...(opened() || []), document.body.dataset.record])].slice(-50))); }
    catch { /* La lectura funciona sin almacenamiento local. */ }
  }
  const board = document.querySelector('.thread-board');
  if (board) {
    const panels = [...board.querySelectorAll('.thread-panel')], choices = [...board.querySelectorAll('[data-thread-choice]')];
    const stops = document.getElementById('thread-stops'), next = document.getElementById('thread-next');
    let current = 0;
    function show(index) {
      const panel = panels[index]; if (!panel) return;
      const thread = panel.dataset.thread, choice = choices.find(button => button.dataset.threadChoice === thread);
      if (!choice) return;
      current = index;
      const sequence = panels.filter(item => item.dataset.thread === thread), step = sequence.indexOf(panel);
      panels.forEach(item => { item.hidden = item !== panel; });
      choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.threadChoice === thread)));
      document.getElementById('thread-question').textContent = choice.dataset.question;
      document.getElementById('thread-status').textContent = choice.textContent + ' · ' + (step + 1) + ' de ' + sequence.length;
      const url = new URL(location.href);
      if (index) url.searchParams.set('lectura', panel.dataset.record); else url.searchParams.delete('lectura');
      replaceURL(url);
      next.textContent = step === sequence.length - 1 ? 'Cambiar de hilo →' : 'Siguiente conexión →';
      const restoreFocus = stops.contains(document.activeElement);
      stops.replaceChildren();
      sequence.forEach((item, position) => {
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = String(position + 1).padStart(2, '0');
        button.setAttribute('aria-label', 'Paso ' + (position + 1) + ': ' + item.dataset.title);
        if (position === step) button.setAttribute('aria-current', 'step');
        button.addEventListener('click', () => show(panels.indexOf(item))); stops.append(button);
      });
      if (restoreFocus) stops.querySelector('[aria-current]').focus({preventScroll: true});
      const ids = opened();
      document.getElementById('opened-status').textContent = ids
        ? panels.filter(item => ids.includes(item.dataset.record)).length + ' de ' + panels.length + ' abiertos en estos recorridos.'
        : 'El recorrido funciona, pero este navegador no permite conservar tus pasos.';
    }
    choices.forEach(button => button.addEventListener('click', () => show(panels.findIndex(item => item.dataset.thread === button.dataset.threadChoice))));
    next.addEventListener('click', () => show((current + 1) % panels.length));
    document.getElementById('thread-shuffle').addEventListener('click', () => {
      const ids = opened() || [], others = panels.filter((item, index) => index !== current);
      const fresh = others.filter(item => !ids.includes(item.dataset.record)), pool = fresh.length ? fresh : others;
      show(panels.indexOf(pool[Math.floor(Math.random() * pool.length)]));
    });
    board.querySelector('.thread-choices').hidden = false; board.querySelector('.thread-tools').hidden = false;
    const requested = () => panels.findIndex(panel => panel.dataset.record === new URLSearchParams(location.search).get('lectura'));
    show(Math.max(0, requested())); window.addEventListener('pageshow', () => show(current));
    window.addEventListener('popstate', () => show(Math.max(0, requested()))); window.addEventListener('storage', () => show(current));
  }
  const browse = document.getElementById('browse');
  if (!browse) return;
  const rows = [...document.querySelectorAll('#readings>li')];
  const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const terms = rows.map(row => normalize(row.textContent + ' ' + row.dataset.fields + ' ' + row.dataset.scope));
  const views = [...document.querySelectorAll('[data-view]')];
  let selection;
  function readFilters() {
    const params = new URLSearchParams(location.search);
    for (const key of ['q', 'tema']) browse.elements[key].value = (params.get(key) || '').trim().slice(0, 150);
    selection = params.get('vista') !== 'todas' && !browse.elements.q.value && !browse.elements.tema.value;
  }
  readFilters();
  function filter() {
    const term = normalize(browse.elements.q.value.trim()), field = browse.elements.tema.value;
    let count = 0;
    rows.forEach((row, index) => {
      const match = (!selection || row.dataset.selected === 'true') && terms[index].includes(term) && (!field || row.dataset.fields.split('|').includes(field));
      row.hidden = !match; if (match) count++;
    });
    document.getElementById('browse-status').textContent = count + (selection ? ' elegidas de ' : ' de ') + rows.length + ' lecturas';
    views.forEach(button => button.setAttribute('aria-pressed', String((button.dataset.view === 'seleccion') === selection)));
    document.getElementById('browse-empty').hidden = count !== 0;
    const url = new URL(location.href);
    if (selection) url.searchParams.delete('vista'); else url.searchParams.set('vista', 'todas');
    for (const key of ['q', 'tema']) {
      const value = browse.elements[key].value.trim();
      if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    }
    replaceURL(url);
  }
  const switcher = document.querySelector('.reading-switch'); if (switcher) switcher.hidden = false;
  views.forEach(button => button.addEventListener('click', () => { selection = button.dataset.view === 'seleccion'; filter(); }));
  browse.hidden = false; filter();
  function searchAll() { selection = false; filter(); }
  browse.addEventListener('input', searchAll); browse.addEventListener('change', searchAll);
  browse.addEventListener('submit', event => { event.preventDefault(); filter(); });
  browse.addEventListener('reset', () => { selection = true; setTimeout(filter, 0); });
  window.addEventListener('popstate', () => { readFilters(); filter(); });
  const list = document.getElementById('saved-list'), status = document.getElementById('saved-status');
  function showSaved() {
    list.replaceChildren(); let blocked = false;
    rows.forEach(row => {
      const key = 'rummor:saved-' + row.dataset.record;
      try {
        const saved = JSON.parse(localStorage.getItem(key) || 'null');
        if (!saved || typeof saved !== 'object') return;
      } catch { blocked = true; return; }
      const original = row.querySelector('h2 a'), item = document.createElement('li');
      const link = document.createElement('a'), remove = document.createElement('button');
      link.href = original.getAttribute('href'); link.textContent = original.textContent;
      remove.type = 'button'; remove.className = 'text-button'; remove.textContent = 'Quitar';
      remove.setAttribute('aria-label', 'Quitar ' + link.textContent + ' de guardadas');
      remove.addEventListener('click', () => {
        try { localStorage.removeItem(key); showSaved(); }
        catch { status.textContent = 'El navegador no permite modificar las guardadas.'; }
      });
      item.append(link, ' ', remove); list.append(item);
    });
    status.textContent = blocked ? 'No se pudieron leer todas las guardadas de este navegador.'
      : list.children.length ? 'Guardadas en este navegador.' : 'Todavía no hay lecturas guardadas.';
  }
  showSaved(); window.addEventListener('pageshow', showSaved); window.addEventListener('storage', showSaved);
})();
