/* =========================================================================
   ORDRE DES LIVRES — celui de TON plan de lecture en 66 mois (alternance
   Ancien / Nouveau Testament), et non l'ordre classique du sommaire biblique.
   C'est cet ordre qui règle la liste déroulante "Livre" du journal.
   ========================================================================= */
const planOrder = [
  "Genèse","Matthieu","Exode","Marc","Lévitique","Luc","Nombres","Jean",
  "Deutéronome","Actes","Josué","Romains","Juges","1 Corinthiens","Ruth",
  "2 Corinthiens","1 Samuel","Galates","2 Samuel","Éphésiens","1 Rois",
  "Philippiens","2 Rois","Colossiens","1 Chroniques","1 Thessaloniciens",
  "2 Chroniques","2 Thessaloniciens","Esdras","1 Timothée","Néhémie",
  "2 Timothée","Esther","Tite","Job","Philémon","Psaumes","Hébreux",
  "Proverbes","Jacques","Ecclésiaste","1 Pierre","Cantique des Cantiques",
  "2 Pierre","Ésaïe","1 Jean","Jérémie","2 Jean","Lamentations","3 Jean",
  "Ézéchiel","Jude","Daniel","Apocalypse","Osée","Joël","Amos","Abdias",
  "Jonas","Michée","Nahum","Habacuc","Sophonie","Aggée","Zacharie","Malachie"
];

const chapters = {
"Genèse":50,"Exode":40,"Lévitique":27,"Nombres":36,"Deutéronome":34,"Josué":24,"Juges":21,"Ruth":4,
"1 Samuel":31,"2 Samuel":24,"1 Rois":22,"2 Rois":25,"1 Chroniques":29,"2 Chroniques":36,"Esdras":10,
"Néhémie":13,"Esther":10,"Job":42,"Psaumes":150,"Proverbes":31,"Ecclésiaste":12,"Cantique des Cantiques":8,
"Ésaïe":66,"Jérémie":52,"Lamentations":5,"Ézéchiel":48,"Daniel":12,"Osée":14,"Joël":3,"Amos":9,"Abdias":1,
"Jonas":4,"Michée":7,"Nahum":3,"Habacuc":3,"Sophonie":3,"Aggée":2,"Zacharie":14,"Malachie":4,
"Matthieu":28,"Marc":16,"Luc":24,"Jean":21,"Actes":28,"Romains":16,"1 Corinthiens":16,"2 Corinthiens":13,
"Galates":6,"Éphésiens":6,"Philippiens":4,"Colossiens":4,"1 Thessaloniciens":5,"2 Thessaloniciens":3,
"1 Timothée":6,"2 Timothée":4,"Tite":3,"Philémon":1,"Hébreux":13,"Jacques":5,"1 Pierre":5,"2 Pierre":3,
"1 Jean":5,"2 Jean":1,"3 Jean":1,"Jude":1,"Apocalypse":22
};

const allBooks = planOrder;

/* Noms anglais des 66 livres, dans le même ordre que l'objet `chapters`
   (ordre canonique) — utilisés uniquement pour construire les liens vers
   la version anglaise Amplified (voir verseVersionLinks). */
const CANONICAL_BOOK_ORDER = Object.keys(chapters);
/* Codes des 66 livres sur bible.com (l'appli/site YouVersion), dans le
   même ordre que CANONICAL_BOOK_ORDER — norme standard utilisée par la
   plupart des sites bibliques. */
const BOOK_CODE_BIBLECOM = [
  "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
  "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP",
  "HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI",
  "2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"
];
/* Découpe une référence du type "Josué 1:8" ou "Matthieu 6:17-18" en
   {livre, chapitre, verset} (le premier verset d'un intervalle). */
function parseRef(ref){
  const m = String(ref).match(/^(.*)\s+(\d+):(\d+)/);
  if(!m) return null;
  return { livre: m[1].trim(), chapitre: parseInt(m[2],10), verset: parseInt(m[3],10) };
}
/* Construit des liens de lecture pour d'autres versions de la Bible, tous
   vers le même site (bible.com — l'appli "YouVersion", la plus connue et
   la plus simple). Louis Segond 1910 reste affiché directement dans
   l'appli (texte inclus, domaine public). Les autres versions (Segond 21,
   Semeur, Parole de Vie, Darby, Amplified) sont protégées par des droits
   d'auteur : impossible d'en recopier le texte ici sans l'accord de
   l'éditeur, donc on ouvre le bon verset, déjà sélectionné, directement
   sur bible.com dans un nouvel onglet — un seul site pour les 5 versions.

   Pour Segond 21, Semeur et Darby, EMCI TV (emcitv.com) propose une page
   de lecture simple, juste le texte, sans rien d'autre — préférée à
   bible.com pour ces trois-là. Parole de Vie et Amplified ne sont pas
   disponibles sur EMCI, donc ces deux-là restent sur bible.com. */
function slugifyBookForEmci(livre){
  return livre
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // enlève les accents
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-');
}
function verseVersionLinks(ref){
  const p = parseRef(ref);
  if(!p) return [];
  const idx = CANONICAL_BOOK_ORDER.indexOf(p.livre);
  const bookCode = idx >= 0 ? BOOK_CODE_BIBLECOM[idx] : null;
  if(!bookCode) return [];
  const loc = bookCode + '.' + p.chapitre + '.' + p.verset;
  const emciBook = slugifyBookForEmci(p.livre);
  const emciBase = 'https://emcitv.com/bible/' + emciBook + '-' + p.chapitre;
  const links = [
    { label:'Segond 21', url: emciBase + '-segond_21.html#' + p.verset },
    { label:'Semeur', url: emciBase + '.html#' + p.verset },
    { label:'Parole de Vie', url:'https://www.bible.com/bible/133/'+loc+'.PDV2017' },
    { label:'Darby', url: emciBase + '-darby.html#' + p.verset },
    { label:'Amplified (EN)', url:'https://www.bible.com/bible/1588/'+loc+'.AMP' }
  ];
  return links;
}
const TOTAL_CHAPTERS = Object.values(chapters).reduce((a,b)=>a+b,0); // 1189

const logLivreSelect = document.getElementById('logLivre');
allBooks.forEach(b=>{
  const opt = document.createElement('option');
  opt.value = b; opt.textContent = b;
  logLivreSelect.appendChild(opt);
});
function onLogLivreChange(){
  const maxCh = chapters[logLivreSelect.value] || 1;
  fillChapterSelect(document.getElementById('logDe'), maxCh);
  fillChapterSelect(document.getElementById('logA'), maxCh);
}
onLogLivreChange();

/* =========================================================================
   NOMBRE DE VERSETS PAR CHAPITRE — pour que le menu déroulant "verset" ne
   propose jamais plus de versets que le chapitre concerné n'en contient.
   Chiffres exacts (vérifiés) pour les livres ci-dessous ; pour les autres
   (les plus longs livres), un plafond généreux par livre — jamais inférieur
   au vrai nombre, au pire un peu large sur de rares chapitres.
   ========================================================================= */
const versesPerChapter = {
  "Ruth":[22,23,18,22],
  "Esdras":[11,70,13,24,17,22,28,36,15,44],
  "Néhémie":[11,20,32,23,19,19,73,18,38,39,36,47,31],
  "Esther":[22,23,15,17,14,14,10,17,32,3],
  "Ecclésiaste":[18,26,22,16,20,12,29,17,18,20,10,14],
  "Cantique des Cantiques":[17,17,11,16,16,13,13,14],
  "Lamentations":[22,22,66,22,22],
  "Daniel":[21,49,30,37,31,28,28,27,27,21,45,13],
  "Osée":[11,23,5,19,15,11,16,14,17,15,12,14,16,9],
  "Joël":[20,32,21],
  "Amos":[15,16,15,13,27,14,17,14,15],
  "Abdias":[21],
  "Jonas":[17,10,10,11],
  "Michée":[16,13,12,13,15,16,20],
  "Nahum":[15,13,19],
  "Habacuc":[17,20,19],
  "Sophonie":[18,15,20],
  "Aggée":[15,23],
  "Zacharie":[21,13,10,14,11,15,14,23,17,12,17,14,9,21],
  "Malachie":[14,17,18,6],
  "Josué":[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
  "Juges":[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
  "Galates":[24,21,29,31,26,18],
  "Éphésiens":[23,22,21,32,33,24],
  "Philippiens":[30,30,21,23],
  "Colossiens":[29,23,25,18],
  "1 Thessaloniciens":[10,20,13,18,28],
  "2 Thessaloniciens":[12,17,18],
  "1 Timothée":[20,15,16,16,25,21],
  "2 Timothée":[18,26,17,22],
  "Tite":[16,15,15],
  "Philémon":[25],
  "Jacques":[27,26,18,17,20],
  "1 Pierre":[25,25,22,19,14],
  "2 Pierre":[21,22,18],
  "1 Jean":[10,29,24,21,21],
  "2 Jean":[13],
  "3 Jean":[14],
  "Jude":[25],
  "Romains":[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],
  "2 Corinthiens":[24,17,18,18,21,18,16,24,15,18,33,21,14],
  "Hébreux":[14,18,19,16,14,20,28,13,28,39,40,29,25],
  "1 Corinthiens":[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
  "Apocalypse":[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21],
  "Psaumes":[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6]
};
// Plafond par livre pour les livres dont je n'ai pas encore le détail exact
// chapitre par chapitre — volontairement large pour ne jamais couper un
// vrai verset.
const versesBookCap = {
  "Genèse":40,"Exode":40,"Lévitique":60,"Nombres":90,"Deutéronome":40,
  "1 Samuel":60,"2 Samuel":45,"1 Rois":70,"2 Rois":40,"1 Chroniques":55,"2 Chroniques":40,
  "Job":45,"Proverbes":35,"Ésaïe":35,"Jérémie":45,"Ézéchiel":50,
  "Matthieu":60,"Marc":60,"Luc":80,"Jean":75,"Actes":60
};
const PSAUME_119_CAP = 176; // le plus long chapitre de toute la Bible

function maxVersetPour(livre, chapitre){
  if(livre === "Psaumes"){
    const arr = versesPerChapter["Psaumes"];
    if(chapitre>=1 && chapitre<=arr.length) return arr[chapitre-1];
    return PSAUME_119_CAP;
  }
  const arr = versesPerChapter[livre];
  if(arr && arr[chapitre-1]) return arr[chapitre-1];
  if(versesBookCap[livre]) return versesBookCap[livre];
  return 60; // filet de sécurité pour un cas non couvert
}

function fillVerseSelect(select, max){
  if(!select) return;
  const prev = select.value;
  select.innerHTML = '';
  const empty = document.createElement('option');
  empty.value = ''; empty.textContent = '— (aucun) —';
  select.appendChild(empty);
  for(let v=1; v<=max; v++){
    const opt = document.createElement('option');
    opt.value = v; opt.textContent = 'Verset ' + v;
    select.appendChild(opt);
  }
  if(prev && Number(prev) <= max) select.value = prev;
}
function fillBookSelect(select){
  if(!select) return;
  const prev = select.value;
  select.innerHTML = '';
  allBooks.forEach(b=>{
    const opt = document.createElement('option');
    opt.value = b; opt.textContent = b;
    select.appendChild(opt);
  });
  if(prev && allBooks.includes(prev)) select.value = prev;
}
function fillChapterSelect(select, maxCh){
  if(!select) return;
  const prev = select.value;
  select.innerHTML = '';
  for(let c=1; c<=maxCh; c++){
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = 'Chapitre ' + c;
    select.appendChild(opt);
  }
  if(prev && Number(prev) <= maxCh) select.value = prev;
}

/* Livre / Chapitre / Verset : 3 menus déroulants liés, sur Journal de
   compréhension ET Prières — plus de saisie manuelle nulle part, et le
   menu "verset" ne propose jamais plus de versets que le chapitre choisi
   n'en a réellement. */
function onCompLivreChange(){
  const livre = document.getElementById('compLivre').value;
  fillChapterSelect(document.getElementById('compChapitre'), chapters[livre] || 1);
  onCompChapitreChange();
}
function onCompChapitreChange(){
  const livre = document.getElementById('compLivre').value;
  const chap = parseInt(document.getElementById('compChapitre').value) || 1;
  fillVerseSelect(document.getElementById('compVerset'), maxVersetPour(livre, chap));
}
function onPrayerLivreChange(){
  const livre = document.getElementById('prayerLivre').value;
  fillChapterSelect(document.getElementById('prayerChapitre'), chapters[livre] || 1);
  onPrayerChapitreChange();
}
function onPrayerChapitreChange(){
  const livre = document.getElementById('prayerLivre').value;
  const chap = parseInt(document.getElementById('prayerChapitre').value) || 1;
  fillVerseSelect(document.getElementById('prayerVerse'), maxVersetPour(livre, chap));
}

/* Remplit les menus déroulants Livre/Chapitre/Verset la première fois
   (une seule fois — on ne réinitialise jamais un choix déjà fait), avec
   comme valeur de départ le livre/chapitre de la DERNIÈRE lecture
   enregistrée, pour te faire gagner du temps. */
function refreshVerseSelects(){
  const last = lastLogEntry();
  const defaultLivre = last ? last.livre : allBooks[0];
  const defaultChap = last ? last.a : 1;

  const compLivreSel = document.getElementById('compLivre');
  const compChapSel = document.getElementById('compChapitre');
  const compVerseSel = document.getElementById('compVerset');
  if(compLivreSel && compChapSel && compVerseSel && !compLivreSel.options.length){
    fillBookSelect(compLivreSel);
    compLivreSel.value = defaultLivre;
    fillChapterSelect(compChapSel, chapters[compLivreSel.value] || 1);
    compChapSel.value = Math.min(defaultChap, chapters[compLivreSel.value] || 1);
    fillVerseSelect(compVerseSel, maxVersetPour(compLivreSel.value, parseInt(compChapSel.value)||1));
  }

  const prayerLivreSel = document.getElementById('prayerLivre');
  const prayerChapSel = document.getElementById('prayerChapitre');
  const prayerVerseSel = document.getElementById('prayerVerse');
  if(prayerLivreSel && prayerChapSel && prayerVerseSel && !prayerLivreSel.options.length){
    fillBookSelect(prayerLivreSel);
    prayerLivreSel.value = defaultLivre;
    fillChapterSelect(prayerChapSel, chapters[prayerLivreSel.value] || 1);
    prayerChapSel.value = Math.min(defaultChap, chapters[prayerLivreSel.value] || 1);
    fillVerseSelect(prayerVerseSel, maxVersetPour(prayerLivreSel.value, parseInt(prayerChapSel.value)||1));
  }
}

let state = { dateDebut: new Date().toISOString().slice(0,10), chapterLog: [], compLog: [], prayers: [], settings: { palette:'dore', bg:'dore' } };

/* =========================================================================
   APPARENCE — palette de couleurs + fond d'écran, choisis dans Paramètres
   et enregistrés dans state.settings (donc synchronisés comme le reste).
   ========================================================================= */
/* Fond d'écran "automatique" : 60 ambiances de couleurs différentes (12
   teintes x 5 motifs), une par jour, calculées à la volée (donc aucune
   image à télécharger — ça marche même sans connexion). Le même principe
   que le verset du jour : le jour de l'année détermine laquelle sortir. */
function generateDailyBg(index){
  const hues = [205,225,250,275,300,325,350,15,40,65,90,160];
  const hueIdx = Math.floor(index/5) % hues.length;
  const patternIdx = index % 5;
  const h = hues[hueIdx];
  const h2 = (h+45)%360;
  const hDark = (h+210)%360;
  switch(patternIdx){
    case 0: return 'radial-gradient(circle at 15% -10%, hsla('+h+',70%,92%,.55), transparent 45%), '
      + 'linear-gradient(180deg, hsla('+h+',55%,93%,1), hsla('+h+',50%,76%,1) 55%, hsla('+h+',45%,56%,1))';
    case 1: return 'radial-gradient(circle at 10% 0%, hsla('+h+',65%,86%,.5), transparent 40%), '
      + 'radial-gradient(circle at 90% 100%, hsla('+h2+',60%,72%,.4), transparent 45%), '
      + 'linear-gradient(160deg, hsla('+h+',50%,91%,1), hsla('+h+',45%,66%,1))';
    case 2: return 'radial-gradient(circle at 50% 100%, hsla('+h+',70%,82%,.5), transparent 55%), '
      + 'linear-gradient(180deg, hsla('+hDark+',48%,30%,1), hsla('+h+',55%,60%,1) 60%, hsla('+h+',60%,82%,1))';
    case 3: return 'radial-gradient(circle at 20% 0%, rgba(255,255,255,.7), transparent 40%), '
      + 'radial-gradient(circle at 85% 15%, rgba(255,255,255,.5), transparent 38%), '
      + 'linear-gradient(180deg, hsla('+h+',40%,91%,1), hsla('+h+',35%,81%,1) 60%, hsla('+h+',30%,93%,1))';
    default: return 'radial-gradient(circle at 20% 10%, hsla('+h+',70%,62%,.45), transparent 45%), '
      + 'radial-gradient(circle at 80% 20%, hsla('+h2+',65%,57%,.4), transparent 45%), '
      + 'linear-gradient(180deg, hsla('+hDark+',40%,11%,1), hsla('+hDark+',35%,19%,1) 55%, hsla('+hDark+',30%,26%,1))';
  }
}
function applyAppearance(){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  document.documentElement.setAttribute('data-palette', state.settings.palette || 'dore');
  const bg = state.settings.bg || 'dore';
  if(bg === 'auto'){
    document.body.removeAttribute('data-bg');
    const start = new Date(new Date().getFullYear(), 0, 0);
    const dayOfYear = Math.floor((new Date() - start) / 86400000);
    document.body.style.background = generateDailyBg(dayOfYear % 60);
    document.body.style.backgroundAttachment = 'fixed';
  } else {
    document.body.style.background = '';
    document.body.style.backgroundAttachment = '';
    document.body.setAttribute('data-bg', bg);
  }
  const palSel = document.getElementById('paletteSelect');
  const bgSel = document.getElementById('bgSelect');
  if(palSel) palSel.value = state.settings.palette || 'dore';
  if(bgSel) bgSel.value = state.settings.bg || 'dore';

  const musicBar = document.getElementById('musicCard');
  if(musicBar){
    const collapsed = !!state.settings.musicCollapsed;
    musicBar.classList.toggle('collapsed', collapsed);
    const arrow = document.getElementById('musicBarArrow');
    if(arrow) arrow.textContent = collapsed ? '▸' : '▾';
  }
  applyTypography();
}
function setPalette(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.palette = v;
  // On applique D'ABORD visuellement (jamais bloqué par un souci de sauvegarde
  // réseau), PUIS on essaie d'enregistrer — ainsi le changement se voit tout
  // de suite, même si la sauvegarde cloud rencontre un problème.
  applyAppearance();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (palette) :', e); }
}
function setBackground(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.bg = v;
  applyAppearance();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (fond) :', e); }
}

/* =========================================================================
   TYPOGRAPHIE — police, gras/italique, taille du texte, choisis dans
   Apparence. Appliqués sur toute l'appli (body + taille de référence "rem").
   ========================================================================= */
const POLICES = {
  default: '"Avenir","Segoe UI",sans-serif',
  opensans: '"Open Sans",sans-serif',
  lato: '"Lato",sans-serif',
  poppins: '"Poppins",sans-serif',
  nunito: '"Nunito",sans-serif',
  merriweather: '"Merriweather",serif',
  playfair: '"Playfair Display",serif',
  georgia: 'Georgia,"Times New Roman",serif',
  times: '"Times New Roman",Times,serif',
  verdana: 'Verdana,Geneva,sans-serif',
  courier: '"Courier New",Courier,monospace',
  comic: '"Comic Sans MS","Comic Sans",cursive',
  arial: 'Arial,Helvetica,sans-serif',
  gothique: '"UnifrakturMaguntia","Old English Text MT",serif'
};
const TAILLES_TEXTE = { petit:'14px', normal:'16px', grand:'18px', tresgrand:'21px' };
function applyTypography(){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  const fam = state.settings.fontFamily || 'default';
  document.body.style.fontFamily = POLICES[fam] || POLICES.default;
  const style = state.settings.fontStyle || 'normal';
  document.body.style.fontWeight = (style === 'gras' || style === 'gras-italique') ? 'bold' : 'normal';
  document.body.style.fontStyle = (style === 'italique' || style === 'gras-italique') ? 'italic' : 'normal';
  const taille = state.settings.fontSize || 'normal';
  document.documentElement.style.fontSize = TAILLES_TEXTE[taille] || TAILLES_TEXTE.normal;
  const famSel = document.getElementById('fontSelect');
  const styleSel = document.getElementById('fontStyleSelect');
  const tailleSel = document.getElementById('fontSizeSelect');
  if(famSel) famSel.value = fam;
  if(styleSel) styleSel.value = style;
  if(tailleSel) tailleSel.value = taille;
}
function setFontFamily(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.fontFamily = v;
  applyTypography();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (police) :', e); }
}
function setFontStyle(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.fontStyle = v;
  applyTypography();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (style) :', e); }
}
function setFontSize(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.fontSize = v;
  applyTypography();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (taille) :', e); }
}

/* =========================================================================
   MESSAGE DU JOUR (VIDÉO) — pas de connexion automatique à une chaîne
   YouTube (pas fiable sans serveur / clé d'API), donc : tu colles tes
   liens favoris une fois dans Paramètres, et l'appli en choisit un
   différent chaque jour toute seule, avec le même principe que le verset
   du jour (donc "automatique" au sens où tu n'as plus rien à faire ensuite).
   ========================================================================= */
function extractYouTubeId(url){
  const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{6,15})/);
  return m ? m[1] : null;
}
function getVideoIds(){
  // Les liens viennent de video-config.js (fichier édité sur GitHub), pas
  // d'un champ dans l'appli — ils ne s'affichent donc nulle part dans les
  // Paramètres.
  const links = (typeof videoLinks !== 'undefined' && Array.isArray(videoLinks)) ? videoLinks : [];
  return links.map(extractYouTubeId).filter(Boolean);
}
function renderVideoOfDay(){
  const box = document.getElementById('videoOfDay');
  const card = document.getElementById('videoCard');
  if(!box) return;
  const ids = getVideoIds();
  if(!ids.length){
    // Rien de configuré dans video-config.js : toute la carte (titre compris)
    // reste masquée, plutôt que d'afficher un message vide en permanence.
    if(card) card.style.display = 'none';
    box.innerHTML = '';
    return;
  }
  if(card) card.style.display = '';
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - start) / 86400000);
  const id = ids[dayOfYear % ids.length];
  box.innerHTML = '<div class="video-wrap"><iframe src="https://www.youtube.com/embed/'+id+'" title="Message du jour" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
}

/* =========================================================================
   MUSIQUE DU JOUR — même principe que le message du jour ci-dessus, mais
   avec sa propre liste (music-config.js) et son propre décalage dans la
   rotation quotidienne (+17) pour ne pas toujours changer le même jour que
   la vidéo.
   ========================================================================= */
function getMusicIds(){
  const links = (typeof musicLinks !== 'undefined' && Array.isArray(musicLinks)) ? musicLinks : [];
  return links.map(extractYouTubeId).filter(Boolean);
}
/* Accepte un lien de playlist Spotify ("Partager" > "Copier le lien vers
   la playlist") sous ses différentes formes (open.spotify.com/playlist/...,
   avec ou sans paramètres après le ?, ou spotify:playlist:...). */
function extractSpotifyPlaylistId(url){
  if(!url) return null;
  const m = String(url).match(/playlist[/:]([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}
function renderMusicOfDay(){
  const box = document.getElementById('musicOfDay');
  const card = document.getElementById('musicCard');
  if(!box) return;

  // Priorité à une playlist Spotify si elle est configurée : plus simple,
  // et ça permet à n'importe qui d'écouter directement sans compte,
  // Spotify se chargeant lui-même de faire défiler les titres.
  const spotifyId = (typeof spotifyPlaylistUrl !== 'undefined') ? extractSpotifyPlaylistId(spotifyPlaylistUrl) : null;
  if(spotifyId){
    if(card) card.dataset.hasContent = '1';
    updateMusicBarVisibility();
    box.innerHTML = '<div class="spotify-wrap"><iframe src="https://open.spotify.com/embed/playlist/'+spotifyId+'?utm_source=generator" '
      + 'title="Louange & adoration" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>';
    return;
  }

  // Sinon, on retombe sur la liste de liens YouTube (même principe que la
  // vidéo du jour) : un titre différent choisi automatiquement chaque jour.
  const ids = getMusicIds();
  if(!ids.length){
    if(card) card.dataset.hasContent = '0';
    updateMusicBarVisibility();
    box.innerHTML = '';
    return;
  }
  if(card) card.dataset.hasContent = '1';
  updateMusicBarVisibility();
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - start) / 86400000);
  const id = ids[(dayOfYear + 17) % ids.length];

  // Juste un petit lecteur audio (bouton lecture/pause), pas la vidéo :
  // la vidéo YouTube tourne bien, mais réduite à 1x1 et cachée — seul le
  // son en sort. Le bouton pilote cette vidéo cachée via l'API YouTube.
  box.innerHTML = '<div class="audio-player">'
    + '<button id="audioPlayBtn" class="audio-play-btn" onclick="toggleMusicPlayback()">▶</button>'
    + '<div class="audio-info">Chant en fond</div>'
    + '<div style="width:0; height:0; overflow:hidden;"><div id="ytAudioMount"></div></div>'
    + '</div>';
  createYtAudioPlayer(id);
}
/* La barre "Louange & adoration" ne s'affiche que sur la page Accueil,
   mais elle reste montée en dehors de #appRoot (voir le commentaire dans
   index.html) donc le son continue de jouer sans interruption même sur
   les autres pages — on ne fait que la masquer visuellement. */
function updateMusicBarVisibility(){
  const card = document.getElementById('musicCard');
  if(!card) return;
  const hasContent = card.dataset.hasContent === '1';
  const accueil = document.getElementById('page-accueil');
  const surAccueil = !!accueil && !accueil.hidden;
  card.style.display = (hasContent && surAccueil) ? '' : 'none';
}
/* =========================================================================
   LECTEUR AUDIO CACHÉ POUR "LOUANGE & ADORATION" — utilise l'API YouTube
   (chargée en fin de page) pour piloter une vidéo réduite à 1x1 px, sans
   jamais afficher l'image : seuls le son et un simple bouton ▶/⏸ restent
   visibles, comme un vrai lecteur audio.
   ========================================================================= */
let ytPlayer = null;
let ytPendingVideoId = null;
function loadYouTubeIframeAPIScript(){
  if(document.getElementById('ytIframeApiScript')) return;
  const tag = document.createElement('script');
  tag.id = 'ytIframeApiScript';
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}
window.onYouTubeIframeAPIReady = function(){
  if(ytPendingVideoId){ createYtAudioPlayer(ytPendingVideoId); ytPendingVideoId = null; }
};
function createYtAudioPlayer(videoId){
  if(!window.YT || !window.YT.Player){
    ytPendingVideoId = videoId;
    loadYouTubeIframeAPIScript();
    return;
  }
  if(ytPlayer){ try{ ytPlayer.destroy(); }catch(e){} ytPlayer = null; }
  const mount = document.getElementById('ytAudioMount');
  if(!mount) return;
  ytPlayer = new YT.Player('ytAudioMount', {
    videoId: videoId, width:'2', height:'2',
    playerVars: { autoplay:0, controls:0, disablekb:1, fs:0, modestbranding:1 },
    events: {
      onStateChange: function(e){
        const btn = document.getElementById('audioPlayBtn');
        if(!btn) return;
        btn.textContent = (e.data === YT.PlayerState.PLAYING) ? '⏸' : '▶';
      }
    }
  });
}
function toggleMusicPlayback(){
  if(!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;
  const s = ytPlayer.getPlayerState();
  if(s === 1){ ytPlayer.pauseVideo(); } else { ytPlayer.playVideo(); }
}

/* =========================================================================
   PROPOSITIONS DE LIVRES CHRÉTIENS — même principe que le verset du jour :
   une suggestion différente chaque jour, tirée de livres-config.js (rempli
   par toi). Le reste de la liste reste consultable via "Voir toutes mes
   suggestions".
   ========================================================================= */
function renderBookOfDay(){
  const card = document.getElementById('booksCard');
  const box = document.getElementById('bookOfDay');
  if(!box) return;
  const books = (typeof livresChretiens !== 'undefined' && Array.isArray(livresChretiens)) ? livresChretiens : [];
  if(!books.length){
    if(card) card.style.display = 'none';
    box.innerHTML = '';
    return;
  }
  if(card) card.style.display = '';
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((new Date() - start) / 86400000);
  const b = books[dayOfYear % books.length];
  box.innerHTML = bookSuggestionHTML(b, 'day');
  loadBookCover('day', b);
}
function bookSuggestionHTML(b, idBase){
  return '<div class="book-suggestion">'
    + '<div class="book-cover-wrap">'
    +   '<div class="book-cover-ph" id="ph-'+idBase+'">📖</div>'
    +   '<img class="book-cover" id="img-'+idBase+'" style="display:none" alt="">'
    + '</div>'
    + '<div class="book-info"><div class="book-title">'+b.titre+'</div><div class="book-author">'+b.auteur+'</div></div>'
    + '</div>';
}
/* Couvertures de livres récupérées automatiquement (gratuit, sans clé) sur
   Open Library — l'appli n'a besoin de connaître que titre + auteur. Mises
   en cache en mémoire le temps de la session pour ne pas re-demander sans
   arrêt ; si rien n'est trouvé (ou hors-ligne), l'icône 📖 reste affichée,
   ce n'est jamais bloquant. */
const bookCoverCache = {};
function bookCoverKey(b){ return (b.titre||'') + '|' + (b.auteur||''); }
function loadBookCover(idBase, book){
  const key = bookCoverKey(book);
  if(Object.prototype.hasOwnProperty.call(bookCoverCache, key)){
    setBookCover(idBase, bookCoverCache[key]);
    return;
  }
  const q = 'title=' + encodeURIComponent(book.titre) + '&author=' + encodeURIComponent(book.auteur);
  fetch('https://openlibrary.org/search.json?' + q + '&fields=cover_i&limit=1')
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      const doc = data && data.docs && data.docs[0];
      const url = (doc && doc.cover_i) ? ('https://covers.openlibrary.org/b/id/' + doc.cover_i + '-M.jpg') : null;
      bookCoverCache[key] = url;
      setBookCover(idBase, url);
    })
    .catch(() => { bookCoverCache[key] = null; setBookCover(idBase, null); });
}
function setBookCover(idBase, url){
  const img = document.getElementById('img-' + idBase);
  const ph = document.getElementById('ph-' + idBase);
  if(!img || !ph) return;
  if(!url){ img.style.display = 'none'; ph.style.display = 'flex'; return; }
  img.onload = () => { ph.style.display = 'none'; img.style.display = 'block'; };
  img.onerror = () => { img.style.display = 'none'; ph.style.display = 'flex'; };
  img.src = url;
}
/* Replie/déplie le lecteur "Louange & adoration" — repliée, la musique
   continue à jouer (on ne fait que la rétrécir visuellement à 0 avec
   max-height, jamais display:none, qui coupe le son de l'iframe dans
   certains navigateurs). L'état choisi est mémorisé. */
function toggleMusicBar(){
  const bar = document.getElementById('musicCard');
  if(!bar) return;
  const collapsed = bar.classList.toggle('collapsed');
  const arrow = document.getElementById('musicBarArrow');
  if(arrow) arrow.textContent = collapsed ? '▸' : '▾';
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.musicCollapsed = collapsed;
  persist();
}

/* =========================================================================
   RAPPELS / NOTIFICATIONS — vérifiés à chaque ouverture de l'appli (et
   chaque retour au premier plan). Sans serveur derrière une appli gratuite
   hébergée sur GitHub Pages, une vraie notification "appli fermée" n'est
   pas possible ; ceci est l'équivalent le plus proche et fonctionne dès
   que tu rouvres l'appli, sans rien à faire.
   ========================================================================= */
function updateNotifUI(){
  const status = document.getElementById('notifStatus');
  const btn = document.getElementById('notifBtn');
  if(!status || !btn) return;
  const supported = ('Notification' in window);
  const on = supported && state.settings && state.settings.notifs && Notification.permission === 'granted';
  status.textContent = !supported ? "🔕 Non pris en charge sur cet appareil" : (on ? "🔔 Rappels activés" : "🔕 Rappels désactivés");
  status.className = "detail " + (on ? "on" : "off");
  btn.textContent = on ? "Désactiver les rappels" : "Activer les rappels";
  btn.disabled = !supported;
  const rythmeSel = document.getElementById('notifRythmeSelect');
  if(rythmeSel) rythmeSel.value = String((state.settings && state.settings.notifRythme) || 1);
}
function setNotifRythme(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.notifRythme = parseInt(v,10) || 1;
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (rythme) :', e); }
}
function toggleNotifs(){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  if(!('Notification' in window)){ alert("Les notifications ne sont pas prises en charge sur cet appareil/navigateur."); return; }
  const currentlyOn = state.settings.notifs && Notification.permission === 'granted';
  if(currentlyOn){
    state.settings.notifs = false;
    persist(); updateNotifUI();
    return;
  }
  Notification.requestPermission().then(perm=>{
    state.settings.notifs = (perm === 'granted');
    persist(); updateNotifUI();
    if(perm === 'granted') checkAndNotify(true);
    else if(perm === 'denied') alert("Les notifications sont bloquées pour cette appli dans les réglages de ton navigateur/téléphone. Autorise-les si tu changes d'avis.");
  });
}
/* Proposition d'activer les rappels, une seule fois à la première ouverture
   (ou tant qu'on n'a pas répondu) : on ne déclenche la VRAIE demande du
   navigateur qu'après un clic explicite sur "Activer" — sur iPhone/iPad
   notamment, demander la permission sans geste de la personne ne marche pas
   toujours et peut être ignoré silencieusement. */
