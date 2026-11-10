/* Données statiques reprises de ui-kit/src/app/data/static/harnais.data.ts (transpilé). Exposé sous window.DATA. */
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

  // data/static/harnais.data.ts
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
  return __toCommonJS(harnais_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
