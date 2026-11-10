/* Store du module Harnais (logique de ui-kit/src/app/harnais transpilée, signaux remplacés par un shim). Exposé sous window.Harnais. */
var Harnais = (() => {
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
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // entry.ts
  var entry_exports = {};
  __export(entry_exports, {
    data: () => data,
    store: () => store
  });

  // ng.ts
  function Injectable(_o) {
    return (c) => c;
  }
  function signal(v) {
    const subs = [];
    const s = () => v;
    s.set = (n) => {
      v = n;
      subs.forEach((f) => f());
    };
    s.update = (f) => s.set(f(v));
    s.subscribe = (f) => subs.push(f);
    return s;
  }

  // ../../../../../../home/user/ui-kit/src/app/data/static/harnais.data.ts
  var harnais_data_exports = {};
  __export(harnais_data_exports, {
    HARNAIS_ANSWERABLE: () => HARNAIS_ANSWERABLE,
    HARNAIS_ARTIFACTS: () => HARNAIS_ARTIFACTS,
    HARNAIS_ATTACHABLE: () => HARNAIS_ATTACHABLE,
    HARNAIS_CONTEXT: () => HARNAIS_CONTEXT,
    HARNAIS_CONTEXT_LIMIT: () => HARNAIS_CONTEXT_LIMIT,
    HARNAIS_CONVERSATIONS: () => HARNAIS_CONVERSATIONS,
    HARNAIS_GROUPS: () => HARNAIS_GROUPS,
    HARNAIS_MODELS: () => HARNAIS_MODELS,
    HARNAIS_SUGGESTIONS: () => HARNAIS_SUGGESTIONS,
    HARNAIS_TASKS: () => HARNAIS_TASKS,
    HARNAIS_WIDGET_TYPES: () => HARNAIS_WIDGET_TYPES
  });
  var HARNAIS_WIDGET_TYPES = /* @__PURE__ */ new Set([
    "stats",
    "chart",
    "table",
    "map",
    "form",
    "choices",
    "records",
    "timeline",
    "callout",
    "calendar",
    "kanban",
    "gantt",
    "agenda",
    "tree",
    "carousel",
    "modal",
    "tabs",
    "accordion",
    "steps",
    "keyvalue",
    "checklist",
    "progress",
    "diff",
    "json",
    "sources",
    "tags",
    "heatmap",
    "files",
    "cards",
    "compare",
    "approval",
    "upload",
    "paragraph",
    "typography",
    "article",
    "comments",
    "video",
    "videos",
    "audio",
    "pdf",
    "gallery",
    "image",
    "qrcode",
    "textdiff",
    "audit",
    "result",
    "banner"
  ]);
  var HARNAIS_ANSWERABLE = /* @__PURE__ */ new Set(["choices", "approval", "upload", "tree"]);
  var HARNAIS_GROUPS = ["Aujourd'hui", "Hier", "7 derniers jours", "30 derniers jours"];
  var HARNAIS_MODELS = [
    { id: "opus", label: "Opus 5.5", description: "Le plus capable pour les t\xE2ches complexes", badge: "Pro" },
    { id: "sonnet", label: "Sonnet 5.5", description: "\xC9quilibre id\xE9al pour le quotidien" },
    { id: "haiku", label: "Haiku 5.5", description: "Le plus rapide pour les r\xE9ponses courtes" }
  ];
  var HARNAIS_SUGGESTIONS = [
    { icon: "space_dashboard", label: "Synth\xE8se", prompt: "Fais-moi un tableau de bord complet de l\u2019activit\xE9." },
    { icon: "map", label: "Carte", prompt: "Montre-moi la flotte sur une carte." },
    { icon: "show_chart", label: "Graphique", prompt: "Analyse l\u2019\xE9volution des ventes cette ann\xE9e." },
    { icon: "table_rows", label: "Tableau", prompt: "Liste des clients \xE0 relancer." },
    { icon: "edit_note", label: "Formulaire", prompt: "Je veux cr\xE9er une demande d\u2019intervention." },
    { icon: "calendar_month", label: "Calendrier", prompt: "Affiche le calendrier des interventions." },
    { icon: "view_kanban", label: "Kanban", prompt: "Montre l\u2019avancement des t\xE2ches de l\u2019\xE9quipe." },
    { icon: "timeline", label: "Gantt", prompt: "Montre la feuille de route du d\xE9ploiement." },
    { icon: "account_tree", label: "Arborescence", prompt: "Explore les documents du dossier client." },
    { icon: "difference", label: "Corriger un bug", prompt: "Corrige le bug des alertes de zone en double." },
    { icon: "dynamic_form", label: "Tous les champs", prompt: "Montre-moi tous les champs de formulaire." },
    { icon: "perm_media", label: "M\xE9dias", prompt: "Montre-moi les m\xE9dias : vid\xE9os, audio, PDF et photos." },
    { icon: "text_fields", label: "Typographie", prompt: "Montre-moi l\u2019\xE9chelle typographique." },
    { icon: "apps", label: "Tous les outils", prompt: "Quels outils peux-tu utiliser ?" }
  ];
  var HARNAIS_ATTACHABLE = [
    { name: "app-shell.component.ts", kind: "code", size: "4 Ko" },
    { name: "maquette-sidecar.png", kind: "image", size: "312 Ko" },
    { name: "cahier-des-charges.pdf", kind: "pdf", size: "1,2 Mo" },
    { name: "ventes-T3.xlsx", kind: "sheet", size: "86 Ko" }
  ];
  var SIDECAR_CODE = `import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from './menu.data';

@Component({
  selector: 'app-sidecar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidecar.component.html',
  styleUrl: './sidecar.component.scss',
  host: { '[class.open]': '!!openModule()' },
})
export class SidecarComponent {
  readonly items = input.required<MenuItem[]>();

  /** Module dont la sous-navigation est d\xE9ploy\xE9e (null = rail seul). */
  readonly openId = signal<string | null>(null);
  readonly openModule = computed(() =>
    this.items().find((m) => m._id === this.openId()) ?? null,
  );

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}`;
  var HARNAIS_ARTIFACTS = [
    { id: "art-sidecar", title: "sidecar.component.ts", kind: "code", lang: "typescript", version: 2, content: SIDECAR_CODE },
    {
      id: "art-palette",
      title: "Palette sombre \u2014 notes",
      kind: "document",
      lang: "markdown",
      version: 1,
      content: `# Palette sombre accessible

Fond      #111827   (contraste texte 15,8:1)
Surface   #1f2937
Bordure   #374151
Texte     #f9fafb
Primaire  #4fd8d8   (AA sur surface)

R\xE8gle : chaque couleur d'\xE9tat garde un ratio \u2265 4,5:1 sur la surface.`
    }
  ];
  var HARNAIS_TASKS = [
    { label: "Lire le shell et la galerie de navigation", status: "done" },
    { label: "Fusionner rail et sous-navigation", status: "done" },
    { label: "Animer l\u2019ouverture de la colonne", status: "done" },
    { label: "Extraire un composant r\xE9utilisable", status: "running" },
    { label: "Brancher le Sidecar dans le shell", status: "todo" }
  ];
  var HARNAIS_CONTEXT = [
    { name: "navigation-gallery.component.html", path: "showcase/components/navigation", tokens: 4200, kind: "code" },
    { name: "navigation-gallery.component.scss", path: "showcase/components/navigation", tokens: 3100, kind: "code" },
    { name: "menu.data.ts", path: "layouts/app-shell", tokens: 900, kind: "code" },
    { name: "maquette-sidecar.png", path: "pi\xE8ce jointe", tokens: 1600, kind: "image" }
  ];
  var HARNAIS_CONTEXT_LIMIT = 2e5;
  var reply = (id, time, text) => ({ id, role: "assistant", time, blocks: [{ type: "text", text }] });
  var ask = (id, time, text) => ({ id, role: "user", time, blocks: [{ type: "text", text }] });
  var HARNAIS_CONVERSATIONS = [
    {
      id: "c-sidecar",
      title: "Sidecar de navigation Angular",
      group: "Aujourd'hui",
      pinned: true,
      project: "UI Kit",
      model: "opus",
      messages: [
        {
          id: "m1",
          role: "user",
          time: "09:12",
          attachments: [{ name: "maquette-sidecar.png", kind: "image", size: "312 Ko" }],
          blocks: [{ type: "text", text: "Combine le rail d\u2019ic\xF4nes et la sous-navigation de module en un seul Sidecar. Par d\xE9faut on ne voit que le rail ; au clic sur une ic\xF4ne, elle s\u2019active et une seconde colonne s\u2019ouvre avec les sous-menus." }]
        },
        {
          id: "m2",
          role: "assistant",
          time: "09:13",
          feedback: "up",
          blocks: [
            { type: "thinking", duration: "6 s", text: "Le rail et la sous-navigation partagent d\xE9j\xE0 les m\xEAmes tokens (surface, rayon, couleurs actives). Le plus simple est un conteneur unique dont la largeur s\u2019anime entre \xAB rail seul \xBB et \xAB rail + panneau \xBB, avec un panneau \xE0 largeur fixe pour \xE9viter que le contenu se recompose pendant la transition." },
            { type: "tool", tool: "search", label: "Recherche", target: "components/navigation", status: "done", output: "3 fichiers trouv\xE9s" },
            { type: "tool", tool: "read", label: "Lecture", target: "navigation-gallery.component.html", status: "done", output: "308 lignes" },
            { type: "tool", tool: "edit", label: "Modification", target: "navigation-gallery.component.scss", status: "done", output: "+62 \u221248" },
            { type: "tool", tool: "bash", label: "Terminal", target: "ng build --configuration development", status: "done", output: "Application bundle generation complete. [24.9 s]" },
            { type: "text", text: "C\u2019est fait : le Sidecar remplace les deux d\xE9mos. Voici le comportement :" },
            { type: "list", items: [
              "Par d\xE9faut, seul le rail est visible (logo, ic\xF4nes, avatar).",
              "Un clic sur une ic\xF4ne l\u2019active et d\xE9ploie une colonne de `248px` avec les sous-menus du module.",
              "Re-cliquer sur l\u2019ic\xF4ne ou sur le chevron replie la colonne."
            ] },
            { type: "text", text: "J\u2019ai aussi extrait la logique dans un composant autonome, pr\xEAt \xE0 \xEAtre branch\xE9 dans le shell :" },
            { type: "artifact", artifactId: "art-sidecar" }
          ]
        },
        { id: "m3", role: "user", time: "09:20", blocks: [{ type: "text", text: "Parfait. Comment je l\u2019utilise dans le shell ?" }] },
        {
          id: "m4",
          role: "assistant",
          time: "09:20",
          blocks: [
            { type: "text", text: "Remplace le bloc `.nav-rail` du shell par le composant et passe-lui le menu :" },
            { type: "code", lang: "html", file: "app-shell.component.html", code: `<mat-sidenav class="shell-sidenav" [opened]="!isMobile()">
  <app-sidecar [items]="menuItems" />
</mat-sidenav>` },
            { type: "text", text: "Pense \xE0 mettre le sidenav en `autosize` sur le conteneur pour que le contenu suive l\u2019ouverture de la colonne." }
          ]
        }
      ]
    },
    {
      id: "c-palette",
      title: "Palette sombre accessible",
      group: "Aujourd'hui",
      project: "UI Kit",
      model: "sonnet",
      messages: [
        ask("p1", "08:02", "Propose une palette sombre qui respecte le contraste AA avec notre couleur primaire teal."),
        { id: "p2", role: "assistant", time: "08:03", blocks: [
          { type: "text", text: "Voici une base test\xE9e : chaque couleur garde un ratio d\u2019au moins 4,5:1 sur la surface." },
          { type: "artifact", artifactId: "art-palette" }
        ] }
      ]
    },
    {
      id: "c-csv",
      title: "Export CSV des factures",
      group: "Hier",
      model: "sonnet",
      messages: [
        ask("x1", "17:40", "Comment exporter un tableau Material en CSV sans d\xE9pendance ?"),
        { id: "x2", role: "assistant", time: "17:41", blocks: [
          { type: "text", text: "Construis les lignes \xE0 partir de la source de donn\xE9es puis d\xE9clenche un t\xE9l\xE9chargement via un `Blob` :" },
          { type: "code", lang: "typescript", code: `const csv = [cols.join(';'), ...rows.map((r) => cols.map((c) => r[c]).join(';'))].join('\\n');
const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));` }
        ] }
      ]
    },
    {
      id: "c-reunion",
      title: "R\xE9sum\xE9 r\xE9union produit",
      group: "Hier",
      model: "haiku",
      messages: [
        ask("r1", "11:05", "R\xE9sume les d\xE9cisions de la r\xE9union produit en cinq points."),
        { id: "r2", role: "assistant", time: "11:05", blocks: [{ type: "list", items: [
          "Le Sidecar devient la navigation par d\xE9faut.",
          "Les pages m\xE9tiers sont retir\xE9es du kit.",
          "Le mode sombre est prioritaire pour la v2.",
          "Les d\xE9mos restent 100 % statiques.",
          "Revue d\u2019accessibilit\xE9 avant la fin du mois."
        ] }] }
      ]
    },
    {
      id: "c-migration",
      title: "Migration Angular 21",
      group: "7 derniers jours",
      project: "UI Kit",
      model: "opus",
      messages: [
        ask("g1", "Lun.", "Quelles sont les \xE9tapes pour migrer le kit vers Angular 21 ?"),
        reply("g2", "Lun.", "Lance `ng update @angular/core @angular/cli`, puis migre le contr\xF4le de flux vers `@if` / `@for` et v\xE9rifie les modules Material d\xE9pr\xE9ci\xE9s.")
      ]
    },
    {
      id: "c-sql",
      title: "Requ\xEAtes SQL lentes",
      group: "7 derniers jours",
      model: "sonnet",
      messages: [
        ask("s1", "Mar.", "Pourquoi ma requ\xEAte avec un LIKE '%abc%' est-elle lente ?"),
        reply("s2", "Mar.", "Un joker en t\xEAte emp\xEAche l\u2019usage d\u2019un index B-tree. Utilise un index trigramme ou une recherche plein texte.")
      ]
    },
    {
      id: "c-e2e",
      title: "Plan de tests e2e",
      group: "30 derniers jours",
      model: "haiku",
      messages: [
        ask("e1", "2 oct.", "Liste les parcours critiques \xE0 couvrir en e2e."),
        reply("e2", "2 oct.", "Connexion, navigation dans le shell, ouverture du drawer de compte et bascule du th\xE8me.")
      ]
    }
  ];

  // ../../../../../../home/user/ui-kit/src/app/data/static/map.data.ts
  var FLOTTE = [
    { id: "v1", lat: 5.3237, lng: -4.0193, title: "CI-4521-AB \xB7 Toyota Hilux", lines: ["En mouvement \xB7 54 km/h", "Plateau, bd de la R\xE9publique"], icon: "local_shipping", tone: "success", pulse: true, heading: 120, tooltip: "CI-4521-AB" },
    { id: "v2", lat: 5.36, lng: -3.99, title: "CI-2210-CD \xB7 Renault Kangoo", lines: ["\xC0 l\u2019arr\xEAt depuis 12 min", "Cocody, Riviera 2"], icon: "airport_shuttle", tone: "warning", tooltip: "CI-2210-CD" },
    { id: "v3", lat: 5.345, lng: -4.08, title: "CI-3307-EF \xB7 Suzuki Swift", lines: ["En mouvement \xB7 38 km/h", "Yopougon, Selmer"], icon: "directions_car", tone: "success", pulse: true, heading: 40, tooltip: "CI-3307-EF" },
    { id: "v4", lat: 5.303, lng: -3.985, title: "CI-0418-GH \xB7 Yamaha Crux", lines: ["Hors ligne depuis 2 j", "Marcory, zone 4"], icon: "two_wheeler", tone: "error", tooltip: "CI-0418-GH" },
    { id: "v5", lat: 5.293, lng: -4.005, title: "CI-7781-JK \xB7 Mercedes Actros", lines: ["Moteur coup\xE9", "Treichville, port"], icon: "local_shipping", tone: "neutral", tooltip: "CI-7781-JK" },
    { id: "v6", lat: 5.418, lng: -4.02, title: "CI-1150-LM \xB7 Toyota Coaster", lines: ["En mouvement \xB7 61 km/h", "Abobo, gare"], icon: "directions_bus", tone: "success", pulse: true, heading: 200, tooltip: "CI-1150-LM" },
    { id: "v7", lat: 5.255, lng: -3.93, title: "CI-9902-NP \xB7 Isuzu D-Max", lines: ["Alerte : sortie de zone", "Port-Bou\xEBt, a\xE9roport"], icon: "warning", tone: "error", pulse: true, tooltip: "CI-9902-NP" },
    { id: "v8", lat: 5.297, lng: -3.948, title: "CI-6630-QR \xB7 Peugeot Partner", lines: ["En maintenance", "Koumassi, atelier"], icon: "build", tone: "info", tooltip: "CI-6630-QR" }
  ];
  var POSITIONS_DENSES = (() => {
    const centres = [[5.33, -4.02, 0.06], [7.69, -5.03, 0.05], [4.75, -6.64, 0.04], [6.82, -5.28, 0.04], [9.45, -5.63, 0.03]];
    let seed = 7;
    const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
    const out = [];
    centres.forEach(([lat, lng, spread], ci) => {
      const n = ci === 0 ? 220 : 50;
      for (let i = 0; i < n; i++) {
        const r = rnd();
        out.push({ id: `p${ci}-${i}`, lat: lat + (rnd() - 0.5) * spread * 2, lng: lng + (rnd() - 0.5) * spread * 2, icon: "sensors", tone: r > 0.9 ? "error" : r > 0.75 ? "warning" : "success", title: `Balise #${1e3 + out.length}`, lines: [r > 0.9 ? "Hors ligne" : "En ligne"] });
      }
    });
    return out;
  })();

  // ../../../../../../home/user/ui-kit/src/app/data/static/content.data.ts
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

  // ../../../../../../home/user/ui-kit/src/app/harnais/harnais.toolkit.ts
  var day = (offset, hour = 9) => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(hour, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  };
  var X = {
    // ─── Navigation dans l'information ─────────────────────────────
    documentsTree: () => ({
      type: "tree",
      title: "Documents du dossier client",
      subtitle: "Bollor\xE9 Logistics CI \xB7 cochez ce qu\u2019il faut inclure",
      icon: "account_tree",
      selectable: true,
      submitLabel: "G\xE9n\xE9rer le rapport avec ces pi\xE8ces",
      nodes: [
        { id: "contrats", label: "Contrats", icon: "folder", children: [
          { id: "c1", label: "CTR-2026-0042.pdf", icon: "picture_as_pdf", meta: "1,2 Mo", badge: { label: "Sign\xE9", tone: "success" } },
          { id: "c2", label: "Avenant n\xB01.pdf", icon: "picture_as_pdf", meta: "340 Ko", badge: { label: "En attente", tone: "warning" } }
        ] },
        { id: "factures", label: "Factures", icon: "folder", children: [
          { id: "f1", label: "FAC-2026-0911.pdf", icon: "receipt_long", meta: "4 850 000 F", badge: { label: "Impay\xE9e", tone: "error" } },
          { id: "f2", label: "FAC-2026-0874.pdf", icon: "receipt_long", meta: "2 100 000 F" },
          { id: "f3", label: "FAC-2026-0812.pdf", icon: "receipt_long", meta: "1 980 000 F" }
        ] },
        { id: "interventions", label: "Interventions", icon: "folder", children: [
          { id: "i1", label: "Rapport INT-0409.pdf", icon: "build", meta: "12/10" },
          { id: "i2", label: "Photos installation", icon: "folder", children: [
            { id: "p1", label: "cabine.jpg", icon: "image", meta: "2,4 Mo" },
            { id: "p2", label: "boitier.jpg", icon: "image", meta: "1,9 Mo" }
          ] }
        ] }
      ]
    }),
    apiJson: () => ({
      type: "json",
      title: "R\xE9ponse de l\u2019API v\xE9hicule",
      subtitle: "GET /vehicules/CI-9902-NP \xB7 200 OK \xB7 84 ms",
      icon: "data_object",
      data: {
        immatriculation: "CI-9902-NP",
        modele: "Isuzu D-Max",
        enLigne: true,
        vitesse: 0,
        position: { lat: 5.255, lng: -3.93, precision: 6 },
        alertes: [{ code: "GEOFENCE_EXIT", niveau: "critique", heure: "10:05" }],
        capteurs: { carburant: 62, batterie: 12.6, temperatureMoteur: 88 }
      }
    }),
    offersCarousel: () => ({
      type: "carousel",
      title: "Nos offres de suivi",
      subtitle: "4 formules \xB7 faites d\xE9filer",
      icon: "view_carousel",
      slides: [
        { title: "Suivi essentiel", tag: "Le plus vendu", icon: "gps_fixed", tone: "primary", text: "Position en temps r\xE9el, historique 90 jours et alertes de zone pour les flottes l\xE9g\xE8res.", stats: [{ label: "Prix", value: "9 900 F/mois" }, { label: "Clients", value: "312" }] },
        { title: "Poids lourds", tag: "Transport", image: "assets/camion.png", tone: "info", text: "Sondes carburant, temps de conduite et rapports chronotachygraphe.", stats: [{ label: "Prix", value: "18 500 F/mois" }, { label: "\xC9conomie", value: "\u221214 % carburant" }] },
        { title: "Vid\xE9o embarqu\xE9e", icon: "videocam", tone: "purple", text: "Cam\xE9ra double face, d\xE9tection de fatigue et extraits vid\xE9o sur incident.", stats: [{ label: "Prix", value: "24 000 F/mois" }] },
        { title: "Anti-d\xE9marrage", icon: "lock", tone: "error", text: "Coupure moteur \xE0 distance et d\xE9verrouillage par badge chauffeur.", stats: [{ label: "Option", value: "+4 500 F/mois" }] }
      ]
    }),
    clientModal: () => ({
      type: "modal",
      title: "Fiche client compl\xE8te",
      icon: "business",
      summary: "Bollor\xE9 Logistics CI \xB7 48 v\xE9hicules suivis \xB7 encours de 4 850 000 FCFA, dont une facture en retard de 47 jours.",
      button: "Ouvrir la fiche",
      dialogTitle: "Bollor\xE9 Logistics CI",
      dialogSubtitle: "Client depuis mars 2021 \xB7 Abidjan, Plateau",
      blocks: [
        X.clientIdentity(),
        { type: "stats", items: [
          { label: "V\xE9hicules", value: "48", icon: "local_shipping", tone: "primary", spark: [38, 40, 41, 44, 45, 48] },
          { label: "Encours", value: "4,85 M", icon: "account_balance_wallet", tone: "error", delta: "+1,2 M", trend: "up" },
          { label: "Satisfaction", value: "4,6 / 5", icon: "sentiment_satisfied", tone: "success" }
        ] },
        { type: "timeline", title: "Derniers \xE9changes", items: [
          { time: "12/10", title: "Relance facture FAC-0911", text: "Par e-mail, sans r\xE9ponse", tone: "warning", icon: "mail" },
          { time: "08/10", title: "Intervention INT-0409 cl\xF4tur\xE9e", tone: "success", icon: "build" },
          { time: "02/10", title: "Appel du responsable flotte", text: "Demande de 6 balises suppl\xE9mentaires", tone: "info", icon: "call" }
        ] }
      ]
    }),
    clientIdentity: () => ({
      type: "keyvalue",
      title: "Identit\xE9",
      icon: "badge",
      items: [
        { label: "Raison sociale", value: "Bollor\xE9 Logistics CI", icon: "business" },
        { label: "Compte", value: "CLI-002", mono: true, copy: true },
        { label: "RCCM", value: "CI-ABJ-2003-B-1234", mono: true, copy: true },
        { label: "Contact", value: "Mme Aya Diallo", icon: "person" },
        { label: "T\xE9l\xE9phone", value: "+225 07 07 45 12 98", icon: "call", copy: true },
        { label: "Statut", value: "Retard de paiement", icon: "warning", tone: "error" }
      ]
    }),
    clientTabs: () => ({
      type: "tabs",
      title: "Dossier Bollor\xE9 Logistics CI",
      subtitle: "Toutes les informations, par onglet",
      icon: "folder_shared",
      tabs: [
        { label: "Aper\xE7u", icon: "dashboard", blocks: [
          { type: "stats", items: [
            { label: "CA annuel", value: "58,2 M", tone: "primary", icon: "payments", spark: [3.9, 4.4, 4.1, 4.8, 5.2, 5.6, 5.1, 5.9] },
            { label: "V\xE9hicules", value: "48", tone: "success", icon: "local_shipping", spark: [38, 40, 41, 44, 45, 48] },
            { label: "Tickets ouverts", value: "3", tone: "warning", icon: "support_agent", spark: [6, 5, 7, 4, 3, 3] }
          ] },
          { type: "paragraph", text: "Client strat\xE9gique : il repr\xE9sente 12 % du CA de la r\xE9gion d\u2019Abidjan. Le retard de paiement est r\xE9cent et li\xE9 \xE0 un changement d\u2019interlocuteur comptable." }
        ] },
        { label: "Factures", icon: "receipt_long", badge: "3", blocks: [
          { type: "table", columns: [
            { key: "num", label: "N\xB0", kind: "mono" },
            { key: "date", label: "Date" },
            { key: "montant", label: "Montant", kind: "number", unit: " F" },
            { key: "statut", label: "Statut", kind: "badge", tones: { Pay\u00E9e: "success", Impay\u00E9e: "error", Partielle: "warning" } }
          ], rows: [
            { num: "FAC-0911", date: "28/08", montant: 485e4, statut: "Impay\xE9e" },
            { num: "FAC-0874", date: "28/07", montant: 21e5, statut: "Partielle" },
            { num: "FAC-0812", date: "28/06", montant: 198e4, statut: "Pay\xE9e" }
          ] }
        ] },
        { label: "Contacts", icon: "contacts", blocks: [
          { type: "records", items: [
            { id: "ct1", title: "Aya Diallo", subtitle: "Responsable flotte", meta: "principal", initials: "AD", tone: "primary", tags: ["D\xE9cisionnaire"] },
            { id: "ct2", title: "Marc Kouadio", subtitle: "Comptabilit\xE9 fournisseurs", meta: "nouveau", initials: "MK", tone: "warning", badge: { label: "\xC0 contacter", tone: "warning" } }
          ] }
        ] },
        { label: "Historique", icon: "history", blocks: [
          { type: "timeline", items: [
            { time: "2021", title: "Signature du premier contrat", tone: "success", icon: "handshake" },
            { time: "2024", title: "Extension \xE0 40 v\xE9hicules", tone: "info", icon: "trending_up" },
            { time: "2026", title: "Passage \xE0 l\u2019offre Poids lourds", tone: "primary", icon: "local_shipping" }
          ] }
        ] }
      ]
    }),
    faqAccordion: () => ({
      type: "accordion",
      title: "Questions fr\xE9quentes",
      subtitle: "Balises GPS et abonnements",
      icon: "quiz",
      items: [
        { title: "Combien de temps dure une installation ?", icon: "schedule", open: true, blocks: [
          { type: "paragraph", text: "Comptez 45 \xE0 90 minutes par v\xE9hicule selon les options. Le v\xE9hicule reste immobilis\xE9 pendant toute la dur\xE9e." },
          { type: "progress", items: [{ label: "Balise seule", value: 45, target: 90, unit: " min", tone: "success" }, { label: "Balise + cam\xE9ra", value: 90, target: 90, unit: " min", tone: "warning" }] }
        ] },
        { title: "Que se passe-t-il en cas de perte de r\xE9seau ?", icon: "signal_cellular_off", blocks: [
          { type: "paragraph", text: "La balise stocke jusqu\u2019\xE0 30 jours de positions et les renvoie d\xE8s que le r\xE9seau revient." }
        ] },
        { title: "Quels documents fournir ?", icon: "description", blocks: [
          { type: "checklist", items: [{ label: "Carte grise du v\xE9hicule", done: true }, { label: "Pi\xE8ce d\u2019identit\xE9 du g\xE9rant", done: true }, { label: "Bon de commande sign\xE9" }] }
        ] }
      ]
    }),
    // ─── Précision ─────────────────────────────────────────────────
    onboardingSteps: () => ({
      type: "steps",
      title: "Mise en service d\u2019un nouveau client",
      icon: "linear_scale",
      steps: [
        { label: "Contrat sign\xE9", text: "02/10", status: "done" },
        { label: "Pi\xE8ces re\xE7ues", text: "05/10", status: "done" },
        { label: "Installation", text: "en cours", status: "current" },
        { label: "Formation", status: "todo" },
        { label: "Recette", status: "todo" }
      ]
    }),
    installChecklist: () => ({
      type: "checklist",
      title: "Contr\xF4les avant installation",
      subtitle: "Cochez au fur et \xE0 mesure",
      icon: "checklist",
      items: [
        { label: "V\xE9hicule disponible sur site", done: true, hint: "confirm\xE9" },
        { label: "Batterie > 12,2 V", done: true },
        { label: "Emplacement bo\xEEtier valid\xE9 avec le client" },
        { label: "Carte SIM activ\xE9e", hint: "ICCID requis" },
        { label: "Photos avant / apr\xE8s" }
      ]
    }),
    objectives: () => ({
      type: "progress",
      title: "Objectifs du trimestre",
      subtitle: "T4 2026 \xB7 au 14 octobre",
      icon: "track_changes",
      items: [
        { label: "Nouvelles installations", value: 142, target: 200, tone: "primary" },
        { label: "Chiffre d\u2019affaires", value: 291, target: 320, unit: " M", tone: "success" },
        { label: "Taux de r\xE9solution J+1", value: 87, target: 95, unit: " %", tone: "warning" },
        { label: "Recouvrement", value: 61, target: 90, unit: " %", tone: "error" }
      ]
    }),
    activityHeatmap: () => {
      const cols = Array.from({ length: 12 }, (_, i) => `${7 + i}h`);
      const rows = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
      let seed = 11;
      const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
      const values = rows.map((_, r) => cols.map((_2, c) => Math.round((r > 4 ? 0.25 : 1) * (c > 1 && c < 10 ? 1 : 0.4) * (20 + rnd() * 80))));
      return { type: "heatmap", title: "Activit\xE9 des v\xE9hicules", subtitle: "Trajets d\xE9marr\xE9s par heure \xB7 4 derni\xE8res semaines", icon: "grid_on", rows, cols, values, unit: " trajets" };
    },
    usageStats: () => ({ type: "stats", items: [
      { label: "Trajets / jour", value: "386", delta: "+6 %", trend: "up", tone: "primary", icon: "route", spark: [320, 335, 341, 352, 360, 371, 386] },
      { label: "Heure de pointe", value: "8 h \u2013 9 h", tone: "info", icon: "schedule", hint: "lun. \u2013 ven." },
      { label: "Temps moteur \xE0 l\u2019arr\xEAt", value: "11 %", delta: "\u22123 pt", trend: "down", tone: "success", icon: "local_gas_station", spark: [16, 15, 14, 14, 13, 12, 11] }
    ] }),
    codeDiff: () => ({
      type: "diff",
      title: "Correctif propos\xE9",
      subtitle: "Alerte de zone d\xE9clench\xE9e deux fois",
      icon: "difference",
      file: "src/app/alertes/geofence.service.ts",
      patch: `@@ -38,9 +38,12 @@ export class GeofenceService {
   check(position: Position, zone: Zone): void {
     const inside = zone.contains(position);
-    if (!inside) {
-      this.alertes.emit({ code: 'GEOFENCE_EXIT', vehicule: position.vehicule });
-    }
+    const wasInside = this.state.get(position.vehicule) ?? true;
+    // On n'alerte qu'au franchissement, pas \xE0 chaque position hors zone.
+    if (wasInside && !inside) {
+      this.alertes.emit({ code: 'GEOFENCE_EXIT', vehicule: position.vehicule });
+    }
+    this.state.set(position.vehicule, inside);
   }`
    }),
    approvalTests: () => ({
      type: "approval",
      risk: "warning",
      title: "Autoriser l\u2019ex\xE9cution de cette commande ?",
      text: "Je dois lancer les tests du service d\u2019alertes pour v\xE9rifier le correctif. Aucun fichier ne sera modifi\xE9.",
      command: "npm run test -- --include=src/app/alertes/**"
    }),
    webSources: () => ({
      type: "sources",
      title: "Sources consult\xE9es",
      subtitle: "4 r\xE9sultats pertinents",
      icon: "travel_explore",
      items: [
        { site: "artci.ci", date: "sept. 2026", title: "Cadre r\xE9glementaire des donn\xE9es de g\xE9olocalisation", snippet: "Les donn\xE9es de position des v\xE9hicules professionnels sont des donn\xE9es personnelles d\xE8s lors qu\u2019elles permettent d\u2019identifier un conducteur\u2026" },
        { site: "transports.gouv.ci", date: "ao\xFBt 2026", title: "Obligation de chronotachygraphe pour les poids lourds", snippet: "\xC0 compter de janvier 2027, tout v\xE9hicule de plus de 3,5 t affect\xE9 au transport de marchandises\u2026" },
        { site: "jeuneafrique.com", date: "juil. 2026", title: "La t\xE9l\xE9matique s\u2019impose dans la logistique ouest-africaine" },
        { site: "iso.org", title: "ISO 15638 \u2014 Cadre des applications t\xE9l\xE9matiques coop\xE9ratives" }
      ]
    }),
    topicTags: () => ({
      type: "tags",
      title: "Th\xE8mes d\xE9tect\xE9s",
      icon: "sell",
      items: [
        { label: "Donn\xE9es personnelles", count: 12, tone: "error" },
        { label: "Chronotachygraphe", count: 8, tone: "warning" },
        { label: "Poids lourds", count: 7, tone: "info" },
        { label: "Consentement", count: 5, tone: "purple" },
        { label: "Conservation 12 mois", count: 3, tone: "primary" },
        { label: "ARTCI", count: 3, tone: "neutral" }
      ]
    }),
    reportFiles: () => ({
      type: "files",
      title: "Fichiers g\xE9n\xE9r\xE9s",
      subtitle: "Pr\xEAts \xE0 \xEAtre envoy\xE9s",
      icon: "folder",
      items: [
        { name: "Rapport-Bollore-T4.pdf", ext: "pdf", size: "2,8 Mo", date: "\xE0 l\u2019instant", by: "Harnais" },
        { name: "Encours-clients.xls", ext: "xls", size: "84 Ko", date: "\xE0 l\u2019instant", by: "Harnais" },
        { name: "Trajets-octobre.csv", ext: "csv", size: "1,1 Mo", date: "\xE0 l\u2019instant", by: "Harnais" }
      ]
    }),
    offerCards: () => ({
      type: "cards",
      title: "\xC9quipements recommand\xE9s",
      subtitle: "Pour une flotte mixte de 48 v\xE9hicules",
      icon: "grid_view",
      items: [
        { title: "Balise GT-06", icon: "gps_fixed", tone: "primary", text: "GPS + GSM, batterie de secours 8 h.", price: "45 000 F", meta: "en stock", tags: ["4G", "IP67"], cta: "Ajouter" },
        { title: "Sonde carburant", icon: "local_gas_station", tone: "warning", text: "Mesure capacitive \xB11 %.", price: "120 000 F", meta: "5 j", tags: ["Poids lourds"], cta: "Ajouter" },
        { title: "Cam\xE9ra DC-2", icon: "videocam", tone: "purple", text: "Double face, d\xE9tection de fatigue.", price: "185 000 F", meta: "en stock", cta: "Ajouter" },
        { title: "Lecteur de badge", icon: "badge", tone: "info", text: "Identification du chauffeur.", price: "32 000 F", meta: "10 j", cta: "Ajouter" }
      ]
    }),
    plansCompare: () => ({
      type: "compare",
      title: "Comparatif des formules",
      subtitle: "Prix par v\xE9hicule et par mois",
      icon: "compare",
      plans: [
        { name: "Essentiel", price: "9 900 F" },
        { name: "Pro", price: "14 500 F", note: "le meilleur rapport", recommended: true },
        { name: "Poids lourds", price: "18 500 F" }
      ],
      features: [
        { label: "Position temps r\xE9el", values: [true, true, true] },
        { label: "Historique", values: ["90 j", "12 mois", "24 mois"] },
        { label: "Alertes de zone", values: [true, true, true] },
        { label: "Rapports automatiques", values: [false, true, true] },
        { label: "Sonde carburant", values: [false, "option", true] },
        { label: "Chronotachygraphe", values: [false, false, true] },
        { label: "Support", values: ["e-mail", "7j/7", "d\xE9di\xE9"] }
      ]
    }),
    // ─── Interaction ───────────────────────────────────────────────
    uploadRequest: () => ({
      type: "upload",
      title: "Fichier \xE0 analyser",
      subtitle: "Export de trajets, factures ou liste de v\xE9hicules",
      icon: "upload_file",
      accept: ".csv,.xlsx,.xls,.pdf,.json",
      hint: "CSV, Excel, PDF ou JSON \xB7 lu localement, rien n\u2019est envoy\xE9 sur un serveur."
    }),
    weekAgenda: () => ({
      type: "agenda",
      title: "Agenda de la semaine",
      subtitle: "Awa Kon\xE9 \xB7 technicienne",
      icon: "today",
      items: weekItems()
    }),
    // ─── Formulaire : tous les types de champs du kit ─────────────
    /** Champs Material de /components/forms. */
    materialFieldsForm: () => ({
      type: "form",
      formId: "champs-material",
      title: "Ouverture de compte client",
      subtitle: "Champs standard \xB7 /components/forms",
      icon: "edit_note",
      description: "Tous les champs Material du kit, avec validation.",
      submitLabel: "Cr\xE9er le compte",
      fields: [
        { key: "raison", label: "Raison sociale", kind: "text", icon: "business", required: true, placeholder: "Transports Yao SARL" },
        { key: "email", label: "E-mail", kind: "email", icon: "mail", required: true, placeholder: "contact@exemple.ci" },
        { key: "tel", label: "T\xE9l\xE9phone", kind: "mask", icon: "call", mask: "+225 00 00 00 00 00", placeholder: "+225 07 00 00 00 00" },
        { key: "immat", label: "Immatriculation", kind: "mask", icon: "directions_car", mask: "AA-0000-AA" },
        { key: "site", label: "Site web", kind: "url", icon: "language", placeholder: "https://" },
        { key: "flotte", label: "Taille de flotte", kind: "number", icon: "local_shipping", min: 1, unit: "v\xE9hicules" },
        { key: "ville", label: "Ville", kind: "autocomplete", icon: "location_city", options: CITIES },
        { key: "recherche", label: "Rechercher un contact", kind: "search", icon: "search", placeholder: "Nom, t\xE9l\xE9phone\u2026" },
        { key: "secteur", label: "Secteur", kind: "select", icon: "category", options: [
          { value: "transport", label: "Transport" },
          { value: "btp", label: "BTP" },
          { value: "agro", label: "Agro-industrie" },
          { value: "distribution", label: "Distribution" }
        ] },
        { key: "modules", label: "Modules", kind: "multiselect", icon: "apps", options: [
          { value: "gps", label: "Suivi GPS" },
          { value: "carburant", label: "Carburant" },
          { value: "video", label: "Vid\xE9o" },
          { value: "rapports", label: "Rapports" }
        ] },
        { key: "debut", label: "Date de d\xE9marrage", kind: "date" },
        { key: "rdv", label: "Heure du rendez-vous", kind: "time", step: 30 },
        { key: "periode", label: "P\xE9riode d\u2019essai", kind: "daterange", wide: true },
        { key: "facturation", label: "Facturation", kind: "segmented", wide: true, value: "mensuelle", options: [
          { value: "mensuelle", label: "Mensuelle", icon: "calendar_view_month" },
          { value: "annuelle", label: "Annuelle", icon: "event_repeat" }
        ] },
        { key: "paiement", label: "Moyen de paiement", kind: "radio", value: "virement", options: [
          { value: "virement", label: "Virement" },
          { value: "mobile", label: "Mobile Money" },
          { value: "cheque", label: "Ch\xE8que" }
        ] },
        { key: "options", label: "Options", kind: "chips", options: [
          { value: "sms", label: "Alertes SMS" },
          { value: "api", label: "Acc\xE8s API" },
          { value: "formation", label: "Formation" }
        ] },
        { key: "remise", label: "Remise", kind: "slider", min: 0, max: 30, step: 1, value: 5, unit: " %" },
        { key: "confiance", label: "Niveau de confiance", kind: "rating", value: 3 },
        { key: "kbis", label: "Registre du commerce (RCCM)", kind: "file", accept: "application/pdf,image/*", wide: true },
        { key: "notes", label: "Notes", kind: "textarea", placeholder: "Contexte commercial\u2026" },
        { key: "newsletter", label: "Recevoir la newsletter", kind: "toggle", value: true, wide: true, hint: "une fois par mois" },
        { key: "cgv", label: "J\u2019accepte les conditions g\xE9n\xE9rales", kind: "checkbox", required: true, wide: true }
      ]
    }),
    /** Champs avancés de /components/fields. */
    advancedFieldsForm: () => ({
      type: "form",
      formId: "champs-avances",
      title: "Param\xE9trage du contrat",
      subtitle: "Champs avanc\xE9s \xB7 /components/fields",
      icon: "tune",
      description: "Tous les champs avanc\xE9s du kit : montant, intervalle, \xE9diteurs, signature, arborescence, transfert\u2026",
      submitLabel: "Valider le contrat",
      fields: [
        { key: "code", label: "Code de v\xE9rification (re\xE7u par SMS)", kind: "otp", length: 6, hint: "Saisissez ou collez les 6 chiffres" },
        { key: "vehicules", label: "Nombre de v\xE9hicules", kind: "stepper", min: 1, max: 500, value: 12, unit: "v\xE9h." },
        { key: "montant", label: "Montant mensuel", kind: "currency", currency: "XOF", value: 125e4, required: true },
        {
          key: "budget",
          label: "Fourchette de budget par v\xE9hicule",
          kind: "range",
          min: 0,
          max: 5e4,
          step: 500,
          value: [9900, 24e3],
          unit: " F",
          histogram: [2, 4, 7, 12, 18, 26, 31, 28, 22, 19, 15, 12, 9, 7, 5, 4, 3, 2, 2, 1]
        },
        { key: "couleur", label: "Couleur des v\xE9hicules sur la carte", kind: "color", value: "#4f6bed" },
        { key: "zones", label: "Zones couvertes", kind: "treeselect", multiple: true, value: ["plateau", "bouake"], options: ZONES },
        { key: "motscles", label: "Mots-cl\xE9s", kind: "tags", value: ["Flotte", "Installation"], options: ["Urgent", "Maintenance", "Installation", "Garantie", "Client VIP", "Flotte", "Carburant"].map((l) => ({ value: l, label: l })) },
        { key: "adresse", label: "Adresse du d\xE9p\xF4t", kind: "address", map: true },
        { key: "affectes", label: "V\xE9hicules couverts", kind: "transfer", value: ["CI-2210-CD"], options: [
          { value: "CI-4521-AB", label: "CI-4521-AB", description: "Toyota Hilux", icon: "local_shipping" },
          { value: "CI-2210-CD", label: "CI-2210-CD", description: "Renault Kangoo", icon: "airport_shuttle" },
          { value: "CI-3307-EF", label: "CI-3307-EF", description: "Suzuki Swift", icon: "directions_car" },
          { value: "CI-0418-GH", label: "CI-0418-GH", description: "Yamaha Crux", icon: "two_wheeler" },
          { value: "CI-7781-JK", label: "CI-7781-JK", description: "Mercedes Actros", icon: "local_shipping" }
        ] },
        { key: "clauses", label: "Clauses particuli\xE8res", kind: "richtext", value: "<p>Installation sous <b>48 h</b> apr\xE8s signature.</p><ul><li>Garantie mat\xE9riel 24 mois</li></ul>" },
        { key: "procedure", label: "Proc\xE9dure d\u2019installation", kind: "markdown", value: "## \xC9tapes\n\n1. Couper le contact\n2. Raccorder la balise au **+APC**\n\n> V\xE9rifier la remont\xE9e GPS avant de partir." },
        { key: "motdepasse", label: "Mot de passe du compte client", kind: "password", secret: true, required: true },
        { key: "cle", label: "Cl\xE9 API", kind: "copy", value: "lk_live_9f2c4e7a1b8d3f60", secret: true, icon: "key" },
        { key: "signature", label: "Signature du client", kind: "signature", required: true }
      ]
    }),
    // ─── Typographie et contenu ────────────────────────────────────
    typeScale: () => ({
      type: "typography",
      title: "\xC9chelle typographique",
      subtitle: "Outfit pour les titres, Inter pour le texte \xB7 classes .text-*",
      icon: "text_fields",
      items: [
        { variant: "display", text: "1 248 v\xE9hicules" },
        { variant: "h1", text: "R\xE9f\xE9rentiel unique" },
        { variant: "h2", text: "Tableau de bord Finance" },
        { variant: "h3", text: "Informations g\xE9n\xE9rales" },
        { variant: "h4", text: "Coordonn\xE9es" },
        { variant: "card-title", text: "Abonnement Standard" },
        { variant: "body-lg", text: "Suivez votre flotte en temps r\xE9el et recevez une alerte \xE0 chaque \xE9v\xE9nement." },
        { variant: "body", text: "Le client signale une perte de signal entre 18 h et 20 h." },
        { variant: "body-sm", text: "Catalogue des offres et tarifs d\u2019installation." },
        { variant: "label", text: "Raison sociale" },
        { variant: "caption", text: "Mis \xE0 jour il y a 3 min" },
        { variant: "overline", text: "Code client" },
        { variant: "mono", text: "FAC-2026-0981 \xB7 358240051111110" },
        { variant: "brand", text: "Lookas \u2014 suivi de flotte", tone: "primary" },
        { variant: "quote", text: "Un composant qui n\u2019est pas document\xE9 n\u2019existe pas." }
      ]
    }),
    releaseArticle: () => ({
      type: "article",
      title: "Note de version 4.2",
      subtitle: "R\xE9dig\xE9e par l\u2019agent \xB7 2 min de lecture",
      icon: "article",
      blocks: [
        { type: "lead", text: "La version 4.2 rend les **alertes de zone** plus fiables et introduit le suivi vid\xE9o embarqu\xE9." },
        { type: "h2", text: "Ce qui change" },
        { type: "list", items: ["Une seule alerte par franchissement de zone", "Extraits vid\xE9o automatiques sur incident", "Export PDF des rapports mensuels"] },
        { type: "callout", tone: "info", title: "Migration", text: "Aucune action requise : les zones existantes sont conserv\xE9es." },
        { type: "quote", text: "Nous recevions dix alertes pour un seul v\xE9hicule. D\xE9sormais, c\u2019est une seule, au bon moment.", cite: "Aya Diallo, responsable flotte" },
        { type: "code", lang: "bash", filename: "terminal", code: "npm install @lookas/sdk@4.2.0" },
        { type: "table", head: ["Module", "Avant", "Apr\xE8s"], rows: [["Alertes", "10 / incident", "1 / incident"], ["Rapports", "CSV", "CSV + PDF"]] },
        { type: "divider" },
        { type: "p", text: "Retrouvez le d\xE9tail dans la documentation, rubrique *Nouveaut\xE9s*." }
      ]
    }),
    teamComments: () => ({ type: "comments", title: "Discussion de l\u2019\xE9quipe", subtitle: "Sur la note de version", icon: "forum", comments: COMMENTS.slice(0, 3) }),
    // ─── Médias ────────────────────────────────────────────────────
    tripVideo: () => ({ type: "video", title: "Replay du trajet CI-4521-AB", subtitle: "Vid\xE9o g\xE9n\xE9r\xE9e localement", icon: "smart_display", seconds: 6, caption: "Animation enregistr\xE9e depuis un canvas : rien n\u2019est t\xE9l\xE9charg\xE9." }),
    tutorialVideo: () => ({ type: "video", title: "Big Buck Bunny", subtitle: "YouTube \xB7 charg\xE9 uniquement au clic", icon: "smart_display", youtube: "aqz-KE-bpKQ", duration: "10:34" }),
    videoLibrary: () => ({
      type: "videos",
      title: "Extraits vid\xE9o de la semaine",
      subtitle: "Cam\xE9ras embarqu\xE9es",
      icon: "video_library",
      videos: [
        { id: "v1", title: "Freinage brusque \xB7 CI-9902-NP", sample: true, duration: "0:05", category: "Incidents", meta: "lundi \xB7 10:05" },
        { id: "v2", title: "Sortie de zone \xB7 Port-Bou\xEBt", sample: true, duration: "0:05", category: "Incidents", meta: "mardi \xB7 14:12" },
        { id: "v3", title: "Sintel", youtube: "eRsGyueVLvQ", duration: "14:48", category: "Formation", author: "Blender Foundation", meta: "YouTube" }
      ]
    }),
    callRecording: () => ({
      type: "audio",
      title: "Enregistrements d\u2019appels",
      subtitle: "Support client \xB7 3 pistes",
      icon: "graphic_eq",
      tracks: [
        { title: "Appel Bollor\xE9 Logistics", artist: "Aya Diallo", sample: 12, icon: "call" },
        { title: "Relance facture FAC-0911", artist: "Service comptable", sample: 9, icon: "call" },
        { title: "Message vocal technicien", artist: "Awa Kon\xE9", sample: 6, icon: "voicemail" }
      ]
    }),
    contractPdf: () => ({ type: "pdf", title: "Contrat cadre 2026", subtitle: "Bollor\xE9 Logistics CI \xB7 4 pages", icon: "picture_as_pdf", name: "contrat-cadre-2026.pdf", pages: 4, height: 440 }),
    sitePhotos: () => ({ type: "gallery", title: "Photos d\u2019installation", subtitle: "8 photos \xB7 cliquez pour agrandir", icon: "photo_library", sample: 8 }),
    truckImage: () => ({ type: "image", src: "assets/camion.png", title: "V\xE9hicule concern\xE9", icon: "image", caption: "Mercedes Actros \xB7 CI-7781-JK" }),
    // ─── Précision (suite) ─────────────────────────────────────────
    trackingQr: () => ({
      type: "qrcode",
      title: "Lien de suivi partageable",
      subtitle: "\xC0 scanner par le client",
      icon: "qr_code_2",
      value: "https://suivi.example.com/v/CI-4521-AB",
      caption: "suivi.example.com/v/CI-4521-AB",
      barcode: "358240051111110"
    }),
    contractDiff: () => ({
      type: "textdiff",
      title: "Modifications du contrat",
      subtitle: "Version 2 \u2192 version 3",
      icon: "difference",
      mode: "split",
      before: "Article 4 \u2014 Dur\xE9e\nLe contrat est conclu pour 12 mois.\nIl est renouvelable par tacite reconduction.\n\nArticle 5 \u2014 Prix\n9 900 FCFA par v\xE9hicule et par mois.",
      after: "Article 4 \u2014 Dur\xE9e\nLe contrat est conclu pour 24 mois.\nIl est renouvelable par tacite reconduction.\n\nArticle 5 \u2014 Prix\n8 900 FCFA par v\xE9hicule et par mois.\nRemise de 5 % au-del\xE0 de 50 v\xE9hicules."
    }),
    clientAudit: () => ({
      type: "audit",
      title: "Historique des modifications",
      subtitle: "Client CLI-002",
      icon: "manage_history",
      entries: [
        { id: "a1", at: day(0, 10), user: { name: "Aya Kon\xE9", color: "#8b5cf6" }, action: "update", target: "Client CLI-002", changes: [{ field: "statut", label: "Statut", before: "Actif", after: "Retard de paiement" }] },
        { id: "a2", at: day(-1, 15), user: { name: "Marc Yao", color: "#10b981" }, action: "comment", target: "Facture FAC-0911", comment: "Relance envoy\xE9e par e-mail." },
        { id: "a3", at: day(-3, 9), user: { name: "Jean Kouassi", color: "#0ea5e9" }, action: "export", target: "Rapport T3", meta: "PDF \xB7 2,8 Mo" },
        { id: "a4", at: day(-12, 11), user: { name: "Jean Kouassi", color: "#0ea5e9" }, action: "create", target: "Client CLI-002" }
      ]
    }),
    paymentResult: () => ({ type: "result", status: "success", title: "Contrat valid\xE9", text: "Le client recevra une copie sign\xE9e par e-mail." }),
    maintenanceBanner: () => ({ type: "banner", tone: "maintenance", title: "Maintenance pr\xE9vue", text: "La plateforme sera indisponible dimanche de 2 h \xE0 4 h." }),
    moreTools: () => ({
      type: "choices",
      question: "Je peux aussi :",
      options: [
        { value: "arborescence", label: "Explorer les documents", icon: "account_tree" },
        { value: "fiche client", label: "Ouvrir une fiche client", icon: "badge" },
        { value: "offres", label: "Pr\xE9senter les offres", icon: "view_carousel" },
        { value: "comparer", label: "Comparer les formules", icon: "compare" },
        { value: "corrige le bug", label: "Corriger un bug", icon: "difference" },
        { value: "importer un fichier", label: "Analyser un fichier", icon: "upload_file" },
        { value: "veille r\xE9glementaire", label: "Faire une veille", icon: "travel_explore" },
        { value: "objectifs", label: "Suivre les objectifs", icon: "track_changes" },
        { value: "tous les champs", label: "Tous les champs de formulaire", icon: "dynamic_form" },
        { value: "m\xE9dias", label: "Vid\xE9os, audio, PDF, photos", icon: "perm_media" },
        { value: "typographie", label: "Typographie et article", icon: "text_fields" },
        { value: "qr code", label: "QR code, diff, historique", icon: "qr_code_2" }
      ]
    })
  };
  var CITIES = ["Abidjan", "Bouak\xE9", "Daloa", "Korhogo", "Man", "San-P\xE9dro", "Yamoussoukro"].map((l) => ({ value: l, label: l }));
  var ZONES = [
    { value: "abj", label: "Abidjan", icon: "location_city", children: [
      { value: "plateau", label: "Plateau" },
      { value: "cocody", label: "Cocody" },
      { value: "yopougon", label: "Yopougon" },
      { value: "port-bouet", label: "Port-Bou\xEBt" }
    ] },
    { value: "centre", label: "Centre", icon: "landscape", children: [{ value: "yakro", label: "Yamoussoukro" }, { value: "bouake", label: "Bouak\xE9" }] },
    { value: "ouest", label: "Ouest", icon: "forest", children: [{ value: "daloa", label: "Daloa" }, { value: "sanpedro", label: "San-P\xE9dro" }] }
  ];
  function weekItems() {
    const list = [
      [0, 8, 10, "Installation \xB7 Bollor\xE9", "primary"],
      [0, 14, 16, "D\xE9pannage \xB7 SOTRA", "warning"],
      [1, 9, 11, "Audit \xB7 Cargill", "info"],
      [2, 10, 12, "Retrait \xB7 Orange CI", "neutral"],
      [3, 13, 15, "Formation chauffeurs", "purple"]
    ];
    return list.map(([d, h1, h2, title, tone], i) => ({ id: "ag" + i, title, start: day(d, h1), end: day(d, h2), tone }));
  }

  // ../../../../../../home/user/ui-kit/src/app/harnais/harnais.scenarios.ts
  var RULES = [
    // La synthèse passe en premier : « tableau de bord » ne doit pas être lu comme « tableau ».
    ["overview", /tableau de bord|dashboard|synthèse|vue d.ensemble|démo|rapport/i],
    // Intentions spécialisées, avant les règles génériques (« liste », « créer »…).
    ["tools", /outils|que sais-tu faire|que peux-tu|capacités|autre chose/i],
    // Composants du kit : champs, médias, typographie
    ["fields", /tous les champs|types de champs|champs avancés|champs de formulaire|otp|signature|mot de passe|tree-select|transfer/i],
    ["media", /médias|medias|multimédia/i],
    ["video", /vidéo|video|youtube|film|replay|caméra/i],
    ["audio", /audio|son\b|podcast|enregistrement|appel|vocal|musique/i],
    ["pdf", /pdf|contrat|document à lire|visionneuse/i],
    ["photos", /photo|image|galerie d.images|illustration/i],
    ["typography", /typo|police|échelle|titres|font/i],
    ["article", /article|note de version|rédige|commentaires|blog|éditorial/i],
    ["qrcode", /qr|code-barres|barcode|lien de suivi/i],
    ["history", /historique des modif|audit|journal|traçabilité|qui a modifié/i],
    ["code", /code|diff|correctif|patch|bug|corrige|commit|test/i],
    ["upload", /importer|import |upload|téléverser|fichier à analyser|analyser un fichier|joindre/i],
    ["detail", /fiche|détail|profil|modal|dossier client|onglets/i],
    ["json", /json|\bapi\b|payload|données brutes|réponse brute/i],
    ["tree", /arborescence|dossier|répertoire|structure|organigramme|permissions|explorer|documents/i],
    ["compare", /compar|versus| vs |choisir entre|meilleure formule/i],
    ["carousel", /carrousel|carousel|galerie|offres|catalogue|produits|équipements|nouveautés/i],
    ["process", /étapes|processus|procédure|onboarding|checklist|contrôles|mise en service|marche à suivre/i],
    ["sources", /source|web|actualité|veille|article|presse|réglementa/i],
    ["activity", /activité|heatmap|chaleur|connexions|usage|fréquentation|heures/i],
    ["objectives", /objectif|kpi|progression|performance|cible/i],
    ["faq", /faq|questions fréquentes|aide|explique/i],
    ["agenda", /agenda|semaine|journée|aujourd.hui/i],
    ["form", /formulaire|demande|réserv|inscri|créer|ajout|nouveau|nouvelle|signal|ticket|devis/i],
    ["map", /carte|map|localis|position|flotte|véhicule|trajet|zone|gps/i],
    ["chart", /graph|chart|courbe|évolution|tendance|ventes|chiffre|ca |revenu|statist|analyse/i],
    ["table", /tableau|liste|clients|export|lignes|registre|inventaire/i],
    ["calendar", /calendrier|rendez|rdv|planning du mois|disponib/i],
    ["kanban", /kanban|tâches|taches|backlog|colonnes|avancement/i],
    ["gantt", /gantt|projet|déploiement|jalon|feuille de route|roadmap/i]
  ];
  function detectIntent(prompt) {
    var _a, _b;
    return (_b = (_a = RULES.find(([, re]) => re.test(prompt))) == null ? void 0 : _a[0]) != null ? _b : "clarify";
  }
  var day2 = (offset, hour = 9) => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(hour, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  };
  var W = {
    fleetStats: () => ({ type: "stats", items: [
      { label: "V\xE9hicules actifs", value: "42", delta: "+3", trend: "up", tone: "success", icon: "local_shipping", hint: "sur 48", spark: [36, 37, 39, 38, 40, 39, 42] },
      { label: "Km parcourus", value: "12 480", delta: "+8 %", trend: "up", tone: "primary", icon: "route", hint: "7 derniers jours", spark: [1500, 1720, 1650, 1880, 1790, 1960, 1980] },
      { label: "Alertes ouvertes", value: "5", delta: "\u22122", trend: "down", tone: "warning", icon: "notifications_active", spark: [9, 8, 8, 7, 6, 7, 5] },
      { label: "Disponibilit\xE9", value: "96,4 %", delta: "+0,6 pt", trend: "up", tone: "info", icon: "verified", spark: [95.2, 95.6, 95.4, 95.9, 96.1, 96, 96.4] }
    ] }),
    fleetMap: () => ({
      type: "map",
      title: "Flotte en temps r\xE9el",
      subtitle: "Abidjan \xB7 8 v\xE9hicules suivis",
      icon: "map",
      height: 320,
      markers: FLOTTE,
      routes: [{ id: "r1", label: "Tourn\xE9e Plateau \u2192 Abobo", tone: "primary", endpoints: true, points: [[5.3237, -4.0193], [5.34, -4.015], [5.37, -4.018], [5.395, -4.022], [5.418, -4.02]] }],
      zones: [{ id: "z1", label: "Zone portuaire", tone: "warning", circle: { center: [5.293, -4.005], radius: 1400 } }],
      legend: [{ label: "En mouvement", tone: "success" }, { label: "\xC0 l\u2019arr\xEAt", tone: "warning" }, { label: "Maintenance", tone: "info" }, { label: "Alerte", tone: "error" }]
    }),
    salesChart: () => ({
      type: "chart",
      chart: "area",
      title: "Chiffre d\u2019affaires mensuel",
      subtitle: "En millions FCFA \xB7 2026 vs 2025",
      icon: "show_chart",
      unit: " M",
      labels: ["Jan", "F\xE9v", "Mar", "Avr", "Mai", "Juin", "Juil", "Ao\xFBt", "Sep", "Oct"],
      series: [
        { label: "2026", data: [182, 196, 210, 205, 231, 248, 240, 262, 275, 291] },
        { label: "2025", data: [160, 171, 175, 182, 190, 201, 198, 210, 216, 224] }
      ]
    }),
    mixChart: () => ({
      type: "chart",
      chart: "doughnut",
      title: "R\xE9partition par offre",
      subtitle: "Part du CA \xB7 octobre",
      icon: "donut_large",
      unit: " %",
      labels: ["Abonnement", "Installation", "Maintenance", "Mat\xE9riel"],
      series: [{ label: "Part", data: [54, 21, 15, 10] }]
    }),
    regionChart: () => ({
      type: "chart",
      chart: "hbar",
      title: "CA par r\xE9gion",
      subtitle: "Millions FCFA \xB7 cumul annuel",
      icon: "bar_chart",
      unit: " M",
      labels: ["Abidjan", "Bouak\xE9", "San-P\xE9dro", "Yamoussoukro", "Korhogo"],
      series: [{ label: "CA", data: [1420, 396, 274, 211, 138] }]
    }),
    clientsTable: () => ({
      type: "table",
      title: "Clients \xE0 relancer",
      subtitle: "8 comptes \xB7 tri\xE9s par encours",
      icon: "table_rows",
      searchable: true,
      pageSize: 5,
      columns: [
        { key: "client", label: "Client", kind: "person" },
        { key: "ville", label: "Ville" },
        { key: "encours", label: "Encours", kind: "number", unit: " FCFA" },
        { key: "retard", label: "Retard", kind: "number", unit: " j" },
        { key: "statut", label: "Statut", kind: "badge", tones: { Critique: "error", "\xC0 relancer": "warning", "En cours": "info", R\u00E9gl\u00E9: "success" } },
        { key: "recouvre", label: "Recouvr\xE9", kind: "progress" }
      ],
      rows: [
        { client: "Bollor\xE9 Logistics CI", ville: "Abidjan", encours: 485e4, retard: 47, statut: "Critique", recouvre: 20 },
        { client: "Transports Yao SARL", ville: "Bouak\xE9", encours: 231e4, retard: 32, statut: "\xC0 relancer", recouvre: 45 },
        { client: "SOTRA", ville: "Abidjan", encours: 198e4, retard: 18, statut: "En cours", recouvre: 60 },
        { client: "Cargill C\xF4te d\u2019Ivoire", ville: "San-P\xE9dro", encours: 142e4, retard: 12, statut: "En cours", recouvre: 72 },
        { client: "Orange CI", ville: "Abidjan", encours: 98e4, retard: 9, statut: "\xC0 relancer", recouvre: 35 },
        { client: "SIFCA", ville: "Abidjan", encours: 76e4, retard: 5, statut: "En cours", recouvre: 88 },
        { client: "Nestl\xE9 CI", ville: "Yamoussoukro", encours: 42e4, retard: 2, statut: "R\xE9gl\xE9", recouvre: 100 },
        { client: "CIE", ville: "Korhogo", encours: 31e4, retard: 1, statut: "R\xE9gl\xE9", recouvre: 100 }
      ]
    }),
    interventionForm: () => ({
      type: "form",
      formId: "intervention",
      title: "Nouvelle demande d\u2019intervention",
      icon: "build",
      description: "Il me manque quelques informations pour planifier le technicien.",
      submitLabel: "Planifier l\u2019intervention",
      fields: [
        { key: "client", label: "Client", kind: "select", icon: "business", required: true, options: [
          { value: "bollore", label: "Bollor\xE9 Logistics CI" },
          { value: "yao", label: "Transports Yao SARL" },
          { value: "sotra", label: "SOTRA" }
        ] },
        { key: "vehicule", label: "Immatriculation", kind: "text", icon: "directions_car", placeholder: "CI-0000-AB", required: true },
        { key: "type", label: "Type d\u2019intervention", kind: "segmented", wide: true, value: "install", options: [
          { value: "install", label: "Installation", icon: "add_circle" },
          { value: "repair", label: "D\xE9pannage", icon: "build" },
          { value: "remove", label: "Retrait", icon: "remove_circle" }
        ] },
        { key: "date", label: "Date souhait\xE9e", kind: "date", required: true },
        { key: "creneau", label: "Cr\xE9neau", kind: "select", value: "matin", options: [
          { value: "matin", label: "Matin (8h \u2013 12h)" },
          { value: "aprem", label: "Apr\xE8s-midi (13h \u2013 17h)" }
        ] },
        { key: "priorite", label: "Priorit\xE9", kind: "radio", value: "normale", options: [
          { value: "basse", label: "Basse" },
          { value: "normale", label: "Normale" },
          { value: "urgente", label: "Urgente" }
        ] },
        { key: "equipements", label: "\xC9quipements", kind: "chips", value: ["balise"], options: [
          { value: "balise", label: "Balise GPS" },
          { value: "camera", label: "Cam\xE9ra" },
          { value: "sonde", label: "Sonde carburant" },
          { value: "immob", label: "Anti-d\xE9marrage" }
        ] },
        { key: "duree", label: "Dur\xE9e estim\xE9e", kind: "slider", min: 30, max: 240, step: 15, value: 90, unit: " min" },
        { key: "notes", label: "Pr\xE9cisions", kind: "textarea", wide: true, placeholder: "Acc\xE8s au site, contact sur place\u2026" },
        { key: "sms", label: "Pr\xE9venir le client par SMS", kind: "toggle", value: true, wide: true }
      ]
    }),
    feedbackForm: () => ({
      type: "form",
      formId: "feedback",
      title: "Votre avis sur l\u2019intervention",
      icon: "reviews",
      submitLabel: "Envoyer",
      fields: [
        { key: "note", label: "Satisfaction globale", kind: "rating", value: 4, wide: true },
        { key: "ponctuel", label: "Le technicien \xE9tait ponctuel", kind: "checkbox", value: true, wide: true },
        { key: "commentaire", label: "Commentaire", kind: "textarea", wide: true }
      ]
    }),
    planningCalendar: () => ({
      type: "calendar",
      title: "Interventions du mois",
      subtitle: "9 rendez-vous planifi\xE9s",
      icon: "calendar_month",
      items: calendarItems()
    }),
    tasksKanban: () => ({
      type: "kanban",
      title: "Suivi des t\xE2ches",
      subtitle: "\xC9quipe technique",
      icon: "view_kanban",
      columns: [{ key: "todo", label: "\xC0 faire" }, { key: "doing", label: "En cours" }, { key: "done", label: "Termin\xE9" }],
      items: [
        { id: "k1", ref: "INT-0412", title: "Installer balise CI-4521-AB", status: "todo", tone: "primary", assignee: "Awa Kon\xE9", due: day2(1) },
        { id: "k2", ref: "INT-0415", title: "Remplacer sonde carburant", status: "todo", tone: "warning", assignee: "Yao Kouam\xE9", due: day2(-1) },
        { id: "k3", ref: "INT-0409", title: "D\xE9pannage cam\xE9ra Actros", status: "doing", tone: "info", assignee: "Awa Kon\xE9", progress: 60 },
        { id: "k4", ref: "INT-0402", title: "Retrait bo\xEEtier Kangoo", status: "doing", tone: "neutral", assignee: "Ibrahim Traor\xE9", progress: 30 },
        { id: "k5", ref: "INT-0398", title: "Audit flotte SOTRA", status: "done", tone: "success", assignee: "Yao Kouam\xE9", done: true }
      ]
    }),
    rolloutGantt: () => ({
      type: "gantt",
      title: "D\xE9ploiement des balises",
      subtitle: "Feuille de route \xB7 3 \xE9quipes",
      icon: "timeline",
      groups: [{ key: "a", label: "\xC9quipe Nord" }, { key: "b", label: "\xC9quipe Sud" }, { key: "c", label: "\xC9quipe Port" }],
      items: [
        { id: "g1", title: "Rep\xE9rage sites", group: "a", start: day2(-3), end: day2(1), tone: "info", progress: 80 },
        { id: "g2", title: "Installation lot 1", group: "a", start: day2(2), end: day2(8), tone: "primary", progress: 0 },
        { id: "g3", title: "Formation chauffeurs", group: "b", start: day2(0), end: day2(4), tone: "purple", progress: 40 },
        { id: "g4", title: "Installation lot 2", group: "b", start: day2(5), end: day2(12), tone: "primary" },
        { id: "g5", title: "Recette port", group: "c", start: day2(-1), end: day2(6), tone: "warning", progress: 25 }
      ]
    }),
    incidentTimeline: () => ({
      type: "timeline",
      title: "Historique de l\u2019alerte",
      subtitle: "CI-9902-NP \xB7 Isuzu D-Max",
      icon: "history",
      items: [
        { time: "08:12", title: "D\xE9part du d\xE9p\xF4t", text: "Koumassi, atelier", tone: "neutral", icon: "play_arrow" },
        { time: "09:40", title: "Entr\xE9e zone a\xE9roport", tone: "info", icon: "login" },
        { time: "10:05", title: "Sortie de zone autoris\xE9e", text: "Geofence \xAB Port-Bou\xEBt \xBB franchie", tone: "error", icon: "warning" },
        { time: "10:07", title: "Alerte envoy\xE9e au superviseur", tone: "warning", icon: "notifications_active" }
      ]
    }),
    technicians: () => ({
      type: "records",
      title: "Techniciens disponibles",
      subtitle: "Demain matin \xB7 Abidjan",
      icon: "engineering",
      items: [
        { id: "t1", title: "Awa Kon\xE9", subtitle: "Installation & d\xE9pannage", meta: "\xE0 4 km", initials: "AK", tone: "success", badge: { label: "Disponible", tone: "success" }, tags: ["Balise", "Cam\xE9ra"] },
        { id: "t2", title: "Yao Kouam\xE9", subtitle: "Sondes carburant", meta: "\xE0 9 km", initials: "YK", tone: "primary", badge: { label: "1 cr\xE9neau", tone: "warning" }, tags: ["Sonde"] },
        { id: "t3", title: "Ibrahim Traor\xE9", subtitle: "Poids lourds", meta: "\xE0 15 km", initials: "IT", tone: "purple", badge: { label: "Indisponible", tone: "neutral" }, tags: ["Actros", "Anti-d\xE9marrage"] }
      ]
    }),
    whatNext: () => ({
      type: "choices",
      question: "Que voulez-vous voir ensuite ?",
      options: [
        { value: "carte", label: "La flotte sur une carte", icon: "map" },
        { value: "graphique", label: "L\u2019\xE9volution du CA", icon: "show_chart" },
        { value: "tableau", label: "Les clients \xE0 relancer", icon: "table_rows" },
        { value: "formulaire", label: "Cr\xE9er une intervention", icon: "edit_note" },
        { value: "calendrier", label: "Le planning du mois", icon: "calendar_month" },
        { value: "outils", label: "Autres outils\u2026", icon: "apps" }
      ]
    })
  };
  function calendarItems() {
    const titles = [
      [0, 9, "Installation \xB7 Bollor\xE9", "primary"],
      [0, 14, "D\xE9pannage \xB7 SOTRA", "warning"],
      [1, 10, "Audit \xB7 Cargill", "info"],
      [3, 8, "Retrait \xB7 Orange CI", "neutral"],
      [5, 11, "Formation chauffeurs", "purple"],
      [7, 9, "Installation \xB7 Yao", "primary"],
      [9, 15, "Recette port", "success"],
      [-2, 10, "D\xE9pannage \xB7 CIE", "error"],
      [12, 9, "Installation \xB7 SIFCA", "primary"]
    ];
    return titles.map(([d, h, title, tone], i) => ({ id: "cal" + i, title, start: day2(d, h), end: day2(d, h + 2), tone }));
  }
  function scenarioFor(intent) {
    switch (intent) {
      case "map":
        return {
          tool: "positions GPS \xB7 8 v\xE9hicules",
          intro: "Voici la position actuelle de la flotte. Un v\xE9hicule est en alerte (sortie de zone \xE0 Port-Bou\xEBt) :",
          blocks: [W.fleetMap(), W.incidentTimeline(), { type: "callout", tone: "warning", icon: "warning", title: "1 v\xE9hicule hors zone", text: "CI-9902-NP a quitt\xE9 la geofence autoris\xE9e \xE0 10:05. Le superviseur a \xE9t\xE9 pr\xE9venu." }],
          outro: "Je peux planifier une intervention sur ce v\xE9hicule si besoin."
        };
      case "chart":
        return {
          tool: "ventes 2025 \u2013 2026",
          intro: "Le chiffre d\u2019affaires progresse de `+30 %` sur un an. Les trois vues ci-dessous r\xE9sument la tendance :",
          blocks: [W.salesChart(), { type: "list", items: ["Croissance r\xE9guli\xE8re depuis mai, port\xE9e par les abonnements.", "Abidjan concentre pr\xE8s des deux tiers du CA.", "La maintenance gagne 3 points de part sur le trimestre."] }, W.mixChart(), W.regionChart()]
        };
      case "table":
        return {
          tool: "encours clients",
          intro: "J\u2019ai trouv\xE9 8 clients avec un encours. Les deux premiers d\xE9passent 30 jours de retard :",
          blocks: [W.clientsTable()],
          outro: "Vous pouvez trier les colonnes et filtrer la liste directement dans le tableau."
        };
      case "form":
        return {
          tool: "r\xE9f\xE9rentiel clients & v\xE9hicules",
          intro: "Avec plaisir. Compl\xE9tez ce formulaire et je planifie l\u2019intervention avec le technicien le plus proche :",
          blocks: [W.interventionForm()]
        };
      case "calendar":
        return {
          tool: "agenda des techniciens",
          intro: "Voici le planning du mois. Les journ\xE9es les plus charg\xE9es sont en d\xE9but de semaine :",
          blocks: [W.planningCalendar()]
        };
      case "kanban":
        return {
          tool: "t\xE2ches de l\u2019\xE9quipe",
          intro: "Voici l\u2019avancement des t\xE2ches. Une t\xE2che est en retard (sonde carburant) :",
          blocks: [W.tasksKanban()]
        };
      case "gantt":
        return {
          tool: "feuille de route",
          intro: "Voici la feuille de route du d\xE9ploiement sur les deux prochaines semaines :",
          blocks: [W.rolloutGantt()]
        };
      case "overview":
        return {
          tool: "flotte, ventes et encours",
          intro: "Voici une synth\xE8se compl\xE8te de l\u2019activit\xE9 :",
          blocks: [W.fleetStats(), W.salesChart(), W.fleetMap(), W.clientsTable(), W.whatNext()]
        };
      case "tools":
        return {
          tool: "capacit\xE9s disponibles",
          intro: "Je peux afficher l\u2019information sous la forme la plus utile. Voici ce que je sais faire :",
          blocks: [X.moreTools()]
        };
      case "code":
        return {
          tool: "geofence.service.ts",
          tools: [
            { tool: "search", label: "Recherche", target: "GEOFENCE_EXIT", output: "3 occurrences" },
            { tool: "read", label: "Lecture", target: "geofence.service.ts", output: "84 lignes" },
            { tool: "edit", label: "Modification", target: "geofence.service.ts", output: "+5 \u22123" }
          ],
          intro: "J\u2019ai trouv\xE9 la cause : l\u2019alerte est \xE9mise \xE0 chaque position hors zone, au lieu d\u2019une seule fois au franchissement. Voici le correctif :",
          blocks: [X.codeDiff(), X.approvalTests()]
        };
      case "upload":
        return {
          tool: "formats pris en charge",
          intro: "Envoyez-moi le fichier : je l\u2019analyse et je vous en fais une synth\xE8se.",
          blocks: [X.uploadRequest()]
        };
      case "detail":
        return {
          tool: "dossier CLI-002",
          intro: "Voici le dossier du client. L\u2019essentiel est dans les onglets, et la fiche compl\xE8te s\u2019ouvre en modale :",
          blocks: [X.clientTabs(), X.clientModal()]
        };
      case "json":
        return {
          tool: "API v\xE9hicules",
          tools: [{ tool: "web", label: "Requ\xEAte", target: "GET /vehicules/CI-9902-NP", output: "200 OK \xB7 84 ms" }],
          intro: "Voici la r\xE9ponse brute de l\u2019API, d\xE9pliable champ par champ :",
          blocks: [X.apiJson()]
        };
      case "tree":
        return {
          tool: "GED \xB7 dossier client",
          intro: "Voici l\u2019arborescence du dossier. S\xE9lectionnez les pi\xE8ces \xE0 inclure dans le rapport :",
          blocks: [X.documentsTree()]
        };
      case "compare":
        return {
          tool: "grille tarifaire 2026",
          intro: "Pour une flotte comme la v\xF4tre, la formule Pro offre le meilleur \xE9quilibre :",
          blocks: [X.plansCompare(), X.offerCards()]
        };
      case "carousel":
        return {
          tool: "catalogue des offres",
          intro: "Voici nos offres, \xE0 faire d\xE9filer :",
          blocks: [X.offersCarousel(), X.offerCards()]
        };
      case "process":
        return {
          tool: "proc\xE9dure de mise en service",
          intro: "Voici o\xF9 en est la mise en service, et les contr\xF4les restants :",
          blocks: [X.onboardingSteps(), X.installChecklist()]
        };
      case "sources":
        return {
          tool: "veille r\xE9glementaire",
          tools: [{ tool: "web", label: "Recherche web", target: "r\xE9glementation g\xE9olocalisation C\xF4te d\u2019Ivoire", output: "18 r\xE9sultats" }],
          intro: "Deux \xE9volutions vous concernent directement : la protection des donn\xE9es de position et le chronotachygraphe obligatoire en 2027.",
          blocks: [X.webSources(), X.topicTags(), { type: "callout", tone: "info", icon: "gavel", title: "\xC0 anticiper", text: "Les poids lourds de plus de 3,5 t devront \xEAtre \xE9quip\xE9s d\u2019un chronotachygraphe avant janvier 2027." }]
        };
      case "activity":
        return {
          tool: "trajets des 4 derni\xE8res semaines",
          intro: "L\u2019activit\xE9 se concentre en semaine entre 8 h et 17 h, avec un pic le matin :",
          blocks: [X.usageStats(), X.activityHeatmap()]
        };
      case "objectives":
        return {
          tool: "objectifs T4",
          intro: "Le CA est en bonne voie ; le recouvrement est l\u2019objectif le plus \xE0 risque :",
          blocks: [X.objectives()]
        };
      case "faq":
        return {
          tool: "base de connaissances",
          intro: "Voici les r\xE9ponses aux questions les plus fr\xE9quentes :",
          blocks: [X.faqAccordion()]
        };
      case "agenda":
        return {
          tool: "agenda technicien",
          intro: "Voici l\u2019agenda de la semaine. Mercredi apr\xE8s-midi est encore libre :",
          blocks: [X.weekAgenda()]
        };
      case "fields":
        return {
          tool: "champs du kit",
          intro: "Voici tous les types de champs que je peux vous demander de remplir : d\u2019abord les champs standard, puis les champs avanc\xE9s.",
          blocks: [X.materialFieldsForm(), X.advancedFieldsForm()]
        };
      case "media":
        return {
          tool: "m\xE9diath\xE8que",
          intro: "Voici les m\xE9dias que je peux afficher : vid\xE9o, galerie vid\xE9o, audio, PDF et photos.",
          blocks: [X.tripVideo(), X.videoLibrary(), X.callRecording(), X.contractPdf(), X.sitePhotos()]
        };
      case "video":
        return {
          tool: "cam\xE9ras embarqu\xE9es",
          intro: "Voici le replay du trajet, et les extraits vid\xE9o de la semaine :",
          blocks: [X.tripVideo(), X.videoLibrary(), X.tutorialVideo()]
        };
      case "audio":
        return {
          tool: "enregistrements d\u2019appels",
          intro: "Voici les derniers enregistrements, avec leur forme d\u2019onde :",
          blocks: [X.callRecording()]
        };
      case "pdf":
        return {
          tool: "GED \xB7 contrats",
          intro: "Voici le contrat, et ce qui a chang\xE9 depuis la version pr\xE9c\xE9dente :",
          blocks: [X.contractPdf(), X.contractDiff()]
        };
      case "photos":
        return {
          tool: "photos d\u2019intervention",
          intro: "Voici les photos prises lors de l\u2019installation :",
          blocks: [X.sitePhotos(), X.truckImage()]
        };
      case "typography":
        return {
          tool: "design system",
          intro: "Voici l\u2019\xE9chelle typographique du kit, du titre d\u2019accueil \xE0 la l\xE9gende :",
          blocks: [X.typeScale()]
        };
      case "article":
        return {
          tool: "r\xE9daction",
          intro: "J\u2019ai r\xE9dig\xE9 la note de version. L\u2019\xE9quipe l\u2019a d\xE9j\xE0 comment\xE9e :",
          blocks: [X.releaseArticle(), X.teamComments()]
        };
      case "qrcode":
        return {
          tool: "lien de suivi",
          intro: "Voici le lien de suivi \xE0 partager avec le client :",
          blocks: [X.trackingQr()]
        };
      case "history":
        return {
          tool: "journal d\u2019audit",
          intro: "Voici qui a modifi\xE9 ce dossier, et quand :",
          blocks: [X.clientAudit()]
        };
      default:
        return {
          tool: "contexte",
          intro: "Je peux vous r\xE9pondre sous plusieurs formes. Choisissez ce qui vous serait le plus utile :",
          blocks: [W.whatNext()]
        };
    }
  }
  function formFollowUp(formId, values) {
    var _a;
    if (formId === "intervention") {
      const date = values["date"] instanceof Date ? values["date"].toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "\xE0 la date choisie";
      return {
        tool: "disponibilit\xE9s techniciens",
        intro: `C\u2019est not\xE9 : intervention planifi\xE9e ${date}. Voici les techniciens disponibles, Awa Kon\xE9 est la plus proche :`,
        blocks: [
          W.technicians(),
          { type: "callout", tone: "success", icon: "event_available", title: "Intervention INT-0418 cr\xE9\xE9e", text: values["sms"] ? "Le client recevra un SMS de confirmation la veille." : "Aucun SMS ne sera envoy\xE9 au client." }
        ],
        outro: "Souhaitez-vous recueillir l\u2019avis du client apr\xE8s l\u2019intervention ?"
      };
    }
    if (formId === "champs-material" || formId === "champs-avances") {
      return {
        tool: "enregistrement",
        intro: "C\u2019est enregistr\xE9. Voici la confirmation :",
        blocks: [X.paymentResult(), X.maintenanceBanner()]
      };
    }
    return {
      tool: "enregistrement",
      intro: "Merci, votre retour a bien \xE9t\xE9 enregistr\xE9.",
      blocks: [{ type: "callout", tone: "success", icon: "check_circle", title: "Avis enregistr\xE9", text: `Note : ${(_a = values["note"]) != null ? _a : "\u2014"} / 5.` }]
    };
  }
  function answerFollowUp(type, option) {
    if (type === "approval") {
      return option.value === "approve" ? {
        tool: "tests",
        tools: [{ tool: "bash", label: "Terminal", target: "npm run test -- --include=src/app/alertes/**", output: "14 tests r\xE9ussis \xB7 2,1 s" }],
        intro: "Les tests passent. Le correctif est pr\xEAt :",
        blocks: [
          { type: "steps", steps: [{ label: "Cause identifi\xE9e", status: "done" }, { label: "Correctif \xE9crit", status: "done" }, { label: "Tests", text: "14 / 14", status: "done" }, { label: "Revue", status: "current" }] },
          { type: "callout", tone: "success", icon: "check_circle", title: "Pr\xEAt \xE0 \xEAtre relu", text: "Les alertes de zone ne sont plus envoy\xE9es qu\u2019une seule fois par franchissement." }
        ]
      } : {
        tool: "alternatives",
        intro: "D\u2019accord, je ne lance rien. Le correctif reste en attente : vous pouvez ex\xE9cuter les tests vous-m\xEAme.",
        blocks: [{ type: "code", lang: "bash", code: "npm run test -- --include=src/app/alertes/**" }]
      };
    }
    if (type === "upload") {
      return {
        tool: "lecture du fichier",
        tools: [{ tool: "read", label: "Lecture", target: option.label, output: "1 240 lignes \xB7 9 colonnes" }],
        intro: "J\u2019ai analys\xE9 le fichier. Voici ce qu\u2019il contient :",
        blocks: [
          { type: "keyvalue", title: "Fichier", items: [
            { label: "Nom", value: option.label, icon: "description" },
            { label: "Lignes", value: "1 240" },
            { label: "Colonnes", value: "9" },
            { label: "P\xE9riode", value: "01/09 \u2192 30/09" },
            { label: "Doublons", value: "3", tone: "warning" },
            { label: "Valeurs manquantes", value: "0,4 %" }
          ] },
          { type: "tags", title: "Colonnes d\xE9tect\xE9es", items: [
            { label: "immatriculation" },
            { label: "date" },
            { label: "d\xE9part" },
            { label: "arriv\xE9e" },
            { label: "distance_km", tone: "primary" },
            { label: "dur\xE9e" },
            { label: "conducteur" },
            { label: "carburant_l", tone: "primary" },
            { label: "alerte", tone: "warning" }
          ] },
          { type: "chart", chart: "bar", title: "Distance par semaine", unit: " km", labels: ["S36", "S37", "S38", "S39"], series: [{ label: "Distance", data: [11200, 12480, 11950, 13100] }] }
        ],
        outro: "Souhaitez-vous que je corrige les 3 doublons ?"
      };
    }
    if (type === "tree") {
      return {
        tool: "g\xE9n\xE9ration du rapport",
        intro: "Le rapport est pr\xEAt avec les pi\xE8ces s\xE9lectionn\xE9es :",
        blocks: [X.reportFiles(), { type: "callout", tone: "success", icon: "task_alt", title: "Rapport g\xE9n\xE9r\xE9", text: option.label }]
      };
    }
    return scenarioFor(detectIntent(option.value));
  }
  function describeValue(field, value) {
    var _a, _b, _c, _d, _e;
    if (value === null || value === void 0 || value === "") return "\u2014";
    if (value instanceof Date) return field.kind === "time" ? value.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : value.toLocaleDateString("fr-FR");
    if (typeof value === "boolean") return value ? "oui" : "non";
    const label = (v) => {
      var _a2, _b2, _c2;
      return (_c2 = (_b2 = findOption((_a2 = field.options) != null ? _a2 : [], v)) == null ? void 0 : _b2.label) != null ? _c2 : String(v);
    };
    switch (field.kind) {
      case "daterange": {
        const r = value;
        return r.start && r.end ? `du ${r.start.toLocaleDateString("fr-FR")} au ${r.end.toLocaleDateString("fr-FR")}` : "\u2014";
      }
      case "range": {
        const [a, b] = value;
        return `${fmt(a)} \u2013 ${fmt(b)}${(_a = field.unit) != null ? _a : ""}`;
      }
      case "currency":
        return `${fmt(value)} ${(_b = field.currency) != null ? _b : "FCFA"}`.replace("XOF", "FCFA");
      case "rating":
        return `${value} / 5`;
      case "password":
        return "\u2022".repeat(Math.min(String(value).length, 10));
      case "signature":
        return "Signature appos\xE9e";
      case "otp":
        return String(value).replace(/./g, "\u2022");
      case "address":
        return (_c = value.label) != null ? _c : "\u2014";
      case "file":
        return (_d = value.nom) != null ? _d : "\u2014";
      case "richtext":
        return clip(String(value).replace(/<[^>]+>/g, " "));
      case "markdown":
      case "textarea":
        return clip(String(value));
    }
    if (Array.isArray(value)) return value.length ? value.map(label).join(", ") : "\u2014";
    return label(value) + ((_e = field.unit) != null ? _e : "");
  }
  var fmt = (n) => Number(n).toLocaleString("fr-FR");
  var clip = (t) => {
    const s = t.replace(/\s+/g, " ").trim();
    return s.length > 90 ? s.slice(0, 89) + "\u2026" : s || "\u2014";
  };
  function findOption(list, v) {
    for (const o of list) {
      if (o.value === v) return o;
      const child = o.children && findOption(o.children, v);
      if (child) return child;
    }
    return void 0;
  }
  var TOOLKIT_CONVERSATION = {
    id: "c-outils",
    title: "D\xE9mo \xB7 bo\xEEte \xE0 outils de l\u2019agent",
    group: "Aujourd'hui",
    pinned: true,
    project: "D\xE9mo",
    model: "opus",
    messages: [
      { id: "o1", role: "user", time: "11:20", blocks: [{ type: "text", text: "Montre-moi tout ce que tu peux afficher pour m\u2019aider \xE0 d\xE9cider." }] },
      {
        id: "o2",
        role: "assistant",
        time: "11:21",
        blocks: [
          { type: "thinking", duration: "3 s", text: "Je pr\xE9sente chaque outil sur un cas concret : explorer, d\xE9tailler, comparer, mesurer, sourcer, puis demander une validation." },
          { type: "text", text: "Voici l\u2019ensemble des outils que je peux utiliser dans une r\xE9ponse, sur des donn\xE9es d\u2019exemple." },
          { type: "text", text: "**Explorer et naviguer**" },
          X.clientTabs(),
          X.clientModal(),
          X.documentsTree(),
          X.offersCarousel(),
          X.faqAccordion(),
          { type: "text", text: "**Mesurer et pr\xE9ciser**" },
          X.usageStats(),
          X.objectives(),
          X.activityHeatmap(),
          X.onboardingSteps(),
          X.installChecklist(),
          X.clientIdentity(),
          X.plansCompare(),
          X.offerCards(),
          { type: "text", text: "**Sourcer et inspecter**" },
          X.webSources(),
          X.topicTags(),
          X.apiJson(),
          X.reportFiles(),
          X.weekAgenda(),
          { type: "text", text: "**Agir avec votre accord**" },
          X.codeDiff(),
          X.approvalTests(),
          X.uploadRequest(),
          X.moreTools()
        ]
      }
    ]
  };
  var KIT_CONVERSATION = {
    id: "c-kit",
    title: "D\xE9mo \xB7 champs, typographie et m\xE9dias",
    group: "Aujourd'hui",
    pinned: true,
    project: "D\xE9mo",
    model: "opus",
    messages: [
      { id: "k1", role: "user", time: "11:40", blocks: [{ type: "text", text: "Montre-moi tous les composants du kit que tu peux afficher : champs, typographie, vid\xE9os\u2026" }] },
      {
        id: "k2",
        role: "assistant",
        time: "11:41",
        blocks: [
          { type: "thinking", duration: "2 s", text: "Je reprends chaque cat\xE9gorie de /components : formulaires et champs avanc\xE9s, typographie et contenu \xE9ditorial, m\xE9dias, puis les composants de pr\xE9cision et de feedback." },
          { type: "text", text: "**Typographie et contenu**" },
          X.typeScale(),
          X.releaseArticle(),
          X.teamComments(),
          { type: "text", text: "**M\xE9dias**" },
          X.tripVideo(),
          X.tutorialVideo(),
          X.videoLibrary(),
          X.callRecording(),
          X.contractPdf(),
          X.sitePhotos(),
          X.truckImage(),
          { type: "text", text: "**Pr\xE9cision et feedback**" },
          X.trackingQr(),
          X.contractDiff(),
          X.clientAudit(),
          X.maintenanceBanner(),
          X.paymentResult(),
          { type: "text", text: "**Tous les champs de formulaire**" },
          X.materialFieldsForm(),
          X.advancedFieldsForm()
        ]
      }
    ]
  };
  var DEMO_CONVERSATION = {
    id: "c-demo",
    title: "D\xE9mo \xB7 rapport d\u2019activit\xE9 flotte",
    group: "Aujourd'hui",
    pinned: true,
    project: "D\xE9mo",
    model: "opus",
    messages: [
      { id: "d1", role: "user", time: "10:02", blocks: [{ type: "text", text: "Fais-moi un rapport d\u2019activit\xE9 de la flotte et des ventes, avec tout ce qui est utile." }] },
      {
        id: "d2",
        role: "assistant",
        time: "10:03",
        blocks: [
          { type: "thinking", duration: "4 s", text: "Le rapport doit couvrir l\u2019\xE9tat de la flotte (carte, alertes), la dynamique commerciale (CA, mix, r\xE9gions) et les encours. Je termine par un formulaire pour planifier l\u2019action corrective." },
          { type: "tool", tool: "search", label: "Recherche", target: "positions GPS", status: "done", output: "8 v\xE9hicules" },
          { type: "tool", tool: "read", label: "Lecture", target: "ventes-T3.xlsx", status: "done", output: "1 240 lignes" },
          { type: "text", text: "Voici le rapport. Les indicateurs sont bons, avec un point d\u2019attention sur un v\xE9hicule hors zone." },
          W.fleetStats(),
          W.fleetMap(),
          W.incidentTimeline(),
          { type: "callout", tone: "warning", icon: "warning", title: "Point d\u2019attention", text: "CI-9902-NP est sorti de sa zone autoris\xE9e. Une intervention est recommand\xE9e." },
          W.salesChart(),
          W.mixChart(),
          W.regionChart(),
          W.clientsTable(),
          W.tasksKanban(),
          W.rolloutGantt(),
          W.planningCalendar(),
          { type: "text", text: "Pour traiter l\u2019alerte, j\u2019ai besoin de quelques informations :" },
          W.interventionForm()
        ]
      }
    ]
  };

  // ../../../../../../home/user/ui-kit/src/app/harnais/harnais.store.ts
  var HarnaisStore = class {
    constructor() {
      this.conversations = signal(structuredClone([KIT_CONVERSATION, TOOLKIT_CONVERSATION, DEMO_CONVERSATION, ...HARNAIS_CONVERSATIONS]));
      /** Conversation en cours de génération (null = aucune). */
      this.generatingId = signal(null);
      /** Appelé à chaque étape de génération (défilement du fil). */
      this.onProgress = () => void 0;
      this.timers = [];
      this.find = (id) => {
        var _a;
        return (_a = this.conversations().find((c) => c.id === id)) != null ? _a : null;
      };
    }
    create(text, model) {
      const conv = {
        id: "c-" + Date.now().toString(36),
        title: text ? truncate(text, 42) : "Conversation sans titre",
        group: "Aujourd'hui",
        model,
        messages: []
      };
      this.conversations.update((list) => [conv, ...list]);
      return conv;
    }
    togglePin(id) {
      this.patchConversation(id, (c) => ({ ...c, pinned: !c.pinned }));
    }
    remove(id) {
      if (this.generatingId() === id) this.stop();
      this.conversations.update((list) => list.filter((c) => c.id !== id));
    }
    setModel(id, model) {
      this.patchConversation(id, (c) => ({ ...c, model }));
    }
    feedback(convId, msgId, value) {
      this.patchMessage(convId, msgId, (m) => ({ ...m, feedback: m.feedback === value ? null : value }));
    }
    send(convId, e) {
      const userMsg = {
        id: "u-" + Date.now().toString(36),
        role: "user",
        time: now(),
        attachments: e.attachments.length ? e.attachments : void 0,
        blocks: [{ type: "text", text: e.text || "Voici les fichiers joints." }]
      };
      this.patchConversation(convId, (c) => ({ ...c, messages: [...c.messages, userMsg] }));
      this.respond(convId, e);
    }
    /** Rejoue la dernière demande en remplaçant la dernière réponse. */
    retry(convId) {
      var _a;
      const conv = this.find(convId);
      if (!conv || this.generatingId()) return;
      const idx = conv.messages.map((m) => m.role).lastIndexOf("user");
      if (idx < 0) return;
      const lastUser = conv.messages[idx];
      const text = lastUser.blocks.find((b) => b.type === "text");
      this.patchConversation(convId, (c) => ({ ...c, messages: c.messages.slice(0, idx + 1) }));
      this.respond(convId, {
        text: (text == null ? void 0 : text.type) === "text" ? text.text : "",
        attachments: (_a = lastUser.attachments) != null ? _a : [],
        extendedThinking: true,
        webSearch: false
      });
    }
    stop() {
      const convId = this.generatingId();
      this.timers.forEach(clearTimeout);
      this.timers = [];
      this.generatingId.set(null);
      const conv = this.find(convId);
      const last = conv == null ? void 0 : conv.messages[conv.messages.length - 1];
      if (!conv || !(last == null ? void 0 : last.streaming)) return;
      this.patchMessage(conv.id, last.id, (m) => ({
        ...m,
        streaming: false,
        stopped: true,
        blocks: m.blocks.map((b) => {
          var _a;
          return b.type === "thinking" ? { ...b, running: false, duration: (_a = b.duration) != null ? _a : "\u2014" } : b.type === "tool" && b.status === "running" ? { ...b, status: "error", output: "Interrompu" } : b;
        })
      }));
    }
    // ─── Simulation : réflexion → outils → texte en flux → liste ──
    respond(convId, e) {
      this.run(convId, scenarioFor(detectIntent(e.text)), e);
    }
    /** L'utilisateur a rempli un formulaire posé par l'agent : on le fige, on récapitule, l'agent enchaîne. */
    submitForm(convId, msgId, index, values) {
      var _a, _b, _c, _d;
      if (this.generatingId()) return;
      const block = (_b = (_a = this.find(convId)) == null ? void 0 : _a.messages.find((m) => m.id === msgId)) == null ? void 0 : _b.blocks[index];
      if ((block == null ? void 0 : block.type) !== "form") return;
      this.patchMessage(convId, msgId, (m) => ({ ...m, blocks: m.blocks.map((b, i) => i === index ? { ...block, values } : b) }));
      const recap = block.fields.filter((f) => values[f.key] !== null && values[f.key] !== "" && !(Array.isArray(values[f.key]) && !values[f.key].length)).map((f) => `${f.label} : ${describeValue(f, values[f.key])}`).join("\n");
      this.pushUser(convId, `${(_c = block.title) != null ? _c : "Formulaire"} \u2014 envoy\xE9
${recap}`);
      this.run(convId, formFollowUp(block.formId, values), { text: (_d = block.title) != null ? _d : "", attachments: [], extendedThinking: false, webSearch: false });
    }
    /**
     * Réponse à un widget interactif (choix rapide, autorisation, fichier, sélection dans un arbre) :
     * le widget mémorise la réponse, elle devient un message de l'utilisateur et l'agent enchaîne.
     */
    choose(convId, msgId, index, option) {
      var _a, _b;
      if (this.generatingId()) return;
      const block = (_b = (_a = this.find(convId)) == null ? void 0 : _a.messages.find((m) => m.id === msgId)) == null ? void 0 : _b.blocks[index];
      if (!block) return;
      const selected = block.type === "upload" || block.type === "tree" ? option.label : option.value;
      if (HARNAIS_ANSWERABLE.has(block.type)) {
        this.patchMessage(convId, msgId, (m) => ({ ...m, blocks: m.blocks.map((b, i) => i === index ? { ...b, selected } : b) }));
      }
      this.pushUser(convId, option.label);
      this.run(convId, answerFollowUp(block.type, option), { text: option.label, attachments: [], extendedThinking: block.type === "choices", webSearch: false });
    }
    pushUser(convId, text) {
      const msg = { id: "u-" + Date.now().toString(36), role: "user", time: now(), blocks: [{ type: "text", text }] };
      this.patchConversation(convId, (c) => ({ ...c, messages: [...c.messages, msg] }));
    }
    // ─── Simulation : réflexion → outils → texte en flux → widgets → conclusion ──
    run(convId, reply2, e) {
      var _a, _b;
      const msgId = "a-" + Date.now().toString(36);
      this.patchConversation(convId, (c) => ({
        ...c,
        messages: [...c.messages, { id: msgId, role: "assistant", time: now(), streaming: true, blocks: [] }]
      }));
      this.generatingId.set(convId);
      const update = (fn) => this.patchMessage(convId, msgId, (m) => ({ ...m, blocks: fn(m.blocks) }));
      const push = (block) => update((bs) => [...bs, block]);
      const patchAt = (index2, block) => update((bs) => bs.map((b, i) => i === index2 ? block : b));
      let at = 300;
      let index = 0;
      const plan = (delay, fn) => {
        at += delay;
        this.timers.push(setTimeout(() => {
          fn();
          this.onProgress();
        }, at));
      };
      const stream = (text) => {
        const i = index++;
        plan(220, () => push({ type: "text", text: "" }));
        for (let n = 4; n < text.length + 4; n += 4) {
          const slice = text.slice(0, n);
          plan(16, () => patchAt(i, { type: "text", text: slice }));
        }
      };
      if (e.extendedThinking) {
        const i = index++;
        const text = thinkingFor(e.text || reply2.tool);
        plan(0, () => push({ type: "thinking", running: true, text }));
        plan(1200, () => patchAt(i, { type: "thinking", running: false, duration: "1 s", text }));
      }
      const tools = [
        ...e.webSearch ? [tool("web", "Recherche web", truncate(e.text, 32), "6 sources consult\xE9es")] : [],
        ...e.attachments.map((a) => tool("read", "Lecture", a.name, a.size)),
        ...(_b = (_a = reply2.tools) == null ? void 0 : _a.map((t) => tool(t.tool, t.label, t.target, t.output))) != null ? _b : [tool("search", "Recherche", reply2.tool, "donn\xE9es \xE0 jour")]
      ];
      for (const t of tools) {
        const i = index++;
        plan(180, () => push({ ...t, status: "running", output: void 0 }));
        plan(650, () => patchAt(i, t));
      }
      stream(reply2.intro);
      for (const block of reply2.blocks) {
        index++;
        plan(block.type === "text" || block.type === "list" ? 200 : 420, () => push(structuredClone(block)));
      }
      if (reply2.outro) stream(reply2.outro);
      plan(150, () => {
        this.patchMessage(convId, msgId, (m) => ({ ...m, streaming: false }));
        this.generatingId.set(null);
        this.timers = [];
      });
    }
    // ─── Mises à jour immuables (les composants enfants reposent sur des inputs signal) ──
    patchConversation(id, fn) {
      this.conversations.update((list) => list.map((c) => c.id === id ? fn(c) : c));
    }
    patchMessage(convId, msgId, fn) {
      this.patchConversation(convId, (c) => ({ ...c, messages: c.messages.map((m) => m.id === msgId ? fn(m) : m) }));
    }
  };
  HarnaisStore = __decorateClass([
    Injectable({ providedIn: "root" })
  ], HarnaisStore);
  var tool = (kind, label, target, output) => ({ type: "tool", tool: kind, label, target, status: "done", output });
  var now = () => (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  var truncate = (s, n) => s.length > n ? s.slice(0, n - 1).trimEnd() + "\u2026" : s;
  function thinkingFor(prompt) {
    return `La demande porte sur \xAB ${truncate(prompt, 60)} \xBB. Je rassemble les donn\xE9es utiles, puis je choisis la forme la plus lisible : carte, graphique, tableau, planning ou formulaire si une information me manque.`;
  }

  // entry.ts
  var store = new HarnaisStore();
  var data = harnais_data_exports;
  return __toCommonJS(entry_exports);
})();