const NOTIF_PROMPT_VU_CLE = 'bible-tracker-notif-prompt-vu';
function verifierPromptNotifications(){
  try{
    if(!('Notification' in window)) return;
    if(Notification.permission !== 'default') return; // déjà répondu (autorisé ou bloqué)
    if(localStorage.getItem(NOTIF_PROMPT_VU_CLE)) return; // déjà proposé une fois
    const overlay = document.getElementById('notifPromptOverlay');
    if(overlay) overlay.hidden = false;
  }catch(e){}
}
function repondrePromptNotif(accepter){
  try{ localStorage.setItem(NOTIF_PROMPT_VU_CLE, '1'); }catch(e){}
  const overlay = document.getElementById('notifPromptOverlay');
  if(overlay) overlay.hidden = true;
  if(!accepter) return;
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  Notification.requestPermission().then(perm=>{
    state.settings.notifs = (perm === 'granted');
    try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (notifs) :', e); }
    updateNotifUI();
    if(perm === 'granted') checkAndNotify(true);
  }).catch(e=> console.error(e));
}

/* =========================================================================
   AVIS 5 ÉTOILES — proposé une seule fois à 7 jours, 1 mois et 3 mois après
   la création du compte (calculé depuis currentUser.metadata.creationTime,
   fourni par Firebase Auth — pas besoin de le stocker nous-mêmes). Stocké
   dans une collection Firestore séparée ("avisApp"), lisible uniquement par
   son auteur et par le compte gérant l'application (voir les règles
   Firestore), pour qu'il/elle puisse consulter et exporter les avis reçus
   depuis l'Espace admin. Ne concerne que les comptes connectés au cloud —
   en mode local, il n'y a personne pour lire l'avis, donc on ne le demande
   jamais.
   ========================================================================= */
const ADMIN_EMAIL = 'ashleymubama@outlook.fr';
function estAdmin(user){
  return !!(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL);
}
const AVIS_PALIERS = [
  { cle:'j7', jours:7, texte:"Ça fait une semaine que tu utilises l'application : comment la trouves-tu ?" },
  { cle:'m1', jours:30, texte:"Ça fait un mois maintenant : toujours du même avis, ou ça a changé ?" },
  { cle:'m3', jours:90, texte:"3 mois d'utilisation : quel avis donnerais-tu aujourd'hui ?" }
];
let etoileChoisie = 0;
let jalonAvisActuel = null;
function verifierAvisMilestones(){
  try{
    if(!currentUser || !currentUser.metadata || !currentUser.metadata.creationTime) return;
    // On ne superpose jamais deux popups : si celle des rappels est encore
    // affichée, on retente un peu plus tard plutôt que de les empiler.
    const notifOverlay = document.getElementById('notifPromptOverlay');
    if(notifOverlay && !notifOverlay.hidden){ setTimeout(verifierAvisMilestones, 1500); return; }
    const snooze = localStorage.getItem('bible-tracker-avis-snooze');
    if(snooze && new Date(snooze) > new Date()) return;
    if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
    if(!state.settings.avisEnvoyes) state.settings.avisEnvoyes = {};
    const joursDepuisInscription = Math.floor((Date.now() - new Date(currentUser.metadata.creationTime).getTime()) / 86400000);
    const palier = AVIS_PALIERS.find(p => joursDepuisInscription >= p.jours && !state.settings.avisEnvoyes[p.cle]);
    if(!palier) return;
    jalonAvisActuel = palier.cle;
    etoileChoisie = 0;
    document.querySelectorAll('.avis-etoile').forEach(e=> e.classList.remove('pleine'));
    const commentEl = document.getElementById('avisCommentaire');
    if(commentEl) commentEl.value = '';
    const sousTitre = document.getElementById('avisPromptSousTitre');
    if(sousTitre) sousTitre.textContent = palier.texte;
    const overlay = document.getElementById('avisPromptOverlay');
    if(overlay) overlay.hidden = false;
  }catch(e){ console.error('Erreur avis :', e); }
}
function choisirEtoile(n){
  etoileChoisie = n;
  document.querySelectorAll('.avis-etoile').forEach(e=>{
    e.classList.toggle('pleine', parseInt(e.dataset.valeur,10) <= n);
  });
}
function envoyerAvis(){
  if(!etoileChoisie){ alert("Choisis une note de 1 à 5 étoiles avant d'envoyer."); return; }
  const commentaire = (document.getElementById('avisCommentaire').value || '').trim();
  const overlay = document.getElementById('avisPromptOverlay');
  if(overlay) overlay.hidden = true;
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  if(!state.settings.avisEnvoyes) state.settings.avisEnvoyes = {};
  state.settings.avisEnvoyes[jalonAvisActuel] = true;
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (avis) :', e); }
  if(useCloud && currentUser){
    firebase.firestore().collection('avisApp').add({
      uid: currentUser.uid,
      email: currentUser.email || null,
      note: etoileChoisie,
      commentaire: commentaire,
      jalon: jalonAvisActuel,
      date: new Date().toISOString()
    }).catch(e=> console.error("Erreur d'envoi de l'avis :", e));
  }
}
function reporterAvis(){
  const overlay = document.getElementById('avisPromptOverlay');
  if(overlay) overlay.hidden = true;
  // On redemande dans 24h plutôt qu'à la prochaine ouverture — moins
  // insistant que le rappel des notifications, qui lui ne revient jamais.
  const demain = new Date(Date.now() + 24*60*60*1000);
  try{ localStorage.setItem('bible-tracker-avis-snooze', demain.toISOString()); }catch(e){}
}
function renderAvisAdmin(){
  const box = document.getElementById('avisAdminListe');
  if(!box) return;
  if(!estAdmin(currentUser)){
    box.innerHTML = '<div class="empty">Accès réservé.</div>';
    return;
  }
  box.innerHTML = '<div class="empty">Chargement…</div>';
  firebase.firestore().collection('avisApp').orderBy('date','desc').get().then(snap=>{
    if(snap.empty){ box.innerHTML = '<div class="empty">Aucun avis reçu pour l\'instant.</div>'; return; }
    box.innerHTML = snap.docs.map(doc=>{
      const a = doc.data();
      const etoiles = '★'.repeat(a.note||0) + '☆'.repeat(5-(a.note||0));
      const d = a.date ? fmtDate(new Date(a.date)) : '';
      const palierLabel = { j7:'7 jours', m1:'1 mois', m3:'3 mois' }[a.jalon] || a.jalon || '';
      return '<div class="avis-admin-item">'
        + '<div class="avis-admin-etoiles">'+etoiles+'</div>'
        + '<div class="detail" style="margin-top:2px;">'+d+' · palier '+palierLabel+(a.email?(' · '+echapperHtml(a.email)):'')+'</div>'
        + (a.commentaire ? '<div style="margin-top:4px;">'+echapperHtml(a.commentaire)+'</div>' : '')
        + '</div>';
    }).join('');
  }).catch(e=>{
    console.error('Erreur de lecture des avis :', e);
    box.innerHTML = '<div class="empty">Impossible de charger les avis (vérifie ta connexion).</div>';
  });
}

/* =========================================================================
   SUIVI D'ACTIVITÉ (pour le tableau de bord admin) — une collection légère
   et séparée ("usersMeta"), qui ne contient JAMAIS le contenu personnel
   (lectures, notes, prières) : seulement email + date d'inscription +
   dernière activité vue. Choix délibéré pour respecter la vie privée des
   adhérentes du groupe : le compte gérant peut voir QUI est inscrit et
   QUAND il/elle est passé·e pour la dernière fois, jamais CE QUE la
   personne a lu ou écrit. La "dernière activité" n'est qu'une date de
   présence rafraîchie pendant que l'appli est ouverte — pas une durée de
   session précise, ce qui n'est techniquement pas mesurable de façon
   fiable dans une appli web.
   ========================================================================= */
let suiviActiviteInterval = null;
function demarrerSuiviActivite(user){
  majActivite(user);
  arreterSuiviActivite();
  // On rafraîchit toutes les 5 minutes tant que l'appli reste ouverte, et
  // aussi quand on revient dessus après l'avoir laissée en arrière-plan.
  suiviActiviteInterval = setInterval(()=> majActivite(user), 5*60*1000);
  document.addEventListener('visibilitychange', suiviActiviteSurRetour);
}
function arreterSuiviActivite(){
  if(suiviActiviteInterval){ clearInterval(suiviActiviteInterval); suiviActiviteInterval = null; }
  document.removeEventListener('visibilitychange', suiviActiviteSurRetour);
}
function suiviActiviteSurRetour(){
  if(document.visibilityState === 'visible' && currentUser) majActivite(currentUser);
}
function majActivite(user){
  if(!user || !useCloud) return;
  try{
    firebase.firestore().collection('usersMeta').doc(user.uid).set({
      email: user.email || null,
      createdAt: (user.metadata && user.metadata.creationTime) || null,
      lastActive: new Date().toISOString()
    }, { merge: true }).catch(e=> console.error('Erreur de suivi d\'activité :', e));
  }catch(e){ console.error('Erreur de suivi d\'activité :', e); }
}
function texteDepuis(dateIso){
  if(!dateIso) return '—';
  const jours = Math.floor((Date.now() - new Date(dateIso).getTime()) / 86400000);
  if(jours <= 0) return "aujourd'hui";
  if(jours === 1) return 'hier';
  if(jours < 30) return 'il y a ' + jours + ' jours';
  const mois = Math.floor(jours/30);
  return 'il y a ' + mois + ' mois';
}
function renderUsersAdmin(){
  const box = document.getElementById('usersAdminListe');
  if(!box) return;
  if(!estAdmin(currentUser)){ box.innerHTML = '<div class="empty">Accès réservé.</div>'; return; }
  box.innerHTML = '<div class="empty">Chargement…</div>';
  firebase.firestore().collection('usersMeta').get().then(snap=>{
    if(snap.empty){ box.innerHTML = '<div class="empty">Aucun compte pour l\'instant.</div>'; return; }
    const lignes = snap.docs.map(doc=> doc.data()).sort((a,b)=> String(b.lastActive||'').localeCompare(String(a.lastActive||'')));
    const total = lignes.length;
    box.innerHTML = '<div class="detail" style="margin-top:0; font-weight:bold;">'+total+' compte'+(total>1?'s':'')+' inscrit'+(total>1?'s':'')+'</div>'
      + '<div style="overflow-x:auto; margin-top:10px;"><table class="groupe-rapport-table"><thead><tr>'
      + '<th>Compte</th><th>Inscrit</th><th>Dernière activité</th></tr></thead><tbody>'
      + lignes.map(u=> '<tr><td>'+echapperHtml(u.email||'—')+'</td><td>'+texteDepuis(u.createdAt)+'</td><td>'+texteDepuis(u.lastActive)+'</td></tr>').join('')
      + '</tbody></table></div>';
  }).catch(e=>{
    console.error('Erreur de lecture des comptes :', e);
    box.innerHTML = '<div class="empty">Impossible de charger les comptes (vérifie ta connexion).</div>';
  });
}

/* =========================================================================
   SUGGESTION MENSUELLE DE SUJET — une fois par mois calendaire, on demande
   aux personnes connectées quel sujet elles aimeraient étudier. Les
   réponses sont visibles par le compte gérant dans l'Espace admin, pour
   choisir un message vidéo en lien avec les sujets demandés.
   ========================================================================= */
function moisActuel(){ const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth()+1); }
function verifierSuggestionMensuelle(){
  try{
    if(!currentUser || !useCloud) return;
    const notifOverlay = document.getElementById('notifPromptOverlay');
    const avisOverlay = document.getElementById('avisPromptOverlay');
    if((notifOverlay && !notifOverlay.hidden) || (avisOverlay && !avisOverlay.hidden)){
      setTimeout(verifierSuggestionMensuelle, 1500); return;
    }
    if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
    if(state.settings.suggestionSujetMois === moisActuel()) return;
    const snooze = localStorage.getItem('bible-tracker-suggestion-snooze');
    if(snooze === moisActuel()) return;
    const overlay = document.getElementById('suggestionPromptOverlay');
    if(overlay) overlay.hidden = false;
  }catch(e){ console.error('Erreur suggestion mensuelle :', e); }
}
function envoyerSuggestion(){
  const texte = (document.getElementById('suggestionTexte').value || '').trim();
  if(!texte){ alert('Écris un mot ou deux sur le sujet qui t\'intéresse avant d\'envoyer.'); return; }
  const overlay = document.getElementById('suggestionPromptOverlay');
  if(overlay) overlay.hidden = true;
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.suggestionSujetMois = moisActuel();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (suggestion) :', e); }
  if(useCloud && currentUser){
    firebase.firestore().collection('suggestionsSujet').add({
      uid: currentUser.uid,
      email: currentUser.email || null,
      mois: moisActuel(),
      reponse: texte,
      date: new Date().toISOString()
    }).catch(e=> console.error('Erreur d\'envoi de la suggestion :', e));
  }
  document.getElementById('suggestionTexte').value = '';
}
function reporterSuggestion(){
  const overlay = document.getElementById('suggestionPromptOverlay');
  if(overlay) overlay.hidden = true;
  try{ localStorage.setItem('bible-tracker-suggestion-snooze', moisActuel()); }catch(e){}
}
function renderSuggestionsAdmin(){
  const box = document.getElementById('suggestionsAdminListe');
  if(!box) return;
  if(!estAdmin(currentUser)){ box.innerHTML = '<div class="empty">Accès réservé.</div>'; return; }
  box.innerHTML = '<div class="empty">Chargement…</div>';
  firebase.firestore().collection('suggestionsSujet').orderBy('date','desc').get().then(snap=>{
    if(snap.empty){ box.innerHTML = '<div class="empty">Aucune suggestion reçue pour l\'instant.</div>'; return; }
    box.innerHTML = snap.docs.map(doc=>{
      const s = doc.data();
      return '<div class="avis-admin-item">'
        + '<div class="detail" style="margin-top:0;">'+(s.mois||'')+' · '+echapperHtml(s.email||'')+'</div>'
        + '<div style="margin-top:4px;">'+echapperHtml(s.reponse||'')+'</div>'
        + '</div>';
    }).join('');
  }).catch(e=>{
    console.error('Erreur de lecture des suggestions :', e);
    box.innerHTML = '<div class="empty">Impossible de charger les suggestions (vérifie ta connexion).</div>';
  });
}

function checkAndNotify(force){
  if(!state.settings || !state.settings.notifs) return;
  if(!('Notification' in window) || Notification.permission !== 'granted') return;
  if(!state.chapterLog.length) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const lastDate = state.chapterLog.reduce((max,e)=> e.date > max ? e.date : max, state.chapterLog[0].date);
  const gap = daysBetween(parseDate(lastDate), today);
  const rythme = (state.settings && state.settings.notifRythme) || 1;
  const lastNotifKey = 'bible-tracker-last-notif';
  const lastNotif = localStorage.getItem(lastNotifKey);
  if(gap >= rythme && (force || lastNotif !== todayStr())){
    try{
      new Notification('Suivi de lecture biblique', {
        body: "Ça fait " + gap + " jours sans lecture enregistrée. Un chapitre suffit pour repartir 🙏",
        icon: 'icon-192.png'
      });
      localStorage.setItem(lastNotifKey, todayStr());
    }catch(e){ console.error(e); }
  }
}
document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState === 'visible') checkAndNotify(); });

/* =========================================================================
   SYNCHRONISATION — Firebase (si configuré) sinon stockage local uniquement.
   ========================================================================= */
let useCloud = false;
let cloudDocRef = null;
let currentUser = null;
let visionBoardEntries = [];
let visionBoardUnsub = null;
// Mémorise le contenu exact du dernier envoi vers le cloud : quand un
// "snapshot" arrive avec EXACTEMENT ce contenu, c'est juste l'écho de notre
// propre écriture (rien de nouveau à appliquer). On compare le CONTENU plutôt
// que d'utiliser un simple drapeau "à ignorer une fois" : un drapeau générique
// pouvait être "consommé" par un tout autre changement (ex. choisir une
// palette juste après un changement de fond) et faire sauter silencieusement
// sa sauvegarde — c'était la cause du bug où les couleurs choisies ne
// restaient pas.
let dernierEnvoiJSON = null;
// state._rev : compteur qui augmente à CHAQUE modification locale (peu importe
// laquelle). Si on enchaîne plusieurs changements très vite (ex. palette puis
// fond puis police), les confirmations du serveur peuvent revenir dans le
// désordre à cause du réseau — sans ce numéro, une confirmation "en retard"
// pouvait écraser un changement plus récent. Avec lui, on ignore simplement
// toute donnée reçue dont le numéro est plus vieux que ce qu'on a déjà.

function firebaseIsConfigured(){
  return typeof firebaseConfig !== 'undefined'
    && firebaseConfig.apiKey && !String(firebaseConfig.apiKey).includes('COLLE_ICI');
}

function todayStr(){ return new Date().toISOString().slice(0,10); }

/* =========================================================================
   RECONNEXION OBLIGATOIRE TOUS LES 30 JOURS — pour la sécurité du compte :
   si personne n'a rouvert l'appli sur cet appareil depuis 30 jours, on force
   une déconnexion et il faut retaper son mot de passe (ou Google) pour
   continuer. C'est géré ici dans le code de l'appli (Firebase / GitHub
   n'ont pas de réglage tout fait pour ça) : la date de dernière connexion
   réussie est mémorisée sur l'appareil, et vérifiée à chaque ouverture.
   ========================================================================= */
const REAUTH_APRES_JOURS = 30;
function reauthNecessaire(user){
  try{
    const cle = 'bible-tracker-derniere-connexion-' + user.uid;
    const derniere = localStorage.getItem(cle);
    if(derniere && daysBetween(parseDate(derniere), new Date()) >= REAUTH_APRES_JOURS) return true;
  }catch(e){}
  return false;
}
function marquerConnexionReussie(user){
  try{ localStorage.setItem('bible-tracker-derniere-connexion-' + user.uid, todayStr()); }catch(e){}
}

function initCloudIfConfigured(){
  if(!firebaseIsConfigured()){
    setSyncBadge('local');
    return;
  }
  try{
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().enablePersistence({synchronizeTabs:true}).catch(()=>{});

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        if(reauthNecessaire(user)){
          firebase.auth().signOut();
          showLoginError("Pour ta sécurité, reconnecte-toi : ça fait 30 jours que tu n'étais pas revenue.");
          return;
        }
        marquerConnexionReussie(user);
        useCloud = true;
        currentUser = user;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appShell').style.display = '';
        const navAdminBtn = document.getElementById('navAdminBtn');
        if(navAdminBtn) navAdminBtn.style.display = estAdmin(user) ? '' : 'none';
        setTimeout(verifierPromptNotifications, 900);
        setTimeout(verifierAvisMilestones, 1600);
        setTimeout(verifierSuggestionMensuelle, 2300);
        try{ demarrerSuiviActivite(user); }catch(e){ console.error('Erreur de suivi d\'activité :', e); }
        const securiteTabBtn = document.getElementById('securiteTabBtn');
        if(securiteTabBtn) securiteTabBtn.style.display = '';
        renderSecurityCard(user);
        // "En groupe" est une fonctionnalité à part (données partagées, pas
        // seulement les tiennes) : si son démarrage échoue pour une raison
        // quelconque, ça ne doit JAMAIS empêcher le reste de l'appli (tes
        // lectures, prières, réglages...) de se synchroniser normalement.
        try{ initGroupes(user); }catch(e){ console.error('Erreur au démarrage de "En groupe" :', e); }
        try{ demarrerVisionBoard(user); }catch(e){ console.error('Erreur au démarrage du Vision Board :', e); }
        cloudDocRef = firebase.firestore().collection('users').doc(user.uid).collection('state').doc('main');
        setSyncBadge('connecting');
        cloudDocRef.onSnapshot(snap=>{
          if(snap.exists){
            const data = snap.data();
            if(JSON.stringify(data) === dernierEnvoiJSON){
              // C'est l'écho de ce qu'on vient d'envoyer nous-mêmes : déjà à jour, rien à refaire.
              setSyncBadge('synced');
              return;
            }
            const revEntrante = data._rev || 0;
            const revLocale = state._rev || 0;
            if(revEntrante < revLocale){
              // Une confirmation "en retard" (arrivée après un changement plus
              // récent fait entre-temps) : on l'ignore pour ne pas revenir en arrière.
              setSyncBadge('synced');
              return;
            }
            state = Object.assign({dateDebut: todayStr(), chapterLog:[], compLog:[], prayers:[], settings:{palette:'dore',bg:'dore'}}, data);
            if(!state.settings) state.settings = {palette:'dore', bg:'dore'};
            document.getElementById('dateDebut').value = state.dateDebut;
            renderLog(); renderComp(); renderPrayers(); compute(); refreshVerseSelects();
            applyAppearance(); updateNotifUI(); renderVideoOfDay(); renderMusicOfDay(); renderBookOfDay(); renderThematicPlans();
            renderSecurityCard(user);
            checkAndNotify();
          } else {
            // Premier lancement pour ce compte : on crée le document cloud.
            // Important : si l'appli tournait avant en mode local (sans
            // Firebase configuré, ou avant la première connexion), une
            // progression a pu être enregistrée uniquement sur cet appareil
            // (localStorage). On la récupère ici pour ne RIEN perdre au
            // moment où le cloud prend le relais.
            try{
              const raw = localStorage.getItem('bible-tracker-state-v2');
              if(raw){
                const localState = JSON.parse(raw);
                const aDuContenu = localState && (
                  (localState.chapterLog && localState.chapterLog.length) ||
                  (localState.compLog && localState.compLog.length) ||
                  (localState.prayers && localState.prayers.length)
                );
                if(aDuContenu){
                  state = Object.assign({}, state, localState);
                  document.getElementById('dateDebut').value = state.dateDebut;
                  renderLog(); renderComp(); renderPrayers(); compute(); refreshVerseSelects();
                  applyAppearance();
                }
              }
            }catch(e){ console.error('Récupération de la sauvegarde locale impossible :', e); }
            cloudDocRef.set(nettoyerPourFirestore(state));
          }
          setSyncBadge('synced');
        }, err=>{
          console.error(err);
          setSyncBadge('error');
        });
      } else {
        useCloud = false;
        currentUser = null;
        arreterGroupes();
        arreterVisionBoard();
        arreterSuiviActivite();
        pickLoginTheme();
        const navAdminBtnOut = document.getElementById('navAdminBtn');
        if(navAdminBtnOut) navAdminBtnOut.style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('appShell').style.display = 'none';
      }
    });
  }catch(e){
    console.error('Firebase non initialisé', e);
    setSyncBadge('local');
    // Filet de sécurité : si Firebase ne charge pas (ex: pas de réseau), on
    // ne laisse jamais l'appli bloquée sur un écran de connexion qui ne
    // peut pas fonctionner — elle s'ouvre en mode local à la place.
    const shell = document.getElementById('appShell');
    const login = document.getElementById('loginScreen');
    if(shell) shell.style.display = '';
    if(login) login.style.display = 'none';
    setTimeout(verifierPromptNotifications, 900);
  }
}

function setSyncBadge(status){
  const el = document.getElementById('syncBadge');
  if(!el) return;
  const map = {
    local: ["⚪ Mode local (non synchronisé)","local"],
    connecting: ["🟡 Connexion…","connecting"],
    synced: ["🟢 Synchronisé","synced"],
    error: ["🔴 Erreur de synchronisation","error"]
  };
  const [txt, cls] = map[status] || map.local;
  el.textContent = txt;
  el.className = "syncbadge " + cls;
}

function loginGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(e=> showLoginError(translateAuthError(e)));
}
function logout(){
  firebase.auth().signOut();
}
function showLoginError(msg){
  const err = document.getElementById('loginError');
  if(!err) return;
  err.classList.remove('lock-success');
  err.textContent = msg;
  err.hidden = false;
}
function showLoginSuccess(msg){
  const err = document.getElementById('loginError');
  if(!err) return;
  err.classList.add('lock-success');
  err.textContent = msg;
  err.hidden = false;
}
function forgotPassword(){
  const email = (document.getElementById('loginEmail').value || '').trim();
  if(!email){
    showLoginError("Entre d'abord ton adresse e-mail ci-dessus, puis reclique sur « Mot de passe oublié ? ».");
    return;
  }
  firebase.auth().sendPasswordResetEmail(email)
    .then(()=> showLoginSuccess("E-mail envoyé ! Vérifie ta boîte de réception (et les spams)."))
    .catch(e=> showLoginError(translateAuthError(e)));
}
function translateAuthError(e){
  const map = {
    'auth/invalid-email': "Adresse e-mail invalide.",
    'auth/missing-email': "Entre ton adresse e-mail.",
    'auth/user-not-found': "Aucun compte avec cet e-mail — clique sur « Créer un compte ».",
    'auth/wrong-password': "Mot de passe incorrect.",
    'auth/invalid-credential': "E-mail ou mot de passe incorrect.",
    'auth/email-already-in-use': "Un compte existe déjà avec cet e-mail — clique sur « Se connecter ».",
    'auth/weak-password': "Mot de passe trop court (6 caractères minimum).",
    'auth/too-many-requests': "Trop de tentatives — réessaie dans quelques minutes.",
    'auth/network-request-failed': "Problème de connexion Internet.",
    'auth/popup-closed-by-user': "Connexion annulée.",
    'auth/requires-recent-login': "Pour ta sécurité, déconnecte-toi puis reconnecte-toi avant de faire ce changement."
  };
  return map[e.code] || ("Erreur de connexion : " + e.message);
}
function emailSignIn(){
  const email = (document.getElementById('loginEmail').value || '').trim();
  const pass = document.getElementById('loginPasswordField').value || '';
  const err = document.getElementById('loginError');
  if(err) err.hidden = true;
  if(!email || !pass){ showLoginError("Entre ton e-mail et ton mot de passe."); return; }
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .catch(e=> showLoginError(translateAuthError(e)));
}
function emailSignUp(){
  const email = (document.getElementById('loginEmail').value || '').trim();
  const pass = document.getElementById('loginPasswordField').value || '';
  const err = document.getElementById('loginError');
  if(err) err.hidden = true;
  if(!email || !pass){ showLoginError("Entre ton e-mail et ton mot de passe."); return; }
  if(pass.length < 6){ showLoginError("Le mot de passe doit faire au moins 6 caractères."); return; }
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(e=> showLoginError(translateAuthError(e)));
}

/* =========================================================================
   SÉCURITÉ ET COMPTE — rubrique dans Paramètres : e-mail, mot de passe
   (jamais affiché en clair — Firebase ne le renvoie d'ailleurs jamais),
   avec la date de la dernière modification de chacun, mémorisée dans
   state.security (synchronisée comme le reste des données).
   ========================================================================= */
function renderSecurityCard(user){
  const emailEl = document.getElementById('secEmailValue');
  if(emailEl) emailEl.textContent = (user && user.email) || '';
  if(!state.security) state.security = {};
  const emailDateEl = document.getElementById('secEmailDate');
  if(emailDateEl){
    emailDateEl.textContent = state.security.emailUpdatedAt
      ? ('Dernière modification : ' + fmtDate(parseDate(state.security.emailUpdatedAt))) : '';
  }
  const passDateEl = document.getElementById('secPasswordDate');
  if(passDateEl){
    passDateEl.textContent = state.security.passwordUpdatedAt
      ? ('Dernière modification : ' + fmtDate(parseDate(state.security.passwordUpdatedAt))) : '';
  }
}
function showSecMessage(msg, isError){
  const el = document.getElementById('secMessage');
  if(!el) return;
  el.textContent = msg;
  el.classList.toggle('security-message-error', !!isError);
  el.hidden = false;
}
function hideSecMessage(){
  const el = document.getElementById('secMessage');
  if(el) el.hidden = true;
}
function toggleEditEmail(forceClose){
  const box = document.getElementById('secEmailEdit');
  if(!box) return;
  box.hidden = forceClose === true ? true : !box.hidden;
  if(!box.hidden){
    const inp = document.getElementById('secEmailInput');
    if(inp){ inp.value = ''; inp.focus(); }
  }
  hideSecMessage();
}
function toggleEditPassword(forceClose){
  const box = document.getElementById('secPasswordEdit');
  if(!box) return;
  box.hidden = forceClose === true ? true : !box.hidden;
  if(!box.hidden){
    const inp = document.getElementById('secPasswordInput');
    if(inp){ inp.value = ''; inp.focus(); }
  }
  hideSecMessage();
}
function saveNewEmail(){
  const inp = document.getElementById('secEmailInput');
  const email = (inp.value || '').trim();
  if(!email){ showSecMessage("Entre une nouvelle adresse e-mail.", true); return; }
  const user = firebase.auth().currentUser;
  if(!user) return;
  user.updateEmail(email).then(()=>{
    if(!state.security) state.security = {};
    state.security.emailUpdatedAt = todayStr();
    persist();
    renderSecurityCard(user);
    toggleEditEmail(true);
    showSecMessage("Adresse e-mail mise à jour.");
  }).catch(e=> showSecMessage(translateAuthError(e), true));
}
function saveNewPassword(){
  const inp = document.getElementById('secPasswordInput');
  const pass = inp.value || '';
  if(pass.length < 6){ showSecMessage("Le mot de passe doit faire au moins 6 caractères.", true); return; }
  const user = firebase.auth().currentUser;
  if(!user) return;
  user.updatePassword(pass).then(()=>{
    if(!state.security) state.security = {};
    state.security.passwordUpdatedAt = todayStr();
    persist();
    renderSecurityCard(user);
    toggleEditPassword(true);
    showSecMessage("Mot de passe mis à jour.");
  }).catch(e=> showSecMessage(translateAuthError(e), true));
}

async function loadState(){
  if(!firebaseIsConfigured()){
    try{
      const raw = localStorage.getItem('bible-tracker-state-v2');
      if(raw) state = JSON.parse(raw);
      if(!state.settings) state.settings = {palette:'dore', bg:'dore'};
    }catch(e){}
    document.getElementById('dateDebut').value = state.dateDebut;
    document.getElementById('logDate').value = todayStr();
    renderLog(); renderComp(); renderPrayers(); compute(); refreshVerseSelects();
    applyAppearance(); updateNotifUI(); renderVideoOfDay(); renderMusicOfDay(); renderBookOfDay(); renderThematicPlans();
    checkAndNotify();
  } else {
    document.getElementById('logDate').value = todayStr();
    applyAppearance();
  }
}

// Firestore refuse tout document contenant une valeur "undefined" (erreur
// immédiate, avant même d'envoyer sur le réseau) — passer l'objet par
// JSON.stringify/parse élimine automatiquement ces valeurs (JSON n'a pas de
// notion d'"undefined"), ce qui protège la sauvegarde de tout plantage lié à
// un champ optionnel non renseigné.
function nettoyerPourFirestore(obj){
  return JSON.parse(JSON.stringify(obj));
}

function persist(){
  // Voir la note plus haut sur state._rev : ce numéro augmente à chaque
  // sauvegarde pour repérer et ignorer les confirmations réseau "en retard".
  state._rev = (state._rev || 0) + 1;
  // On garde toujours une copie légère de l'apparence en local : ça permet de
  // l'appliquer instantanément à la prochaine ouverture, sans attendre que le
  // compte cloud réponde (et donc sans "flash" qui revient un instant aux
  // couleurs par défaut avant de reprendre les bonnes).
  try{ if(state.settings) localStorage.setItem('bible-tracker-settings-cache', JSON.stringify(state.settings)); }catch(e){}
  if(useCloud && cloudDocRef){
    let aEnvoyer;
    try{ aEnvoyer = nettoyerPourFirestore(state); }
    catch(e){ console.error('Etat impossible à sauvegarder (JSON) :', e); return; }
    dernierEnvoiJSON = JSON.stringify(aEnvoyer);
    try{
      cloudDocRef.set(aEnvoyer).catch(e=>{ console.error(e); setSyncBadge('error'); });
    }catch(e){ console.error('Erreur immédiate lors de la sauvegarde cloud :', e); setSyncBadge('error'); }
  } else {
    try{ localStorage.setItem('bible-tracker-state-v2', JSON.stringify(state)); }
    catch(e){ console.error('erreur de sauvegarde', e); }
  }
}
function applyCachedAppearanceIfAny(){
  try{
    const raw = localStorage.getItem('bible-tracker-settings-cache');
    if(raw){
      const cached = JSON.parse(raw);
      state.settings = Object.assign({palette:'dore', bg:'dore'}, cached);
      applyAppearance();
    }
  }catch(e){}
}
function saveSettings(){
  state.dateDebut = document.getElementById('dateDebut').value;
  persist(); compute();
}

