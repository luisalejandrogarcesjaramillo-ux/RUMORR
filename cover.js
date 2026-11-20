(() => {
  'use strict';
  const hero = document.querySelector('.cover-hero');
  if (!hero) return;

  const HEROES = [
    {slug:'picos',t:'El parlante también tiene pintor',b:'CUADERNO · SONIDO & GRÁFICA · CARIBE COLOMBIANO',d:'Antes de que la música suene, la máquina ya ha dicho quién es. Alguien subió a una escalera con un pincel de cerda fina para pintar una fiera en el cajón de madera: la acústica del barrio que se reconoce primero por los ojos.',a:'Frente del picó El Rojo con cobra pintada'},
    {slug:'barniz-pasto',t:'Una piel que se corta, no se pinta',b:'CUADERNO · OFICIOS & MATERIALES · PASTO, COLOMBIA',d:'Llaman barniz a lo que en verdad es una resina vegetal masticada con paciencia campesina, templada al calor de las manos y cortada al milímetro sobre la madera. Un saber que no empieza en el taller visible, sino en la selva.',a:'Gilberto Granja trabajando barniz de Pasto'},
    {slug:'quinchamali',t:'La aguja dejó el disco y entró en la greda',b:'CUADERNO · MATERIALES & OFICIOS · ÑUBLE, CHILE',d:'Una vieja aguja de vitrola, en vez de gastar discos ajenos, encontró su lugar en la greda aún tibia. Luego vendrán el humo y la bosta para volver negra la tierra, dejando que la incisión blanca brille como una memoria quieta.',a:'Alfarería negra de Quinchamalí con incisiones blancas'},
    {slug:'fanzines-punk',t:'Antes del enlace estaba la fotocopia',b:'CUADERNO · PUBLICACIONES · MEDELLÍN',d:'Hubo un tiempo en que la única red social posible era una fotocopia doblada en cuatro, manchada de tinta barata y pasada de mano en mano al pie de una tarima. La urgencia de decir algo cuando la ciudad parecía empeñada en no escuchar.',a:'Fotocopiadora Xerox y mesa de fanzine'},
    {slug:'sonideros',t:'El barrio tiene una voz amplificada',b:'CUADERNO · SONIDO & ESPACIO PÚBLICO · CIUDAD DE MÉXICO',d:'En medio del asfalto y de la noche, una voz amplificada manda saludos a los ausentes, a los que cruzaron la frontera, a los que bailan bajo la luz de un poste. La terquedad comunitaria de fundar una plaza donde no había más que cemento.',a:'Baile sonidero en Ciudad de México'},
    {slug:'arpilleras',t:'Coser lo que no cabía en la noticia',b:'CUADERNO · OFICIOS & MEMORIA · CHILE',d:'Cuando la palabra fue prohibida y el miedo vigilaba las esquinas, las mujeres recogieron los retazos viejos de los pantalones y los manteles para coser con aguja e hilo la verdad que los periódicos callaban.',a:'Detalle de arpillera chilena testimonial'},
    {slug:'aparelhagens',t:'La fiesta también fabrica tecnología',b:'CUADERNO · SONIDO & CULTURA FESTIVA · PARÁ, BRASIL',d:'Dicen que la tecnología se inventa en laboratorios asépticos y distantes; no han visto levantarse una torre de fierro, neón y decibeles en los suburbios de Belém. No es la máquina la que inventa la fiesta: es la fiesta la que obliga a la máquina a existir.',a:'Aparelhagem con luces y sonido en Pará'},
    {slug:'mates-burilados',t:'Una historia que obliga a girar',b:'CUADERNO · OFICIOS & NARRACIÓN · JUNÍN, PERÚ',d:'Para leer una calabaza no basta con mirarla de frente: hay que tomarla entre las manos y hacerla girar despacio, como quien sigue el curso de los meses. La incisión menuda guarda una boda, una siembra, una vida entera que no cabe en línea recta.',a:'Mate burilado con escenas grabadas sobre calabaza'},
    {slug:'sesc-pompeia',t:'Una fábrica para el tiempo libre',b:'CUADERNO · ESPACIOS & CONVIVENCIA · SÃO PAULO',d:'Lina Bo Bardi encontró una fábrica de tambores abandonada y decidió que allí no hacían falta monumentos solemnes, sino un sitio donde la gente pudiera sentarse a leer, jugar y conversar sin pedir permiso. La arquitectura como una forma de vivir juntos.',a:'Espacios de convivencia en SESC Pompéia'},
    {slug:'arquitectura-cholet',t:'La nave de vidrio en el altiplano',b:'CUADERNO · ESPACIOS & CULTURA POPULAR · BOLIVIA',d:'Palacios de policarbonato, aluminio y vidrio que desafían el canon austero de la arquitectura blanca: la afirmación material aymara a cuatro mil metros sobre el mar.',a:'Fachada multicolor de un edificio cholet en El Alto'},
    {slug:'rotulacion-popular',t:'La ciudad escrita a mano',b:'CUADERNO · GRÁFICA & TIPOGRAFÍA · LATINOAMÉRICA',d:'La ciudad también se escribe a mano alzada. Letras gordas, sombras inventadas y colores vivos sobre la vitrina de un comercio de barrio: la tipografía viva de quienes no tuvieron tiempo ni necesidad de consultar un manual de estilo.',a:'Avisos pintados en comercio popular'},
    {slug:'chicha-afiches',t:'El grito de fósforo sobre el cemento',b:'CUADERNO · GRÁFICA & TIPOGRAFÍA · LIMA, PERÚ',d:'Sobre la bruma y las paredes de adobe de Lima, la migración andina imprimió un alfabeto de tintas fosforescentes que no pide permiso para existir.',a:'Muro tapizado con carteles chicha y tipografía fosforescente en Lima'},
    {slug:'luchalibre-mascaras',t:'La piel sagrada del anonimato',b:'CUADERNO · CULTURA POPULAR & OBJETOS · MÉXICO',d:'En un sótano de barrio, un sastre corta retazos de vinil y charol para coser una segunda piel que nunca mostrará las fatigas del rostro civil.',a:'Colección de máscaras de lucha libre en un puesto popular de la Ciudad de México'},
    {slug:'antropologia-del-remiendo',t:'La dignidad obstinada del remiendo',b:'CUADERNO · OFICIOS & MATERIALES · AMÉRICA LATINA',d:'Antes de que el mercado decretara que las cosas nacen para ser arrojadas a la basura, las manos populares inventaron una sabiduría del alambre y el parche.',a:'Zapatero remendón en su taller artesanal en 1903'}
  ];

  const SIDES = {
    'picos': {slug:'picos',t:'El parlante también tiene pintor',m:'SONIDO · CARIBE COLOMBIANO',d:'Antes de que suene la música, la máquina ya dijo quién es: el oficio donde la acústica barrial se reconoce con los ojos.',a:'Frente de picó El Rojo'},
    'barniz-pasto': {slug:'barniz-pasto',t:'Una piel que se corta, no se pinta',m:'OFICIOS · PASTO, COLOMBIA',d:'Láminas de resina vegetal masticada y templada a mano: un saber de selva que no empieza en el taller visible.',a:'Gilberto Granja trabajando barniz'},
    'quinchamali': {slug:'quinchamali',t:'La aguja dejó el disco y entró en la greda',m:'MATERIALES · ÑUBLE, CHILE',d:'Una aguja de vitrola entra en la greda tibia. El contraste entre barro ahumado y tierra blanca modelado a mano.',a:'Alfarería negra de Quinchamalí'},
    'fanzines-punk': {slug:'fanzines-punk',t:'Antes del enlace estaba la fotocopia',m:'PUBLICACIONES · MEDELLÍN',d:'El computador convivía con la fotocopia: la urgencia de poner una voz en la calle sin pedir permiso.',a:'Fotocopiadora y mesa de fanzine'}
  };

  let currentSlug = 'picos';

  function updateSides(chosenSlug) {
    const cards = document.querySelectorAll('.side-card');
    if (cards.length < 3) return;
    const targets = ['barniz-pasto', 'quinchamali', 'fanzines-punk'].map(s => s === chosenSlug ? 'picos' : s);
    cards.forEach((card, i) => {
      const s = SIDES[targets[i]];
      if (!s) return;
      card.href = s.slug + '.html';
      const img = card.querySelector('img');
      if (img) { img.src = s.slug + '-1-640.webp'; img.alt = s.a; }
      const meta = card.querySelector('.side-meta');
      if (meta) meta.textContent = s.m;
      const h3 = card.querySelector('h3');
      if (h3) h3.textContent = s.t;
      const p = card.querySelector('p');
      if (p) p.textContent = s.d;
    });
  }

  function applyHero(item) {
    currentSlug = item.slug;
    hero.querySelectorAll('a').forEach(a => {
      a.href = item.slug + '.html';
      if (a.classList.contains('hero-media-link')) a.setAttribute('aria-label', 'Leer ' + item.t);
    });
    const img = hero.querySelector('img');
    if (img) {
      img.src = item.slug + '-1-1280.webp';
      img.srcset = item.slug + '-1-640.webp 640w, ' + item.slug + '-1-1280.webp 960w';
      img.alt = item.a;
    }
    const badge = hero.querySelector('.hero-badge');
    if (badge) badge.textContent = item.b;
    const h2 = hero.querySelector('h2 a') || hero.querySelector('h2');
    if (h2) h2.textContent = item.t;
    const p = hero.querySelector('.hero-content p') || hero.querySelector('p');
    if (p) p.textContent = item.d;
    updateSides(item.slug);
  }

  function pickHero(forceDifferent) {
    const pool = forceDifferent ? HEROES.filter(h => h.slug !== currentSlug) : HEROES;
    applyHero(pool[Math.floor(Math.random() * pool.length)]);
  }

  document.getElementById('hero-shuffle')?.addEventListener('click', e => {
    e.preventDefault();
    pickHero(true);
  });

  pickHero(false);
})();