/* Données statiques reprises de ui-kit/src/app/data/static/planning.data.ts (transpilé). Exposé sous window.DATA. */
"use strict";
var __d = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
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

  // data/static/planning.data.ts
  var planning_data_exports = {};
  __export(planning_data_exports, {
    INTERVENTIONS: () => INTERVENTIONS,
    INTERVENTION_COLUMNS: () => INTERVENTION_COLUMNS,
    INTERVENTION_FILTERS: () => INTERVENTION_FILTERS,
    MOTIF_FILTER: () => MOTIF_FILTER,
    PHASES: () => PHASES,
    RDV_KIND_FILTER: () => RDV_KIND_FILTER,
    RENDEZ_VOUS: () => RENDEZ_VOUS,
    RESERVATIONS: () => RESERVATIONS,
    TECHNICIENS: () => TECHNICIENS,
    VEHICULES: () => VEHICULES
  });
  var D = (offsetDays, h = 0, m = 0) => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(h, m, 0, 0);
    d.setDate(d.getDate() + offsetDays);
    return d;
  };
  var INTERVENTION_COLUMNS = [
    { key: "planifiee", label: "Planifi\xE9e", color: "var(--info-color)" },
    { key: "en_route", label: "En route", color: "var(--purple-color)" },
    { key: "sur_site", label: "Sur site", color: "var(--warning-color)" },
    { key: "cloturee", label: "Cl\xF4tur\xE9e", color: "var(--success-color)" }
  ];
  var TECHNICIENS = [
    { key: "kouame", label: "Kouam\xE9 Aya", subtitle: "Abidjan Sud", color: "var(--primary-color)" },
    { key: "traore", label: "Traor\xE9 Ibrahim", subtitle: "Abidjan Nord", color: "var(--info-color)" },
    { key: "yao", label: "Yao Serge", subtitle: "Bouak\xE9", color: "var(--purple-color)" }
  ];
  var TYPE_TONE = { installation: "primary", maintenance: "info", diagnostic: "warning", desinstallation: "neutral" };
  var TYPE_LABEL = { installation: "Installation", maintenance: "Maintenance", diagnostic: "Diagnostic", desinstallation: "D\xE9sinstallation" };
  function inter(n, title, type, status, tech, due, extra = {}) {
    const g = TECHNICIENS.find((t) => t.key === tech);
    return __spreadValues({
      id: `int-${n}`,
      ref: `INT-${String(400 + n).padStart(4, "0")}`,
      title,
      status,
      group: tech,
      assignee: g.label,
      due: D(due, 17),
      start: D(due, 8 + n % 8),
      done: status === "cloturee",
      progress: status === "cloturee" ? 100 : status === "sur_site" ? 60 : status === "en_route" ? 20 : 0,
      tone: TYPE_TONE[type],
      badge: { label: TYPE_LABEL[type], tone: TYPE_TONE[type] },
      fields: { type, zone: g.subtitle }
    }, extra);
  }
  var INTERVENTIONS = [
    inter(1, "Pose balise \u2014 Transports Yao (CI-4521-AB)", "installation", "planifiee", "kouame", 1, { description: "Pose d\u2019une balise FMB920 avec coupure moteur. Pr\xE9voir relais 12 V." }),
    inter(2, "Balise hors ligne \u2014 SOTRA bus 112", "diagnostic", "planifiee", "traore", -2, { description: "Aucune position depuis 48 h. V\xE9rifier alimentation et carte SIM.", tags: ["Urgent"] }),
    inter(3, "Maintenance capteur carburant", "maintenance", "en_route", "yao", 0, { description: "Recalibrage de la sonde apr\xE8s remplacement du r\xE9servoir." }),
    inter(4, "Installation flotte \u2014 6 v\xE9hicules L\xF4h Logistique", "installation", "sur_site", "kouame", 0, { description: "Lot de 6 balises + boutons SOS." }),
    inter(5, "Retrait balise \u2014 fin de contrat CFAO", "desinstallation", "planifiee", "traore", 3),
    inter(6, "Remplacement antenne GPS", "maintenance", "cloturee", "yao", -3),
    inter(7, "Diagnostic coupure intermittente", "diagnostic", "sur_site", "traore", -1, { description: "Coupures al\xE9atoires signal\xE9es par le client depuis lundi." }),
    inter(8, "Pose cam\xE9ra embarqu\xE9e \u2014 Bollor\xE9", "installation", "planifiee", "yao", 5),
    inter(9, "Contr\xF4le annuel \u2014 flotte Ivoire Express", "maintenance", "cloturee", "kouame", -5),
    inter(10, "Mise \xE0 jour firmware (12 balises)", "maintenance", "en_route", "kouame", 2),
    inter(11, "Installation bo\xEEtier temp\xE9rature \u2014 Agro CI", "installation", "planifiee", "traore", 8),
    inter(12, "Retrait \xE9quipement accident\xE9", "desinstallation", "cloturee", "yao", -7)
  ];
  var INTERVENTION_FILTERS = {
    type: { key: "type", label: "Type", allLabel: "Tous les types", options: Object.keys(TYPE_LABEL).map((k) => ({ value: k, label: TYPE_LABEL[k] })) },
    zone: { key: "zone", label: "Zone", allLabel: "Toutes les zones", options: ["Abidjan Sud", "Abidjan Nord", "Bouak\xE9"].map((z) => ({ value: z, label: z })) },
    technicien: { key: "group", label: "Technicien", allLabel: "Tous", options: TECHNICIENS.map((t) => ({ value: t.key, label: t.label })) }
  };
  var VEHICULES = [
    { key: "v1", label: "Toyota Hilux", subtitle: "CI-1024-AB", icon: "local_shipping", color: "var(--primary-color)" },
    { key: "v2", label: "Renault Kangoo", subtitle: "CI-2210-CD", icon: "airport_shuttle", color: "var(--info-color)" },
    { key: "v3", label: "Suzuki Swift", subtitle: "CI-3307-EF", icon: "directions_car", color: "var(--purple-color)" },
    { key: "v4", label: "Yamaha Crux", subtitle: "CI-0418-GH", icon: "two_wheeler", color: "var(--cyan-color)" }
  ];
  var RESERVATIONS = [
    { id: "r1", ref: "RSV-101", title: "Tourn\xE9e Abidjan Sud", group: "v1", start: D(-6), end: D(-2), done: true, assignee: "Kouam\xE9 Aya", tone: "success", fields: { motif: "tournee" } },
    { id: "r2", ref: "RSV-102", title: "D\xE9ploiement L\xF4h Logistique", group: "v1", start: D(-1), end: D(3), due: D(2), progress: 55, assignee: "Kouam\xE9 Aya", tone: "primary", fields: { motif: "installation" } },
    { id: "r3", ref: "RSV-103", title: "Mission Bouak\xE9", group: "v2", start: D(-4), end: D(-1), due: D(-2), progress: 80, assignee: "Yao Serge", tone: "warning", fields: { motif: "mission" } },
    { id: "r4", ref: "RSV-104", title: "Livraison mat\xE9riel Yamoussoukro", group: "v2", start: D(2), end: D(4), assignee: "Traor\xE9 Ibrahim", tone: "info", fields: { motif: "livraison" } },
    { id: "r5", ref: "RSV-105", title: "Visite client CFAO", group: "v3", start: D(0), end: D(0), assignee: "Traor\xE9 Ibrahim", tone: "purple", fields: { motif: "visite" } },
    { id: "r6", ref: "RSV-106", title: "R\xE9vision garage", group: "v3", start: D(5), end: D(7), tone: "neutral", fields: { motif: "entretien" } },
    { id: "r7", ref: "RSV-107", title: "Courses urgentes", group: "v4", start: D(-3), end: D(1), assignee: "Coulibaly Awa", tone: "error", fields: { motif: "mission" } },
    { id: "r8", ref: "RSV-108", title: "Relev\xE9s compteurs", group: "v4", start: D(1), end: D(2), assignee: "Coulibaly Awa", tone: "info", fields: { motif: "tournee" } },
    { id: "r9", ref: "RSV-109", title: "Formation conduite", group: "v1", start: D(6), end: D(9), tone: "purple", fields: { motif: "formation" } }
  ];
  var MOTIF_FILTER = {
    key: "motif",
    label: "Motif",
    allLabel: "Tous les motifs",
    options: [["tournee", "Tourn\xE9e"], ["installation", "Installation"], ["mission", "Mission"], ["livraison", "Livraison"], ["visite", "Visite"], ["entretien", "Entretien"], ["formation", "Formation"]].map(([value, label]) => ({ value, label }))
  };
  var PHASES = [
    { id: "p1", ref: "P1", title: "Cadrage & devis", start: D(-12), end: D(-8), done: true, tone: "success" },
    { id: "p2", ref: "P2", title: "Commande des balises", start: D(-8), end: D(-3), due: D(-4), progress: 90, tone: "info" },
    { id: "p3", ref: "P3", title: "Installation sur la flotte", start: D(-3), end: D(6), progress: 40, tone: "primary" },
    { id: "p4", ref: "P4", title: "Formation des exploitants", start: D(5), end: D(8), tone: "purple" },
    { id: "p5", ref: "P5", title: "Recette & mise en service", start: D(8), end: D(11), tone: "warning" }
  ];
  var W = (dow, h, m = 0) => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(h, m, 0, 0);
    d.setDate(d.getDate() - (d.getDay() + 6) % 7 + dow);
    return d;
  };
  var RENDEZ_VOUS = [
    { id: "a1", title: "Point hebdo exploitation", start: W(0, 9), end: W(0, 10), tone: "primary", assignee: "\xC9quipe ops", fields: { kind: "reunion" } },
    { id: "a2", title: "D\xE9mo plateforme \u2014 Agro CI", start: W(0, 11), end: W(0, 12, 30), tone: "purple", fields: { kind: "client" } },
    { id: "a3", title: "Installation CI-4521-AB", start: W(1, 8, 30), end: W(1, 11), tone: "info", assignee: "Kouam\xE9 Aya", fields: { kind: "terrain" } },
    { id: "a4", title: "Appel fournisseur Teltonika", start: W(1, 10), end: W(1, 10, 45), tone: "warning", fields: { kind: "reunion" } },
    { id: "a5", title: "Diagnostic SOTRA bus 112", start: W(2, 14), end: W(2, 16), tone: "error", assignee: "Traor\xE9 Ibrahim", fields: { kind: "terrain" } },
    { id: "a6", title: "Revue des impay\xE9s", start: W(2, 15), end: W(2, 16, 30), tone: "neutral", fields: { kind: "reunion" } },
    { id: "a7", title: "Formation nouveaux techniciens", start: W(3, 9), end: W(3, 12), tone: "success", fields: { kind: "formation" } },
    { id: "a8", title: "Visite Bollor\xE9 \u2014 cam\xE9ras", start: W(3, 14, 30), end: W(3, 15, 30), tone: "purple", fields: { kind: "client" } },
    { id: "a9", title: "Inventaire du stock", start: W(4, 0), tone: "info", fields: { kind: "interne" } },
    { id: "a10", title: "Cl\xF4ture mensuelle", start: W(4, 16), end: W(4, 18), tone: "primary", fields: { kind: "reunion" } },
    { id: "a11", title: "Astreinte week-end", start: W(5, 0), tone: "warning", fields: { kind: "interne" } },
    { id: "a12", title: "Point flotte L\xF4h Logistique", start: W(1, 15), end: W(1, 16), tone: "info", fields: { kind: "client" } }
  ];
  var RDV_KIND_FILTER = {
    key: "kind",
    label: "Cat\xE9gorie",
    allLabel: "Toutes",
    options: [["reunion", "R\xE9union"], ["client", "Client"], ["terrain", "Terrain"], ["formation", "Formation"], ["interne", "Interne"]].map(([value, label]) => ({ value, label }))
  };
  return __toCommonJS(planning_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