/* Sauvegarde personnelle : télécharge tout le contenu de "state" (lectures,
   notes, prières, réglages...) dans un fichier .json sur l'appareil, en plus
   de la sauvegarde automatique dans le cloud. Purement une copie de secours
   pour la personne elle-même — l'appli ne sait pas la réimporter (pas
   demandé), c'est juste pour garder une trace lisible en cas de besoin. */
function telechargerMesDonnees(){
  try{
    const contenu = JSON.stringify(state, null, 2);
    const blob = new Blob([contenu], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suivi-lecture-sauvegarde-' + todayStr() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(()=> URL.revokeObjectURL(url), 2000);
  }catch(e){
    console.error('Erreur export des données :', e);
    alert("Le téléchargement n'a pas fonctionné sur cet appareil. Réessaie, ou contacte-moi si ça persiste.");
  }
}

function pad(n){ return n<10 ? "0"+n : ""+n; }
function fmtDate(d){ return pad(d.getDate())+"/"+pad(d.getMonth()+1)+"/"+d.getFullYear(); }
function parseDate(s){ return new Date(s+"T00:00:00"); }
function daysBetween(a,b){ return Math.floor((b - a)/(1000*60*60*24)); }

/* =========================================================================
   MODÈLE "CHAPITRES LUS" — reconstruit à chaque calcul à partir du journal
   (state.chapterLog). Chaque chapitre n'est compté qu'UNE SEULE FOIS par
   livre, même s'il a été noté plusieurs fois dans le journal (doublon,
   correction, rattrapage...). C'est ce qui rend le taux de progression
   fiable quel que soit l'ordre ou le nombre de fois où tu notes une lecture.
   ========================================================================= */
function rebuildReadModel(){
  const model = {};
  allBooks.forEach(b=> model[b] = new Set());
  state.chapterLog.forEach(e=>{
    if(!model[e.livre]) model[e.livre] = new Set();
    for(let c=e.de; c<=e.a; c++) model[e.livre].add(c);
  });
  state.readChapters = model;
}
function chaptersReadCount(livre){
  const s = state.readChapters && state.readChapters[livre];
  return s ? s.size : 0;
}
function totalRead(){
  if(!state.readChapters) rebuildReadModel();
  return Object.values(state.readChapters).reduce((sum,s)=> sum + s.size, 0);
}

// Position actuelle : nombre de livres ENTIÈREMENT terminés parmi les 66,
// peu importe l'ordre ou l'identité du livre (plus de notion de "livre en
// cours dans le plan AT/NT en alternance"). Ex. : si seul Jonas est
// terminé, le résultat est "1 livre sur 66".
function currentPosition(){
  const total = planOrder.length;
  const livresTermines = planOrder.filter(b => chaptersReadCount(b) >= chapters[b]);
  return { nbTermines: livresTermines.length, total: total, livresTermines: livresTermines };
}

function renderPosition(){
  const box = document.getElementById('positionCurrent');
  if(!box) return;
  const pos = currentPosition();
  if(pos.nbTermines >= pos.total){
    box.innerHTML = "🎉 <strong>" + pos.nbTermines + "/" + pos.total + "</strong> — Bravo, tu as terminé les 66 livres de la Bible !";
  } else {
    box.innerHTML = "<strong>" + pos.nbTermines + "/" + pos.total + "</strong> livre" + (pos.nbTermines>1?"s":"") + " entièrement lu" + (pos.nbTermines>1?"s":"") + ".";
  }
  const list = document.getElementById('positionList');
  if(!list) return;
  list.innerHTML = planOrder.map(b=>{
    const lu = chaptersReadCount(b);
    const total = chapters[b];
    let icon = "⚪", cls = "todo";
    if(lu >= total){ icon = "✅"; cls = "done"; }
    else if(lu > 0){ icon = "🔵"; cls = "current"; }
    return '<div class="poslivre '+cls+'"><span>'+icon+' '+b+'</span><span>'+lu+'/'+total+'</span></div>';
  }).join('');
}

function compute(){
  rebuildReadModel();
  const lus = totalRead();
  const taux = lus/TOTAL_CHAPTERS;
  const restants = TOTAL_CHAPTERS - lus;
  const pagesRestantes = Math.round(1200*(1-taux));

  document.getElementById('kpiTaux').textContent = (taux*100).toFixed(2)+"%";
  document.getElementById('kpiRestants').textContent = restants;
  document.getElementById('kpiPages').textContent = pagesRestantes;

  const planStart = parseDate(state.dateDebut);
  const today = new Date(); today.setHours(0,0,0,0);
  const banner = document.getElementById('banner');
  const detail = document.getElementById('detail');

  if(today < planStart){
    banner.className = "banner notstarted";
    banner.textContent = "🕊 PAS ENCORE DÉBUTÉ — début prévu le " + fmtDate(planStart);
    detail.textContent = "Ton parcours commence le " + fmtDate(planStart);
  } else {
    // Objectif : 1 chapitre par jour, quel que soit le livre — plus de
    // rythme calé sur un plan "66 mois, un livre AT / un livre NT en
    // alternance". 1 jour écoulé = 1 chapitre attendu, tout simplement.
    const joursEcoules = daysBetween(planStart, today);
    const attendu = Math.min(joursEcoules, TOTAL_CHAPTERS);
    const ecart = attendu - lus;
    // Statut à 3 niveaux avec une marge de tolérance de 2 jours avant de
    // basculer en "à la traîne" : un petit retard de 1 ou 2 chapitres reste
    // "dans les clous" (ça arrive de rattraper le lendemain), mais au-delà
    // de 2 jours de retard cumulé, c'est signalé clairement.
    if(ecart > 2){
      banner.className = "banner late";
      banner.textContent = "⚠ À LA TRAÎNE — " + ecart + " CHAPITRE(S) DE RETARD (global)";
    } else if(ecart > 0){
      banner.className = "banner ok";
      banner.textContent = "✓ DANS LES CLOUS — " + ecart + " chapitre(s) à rattraper";
    } else if(ecart === 0){
      banner.className = "banner ok";
      banner.textContent = "✓ DANS LES CLOUS — objectif du jour atteint";
    } else {
      banner.className = "banner ahead";
      banner.textContent = "🚀 EN AVANCE DE " + (-ecart) + " CHAPITRE(S) (global)";
    }
    detail.textContent = "Objectif : 1 chapitre par jour, peu importe le livre  ·  ~" + attendu + " chapitres attendus au total  ·  Tu en as lu " + lus;
  }

  renderReminder(today);

  drawDonut(taux);
  renderPosition();
}

/* =========================================================================
   MESSAGE DU JOUR — encourageant si tu lis bien (récemment ou en volume),
   rappel bienveillant seulement après une vraie coupure sans lecture.
   Ne dépend plus seulement de la date de la dernière entrée : un gros
   rattrapage fait aujourd'hui doit être félicité, pas confondu avec un
   "où étais-tu passée ?".
   ========================================================================= */
function renderReminder(today){
  const reminder = document.getElementById('reminder');
  if(!reminder) return;
  if(!state.chapterLog.length){ reminder.style.display = 'none'; return; }

  const lastDate = state.chapterLog.reduce((max,e)=> e.date > max ? e.date : max, state.chapterLog[0].date);
  const gap = daysBetween(parseDate(lastDate), today);

  // Chapitres enregistrés au cours des 7 derniers jours (dont aujourd'hui).
  const chapitresRecents = state.chapterLog.reduce((sum,e)=>{
    const ecart = daysBetween(parseDate(e.date), today);
    if(ecart >= 0 && ecart <= 6) return sum + (e.a - e.de + 1);
    return sum;
  }, 0);

  reminder.style.display = 'block';
  reminder.className = 'reminder';

  if(gap >= 5){
    reminder.classList.add('warn');
    reminder.textContent = "👋 Où étais-tu passée ? Ça fait " + gap + " jours sans lecture enregistrée. Reprends dès que tu peux, un chapitre suffit pour repartir !";
  } else if(chapitresRecents >= 15){
    reminder.classList.add('great');
    reminder.textContent = "🎉 Bravo, belle accélération ! " + chapitresRecents + " chapitres lus ces 7 derniers jours.";
  } else if(chapitresRecents > 0){
    reminder.classList.add('good');
    reminder.textContent = "👏 Continue comme ça — " + chapitresRecents + " chapitre" + (chapitresRecents>1 ? "s" : "") + " lu" + (chapitresRecents>1 ? "s" : "") + " cette semaine.";
  } else {
    reminder.style.display = 'none';
  }
}

function drawDonut(taux, svgId){
  const svg = document.getElementById(svgId || 'donut');
  if(!svg) return;
  const r = 60, cx=80, cy=80, circ = 2*Math.PI*r;
  const luLen = circ*taux;
  svg.innerHTML = `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#E3DCC7" stroke-width="22"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#6B6440" stroke-width="22"
      stroke-dasharray="${luLen} ${circ-luLen}" stroke-dashoffset="${circ*0.25}" stroke-linecap="round"/>
    <text x="${cx}" y="${cy+6}" text-anchor="middle" font-size="18" font-weight="bold" fill="#3A3524" font-family="Avenir,sans-serif">${(taux*100).toFixed(2)}%</text>
  `;
}

// Index de la ligne en cours de modification dans state.chapterLog, ou null
// si on est en train d'AJOUTER une nouvelle ligne (comportement par défaut).
// Réutilise le même formulaire pour ajouter ET corriger, plutôt que d'avoir
// deux formulaires séparés — plus simple à maintenir et pour l'utilisatrice.
let editingLogIndex = null;
function addLog(){
  const livre = logLivreSelect.value;
  const de = parseInt(document.getElementById('logDe').value)||1;
  const a = parseInt(document.getElementById('logA').value)||de;
  const date = document.getElementById('logDate').value || todayStr();
  if(a < de){ alert('"Chapitre à" doit être supérieur ou égal à "Chapitre de".'); return; }
  const maxCh = chapters[livre];
  if(maxCh && (de > maxCh || a > maxCh)){
    alert(livre + " ne compte que " + maxCh + " chapitres. Vérifie les numéros saisis.");
    return;
  }
  if(editingLogIndex !== null){
    state.chapterLog[editingLogIndex] = { date, livre, de, a };
    annulerModifLog(false);
    persist(); renderLog(); compute(); refreshVerseSelects();
    return;
  }
  const doublon = state.chapterLog.some(e=> e.date===date && e.livre===livre && e.de===de && e.a===a);
  if(doublon && !confirm("Tu as déjà enregistré exactement cette lecture (" + livre + " " + de + "-" + a + " le " + fmtDate(parseDate(date)) + "). Ça n'ajoutera pas de chapitres en double à ta progression, mais veux-tu quand même l'ajouter au journal ?")){
    return;
  }
  state.chapterLog.push({ date, livre, de, a });
  persist(); renderLog(); compute(); refreshVerseSelects();
}
function delLog(i){
  if(!confirm("Supprimer cette lecture du journal ?")) return;
  if(editingLogIndex === i) annulerModifLog(false);
  state.chapterLog.splice(i,1); persist(); renderLog(); compute();
}
/* Remplit le formulaire du haut avec la ligne à corriger, plutôt que de la
   supprimer et la refaire — on reste sur la même page, rien n'est perdu si
   on annule en cours de route. */
function modifierLog(i){
  const e = state.chapterLog[i];
  if(!e) return;
  editingLogIndex = i;
  logLivreSelect.value = e.livre;
  onLogLivreChange();
  document.getElementById('logDe').value = e.de;
  document.getElementById('logA').value = e.a;
  document.getElementById('logDate').value = e.date;
  const btn = document.getElementById('logSubmitBtn');
  if(btn) btn.textContent = 'Enregistrer la modification';
  const annulerBtn = document.getElementById('logAnnulerBtn');
  if(annulerBtn) annulerBtn.style.display = '';
  document.getElementById('logLivre').scrollIntoView({ behavior:'smooth', block:'start' });
}
function annulerModifLog(reafficher){
  editingLogIndex = null;
  const btn = document.getElementById('logSubmitBtn');
  if(btn) btn.textContent = 'Ajouter au journal';
  const annulerBtn = document.getElementById('logAnnulerBtn');
  if(annulerBtn) annulerBtn.style.display = 'none';
  if(reafficher !== false) renderLog();
}
function renderLog(){
  const el = document.getElementById('logList');
  if(!state.chapterLog.length){ el.innerHTML = '<div class="empty">Aucune lecture enregistrée pour le moment.</div>'; return; }
  const sorted = state.chapterLog.map((e,i)=>({date:e.date, livre:e.livre, de:e.de, a:e.a, i})).sort((a,b)=> b.date.localeCompare(a.date));
  el.innerHTML = sorted.map(e=>{
    const label = e.de===e.a ? ("chapitre "+e.de) : ("chapitres "+e.de+" à "+e.a);
    return '<div class="entry"><span class="del" onclick="delLog('+e.i+')">supprimer</span>'
      + '<span class="del" style="color:var(--khaki-med); margin-right:8px;" onclick="modifierLog('+e.i+')">modifier</span>'
      + '<div class="meta">'+fmtDate(parseDate(e.date))+' · '+e.livre+'</div>'+label+'</div>';
  }).join('');
}

function lastLogEntry(){
  if(!state.chapterLog.length) return null;
  return state.chapterLog[state.chapterLog.length-1];
}
function addComp(){
  const livre = document.getElementById('compLivre').value;
  const chapitre = parseInt(document.getElementById('compChapitre').value) || 1;
  const verset = document.getElementById('compVerset').value;
  const note = document.getElementById('compNote').value.trim();
  if(!note) return;
  state.compLog.unshift({ date: todayStr(), livre, chapitre, verset, note });
  document.getElementById('compNote').value = '';
  persist(); renderComp();
}
function delComp(i){
  if(!confirm("Supprimer cette entrée du journal de compréhension ?")) return;
  state.compLog.splice(i,1); persist(); renderComp();
}
function renderComp(){
  const el = document.getElementById('compList');
  if(!state.compLog.length){ el.innerHTML = '<div class="empty">Aucune entrée pour le moment.</div>'; return; }
  el.innerHTML = state.compLog.map((e,i)=>
    '<div class="entry"><span class="del" onclick="delComp('+i+')">supprimer</span>'
    + '<div class="meta">'+fmtDate(parseDate(e.date))+' · '+e.livre+' '+e.chapitre+(e.verset ? ':'+e.verset : '')+'</div>'
    + e.note + '</div>'
  ).join('');
}

function addPrayer(){
  const livre = document.getElementById('prayerLivre').value;
  const chapitre = parseInt(document.getElementById('prayerChapitre').value) || 1;
  const verse = document.getElementById('prayerVerse').value;
  const text = document.getElementById('prayerText').value.trim();
  if(!text) return;
  state.prayers.unshift({ date: todayStr(), reference: livre + " " + chapitre, verse, text });
  document.getElementById('prayerText').value = '';
  persist(); renderPrayers();
}
function delPrayer(i){
  if(!confirm("Supprimer cette prière ?")) return;
  state.prayers.splice(i,1); persist(); renderPrayers();
}
function renderPrayers(){
  const el = document.getElementById('prayerList');
  if(!state.prayers.length){ el.innerHTML = '<div class="empty">Aucune prière pour le moment.</div>'; return; }
  el.innerHTML = state.prayers.map((e,i)=>
    '<div class="entry"><span class="del" onclick="delPrayer('+i+')">supprimer</span>'
    + '<div class="meta">'+fmtDate(parseDate(e.date))+(e.reference ? ' · '+e.reference : '')+(e.verse ? ' · '+e.verse : '')+'</div>'
    + e.text + '</div>'
  ).join('');
}

/* =========================================================================
   VERSET DU JOUR — petite sélection de versets connus, texte Louis Segond
   1910 (domaine public). Le même verset s'affiche toute la journée, et
   change automatiquement le lendemain (calculé à partir du jour de l'année,
   donc pas besoin de synchronisation pour que ce soit cohérent).
   ========================================================================= */
const VERSET_FIXE = { ref:"Genèse 1:1", versions:[
  { code:"LSG", label:"Segond 1910", text:"Au commencement, Dieu créa les cieux et la terre." },
  { code:"DARBY", label:"Darby", text:"Au commencement Dieu créa les cieux et la terre." },
  { code:"OST", label:"Ostervald", text:"Au commencement, Dieu créa les cieux et la terre." },
  { code:"KJV", label:"King James", text:"In the beginning God created the heaven and the earth." },
  { code:"WEB", label:"World English", text:"In the beginning, God created the heavens and the earth." }
]};
function versionChoisie(){
  try{ return localStorage.getItem('versionVerset') || 'LSG'; }catch(e){ return 'LSG'; }
}
function choisirVersionVerset(code){
  try{ localStorage.setItem('versionVerset', code); }catch(e){}
  afficherVerset();
}
function afficherVerset(){
  const code = versionChoisie();
  const v = VERSET_FIXE.versions.find(x=>x.code===code) || VERSET_FIXE.versions[0];
  const vt = document.getElementById('verseText');
  const vr = document.getElementById('verseRef');
  const tabs = document.getElementById('verseTabs');
  if(vt) vt.textContent = "« " + v.text + " »";
  if(vr) vr.textContent = VERSET_FIXE.ref;
  if(tabs) tabs.innerHTML = VERSET_FIXE.versions.map(x =>
    '<button type="button" class="verse-tab'+(x.code===v.code?' actif':'')+'" onclick="choisirVersionVerset(\''+x.code+'\')">'+x.label+'</button>'
  ).join('');
}

function renderVerseAndDate(){
  const d = new Date();
  let txt = d.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const salut = d.getHours() >= 18 || d.getHours() < 4 ? 'Bonsoir' : 'Bonjour';
  const greetEl = document.getElementById('topGreeting');
  if(greetEl) greetEl.innerHTML = salut + '<small>' + txt + '</small>';
  const start = new Date(d.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((d - start) / (1000*60*60*24));
  afficherVerset();
  const verseCard = document.querySelector('.verse-card');
  if(verseCard) verseCard.className = 'card verse-card vc' + (dayOfYear % 7);
}

/* =========================================================================
   PLANS THÉMATIQUES — courts plans (3 à 7 jours), construits uniquement à
   partir de versets bibliques (Louis Segond, 1910, domaine public) avec
   une prière pour chaque jour. Indépendants du plan principal de 66 mois.
   ========================================================================= */
const THEMATIC_PLANS = [
  { id:'parole', titre:"Parler et déclarer la Parole de Dieu", jours:[
    { ref:"Josué 1:8", texte:"Que ce livre de la loi ne s'éloigne point de ta bouche ; médite-le jour et nuit, pour agir fidèlement selon tout ce qui y est écrit ; car c'est alors que tu réussiras dans tes entreprises, c'est alors que tu prospéreras.", priere:"Seigneur, apprends-moi à garder ta Parole dans ma bouche et à la déclarer avec foi aujourd'hui.", explication:"Méditer et déclarer la Parole, jour après jour, est la clé pour marcher dans la réussite que Dieu promet." },
    { ref:"Ésaïe 55:11", texte:"ainsi en est-il de ma parole, qui sort de ma bouche : elle ne retourne point à moi sans effet, sans avoir exécuté ma volonté et accompli mes desseins.", priere:"Merci Seigneur que ta Parole agit même quand je ne vois pas encore le résultat. Je choisis de m'y accrocher aujourd'hui.", explication:"Une fois prononcée par Dieu, sa Parole accomplit toujours ce pour quoi elle a été envoyée — même quand on ne voit pas encore de résultat." },
    { ref:"Marc 11:23", texte:"Je vous le dis en vérité, si quelqu'un dit à cette montagne : Ôte-toi de là et jette-toi dans la mer, et s'il ne doute point en son cœur, mais croit que ce qu'il dit arrive, il le verra s'accomplir.", priere:"Seigneur, augmente ma foi pour que mes paroles s'alignent avec les tiennes, sans douter.", explication:"Parler avec une foi sans partage déplace des obstacles qui semblent aussi solides qu'une montagne." },
    { ref:"Proverbes 18:21", texte:"La mort et la vie sont au pouvoir de la langue ; celui qui l'aime en mangera les fruits.", priere:"Aide-moi aujourd'hui à choisir des paroles de vie sur moi-même et sur les miens.", explication:"Les mots ont un pouvoir réel : ils peuvent construire la vie ou l'abîmer — choisis-les avec soin aujourd'hui." },
    { ref:"Hébreux 4:12", texte:"Car la parole de Dieu est vivante et efficace, plus tranchante qu'une épée quelconque à deux tranchants, pénétrante jusqu'à partager âme et esprit, jointures et moelles ; elle juge les sentiments et les pensées du cœur.", priere:"Seigneur, que ta Parole vivante fasse son œuvre en moi aujourd'hui.", explication:"La Parole de Dieu ne se contente pas d'informer : elle transforme en profondeur, jusqu'au cœur des pensées." },
    { ref:"Romains 10:17", texte:"Ainsi la foi vient de ce qu'on entend, et ce qu'on entend vient de la parole de Christ.", priere:"Seigneur, nourris ma foi aujourd'hui par ta Parole entendue et déclarée.", explication:"Plus on écoute et on déclare la Parole, plus la foi grandit — c'est un cercle qui se nourrit lui-même." },
    { ref:"Actes 4:31", texte:"Quand ils eurent prié, le lieu où ils étaient assemblés trembla ; ils furent tous remplis du Saint-Esprit, et ils annonçaient la parole de Dieu avec assurance.", priere:"Donne-moi cette même assurance pour parler de toi aujourd'hui.", explication:"Une Église qui prie reçoit l'audace de proclamer la Parole sans crainte, même dans l'adversité." }
  ], joursAlt:[
    { ref:"Deutéronome 30:14", texte:"C'est une parole qui est tout près de toi, dans ta bouche et dans ton cœur, afin que tu la mettes en pratique.", priere:"Seigneur, que ta Parole reste proche de ma bouche et de mon cœur aujourd'hui.", explication:"Dieu ne te demande pas d'aller chercher sa Parole loin : elle est déjà accessible, à portée de cœur et de bouche." },
    { ref:"Psaume 119:105", texte:"Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.", priere:"Merci pour ta Parole qui éclaire chacun de mes pas.", explication:"La Parole guide un pas à la fois — pas besoin de voir tout le chemin pour avancer avec confiance." },
    { ref:"Jean 1:1", texte:"Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.", priere:"Seigneur, révèle-toi à moi aujourd'hui à travers ta Parole vivante.", explication:"Jésus lui-même est appelé la Parole : lire l'Écriture, c'est aussi le rencontrer, lui." },
    { ref:"Ésaïe 50:4", texte:"Le Seigneur, l'Éternel, m'a donné une langue exercée, pour que je sache soutenir par la parole celui qui est abattu.", priere:"Donne-moi les mots justes pour soutenir quelqu'un aujourd'hui.", explication:"Écouter Dieu chaque matin prépare à parler des mots qui relèvent plutôt que d'enfoncer." },
    { ref:"Colossiens 3:16", texte:"Que la parole de Christ habite parmi vous abondamment ; instruisez-vous et exhortez-vous les uns les autres en toute sagesse.", priere:"Que ta Parole habite en moi abondamment aujourd'hui.", explication:"Laisser la Parole de Christ prendre toute la place transforme aussi la façon dont on s'encourage entre nous." },
    { ref:"Luc 4:4", texte:"Jésus lui répondit : Il est écrit : L'homme ne vivra pas de pain seulement.", priere:"Aide-moi à me nourrir de toi plus que de toute autre chose aujourd'hui.", explication:"Se nourrir de la Parole est aussi vital que se nourrir de pain — l'un ne remplace pas l'autre." },
    { ref:"Proverbes 12:18", texte:"Tel qui parle légèrement blesse comme un glaive ; mais la langue des sages apporte la guérison.", priere:"Seigneur, que mes paroles apportent la guérison, jamais la blessure.", explication:"Les mots choisis avec sagesse peuvent guérir là où des mots imprudents blesseraient." }
  ]},
  { id:'jeune', titre:"Le jeûne", jours:[
    { ref:"Ésaïe 58:6", texte:"Voici le jeûne auquel je prends plaisir : détache les chaînes de la méchanceté, dénoue les liens de la servitude, renvoie libres les opprimés, et que l'on rompe toute espèce de joug.", priere:"Seigneur, montre-moi le vrai sens de mon jeûne : que mon cœur se tourne vers ce qui te plaît.", explication:"Le jeûne que Dieu aime n'est pas qu'une privation : c'est un cœur qui se tourne vers la justice et la libération des opprimés." },
    { ref:"Matthieu 6:17-18", texte:"Mais quand tu jeûnes, parfume ta tête et lave ton visage, afin de ne pas montrer aux hommes que tu jeûnes, mais à ton Père qui est là dans le lieu secret ; et ton Père, qui voit dans le secret, te le rendra.", priere:"Père, que mon jeûne soit pour toi seul, dans le secret, sans chercher le regard des autres.", explication:"Jeûner en secret, sans mise en scène, garde le cœur tourné vers Dieu plutôt que vers le regard des autres." },
    { ref:"Joël 2:12", texte:"Maintenant encore, dit l'Éternel, revenez à moi de tout votre cœur, avec des jeûnes, avec des pleurs et des lamentations !", priere:"Seigneur, je reviens à toi de tout mon cœur aujourd'hui.", explication:"Revenir à Dieu de tout son cœur est le vrai objectif du jeûne, bien au-delà du simple renoncement à la nourriture." },
    { ref:"2 Chroniques 20:3", texte:"Dans sa frayeur, Josaphat se disposa à consulter l'Éternel, et il publia un jeûne pour tout Juda.", priere:"Comme Josaphat, je me tourne vers toi par le jeûne dans les moments où j'ai besoin de ta direction.", explication:"Face à une situation qui dépasse ses forces, Josaphat a choisi de chercher Dieu par le jeûne plutôt que de paniquer seul." },
    { ref:"Daniel 9:3", texte:"Je tournai ma face vers le Seigneur Dieu, afin de recourir à la prière et aux supplications, en jeûnant et en revêtant le sac et la cendre.", priere:"Seigneur, je tourne mon visage vers toi aujourd'hui, avec humilité.", explication:"Le jeûne accompagné de prière et d'humilité ouvre la porte à une direction plus claire de la part de Dieu." },
    { ref:"Matthieu 9:15", texte:"Jésus leur répondit : Les amis de l'époux peuvent-ils s'affliger pendant que l'époux est avec eux ? Les jours viendront où l'époux leur sera enlevé, et alors ils jeûneront.", priere:"Seigneur, apprends-moi à reconnaître le bon moment pour jeûner.", explication:"Il y a un temps pour jeûner et un temps pour se réjouir — la sagesse est de reconnaître lequel vivre." },
    { ref:"Ésaïe 58:8", texte:"Alors ta lumière poindra comme l'aurore, et ta guérison germera promptement ; ta justice marchera devant toi, et la gloire de l'Éternel sera ton arrière-garde.", priere:"Merci pour la lumière et la guérison que tu promets après le jeûne.", explication:"Le jeûne fait avec un cœur sincère porte du fruit : lumière, guérison et la présence protectrice de Dieu." }
  ], joursAlt:[
    { ref:"Matthieu 4:2", texte:"Après avoir jeûné quarante jours et quarante nuits, il eut faim.", priere:"Seigneur, comme Jésus, aide-moi à tenir ferme même quand mon corps réclame.", explication:"Même Jésus a connu la faim dans le jeûne — la force ne vient pas de l'absence d'épreuve, mais de la présence de Dieu dans l'épreuve." },
    { ref:"Esdras 8:23", texte:"Nous jeûnâmes, et nous invoquâmes notre Dieu à ce sujet, et il nous exauça.", priere:"Merci de répondre quand je me tourne vers toi avec un cœur sincère.", explication:"Un jeûne accompagné d'une vraie recherche de Dieu attire une réponse, pas seulement un effort personnel." },
    { ref:"Néhémie 1:4", texte:"Lorsque j'entendis ces choses, je m'assis et je pleurai... Je jeûnai et je priai devant le Dieu des cieux.", priere:"Seigneur, comme Néhémie, je viens à toi avec ce qui pèse sur mon cœur aujourd'hui.", explication:"Le jeûne peut naître d'un chagrin réel : Dieu accueille cette sincérité plutôt qu'une performance religieuse." },
    { ref:"Actes 13:2", texte:"Pendant qu'ils servaient le Seigneur dans leur ministère et qu'ils jeûnaient, le Saint-Esprit dit : Mettez-moi à part Barnabas et Saul.", priere:"Mets-moi à part pour ce que tu veux que je fasse, Seigneur.", explication:"Le jeûne peut aussi précéder un envoi, une mission que Dieu confie à un moment précis." },
    { ref:"Psaume 35:13", texte:"j'humiliais mon âme par le jeûne, je priais, la tête penchée sur mon sein.", priere:"Aide-moi à m'humilier devant toi aujourd'hui, sans orgueil.", explication:"S'humilier devant Dieu dans l'épreuve de quelqu'un d'autre est aussi une forme d'intercession par le jeûne." },
    { ref:"Ésaïe 58:9", texte:"Alors tu appelleras, et l'Éternel répondra ; tu crieras, et il dira : Me voici !", priere:"Merci de répondre me voici à ceux qui t'appellent, Seigneur.", explication:"La promesse est claire : un cœur qui crie sincèrement vers Dieu reçoit une réponse." },
    { ref:"Luc 2:37", texte:"Elle ne quittait pas le temple, et elle servait Dieu nuit et jour dans le jeûne et dans la prière.", priere:"Seigneur, donne-moi la persévérance d'Anne dans la prière et le jeûne.", explication:"Une vie de jeûne et de prière fidèle sur la durée, comme celle d'Anne, prépare à reconnaître ce que Dieu fait." }
  ]},
  { id:'amour', titre:"L'amour de Dieu", jours:[
    { ref:"Jean 3:16", texte:"Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", priere:"Merci Seigneur pour cet amour qui a tout donné pour moi.", explication:"L'amour de Dieu ne se mesure pas à nos mérites : il a donné ce qu'il avait de plus précieux pour que nous vivions." },
    { ref:"Romains 5:8", texte:"Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.", priere:"Merci de m'avoir aimée avant même que je le mérite.", explication:"Dieu n'a pas attendu que nous soyons parfaits pour nous aimer — la croix a précédé notre changement, pas suivi." },
    { ref:"1 Jean 4:19", texte:"Pour nous, nous l'aimons, parce qu'il nous a aimés le premier.", priere:"Apprends-moi à aimer les autres comme tu m'as aimée en premier.", explication:"Notre amour pour Dieu et pour les autres prend racine dans le fait qu'il nous a aimés en premier." },
    { ref:"Sophonie 3:17", texte:"L'Éternel, ton Dieu, est au milieu de toi, comme un héros qui sauve ; il fera de toi sa plus grande joie ; il gardera le silence dans son amour ; il aura pour toi des transports d'allégresse.", priere:"Merci Seigneur de te réjouir de moi. Aide-moi à recevoir cet amour aujourd'hui.", explication:"Dieu ne se contente pas de t'aimer de loin : il se réjouit de toi comme un père se réjouit de son enfant." },
    { ref:"Romains 8:38-39", texte:"Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus-Christ notre Seigneur.", priere:"Merci que rien ne puisse me séparer de ton amour, quoi qu'il arrive aujourd'hui.", explication:"Aucune circonstance, aucune puissance, rien dans l'univers ne peut te couper de l'amour que Dieu te porte en Christ." },
    { ref:"1 Jean 4:16", texte:"Dieu est amour ; et celui qui demeure dans l'amour demeure en Dieu, et Dieu demeure en lui.", priere:"Seigneur, aide-moi à demeurer dans ton amour aujourd'hui.", explication:"Demeurer dans l'amour, c'est demeurer proche de Dieu lui-même, car son identité profonde est d'être amour." },
    { ref:"Psaume 136:1", texte:"Louez l'Éternel, car il est bon, car sa miséricorde dure à toujours !", priere:"Merci Seigneur pour ta bonté qui ne s'arrête jamais.", explication:"La bonté de Dieu et sa fidélité ne connaissent pas de fin — c'est une raison de louange qui ne s'épuise jamais." }
  ], joursAlt:[
    { ref:"Jean 15:9", texte:"Comme le Père m'a aimé, je vous ai aussi aimés. Demeurez dans mon amour.", priere:"Aide-moi à demeurer dans ton amour aujourd'hui, Seigneur.", explication:"Demeurer dans l'amour de Jésus n'est pas une option ponctuelle mais un lieu où rester en permanence." },
    { ref:"Romains 8:35", texte:"Qui nous séparera de l'amour de Christ ? Sera-ce la tribulation, ou l'angoisse, ou la persécution ?", priere:"Merci que rien ne puisse me séparer de ton amour, quoi qu'il arrive.", explication:"Aucune épreuve, aussi violente soit-elle, n'a le pouvoir de couper le lien d'amour établi en Christ." },
    { ref:"Jérémie 31:3", texte:"Je t'aime d'un amour éternel ; c'est pourquoi je te conserve ma bonté.", priere:"Merci Seigneur pour ton amour éternel qui ne dépend pas de moi.", explication:"L'amour de Dieu n'est pas une réaction ponctuelle : c'est un attachement éternel, décidé avant même notre existence." },
    { ref:"Psaume 103:11", texte:"Autant les cieux sont élevés au-dessus de la terre, autant sa bonté est grande pour ceux qui le craignent.", priere:"Merci pour ta bonté immense envers ceux qui te craignent.", explication:"La bonté de Dieu dépasse toute mesure humaine, à l'image de la distance entre le ciel et la terre." },
    { ref:"1 Corinthiens 13:4", texte:"La charité est patiente, elle est pleine de bonté ; la charité n'est point envieuse, elle ne s'enfle point d'orgueil.", priere:"Seigneur, façonne en moi un amour patient et sans orgueil envers les autres.", explication:"L'amour véritable se reconnaît à la patience et à l'absence d'orgueil, pas seulement aux paroles." },
    { ref:"Deutéronome 7:9", texte:"L'Éternel, ton Dieu... garde son alliance et sa miséricorde jusqu'à la millième génération envers ceux qui l'aiment.", priere:"Merci pour ta fidélité qui dure de génération en génération.", explication:"La fidélité de Dieu à son alliance traverse les générations sans jamais faiblir." },
    { ref:"1 Jean 3:1", texte:"Voyez quel amour le Père nous a témoigné, pour que nous soyons appelés enfants de Dieu ! Et nous le sommes.", priere:"Merci de m'appeler ton enfant, Seigneur.", explication:"Être appelé enfant de Dieu est un amour immérité, donné et non gagné." }
  ]},
  { id:'priere', titre:"La prière", jours:[
    { ref:"Marc 11:24", texte:"C'est pourquoi je vous dis : Tout ce que vous demanderez en priant, croyez que vous l'avez reçu, et vous le verrez s'accomplir.", priere:"Seigneur, augmente ma foi quand je te présente mes demandes aujourd'hui.", explication:"Prier avec l'assurance d'avoir déjà reçu change la façon dont on attend la réponse de Dieu." },
    { ref:"Matthieu 6:6", texte:"Mais quand tu pries, entre dans ta chambre, ferme ta porte, et prie ton Père qui est là dans le lieu secret ; et ton Père, qui voit dans le secret, te le rendra.", priere:"Merci pour ce lieu secret où je peux te parler librement.", explication:"Le lieu secret protège la prière de tout désir de paraître — Dieu regarde ce qui se vit dans l'intime." },
    { ref:"Jacques 5:16", texte:"confessez vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficace.", priere:"Apprends-moi à prier avec ferveur, pour moi et pour les autres.", explication:"La prière sincère d'une personne juste a un impact réel, spécialement quand elle est partagée en confiance avec d'autres." },
    { ref:"1 Thessaloniciens 5:17", texte:"Priez sans cesse.", priere:"Seigneur, aide-moi à garder un dialogue avec toi tout au long de cette journée.", explication:"Prier sans cesse, ce n'est pas prier tout le temps à genoux, mais garder un dialogue continu avec Dieu." },
    { ref:"Jérémie 33:3", texte:"Invoque-moi, et je te répondrai ; je t'annoncerai de grandes choses, des choses cachées, que tu ne connais pas.", priere:"Je t'invoque aujourd'hui, Seigneur : parle-moi.", explication:"Dieu invite à l'appeler pour révéler ce que l'on ne pourrait jamais découvrir par soi-même." },
    { ref:"Luc 18:1", texte:"Jésus leur adressa une parabole, pour montrer qu'il faut toujours prier, et ne point se relâcher.", priere:"Aide-moi à persévérer dans la prière aujourd'hui, sans me décourager.", explication:"La persévérance dans la prière, sans se décourager, est justement ce que Jésus enseigne à ses disciples." },
    { ref:"Éphésiens 6:18", texte:"Faites en tout temps par l'Esprit toutes sortes de prières et de supplications. Veillez à cela avec une entière persévérance, et priez pour tous les saints.", priere:"Seigneur, mets sur mon cœur les personnes pour qui je dois prier aujourd'hui.", explication:"Prier pour les autres, pas seulement pour soi, fait aussi partie du combat spirituel auquel on est appelé." }
  ], joursAlt:[
    { ref:"Philippiens 4:6", texte:"Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.", priere:"Seigneur, je te présente ce qui m'inquiète aujourd'hui, avec reconnaissance.", explication:"Remplacer l'inquiétude par la prière change concrètement ce que l'on ressent, pas seulement ce que l'on croit." },
    { ref:"Matthieu 7:7", texte:"Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira.", priere:"J'ose demander, chercher et frapper à ta porte aujourd'hui, Seigneur.", explication:"Dieu invite à une démarche active dans la prière : demander, chercher, frapper, sans se décourager." },
    { ref:"Psaume 5:3", texte:"Éternel ! le matin tu entends ma voix ; le matin je me tourne vers toi, et je regarde.", priere:"Le matin, je tourne mon regard vers toi, Seigneur.", explication:"Commencer la journée en se tournant vers Dieu oriente tout le reste de la journée." },
    { ref:"Colossiens 4:2", texte:"Persévérez dans la prière, veillez-y avec actions de grâces.", priere:"Aide-moi à persévérer dans la prière avec un cœur reconnaissant.", explication:"La persévérance dans la prière s'accompagne naturellement de reconnaissance, pas seulement de demandes." },
    { ref:"1 Jean 5:14", texte:"Nous avons auprès de lui cette assurance, que si nous demandons quelque chose selon sa volonté, il nous écoute.", priere:"Merci de m'écouter quand je demande selon ta volonté.", explication:"Prier selon la volonté de Dieu donne une assurance réelle d'être entendu." },
    { ref:"Psaume 145:18", texte:"L'Éternel est près de tous ceux qui l'invoquent, de tous ceux qui l'invoquent avec sincérité.", priere:"Merci d'être proche de moi quand je t'invoque avec sincérité.", explication:"La sincérité, plus que la forme des mots, est ce qui rapproche de Dieu dans la prière." },
    { ref:"Marc 1:35", texte:"Vers le matin, pendant qu'il faisait encore fort obscur, Jésus se leva, et sortit pour aller dans un lieu désert, où il pria.", priere:"Comme Jésus, aide-moi à chercher un moment seule avec toi aujourd'hui.", explication:"Même Jésus prenait le temps de s'isoler pour prier, montrant que ce besoin ne disparaît jamais." }
  ]},
  { id:'saint-esprit', titre:"Le Saint-Esprit", jours:[
    { ref:"Actes 1:8", texte:"Mais vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins.", priere:"Remplis-moi de ta puissance aujourd'hui, Seigneur.", explication:"La puissance promise par Jésus n'est pas pour impressionner, mais pour être témoin de lui là où l'on vit." },
    { ref:"Jean 14:26", texte:"Mais le consolateur, l'Esprit-Saint, que le Père enverra en mon nom, vous enseignera toutes choses, et vous rappellera tout ce que je vous ai dit.", priere:"Merci pour ton Esprit qui m'enseigne et me rappelle ta Parole.", explication:"Le Saint-Esprit ne se contente pas d'enseigner : il rappelle aussi, au bon moment, ce qui a déjà été appris." },
    { ref:"Galates 5:22-23", texte:"Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance ; la loi n'est pas contre ces choses.", priere:"Fais grandir ce fruit en moi aujourd'hui, Seigneur.", explication:"Le fruit de l'Esprit grandit progressivement, comme un fruit sur un arbre, pas par un effort de volonté seul." },
    { ref:"Romains 8:26", texte:"De même aussi l'Esprit nous aide dans notre faiblesse, car nous ne savons pas ce qu'il nous convient de demander dans nos prières.", priere:"Merci de m'aider dans ma faiblesse, même quand je ne sais pas quoi te dire.", explication:"Dans les moments où l'on ne sait plus quoi dire à Dieu, l'Esprit intercède lui-même à notre place." },
    { ref:"Zacharie 4:6", texte:"ce n'est ni par la puissance ni par la force, mais c'est par mon Esprit, dit l'Éternel des armées.", priere:"Seigneur, que ce soit ton Esprit qui agisse aujourd'hui, pas mes seules forces.", explication:"Les plus grandes victoires spirituelles ne viennent ni de la force ni du talent, mais de l'Esprit de Dieu." },
    { ref:"Jean 14:16-17", texte:"Et moi, je prierai le Père, et il vous donnera un autre consolateur, afin qu'il demeure éternellement avec vous, l'Esprit de vérité.", priere:"Merci pour ta présence permanente en moi par ton Esprit.", explication:"L'Esprit promis par Jésus n'est pas de passage : il demeure durablement avec ceux qui croient." },
    { ref:"Actes 2:4", texte:"Et ils furent tous remplis du Saint-Esprit, et se mirent à parler en d'autres langues, selon que l'Esprit leur donnait de s'exprimer.", priere:"Remplis-moi à nouveau de ton Esprit aujourd'hui, Seigneur.", explication:"Être rempli de l'Esprit peut se vivre à nouveau, pas seulement une fois pour toutes." }
  ], joursAlt:[
    { ref:"Éphésiens 5:18", texte:"soyez remplis de l'Esprit.", priere:"Remplis-moi de ton Esprit à nouveau aujourd'hui, Seigneur.", explication:"Être rempli de l'Esprit est une invitation à renouveler continuellement, pas un état acquis une seule fois." },
    { ref:"Actes 2:38", texte:"repentez-vous, et que chacun de vous soit baptisé au nom de Jésus-Christ, pour le pardon de vos péchés ; et vous recevrez le don du Saint-Esprit.", priere:"Merci pour le don de ton Esprit reçu par la foi.", explication:"Le don du Saint-Esprit accompagne la repentance et la foi, il n'est pas réservé à une élite spirituelle." },
    { ref:"1 Corinthiens 6:19", texte:"Ne savez-vous pas que votre corps est le temple du Saint-Esprit qui est en vous ?", priere:"Aide-moi à honorer mon corps comme un temple de ton Esprit.", explication:"Considérer son corps comme un temple change le rapport que l'on a avec soi-même et avec Dieu." },
    { ref:"Romains 8:14", texte:"car tous ceux qui sont conduits par l'Esprit de Dieu sont fils de Dieu.", priere:"Conduis-moi par ton Esprit aujourd'hui, Seigneur, dans mes choix.", explication:"Être conduit par l'Esprit fait partie de ce qui définit une véritable identité d'enfant de Dieu." },
    { ref:"Galates 5:25", texte:"Si nous vivons par l'Esprit, marchons aussi selon l'Esprit.", priere:"Aide-moi à marcher selon l'Esprit, pas selon mes seules envies.", explication:"Vivre par l'Esprit implique aussi de marcher concrètement selon lui, pas seulement d'en parler." },
    { ref:"Jean 3:8", texte:"Le vent souffle où il veut... Il en est ainsi de tout homme qui est né de l'Esprit.", priere:"Merci que ton Esprit agit, même quand je ne comprends pas tout.", explication:"L'action de l'Esprit reste souvent mystérieuse, mais ses effets sont bien réels dans une vie transformée." },
    { ref:"2 Timothée 1:7", texte:"Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.", priere:"Merci de ne pas m'avoir donné un esprit de timidité, mais de force et d'amour.", explication:"La peur ne vient pas de Dieu : il donne plutôt la force, l'amour et un esprit posé." }
  ]},
  { id:'marcher-jesus', titre:"Marcher avec Jésus, son attitude", jours:[
    { ref:"Philippiens 2:5", texte:"Ayez en vous les sentiments qui étaient en Jésus-Christ.", priere:"Seigneur, forme en moi tes sentiments aujourd'hui.", explication:"Adopter les pensées de Jésus commence par vouloir ce qu'il veut, pas seulement imiter ses actes." },
    { ref:"Matthieu 11:29", texte:"Prenez mon joug sur vous et recevez mes instructions, car je suis doux et humble de cœur ; et vous trouverez du repos pour vos âmes.", priere:"Apprends-moi ta douceur et ton humilité, Seigneur.", explication:"La douceur et l'humilité de Jésus ne sont pas des faiblesses : elles apportent un vrai repos intérieur." },
    { ref:"Jean 13:15", texte:"car je vous ai donné un exemple, afin que vous fassiez comme je vous ai fait.", priere:"Aide-moi à suivre ton exemple envers les personnes que je croiserai aujourd'hui.", explication:"Servir les autres à l'exemple de Jésus, même dans les petits gestes, marque une vie qui lui ressemble." },
    { ref:"Luc 6:31", texte:"Ce que vous voulez que les hommes fassent pour vous, faites-le de même pour eux.", priere:"Seigneur, aide-moi à traiter les autres comme j'aimerais être traitée.", explication:"La règle d'or de Jésus se vit concrètement en se demandant comment on aimerait soi-même être traité." },
    { ref:"1 Pierre 2:21", texte:"Et c'est à cela que vous avez été appelés, parce que Christ aussi a souffert pour vous, vous laissant un exemple, afin que vous suiviez ses traces.", priere:"Merci pour ton exemple. Aide-moi à marcher dans tes traces aujourd'hui.", explication:"Souffrir injustement sans perdre sa foi, comme Jésus, laisse une trace que d'autres peuvent suivre." },
    { ref:"Colossiens 3:12", texte:"Ainsi donc, comme des élus de Dieu, saints et bien-aimés, revêtez-vous d'entrailles de miséricorde, de bonté, d'humilité, de douceur, de patience.", priere:"Seigneur, revêts-moi de ton caractère aujourd'hui.", explication:"Se revêtir des qualités de Christ est un choix actif, à renouveler chaque jour, pas un état acquis une fois." },
    { ref:"Jean 15:5", texte:"Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire.", priere:"Aide-moi à demeurer en toi aujourd'hui, dans chaque décision.", explication:"Rester attaché à Jésus comme un sarment au cep est la seule condition pour porter du fruit qui dure." }
  ], joursAlt:[
    { ref:"Matthieu 16:24", texte:"Si quelqu'un veut venir après moi, qu'il renonce à lui-même, qu'il se charge de sa croix, et qu'il me suive.", priere:"Seigneur, aide-moi à te suivre aujourd'hui, même quand c'est coûteux.", explication:"Suivre Jésus implique un renoncement réel à soi-même, pas seulement une adhésion d'idées." },
    { ref:"Jean 8:12", texte:"Je suis la lumière du monde ; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.", priere:"Merci d'être la lumière qui éclaire mon chemin aujourd'hui.", explication:"Marcher avec Jésus signifie sortir des ténèbres pour vivre dans sa lumière au quotidien." },
    { ref:"1 Jean 2:6", texte:"celui qui dit demeurer en lui doit marcher aussi comme il a marché lui-même.", priere:"Aide-moi à marcher comme tu as marché, Seigneur.", explication:"Prétendre demeurer en Christ engage à vivre concrètement comme lui a vécu." },
    { ref:"Matthieu 4:19", texte:"Suivez-moi, et je vous ferai pêcheurs d'hommes.", priere:"Rends-moi disponible aujourd'hui pour te suivre, où que ce soit.", explication:"L'appel de Jésus à suivre reste aussi direct et personnel aujourd'hui qu'il l'était pour les premiers disciples." },
    { ref:"Philippiens 3:8", texte:"je regarde toutes choses comme une perte, à cause de l'excellence de la connaissance de Jésus-Christ mon Seigneur.", priere:"Que te connaître compte plus que tout le reste aujourd'hui.", explication:"Connaître Jésus personnellement dépasse en valeur toute autre réussite ou reconnaissance." },
    { ref:"Jean 12:26", texte:"Si quelqu'un me sert, qu'il me suive ; et là où je suis, là aussi sera mon serviteur.", priere:"Aide-moi à te servir fidèlement là où tu me places.", explication:"Servir Jésus signifie aussi accepter d'aller là où lui-même choisit de nous conduire." },
    { ref:"Éphésiens 5:1", texte:"Devenez donc les imitateurs de Dieu, comme des enfants bien-aimés.", priere:"Aide-moi à t'imiter aujourd'hui, comme ton enfant bien-aimée.", explication:"Imiter Dieu, comme un enfant imite un parent aimant, est le cœur même de marcher avec Jésus." }
  ]},
  { id:'tentation', titre:"Résister à la tentation", jours:[
    { ref:"1 Corinthiens 10:13", texte:"Aucune tentation ne vous est survenue qui n'ait été humaine, et Dieu, qui est fidèle, ne permettra pas que vous soyez tentés au delà de vos forces ; mais avec la tentation il préparera aussi le moyen d'en sortir, afin que vous puissiez la supporter.", priere:"Merci Seigneur que tu prépares toujours une issue. Aide-moi à la voir aujourd'hui.", explication:"Aucune tentation n'est trop grande pour être surmontée : Dieu prépare toujours une issue, même quand elle n'est pas visible tout de suite." },
    { ref:"Jacques 4:7", texte:"Soumettez-vous donc à Dieu ; résistez au diable, et il fuira loin de vous.", priere:"Je me soumets à toi aujourd'hui, Seigneur, et je résiste à ce qui m'éloigne de toi.", explication:"Résister au mal commence par une soumission sincère à Dieu — le combat se gagne d'abord à cet endroit-là." },
    { ref:"Matthieu 26:41", texte:"Veillez et priez, afin que vous ne tombiez pas dans la tentation ; l'esprit est bien disposé, mais la chair est faible.", priere:"Aide-moi à veiller et à prier plutôt que de compter sur mes propres forces.", explication:"La volonté seule ne suffit pas face à la tentation : c'est la vigilance et la prière qui protègent vraiment." },
    { ref:"Éphésiens 6:11", texte:"Revêtez-vous de toutes les armes de Dieu, afin de pouvoir tenir ferme contre les ruses du diable.", priere:"Seigneur, revêts-moi de tes armes aujourd'hui.", explication:"Les armes spirituelles ne sont pas symboliques : elles permettent réellement de tenir ferme face aux ruses de l'ennemi." },
    { ref:"Psaume 119:11", texte:"Je serre ta parole dans mon cœur, afin de ne pas pécher contre toi.", priere:"Aide-moi à garder ta Parole tout près de mon cœur aujourd'hui.", explication:"Connaître et garder la Parole de Dieu dans son cœur agit comme une protection avant même que la tentation survienne." },
    { ref:"Hébreux 4:15", texte:"Car nous n'avons pas un souverain sacrificateur qui ne puisse compatir à nos faiblesses ; au contraire, il a été tenté comme nous en toutes choses, sans commettre de péché.", priere:"Merci Jésus de comprendre mes luttes. Aide-moi comme toi à résister sans céder.", explication:"Jésus a connu la tentation dans toute sa force, ce qui le rend capable de comprendre nos luttes sans jamais juger." },
    { ref:"Jacques 1:12", texte:"Heureux l'homme qui supporte patiemment la tentation ; car, après avoir été éprouvé, il recevra la couronne de vie, que le Seigneur a promise à ceux qui l'aiment.", priere:"Donne-moi la persévérance dans l'épreuve aujourd'hui, Seigneur.", explication:"Tenir bon dans l'épreuve de la tentation n'est jamais vain : une récompense durable est promise à qui persévère." }
  ], joursAlt:[
    { ref:"Jacques 1:13", texte:"que personne, lorsqu'il est tenté, ne dise : C'est Dieu qui me tente. Car Dieu ne peut être tenté par le mal, et il ne tente lui-même personne.", priere:"Seigneur, aide-moi à ne jamais te blâmer pour mes propres luttes, mais à venir à toi.", explication:"Dieu n'est jamais à l'origine de la tentation : la reconnaître ainsi aide à ne pas se détourner de lui dans l'épreuve." },
    { ref:"1 Pierre 5:8", texte:"Soyez sobres, veillez. Votre adversaire, le diable, rôde comme un lion rugissant, cherchant qui il dévorera.", priere:"Rends-moi vigilante aujourd'hui, Seigneur, face à ce qui cherche à me faire tomber.", explication:"Rester vigilant et sobre protège de l'attaque, qui vient souvent au moment où l'on s'y attend le moins." },
    { ref:"Genèse 39:12", texte:"elle le saisit par son vêtement, en disant : Couche avec moi ! Il lui laissa son vêtement dans la main, et s'enfuit.", priere:"Comme Joseph, donne-moi le courage de fuir plutôt que de céder.", explication:"Fuir physiquement une situation de tentation, comme Joseph, vaut souvent mieux que d'essayer d'y résister sur place." },
    { ref:"1 Corinthiens 6:18", texte:"Fuyez l'impudicité. Quelque autre péché qu'un homme commette est hors du corps ; mais celui qui se livre à l'impudicité pèche contre son propre corps.", priere:"Aide-moi à fuir ce qui blesse mon corps et mon témoignage.", explication:"Certaines tentations touchent directement le corps ; les fuir n'est pas une faiblesse, mais une sagesse." },
    { ref:"Romains 6:12", texte:"Que le péché ne règne donc point dans votre corps mortel, et n'obéissez pas à ses convoitises.", priere:"Que le péché ne règne pas sur moi aujourd'hui, Seigneur.", explication:"Refuser de laisser le péché dicter ses choix demande une décision active, renouvelée chaque jour." },
    { ref:"2 Timothée 2:22", texte:"Fuis les passions de la jeunesse, et recherche la justice, la foi, la charité, la paix.", priere:"Aide-moi à rechercher ce qui est juste plutôt que ce qui est facile.", explication:"Rechercher activement la justice et la paix protège mieux que simplement essayer d'éviter le mal." },
    { ref:"Psaume 141:3", texte:"Éternel, mets une garde à ma bouche, veille sur la porte de mes lèvres.", priere:"Mets une garde sur mes lèvres et sur mon cœur aujourd'hui, Seigneur.", explication:"Demander à Dieu de garder ses paroles est une prière concrète contre les tentations du quotidien." }
  ]},
  { id:'reves', titre:"Les rêves et les visions", jours:[
    { ref:"Joël 2:28", texte:"Après cela, je répandrai mon esprit sur toute chair ; vos fils et vos filles prophétiseront, vos vieillards auront des songes, et vos jeunes gens des visions.", priere:"Seigneur, parle-moi, même dans mon sommeil, et donne-moi un cœur qui écoute.", explication:"Dieu promet de parler à toutes les générations, y compris à travers des songes et des visions, pas seulement aux prophètes d'autrefois." },
    { ref:"Genèse 37:5", texte:"Joseph eut un songe, et il le raconta à ses frères, qui le haïrent encore davantage.", priere:"Seigneur, aide-moi à garder précieusement ce que tu me montres, même quand ce n'est pas encore compris par tous.", explication:"Un rêve donné par Dieu peut être incompris ou même mal reçu par les autres avant de se réaliser." },
    { ref:"Genèse 28:12", texte:"Il eut un songe. Et voici, une échelle était appuyée sur la terre, et son sommet touchait au ciel. Et voici, les anges de Dieu montaient et descendaient par cette échelle.", priere:"Seigneur, rappelle-moi que le ciel est proche de moi, même quand je ne le vois pas.", explication:"Certains songes révèlent que le ciel est bien plus proche de notre quotidien qu'il n'y paraît." },
    { ref:"Daniel 1:17", texte:"Dieu accorda à ces quatre jeunes gens de la science, de l'intelligence dans toutes les lettres et une sagesse ; et Daniel expliquait toutes les visions et tous les songes.", priere:"Donne-moi la sagesse de comprendre ce que tu veux me montrer, Seigneur.", explication:"La sagesse pour comprendre un songe est elle-même un don que Dieu accorde à qui la lui demande." },
    { ref:"Matthieu 1:20", texte:"Comme il y pensait, voici, un ange du Seigneur lui apparut en songe, et dit : Joseph, fils de David, ne crains pas de prendre avec toi Marie, ta femme, car l'enfant qu'elle a conçu vient du Saint-Esprit.", priere:"Seigneur, guide-moi comme tu as guidé Joseph, même dans mes moments de doute.", explication:"Dieu peut intervenir dans un songe pour guider une décision importante, comme il l'a fait pour Joseph." },
    { ref:"Actes 16:9", texte:"Pendant la nuit, Paul eut une vision : un Macédonien lui apparut, et lui fit cette prière : Passe en Macédoine, secours-nous !", priere:"Seigneur, montre-moi où tu veux m'envoyer et ce que tu veux que je fasse.", explication:"Une vision peut aussi révéler une direction claire à prendre, un appel précis à suivre sans tarder." },
    { ref:"Nombres 12:6", texte:"il dit : Écoutez bien mes paroles ! Lorsqu'il y aura parmi vous un prophète, c'est dans une vision que moi, l'Éternel, je me révélerai à lui, c'est dans un songe que je lui parlerai.", priere:"Merci Seigneur de te révéler à moi de différentes façons. Garde mon cœur attentif.", explication:"Le songe et la vision restent, aujourd'hui encore, une façon dont Dieu choisit parfois de se révéler." }
  ], joursAlt:[
    { ref:"Genèse 40:8", texte:"Nous avons eu un songe, et il n'y a personne pour l'expliquer. Joseph leur dit : N'est-ce pas à Dieu qu'appartiennent les explications ?", priere:"Seigneur, à toi appartiennent les explications que je ne comprends pas encore.", explication:"Comprendre un songe ou une situation confuse commence par reconnaître que la vraie explication vient de Dieu." },
    { ref:"Genèse 41:16", texte:"Joseph répondit à Pharaon, en disant : Ce n'est pas moi ! c'est Dieu qui donnera une réponse favorable à Pharaon.", priere:"Merci que ce n'est pas de moi, mais de toi, que vient la bonne réponse.", explication:"Attribuer à Dieu, et non à soi-même, la sagesse reçue garde dans l'humilité." },
    { ref:"1 Samuel 3:10", texte:"L'Éternel vint et se présenta... Samuel répondit : Parle, car ton serviteur écoute.", priere:"Parle, Seigneur, car je suis à l'écoute aujourd'hui.", explication:"Être disponible pour écouter Dieu, même en pleine nuit, ouvre la porte à sa direction." },
    { ref:"Matthieu 2:12", texte:"Divinement avertis en songe de ne pas retourner vers Hérode, les mages regagnèrent leur pays par un autre chemin.", priere:"Avertis-moi, Seigneur, quand je dois changer de chemin.", explication:"Dieu peut avertir directement d'un danger ou d'un changement de direction nécessaire." },
    { ref:"Matthieu 2:13", texte:"Un ange du Seigneur apparut en songe à Joseph, et dit : Lève-toi, prends le petit enfant et sa mère, fuis en Égypte.", priere:"Merci de me protéger et de me guider, même dans mon sommeil.", explication:"La protection de Dieu peut passer par des instructions précises données au moment voulu." },
    { ref:"Daniel 2:19", texte:"Alors le secret fut révélé à Daniel dans une vision pendant la nuit. Et Daniel bénit le Dieu des cieux.", priere:"Merci de révéler ce qui est caché, en ton temps, Seigneur.", explication:"Ce qui semble cacher un secret peut être révélé par Dieu, en son temps, à qui le cherche sincèrement." },
    { ref:"1 Rois 3:5", texte:"À Gabaon, l'Éternel apparut en songe à Salomon pendant la nuit, et Dieu lui dit : Demande ce que tu veux que je te donne.", priere:"Seigneur, donne-moi la sagesse comme tu l'as donnée à Salomon.", explication:"Demander la sagesse à Dieu, plutôt que la richesse ou le pouvoir, reflète des priorités justes." }
  ]},
  { id:'forteresses', titre:"Fermer les forteresses démoniaques", jours:[
    { ref:"2 Corinthiens 10:4-5", texte:"car les armes avec lesquelles nous combattons ne sont pas charnelles ; mais elles sont puissantes, par la vertu de Dieu, pour renverser des forteresses. Nous renversons les raisonnements et toute hauteur qui s'élève contre la connaissance de Dieu, et nous amenons toute pensée captive à l'obéissance de Christ.", priere:"Seigneur, je remets mes pensées captives à ton obéissance aujourd'hui.", explication:"Le vrai combat spirituel se joue d'abord dans les pensées : c'est là que les forteresses se dressent, et c'est là qu'elles tombent." },
    { ref:"Éphésiens 6:12", texte:"Car nous n'avons pas à lutter contre la chair et le sang, mais contre les dominations, contre les autorités, contre les princes de ce monde de ténèbres, contre les esprits méchants dans les lieux célestes.", priere:"Ouvre mes yeux sur le vrai combat, Seigneur, et arme-moi pour aujourd'hui.", explication:"Reconnaître que le combat n'est pas contre des personnes mais contre des puissances spirituelles change la façon de se battre." },
    { ref:"Luc 10:19", texte:"Voici, je vous ai donné le pouvoir de marcher sur les serpents et les scorpions, et sur toute la puissance de l'ennemi ; et rien ne pourra vous nuire.", priere:"Merci pour l'autorité que tu me donnes. J'avance aujourd'hui sans crainte.", explication:"L'autorité donnée par Jésus sur la puissance de l'ennemi n'est pas symbolique : elle protège réellement celui qui marche avec lui." },
    { ref:"1 Jean 4:4", texte:"Vous, petits enfants, vous êtes de Dieu, et vous les avez vaincus, parce que celui qui est en vous est plus grand que celui qui est dans le monde.", priere:"Merci que celui qui est en moi est plus grand que tout ce qui m'oppose.", explication:"Celui qui habite en nous est déjà plus fort que tout ce qui cherche à nous opprimer." },
    { ref:"Marc 16:17", texte:"Voici les miracles qui accompagneront ceux qui auront cru : en mon nom, ils chasseront les démons ; ils parleront de nouvelles langues.", priere:"Seigneur, donne-moi de marcher avec l'autorité que tu promets à ceux qui croient.", explication:"L'autorité pour agir au nom de Jésus est accessible à ceux qui croient, pas réservée à quelques-uns." },
    { ref:"Colossiens 2:15", texte:"il a dépouillé les dominations et les autorités, et les a livrées publiquement en spectacle, en triomphant d'elles par la croix.", priere:"Merci Jésus pour ta victoire déjà remportée sur tout ce qui m'oppose.", explication:"La victoire sur les forces qui oppressent a déjà été remportée à la croix, une fois pour toutes." },
    { ref:"Apocalypse 12:11", texte:"Ils l'ont vaincu à cause du sang de l'agneau et à cause de la parole de leur témoignage, et ils n'ont pas aimé leur vie jusqu'à craindre la mort.", priere:"Seigneur, aide-moi à tenir ferme dans mon témoignage aujourd'hui.", explication:"Le témoignage et la fidélité, même au prix fort, restent une arme puissante contre l'accusateur." }
  ], joursAlt:[
    { ref:"Éphésiens 6:13", texte:"C'est pourquoi, prenez toutes les armes de Dieu, afin de pouvoir résister dans le mauvais jour, et tenir ferme après avoir tout surmonté.", priere:"Seigneur, arme-moi aujourd'hui pour tenir ferme dans le combat.", explication:"Résister dans le combat spirituel demande de revêtir concrètement les armes que Dieu fournit, pas seulement d'espérer." },
    { ref:"Psaume 18:2", texte:"Éternel, mon rocher, ma forteresse, mon libérateur ! Mon Dieu, mon rocher, où je trouve un abri !", priere:"Merci d'être mon rocher et ma forteresse, Seigneur.", explication:"Dieu lui-même est décrit comme une forteresse : il n'offre pas seulement une protection, il EST la protection." },
    { ref:"Psaume 91:1", texte:"Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.", priere:"Je me repose sous ton abri aujourd'hui, Seigneur.", explication:"Demeurer sous la protection de Dieu est une position de repos, pas de lutte permanente." },
    { ref:"Romains 8:37", texte:"Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés.", priere:"Merci que je suis plus que vainqueur par toi, Seigneur.", explication:"La victoire promise dépasse une simple survie : elle place du côté des vainqueurs, pas des victimes." },
    { ref:"1 Corinthiens 15:57", texte:"grâces soient rendues à Dieu, qui nous donne la victoire par notre Seigneur Jésus-Christ !", priere:"Merci pour la victoire que tu donnes par Jésus-Christ.", explication:"La victoire sur les forces opposées vient de Dieu, à travers Jésus, jamais de nos propres forces." },
    { ref:"Psaume 27:1", texte:"L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ? L'Éternel est le rempart de ma vie.", priere:"Merci d'être ma lumière et mon rempart, je n'ai rien à craindre.", explication:"Face à ce qui pourrait faire peur, savoir que Dieu est un rempart change complètement la perspective." },
    { ref:"Nahum 1:7", texte:"L'Éternel est bon, il est un refuge au jour de la détresse ; il connaît ceux qui se confient en lui.", priere:"Merci d'être mon refuge au jour de la détresse.", explication:"Dieu reste un refuge fiable spécifiquement dans les moments de détresse, pas seulement dans le calme." }
  ]},
  { id:'connaitre-dieu', titre:"Connaître Dieu", jours:[
    { ref:"Jérémie 9:24", texte:"mais que celui qui veut se glorifier se glorifie de ce qu'il a l'intelligence de me connaître, et de savoir que je suis l'Éternel qui exerce la bonté, le droit et la justice sur la terre.", priere:"Seigneur, je veux te connaître toi, plus que tout le reste.", explication:"Connaître Dieu personnellement vaut infiniment plus que toute autre réussite ou reconnaissance dans la vie." },
    { ref:"Jean 17:3", texte:"Or, la vie éternelle, c'est qu'ils te connaissent, toi, le seul vrai Dieu, et celui que tu as envoyé, Jésus-Christ.", priere:"Merci pour cette vie éternelle qui commence par te connaître dès aujourd'hui.", explication:"La vie éternelle ne se limite pas à un avenir lointain : elle commence dès maintenant, par connaître Dieu." },
    { ref:"Philippiens 3:10", texte:"Afin de connaître Christ, et la puissance de sa résurrection, et la communion de ses souffrances, en devenant conforme à lui dans sa mort.", priere:"Fais-moi connaître ta puissance et ta présence aujourd'hui, Seigneur.", explication:"Connaître Christ inclut aussi accepter de traverser des difficultés à sa suite, pas seulement recevoir sa puissance." },
    { ref:"Osée 6:3", texte:"Connaissons, cherchons à connaître l'Éternel ; sa venue est aussi certaine que celle de l'aurore.", priere:"J'ai soif de te connaître davantage, Seigneur.", explication:"Chercher à connaître Dieu est une quête à poursuivre chaque jour, avec autant de certitude que le lever du jour." },
    { ref:"Psaume 46:11", texte:"Arrêtez, et sachez que je suis Dieu.", priere:"Seigneur, aide-moi à m'arrêter aujourd'hui pour reconnaître qui tu es.", explication:"S'arrêter, même brièvement, pour reconnaître qui est Dieu recentre un cœur agité ou dispersé." },
    { ref:"Colossiens 1:10", texte:"afin de vous conduire d'une manière digne du Seigneur et lui être entièrement agréables, portant des fruits en toute bonne œuvre et croissant par la connaissance de Dieu.", priere:"Fais-moi grandir dans ta connaissance aujourd'hui, Seigneur.", explication:"Grandir dans la connaissance de Dieu se voit concrètement dans une vie qui porte du fruit." },
    { ref:"1 Chroniques 28:9", texte:"connais le Dieu de ton père, et sers-le avec un cœur dévoué et l'âme empressée ; car l'Éternel sonde tous les cœurs, et il discerne toute la suite des pensées.", priere:"Seigneur, sonde mon cœur et rapproche-moi de toi aujourd'hui.", explication:"Dieu ne se laisse pas tromper par les apparences : il sonde le cœur au-delà des mots et des actes." }
  ], joursAlt:[
    { ref:"Psaume 34:8", texte:"Sentez et voyez combien l'Éternel est bon ! Heureux l'homme qui cherche en lui son refuge !", priere:"Aide-moi à goûter combien tu es bon aujourd'hui, Seigneur.", explication:"Goûter la bonté de Dieu par l'expérience personnelle dépasse le simple fait d'en entendre parler." },
    { ref:"Jérémie 29:13", texte:"Vous me chercherez, et vous me trouverez, si vous me cherchez de tout votre cœur.", priere:"Je te cherche de tout mon cœur aujourd'hui, Seigneur.", explication:"Chercher Dieu de tout son cœur, pas à moitié, est la condition posée pour le trouver vraiment." },
    { ref:"Psaume 145:3", texte:"L'Éternel est grand et très digne de louange, et sa grandeur est insondable.", priere:"Ta grandeur dépasse ma compréhension — merci de te révéler à moi quand même.", explication:"La grandeur de Dieu dépasse toute mesure humaine, ce qui n'empêche pas de le connaître réellement." },
    { ref:"Job 42:5", texte:"Mon oreille avait entendu parler de toi ; mais maintenant mon œil t'a vu.", priere:"Fais que je te connaisse, pas seulement que j'entende parler de toi.", explication:"Il y a une différence entre savoir des choses sur Dieu et l'avoir personnellement rencontré." },
    { ref:"Éphésiens 1:17", texte:"qu'il vous donne un esprit de sagesse et de révélation, dans sa connaissance.", priere:"Donne-moi un esprit de sagesse pour mieux te connaître.", explication:"La vraie connaissance de Dieu est aussi un don spirituel, pas seulement le fruit d'un effort intellectuel." },
    { ref:"Psaume 25:14", texte:"L'amitié de l'Éternel est pour ceux qui le craignent, et son alliance leur donne instruction.", priere:"Merci pour ton amitié envers ceux qui te craignent.", explication:"Une relation proche avec Dieu s'accompagne d'une instruction particulière réservée à ceux qui le craignent." },
    { ref:"Daniel 11:32", texte:"le peuple qui connaît son Dieu manifestera de la fermeté et agira.", priere:"Donne-moi la fermeté de ceux qui te connaissent vraiment.", explication:"Connaître Dieu donne une fermeté intérieure qui permet d'agir avec assurance, même en période difficile." }
  ]},
  { id:'education-enfants', titre:"L'éducation des enfants", jours:[
    { ref:"Proverbes 22:6", texte:"Instruis l'enfant selon la voie qu'il doit suivre ; et quand il sera vieux, il ne s'en détournera pas.", priere:"Seigneur, donne-moi la sagesse pour guider mon enfant sur ton chemin.", explication:"Ce qu'un enfant apprend tôt dans la voie de Dieu continue de le marquer bien après avoir grandi." },
    { ref:"Deutéronome 6:6-7", texte:"Et ces commandements, que je te donne aujourd'hui, seront dans ton cœur. Tu les inculqueras à tes enfants, et tu en parleras quand tu seras dans ta maison, quand tu iras en voyage, quand tu te coucheras et quand tu te lèveras.", priere:"Aide-moi à transmettre ta Parole à mon enfant, dans les petits moments du quotidien.", explication:"Transmettre la foi ne se limite pas à un enseignement formel : cela se vit dans les gestes ordinaires du quotidien." },
    { ref:"Éphésiens 6:4", texte:"Et vous, pères, n'irritez pas vos enfants, mais élevez-les en les corrigeant et en les instruisant selon le Seigneur.", priere:"Seigneur, donne-moi patience et douceur dans la façon dont je corrige et j'instruis.", explication:"Corriger un enfant avec patience, sans l'irriter inutilement, reflète l'équilibre que Dieu demande aux parents." },
    { ref:"Proverbes 29:17", texte:"Chatie ton fils, et il te donnera du repos, et il procurera des délices à ton âme.", priere:"Merci pour la promesse de paix qui accompagne une bonne éducation. Aide-moi à persévérer.", explication:"Une discipline juste, exercée avec constance, produit finalement de la paix dans la relation parent-enfant." },
    { ref:"Proverbes 13:24", texte:"Celui qui épargne la verge hait son fils, mais celui qui l'aime cherche à le corriger.", priere:"Donne-moi l'équilibre entre fermeté et amour dans l'éducation de mon enfant.", explication:"Aimer véritablement un enfant inclut le courage de le corriger, pas seulement de le combler." },
    { ref:"Marc 10:14", texte:"Jésus, voyant cela, fut indigné, et leur dit : Laissez venir à moi les petits enfants, et ne les empêchez pas ; car le royaume de Dieu est pour ceux qui leur ressemblent.", priere:"Merci pour la place que tu donnes aux enfants dans ton cœur. Aide-moi à les accueillir comme toi.", explication:"Jésus accueille les enfants avec une tendresse particulière — un modèle pour ceux qui les élèvent." },
    { ref:"Proverbes 1:8", texte:"Écoute, mon fils, l'instruction de ton père, et ne rejette pas l'enseignement de ta mère.", priere:"Aide-moi à transmettre une instruction que mon enfant voudra recevoir.", explication:"L'instruction reçue des parents reste une base précieuse à ne pas rejeter, même en grandissant." }
  ], joursAlt:[
    { ref:"Psaume 127:3", texte:"Voici, les fils sont un héritage de l'Éternel, le fruit des entrailles est une récompense.", priere:"Merci pour mon enfant, un héritage précieux que tu m'as confié.", explication:"Voir un enfant comme un héritage donné par Dieu change le regard porté sur les responsabilités parentales." },
    { ref:"Psaume 78:4", texte:"Nous dirons à la génération future les louanges de l'Éternel, et sa puissance, et les prodiges qu'il a opérés.", priere:"Aide-moi à transmettre tes louanges à la génération qui vient.", explication:"Transmettre à la génération future ce que Dieu a fait est une mission qui commence dans la famille." },
    { ref:"Colossiens 3:21", texte:"Pères, n'irritez pas vos enfants, de peur qu'ils ne se découragent.", priere:"Garde-moi de décourager mon enfant, Seigneur.", explication:"Décourager un enfant par la dureté peut freiner sa confiance bien plus que la corriger avec amour." },
    { ref:"Proverbes 23:22", texte:"Écoute ton père, lui qui t'a engendré, et ne méprise pas ta mère, quand elle est devenue vieille.", priere:"Aide mon enfant à honorer ce qu'on lui transmet avec amour.", explication:"Le respect entre générations se construit et se transmet dans les deux sens, avec le temps." },
    { ref:"Marc 10:16", texte:"Puis il les prit dans ses bras, et les bénit, en leur imposant les mains.", priere:"Merci pour la tendresse de Jésus envers les enfants.", explication:"L'attention et la bénédiction que Jésus donne aux enfants restent un modèle pour les adultes qui les entourent." },
    { ref:"3 Jean 1:4", texte:"Je n'ai pas de plus grande joie que d'apprendre que mes enfants marchent dans la vérité.", priere:"Ma plus grande joie serait de voir mon enfant marcher dans ta vérité.", explication:"Voir ses enfants avancer dans la foi peut devenir la plus grande source de joie d'un parent." },
    { ref:"Proverbes 20:7", texte:"Le juste marche dans son intégrité ; heureux ses enfants après lui !", priere:"Aide-moi à marcher dans l'intégrité pour le bien de mon enfant.", explication:"L'exemple d'intégrité donné par un parent profite concrètement à ses enfants, bien au-delà de son propre temps." }
  ]},
  { id:'guerison-coeur', titre:"La guérison du cœur (blessures intérieures)", jours:[
    { ref:"Psaume 147:3", texte:"Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.", priere:"Seigneur, viens panser ce qui est encore blessé en moi aujourd'hui.", explication:"Dieu ne se contente pas de constater un cœur brisé : il s'engage personnellement à le guérir et à le panser." },
    { ref:"Ésaïe 61:1", texte:"L'esprit du Seigneur, l'Éternel, est sur moi, car l'Éternel m'a oint pour porter de bonnes nouvelles aux malheureux ; il m'a envoyé pour guérir ceux qui ont le cœur brisé, pour proclamer aux captifs la liberté, et aux prisonniers la délivrance.", priere:"Merci pour la liberté que tu offres. Je reçois ta délivrance aujourd'hui.", explication:"La délivrance promise par Dieu touche précisément les blessures les plus profondes et les plus intimes." },
    { ref:"Psaume 34:18", texte:"L'Éternel est près de ceux qui ont le cœur brisé, et il sauve ceux qui ont l'esprit dans l'abattement.", priere:"Merci d'être proche de moi précisément là où j'ai mal.", explication:"Dieu se rapproche particulièrement de ceux dont le cœur est brisé — la proximité, pas la distance, caractérise sa réponse." },
    { ref:"Jérémie 30:17", texte:"Mais je te guérirai, je panserai tes plaies, dit l'Éternel.", priere:"Je reçois ta guérison aujourd'hui, Seigneur, à mon rythme.", explication:"La guérison promise par Dieu peut être reçue progressivement, à son propre rythme, sans pression." },
    { ref:"Ésaïe 53:5", texte:"Mais il était blessé pour nos péchés, brisé pour nos iniquités ; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris.", priere:"Merci Jésus d'avoir porté ce que je ne pouvais pas porter seule.", explication:"Les blessures les plus profondes ont déjà été portées par Jésus à la croix, pour que la guérison soit possible." },
    { ref:"Ésaïe 40:29", texte:"Il donne de la force à celui qui est fatigué, et il augmente la vigueur de celui qui tombe en défaillance.", priere:"Seigneur, renouvelle mes forces aujourd'hui, là où je suis fatiguée.", explication:"Même quand les forces manquent, Dieu a la capacité de renouveler la vigueur de celui qui est épuisé." },
    { ref:"Psaume 73:26", texte:"Ma chair et mon cœur peuvent se consumer : Dieu sera toujours le rocher de mon cœur et mon partage.", priere:"Merci d'être mon rocher, même quand tout le reste vacille.", explication:"Quand tout le reste semble vaciller, Dieu reste le point stable et fiable du cœur." }
  ], joursAlt:[
    { ref:"Psaume 30:5", texte:"Le soir arrivent les pleurs, et le matin l'allégresse.", priere:"Merci que la joie revient, même après une nuit de larmes.", explication:"La douleur n'a pas le dernier mot : Dieu promet que la joie revient, même après une longue nuit." },
    { ref:"2 Corinthiens 1:3", texte:"le Père des miséricordes et le Dieu de toute consolation, qui nous console dans toutes nos afflictions.", priere:"Merci d'être le Dieu qui console dans toute affliction.", explication:"Dieu console non pour que l'on garde cette consolation pour soi, mais pour consoler ensuite les autres à notre tour." },
    { ref:"Psaume 55:22", texte:"Remets ton sort à l'Éternel, et il te soutiendra.", priere:"Je remets mon sort entre tes mains aujourd'hui, Seigneur.", explication:"Remettre son fardeau à Dieu, plutôt que de le porter seul, ouvre la porte à son soutien réel." },
    { ref:"Ésaïe 43:2", texte:"Si tu traverses les eaux, je serai avec toi ; et les fleuves, ils ne te submergeront point.", priere:"Merci d'être avec moi à travers les épreuves qui me submergent.", explication:"La promesse de Dieu n'est pas d'éviter les épreuves, mais d'être présent au milieu d'elles." },
    { ref:"Psaume 42:11", texte:"Pourquoi t'abats-tu, mon âme ? Espère en Dieu, car je le louerai encore ; il est mon salut et mon Dieu.", priere:"Aide mon âme à espérer en toi aujourd'hui, malgré tout.", explication:"Parler à sa propre âme pour l'orienter vers l'espérance en Dieu est une démarche active, pas passive." },
    { ref:"Ésaïe 41:10", texte:"Ne crains rien, car je suis avec toi... je te fortifie, je viens à ton secours.", priere:"Merci de me fortifier et de venir à mon secours.", explication:"La peur peut être remplacée par la force que Dieu promet à ceux qu'il soutient personnellement." },
    { ref:"Romains 8:28", texte:"Nous savons que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.", priere:"Merci que tu fais concourir toutes choses à mon bien.", explication:"Même les circonstances douloureuses peuvent, avec le temps, être intégrées dans un bien plus grand que Dieu prépare." }
  ]},
  { id:'amis', titre:"Les amis", jours:[
    { ref:"Proverbes 17:17", texte:"L'ami aime en tout temps, et dans le malheur il se montre un frère.", priere:"Merci Seigneur pour les amis fidèles que tu places sur ma route.", explication:"Un ami fidèle ne se retire pas dans les moments difficiles : c'est justement là qu'il se révèle vraiment." },
    { ref:"Ecclésiaste 4:9-10", texte:"Deux valent mieux qu'un, parce qu'ils retirent un bon salaire de leur travail. Car, s'ils tombent, l'un relèvera son compagnon ; mais malheur à celui qui est seul et qui tombe, sans avoir un second pour le relever !", priere:"Aide-moi à être une amie qui relève, et à accepter d'être relevée aussi.", explication:"Être accompagné rend plus fort face aux chutes — la solitude, elle, laisse sans soutien pour se relever." },
    { ref:"Jean 15:13", texte:"Il n'y a pas de plus grand amour que de donner sa vie pour ses amis.", priere:"Merci Jésus pour ton amitié qui va jusqu'au don total.", explication:"Le plus grand amour se mesure à ce qu'on est prêt à donner pour ceux qu'on aime, à l'image de Jésus." },
    { ref:"Proverbes 18:24", texte:"Celui qui a des amis doit se montrer ami, et il y a tel ami plus attaché qu'un frère.", priere:"Apprends-moi à être une amie présente et fidèle aujourd'hui.", explication:"Pour avoir de vrais amis, il faut d'abord soi-même se montrer digne d'amitié et présent pour les autres." },
    { ref:"1 Samuel 18:1", texte:"L'âme de Jonathan s'attacha à l'âme de David, et Jonathan l'aima comme son âme.", priere:"Merci pour les amitiés profondes. Fortifie celles que je vis aujourd'hui.", explication:"Une amitié profonde, comme celle de David et Jonathan, se construit sur un attachement sincère, pas superficiel." },
    { ref:"Proverbes 27:6", texte:"Les blessures d'un ami prouvent sa fidélité, mais les baisers d'un ennemi sont trompeurs.", priere:"Aide-moi à accueillir la vérité venant d'une amie sincère, même quand elle dérange.", explication:"Une remarque honnête venant d'un ami sincère, même si elle dérange, vaut mieux qu'un compliment sans vérité." },
    { ref:"Romains 1:12", texte:"c'est-à-dire, que nous nous consolions mutuellement par la foi qui nous est commune, à vous et à moi.", priere:"Merci pour les amies avec qui je peux partager ma foi et être encouragée.", explication:"Partager sa foi avec des amis proches devient une source mutuelle d'encouragement et de consolation." }
  ], joursAlt:[
    { ref:"Proverbes 12:26", texte:"Le juste montre à son ami la bonne voie, mais la voie des méchants les égare.", priere:"Aide-moi à montrer le bon chemin à mes amies, avec douceur.", explication:"Un véritable ami oriente vers ce qui est juste, plutôt que de simplement approuver tout ce que l'on fait." },
    { ref:"Proverbes 16:28", texte:"L'homme pervers excite des querelles, et le rapporteur divise les amis.", priere:"Garde-moi de semer la division parmi mes amies, Seigneur.", explication:"Les paroles rapportées avec malveillance peuvent briser des amitiés qui semblaient solides." },
    { ref:"Ecclésiaste 4:12", texte:"Si quelqu'un est plus fort qu'un seul, les deux peuvent lui résister ; et la corde à trois fils ne se rompt pas facilement.", priere:"Merci pour la force que je trouve en étant bien entourée.", explication:"Être entouré rend plus résistant face aux difficultés — seul, on est plus vulnérable." },
    { ref:"Jean 15:15", texte:"Je ne vous appelle plus serviteurs... mais je vous ai appelés amis, parce que je vous ai fait connaître tout ce que j'ai appris de mon Père.", priere:"Merci de m'appeler ton amie, Seigneur, pas seulement ta servante.", explication:"Jésus élève ses disciples au rang d'amis, en partageant avec eux ce qu'il connaît du Père." },
    { ref:"Proverbes 13:20", texte:"Celui qui fréquente les sages devient sage, mais celui qui se plaît avec les insensés s'en trouve mal.", priere:"Aide-moi à choisir des fréquentations qui me rendent meilleure.", explication:"Les fréquentations choisies influencent réellement le caractère, en bien comme en mal." },
    { ref:"Romains 12:15", texte:"Réjouissez-vous avec ceux qui se réjouissent ; pleurez avec ceux qui pleurent.", priere:"Aide-moi à me réjouir et à pleurer avec mes amies, selon ce qu'elles vivent.", explication:"Partager les joies et les peines de ses amies fait partie du soutien mutuel véritable." },
    { ref:"Proverbes 11:14", texte:"...le salut est dans le grand nombre des conseillers.", priere:"Merci pour les bons conseils que tu m'envoies à travers mes amies.", explication:"De bons conseillers autour de soi augmentent les chances de prendre de bonnes décisions." }
  ]},
  { id:'relations-sociales', titre:"Les relations sociales", jours:[
    { ref:"Romains 12:18", texte:"S'il est possible, autant que cela dépend de vous, soyez en paix avec tous les hommes.", priere:"Aide-moi à rechercher la paix dans mes relations aujourd'hui.", explication:"Rechercher la paix avec les autres est une responsabilité qui dépend d'abord de notre propre attitude." },
    { ref:"Romains 12:10", texte:"Par amour fraternel, soyez pleins d'affection les uns pour les autres ; par honneur, usez de prévenances réciproques.", priere:"Donne-moi un cœur attentif et honorant envers les autres aujourd'hui.", explication:"L'affection sincère et l'honneur mutuel donnent aux relations une qualité qui dépasse la simple politesse." },
    { ref:"Colossiens 3:13", texte:"Supportez-vous les uns les autres, et, si l'un a sujet de se plaindre de l'autre, pardonnez-vous réciproquement. De même que Christ vous a pardonné, pardonnez-vous aussi.", priere:"Seigneur, aide-moi à pardonner comme tu m'as pardonnée.", explication:"Pardonner comme Christ a pardonné reste le fondement le plus solide pour préserver des relations abîmées." },
    { ref:"Proverbes 27:9", texte:"L'huile et les parfums réjouissent le cœur, et les conseils affectueux d'un ami sont doux.", priere:"Merci pour les bons conseils reçus. Rends-moi aussi source d'encouragement pour les autres.", explication:"Un bon conseil donné avec affection réjouit le cœur autant qu'un parfum agréable." },
    { ref:"Hébreux 10:24-25", texte:"Veillons les uns sur les autres, pour nous exciter à la charité et aux bonnes œuvres. N'abandonnons pas notre assemblée, comme c'est la coutume de quelques-uns ; mais exhortons-nous réciproquement.", priere:"Aide-moi à rester connectée à une communauté qui m'encourage dans la foi.", explication:"Rester connecté à une communauté qui encourage protège de l'isolement spirituel et humain." },
    { ref:"1 Pierre 4:9", texte:"Exercez l'hospitalité les uns envers les autres, sans murmures.", priere:"Donne-moi un cœur accueillant envers les autres aujourd'hui, sans arrière-pensée.", explication:"L'hospitalité offerte sans arrière-pensée ni murmure reflète un cœur généreux, pas contraint." },
    { ref:"Galates 6:2", texte:"Portez les fardeaux les uns des autres, et vous accomplirez ainsi la loi de Christ.", priere:"Aide-moi à porter le fardeau de quelqu'un aujourd'hui, avec amour.", explication:"Porter les fardeaux les uns des autres traduit concrètement la loi d'amour de Christ dans les relations quotidiennes." }
  ], joursAlt:[
    { ref:"Matthieu 5:9", texte:"Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !", priere:"Aide-moi à être une actrice de paix aujourd'hui, dans mes relations.", explication:"Être un artisan de paix, et pas seulement l'accepter, est ce qui identifie un enfant de Dieu." },
    { ref:"Proverbes 15:1", texte:"Une réponse douce calme la fureur, mais une parole dure excite la colère.", priere:"Donne-moi une parole douce plutôt que dure aujourd'hui.", explication:"Le ton employé dans une réponse peut désamorcer ou au contraire enflammer un conflit." },
    { ref:"Jacques 1:19", texte:"que tout homme soit prompt à écouter, lent à parler, lent à se mettre en colère.", priere:"Aide-moi à écouter davantage et à parler moins vite.", explication:"Écouter avant de parler évite bien des tensions inutiles dans les relations." },
    { ref:"Romains 15:7", texte:"Accueillez-vous donc les uns les autres, comme Christ vous a accueillis, pour la gloire de Dieu.", priere:"Aide-moi à accueillir les autres comme tu m'as accueillie.", explication:"Accueillir les autres à l'image de l'accueil reçu de Christ élève la qualité des relations." },
    { ref:"Philippiens 2:3", texte:"Ne faites rien par esprit de parti ou par vaine gloire, mais que l'humilité vous fasse regarder les autres comme étant au-dessus de vous-mêmes.", priere:"Donne-moi un cœur humble envers les autres aujourd'hui.", explication:"Considérer les autres avec humilité change la dynamique de toute relation sociale." },
    { ref:"Proverbes 25:17", texte:"Mets rarement le pied dans la maison de ton prochain, de peur qu'il ne soit rassasié de toi et ne te haïsse.", priere:"Apprends-moi la juste mesure dans mes relations, Seigneur.", explication:"Même les bonnes relations ont besoin d'espace pour rester saines et équilibrées." },
    { ref:"Marc 12:31", texte:"Voici le second : Tu aimeras ton prochain comme toi-même. Il n'y a pas d'autre commandement plus grand que ceux-là.", priere:"Aide-moi à aimer mon prochain comme moi-même aujourd'hui.", explication:"Aimer son prochain comme soi-même reste, selon Jésus, l'un des commandements les plus importants." }
  ]},
  { id:'relations-sexuelles', titre:"Les relations conjugales", jours:[
    { ref:"Hébreux 13:4", texte:"Le mariage est honorable en tous, et le lit conjugal sans souillure, car Dieu jugera les impudiques et les adultères.", priere:"Seigneur, aide-moi à honorer ce que tu as institué comme saint.", explication:"Le mariage et l'intimité conjugale sont présentés par Dieu comme honorables, pas comme un sujet à minimiser ou à cacher." },
    { ref:"Cantique des Cantiques 8:6", texte:"Mets-moi comme un sceau sur ton cœur, comme un sceau sur ton bras ; car l'amour est fort comme la mort, la jalousie est inflexible comme le séjour des morts ; ses ardeurs sont des ardeurs de feu, une flamme de l'Éternel.", priere:"Merci pour la force et la beauté de l'amour que tu as créé.", explication:"L'amour conjugal décrit ici est intense et durable, comparé à une flamme que rien ne peut éteindre facilement." },
    { ref:"Genèse 2:24", texte:"C'est pourquoi l'homme quittera son père et sa mère, et s'attachera à sa femme, et ils deviendront une seule chair.", priere:"Seigneur, fortifie l'union et l'intimité dans mon couple.", explication:"L'union entre mari et femme est voulue par Dieu dès la création, comme un attachement profond et exclusif." },
    { ref:"1 Corinthiens 7:3", texte:"Que le mari rende à sa femme l'affection qui lui est due, et que la femme agisse de même envers son mari.", priere:"Seigneur, aide-nous à nous donner l'un à l'autre avec amour et attention.", explication:"Dans le couple, l'attention à l'autre doit être mutuelle, sans déséquilibre d'un côté ou de l'autre." },
    { ref:"1 Thessaloniciens 4:3-4", texte:"Ce que Dieu veut, c'est votre sanctification ; c'est que vous vous absteniez de l'impudicité ; c'est que chacun de vous sache posséder son corps avec sainteté et honnêteté.", priere:"Seigneur, garde mon cœur et mon corps dans la sainteté que tu désires pour moi.", explication:"La sainteté voulue par Dieu pour le corps concerne aussi la vie intime, vécue avec honnêteté et respect." },
    { ref:"Proverbes 18:22", texte:"Celui qui trouve une femme trouve le bonheur ; c'est une grâce qu'il obtient de l'Éternel.", priere:"Merci Seigneur pour la grâce du mariage et de l'union que tu bénis.", explication:"Trouver un conjoint est présenté comme une grâce reçue de Dieu, pas seulement le fruit du hasard." },
    { ref:"Colossiens 3:14", texte:"Mais par-dessus toutes ces choses revêtez-vous de la charité, qui est le lien de la perfection.", priere:"Que l'amour reste le lien qui unit mon couple, par-dessus tout le reste.", explication:"Au-dessus de tout le reste, c'est l'amour qui garde l'union du couple solide et complète." }
  ], joursAlt:[
    { ref:"1 Corinthiens 7:4", texte:"La femme n'a pas autorité sur son propre corps, mais c'est le mari ; et pareillement, le mari n'a pas autorité sur son propre corps, mais c'est la femme.", priere:"Aide-nous à nous donner l'un à l'autre avec amour et respect.", explication:"L'intimité conjugale implique une considération mutuelle, ni domination ni négligence d'un côté." },
    { ref:"Proverbes 5:18", texte:"Que ta source soit bénie, et fais ta joie de la femme de ta jeunesse.", priere:"Merci pour la joie et la bénédiction de l'union conjugale.", explication:"Trouver sa joie dans son conjoint est présenté positivement, pas comme un sujet à éviter." },
    { ref:"Marc 10:9", texte:"Que l'homme ne sépare donc pas ce que Dieu a joint.", priere:"Garde notre union, Seigneur, unie et fidèle.", explication:"L'union voulue par Dieu dans le mariage n'est pas destinée à être brisée facilement." },
    { ref:"Éphésiens 5:33", texte:"que chacun de vous aime sa femme comme lui-même, et que la femme respecte son mari.", priere:"Aide-nous à nous aimer et à nous respecter mutuellement.", explication:"L'amour et le respect mutuels forment la base solide d'une relation conjugale durable." },
    { ref:"1 Pierre 3:7", texte:"Maris, montrez à votre tour de la sagesse dans vos rapports avec vos femmes ; honorez-les.", priere:"Donne-nous la sagesse pour honorer notre relation, Seigneur.", explication:"Traiter son conjoint avec honneur et sagesse fait partie de l'appel à vivre le mariage selon Dieu." },
    { ref:"Cantique des Cantiques 4:9", texte:"Tu me ravis le cœur, ma sœur, ma fiancée, tu me ravis le cœur par l'un de tes regards.", priere:"Merci pour la beauté de l'amour que tu as créé dans le couple.", explication:"La beauté et l'attirance dans le couple sont célébrées, pas cachées, dans les Écritures." },
    { ref:"1 Thessaloniciens 4:7", texte:"Car Dieu ne nous a pas appelés à l'impureté, mais à la sanctification.", priere:"Garde notre couple dans la sanctification que tu désires.", explication:"La sainteté voulue par Dieu concerne aussi la vie intime, vécue avec engagement et fidélité." }
  ]},
  { id:'famille', titre:"La famille", jours:[
    { ref:"Josué 24:15", texte:"quant à moi et à ma maison, nous servirons l'Éternel.", priere:"Seigneur, je choisis aujourd'hui de servir avec ma famille.", explication:"Choisir de servir Dieu en famille est une décision à assumer, pas seulement un souhait individuel." },
    { ref:"Psaume 127:1", texte:"Si l'Éternel ne bâtit la maison, ceux qui la bâtissent travaillent en vain.", priere:"Bâtis toi-même ma maison, Seigneur, je te confie ma famille.", explication:"Une maison construite sans que Dieu y participe reste fragile, quels que soient les efforts fournis." },
    { ref:"Éphésiens 5:25", texte:"Maris, aimez vos femmes, comme Christ a aimé l'Église, et s'est livré lui-même pour elle.", priere:"Seigneur, que l'amour dans ma famille reflète le tien.", explication:"L'amour attendu dans le couple se mesure au don total que Christ a fait pour l'Église." },
    { ref:"Éphésiens 6:1-3", texte:"Enfants, obéissez à vos parents, selon le Seigneur, car cela est juste. Honore ton père et ta mère... afin que tu sois heureux et que tu vives longtemps sur la terre.", priere:"Merci pour tes promesses sur ma famille. Aide-nous à nous honorer les uns les autres.", explication:"Honorer ses parents porte une promesse concrète de bien-être, pas seulement un devoir moral." },
    { ref:"Proverbes 24:3-4", texte:"C'est par la sagesse qu'une maison s'élève, et par l'intelligence qu'elle s'affermit ; c'est par la science que les chambres se remplissent de tous les biens précieux et agréables.", priere:"Donne-moi la sagesse pour bâtir un foyer stable et paisible.", explication:"La sagesse et l'intelligence, pas seulement les moyens matériels, sont ce qui bâtit vraiment un foyer stable." },
    { ref:"Genèse 18:19", texte:"Car je l'ai choisi, afin qu'il ordonne à ses fils et à sa maison après lui de garder la voie de l'Éternel, en pratiquant la droiture et la justice.", priere:"Seigneur, aide-moi à transmettre ta voie à ma famille par mon exemple.", explication:"Transmettre le chemin de Dieu à sa famille par l'exemple compte parmi les responsabilités les plus importantes." },
    { ref:"1 Timothée 5:8", texte:"Si quelqu'un n'a pas soin des siens, et principalement de ceux de sa famille, il a renié la foi, et il est pire qu'un infidèle.", priere:"Donne-moi le cœur pour prendre soin des miens avec fidélité.", explication:"Prendre soin des siens est présenté comme une expression concrète et non négociable de la foi." }
  ], joursAlt:[
    { ref:"Malachie 4:6", texte:"Il ramènera le cœur des pères à leurs enfants, et le cœur des enfants à leurs pères.", priere:"Réconcilie les cœurs dans ma famille, Seigneur, les uns vers les autres.", explication:"La réconciliation entre générations est une œuvre que Dieu promet d'accomplir dans les familles." },
    { ref:"Psaume 133:1", texte:"Voici, oh ! qu'il est agréable, qu'il est doux pour des frères de demeurer ensemble !", priere:"Merci pour la douceur de vivre unis en famille.", explication:"Vivre dans l'unité familiale est décrit comme une chose belle et agréable à vivre." },
    { ref:"Proverbes 15:20", texte:"Un fils sage fait la joie de son père, et un homme insensé méprise sa mère.", priere:"Que la sagesse guide mes enfants, pour la joie de notre famille.", explication:"Les choix de vie des enfants ont un impact direct sur la joie ou la peine des parents." },
    { ref:"Ruth 1:16", texte:"ton peuple sera mon peuple, et ton Dieu sera mon Dieu.", priere:"Aide-moi à m'attacher fidèlement à ceux que tu m'as donnés comme famille.", explication:"Un attachement loyal, même en dehors des liens du sang, peut refléter une vraie fidélité familiale." },
    { ref:"Éphésiens 3:15", texte:"le Père, duquel toute famille dans les cieux et sur la terre reçoit son nom.", priere:"Merci que toute famille tire son identité de toi, Père.", explication:"Toute famille, où qu'elle soit, trouve son origine et son identité dans le Père céleste." },
    { ref:"Proverbes 14:1", texte:"La femme sage bâtit sa maison, et la femme insensée la renverse de ses propres mains.", priere:"Aide-moi à bâtir ma maison avec sagesse, pas à la démolir.", explication:"Les décisions quotidiennes d'un parent peuvent bâtir ou fragiliser tout un foyer." },
    { ref:"Psaume 128:3", texte:"Ta femme est comme une vigne féconde dans l'intérieur de ta maison ; tes fils sont comme des plants d'olivier, autour de ta table.", priere:"Merci pour la fécondité et la joie que tu places dans mon foyer.", explication:"Une famille peut être décrite comme fructueuse et joyeuse, à l'image d'une vigne ou d'oliviers autour de la table." }
  ]},
  { id:'projets', titre:"Les projets", jours:[
    { ref:"Proverbes 16:3", texte:"Recommande à l'Éternel tes œuvres, et tes projets réussiront.", priere:"Seigneur, je te confie mes projets aujourd'hui.", explication:"Confier ses projets à Dieu avant de les lancer change la façon dont on avance vers leur réalisation." },
    { ref:"Proverbes 16:9", texte:"Le cœur de l'homme médite sa voie, mais c'est l'Éternel qui dirige ses pas.", priere:"Dirige mes pas, Seigneur, même quand je fais mes propres plans.", explication:"On peut planifier ses pas, mais c'est finalement Dieu qui en dirige le déroulement réel." },
    { ref:"Jacques 4:15", texte:"Vous devriez dire, au contraire : Si Dieu le veut, nous vivrons, et nous ferons ceci ou cela.", priere:"Que ta volonté guide mes projets, plus que mes envies.", explication:"Reconnaître la volonté de Dieu au-dessus de ses propres plans garde une juste humilité dans les projets." },
    { ref:"Psaume 20:4-5", texte:"Qu'il te donne ce que ton cœur désire, et qu'il accomplisse tous tes desseins !", priere:"Merci de t'intéresser à mes désirs. J'attends l'accomplissement de tes promesses.", explication:"Dieu s'intéresse réellement aux désirs profonds du cœur, pas seulement aux besoins essentiels." },
    { ref:"Proverbes 21:5", texte:"Les projets de l'homme diligent ne mènent qu'à l'abondance, mais celui qui agit avec précipitation n'arrive qu'à la disette.", priere:"Aide-moi à avancer dans mes projets avec constance, sans précipitation.", explication:"La constance et la diligence portent plus de fruit dans un projet que la précipitation." },
    { ref:"Proverbes 15:22", texte:"Les projets échouent, faute d'une assemblée qui délibère ; mais ils réussissent quand il y a de nombreux conseillers.", priere:"Seigneur, entoure-moi de bons conseils pour mes projets.", explication:"S'entourer de bons conseils augmente concrètement les chances de réussite d'un projet." },
    { ref:"Psaume 37:5", texte:"Recommande ton sort à l'Éternel, mets en lui ta confiance, et il agira.", priere:"Je te remets mes projets aujourd'hui, Seigneur, avec confiance.", explication:"Remettre son avenir entre les mains de Dieu, avec confiance, laisse la place à son action." }
  ], joursAlt:[
    { ref:"Ecclésiaste 3:1", texte:"Il y a un temps pour toute chose, et un temps pour toute chose sous les cieux.", priere:"Aide-moi à reconnaître le bon moment pour chaque chose, Seigneur.", explication:"Chaque projet a son propre temps : la patience de reconnaître ce moment évite bien des frustrations." },
    { ref:"Habacuc 2:3", texte:"Si elle tarde, attends-la, car elle s'accomplira, elle s'accomplira certainement.", priere:"Merci que tes promesses s'accompliront, même si elles tardent.", explication:"Un projet qui tarde à se réaliser n'est pas nécessairement un projet abandonné par Dieu." },
    { ref:"Proverbes 3:5", texte:"Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.", priere:"Je me confie en toi de tout mon cœur pour mes projets.", explication:"Faire confiance à Dieu plutôt qu'à sa propre sagesse rend les chemins plus clairs, pas plus faciles." },
    { ref:"Éphésiens 3:20", texte:"à celui qui peut faire, par la puissance qui agit en nous, infiniment au-delà de tout ce que nous demandons ou pensons.", priere:"Merci de pouvoir faire infiniment plus que ce que je demande ou pense.", explication:"Dieu peut accomplir bien plus que ce qu'on ose lui demander ou même imaginer." },
    { ref:"Zacharie 4:10", texte:"Car ceux qui méprisaient le jour des faibles commencements se réjouiront.", priere:"Aide-moi à ne pas mépriser les petits commencements de mes projets.", explication:"Les débuts modestes d'un projet ne doivent pas être méprisés : ils annoncent souvent une suite plus grande." },
    { ref:"Proverbes 27:1", texte:"Ne te vante pas du lendemain, car tu ne sais pas ce qu'un jour peut enfanter.", priere:"Garde-moi de me vanter du lendemain, Seigneur.", explication:"L'avenir reste incertain ; s'appuyer sur Dieu plutôt que sur ses propres certitudes garde dans l'humilité." },
    { ref:"Colossiens 3:23", texte:"Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur et non pour des hommes.", priere:"Aide-moi à faire mon travail de bon cœur, comme pour toi.", explication:"Travailler avec sincérité, comme pour Dieu et non pour les hommes, change la motivation profonde d'un projet." }
  ]},
  { id:'finances', titre:"Les finances", jours:[
    { ref:"Malachie 3:10", texte:"Apportez à la maison du trésor toutes les dîmes, afin qu'il y ait de la nourriture dans ma maison ; mettez-moi de la sorte à l'épreuve, dit l'Éternel des armées. Et vous verrez si je n'ouvre pas pour vous les écluses des cieux, si je ne répands pas sur vous la bénédiction en abondance.", priere:"Seigneur, aide-moi à être fidèle dans ce que tu me confies.", explication:"Dieu invite à le mettre à l'épreuve dans la fidélité financière, avec la promesse d'une bénédiction en retour." },
    { ref:"Philippiens 4:19", texte:"Et mon Dieu pourvoira à tous vos besoins selon sa richesse, avec gloire, en Jésus-Christ.", priere:"Merci de pourvoir à mes besoins. J'ai confiance en ta provision.", explication:"La provision de Dieu pour nos besoins ne dépend pas de nos moyens, mais de ses richesses en Christ." },
    { ref:"Proverbes 3:9-10", texte:"Honore l'Éternel avec tes biens, et avec les prémices de tout ton revenu : alors tes greniers seront remplis d'abondance, et tes cuves regorgeront de moût.", priere:"Aide-moi à t'honorer dans ma façon de gérer ce que je reçois.", explication:"Honorer Dieu avec ce que l'on reçoit en premier reflète une confiance qui précède l'abondance, pas qui la suit." },
    { ref:"Deutéronome 8:18", texte:"Souviens-toi de l'Éternel, ton Dieu, car c'est lui qui te donnera de la force pour les acquérir.", priere:"Merci Seigneur, c'est toi la source de tout ce que j'ai.", explication:"Se souvenir que Dieu est la source de toute capacité à générer des ressources garde d'un cœur orgueilleux." },
    { ref:"Luc 6:38", texte:"Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde ; car on vous mesurera avec la mesure dont vous vous serez servis.", priere:"Apprends-moi à donner avec un cœur généreux et confiant.", explication:"Donner généreusement attire en retour une mesure généreuse — le principe fonctionne dans les deux sens." },
    { ref:"Proverbes 13:11", texte:"La richesse mal acquise diminue, mais celui qui amasse peu à peu l'augmente.", priere:"Donne-moi la patience de bâtir petit à petit, honnêtement.", explication:"Une richesse construite patiemment et honnêtement dure plus longtemps qu'une richesse acquise trop vite." },
    { ref:"2 Corinthiens 9:7", texte:"Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie.", priere:"Seigneur, donne-moi un cœur joyeux quand je donne.", explication:"Le cœur avec lequel on donne compte autant que le montant donné : Dieu aime un don joyeux." }
  ], joursAlt:[
    { ref:"Proverbes 22:7", texte:"Le riche domine sur les pauvres, et celui qui emprunte est l'esclave de celui qui prête.", priere:"Garde-moi de l'esclavage de la dette, Seigneur.", explication:"L'endettement crée une forme de dépendance qu'il vaut mieux éviter quand c'est possible." },
    { ref:"1 Timothée 6:10", texte:"Car l'amour de l'argent est une racine de tous les maux.", priere:"Protège mon cœur de l'amour de l'argent.", explication:"Ce n'est pas l'argent en lui-même qui pose problème, mais l'amour excessif qu'on peut lui porter." },
    { ref:"Matthieu 6:33", texte:"Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.", priere:"Aide-moi à chercher ton royaume avant tout le reste.", explication:"Chercher Dieu en premier renverse l'ordre naturel des priorités concernant les besoins matériels." },
    { ref:"Proverbes 11:24", texte:"Tel, qui donne libéralement, devient plus riche ; et tel, qui épargne à l'excès, ne fait que s'appauvrir.", priere:"Apprends-moi à donner avec générosité plutôt qu'à retenir avec excès.", explication:"La générosité, contrairement à l'intuition, peut enrichir plutôt qu'appauvrir sur la durée." },
    { ref:"Hébreux 13:5", texte:"Ne vous livrez pas à l'amour de l'argent ; contentez-vous de ce que vous avez ; car Dieu lui-même a dit : Je ne te délaisserai point.", priere:"Merci de ne jamais m'abandonner, quelle que soit ma situation financière.", explication:"La présence constante de Dieu reste la vraie sécurité, plus fiable que n'importe quelle richesse." },
    { ref:"Proverbes 21:20", texte:"De précieux trésors et de l'huile sont dans la demeure du sage ; mais l'homme insensé les engloutit.", priere:"Donne-moi la sagesse pour gérer ce que j'ai avec discernement.", explication:"La sagesse dans la gestion des ressources fait la différence entre l'abondance et le gaspillage." },
    { ref:"2 Corinthiens 8:12", texte:"La bonne volonté, quand elle existe, est agréable en raison de ce qu'elle peut avoir, et non de ce qu'elle n'a pas.", priere:"Merci d'accepter ma bonne volonté, même quand mes moyens sont limités.", explication:"Dieu regarde la sincérité du cœur qui donne, pas seulement le montant offert." }
  ]},
  { id:'plan-de-dieu', titre:"Le plan de Dieu", jours:[
    { ref:"Psaume 138:8", texte:"L'Éternel agira en ma faveur. Éternel, ta bonté dure toujours : n'abandonne pas les œuvres de tes mains.", priere:"Merci de ne pas abandonner ce que tu as commencé en moi.", explication:"Dieu ne délaisse pas ce qu'il a commencé à faire dans une vie — il continue jusqu'à l'achèvement." },
    { ref:"Ésaïe 46:10", texte:"J'annonce dès le commencement ce qui doit arriver, et longtemps d'avance ce qui n'est pas encore accompli ; je dis : Mes arrêts subsisteront, et j'exécuterai toute ma volonté.", priere:"Merci que ton dessein s'accomplira, quoi qu'il arrive.", explication:"Ce que Dieu a décidé s'accomplit, même quand cela semble annoncé longtemps à l'avance et encore invisible." },
    { ref:"Ésaïe 55:8-9", texte:"Car mes pensées ne sont pas vos pensées, et vos voies ne sont pas mes voies, dit l'Éternel. Autant les cieux sont élevés au-dessus de la terre, autant mes voies sont élevées au-dessus de vos voies, et mes pensées au-dessus de vos pensées.", priere:"Seigneur, aide-moi à faire confiance à tes voies même quand elles dépassent les miennes.", explication:"Les pensées et les voies de Dieu dépassent souvent notre propre logique, ce qui demande une confiance plus grande que la compréhension." },
    { ref:"Proverbes 19:21", texte:"Il y a dans le cœur de l'homme beaucoup de projets, mais c'est le dessein de l'Éternel qui s'accomplit.", priere:"Que ton dessein s'accomplisse dans ma vie, au-delà de mes propres plans.", explication:"Malgré tous les projets que l'on peut imaginer, c'est finalement le dessein de Dieu qui se réalise." },
    { ref:"Éphésiens 2:10", texte:"Car nous sommes son ouvrage, ayant été créés en Jésus-Christ pour de bonnes œuvres, que Dieu a préparées d'avance, afin que nous les pratiquions.", priere:"Merci d'avoir préparé d'avance de bonnes œuvres pour moi. Montre-les-moi aujourd'hui.", explication:"Chaque personne a été créée avec de bonnes œuvres déjà préparées d'avance par Dieu pour elle." },
    { ref:"Actes 17:26", texte:"Il a fait que tous les hommes, sortis d'un seul sang, habitassent sur toute la surface de la terre, ayant déterminé la durée des temps et les bornes de leur demeure.", priere:"Merci d'avoir fixé d'avance mes temps et mes limites, Seigneur.", explication:"Dieu a fixé d'avance les temps et les circonstances de chaque vie, jusque dans leurs détails." },
    { ref:"Psaume 33:11", texte:"Les desseins de l'Éternel subsistent à toujours, et les projets de son cœur, de génération en génération.", priere:"Merci que ton dessein tient bon, au-delà de ma propre génération.", explication:"Le dessein de Dieu ne dépend pas d'une génération : il traverse le temps sans jamais s'effondrer." }
  ], joursAlt:[
    { ref:"Jérémie 29:11", texte:"Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", priere:"Merci pour les projets de paix et d'espérance que tu as pour moi.", explication:"Les projets de Dieu pour une vie sont fondamentalement bienveillants, orientés vers l'espérance, pas le malheur." },
    { ref:"Philippiens 1:6", texte:"Je suis persuadé que celui qui a commencé en vous cette bonne œuvre la rendra parfaite pour le jour de Jésus-Christ.", priere:"Merci de rendre parfaite l'œuvre que tu as commencée en moi.", explication:"Dieu ne laisse pas une œuvre commencée inachevée : il s'engage à la mener à son terme." },
    { ref:"Ésaïe 14:24", texte:"L'Éternel des armées l'a juré, en disant : Ce que j'ai décidé arrivera, ce que j'ai résolu s'accomplira.", priere:"Merci que ce que tu as décidé pour ma vie s'accomplira.", explication:"Ce que Dieu a décidé se réalise, indépendamment des obstacles qui semblent s'y opposer." },
    { ref:"Actes 2:23", texte:"livré selon le dessein arrêté et selon la prescience de Dieu.", priere:"Aide-moi à faire confiance à ton dessein, même quand je ne le comprends pas.", explication:"Le dessein de Dieu peut inclure des événements difficiles à comprendre sur le moment, mais jamais hors de son contrôle." },
    { ref:"Job 42:2", texte:"Je reconnais que tu peux tout, et que rien ne s'oppose à tes pensées.", priere:"Merci que rien ne peut s'opposer à tes plans, Seigneur.", explication:"Reconnaître que rien n'est impossible à Dieu recentre la confiance face à l'incertitude." },
    { ref:"Psaume 57:2", texte:"Je crie au Dieu Très-Haut, au Dieu qui agit en ma faveur.", priere:"Je crie vers toi, Seigneur, sachant que tu agis en ma faveur.", explication:"Crier vers Dieu dans la difficulté reste une démarche de foi, pas un aveu de faiblesse." },
    { ref:"Éphésiens 1:11", texte:"ayant été prédestinés suivant la résolution de celui qui opère toutes choses d'après le conseil de sa volonté.", priere:"Merci d'opérer toutes choses selon le conseil de ta volonté.", explication:"Le plan de Dieu s'accomplit selon sa propre volonté, pas selon les circonstances apparentes." }
  ]},
  { id:'voix-de-dieu', titre:"La voix de Dieu", jours:[
    { ref:"Jean 10:27", texte:"Mes brebis entendent ma voix ; je les connais, et elles me suivent.", priere:"Seigneur, rends mon oreille attentive à ta voix aujourd'hui.", explication:"Reconnaître la voix de Dieu demande une relation suivie avec lui, comme une brebis reconnaît son berger." },
    { ref:"1 Rois 19:12", texte:"Et après le tremblement de terre, un feu : l'Éternel n'était pas dans le feu. Et après le feu, un bruit doux et léger.", priere:"Aide-moi à te reconnaître dans le calme, pas seulement dans l'extraordinaire.", explication:"Dieu ne se manifeste pas toujours dans le spectaculaire : parfois, c'est dans un calme profond qu'il se fait entendre." },
    { ref:"Ésaïe 30:21", texte:"Tes oreilles entendront derrière toi la voix qui dira : Voici le chemin, marchez-y ! lorsque vous irez à droite ou que vous irez à gauche.", priere:"Guide-moi aujourd'hui, Seigneur, dans les décisions à prendre.", explication:"La direction de Dieu peut se recevoir clairement au moment même de choisir entre deux chemins." },
    { ref:"Habacuc 2:1", texte:"J'étais à mon poste, et je me tenais sur la tour ; et je veillais, pour voir ce que l'Éternel me dirait, et ce que je répliquerais après ma plainte.", priere:"Apprends-moi à me tenir à l'écoute, patiemment, jusqu'à ta réponse.", explication:"Se tenir à l'écoute, avec patience, jusqu'à ce que Dieu réponde, fait partie de l'attitude d'un cœur attentif." },
    { ref:"Jean 16:13", texte:"Quand le consolateur sera venu, l'Esprit de vérité, il vous conduira dans toute la vérité ; car il ne parlera pas de lui-même, mais il dira tout ce qu'il aura entendu, et il vous annoncera les choses à venir.", priere:"Merci pour ton Esprit qui me conduit dans la vérité. Guide-moi aujourd'hui.", explication:"L'Esprit ne parle pas de lui-même : il transmet fidèlement ce qu'il reçoit, pour conduire dans la vérité." },
    { ref:"Jean 8:47", texte:"Celui qui est de Dieu, écoute les paroles de Dieu ; vous n'écoutez pas, parce que vous n'êtes pas de Dieu.", priere:"Seigneur, rends mon cœur disposé à t'écouter aujourd'hui.", explication:"Être disposé à écouter Dieu est une condition du cœur, pas seulement une capacité auditive." },
    { ref:"Apocalypse 3:20", texte:"Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui, et lui avec moi.", priere:"J'ouvre la porte aujourd'hui, Seigneur. Viens.", explication:"Dieu se tient à la porte et attend une réponse : il ne s'impose jamais de force." }
  ], joursAlt:[
    { ref:"Ésaïe 6:8", texte:"J'entendis la voix du Seigneur, disant : Qui enverrai-je, et qui marchera pour nous ? Je répondis : Me voici, envoie-moi.", priere:"Me voici, Seigneur, envoie-moi là où tu veux aujourd'hui.", explication:"Répondre me voici à l'appel de Dieu demande une disponibilité active, pas seulement une écoute passive." },
    { ref:"1 Samuel 3:9", texte:"si l'on t'appelle, tu diras : Parle, Éternel, car ton serviteur écoute.", priere:"Parle, Seigneur, car ton serviteur écoute.", explication:"La formule simple parle, car ton serviteur écoute reste une posture d'ouverture toujours valable aujourd'hui." },
    { ref:"Psaume 32:8", texte:"Je t'instruirai et te montrerai la voie que tu dois suivre ; je te conseillerai, j'aurai le regard sur toi.", priere:"Merci de m'instruire et de me conseiller sur le chemin à suivre.", explication:"Dieu promet personnellement d'instruire et de conseiller ceux qui cherchent sa direction." },
    { ref:"Apocalypse 2:7", texte:"Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises.", priere:"Ouvre mes oreilles pour entendre ce que ton Esprit dit aujourd'hui.", explication:"Avoir des oreilles ne suffit pas : il faut choisir d'être réellement attentif à ce que Dieu dit." },
    { ref:"Marc 4:9", texte:"Que celui qui a des oreilles pour entendre entende.", priere:"Aide-moi à prêter attention à ta voix, sans la laisser passer inaperçue.", explication:"Dieu parle de multiples façons, mais on peut facilement passer à côté si l'on n'y prend pas garde." },
    { ref:"Job 33:14", texte:"Dieu parle, cependant, tantôt d'une manière, tantôt d'une autre, et l'on n'y prend pas garde.", priere:"Rends-moi attentive aux différentes façons dont tu peux me parler.", explication:"Cultiver l'attention quotidienne à la voix de Dieu porte, avec le temps, un vrai bonheur intérieur." },
    { ref:"Proverbes 8:34", texte:"Heureux l'homme qui m'écoute, qui veille chaque jour à mes portes, et qui en garde les poteaux !", priere:"Aide-moi à veiller chaque jour pour t'écouter, Seigneur.", explication:"La persévérance à chercher Dieu chaque jour porte du fruit dans la capacité à reconnaître sa voix." }
  ]},
  { id:'foi', titre:"La foi", jours:[
    { ref:"Hébreux 11:1", texte:"Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.", priere:"Seigneur, augmente ma foi pour espérer ce que je ne vois pas encore.", explication:"La foi permet de tenir fermement à ce qu'on espère, même sans preuve visible immédiate." },
    { ref:"Marc 9:23", texte:"Jésus lui dit : Si tu peux !... Tout est possible à celui qui croit.", priere:"Je crois, Seigneur ; viens au secours de mon manque de foi.", explication:"Jésus ne demande pas une foi parfaite, mais une foi sincère, même mêlée de doute, pour agir." },
    { ref:"Galates 2:20", texte:"si je vis maintenant dans la chair, je vis dans la foi au Fils de Dieu, qui m'a aimé et qui s'est livré lui-même pour moi.", priere:"Merci Jésus de vivre en moi par la foi aujourd'hui.", explication:"Vivre par la foi signifie laisser Christ vivre à travers soi, plutôt que de compter sur ses propres forces." },
    { ref:"Matthieu 17:20", texte:"si vous aviez de la foi comme un grain de sénevé, vous diriez à cette montagne : Transporte-toi d'ici là, et elle se transporterait ; rien ne vous serait impossible.", priere:"Seigneur, fais grandir ma foi, même petite comme un grain de sénevé.", explication:"La taille de la foi importe moins que sa sincérité : même petite, elle peut déplacer l'impossible." },
    { ref:"2 Corinthiens 5:7", texte:"car nous marchons par la foi et non par la vue.", priere:"Aide-moi à marcher par la foi aujourd'hui, même sans tout voir.", explication:"Marcher par la foi signifie avancer en faisant confiance à Dieu, même quand on ne voit pas encore le résultat." },
    { ref:"Jacques 1:6", texte:"Mais qu'il la demande avec foi, sans douter ; car celui qui doute est semblable au flot de la mer, agité et poussé par le vent.", priere:"Seigneur, ôte le doute de mon cœur quand je te demande quelque chose.", explication:"Douter fragilise la prière ; une foi stable, elle, reste ancrée malgré les circonstances changeantes." },
    { ref:"Éphésiens 2:8", texte:"Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.", priere:"Merci pour ce don gratuit de la grâce, reçu par la foi seule.", explication:"Le salut par la foi retire toute base à l'orgueil : c'est un don, pas une performance à atteindre." }
  ], joursAlt:[
    { ref:"Romains 1:17", texte:"ainsi qu'il est écrit : Le juste vivra par la foi.", priere:"Seigneur, apprends-moi à vivre chaque jour par la foi, pas par la peur.", explication:"Toute la vie chrétienne repose sur ce principe simple : c'est par la foi, et non par nos propres efforts, que l'on tient debout devant Dieu." },
    { ref:"Luc 17:5", texte:"Les apôtres dirent au Seigneur : Augmente-nous la foi.", priere:"Augmente ma foi aujourd'hui, Seigneur, comme les apôtres te l'ont demandé.", explication:"Demander à Dieu d'augmenter sa foi est une prière légitime, pas un aveu de faiblesse." },
    { ref:"1 Pierre 1:7", texte:"afin que l'épreuve de votre foi, plus précieuse que l'or périssable, ait pour résultat la louange, la gloire et l'honneur, lorsque Jésus-Christ apparaîtra.", priere:"Merci que même les épreuves affinent ma foi, comme l'or au feu.", explication:"Les épreuves ne détruisent pas la foi authentique : elles la purifient, comme le feu purifie l'or." },
    { ref:"Jean 20:29", texte:"Jésus lui dit : Parce que tu m'as vu, tu as cru. Heureux ceux qui n'ont pas vu, et qui ont cru !", priere:"Seigneur, aide-moi à croire sans avoir tout vu.", explication:"Croire sans avoir vu est justement la foi que Jésus déclare bénie, plus que la foi qui exige des preuves." },
    { ref:"1 Jean 5:4", texte:"car tout ce qui est né de Dieu triomphe du monde ; et la victoire qui triomphe du monde, c'est notre foi.", priere:"Merci que ma foi en toi a déjà remporté la victoire.", explication:"La victoire sur les difficultés du monde ne vient pas de la force personnelle, mais de la foi placée en Dieu." },
    { ref:"Matthieu 21:22", texte:"Tout ce que vous demanderez avec foi par la prière, vous le recevrez.", priere:"Seigneur, je te présente ma demande aujourd'hui avec foi.", explication:"Une prière portée par la foi, et non par le doute, est celle qui reçoit une réponse." },
    { ref:"Hébreux 11:6", texte:"Or sans la foi il est impossible de lui être agréable ; car il faut que celui qui s'approche de Dieu croie que Dieu existe, et qu'il est le rémunérateur de ceux qui le cherchent.", priere:"Aide-moi à m'approcher de toi en croyant que tu es là et que tu réponds.", explication:"Croire que Dieu existe et qu'il répond à ceux qui le cherchent est la porte d'entrée de toute relation avec lui." }
  ]},
];

/* Une icône par thème, pour la grille de présentation. */
const PLAN_ICONS = {
  'parole':'🗣️', 'jeune':'🌙', 'amour':'❤️', 'priere':'🙏', 'saint-esprit':'🔥',
  'marcher-jesus':'👣', 'tentation':'🛡️', 'reves':'💭', 'forteresses':'⚔️',
  'connaitre-dieu':'📖', 'education-enfants':'👶', 'guerison-coeur':'💚',
  'amis':'🤝', 'relations-sociales':'👥', 'relations-sexuelles':'💍',
  'famille':'🏠', 'projets':'🎯', 'finances':'💰', 'plan-de-dieu':'🧭', 'voix-de-dieu':'👂', 'foi':'✨'
};

/* Grille d'icônes (comme une appli de plans de lecture) avec jauge de
   progression par plan. Touche une tuile pour ouvrir le plan en plein
   écran, jour après jour. */
/* Le cycle actif d'un plan : 'main' (les 7 versets d'origine) ou 'alt'
   (un deuxième jeu de 7 versets différents, pour recommencer avec du
   nouveau une fois le plan terminé). */
function activeJours(plan){
  const cycle = (state.thematicCycle && state.thematicCycle[plan.id]) || 'main';
  return (cycle === 'alt' && plan.joursAlt) ? plan.joursAlt : plan.jours;
}
function renderThematicPlans(){
  const el = document.getElementById('plansGrid');
  if(!el) return;
  if(!state.thematicProgress) state.thematicProgress = {};
  el.innerHTML = THEMATIC_PLANS.map(plan=>{
    const jours = activeJours(plan);
    const done = state.thematicProgress[plan.id] || [];
    const nbDone = done.filter(Boolean).length;
    const total = jours.length;
    const pct = Math.round((nbDone/total)*100);
    const icon = PLAN_ICONS[plan.id] || '📜';
    const fini = pct === 100;
    return '<div class="plan-tile'+(fini?' plan-tile-done':'')+'" onclick="openPlanReader(\''+plan.id+'\')">'
      + (fini ? '<div class="plan-tile-badge">✅ Terminé</div>' : '')
      + '<div class="plan-tile-icon">'+icon+'</div>'
      + '<div class="plan-tile-title">'+plan.titre+'</div>'
      + '<div class="plan-tile-bar"><div class="plan-tile-bar-fill" style="width:'+pct+'%"></div></div>'
      + '<div class="plan-tile-pct">'+nbDone+'/'+total+' · '+pct+'%</div>'
      + (fini ? '<div class="plan-tile-restart-row">'
          + '<button class="plan-tile-restart" onclick="event.stopPropagation(); restartPlan(\''+plan.id+'\',\'main\')">🔁 Mêmes versets</button>'
          + '<button class="plan-tile-restart" onclick="event.stopPropagation(); restartPlan(\''+plan.id+'\',\'alt\')">🆕 Nouveaux versets</button>'
        + '</div>' : '')
      + '</div>';
  }).join('');
}

/* Remet un plan à zéro pour le refaire depuis le début, avec soit les
   mêmes versets, soit un deuxième jeu de versets différents (cycle='alt'). */
function restartPlan(planId, cycle){
  if(!state.thematicProgress) state.thematicProgress = {};
  if(!state.thematicCycle) state.thematicCycle = {};
  state.thematicProgress[planId] = [];
  state.thematicCycle[planId] = (cycle === 'alt') ? 'alt' : 'main';
  persist();
  renderThematicPlans();
}

/* =========================================================================
   LECTEUR PLEIN ÉCRAN D'UN PLAN — un verset (+ prière) par écran, on
   avance/recule en glissant à gauche/à droite (ou avec les flèches).
   ========================================================================= */
let readerPlanId = null;
let readerDayIndex = 0;

function openPlanReader(planId){
  const plan = THEMATIC_PLANS.find(p=>p.id===planId);
  if(!plan) return;
  readerPlanId = planId;
  if(!state.thematicProgress) state.thematicProgress = {};
  const jours = activeJours(plan);
  const done = state.thematicProgress[planId] || [];
  const firstUnfinished = jours.findIndex((_,i)=>!done[i]);
  readerDayIndex = firstUnfinished === -1 ? 0 : firstUnfinished;
  document.getElementById('readerTitle').textContent = plan.titre;
  hideReaderDayBanner();
  renderReaderDay();
  document.getElementById('planReader').classList.add('open');
}
function closePlanReader(){
  document.getElementById('planReader').classList.remove('open');
  hideReaderDayBanner();
  renderThematicPlans();
}
/* Lien temporel : une fois qu'on a marqué un jour comme fait, il faut
   attendre le lendemain (date du calendrier) pour pouvoir lire le jour
   suivant de CE plan. Les jours déjà faits restent toujours consultables
   en arrière. On mémorise juste la date du dernier jour terminé par plan. */
function isPlanLockedToday(planId){
  return !!(state.thematicLastReadDate && state.thematicLastReadDate[planId] === todayStr());
}
function renderReaderDay(){
  const plan = THEMATIC_PLANS.find(p=>p.id===readerPlanId);
  if(!plan) return;
  const jours = activeJours(plan);
  const total = jours.length;
  readerDayIndex = Math.max(0, Math.min(readerDayIndex, total-1));
  const jour = jours[readerDayIndex];
  const done = (state.thematicProgress && state.thematicProgress[readerPlanId]) || [];
  const isDone = !!done[readerDayIndex];
  const locked = !isDone && isPlanLockedToday(readerPlanId);

  document.getElementById('readerDay').textContent = 'Jour ' + (readerDayIndex+1) + ' / ' + total;

  const lockedEl = document.getElementById('readerLocked');
  const normalEls = [
    document.getElementById('readerRef'), document.getElementById('readerText'),
    document.getElementById('readerExplication'), document.getElementById('readerPrayer'),
    document.getElementById('readerVersions')
  ];
  if(locked){
    normalEls.forEach(el=>{ if(el) el.style.display = 'none'; });
    if(lockedEl) lockedEl.hidden = false;
  } else {
    normalEls.forEach(el=>{ if(el) el.style.display = ''; });
    if(lockedEl) lockedEl.hidden = true;

    document.getElementById('readerRef').textContent = jour.ref;
    document.getElementById('readerText').textContent = '« ' + jour.texte + ' »';
    const explEl = document.getElementById('readerExplication');
    if(explEl) explEl.textContent = jour.explication ? ('💡 ' + jour.explication) : '';
    document.getElementById('readerPrayer').textContent = '🙏 ' + jour.priere;

    const versionsEl = document.getElementById('readerVersions');
    if(versionsEl){
      const links = verseVersionLinks(jour.ref);
      versionsEl.innerHTML = links.map(l=>'<a href="'+l.url+'" target="_blank" rel="noopener">'+l.label+'</a>').join('');
    }
  }

  const pct = Math.round(((readerDayIndex+1)/total)*100);
  document.getElementById('readerProgressFill').style.width = pct + '%';
  document.getElementById('readerProgressLabel').textContent = pct + '%';

  const doneBtn = document.getElementById('readerDoneBtn');
  if(locked){
    doneBtn.textContent = '⭐ Reviens demain';
    doneBtn.disabled = true;
    doneBtn.classList.remove('done');
  } else {
    doneBtn.disabled = false;
    doneBtn.textContent = isDone ? '✓ Jour fait' : 'Marquer ce jour comme fait';
    doneBtn.classList.toggle('done', isDone);
  }

  document.getElementById('readerPrevBtn').disabled = (readerDayIndex === 0);
  document.getElementById('readerNextBtn').disabled = (readerDayIndex === total-1) || locked;
}
function readerNext(){
  const plan = THEMATIC_PLANS.find(p=>p.id===readerPlanId);
  if(!plan) return;
  const total = activeJours(plan).length;
  if(isPlanLockedToday(readerPlanId)) return;
  if(readerDayIndex < total-1){ readerDayIndex++; renderReaderDay(); }
}
function readerPrev(){
  if(readerDayIndex > 0){ readerDayIndex--; renderReaderDay(); }
}
function showReaderDayBanner(dayNum){
  const banner = document.getElementById('readerDayBanner');
  const title = document.getElementById('readerDayBannerTitle');
  if(!banner) return;
  if(title) title.textContent = 'Félicitations, jour ' + dayNum + ' terminé !';
  banner.hidden = false;
}
function hideReaderDayBanner(){
  const banner = document.getElementById('readerDayBanner');
  if(banner) banner.hidden = true;
}
function readerToggleDone(){
  if(!readerPlanId) return;
  if(!state.thematicProgress) state.thematicProgress = {};
  if(!state.thematicProgress[readerPlanId]) state.thematicProgress[readerPlanId] = [];
  const plan = THEMATIC_PLANS.find(p=>p.id===readerPlanId);
  const total = plan ? activeJours(plan).length : 0;
  const wasDone = !!state.thematicProgress[readerPlanId][readerDayIndex];
  const dayJustFinished = plan && !wasDone; // true = on vient de marquer ce jour comme fait (pas un "démarquer")
  state.thematicProgress[readerPlanId][readerDayIndex] = !wasDone;
  const nowAllDone = plan && activeJours(plan).every((_,i)=> !!state.thematicProgress[readerPlanId][i]);
  const justFinishedLastDay = dayJustFinished && readerDayIndex === total-1 && nowAllDone;
  if(justFinishedLastDay){
    // Historique des complétions : gardé même après un "Recommencer", pour
    // pouvoir dire par exemple qu'un plan a été fait deux fois.
    if(!state.thematicCompletions) state.thematicCompletions = {};
    state.thematicCompletions[readerPlanId] = (state.thematicCompletions[readerPlanId]||0) + 1;
  }
  if(dayJustFinished && !justFinishedLastDay){
    if(!state.thematicLastReadDate) state.thematicLastReadDate = {};
    state.thematicLastReadDate[readerPlanId] = todayStr();
  }
  persist();
  renderReaderDay();
  if(justFinishedLastDay){
    const doneBtn = document.getElementById('readerDoneBtn');
    if(doneBtn) doneBtn.textContent = '🎉 Plan terminé ! Retour à la liste...';
    setTimeout(()=>{ closePlanReader(); }, 1200);
  } else if(dayJustFinished){
    showReaderDayBanner(readerDayIndex + 1);
    setTimeout(()=>{ hideReaderDayBanner(); closePlanReader(); }, 2200);
  }
}

/* Balayage tactile gauche/droite + flèches du clavier (pratique sur ordi).
   Le script est chargé en fin de page, donc #readerBody existe déjà : pas
   besoin d'attendre DOMContentLoaded (qui serait déjà passé). */
(function(){
  let touchStartX = null;
  const readerBodyEl = document.getElementById('readerBody');
  if(readerBodyEl){
    readerBodyEl.addEventListener('touchstart', e=>{ touchStartX = e.touches[0].clientX; }, {passive:true});
    readerBodyEl.addEventListener('touchend', e=>{
      if(touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if(dx < -40) readerNext();
      else if(dx > 40) readerPrev();
      touchStartX = null;
    }, {passive:true});
  }
})();
document.addEventListener('keydown', e=>{
  const reader = document.getElementById('planReader');
  if(!reader || !reader.classList.contains('open')) return;
  if(e.key === 'ArrowRight') readerNext();
  if(e.key === 'ArrowLeft') readerPrev();
  if(e.key === 'Escape') closePlanReader();
});

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>{ p.hidden = (p.id !== 'page-'+id); });
  document.querySelectorAll('.side-menu button').forEach(b=>{
    b.classList.toggle('active', b.dataset.page === id);
  });
  if(id === 'journal-comprehension' || id === 'prieres') refreshVerseSelects();
  if(id === 'rapports') renderRapportPreview();
  if(id === 'plans') renderThematicPlans();
  if(id === 'parametres') updateNotifUI();
  if(id === 'en-groupe') afficherVueListeGroupes();
  if(id === 'admin'){ renderAvisAdmin(); renderUsersAdmin(); renderSuggestionsAdmin(); }
  if(id === 'vision-board') renderVisionBoard();
  updateMusicBarVisibility();
  closeMenu();
  window.scrollTo(0,0);
}
/* Sous-onglets de la page Paramètres : "Réglage général" et "Sécurité",
   attachés à Paramètres mais séparés l'un de l'autre (pas mélangés). */
function showParamSubtab(name){
  document.querySelectorAll('.param-subtab').forEach(el=>{
    el.hidden = (el.id !== 'paramSubtab-' + name);
  });
  document.querySelectorAll('.subtab-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.subtab === name);
  });
}
function toggleMenu(){
  document.getElementById('sideMenu').classList.toggle('open');
  document.getElementById('menuOverlay').classList.toggle('show');
}
function closeMenu(){
  document.getElementById('sideMenu').classList.remove('open');
  document.getElementById('menuOverlay').classList.remove('show');
}

