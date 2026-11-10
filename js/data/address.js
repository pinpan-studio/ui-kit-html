/* Données statiques reprises de ui-kit/src/app/data/static/address.data.ts (transpilé). Exposé sous window.DATA. */
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

  // data/static/address.data.ts
  var address_data_exports = {};
  __export(address_data_exports, {
    DEMO_PLACES: () => DEMO_PLACES,
    searchPlaces: () => searchPlaces
  });
  var DEMO_PLACES = [
    { id: "a1", label: "Boulevard de la R\xE9publique", detail: "Plateau, Abidjan", city: "Abidjan", lat: 5.3237, lng: -4.0193, kind: "road" },
    { id: "a2", label: "Riviera 2, rue des Jardins", detail: "Cocody, Abidjan", city: "Abidjan", lat: 5.36, lng: -3.99, kind: "road" },
    { id: "a3", label: "Carrefour Selmer", detail: "Yopougon, Abidjan", city: "Abidjan", lat: 5.345, lng: -4.08, kind: "poi" },
    { id: "a4", label: "Zone 4, rue du Docteur Blanchard", detail: "Marcory, Abidjan", city: "Abidjan", lat: 5.303, lng: -3.985, kind: "road" },
    { id: "a5", label: "Port autonome d\u2019Abidjan", detail: "Treichville, Abidjan", city: "Abidjan", lat: 5.293, lng: -4.005, kind: "poi" },
    { id: "a6", label: "Gare routi\xE8re d\u2019Abobo", detail: "Abobo, Abidjan", city: "Abidjan", lat: 5.418, lng: -4.02, kind: "poi" },
    { id: "a7", label: "A\xE9roport F\xE9lix-Houphou\xEBt-Boigny", detail: "Port-Bou\xEBt, Abidjan", city: "Abidjan", lat: 5.255, lng: -3.93, kind: "poi" },
    { id: "a8", label: "Boulevard Val\xE9ry Giscard d\u2019Estaing", detail: "Koumassi, Abidjan", city: "Abidjan", lat: 5.297, lng: -3.948, kind: "road" },
    { id: "a9", label: "Angr\xE9 8e tranche", detail: "Cocody, Abidjan", city: "Abidjan", lat: 5.398, lng: -3.987, kind: "area" },
    { id: "a10", label: "Avenue Houphou\xEBt-Boigny", detail: "Bouak\xE9", city: "Bouak\xE9", lat: 7.6906, lng: -5.0306, kind: "road" },
    { id: "a11", label: "Basilique Notre-Dame de la Paix", detail: "Yamoussoukro", city: "Yamoussoukro", lat: 6.8115, lng: -5.297, kind: "poi" },
    { id: "a12", label: "Port de San-P\xE9dro", detail: "San-P\xE9dro", city: "San-P\xE9dro", lat: 4.7485, lng: -6.6363, kind: "poi" },
    { id: "a13", label: "Quartier Commerce", detail: "Korhogo", city: "Korhogo", lat: 9.458, lng: -5.6296, kind: "area" },
    { id: "a14", label: "March\xE9 central", detail: "Daloa", city: "Daloa", lat: 6.8774, lng: -6.4502, kind: "poi" },
    { id: "a15", label: "Plage d\u2019Assinie Mafia", detail: "Assinie", city: "Assinie", lat: 5.133, lng: -3.283, kind: "area" },
    { id: "a16", label: "Quartier France", detail: "Grand-Bassam", city: "Grand-Bassam", lat: 5.198, lng: -3.738, kind: "area" }
  ];
  function searchPlaces(q) {
    const n = (s) => s.normalize("NFD").replace(new RegExp("\\p{Diacritic}", "gu"), "").toLowerCase();
    const t = n(q.trim());
    const res = DEMO_PLACES.filter((p) => n(`${p.label} ${p.detail}`).includes(t)).slice(0, 6);
    return new Promise((r) => setTimeout(() => r(res), 250));
  }
  return __toCommonJS(address_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
