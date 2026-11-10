/* Données statiques reprises de ui-kit/src/app/data/static/media.data.ts (transpilé). Exposé sous window.DATA. */
"use strict";
var __d = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

  // data/static/media.data.ts
  var media_data_exports = {};
  __export(media_data_exports, {
    buildSampleImageSet: () => buildSampleImageSet,
    buildSampleImages: () => buildSampleImages,
    buildSamplePdf: () => buildSamplePdf,
    buildSampleWav: () => buildSampleWav,
    formatBytes: () => formatBytes,
    recordSampleVideo: () => recordSampleVideo
  });
  function pdfText(s) {
    return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/[’]/g, "'").replace(/[—–]/g, "-");
  }
  function buildSamplePdf(title = "Contrat cadre 2026", pages = 4) {
    const objects = [];
    const add = (body) => {
      objects.push(body);
      return objects.length;
    };
    const catalog = add("");
    const pagesObj = add("");
    const font = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const fontBold = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const sections = [
      [
        "Objet du contrat",
        "Le pr\xE9sent contrat d\xE9finit les conditions de fourniture du service de g\xE9olocalisation",
        "de flotte, de maintenance des balises et d\u2019assistance technique pour le client."
      ],
      [
        "Dur\xE9e et renouvellement",
        "Le contrat est conclu pour une dur\xE9e de douze (12) mois \xE0 compter de la date",
        "de signature. Il est renouvelable par tacite reconduction pour des p\xE9riodes \xE9gales."
      ],
      [
        "Conditions financi\xE8res",
        "Les prestations sont factur\xE9es mensuellement, terme \xE0 \xE9choir. Le r\xE8glement",
        "intervient \xE0 trente (30) jours date de facture par virement ou mobile money."
      ],
      [
        "Annexes",
        "Annexe 1 : liste des v\xE9hicules \xE9quip\xE9s. Annexe 2 : grille tarifaire.",
        "Annexe 3 : proc\xE8s-verbal d\u2019installation sign\xE9 par les deux parties."
      ]
    ];
    const kids = [];
    for (let p = 1; p <= pages; p++) {
      const s = sections[(p - 1) % sections.length];
      const rows = Array.from({ length: 6 }, (_, i) => {
        const y = 470 - i * 26;
        return `0.93 0.95 0.98 rg 56 ${y - 8} 483 22 re ${i % 2 ? "f" : "n"}
BT /F1 10 Tf 0.2 0.25 0.33 rg 64 ${y} Td (${pdfText(`CI-${4500 + p * 10 + i}-AB`)}) Tj ET
BT /F1 10 Tf 0.2 0.25 0.33 rg 220 ${y} Td (${pdfText(["Abidjan", "Bouak\xE9", "San-P\xE9dro", "Yamoussoukro", "Daloa", "Korhogo"][i])}) Tj ET
BT /F1 10 Tf 0.2 0.25 0.33 rg 420 ${y} Td (${(12500 * (i + 1)).toLocaleString("fr-FR").replace(/\s/g, " ")} FCFA) Tj ET`;
      }).join("\n");
      const content = `0.27 0.35 0.89 rg 0 762 595 80 re f
BT /F2 22 Tf 1 1 1 rg 56 795 Td (${pdfText(title)}) Tj ET
BT /F1 11 Tf 1 1 1 rg 56 775 Td (R\xE9f\xE9rence CTR-2026-0412 - Document de d\xE9monstration) Tj ET
BT /F2 16 Tf 0.1 0.12 0.18 rg 56 710 Td (${p}. ${pdfText(s[0])}) Tj ET
BT /F1 11 Tf 0.3 0.33 0.4 rg 56 684 Td (${pdfText(s[1])}) Tj ET
BT /F1 11 Tf 0.3 0.33 0.4 rg 56 668 Td (${pdfText(s[2])}) Tj ET
BT /F2 12 Tf 0.1 0.12 0.18 rg 56 520 Td (V\xE9hicules concern\xE9s) Tj ET
0.8 0.83 0.88 RG 1 w 56 505 m 539 505 l S
${rows}
0.8 0.83 0.88 RG 56 80 m 539 80 l S
BT /F1 9 Tf 0.5 0.53 0.6 rg 56 64 Td (UI Kit - PDF g\xE9n\xE9r\xE9 localement) Tj ET
BT /F1 9 Tf 0.5 0.53 0.6 rg 490 64 Td (Page ${p} / ${pages}) Tj ET`;
      const stream = add(`<< /Length ${content.length} >>
stream
${content}
endstream`);
      kids.push(add(`<< /Type /Page /Parent ${pagesObj} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${stream} 0 R >>`));
    }
    objects[catalog - 1] = `<< /Type /Catalog /Pages ${pagesObj} 0 R >>`;
    objects[pagesObj - 1] = `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(" ")}] /Count ${kids.length} >>`;
    let out = "%PDF-1.4\n";
    const offsets = [];
    objects.forEach((body, i) => {
      offsets.push(out.length);
      out += `${i + 1} 0 obj
${body}
endobj
`;
    });
    const xref = out.length;
    out += `xref
0 ${objects.length + 1}
0000000000 65535 f 
`;
    out += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n 
`).join("");
    out += `trailer
<< /Size ${objects.length + 1} /Root ${catalog} 0 R >>
startxref
${xref}
%%EOF`;
    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 255;
    return new Blob([bytes], { type: "application/pdf" });
  }
  function buildSampleWav(seconds = 12, seed = 0) {
    const rate = 22050;
    const n = Math.floor(seconds * rate);
    const data = new Int16Array(n);
    const scale = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33];
    const melody = [0, 2, 4, 2, 3, 4, 5, 4, 2, 0, 1, 2, 4, 3, 2, 0].map((d) => scale[(d + seed) % scale.length]);
    const noteLen = 0.375;
    for (let i = 0; i < n; i++) {
      const t = i / rate;
      const k = Math.floor(t / noteLen);
      const f = melody[k % melody.length];
      const lt = t - k * noteLen;
      const env = Math.min(1, lt / 0.02) * Math.exp(-lt * 4.2);
      const bass = 0.25 * Math.sin(2 * Math.PI * (melody[Math.floor(k / 4) * 4 % melody.length] / 2) * t);
      const v = env * (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t)) * 0.5 + bass * 0.5;
      data[i] = Math.max(-1, Math.min(1, v * 0.7)) * 32767;
    }
    const buf = new ArrayBuffer(44 + n * 2);
    const dv = new DataView(buf);
    const str = (o, s) => {
      for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i));
    };
    str(0, "RIFF");
    dv.setUint32(4, 36 + n * 2, true);
    str(8, "WAVE");
    str(12, "fmt ");
    dv.setUint32(16, 16, true);
    dv.setUint16(20, 1, true);
    dv.setUint16(22, 1, true);
    dv.setUint32(24, rate, true);
    dv.setUint32(28, rate * 2, true);
    dv.setUint16(32, 2, true);
    dv.setUint16(34, 16, true);
    str(36, "data");
    dv.setUint32(40, n * 2, true);
    new Int16Array(buf, 44).set(data);
    return new Blob([buf], { type: "audio/wav" });
  }
  var SCENES = [
    { name: "flotte-plateau.png", caption: "Flotte stationn\xE9e \u2014 Plateau", sky: ["#4f6bed", "#a5b4fc"], ground: "#1e293b", sun: "#fde68a" },
    { name: "depot-yopougon.png", caption: "D\xE9p\xF4t de Yopougon au coucher du soleil", sky: ["#f97316", "#fcd34d"], ground: "#431407", sun: "#fff7ed" },
    { name: "axe-nord.png", caption: "Axe Abidjan \u2013 Yamoussoukro", sky: ["#0ea5e9", "#bae6fd"], ground: "#14532d", sun: "#fef9c3" },
    { name: "port-san-pedro.png", caption: "Port de San-P\xE9dro", sky: ["#7c3aed", "#f0abfc"], ground: "#0f172a", sun: "#fae8ff" },
    { name: "atelier-balises.png", caption: "Atelier d\u2019installation des balises", sky: ["#059669", "#a7f3d0"], ground: "#022c22", sun: "#ecfdf5" }
  ];
  function buildSampleImages(width = 960, height = 600) {
    if (typeof document === "undefined") return [];
    return SCENES.map((s, i) => drawScene(s, i, width, height));
  }
  function buildSampleImageSet(count = 14) {
    if (typeof document === "undefined") return [];
    const formats = [[960, 640], [600, 900], [800, 800], [1200, 520], [640, 960], [960, 720], [720, 720], [600, 800], [1100, 620], [700, 1e3]];
    const cats = ["Flotte", "D\xE9p\xF4ts", "Routes", "Ports", "Ateliers"];
    return Array.from({ length: count }, (_, i) => {
      const [w, h] = formats[i % formats.length];
      const scene = SCENES[i % SCENES.length];
      const img = drawScene(scene, i, Math.round(w / 2), Math.round(h / 2));
      return __spreadProps(__spreadValues({}, img), { name: `photo-${String(i + 1).padStart(2, "0")}.png`, width: w, height: h, category: cats[i % SCENES.length] });
    });
  }
  function drawScene(s, i, width, height) {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const g = c.getContext("2d");
    const sky = g.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, s.sky[0]);
    sky.addColorStop(1, s.sky[1]);
    g.fillStyle = sky;
    g.fillRect(0, 0, width, height);
    g.fillStyle = s.sun;
    g.globalAlpha = 0.9;
    g.beginPath();
    g.arc(width * (0.2 + i % 5 * 0.15), height * 0.3, Math.min(width, height) * 0.1, 0, Math.PI * 2);
    g.fill();
    g.globalAlpha = 1;
    for (let l = 0; l < 3; l++) {
      g.fillStyle = s.ground;
      g.globalAlpha = 0.35 + l * 0.3;
      g.beginPath();
      g.moveTo(0, height);
      for (let x = 0; x <= width; x += 20) g.lineTo(x, height * (0.62 + l * 0.08) + Math.sin(x / (90 + l * 40) + i + l) * height * 0.045);
      g.lineTo(width, height);
      g.fill();
    }
    g.globalAlpha = 1;
    g.fillStyle = "#334155";
    g.fillRect(0, height * 0.86, width, height * 0.14);
    g.strokeStyle = "#f8fafc";
    g.lineWidth = 4;
    g.setLineDash([30, 24]);
    g.beginPath();
    g.moveTo(0, height * 0.93);
    g.lineTo(width, height * 0.93);
    g.stroke();
    g.setLineDash([]);
    const u = Math.min(width, height * 1.6) / 960;
    const tx = width * (0.15 + i % 3 * 0.15), ty = height * 0.86 - 80 * u;
    g.fillStyle = "#f8fafc";
    g.fillRect(tx, ty, 180 * u, 70 * u);
    g.fillStyle = "#4f6bed";
    g.fillRect(tx + 180 * u, ty + 20 * u, 60 * u, 50 * u);
    g.fillStyle = "#bfdbfe";
    g.fillRect(tx + 196 * u, ty + 28 * u, 34 * u, 18 * u);
    g.fillStyle = "#0f172a";
    for (const wx of [36, 140, 210]) {
      g.beginPath();
      g.arc(tx + wx * u, ty + 74 * u, 15 * u, 0, Math.PI * 2);
      g.fill();
    }
    const k = Math.min(1, width / 960);
    g.fillStyle = "rgba(15,23,42,.55)";
    g.fillRect(24 * k, 24 * k, 260 * k, 40 * k);
    g.fillStyle = "#fff";
    g.font = `600 ${Math.round(18 * k)}px Inter, sans-serif`;
    g.fillText(s.caption.slice(0, 26), 36 * k, 50 * k);
    return { name: s.name, caption: s.caption, url: c.toDataURL("image/jpeg", 0.86) };
  }
  function recordSampleVideo(seconds = 6, width = 640, height = 360, opts = {}) {
    var _a, _b, _c;
    const color = (_a = opts.color) != null ? _a : "#4f6bed", bg = (_b = opts.background) != null ? _b : "#0f172a", title = (_c = opts.title) != null ? _c : "Trajet CI-4521-AB";
    if (typeof document === "undefined" || typeof MediaRecorder === "undefined") return Promise.resolve(null);
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const g = c.getContext("2d");
    const capture = c.captureStream;
    if (!capture) return Promise.resolve(null);
    const stream = capture.call(c, 30);
    const mime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"].find((m) => MediaRecorder.isTypeSupported(m));
    if (!mime) return Promise.resolve(null);
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 15e5 });
    const chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const path = (t) => ({ x: 60 + (width - 120) * t, y: height / 2 + Math.sin(t * Math.PI * 3) * 90 });
    let start = 0, raf = 0;
    const draw = (now) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / (seconds * 1e3));
      g.fillStyle = bg;
      g.fillRect(0, 0, width, height);
      g.strokeStyle = "rgba(148,163,184,.15)";
      g.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x, height);
        g.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(width, y);
        g.stroke();
      }
      g.strokeStyle = color;
      g.lineWidth = 5;
      g.lineCap = "round";
      g.beginPath();
      for (let k = 0; k <= t; k += 5e-3) {
        const p2 = path(k);
        k ? g.lineTo(p2.x, p2.y) : g.moveTo(p2.x, p2.y);
      }
      g.stroke();
      const p = path(t);
      g.fillStyle = color + "55";
      g.beginPath();
      g.arc(p.x, p.y, 18 + Math.sin(now / 120) * 4, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(p.x, p.y, 9, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#e2e8f0";
      g.font = "600 20px Inter, sans-serif";
      g.fillText(title, 24, 40);
      g.font = "14px Inter, sans-serif";
      g.fillStyle = "#94a3b8";
      g.fillText(`${Math.round(t * 42)} km \xB7 ${Math.round(48 + Math.sin(t * 9) * 20)} km/h`, 24, 64);
      g.fillText(`00:${String(Math.floor(t * seconds)).padStart(2, "0")}`, width - 70, height - 24);
      if (t < 1) raf = requestAnimationFrame(draw);
    };
    return new Promise((resolve) => {
      rec.onstop = () => {
        cancelAnimationFrame(raf);
        stream.getTracks().forEach((tr) => tr.stop());
        resolve(chunks.length ? new Blob(chunks, { type: mime.split(";")[0] }) : null);
      };
      rec.onerror = () => resolve(null);
      rec.start(250);
      raf = requestAnimationFrame(draw);
      setTimeout(() => rec.state !== "inactive" && rec.stop(), seconds * 1e3 + 150);
    });
  }
  function formatBytes(bytes) {
    if (!bytes && bytes !== 0) return "";
    const u = ["o", "Ko", "Mo", "Go"];
    let i = 0, v = bytes;
    while (v >= 1024 && i < u.length - 1) {
      v /= 1024;
      i++;
    }
    return `${v.toLocaleString("fr-FR", { maximumFractionDigits: i ? 1 : 0 })} ${u[i]}`;
  }
  return __toCommonJS(media_data_exports);
})();
window.DATA = Object.assign(window.DATA || {}, __d);
