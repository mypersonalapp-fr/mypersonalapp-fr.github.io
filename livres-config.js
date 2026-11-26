/* =========================================================================
   PROPOSITIONS DE LIVRES CHRÉTIENS — un livre par ligne, sous la forme
   { titre: "...", auteur: "..." }, séparés par une virgule.

   Pour changer ou compléter cette liste :
   1. Ouvre ce fichier directement sur GitHub.
   2. Modifie / ajoute des lignes (juste titre + auteur, rien d'autre à
      renseigner : la couverture du livre est trouvée automatiquement sur
      Internet quand l'appli est ouverte — si elle ne la trouve pas, une
      petite icône 📖 s'affiche à la place, ce n'est pas un problème).
   3. Enregistre ("Commit changes").

   L'appli affiche une suggestion différente chaque jour sur la page
   d'Accueil, à côté du graphique "Avancement global", et toute la liste
   reste consultable en dépliant "Voir toutes mes suggestions". Tant que
   cette liste est vide, la rubrique reste masquée.

   Sourcing : bibliographies vérifiées (Internet Archive, Goodreads,
   eglise.shop, sites des auteurs) — pas de titres inventés.
   Note : pour "David Cross", plusieurs auteurs différents portent ce nom
   très courant. Les 5 titres ci-dessous sont ceux du David Cross du
   ministère de délivrance/guérison intérieure (Ellel Ministries) — c'est
   la seule bibliographie fiable trouvée pour lui, donc plus courte que
   les autres.
   ========================================================================= */