/* Glisser du bord gauche de l'écran vers la droite, n'importe où dans
   l'appli, pour ouvrir le menu — comme le geste "retour" de beaucoup
   d'applis. Exclu volontairement sur les cartes de groupe, qui ont déjà
   leur propre glissement (vers la gauche) pour les supprimer. */
(function(){
  const SEUIL_BORD = 24;
  const SEUIL_DISTANCE = 60;
  let depart = null;
  document.addEventListener('touchstart', (e)=>{
    if(e.target.closest('.groupe-carte-wrap')){ depart = null; return; }
    const t = e.touches[0];
    depart = (t.clientX <= SEUIL_BORD) ? { x: t.clientX, y: t.clientY } : null;
  }, { passive:true });
  document.addEventListener('touchend', (e)=>{
    if(!depart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - depart.x;
    const dy = t.clientY - depart.y;
    depart = null;
    if(dx > SEUIL_DISTANCE && Math.abs(dy) < 60){
      const menu = document.getElementById('sideMenu');
      if(menu && !menu.classList.contains('open')) toggleMenu();
    }
  }, { passive:true });
})();

/* =========================================================================
   RAPPORT — un résumé lisible, affiché directement dans l'appli (pas
   seulement au moment d'imprimer), pour que ce soit concret à l'écran.
   ========================================================================= */
/* =========================================================================
   GRAPHIQUES DU RAPPORT — dessinés à la main en SVG/HTML (pas de librairie
   externe à télécharger), pour rester léger et fonctionner hors connexion.
   ========================================================================= */

/* Chapitres lus par livre, dans l'ordre du plan de lecture (uniquement les
   livres déjà commencés, pour rester lisible). */
function renderBooksBarChart(){
  const rows = planOrder.map(b=> ({ livre:b, lu: chaptersReadCount(b), total: chapters[b] })).filter(r=> r.lu > 0);
  if(!rows.length){
    return '<div class="empty">Aucun chapitre enregistré pour l\'instant.</div>';
  }
  return '<div class="chapbar-list">' + rows.map(r=>{
    const pct = Math.min(100, Math.round((r.lu/r.total)*100));
    return '<div class="chapbar-row">'
      + '<div class="chapbar-label">'+r.livre+'</div>'
      + '<div class="chapbar-track"><div class="chapbar-fill" style="width:'+pct+'%"></div></div>'
      + '<div class="chapbar-value">'+r.lu+'/'+r.total+'</div>'
      + '</div>';
  }).join('') + '</div>';
}

/* Petits utilitaires géométriques pour dessiner un vrai camembert (secteurs
   pleins, pas un anneau) en SVG, sans librairie externe. */
function polarToCartesian(cx, cy, r, angleDeg){
  const rad = (angleDeg - 90) * Math.PI / 180; // 0° = midi, sens horaire
  return { x: cx + r*Math.cos(rad), y: cy + r*Math.sin(rad) };
}
function pieSlicePath(cx, cy, r, startAngle, endAngle){
  if(endAngle - startAngle >= 359.99){
    // Un secteur qui couvre tout le cercle : un cercle plein dessiné en
    // deux demi-arcs (un seul arc de 360° ne se dessine pas correctement).
    const p1 = polarToCartesian(cx, cy, r, startAngle);
    const pMid = polarToCartesian(cx, cy, r, startAngle+180);
    return 'M '+p1.x+' '+p1.y+' A '+r+' '+r+' 0 1 1 '+pMid.x+' '+pMid.y+' A '+r+' '+r+' 0 1 1 '+p1.x+' '+p1.y+' Z';
  }
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
  return 'M '+cx+' '+cy+' L '+start.x.toFixed(2)+' '+start.y.toFixed(2)
    + ' A '+r+' '+r+' 0 '+largeArc+' 1 '+end.x.toFixed(2)+' '+end.y.toFixed(2)+' Z';
}

/* Répartition synthétique des 21 plans thématiques — Terminés / En cours /
   Non commencés — en vrai camembert (secteurs pleins, mêmes couleurs fixes
   que les cases Taux / Ch. restants / Pages rest. de l'accueil), avec une
   légende compacte. Plus de liste plan par plan ici (déjà visible dans
   l'onglet Plans thématiques) : juste le total des fois où un plan a été
   complété, quand c'est plus d'une fois. */
function renderPlansPie(plansProgress){
  const total = plansProgress.length || 1;
  const termines = plansProgress.filter(p=>p.pct===100).length;
  const enCours = plansProgress.filter(p=>p.pct>0 && p.pct<100).length;
  const nonCommences = total - termines - enCours;
  const segments = [
    { label:'Terminés', value: termines, color:'var(--kpi-taux)' },
    { label:'En cours', value: enCours, color:'var(--kpi-rest)' },
    { label:'Non commencés', value: nonCommences, color:'var(--kpi-pages)' }
  ];
  const r = 58, cx = 64, cy = 64;
  let angle = 0;
  const slices = segments.filter(s=> s.value > 0).map(s=>{
    const sweep = (s.value/total) * 360;
    const path = pieSlicePath(cx, cy, r, angle, angle + sweep);
    angle += sweep;
    return '<path d="'+path+'" fill="'+s.color+'"/>';
  }).join('');
  const legend = segments.map(s=>
    '<div><span class="dot" style="background:'+s.color+'"></span>'+s.label+' : <strong>'+s.value+'/'+total+'</strong></div>'
  ).join('');

  const repeats = Object.keys(state.thematicCompletions || {})
    .map(id=> ({ count: state.thematicCompletions[id], titre: (THEMATIC_PLANS.find(p=>p.id===id)||{}).titre }))
    .filter(r=> r.titre && r.count > 1);
  const repeatsHtml = repeats.length
    ? '<div class="plans-repeats">' + repeats.map(r=> '<span class="plan-repeat-badge">🔁 '+r.titre+' × '+r.count+'</span>').join('') + '</div>'
    : '';

  return '<div class="plans-donut-wrap">'
    + '<svg viewBox="0 0 128 128" style="width:128px; height:128px; flex-shrink:0;">'+slices+'</svg>'
    + '<div class="plans-donut-legend">'+legend+'</div>'
    + '</div>'
    + repeatsHtml;
}

function renderRapportPreview(){
  const el = document.getElementById('rapportPreview');
  if(!el) return;
  const lus = totalRead();
  const taux = ((lus/TOTAL_CHAPTERS)*100).toFixed(2);
  const pos = currentPosition();
  const posTxt = pos.nbTermines + " livre" + (pos.nbTermines>1?"s":"") + " sur " + pos.total;
  const totalPages = Math.round((lus/TOTAL_CHAPTERS)*1200);
  const livresLus = pos.nbTermines;

  const plansProgress = THEMATIC_PLANS.map(plan=>{
    const done = (state.thematicProgress && state.thematicProgress[plan.id]) || [];
    const nbDone = done.filter(Boolean).length;
    const total = activeJours(plan).length;
    const pct = Math.round((nbDone/total)*100);
    return { titre: plan.titre, nbDone, total, pct };
  });

  const booksBarChart = renderBooksBarChart();
  const plansPie = renderPlansPie(plansProgress);

  el.innerHTML = `
    <div class="card">
      <h2>Résumé de progression</h2>
      <div class="detail" style="margin-top:0;">Taux : <strong>${taux}%</strong> · Position actuelle : <strong>${posTxt}</strong></div>
    </div>
    <div class="card">
      <h2>📊 En chiffres</h2>
      <div class="stats-grid">
        <div class="stat-tile"><div class="stat-tile-value">${lus}</div><div class="stat-tile-label">Chapitres lus au total</div></div>
        <div class="stat-tile"><div class="stat-tile-value">${totalPages}</div><div class="stat-tile-label">Pages lues au total (est.)</div></div>
        <div class="stat-tile"><div class="stat-tile-value">${livresLus}/66</div><div class="stat-tile-label">Livres terminés</div></div>
      </div>
      <div class="donut-wrap"><svg id="donutRapport" width="130" height="130" viewBox="0 0 160 160"></svg></div>
    </div>
    <div class="card">
      <h2>📚 Chapitres lus par livre</h2>
      <details open>
        <summary>Voir / masquer le détail par livre</summary>
        <div style="margin-top:10px;">${booksBarChart}</div>
      </details>
    </div>
    <div class="card">
      <h2>🕊️ Plans thématiques</h2>
      ${plansPie}
    </div>
  `;
  drawDonut(lus/TOTAL_CHAPTERS, 'donutRapport');
}

function printReport(){
  renderRapportPreview();
  document.querySelectorAll('details').forEach(d=> d.open = true);
  window.print();
}

/* =========================================================================
   EN GROUPE — prier ou lire un livre à plusieurs, en direct.
   Ceci est un espace PARTAGÉ entre plusieurs comptes (contrairement au reste
   de l'appli qui n'appartient qu'à toi) : les données vivent dans des
   collections Firestore séparées ("groups"), pas dans ton document
   personnel "state". Ça ne fonctionne donc que connectée à internet.
   ========================================================================= */

// Une couleur différente par participant, dans l'ordre où ils rejoignent le
// groupe. Si plus de 8 personnes rejoignent, les couleurs se répètent.
const COULEURS_PARTICIPANTS = ['#B7975A','#2E6B5E','#4A5D7A','#A9812F','#7A4A6B','#3A6B4A','#6B4A22','#5A5A9E'];

let mesGroupes = [];
let mesGroupesUnsub = null;
let groupeActuel = null;
let groupeActuelUnsub = null;
let dernierNombreMembresConnu = null;
let sessionsActuelles = [];
let sessionsActuelUnsub = null;
let sessionActuelle = null;
let sessionActuelUnsub = null;
let echangesActuels = [];
let echangesActuelUnsub = null;
let codeRejoindreEnAttente = null;
let rechercheLivreTimer = null;

function echapperHtml(txt){
  return String(txt == null ? '' : txt)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function getMonNomGroupe(){
  if(state.settings && state.settings.nomAffichageGroupe) return state.settings.nomAffichageGroupe;
  if(currentUser && currentUser.email) return currentUser.email.split('@')[0];
  return 'Moi';
}
function setMonNomGroupe(v){
  if(!state.settings) state.settings = { palette:'dore', bg:'dore' };
  state.settings.nomAffichageGroupe = (v||'').trim();
  try{ persist(); }catch(e){ console.error('Erreur de sauvegarde (nom groupe) :', e); }
}

function prochaineCouleurDisponible(membres){
  const utilisees = (membres||[]).map(m=>m.couleur);
  const dispo = COULEURS_PARTICIPANTS.find(c=> !utilisees.includes(c));
  return dispo || COULEURS_PARTICIPANTS[(membres||[]).length % COULEURS_PARTICIPANTS.length];
}
function couleurDuMembre(uid){
  if(!groupeActuel || !groupeActuel.members) return 'var(--gold)';
  const m = groupeActuel.members.find(x=>x.uid === uid);
  return m ? m.couleur : 'var(--gold)';
}
function nomDuMembre(uid){
  if(!groupeActuel || !groupeActuel.members) return '?';
  const m = groupeActuel.members.find(x=>x.uid === uid);
  return m ? m.nom : '?';
}

/* --- Démarrage / arrêt (appelés depuis onAuthStateChanged) --- */
function initGroupes(user){
  if(document.getElementById('groupeMonNomInput')) document.getElementById('groupeMonNomInput').value = getMonNomGroupe();
  const sansCloud = document.getElementById('groupeSansCloud');
  const contenu = document.getElementById('groupeContenu');
  if(sansCloud) sansCloud.hidden = true;
  if(contenu) contenu.hidden = false;

  if(mesGroupesUnsub){ mesGroupesUnsub(); mesGroupesUnsub = null; }
  try{
    mesGroupesUnsub = firebase.firestore().collection('groups')
      .where('memberUids', 'array-contains', user.uid)
      .onSnapshot(snap=>{
        mesGroupes = snap.docs.map(d=> Object.assign({id:d.id}, d.data()));
        mesGroupes.sort((a,b)=> String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
        renderMesGroupes();
      }, err=> console.error('Erreur de lecture des groupes :', err));
  }catch(e){ console.error('Erreur au démarrage de "En groupe" :', e); }

  // Rejoindre automatiquement si on est arrivée via un lien d'invitation
  // (voir vérifierLienInvitationDansUrl(), appelée au chargement de la page).
  if(codeRejoindreEnAttente){
    const code = codeRejoindreEnAttente;
    codeRejoindreEnAttente = null;
    rejoindreGroupe(code);
  }
}
function arreterGroupes(){
  if(mesGroupesUnsub){ mesGroupesUnsub(); mesGroupesUnsub = null; }
  fermerGroupe();
  mesGroupes = [];
  const sansCloud = document.getElementById('groupeSansCloud');
  const contenu = document.getElementById('groupeContenu');
  if(sansCloud) sansCloud.hidden = false;
  if(contenu) contenu.hidden = true;
}

/* =========================================================================
   VISION BOARD — images perso + verset + date attendue, une par une.
   Nécessite le cloud (comme "En groupe") : stockage des images dans
   Firebase Storage, sous visionBoard/{uid}/{entryId}_{nomFichier}.
   ========================================================================= */
function demarrerVisionBoard(user){
  const sansCloud = document.getElementById('visionBoardSansCloud');
  const contenu = document.getElementById('visionBoardContenu');
  if(sansCloud) sansCloud.hidden = true;
  if(contenu) contenu.hidden = false;

  if(visionBoardUnsub){ visionBoardUnsub(); visionBoardUnsub = null; }
  try{
    visionBoardUnsub = firebase.firestore().collection('users').doc(user.uid)
      .collection('visionBoard')
      .onSnapshot(snap=>{
        visionBoardEntries = snap.docs.map(d=> Object.assign({id:d.id}, d.data()));
        visionBoardEntries.sort((a,b)=> String(a.dateAttendue||'9999').localeCompare(String(b.dateAttendue||'9999')));
        renderVisionBoard();
        renderVisionBoardPreview();
      }, err=> console.error('Erreur de lecture du Vision Board :', err));
  }catch(e){ console.error('Erreur au démarrage du Vision Board :', e); }
}
function arreterVisionBoard(){
  if(visionBoardUnsub){ visionBoardUnsub(); visionBoardUnsub = null; }
  visionBoardEntries = [];
  const sansCloud = document.getElementById('visionBoardSansCloud');
  const contenu = document.getElementById('visionBoardContenu');
  if(sansCloud) sansCloud.hidden = false;
  if(contenu) contenu.hidden = true;
  const preview = document.getElementById('visionBoardPreviewCard');
  if(preview) preview.style.display = 'none';
}

function vbDateClass(dateAttendue){
  if(!dateAttendue) return '';
  return (dateAttendue < todayStr()) ? 'passee' : '';
}
function vbDateLabel(dateAttendue){
  if(!dateAttendue) return '';
  const d = new Date(dateAttendue + 'T00:00:00');
  if(isNaN(d)) return dateAttendue;
  return d.toLocaleDateString('fr-FR', {day:'2-digit', month:'short', year:'numeric'});
}
function vbThumbHTML(entry){
  if(entry.contentType && entry.contentType.indexOf('pdf') !== -1){
    return '<div class="vb-entry-img" style="display:flex;align-items:center;justify-content:center;font-size:2rem;">📄</div>';
  }
  return '<img class="vb-entry-img" src="'+ (entry.imageUrl||'') +'" alt="">';
}

function renderVisionBoard(){
  const liste = document.getElementById('visionBoardListe');
  if(!liste) return;
  if(!useCloud){ liste.innerHTML = ''; return; }
  if(!visionBoardEntries.length){
    liste.innerHTML = '<div class="card"><div class="empty">Rien pour l\'instant — ajoute ta première image ci-dessus.</div></div>';
    return;
  }
  liste.innerHTML = '<div class="card"><h2>🌟 Mon Vision Board</h2><div class="vb-grid">'
    + visionBoardEntries.map(e=>{
        return '<div class="vb-entry">'
          + '<span class="del" onclick="supprimerVisionBoard(\''+e.id+'\')">✕</span>'
          + vbThumbHTML(e)
          + '<div class="vb-entry-body">'
          + '<div class="vb-entry-titre">'+ echapperHtml(e.titre||'') +'</div>'
          + (e.verset ? '<div class="vb-entry-verset">'+ echapperHtml(e.verset) +'</div>' : '')
          + (e.dateAttendue ? '<div class="vb-entry-date '+vbDateClass(e.dateAttendue)+'">📅 '+vbDateLabel(e.dateAttendue)+'</div>' : '')
          + '</div></div>';
      }).join('')
    + '</div></div>';
}

function renderVisionBoardPreview(){
  const card = document.getElementById('visionBoardPreviewCard');
  const preview = document.getElementById('visionBoardPreview');
  if(!card || !preview) return;
  if(!useCloud || !visionBoardEntries.length){
    card.style.display = 'none';
    return;
  }
  card.style.display = '';
  preview.innerHTML = '<div class="vb-preview-row">'
    + visionBoardEntries.slice(0,8).map(e=>{
        const thumb = (e.contentType && e.contentType.indexOf('pdf') !== -1)
          ? '<div style="width:64px;height:64px;border-radius:8px;border:1px solid #e5dcc0;display:flex;align-items:center;justify-content:center;font-size:1.6rem;background:var(--cream-alt);">📄</div>'
          : '<img src="'+(e.imageUrl||'')+'" alt="">';
        return '<div class="vb-preview-item" onclick="showPage(\'vision-board\')">'
          + thumb
          + (e.dateAttendue ? '<div class="vb-preview-date '+vbDateClass(e.dateAttendue)+'">'+vbDateLabel(e.dateAttendue)+'</div>' : '')
          + '</div>';
      }).join('')
    + '</div>';
}

function vbMsgAfficher(texte, estErreur){
  const msg = document.getElementById('vbMsg');
  if(!msg) return;
  msg.textContent = texte;
  msg.className = 'security-message' + (estErreur ? ' security-message-error' : '');
  msg.hidden = false;
  if(!estErreur) setTimeout(()=>{ msg.hidden = true; }, 4000);
}

const VB_MAX_PAR_PERSONNE = 30;

/* Réduit une photo côté téléphone avant l'envoi (comme WhatsApp) : on la
   redimensionne (jamais plus grand que 1600px sur le plus grand côté) et on
   la recompresse en JPEG qualité 75% — le poids est divisé par environ 5 à
   10 selon la photo d'origine, pour une qualité visuelle qui reste bonne à
   l'écran. Les PDF ne sont pas concernés (on ne peut pas les "compresser"
   de la même façon) : ils partent tels quels. En cas de souci (photo
   corrompue, navigateur qui bloque), on renvoie le fichier d'origine plutôt
   que de bloquer l'ajout. */
function compresserImageAvantEnvoi(file, maxDim, qualite){
  if(!file.type || file.type.indexOf('image/') !== 0){
    return Promise.resolve(file);
  }
  return new Promise(resolve=>{
    try{
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = ()=>{
        let w = img.width, h = img.height;
        if(w > maxDim || h > maxDim){
          if(w >= h){ h = Math.round(h * maxDim / w); w = maxDim; }
          else { w = Math.round(w * maxDim / h); h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        canvas.toBlob(blob=>{
          if(!blob){ resolve(file); return; }
          const nomCompresse = file.name.replace(/\.[^.]+$/, '') + '.jpg';
          resolve(new File([blob], nomCompresse, {type:'image/jpeg'}));
        }, 'image/jpeg', qualite);
      };
      img.onerror = ()=>{ URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
    }catch(e){ console.error('Compression image impossible :', e); resolve(file); }
  });
}

function ajouterVisionBoard(){
  if(!useCloud || !currentUser){ return; }
  const fileInput = document.getElementById('vbImageInput');
  const titreInput = document.getElementById('vbTitreInput');
  const verseInput = document.getElementById('vbVerseInput');
  const dateInput = document.getElementById('vbDateInput');
  const btn = document.getElementById('vbAjouterBtn');
  const file = fileInput && fileInput.files && fileInput.files[0];
  const titre = (titreInput.value||'').trim();
  const verset = (verseInput.value||'').trim();
  const dateAttendue = dateInput.value || '';

  if(visionBoardEntries.length >= VB_MAX_PAR_PERSONNE){
    vbMsgAfficher('Tu as atteint la limite de ' + VB_MAX_PAR_PERSONNE + ' éléments dans ton Vision Board. Supprimes-en un pour en ajouter un nouveau.', true);
    return;
  }
  if(!file){ vbMsgAfficher('Choisis une image ou un PDF avant d\'ajouter.', true); return; }
  if(!titre){ vbMsgAfficher('Donne un titre à cette image.', true); return; }
  if(file.size > 8*1024*1024){ vbMsgAfficher('Ce fichier est trop lourd (max 8 Mo).', true); return; }

  if(btn){ btn.disabled = true; btn.textContent = 'Ajout en cours…'; }

  const entryId = firebase.firestore().collection('users').doc(currentUser.uid).collection('visionBoard').doc().id;

  compresserImageAvantEnvoi(file, 1600, 0.75).then(fichierAEnvoyer=>{
    const cheminStockage = 'visionBoard/' + currentUser.uid + '/' + entryId + '_' + fichierAEnvoyer.name;
    const storageRef = firebase.storage().ref(cheminStockage);
    return storageRef.put(fichierAEnvoyer).then(snap=> snap.ref.getDownloadURL()).then(url=>{
      return firebase.firestore().collection('users').doc(currentUser.uid).collection('visionBoard').doc(entryId).set({
        titre, verset, dateAttendue,
        imageUrl: url,
        imagePath: cheminStockage,
        contentType: fichierAEnvoyer.type || '',
        createdAt: Date.now()
      });
    });
  }).then(()=>{
    fileInput.value = '';
    titreInput.value = '';
    verseInput.value = '';
    dateInput.value = '';
    vbMsgAfficher('Ajouté à ton Vision Board ✅', false);
  }).catch(e=>{
    console.error('Erreur d\'ajout au Vision Board :', e);
    vbMsgAfficher('Impossible d\'ajouter cette image pour le moment. Réessaie.', true);
  }).finally(()=>{
    if(btn){ btn.disabled = false; btn.textContent = '➕ Ajouter à mon Vision Board'; }
  });
}

function supprimerVisionBoard(entryId){
  if(!useCloud || !currentUser) return;
  if(!confirm('Supprimer cette image de ton Vision Board ?')) return;
  const entry = visionBoardEntries.find(e=> e.id === entryId);
  firebase.firestore().collection('users').doc(currentUser.uid).collection('visionBoard').doc(entryId).delete()
    .then(()=>{
      if(entry && entry.imagePath){
        firebase.storage().ref(entry.imagePath).delete().catch(()=>{});
      }
    })
    .catch(e=> console.error('Erreur de suppression Vision Board :', e));
}

/* --- Vue 1 : liste des groupes --- */
function afficherVueInterne(nom){
  ['groupeVueListe','groupeVueDetail','groupeVueSession'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.hidden = (id !== nom);
  });
}
function afficherVueListeGroupes(){
  fermerSession();
  fermerGroupe();
  afficherVueInterne('groupeVueListe');
  const nomInput = document.getElementById('groupeMonNomInput');
  if(nomInput) nomInput.value = getMonNomGroupe();
}
function ouvrirCreationGroupe(){
  document.getElementById('groupeRejoindreBox').hidden = true;
  document.getElementById('groupeCreationBox').hidden = false;
}
function ouvrirRejoindreGroupe(){
  document.getElementById('groupeCreationBox').hidden = true;
  document.getElementById('groupeRejoindreBox').hidden = false;
}
function renderMesGroupes(){
  const el = document.getElementById('groupesListe');
  if(!el) return;
  initGlisserPourSupprimer('groupesListe');
  if(!mesGroupes.length){
    el.innerHTML = '<div class="empty">Tu ne fais partie d\'aucun groupe pour l\'instant. Crées-en un, ou rejoins-en un avec un lien reçu.</div>';
    return;
  }
  el.innerHTML = mesGroupes.map(g=>{
    const puces = (g.members||[]).map(m=>
      '<span class="groupe-membre-chip"><span class="groupe-membre-dot" style="background:'+m.couleur+'"></span>'+echapperHtml(m.nom)+'</span>'
    ).join('');
    return '<div class="groupe-carte-wrap" data-group-id="'+g.id+'">'
      + '<div class="groupe-carte-supprimer-strip" onclick="confirmerSuppressionGroupe(\''+g.id+'\')">🗑️<br>Supprimer</div>'
      + '<div class="groupe-carte" onclick="ouvrirGroupeCarteClic(\''+g.id+'\')">'
      + '<button type="button" class="groupe-carte-menu-btn" onclick="event.stopPropagation(); toggleMenuGroupeCarte(\''+g.id+'\')">⋮</button>'
      + '<div class="groupe-carte-nom">'+echapperHtml(g.nom)+'</div>'
      + '<div class="groupe-membres">'+puces+'</div>'
      + '<div class="groupe-carte-menu" id="menuCarte-'+g.id+'" hidden>'
      + '<button type="button" onclick="event.stopPropagation(); confirmerSuppressionGroupe(\''+g.id+'\')">🗑️ Supprimer le groupe</button>'
      + '</div>'
      + '</div></div>';
  }).join('');
}

/* --- Menu "⋮" et glisser-à-gauche pour supprimer un groupe --- */
function toggleMenuGroupeCarte(id){
  document.querySelectorAll('.groupe-carte-menu').forEach(m=>{ if(m.id !== 'menuCarte-'+id) m.hidden = true; });
  const menu = document.getElementById('menuCarte-'+id);
  if(menu) menu.hidden = !menu.hidden;
}
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.groupe-carte-menu-btn') && !e.target.closest('.groupe-carte-menu')){
    document.querySelectorAll('.groupe-carte-menu').forEach(m=> m.hidden = true);
  }
});
function replierCarteGroupe(wrap){
  wrap.classList.remove('glissee');
  const carte = wrap.querySelector('.groupe-carte');
  if(carte) carte.style.transform = 'translateX(0)';
}
function ouvrirGroupeCarteClic(id){
  // Si la carte est actuellement glissée (bouton Supprimer visible), un tap
  // dessus la remet juste en place au lieu d'ouvrir le groupe.
  const wrap = document.querySelector('.groupe-carte-wrap[data-group-id="'+id+'"]');
  if(wrap && wrap.classList.contains('glissee')){ replierCarteGroupe(wrap); return; }
  ouvrirGroupeById(id);
}
function confirmerSuppressionGroupe(id){
  document.querySelectorAll('.groupe-carte-menu').forEach(m=> m.hidden = true);
  const g = mesGroupes.find(x=> x.id === id);
  const nom = g ? g.nom : 'ce groupe';
  if(!confirm('Supprimer définitivement le groupe « ' + nom + ' » et tout son historique ? Cette action est irréversible.')) return;
  supprimerGroupe(id);
}
function supprimerGroupe(id){
  firebase.firestore().collection('groups').doc(id).delete().then(()=>{
    if(groupeActuel && groupeActuel.id === id) afficherVueListeGroupes();
  }).catch(e=>{
    console.error(e);
    alert("Impossible de supprimer ce groupe pour l'instant (vérifie que tu es bien l'organisatrice, et ta connexion internet).");
  });
}
// Glisser à gauche sur une carte de groupe pour révéler "Supprimer" — mis en
// place UNE FOIS sur le conteneur (délégation tactile) : ça continue de
// marcher même quand la liste est régénérée à chaque mise à jour.
let swipeGroupeEnCours = null;
function initGlisserPourSupprimer(conteneurId){
  const conteneur = document.getElementById(conteneurId);
  if(!conteneur || conteneur.__swipeInit) return;
  conteneur.__swipeInit = true;
  conteneur.addEventListener('touchstart', (e)=>{
    const wrap = e.target.closest('.groupe-carte-wrap');
    if(!wrap){ swipeGroupeEnCours = null; return; }
    const t = e.touches[0];
    swipeGroupeEnCours = { wrap: wrap, startX: t.clientX, startY: t.clientY, dejaGlissee: wrap.classList.contains('glissee'), carte: wrap.querySelector('.groupe-carte') };
  }, { passive:true });
  conteneur.addEventListener('touchmove', (e)=>{
    if(!swipeGroupeEnCours) return;
    const t = e.touches[0];
    const dx = t.clientX - swipeGroupeEnCours.startX;
    const dy = t.clientY - swipeGroupeEnCours.startY;
    if(Math.abs(dy) > Math.abs(dx)) return; // défilement vertical : on n'interfère pas
    const base = swipeGroupeEnCours.dejaGlissee ? -92 : 0;
    const decalage = Math.max(-92, Math.min(0, base + dx));
    swipeGroupeEnCours.carte.style.transition = 'none';
    swipeGroupeEnCours.carte.style.transform = 'translateX(' + decalage + 'px)';
    swipeGroupeEnCours.dernierDecalage = decalage;
  }, { passive:true });
  conteneur.addEventListener('touchend', ()=>{
    if(!swipeGroupeEnCours) return;
    const { wrap, carte, dernierDecalage } = swipeGroupeEnCours;
    carte.style.transition = '';
    if((dernierDecalage||0) < -46){
      wrap.classList.add('glissee');
      carte.style.transform = 'translateX(-92px)';
    } else {
      wrap.classList.remove('glissee');
      carte.style.transform = 'translateX(0)';
    }
    swipeGroupeEnCours = null;
  });
}

function creerGroupe(){
  const nomInput = document.getElementById('groupeNouveauNom');
  const nom = (nomInput.value||'').trim();
  if(!nom){ alert('Donne un nom à ton groupe.'); return; }
  if(!currentUser){ return; }
  const ref = firebase.firestore().collection('groups').doc();
  const moi = { uid: currentUser.uid, nom: getMonNomGroupe(), couleur: COULEURS_PARTICIPANTS[0] };
  const donnees = {
    nom: nom,
    createdBy: currentUser.uid,
    createdAt: new Date().toISOString(),
    memberUids: [currentUser.uid],
    members: [moi]
  };
  ref.set(nettoyerPourFirestore(donnees)).then(()=>{
    nomInput.value = '';
    document.getElementById('groupeCreationBox').hidden = true;
    ouvrirGroupeById(ref.id);
    // Premier réflexe demandé : inviter des gens avant de choisir un thème.
    setTimeout(()=> ouvrirInviter(), 150);
  }).catch(e=>{ console.error(e); alert("Le groupe n'a pas pu être créé : vérifie ta connexion internet et réessaie."); });
}

function extraireCodeGroupe(texte){
  const t = (texte||'').trim();
  const m = t.match(/[?&]rejoindre=([a-zA-Z0-9_-]+)/);
  if(m) return m[1];
  return t;
}
function rejoindreParSaisie(){
  const input = document.getElementById('groupeCodeInput');
  const code = extraireCodeGroupe(input.value);
  const msg = document.getElementById('groupeRejoindreMsg');
  if(!code){ return; }
  msg.hidden = true;
  rejoindreGroupe(code, msg);
}
function rejoindreGroupe(groupId, msgEl){
  if(!currentUser) return;
  firebase.firestore().collection('groups').doc(groupId).get().then(doc=>{
    if(!doc.exists){
      if(msgEl){ msgEl.textContent = "Groupe introuvable — vérifie le lien ou le code reçu."; msgEl.className = 'security-message security-message-error'; msgEl.hidden = false; }
      showPage('en-groupe');
      return;
    }
    const data = doc.data();
    const dejaMembre = (data.memberUids||[]).includes(currentUser.uid);
    if(!dejaMembre){
      const couleur = prochaineCouleurDisponible(data.members);
      const moi = { uid: currentUser.uid, nom: getMonNomGroupe(), couleur: couleur };
      doc.ref.update({
        memberUids: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
        members: firebase.firestore.FieldValue.arrayUnion(moi)
      }).then(()=>{
        document.getElementById('groupeCodeInput').value = '';
        document.getElementById('groupeRejoindreBox').hidden = true;
        showPage('en-groupe');
        ouvrirGroupeById(groupId);
      }).catch(e=>{ console.error(e); if(msgEl){ msgEl.textContent = "Impossible de rejoindre pour l'instant, réessaie."; msgEl.className = 'security-message security-message-error'; msgEl.hidden = false; } });
    } else {
      showPage('en-groupe');
      ouvrirGroupeById(groupId);
    }
  }).catch(e=>{
    console.error(e);
    if(msgEl){ msgEl.textContent = "Impossible de vérifier ce groupe pour l'instant, réessaie."; msgEl.className = 'security-message security-message-error'; msgEl.hidden = false; }
  });
}

/* Lien d'invitation : au chargement de la page, si l'adresse contient
   "?rejoindre=CODE" (lien cliqué depuis un SMS/WhatsApp/mail), on retient
   le code et on rejoint automatiquement dès que la connexion est faite. */
function verifierLienInvitationDansUrl(){
  try{
    const params = new URLSearchParams(window.location.search);
    const code = params.get('rejoindre');
    if(code){
      codeRejoindreEnAttente = code;
      // On nettoie l'adresse pour ne pas retenter de rejoindre à chaque
      // rafraîchissement de la page.
      const url = new URL(window.location.href);
      url.searchParams.delete('rejoindre');
      window.history.replaceState({}, '', url.toString());
    }
  }catch(e){}
}

/* --- Vue 2 : détail d'un groupe --- */
function fermerGroupe(){
  if(groupeActuelUnsub){ groupeActuelUnsub(); groupeActuelUnsub = null; }
  if(sessionsActuelUnsub){ sessionsActuelUnsub(); sessionsActuelUnsub = null; }
  groupeActuel = null;
  dernierNombreMembresConnu = null;
  sessionsActuelles = [];
}
function ouvrirGroupeById(id){
  fermerSession();
  fermerGroupe();
  afficherVueInterne('groupeVueDetail');
  document.getElementById('groupeInviterBox').hidden = true;
  const select = document.getElementById('groupeTypeSelect');
  if(select) select.value = '';
  document.getElementById('groupeDemarrerBtn').hidden = true;
  document.getElementById('groupeRapportBox').hidden = true;

  groupeActuelUnsub = firebase.firestore().collection('groups').doc(id).onSnapshot(snap=>{
    if(!snap.exists){ afficherVueListeGroupes(); return; }
    const nouveau = Object.assign({id:snap.id}, snap.data());
    if(dernierNombreMembresConnu !== null && nouveau.members.length > dernierNombreMembresConnu){
      const dernier = nouveau.members[nouveau.members.length-1];
      const bandeau = document.getElementById('groupeDetailNom');
      if(bandeau){
        const note = document.createElement('div');
        note.className = 'security-message';
        note.style.color = 'var(--green)';
        note.textContent = '✅ ' + dernier.nom + ' vient de rejoindre le groupe !';
        bandeau.after(note);
        setTimeout(()=> note.remove(), 6000);
      }
    }
    dernierNombreMembresConnu = nouveau.members.length;
    groupeActuel = nouveau;
    renderGroupeDetail();
  }, err=> console.error('Erreur de lecture du groupe :', err));

  sessionsActuelUnsub = firebase.firestore().collection('groups').doc(id).collection('sessions').onSnapshot(snap=>{
    sessionsActuelles = snap.docs.map(d=> Object.assign({id:d.id}, d.data()));
    sessionsActuelles.sort((a,b)=> String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
    renderHistorique();
    if(sessionActuelle){
      const maj = sessionsActuelles.find(s=> s.id === sessionActuelle.id);
      if(maj) renderPresence(maj);
    }
  }, err=> console.error('Erreur de lecture des rencontres :', err));
}
function renderGroupeDetail(){
  if(!groupeActuel) return;
  document.getElementById('groupeDetailNom').textContent = groupeActuel.nom;
  const el = document.getElementById('groupeMembresListe');
  el.innerHTML = groupeActuel.members.map(m=>
    '<span class="groupe-membre-chip"><span class="groupe-membre-dot" style="background:'+m.couleur+'"></span>'+echapperHtml(m.nom)
    + (m.uid === groupeActuel.createdBy ? ' <span class="groupe-membre-statut">(organisateur)</span>' : '')
    + '</span>'
  ).join('');
  const lien = window.location.origin + window.location.pathname + '?rejoindre=' + groupeActuel.id;
  const lienInput = document.getElementById('groupeLienInvitation');
  if(lienInput) lienInput.value = lien;
}
function ouvrirInviter(){
  const box = document.getElementById('groupeInviterBox');
  box.hidden = !box.hidden;
}
function partagerLienInvitation(){
  const lien = document.getElementById('groupeLienInvitation').value;
  const texte = 'Rejoins mon groupe "'+ (groupeActuel? groupeActuel.nom : '') +'" sur mon appli de lecture : ' + lien;
  if(navigator.share){
    navigator.share({ title:'Invitation au groupe', text: texte, url: lien }).catch(()=>{});
  } else {
    copierLienInvitation();
  }
}
function copierLienInvitation(){
  const lien = document.getElementById('groupeLienInvitation').value;
  const msg = document.getElementById('groupeCopieMsg');
  const fini = ()=>{ if(msg){ msg.textContent = 'Lien copié !'; msg.className='security-message'; msg.hidden=false; setTimeout(()=> msg.hidden = true, 3000); } };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(lien).then(fini).catch(()=>{
      const input = document.getElementById('groupeLienInvitation'); input.select(); document.execCommand('copy'); fini();
    });
  } else {
    const input = document.getElementById('groupeLienInvitation'); input.select(); document.execCommand('copy'); fini();
  }
}

/* Partage général de l'appli (pas lié à un groupe précis) : depuis Paramètres,
   pour simplement faire découvrir l'appli à quelqu'un. */
function partagerAppli(){
  const lien = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
  const texte = "Découvre l'appli que j'utilise pour suivre ma lecture de la Bible : " + lien;
  if(navigator.share){
    navigator.share({ title:"Suivi de lecture biblique", text: texte, url: lien }).catch(()=>{});
    return;
  }
  const msg = document.getElementById('partageCopieMsg');
  const fini = ()=>{ if(msg){ msg.textContent = 'Lien copié ! Tu peux le coller dans un message.'; msg.hidden = false; setTimeout(()=> msg.hidden = true, 4000); } };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(lien).then(fini).catch(fini);
  } else {
    fini();
  }
}

function onGroupeTypeChange(){
  const v = document.getElementById('groupeTypeSelect').value;
  document.getElementById('groupeDemarrerBtn').hidden = !v;
}
function demarrerNouvelleRencontre(){
  const type = document.getElementById('groupeTypeSelect').value;
  if(!type || !groupeActuel || !currentUser) return;
  const base = {
    type: type,
    createdBy: currentUser.uid,
    createdAt: new Date().toISOString(),
    cloturee: false,
    clotureeAt: null,
    presence: {}
  };
  if(type === 'priere'){
    Object.assign(base, { qui:'', sujet:'', priereFaite:false });
  } else {
    Object.assign(base, { date: todayStr(), livre:'', livreKey:'', nombrePages:null, pageActuelle:0 });
  }
  firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').add(nettoyerPourFirestore(base)).then(ref=>{
    document.getElementById('groupeTypeSelect').value = '';
    document.getElementById('groupeDemarrerBtn').hidden = true;
    ouvrirSessionById(ref.id);
  }).catch(e=>{ console.error(e); alert("Impossible de démarrer la rencontre, vérifie ta connexion et réessaie."); });
}

