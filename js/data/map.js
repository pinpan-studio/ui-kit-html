/* Données statiques reprises de ui-kit/src/app/data/static/map.data.ts (transpilé). Exposé sous window.DATA. */
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

  // data/static/map.data.ts
  var map_data_exports = {};
  __export(map_data_exports, {
    ABIDJAN: () => ABIDJAN,
    FLOTTE: () => FLOTTE,
    POSITIONS_DENSES: () => POSITIONS_DENSES,
    TRAJETS: () => TRAJETS,
    TRAJET_ETAPES: () => TRAJET_ETAPES,
    ZONES: () => ZONES,
    ZONE_MARKERS: () => ZONE_MARKERS
  });
  var ABIDJAN = [5.33, -4.01];
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
  var TRAJETS = [
    { id: "t1", label: "Trajet r\xE9alis\xE9 \xB7 38 km \xB7 52 min", tone: "primary", endpoints: true, points: [[5.3237, -4.0193], [5.31, -4.005], [5.295, -3.99], [5.285, -3.96], [5.26, -3.93], [5.245, -3.89], [5.23, -3.83], [5.215, -3.78], [5.2, -3.738]] },
    { id: "t2", label: "Itin\xE9raire pr\xE9vu", tone: "warning", dashed: true, points: [[5.2, -3.738], [5.24, -3.76], [5.29, -3.82], [5.33, -3.89], [5.36, -3.99]] }
  ];
  var TRAJET_ETAPES = [
    { id: "e1", lat: 5.26, lng: -3.93, title: "Arr\xEAt 8 min", lines: ["10:42 \u2013 10:50", "Port-Bou\xEBt"], icon: "pause", tone: "warning" },
    { id: "e2", lat: 5.23, lng: -3.83, title: "Exc\xE8s de vitesse", lines: ["94 km/h (limite 70)", "11:05"], icon: "speed", tone: "error" }
  ];
  var ZONES = [
    { id: "z1", label: "D\xE9p\xF4t central (rayon 600 m)", tone: "success", circle: { center: [5.303, -3.985], radius: 600 } },
    { id: "z2", label: "Zone portuaire \u2014 acc\xE8s restreint", tone: "error", polygon: [[5.299, -4.018], [5.301, -3.999], [5.286, -3.996], [5.282, -4.015]] },
    { id: "z3", label: "Secteur de livraison Cocody", tone: "info", polygon: [[5.375, -4.005], [5.38, -3.97], [5.35, -3.96], [5.342, -3.995]] },
    { id: "z4", label: "A\xE9roport (rayon 1,5 km)", tone: "warning", circle: { center: [5.255, -3.93], radius: 1500 } }
  ];
  var ZONE_MARKERS = [
    { id: "zm1", lat: 5.303, lng: -3.985, icon: "warehouse", tone: "success", title: "D\xE9p\xF4t central", lines: ["12 v\xE9hicules pr\xE9sents"] }
  ];
  return __toCommonJS(map_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
