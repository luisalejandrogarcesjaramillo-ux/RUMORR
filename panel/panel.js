(() => {
  'use strict';
  const address = new URL(location.href);
  if (address.username || address.password) history.replaceState(null, '', address.origin + address.pathname);
  const $ = id => document.getElementById(id);
  const form = $('site-form'), draft = $('draft-form'), frame = $('preview');
  const colors = ['paper','white','ink','gray','stone','sand','clay','rust','ochre','olive','forest','slate','red','orange','blue','lime'];
  const numbers = {gutter:['Margen horizontal',16,80,1],masthead:['Tamaño de marca',36,120,1],headline:['Titular de portada',36,100,1],body_size:['Texto del artículo',16,22,1],leading:['Interlineado',1.4,1.8,.01],measure:['Ancho de lectura',580,760,1],section_space:['Separación entre secciones',16,72,1],image_height:['Alto de imagen principal',280,720,1]};
  let state, titles, links, token, currentSlug, preparedSlug;
  function say(message, target='status') { $(target).textContent = message; }
  async function post(path, body, image=false) {
    const response = await fetch(location.origin + path, {method:'POST', headers:{'X-Rummor-Token':token,'Content-Type':image?body.type:'application/json'}, body:image?body:JSON.stringify(body)});
    const result = await response.json(); if (!response.ok) throw Error(result.error || 'No se guardó'); return result;
  }
  function option(select, value, label) { select.add(new Option(label, value)); }
  function drawControls() {
    const area = $('design-controls'); area.replaceChildren();
    for (const key of colors) {
      const label = document.createElement('label'); label.className = 'design-row'; label.textContent = key.toUpperCase();
      const input = document.createElement('input'); input.type = 'color'; input.name = key; input.value = state.design[key]; label.append(input); area.append(label);
    }
    for (const [key, [name, min, max, step]] of Object.entries(numbers)) {
      const label = document.createElement('label'); label.textContent = name;
      const input = document.createElement('input'); input.type = 'number'; input.name = key; input.min = min; input.max = max; input.step = step; input.value = state.design[key]; label.append(input); area.append(label);
    }
    for (const [key, name] of [['display','Fuente de titulares'],['body','Fuente del texto']]) {
      const label = document.createElement('label'); label.textContent = name;
      const select = document.createElement('select'); select.name = key;
      for (const font of ['Space','Plex','Mono','Newsreader']) option(select, font, font);
      select.value = state.design[key]; label.append(select); area.append(label);
    }
  }
  function fill() {
    form.elements.title.value = state.home.title;
    form.elements.subtitle.value = state.home.subtitle;
    for (const [slug, title] of Object.entries(titles).sort((a,b)=>a[1].localeCompare(b[1],'es'))) {
      option(form.elements.featured, slug, title); option($('article-select'), slug, title);
      option(draft.elements.rec1, slug, title); option(draft.elements.rec2, slug, title);
      option($('link-one'), slug, title); option($('link-two'), slug, title);
    }
    form.elements.featured.value = state.home.featured;
    form.elements.mode.value = state.home.mode;
    for (const name of ['Objetos','Espacios','Imágenes','Ideas','Futuros']) {
      option($('article-department'), name, name); option(draft.elements.department, name, name);
    }
    for (const name of colors) option($('article-color'), name, name);
    drawControls();
    for (const key of ['active','title','text','url','start','end']) {
      const field = form.elements['campaign-'+key];
      if (key === 'active') field.checked = state.campaign[key]; else field.value = state.campaign[key];
    }
    currentSlug = state.home.featured;
    $('article-select').value = currentSlug; fillArticle();
  }
  function saveArticle() {
    if (!currentSlug) return;
    state.departments[currentSlug] = $('article-department').value;
    state.articles[currentSlug] = {color:$('article-color').value,ink:$('article-ink').value,layout:$('article-layout').value};
    links[currentSlug] = [[$('link-one').value,$('reason-one').value.trim()],[$('link-two').value,$('reason-two').value.trim()]];
  }
  function fillArticle() {
    const item = state.articles[currentSlug] || {color:'red',ink:'paper',layout:'split'};
    $('article-department').value = state.departments[currentSlug] || 'Ideas';
    $('article-color').value = item.color; $('article-ink').value = item.ink; $('article-layout').value = item.layout;
    $('link-one').value = links[currentSlug][0][0]; $('reason-one').value = links[currentSlug][0][1];
    $('link-two').value = links[currentSlug][1][0]; $('reason-two').value = links[currentSlug][1][1];
  }
  function collect() {
    saveArticle();
    state.home = {title:form.elements.title.value.trim(),subtitle:form.elements.subtitle.value.trim(),featured:form.elements.featured.value,mode:form.elements.mode.value};
    for (const key of colors) state.design[key] = form.elements[key].value;
    for (const key of Object.keys(numbers)) state.design[key] = Number(form.elements[key].value);
    for (const key of ['display','body']) state.design[key] = form.elements[key].value;
    for (const key of ['active','title','text','url','start','end']) {
      const field = form.elements['campaign-'+key]; state.campaign[key] = key === 'active' ? field.checked : field.value.trim();
    }
    return state;
  }
  function previewLive() {
    const doc = frame.contentDocument; if (!doc) return;
    const data = collect(), root = doc.documentElement;
    doc.body.dataset.panelMode = data.home.mode;
    for (const key of colors) root.style.setProperty('--'+key, data.design[key]);
    root.style.setProperty('--field', data.design.image_height+'px');
    const heading = doc.querySelector('.identity h1'), subtitle = doc.querySelector('.identity>p');
    if (heading) heading.textContent = data.home.title;
    if (subtitle) subtitle.textContent = data.home.subtitle;
    const style = doc.getElementById('panel-live') || doc.head.appendChild(doc.createElement('style'));
    style.id = 'panel-live';
    style.textContent = `body{font-family:${data.design.body},Arial,sans-serif}.hero h1,.essay-cover h1,.thread-copy h2,.section h2,.recortes-head h1{font-family:${data.design.display},Arial,sans-serif}.wrap{padding-inline:${data.design.gutter}px}.prose{font-size:${data.design.body_size}px;line-height:${data.design.leading}}.article-body{grid-template-columns:minmax(0,${data.design.measure}px) minmax(180px,240px)}.section{padding-block:${data.design.section_space}px}.identity h1{font-family:${data.design.display},Arial,sans-serif;font-size:${data.design.headline}px}.wordmark{font-family:${data.design.display},Arial,sans-serif;font-size:${data.design.masthead}px}@media(max-width:700px){.wrap{padding-inline:18px}.wordmark{font-size:clamp(34px,10vw,50px)}}`;
  }
  function showPage(name) { frame.src = '/preview/'+name+'.html'; $('open-preview').href = frame.src; }
  async function showHistory() {
    const response = await fetch(location.origin + '/api/history'), data = await response.json();
    $('history').replaceChildren();
    if (!data.revisions.length) { $('history').textContent = 'Aún no hay versiones anteriores.'; return; }
    for (const version of data.revisions) {
      const row = document.createElement('p'), button = document.createElement('button');
      button.type = 'button'; button.textContent = 'Restaurar '+version.date;
      button.addEventListener('click', async () => {
        try { await post('/api/restore',{id:version.id}); location.reload(); }
        catch (error) { say(error.message); }
      });
      row.append(button); $('history').append(row);
    }
  }
  frame.addEventListener('load', previewLive);
  form.addEventListener('input', previewLive); form.addEventListener('change', previewLive);
  $('article-select').addEventListener('change', () => { saveArticle(); currentSlug = $('article-select').value; fillArticle(); showPage(currentSlug); });
  $('save-links').addEventListener('click', async () => {
    saveArticle();
    try { await post('/api/links',{slug:currentSlug,links:links[currentSlug]}); say('Dos conexiones guardadas y sitio verificado.'); frame.contentWindow.location.reload(); }
    catch (error) { say(error.message); }
  });
  form.elements.featured.addEventListener('change', () => { showPage('index'); frame.onload = () => { frame.onload = null; frame.contentWindow.location.search = '?lectura='+form.elements.featured.value; }; });
  form.addEventListener('submit', async event => { event.preventDefault(); if (!form.reportValidity()) return;
    try { const result = await post('/api/site', collect()); say(`Guardado. ${result.pages} páginas y ${result.essays} lecturas verificadas.`); frame.contentWindow.location.reload(); await showHistory(); }
    catch (error) { say(error.message); }
  });
  $('reload').addEventListener('click', () => location.reload());
  for (const [id, mobile] of [['desktop',false],['mobile',true]]) $(id).addEventListener('click', () => {
    $('preview').parentElement.classList.toggle('mobile', mobile); $('desktop').setAttribute('aria-pressed',String(!mobile)); $('mobile').setAttribute('aria-pressed',String(mobile));
  });
  function imageFields() {
    $('image-fields').innerHTML = [1,2].map(n => `<fieldset class="image-field"><h3>Imagen ${n}</h3><label>Archivo JPG, PNG o WebP<input type="file" name="file${n}" accept="image/jpeg,image/png,image/webp" required></label><label>ID de la ficha en Wikimedia Commons<input type="number" name="pageid${n}" min="1" required></label><label>URL de la ficha en Wikimedia Commons<input type="url" name="source_page${n}" required placeholder="https://commons.wikimedia.org/wiki/File:..."></label><label>Autoría de la imagen<input name="author${n}" required></label><label>Licencia<input name="license${n}" required placeholder="CC BY-SA 4.0"></label><label>URL de la licencia<input type="url" name="license_url${n}" required placeholder="https://creativecommons.org/licenses/..."></label><label>Texto alternativo<input name="alt${n}" required></label><label>Pie de foto<input name="caption${n}" required></label></fieldset>`).join('');
  }
  function lines(value) { return value.trim().split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean); }
  async function manifest() {
    const f = draft.elements, images = [];
    for (const n of [1,2]) {
      const file = f['file'+n].files[0]; if (!file) throw Error('Falta la imagen '+n);
      const uploaded = await post('/api/image', file, true);
      images.push({source_file:uploaded.source_file,pageid:Number(f['pageid'+n].value),source_page:f['source_page'+n].value.trim(),author:f['author'+n].value.trim(),license:f['license'+n].value.trim(),license_url:f['license_url'+n].value.trim(),alt:f['alt'+n].value.trim(),caption:f['caption'+n].value.trim()});
    }
    const sources = f.sources.value.trim().split('\n').map(line=>{const pos=line.indexOf('|');if(pos<0)throw Error('Cada fuente necesita «Nombre | URL»');return {text:line.slice(0,pos).trim(),url:line.slice(pos+1).trim()};});
    const body = lines(f.prose.value), words = body.join(' ').split(/\s+/).length;
    const today = new Intl.DateTimeFormat('es-CO',{timeZone:'America/Bogota',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date()).replaceAll('/','.');
    return {slug:f.slug.value.trim(),department:f.department.value,title:f.title.value.trim(),format:f.format.value,scope:f.scope.value.trim(),fields:f.fields.value.split(',').map(s=>s.trim()).filter(Boolean),color:'red',ink:'white',lead:f.lead.value.trim(),lead_short:f.lead.value.trim(),meta_description:f.meta_description.value.trim(),prose:body,sources,images,recommendations:[[f.rec1.value,f.reason1.value.trim()],[f.rec2.value,f.reason2.value.trim()]],revision_date:today,consulted_date:today,reading_time:Math.max(1,Math.ceil(words/220))+' MIN DE LECTURA'};
  }
  draft.addEventListener('submit', async event => { event.preventDefault(); if (!draft.reportValidity()) return;
    try { const result = await post('/api/article/draft', await manifest()); preparedSlug = result.slug; $('incorporate').disabled = false; say('Borrador validado y guardado. Aún no forma parte del sitio.', 'draft-status'); }
    catch (error) { say(error.message,'draft-status'); }
  });
  $('incorporate').addEventListener('click', async () => { if (!preparedSlug) return;
    $('incorporate').disabled = true;
    try { const result = await post('/api/article/publish',{slug:preparedSlug}); say(`Incorporado a la copia local: ${result.essays} lecturas. No se ha desplegado.`, 'draft-status'); frame.src = '/preview/'+preparedSlug+'.html'; }
    catch (error) { say(error.message,'draft-status'); $('incorporate').disabled = false; }
  });
  imageFields();
  fetch(location.origin + '/api/site').then(r=>{if(!r.ok)throw Error('No se abrió el panel');return r.json();}).then(data=>{
    state=data.settings; titles=data.titles; links=data.links; token=data.token; fill(); previewLive(); showHistory();
  }).catch(error=>say(error.message));
})();
