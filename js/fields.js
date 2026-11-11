/* ==========================================================================
   Champs avancés, sans dépendance. Exposé sous window.UIFields.
   Chaque fonction monte le champ dans `el` et renvoie { get, set } ;
   l'évènement « change » (detail = valeur) est émis sur `el`.
   otp · stepper · currency · range · rating · color · richText · markdown
   treeSelect · transfer · tags · address · password · copy
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function emit(el, v) { el.dispatchEvent(new CustomEvent('change', { detail: v, bubbles: true })); }
  var nf = function (n, d) { return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

  /* ── OTP / PIN ──────────────────────────────────────────── */
  function otp(el, o) {
    o = Object.assign({ length: 6, numeric: true }, o);
    el.classList.add('uf-otp');
    var half = Math.ceil(o.length / 2);
    el.innerHTML = Array.from({ length: o.length }, function (_, i) { return (o.separator && i === half ? '<span class="uf-otp-sep">–</span>' : '') + '<input maxlength="1" ' + (o.numeric ? 'inputmode="numeric"' : '') + (i === 0 ? ' autocomplete="one-time-code"' : '') + (o.mask ? ' type="password"' : '') + ' aria-label="Caractère ' + (i + 1) + '">'; }).join('');
    var ins = Array.from(el.querySelectorAll('input'));
    function val() { return ins.map(function (i) { return i.value; }).join(''); }
    function ok(c) { return o.numeric ? /\d/.test(c) : /[0-9a-z]/i.test(c); }
    function fill(s, from) { s.split('').filter(ok).forEach(function (c, k) { if (ins[from + k]) ins[from + k].value = o.numeric ? c : c.toUpperCase(); }); var n = Math.min(ins.length - 1, from + s.length); ins[n].focus(); changed(); }
    function changed() { var v = val(); emit(el, v); if (v.length === o.length && o.onComplete) o.onComplete(v); }
    ins.forEach(function (inp, i) {
      inp.addEventListener('input', function () { var v = inp.value; if (v.length > 1) { inp.value = ''; return fill(v, i); } if (v && !ok(v)) { inp.value = ''; return; } if (!o.numeric) inp.value = v.toUpperCase(); if (v && ins[i + 1]) ins[i + 1].focus(); changed(); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) { ins[i - 1].value = ''; ins[i - 1].focus(); changed(); e.preventDefault(); } else if (e.key === 'ArrowLeft' && ins[i - 1]) ins[i - 1].focus(); else if (e.key === 'ArrowRight' && ins[i + 1]) ins[i + 1].focus(); });
      inp.addEventListener('paste', function (e) { e.preventDefault(); fill((e.clipboardData.getData('text') || '').trim(), i); });
      inp.addEventListener('focus', function () { inp.select(); });
    });
    return { get: val, set: function (v) { ins.forEach(function (i, k) { i.value = (v || '')[k] || ''; }); }, state: function (s) { el.classList.toggle('bad', s === 'bad'); el.classList.toggle('ok', s === 'ok'); } };
  }

  /* ── Nombre + / − ───────────────────────────────────────── */
  function stepper(el, o) {
    o = Object.assign({ min: -Infinity, max: Infinity, step: 1, decimals: 0, value: 0 }, o);
    var v = o.value; el.classList.add('uf-stepper'); if (o.compact) el.classList.add('compact');
    el.innerHTML = '<button type="button" data-d="-1" aria-label="Diminuer"><span class="mi">remove</span></button><input inputmode="decimal" aria-label="Valeur"><span class="unit">' + esc(o.unit || '') + '</span><button type="button" data-d="1" aria-label="Augmenter"><span class="mi">add</span></button>';
    var inp = el.querySelector('input'), t, rep;
    function set(n, silent) { n = Math.min(o.max, Math.max(o.min, Math.round(n / o.step) * o.step)); v = +n.toFixed(o.decimals); inp.value = nf(v, o.decimals); el.querySelector('[data-d="-1"]').disabled = v <= o.min; el.querySelector('[data-d="1"]').disabled = v >= o.max; if (!silent) emit(el, v); }
    function bump(d, big) { set(v + d * o.step * (big ? 10 : 1)); }
    el.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('pointerdown', function (e) { var d = +b.dataset.d, delay = 400; bump(d); function go() { rep = setTimeout(function () { bump(d); delay = Math.max(40, delay * .8); go(); }, delay); } go(); e.preventDefault(); });
      ['pointerup', 'pointerleave'].forEach(function (ev) { b.addEventListener(ev, function () { clearTimeout(rep); }); });
    });
    inp.addEventListener('keydown', function (e) { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); bump(e.key === 'ArrowUp' ? 1 : -1, e.shiftKey); } });
    inp.addEventListener('change', function () { var n = parseFloat(inp.value.replace(/\s/g, '').replace(',', '.')); set(isNaN(n) ? v : n); });
    set(v, true);
    return { get: function () { return v; }, set: set };
  }

  /* ── Montant / devise ───────────────────────────────────── */
  var DEC = { XOF: 0, EUR: 2, USD: 2 }, SYM = { XOF: 'FCFA', EUR: '€', USD: '$' };
  function currency(el, o) {
    o = Object.assign({ currency: 'XOF', icon: 'payments', placeholder: '0' }, o);
    var v = o.value == null ? null : o.value, cur = o.currency; el.classList.add('uf-currency');
    el.innerHTML = '<div class="field-box"><span class="mi">' + o.icon + '</span><input inputmode="decimal" placeholder="' + esc(o.placeholder) + '" aria-label="Montant">' +
      (o.currencies ? '<select aria-label="Devise">' + o.currencies.map(function (c) { return '<option' + (c === cur ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select>' : '<span class="unit">' + SYM[cur] + '</span>') + '</div>' + (o.inWords ? '<small class="uf-words"></small>' : '') + '<small class="field-error" hidden></small>';
    var inp = el.querySelector('input');
    function show() { inp.value = v == null ? '' : nf(v, DEC[cur]); words(); }
    function words() { var w = el.querySelector('.uf-words'); if (w) w.textContent = v ? ExW.amountInWords(Math.floor(v)) + ' francs CFA' : ''; var er = el.querySelector('.field-error'); er.hidden = !(o.max && v > o.max); er.textContent = 'Plafond : ' + nf(o.max) + ' ' + SYM[cur]; }
    inp.addEventListener('input', function () {
      var pos = inp.selectionStart, digitsBefore = inp.value.slice(0, pos).replace(/[^\d,]/g, '').length;
      var raw = inp.value.replace(/[^\d,.]/g, '').replace('.', ','), parts = raw.split(','), int = parts[0].replace(/^0+(?=\d)/, ''), dec = DEC[cur] ? (parts[1] || '').slice(0, DEC[cur]) : '';
      v = raw === '' ? null : parseFloat(int + (dec ? '.' + dec : '')) || 0;
      inp.value = raw === '' ? '' : nf(parseInt(int || '0', 10)) + (raw.indexOf(',') >= 0 && DEC[cur] ? ',' + dec : '');
      var k = 0, n = 0; while (k < inp.value.length && n < digitsBefore) { if (/[\d,]/.test(inp.value[k])) n++; k++; } inp.setSelectionRange(k, k);
      words(); emit(el, v);
    });
    inp.addEventListener('keydown', function (e) { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); v = Math.max(0, (v || 0) + (e.key === 'ArrowUp' ? 1000 : -1000)); show(); emit(el, v); } });
    inp.addEventListener('blur', show);
    var s = el.querySelector('select'); if (s) s.addEventListener('change', function () { cur = s.value; show(); emit(el, v); });
    show();
    return { get: function () { return v; }, set: function (n) { v = n; show(); } };
  }

  /* ── Intervalle à double curseur ────────────────────────── */
  function range(el, o) {
    o = Object.assign({ min: 0, max: 100, step: 1, minGap: 0, inputs: true, format: function (x) { return nf(x); } }, o);
    var v = (o.value || [o.min, o.max]).slice(); el.classList.add('uf-range');
    el.innerHTML = (o.histogram ? '<div class="uf-histo">' + o.histogram.map(function (h) { return '<i style="height:' + (h / Math.max.apply(0, o.histogram) * 100) + '%"></i>'; }).join('') + '</div>' : '') +
      '<div class="uf-rtrack"><span class="uf-rfill"></span><button type="button" class="uf-thumb" data-i="0" role="slider" aria-label="Minimum"><em></em></button><button type="button" class="uf-thumb" data-i="1" role="slider" aria-label="Maximum"><em></em></button></div>' +
      (o.inputs ? '<div class="uf-rinputs"><div class="field-box"><input data-i="0" inputmode="numeric" aria-label="Minimum"><span class="unit">' + esc(o.unit || '') + '</span></div><span>–</span><div class="field-box"><input data-i="1" inputmode="numeric" aria-label="Maximum"><span class="unit">' + esc(o.unit || '') + '</span></div></div>' : '');
    var track = el.querySelector('.uf-rtrack');
    function pct(x) { return (x - o.min) / (o.max - o.min) * 100; }
    function draw() { var th = el.querySelectorAll('.uf-thumb'); [0, 1].forEach(function (i) { th[i].style.left = pct(v[i]) + '%'; th[i].querySelector('em').textContent = o.format(v[i]); th[i].setAttribute('aria-valuenow', v[i]); });
      var f = el.querySelector('.uf-rfill'); f.style.left = pct(v[0]) + '%'; f.style.width = (pct(v[1]) - pct(v[0])) + '%';
      el.querySelectorAll('.uf-histo i').forEach(function (b, k, all) { var c = o.min + (k + .5) * (o.max - o.min) / all.length; b.classList.toggle('in', c >= v[0] && c <= v[1]); });
      el.querySelectorAll('.uf-rinputs input').forEach(function (inp) { if (document.activeElement !== inp) inp.value = nf(v[+inp.dataset.i]); }); }
    function setI(i, x) { x = Math.round((x - o.min) / o.step) * o.step + o.min; x = Math.min(o.max, Math.max(o.min, x)); if (i === 0) x = Math.min(x, v[1] - o.minGap); else x = Math.max(x, v[0] + o.minGap); v[i] = x; draw(); emit(el, v.slice()); }
    el.querySelectorAll('.uf-thumb').forEach(function (t) { var i = +t.dataset.i;
      t.addEventListener('pointerdown', function (e) { t.setPointerCapture(e.pointerId); t.classList.add('drag'); function mv(ev) { var r = track.getBoundingClientRect(); setI(i, o.min + (ev.clientX - r.left) / r.width * (o.max - o.min)); } t.onpointermove = mv; t.onpointerup = function () { t.onpointermove = null; t.classList.remove('drag'); }; });
      t.addEventListener('keydown', function (e) { var big = (o.max - o.min) / 10, m = { ArrowLeft: -o.step, ArrowRight: o.step, ArrowDown: -o.step, ArrowUp: o.step, PageDown: -big, PageUp: big }; if (m[e.key] != null) { e.preventDefault(); setI(i, v[i] + m[e.key]); } else if (e.key === 'Home') setI(i, o.min); else if (e.key === 'End') setI(i, o.max); }); });
    el.querySelectorAll('.uf-rinputs input').forEach(function (inp) { inp.addEventListener('change', function () { var n = parseFloat(inp.value.replace(/\s/g, '')); if (!isNaN(n)) setI(+inp.dataset.i, n); else draw(); }); });
    draw();
    return { get: function () { return v.slice(); } };
  }

  /* ── Notation ───────────────────────────────────────────── */
  var EMO = ['😞', '🙁', '😐', '🙂', '😍'], EMO_L = ['Très déçu', 'Déçu', 'Correct', 'Satisfait', 'Ravi'];
  function rating(el, o) {
    o = Object.assign({ max: 5, value: 0, variant: 'star' }, o);
    var v = o.value, hover = null; el.classList.add('uf-rating', o.variant, o.size || 'md'); if (o.readonly) el.classList.add('ro');
    el.setAttribute('role', 'slider'); el.tabIndex = o.readonly ? -1 : 0; el.setAttribute('aria-valuemax', o.max);
    function draw() { var s = hover != null ? hover : v;
      el.innerHTML = Array.from({ length: o.max }, function (_, i) { var n = i + 1;
        if (o.variant === 'emoji') return '<button type="button" data-n="' + n + '" class="' + (Math.round(s) === n ? 'on' : '') + '" aria-label="' + EMO_L[i] + '"' + (o.readonly ? ' disabled' : '') + '>' + EMO[i] + '</button>';
        var ic = o.variant === 'heart' ? ['favorite', 'favorite_border', 'favorite'] : ['star', 'star_border', 'star_half'], name = s >= n ? ic[0] : s >= n - .5 ? ic[2] : ic[1];
        return '<button type="button" data-n="' + n + '" class="' + (s >= n - .5 ? 'on' : '') + '" aria-label="' + n + ' sur ' + o.max + '"' + (o.readonly ? ' disabled' : '') + '><span class="mi">' + name + '</span></button>'; }).join('') +
        (o.showValue ? '<span class="uf-rval">' + (o.variant === 'emoji' ? (v ? EMO_L[Math.round(v) - 1] : '—') : (v ? nf(v, v % 1 ? 1 : 0) + ' / ' + o.max : '—')) + '</span>' : '');
      el.setAttribute('aria-valuenow', v); }
    function at(e) { var b = e.target.closest('[data-n]'); if (!b) return null; var n = +b.dataset.n; if (o.half) { var r = b.getBoundingClientRect(); if (e.clientX < r.left + r.width / 2) n -= .5; } return n; }
    if (!o.readonly) {
      el.addEventListener('mousemove', function (e) { var n = at(e); if (n != null && n !== hover) { hover = n; draw(); } });
      el.addEventListener('mouseleave', function () { hover = null; draw(); });
      el.addEventListener('click', function (e) { var n = at(e); if (n == null) return; v = v === n ? 0 : n; hover = null; draw(); emit(el, v); });
      el.addEventListener('keydown', function (e) { var d = o.half ? .5 : 1; if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { v = Math.min(o.max, v + d); } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { v = Math.max(0, v - d); } else return; e.preventDefault(); draw(); emit(el, v); });
    }
    draw();
    return { get: function () { return v; }, set: function (n) { v = n; draw(); } };
  }

  /* ── Couleur ────────────────────────────────────────────── */
  function hexToHsv(h) { var r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, hh = 0;
    if (d) hh = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [(hh * 60 + 360) % 360, mx ? d / mx : 0, mx]; }
  function hsvToHex(h, s, v) { function f(n) { var k = (n + h / 60) % 6; return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255).toString(16).padStart(2, '0'); } return '#' + f(5) + f(3) + f(1); }
  var recent = [];
  function color(el, o) {
    o = Object.assign({ value: '#4f6bed', swatches: ['#4f6bed', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7', '#64748b', '#0f172a', '#ec4899', '#14b8a6'] }, o);
    var v = o.value, hsv = hexToHsv(v); el.classList.add('uf-color');
    function panel() { return '<div class="uf-cp"><div class="uf-sv" style="background:' + hsvToHex(hsv[0], 1, 1) + '"><span class="uf-svk" style="left:' + hsv[1] * 100 + '%;top:' + (1 - hsv[2]) * 100 + '%"></span></div>' +
      '<input type="range" class="uf-hue" min="0" max="359" value="' + Math.round(hsv[0]) + '" aria-label="Teinte"><div class="uf-sw">' + o.swatches.map(function (c) { return '<button type="button" data-c="' + c + '" style="background:' + c + '" class="' + (c.toLowerCase() === v.toLowerCase() ? 'on' : '') + '" aria-label="' + c + '"></button>'; }).join('') + '</div>' +
      (recent.length ? '<div class="uf-recent"><small>Récentes</small>' + recent.map(function (c) { return '<button type="button" data-c="' + c + '" style="background:' + c + '" aria-label="' + c + '"></button>'; }).join('') + '</div>' : '') +
      ('EyeDropper' in window ? '<button type="button" class="ui-btn ui-btn--text ui-btn--sm uf-eye"><span class="mi">colorize</span>Pipette</button>' : '') + '</div>'; }
    function set(c, push) { v = c; hsv = hexToHsv(c); if (push && recent.indexOf(c) < 0) { recent.unshift(c); recent = recent.slice(0, 6); } draw(); emit(el, v); }
    function bind(root) {
      var sv = root.querySelector('.uf-sv');
      sv.addEventListener('pointerdown', function (e) { sv.setPointerCapture(e.pointerId); function mv(ev) { var r = sv.getBoundingClientRect(); hsv[1] = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)); hsv[2] = 1 - Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height)); v = hsvToHex(hsv[0], hsv[1], hsv[2]); sv.querySelector('.uf-svk').style.left = hsv[1] * 100 + '%'; sv.querySelector('.uf-svk').style.top = (1 - hsv[2]) * 100 + '%'; syncField(); emit(el, v); } mv(e); sv.onpointermove = mv; sv.onpointerup = function () { sv.onpointermove = null; }; });
      root.querySelector('.uf-hue').addEventListener('input', function () { hsv[0] = +this.value; v = hsvToHex(hsv[0], hsv[1], hsv[2]); sv.style.background = hsvToHex(hsv[0], 1, 1); syncField(); emit(el, v); });
      root.addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (b) set(b.dataset.c, true); if (e.target.closest('.uf-eye')) new window.EyeDropper().open().then(function (r) { set(r.sRGBHex, true); }).catch(function () {}); });
    }
    function syncField() { var i = el.querySelector('.uf-hex'); if (i) { i.value = v; el.querySelector('.uf-chip').style.background = v; } }
    function draw() {
      if (o.inline) { el.innerHTML = panel(); bind(el); return; }
      el.innerHTML = '<div class="field-box"><button type="button" class="uf-chip" style="background:' + v + '" aria-label="Ouvrir le sélecteur"></button><input class="uf-hex" value="' + v + '" maxlength="7" aria-label="Couleur hexadécimale"><span class="mi">palette</span></div>';
      el.querySelector('.uf-hex').addEventListener('change', function () { if (/^#[0-9a-f]{6}$/i.test(this.value)) set(this.value.toLowerCase(), true); else this.value = v; });
      el.querySelector('.uf-chip').addEventListener('click', function () { var p = document.createElement('div'); p.className = 'uf-pop'; p.innerHTML = panel(); document.body.appendChild(p); var r = el.getBoundingClientRect(); p.style.left = Math.min(r.left, innerWidth - 280) + 'px'; p.style.top = (r.bottom + 4) + 'px'; bind(p);
        setTimeout(function () { document.addEventListener('mousedown', function off(e) { if (!p.contains(e.target)) { p.remove(); document.removeEventListener('mousedown', off); draw(); } }); }); });
    }
    draw();
    return { get: function () { return v; } };
  }

  /* ── Texte riche (contenteditable) ──────────────────────── */
  function richText(el, o) {
    o = Object.assign({ value: '', placeholder: 'Saisissez votre texte…', minHeight: '160px' }, o);
    el.classList.add('uf-rte');
    var B = [['undo', 'undo', 'Annuler'], ['redo', 'redo', 'Rétablir'], '|', ['bold', 'format_bold', 'Gras'], ['italic', 'format_italic', 'Italique'], ['underline', 'format_underlined', 'Souligné'], ['strikeThrough', 'strikethrough_s', 'Barré'], '|', ['insertUnorderedList', 'format_list_bulleted', 'Liste à puces'], ['insertOrderedList', 'format_list_numbered', 'Liste numérotée'], ['formatBlock:blockquote', 'format_quote', 'Citation'], ['createLink', 'link', 'Lien'], '|', ['removeFormat', 'format_clear', 'Nettoyer']];
    el.innerHTML = '<div class="uf-rte-bar"><select aria-label="Style de paragraphe"><option value="p">Paragraphe</option><option value="h2">Titre 2</option><option value="h3">Titre 3</option></select>' + B.map(function (b) { return b === '|' ? '<span class="sep"></span>' : '<button type="button" data-cmd="' + b[0] + '" title="' + b[2] + '" aria-label="' + b[2] + '"><span class="mi">' + b[1] + '</span></button>'; }).join('') + '</div>' +
      '<div class="uf-rte-area prose" contenteditable="true" role="textbox" aria-multiline="true" data-ph="' + esc(o.placeholder) + '" style="min-height:' + o.minHeight + '"></div><div class="uf-rte-foot"></div>';
    var area = el.querySelector('.uf-rte-area'); area.innerHTML = o.value;
    function changed() { var t = area.textContent.length; el.querySelector('.uf-rte-foot').textContent = t + (o.maxLength ? ' / ' + o.maxLength : '') + ' caractères'; el.querySelector('.uf-rte-foot').classList.toggle('over', o.maxLength && t > o.maxLength); emit(el, area.textContent.trim() ? area.innerHTML : ''); }
    el.querySelector('.uf-rte-bar').addEventListener('mousedown', function (e) { if (e.target.closest('button')) e.preventDefault(); });
    el.querySelector('.uf-rte-bar').addEventListener('click', function (e) { var b = e.target.closest('[data-cmd]'); if (!b) return; var c = b.dataset.cmd.split(':');
      if (c[0] === 'createLink') { var u = prompt('Adresse du lien', 'https://'); if (u) document.execCommand('createLink', false, u); } else document.execCommand(c[0], false, c[1] ? '<' + c[1] + '>' : null); area.focus(); changed(); });
    el.querySelector('select').addEventListener('change', function () { area.focus(); document.execCommand('formatBlock', false, '<' + this.value + '>'); changed(); });
    area.addEventListener('input', changed);
    area.addEventListener('paste', function (e) { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); });
    changed();
    return { get: function () { return area.innerHTML; } };
  }

  /* ── Markdown ───────────────────────────────────────────── */
  function markdown(el, o) {
    o = Object.assign({ value: '', mode: 'split', minHeight: '260px' }, o);
    var mode = o.mode; el.classList.add('uf-md');
    var T = [['**', '**', 'format_bold', 'Gras (Ctrl+B)'], ['*', '*', 'format_italic', 'Italique (Ctrl+I)'], ['`', '`', 'code', 'Code'], ['[', '](https://)', 'link', 'Lien (Ctrl+K)'], ['\n- ', '', 'format_list_bulleted', 'Liste'], ['\n1. ', '', 'format_list_numbered', 'Liste numérotée'], ['\n> ', '', 'format_quote', 'Citation'], ['\n## ', '', 'title', 'Titre']];
    el.innerHTML = '<div class="uf-md-bar"><div class="ui-segmented"><button type="button" data-m="write">Écrire</button><button type="button" data-m="preview">Aperçu</button><button type="button" data-m="split">Côte à côte</button></div><span class="spacer"></span>' + T.map(function (t, i) { return '<button type="button" class="ui-btn ui-btn--icon" data-t="' + i + '" title="' + t[3] + '" aria-label="' + t[3] + '"><span class="mi">' + t[2] + '</span></button>'; }).join('') + '</div>' +
      '<div class="uf-md-body"><textarea aria-label="Markdown" style="min-height:' + o.minHeight + '"></textarea><div class="uf-md-prev prose"></div></div>';
    var ta = el.querySelector('textarea'), pv = el.querySelector('.uf-md-prev'); ta.value = o.value;
    function render() { pv.innerHTML = UIKitUtils.markdownToHtml(ta.value); el.dataset.mode = mode; el.querySelectorAll('[data-m]').forEach(function (b) { b.classList.toggle('on', b.dataset.m === mode); }); emit(el, ta.value); }
    function wrap(a, b) { var s = ta.selectionStart, e = ta.selectionEnd, sel = ta.value.slice(s, e) || (b ? 'texte' : ''); ta.setRangeText(a + sel + b, s, e, 'end'); ta.focus(); render(); }
    el.addEventListener('click', function (e) { var m = e.target.closest('[data-m]'), t = e.target.closest('[data-t]'); if (m) { mode = m.dataset.m; render(); } if (t) wrap(T[+t.dataset.t][0], T[+t.dataset.t][1]); });
    ta.addEventListener('input', render);
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && /^[bik]$/i.test(e.key)) { e.preventDefault(); var k = { b: 0, i: 1, k: 3 }[e.key.toLowerCase()]; wrap(T[k][0], T[k][1]); }
      else if (e.key === 'Tab') { e.preventDefault(); ta.setRangeText('  ', ta.selectionStart, ta.selectionEnd, 'end'); }
      else if (e.key === 'Enter') { var line = ta.value.slice(0, ta.selectionStart).split('\n').pop(), m = line.match(/^(\s*)([-*]|\d+\.)( \[[ x]\])? /);
        if (m) { e.preventDefault(); if (line.trim() === m[0].trim()) { ta.setRangeText('', ta.selectionStart - line.length, ta.selectionStart, 'end'); } else { var n = /\d/.test(m[2]) ? (parseInt(m[2], 10) + 1) + '.' : m[2]; ta.setRangeText('\n' + m[1] + n + (m[3] ? ' [ ]' : '') + ' ', ta.selectionStart, ta.selectionEnd, 'end'); } render(); } }
    });
    render();
    return { get: function () { return ta.value; } };
  }

  /* ── Sélection arborescente ─────────────────────────────── */
  function treeSelect(el, o) {
    o = Object.assign({ placeholder: 'Choisir…', options: [] }, o);
    var value = o.multiple ? (o.value || []).slice() : (o.value == null ? null : o.value), open = new Set(), q = '', pop = null;
    el.classList.add('uf-select');
    function walk(ns, f, path) { ns.forEach(function (n) { var p = (path || []).concat(n); f(n, p); if (n.children) walk(n.children, f, p); }); }
    function leaves(n) { var out = []; walk([n], function (x) { if (!x.children && !x.disabled) out.push(x.value); }); return out; }
    function find(v) { var r = null; walk(o.options, function (n, p) { if (n.value === v) r = p; }); return r; }
    function state(n) { if (!n.children) return value.indexOf(n.value) >= 0 ? 'on' : 'off'; var l = leaves(n), c = l.filter(function (x) { return value.indexOf(x) >= 0; }).length; return c === 0 ? 'off' : c === l.length ? 'on' : 'mid'; }
    function label() { if (!o.multiple) { var p = find(value); return p ? p.map(function (n) { return n.label; }).join(' › ') : ''; } return value.map(function (v) { var p = find(v); return p ? p[p.length - 1].label : v; }).join(', '); }
    function trig() { var l = label(); el.innerHTML = '<button type="button" class="field-box uf-trigger">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + '<span class="uf-val' + (l ? '' : ' ph') + '">' + esc(l || o.placeholder) + '</span>' + (l ? '<span class="mi uf-clear" aria-label="Effacer">close</span>' : '') + '<span class="mi uf-caret">expand_more</span></button>'; }
    function matches(n) { if (!q) return true; if (norm(n.label).indexOf(norm(q)) >= 0) return true; return (n.children || []).some(matches); }
    function rows(ns, d) { return ns.filter(matches).map(function (n) { var kids = n.children && n.children.length, isOpen = q || open.has(n.value), st = o.multiple ? state(n) : null, sel = !o.multiple && value === n.value, selectable = !n.disabled && (!o.leafOnly || !kids);
      return '<div class="uf-trow' + (sel ? ' on' : '') + (n.disabled ? ' dis' : '') + '" style="padding-left:' + (6 + d * 18) + 'px">' + (kids ? '<button type="button" class="uf-ttg" data-tg="' + n.value + '" aria-label="Déplier"><span class="mi">' + (isOpen ? 'expand_more' : 'chevron_right') + '</span></button>' : '<span class="uf-tsp"></span>') +
        '<button type="button" class="uf-tlbl" data-v="' + n.value + '"' + (selectable || o.multiple ? '' : ' data-only-toggle') + (n.disabled ? ' disabled' : '') + '>' + (o.multiple ? '<span class="uf-cb ' + st + '"></span>' : '') + (n.icon ? '<span class="mi">' + n.icon + '</span>' : '') + esc(n.label) + '</button></div>' + (kids && isOpen ? rows(n.children, d + 1) : ''); }).join(''); }
    function list() { pop.querySelector('.uf-tree').innerHTML = rows(o.options, 0) || '<div class="uf-empty">Aucun résultat</div>'; }
    function findNode(v) { var r; walk(o.options, function (n) { if (n.value === v) r = n; }); return r; }
    el.addEventListener('click', function (e) {
      if (e.target.closest('.uf-clear')) { e.stopPropagation(); value = o.multiple ? [] : null; trig(); emit(el, value); return; }
      if (!e.target.closest('.uf-trigger')) return;
      if (pop) { pop.remove(); pop = null; return; }
      if (!o.multiple && value) { var p = find(value); if (p) p.slice(0, -1).forEach(function (n) { open.add(n.value); }); } else walk(o.options, function (n, p) { if (p.length === 1 && n.children) open.add(n.value); });
      pop = document.createElement('div'); pop.className = 'uf-pop'; pop.innerHTML = '<label class="uf-search"><span class="mi">search</span><input placeholder="Rechercher…" aria-label="Rechercher"></label><div class="uf-tree uf-list"></div>';
      document.body.appendChild(pop); var r = el.getBoundingClientRect(); pop.style.minWidth = r.width + 'px'; pop.style.left = r.left + 'px'; pop.style.top = (r.bottom + 4) + 'px';
      pop.querySelector('input').addEventListener('input', function () { q = this.value; list(); }); pop.querySelector('input').focus();
      pop.addEventListener('click', function (ev) { var t = ev.target.closest('[data-tg]'), l = ev.target.closest('[data-v]');
        if (t) { open.has(t.dataset.tg) ? open.delete(t.dataset.tg) : open.add(t.dataset.tg); list(); return; }
        if (!l) return; var n = findNode(l.dataset.v);
        if (o.multiple) { var ls = leaves(n), all = state(n) === 'on'; ls.forEach(function (x) { var k = value.indexOf(x); if (all && k >= 0) value.splice(k, 1); else if (!all && k < 0) value.push(x); }); list(); trig(); emit(el, value.slice()); }
        else if (l.hasAttribute('data-only-toggle')) { open.has(n.value) ? open.delete(n.value) : open.add(n.value); list(); }
        else { value = n.value; trig(); emit(el, value); pop.remove(); pop = null; } });
      setTimeout(function () { document.addEventListener('mousedown', function off(ev) { if (pop && !pop.contains(ev.target) && !el.contains(ev.target)) { pop.remove(); pop = null; } if (!pop) document.removeEventListener('mousedown', off); }); });
      list();
    });
    trig();
    return { get: function () { return o.multiple ? value.slice() : value; } };
  }

  /* ── Liste de transfert ─────────────────────────────────── */
  function transfer(el, o) {
    o = Object.assign({ items: [], value: [], sourceTitle: 'Disponibles', targetTitle: 'Sélectionnés' }, o);
    var target = o.value.slice(), sel = { s: new Set(), t: new Set() }, q = { s: '', t: '' }, last = { s: null, t: null }, drag = null;
    el.classList.add('uf-transfer');
    function item(v) { return o.items.find(function (x) { return x.value === v; }); }
    function side(k) { var arr = k === 't' ? target.map(item) : o.items.filter(function (x) { return target.indexOf(x.value) < 0; }); return arr.filter(function (x) { return !q[k] || norm(x.label + ' ' + (x.description || '')).indexOf(norm(q[k])) >= 0; }); }
    function col(k) { var list = side(k), title = k === 's' ? o.sourceTitle : o.targetTitle, total = k === 't' ? target.length : o.items.length - target.length;
      return '<div class="uf-tcol" data-k="' + k + '"><div class="uf-thead"><label class="ui-check"><input type="checkbox" data-all="' + k + '"' + (list.length && list.filter(function (x) { return !x.disabled; }).every(function (x) { return sel[k].has(x.value); }) ? ' checked' : '') + ' aria-label="Tout sélectionner"></label><strong>' + esc(title) + '</strong><span class="muted small">' + sel[k].size + ' / ' + total + '</span></div>' +
        '<label class="uf-search"><span class="mi">search</span><input data-q="' + k + '" value="' + esc(q[k]) + '" placeholder="Filtrer…" aria-label="Filtrer"></label><div class="uf-tlist" data-drop="' + k + '">' +
        (list.length ? list.map(function (x) { return '<div class="uf-titem' + (sel[k].has(x.value) ? ' on' : '') + (x.disabled ? ' dis' : '') + '" data-v="' + esc(x.value) + '" draggable="' + !x.disabled + '">' + (x.icon ? '<span class="mi">' + x.icon + '</span>' : '') + '<span class="t"><span>' + esc(x.label) + '</span>' + (x.description ? '<small>' + esc(x.description) + '</small>' : '') + '</span></div>'; }).join('') : '<div class="uf-empty">' + (q[k] ? 'Aucun résultat' : 'Vide') + '</div>') + '</div></div>'; }
    function draw() { var fs = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.q : null;
      el.innerHTML = col('s') + '<div class="uf-tbtns"><button type="button" class="ui-btn ui-btn--icon" data-mv="t"' + (sel.s.size ? '' : ' disabled') + ' aria-label="Ajouter"><span class="mi">chevron_right</span></button><button type="button" class="ui-btn ui-btn--icon" data-mv="s"' + (sel.t.size ? '' : ' disabled') + ' aria-label="Retirer"><span class="mi">chevron_left</span></button></div>' + col('t');
      if (fs) { var i = el.querySelector('[data-q="' + fs + '"]'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
    function move(to, vals) { vals = vals.filter(function (v) { var it = item(v); return it && !it.disabled; }); if (to === 't') target = target.concat(vals.filter(function (v) { return target.indexOf(v) < 0; })); else target = target.filter(function (v) { return vals.indexOf(v) < 0; }); sel.s.clear(); sel.t.clear(); draw(); emit(el, target.slice()); }
    el.addEventListener('click', function (e) {
      var it = e.target.closest('.uf-titem'), mv = e.target.closest('[data-mv]');
      if (mv) { var from = mv.dataset.mv === 't' ? 's' : 't'; move(mv.dataset.mv, Array.from(sel[from])); return; }
      if (!it || it.classList.contains('dis')) return; var k = it.closest('[data-k]').dataset.k, v = it.dataset.v;
      if (e.shiftKey && last[k]) { var l = side(k).map(function (x) { return x.value; }), a = l.indexOf(last[k]), b = l.indexOf(v); l.slice(Math.min(a, b), Math.max(a, b) + 1).forEach(function (x) { if (!item(x).disabled) sel[k].add(x); }); }
      else sel[k].has(v) ? sel[k].delete(v) : sel[k].add(v);
      last[k] = v; draw();
    });
    el.addEventListener('dblclick', function (e) { var it = e.target.closest('.uf-titem'); if (it) move(it.closest('[data-k]').dataset.k === 's' ? 't' : 's', [it.dataset.v]); });
    el.addEventListener('change', function (e) { var a = e.target.dataset && e.target.dataset.all; if (!a) return; e.stopPropagation(); side(a).forEach(function (x) { if (!x.disabled) e.target.checked ? sel[a].add(x.value) : sel[a].delete(x.value); }); draw(); });
    el.addEventListener('input', function (e) { var k = e.target.dataset.q; if (k) { q[k] = e.target.value; draw(); } });
    el.addEventListener('dragstart', function (e) { var it = e.target.closest('.uf-titem'); if (!it) return; var k = it.closest('[data-k]').dataset.k; drag = { k: k, vals: sel[k].has(it.dataset.v) ? Array.from(sel[k]) : [it.dataset.v], v: it.dataset.v }; e.dataTransfer.effectAllowed = 'move'; });
    el.addEventListener('dragover', function (e) { if (drag && e.target.closest('[data-drop]')) { e.preventDefault(); } });
    el.addEventListener('drop', function (e) { var z = e.target.closest('[data-drop]'); if (!drag || !z) return; e.preventDefault(); var to = z.dataset.drop;
      if (to === drag.k && to === 't') { var over = e.target.closest('.uf-titem'), from = target.indexOf(drag.v); if (over && over.dataset.v !== drag.v) { target.splice(from, 1); target.splice(target.indexOf(over.dataset.v), 0, drag.v); draw(); emit(el, target.slice()); } }
      else if (to !== drag.k) move(to, drag.vals); drag = null; });
    draw();
    return { get: function () { return target.slice(); } };
  }

  /* ── Tags libres ────────────────────────────────────────── */
  function tags(el, o) {
    o = Object.assign({ value: [], suggestions: [], allowCustom: true, placeholder: 'Ajouter…', validator: null, transform: null }, o);
    var v = o.value.slice(), act = -1, editing = -1; el.classList.add('uf-tags');
    function sug() { var q = norm(el.querySelector('input') ? el.querySelector('input').value : ''); return o.suggestions.filter(function (s) { return v.indexOf(s) < 0 && (!q || norm(s).indexOf(q) >= 0); }).slice(0, 8); }
    function draw(focus) {
      var full = o.max && v.length >= o.max;
      el.innerHTML = '<div class="field-box uf-tagbox">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + v.map(function (t, i) { var bad = o.validator && !o.validator(t);
        return i === editing ? '<input class="uf-tag-edit" value="' + esc(t) + '" data-e="' + i + '">' : '<span class="uf-tag' + (bad ? ' bad' : '') + '" data-i="' + i + '" title="' + (bad ? esc(o.invalidMessage || 'Valeur invalide') : 'Double-clic pour modifier') + '">' + esc(t) + '<button type="button" data-rm="' + i + '" aria-label="Retirer ' + esc(t) + '"><span class="mi">close</span></button></span>'; }).join('') +
        '<input class="uf-tag-in" placeholder="' + (full ? 'Limite atteinte (' + o.max + ')' : esc(o.placeholder)) + '"' + (full ? ' disabled' : '') + ' aria-label="' + esc(o.placeholder) + '"></div><div class="uf-tag-sug" hidden></div>' + (o.max ? '<small class="field-hint">' + v.length + ' / ' + o.max + '</small>' : '');
      if (focus) { var f = el.querySelector(editing >= 0 ? '.uf-tag-edit' : '.uf-tag-in'); f && f.focus(); }
    }
    function showSug() { var box = el.querySelector('.uf-tag-sug'), s = sug(); box.hidden = !s.length || document.activeElement !== el.querySelector('.uf-tag-in'); box.innerHTML = s.map(function (x, i) { return '<button type="button" class="uf-opt' + (i === act ? ' act' : '') + '" data-s="' + esc(x) + '">' + esc(x) + '</button>'; }).join(''); }
    function add(t) { t = String(t).trim(); if (o.transform) t = o.transform(t); if (!t || v.indexOf(t) >= 0 || (o.max && v.length >= o.max)) return false; if (!o.allowCustom && o.suggestions.indexOf(t) < 0) return false; v.push(t); return true; }
    function commit(silentFocus) { emit(el, v.slice()); draw(!silentFocus); }
    el.addEventListener('keydown', function (e) {
      var inp = e.target;
      if (inp.classList.contains('uf-tag-edit')) { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); if (e.key === 'Enter' && inp.value.trim()) v[+inp.dataset.e] = o.transform ? o.transform(inp.value.trim()) : inp.value.trim(); editing = -1; commit(); } return; }
      if (!inp.classList.contains('uf-tag-in')) return; var s = sug();
      if (e.key === 'ArrowDown') { act = Math.min(s.length - 1, act + 1); showSug(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { act = Math.max(-1, act - 1); showSug(); e.preventDefault(); }
      else if ((e.key === 'Enter' || e.key === ',' || (e.key === 'Tab' && inp.value)) && (inp.value.trim() || act >= 0)) { e.preventDefault(); add(act >= 0 ? s[act] : inp.value); act = -1; commit(); }
      else if (e.key === 'Backspace' && !inp.value && v.length) { v.pop(); commit(); }
    });
    el.addEventListener('input', function (e) { if (e.target.classList.contains('uf-tag-in')) { act = -1; showSug(); } });
    el.addEventListener('focusin', function (e) { if (e.target.classList.contains('uf-tag-in')) showSug(); });
    el.addEventListener('focusout', function () { setTimeout(function () { if (!el.contains(document.activeElement)) { var s = el.querySelector('.uf-tag-sug'); if (s) s.hidden = true; if (editing >= 0) { editing = -1; draw(); } } }, 120); });
    el.addEventListener('paste', function (e) { if (!e.target.classList.contains('uf-tag-in')) return; var t = e.clipboardData.getData('text'); if (/[,;\n]/.test(t)) { e.preventDefault(); t.split(/[,;\n]+/).forEach(add); commit(); } });
    el.addEventListener('mousedown', function (e) { if (e.target.closest('[data-s]')) e.preventDefault(); });
    el.addEventListener('click', function (e) { var r = e.target.closest('[data-rm]'), s = e.target.closest('[data-s]'); if (r) { v.splice(+r.dataset.rm, 1); commit(); } else if (s) { add(s.dataset.s); commit(); } else if (e.target.closest('.uf-tagbox')) { var i = el.querySelector('.uf-tag-in'); i && i.focus(); } });
    el.addEventListener('dblclick', function (e) { var t = e.target.closest('.uf-tag'); if (t) { editing = +t.dataset.i; draw(true); } });
    draw();
    return { get: function () { return v.slice(); } };
  }

  /* ── Adresse avec carte ─────────────────────────────────── */
  function address(el, o) {
    o = Object.assign({ value: null, showCoords: true }, o);
    var v = o.value, mapRef = null, marker = null; el.classList.add('uf-address');
    el.innerHTML = '<div class="uf-addr-auto"></div><div class="uf-addr-row"><button type="button" class="ui-btn ui-btn--text ui-btn--sm uf-locate"><span class="mi">my_location</span>Ma position</button><span class="uf-coords muted small"></span></div>' + (o.map ? '<div class="uf-addr-map"></div>' : '');
    UIForms.autocomplete(el.firstChild, { icon: 'place', placeholder: 'Rechercher une adresse…', searchFn: o.search, displayFn: function (p) { return p.label + (p.detail ? ', ' + p.detail : ''); }, subFn: function (p) { return p.city || ''; } });
    function upd(silent) { var c = el.querySelector('.uf-coords'); c.textContent = v && o.showCoords ? v.lat.toFixed(5) + ', ' + v.lng.toFixed(5) : ''; if (v) el.querySelector('.uf-addr-auto input').value = v.label + (v.detail ? ', ' + v.detail : '');
      if (mapRef && v) { if (!marker) marker = L.marker([v.lat, v.lng]).addTo(mapRef); else marker.setLatLng([v.lat, v.lng]); mapRef.setView([v.lat, v.lng], 15); }
      if (!silent) emit(el, v); }
    el.firstChild.addEventListener('change', function (e) { e.stopPropagation(); v = e.detail; upd(); });
    el.querySelector('.uf-locate').addEventListener('click', function () { if (!navigator.geolocation) return UIKit.toast('Géolocalisation indisponible'); navigator.geolocation.getCurrentPosition(function (p) { v = { label: 'Ma position', detail: '', lat: p.coords.latitude, lng: p.coords.longitude }; upd(); }, function () { UIKit.toast('Position refusée ou indisponible'); }); });
    if (o.map && window.UIMap) UIMap.create(el.querySelector('.uf-addr-map'), { height: '220px', center: v ? [v.lat, v.lng] : undefined, zoom: v ? 15 : 11 }).then(function (m) { if (!m) return; mapRef = m; m.on('click', function (ev) { v = { label: 'Point choisi sur la carte', detail: '', lat: ev.latlng.lat, lng: ev.latlng.lng }; upd(); }); upd(true); });
    upd(true);
    return { get: function () { return v; } };
  }

  /* ── Mot de passe avec jauge ────────────────────────────── */
  var COMMON = ['password', 'motdepasse', 'azerty', 'qwerty', '123456', 'admin', 'abidjan', 'soleil', 'bonjour'];
  function score(p) { if (!p) return 0; var s = 0; if (p.length >= 8) s++; if (p.length >= 12) s++; var kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^\w]/].filter(function (r) { return r.test(p); }).length; s += kinds >= 3 ? 1 : 0; s += kinds === 4 && p.length >= 10 ? 1 : 0;
    if (COMMON.some(function (w) { return norm(p).indexOf(w) >= 0; }) || /(.)\1\1/.test(p) || /(012|123|234|345|456|567|678|789|abc|bcd)/i.test(p)) s = Math.min(s, 1); return Math.max(1, Math.min(4, s)); }
  function password(el, o) {
    o = Object.assign({ value: '' }, o); el.classList.add('uf-pw');
    var R = [['8 caractères minimum', function (p) { return p.length >= 8; }], ['Une majuscule et une minuscule', function (p) { return /[a-z]/.test(p) && /[A-Z]/.test(p); }], ['Un chiffre', function (p) { return /\d/.test(p); }], ['Un caractère spécial', function (p) { return /[^\w]/.test(p); }], ['Pas de mot courant ni de suite', function (p) { return p && score(p) > 1 || (p && !COMMON.some(function (w) { return norm(p).indexOf(w) >= 0; }) && !/(.)\1\1|(123|abc)/i.test(p)); }]];
    el.innerHTML = '<div class="field-box"><span class="mi">lock</span><input type="password" autocomplete="new-password" aria-label="Mot de passe"><button type="button" class="ui-btn ui-btn--icon" data-eye aria-label="Afficher"><span class="mi">visibility</span></button>' + (o.generator ? '<button type="button" class="ui-btn ui-btn--icon" data-gen title="Générer" aria-label="Générer"><span class="mi">casino</span></button>' : '') + '</div>' +
      '<div class="uf-meter"><i></i><i></i><i></i><i></i></div><div class="uf-pw-info"><span class="uf-pw-lbl"></span><span class="uf-caps" hidden><span class="mi">keyboard_capslock</span>Majuscules activées</span></div><ul class="uf-rules"></ul>';
    var inp = el.querySelector('input'); inp.value = o.value;
    function draw() { var p = inp.value, s = score(p), tone = ['', 'error', 'warning', 'info', 'success'][s];
      el.querySelectorAll('.uf-meter i').forEach(function (b, k) { b.style.background = k < s ? 'var(--' + tone + ')' : ''; });
      el.querySelector('.uf-pw-lbl').textContent = p ? ['', 'Très faible', 'Faible', 'Correct', 'Robuste'][s] : 'Saisissez un mot de passe';
      el.querySelector('.uf-rules').innerHTML = (p || o.showRulesEmpty) ? R.map(function (r) { var ok = r[1](p); return '<li class="' + (ok ? 'ok' : '') + '"><span class="mi">' + (ok ? 'check_circle' : 'radio_button_unchecked') + '</span>' + r[0] + '</li>'; }).join('') : '';
      emit(el, p); }
    inp.addEventListener('input', draw);
    inp.addEventListener('keyup', function (e) { el.querySelector('.uf-caps').hidden = !(e.getModifierState && e.getModifierState('CapsLock')); });
    el.querySelector('[data-eye]').addEventListener('click', function () { var t = inp.type === 'password'; inp.type = t ? 'text' : 'password'; this.firstChild.textContent = t ? 'visibility_off' : 'visibility'; });
    var g = el.querySelector('[data-gen]'); if (g) g.addEventListener('click', function () { var sets = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnpqrstuvwxyz', '23456789', '!@#$%&*?+-'], a = new Uint32Array(16), out = ''; crypto.getRandomValues(a);
      for (var i = 0; i < 16; i++) { var s = sets[i < 4 ? i : a[i] % 4]; out += s[a[i] % s.length]; } inp.value = out.split('').sort(function () { return .5 - Math.random(); }).join(''); inp.type = 'text'; draw(); });
    draw();
    return { get: function () { return inp.value; } };
  }

  /* ── Valeur à copier ────────────────────────────────────── */
  function copy(el, o) {
    o = Object.assign({ value: '', icon: 'content_copy' }, o); var shown = !o.secret; el.classList.add('uf-copy');
    function masked(v) { return v.length > 10 ? v.slice(0, 4) + '•'.repeat(Math.min(16, v.length - 8)) + v.slice(-4) : '•'.repeat(v.length); }
    function draw() { el.innerHTML = '<div class="uf-copybox' + (o.multiline ? ' ml' : '') + '">' + (o.multiline ? '' : '<span class="mi">' + o.icon + '</span>') + (o.multiline ? '<pre>' + esc(o.value) + '</pre>' : '<span class="v">' + esc(shown ? o.value : masked(o.value)) + '</span>') +
      (o.secret ? '<button type="button" class="ui-btn ui-btn--icon" data-a="eye" aria-label="' + (shown ? 'Masquer' : 'Afficher') + '"><span class="mi">' + (shown ? 'visibility_off' : 'visibility') + '</span></button>' : '') +
      (o.regenerable ? '<button type="button" class="ui-btn ui-btn--icon" data-a="regen" title="Régénérer" aria-label="Régénérer"><span class="mi">autorenew</span></button>' : '') +
      '<button type="button" class="ui-btn ui-btn--icon" data-a="copy" title="Copier ' + esc(o.label || '') + '" aria-label="Copier"><span class="mi">content_copy</span></button></div>'; }
    el.addEventListener('click', function (e) { var b = e.target.closest('[data-a]'); if (!b) return;
      if (b.dataset.a === 'eye') { shown = !shown; draw(); }
      else if (b.dataset.a === 'regen') UIKit.confirm({ title: 'Régénérer ' + (o.label || 'la valeur') + ' ?', message: "L'ancienne valeur cessera immédiatement de fonctionner.", confirmLabel: 'Régénérer', type: 'danger' }).then(function (ok) { if (!ok) return; o.value = o.regenerate ? o.regenerate() : o.value; draw(); emit(el, o.value); UIKit.toast('Nouvelle valeur générée'); });
      else { try { navigator.clipboard.writeText(o.value); } catch (x) {} b.firstChild.textContent = 'check'; b.classList.add('ok'); setTimeout(function () { b.firstChild.textContent = 'content_copy'; b.classList.remove('ok'); }, 1500); UIKit.toast('Copié dans le presse-papiers'); } });
    draw();
    return { get: function () { return o.value; } };
  }

  window.UIFields = { otp: otp, stepper: stepper, currency: currency, range: range, rating: rating, color: color, richText: richText, markdown: markdown, treeSelect: treeSelect, transfer: transfer, tags: tags, address: address, password: password, copy: copy, score: score };
})();
