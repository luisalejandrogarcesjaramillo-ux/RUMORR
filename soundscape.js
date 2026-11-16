'use strict';
const soundFooter=document.querySelector('.footer');
if(soundFooter){
  const sound=document.createElement('section');
  sound.className='soundscape';
  sound.setAttribute('aria-label','Ambiente sonoro');
  sound.innerHTML='<button type="button" class="text-button" aria-expanded="false" aria-controls="radio-panel">Escuchar la radio ↗</button><div id="radio-panel" hidden><p>Pola &amp; House Radio · reproductor externo de Caster.fm.</p><p><strong>Antes de reproducir, ajusta su volumen al 20 %.</strong> Caster.fm inicia al 100 %; el ajuste es manual.</p><p>Conecta con Caster.fm. Al cerrar o cambiar de página, se detiene.</p><div class="radio-player"></div><p class="radio-status" role="status"></p></div>';
  soundFooter.append(sound);
  const toggle=sound.querySelector('button');
  const panel=sound.querySelector('#radio-panel');
  const player=sound.querySelector('.radio-player');
  const status=sound.querySelector('.radio-status');
  let generation=0;
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';
    generation++;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.textContent=open?'Cerrar la radio ×':'Escuchar la radio ↗';
    panel.hidden=!open;
    player.replaceChildren();
    status.textContent='';
    if(!open)return;
    const embed=document.createElement('div');
    embed.className='cstrEmbed';
    for(const [name,value] of Object.entries({type:'newStreamPlayer',publicToken:'3be01d4e-cdd4-4ac7-9101-3e1f55091457',theme:'dark',color:'245037',channelId:'',rendered:'false'}))embed.setAttribute('data-'+name,value);
    embed.innerHTML='<a href="https://www.caster.fm">Shoutcast Hosting</a> <a href="https://www.caster.fm">Stream Hosting</a> <a href="https://www.caster.fm">Radio Server Hosting</a>';
    const script=document.createElement('script');
    script.src='https://cdn.cloud.caster.fm/widgets/embed.js';
    script.async=true;
    status.textContent='Cargando el reproductor externo. Sus controles pueden aparecer en otro idioma. Si la emisora está desconectada, no habrá sonido.';
    const current=generation;
    script.addEventListener('error',()=>{if(current===generation)status.textContent='No se pudo cargar Caster.fm. Puedes cerrar el reproductor y volver a intentarlo.'});
    script.addEventListener('load',()=>{if(current===generation)status.textContent='Ajusta el volumen al 20 % antes de reproducir. La disponibilidad depende de la emisora.'});
    player.append(embed,script);
  });
}
