/* =========================================================================
   ÉTUDE BIBLIQUE — appli épurée, verset par verset, de Genèse à Apocalypse.
   Reconstruite le 25/11/2026 à la demande d'Ashley : on retire tout ce qui
   existait avant (suivi de lecture, groupes, vision board, plans, rapports,
   journal/prières) pour ne garder qu'une seule chose : l'étude du texte,
   mot à mot en hébreu/grec avec le Strong, plus le sens de chaque verset.
   ========================================================================= */

let useCloud = false;
let currentUser = null;
let cloudDocRef = null;
let positionCourante = { livre:'Genese', chapitre:1, verset:1 };
let versionTexte = 'lsg'; // 'lsg' = Louis Segond 1910, 'darby' = Darby / J.N. Darby 1885
let sauvegardeEnCours = null;

/* --- Référence des livres disponibles (seul Genèse 1 est rédigé pour l'instant ;
   les chapitres suivants s'ajoutent progressivement, verset par verset). --- */
const LIVRES_BIBLE = [
  { cle:'Genese', nom:'Genèse', chapitres:50 }
  // Les 65 autres livres seront ajoutés ici au fur et à mesure de l'étude.
];
const CONTENU_PAR_CHAPITRE = {
  'Genese-1': (typeof GENESE_1 !== 'undefined') ? GENESE_1 : []
};

function cleHebreu(nomLivre, chapitre){ return nomLivre + '-' + chapitre; }

function getChapitreActuel(){
  return CONTENU_PAR_CHAPITRE[cleHebreu(positionCourante.livre, positionCourante.chapitre)] || [];
}
function getVerseActuel(){
  const ch = getChapitreActuel();
  return ch.find(v => v.v === positionCourante.verset) || null;
}
function getNomLivre(cle){
  const l = LIVRES_BIBLE.find(x=>x.cle===cle);
  return l ? l.nom : cle;
}

/* ============================= AFFICHAGE ============================= */

