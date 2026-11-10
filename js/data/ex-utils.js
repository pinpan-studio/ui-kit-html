/* Données statiques reprises de ui-kit/src/app/examples/app/ex-utils.ts (transpilé). Exposé sous window.DATA. */
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

  // examples/app/ex-utils.ts
  var ex_utils_exports = {};
  __export(ex_utils_exports, {
    alpha: () => alpha,
    hue: () => hue,
    initials: () => initials,
    resolveColor: () => resolveColor,
    seeded: () => seeded,
    themePalette: () => themePalette
  });
  function hue(s) {
    let h = 0;
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return `hsl(${h} 32% 44%)`;
  }
  function initials(s) {
    const parts = s.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean);
    return (parts.length > 1 ? parts[0][0] + parts[1][0] : s.slice(0, 2)).toUpperCase();
  }
  function resolveColor(token) {
    const probe = document.createElement("span");
    probe.style.color = `var(${token})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }
  function alpha(color, a) {
    const rgb = color.match(/rgba?\(([^)]+)\)/);
    return rgb ? `rgba(${rgb[1].split(/[ ,/]+/).slice(0, 3).join(",")},${a})` : color;
  }
  function seeded(seed) {
    let a = seed >>> 0;
    return () => {
      a = a + 1831565813 >>> 0;
      let t = a;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function themePalette() {
    const v = resolveColor;
    return {
      primary: v("--primary-color"),
      tertiary: v("--tertiary-color"),
      success: v("--success-color"),
      warning: v("--warning-color"),
      error: v("--error-color"),
      info: v("--info-color"),
      purple: v("--purple-color"),
      muted: v("--text-muted"),
      text: v("--text-secondary"),
      grid: v("--border-color"),
      card: v("--card-bg")
    };
  }
  return __toCommonJS(ex_utils_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