function continuerLecture(sessionPrecedenteId){
  if(!groupeActuel) return;
  const prec = sessionsActuelles.find(s=> s.id === sessionPrecedenteId);
  if(!prec) return;
  const nouvelle = {
    type:'lecture', createdBy: currentUser.uid, createdAt: new Date().toISOString(),
    cloturee:false, clotureeAt:null, presence:{},
    date: todayStr(), livre: prec.livre, livreKey: prec.livreKey, nombrePages: prec.nombrePages,
    pageActuelle: prec.pageActuelle || 0
  };
  firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').add(nettoyerPourFirestore(nouvelle)).then(ref=>{
    ouvrirSessionById(ref.id);
  }).catch(e=> console.error(e));
}

function renderHistorique(){
  const el = document.getElementById('groupeHistorique');
  if(!el) return;
  if(!sessionsActuelles.length){
    el.innerHTML = '<div class="empty">Aucune rencontre pour l\'instant.</div>';
    return;
  }
  el.innerHTML = sessionsActuelles.map(s=>{
    let titre, detail;
    if(s.type === 'priere'){
      titre = '🙏 ' + (s.qui ? echapperHtml(s.qui) : 'Sujet de prière');
      detail = (s.date||s.createdAt||'').slice(0,10) + ' · ' + (s.priereFaite ? 'Prière faite' : (s.cloturee ? 'Terminée' : 'En cours'));
    } else {
      titre = '📖 ' + (s.livre ? echapperHtml(s.livre) : 'Lecture');
      const pages = s.nombrePages ? (' — page '+(s.pageActuelle||0)+'/'+s.nombrePages) : '';
      detail = (s.date||'') + pages + ' · ' + (s.cloturee ? 'Terminée' : 'En cours');
    }
    return '<div class="groupe-historique-item" onclick="ouvrirSessionById(\''+s.id+'\')">'
      + '<div class="groupe-historique-titre">'+titre+'</div>'
      + '<div class="groupe-historique-detail">'+detail+'</div>'
      + '</div>';
  }).join('');
}