function pad(n){ return String(n).padStart(2,'0'); }
function majFirst(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

function updateClock(){
  const d = new Date();
  const jours = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
  const mois = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const txt = jours[d.getDay()] + ' ' + d.getDate() + ' ' + mois[d.getMonth()] + ' ' + d.getFullYear() + ' — ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  const el = document.getElementById('dateTime');
  if (el) el.textContent = majFirst(txt);
}

function echapperHtml(s){
  if (s === null || s === undefined) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function prenomUtilisateur(){
  if (currentUser && currentUser.email) return currentUser.email.split('@')[0];
  return '';
}

function rendreMotCarte(mot){
  const def = GLOSSAIRE_HEBREU[mot.strong];
  if (!def) return '';
  let prefixeHtml = '';
  if (mot.prefixes && mot.prefixes.length){
    const liste = mot.prefixes.map(p => '<strong>' + echapperHtml(p.heb) + '</strong> (' + echapperHtml(p.gloss) + ')').join(' + ');
    prefixeHtml = '<strong>Mot tel qu\'il apparaît dans le verset</strong>, composé de ' + (mot.prefixes.length>1?'plusieurs éléments':'un préfixe') + ' : ' + liste + ' collé devant la racine <strong>' + echapperHtml(def.heb) + '</strong> (' + echapperHtml(def.translit) + ', ' + mot.strong + '). <br><br>';
  }
  return '<div class="word-card">' +
    '<div class="row-top">' +
      '<span class="hebrew">' + echapperHtml(mot.heb) + '</span>' +
      '<span class="strongno">' + echapperHtml(mot.strong) + '</span>' +
    '</div>' +
    '<div class="xlit">' + echapperHtml(def.translit) + '</div>' +
    '<div class="def">' + prefixeHtml + '<strong>Racine ' + echapperHtml(mot.strong) + ' — ' + echapperHtml(def.translit) + ' :</strong> ' + echapperHtml(def.def) + '</div>' +
    '<div class="fr-word">traduit ici par « ' + echapperHtml(mot.traduitPar) + ' »</div>' +
  '</div>';
}

function renderEtudeBiblique(){
  updateClock();
  const helloEl = document.getElementById('helloMsg');
  if (helloEl){
    const prenom = prenomUtilisateur();
    helloEl.textContent = 'Bonjour' + (prenom ? ' ' + majFirst(prenom) : '');
  }

  const chapitre = getChapitreActuel();
  const verse = getVerseActuel();
  const wrap = document.getElementById('etudeContenu');
  const vide = document.getElementById('etudeVide');
  if (!wrap) return;

  if (!verse){
    wrap.hidden = true;
    if (vide){
      vide.hidden = false;
      vide.innerHTML = '<p>Ce passage n\'est pas encore rédigé — l\'étude avance verset par verset. Reviens bientôt !</p>' +
        '<button onclick="allerAuDebut()">⏮ Retourner à Genèse 1:1</button>';
    }
    return;
  }
  if (vide) vide.hidden = true;
  wrap.hidden = false;

  document.getElementById('progression').textContent = 'Étude en cours — ' + getNomLivre(positionCourante.livre) + ' ' + positionCourante.chapitre + ' / ' + chapitre.length + ' versets';
  document.getElementById('verseRef').textContent = getNomLivre(positionCourante.livre) + ' ' + positionCourante.chapitre + ':' + verse.v;
  document.getElementById('verseTexte').textContent = (versionTexte === 'darby' && verse.texteDarby) ? verse.texteDarby : verse.texte;
  document.querySelectorAll('.version-btn').forEach(b=>{
    b.classList.toggle('actif', b.getAttribute('data-version') === versionTexte);
  });

  const motsWrap = document.getElementById('motsWrap');
  motsWrap.innerHTML = verse.mots.map(rendreMotCarte).join('');

  const sensWrap = document.getElementById('sensWrap');
  sensWrap.innerHTML =
    '<p><span class="q">Ce que dit le verset :</span> ' + echapperHtml(verse.sens.verset) + '</p>' +
    '<p><span class="q">Pour nous, chrétiens :</span> ' + echapperHtml(verse.sens.chretiens) + '</p>' +
    '<p><span class="q">Pour nous aujourd\'hui :</span> ' + echapperHtml(verse.sens.aujourdhui) + '</p>';

  const estPremier = (positionCourante.verset <= 1 && positionCourante.chapitre <= 1);
  document.getElementById('btnPrecedent').disabled = estPremier;
}

/* ============================= NAVIGATION ============================= */

function changerVersion(v){
  versionTexte = v;
  try{ localStorage.setItem('etude-biblique-version', v); }catch(e){}
  renderEtudeBiblique();
}

function allerAuDebut(){
  positionCourante = { livre:'Genese', chapitre:1, verset:1 };
  sauvegarderPosition();
  renderEtudeBiblique();
}

function versetSuivant(){
  const chapitre = getChapitreActuel();
  const idx = chapitre.findIndex(v=>v.v===positionCourante.verset);
  if (idx !== -1 && idx < chapitre.length - 1){
    positionCourante.verset = chapitre[idx+1].v;
  } else {
    // Chapitre suivant (pas encore rédigé au-delà de Genèse 1 pour l'instant)
    positionCourante.chapitre += 1;
    positionCourante.verset = 1;
  }
  sauvegarderPosition();
  renderEtudeBiblique();
  window.scrollTo({top:0, behavior:'smooth'});
}

function versetPrecedent(){
  const chapitre = getChapitreActuel();
  const idx = chapitre.findIndex(v=>v.v===positionCourante.verset);
  if (idx > 0){
    positionCourante.verset = chapitre[idx-1].v;
  } else if (positionCourante.chapitre > 1){
    positionCourante.chapitre -= 1;
    const prevChapitre = CONTENU_PAR_CHAPITRE[cleHebreu(positionCourante.livre, positionCourante.chapitre)] || [];
    positionCourante.verset = prevChapitre.length ? prevChapitre[prevChapitre.length-1].v : 1;
  }
  sauvegarderPosition();
  renderEtudeBiblique();
  window.scrollTo({top:0, behavior:'smooth'});
}

function sauvegarderPosition(){
  try{ localStorage.setItem('etude-biblique-position', JSON.stringify(positionCourante)); }catch(e){}
  if (!useCloud || !cloudDocRef) return;
  clearTimeout(sauvegardeEnCours);
  sauvegardeEnCours = setTimeout(()=>{
    cloudDocRef.set({ position: positionCourante, majLe: Date.now() }, {merge:true}).catch(e=>{
      console.error('Erreur de sauvegarde de la position :', e);
    });
  }, 500);
}

function chargerPositionLocale(){
  try{
    const brut = localStorage.getItem('etude-biblique-position');
    if (brut){ const p = JSON.parse(brut); if (p && p.livre) positionCourante = p; }
  }catch(e){}
  try{
    const v = localStorage.getItem('etude-biblique-version');
    if (v === 'darby' || v === 'lsg') versionTexte = v;
  }catch(e){}
}

/* ============================= NETTOYAGE DES ANCIENNES DONNÉES =============================
   Sur demande d'Ashley : l'appli ne garde plus le suivi de lecture, les groupes, ni le
   vision board de l'ancienne version. On supprime ces anciennes données une seule fois,
   au premier login après la refonte (marqué par le champ ancienNettoyageFait). */
function nettoyerAnciennesDonneesSiBesoin(user){
  const refUser = firebase.firestore().collection('users').doc(user.uid);
  refUser.get().then(doc=>{
    const data = doc.exists ? doc.data() : {};
    if (data && data.ancienNettoyageFait) return; // déjà fait

    const taches = [];

    // 1) Ancien document de suivi (lectures, journal, prières, plans, rapports)
    taches.push(refUser.collection('state').doc('main').delete().catch(()=>{}));

    // 2) Vision board : fichiers Storage puis documents Firestore
    taches.push(
      refUser.collection('visionBoard').get().then(snap=>{
        const suppr = [];
        snap.forEach(d=>{
          const chemin = d.data() && d.data().imagePath;
          if (chemin){
            suppr.push(firebase.storage().ref(chemin).delete().catch(()=>{}));
          }
          suppr.push(d.ref.delete().catch(()=>{}));
        });
        return Promise.all(suppr);
      }).catch(()=>{})
    );

    // 3) Groupes de lecture dont elle est membre
    taches.push(
      firebase.firestore().collection('groups').where('memberUids','array-contains',user.uid).get().then(snap=>{
        const suppr = [];
        snap.forEach(g=>{
          suppr.push(
            g.ref.collection('sessions').get().then(sess=>{
              const s2 = [];
              sess.forEach(s=> s2.push(s.ref.delete().catch(()=>{})));
              return Promise.all(s2);
            }).then(()=> g.ref.delete().catch(()=>{})).catch(()=>{})
          );
        });
        return Promise.all(suppr);
      }).catch(()=>{})
    );

    // 4) Fiche usersMeta (liée à l'ancien admin)
    taches.push(firebase.firestore().collection('usersMeta').doc(user.uid).delete().catch(()=>{}));

    Promise.all(taches).then(()=>{
      refUser.set({ ancienNettoyageFait:true }, {merge:true}).catch(()=>{});
    }).catch(e=>{
      console.error('Nettoyage des anciennes données : erreur partielle', e);
      refUser.set({ ancienNettoyageFait:true }, {merge:true}).catch(()=>{});
    });
  }).catch(e=> console.error('Nettoyage des anciennes données : lecture impossible', e));
}

/* ============================= AUTH / FIREBASE ============================= */

function firebaseIsConfigured(){
  return typeof firebaseConfig !== 'undefined'
    && firebaseConfig.apiKey && !String(firebaseConfig.apiKey).includes('COLLE_ICI');
}

function initCloudIfConfigured(){
  chargerPositionLocale();
  if (!firebaseIsConfigured()){
    renderEtudeBiblique();
    return;
  }
  try{
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().enablePersistence({synchronizeTabs:true}).catch(()=>{});

    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        useCloud = true;
        currentUser = user;
        cloudDocRef = firebase.firestore().collection('users').doc(user.uid);
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appShell').style.display = '';

        const emailEl = document.getElementById('compteEmail');
        if (emailEl) emailEl.textContent = user.email || '';

        nettoyerAnciennesDonneesSiBesoin(user);

        cloudDocRef.get().then(doc=>{
          const data = doc.exists ? doc.data() : null;
          if (data && data.position && data.position.livre){
            positionCourante = data.position;
          } else {
            // Première connexion : on pousse la position locale (ou le début) vers le cloud.
            sauvegarderPosition();
          }
          renderEtudeBiblique();
        }).catch(()=> renderEtudeBiblique());
      } else {
        useCloud = false;
        currentUser = null;
        cloudDocRef = null;
        document.getElementById('loginScreen').style.display = '';
        document.getElementById('appShell').style.display = 'none';
      }
    });
  }catch(e){
    console.error('Erreur Firebase :', e);
    renderEtudeBiblique();
  }
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
  if (!err) return;
  err.classList.remove('lock-success');
  err.textContent = msg;
  err.hidden = false;
}
function showLoginSuccess(msg){
  const err = document.getElementById('loginError');
  if (!err) return;
  err.classList.add('lock-success');
  err.textContent = msg;
  err.hidden = false;
}
function forgotPassword(){
  const email = (document.getElementById('loginEmail').value || '').trim();
  if (!email){
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
  if (err) err.hidden = true;
  if (!email || !pass){ showLoginError("Entre ton e-mail et ton mot de passe."); return; }
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .catch(e=> showLoginError(translateAuthError(e)));
}
function emailSignUp(){
  const email = (document.getElementById('loginEmail').value || '').trim();
  const pass = document.getElementById('loginPasswordField').value || '';
  const err = document.getElementById('loginError');
  if (err) err.hidden = true;
  if (!email || !pass){ showLoginError("Entre ton e-mail et ton mot de passe."); return; }
  if (pass.length < 6){ showLoginError("Le mot de passe doit faire au moins 6 caractères."); return; }
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(e=> showLoginError(translateAuthError(e)));
}

/* ============================= PARAMÈTRES / COMPTE ============================= */

function demanderReinitMotDePasse(){
  if (!currentUser || !currentUser.email) return;
  const msgEl = document.getElementById('compteMsg');
  firebase.auth().sendPasswordResetEmail(currentUser.email).then(()=>{
    if (msgEl){ msgEl.textContent = "E-mail envoyé à " + currentUser.email + " pour choisir un nouveau mot de passe."; msgEl.hidden = false; }
  }).catch(e=>{
    if (msgEl){ msgEl.textContent = translateAuthError(e); msgEl.hidden = false; }
  });
}

/* ============================= PAGES ============================= */

function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.hidden = true);
  const el = document.getElementById('page-' + id);
  if (el) el.hidden = false;
  document.querySelectorAll('[data-page]').forEach(b=>{
    b.classList.toggle('actif', b.getAttribute('data-page') === id);
  });
  if (id === 'etude') renderEtudeBiblique();
}

/* ============================= DÉMARRAGE ============================= */

document.addEventListener('DOMContentLoaded', ()=>{
  initCloudIfConfigured();
  setInterval(updateClock, 15000);
  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js?v=53').catch(()=>{});
  }
});
