/* =========================================================================
   DONNÉES D'ÉTUDE BIBLIQUE — Genèse chapitre 1
   Sources : texte français = Louis Segond 1910 (domaine public, via
   BibleCorps/FRA-B-LSG1910-PD-UBS) et Darby / J.N. Darby 1885 (domaine
   public, via scrollmapper/bible_databases, fichier FreJND) ; analyse des
   mots hébreux = Strong's Concordance (1890, domaine public, via
   openscriptures/strongs) avec alignement mot-à-mot Tyndale House
   Cambridge / STEPBible.org (CC BY 4.0, Translators Amalgamated Hebrew
   OT). Les définitions du glossaire sont une traduction fidèle, en
   français, de la définition Strong d'origine. Les commentaires "sens"
   sont une rédaction originale.
   Prochains chapitres à ajouter progressivement, verset par verset.
   ========================================================================= */

const GLOSSAIRE_HEBREU = {
  H7225: { heb:"רֵאשִׁית", translit:"reshit", def:"commencement, début — ce qui est premier en lieu, en temps, en ordre ou en rang. Désigne aussi les prémices (premiers fruits offerts à Dieu)." },
  H1254: { heb:"בָּרָא", translit:"bara", def:"créer — dans toute la Bible hébraïque, ce verbe n'a jamais pour sujet un être humain (seul Dieu « bara ») et n'est jamais suivi d'un matériau de départ précisé, contrairement à « asah » (faire). C'est cette particularité d'emploi qui a conduit à la doctrine d'une création « à partir de rien »." },
  H0430: { heb:"אֱלֹהִים", translit:"Elohim", def:"Dieu — littéralement un pluriel (« les dieux »), mais employé avec un verbe au singulier pour désigner le Dieu unique et suprême (pluriel de majesté)." },
  H0853: { heb:"אֵת", translit:"et", def:"particule qui annonce le complément d'objet direct — elle n'a pas de sens propre et ne se traduit pas, elle indique juste quel mot suit est l'objet de l'action." },
  H8064: { heb:"שָׁמַיִם", translit:"shamayim", def:"les cieux, le ciel — toujours au duel/pluriel en hébreu, jamais au singulier, évoquant la voûte céleste et tout ce qui est « en haut »." },
  H0776: { heb:"אֶרֶץ", translit:"erets", def:"la terre, le sol, un pays — au sens large la terre entière, ou un territoire particulier selon le contexte." },
  H1961: { heb:"הָיָה", translit:"hayah", def:"exister, être, devenir, arriver — un verbe fort qui marque un changement d'état réel, pas une simple copule." },
  H8414: { heb:"תֹּהוּ", translit:"tohou", def:"désolation, vide informe — ce qui n'a ni forme ni structure ; figurément, ce qui est vain, sans valeur." },
  H0922: { heb:"בֹּהוּ", translit:"vohou", def:"vide, vacuité — un néant indistinct ; ce mot n'apparaît presque toujours qu'accolé à « tohou »." },
  H2822: { heb:"חֹשֶׁךְ", translit:"choshekh", def:"l'obscurité, les ténèbres — au sens propre, mais aussi figurément le malheur, la destruction, l'ignorance." },
  H5921: { heb:"עַל", translit:"al", def:"préposition : sur, au-dessus de, contre — avec toujours une idée de position dominante." },
  H6440: { heb:"פָּנִים", translit:"panim", def:"la face, la surface — littéralement « les faces » (toujours au pluriel en hébreu) ; employé pour « devant », « à la surface de »." },
  H8415: { heb:"תְּהוֹם", translit:"tehom", def:"l'abîme, les grandes profondeurs — la masse des eaux primordiales, l'océan originel insondable." },
  H7307: { heb:"רוּחַ", translit:"rouach", def:"souffle, vent, esprit — le même mot hébreu désigne le vent, le souffle de vie et l'Esprit de Dieu selon le contexte." },
  H7363: { heb:"רָחַף", translit:"rachaf", def:"planer, couver — l'image est celle d'un oiseau qui couve ses petits en voletant doucement au-dessus du nid." },
  H4325: { heb:"מַיִם", translit:"mayim", def:"les eaux — toujours au pluriel en hébreu." },
  H0559: { heb:"אָמַר", translit:"amar", def:"dire, parler — verbe très courant qui introduit une parole directe." },
  H0216: { heb:"אוֹר", translit:"or", def:"la lumière — la clarté, l'illumination, au sens propre comme au sens figuré (joie, bonheur)." },
  H7200: { heb:"רָאָה", translit:"ra'ah", def:"voir, regarder, considérer — dans ce chapitre, toujours « Dieu vit que cela était bon », un regard qui évalue et approuve." },
  H3588: { heb:"כִּי", translit:"ki", def:"conjonction : que, car, parce que — introduit ici ce que Dieu constate." },
  H2895: { heb:"טוֹב", translit:"tov", def:"être bon, agréable, faire du bien — à l'origine un verbe, de la même racine que l'adjectif « bon »." },
  H2896: { heb:"טוֹב", translit:"tov", def:"bon, agréable, de qualité — l'adjectif, employé ici au superlatif avec « très » (meod) pour conclure toute la création." },
  H0914: { heb:"בָּדַל", translit:"badal", def:"séparer, diviser, distinguer — l'acte de mettre à part deux choses pour les différencier." },
  H0996: { heb:"בֵּין", translit:"bein", def:"entre — préposition de séparation, souvent répétée devant chaque élément (« entre... et »)." },
  H7121: { heb:"קָרָא", translit:"qara", def:"appeler, nommer, crier — nommer une chose, c'est en affirmer l'identité et, dans la pensée biblique, exercer une forme d'autorité sur elle." },
  H3117: { heb:"יוֹם", translit:"yom", def:"jour — période chaude (du lever au coucher du soleil), un jour complet, ou plus largement une période de temps selon le contexte." },
  H3915: { heb:"לַיְלָה", translit:"laylah", def:"la nuit." },
  H6153: { heb:"עֶרֶב", translit:"erev", def:"le soir, le crépuscule." },
  H1242: { heb:"בֹּקֶר", translit:"boqer", def:"le matin, l'aube — proprement la pointe du jour qui perce." },
  H7549: { heb:"רָקִיעַ", translit:"raqia", def:"l'étendue, le firmament — l'arc visible du ciel, ce qui est « étendu » comme une voûte au-dessus de la terre." },
  H8432: { heb:"תָּוֶךְ", translit:"tavekh", def:"le milieu, le centre." },
  H6213: { heb:"עָשָׂה", translit:"assah", def:"faire, fabriquer, accomplir — au sens le plus large ; contrairement à « bara » (créer), peut avoir l'homme pour sujet." },
  H0834: { heb:"אֲשֶׁר", translit:"asher", def:"pronom relatif : qui, que, lequel — introduit une proposition relative." },
  H8478: { heb:"תַּחַת", translit:"tachat", def:"dessous, en dessous de — toujours employé comme adverbe ou préposition de position." },
  H3651: { heb:"כֵּן", translit:"ken", def:"ainsi, de cette manière — confirme qu'une chose s'est faite exactement comme annoncé." },
  H6960: { heb:"קָוָה", translit:"qavah", def:"rassembler, réunir ; figurément, espérer (l'idée commune est celle de « tendre vers », de « se tenir ensemble »)." },
  H0413: { heb:"אֶל", translit:"el", def:"préposition : vers, à, en direction de." },
  H4725: { heb:"מָקוֹם", translit:"maqom", def:"lieu, endroit, place." },
  H0259: { heb:"אֶחָד", translit:"echad", def:"un, unique, un seul." },
  H3004: { heb:"יַבָּשָׁה", translit:"yabashah", def:"la terre ferme, le sec — ce qui est asséché, par opposition aux eaux." },
  H4723: { heb:"מִקְוֶה", translit:"miqveh", def:"amas, rassemblement (ici des eaux) — ce qui est réuni, concentré en un seul endroit." },
  H3220: { heb:"יָם", translit:"yam", def:"la mer, un grand amas d'eau — désigne la mer Méditerranée en particulier, ou toute grande étendue d'eau." },
  H1876: { heb:"דָּשָׁא", translit:"dasha", def:"germer, pousser, faire verdir — l'action de la terre qui produit la végétation." },
  H1877: { heb:"דֶּשֶׁא", translit:"deshe", def:"la verdure, la jeune pousse — le premier vert tendre qui sort de terre." },
  H6212: { heb:"עֵשֶׂב", translit:"éssev", def:"l'herbe — toute pousse tendre et comestible." },
  H2232: { heb:"זָרַע", translit:"zara", def:"semer ; figurément, disséminer, engendrer." },
  H2233: { heb:"זֶרַע", translit:"zera", def:"la semence, la graine — et par extension la descendance, la postérité." },
  H6086: { heb:"עֵץ", translit:"ets", def:"l'arbre ; aussi le bois, la matière qu'il fournit." },
  H6529: { heb:"פְּרִי", translit:"peri", def:"le fruit, au sens propre comme au sens figuré." },
  H4327: { heb:"מִין", translit:"min", def:"l'espèce, la sorte — ce qui distingue une catégorie d'êtres vivants d'une autre." },
  H3318: { heb:"יָצָא", translit:"yatsa", def:"sortir ; au causatif, faire sortir, produire." },
  H3974: { heb:"מָאוֹר", translit:"maor", def:"luminaire, source de lumière — un objet qui porte et diffuse la lumière (le soleil, la lune), à distinguer de « or », la lumière elle-même." },
  H0226: { heb:"אוֹת", translit:"ot", def:"signe — un signal, une marque qui indique ou annonce quelque chose." },
  H4150: { heb:"מוֹעֵד", translit:"mo'ed", def:"rendez-vous, temps fixé — une occasion fixée à l'avance ; donnera plus tard le mot « fêtes » (moadim) du calendrier biblique." },
  H8141: { heb:"שָׁנָה", translit:"shanah", def:"l'année — littéralement « ce qui se répète », un cycle complet." },
  H0215: { heb:"אוֹר", translit:"or (verbe)", def:"éclairer, illuminer — même racine que le nom « or » (lumière), mais ici employée comme verbe." },
  H8147: { heb:"שְׁנַיִם", translit:"shenayim", def:"deux — nombre cardinal." },
  H1419: { heb:"גָּדוֹל", translit:"gadol", def:"grand, important — en taille, en importance ou en intensité." },
  H4475: { heb:"מֶמְשָׁלָה", translit:"memshalah", def:"domination, pouvoir de gouverner — la fonction de celui qui préside, qui a autorité sur un domaine." },
  H6996: { heb:"קָטֹן", translit:"qaton", def:"petit — en taille ou en importance." },
  H3556: { heb:"כּוֹכָב", translit:"kokhav", def:"étoile — littéralement « ce qui brille »." },
  H5414: { heb:"נָתַן", translit:"natan", def:"donner, mettre, placer — verbe d'un emploi très large." },
  H4910: { heb:"מָשַׁל", translit:"mashal", def:"dominer, gouverner, présider sur." },
  H8317: { heb:"שָׁרַץ", translit:"sharats", def:"grouiller, pulluler — se multiplier en masse, en parlant des petites créatures." },
  H8318: { heb:"שֶׁרֶץ", translit:"sherets", def:"ce qui grouille — une multitude de petites créatures vivantes." },
  H5315: { heb:"נֶפֶשׁ", translit:"nefesh", def:"être vivant, âme, souffle de vie — ce qui respire et vit ; désigne l'être vivant tout entier, pas seulement une partie immatérielle." },
  H2416: { heb:"חַי", translit:"chay", def:"vivant, en vie — adjectif qui qualifie tout ce qui a la vie." },
  H5775: { heb:"עוֹף", translit:"of", def:"les oiseaux — collectivement, tout ce qui vole avec des ailes et des plumes." },
  H5774: { heb:"עוּף", translit:"ouf", def:"voler — l'action de se déplacer dans les airs." },
  H8577: { heb:"תַּנִּין", translit:"tanin", def:"grand animal marin, monstre marin — une créature imposante des eaux (parfois traduit « grand poisson » ou « serpent de mer »)." },
  H3605: { heb:"כֹּל", translit:"kol", def:"tout, tout le, chaque — totalité ou ensemble complet." },
  H7430: { heb:"רָמַשׂ", translit:"ramas", def:"ramper, se mouvoir furtivement — le déplacement des petites créatures au ras du sol." },
  H3671: { heb:"כָּנָף", translit:"kanaf", def:"l'aile — et, par extension, une extrémité, un bord, un pan (de vêtement)." },
  H1288: { heb:"בָּרַךְ", translit:"barakh", def:"bénir — à l'origine « fléchir le genou » ; l'acte par lequel Dieu accorde la vie, la fécondité et le bien à sa créature." },
  H6509: { heb:"פָּרָה", translit:"parah", def:"porter du fruit, être fécond — produire en abondance selon sa nature." },
  H7235: { heb:"רָבָה", translit:"ravah", def:"se multiplier, croître en grand nombre." },
  H4390: { heb:"מָלֵא", translit:"male", def:"remplir, être plein — occuper tout l'espace disponible." },
  H0929: { heb:"בְּהֵמָה", translit:"behemah", def:"le bétail, les grands animaux (quadrupèdes) — en particulier les animaux domestiques ou de grande taille." },
  H7431: { heb:"רֶמֶשׂ", translit:"remes", def:"reptile, ce qui rampe — toute petite créature qui se déplace au ras du sol." },
  H0127: { heb:"אֲדָמָה", translit:"adamah", def:"le sol, la terre arable — d'où est tiré, par un jeu de mots voulu en hébreu, le nom « adam »." },
  H0120: { heb:"אָדָם", translit:"adam", def:"l'être humain, l'homme (l'espèce) — littéralement « celui qui est rougeâtre », tiré de la même racine que « adamah », le sol." },
  H6754: { heb:"צֶלֶם", translit:"tselem", def:"image, représentation — ce qui reproduit la forme ou les traits d'un modèle." },
  H1823: { heb:"דְּמוּת", translit:"demout", def:"ressemblance, modèle — ce qui est semblable à, conforme à." },
  H7287: { heb:"רָדָה", translit:"radah", def:"dominer, soumettre, gouverner — exercer une autorité, un gouvernement responsable (et non une domination destructrice)." },
  H2145: { heb:"זָכָר", translit:"zakhar", def:"mâle, l'homme (par le sexe)." },
  H5347: { heb:"נְקֵבָה", translit:"neqevah", def:"femelle, la femme (par le sexe)." },
  H3533: { heb:"כָּבַשׁ", translit:"kavash", def:"soumettre, assujettir — mettre sous son autorité par la maîtrise, pas par la violence." },
  H2009: { heb:"הִנֵּה", translit:"hinneh", def:"voici ! — particule qui attire l'attention sur ce qui suit, souvent solennellement." },
  H0402: { heb:"אָכְלָה", translit:"okhlah", def:"nourriture, ce qui se mange." },
  H3418: { heb:"יֶרֶק", translit:"yereq", def:"la verdure, les plantes vertes — au sens de végétation comestible." },
  H1710: { heb:"דָּגָה", translit:"daggah", def:"les poissons, collectivement." },
  H3966: { heb:"מְאֹד", translit:"meod", def:"beaucoup, très, extrêmement — intensifie ce qu'il accompagne." }
};