/* --- Vue 3 : une rencontre (prière ou lecture) --- */
function fermerSession(){
  if(sessionActuelUnsub){ sessionActuelUnsub(); sessionActuelUnsub = null; }
  if(echangesActuelUnsub){ echangesActuelUnsub(); echangesActuelUnsub = null; }
  sessionActuelle = null;
  echangesActuels = [];
}
// Depuis l'intérieur d'une rencontre : revenir au détail du groupe (sans le
// quitter complètement, contrairement à afficherVueListeGroupes()).
function retourAuGroupe(){
  fermerSession();
  afficherVueInterne('groupeVueDetail');
}
function ouvrirSessionById(id){
  if(!groupeActuel) return;
  if(sessionActuelUnsub){ sessionActuelUnsub(); sessionActuelUnsub = null; }
  if(echangesActuelUnsub){ echangesActuelUnsub(); echangesActuelUnsub = null; }
  afficherVueInterne('groupeVueSession');
  const ref = firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').doc(id);
  sessionActuelUnsub = ref.onSnapshot(snap=>{
    if(!snap.exists) return;
    sessionActuelle = Object.assign({id:snap.id}, snap.data());
    renderSessionDetail();
  }, err=> console.error(err));
  echangesActuelUnsub = ref.collection('entries').onSnapshot(snap=>{
    echangesActuels = snap.docs.map(d=> Object.assign({id:d.id}, d.data()));
    echangesActuels.sort((a,b)=> String(a.horodatage||'').localeCompare(String(b.horodatage||'')));
    renderEchanges();
  }, err=> console.error(err));
}

