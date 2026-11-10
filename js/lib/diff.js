/* Repris de ui-kit/src/app/shared/utils/diff.util.ts (transpilé, sans dépendance). Exposé sous window.UIKitUtils. */
"use strict";
var __diff = (() => {
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
  var diff_util_exports = {};
  __export(diff_util_exports, {
    diffLines: () => diffLines,
    wordDiff: () => wordDiff
  });
  function lcsOps(a, b, eq = (x, y) => x === y) {
    const n = a.length, m = b.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i2 = n - 1; i2 >= 0; i2--) for (let j2 = m - 1; j2 >= 0; j2--) dp[i2][j2] = eq(a[i2], b[j2]) ? dp[i2 + 1][j2 + 1] + 1 : Math.max(dp[i2 + 1][j2], dp[i2][j2 + 1]);
    const ops = [];
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (eq(a[i], b[j])) {
        ops.push("equal");
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        ops.push("del");
        i++;
      } else {
        ops.push("add");
        j++;
      }
    }
    while (i++ < n) ops.push("del");
    while (j++ < m) ops.push("add");
    return ops;
  }
  function wordDiff(a, b) {
    const ta = a.split(/(\s+|[.,;:!?()«»"'])/).filter(Boolean), tb = b.split(/(\s+|[.,;:!?()«»"'])/).filter(Boolean);
    const ops = lcsOps(ta, tb);
    const o = [], n = [];
    let i = 0, j = 0;
    const push = (arr, text, changed) => {
      const last = arr[arr.length - 1];
      if (last && last.changed === changed) last.text += text;
      else arr.push({ text, changed });
    };
    for (const op of ops) {
      if (op === "equal") {
        push(o, ta[i++], false);
        push(n, tb[j++], false);
      } else if (op === "del") push(o, ta[i++], true);
      else push(n, tb[j++], true);
    }
    return { old: o, new: n };
  }
  function diffLines(before, after) {
    const a = before.replace(/\r\n?/g, "\n").split("\n"), b = after.replace(/\r\n?/g, "\n").split("\n");
    const ops = lcsOps(a, b);
    const out = [];
    let i = 0, j = 0;
    for (const op of ops) {
      if (op === "equal") out.push({ op, oldNo: ++i, newNo: ++j, text: a[i - 1] });
      else if (op === "del") out.push({ op, oldNo: ++i, newNo: null, text: a[i - 1] });
      else out.push({ op, oldNo: null, newNo: ++j, text: b[j - 1] });
    }
    for (let k = 0; k < out.length; k++) {
      if (out[k].op !== "del") continue;
      let d = k;
      while (d < out.length && out[d].op === "del") d++;
      let e = d;
      while (e < out.length && out[e].op === "add") e++;
      for (let p = 0; p < Math.min(d - k, e - d); p++) {
        const w = wordDiff(out[k + p].text, out[d + p].text);
        out[k + p].parts = w.old;
        out[d + p].parts = w.new;
      }
      k = e - 1;
    }
    return out;
  }
  return __toCommonJS(diff_util_exports);
})();
window.UIKitUtils = Object.assign(window.UIKitUtils || {}, __diff);