const GENESE_1 = [
 { v:1, texte:"Au commencement, Dieu créa les cieux et la terre.",
   texteDarby:"Au commencement Dieu créa les cieux et la terre.",
   mots:[
     { heb:"בְּרֵאשִׁית", strong:"H7225", prefixes:[{heb:"בְּ",gloss:"dans / par / avec"}], traduitPar:"au commencement" },
     { heb:"בָּרָא", strong:"H1254", prefixes:[], traduitPar:"créa" },
     { heb:"אֱלֹהִים", strong:"H0430", prefixes:[], traduitPar:"Dieu" },
     { heb:"הַשָּׁמַיִם", strong:"H8064", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"les cieux" },
     { heb:"הָאָרֶץ", strong:"H0776", prefixes:[{heb:"הָ",gloss:"article défini « le / la / les »"}], traduitPar:"la terre" }
   ],
   sens:{ verset:"Avant toute chose, avant la matière, le temps ou l'espace, il y a Dieu. Il n'est pas une force née de l'univers ; c'est Lui qui fait exister l'univers. Le verbe « bara » (créer) a une particularité frappante dans toute la Bible hébraïque : il n'a jamais Dieu que pour sujet, et jamais de matériau de départ précisé — contrairement à « asah » (faire), qui peut décrire un travail à partir d'une matière déjà là. C'est ce silence sur tout matériau qui a conduit, bien plus tard, à la doctrine théologique de la création « à partir de rien » : une conclusion tirée de l'usage du mot, pas une traduction littérale du mot lui-même.",
     chretiens:"Ce verset pose le fondement de toute la foi biblique : un Dieu personnel, souverain, antérieur à tout, qui agit par sa seule parole. Jean reprend volontairement cette même formule d'ouverture en Jean 1.1 (« Au commencement était la Parole ») pour affirmer que Christ était présent et actif dès cette création.",
     aujourdhui:"Si Dieu a créé les cieux et la terre avec intention et ordre, rien de ce qu'Il a créé n'est accidentel — ta propre vie non plus. Ce verset invite à poser un regard de confiance sur le monde : il n'est pas le fruit du hasard, il a un auteur, et cet auteur a un projet." } },

 { v:2, texte:"La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
   texteDarby:"Et la terre était désolation et vide, et il y avait des ténèbres sur la face de l’abîme. Et l’Esprit de Dieu planait sur la face des eaux.",
   mots:[
     { heb:"וְהָאָרֶץ", strong:"H0776", prefixes:[{heb:"וְ",gloss:"conjonction « et »"},{heb:"הָ",gloss:"article défini « le / la / les »"}], traduitPar:"la terre" },
     { heb:"הָיְתָה", strong:"H1961", prefixes:[], traduitPar:"était" },
     { heb:"תֹהוּ", strong:"H8414", prefixes:[], traduitPar:"informe" },
     { heb:"וָבֹהוּ", strong:"H0922", prefixes:[{heb:"וָ",gloss:"conjonction « et »"}], traduitPar:"et vide" },
     { heb:"וְחֹשֶׁךְ", strong:"H2822", prefixes:[{heb:"וְ",gloss:"conjonction « et »"}], traduitPar:"des ténèbres" },
     { heb:"תְהוֹם", strong:"H8415", prefixes:[], traduitPar:"l'abîme" },
     { heb:"וְרוּחַ", strong:"H7307", prefixes:[{heb:"וְ",gloss:"conjonction « et »"}], traduitPar:"l'esprit" },
     { heb:"מְרַחֶפֶת", strong:"H7363", prefixes:[], traduitPar:"se mouvait" }
   ],
   sens:{ verset:"Avant l'intervention de Dieu dans les versets suivants, tout n'est que vide, obscurité et chaos liquide. Ce verset décrit un état « non fini », une matière première sans forme ni vie, que Dieu va façonner jour après jour. Le mot « rouach » (esprit/souffle) est le même que celui employé ailleurs pour le Saint-Esprit : Il est déjà actif, présent, « couvant » la création comme un oiseau couve son nid.",
     chretiens:"Dieu ne crée pas en laissant le chaos livré à lui-même : son Esprit est à l'œuvre dès le commencement, signe que les trois personnes de la Trinité — déjà entrevues ici par le Père qui parle et l'Esprit qui plane — sont unies dans l'acte créateur, Jean 1 ajoutant ensuite le Fils.",
     aujourdhui:"Le vide et l'obscurité ne sont jamais le dernier mot dans la Bible : là où tout semble informe, l'Esprit de Dieu est déjà présent et à l'œuvre, prêt à apporter l'ordre et la vie. Une situation qui te paraît chaotique aujourd'hui n'échappe pas à cette présence." } },

 { v:3, texte:"Dieu dit: Que la lumière soit! Et la lumière fut.",
   texteDarby:"Et Dieu dit: Que la lumière soit. Et la lumière fut.",
   mots:[
     { heb:"וַיֹּאמֶר", strong:"H0559", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"dit" },
     { heb:"יְהִי", strong:"H1961", prefixes:[], traduitPar:"soit" },
     { heb:"אוֹר", strong:"H0216", prefixes:[], traduitPar:"la lumière" },
     { heb:"וַיְהִי", strong:"H1961", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"fut" }
   ],
   sens:{ verset:"Ici commence la méthode de la création : Dieu parle, et ce qu'Il dit existe aussitôt. Il n'y a ni effort, ni matériau, ni combat : la seule parole de Dieu suffit à faire exister la lumière. L'écho exact entre l'ordre (« que la lumière soit ») et son accomplissement (« la lumière fut ») souligne que rien ne résiste à sa parole.",
     chretiens:"Toute la théologie de la création par la Parole prend racine ici : Dieu crée en parlant, ce que les Psaumes rappellent (Psaume 33.9 : « Il dit, et la chose arrive »). Le Nouveau Testament voit en Christ cette Parole créatrice devenue chair (Jean 1.1-3).",
     aujourdhui:"La parole de Dieu a un pouvoir créateur, pas seulement descriptif : quand Il parle, les choses changent réellement. Pour toi, cela veut dire que ses promesses ne sont pas de simples mots : elles ont la même autorité que celle qui a fait jaillir la lumière du néant." } },

 { v:4, texte:"Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.",
   texteDarby:"Et Dieu vit la lumière, qu’elle était bonne; et Dieu sépara la lumière d’avec les ténèbres.",
   mots:[
     { heb:"וַיַּרְא", strong:"H7200", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"vit" },
     { heb:"הָאוֹר", strong:"H0216", prefixes:[{heb:"הָ",gloss:"article défini « le / la / les »"}], traduitPar:"la lumière" },
     { heb:"טוֹב", strong:"H2895", prefixes:[], traduitPar:"bonne" },
     { heb:"וַיַּבְדֵּל", strong:"H0914", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"sépara" },
     { heb:"חֹשֶׁךְ", strong:"H2822", prefixes:[], traduitPar:"les ténèbres" }
   ],
   sens:{ verset:"Dieu « voit » ce qu'Il vient de créer et l'évalue : « bon ». Ce regard d'approbation reviendra à chaque étape de la création. Puis Il sépare, Il met de l'ordre : la lumière reste distincte des ténèbres, chacune à sa place.",
     chretiens:"La séparation est un acte central de la création dans Genèse 1 (lumière/ténèbres, eaux d'en haut/eaux d'en bas, terre/mer) : Dieu met de l'ordre dans le chaos du verset 2. C'est le même Dieu qui, plus tard, sépare le peuple saint des nations, puis la lumière du Christ des ténèbres du péché (2 Corinthiens 4.6).",
     aujourdhui:"Dieu ne confond jamais le bien et le mal, la lumière et l'obscurité : il y a une vraie distinction entre les deux, et Il appelle encore aujourd'hui à vivre dans cette clarté plutôt que dans le flou." } },

 { v:5, texte:"Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.",
   texteDarby:"Et Dieu appela la lumière Jour; et les ténèbres, il les appela Nuit. Et il y eut soir, et il y eut matin: – premier jour.",
   mots:[
     { heb:"וַיִּקְרָא", strong:"H7121", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"appela" },
     { heb:"יוֹם", strong:"H3117", prefixes:[], traduitPar:"jour" },
     { heb:"לַיְלָה", strong:"H3915", prefixes:[], traduitPar:"nuit" },
     { heb:"עֶרֶב", strong:"H6153", prefixes:[], traduitPar:"un soir" },
     { heb:"בֹקֶר", strong:"H1242", prefixes:[], traduitPar:"un matin" },
     { heb:"יוֹם", strong:"H3117", prefixes:[], traduitPar:"jour" }
   ],
   sens:{ verset:"En nommant la lumière et les ténèbres, Dieu leur donne une identité fixe et leur assigne une fonction dans le temps : le jour pour l'activité, la nuit pour le repos. La formule « il y eut un soir, et il y eut un matin » marque la fin du premier cycle, le premier « jour » de la création.",
     chretiens:"Nommer, dans la pensée biblique, c'est exercer une autorité légitime sur ce que l'on nomme (on le reverra quand Adam nomme les animaux). Dieu structure ainsi le temps lui-même avant même de créer le soleil (verset 14), preuve que le rythme jour/nuit dépend de Lui et non des astres.",
     aujourdhui:"Le rythme même de tes journées — un soir, un matin — porte la marque de cet ordre voulu par Dieu dès l'origine. Le temps n'est pas une contrainte absurde : c'est un cadre que Dieu a lui-même institué pour la vie." } },

 { v:6, texte:"Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.",
   texteDarby:"Et Dieu dit: Qu’il y ait une étendue entre les eaux, et qu’elle sépare les eaux d’avec les eaux.",
   mots:[
     { heb:"רָקִיעַ", strong:"H7549", prefixes:[], traduitPar:"une étendue" },
     { heb:"בְּתוֹךְ", strong:"H8432", prefixes:[{heb:"בְּ",gloss:"préposition « dans / par / avec »"}], traduitPar:"entre" },
     { heb:"הַמָּיִם", strong:"H4325", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"les eaux" },
     { heb:"מַבְדִּיל", strong:"H0914", prefixes:[], traduitPar:"sépare" }
   ],
   sens:{ verset:"Deuxième jour : Dieu crée une « étendue », une voûte qui va séparer les eaux en deux masses distinctes — celles d'en haut (les nuages, la pluie) et celles d'en bas (mers, lacs, rivières). C'est un acte d'organisation de l'espace, comme le premier jour organisait le temps.",
     chretiens:"Cette structuration verticale du monde (ciel/eaux d'en bas) prépare l'espace où viendront ensuite les astres (jour 4), les oiseaux (jour 5) : la création avance par étapes ordonnées, rien n'est laissé au hasard.",
     aujourdhui:"Dieu aime structurer, donner des limites claires à ce qu'Il crée : ce n'est pas une contrainte qui appauvrit, mais un ordre voulu depuis l'origine, à l'image duquel on peut aussi recevoir les limites que Dieu pose dans sa propre vie, non comme un manque mais comme une sagesse." } },

 { v:7, texte:"Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi.",
   texteDarby:"Et Dieu fit l’étendue, et sépara les eaux qui sont au-dessous de l’étendue d’avec les eaux qui sont au-dessus de l’étendue. Et il fut ainsi.",
   mots:[
     { heb:"וַיַּעַשׂ", strong:"H6213", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"fit" },
     { heb:"הָרָקִיעַ", strong:"H7549", prefixes:[{heb:"הָ",gloss:"article défini « le / la / les »"}], traduitPar:"l'étendue" },
     { heb:"מִתַּחַת", strong:"H8478", prefixes:[{heb:"מִ",gloss:"préposition (depuis / à partir de)"}], traduitPar:"au-dessous de" },
     { heb:"וַיְהִי־כֵן", strong:"H3651", prefixes:[], traduitPar:"cela fut ainsi" }
   ],
   sens:{ verset:"Dieu exécute ce qu'Il a annoncé au verset précédent : l'étendue est faite, les eaux sont séparées. La formule « cela fut ainsi » revient comme un sceau d'accomplissement exact de la parole divine.",
     chretiens:"La répétition « Dieu dit... et cela fut ainsi » qui traverse tout le chapitre est une leçon de fiabilité : entre la promesse de Dieu et sa réalisation, il n'y a jamais d'écart.",
     aujourdhui:"Ce que Dieu annonce, Il l'accomplit — fidèlement, exactement comme Il l'a dit. C'est une bonne nouvelle pour tenir ses propres promesses au sérieux." } },

 { v:8, texte:"Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour.",
   texteDarby:"Et Dieu appela l’étendue Cieux. Et il y eut soir, et il y eut matin: – second jour.",
   mots:[
     { heb:"וַיִּקְרָא", strong:"H7121", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"appela" },
     { heb:"שָׁמַיִם", strong:"H8064", prefixes:[], traduitPar:"ciel" }
   ],
   sens:{ verset:"Dieu nomme l'étendue « cieux » (le même mot qu'au verset 1) : ce qui vient d'être façonné prend sa place dans la structure déjà annoncée. Le deuxième jour s'achève sur la même formule rituelle de bouclage.",
     chretiens:"Le mot « cieux » englobe ici l'atmosphère visible, pas la demeure de Dieu — une nuance utile pour lire le reste de l'Écriture, où « les cieux » peut désigner plusieurs réalités selon le contexte.",
     aujourdhui:"Le ciel au-dessus de toi, que tu regardes chaque jour sans y penser, porte un nom que Dieu lui-même lui a donné dès l'origine." } },

 { v:9, texte:"Dieu dit: Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. Et cela fut ainsi.",
   texteDarby:"Et Dieu dit: Que les eaux [qui sont] au-dessous des cieux se rassemblent en un lieu, et que le sec paraisse. Et il fut ainsi.",
   mots:[
     { heb:"יִקָּווּ", strong:"H6960", prefixes:[], traduitPar:"se rassemblent" },
     { heb:"אֶל־מָקוֹם", strong:"H4725", prefixes:[{heb:"אֶל",gloss:"préposition « vers / à »"}], traduitPar:"en un lieu" },
     { heb:"אֶחָד", strong:"H0259", prefixes:[], traduitPar:"seul" },
     { heb:"הַיַּבָּשָׁה", strong:"H3004", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"le sec" }
   ],
   sens:{ verset:"Troisième jour : Dieu rassemble les eaux d'en bas en un seul lieu pour faire apparaître la terre ferme. L'espace continue de se structurer : après le temps (jour 1) et le ciel/les eaux (jour 2), voici la terre habitable qui émerge.",
     chretiens:"Ce rassemblement des eaux en un seul endroit (plus tard appelées « mers ») prépare directement l'habitat de l'homme, qui n'apparaîtra qu'au sixième jour : toute la création progresse vers ce but.",
     aujourdhui:"Dieu prépare patiemment, étape par étape, un lieu habitable avant même d'y placer la vie : une leçon de patience et de préparation qui vaut aussi pour la façon dont Il agit dans une vie." } },

 { v:10, texte:"Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon.",
   texteDarby:"Et Dieu appela le sec Terre, et le rassemblement des eaux, il l’appela Mers. Et Dieu vit que cela était bon.",
   mots:[
     { heb:"לַיַּבָּשָׁה", strong:"H3004", prefixes:[{heb:"לַ",gloss:"préposition « à / pour »"}], traduitPar:"le sec" },
     { heb:"אֶרֶץ", strong:"H0776", prefixes:[], traduitPar:"terre" },
     { heb:"מִקְוֵה", strong:"H4723", prefixes:[], traduitPar:"l'amas" },
     { heb:"יַמִּים", strong:"H3220", prefixes:[], traduitPar:"mers" },
     { heb:"טוֹב", strong:"H2895", prefixes:[], traduitPar:"bon" }
   ],
   sens:{ verset:"Dieu nomme ce qu'Il vient de distinguer — « terre » et « mers » — et porte à nouveau son jugement d'approbation : « cela était bon ». Le mot « terre » ici prend un sens plus précis que celui, plus large, du verset 1.",
     chretiens:"Chaque élément du monde reçoit une place, un nom et une approbation divine avant même l'arrivée de la vie végétale et animale : la bonté de la création précède et accompagne son utilité.",
     aujourdhui:"La terre que tu foules n'est pas un simple décor neutre : elle a été voulue, nommée et déclarée bonne par Dieu lui-même." } },

 { v:11, texte:"Puis Dieu dit: Que la terre produise de la verdure, de l'herbe portant de la semence, des arbres fruitiers donnant du fruit selon leur espèce et ayant en eux leur semence sur la terre. Et cela fut ainsi.",
   texteDarby:"Et Dieu dit: Que la terre produise l’herbe, la plante portant de la semence, l’arbre fruitier produisant du fruit selon son espèce, ayant sa semence en soi sur la terre. Et il fut ainsi.",
   mots:[
     { heb:"תַּדְשֵׁא", strong:"H1876", prefixes:[], traduitPar:"produise" },
     { heb:"דֶּשֶׁא", strong:"H1877", prefixes:[], traduitPar:"de la verdure" },
     { heb:"עֵשֶׂב", strong:"H6212", prefixes:[], traduitPar:"de l'herbe" },
     { heb:"מַזְרִיעַ", strong:"H2232", prefixes:[], traduitPar:"portant" },
     { heb:"זֶרַע", strong:"H2233", prefixes:[], traduitPar:"de la semence" },
     { heb:"עֵץ", strong:"H6086", prefixes:[], traduitPar:"des arbres" },
     { heb:"פְּרִי", strong:"H6529", prefixes:[], traduitPar:"fruit" },
     { heb:"לְמִינוֹ", strong:"H4327", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"selon leur espèce" }
   ],
   sens:{ verset:"La terre, désormais prête, reçoit l'ordre de produire la végétation : herbes, plantes à graines, arbres fruitiers, chacun « selon son espèce » — une diversité ordonnée, pas un mélange confus.",
     chretiens:"Le principe « selon son espèce », répété plusieurs fois dans ce chapitre, affirme une création stable : les espèces se reproduisent fidèlement à leur nature, sans se transformer les unes dans les autres au hasard.",
     aujourdhui:"Dieu pourvoit à la nourriture avant même de créer les animaux et l'homme : sa providence précède le besoin, elle ne le suit pas." } },

 { v:12, texte:"La terre produisit de la verdure, de l'herbe portant de la semence selon son espèce, et des arbres donnant du fruit et ayant en eux leur semence selon leur espèce. Dieu vit que cela était bon.",
   texteDarby:"Et la terre produisit l’herbe, la plante portant de la semence selon son espèce, et l’arbre produisant du fruit ayant sa semence en soi selon son espèce. Et Dieu vit que cela était bon.",
   mots:[
     { heb:"וַתּוֹצֵא", strong:"H3318", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"produisit" },
     { heb:"דֶּשֶׁא", strong:"H1877", prefixes:[], traduitPar:"de la verdure" },
     { heb:"עֵשֶׂב", strong:"H6212", prefixes:[], traduitPar:"de l'herbe" },
     { heb:"עֵץ", strong:"H6086", prefixes:[], traduitPar:"des arbres" },
     { heb:"טוֹב", strong:"H2895", prefixes:[], traduitPar:"bon" }
   ],
   sens:{ verset:"La terre obéit exactement à l'ordre reçu : ce que Dieu a commandé au verset 11 se réalise mot pour mot au verset 12. Même la terre, matière inerte, répond à la parole de Dieu.",
     chretiens:"Toute la création, y compris la matière non vivante, est représentée comme docile à la parole de Dieu — contrairement à l'homme, qui seul recevra la capacité (et la liberté) de désobéir.",
     aujourdhui:"Si la terre elle-même obéit sans résister à la parole de son Créateur, cela questionne notre propre rapport à cette parole : sommes-nous aussi disposés à répondre que la terre l'a été ?" } },

 { v:13, texte:"Ainsi, il y eut un soir, et il y eut un matin: ce fut le troisième jour.",
   texteDarby:"Et il y eut soir, et il y eut matin: – troisième jour.",
   mots:[
     { heb:"עֶרֶב", strong:"H6153", prefixes:[], traduitPar:"un soir" },
     { heb:"בֹקֶר", strong:"H1242", prefixes:[], traduitPar:"un matin" },
     { heb:"שְׁלִישִׁי", strong:"H3651", prefixes:[], traduitPar:"troisième" }
   ],
   sens:{ verset:"Clôture du troisième jour, qui est en réalité le seul jour à comporter deux actes créateurs distincts (la terre ferme, puis la végétation) — signe d'une abondance particulière accordée à ce jour.",
     chretiens:"La tradition juive note que le troisième jour reçoit deux fois la mention « cela était bon » (v.10 et v.12) : un redoublement de bénédiction qui a nourri une riche réflexion rabbinique et chrétienne sur ce jour.",
     aujourdhui:"Même dans le rythme simple des jours qui passent, il y a une place pour l'abondance et pour plus que le strict nécessaire." } },

 { v:14, texte:"Dieu dit: Qu'il y ait des luminaires dans l'étendue du ciel, pour séparer le jour d'avec la nuit; que ce soient des signes pour marquer les époques, les jours et les années;",
   texteDarby:"Et Dieu dit: Qu’il y ait des luminaires dans l’étendue des cieux pour séparer le jour d’avec la nuit, et qu’ils soient pour signes et pour saisons [déterminées] et pour jours et pour années;",
   mots:[
     { heb:"מְאֹרֹת", strong:"H3974", prefixes:[], traduitPar:"des luminaires" },
     { heb:"לְאֹתֹת", strong:"H0226", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"des signes" },
     { heb:"לְמוֹעֲדִים", strong:"H4150", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"les époques" },
     { heb:"וּלְשָׁנִים", strong:"H8141", prefixes:[{heb:"וּלְ",gloss:"« et pour »"}], traduitPar:"les années" }
   ],
   sens:{ verset:"Quatrième jour : Dieu crée les luminaires (soleil, lune, étoiles) et leur donne une triple fonction — séparer le jour de la nuit, servir de signes, et marquer le temps (saisons, jours, années).",
     chretiens:"En plaçant les astres au quatrième jour seulement, alors que la lumière existe déjà depuis le premier (v.3), le texte affirme avec force que le soleil n'est qu'un instrument du Créateur — une façon de désamorcer d'avance tout culte des astres, très répandu dans l'Antiquité.",
     aujourdhui:"Les astres que tu observes ne sont pas des puissances à redouter ou à vénérer : ce sont des créatures de Dieu, mises à son service pour structurer ton temps." } },

 { v:15, texte:"et qu'ils servent de luminaires dans l'étendue du ciel, pour éclairer la terre. Et cela fut ainsi.",
   texteDarby:"et qu’ils soient pour luminaires dans l’étendue des cieux pour donner de la lumière sur la terre. Et il fut ainsi.",
   mots:[
     { heb:"לִמְאוֹרֹת", strong:"H3974", prefixes:[{heb:"לִ",gloss:"préposition « à / pour »"}], traduitPar:"de luminaires" },
     { heb:"לְהָאִיר", strong:"H0215", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"pour éclairer" }
   ],
   sens:{ verset:"La fonction des luminaires est précisée : éclairer la terre. C'est un service rendu à la terre et, à terme, à ses habitants.",
     chretiens:"Toute la création de ce chapitre converge vers un but : rendre la terre habitable pour la vie, puis pour l'homme. Rien n'est créé pour lui-même, mais en vue de ce qui vient après.",
     aujourdhui:"Même la lumière du jour qui t'éclaire a été voulue avec cette intention précise : rendre ton monde habitable." } },

 { v:16, texte:"Dieu fit les deux grands luminaires, le plus grand luminaire pour présider au jour, et le plus petit luminaire pour présider à la nuit; il fit aussi les étoiles.",
   texteDarby:"Et Dieu fit les deux grands luminaires, le grand luminaire pour dominer sur le jour, et le petit luminaire pour dominer sur la nuit; et les étoiles.",
   mots:[
     { heb:"הַגְּדֹלִים", strong:"H1419", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"grands" },
     { heb:"לְמֶמְשֶׁלֶת", strong:"H4910", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"pour présider" },
     { heb:"הַקָּטֹן", strong:"H6996", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"le plus petit" },
     { heb:"הַכּוֹכָבִים", strong:"H3556", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"les étoiles" }
   ],
   sens:{ verset:"Fait notable : le texte évite soigneusement de nommer « soleil » et « lune » (des noms qui, en hébreu et dans les langues voisines, désignaient aussi des divinités adorées par les peuples entourant Israël) ; il préfère « le grand luminaire » et « le petit luminaire ». Les étoiles, elles, sont ajoutées presque en passant.",
     chretiens:"Ce choix de vocabulaire est une déclaration théologique forte : ce que les nations voisines adoraient comme des dieux, la Genèse le présente comme de simples objets fabriqués par le seul vrai Dieu.",
     aujourdhui:"Rien dans la création, aussi impressionnant soit-il (le soleil, les étoiles), ne mérite d'être adoré à la place de Celui qui l'a fait." } },

 { v:17, texte:"Dieu les plaça dans l'étendue du ciel, pour éclairer la terre,",
   texteDarby:"Et Dieu les plaça dans l’étendue des cieux pour donner de la lumière sur la terre,",
   mots:[
     { heb:"וַיִּתֵּן", strong:"H5414", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"plaça" },
     { heb:"לְהָאִיר", strong:"H0215", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"pour éclairer" }
   ],
   sens:{ verset:"Dieu place lui-même les astres — un geste actif et volontaire, pas un hasard cosmique. Leur position n'est pas accidentelle : Dieu les met où Il veut qu'ils soient.",
     chretiens:"Ce verbe « placer, donner » (natan) souligne que Dieu reste maître de l'ordre cosmique une fois la création achevée : Il ne se contente pas de créer puis de se retirer.",
     aujourdhui:"Le même Dieu qui a placé les astres avec soin place aussi, avec le même soin, les circonstances de ta propre vie." } },

 { v:18, texte:"pour présider au jour et à la nuit, et pour séparer la lumière d'avec les ténèbres. Dieu vit que cela était bon.",
   texteDarby:"et pour dominer de jour et de nuit, et pour séparer la lumière d’avec les ténèbres. Et Dieu vit que cela était bon.",
   mots:[
     { heb:"וְלִמְשֹׁל", strong:"H4910", prefixes:[{heb:"וְלִ",gloss:"« et pour »"}], traduitPar:"pour présider" },
     { heb:"וּלְהַבְדִּיל", strong:"H0914", prefixes:[{heb:"וּלְ",gloss:"« et pour »"}], traduitPar:"pour séparer" },
     { heb:"טוֹב", strong:"H2895", prefixes:[], traduitPar:"bon" }
   ],
   sens:{ verset:"Résumé de la fonction des luminaires, suivi une nouvelle fois du jugement « cela était bon » qui ponctue chaque étape de la création depuis le début du chapitre.",
     chretiens:"La répétition de « cela était bon » à chaque jour construit une progression : le lecteur est invité à voir la création entière comme fondamentalement bonne, avant toute irruption du mal au chapitre 3.",
     aujourdhui:"Le monde tel que Dieu l'a voulu à l'origine est fondamentalement bon : le mal que l'on constate aujourd'hui n'est pas dans le plan initial de Dieu." } },

 { v:19, texte:"Ainsi, il y eut un soir, et il y eut un matin: ce fut le quatrième jour.",
   texteDarby:"Et il y eut soir, et il y eut matin: – quatrième jour.",
   mots:[
     { heb:"רְבִיעִי", strong:"H7235", prefixes:[], traduitPar:"quatrième" }
   ],
   sens:{ verset:"Fin du quatrième jour, consacré entièrement aux luminaires célestes, en écho symétrique au premier jour (consacré à la lumière elle-même).",
     chretiens:"Les commentateurs ont souvent noté cette structure en miroir entre les jours 1-3 (qui préparent des « espaces ») et les jours 4-6 (qui les « remplissent ») : jour 1/lumière ↔ jour 4/luminaires, jour 2/ciel-mers ↔ jour 5/oiseaux-poissons, jour 3/terre ↔ jour 6/animaux terrestres-homme.",
     aujourdhui:"La création tout entière suit un plan cohérent, pensé à l'avance — pas une suite d'improvisations." } },

 { v:20, texte:"Dieu dit: Que les eaux produisent en abondance des animaux vivants, et que des oiseaux volent sur la terre vers l'étendue du ciel.",
   texteDarby:"Et Dieu dit: Que les eaux foisonnent d’un fourmillement d’êtres vivants, et que les oiseaux volent au-dessus de la terre devant l’étendue des cieux.",
   mots:[
     { heb:"יִשְׁרְצוּ", strong:"H8317", prefixes:[], traduitPar:"produisent en abondance" },
     { heb:"שֶׁרֶץ", strong:"H8318", prefixes:[], traduitPar:"des animaux" },
     { heb:"נֶפֶשׁ", strong:"H5315", prefixes:[], traduitPar:"vivants" },
     { heb:"חַיָּה", strong:"H2416", prefixes:[], traduitPar:"vivants" },
     { heb:"וְעוֹף", strong:"H5775", prefixes:[{heb:"וְ",gloss:"conjonction « et »"}], traduitPar:"des oiseaux" },
     { heb:"יְעוֹפֵף", strong:"H5774", prefixes:[], traduitPar:"volent" }
   ],
   sens:{ verset:"Cinquième jour : la vie animale apparaît, d'abord dans les eaux puis dans les airs — remplissant les espaces préparés aux jours 2 et 3 (le ciel et les mers).",
     chretiens:"C'est la toute première apparition du mot « nefesh » (être vivant, âme) dans la Bible, appliqué ici aux animaux : la vie animale, elle aussi, est un don direct de Dieu, pas une simple complexification de la matière.",
     aujourdhui:"La vie, sous toutes ses formes, est un don voulu par Dieu et non un hasard biologique — une bonne raison d'en prendre soin." } },

 { v:21, texte:"Dieu créa les grands poissons et tous les animaux vivants qui se meuvent, et que les eaux produisirent en abondance selon leur espèce; il créa aussi tout oiseau ailé selon son espèce. Dieu vit que cela était bon.",
   texteDarby:"Et Dieu créa les grands animaux des eaux, et tout être vivant qui se meut, dont les eaux fourmillent, selon leurs espèces, et tout oiseau ailé selon son espèce. Et Dieu vit que cela était bon.",
   mots:[
     { heb:"וַיִּבְרָא", strong:"H1254", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"créa" },
     { heb:"הַתַּנִּינִם", strong:"H8577", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"les grands poissons" },
     { heb:"הַגְּדֹלִים", strong:"H1419", prefixes:[{heb:"הַ",gloss:"article défini « le / la / les »"}], traduitPar:"grands" },
     { heb:"כָּל", strong:"H3605", prefixes:[], traduitPar:"tous" },
     { heb:"הָרֹמֶשֶׂת", strong:"H7430", prefixes:[{heb:"הָ",gloss:"article défini « le / la / les »"}], traduitPar:"qui se meuvent" },
     { heb:"כָּנָף", strong:"H3671", prefixes:[], traduitPar:"ailé" }
   ],
   sens:{ verset:"Le verbe « bara » (créer, réservé à Dieu seul) réapparaît ici pour la première fois depuis le verset 1 : la vie animale, comme l'univers lui-même, est un acte de création véritable, pas une simple transformation de matière déjà là.",
     chretiens:"L'emploi de « bara » à trois reprises seulement dans ce chapitre — pour l'univers (v.1), pour la vie animale consciente (ici, v.21) et pour l'homme (v.27) — marque trois degrés d'une même œuvre créatrice, chacun apportant une nouveauté radicale.",
     aujourdhui:"La vie animale consciente n'est pas un simple mécanisme : elle porte, elle aussi, la marque d'un acte créateur voulu par Dieu." } },

 { v:22, texte:"Dieu les bénit, en disant: Soyez féconds, multipliez, et remplissez les eaux des mers; et que les oiseaux multiplient sur la terre.",
   texteDarby:"Et Dieu les bénit, disant: Fructifiez, et multipliez, et remplissez les eaux dans les mers, et que l’oiseau multiplie sur la terre.",
   mots:[
     { heb:"וַיְבָרֶךְ", strong:"H1288", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"bénit" },
     { heb:"פְּרוּ", strong:"H6509", prefixes:[], traduitPar:"soyez féconds" },
     { heb:"וּרְבוּ", strong:"H7235", prefixes:[{heb:"וּ",gloss:"conjonction « et »"}], traduitPar:"multipliez" },
     { heb:"וּמִלְאוּ", strong:"H4390", prefixes:[{heb:"וּ",gloss:"conjonction « et »"}], traduitPar:"remplissez" }
   ],
   sens:{ verset:"Pour la première fois dans la Bible, Dieu « bénit » : il accorde aux créatures vivantes la capacité et l'ordre de se reproduire et de remplir la terre et les mers. La bénédiction divine est ici associée à la fécondité et à la vie qui se transmet.",
     chretiens:"Cette bénédiction de la fécondité sera reprise presque mot pour mot pour l'homme au verset 28 : l'humanité partage avec le reste du vivant cette capacité bénie de se multiplier, sans s'y réduire.",
     aujourdhui:"La capacité de transmettre la vie, quelle qu'en soit la forme, est présentée ici comme une bénédiction voulue par Dieu dès l'origine, et non comme un fardeau." } },

 { v:23, texte:"Ainsi, il y eut un soir, et il y eut un matin: ce fut le cinquième jour.",
   texteDarby:"Et il y eut soir, et il y eut matin: – cinquième jour.",
   mots:[
     { heb:"חֲמִישִׁי", strong:"H8147", prefixes:[], traduitPar:"cinquième" }
   ],
   sens:{ verset:"Clôture du cinquième jour, celui de la première vie animale consciente, qui reçoit aussitôt la bénédiction divine de la fécondité.",
     chretiens:"Ce jour marque un tournant : jusqu'ici, la création concernait la matière et la végétation ; désormais, elle concerne des créatures vivantes, sensibles, bénies par Dieu.",
     aujourdhui:"Chaque étape de la création reçoit son propre temps, sans précipitation : un rythme que l'on peut aussi chercher à respecter dans sa propre vie." } },

 { v:24, texte:"Dieu dit: Que la terre produise des animaux vivants selon leur espèce, du bétail, des reptiles et des animaux terrestres, selon leur espèce. Et cela fut ainsi.",
   texteDarby:"Et Dieu dit: Que la terre produise des êtres vivants selon leur espèce, le bétail, et [tout] ce qui rampe, et les bêtes de la terre selon leur espèce. Et il fut ainsi.",
   mots:[
     { heb:"תּוֹצֵא", strong:"H3318", prefixes:[], traduitPar:"produise" },
     { heb:"נֶפֶשׁ", strong:"H5315", prefixes:[], traduitPar:"des animaux" },
     { heb:"חַיָּה", strong:"H2416", prefixes:[], traduitPar:"vivants" },
     { heb:"בְּהֵמָה", strong:"H0929", prefixes:[], traduitPar:"du bétail" },
     { heb:"וָרֶמֶשׂ", strong:"H7431", prefixes:[{heb:"וָ",gloss:"conjonction « et »"}], traduitPar:"des reptiles" }
   ],
   sens:{ verset:"Sixième jour : la vie terrestre apparaît, remplissant le dernier espace préparé (la terre ferme du troisième jour) — bétail, petites bêtes rampantes, animaux sauvages, chacun selon son espèce.",
     chretiens:"Comme pour la végétation (v.11-12), le principe « selon leur espèce » garantit une diversité stable et voulue, préparant immédiatement l'arrivée de l'être qui va se distinguer de tous ces animaux : l'homme.",
     aujourdhui:"La diversité du vivant qui t'entoure, aussi riche soit-elle, suit un ordre et une intention — ce n'est pas un désordre accumulé par hasard." } },

 { v:25, texte:"Dieu fit les animaux de la terre selon leur espèce, le bétail selon son espèce, et tous les reptiles de la terre selon leur espèce. Dieu vit que cela était bon.",
   texteDarby:"Et Dieu fit les bêtes de la terre selon leur espèce, et le bétail selon son espèce, et tout reptile du sol selon son espèce. Et Dieu vit que cela était bon.",
   mots:[
     { heb:"וַיַּעַשׂ", strong:"H6213", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"fit" },
     { heb:"חַיַּת", strong:"H2416", prefixes:[], traduitPar:"les animaux" },
     { heb:"בְּהֵמָה", strong:"H0929", prefixes:[], traduitPar:"le bétail" },
     { heb:"הָאֲדָמָה", strong:"H0127", prefixes:[{heb:"הָ",gloss:"article défini « le / la / les »"}], traduitPar:"de la terre" },
     { heb:"טוֹב", strong:"H2895", prefixes:[], traduitPar:"bon" }
   ],
   sens:{ verset:"Dieu exécute lui-même ce qu'Il vient d'ordonner, et conclut une nouvelle fois par son jugement d'approbation : « cela était bon ». Le mot « adamah » (le sol, la terre arable) apparaît ici pour la première fois — il annonce par assonance le nom « adam » qui va suivre.",
     chretiens:"Ce lien sonore et conceptuel entre « adamah » (le sol) et « adam » (l'homme) prépare directement le verset 26 et sera explicité en Genèse 2.7 : l'homme est tiré de cette même terre.",
     aujourdhui:"Le monde animal, avant même l'arrivée de l'homme, est déjà déclaré bon par Dieu — sa valeur ne dépend pas de son utilité pour nous." } },

 { v:26, texte:"Puis Dieu dit: Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre.",
   texteDarby:"Et Dieu dit: Faisons [l’]homme à notre image, selon notre ressemblance, et qu’ils dominent sur les poissons de la mer, et sur les oiseaux des cieux, et sur le bétail, et sur toute la terre, et sur tout [animal] rampant qui rampe sur la terre.",
   mots:[
     { heb:"נַעֲשֶׂה", strong:"H6213", prefixes:[], traduitPar:"faisons" },
     { heb:"אָדָם", strong:"H0120", prefixes:[], traduitPar:"l'homme" },
     { heb:"בְּצַלְמֵנוּ", strong:"H6754", prefixes:[{heb:"בְּ",gloss:"préposition « dans / par / avec »"}], traduitPar:"à notre image" },
     { heb:"כִּדְמוּתֵנוּ", strong:"H1823", prefixes:[{heb:"כִּ",gloss:"préposition « comme / selon »"}], traduitPar:"selon notre ressemblance" },
     { heb:"וְיִרְדּוּ", strong:"H7287", prefixes:[{heb:"וְ",gloss:"conjonction « et »"}], traduitPar:"qu'il domine" }
   ],
   sens:{ verset:"Moment charnière du chapitre : pour la première fois, Dieu délibère (« faisons », au pluriel) avant d'agir, et l'homme seul, parmi toutes les créatures, est fait « à l'image » et « à la ressemblance » de Dieu. Il reçoit aussitôt une mission de gouvernance sur le reste du vivant.",
     chretiens:"Ce pluriel « faisons » a été lu très tôt par les chrétiens comme une première trace voilée de la Trinité (Père, Fils, Esprit délibérant ensemble), même si le texte hébreu lui-même reste sobre sur ce point. L'image de Dieu en l'homme fonde toute la dignité humaine dans l'Écriture.",
     aujourdhui:"Chaque être humain, quel qu'il soit, porte en lui cette image de Dieu : c'est la base biblique de la dignité égale de toute personne, et de la responsabilité qui t'est confiée envers la création qui t'entoure." } },

 { v:27, texte:"Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme.",
   texteDarby:"Et Dieu créa l’homme à son image; il le créa à l’image de Dieu; il les créa mâle et femelle.",
   mots:[
     { heb:"וַיִּבְרָא", strong:"H1254", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"créa" },
     { heb:"בְּצַלְמוֹ", strong:"H6754", prefixes:[{heb:"בְּ",gloss:"préposition « dans / par / avec »"}], traduitPar:"à son image" },
     { heb:"זָכָר", strong:"H2145", prefixes:[], traduitPar:"l'homme (mâle)" },
     { heb:"וּנְקֵבָה", strong:"H5347", prefixes:[{heb:"וּ",gloss:"conjonction « et »"}], traduitPar:"et la femme" }
   ],
   sens:{ verset:"Verset solennel, construit en trois lignes parallèles qui martèlent toutes le même verbe « bara » (créer, réservé à Dieu) : l'humanité, homme et femme ensemble, est créée directement à l'image de Dieu — sans intermédiaire, sans dégradation entre les sexes.",
     chretiens:"L'égalité de dignité entre homme et femme, tous deux « à l'image de Dieu », est affirmée ici dès la première page de la Bible, avant toute hiérarchie culturelle qui viendra ensuite avec la chute (chapitre 3).",
     aujourdhui:"Aucun être humain, homme ou femme, n'a plus ou moins l'image de Dieu qu'un autre : c'est un fondement biblique solide contre tout mépris fondé sur le sexe." } },

 { v:28, texte:"Dieu les bénit, et Dieu leur dit: Soyez féconds, multipliez, remplissez la terre, et l'assujettissez; et dominez sur les poissons de la mer, sur les oiseaux du ciel, et sur tout animal qui se meut sur la terre.",
   texteDarby:"Et Dieu les bénit; et Dieu leur dit: Fructifiez, et multipliez, et remplissez la terre et l’assujettissez; et dominez sur les poissons de la mer, et sur les oiseaux des cieux, et sur tout être vivant qui se meut sur la terre.",
   mots:[
     { heb:"וַיְבָרֶךְ", strong:"H1288", prefixes:[{heb:"וַ",gloss:"conjonction « et / alors »"}], traduitPar:"bénit" },
     { heb:"וְכִבְשֻׁהָ", strong:"H3533", prefixes:[{heb:"וְ",gloss:"conjonction « et »"}], traduitPar:"assujettissez" },
     { heb:"וּרְדוּ", strong:"H7287", prefixes:[{heb:"וּ",gloss:"conjonction « et »"}], traduitPar:"dominez" }
   ],
   sens:{ verset:"Dieu bénit le couple humain et lui confie une double mission : se multiplier (comme les animaux au v.22) et « dominer » la terre — un gouvernement voulu, pas un pillage, puisqu'il s'exerce « à l'image » d'un Dieu qui vient de tout déclarer bon.",
     chretiens:"Cette domination (radah, kavash) a souvent été mal comprise comme une autorisation d'exploiter sans limite ; replacée dans son contexte (un Dieu qui bénit et qui a jugé sa création « très bonne », v.31), elle s'apparente davantage à une intendance responsable qu'à une domination destructrice.",
     aujourdhui:"La domination confiée à l'homme est une autorité qui vient de Dieu et qui reste sous son regard : elle engage des comptes à rendre devant Lui, pas un droit d'user de la création à sa guise." } },

 { v:29, texte:"Et Dieu dit: Voici, je vous donne toute herbe portant de la semence et qui est à la surface de toute la terre, et tout arbre ayant en lui du fruit d'arbre et portant de la semence: ce sera votre nourriture.",
   texteDarby:"Et Dieu dit: Voici, je vous ai donné toute plante portant semence, qui est sur la face de toute la terre, et tout arbre dans lequel il y a un fruit d’arbre, portant semence; [cela] vous sera pour nourriture;",
   mots:[
     { heb:"הִנֵּה", strong:"H2009", prefixes:[], traduitPar:"voici" },
     { heb:"נָתַתִּי", strong:"H5414", prefixes:[], traduitPar:"je donne" },
     { heb:"לְאָכְלָה", strong:"H0402", prefixes:[{heb:"לְ",gloss:"préposition « à / pour »"}], traduitPar:"pour nourriture" }
   ],
   sens:{ verset:"Dieu pourvoit directement et explicitement à la nourriture de l'homme : toute plante porteuse de graines, tout arbre fruitier. Le régime originel décrit ici est entièrement végétal.",
     chretiens:"Ce détail alimentaire a nourri une réflexion théologique sur l'état paisible du monde avant la chute (chapitre 3), où la mort et la violence entre créatures n'ont pas encore leur place.",
     aujourdhui:"Dieu se préoccupe concrètement de pourvoir aux besoins essentiels de ce qu'Il crée — un trait de son caractère qui traverse toute la Bible." } },

 { v:30, texte:"Et à tout animal de la terre, à tout oiseau du ciel, et à tout ce qui se meut sur la terre, ayant en soi un souffle de vie, je donne toute herbe verte pour nourriture. Et cela fut ainsi.",
   texteDarby:"et à tout animal de la terre, et à tout oiseau des cieux, et à tout ce qui rampe sur la terre, qui a en soi une âme vivante, [j’ai donné] toute plante verte pour nourriture. Et il fut ainsi.",
   mots:[
     { heb:"נֶפֶשׁ", strong:"H5315", prefixes:[], traduitPar:"souffle de vie" },
     { heb:"חַיָּה", strong:"H2416", prefixes:[], traduitPar:"vie" },
     { heb:"יֶרֶק", strong:"H3418", prefixes:[], traduitPar:"verte" },
     { heb:"עֵשֶׂב", strong:"H6212", prefixes:[], traduitPar:"herbe" }
   ],
   sens:{ verset:"La même provision alimentaire végétale est étendue à tous les animaux : aucune créature, à ce stade de la création, ne se nourrit d'une autre. L'harmonie décrite est totale.",
     chretiens:"Cette vision d'un monde sans prédation rejoint les grandes images prophétiques de la restauration finale, où « le loup habitera avec l'agneau » (Ésaïe 11.6) : la paix originelle de Genèse 1 préfigure la paix promise à la fin des temps.",
     aujourdhui:"Le monde tel qu'il est aujourd'hui, marqué par la violence et la prédation, n'était pas ainsi à l'origine ni ne le restera éternellement selon la promesse biblique : il y a un avant et un après voulus par Dieu." } },

 { v:31, texte:"Dieu vit tout ce qu'il avait fait et voici, cela était très bon. Ainsi, il y eut un soir, et il y eut un matin: ce fut le sixième jour.",
   texteDarby:"Et Dieu vit tout ce qu’il avait fait, et voici, cela était très bon. Et il y eut soir, et il y eut matin: – le sixième jour.",
   mots:[
     { heb:"כָּל", strong:"H3605", prefixes:[], traduitPar:"tout" },
     { heb:"טוֹב", strong:"H2896", prefixes:[], traduitPar:"bon" },
     { heb:"מְאֹד", strong:"H3966", prefixes:[], traduitPar:"très" },
     { heb:"שִׁשִּׁי", strong:"H8147", prefixes:[], traduitPar:"sixième" }
   ],
   sens:{ verset:"Verset de conclusion de toute la semaine de création : après chaque étape jugée simplement « bonne », l'ensemble achevé reçoit la mention supérieure « très bon ». La création entière, prise comme un tout cohérent, dépasse la somme de ses parties.",
     chretiens:"Ce « très bon » final clôt la semaine de création avant le repos du septième jour (chapitre 2) : il affirme que le monde, tel que Dieu l'a voulu à l'origine, ne portait en lui aucune trace du mal qui n'apparaîtra qu'au chapitre suivant.",
     aujourdhui:"Le point de départ de toute l'histoire biblique n'est pas le péché ni le chaos : c'est une création jugée « très bonne » par son Créateur — un bon rappel pour qui ne verrait le monde qu'à travers ce qui ne va pas." } }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GLOSSAIRE_HEBREU, GENESE_1 };
}