// Ne remplace la valeur d'un champ QUE si ce n'est pas celui que la personne
// est en train de remplir — sinon, les mises à jour des autres participants
// effaceraient ce qu'on est en train de taper.
function majInputSiPasActif(el, valeur){
  if(!el) return;
  if(document.activeElement !== el){ el.value = (valeur == null ? '' : valeur); }
}
function majCheckboxSiPasActif(el, valeur){
  if(!el) return;
  if(document.activeElement !== el){ el.checked = !!valeur; }
}

function renderSessionDetail(){
  if(!sessionActuelle) return;
  const estLecture = sessionActuelle.type === 'lecture';
  document.getElementById('sessionPriereChamps').hidden = estLecture;
  document.getElementById('sessionLectureChamps').hidden = !estLecture;
  document.getElementById('sessionEchangesCard').hidden = !estLecture;
  document.getElementById('groupeSessionTitre').textContent = estLecture
    ? ('📖 ' + (sessionActuelle.livre || 'Lecture'))
    : ('🙏 ' + (sessionActuelle.qui ? 'Prière pour ' + sessionActuelle.qui : 'Sujet de prière'));
  document.getElementById('groupeSessionClotureeMsg').hidden = !sessionActuelle.cloturee;

  if(!estLecture){
    majInputSiPasActif(document.getElementById('sessionQuiInput'), sessionActuelle.qui);
    majInputSiPasActif(document.getElementById('sessionSujetInput'), sessionActuelle.sujet);
    majCheckboxSiPasActif(document.getElementById('sessionPriereFaiteCheckbox'), sessionActuelle.priereFaite);
  } else {
    majInputSiPasActif(document.getElementById('sessionDateInput'), sessionActuelle.date);
    majInputSiPasActif(document.getElementById('sessionLivreInput'), sessionActuelle.livre);
    majInputSiPasActif(document.getElementById('sessionPageActuelleInput'), sessionActuelle.pageActuelle);
    if(sessionActuelle.nombrePages){
      document.getElementById('sessionLivreTrouve').hidden = false;
      document.getElementById('sessionLivrePagesValeur').textContent = sessionActuelle.nombrePages;
      document.getElementById('sessionPagesManuelBox').hidden = true;
    } else if(sessionActuelle.livre) {
      document.getElementById('sessionLivreTrouve').hidden = true;
      document.getElementById('sessionPagesManuelBox').hidden = false;
    }
    majJaugeAffichage(sessionActuelle.pageActuelle||0, sessionActuelle.nombrePages);
  }

  // Champs en lecture seule une fois la rencontre clôturée.
  document.querySelectorAll('#sessionPriereChamps input, #sessionPriereChamps textarea, #sessionLectureChamps input').forEach(el=>{
    el.disabled = !!sessionActuelle.cloturee;
  });
  document.getElementById('sessionEchangeInput').disabled = !!sessionActuelle.cloturee;

  const btnCloture = document.getElementById('groupeClotureBtn');
  const btnContinuer = document.getElementById('groupeContinuerBtn');
  if(sessionActuelle.cloturee){
    btnCloture.hidden = true;
    btnContinuer.hidden = !estLecture;
  } else {
    btnCloture.hidden = false;
    btnContinuer.hidden = true;
  }

  renderPresence(sessionActuelle);
}

