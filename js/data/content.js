/* Données statiques reprises de ui-kit/src/app/data/static/content.data.ts (transpilé). Exposé sous window.DATA. */
"use strict";
var __d = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // data/static/content.data.ts
  var content_data_exports = {};
  __export(content_data_exports, {
    ARTICLES: () => ARTICLES,
    BLOG_CATEGORIES: () => BLOG_CATEGORIES,
    COMMENTS: () => COMMENTS,
    DOCS_NAV: () => DOCS_NAV,
    DOC_PAGE: () => DOC_PAGE,
    FEED_COMMENTS: () => FEED_COMMENTS,
    ME: () => ME,
    PEOPLE: () => PEOPLE
  });
  var PEOPLE = [
    { name: "Jean Kouassi", color: "#0ea5e9", role: "Administrateur" },
    { name: "Aya Kon\xE9", color: "#8b5cf6", role: "Op\xE9rations" },
    { name: "Marc Yao", color: "#10b981", role: "D\xE9veloppeur" },
    { name: "Grace Kouam\xE9", color: "#f59e0b", role: "Designer" },
    { name: "Ibrahim Sanogo", color: "#ef4444", role: "Produit" },
    { name: "Nadia Tour\xE9", color: "#ec4899", role: "R\xE9daction" }
  ];
  var ME = PEOPLE[0];
  var [, AYA, MARC, GRACE, IBRAHIM, NADIA] = PEOPLE;
  var LONG = [
    { type: "lead", text: "Un design system n\u2019est pas une biblioth\xE8que de boutons. C\u2019est un **langage commun** entre designers, d\xE9veloppeurs et m\xE9tiers \u2014 et comme tout langage, il vit, s\u2019use et se r\xE9forme." },
    { type: "p", dropcap: true, text: "Il y a deux ans, notre application comptait quatorze nuances de bleu, neuf tailles de titres et autant de fa\xE7ons d\u2019afficher une date. Chaque \xE9cran \xE9tait coh\xE9rent avec lui-m\xEAme, aucun ne l\u2019\xE9tait avec ses voisins. Les \xE9quipes livraient vite, mais chaque nouvelle page ajoutait un peu plus de dette visuelle." },
    { type: "p", text: "Nous avons alors pris une d\xE9cision simple : avant d\u2019ajouter un composant, nous le cherchons dans le kit. S\u2019il n\u2019existe pas, nous le construisons **dans** le kit, document\xE9 et test\xE9, puis nous l\u2019utilisons." },
    { type: "h2", text: "Commencer par la typographie" },
    { type: "p", text: "La typographie porte 90 % de l\u2019interface. Avant les couleurs, avant les composants, nous avons fix\xE9 une \xE9chelle : un ratio de 1,2 (tierce mineure), arrondi sur une grille de 2 px. Deux familles seulement : *Outfit* pour les titres, *Inter* pour le texte." },
    { type: "table", caption: "\xC9chelle typographique retenue (px).", head: ["R\xF4le", "Taille", "Interlignage", "Graisse"], rows: [
      ["Display", "40", "1,15", "700"],
      ["Titre 1", "32", "1,2", "700"],
      ["Titre 2", "24", "1,25", "600"],
      ["Corps", "14 \u2013 16", "1,55", "400"],
      ["L\xE9gende", "12", "1,4", "400"]
    ] },
    { type: "callout", tone: "info", title: "La mesure compte", text: "Une ligne de texte confortable fait entre **60 et 75 caract\xE8res**. Au-del\xE0, l\u2019\u0153il peine \xE0 retrouver le d\xE9but de la ligne suivante : nous plafonnons le corps de texte \xE0 `68ch`." },
    { type: "h3", text: "Les r\xE8gles de la typographie fran\xE7aise" },
    { type: "p", text: "Le fran\xE7ais a ses propres conventions : espace ins\xE9cable avant les signes doubles, guillemets \xAB chevrons \xBB, apostrophe typographique, s\xE9parateur de milliers en espace fine. Nous les appliquons automatiquement \xE0 la saisie." },
    { type: "list", items: ["Espace fine ins\xE9cable avant `; ! ?` et espace ins\xE9cable avant `:`", "Guillemets \xAB \u2026 \xBB avec espaces ins\xE9cables int\xE9rieures", "Montants : 1 250 000 FCFA, heures : 14 h 05", "Points de suspension en un seul caract\xE8re (\u2026)"] },
    { type: "pullquote", text: "Un composant qui n\u2019est pas document\xE9 n\u2019existe pas. Un composant document\xE9 mais pas utilis\xE9 non plus." },
    { type: "h2", text: "Des jetons plut\xF4t que des valeurs" },
    { type: "p", text: "Chaque couleur est un **r\xF4le**, jamais une valeur : `--primary-color`, `--text-secondary`, `--border-color`. Le mode sombre et les 41 th\xE8mes de couleur deviennent alors un simple changement de jeu de jetons." },
    { type: "code", lang: "scss", filename: "styles/_tokens.scss", code: ":root {\n  --primary-color: var(--mat-sys-primary);\n  --text-primary: #1f2937;\n  --text-secondary: #4b5563;\n  --border-color: #e5e7eb;\n  --radius-card: 24px;\n}\n\n.card {\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-card);\n}" },
    { type: "figure", icon: "palette", hue: 185, wide: true, caption: "Les r\xF4les de couleur Material 3, d\xE9clin\xE9s en clair et en sombre pour chaque th\xE8me." },
    { type: "h2", text: "Mesurer l\u2019adoption" },
    { type: "p", text: "Un kit se juge \xE0 son usage. Chaque mois, nous comptons les composants maison encore pr\xE9sents dans le code et les \xE9carts de style relev\xE9s en revue." },
    { type: "quote", text: "Le jour o\xF9 un nouvel arrivant a livr\xE9 un \xE9cran complet sans \xE9crire une ligne de CSS, nous avons su que le kit avait gagn\xE9.", cite: "Grace Kouam\xE9, lead design" },
    { type: "callout", tone: "success", title: "R\xE9sultat apr\xE8s 18 mois", text: "84 % des \xE9crans n\u2019utilisent que des composants du kit, et le temps moyen de conception d\u2019une page est pass\xE9 de 5 \xE0 2 jours." },
    { type: "divider" },
    { type: "p", text: "Il reste du chemin : l\u2019accessibilit\xE9 des graphiques, la densit\xE9 des tableaux sur mobile, les formulaires tr\xE8s longs. Ce sera l\u2019objet des prochains articles." }
  ];
  var short = (lead, h) => [
    { type: "lead", text: lead },
    { type: "p", text: "Cet article d\u2019exemple illustre la mise en page \xE9ditoriale du kit : chap\xF4, intertitres, listes, encadr\xE9s et citations, avec une mesure de ligne confortable." },
    { type: "h2", text: h },
    { type: "p", text: "Les donn\xE9es sont statiques. Ouvrez l\u2019article principal pour voir l\u2019ensemble des blocs disponibles et le fil de commentaires complet." },
    { type: "callout", tone: "neutral", text: "Astuce : tous les blocs acceptent le Markdown en ligne, **gras**, *italique*, `code` et [liens](#)." }
  ];
  var ARTICLES = [
    {
      slug: "design-system-langage-commun",
      title: "Un design system, c\u2019est d\u2019abord un langage commun",
      dek: "Ce que deux ans de composants partag\xE9s nous ont appris sur la typographie, les jetons et l\u2019adoption.",
      category: "Design",
      tags: ["design system", "typographie", "jetons"],
      author: { name: "Grace Kouam\xE9", role: "Lead design", color: "#f59e0b", bio: "Designer produit \xE0 Abidjan, Grace anime l\u2019\xE9quipe design system et la communaut\xE9 UI Kit." },
      date: "2026-10-14",
      minutes: 8,
      hue: 185,
      icon: "auto_stories",
      featured: true,
      blocks: LONG
    },
    {
      slug: "formulaires-longs-sans-douleur",
      title: "Des formulaires longs, sans douleur",
      dek: "D\xE9couper, enregistrer en continu, valider au bon moment : nos r\xE8gles pour les formulaires de plus de 20 champs.",
      category: "UX",
      tags: ["formulaires", "validation"],
      author: { name: "Nadia Tour\xE9", role: "R\xE9daction", color: "#ec4899" },
      date: "2026-10-09",
      minutes: 6,
      hue: 280,
      icon: "dynamic_form",
      blocks: short("Un formulaire long n\u2019est pas un mauvais formulaire : c\u2019est un formulaire mal d\xE9coup\xE9.", "Une \xE9tape, une intention")
    },
    {
      slug: "mobile-money-paiement",
      title: "Int\xE9grer le Mobile Money dans un tunnel de paiement",
      dek: "Orange Money, MTN MoMo, Wave : concevoir un parcours clair quand la confirmation arrive par SMS.",
      category: "Produit",
      tags: ["paiement", "mobile"],
      author: { name: "Ibrahim Sanogo", role: "Produit", color: "#ef4444" },
      date: "2026-10-02",
      minutes: 5,
      hue: 30,
      icon: "phone_iphone",
      blocks: short("Le paiement mobile est la norme : le tunnel doit l\u2019\xEAtre aussi.", "Attendre la confirmation")
    },
    {
      slug: "mode-sombre-sans-regret",
      title: "Le mode sombre, sans regret",
      dek: "Contrastes, \xE9l\xE9vation, images : les pi\xE8ges du th\xE8me sombre et comment les \xE9viter.",
      category: "Design",
      tags: ["th\xE8me", "accessibilit\xE9"],
      author: { name: "Marc Yao", role: "D\xE9veloppeur", color: "#10b981" },
      date: "2026-09-25",
      minutes: 4,
      hue: 230,
      icon: "dark_mode",
      blocks: short("Inverser les couleurs ne suffit pas.", "L\u2019\xE9l\xE9vation par la lumi\xE8re")
    },
    {
      slug: "tableaux-sur-mobile",
      title: "Que faire des tableaux sur mobile ?",
      dek: "Cartes, colonnes prioritaires, d\xE9filement horizontal : comparaison de quatre strat\xE9gies.",
      category: "UX",
      tags: ["responsive", "tableaux"],
      author: { name: "Aya Kon\xE9", role: "Op\xE9rations", color: "#8b5cf6" },
      date: "2026-09-18",
      minutes: 7,
      hue: 150,
      icon: "table_rows",
      blocks: short("Un tableau de 8 colonnes ne tiendra jamais dans 393 px.", "Choisir ce qui compte")
    },
    {
      slug: "ecrire-pour-interface",
      title: "\xC9crire pour l\u2019interface",
      dek: "Boutons, erreurs, \xE9tats vides : le microtexte est une partie du design.",
      category: "R\xE9daction",
      tags: ["UX writing"],
      author: { name: "Nadia Tour\xE9", role: "R\xE9daction", color: "#ec4899" },
      date: "2026-09-11",
      minutes: 5,
      hue: 340,
      icon: "edit_note",
      blocks: short("Un bon libell\xE9 de bouton dit ce qui va se passer.", "Verbes d\u2019action")
    }
  ];
  var BLOG_CATEGORIES = ["Tous", ...new Set(ARTICLES.map((a) => a.category))];
  var COMMENTS = [
    {
      id: "k1",
      author: GRACE,
      byAuthor: true,
      pinned: true,
      at: "il y a 2 j",
      likes: 24,
      text: "Merci pour vos retours ! Le prochain article portera sur **la densit\xE9 des tableaux sur mobile**. Dites-moi en r\xE9ponse ce que vous aimeriez y voir.",
      reactions: [{ emoji: "\u{1F389}", count: 6 }, { emoji: "\u2764\uFE0F", count: 3 }],
      replies: [
        { id: "k1a", author: MARC, at: "il y a 2 j", likes: 5, text: "Les colonnes fig\xE9es et le d\xE9filement horizontal, surtout avec la s\xE9lection multiple." },
        { id: "k1b", author: AYA, at: "il y a 1 j", likes: 2, text: "@Marc-Yao +1, et les actions group\xE9es : sur mobile on ne sait jamais o\xF9 les mettre." },
        { id: "k1c", author: IBRAHIM, at: "il y a 20 h", likes: 1, text: "Et les filtres ! Une feuille du bas (*bottom sheet*) marche bien chez nous." },
        { id: "k1d", author: GRACE, byAuthor: true, at: "il y a 18 h", likes: 3, text: "Not\xE9, merci \xE0 tous \u{1F64F}" }
      ]
    },
    {
      id: "k2",
      author: MARC,
      at: "il y a 1 j",
      likes: 12,
      text: "Le passage sur les jetons est exactement ce qu\u2019il nous manquait. Petite question : vous g\xE9n\xE9rez les palettes \xE0 la compilation ou \xE0 l\u2019ex\xE9cution ?\n\n```\nnode tools/generate-themes.mjs\n```",
      replies: [
        { id: "k2a", author: GRACE, byAuthor: true, at: "il y a 1 j", likes: 4, text: "\xC0 la compilation pour les 41 th\xE8mes pr\xE9d\xE9finis, \xE0 l\u2019ex\xE9cution pour le **studio de th\xE8me** (couleur personnalis\xE9e)." }
      ]
    },
    {
      id: "k3",
      author: NADIA,
      at: "il y a 9 h",
      likes: 7,
      reactions: [{ emoji: "\u{1F44D}", count: 4 }],
      text: "Bravo pour la partie typographie fran\xE7aise. Les espaces fines avant `?` et `!` sont trop souvent oubli\xE9es."
    },
    { id: "k4", author: AYA, at: "il y a 3 h", likes: 1, text: "Est-ce que le kit est utilisable dans une application Flutter aussi ?" }
  ];
  var FEED_COMMENTS = [
    [
      { id: "f1", author: MARC, at: "il y a 1 h", likes: 3, text: "Super, on teste \xE7a d\xE8s lundi sur l\u2019entrep\xF4t de Vridi." },
      { id: "f2", author: AYA, at: "il y a 40 min", likes: 1, text: "@Marc-Yao je te pr\xE9pare les acc\xE8s." }
    ],
    [{ id: "f3", author: NADIA, at: "il y a 3 h", likes: 2, text: "Les nouvelles illustrations sont magnifiques \u{1F60D}" }],
    []
  ];
  var DOCS_NAV = [
    { label: "Prise en main", icon: "rocket_launch", children: [{ label: "Introduction", slug: "introduction" }, { label: "Installation", slug: "installation", badge: "v2" }, { label: "Th\xE8mes", slug: "themes" }] },
    { label: "Fondations", icon: "foundation", children: [{ label: "Typographie", slug: "typographie" }, { label: "Couleurs", slug: "couleurs" }, { label: "Espacements", slug: "espacements" }] },
    { label: "Composants", icon: "widgets", children: [{ label: "Boutons", slug: "boutons" }, { label: "Formulaires", slug: "formulaires" }, { label: "Commentaires", slug: "commentaires", badge: "Nouveau" }, { label: "Article", slug: "article", badge: "Nouveau" }] },
    { label: "Guides", icon: "menu_book", children: [{ label: "Accessibilit\xE9", slug: "accessibilite" }, { label: "Contribuer", slug: "contribuer" }] }
  ];
  var DOC_PAGE = [
    { type: "lead", text: "`<app-comment-thread>` affiche un fil de discussion complet : saisie, tri, r\xE9ponses imbriqu\xE9es, r\xE9actions, modification et suppression." },
    { type: "h2", text: "Utilisation" },
    { type: "code", lang: "html", filename: "article.component.html", code: '<app-comment-thread\n  [comments]="comments"\n  [me]="currentUser"\n  [mentionables]="team"\n  moderator\n  (changed)="save($event)" />' },
    { type: "p", text: "Le composant garde une copie locale de la liste : les interactions sont imm\xE9diates, et chaque modification est \xE9mise via `changed` pour que l\u2019h\xF4te la persiste." },
    { type: "h2", text: "Propri\xE9t\xE9s" },
    { type: "table", head: ["Entr\xE9e", "Type", "D\xE9faut", "Description"], rows: [
      ["`comments`", "`CommentItem[]`", "`[]`", "Commentaires et r\xE9ponses."],
      ["`me`", "`CommentAuthor`", "`null`", "Utilisateur courant (droits de modification)."],
      ["`mentionables`", "`CommentAuthor[]`", "`[]`", "Personnes propos\xE9es apr\xE8s \xAB @ \xBB."],
      ["`compact`", "`boolean`", "`false`", "Variante resserr\xE9e, saisie en bas."],
      ["`moderator`", "`boolean`", "`false`", "Autorise l\u2019\xE9pinglage."],
      ["`visibleReplies`", "`number`", "`2`", "R\xE9ponses visibles avant \xAB Afficher plus \xBB."]
    ] },
    { type: "h3", text: "Saisie seule" },
    { type: "p", text: "`<app-comment-composer>` peut \xEAtre utilis\xE9 seul : barre de mise en forme Markdown, mentions, aper\xE7u, compteur et envoi par \u2318/Ctrl + Entr\xE9e." },
    { type: "callout", tone: "warning", title: "Contenu utilisateur", text: "Le texte est \xE9chapp\xE9 avant le rendu Markdown : aucun HTML saisi n\u2019est interpr\xE9t\xE9." },
    { type: "h2", text: "Accessibilit\xE9" },
    { type: "list", items: ["Les boutons J\u2019aime et r\xE9actions exposent `aria-pressed`.", "Les mentions se naviguent au clavier (\u2191 \u2193 Entr\xE9e \xC9chap).", "Chaque commentaire a une ancre `#comment-<id>` partageable."] }
  ];
  return __toCommonJS(content_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
