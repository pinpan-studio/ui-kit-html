/* Données statiques reprises de ui-kit/src/app/data/static/session.data.ts (transpilé). Exposé sous window.DATA. */
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

  // data/static/session.data.ts
  var session_data_exports = {};
  __export(session_data_exports, {
    CURRENT_USER: () => CURRENT_USER,
    NOTIFICATIONS: () => NOTIFICATIONS,
    ORGANISATION: () => ORGANISATION,
    TODAY_TASKS_COUNT: () => TODAY_TASKS_COUNT
  });
  var CURRENT_USER = {
    _id: "u-001",
    fullname: "Jean Kouassi",
    nom: "Kouassi",
    prenoms: "Jean",
    mail: "jean.kouassi@example.com",
    phone: "+225 07 07 12 34 56",
    avatar: null,
    role: "Administrateur",
    actif: true
  };
  var ORGANISATION = {
    _id: "org-001",
    nom: "SC Storage",
    sigle: "SCS",
    ville: "Abidjan",
    pays: "C\xF4te d'Ivoire"
  };
  var NOTIFICATIONS = [
    { _id: "n-1", type: "Requ\xEAte", objet: "Nouvelle requ\xEAte client", contenu: "Transports Yao SARL a ouvert une requ\xEAte \xAB Balise hors ligne \xBB (REQ-2024-0412).", lu: false, envoyeLe: "2026-10-13T08:42:00", destinataire: { _id: "u-001" } },
    { _id: "n-2", type: "Mission", objet: "Mission termin\xE9e", contenu: "La mission MIS-0098 (installation 4 v\xE9hicules) a \xE9t\xE9 cl\xF4tur\xE9e par Koffi N\u2019Guessan.", lu: false, envoyeLe: "2026-10-13T07:15:00", destinataire: { _id: "u-001" } },
    { _id: "n-3", type: "Facturation", objet: "R\xF4le de facturation g\xE9n\xE9r\xE9", contenu: "Le r\xF4le d\u2019octobre 2026 a \xE9t\xE9 g\xE9n\xE9r\xE9 : 312 factures pour 48 750 000 FCFA.", lu: false, envoyeLe: "2026-10-12T18:05:00", destinataire: { _id: "u-001" } },
    { _id: "n-4", type: "T\xE2che", objet: "T\xE2che en retard", contenu: "\xAB Relancer Bollor\xE9 Logistics pour le renouvellement \xBB est en retard de 2 jours.", lu: true, envoyeLe: "2026-10-11T09:30:00", destinataire: { _id: "u-001" } },
    { _id: "n-5", type: "Synchronisation", objet: "Synchronisation termin\xE9e", contenu: "La synchronisation Wialon a import\xE9 1 284 \xE9quipements (3 anomalies).", lu: true, envoyeLe: "2026-10-10T22:10:00", destinataire: { _id: "u-001" } }
  ];
  var TODAY_TASKS_COUNT = 7;
  return __toCommonJS(session_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
