/* Données statiques reprises de ui-kit/src/app/data/static/examples.data.ts (transpilé). Exposé sous window.DATA. */
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

  // data/static/examples.data.ts
  var examples_data_exports = {};
  __export(examples_data_exports, {
    CLIENT_STATUS: () => CLIENT_STATUS,
    EX_ACTIVITY: () => EX_ACTIVITY,
    EX_CATEGORIES: () => EX_CATEGORIES,
    EX_CLIENTS: () => EX_CLIENTS,
    EX_INVOICES: () => EX_INVOICES,
    EX_MESSAGES: () => EX_MESSAGES,
    EX_MODULES: () => EX_MODULES,
    EX_PRODUCTS: () => EX_PRODUCTS
  });
  var CLIENT_STATUS = {
    actif: { label: "Actif", color: "success" },
    prospect: { label: "Prospect", color: "info" },
    suspendu: { label: "Suspendu", color: "warning" },
    inactif: { label: "Inactif", color: "neutral" }
  };
  var NAMES = [
    ["Sotra Logistique", "Aya Kon\xE9", "Transport"],
    ["Ivoire Agro SA", "Moussa Traor\xE9", "Agro-industrie"],
    ["Banque Lagune", "Fatou Diabat\xE9", "Finance"],
    ["Cacao Plus", "Yao N\u2019Guessan", "Agro-industrie"],
    ["Clinique Riviera", "Dr Awa Bamba", "Sant\xE9"],
    ["Batim CI", "Koffi Assi", "BTP"],
    ["Orca T\xE9l\xE9com", "Mariam Ouattara", "T\xE9l\xE9coms"],
    ["H\xF4tel Assinie", "Serge Kacou", "H\xF4tellerie"],
    ["Pharma Sud", "In\xE8s Coulibaly", "Sant\xE9"],
    ["Energie Nord", "Ibrahim Sanogo", "\xC9nergie"],
    ["Caf\xE9 Akwaba", "Rose Adjoua", "Restauration"],
    ["Mines de Tongon", "Alain Gnamien", "Mines"],
    ["\xC9cole Les Palmiers", "Nadia Tour\xE9", "\xC9ducation"],
    ["AutoPro Yopougon", "Didier Zadi", "Automobile"],
    ["Textile Bouak\xE9", "Salif Konat\xE9", "Industrie"],
    ["Port Sec San Pedro", "Linda Ehui", "Transport"],
    ["Studio Lagune", "Eric Brou", "M\xE9dias"],
    ["Agence K\xF4r\xF4", "Mireille Yapi", "Services"],
    ["FreshMarket", "Herv\xE9 Tanoh", "Distribution"],
    ["Assur\u2019Ivoire", "Kadi Fofana", "Assurance"],
    ["Cimenterie Est", "Paul Amani", "Industrie"],
    ["Digital Baobab", "Grace Kouam\xE9", "Num\xE9rique"],
    ["Radio Plateau", "Jules Ahoua", "M\xE9dias"],
    ["Ferme Bio Dabou", "Clarisse Dj\xE8", "Agro-industrie"]
  ];
  var CITIES = ["Abidjan", "Bouak\xE9", "San Pedro", "Yamoussoukro", "Korhogo", "Daloa", "Man", "Grand-Bassam"];
  var STATUSES = ["actif", "actif", "prospect", "actif", "suspendu", "actif", "inactif", "prospect"];
  var OWNERS = ["Jean Kouassi", "A\xEFcha Diallo", "Marc Yao", "Sarah Bamba"];
  var EX_CLIENTS = NAMES.map(([name, contact, sector], i) => ({
    id: "c-" + (101 + i),
    name,
    contact,
    sector,
    email: contact.toLowerCase().normalize("NFD").replace(/[^a-z ]/g, "").trim().replace(/\s+/g, ".") + "@" + name.toLowerCase().normalize("NFD").replace(/[^a-z]/g, "").slice(0, 12) + ".ci",
    phone: `+225 07 ${String(10 + i * 37 % 89).padStart(2, "0")} ${String(10 + i * 53 % 89).padStart(2, "0")} ${String(10 + i * 71 % 89).padStart(2, "0")}`,
    city: CITIES[i % CITIES.length],
    status: STATUSES[i % STATUSES.length],
    revenue: Math.round((i * 7919 % 97 + 8) * 125e4),
    invoices: i * 13 % 40 + 2,
    since: new Date(2019 + i % 7, i * 5 % 12, 1 + i * 11 % 27).toISOString(),
    owner: OWNERS[i % OWNERS.length]
  }));
  var EX_ACTIVITY = [
    { icon: "receipt_long", tone: "primary", text: "Facture FAC-2026-0412 \xE9mise \xB7 4 250 000 FCFA", at: "Il y a 12 min", who: "Jean Kouassi" },
    { icon: "payments", tone: "success", text: "Paiement re\xE7u de Banque Lagune", at: "Il y a 1 h", who: "Syst\xE8me" },
    { icon: "person_add", tone: "info", text: "Nouveau prospect : Digital Baobab", at: "Il y a 3 h", who: "A\xEFcha Diallo" },
    { icon: "warning", tone: "warning", text: "Relance : Clinique Riviera, 2 factures en retard", at: "Hier", who: "Syst\xE8me" },
    { icon: "description", tone: "purple", text: "Contrat sign\xE9 avec Orca T\xE9l\xE9com", at: "Hier", who: "Marc Yao" },
    { icon: "block", tone: "error", text: "Compte suspendu : Pharma Sud", at: "Il y a 2 j", who: "Sarah Bamba" }
  ];
  var EX_INVOICES = [
    { ref: "FAC-2026-0412", date: "2026-10-14", amount: 425e4, status: "en attente" },
    { ref: "FAC-2026-0388", date: "2026-09-30", amount: 187e4, status: "pay\xE9e" },
    { ref: "FAC-2026-0351", date: "2026-09-02", amount: 24e5, status: "en retard" },
    { ref: "FAC-2026-0310", date: "2026-08-05", amount: 96e4, status: "pay\xE9e" },
    { ref: "FAC-2026-0277", date: "2026-07-11", amount: 315e4, status: "pay\xE9e" }
  ];
  var EX_MESSAGES = [
    {
      id: "m1",
      from: "Aya Kon\xE9",
      email: "aya.kone@sotra.ci",
      subject: "Livraison du lot 14 \u2014 cr\xE9neau confirm\xE9",
      at: "09:24",
      unread: true,
      starred: true,
      label: { text: "Logistique", color: "info" },
      attachments: ["bon-livraison-14.pdf"],
      preview: "Bonjour, nous confirmons le cr\xE9neau de jeudi 8h pour la livraison du lot 14\u2026",
      body: ["Bonjour Jean,", "Nous confirmons le cr\xE9neau de jeudi 8 h pour la livraison du lot 14 au d\xE9p\xF4t de Vridi. Le camion arrivera avec 32 palettes.", "Vous trouverez le bon de livraison en pi\xE8ce jointe. Merci de pr\xE9voir deux agents pour le d\xE9chargement.", "Bien cordialement,\nAya Kon\xE9 \u2014 Sotra Logistique"]
    },
    {
      id: "m2",
      from: "Fatou Diabat\xE9",
      email: "f.diabate@banquelagune.ci",
      subject: "Relev\xE9 de compte septembre",
      at: "08:02",
      unread: true,
      starred: false,
      label: { text: "Finance", color: "success" },
      preview: "Veuillez trouver ci-joint le relev\xE9 de compte du mois de septembre\u2026",
      body: ["Bonjour,", "Veuillez trouver ci-joint le relev\xE9 de compte du mois de septembre. Le solde cr\xE9diteur s\u2019\xE9l\xE8ve \xE0 48 320 000 FCFA.", "Cordialement,\nFatou Diabat\xE9"]
    },
    {
      id: "m3",
      from: "Marc Yao",
      email: "marc.yao@exemple.ci",
      subject: "Re: Proposition Orca T\xE9l\xE9com",
      at: "Hier",
      unread: false,
      starred: true,
      preview: "Le client a valid\xE9 la proposition, je pr\xE9pare le contrat pour signature\u2026",
      body: ["Salut Jean,", "Le client a valid\xE9 la proposition \xE0 12,4 M FCFA. Je pr\xE9pare le contrat pour une signature lundi.", "Marc"]
    },
    {
      id: "m4",
      from: "Support UI Kit",
      email: "support@uikit.dev",
      subject: "Votre ticket #4821 a \xE9t\xE9 r\xE9solu",
      at: "Hier",
      unread: false,
      starred: false,
      label: { text: "Support", color: "purple" },
      preview: "Bonne nouvelle : le probl\xE8me d\u2019export PDF est corrig\xE9 dans la version 2.4\u2026",
      body: ["Bonjour,", "Bonne nouvelle : le probl\xE8me d\u2019export PDF est corrig\xE9 dans la version 2.4. Aucune action n\u2019est requise de votre part.", "L\u2019\xE9quipe Support"]
    },
    {
      id: "m5",
      from: "Dr Awa Bamba",
      email: "a.bamba@clinique-riviera.ci",
      subject: "\xC9ch\xE9ancier de paiement",
      at: "Lun.",
      unread: false,
      starred: false,
      label: { text: "Relance", color: "warning" },
      preview: "Suite \xE0 votre relance, nous proposons un r\xE8glement en trois \xE9ch\xE9ances\u2026",
      body: ["Monsieur Kouassi,", "Suite \xE0 votre relance, nous proposons un r\xE8glement en trois \xE9ch\xE9ances mensuelles \xE0 compter du 1er novembre.", "Dr Awa Bamba"]
    },
    {
      id: "m6",
      from: "Serge Kacou",
      email: "serge@hotel-assinie.ci",
      subject: "R\xE9servation s\xE9minaire d\xE9cembre",
      at: "Dim.",
      unread: false,
      starred: false,
      preview: "Nous avons bien not\xE9 votre demande pour 40 personnes du 12 au 14 d\xE9cembre\u2026",
      body: ["Bonjour,", "Nous avons bien not\xE9 votre demande pour 40 personnes du 12 au 14 d\xE9cembre. Un devis vous sera adress\xE9 sous 48 h.", "Serge Kacou \u2014 H\xF4tel Assinie"]
    },
    {
      id: "m7",
      from: "Grace Kouam\xE9",
      email: "grace@digitalbaobab.ci",
      subject: "Atelier design system",
      at: "12 oct.",
      unread: false,
      starred: false,
      preview: "Merci pour l\u2019atelier de mardi ! Voici le compte rendu et les prochaines \xE9tapes\u2026",
      body: ["Merci pour l\u2019atelier de mardi !", "Voici le compte rendu et les prochaines \xE9tapes : audit des composants, jetons de couleur, documentation.", "Grace"]
    }
  ];
  var PRODUCTS = [
    ["Casque sans fil Pro", "Audio", "headphones", 210],
    ["Enceinte nomade", "Audio", "speaker", 190],
    ["Montre connect\xE9e S2", "Objets connect\xE9s", "watch", 260],
    ['Ordinateur portable 14"', "Informatique", "laptop_mac", 220],
    ['\xC9cran 27" QHD', "Informatique", "monitor", 200],
    ["Clavier m\xE9canique", "Informatique", "keyboard", 280],
    ["Smartphone X12", "T\xE9l\xE9phonie", "smartphone", 170],
    ['Tablette 11"', "T\xE9l\xE9phonie", "tablet", 160],
    ["Appareil photo hybride", "Photo", "photo_camera", 20],
    ["Drone compact", "Photo", "flight", 30],
    ["Console portable", "Jeux", "sports_esports", 300],
    ["Routeur Wi-Fi 6", "R\xE9seau", "router", 140]
  ];
  var EX_PRODUCTS = PRODUCTS.map(([name, category, icon, hue], i) => ({
    id: "p-" + (i + 1),
    name,
    category,
    icon,
    hue,
    price: (i * 37 % 23 + 4) * 15e3,
    rating: 3.5 + i * 7 % 15 / 10,
    stock: i * 17 % 9 === 0 ? 0 : i * 17 % 40,
    badge: i % 5 === 0 ? "Nouveau" : i % 4 === 1 ? "-20 %" : void 0
  }));
  var EX_CATEGORIES = [...new Set(EX_PRODUCTS.map((p) => p.category))];
  var EX_MODULES = [
    { id: "crm", label: "Clients", icon: "groups", description: "Comptes, contacts et opportunit\xE9s", color: "#0ea5e9", count: "1 248 comptes", badge: 3 },
    { id: "billing", label: "Facturation", icon: "receipt_long", description: "Devis, factures, encaissements", color: "#10b981", count: "86 factures ce mois" },
    { id: "stock", label: "Stocks", icon: "inventory_2", description: "Articles, entrep\xF4ts, mouvements", color: "#f59e0b", count: "4 entrep\xF4ts" },
    { id: "planning", label: "Planning", icon: "calendar_month", description: "Interventions et rendez-vous", color: "#8b5cf6", count: "14 aujourd\u2019hui", badge: 2 },
    { id: "fleet", label: "Flotte", icon: "local_shipping", description: "V\xE9hicules, trajets, balises", color: "#ef4444", count: "62 v\xE9hicules" },
    { id: "hr", label: "Ressources humaines", icon: "badge", description: "Employ\xE9s, cong\xE9s, paie", color: "#ec4899", count: "138 employ\xE9s" },
    { id: "docs", label: "Documents", icon: "folder_open", description: "GED, mod\xE8les, signatures", color: "#64748b", count: "2,4 Go" },
    { id: "reports", label: "Rapports", icon: "insights", description: "Tableaux de bord et exports", color: "#06b6d4", count: "18 rapports" },
    { id: "support", label: "Support", icon: "support_agent", description: "Tickets et base de connaissances", color: "#f97316", count: "7 tickets ouverts", badge: 7 },
    { id: "settings", label: "Administration", icon: "admin_panel_settings", description: "Utilisateurs, r\xF4les, int\xE9grations", color: "#475569" }
  ];
  return __toCommonJS(examples_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
