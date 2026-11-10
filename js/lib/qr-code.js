/* Repris de ui-kit/src/app/shared/utils/qr-code.util.ts (transpilé, sans dépendance). Exposé sous window.UIKitUtils. */
"use strict";
var __qr_code = (() => {
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
  var qr_code_util_exports = {};
  __export(qr_code_util_exports, {
    encodeCode128: () => encodeCode128,
    encodeQr: () => encodeQr,
    qrSvgPath: () => qrSvgPath
  });
  const ECC_ORD = { L: 0, M: 1, Q: 2, H: 3 };
  const FORMAT_BITS = { L: 1, M: 0, Q: 3, H: 2 };
  const ECC_PER_BLOCK = [
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
  ];
  const NUM_BLOCKS = [
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
  ];
  function rawDataModules(ver) {
    let r = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      const n = Math.floor(ver / 7) + 2;
      r -= (25 * n - 10) * n - 55;
      if (ver >= 7) r -= 36;
    }
    return r;
  }
  const dataCodewords = (ver, e) => Math.floor(rawDataModules(ver) / 8) - ECC_PER_BLOCK[e][ver] * NUM_BLOCKS[e][ver];
  function gfMul(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = z << 1 ^ (z >>> 7) * 285;
      z ^= (y >>> i & 1) * x;
    }
    return z & 255;
  }
  function rsDivisor(degree) {
    const r = new Array(degree).fill(0);
    r[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < r.length; j++) {
        r[j] = gfMul(r[j], root);
        if (j + 1 < r.length) r[j] ^= r[j + 1];
      }
      root = gfMul(root, 2);
    }
    return r;
  }
  function rsRemainder(data, div) {
    const r = new Array(div.length).fill(0);
    for (const b of data) {
      const f = b ^ r.shift();
      r.push(0);
      div.forEach((c, i) => r[i] ^= gfMul(c, f));
    }
    return r;
  }
  function encodeQr(text, ecc = "M") {
    const bytes = Array.from(new TextEncoder().encode(text));
    const e = ECC_ORD[ecc];
    let ver = 1;
    for (; ver <= 40; ver++) {
      const ccBits = ver <= 9 ? 8 : 16;
      if (4 + ccBits + bytes.length * 8 <= dataCodewords(ver, e) * 8) break;
    }
    if (ver > 40) throw new Error("Texte trop long pour un QR code");
    const bits = [];
    const put = (v, n) => {
      for (let i2 = n - 1; i2 >= 0; i2--) bits.push(v >>> i2 & 1);
    };
    put(4, 4);
    put(bytes.length, ver <= 9 ? 8 : 16);
    bytes.forEach((b) => put(b, 8));
    const cap = dataCodewords(ver, e) * 8;
    put(0, Math.min(4, cap - bits.length));
    put(0, (8 - bits.length % 8) % 8);
    for (let pad = 236; bits.length < cap; pad ^= 236 ^ 17) put(pad, 8);
    const data = [];
    for (let i2 = 0; i2 < bits.length; i2 += 8) data.push(parseInt(bits.slice(i2, i2 + 8).join(""), 2));
    const nBlocks = NUM_BLOCKS[e][ver], eccLen = ECC_PER_BLOCK[e][ver];
    const raw = Math.floor(rawDataModules(ver) / 8);
    const nShort = nBlocks - raw % nBlocks, shortLen = Math.floor(raw / nBlocks);
    const div = rsDivisor(eccLen);
    const blocks = [];
    for (let i2 = 0, k = 0; i2 < nBlocks; i2++) {
      const dat = data.slice(k, k + shortLen - eccLen + (i2 < nShort ? 0 : 1));
      k += dat.length;
      const ec = rsRemainder(dat, div);
      if (i2 < nShort) dat.push(0);
      blocks.push(dat.concat(ec));
    }
    const all = [];
    for (let i2 = 0; i2 < blocks[0].length; i2++) blocks.forEach((b, j) => {
      if (i2 !== shortLen - eccLen || j >= nShort) all.push(b[i2]);
    });
    const size = ver * 4 + 17;
    const mod = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const setF = (x, y, d) => {
      mod[y][x] = d;
      fn[y][x] = true;
    };
    for (let i2 = 0; i2 < size; i2++) {
      setF(6, i2, i2 % 2 === 0);
      setF(i2, 6, i2 % 2 === 0);
    }
    for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const d = Math.max(Math.abs(dx), Math.abs(dy)), x = cx + dx, y = cy + dy;
        if (x >= 0 && x < size && y >= 0 && y < size) setF(x, y, d !== 2 && d !== 4);
      }
    }
    const align = [];
    if (ver > 1) {
      const n = Math.floor(ver / 7) + 2;
      const step = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (n * 2 - 2)) * 2;
      align.push(6);
      for (let pos = size - 7; align.length < n; pos -= step) align.splice(1, 0, pos);
    }
    align.forEach((ax, i2) => align.forEach((ay, j) => {
      const last = align.length - 1;
      if (i2 === 0 && j === 0 || i2 === 0 && j === last || i2 === last && j === 0) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setF(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    const drawFormat = (mask) => {
      const d = FORMAT_BITS[ecc] << 3 | mask;
      let rem = d;
      for (let i2 = 0; i2 < 10; i2++) rem = rem << 1 ^ (rem >>> 9) * 1335;
      const b = (d << 10 | rem) ^ 21522;
      const bit = (i2) => (b >>> i2 & 1) !== 0;
      for (let i2 = 0; i2 <= 5; i2++) setF(8, i2, bit(i2));
      setF(8, 7, bit(6));
      setF(8, 8, bit(7));
      setF(7, 8, bit(8));
      for (let i2 = 9; i2 < 15; i2++) setF(14 - i2, 8, bit(i2));
      for (let i2 = 0; i2 < 8; i2++) setF(size - 1 - i2, 8, bit(i2));
      for (let i2 = 8; i2 < 15; i2++) setF(8, size - 15 + i2, bit(i2));
      setF(8, size - 8, true);
    };
    drawFormat(0);
    if (ver >= 7) {
      let rem = ver;
      for (let i2 = 0; i2 < 12; i2++) rem = rem << 1 ^ (rem >>> 11) * 7973;
      const b = ver << 12 | rem;
      for (let i2 = 0; i2 < 18; i2++) {
        const v = (b >>> i2 & 1) !== 0, a = size - 11 + i2 % 3, c = Math.floor(i2 / 3);
        setF(a, c, v);
        setF(c, a, v);
      }
    }
    let i = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
        const x = right - j, up = (right + 1 & 2) === 0, y = up ? size - 1 - vert : vert;
        if (!fn[y][x] && i < all.length * 8) {
          mod[y][x] = (all[i >>> 3] >>> 7 - (i & 7) & 1) !== 0;
          i++;
        }
      }
    }
    const masks = [
      (x, y) => (x + y) % 2 === 0,
      (_x, y) => y % 2 === 0,
      (x) => x % 3 === 0,
      (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x, y) => x * y % 2 + x * y % 3 === 0,
      (x, y) => (x * y % 2 + x * y % 3) % 2 === 0,
      (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0
    ];
    const applyMask = (m) => {
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fn[y][x] && masks[m](x, y)) mod[y][x] = !mod[y][x];
    };
    const penalty = () => {
      let p = 0, dark = 0;
      for (let y = 0; y < size; y++) {
        let runX = 1, runY = 1;
        for (let x = 0; x < size; x++) {
          if (mod[y][x]) dark++;
          if (x > 0) {
            if (mod[y][x] === mod[y][x - 1]) {
              runX++;
              if (runX === 5) p += 3;
              else if (runX > 5) p++;
            } else runX = 1;
            if (mod[x][y] === mod[x - 1][y]) {
              runY++;
              if (runY === 5) p += 3;
              else if (runY > 5) p++;
            } else runY = 1;
          }
          if (x > 0 && y > 0 && mod[y][x] === mod[y][x - 1] && mod[y][x] === mod[y - 1][x] && mod[y][x] === mod[y - 1][x - 1]) p += 3;
        }
      }
      const total = size * size;
      p += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
      return p;
    };
    let best = 0, bestP = Infinity;
    for (let m = 0; m < 8; m++) {
      applyMask(m);
      drawFormat(m);
      const p = penalty();
      if (p < bestP) {
        bestP = p;
        best = m;
      }
      applyMask(m);
    }
    applyMask(best);
    drawFormat(best);
    return mod;
  }
  function qrSvgPath(m, quiet = 4) {
    let d = "";
    m.forEach((row, y) => row.forEach((v, x) => {
      if (v) d += `M${x + quiet},${y + quiet}h1v1h-1z`;
    }));
    return d;
  }
  const C128 = "212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232,2331112".split(",");
  function encodeCode128(text) {
    var _a;
    const numeric = /^(\d\d)+$/.test(text);
    if (!numeric && !/^[\x20-\x7e]*$/.test(text)) throw new Error("Code 128 B : caract\xE8res ASCII imprimables uniquement");
    const codes = numeric ? [105, ...((_a = text.match(/\d\d/g)) != null ? _a : []).map(Number)] : [104, ...Array.from(text, (c) => c.charCodeAt(0) - 32)];
    const check = codes.reduce((s, c, i) => s + c * (i || 1), 0) % 103;
    return [...codes, check, 106].flatMap((c) => C128[c].split("").map(Number));
  }
  return __toCommonJS(qr_code_util_exports);
})();
window.UIKitUtils = Object.assign(window.UIKitUtils || {}, __qr_code);
