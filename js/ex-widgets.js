/* Petits widgets partagés des pages d'exemple (JS natif). */
(function () {
  'use strict';
  function fmtSize(b) { return b < 1024 ? b + ' o' : b < 1048576 ? (b / 1024).toFixed(0) + ' Ko' : (b / 1048576).toFixed(1).replace('.', ',') + ' Mo'; }
  function fileIcon(name) {
    var ext = (name.split('.').pop() || '').toLowerCase();
    return /png|jpe?g|gif|webp|svg/.test(ext) ? 'image' : ext === 'pdf' ? 'picture_as_pdf' : /xlsx?|csv/.test(ext) ? 'table_chart' : /docx?/.test(ext) ? 'description' : 'insert_drive_file';
  }

  /* File d'envoi : <div data-dropzone data-accept=".pdf,image/*" data-max-files="3" data-max-size="10485760" data-hint="…"></div>
     Les fichiers restent dans le navigateur (aucun envoi réel) ; progression simulée. */
  function dropzone(el) {
    var max = +el.dataset.maxFiles || 5, maxSize = +el.dataset.maxSize || 10485760, files = [];
    el.innerHTML = '<label class="dropzone" tabindex="0"><span class="mi">cloud_upload</span><strong>Glissez vos fichiers ici ou <span style="color:var(--primary)">parcourez</span></strong>' +
      '<small class="help">' + (el.dataset.hint || '') + '</small><input type="file" multiple hidden accept="' + (el.dataset.accept || '') + '"></label><ul class="files"></ul>';
    var zone = el.querySelector('.dropzone'), input = el.querySelector('input'), list = el.querySelector('.files');
    function render() {
      list.innerHTML = files.map(function (f, i) {
        return '<li><span class="ic-tile tone-primary"><span class="mi">' + fileIcon(f.file.name) + '</span></span><span class="grow"><strong>' + f.file.name + '</strong>' +
          (f.error ? '<small style="color:var(--error-text)">' + f.error + '</small>' : '<small>' + fmtSize(f.file.size) + (f.p < 100 ? ' · ' + f.p + ' %' : ' · Prêt') + '</small>' +
          (f.p < 100 ? '<span class="ui-progress" style="margin-top:4px"><span style="width:' + f.p + '%"></span></span>' : '')) + '</span>' +
          '<button type="button" class="ui-btn ui-btn--icon" data-rm="' + i + '" aria-label="Retirer"><span class="mi">close</span></button></li>';
      }).join('');
    }
    function add(fl) {
      Array.prototype.forEach.call(fl, function (file) {
        if (files.length >= max) return UIKit.toast(max + ' fichiers maximum.');
        var item = { file: file, p: 0, error: file.size > maxSize ? 'Trop volumineux (max. ' + fmtSize(maxSize) + ')' : '' };
        files.push(item);
        if (!item.error) var t = setInterval(function () { item.p = Math.min(100, item.p + 20 + Math.round(Math.random() * 25)); render(); if (item.p >= 100) clearInterval(t); }, 250);
      });
      render();
    }
    input.addEventListener('change', function () { add(input.files); input.value = ''; });
    zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('over'); });
    zone.addEventListener('dragleave', function () { zone.classList.remove('over'); });
    zone.addEventListener('drop', function (e) { e.preventDefault(); zone.classList.remove('over'); add(e.dataTransfer.files); });
    zone.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
    list.addEventListener('click', function (e) { var b = e.target.closest('[data-rm]'); if (b) { files.splice(+b.dataset.rm, 1); render(); } });
    el.getFiles = function () { return files; };
  }

  /* Écran de résultat */
  function result(o) {
    return '<div class="result"><span class="r-ic tone-' + (o.tone || 'success') + '"><span class="mi">' + (o.icon || 'check_circle') + '</span></span><h2>' + o.title + '</h2>' +
      '<p class="result-text">' + (o.text || '') + '</p>' + (o.actions ? '<div class="ui-row" style="justify-content:center">' + o.actions + '</div>' : '') + '</div>';
  }

  /* QR code SVG (nécessite js/lib/qr-code.js) */
  function qr(value, size, caption) {
    var m = UIKitUtils.encodeQr(value, 'M'), n = m.length + 8;
    return '<figure style="margin:0;display:inline-flex;flex-direction:column;align-items:center;gap:6px"><svg width="' + (size || 128) + '" height="' + (size || 128) + '" viewBox="0 0 ' + n + ' ' + n +
      '" role="img" aria-label="QR code : ' + value + '" style="background:#fff;border-radius:8px"><path fill="#000" d="' + UIKitUtils.qrSvgPath(m) + '"/></svg>' +
      (caption ? '<figcaption class="help">' + caption + '</figcaption>' : '') + '</figure>';
  }

  /* Calendrier mensuel : calendar(el, { selected: Date, min: Date, filter: fn(Date)->bool, onSelect: fn(Date) }) */
  function calendar(el, o) {
    var view = new Date(o.selected.getFullYear(), o.selected.getMonth(), 1);
    var fmtM = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
    function same(a, b) { return a && b && a.toDateString() === b.toDateString(); }
    function render() {
      var first = (view.getDay() + 6) % 7, days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate(), cells = '';
      for (var i = 0; i < first; i++) cells += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var dt = new Date(view.getFullYear(), view.getMonth(), d);
        var off = (o.min && dt < new Date(o.min.getFullYear(), o.min.getMonth(), o.min.getDate())) || (o.filter && !o.filter(dt));
        cells += '<button type="button" data-d="' + d + '"' + (off ? ' disabled' : '') + ' class="' + (same(dt, o.selected) ? 'on ' : '') + (same(dt, o.today || new Date()) ? 'today' : '') + '" aria-label="' + dt.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) + '">' + d + '</button>';
      }
      el.innerHTML = '<div class="cal"><div class="cal__head"><button type="button" class="ui-btn ui-btn--icon" data-m="-1" aria-label="Mois précédent"><span class="mi">chevron_left</span></button>' +
        '<strong>' + fmtM.format(view) + '</strong><button type="button" class="ui-btn ui-btn--icon" data-m="1" aria-label="Mois suivant"><span class="mi">chevron_right</span></button></div>' +
        '<div class="cal__grid">' + ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(function (x) { return '<abbr>' + x + '</abbr>'; }).join('') + cells + '</div></div>';
    }
    el.addEventListener('click', function (e) {
      var m = e.target.closest('[data-m]'), d = e.target.closest('[data-d]');
      if (m) { view.setMonth(view.getMonth() + +m.dataset.m); render(); }
      if (d) { o.selected = new Date(view.getFullYear(), view.getMonth(), +d.dataset.d); render(); o.onSelect && o.onSelect(o.selected); }
    });
    render();
  }

  /* Montant entier en toutes lettres (français : vingt/cent au pluriel, « et un ») */
  function amountInWords(value) {
    var n = Math.floor(Math.abs(value));
    if (n === 0) return 'Zéro';
    var units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
    var tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    function b100(x, last) {
      if (x < 17) return units[x];
      if (x < 20) return 'dix-' + units[x - 10];
      var t = Math.floor(x / 10), u = x % 10;
      if (t === 7 || t === 9) return tens[t] + (u === 1 && t === 7 ? '-et-' : '-') + b100(10 + u);
      if (u === 0) return tens[t] + (t === 8 && last ? 's' : '');
      return tens[t] + (u === 1 && t !== 8 ? '-et-' : '-') + units[u];
    }
    function b1000(x, last) {
      var h = Math.floor(x / 100), r = x % 100;
      var hs = h === 0 ? '' : h === 1 ? 'cent' : units[h] + '-cent' + (r === 0 && last ? 's' : '');
      return [hs, r ? b100(r, last) : ''].filter(Boolean).join('-');
    }
    var parts = [], rest = n;
    [[1e9, 'milliard', 'milliards'], [1e6, 'million', 'millions'], [1e3, 'mille', 'mille']].forEach(function (sc) {
      var q = Math.floor(rest / sc[0]); if (!q) return; rest %= sc[0];
      parts.push(sc[0] === 1e3 ? (q === 1 ? 'mille' : b1000(q, false) + '-mille') : b1000(q, true) + ' ' + (q > 1 ? sc[2] : sc[1]));
    });
    if (rest) parts.push(b1000(rest, true));
    var s = parts.join(' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* Pavé de signature : signature(el, { height, onChange(dataUrl|null) }) */
  function signature(el, o) {
    o = o || {};
    el.innerHTML = '<div class="sig"><canvas aria-label="Zone de signature" role="img"></canvas><span class="sig__hint">Signez ici avec la souris ou le doigt</span>' +
      '<button type="button" class="ui-btn ui-btn--text ui-btn--sm sig__clear"><span class="mi">ink_eraser</span>Effacer</button></div>';
    var c = el.querySelector('canvas'), ctx = c.getContext('2d'), drawing = false, has = false, hint = el.querySelector('.sig__hint');
    function size() { var r = c.getBoundingClientRect(), d = devicePixelRatio || 1; c.width = r.width * d; c.height = r.height * d; ctx.scale(d, d); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; }
    c.style.height = o.height || '160px'; size();
    function pos(e) { var r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    c.addEventListener('pointerdown', function (e) { drawing = true; c.setPointerCapture(e.pointerId); ctx.strokeStyle = getComputedStyle(el).color; var p = pos(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]); });
    c.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pos(e); ctx.lineTo(p[0], p[1]); ctx.stroke(); if (!has) { has = true; hint.hidden = true; } });
    c.addEventListener('pointerup', function () { if (drawing && has && o.onChange) o.onChange(c.toDataURL()); drawing = false; });
    el.querySelector('.sig__clear').addEventListener('click', function () { ctx.clearRect(0, 0, c.width, c.height); has = false; hint.hidden = false; o.onChange && o.onChange(null); });
  }

  /* Compteur animé : <span data-count="4250000" data-format="compact|number|percent" data-decimals="2"></span> */
  function fmtNum(v, f, d) {
    if (f === 'compact') return new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: d }).format(v);
    if (f === 'percent') return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: d, minimumFractionDigits: d }).format(v) + ' %';
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: d, minimumFractionDigits: d }).format(v);
  }
  function counters(root) {
    (root || document).querySelectorAll('[data-count]').forEach(function (el) {
      var to = +el.dataset.count, f = el.dataset.format || 'number', d = +(el.dataset.decimals || 0), t0 = performance.now(), dur = 900;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmtNum(to, f, d); return; }
      (function step(t) { var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmtNum(to * e, f, d); if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }

  /* Menu contextuel : contextMenu(event, [{id,label,icon,shortcut,danger}|{divider:true}], onSelect(item)) */
  var ctx;
  function contextMenu(e, items, onSelect) {
    e.preventDefault(); if (ctx) ctx.remove();
    ctx = document.createElement('div'); ctx.className = 'ui-menu__panel ctx-menu'; ctx.setAttribute('role', 'menu');
    ctx.innerHTML = items.map(function (it, i) { return it.divider ? '<hr>' : '<button class="ui-menu__item' + (it.danger ? ' danger' : '') + '" role="menuitem" data-i="' + i + '"><span class="mi">' + (it.icon || '') + '</span>' + it.label + (it.shortcut ? '<span class="kbd" style="margin-left:auto">' + it.shortcut.toUpperCase() + '</span>' : '') + '</button>'; }).join('');
    document.body.appendChild(ctx);
    var x = Math.min(e.clientX, innerWidth - ctx.offsetWidth - 8), y = Math.min(e.clientY, innerHeight - ctx.offsetHeight - 8);
    ctx.style.left = x + 'px'; ctx.style.top = y + 'px';
    ctx.addEventListener('click', function (ev) { var b = ev.target.closest('[data-i]'); if (b) onSelect(items[+b.dataset.i]); close(); });
    var first = ctx.querySelector('button'); if (first) first.focus();
    function close() { if (ctx) { ctx.remove(); ctx = null; } document.removeEventListener('pointerdown', out, true); document.removeEventListener('keydown', key, true); }
    function out(ev) { if (ctx && !ctx.contains(ev.target)) close(); }
    function key(ev) { if (ev.key === 'Escape') close(); }
    setTimeout(function () { document.addEventListener('pointerdown', out, true); document.addEventListener('keydown', key, true); });
  }

  function fcfa(n) { return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' FCFA'; }

  window.ExW = { contextMenu: contextMenu, counters: counters, fmtNum: fmtNum, dropzone: dropzone, qr: qr, calendar: calendar, amountInWords: amountInWords, signature: signature, result: result, fmtSize: fmtSize, fileIcon: fileIcon, fcfa: fcfa,
    init: function (root) { (root || document).querySelectorAll('[data-dropzone]').forEach(dropzone); counters(root); } };
  document.addEventListener('DOMContentLoaded', function () { window.ExW.init(); });
})();