function ecrireChampSession(champ, valeur){
  if(!groupeActuel || !sessionActuelle) return;
  const v = (valeur === undefined) ? null : valeur;
  firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').doc(sessionActuelle.id)
    .update({ [champ]: v }).catch(e=> console.error('Erreur de sauvegarde de la rencontre :', e));
}
function majSessionChamp(champ, valeur){ ecrireChampSession(champ, valeur); }

function onSessionLivreInput(el){
  el.value = el.value.toUpperCase();
  ecrireChampSession('livre', el.value);
  document.getElementById('sessionLivreTrouve').hidden = true;
  document.getElementById('sessionPagesManuelBox').hidden = true;
  const titre = el.value.trim();
  clearTimeout(rechercheLivreTimer);
  if(!titre){ return; }
  document.getElementById('sessionLivreRecherche').hidden = false;
  rechercheLivreTimer = setTimeout(()=> chercherLivre(titre), 700);
}
// Réduit un titre à une clé stable (majuscules, sans accents, sans
// ponctuation) pour le retrouver même s'il est retapé un peu différemment.
function normaliserCleLivre(titre){
  return String(titre || '').toUpperCase().trim()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'LIVRE';
}
// 1) On regarde d'abord dans la mémoire commune de l'appli ("livresConnus") —
//    alimentée par TOUT LE MONDE qui a déjà indiqué le nombre de pages d'un
//    livre à la main. 2) Si le livre n'y est pas encore, on essaie la
//    bibliothèque publique Google Books (qui connaît bien les livres très
//    diffusés, mais souvent pas les livres chrétiens à tirage plus confidentiel).
//    3) Sinon, la case "indique le nombre de pages" s'affiche.
function chercherLivre(titre){
  const cle = normaliserCleLivre(titre);
  ecrireChampSession('livreKey', titre.toUpperCase());
  try{
    firebase.firestore().collection('livresConnus').doc(cle).get().then(doc=>{
      const data = doc.exists ? doc.data() : null;
      if(data && data.nombrePages){
        document.getElementById('sessionLivreRecherche').hidden = true;
        document.getElementById('sessionLivreTrouve').hidden = false;
        document.getElementById('sessionLivrePagesValeur').textContent = data.nombrePages;
        document.getElementById('sessionPagesManuelBox').hidden = true;
        ecrireChampSession('nombrePages', data.nombrePages);
      } else {
        rechercherLivreGoogleBooks(titre, cle);
      }
    }).catch(()=> rechercherLivreGoogleBooks(titre, cle));
  }catch(e){ rechercherLivreGoogleBooks(titre, cle); }
}
function rechercherLivreGoogleBooks(titre, cle){
  fetch('https://www.googleapis.com/books/v1/volumes?maxResults=1&q=' + encodeURIComponent(titre))
    .then(r=> r.json())
    .then(data=>{
      document.getElementById('sessionLivreRecherche').hidden = true;
      const item = data && data.items && data.items[0];
      const pages = item && item.volumeInfo && item.volumeInfo.pageCount;
      if(pages){
        document.getElementById('sessionLivreTrouve').hidden = false;
        document.getElementById('sessionLivrePagesValeur').textContent = pages;
        document.getElementById('sessionPagesManuelBox').hidden = true;
        ecrireChampSession('nombrePages', pages);
        enregistrerLivreConnu(cle, titre, pages);
      } else {
        document.getElementById('sessionLivreTrouve').hidden = true;
        document.getElementById('sessionPagesManuelBox').hidden = false;
      }
    })
    .catch(()=>{
      // Pas de réseau vers Google Books (ou hors-ligne) : on ne bloque rien,
      // la personne indique juste le nombre de pages elle-même.
      document.getElementById('sessionLivreRecherche').hidden = true;
      document.getElementById('sessionLivreTrouve').hidden = true;
      document.getElementById('sessionPagesManuelBox').hidden = false;
    });
}
// Mémorise durablement le nombre de pages d'un livre pour TOUT LE MONDE :
// dès qu'une personne (dans n'importe quel groupe) l'indique une fois, elle
// n'aura plus jamais besoin de le retaper — ni personne d'autre.
function enregistrerLivreConnu(cle, titre, nombrePages){
  if(!cle || !nombrePages) return;
  try{
    firebase.firestore().collection('livresConnus').doc(cle).set({
      titre: String(titre || '').toUpperCase(), nombrePages: nombrePages, ajouteLe: new Date().toISOString()
    }).catch(e=> console.error('Erreur de sauvegarde du livre connu :', e));
  }catch(e){ console.error(e); }
}
function enregistrerPagesManuelles(el){
  const val = parseInt(el.value, 10) || null;
  majSessionChamp('nombrePages', val);
  if(val && sessionActuelle && sessionActuelle.livre){
    enregistrerLivreConnu(normaliserCleLivre(sessionActuelle.livre), sessionActuelle.livre, val);
  }
}
function majSessionPageActuelle(v){
  const val = Math.max(0, parseInt(v,10) || 0);
  ecrireChampSession('pageActuelle', val);
  majJaugeAffichage(val, sessionActuelle ? sessionActuelle.nombrePages : null);
}
function majJaugeAffichage(page, total){
  const fill = document.getElementById('sessionJaugeFill');
  const texte = document.getElementById('sessionJaugeTexte');
  if(!fill || !texte) return;
  if(total){
    const pct = Math.max(0, Math.min(100, Math.round((page/total)*100)));
    fill.style.width = pct + '%';
    texte.textContent = pct + '% (' + page + '/' + total + ')';
  } else {
    fill.style.width = '0%';
    texte.textContent = page + ' pages';
  }
}

/* --- Les échanges (fil de discussion pendant une lecture) --- */
function renderEchanges(){
  const el = document.getElementById('sessionEchangesListe');
  if(!el) return;
  if(!echangesActuels.length){
    el.innerHTML = '<div class="empty">Aucun message pour l\'instant.</div>';
    return;
  }
  el.innerHTML = echangesActuels.map(m=>{
    const heure = m.horodatage ? new Date(m.horodatage).toLocaleString('fr-FR', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '';
    return '<div class="groupe-echange" style="border-left-color:'+ (m.couleur||'var(--gold)') +'">'
      + '<div class="groupe-echange-auteur" style="color:'+(m.couleur||'var(--khaki-dark)')+'">'+echapperHtml(m.auteurNom)+'</div>'
      + '<div class="groupe-echange-texte">'+echapperHtml(m.texte)+'</div>'
      + '<div class="groupe-echange-heure">'+heure+'</div>'
      + '</div>';
  }).join('');
  el.scrollTop = el.scrollHeight;
}
function envoyerEchange(){
  if(!groupeActuel || !sessionActuelle || !currentUser) return;
  const input = document.getElementById('sessionEchangeInput');
  const texte = (input.value||'').trim();
  if(!texte) return;
  const entree = {
    auteurUid: currentUser.uid,
    auteurNom: getMonNomGroupe(),
    couleur: couleurDuMembre(currentUser.uid),
    texte: texte,
    horodatage: new Date().toISOString()
  };
  firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').doc(sessionActuelle.id)
    .collection('entries').add(nettoyerPourFirestore(entree)).then(()=>{ input.value = ''; })
    .catch(e=> console.error('Erreur d\'envoi du message :', e));
}

/* --- Présence (signature de fin de rencontre) --- */
function renderPresence(session){
  const el = document.getElementById('sessionPresenceListe');
  if(!el || !groupeActuel) return;
  const presence = session.presence || {};
  const jeSuisOrganisatrice = currentUser && groupeActuel.createdBy === currentUser.uid;
  el.innerHTML = groupeActuel.members.map(m=>{
    const statut = presence[m.uid];
    const peuxModifier = (currentUser && currentUser.uid === m.uid) || jeSuisOrganisatrice;
    return '<div class="groupe-presence-row">'
      + '<div class="groupe-presence-nom"><span class="groupe-membre-dot" style="background:'+m.couleur+'"></span>'+echapperHtml(m.nom)+'</div>'
      + '<div class="groupe-presence-boutons">'
      + '<button class="groupe-presence-btn-present'+(statut==='present'?' actif':'')+'" '+(peuxModifier?'':'disabled')+' onclick="togglePresence(\''+m.uid+'\',\'present\')">✅ Présent</button>'
      + '<button class="groupe-presence-btn-absent'+(statut==='absent'?' actif':'')+'" '+(peuxModifier?'':'disabled')+' onclick="togglePresence(\''+m.uid+'\',\'absent\')">❌ Absent</button>'
      + '</div></div>';
  }).join('');
}
function togglePresence(uid, statut){
  if(!groupeActuel || !sessionActuelle) return;
  firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').doc(sessionActuelle.id)
    .update({ ['presence.'+uid]: statut }).catch(e=> console.error(e));
}

function cloturerRencontre(){
  if(!groupeActuel || !sessionActuelle) return;
  if(!confirm('Clôturer cette rencontre ? Elle passera en lecture seule (tu pourras toujours la consulter dans l\'historique).')) return;
  firebase.firestore().collection('groups').doc(groupeActuel.id).collection('sessions').doc(sessionActuelle.id)
    .update({ cloturee:true, clotureeAt: new Date().toISOString() })
    .catch(e=> console.error(e));
}

/* --- Rapport du groupe --- */
function formaterDuree(debutIso, finIso){
  if(!debutIso || !finIso) return '—';
  const mins = Math.max(0, Math.round((new Date(finIso) - new Date(debutIso)) / 60000));
  if(mins < 60) return mins + ' min';
  return Math.floor(mins/60) + 'h ' + (mins%60) + 'min';
}
function afficherRapportGroupe(){
  const box = document.getElementById('groupeRapportBox');
  if(!box || !groupeActuel) return;
  const termine = sessionsActuelles.filter(s=> s.cloturee).slice().sort((a,b)=> String(a.createdAt||'').localeCompare(String(b.createdAt||'')));
  if(!termine.length){
    box.innerHTML = '<div class="card"><div class="empty">Aucune rencontre clôturée pour l\'instant.</div></div>';
    box.hidden = false;
    return;
  }
  // Pages lues à chaque rencontre de lecture = différence avec la rencontre
  // précédente du MÊME livre (ou la page atteinte si c'est la première fois).
  const dernierePageParLivre = {};
  const lignes = termine.map(s=>{
    const presence = s.presence || {};
    const presents = groupeActuel.members.filter(m=> presence[m.uid] === 'present').map(m=>m.nom).join(', ') || '—';
    const absents = groupeActuel.members.filter(m=> presence[m.uid] === 'absent').map(m=>m.nom).join(', ') || '—';
    const duree = formaterDuree(s.createdAt, s.clotureeAt);
    let type, detail, pagesLues;
    if(s.type === 'priere'){
      type = 'Prière';
      detail = echapperHtml(s.qui || '—') + (s.priereFaite ? ' (faite)' : '');
      pagesLues = '—';
    } else {
      type = 'Lecture';
      detail = echapperHtml(s.livre || '—');
      const cle = s.livreKey || s.livre || '';
      const avant = dernierePageParLivre[cle] || 0;
      pagesLues = Math.max(0, (s.pageActuelle||0) - avant);
      dernierePageParLivre[cle] = s.pageActuelle || 0;
    }
    return '<tr><td>'+(s.date||(s.createdAt||'').slice(0,10))+'</td><td>'+type+'</td><td>'+detail+'</td>'
      + '<td>'+echapperHtml(presents)+'</td><td>'+echapperHtml(absents)+'</td><td>'+duree+'</td><td>'+pagesLues+'</td></tr>';
  }).join('');
  box.innerHTML = '<div class="card">'
    + '<h2>📄 Rapport de « '+echapperHtml(groupeActuel.nom)+' »</h2>'
    + '<div style="overflow-x:auto;"><table class="groupe-rapport-table"><thead><tr>'
    + '<th>Date</th><th>Type</th><th>Détail</th><th>Présents</th><th>Absents</th><th>Durée</th><th>Pages lues</th>'
    + '</tr></thead><tbody>'+lignes+'</tbody></table></div>'
    + '<button onclick="window.print()" style="margin-top:12px;">Imprimer / exporter en PDF</button>'
    + '</div>';
  box.hidden = false;
}

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('service-worker.js?v=29').catch(()=>{});
  });
}

/* =========================================================================
   AFFICHAGE INITIAL DE L'ÉCRAN DE CONNEXION — évite un "flash" de l'appli
   avant que Firebase ait pu vérifier si quelqu'un est déjà connecté.
   Sans Firebase configuré (firebase-config.js encore avec les valeurs
   "COLLE_ICI..."), l'appli s'ouvre directement, sans aucune connexion.
   ========================================================================= */
function pickLoginTheme(){
  const login = document.getElementById('loginScreen');
  if(!login) return;
  const themes = ['a','b','c','d'];
  login.dataset.theme = themes[Math.floor(Math.random() * themes.length)];
}
function initialGateDisplay(){
  const shell = document.getElementById('appShell');
  const login = document.getElementById('loginScreen');
  pickLoginTheme();
  if(firebaseIsConfigured()){
    if(shell) shell.style.display = 'none';
    if(login) login.style.display = 'flex';
  } else {
    if(shell) shell.style.display = '';
    if(login) login.style.display = 'none';
    setTimeout(verifierPromptNotifications, 900);
  }
}
initialGateDisplay();
applyCachedAppearanceIfAny();
verifierLienInvitationDansUrl();

loadState();
initCloudIfConfigured();
renderVerseAndDate();

/* Filet de sécurité : certains navigateurs (Safari sur iPad notamment)
   restaurent le contenu des menus déroulants tout seuls quand on revient sur
   la page (bouton retour, appli rouverte depuis l'écran d'accueil...), ce qui
   peut réafficher un ancien choix dans le menu sans que ça change vraiment
   l'apparence. On réapplique donc systématiquement les vraies valeurs
   mémorisées à chaque fois que la page redevient visible. */
window.addEventListener('pageshow', ()=>{ applyAppearance(); updateNotifUI(); });
document.addEventListener('visibilitychange', ()=>{
  if(document.visibilityState === 'visible'){ applyAppearance(); updateNotifUI(); }
});
