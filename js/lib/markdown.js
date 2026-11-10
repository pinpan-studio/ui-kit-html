/* Repris de ui-kit/src/app/shared/utils/markdown.util.ts (transpilé, sans dépendance). Exposé sous window.UIKitUtils. */
"use strict";
var __markdown = (() => {
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
  var markdown_util_exports = {};
  __export(markdown_util_exports, {
    markdownInline: () => markdownInline,
    markdownToHtml: () => markdownToHtml
  });
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  function markdownInline(s) {
    return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>").replace(/~~([^~]+)~~/g, "<del>$1</del>").replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:|\/|#)[^)\s]*)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function markdownToHtml(src) {
    const inline = markdownInline;
    const lines = src.replace(/\r\n?/g, "\n").split("\n");
    const out = [];
    let list = null;
    let para = [];
    const flushPara = () => {
      if (para.length) {
        out.push(`<p>${para.map(inline).join("<br>")}</p>`);
        para = [];
      }
    };
    const closeList = () => {
      if (list) {
        out.push(`</${list}>`);
        list = null;
      }
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^```/.test(line)) {
        flushPara();
        closeList();
        const code = [];
        while (++i < lines.length && !/^```/.test(lines[i])) code.push(lines[i]);
        out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
        continue;
      }
      let m;
      if (m = line.match(/^(#{1,4})\s+(.*)$/)) {
        flushPara();
        closeList();
        out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`);
        continue;
      }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
        flushPara();
        closeList();
        out.push("<hr>");
        continue;
      }
      if (m = line.match(/^>\s?(.*)$/)) {
        flushPara();
        closeList();
        out.push(`<blockquote>${inline(m[1])}</blockquote>`);
        continue;
      }
      if ((m = line.match(/^\s*[-*+]\s+(.*)$/)) || (m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
        flushPara();
        const kind = /^\s*\d/.test(line) ? "ol" : "ul";
        if (list !== kind) {
          closeList();
          out.push(`<${kind}>`);
          list = kind;
        }
        const task = m[1].match(/^\[( |x|X)\]\s+(.*)$/);
        out.push(task ? `<li class="task"><span class="box${task[1] !== " " ? " on" : ""}"></span>${inline(task[2])}</li>` : `<li>${inline(m[1])}</li>`);
        continue;
      }
      if (!line.trim()) {
        flushPara();
        closeList();
        continue;
      }
      closeList();
      para.push(line);
    }
    flushPara();
    closeList();
    return out.join("\n");
  }
  return __toCommonJS(markdown_util_exports);
})();
window.UIKitUtils = Object.assign(window.UIKitUtils || {}, __markdown);