const livresChretiens = [
  // --- Joyce Meyer ---
  { titre: "Le champ de bataille de l'esprit", auteur: "Joyce Meyer" },
  { titre: "In Pursuit of Peace", auteur: "Joyce Meyer" },
  { titre: "Enjoying Successful Relationships", auteur: "Joyce Meyer" },
  { titre: "What Are You Going to Believe?", auteur: "Joyce Meyer" },
  { titre: "The Power of Being Positive", auteur: "Joyce Meyer" },
  { titre: "Jesus: Name Above All Names", auteur: "Joyce Meyer" },
  { titre: "Eat and Stay Thin", auteur: "Joyce Meyer" },
  { titre: "Never Give Up!", auteur: "Joyce Meyer" },
  { titre: "Eat the Cookie – Buy the Shoes", auteur: "Joyce Meyer" },
  { titre: "Straight Talk on Insecurity", auteur: "Joyce Meyer" },

  // --- Kenneth E. Hagin ---
  { titre: "The Believer's Authority", auteur: "Kenneth E. Hagin" },
  { titre: "Plans, Purposes, & Pursuits", auteur: "Kenneth E. Hagin" },
  { titre: "A Commonsense Guide to Fasting", auteur: "Kenneth E. Hagin" },
  { titre: "Prayer Secrets", auteur: "Kenneth E. Hagin" },
  { titre: "Seven Vital Steps to Receiving the Holy Spirit", auteur: "Kenneth E. Hagin" },
  { titre: "Healing Belongs to Us", auteur: "Kenneth E. Hagin" },
  { titre: "The Holy Spirit and His Gifts", auteur: "Kenneth E. Hagin" },
  { titre: "Bible Faith Study Course", auteur: "Kenneth E. Hagin" },
  { titre: "Redeemed from Poverty, Sickness and Death", auteur: "Kenneth E. Hagin" },
  { titre: "Understanding the Anointing", auteur: "Kenneth E. Hagin" },

  // --- Dorothée Rajiah ---
  { titre: "Parle et déclare", auteur: "Dorothée Rajiah" },
  { titre: "En Christ", auteur: "Dorothée Rajiah" },
  { titre: "Maturité spirituelle", auteur: "Dorothée Rajiah" },
  { titre: "Vaincre", auteur: "Dorothée Rajiah" },
  { titre: "La grâce", auteur: "Dorothée Rajiah" },
  { titre: "La guérison", auteur: "Dorothée Rajiah" },
  { titre: "La délivrance", auteur: "Dorothée Rajiah" },
  { titre: "Identité spirituelle", auteur: "Dorothée Rajiah" },

  // --- David Cross (voir note de sourcing ci-dessus) ---
  { titre: "Soul Ties: The Unseen Bond in Relationships", auteur: "David Cross" },
  { titre: "Trapped by Control: How to Find Freedom", auteur: "David Cross" },
  { titre: "God's Way Out of Depression", auteur: "David Cross" },
  { titre: "God's Covering: A Place of Healing", auteur: "David Cross" },
  { titre: "The Dangers of Alternative Ways to Healing", auteur: "David Cross" },

  // --- Yvan Castanou ---
  { titre: "Construire un mariage heureux et durable !", auteur: "Yvan Castanou" },
  { titre: "Les 4 secrets d'un mariage réussi", auteur: "Yvan Castanou" },
  { titre: "Sortir des prisons intérieures", auteur: "Yvan Castanou" },
  { titre: "Vivez l'extraordinaire divin", auteur: "Yvan Castanou" },
  { titre: "Maintenant ça suffit, il faut que ça change", auteur: "Yvan Castanou" },
  { titre: "La prière qui n'échoue jamais", auteur: "Yvan Castanou" },
  { titre: "12 piliers pour réussir vos premiers pas en Christ", auteur: "Yvan Castanou" },
  { titre: "Le mystère de la nouvelle création", auteur: "Yvan Castanou" },
  { titre: "Comment votre langue peut-elle détruire votre vie ?", auteur: "Yvan Castanou" },
  { titre: "Vous pensez mariage ? Comment faire le bon choix ?", auteur: "Yvan Castanou" },

  // --- Myles Munroe ---
  { titre: "In Pursuit of Purpose", auteur: "Myles Munroe" },
  { titre: "Discover the Hidden You", auteur: "Myles Munroe" },
  { titre: "The Fatherhood Principle", auteur: "Myles Munroe" },
  { titre: "Potential for Every Day", auteur: "Myles Munroe" },
  { titre: "The Forgotten Mountain", auteur: "Myles Munroe" },
  { titre: "The Glory of Living", auteur: "Myles Munroe" },
  { titre: "Understanding Purpose in Times of Perplexity", auteur: "Myles Munroe" },
  { titre: "Kingdom Principles", auteur: "Myles Munroe" },
  { titre: "Overcoming Crisis", auteur: "Myles Munroe" },
  { titre: "Becoming a Leader", auteur: "Myles Munroe" },

  // --- Kenneth Copeland ---
  { titre: "The Laws of Prosperity", auteur: "Kenneth Copeland" },
  { titre: "Dear Partner", auteur: "Kenneth Copeland" },
  { titre: "Jesus, The Name Above Every Name", auteur: "Kenneth Copeland" },
  { titre: "Limitless Love", auteur: "Kenneth Copeland" },
  { titre: "The Winning Attitude", auteur: "Kenneth Copeland" },
  { titre: "Six Steps to Excellence in Ministry", auteur: "Kenneth Copeland" },
  { titre: "Love Letters from Heaven", auteur: "Kenneth Copeland" },
  { titre: "Tune in to the Voice of God", auteur: "Kenneth Copeland" },
  { titre: "Your Right-Standing with God", auteur: "Kenneth Copeland" },
  { titre: "Receive as a Child, Live Like a King", auteur: "Kenneth Copeland" },

  // --- Gloria Copeland (épouse de Kenneth Copeland) ---
  { titre: "God's Will for You", auteur: "Gloria Copeland" },
  { titre: "God's Master Plan for Your Life", auteur: "Gloria Copeland" },
  { titre: "One Word from God Can Change Your Destiny", auteur: "Gloria Copeland" },
  { titre: "The Grace That Makes Us Holy", auteur: "Gloria Copeland" },
  { titre: "Your 10-Day Spiritual Action Plan for Building Relationships That Last", auteur: "Gloria Copeland" },
  { titre: "Walk with God", auteur: "Gloria Copeland" },
  { titre: "Shine On", auteur: "Gloria Copeland" },
  { titre: "Pleasing the Father", auteur: "Gloria Copeland" },
  { titre: "Live Long, Finish Strong", auteur: "Gloria Copeland" },
  { titre: "Living in Heaven's Blessings Now", auteur: "Gloria Copeland" },

  // --- Jerry Savelle ---
  { titre: "If Satan Can't Steal Your Joy... He Can't Keep Your Goods", auteur: "Jerry Savelle" },
  { titre: "Every Day a Blessing Day", auteur: "Jerry Savelle" },
  { titre: "The Spirit of Favor on Your House", auteur: "Jerry Savelle" },
  { titre: "No Boundaries", auteur: "Jerry Savelle" },
  { titre: "The God of the Breakthrough Will Visit Your House", auteur: "Jerry Savelle" },
  { titre: "The Favor of God", auteur: "Jerry Savelle" },
  { titre: "Don't Let Go of Your Dreams", auteur: "Jerry Savelle" },
  { titre: "Walking in Divine Favor", auteur: "Jerry Savelle" },
  { titre: "Why God Wants You to Prosper", auteur: "Jerry Savelle" },
  { titre: "Called to Battle, Destined to Win", auteur: "Jerry Savelle" },

  // --- Terri Savelle Foy ---
  { titre: "Imagine Big: Unlock the Secret to Living Out Your Dreams", auteur: "Terri Savelle Foy" },
  { titre: "Dream It. Pin It. Live It.: Make Vision Boards Work for You", auteur: "Terri Savelle Foy" },
  { titre: "5 Things Successful People Do Before 8 A.M.", auteur: "Terri Savelle Foy" },
  { titre: "Pep Talk: Learn the Language of Success Through Positive Declarations", auteur: "Terri Savelle Foy" },
  { titre: "The Alone Advantage", auteur: "Terri Savelle Foy" },
  { titre: "Declutter Your Way to Success", auteur: "Terri Savelle Foy" },
  { titre: "Make Your Dreams Bigger Than Your Memories", auteur: "Terri Savelle Foy" },
  { titre: "Untangle: Break Wrong Soul Ties and Pursue Your Purpose", auteur: "Terri Savelle Foy" },
  { titre: "The Leader's Checklist", auteur: "Terri Savelle Foy" },
  { titre: "Ask Big", auteur: "Terri Savelle Foy" },

  // --- Jérémy Pothin ---
  { titre: "Défi guérison : 21 jours pour voir vos premières guérisons", auteur: "Jérémy Pothin (avec David Théry)" },
  { titre: "Combat spirituel : les 25 vérités les plus importantes", auteur: "Jérémy Pothin" },
  { titre: "Paraboles nocturnes", auteur: "Jérémy Pothin" },
  { titre: "Comment activer le ministère des anges", auteur: "Jérémy Pothin" },
  { titre: "L'homme spirituel – L'homme en trois dimensions", auteur: "Jérémy Pothin" },
  { titre: "Comprendre et opérer dans les dons spirituels", auteur: "Jérémy Pothin" },
  { titre: "5 choses qui ont détruit le ministère de Samson", auteur: "Jérémy Pothin" },
  { titre: "Le chrétien et l'argent", auteur: "Jérémy Pothin" },
];
