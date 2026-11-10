/* Repris de ui-kit/src/app/shared/utils/french-typography.util.ts (transpilé, sans dépendance). Exposé sous window.UIKitUtils. */
"use strict";
var __french_typography = (() => {
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
  var french_typography_util_exports = {};
  __export(french_typography_util_exports, {
    frenchTypography: () => frenchTypography,
    revealSpaces: () => revealSpaces
  });
  const NBSP = "\xA0";
  const NNBSP = "\u202F";
  const URL_RE = /(https?:\/\/\S+|www\.\S+|\S+@\S+\.\w+)/g;
  const UNITS = "FCFA|F CFA|F|XOF|\u20AC|EUR|\\$|km|kg|m|habitants|v\xE9hicules|balises|clients|Mo|Ko|Go";
  function frenchTypography(input) {
    return input.split(URL_RE).map((part, i) => i % 2 ? part : fix(part)).join("");
  }
  function fix(input) {
    let s = input;
    s = s.replace(/\.{3}/g, "\u2026");
    s = s.replace(new RegExp("(\\p{L})'(\\p{L})", "gu"), "$1\u2019$2");
    let open = true;
    s = s.replace(/"/g, () => {
      const q = open ? "\xAB" : "\xBB";
      open = !open;
      return q;
    });
    s = s.replace(/«\s*/g, "\xAB" + NBSP).replace(/\s*»/g, NBSP + "\xBB");
    s = s.replace(/ - /g, " \u2013 ");
    s = s.replace(/\b(\d{1,2})\s?h\s?(\d{2})?\b/g, (_m, h, mn) => `${h}${NBSP}h${mn ? NBSP + mn : ""}`);
    s = s.replace(new RegExp(`(?<![\\d,.\\p{L}-])(\\d{4,})(?=(?:[.,]\\d+)?\\s?(?:${UNITS})(?![\\p{L}\\d]))`, "gu"), (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP));
    s = s.replace(/(\d)\s?(FCFA|F CFA|€|%|km\/h|km|kg|m|h|min|Mo|Ko|Go)(?![\p{L}\d])/gu, `$1${NBSP}$2`).replace(/(\d)\s?%/g, `$1${NBSP}%`);
    s = s.replace(/\s*([;!?])/g, `${NNBSP}$1`).replace(/(\S)\s*:(?!\/\/|\d)/g, `$1${NBSP}:`);
    s = s.replace(/\bEtat\b/g, "\xC9tat").replace(/\bEquipe\b/g, "\xC9quipe").replace(new RegExp("\\bA (?=\\p{Ll})", "gu"), "\xC0 ");
    return s;
  }
  function revealSpaces(s) {
    const out = [];
    for (const ch of s) {
      const kind = ch === NBSP ? "nbsp" : ch === NNBSP ? "nnbsp" : "text";
      const last = out[out.length - 1];
      if (kind === "text" && (last == null ? void 0 : last.kind) === "text") last.t += ch;
      else out.push({ t: kind === "text" ? ch : " ", kind });
    }
    return out;
  }
  return __toCommonJS(french_typography_util_exports);
})();
window.UIKitUtils = Object.assign(window.UIKitUtils || {}, __french_typography);
