/* Données statiques reprises de ui-kit/src/app/data/static/showcase.data.ts (transpilé). Exposé sous window.DATA. */
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

  // data/static/showcase.data.ts
  var showcase_data_exports = {};
  __export(showcase_data_exports, {
    CA_MENSUEL_2025: () => CA_MENSUEL_2025,
    CA_MENSUEL_2026: () => CA_MENSUEL_2026,
    DEMO_CLIENTS: () => DEMO_CLIENTS,
    MATERIAL_ICONS: () => MATERIAL_ICONS,
    MOIS: () => MOIS,
    SECTEUR_OPTIONS: () => SECTEUR_OPTIONS,
    STATUT_COLOR: () => STATUT_COLOR,
    TIMELINE_EVENTS: () => TIMELINE_EVENTS,
    VILLE_OPTIONS: () => VILLE_OPTIONS
  });
  var RAISONS = [
    "Transports Yao & Fils",
    "Bollor\xE9 Logistics CI",
    "SOTRA Abidjan",
    "Kouam\xE9 BTP",
    "Ivoire Express Livraison",
    "CFAO Motors CI",
    "Groupe Diallo N\xE9goce",
    "SIFCA Logistique",
    "Coulibaly Fr\xE8res Transit",
    "Aka Mobilit\xE9",
    "Sahel Cargo",
    "Bamba Distribution",
    "Ouattara Services",
    "San-P\xE9dro Shipping",
    "Yamoussoukro Taxi Pool",
    "Bouak\xE9 Agro Transport",
    "Gbaka Line",
    "Atlantique Fret",
    "Konan Location Auto",
    "Treichville Moto Pro",
    "Cocody Premium Cars",
    "Plateau VTC",
    "Daloa C\xE9r\xE9ales",
    "Korhogo Coton Logistique",
    "Man Minerais",
    "Assinie Tourisme",
    "Grand-Bassam Bus",
    "Yopougon Livraison",
    "Abobo Transports",
    "Marcory Auto-\xC9cole",
    "Port-Bou\xEBt Conteneurs",
    "Bingerville Agrumes",
    "Anyama Kola Export",
    "Divo Cacao Trans",
    "Gagnoa Bois",
    "Soubr\xE9 Palmeraie",
    "Odienn\xE9 B\xE9tail",
    "Bondoukou N\xE9goce",
    "Abengourou H\xE9v\xE9a",
    "Agboville Mara\xEEchers"
  ];
  var CONTACTS = [
    "Jean Kouassi",
    "Marie Yao",
    "Aminata Diallo",
    "Koffi N\u2019Guessan",
    "Fatou Bamba",
    "Serge Kouam\xE9",
    "Awa Coulibaly",
    "Patrick Aka",
    "Mariam Ouattara",
    "Eric Konan",
    "Christelle Tanoh",
    "Ibrahim Traor\xE9",
    "Nad\xE8ge Gnagne",
    "Yves Brou",
    "Alimata Kon\xE9",
    "Didier Assi",
    "Sandrine Ehui",
    "Moussa Sanogo",
    "Brigitte Adjoua",
    "Herv\xE9 Kacou"
  ];
  var VILLES = ["Abidjan", "Yamoussoukro", "Bouak\xE9", "San-P\xE9dro", "Daloa", "Korhogo", "Man", "Gagnoa"];
  var SECTEURS = ["Transport", "Logistique", "BTP", "Distribution", "Agro-industrie", "Location", "Tourisme"];
  var STATUTS = ["ACTIF", "ACTIF", "ACTIF", "SUSPENDU", "ACTIF", "INACTIF", "ACTIF", "RESILIE"];
  var slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
  var DEMO_CLIENTS = RAISONS.map((raison, i) => {
    const contact = CONTACTS[i % CONTACTS.length];
    const day = i * 7 % 28 + 1;
    const month = i * 5 % 12 + 1;
    return {
      _id: `cli-${String(i + 1).padStart(3, "0")}`,
      code: `CLI-${String(1040 + i * 3)}`,
      raison_sociale: raison,
      contact,
      email: `${slug(contact)}@${slug(raison).split(".")[0]}.ci`,
      telephone: `+225 07 ${String(10 + i * 13 % 89).padStart(2, "0")} ${String(20 + i * 17 % 79).padStart(2, "0")} ${String(30 + i * 7 % 69).padStart(2, "0")}`,
      ville: VILLES[i % VILLES.length],
      secteur: SECTEURS[i % SECTEURS.length],
      vehicules: 2 + i * 11 % 47,
      ca_mensuel: 15e4 + i * 137500 % 485e4,
      statut: STATUTS[i % STATUTS.length],
      created_at: `${2024 + i % 3}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    };
  });
  var STATUT_COLOR = {
    ACTIF: "success",
    INACTIF: "neutral",
    SUSPENDU: "warning",
    RESILIE: "error"
  };
  var VILLE_OPTIONS = VILLES.map((v) => ({ value: v, label: v }));
  var SECTEUR_OPTIONS = SECTEURS.map((s) => ({ value: s, label: s }));
  var MOIS = ["Jan", "F\xE9v", "Mar", "Avr", "Mai", "Juin", "Juil", "Ao\xFBt", "Sep", "Oct", "Nov", "D\xE9c"];
  var CA_MENSUEL_2026 = [38.2, 41.5, 39.8, 44.1, 47.6, 46.2, 49.9, 52.4, 51.1, 55.8, 0, 0].map((v) => v * 1e6);
  var CA_MENSUEL_2025 = [31.4, 33, 34.8, 35.2, 37.9, 38.4, 40.1, 41.7, 42.2, 44, 45.3, 47.9].map((v) => v * 1e6);
  var TIMELINE_EVENTS = [
    { date: "2026-10-13T09:12:00", icon: "add_circle", color: "primary", titre: "Requ\xEAte cr\xE9\xE9e", texte: "REQ-2026-0412 \xAB Balise hors ligne \xBB ouverte par Marie Yao." },
    { date: "2026-10-13T10:05:00", icon: "assignment_ind", color: "info", titre: "Affect\xE9e", texte: "Assign\xE9e \xE0 Koffi N\u2019Guessan (\xE9quipe technique Abidjan Sud)." },
    { date: "2026-10-13T14:40:00", icon: "engineering", color: "warning", titre: "Intervention planifi\xE9e", texte: "Passage sur site pr\xE9vu le 14/10 \xE0 08:30 \u2014 Zone 4, Marcory." },
    { date: "2026-10-14T09:55:00", icon: "check_circle", color: "success", titre: "R\xE9solue", texte: "Antenne GPS remplac\xE9e, balise de nouveau en ligne." },
    { date: "2026-10-14T11:20:00", icon: "lock", color: "neutral", titre: "Cl\xF4tur\xE9e", texte: "Cl\xF4ture valid\xE9e par le client (satisfaction 5/5)." }
  ];
  var MATERIAL_ICONS = [
    "dashboard",
    "people",
    "inventory_2",
    "settings_input_antenna",
    "support_agent",
    "build",
    "cloud_sync",
    "menu_book",
    "hub",
    "savings",
    "task_alt",
    "account_balance",
    "folder",
    "admin_panel_settings",
    "analytics",
    "contact_support",
    "event_available",
    "assignment_ind",
    "groups",
    "assignment",
    "event_note",
    "engineering",
    "calendar_month",
    "call",
    "event",
    "contact_page",
    "folder_shared",
    "outbound",
    "settings",
    "payments",
    "receipt_long",
    "sticky_note_2",
    "supervisor_account",
    "upload_file",
    "receipt",
    "workspaces",
    "subscriptions",
    "playlist_add_check",
    "group",
    "add",
    "edit",
    "delete",
    "visibility",
    "more_vert",
    "search",
    "close",
    "refresh",
    "filter_list",
    "grid_view",
    "view_list",
    "arrow_back",
    "arrow_forward",
    "chevron_left",
    "chevron_right",
    "expand_more",
    "check",
    "check_circle",
    "error",
    "warning",
    "info",
    "help_outline",
    "notifications",
    "checklist",
    "dark_mode",
    "light_mode",
    "logout",
    "login",
    "lock",
    "person",
    "badge",
    "mail",
    "phone",
    "alternate_email",
    "location_on",
    "schedule",
    "today",
    "download",
    "upload",
    "attach_file",
    "insert_photo",
    "picture_as_pdf",
    "description",
    "print",
    "share",
    "send",
    "save",
    "content_copy",
    "open_in_new",
    "link",
    "star",
    "favorite",
    "trending_up",
    "trending_down",
    "bar_chart",
    "pie_chart",
    "show_chart",
    "timeline",
    "directions_car",
    "local_shipping",
    "gps_fixed",
    "sim_card",
    "router",
    "sync",
    "history",
    "archive",
    "unarchive",
    "drag_indicator",
    "menu",
    "menu_open",
    "widgets",
    "palette",
    "code"
  ];
  return __toCommonJS(showcase_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
