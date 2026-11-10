/* ==========================================================================
   Planification générique (JS natif) : kanban, Gantt, calendrier mensuel,
   agenda jour / semaine / mois, grille de notes, vue groupée.
   Modèle neutre PlanningItem : { id, title, ref, description, status, group, start, end, due,
     done, progress, tone, color, badge:{label,tone}, assignee, tags, fields }
   Options communes : searchable, filters:[{key,label,options:[{value,label}],value(item)}], lateToggle, onItemClick(item).
   Planning.today : date de référence (« aujourd'hui ») — 17 octobre 2026 par défaut, comme le kit.
   ========================================================================== */
(function () {
  'use strict';
  var P = { today: new Date(2026, 9, 17, 11, 0) };
  var MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  var WD = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  var DAY = 86400000;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function toDate(v) { if (!v) return null; var d = v instanceof Date ? v : new Date(v); return isNaN(d) ? null : d; }
  function sod(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function sow(d) { var x = sod(d); return addDays(x, -((x.getDay() + 6) % 7)); }
  function same(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function isLate(i) { var d = toDate(i.due); return !i.done && !!d && d < P.today; }
  function toneVar(t) { return t && t !== 'neutral' ? 'var(--' + t + ')' : 'var(--text-muted)'; }
  function color(i) { return i.color || (i.tone ? toneVar(i.tone) : i.done ? toneVar('success') : isLate(i) ? toneVar('error') : toneVar('primary')); }
  function initials(n) { return n ? n.split(/\s+/).filter(Boolean).map(function (p) { return p[0]; }).slice(0, 2).join('').toUpperCase() : '?'; }
  function anchor(i) { return toDate(i.start) || toDate(i.due); }
  function ddmm(d) { d = toDate(d); return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2); }
  function hm(d) { d = toDate(d); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  function apply(items, filters, st) {
    var q = st.search.trim().toLowerCase();
    return items.filter(function (it) {
      if (q && [it.title, it.ref, it.description, it.assignee].concat(it.tags || []).filter(Boolean).join(' ').toLowerCase().indexOf(q) < 0) return false;
      for (var k = 0; k < filters.length; k++) {
        var f = filters[k], v = st.values[f.key]; if (!v || v === 'all') continue;
        var raw = f.value ? f.value(it) : (it.fields && it.fields[f.key]) || it[f.key];
        if ([].concat(raw == null ? [] : raw).map(String).indexOf(v) < 0) return false;
      }
      return !(st.lateOnly && !isLate(it));
    });
  }

  /* ── Socle commun : barre d'outils + rendu ─────────────── */
  function base(el, o, renderBody, toolbarEnd) {
    o = Object.assign({ items: [], filters: [] }, o);
    var st = { search: '', values: {}, lateOnly: false };
    var api = { o: o, st: st, visible: function () { return apply(o.items, o.filters, st); }, render: render, setItems: function (i) { o.items = i; render(); } };
    function toolbar() {
      var show = o.searchable || o.filters.length || o.lateToggle || toolbarEnd;
      if (!show) return '';
      var late = o.items.filter(isLate).length, active = (st.search ? 1 : 0) + (st.lateOnly ? 1 : 0) + Object.keys(st.values).filter(function (k) { return st.values[k] && st.values[k] !== 'all'; }).length;
      return '<div class="pl-toolbar">' +
        (o.searchable ? '<label class="pl-search"><span class="mi">search</span><input data-pl="search" placeholder="Rechercher…" value="' + esc(st.search) + '" aria-label="Rechercher"></label>' : '') +
        o.filters.map(function (f) {
          var v = st.values[f.key] || 'all';
          return '<label class="pl-select"><span>' + esc(f.label) + '</span><select data-pl-f="' + f.key + '"><option value="all">' + (f.allLabel || 'Tous') + '</option>' +
            f.options.map(function (op) { return '<option value="' + esc(op.value) + '"' + (op.value === v ? ' selected' : '') + '>' + esc(op.label) + '</option>'; }).join('') + '</select></label>';
        }).join('') +
        (o.lateToggle ? '<button type="button" class="pl-chip' + (st.lateOnly ? ' active' : '') + '" data-pl="late"><span class="mi">schedule</span> En retard' + (late ? '<em>' + late + '</em>' : '') + '</button>' : '') +
        (active ? '<button type="button" class="pl-reset" data-pl="reset" title="Réinitialiser les filtres" aria-label="Réinitialiser les filtres"><span class="mi">filter_alt_off</span></button>' : '') +
        '<span class="pl-spacer"></span>' + (toolbarEnd ? toolbarEnd(api) : '') + '</div>';
    }
    function render() {
      var focus = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.pl === 'search' && el.contains(document.activeElement), pos = focus && document.activeElement.selectionStart;
      el.innerHTML = '<div class="pl-stack">' + toolbar() + renderBody(api) + '</div>';
      if (focus) { var i = el.querySelector('[data-pl=search]'); i.focus(); i.setSelectionRange(pos, pos); }
      if (api.after) api.after();
    }
    el.addEventListener('input', function (e) { if (e.target.dataset.pl === 'search') { st.search = e.target.value; render(); } });
    el.addEventListener('change', function (e) { if (e.target.dataset.plF) { st.values[e.target.dataset.plF] = e.target.value; render(); } });
    el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-pl],[data-item]');
      if (!t) return;
      if (t.dataset.pl === 'late') { st.lateOnly = !st.lateOnly; render(); }
      else if (t.dataset.pl === 'reset') { st.search = ''; st.values = {}; st.lateOnly = false; render(); }
      else if (t.dataset.item && o.onItemClick) { var it = o.items.find(function (x) { return x.id === t.dataset.item; }); if (it) o.onItemClick(it); }
    });
    return api;
  }

  /* ── Kanban ─────────────────────────────────────────────── */
  function kanban(el, o) {
    var api = base(el, o, function (a) {
      var vis = a.visible().map(function (i) { return i.id; });
      return '<div class="kb-board">' + a.o.columns.map(function (c) {
        var all = a.o.items.filter(function (i) { return i.status === c.key; }), shown = all.filter(function (i) { return vis.indexOf(i.id) >= 0; });
        return '<div class="kb-col"><div class="kb-col-head"><span class="kb-dot" style="background:' + (c.color || 'var(--text-muted)') + '"></span><span class="kb-col-name">' + esc(c.label) + '</span>' +
          '<em class="pl-count' + (a.o.wipLimit && all.length > a.o.wipLimit ? ' over' : '') + '">' + all.length + (a.o.wipLimit ? '/' + a.o.wipLimit : '') + '</em></div>' +
          '<div class="kb-col-body" data-col="' + c.key + '">' + (shown.length ? shown.map(function (it) {
            return '<div class="kb-card' + (it.done ? ' done' : '') + (a.o.readonly ? ' readonly' : '') + '" draggable="' + !a.o.readonly + '" data-item="' + it.id + '" style="--tone:' + color(it) + '" tabindex="0">' +
              '<div class="kb-card-top">' + (it.ref ? '<span class="kb-ref">' + esc(it.ref) + '</span>' : '<span></span>') + (it.assignee ? '<span class="pl-avatar" title="' + esc(it.assignee) + '">' + initials(it.assignee) + '</span>' : '') + '</div>' +
              '<span class="kb-title">' + esc(it.title) + '</span>' +
              (it.badge || it.due || (it.tags && it.tags.length) ? '<div class="kb-meta">' + (it.badge ? '<span class="pl-pill" style="--tone:' + toneVar(it.badge.tone) + '">' + esc(it.badge.label) + '</span>' : '') +
                (it.tags || []).map(function (t) { return '<span class="pl-pill" style="--tone:var(--text-muted)">' + esc(t) + '</span>'; }).join('') +
                (it.due ? '<span class="pl-due' + (isLate(it) ? ' late' : '') + '"><span class="mi">event</span>' + ddmm(it.due) + '</span>' : '') + '</div>' : '') +
              (it.progress ? '<div class="pl-progress"><div style="width:' + it.progress + '%"></div></div>' : '') + '</div>';
          }).join('') : '<div class="pl-empty">' + (a.o.emptyLabel || 'Déposez une carte ici') + '</div>') + '</div></div>';
      }).join('') + '</div>';
    });
    // Glisser-déposer natif (HTML5) entre colonnes et dans une colonne
    var drag = null;
    el.addEventListener('dragstart', function (e) { var c = e.target.closest('.kb-card'); if (!c) return; drag = c.dataset.item; c.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', drag); });
    el.addEventListener('dragend', function () { drag = null; el.querySelectorAll('.kb-ph').forEach(function (p) { p.remove(); }); el.querySelectorAll('.dragging').forEach(function (c) { c.classList.remove('dragging'); }); });
    el.addEventListener('dragover', function (e) {
      var body = e.target.closest('.kb-col-body'); if (!body || !drag) return; e.preventDefault();
      var ph = el.querySelector('.kb-ph') || Object.assign(document.createElement('div'), { className: 'kb-ph' });
      var after = Array.prototype.find.call(body.querySelectorAll('.kb-card:not(.dragging)'), function (c) { var r = c.getBoundingClientRect(); return e.clientY < r.top + r.height / 2; });
      after ? body.insertBefore(ph, after) : body.appendChild(ph);
      var empty = body.querySelector('.pl-empty'); if (empty) empty.hidden = true;
    });
    el.addEventListener('drop', function (e) {
      var body = e.target.closest('.kb-col-body'); if (!body || !drag) return; e.preventDefault();
      var ph = el.querySelector('.kb-ph'), next = ph && ph.nextElementSibling && ph.nextElementSibling.dataset.item;
      var list = api.o.items, item = list.find(function (i) { return i.id === drag; }), from = item.status, to = body.dataset.col;
      list.splice(list.indexOf(item), 1); item.status = to;
      if (to === 'done') { item.done = true; item.progress = 100; } else if (from === 'done') item.done = false;
      var at = next ? list.findIndex(function (i) { return i.id === next; }) : list.length; list.splice(at < 0 ? list.length : at, 0, item);
      drag = null; api.render(); if (from !== to && o.onMove) o.onMove({ item: item, from: from, to: to });
    });
    api.render(); return api;
  }

  /* ── Gantt ──────────────────────────────────────────────── */
  var DW = { day: 44, week: 20, month: 7 }, TRACK = 34, LABEL = 220;
  function gantt(el, o) {
    var zoom = o.zoom || 'day';
    var api = base(el, o, function (a) {
      var items = a.o.items, dw = DW[zoom], today = sod(P.today), min = today, max = addDays(today, 14);
      items.forEach(function (i) { var s = toDate(i.start), e = toDate(i.end) || toDate(i.due) || s; if (s && s < min) min = s; if (e && e > max) max = e; });
      var start = sow(addDays(min, -3)), end = addDays(sod(max), 8), n = Math.round((end - start) / DAY);
      var off = function (d) { return Math.round((sod(d) - start) / DAY); };
      var days = Array.from({ length: n }, function (_, i) { var d = addDays(start, i); return { d: d, we: d.getDay() === 0 || d.getDay() === 6, today: same(d, today), mon: d.getDay() === 1 }; });
      var months = []; days.forEach(function (x, i) { var l = MONTHS[x.d.getMonth()] + ' ' + x.d.getFullYear(), last = months[months.length - 1]; if (last && last.l === l) last.w += dw; else months.push({ l: l, left: i * dw, w: dw }); });
      var vis = a.visible().filter(function (i) { return toDate(i.start); }), ti = off(today);
      var hasGroups = (a.o.groups && a.o.groups.length) || vis.some(function (i) { return i.group; });
      var defs = a.o.groups && a.o.groups.length ? a.o.groups : hasGroups ? vis.map(function (i) { return i.group || '—'; }).filter(function (v, i, arr) { return arr.indexOf(v) === i; }).map(function (k) { return { key: k, label: k }; })
        : vis.map(function (i) { return { key: i.id, label: i.title, subtitle: i.ref }; });
      var rows = defs.map(function (g) {
        var own = vis.filter(function (i) { return hasGroups ? (i.group || '—') === g.key : i.id === g.key; }).sort(function (x, y) { return toDate(x.start) - toDate(y.start); });
        var ends = [];
        var bars = own.map(function (it) {
          var s = off(toDate(it.start)), e = Math.max(s, off(toDate(it.end) || toDate(it.due) || toDate(it.start)));
          var tr = ends.findIndex(function (x) { return x < s; }); if (tr < 0) { tr = ends.length; ends.push(e); } else ends[tr] = e;
          var late = isLate(it), due = toDate(it.due), di = due ? off(due) : null, ov = Math.max(e + 1, (di == null ? e : di) + 1);
          return { it: it, tr: tr, late: late, left: s * dw + 1, w: Math.max((e - s + 1) * dw - 2, 6), due: di != null ? (di + 1) * dw - 2 : null, ovL: ov * dw, ovW: late ? Math.max(0, (ti + 1 - ov) * dw) : 0 };
        });
        return { g: g, bars: bars, tracks: Math.max(1, ends.length), late: bars.filter(function (b) { return b.late; }).length, n: own.length, hasGroups: hasGroups };
      });
      a.todayLeft = (ti + 0.5) * dw;
      return '<div class="gt-scroller" style="--dw:' + dw + 'px"><div class="gt-table" style="width:' + (n * dw + LABEL) + 'px">' +
        '<div class="gt-head"><div class="gt-corner">' + esc(a.o.rowLabel || 'Ressource') + '</div><div class="gt-axis"><div class="gt-months">' + months.map(function (m) { return '<div class="gt-month" style="left:' + m.left + 'px;width:' + m.w + 'px"><span>' + m.l + '</span></div>'; }).join('') + '</div>' +
        '<div class="gt-days">' + days.map(function (x, i) {
          return '<div class="gt-day' + (x.we ? ' weekend' : '') + (x.today ? ' today' : '') + '" style="left:' + i * dw + 'px">' + (zoom === 'day' ? '<span class="dn">' + 'DLMMJVS'[x.d.getDay()] + '</span><span class="dd">' + x.d.getDate() + '</span>' : zoom === 'week' || x.mon ? '<span class="dd">' + x.d.getDate() + '</span>' : '') + '</div>';
        }).join('') + '</div></div></div><div class="gt-body">' + (rows.length ? rows.map(function (r) {
          return '<div class="gt-row" style="height:' + (r.tracks * TRACK + 12) + 'px"><div class="gt-label"><span class="gt-badge" style="--tone:' + (r.g.color || 'var(--primary)') + '">' + (r.g.icon ? '<span class="mi">' + r.g.icon + '</span>' : initials(r.g.label)) + '</span>' +
            '<div class="gt-label-text"><strong>' + esc(r.g.label) + '</strong><span>' + (r.g.subtitle || (r.hasGroups ? r.n + ' élément(s)' : '')) + (r.late ? '<em class="late">' + r.late + ' en retard</em>' : '') + '</span></div></div><div class="gt-lane">' +
            days.map(function (x, i) { return x.we || x.today ? '<div class="gt-shade' + (x.today ? ' today' : '') + '" style="left:' + i * dw + 'px"></div>' : ''; }).join('') +
            r.bars.map(function (b) {
              return (b.ovW ? '<div class="gt-overdue" data-item="' + b.it.id + '" style="left:' + b.ovL + 'px;width:' + b.ovW + 'px;top:' + (6 + b.tr * TRACK) + 'px" title="Échéance dépassée"></div>' : '') +
                '<div class="gt-bar' + (b.it.done ? ' done' : '') + '" data-item="' + b.it.id + '" style="--tone:' + color(b.it) + ';left:' + b.left + 'px;width:' + b.w + 'px;top:' + (6 + b.tr * TRACK) + 'px" title="' + esc(b.it.title + (b.it.assignee ? ' · ' + b.it.assignee : '')) + '">' +
                (b.it.progress ? '<div class="gt-fill" style="width:' + b.it.progress + '%"></div>' : '') + '<span class="gt-bar-text">' + (b.it.ref ? '<b>' + esc(b.it.ref) + '</b> ' : '') + esc(b.it.title) + '</span></div>' +
                (b.due != null ? '<div class="gt-due' + (b.late ? ' late' : '') + '" style="left:' + b.due + 'px;top:' + (3 + b.tr * TRACK) + 'px"></div>' : '');
            }).join('') + '</div></div>';
        }).join('') : '<div class="gt-empty">Aucun élément à afficher</div>') + '<div class="gt-today" style="left:' + (a.todayLeft + LABEL) + 'px"></div></div></div></div>';
    }, function () {
      return '<div class="gt-end">' + (o.showZoom !== false ? '<div class="pl-segmented">' + [['day', 'Jour'], ['week', 'Semaine'], ['month', 'Mois']].map(function (z) { return '<button type="button" class="' + (zoom === z[0] ? 'active' : '') + '" data-zoom="' + z[0] + '">' + z[1] + '</button>'; }).join('') + '</div>' : '') +
        '<button type="button" class="pl-text-btn" data-today><span class="mi">today</span> Aujourd\'hui</button></div>';
    });
    function toToday(b) { var s = el.querySelector('.gt-scroller'); if (s) s.scrollTo({ left: Math.max(0, api.todayLeft - s.clientWidth / 3), behavior: b || 'smooth' }); }
    api.after = function () { toToday('instant'); };
    el.addEventListener('click', function (e) { var z = e.target.closest('[data-zoom]'); if (z) { zoom = z.dataset.zoom; api.render(); } if (e.target.closest('[data-today]')) toToday(); });
    api.render(); return api;
  }

  /* ── Calendrier mensuel ─────────────────────────────────── */
  function month(el, o) {
    var cur = toDate(o.month) || new Date(P.today.getFullYear(), P.today.getMonth(), 1), sel = null, max = o.maxPerDay || 3;
    var api = base(el, o, function (a) {
      var vis = a.visible(), first = new Date(cur.getFullYear(), cur.getMonth(), 1), start = sow(first), last = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
      var weeks = Math.ceil((((first.getDay() + 6) % 7) + last.getDate()) / 7), selD = sel || P.today;
      var dayItems = vis.filter(function (it) { var x = anchor(it); return x && same(x, selD); });
      return '<div class="mc-layout' + (a.o.showDayPanel ? ' with-panel' : '') + '"><div class="mc-grid">' + WD.map(function (w) { return '<div class="mc-wd">' + w + '</div>'; }).join('') +
        Array.from({ length: weeks * 7 }, function (_, i) {
          var d = addDays(start, i), its = vis.filter(function (it) { var x = anchor(it); return x && same(x, d); });
          return '<div class="mc-cell' + (d.getMonth() !== cur.getMonth() ? ' out' : '') + (same(d, P.today) ? ' today' : '') + (sel && same(d, sel) ? ' selected' : '') + '" data-day="' + d.getTime() + '"><span class="mc-num">' + d.getDate() + '</span>' +
            its.slice(0, max).map(function (it) { return '<button type="button" class="mc-chip' + (it.done ? ' done' : '') + '" style="--tone:' + color(it) + '" data-item="' + it.id + '" title="' + esc(it.title) + '"><span class="mc-dot"></span>' + esc(it.title) + '</button>'; }).join('') +
            (its.length > max ? '<span class="mc-more">+' + (its.length - max) + ' autre(s)</span>' : '') + '</div>';
        }).join('') + '</div>' +
        (a.o.showDayPanel ? '<aside class="mc-panel"><strong>' + selD.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) + '</strong>' +
          (dayItems.length ? dayItems.map(function (it) { return '<button type="button" class="mc-row" style="--tone:' + color(it) + '" data-item="' + it.id + '"><span class="mc-dot"></span><span class="mc-row-text"><b>' + esc(it.title) + '</b><small>' + esc(it.ref || '') + (it.assignee ? ' · ' + esc(it.assignee) : '') + '</small></span></button>'; }).join('') : '<span class="mc-none">Rien de prévu</span>') + '</aside>' : '') + '</div>';
    }, o.showNavigation === false ? null : function () {
      return '<div class="mc-nav"><button type="button" class="pl-icon-btn" data-m="-1" aria-label="Mois précédent"><span class="mi">chevron_left</span></button><strong class="mc-title">' + MONTHS[cur.getMonth()] + ' ' + cur.getFullYear() + '</strong>' +
        '<button type="button" class="pl-icon-btn" data-m="1" aria-label="Mois suivant"><span class="mi">chevron_right</span></button><button type="button" class="pl-text-btn" data-m="0"><span class="mi">today</span> Aujourd\'hui</button></div>';
    });
    el.addEventListener('click', function (e) {
      var m = e.target.closest('[data-m]'), d = e.target.closest('[data-day]');
      if (m) { var k = +m.dataset.m; cur = k ? new Date(cur.getFullYear(), cur.getMonth() + k, 1) : new Date(P.today.getFullYear(), P.today.getMonth(), 1); if (!k) sel = sod(P.today); api.render(); }
      else if (d && !e.target.closest('[data-item]')) { sel = new Date(+d.dataset.day); api.render(); }
    });
    api.setMonth = function (d) { cur = new Date(d.getFullYear(), d.getMonth(), 1); api.render(); };
    api.render(); return api;
  }

  /* ── Agenda ─────────────────────────────────────────────── */
  var HOUR = 48;
  function agenda(el, o) {
    var view = o.view || 'week', views = o.views || ['day', 'week', 'month'], cur = toDate(o.cursor) || new Date(P.today), sh = o.startHour || 7, eh = o.endHour || 20, dur = o.defaultDuration || 60, monthApi;
    function allDay(it) { var s = toDate(it.start) || toDate(it.due); return !!s && !it.end && s.getHours() === 0 && s.getMinutes() === 0; }
    var api = base(el, o, function (a) {
      var vis = a.visible();
      if (view === 'month') return '<div class="ag-month"></div>';
      var s0 = sh, e0 = eh;
      vis.forEach(function (it) { var s = toDate(it.start); if (!s || allDay(it)) return; var e = toDate(it.end) || new Date(+s + dur * 60000); s0 = Math.min(s0, s.getHours()); e0 = Math.max(e0, Math.min(24, e.getHours() + (e.getMinutes() ? 1 : 0))); });
      var hours = Array.from({ length: e0 - s0 }, function (_, i) { return s0 + i; });
      var cols = view === 'day' ? [sod(cur)] : Array.from({ length: o.workWeek ? 5 : 7 }, function (_, i) { return addDays(sow(cur), i); });
      cols = cols.map(function (d) {
        var own = vis.filter(function (it) { var s = toDate(it.start) || toDate(it.due); return s && same(s, d); });
        var evs = own.filter(function (i) { return !allDay(i) && toDate(i.start); }).map(function (it) {
          var s = toDate(it.start), e = toDate(it.end) || new Date(+s + dur * 60000), sm = s.getHours() * 60 + s.getMinutes();
          return { it: it, sm: sm, em: Math.max(sm + 30, e.getHours() * 60 + e.getMinutes() || 1440), lane: 0, lanes: 1 };
        }).sort(function (x, y) { return x.sm - y.sm; });
        for (var i = 0; i < evs.length;) {
          var j = i, end = evs[i].em; while (j + 1 < evs.length && evs[j + 1].sm < end) { j++; end = Math.max(end, evs[j].em); }
          var lanes = []; for (var k = i; k <= j; k++) { var l = lanes.findIndex(function (le) { return le <= evs[k].sm; }); evs[k].lane = l < 0 ? lanes.length : l; lanes[evs[k].lane] = evs[k].em; }
          for (k = i; k <= j; k++) evs[k].lanes = lanes.length; i = j + 1;
        }
        return { d: d, today: same(d, P.today), allDay: own.filter(allDay), evs: evs };
      });
      var nowMin = P.today.getHours() * 60 + P.today.getMinutes() - hours[0] * 60, nowTop = nowMin < 0 || nowMin > hours.length * 60 ? null : nowMin / 60 * HOUR;
      var hasAll = cols.some(function (c) { return c.allDay.length; });
      return '<div class="ag-frame"><div class="ag-head" style="--cols:' + cols.length + '"><div class="ag-gutter"></div>' + cols.map(function (c) { return '<div class="ag-colhead' + (c.today ? ' today' : '') + '"><span>' + WD[(c.d.getDay() + 6) % 7] + '</span><b>' + c.d.getDate() + '</b></div>'; }).join('') + '</div>' +
        (hasAll ? '<div class="ag-allday" style="--cols:' + cols.length + '"><div class="ag-gutter">Journée</div>' + cols.map(function (c) { return '<div class="ag-allday-cell">' + c.allDay.map(function (it) { return '<button type="button" class="ag-chip" style="--tone:' + color(it) + '" data-item="' + it.id + '">' + esc(it.title) + '</button>'; }).join('') + '</div>'; }).join('') + '</div>' : '') +
        '<div class="ag-scroll"><div class="ag-grid" style="--cols:' + cols.length + ';height:' + hours.length * HOUR + 'px"><div class="ag-hours">' + hours.map(function (h, i) { return '<span style="top:' + i * HOUR + 'px">' + h + ':00</span>'; }).join('') + '</div>' +
        cols.map(function (c) {
          return '<div class="ag-col' + (c.today ? ' today' : '') + '">' + hours.map(function (_, i) { return '<div class="ag-slot" style="top:' + i * HOUR + 'px"></div>'; }).join('') +
            c.evs.map(function (e) {
              return '<button type="button" class="ag-event' + (e.it.done ? ' done' : '') + '" data-item="' + e.it.id + '" style="--tone:' + color(e.it) + ';top:' + ((e.sm - hours[0] * 60) / 60 * HOUR + 1) + 'px;height:' + Math.max((e.em - e.sm) / 60 * HOUR - 2, 22) + 'px;left:' + (e.lane / e.lanes * 100) + '%;width:' + (100 / e.lanes) + '%" title="' + esc(e.it.title) + '">' +
                '<b>' + esc(e.it.title) + '</b><small>' + hm(e.it.start) + (e.it.end ? ' – ' + hm(e.it.end) : '') + (e.it.assignee ? ' · ' + esc(e.it.assignee) : '') + '</small></button>';
            }).join('') + (c.today && nowTop !== null ? '<div class="ag-now" style="top:' + nowTop + 'px"></div>' : '') + '</div>';
        }).join('') + '</div></div></div>';
    }, function () {
      var title = view === 'month' ? MONTHS[cur.getMonth()] + ' ' + cur.getFullYear() : view === 'day' ? cur.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
        : (function () { var s = sow(cur), e = addDays(s, o.workWeek ? 4 : 6); return s.getDate() + ' – ' + e.getDate() + ' ' + MONTHS[e.getMonth()].toLowerCase() + ' ' + e.getFullYear(); })();
      return '<div class="ag-nav"><button type="button" class="pl-icon-btn" data-shift="-1" aria-label="Précédent"><span class="mi">chevron_left</span></button><strong class="ag-title">' + title + '</strong>' +
        '<button type="button" class="pl-icon-btn" data-shift="1" aria-label="Suivant"><span class="mi">chevron_right</span></button><button type="button" class="pl-text-btn" data-shift="0"><span class="mi">today</span> Aujourd\'hui</button>' +
        (views.length > 1 ? '<div class="pl-segmented">' + views.map(function (v) { return '<button type="button" class="' + (view === v ? 'active' : '') + '" data-view="' + v + '">' + { day: 'Jour', week: 'Semaine', month: 'Mois' }[v] + '</button>'; }).join('') + '</div>' : '') + '</div>';
    });
    api.after = function () {
      var m = el.querySelector('.ag-month');
      if (m) monthApi = month(m, { items: api.visible(), month: cur, showNavigation: false, showDayPanel: true });
      var sc = el.querySelector('.ag-scroll'); if (sc && !sc.__s) { sc.__s = 1; sc.scrollTop = Math.max(0, (8 - (o.startHour || 7)) * HOUR); }
    };
    el.addEventListener('click', function (e) {
      var s = e.target.closest('[data-shift]'), v = e.target.closest('[data-view]');
      if (s) { var n = +s.dataset.shift; cur = !n ? new Date(P.today) : view === 'month' ? new Date(cur.getFullYear(), cur.getMonth() + n, 1) : addDays(cur, n * (view === 'day' ? 1 : 7)); api.render(); }
      if (v) { view = v.dataset.view; api.render(); }
    });
    api.render(); return api;
  }

  /* ── Grille de notes ────────────────────────────────────── */
  function notesHtml(items, o) {
    o = o || {};
    return '<div class="ng-grid' + (o.dense ? ' dense' : '') + '" style="--min:' + (o.minWidth || 220) + 'px">' + (items.length ? items.map(function (it) {
      return '<div class="ng-note' + (it.done ? ' done' : '') + '" style="--tone:' + color(it) + '" data-item="' + it.id + '" tabindex="0"><div class="ng-head">' + (it.ref ? '<span class="ng-ref">' + esc(it.ref) + '</span>' : '') + '<span class="pl-spacer"></span>' +
        (it.badge ? '<span class="pl-pill" style="--tone:' + toneVar(it.badge.tone) + '">' + esc(it.badge.label) + '</span>' : '') + '</div><h4 class="ng-title">' + esc(it.title) + '</h4>' +
        (it.description && (o.descriptionLines === undefined || o.descriptionLines > 0) ? '<p class="ng-desc" style="-webkit-line-clamp:' + (o.descriptionLines || 3) + '">' + esc(it.description) + '</p>' : '') +
        '<div class="ng-foot">' + (it.due ? '<span class="pl-due' + (isLate(it) ? ' late' : '') + '"><span class="mi">event</span>' + toDate(it.due).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) + '</span>' : '') + '<span class="pl-spacer"></span>' +
        (it.done ? '<span class="mi ng-done">check_circle</span>' : it.progress != null ? '<span class="ng-pct">' + it.progress + ' %</span>' : '') + (it.assignee ? '<span class="pl-avatar" title="' + esc(it.assignee) + '">' + initials(it.assignee) + '</span>' : '') + '</div>' +
        (it.progress != null && !it.done ? '<div class="pl-progress"><div style="width:' + it.progress + '%"></div></div>' : '') + '</div>';
    }).join('') : '<div class="pl-empty ng-empty">' + (o.emptyLabel || 'Aucun élément') + '</div>') + '</div>';
  }
  function notes(el, o) { var api = base(el, o, function (a) { return notesHtml(a.visible(), a.o); }); api.render(); return api; }

  /* ── Vue groupée ────────────────────────────────────────── */
  function grouped(el, o) {
    var collapsed = new Set();
    var api = base(el, o, function (a) {
      var items = a.visible(), dec = a.o.groups;
      var keys = dec && dec.length ? dec : items.map(function (i) { return i.group || ''; }).filter(function (v, i, arr) { return arr.indexOf(v) === i; }).map(function (k) { return { key: k, label: k || a.o.ungroupedLabel || 'Non assigné' }; });
      var groups = keys.map(function (g) {
        var own = items.filter(function (i) { return (i.group || '') === g.key; });
        return Object.assign({}, g, { items: own, done: own.filter(function (i) { return i.done; }).length, late: own.filter(isLate).length, progress: own.length ? Math.round(own.reduce(function (s, i) { return s + (i.done ? 100 : i.progress || 0); }, 0) / own.length) : 0 });
      }).filter(function (g) { return g.items.length; });
      return groups.length ? groups.map(function (g) {
        var closed = collapsed.has(g.key);
        return '<section class="gb-group"><header class="gb-head" data-gb="' + esc(g.key) + '"><span class="gb-avatar" style="--tone:' + (g.color || 'var(--primary)') + '">' + (g.icon ? '<span class="mi">' + g.icon + '</span>' : initials(g.label)) + '</span>' +
          '<div class="gb-title"><strong>' + esc(g.label) + '</strong><span>' + esc(g.subtitle || g.items.length + ' élément(s)') + '</span></div><div class="gb-stats"><span class="pl-pill" style="--tone:var(--success)">' + g.done + ' terminé(s)</span>' +
          (g.late ? '<span class="pl-pill" style="--tone:var(--error)">' + g.late + ' en retard</span>' : '') + (a.o.showProgress !== false ? '<div class="gb-progress"><div class="pl-progress"><div style="width:' + g.progress + '%"></div></div><b>' + g.progress + ' %</b></div>' : '') + '</div>' +
          '<span class="mi gb-chevron">' + (closed ? 'expand_more' : 'expand_less') + '</span></header>' +
          (closed ? '' : a.o.layout === 'list' ? '<ul class="gb-list">' + g.items.map(function (it) {
            return '<li data-item="' + it.id + '" style="--tone:' + color(it) + '"><span class="gb-dot"></span>' + (it.ref ? '<span class="gb-ref">' + esc(it.ref) + '</span>' : '') + '<span class="gb-item-title' + (it.done ? ' done' : '') + '">' + esc(it.title) + '</span>' +
              (it.due ? '<span class="pl-due' + (isLate(it) ? ' late' : '') + '"><span class="mi">event</span>' + ddmm(it.due) + '</span>' : '') + '</li>'; }).join('') + '</ul>'
            : notesHtml(g.items, { dense: true, minWidth: 200, descriptionLines: 2 })) + '</section>';
      }).join('') : '<div class="pl-empty">Aucun élément</div>';
    });
    el.addEventListener('click', function (e) { var h = e.target.closest('[data-gb]'); if (h) { var k = h.dataset.gb; collapsed.has(k) ? collapsed.delete(k) : collapsed.add(k); api.render(); } });
    api.render(); return api;
  }

  window.Planning = Object.assign(P, { kanban: kanban, gantt: gantt, month: month, agenda: agenda, notes: notes, grouped: grouped, isLate: isLate, color: color, toDate: toDate, addDays: addDays });
})();
