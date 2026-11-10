/* ==========================================================================
   Champs de formulaire enrichis, sans dépendance. Exposé sous window.UIForms.
     mask(input, pattern)                 — masque de saisie (0 chiffre, A lettre, * alphanumérique)
     select(el, o)                        — sélecteur recherchable (icônes, couleurs, descriptions, clavier)
     multiSelect(el, o)                   — sélection multiple dans un menu à cases
     autocomplete(el, o)                  — recherche asynchrone (debounce, spinner, effacer, aucun résultat)
     filterDropdown(el, o)                — filtre popover recherchable (barres de recherche des listes)
     datePicker(el, o)                    — champ date + calendrier popover
     crudDialog(o)                        — formulaire générique piloté par configuration, en modale
   Les composants émettent l'évènement « change » sur l'élément hôte (detail = valeur).
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function emit(el, v) { el.value = v; el.dispatchEvent(new CustomEvent('change', { detail: v, bubbles: true })); }

  /* ── Popover commun ─────────────────────────────────────── */
  var openPop = null;
  function popover(anchor, html, onClose) {
    close();
    var p = document.createElement('div'); p.className = 'uf-pop'; p.innerHTML = html;
    document.body.appendChild(p);
    function place() { var r = anchor.getBoundingClientRect(), h = p.offsetHeight, below = innerHeight - r.bottom > h + 8 || r.top < h + 8;
      p.style.minWidth = Math.max(r.width, 220) + 'px'; p.style.left = Math.max(8, Math.min(r.left, innerWidth - p.offsetWidth - 8)) + 'px'; p.style.top = (below ? r.bottom + 4 : r.top - h - 4) + 'px'; }
    place();
    openPop = { el: p, anchor: anchor, onClose: onClose, place: place };
    return p;
  }
  function close() { if (!openPop) return; var o = openPop; openPop = null; o.el.remove(); if (o.onClose) o.onClose(); }
  document.addEventListener('mousedown', function (e) { if (openPop && !openPop.el.contains(e.target) && !openPop.anchor.contains(e.target)) close(); });
  window.addEventListener('resize', close); document.addEventListener('scroll', function (e) { if (openPop && !openPop.el.contains(e.target)) openPop.place(); }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && openPop) { var a = openPop.anchor; close(); a.focus && a.focus(); } });

  /* ── Masque de saisie ───────────────────────────────────── */
  function applyMask(v, pattern) {
    var raw = v.replace(/[^0-9A-Za-z]/g, ''), out = '', i = 0;
    for (var k = 0; k < pattern.length && i < raw.length; k++) {
      var p = pattern[k], c = raw[i];
      if (p === '0') { if (/\d/.test(c)) { out += c; i++; } else { i++; k--; } }
      else if (p === 'A') { if (/[A-Za-z]/.test(c)) { out += c.toUpperCase(); i++; } else { i++; k--; } }
      else if (p === '*') { out += c.toUpperCase(); i++; }
      else { out += p; if (c === p) i++; }
    }
    return out;
  }
  function mask(input, pattern) {
    pattern = pattern || input.dataset.mask;
    input.maxLength = pattern.length;
    input.addEventListener('input', function () { input.value = applyMask(input.value, pattern); });
  }

  /* ── Sélecteur recherchable ─────────────────────────────── */
  function optHtml(o, on, i) { return '<button type="button" class="uf-opt' + (on ? ' on' : '') + '" data-i="' + i + '" role="option" aria-selected="' + on + '">' + (o.icon ? '<span class="mi" style="' + (o.color ? 'color:' + o.color : '') + '">' + o.icon + '</span>' : o.color ? '<i class="uf-dot" style="background:' + o.color + '"></i>' : '') +
    '<span class="uf-opt-t"><span>' + esc(o.label) + '</span>' + (o.description ? '<small>' + esc(o.description) + '</small>' : '') + '</span>' + (o.count != null ? '<span class="uf-count">' + o.count + '</span>' : '') + (on ? '<span class="mi uf-check">check</span>' : '') + '</button>'; }

  function select(el, o) {
    o = Object.assign({ placeholder: 'Sélectionner…', options: [], value: null, searchable: true }, o);
    var value = o.value, opts = o.allowNull ? [{ value: null, label: o.nullLabel || '— Aucun —' }].concat(o.options) : o.options;
    el.classList.add('uf-select'); el.value = value;
    function cur() { return o.options.find(function (x) { return x.value === value; }); }
    function draw() { var c = cur();
      el.innerHTML = '<button type="button" class="field-box uf-trigger' + (o.invalid ? ' invalid' : '') + '"' + (o.disabled ? ' disabled' : '') + ' aria-haspopup="listbox">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') +
        (c && c.icon ? '<span class="mi" style="color:' + (c.color || 'inherit') + '">' + c.icon + '</span>' : '') + '<span class="uf-val' + (c ? '' : ' ph') + '">' + esc(c ? c.label : o.placeholder) + '</span>' +
        (o.clearable && c && !o.disabled ? '<span class="mi uf-clear" role="button" aria-label="Effacer">close</span>' : '') + '<span class="mi uf-caret">expand_more</span></button>';
    }
    function open() {
      if (o.disabled) return;
      var q = '', act = Math.max(0, opts.findIndex(function (x) { return x.value === value; })), list;
      var p = popover(el, (o.searchable && opts.length > 5 ? '<label class="uf-search"><span class="mi">search</span><input placeholder="Rechercher…" aria-label="Rechercher"></label>' : '') + '<div class="uf-list" role="listbox"></div>', function () { el.querySelector('.uf-trigger').setAttribute('aria-expanded', 'false'); });
      el.querySelector('.uf-trigger').setAttribute('aria-expanded', 'true');
      list = p.querySelector('.uf-list');
      function vis() { return opts.filter(function (x) { return !q || norm(x.label).indexOf(norm(q)) >= 0; }); }
      function render() { var v = vis(); act = Math.min(act, v.length - 1); list.innerHTML = v.length ? v.map(function (x, i) { return optHtml(x, x.value === value, i).replace('class="uf-opt', 'class="uf-opt' + (i === act ? ' act' : '')); }).join('') : '<div class="uf-empty">Aucun résultat</div>'; var a = list.querySelector('.act'); if (a) a.scrollIntoView({ block: 'nearest' }); }
      function pick(x) { value = x.value; draw(); close(); emit(el, value); el.querySelector('.uf-trigger').focus(); }
      list.addEventListener('click', function (e) { var b = e.target.closest('.uf-opt'); if (b) pick(vis()[+b.dataset.i]); });
      var s = p.querySelector('input'); if (s) { s.addEventListener('input', function () { q = s.value; act = 0; render(); }); s.focus(); }
      (s || p).addEventListener('keydown', function (e) { var v = vis(); if (e.key === 'ArrowDown') { act = Math.min(v.length - 1, act + 1); render(); e.preventDefault(); } else if (e.key === 'ArrowUp') { act = Math.max(0, act - 1); render(); e.preventDefault(); } else if (e.key === 'Enter' && v[act]) { e.preventDefault(); pick(v[act]); } });
      if (!s) { p.tabIndex = -1; p.focus(); }
      render();
    }
    el.addEventListener('click', function (e) {
      if (e.target.closest('.uf-clear')) { e.stopPropagation(); value = null; draw(); emit(el, null); return; }
      if (e.target.closest('.uf-trigger')) openPop && openPop.anchor === el ? close() : open();
    });
    el.addEventListener('keydown', function (e) { if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && e.target.closest('.uf-trigger') && !openPop) { e.preventDefault(); open(); } });
    draw();
    return { get: function () { return value; }, set: function (v) { value = v; draw(); }, setInvalid: function (b) { o.invalid = b; draw(); } };
  }

  /* ── Sélection multiple ─────────────────────────────────── */
  function multiSelect(el, o) {
    o = Object.assign({ placeholder: 'Choisir…', options: [], value: [] }, o);
    var value = o.value.slice(); el.classList.add('uf-select'); el.value = value;
    function draw() { var labels = o.options.filter(function (x) { return value.indexOf(x.value) >= 0; }).map(function (x) { return x.label; });
      el.innerHTML = '<button type="button" class="field-box uf-trigger"' + (o.disabled ? ' disabled' : '') + ' aria-haspopup="listbox">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + '<span class="uf-val' + (labels.length ? '' : ' ph') + '">' + esc(labels.length ? labels.join(', ') : o.placeholder) + '</span><span class="mi uf-caret">expand_more</span></button>'; }
    el.addEventListener('click', function (e) {
      if (!e.target.closest('.uf-trigger')) return; if (openPop && openPop.anchor === el) return close();
      var p = popover(el, '<div class="uf-list" role="listbox" aria-multiselectable="true"></div>');
      function render() { p.firstChild.innerHTML = o.options.map(function (x, i) { var on = value.indexOf(x.value) >= 0; return '<button type="button" class="uf-opt' + (on ? ' on' : '') + '" data-i="' + i + '"><span class="uf-cb' + (on ? ' on' : '') + '"></span><span class="uf-opt-t"><span>' + esc(x.label) + '</span></span></button>'; }).join(''); }
      p.addEventListener('click', function (ev) { var b = ev.target.closest('.uf-opt'); if (!b) return; var v = o.options[+b.dataset.i].value, k = value.indexOf(v); k >= 0 ? value.splice(k, 1) : value.push(v); render(); draw(); emit(el, value.slice()); });
      render();
    });
    draw();
    return { get: function () { return value.slice(); } };
  }

  /* ── Autocomplétion asynchrone ──────────────────────────── */
  function autocomplete(el, o) {
    o = Object.assign({ placeholder: 'Rechercher…', icon: 'search', debounce: 250, minLength: 1, displayFn: function (x) { return x == null ? '' : String(x.label || x); } }, o);
    el.classList.add('uf-auto');
    el.innerHTML = '<div class="field-box">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + '<input autocomplete="off" placeholder="' + esc(o.placeholder) + '" aria-autocomplete="list"><span class="ui-spinner uf-spin" hidden></span><button type="button" class="ui-btn ui-btn--icon uf-x" hidden aria-label="Effacer"><span class="mi">close</span></button></div>';
    var input = el.querySelector('input'), spin = el.querySelector('.uf-spin'), x = el.querySelector('.uf-x'), timer, seq = 0, items = [], act = -1;
    function show() {
      var p = openPop && openPop.anchor === el ? openPop.el : popover(el, '<div class="uf-list" role="listbox"></div>');
      p.firstChild.innerHTML = items.length ? items.map(function (it, i) { return '<button type="button" class="uf-opt' + (i === act ? ' act' : '') + '" data-i="' + i + '"><span class="uf-opt-t"><span>' + esc(o.displayFn(it)) + '</span>' + (o.subFn ? '<small>' + esc(o.subFn(it)) + '</small>' : '') + '</span></button>'; }).join('') : '<div class="uf-empty"><span class="mi">search_off</span>Aucun résultat pour « ' + esc(input.value) + ' »</div>';
      p.onclick = function (e) { var b = e.target.closest('.uf-opt'); if (b) pick(items[+b.dataset.i]); };
    }
    function pick(it) { input.value = o.displayFn(it); close(); x.hidden = false; emit(el, it); }
    input.addEventListener('input', function () {
      x.hidden = !input.value; clearTimeout(timer); var q = input.value.trim();
      if (q.length < o.minLength) { close(); return; }
      timer = setTimeout(function () { var my = ++seq; spin.hidden = false;
        Promise.resolve(o.searchFn(q)).then(function (res) { if (my !== seq) return; spin.hidden = true; items = res || []; act = -1; show(); }); }, o.debounce);
    });
    input.addEventListener('keydown', function (e) { if (!openPop || openPop.anchor !== el) return; if (e.key === 'ArrowDown') { act = Math.min(items.length - 1, act + 1); show(); e.preventDefault(); } else if (e.key === 'ArrowUp') { act = Math.max(0, act - 1); show(); e.preventDefault(); } else if (e.key === 'Enter' && items[act]) { e.preventDefault(); pick(items[act]); } });
    x.addEventListener('click', function () { input.value = ''; x.hidden = true; close(); emit(el, null); input.focus(); });
  }

  /* ── Filtre popover (barres de recherche) ───────────────── */
  function filterDropdown(el, o) {
    o = Object.assign({ options: [], value: '', labelPrefix: '' }, o);
    var value = o.value; el.classList.add('uf-filter'); if (o.standalone) el.classList.add('standalone');
    function draw() { var c = o.options.find(function (x) { return x.value === value; }) || o.options[0];
      el.innerHTML = '<button type="button" class="uf-filter-btn' + (value ? ' active' : '') + '">' + (c && c.icon ? '<span class="mi" style="' + (c.color ? 'color:' + c.color : '') + '">' + c.icon + '</span>' : '') + '<span>' + esc(o.labelPrefix ? o.labelPrefix + ' : ' : '') + '<b>' + esc(c ? c.label : '') + '</b></span><span class="mi">expand_more</span></button>'; }
    el.addEventListener('click', function (e) {
      if (!e.target.closest('.uf-filter-btn')) return; if (openPop && openPop.anchor === el) return close();
      var q = '', p = popover(el, (o.options.length > 6 ? '<label class="uf-search"><span class="mi">search</span><input placeholder="Filtrer…" aria-label="Filtrer"></label>' : '') + '<div class="uf-list"></div>');
      function render() { var v = o.options.filter(function (x) { return !q || norm(x.label).indexOf(norm(q)) >= 0; }); p.querySelector('.uf-list').innerHTML = v.map(function (x) { return optHtml(x, x.value === value, o.options.indexOf(x)); }).join('') || '<div class="uf-empty">Aucun résultat</div>'; }
      p.addEventListener('click', function (ev) { var b = ev.target.closest('.uf-opt'); if (!b) return; value = o.options[+b.dataset.i].value; draw(); close(); emit(el, value); });
      var s = p.querySelector('input'); if (s) { s.addEventListener('input', function () { q = s.value; render(); }); s.focus(); }
      render();
    });
    draw();
  }

  /* ── Sélecteur de date ──────────────────────────────────── */
  var fmt = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  function parseFr(s) { var m = String(s).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
  function datePicker(el, o) {
    o = Object.assign({ placeholder: 'JJ/MM/AAAA', icon: 'event' }, o);
    var value = o.value || null; el.classList.add('uf-date');
    el.innerHTML = '<div class="field-box">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + '<input placeholder="' + o.placeholder + '" inputmode="numeric" value="' + (value ? fmt.format(value) : '') + '"' + (o.disabled ? ' disabled' : '') + '><button type="button" class="ui-btn ui-btn--icon" aria-label="Ouvrir le calendrier"' + (o.disabled ? ' disabled' : '') + '><span class="mi">calendar_month</span></button></div>';
    var input = el.querySelector('input'); mask(input, '00/00/0000');
    input.addEventListener('change', function () { var d = parseFr(input.value); if (d) { value = d; emit(el, d); } });
    el.querySelector('button').addEventListener('click', function () {
      if (openPop && openPop.anchor === el) return close();
      var p = popover(el, '<div class="uf-cal"></div>');
      ExW.calendar(p.firstChild, { selected: value || o.start || new Date(), min: o.min, filter: o.max ? function (d) { return d <= o.max; } : null, onSelect: function (d) { value = d; input.value = fmt.format(d); close(); emit(el, d); } });
    });
    return { get: function () { return value; } };
  }

  /* ── Formulaire en modale piloté par configuration ──────── */
  function crudDialog(o) {
    var view = o.mode === 'view', data = Object.assign({}, o.data || {}), widgets = {};
    var dlg = document.createElement('dialog'); dlg.className = 'ui-dialog uf-crud';
    dlg.innerHTML = '<form novalidate><div class="uf-crud-head"><div><h3>' + esc(o.title) + '</h3>' + (o.subtitle ? '<p>' + esc(o.subtitle) + '</p>' : '') + '</div><button type="button" class="ui-btn ui-btn--icon" data-x aria-label="Fermer"><span class="mi">close</span></button></div>' +
      '<div class="uf-crud-body">' + o.fields.map(function (f) { var wide = f.type === 'textarea' || f.type === 'multiselect';
        return '<div class="ui-field' + (wide ? ' uf-wide' : '') + '" data-k="' + f.key + '"><label class="ui-label">' + esc(f.label) + (f.required ? ' <span class="req">*</span>' : '') + '</label><div class="uf-slot"></div><small class="ui-hint uf-err" hidden>' + esc(f.label) + ' est requis</small></div>'; }).join('') + '</div>' +
      '<div class="ui-dialog__actions">' + (view ? '<button type="button" class="ui-btn" data-x>Fermer</button>' : '<button type="button" class="ui-btn ui-btn--text" data-x>Annuler</button><button type="submit" class="ui-btn"><span class="mi">save</span>' + (o.mode === 'create' ? 'Créer' : 'Enregistrer') + '</button>') + '</div></form>';
    document.body.appendChild(dlg);
    o.fields.forEach(function (f) {
      var slot = dlg.querySelector('[data-k="' + f.key + '"] .uf-slot'), v = data[f.key];
      if (view) { var shown = f.options ? [].concat(v || []).map(function (x) { var op = f.options.find(function (y) { return y.value === x; }); return op ? op.label : x; }).join(', ') : f.type === 'date' && v ? fmt.format(new Date(v)) : f.type === 'checkbox' ? (v ? 'Oui' : 'Non') : v; slot.innerHTML = '<div class="uf-ro">' + esc(shown == null || shown === '' ? '—' : shown) + '</div>'; return; }
      if (f.type === 'select') widgets[f.key] = select(slot, { options: f.options, value: v == null ? null : v, icon: f.icon });
      else if (f.type === 'multiselect') widgets[f.key] = multiSelect(slot, { options: f.options, value: v || [] });
      else if (f.type === 'autocomplete') { autocomplete(slot, { searchFn: function (q) { return f.options.filter(function (x) { return norm(x.label).indexOf(norm(q)) >= 0; }); }, icon: 'person_search' }); slot.addEventListener('change', function (e) { data[f.key] = e.detail && e.detail.value; }); var cur = (f.options || []).find(function (x) { return x.value === v; }); if (cur) slot.querySelector('input').value = cur.label; }
      else if (f.type === 'date') widgets[f.key] = datePicker(slot, { value: v ? new Date(v) : null });
      else if (f.type === 'checkbox') slot.innerHTML = '<label class="ui-check"><input type="checkbox" name="' + f.key + '"' + (v ? ' checked' : '') + '>' + esc(f.placeholder || f.label) + '</label>';
      else if (f.type === 'textarea') slot.innerHTML = '<div class="field-box textarea-box"><textarea name="' + f.key + '" rows="3" placeholder="' + esc(f.placeholder || '') + '">' + esc(v || '') + '</textarea></div>';
      else slot.innerHTML = '<div class="field-box">' + (f.icon ? '<span class="mi">' + f.icon + '</span>' : '') + '<input name="' + f.key + '" type="' + (f.type || 'text') + '" value="' + esc(v == null ? '' : v) + '" placeholder="' + esc(f.placeholder || '') + '"></div>';
    });
    return new Promise(function (resolve) {
      dlg.addEventListener('click', function (e) { if (e.target.closest('[data-x]')) dlg.close(); });
      dlg.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); var ok = true, out = Object.assign({}, data);
        o.fields.forEach(function (f) { var box = dlg.querySelector('[data-k="' + f.key + '"]'), v;
          if (widgets[f.key]) v = widgets[f.key].get(); else if (f.type === 'checkbox') v = box.querySelector('input').checked; else if (f.type === 'autocomplete') v = data[f.key]; else { var i = box.querySelector('input,textarea'); v = i ? i.value : null; }
          out[f.key] = v; var bad = f.required && (v == null || v === '' || (Array.isArray(v) && !v.length)); box.classList.toggle('invalid', bad); box.querySelector('.uf-err').hidden = !bad; if (bad) ok = false; });
        if (ok) { dlg.returnValue = 'ok'; dlg._out = out; dlg.close(); }
      });
      dlg.addEventListener('close', function () { close(); resolve(dlg.returnValue === 'ok' ? dlg._out : null); dlg.remove(); });
      dlg.showModal();
    });
  }

  window.UIForms = { mask: mask, applyMask: applyMask, select: select, multiSelect: multiSelect, autocomplete: autocomplete, filterDropdown: filterDropdown, datePicker: datePicker, crudDialog: crudDialog, close: close, parseFr: parseFr };
  document.querySelectorAll('input[data-mask]').forEach(function (i) { mask(i); });
})();
