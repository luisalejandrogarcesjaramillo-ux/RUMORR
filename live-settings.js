(() => {
  'use strict';
  const colors = ['paper','white','ink','gray','stone','sand','clay','rust','ochre','olive','forest','slate','red','orange','blue','lime'];
  const ranges = {gutter:[16,80],masthead:[36,120],headline:[36,100],body_size:[16,22],leading:[1.4,1.8],measure:[580,760],section_space:[16,72],image_height:[280,720]};
  const fonts = {Space:'Space,Arial,sans-serif',Plex:'Plex,Arial,sans-serif',Mono:'Mono,monospace',Newsreader:'Newsreader,Georgia,serif'};
  const validNumber = (value, key) => typeof value === 'number' && value >= ranges[key][0] && value <= ranges[key][1];
  function apply(data) {
    if (!data || !data.design || !data.home || !data.articles || !data.campaign) return;
    const d = data.design, root = document.documentElement;
    for (const key of colors) if (/^#[0-9a-f]{6}$/i.test(d[key] || '')) root.style.setProperty('--'+key, d[key]);
    if (validNumber(d.image_height, 'image_height')) root.style.setProperty('--field', d.image_height+'px');
    if (validNumber(d.measure, 'measure')) root.style.setProperty('--measure', d.measure+'px');
    const font = key => fonts[d[key]] || fonts.Plex;
    const css = [];
    if (validNumber(d.gutter,'gutter')) css.push(`.wrap{padding-inline:${d.gutter}px}`);
    if (validNumber(d.masthead,'masthead')) css.push(`.wordmark{font-size:clamp(40px,6.3vw,${d.masthead}px)}`);
    if (validNumber(d.headline,'headline')) css.push(`.identity h1{font-size:clamp(38px,4.9vw,${d.headline}px)}`);
    if (validNumber(d.body_size,'body_size') && validNumber(d.leading,'leading')) css.push(`.prose{font-size:${d.body_size}px;line-height:${d.leading}}`);
    if (validNumber(d.section_space,'section_space')) css.push(`.section{padding-block:${d.section_space}px}`);
    css.push(`body{font-family:${font('body')}}.identity h1,.essay-cover h1,.thread-copy h2,.section h2,.recortes-head h1,.wordmark{font-family:${font('display')}}`);
    css.push('@media(max-width:700px){.wrap{padding-inline:18px}.wordmark{font-size:clamp(34px,10vw,50px)}}');
    let style = document.getElementById('live-settings');
    if (!style) { style = document.createElement('style'); style.id = 'live-settings'; document.head.append(style); }
    style.textContent = css.join('\n');
    if (['editorial','dense','image-led'].includes(data.home.mode)) document.body.dataset.panelMode = data.home.mode;
    const title = document.querySelector('.identity h1'), subtitle = document.querySelector('.identity>p');
    if (title && typeof data.home.title === 'string') {
      title.textContent = data.home.title;
      document.title = `${data.home.title} | RUMMOR`;
      const socialTitle = document.querySelector('meta[property="og:title"]');
      if (socialTitle) socialTitle.content = document.title;
    }
    if (subtitle && typeof data.home.subtitle === 'string') subtitle.textContent = data.home.subtitle;
    if (document.querySelector(`.thread-panel[data-record="${CSS.escape(data.home.featured || '')}"]`)) {
      document.body.dataset.initialRecord = data.home.featured;
      window.dispatchEvent(new CustomEvent('rummor:feature', {detail:data.home.featured}));
    }
    for (const element of document.querySelectorAll('[data-record]')) {
      const article = data.articles[element.dataset.record];
      element.style.removeProperty('--edition-color');
      element.style.removeProperty('--edition-ink');
      if (article && colors.includes(article.color) && ['paper','ink'].includes(article.ink)) {
        element.style.setProperty('--edition-color', `var(--${article.color})`);
        element.style.setProperty('--edition-ink', `var(--${article.ink})`);
      }
    }
    if (document.body.dataset.record) document.body.dataset.articleLayout = data.articles[document.body.dataset.record]?.layout || 'split';
    for (const row of document.querySelectorAll('#readings>li[data-record]')) {
      const department = data.departments?.[row.dataset.record];
      if (department) row.dataset.department = department;
    }
    document.getElementById('browse')?.dispatchEvent(new Event('change'));
    showCampaign(data.campaign);
  }
  function showCampaign(campaign) {
    const existing = document.querySelector('.campaign'), anchor = document.querySelector('.field-notes');
    if (!anchor) return;
    existing?.remove();
    if (!campaign.active || !/^https:\/\//.test(campaign.url || '')) return;
    const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const date = Object.fromEntries(parts.map(part => [part.type,part.value]));
    const today = `${date.year}-${date.month}-${date.day}`;
    if ((campaign.start && today < campaign.start) || (campaign.end && today > campaign.end)) return;
    const section = document.createElement('aside'), left = document.createElement('div'), right = document.createElement('div');
    const label = document.createElement('small'), title = document.createElement('h2'), text = document.createElement('p'), link = document.createElement('a');
    section.className = 'campaign'; section.setAttribute('aria-label','Pauta');
    label.textContent = 'PAUTA'; title.textContent = campaign.title; text.textContent = campaign.text;
    link.href = campaign.url; link.rel = 'sponsored noopener noreferrer'; link.textContent = 'Conocer ↗';
    left.append(label,title); right.append(text,link); section.append(left,right); anchor.before(section);
  }
  window.RummorApplySettings = apply;
  async function load() {
    try {
      const response = await fetch('/api/settings', {cache:'no-store'});
      if (response.ok) apply(await response.json());
    } catch { /* La copia estática conserva su diseño si no hay configuración remota. */ }
  }
  if (!new URLSearchParams(location.search).has('panel-preview')) load();
  window.addEventListener('pageshow', event => { if (event.persisted) load(); });
})();
