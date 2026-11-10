/* ==========================================================================
   Table de données avancée en JS natif.
   DataTable.mount(el, {
     rows, columns: [{ key, label, width, align, type: 'badge'|'progress'|'mono'|'number'|'currency',
                       format(row), tone(row), sortable, editable:'text'|'number'|'select', options, hidden, required, sticky:'start', total }],
     rowKey: 'id', title, searchable: true, selectable, bulkActions: [{id,label,icon,tone}], pageSize: 10, maxHeight: '520px',
     clickable, onRowClick(row), onBulk(action, rows), onEdit({row,key,value,previous}), expanded(row) -> html
   }) -> { setRows(rows), refresh() }
   En-tête collant, tri, recherche, colonnes masquables, densité, export CSV, sélection (Maj+clic),
   actions groupées, lignes dépliables, édition au double-clic, redimensionnement, totaux, pagination.
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function mount(el, o) {
    o = Object.assign({ rowKey: 'id', searchable: true, pageSize: 10, maxHeight: '520px', bulkActions: [] }, o);
    var S = { q: '', sort: null, page: 0, sel: new Set(), open: new Set(), hidden: new Set(), density: 'normal', edit: null, last: null, widths: {}, edited: new Set() };
    o.columns.forEach(function (c) { if (c.hidden) S.hidden.add(c.key); S.widths[c.key] = c.width || 140; });
    function id(r) { return r[o.rowKey]; }
    function val(r, k) { return k.split('.').reduce(function (a, p) { return a == null ? a : a[p]; }, r); }
    function disp(r, c) { return c.format ? c.format(r) : val(r, c.key); }
    function cols() { return o.columns.filter(function (c) { return !S.hidden.has(c.key); }); }
    function align(c) { return c.align || (c.type === 'number' || c.type === 'currency' ? 'right' : 'left'); }
    function filtered() {
      var q = S.q.trim().toLowerCase(), list = o.rows;
      if (q) list = list.filter(function (r) { return o.columns.some(function (c) { return String(disp(r, c) == null ? '' : disp(r, c)).toLowerCase().indexOf(q) >= 0; }); });
      if (S.sort) {
        var k = S.sort.key, d = S.sort.dir === 'asc' ? 1 : -1;
        list = list.slice().sort(function (a, b) { var x = val(a, k), y = val(b, k); return (x > y ? 1 : x < y ? -1 : 0) * d; });
      }
      return list;
    }
    function pages(f) { return Math.max(1, Math.ceil(f.length / o.pageSize)); }

    function render() {
      var f = filtered(), np = pages(f); S.page = Math.min(S.page, np - 1);
      var rows = f.slice(S.page * o.pageSize, (S.page + 1) * o.pageSize), vc = cols();
      var allOn = rows.length && rows.every(function (r) { return S.sel.has(id(r)); }), someOn = !allOn && rows.some(function (r) { return S.sel.has(id(r)); });
      var span = vc.length + (o.selectable ? 1 : 0) + (o.expanded ? 1 : 0);
      var stickyLeft = (o.selectable ? 44 : 0) + (o.expanded ? 40 : 0), offsets = {};
      vc.forEach(function (c) { if (c.sticky === 'start') { offsets[c.key] = stickyLeft; stickyLeft += S.widths[c.key]; } });
      var stickyAttr = function (c) { return c.sticky === 'start' ? ' class="sticky-s" style="left:' + offsets[c.key] + 'px;text-align:' + align(c) + '"' : ' style="text-align:' + align(c) + '"'; };
      var tw = vc.reduce(function (s, c) { return s + S.widths[c.key]; }, 0) + (o.selectable ? 44 : 0) + (o.expanded ? 40 : 0);

      var head = S.sel.size
        ? '<div class="dt-bulk"><button type="button" class="dt-icon" data-a="clear" title="Désélectionner"><span class="mi">close</span></button><strong>' + S.sel.size + ' sélectionné(s)</strong>' +
          (S.sel.size < f.length ? '<button type="button" class="dt-link" data-a="all">Sélectionner les ' + f.length + '</button>' : '') + '<span class="spacer"></span>' +
          o.bulkActions.map(function (a) { return '<button type="button" class="dt-bulk-btn' + (a.tone === 'error' ? ' danger' : '') + '" data-bulk="' + a.id + '"><span class="mi">' + a.icon + '</span><span>' + a.label + '</span></button>'; }).join('') + '</div>'
        : '<div class="dt-toolbar">' + (o.title ? '<strong class="dt-title">' + esc(o.title) + '</strong><span class="dt-count">' + f.length + '</span>' : '') +
          (o.searchable ? '<label class="dt-search"><span class="mi">search</span><input placeholder="Rechercher…" value="' + esc(S.q) + '" data-a="q" aria-label="Rechercher dans le tableau"></label>' : '') +
          '<span class="spacer"></span>' +
          '<details class="ui-menu"><summary class="dt-tool" title="Densité"><span class="mi">density_medium</span></summary><div class="ui-menu__panel">' +
            [['compact', 'Compacte', 'density_small'], ['normal', 'Normale', 'density_medium'], ['comfortable', 'Confortable', 'density_large']].map(function (d) {
              return '<button class="ui-menu__item" data-density="' + d[0] + '"><span class="mi">' + (S.density === d[0] ? 'check' : d[2]) + '</span>' + d[1] + '</button>'; }).join('') + '</div></details>' +
          '<details class="ui-menu"><summary class="dt-tool"><span class="mi">view_column</span><span class="hide-xs">Colonnes</span>' + (S.hidden.size ? '<em>' + S.hidden.size + '</em>' : '') + '</summary><div class="ui-menu__panel">' +
            o.columns.map(function (c) { return '<button class="ui-menu__item" data-col="' + c.key + '"' + (c.required ? ' disabled' : '') + '><span class="mi">' + (S.hidden.has(c.key) ? 'check_box_outline_blank' : 'check_box') + '</span>' + esc(c.label) + '</button>'; }).join('') +
            '<hr><button class="ui-menu__item" data-a="reset-cols"><span class="mi">restart_alt</span>Réinitialiser</button></div></details>' +
          '<button type="button" class="dt-tool" data-a="csv" title="Exporter en CSV"><span class="mi">download</span></button></div>';

      var body = rows.map(function (r) {
        var rid = id(r), on = S.sel.has(rid), isOpen = S.open.has(rid);
        var tds = (o.selectable ? '<td class="tech sticky-s" style="left:0" data-check="' + esc(rid) + '"><span class="dt-check' + (on ? ' on' : '') + '" role="checkbox" aria-checked="' + on + '"></span></td>' : '') +
          (o.expanded ? '<td class="tech sticky-s" style="left:' + (o.selectable ? 44 : 0) + 'px"><button type="button" class="dt-exp" data-exp="' + esc(rid) + '" aria-expanded="' + isOpen + '"><span class="mi">chevron_right</span></button></td>' : '') +
          vc.map(function (c) {
            var editing = S.edit && S.edit.id === rid && S.edit.key === c.key, d = disp(r, c), inner;
            if (editing) {
              inner = c.editable === 'select'
                ? '<select class="dt-edit-input" data-edit>' + c.options.map(function (op) { return '<option value="' + esc(op.value) + '"' + (op.value === val(r, c.key) ? ' selected' : '') + '>' + esc(op.label) + '</option>'; }).join('') + '</select>'
                : '<input class="dt-edit-input" data-edit value="' + esc(val(r, c.key)) + '"' + (c.editable === 'number' ? ' inputmode="decimal"' : '') + ' style="text-align:' + align(c) + '">';
            } else if (c.type === 'badge') inner = d ? '<span class="dt-badge" style="--tone:var(--' + (c.tone ? c.tone(r) : 'primary') + ')">' + esc(d) + '</span>' : '';
            else if (c.type === 'progress') { var v = val(r, c.key); inner = '<span class="dt-progress"><i style="width:' + v + '%" class="' + (v < 30 ? 'low' : '') + '"></i></span><em class="dt-pct">' + esc(d) + '</em>'; }
            else if (c.type === 'mono') inner = '<code>' + esc(d) + '</code>';
            else inner = '<span class="dt-text">' + (d === '' || d == null ? '—' : esc(d)) + '</span>';
            var cls = [c.sticky === 'start' ? 'sticky-s' : '', c.editable ? 'editable' : '', S.edited.has(rid + c.key) ? 'edited' : ''].filter(Boolean).join(' ');
            return '<td class="' + cls + '" style="text-align:' + align(c) + (c.sticky === 'start' ? ';left:' + offsets[c.key] + 'px' : '') + '"' +
              ' data-row="' + esc(rid) + '" data-key="' + c.key + '">' + inner + '</td>';
          }).join('');
        return '<tr class="' + (on ? 'sel ' : '') + (isOpen ? 'open ' : '') + (o.clickable ? 'clickable' : '') + '">' + tds + '</tr>' +
          (o.expanded && isOpen ? '<tr class="dt-detail"><td colspan="' + span + '"><div class="dt-detail-in">' + o.expanded(r) + '</div></td></tr>' : '');
      }).join('') || '<tr class="dt-empty"><td colspan="' + span + '"><span class="mi">search_off</span>Aucun résultat' + (S.q ? ' pour « ' + esc(S.q) + ' »' : '') + '</td></tr>';

      var totals = vc.some(function (c) { return c.total; }) && rows.length ? '<tfoot><tr>' + (o.selectable ? '<td class="tech sticky-s" style="left:0"></td>' : '') + (o.expanded ? '<td class="tech"></td>' : '') +
        vc.map(function (c, i) {
          var t = c.total ? f.reduce(function (s, r) { return s + (+val(r, c.key) || 0); }, 0) : null;
          return '<td' + stickyAttr(c) + '>' + (c.total ? (c.totalFormat ? c.totalFormat(t) : new Intl.NumberFormat('fr-FR').format(t)) : i === 0 ? 'Total (' + f.length + ')' : '') + '</td>';
        }).join('') + '</tr></tfoot>' : '';

      el.innerHTML = '<div class="dt dt--' + S.density + '">' + head +
        '<div class="dt-scroll" style="max-height:' + o.maxHeight + '"><table style="width:' + tw + 'px;min-width:100%"><colgroup>' +
          (o.selectable ? '<col style="width:44px">' : '') + (o.expanded ? '<col style="width:40px">' : '') + vc.map(function (c) { return '<col style="width:' + S.widths[c.key] + 'px">'; }).join('') + '</colgroup>' +
        '<thead><tr>' + (o.selectable ? '<th class="tech sticky-s" style="left:0"><span class="dt-check' + (allOn ? ' on' : someOn ? ' some' : '') + '" data-a="page" role="checkbox" aria-checked="' + !!allOn + '" aria-label="Tout sélectionner"></span></th>' : '') +
          (o.expanded ? '<th class="tech sticky-s" style="left:' + (o.selectable ? 44 : 0) + 'px"></th>' : '') +
          vc.map(function (c) {
            var sorted = S.sort && S.sort.key === c.key;
            return '<th' + stickyAttr(c) + (c.sortable !== false ? ' data-sort="' + c.key + '"' : '') + (sorted ? ' aria-sort="' + (S.sort.dir === 'asc' ? 'ascending' : 'descending') + '"' : '') + '>' +
              '<span class="th-in" style="justify-content:' + (align(c) === 'right' ? 'flex-end' : align(c) === 'center' ? 'center' : 'flex-start') + '">' + esc(c.label) +
              (c.editable ? '<span class="mi th-edit" title="Modifiable (double-clic)">edit</span>' : '') +
              (c.sortable !== false ? '<span class="mi th-sort' + (sorted ? ' on' : '') + '">' + (sorted ? (S.sort.dir === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more') + '</span>' : '') +
              '</span><span class="resizer" data-resize="' + c.key + '" title="Glisser pour redimensionner"></span></th>';
          }).join('') + '</tr></thead><tbody>' + body + '</tbody>' + totals + '</table></div>' +
        '<div class="dt-foot"><span>' + (f.length ? S.page * o.pageSize + 1 : 0) + '–' + Math.min((S.page + 1) * o.pageSize, f.length) + ' sur ' + f.length + '</span>' +
          (o.selectable ? '<span class="muted hide-xs">· Maj+clic pour sélectionner une plage</span>' : '') + '<span class="spacer"></span>' +
          '<button type="button" class="dt-icon" data-pg="first"' + (S.page === 0 ? ' disabled' : '') + ' aria-label="Première page"><span class="mi">first_page</span></button>' +
          '<button type="button" class="dt-icon" data-pg="prev"' + (S.page === 0 ? ' disabled' : '') + ' aria-label="Page précédente"><span class="mi">chevron_left</span></button>' +
          '<span class="dt-page">' + (S.page + 1) + ' / ' + np + '</span>' +
          '<button type="button" class="dt-icon" data-pg="next"' + (S.page >= np - 1 ? ' disabled' : '') + ' aria-label="Page suivante"><span class="mi">chevron_right</span></button>' +
          '<button type="button" class="dt-icon" data-pg="last"' + (S.page >= np - 1 ? ' disabled' : '') + ' aria-label="Dernière page"><span class="mi">last_page</span></button></div></div>';
      var ed = el.querySelector('[data-edit]'); if (ed) { ed.focus(); if (ed.select) ed.select(); }
    }

    function rowById(rid) { return o.rows.find(function (r) { return String(id(r)) === String(rid); }); }
    function commit(v) {
      if (!S.edit) return;
      var r = rowById(S.edit.id), c = o.columns.find(function (x) { return x.key === S.edit.key; }), prev = val(r, c.key);
      if (c.editable === 'number') v = parseFloat(String(v).replace(/\s/g, '').replace(',', '.')) || 0;
      S.edit = null;
      if (v !== prev) { r[c.key] = v; S.edited.add(id(r) + c.key); o.onEdit && o.onEdit({ row: r, key: c.key, value: v, previous: prev }); }
      render();
    }
    function csv() {
      var vc = cols(), lines = [vc.map(function (c) { return '"' + c.label.replace(/"/g, '""') + '"'; }).join(';')];
      filtered().forEach(function (r) { lines.push(vc.map(function (c) { return '"' + String(disp(r, c) == null ? '' : disp(r, c)).replace(/"/g, '""') + '"'; }).join(';')); });
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
      a.download = (o.title || 'export') + '.csv'; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    }

    el.addEventListener('click', function (e) {
      var t = e.target;
      var a = t.closest('[data-a]'), pg = t.closest('[data-pg]'), so = t.closest('[data-sort]'), ck = t.closest('[data-check]'), ex = t.closest('[data-exp]');
      var bk = t.closest('[data-bulk]'), col = t.closest('[data-col]'), den = t.closest('[data-density]'), td = t.closest('td[data-row]');
      if (t.closest('[data-resize]') || t.closest('[data-edit]')) return;
      if (a && a.dataset.a !== 'q') {
        var f = filtered(), rows = f.slice(S.page * o.pageSize, (S.page + 1) * o.pageSize);
        if (a.dataset.a === 'clear') S.sel.clear();
        if (a.dataset.a === 'all') f.forEach(function (r) { S.sel.add(id(r)); });
        if (a.dataset.a === 'page') { var all = rows.every(function (r) { return S.sel.has(id(r)); }); rows.forEach(function (r) { all ? S.sel.delete(id(r)) : S.sel.add(id(r)); }); }
        if (a.dataset.a === 'csv') return csv();
        if (a.dataset.a === 'reset-cols') { S.hidden = new Set(o.columns.filter(function (c) { return c.hidden; }).map(function (c) { return c.key; })); o.columns.forEach(function (c) { S.widths[c.key] = c.width || 140; }); }
        return render();
      }
      if (pg) { var n = pages(filtered()); S.page = { first: 0, prev: S.page - 1, next: S.page + 1, last: n - 1 }[pg.dataset.pg]; return render(); }
      if (so) { var k = so.dataset.sort; S.sort = !S.sort || S.sort.key !== k ? { key: k, dir: 'asc' } : S.sort.dir === 'asc' ? { key: k, dir: 'desc' } : null; return render(); }
      if (ck) {
        var f2 = filtered(), rid = ck.dataset.check, idx = f2.findIndex(function (r) { return String(id(r)) === rid; }), key = id(f2[idx]);
        if (e.shiftKey && S.last != null) { var j = f2.findIndex(function (r) { return id(r) === S.last; }); f2.slice(Math.min(idx, j), Math.max(idx, j) + 1).forEach(function (r) { S.sel.add(id(r)); }); }
        else S.sel.has(key) ? S.sel.delete(key) : S.sel.add(key);
        S.last = key; return render();
      }
      if (ex) { var r = rowById(ex.dataset.exp), k2 = id(r); S.open.has(k2) ? S.open.delete(k2) : S.open.add(k2); return render(); }
      if (bk) { var act = o.bulkActions.find(function (x) { return x.id === bk.dataset.bulk; }), sel = o.rows.filter(function (r) { return S.sel.has(id(r)); }); o.onBulk && o.onBulk(act, sel); S.sel.clear(); return render(); }
      if (col) { e.preventDefault(); var ck2 = col.dataset.col; S.hidden.has(ck2) ? S.hidden.delete(ck2) : S.hidden.add(ck2); render(); el.querySelectorAll('details.ui-menu')[1].setAttribute('open', ''); return; }
      if (den) { S.density = den.dataset.density; return render(); }
      if (td && o.clickable && o.onRowClick) o.onRowClick(rowById(td.dataset.row));
    });
    el.addEventListener('dblclick', function (e) {
      var td = e.target.closest('td[data-row]'); if (!td) return;
      var c = o.columns.find(function (x) { return x.key === td.dataset.key; }); if (!c || !c.editable) return;
      S.edit = { id: rowById(td.dataset.row)[o.rowKey], key: c.key }; render();
    });
    el.addEventListener('input', function (e) { if (e.target.dataset.a === 'q') { S.q = e.target.value; S.page = 0; var p = e.target.selectionStart; render(); var i = el.querySelector('[data-a=q]'); i.focus(); i.setSelectionRange(p, p); } });
    el.addEventListener('keydown', function (e) {
      if (!e.target.matches('[data-edit]')) return;
      if (e.key === 'Enter') commit(e.target.value);
      if (e.key === 'Escape') { S.edit = null; render(); }
    });
    el.addEventListener('change', function (e) { if (e.target.matches('select[data-edit]')) commit(e.target.value); });
    el.addEventListener('focusout', function (e) { if (e.target.matches('input[data-edit]') && S.edit) commit(e.target.value); });
    // Redimensionnement des colonnes
    el.addEventListener('pointerdown', function (e) {
      var h = e.target.closest('[data-resize]'); if (!h) return;
      e.preventDefault(); var k = h.dataset.resize, x0 = e.clientX, w0 = S.widths[k];
      function mv(ev) { S.widths[k] = Math.max(60, w0 + ev.clientX - x0); var c = el.querySelectorAll('col')[[].indexOf.call(el.querySelectorAll('th'), h.closest('th'))]; if (c) c.style.width = S.widths[k] + 'px'; }
      function up() { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); render(); }
      document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up);
    });
    render();
    return { setRows: function (r) { o.rows = r; S.page = 0; render(); }, refresh: render, selection: function () { return o.rows.filter(function (r) { return S.sel.has(id(r)); }); } };
  }

  window.DataTable = { mount: mount };
})();
