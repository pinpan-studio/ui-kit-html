/* ==========================================================================
   Harnais — interface conversationnelle (rendu en JavaScript natif).
   La logique (conversations, génération simulée, scénarios) vient de
   js/data/harnais-store.js (window.Harnais.store / Harnais.data).
   Rendu incrémental : un bloc dont l'objet n'a pas changé garde son DOM
   (cartes, graphiques, lecteurs ne sont pas recréés pendant le flux).
   ========================================================================== */
(function () {
  'use strict';
  var H = window.Harnais, store = H.store, D = H.data, esc = UIComp.esc;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var TOOL_ICONS = { read: 'description', search: 'search', bash: 'terminal', edit: 'edit_note', web: 'travel_explore' };
  var KIND_ICONS = { code: 'code', image: 'image', pdf: 'picture_as_pdf', sheet: 'table_chart' };
  var DEFAULT_ICONS = { chart: 'insert_chart', table: 'table_rows', map: 'map', form: 'edit_note', records: 'list', timeline: 'timeline', calendar: 'calendar_month', kanban: 'view_kanban', gantt: 'view_timeline', agenda: 'event', tree: 'account_tree', json: 'data_object', carousel: 'view_carousel', modal: 'open_in_full', tabs: 'tab', accordion: 'expand', steps: 'linear_scale', keyvalue: 'list_alt', checklist: 'checklist', progress: 'flag', diff: 'difference', sources: 'travel_explore', tags: 'sell', heatmap: 'grid_on', files: 'folder', cards: 'view_module', compare: 'compare', upload: 'upload_file', typography: 'text_fields', article: 'article', comments: 'forum', video: 'movie', videos: 'video_library', audio: 'music_note', pdf: 'picture_as_pdf', gallery: 'photo_library', image: 'image', qrcode: 'qr_code_2', textdiff: 'difference', audit: 'history' };
  var UNFRAMED = ['stats', 'callout', 'paragraph', 'result', 'banner', 'approval', 'choices'];
  var MODELS = D.HARNAIS_MODELS, user = (window.DATA && DATA.CURRENT_USER) || { prenoms: 'Jean', fullname: 'Jean Kouassi', role: 'Administrateur' };

  var S = { id: null, left: true, right: false, tab: 'artifact', artifactId: null, artView: 'code', q: '', draftModel: 'opus', attachments: [], thinking: false, web: false, open: {} };
  var blockCache = new WeakMap(), msgCache = new Map();

  function tone(t) { return 'var(--' + (t || 'primary') + ')'; }
  function inline(t) { return esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); }
  function active() { return store.find(S.id); }
  function generating() { return store.generatingId() !== null; }
  function artifacts() { var c = active(); if (!c) return []; var ids = {}; c.messages.forEach(function (m) { m.blocks.forEach(function (b) { if (b.type === 'artifact') ids[b.artifactId] = 1; }); }); return D.HARNAIS_ARTIFACTS.filter(function (a) { return ids[a.id]; }); }
  function compact() { return matchMedia('(max-width: 959.98px)').matches; }
  function narrow() { return matchMedia('(max-width: 1279.98px)').matches; }

  /* ── Navigation ─────────────────────────────────────────── */
  function go(id, replace) {
    S.id = id; S.artifactId = null; msgCache.clear();
    var url = location.pathname + (id ? '?c=' + encodeURIComponent(id) : '');
    history[replace ? 'replaceState' : 'pushState'](null, '', url);
    if (compact()) S.left = false;
    render(); scrollBottom(false);
  }
  window.addEventListener('popstate', function () { S.id = new URLSearchParams(location.search).get('c'); msgCache.clear(); render(); });

  /* ── Rendu principal ────────────────────────────────────── */
  var root;
  function render() {
    root.classList.toggle('left-open', S.left); root.classList.toggle('right-open', S.right);
    root.classList.toggle('scrim-on', (S.left && compact()) || (S.right && narrow()));
    renderList(); renderTop(); renderCenter(); renderSide();
  }

  function renderList() {
    var q = S.q.trim().toLowerCase(), list = store.conversations().filter(function (c) { return !q || c.title.toLowerCase().indexOf(q) >= 0; });
    function row(c) { return '<div class="hz-item' + (c.id === S.id ? ' active' : '') + '"><button type="button" class="hz-item-main" data-open="' + c.id + '"' + (c.id === S.id ? ' aria-current="page"' : '') + '><span class="hz-item-title">' + esc(c.title) + '</span>' + (c.project ? '<span class="hz-item-project">' + esc(c.project) + '</span>' : '') + '</button>' +
      '<button type="button" class="hz-icon hz-item-more" data-more="' + c.id + '" aria-label="Actions"><span class="mi">more_horiz</span></button></div>'; }
    var pinned = list.filter(function (c) { return c.pinned; }), html = '';
    if (pinned.length) html += '<div class="hz-group"><span class="mi">push_pin</span>Épinglées</div>' + pinned.map(row).join('');
    D.HARNAIS_GROUPS.forEach(function (g) { var items = list.filter(function (c) { return !c.pinned && c.group === g; }); if (items.length) html += '<div class="hz-group">' + g + '</div>' + items.map(row).join(''); });
    if (!list.length) html = '<div class="hz-list-empty"><span class="mi">search_off</span>Aucune conversation pour « ' + esc(S.q) + ' »</div>';
    $('#hz-list').innerHTML = html;
  }

  function renderTop() {
    var c = active();
    $('#hz-title').innerHTML = c ? '<h1>' + esc(c.title) + '</h1>' + (c.project ? '<span class="hz-project"><span class="mi">folder</span>' + esc(c.project) + '</span>' : '') : '<h1>Nouvelle conversation</h1>';
    $('#hz-share').hidden = !c;
    root.querySelectorAll('[data-show-left]').forEach(function (b) { b.hidden = S.left; });
    $('#hz-toggle-right').classList.toggle('on', S.right);
  }

  function renderCenter() {
    var c = active(), center = $('#hz-main');
    var mode = c && c.messages.length ? 'thread' : 'welcome';
    if (center.dataset.mode !== mode) {
      center.dataset.mode = mode;
      if (mode === 'welcome') {
        var h = new Date().getHours() < 18 ? 'Bonjour' : 'Bonsoir';
        center.innerHTML = '<div class="hz-welcome"><div class="hz-column"><div class="hz-hello"><span class="hz-spark"><span class="mi">auto_awesome</span></span><h2>' + h + ', ' + esc(user.prenoms) + '</h2></div><div class="hz-composer-slot"></div>' +
          '<div class="hz-suggestions">' + D.HARNAIS_SUGGESTIONS.map(function (s, i) { return '<button type="button" class="hz-suggestion" data-suggest="' + i + '"><span class="mi">' + s.icon + '</span>' + esc(s.label) + '</button>'; }).join('') + '</div></div></div>';
      } else {
        center.innerHTML = '<div class="hz-thread" id="hz-thread"><div class="hz-column" id="hz-msgs"></div></div><div class="hz-dock"><div class="hz-column"><div class="hz-composer-slot"></div><p class="hz-disclaimer">Les réponses sont simulées localement — démonstration statique du UI Kit.</p></div></div>';
        msgCache.clear();
      }
      center.querySelector('.hz-composer-slot').appendChild(composer.el);
    }
    composer.update(mode === 'welcome' ? 'Comment puis-je vous aider aujourd’hui ?' : 'Répondre…');
    if (mode === 'thread') renderMessages(c);
  }

  function renderMessages(c) {
    var box = $('#hz-msgs'), lastA = c.messages.slice().reverse().find(function (m) { return m.role === 'assistant'; }), keep = new Set();
    c.messages.forEach(function (m, i) {
      keep.add(m.id);
      var last = lastA && m.id === lastA.id && !generating(), key = m.id, cached = msgCache.get(key), sig = generating() + '|' + last;
      if (cached && cached.msg === m && cached.sig === sig) { if (box.children[i] !== cached.el) box.insertBefore(cached.el, box.children[i] || null); return; }
      var el = renderMessage(m, last, cached && cached.el);
      msgCache.set(key, { msg: m, el: el, sig: sig });
      if (cached && cached.el !== el && cached.el.parentNode) cached.el.replaceWith(el);
      else if (box.children[i] !== el) box.insertBefore(el, box.children[i] || null);
    });
    Array.from(box.children).forEach(function (el) { if (!keep.has(el.dataset.id)) el.remove(); });
  }

  function renderMessage(m, last, prev) {
    var el = prev || document.createElement('div');
    el.dataset.id = m.id;
    if (m.role === 'user') {
      el.className = 'hz-user';
      el.innerHTML = (m.attachments && m.attachments.length ? '<div class="hz-attachments">' + m.attachments.map(function (a) { return '<div class="hz-attachment"><span class="mi">' + KIND_ICONS[a.kind] + '</span><span class="name">' + esc(a.name) + '</span><span class="size">' + esc(a.size) + '</span></div>'; }).join('') + '</div>' : '') +
        '<div class="hz-bubble">' + m.blocks.filter(function (b) { return b.type === 'text'; }).map(function (b) { return '<p>' + esc(b.text) + '</p>'; }).join('') + '</div>' +
        '<div class="hz-user-actions"><span class="time">' + m.time + '</span><button type="button" class="hz-icon mini" data-copy-msg="' + m.id + '" title="Copier" aria-label="Copier"><span class="mi">content_copy</span></button></div>';
      return el;
    }
    el.className = 'hz-assistant';
    var body = el.querySelector(':scope > .hz-body');
    if (!body) { el.innerHTML = '<div class="hz-avatar"><span class="mi">auto_awesome</span></div><div class="hz-body"></div>'; body = el.lastChild; }
    el.firstChild.classList.toggle('pulse', !!m.streaming);
    // Groupes : outils consécutifs réunis en une carte « étapes ».
    var groups = [];
    m.blocks.forEach(function (b, i) { var p = groups[groups.length - 1]; if (b.type === 'tool') { if (p && p.tools) p.items.push(b); else groups.push({ tools: true, start: i, items: [b] }); } else groups.push({ index: i, block: b }); });
    var nodes = groups.map(function (g, gi) {
      if (g.tools) return toolsGroup(m, g);
      var b = g.block, isLastText = b.type === 'text' && gi === groups.length - 1 && m.streaming;
      if (b.type === 'text' || b.type === 'thinking') return simpleBlock(m, b, g.index, isLastText);
      var c = blockCache.get(b);
      if (!c) { c = blockEl(b, { msgId: m.id, index: g.index }); blockCache.set(b, c); }
      c.classList.toggle('busy', generating());
      return c;
    });
    if (m.stopped) nodes.push(html('<div class="hz-stopped"><span class="mi">block</span>Réponse interrompue</div>'));
    if (!m.streaming) nodes.push(html('<div class="hz-actions"><button type="button" class="hz-icon mini" data-copy-msg="' + m.id + '" title="Copier" aria-label="Copier"><span class="mi">content_copy</span></button>' +
      '<button type="button" class="hz-icon mini' + (m.feedback === 'up' ? ' on' : '') + '" data-fb="up" data-msg="' + m.id + '" title="Bonne réponse" aria-label="Bonne réponse"><span class="mi">thumb_up</span></button>' +
      '<button type="button" class="hz-icon mini' + (m.feedback === 'down' ? ' on' : '') + '" data-fb="down" data-msg="' + m.id + '" title="Mauvaise réponse" aria-label="Mauvaise réponse"><span class="mi">thumb_down</span></button>' +
      (last ? '<button type="button" class="hz-icon mini" data-retry title="Régénérer" aria-label="Régénérer"><span class="mi">refresh</span></button>' : '') + '<span class="time">' + m.time + '</span></div>'));
    Array.from(body.children).forEach(function (n) { if (nodes.indexOf(n) < 0) n.remove(); });
    nodes.forEach(function (n, i) { if (body.children[i] !== n) body.insertBefore(n, body.children[i] || null); });
    return el;
  }
  function html(s) { var t = document.createElement('template'); t.innerHTML = s.trim(); return t.content.firstChild; }

  function toolsGroup(m, g) {
    var key = m.id + ':' + g.start, open = !!S.open[key], running = g.items.some(function (t) { return t.status === 'running'; }), l = g.items[g.items.length - 1];
    return html('<div class="hz-steps' + (open ? ' open' : '') + '"><button type="button" class="hz-steps-head" data-toggle="' + key + '" aria-expanded="' + open + '">' + (running ? '<span class="hz-spin"></span>' : '<span class="mi lead">checklist</span>') +
      '<span>' + g.items.length + ' étape' + (g.items.length > 1 ? 's' : '') + '</span><span class="preview">' + esc(l.label) + ' · ' + esc(l.target) + '</span><span class="mi chevron">expand_more</span></button>' +
      (open ? '<ol class="hz-steps-list">' + g.items.map(function (t) { return '<li class="hz-step ' + t.status + '"><span class="step-icon"><span class="mi">' + TOOL_ICONS[t.tool] + '</span></span><div class="step-main"><div class="step-title"><strong>' + esc(t.label) + '</strong><code>' + esc(t.target) + '</code></div>' + (t.output ? '<div class="step-output">' + esc(t.output) + '</div>' : '') + '</div>' +
        (t.status === 'running' ? '<span class="hz-spin"></span>' : t.status === 'done' ? '<span class="mi state ok">check_circle</span>' : '<span class="mi state ko">error</span>') + '</li>'; }).join('') + '</ol>' : '') + '</div>');
  }

  function simpleBlock(m, b, index, caret) {
    if (b.type === 'text') return html('<p class="hz-text">' + inline(b.text) + (caret ? '<span class="hz-caret"></span>' : '') + '</p>');
    var key = m.id + ':' + index, open = !!S.open[key];
    return html('<div class="hz-thinking' + (open ? ' open' : '') + '"><button type="button" class="hz-thinking-head" data-toggle="' + key + '" aria-expanded="' + open + '"><span class="mi lead">psychology</span><span' + (b.running ? ' class="shimmer"' : '') + '>' + (b.running ? 'Réflexion en cours…' : 'Réflexion pendant ' + esc(b.duration)) + '</span><span class="mi chevron">expand_more</span></button>' + (open ? '<p class="hz-thinking-text">' + esc(b.text) + '</p>' : '') + '</div>');
  }

  /* ── Blocs et widgets ───────────────────────────────────── */
  function fixAssets(o) { if (Array.isArray(o)) o.forEach(function (v, i) { if (typeof v === 'string' && v.indexOf('assets/') === 0) o[i] = '../' + v; else if (v && typeof v === 'object') fixAssets(v); });
    else if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { var v = o[k]; if (typeof v === 'string' && v.indexOf('assets/') === 0) o[k] = '../' + v; else if (v && typeof v === 'object') fixAssets(v); }); }
  function blockEl(b, ctx) {
    fixAssets(b);
    if (b.type === 'list') return html('<ul class="hz-list">' + b.items.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ul>');
    if (b.type === 'code') { var e = html('<div class="hz-code"><div class="hz-code-head"><span class="mi">code</span><span>' + esc(b.file || b.lang) + '</span><span class="spacer"></span><button type="button" class="ui-btn ui-btn--text ui-btn--sm"><span class="mi">content_copy</span>Copier</button></div><pre><code></code></pre></div>');
      e.querySelector('code').textContent = b.code; e.querySelector('button').onclick = function () { copy(b.code); }; return e; }
    if (b.type === 'artifact') { var a = D.HARNAIS_ARTIFACTS.find(function (x) { return x.id === b.artifactId; }); if (!a) return html('<span></span>');
      return html('<button type="button" class="hz-artifact" data-artifact="' + a.id + '"><span class="art-icon"><span class="mi">' + (a.kind === 'code' ? 'data_object' : 'article') + '</span></span><span class="art-text"><span class="art-title">' + esc(a.title) + '</span><span class="art-sub">' + (a.kind === 'code' ? 'Code' : 'Document') + ' · version ' + a.version + ' · cliquez pour ouvrir</span></span><span class="mi art-open">open_in_new</span></button>'); }
    return widget(b, ctx);
  }

  function widget(b, ctx) {
    var el = document.createElement('div'); el.className = 'hz-w hz-w-' + b.type;
    if (UNFRAMED.indexOf(b.type) >= 0) { unframed(el, b, ctx); return el; }
    el.innerHTML = '<section class="hz-frame' + (b.type === 'map' || b.type === 'table' ? ' flush' : '') + '">' + (b.title ? '<header class="hz-frame-head"><span class="hz-frame-icon"><span class="mi">' + (b.icon || DEFAULT_ICONS[b.type] || 'widgets') + '</span></span><div class="hz-frame-text"><span class="hz-frame-title">' + esc(b.title) + '</span>' + (b.subtitle ? '<span class="hz-frame-sub">' + esc(b.subtitle) + '</span>' : '') + '</div></header>' : '') + '<div class="hz-frame-body"></div></section>';
    var body = el.querySelector('.hz-frame-body');
    try { framed(body, b, ctx); } catch (err) { body.innerHTML = '<p class="ui-muted">Widget « ' + b.type + ' » indisponible.</p>'; console.error(err); }
    return el;
  }

  function unframed(el, b, ctx) {
    switch (b.type) {
      case 'stats': el.innerHTML = '<div class="hz-stats">' + b.items.map(function (s) { return '<div class="hz-stat" style="--tone:' + tone(s.tone) + '"><div class="stat-head">' + (s.icon ? '<span class="stat-icon"><span class="mi">' + s.icon + '</span></span>' : '') + '<span class="stat-label">' + esc(s.label) + '</span></div><div class="stat-value">' + esc(s.value) + '</div>' +
        (s.spark ? spark(s.spark) : '') + '<div class="stat-foot">' + (s.delta ? '<span class="delta ' + (s.trend || 'up') + '"><span class="mi">' + (s.trend === 'down' ? 'trending_down' : s.trend === 'flat' ? 'trending_flat' : 'trending_up') + '</span>' + esc(s.delta) + '</span>' : '') + (s.hint ? '<span class="stat-hint">' + esc(s.hint) + '</span>' : '') + '</div></div>'; }).join('') + '</div>'; break;
      case 'callout': el.innerHTML = '<div class="hz-callout" style="--tone:' + tone(b.tone) + '" role="note"><span class="mi">' + (b.icon || 'info') + '</span><div><strong>' + esc(b.title) + '</strong><p>' + inline(b.text) + '</p></div></div>'; break;
      case 'paragraph': el.innerHTML = '<p class="hz-paragraph">' + inline(b.text) + '</p>'; break;
      case 'result': el.innerHTML = ExW.result({ tone: { success: 'success', error: 'error', warning: 'warning', info: 'info', '404': 'neutral', '403': 'warning', '500': 'error' }[b.status] || 'success', icon: { success: 'check_circle', error: 'cancel', warning: 'warning', info: 'info', '404': 'travel_explore', '403': 'lock', '500': 'cloud_off' }[b.status] || 'info', title: esc(b.title || ''), text: esc(b.text || '') }); break;
      case 'banner': el.innerHTML = '<div class="hz-banner" style="--tone:' + tone(b.tone === 'danger' ? 'error' : b.tone === 'neutral' ? 'neutral' : b.tone) + '"><span class="mi">' + (b.icon || { info: 'info', success: 'check_circle', warning: 'warning', error: 'error', danger: 'error' }[b.tone] || 'campaign') + '</span><div>' + (b.title ? '<strong>' + esc(b.title) + '</strong> ' : '') + inline(b.text) + '</div></div>'; break;
      case 'approval': {
        var risk = b.risk || 'warning';
        el.innerHTML = '<div class="hz-approval' + (b.selected ? ' answered' : '') + '" style="--tone:' + tone(risk) + '"><div class="ap-head"><span class="ap-icon"><span class="mi">shield</span></span><div class="ap-text"><strong>' + esc(b.title) + '</strong><span>' + esc(b.text) + '</span></div><span class="ui-badge ui-badge--' + (risk === 'primary' ? 'info' : risk) + '">Risque ' + ({ error: 'élevé', warning: 'modéré', success: 'faible', info: 'faible' }[risk] || 'modéré') + '</span></div>' +
          (b.command ? '<pre class="ap-cmd"><code>' + esc(b.command) + '</code></pre>' : '') + '<div class="ap-actions">' + (b.selected ? '<span class="ap-result' + (b.selected === 'approve' ? ' ok' : '') + '"><span class="mi">' + (b.selected === 'approve' ? 'check_circle' : 'block') + '</span>' + (b.selected === 'approve' ? 'Autorisé' : 'Refusé') + '</span>'
          : '<button class="ui-btn ui-btn--text" data-choose=\'{"value":"reject","label":"Refuser"}\'>Refuser</button><button class="ui-btn ui-btn--outlined" data-choose=\'{"value":"approve","label":"Autoriser pour cette session"}\'>Toujours autoriser</button><button class="ui-btn" data-choose=\'{"value":"approve","label":"Autoriser"}\'><span class="mi">check</span>Autoriser</button>') + '</div></div>';
        break; }
      case 'choices': el.innerHTML = '<div class="hz-choices">' + (b.question ? '<span class="choices-q">' + esc(b.question) + '</span>' : '') + '<div class="choices-list">' + b.options.map(function (o) { return '<button type="button" class="hz-choice' + (b.selected === o.value ? ' on' : '') + '"' + (b.selected ? ' disabled' : '') + ' data-choose="' + esc(JSON.stringify(o)) + '">' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + '<span>' + esc(o.label) + '</span>' + (b.selected === o.value ? '<span class="mi check">check</span>' : '') + '</button>'; }).join('') + '</div></div>'; break;
    }
    bindChoose(el, ctx);
  }
  function bindChoose(el, ctx) { el.querySelectorAll('[data-choose]').forEach(function (btn) { btn.addEventListener('click', function () { if (generating() || !ctx) return; store.choose(S.id, ctx.msgId, ctx.index, JSON.parse(btn.dataset.choose)); }); }); }
  function spark(d) { var mn = Math.min.apply(0, d), mx = Math.max.apply(0, d), r = mx - mn || 1, pts = d.map(function (v, i) { return [i * 100 / (d.length - 1), 26 - (v - mn) / r * 24]; });
    var line = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L'); return '<svg class="hz-spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="' + line + ' L100 28 L0 28 Z"/><path class="line" d="' + line + '"/></svg>'; }

  function framed(body, b, ctx) {
    var T = b.type;
    if (T === 'chart') {
      var cfg = { labels: b.labels, height: b.height || 240, yFormat: b.unit ? function (v) { return v + ' ' + b.unit; } : undefined };
      if (b.chart === 'doughnut' || b.chart === 'pie' || b.chart === 'polar') Object.assign(cfg, { type: b.chart, data: b.series[0].data, colors: b.series[0].color ? undefined : undefined });
      else Object.assign(cfg, { type: b.chart === 'area' ? 'line' : b.chart === 'hbar' || b.chart === 'stacked' ? 'bar' : b.chart, horizontal: b.chart === 'hbar', stacked: b.chart === 'stacked', series: b.series.map(function (s) { return { label: s.label, data: s.data, color: s.color, fill: b.chart === 'area' }; }) });
      var c = document.createElement('div'); body.appendChild(c); requestAnimationFrame(function () { Charts.render(c, cfg); });
    } else if (T === 'table') {
      var d = document.createElement('div'); body.appendChild(d);
      DataTable.mount(d, { rows: b.rows.map(function (r, i) { return Object.assign({ __id: i }, r); }), rowKey: '__id', searchable: !!b.searchable, pageSize: b.pageSize || 8, maxHeight: 'none', columns: b.columns.map(function (c) {
        return { key: c.key, label: c.label, type: { badge: 'badge', progress: 'progress', mono: 'mono', number: 'number' }[c.kind] || 'text', tone: c.tones ? function (r) { return c.tones[r[c.key]] || 'neutral'; } : undefined,
          format: c.kind === 'number' && c.unit ? function (r) { return (typeof r[c.key] === 'number' ? r[c.key].toLocaleString('fr-FR') : r[c.key]) + ' ' + c.unit; } : c.kind === 'progress' ? function (r) { return r[c.key] + ' %'; } : c.kind === 'person' ? function (r) { return r[c.key]; } : undefined }; }) });
    } else if (T === 'map') {
      var mp = document.createElement('div'); body.appendChild(mp);
      UIMap.create(mp, { height: (b.height || 320) + 'px', fitBounds: true, scrollWheelZoom: false, markers: b.markers.map(function (m) { return { lat: m.lat, lng: m.lng, title: m.title || m.tooltip || '', lines: m.lines, icon: m.icon, tone: m.tone === 'danger' ? 'error' : m.tone }; }),
        polylines: (b.routes || []).map(function (r) { return { points: r.points, color: r.color || (r.tone ? getComputedStyle(document.documentElement).getPropertyValue('--' + r.tone) : undefined), dash: r.dashed ? '6 8' : undefined }; }),
        polygons: (b.zones || []).filter(function (z) { return z.polygon; }).map(function (z) { return { points: z.polygon, title: z.label, color: z.color }; }),
        circles: (b.zones || []).filter(function (z) { return z.circle; }).map(function (z) { return { center: z.circle.center, radius: z.circle.radius, title: z.label, color: z.color }; }) });
      if (b.legend) body.insertAdjacentHTML('beforeend', '<div class="hz-legend">' + b.legend.map(function (l) { return '<span><i style="background:' + tone(l.tone) + '"></i>' + esc(l.label) + '</span>'; }).join('') + '</div>');
    } else if (T === 'form') form(body, b, ctx);
    else if (T === 'records') body.innerHTML = '<ul class="hz-records">' + b.items.map(function (r) { return '<li><span class="rec-ava" style="--tone:' + tone(r.tone) + '">' + (r.icon ? '<span class="mi">' + r.icon + '</span>' : esc(r.initials || '')) + '</span><span class="rec-main"><span class="rec-title">' + esc(r.title) + '</span>' + (r.subtitle ? '<span class="rec-sub">' + esc(r.subtitle) + '</span>' : '') +
      (r.tags ? '<span class="rec-tags">' + r.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</span>' : '') + '</span><span class="rec-side">' + (r.badge ? '<span class="ui-badge ui-badge--' + badgeTone(r.badge.tone) + '">' + esc(r.badge.label) + '</span>' : '') + (r.meta ? '<span class="rec-meta">' + esc(r.meta) + '</span>' : '') + '</span></li>'; }).join('') + '</ul>';
    else if (T === 'timeline') body.innerHTML = '<ol class="hz-timeline">' + b.items.map(function (t) { return '<li style="--tone:' + tone(t.tone) + '"><span class="tl-time">' + esc(t.time) + '</span><span class="tl-dot"><span class="mi">' + (t.icon || 'circle') + '</span></span><span class="tl-main"><span class="tl-title">' + esc(t.title) + '</span>' + (t.text ? '<span class="tl-text">' + esc(t.text) + '</span>' : '') + '</span></li>'; }).join('') + '</ol>';
    else if (T === 'calendar') { var pc = document.createElement('div'); pc.className = 'hz-planning'; body.appendChild(pc); Planning.month(pc, { items: b.items, month: b.month || firstMonth(b.items), maxPerDay: 2 }); }
    else if (T === 'kanban') { var pk = document.createElement('div'); pk.className = 'hz-planning'; body.appendChild(pk); Planning.kanban(pk, { columns: b.columns, items: b.items }); }
    else if (T === 'gantt') { var pg = document.createElement('div'); pg.className = 'hz-planning'; body.appendChild(pg); Planning.gantt(pg, { items: b.items, groups: b.groups, rowLabel: 'Équipe' }); }
    else if (T === 'agenda') { var pa = document.createElement('div'); pa.className = 'hz-planning agenda'; body.appendChild(pa); Planning.agenda(pa, { items: b.items, views: ['day', 'week'], startHour: 8, endHour: 18 }); }
    else if (T === 'tree') tree(body, b.nodes, { selectable: !!b.selectable, submitLabel: b.submitLabel || 'Valider la sélection', answered: b.selected, ctx: ctx });
    else if (T === 'json') tree(body, jsonNodes(b.data, 'racine'), { mono: true });
    else if (T === 'carousel') carousel(body, b.slides);
    else if (T === 'modal') { body.innerHTML = '<div class="hz-modal-card"><p>' + esc(b.summary) + '</p><button class="ui-btn"><span class="mi">open_in_full</span>' + esc(b.button || 'Voir le détail') + '</button></div>';
      body.querySelector('button').onclick = function () { var dlg = document.createElement('dialog'); dlg.className = 'ui-dialog hz-dialog';
        dlg.innerHTML = '<div class="hz-dialog-head"><div><h3>' + esc(b.dialogTitle) + '</h3>' + (b.dialogSubtitle ? '<p>' + esc(b.dialogSubtitle) + '</p>' : '') + '</div><button class="hz-icon" aria-label="Fermer"><span class="mi">close</span></button></div><div class="hz-dialog-body hz-nested"></div>';
        document.body.appendChild(dlg); b.blocks.forEach(function (n) { dlg.querySelector('.hz-dialog-body').appendChild(widget(n)); }); dlg.showModal();
        dlg.querySelector('.hz-dialog-head button').onclick = function () { dlg.close(); }; dlg.addEventListener('close', function () { dlg.remove(); }); }; }
    else if (T === 'tabs') { body.innerHTML = '<div class="hz-tabs" role="tablist">' + b.tabs.map(function (t, i) { return '<button role="tab" class="' + (i ? '' : 'on') + '" data-i="' + i + '">' + (t.icon ? '<span class="mi">' + t.icon + '</span>' : '') + esc(t.label) + (t.badge ? '<span class="tab-badge">' + esc(t.badge) + '</span>' : '') + '</button>'; }).join('') + '</div>' + b.tabs.map(function (t, i) { return '<div class="hz-nested" data-p="' + i + '"' + (i ? ' hidden' : '') + '></div>'; }).join('');
      b.tabs.forEach(function (t, i) { var p = body.querySelector('[data-p="' + i + '"]'), done = false; function fill() { if (done) return; done = true; t.blocks.forEach(function (n) { p.appendChild(widget(n)); }); } if (!i) fill(); p._fill = fill; });
      body.querySelector('.hz-tabs').onclick = function (e) { var t = e.target.closest('button'); if (!t) return; body.querySelectorAll('.hz-tabs button').forEach(function (x) { x.classList.toggle('on', x === t); }); body.querySelectorAll('[data-p]').forEach(function (p) { p.hidden = p.dataset.p !== t.dataset.i; if (!p.hidden) p._fill(); }); }; }
    else if (T === 'accordion') b.items.forEach(function (it) { var d = html('<details class="hz-acc"' + (it.open ? ' open' : '') + '><summary>' + (it.icon ? '<span class="mi acc-ic">' + it.icon + '</span>' : '') + '<span class="acc-title">' + esc(it.title) + '</span>' + (it.subtitle ? '<span class="acc-sub">' + esc(it.subtitle) + '</span>' : '') + '<span class="mi chevron">expand_more</span></summary><div class="hz-nested"></div></details>');
      var filled = false; function fill() { if (filled) return; filled = true; it.blocks.forEach(function (n) { d.lastChild.appendChild(widget(n)); }); } if (it.open) fill(); d.addEventListener('toggle', fill); body.appendChild(d); });
    else if (T === 'upload') {
      if (b.selected) body.innerHTML = '<div class="hz-upload-done"><span class="mi">task</span><span>' + esc(b.selected) + '</span><span class="ok">Envoyé</span></div>';
      else { body.innerHTML = '<label class="hz-dropzone"><input type="file" hidden' + (b.accept ? ' accept="' + esc(b.accept) + '"' : '') + '><span class="mi">cloud_upload</span><strong>Déposez un fichier ou cliquez pour parcourir</strong><span>' + esc(b.hint || 'Le fichier reste sur votre poste : il est lu localement.') + '</span></label>' +
        '<div class="hz-samples"><span>Ou un exemple :</span>' + [['releve-octobre.csv', '42 Ko'], ['contrat-signe.pdf', '1,1 Mo'], ['photo-vehicule.jpg', '860 Ko']].map(function (f) { return '<button type="button" data-choose="' + esc(JSON.stringify({ value: 'upload', label: f[0] + ' (' + f[1] + ')' })) + '">' + f[0] + '</button>'; }).join('') + '</div>';
        var send = function (f) { if (f && !generating()) store.choose(S.id, ctx.msgId, ctx.index, { value: 'upload', label: f.name + ' (' + Math.max(1, Math.round(f.size / 1024)) + ' Ko)' }); };
        var dz = body.querySelector('.hz-dropzone'); dz.querySelector('input').onchange = function (e) { send(e.target.files[0]); };
        dz.addEventListener('dragover', function (e) { e.preventDefault(); }); dz.addEventListener('drop', function (e) { e.preventDefault(); send(e.dataTransfer.files[0]); }); bindChoose(body, ctx); }
    }
    else if (T === 'video') { var v = document.createElement('div'); body.appendChild(v); if (b.youtube) Media.youtube(v, { id: b.youtube, title: b.caption || b.title || 'Vidéo', duration: b.duration }); else withVideo(b.src, function (src) { Media.video(v, { src: src, poster: b.poster }); }); if (b.caption) body.insertAdjacentHTML('beforeend', '<p class="hz-caption">' + esc(b.caption) + '</p>'); }
    else if (T === 'videos') { body.innerHTML = '<div class="hz-videos">' + b.videos.map(function (x, i) { return '<figure data-i="' + i + '"><div></div><figcaption><strong>' + esc(x.title || '') + '</strong>' + (x.duration ? '<span>' + esc(x.duration) + '</span>' : '') + '</figcaption></figure>'; }).join('') + '</div>';
      b.videos.forEach(function (x, i) { var t = body.querySelector('[data-i="' + i + '"] div'); if (x.youtube || x.youtubeId) Media.youtube(t, { id: x.youtube || x.youtubeId, title: x.title, duration: x.duration }); else withVideo(x.src, function (src) { Media.video(t, { src: src, poster: x.poster }); }); }); }
    else if (T === 'audio') { var au = document.createElement('div'); body.appendChild(au); Media.audio(au, { variant: b.variant, tracks: b.tracks.map(function (t, i) { return { title: t.title, artist: t.artist, src: t.src || sampleAudio(t.sample || 8, i), icon: t.icon }; }) }); }
    else if (T === 'pdf') { var pd = document.createElement('div'); body.appendChild(pd); Media.pdf(pd, { src: b.src || samplePdf(b.name, b.pages), name: b.name, height: (b.height || 420) + 'px' }); }
    else if (T === 'gallery') { var imgs = (b.images && b.images.length ? b.images : sampleImages(b.sample || 6)), files = imgs.map(function (g) { return { name: g.title || g.alt || 'Photo', url: g.url || g.src, type: 'image/jpeg' }; });
      body.innerHTML = '<div class="hz-gallery ' + (b.layout || 'grid') + '">' + files.map(function (f, i) { return '<button type="button" data-i="' + i + '"><img src="' + esc(f.url) + '" alt="' + esc(f.name) + '" loading="lazy"></button>'; }).join('') + '</div>';
      body.firstChild.onclick = function (e) { var t = e.target.closest('button'); if (t) Media.viewer(files, +t.dataset.i); }; }
    else if (T === 'image') body.innerHTML = '<figure class="hz-image"><img src="' + esc(b.src) + '" alt="' + esc(b.alt || '') + '">' + (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
    else if (T === 'typography') body.innerHTML = '<div class="hz-typo">' + b.items.map(function (t) { return '<div class="hz-t-' + t.variant + '"' + (t.tone ? ' style="color:var(--' + t.tone + ')"' : '') + '><small>' + t.variant + '</small><span>' + esc(t.text) + '</span></div>'; }).join('') + '</div>';
    else if (T === 'article') body.innerHTML = UIComp.articleBody(b.blocks, { serif: b.serif, size: 'md' });
    else if (T === 'comments') { var ct = document.createElement('div'); body.appendChild(ct); UIComp.commentThread(ct, { comments: b.comments, me: { name: user.fullname }, title: b.title ? '' : 'Commentaires' }); }
    else if (T === 'qrcode') body.innerHTML = '<div class="hz-qr">' + ExW.qr(b.value, 160, b.caption) + (b.barcode ? barcode(b.barcode) : '') + '</div>';
    else if (T === 'textdiff') body.appendChild(textdiff(b));
    else if (T === 'audit') { var ad = document.createElement('div'); body.appendChild(ad); UIComp.auditLog(ad, b.entries); }
    else rich(body, b);
  }
  function badgeTone(t) { return t === 'primary' || t === 'purple' ? 'info' : t || 'neutral'; }
  function firstMonth(items) { var d = items.map(function (i) { return i.start || i.due; }).filter(Boolean).sort()[0]; return d ? String(d).slice(0, 7) + '-01' : undefined; }

  /* ── Widgets « riches » (précision) ─────────────────────── */
  function rich(body, b) {
    var T = b.type, h = '';
    if (T === 'steps') h = '<ol class="hz-stepper">' + b.steps.map(function (s, i) { return '<li class="' + s.status + '"><span class="st-dot">' + (s.status === 'done' ? '<span class="mi">check</span>' : s.status === 'error' ? '<span class="mi">close</span>' : i + 1) + '</span><span class="st-main"><strong>' + esc(s.label) + '</strong>' + (s.text ? '<small>' + esc(s.text) + '</small>' : '') + '</span></li>'; }).join('') + '</ol>';
    else if (T === 'keyvalue') h = '<dl class="hz-kv">' + b.items.map(function (p) { return '<div><dt>' + (p.icon ? '<span class="mi">' + p.icon + '</span>' : '') + esc(p.label) + '</dt><dd' + (p.tone ? ' style="color:var(--' + p.tone + ')"' : '') + '>' + (p.mono ? '<code>' + esc(p.value) + '</code>' : esc(p.value)) + (p.copy ? '<button type="button" class="hz-icon mini" data-copy="' + esc(p.value) + '" aria-label="Copier"><span class="mi">content_copy</span></button>' : '') + '</dd></div>'; }).join('') + '</dl>';
    else if (T === 'checklist') h = '<ul class="hz-checklist">' + b.items.map(function (c) { return '<li class="' + (c.done ? 'done' : '') + '"><label><input type="checkbox"' + (c.done ? ' checked' : '') + '><span><strong>' + esc(c.label) + '</strong>' + (c.hint ? '<small>' + esc(c.hint) + '</small>' : '') + '</span></label></li>'; }).join('') + '</ul>';
    else if (T === 'progress') h = '<div class="hz-meters">' + b.items.map(function (m) { var max = m.target || 100, p = Math.min(100, m.value / max * 100); return '<div class="hz-meter" style="--tone:' + tone(m.tone || (p >= 100 ? 'success' : 'primary')) + '"><div class="m-top"><span>' + esc(m.label) + '</span><strong>' + m.value.toLocaleString('fr-FR') + (m.unit ? ' ' + esc(m.unit) : '') + (m.target ? ' <small>/ ' + m.target.toLocaleString('fr-FR') + '</small>' : '') + '</strong></div><div class="m-bar"><i style="width:' + p + '%"></i></div></div>'; }).join('') + '</div>';
    else if (T === 'diff') h = '<div class="hz-diff"><div class="d-file"><span class="mi">description</span>' + esc(b.file) + '</div><pre>' + b.patch.split('\n').map(function (l) { return '<span class="' + (l[0] === '+' ? 'add' : l[0] === '-' ? 'del' : l.indexOf('@@') === 0 ? 'hunk' : '') + '">' + esc(l) + '</span>'; }).join('\n') + '</pre></div>';
    else if (T === 'sources') h = '<ol class="hz-sources">' + b.items.map(function (s, i) { return '<li><span class="src-n">' + (i + 1) + '</span><div><strong>' + esc(s.title) + '</strong><small>' + esc(s.site) + (s.date ? ' · ' + esc(s.date) : '') + '</small>' + (s.snippet ? '<p>' + esc(s.snippet) + '</p>' : '') + '</div></li>'; }).join('') + '</ol>';
    else if (T === 'tags') h = '<div class="hz-tags">' + b.items.map(function (t) { return '<span style="--tone:' + tone(t.tone) + '">' + esc(t.label) + (t.count != null ? '<b>' + t.count + '</b>' : '') + '</span>'; }).join('') + '</div>';
    else if (T === 'heatmap') { var all = [].concat.apply([], b.values), mx = Math.max.apply(0, all) || 1;
      h = '<div class="hz-heat" style="grid-template-columns:auto repeat(' + b.cols.length + ',minmax(0,1fr))"><span></span>' + b.cols.map(function (c) { return '<span class="hc">' + esc(c) + '</span>'; }).join('') + b.rows.map(function (r, i) { return '<span class="hr">' + esc(r) + '</span>' + b.values[i].map(function (v) { return '<span class="cell" title="' + esc(r) + ' · ' + v + (b.unit ? ' ' + b.unit : '') + '" style="--a:' + (0.08 + v / mx * 0.92).toFixed(2) + '">' + v + '</span>'; }).join(''); }).join('') + '</div>'; }
    else if (T === 'files') h = '<ul class="hz-files">' + b.items.map(function (f) { return '<li><img src="../assets/icons-files/' + fileIcon(f.ext) + '.png" alt=""><span class="f-main"><strong>' + esc(f.name) + '</strong><small>' + esc(f.size) + (f.date ? ' · ' + esc(f.date) : '') + (f.by ? ' · ' + esc(f.by) : '') + '</small></span><button type="button" class="hz-icon mini" aria-label="Télécharger"><span class="mi">download</span></button></li>'; }).join('') + '</ul>';
    else if (T === 'cards') h = '<div class="hz-cards">' + b.items.map(function (c) { return '<article class="hz-card" style="--tone:' + tone(c.tone) + '">' + (c.image ? '<img src="' + esc(c.image) + '" alt="">' : c.icon ? '<span class="c-ic"><span class="mi">' + c.icon + '</span></span>' : '') + '<strong>' + esc(c.title) + '</strong>' + (c.text ? '<p>' + esc(c.text) + '</p>' : '') +
      (c.tags ? '<div class="rec-tags">' + c.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '') + '<div class="c-foot">' + (c.price ? '<b>' + esc(c.price) + '</b>' : '') + (c.meta ? '<small>' + esc(c.meta) + '</small>' : '') + (c.cta ? '<button class="ui-btn ui-btn--tonal ui-btn--sm">' + esc(c.cta) + '</button>' : '') + '</div></article>'; }).join('') + '</div>';
    else if (T === 'compare') h = '<div class="hz-compare-wrap"><table class="hz-compare"><thead><tr><th></th>' + b.plans.map(function (p) { return '<th class="' + (p.recommended ? 'rec' : '') + '">' + (p.recommended ? '<span class="rec-tag">Recommandé</span>' : '') + '<strong>' + esc(p.name) + '</strong>' + (p.price ? '<b>' + esc(p.price) + '</b>' : '') + (p.note ? '<small>' + esc(p.note) + '</small>' : '') + '</th>'; }).join('') + '</tr></thead><tbody>' +
      b.features.map(function (f) { return '<tr><td>' + esc(f.label) + '</td>' + f.values.map(function (v, i) { return '<td class="' + (b.plans[i] && b.plans[i].recommended ? 'rec' : '') + '">' + (v === true ? '<span class="mi ok">check</span>' : v === false ? '<span class="mi ko">remove</span>' : esc(v)) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    else h = '<pre class="hz-raw">' + esc(JSON.stringify(b, null, 2)) + '</pre>';
    body.innerHTML = h;
  }
  function fileIcon(ext) { ext = String(ext).toLowerCase(); return { xlsx: 'xls', xls: 'xls', csv: 'csv', pdf: 'pdf', png: 'png', jpg: 'jpg', jpeg: 'jpg', zip: 'rar-file', rar: 'rar-file', pptx: 'ppt', ppt: 'ppt', txt: 'txt', md: 'txt', json: 'js', js: 'js', ts: 'js', mp4: 'mp4', mov: 'mov', mp3: 'mp3', svg: 'svg', sql: 'sql', html: 'html', css: 'css', gif: 'gif' }[ext] || 'other'; }

  /* ── Arbre (sélection / JSON) ───────────────────────────── */
  function jsonNodes(v, label, path) {
    path = path || 'r';
    if (v && typeof v === 'object') { var keys = Object.keys(v); return [{ id: path, label: label, icon: Array.isArray(v) ? 'data_array' : 'data_object', meta: Array.isArray(v) ? v.length + ' éléments' : keys.length + ' clés', children: [].concat.apply([], keys.map(function (k) { return jsonNodes(v[k], Array.isArray(v) ? '[' + k + ']' : k, path + '.' + k); })) }]; }
    return [{ id: path, label: label, meta: typeof v === 'string' ? '"' + v + '"' : String(v), icon: typeof v === 'number' ? 'tag' : typeof v === 'boolean' ? 'toggle_on' : 'text_fields' }];
  }
  function tree(body, nodes, o) {
    var open = new Set(), sel = new Set();
    (function seed(ns, d) { ns.forEach(function (n) { if (n.children && d < 1) { open.add(n.id); seed(n.children, d + 1); } }); })(nodes, 0);
    function draw() {
      function row(n, d) { var kids = n.children && n.children.length, isOpen = open.has(n.id);
        return '<li><div class="tr-row' + (sel.has(n.id) ? ' on' : '') + '" style="padding-left:' + (8 + d * 18) + 'px">' + (kids ? '<button type="button" class="tr-tg" data-tg="' + n.id + '" aria-label="Déplier"><span class="mi">' + (isOpen ? 'expand_more' : 'chevron_right') + '</span></button>' : '<span class="tr-sp"></span>') +
          (o.selectable && !o.answered ? '<input type="checkbox" data-sel="' + n.id + '"' + (sel.has(n.id) ? ' checked' : '') + ' aria-label="' + esc(n.label) + '">' : '') + '<span class="mi tr-ic">' + (n.icon || (kids ? (isOpen ? 'folder_open' : 'folder') : 'description')) + '</span><span class="tr-label">' + esc(n.label) + '</span>' +
          (n.badge ? '<span class="ui-badge ui-badge--' + badgeTone(n.badge.tone) + '">' + esc(n.badge.label) + '</span>' : '') + (n.meta ? '<span class="tr-meta">' + esc(n.meta) + '</span>' : '') + '</div>' + (kids && isOpen ? '<ul>' + n.children.map(function (c) { return row(c, d + 1); }).join('') + '</ul>' : '') + '</li>'; }
      body.innerHTML = '<ul class="hz-tree' + (o.mono ? ' mono' : '') + '">' + nodes.map(function (n) { return row(n, 0); }).join('') + '</ul>' +
        (o.selectable ? (o.answered ? '<div class="hz-upload-done"><span class="mi">check_circle</span><span>' + esc(o.answered) + '</span></div>' : '<div class="hz-tree-foot"><span>' + sel.size + ' sélectionné' + (sel.size > 1 ? 's' : '') + '</span><button class="ui-btn ui-btn--sm"' + (sel.size ? '' : ' disabled') + '>' + esc(o.submitLabel) + '</button></div>') : '');
    }
    function labelOf(id, ns) { for (var i = 0; i < ns.length; i++) { if (ns[i].id === id) return ns[i].label; var r = ns[i].children && labelOf(id, ns[i].children); if (r) return r; } }
    body.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tg]'); if (t) { open.has(t.dataset.tg) ? open.delete(t.dataset.tg) : open.add(t.dataset.tg); draw(); return; }
      var s = e.target.closest('[data-sel]'); if (s) { s.checked ? sel.add(s.dataset.sel) : sel.delete(s.dataset.sel); draw(); return; }
      if (e.target.closest('.hz-tree-foot button') && !generating()) store.choose(S.id, o.ctx.msgId, o.ctx.index, { value: 'tree', label: 'Sélection : ' + Array.from(sel).map(function (id) { return labelOf(id, nodes); }).join(', ') });
    });
    draw();
  }

  function carousel(body, slides) {
    var i = 0;
    function draw() { var s = slides[i];
      body.innerHTML = '<div class="hz-carousel"><div class="hz-slide" style="--tone:' + tone(s.tone) + '">' + (s.image ? '<img src="' + esc(s.image) + '" alt="">' : '<span class="sl-ic"><span class="mi">' + (s.icon || 'auto_awesome') + '</span></span>') + '<div class="sl-text">' + (s.tag ? '<span class="sl-tag">' + esc(s.tag) + '</span>' : '') + '<strong>' + esc(s.title) + '</strong>' + (s.text ? '<p>' + esc(s.text) + '</p>' : '') +
        (s.stats ? '<div class="sl-stats">' + s.stats.map(function (x) { return '<span><b>' + esc(x.value) + '</b>' + esc(x.label) + '</span>'; }).join('') + '</div>' : '') + '</div></div><div class="hz-car-nav"><button class="hz-icon" data-d="-1" aria-label="Précédente"><span class="mi">chevron_left</span></button><span class="dots">' + slides.map(function (_, k) { return '<i class="' + (k === i ? 'on' : '') + '" data-k="' + k + '"></i>'; }).join('') + '</span><button class="hz-icon" data-d="1" aria-label="Suivante"><span class="mi">chevron_right</span></button></div></div>'; }
    body.addEventListener('click', function (e) { var d = e.target.closest('[data-d]'), k = e.target.closest('[data-k]'); if (d) i = (i + +d.dataset.d + slides.length) % slides.length; else if (k) i = +k.dataset.k; else return; draw(); });
    draw();
  }

  function textdiff(b) {
    var a = b.before.split('\n'), c = b.after.split('\n'), out = [], n = a.length, m = c.length, dp = [];
    for (var i = n; i >= 0; i--) { dp[i] = []; for (var j = m; j >= 0; j--) dp[i][j] = i === n || j === m ? 0 : a[i] === c[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]); }
    i = 0; j = 0; while (i < n || j < m) { if (i < n && j < m && a[i] === c[j]) { out.push([' ', a[i]]); i++; j++; } else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) { out.push(['+', c[j]]); j++; } else { out.push(['-', a[i]]); i++; } }
    var el = document.createElement('div'); el.className = 'hz-diff';
    el.innerHTML = '<pre>' + out.map(function (l) { return '<span class="' + (l[0] === '+' ? 'add' : l[0] === '-' ? 'del' : '') + '">' + l[0] + ' ' + esc(l[1]) + '</span>'; }).join('\n') + '</pre>';
    return el;
  }
  function barcode(v) { var x = 0, bars = ''; String(v).split('').forEach(function (ch) { var code = ch.charCodeAt(0); for (var k = 0; k < 7; k++) { var w = (code >> k & 1) + 1; if (k % 2 === 0) bars += '<rect x="' + x + '" y="0" width="' + w + '" height="50"/>'; x += w; } x += 2; });
    return '<figure style="margin:0;display:flex;flex-direction:column;align-items:center;gap:6px"><svg width="' + Math.min(260, x * 1.4) + '" height="60" viewBox="0 0 ' + x + ' 50" preserveAspectRatio="none" fill="currentColor">' + bars + '</svg><figcaption class="mono" style="font-size:12px">' + esc(v) + '</figcaption></figure>'; }

  /* ── Médias d'exemple générés localement ───────────────── */
  var audioCache = {};
  function sampleAudio(sec, k) {
    var key = sec + ':' + k; if (audioCache[key]) return audioCache[key];
    var rate = 8000, n = rate * sec, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf), notes = [261.6, 329.6, 392, 523.3, 440, 349.2];
    function s(o, t) { for (var i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); }
    s(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); s(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); s(36, 'data'); v.setUint32(40, n * 2, true);
    for (var i = 0; i < n; i++) { var t = i / rate, f = notes[(Math.floor(t * 2) + k) % notes.length], env = Math.min(1, (t * 2 % 1) * 20) * (1 - (t * 2 % 1)) * 0.3; v.setInt16(44 + i * 2, Math.sin(2 * Math.PI * f * t) * env * 32767, true); }
    return (audioCache[key] = URL.createObjectURL(new Blob([buf], { type: 'audio/wav' })));
  }
  // Vidéo d'exemple : courte animation enregistrée localement (canvas + MediaRecorder), mise en cache.
  var videoP;
  function withVideo(src, cb) {
    if (src) return cb(src);
    if (!videoP) videoP = new Promise(function (res) {
      try {
        var c = document.createElement('canvas'); c.width = 640; c.height = 360; var g = c.getContext('2d'), rec = new MediaRecorder(c.captureStream(30), { mimeType: MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : '' }), chunks = [], t0 = performance.now();
        rec.ondataavailable = function (e) { chunks.push(e.data); }; rec.onstop = function () { res(URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }))); };
        (function frame() { var t = (performance.now() - t0) / 1000; g.fillStyle = '#0f766e'; g.fillRect(0, 0, 640, 360); g.fillStyle = '#f59e0b'; g.beginPath(); g.arc(80 + (t / 3) * 480, 180 + Math.sin(t * 4) * 60, 34, 0, 7); g.fill(); g.fillStyle = '#fff'; g.font = '600 28px sans-serif'; g.fillText('Vidéo d\u2019exemple · ' + t.toFixed(1) + ' s', 24, 48); if (t < 3) requestAnimationFrame(frame); else rec.stop(); })();
        rec.start();
      } catch (e) { res(''); }
    });
    videoP.then(cb);
  }
  // PDF d'exemple minimal généré à la volée.
  function samplePdf(name, pages) {
    pages = Math.min(pages || 2, 6); var objs = ['<< /Type /Catalog /Pages 2 0 R >>', null, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'], kids = [];
    for (var i = 0; i < pages; i++) { var txt = 'BT /F1 28 Tf 72 720 Td (' + String(name || 'Document').replace(/[()\\]/g, '').replace(/[^\x20-\x7e]/g, '?') + ') Tj 0 -40 Td /F1 16 Tf (Page ' + (i + 1) + ' sur ' + pages + ' - exemple du UI Kit) Tj ET';
      objs.push('<< /Length ' + txt.length + ' >>\nstream\n' + txt + '\nendstream'); objs.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ' + objs.length + ' 0 R /Resources << /Font << /F1 3 0 R >> >> >>'); kids.push(objs.length + ' 0 R'); }
    objs[1] = '<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + pages + ' >>';
    var out = '%PDF-1.4\n', offs = []; objs.forEach(function (o, i) { offs.push(out.length); out += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
    var x = out.length; out += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(function (o) { return ('000000000' + o).slice(-10) + ' 00000 n \n'; }).join('') + 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + x + '\n%%EOF';
    return URL.createObjectURL(new Blob([out], { type: 'application/pdf' }));
  }
  function sampleImages(n) { var pics = ['../assets/bg.jpg', '../assets/camion.png']; return Array.from({ length: n }, function (_, i) { return { url: pics[i % pics.length], title: 'Photo ' + (i + 1) }; }); }

  /* ── Formulaires posés par l'agent ──────────────────────── */
  function form(body, b, ctx) {
    var vals = {}, done = !!b.values, src = b.values || {};
    b.fields.forEach(function (f) { vals[f.key] = src[f.key] !== undefined ? src[f.key] : f.value !== undefined ? f.value : ['multiselect', 'chips', 'tags', 'transfer'].indexOf(f.kind) >= 0 || (f.kind === 'treeselect' && f.multiple) ? [] : ['checkbox', 'toggle'].indexOf(f.kind) >= 0 ? false : f.kind === 'range' ? [f.min || 0, f.max || 100] : null; });
    function opts(f) { return f.options || []; }
    function flat(os) { return [].concat.apply([], os.map(function (o) { return [o].concat(o.children ? flat(o.children) : []); })); }
    function input(f) {
      var v = vals[f.key], dis = done ? ' disabled' : '', ph = f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '', k = f.kind, id = 'hzf-' + ctx.msgId + '-' + ctx.index + '-' + f.key, val = v == null ? '' : esc(v);
      var box = function (inner, icon) { return '<div class="field-box">' + (icon || f.icon ? '<span class="mi">' + (icon || f.icon) + '</span>' : '') + inner + '</div>'; };
      switch (k) {
        case 'textarea': case 'richtext': case 'markdown': return '<div class="field-box textarea-box"><textarea id="' + id + '" data-k="' + f.key + '" rows="3"' + ph + dis + '>' + val + '</textarea></div>';
        case 'select': case 'autocomplete': return box('<select id="' + id + '" data-k="' + f.key + '"' + dis + '><option value="">' + esc(f.placeholder || 'Choisir…') + '</option>' + opts(f).map(function (o) { return '<option value="' + esc(o.value) + '"' + (v === o.value ? ' selected' : '') + '>' + esc(o.label) + '</option>'; }).join('') + '</select>');
        case 'treeselect': if (!f.multiple) return box('<select id="' + id + '" data-k="' + f.key + '"' + dis + '><option value="">Choisir…</option>' + flat(opts(f)).map(function (o) { return '<option value="' + esc(o.value) + '"' + (v === o.value ? ' selected' : '') + '>' + esc(o.label) + '</option>'; }).join('') + '</select>'); /* falls through */
        case 'multiselect': case 'chips': case 'transfer': return '<div class="hz-chips" data-multi="' + f.key + '">' + (k === 'treeselect' ? flat(opts(f)) : opts(f)).map(function (o) { return '<button type="button" class="hz-chip' + ((v || []).indexOf(o.value) >= 0 ? ' on' : '') + '" data-v="' + esc(o.value) + '"' + dis + '>' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + esc(o.label) + '</button>'; }).join('') + '</div>';
        case 'tags': return '<div class="hz-chips" data-tags="' + f.key + '">' + (v || []).map(function (t, i) { return '<span class="hz-chip on">' + esc(t) + (done ? '' : '<button type="button" data-rm="' + i + '" aria-label="Retirer"><span class="mi">close</span></button>') + '</span>'; }).join('') + (done ? '' : '<input class="hz-tag-in" placeholder="' + esc(f.placeholder || 'Ajouter…') + '" aria-label="' + esc(f.label) + '">') + '</div>';
        case 'radio': case 'segmented': return '<div class="hz-chips' + (k === 'segmented' ? ' seg' : '') + '" data-one="' + f.key + '">' + opts(f).map(function (o) { return '<button type="button" class="hz-chip' + (v === o.value ? ' on' : '') + '" data-v="' + esc(o.value) + '"' + dis + (o.disabled ? ' disabled' : '') + '>' + (o.icon ? '<span class="mi">' + o.icon + '</span>' : '') + esc(o.label) + '</button>'; }).join('') + '</div>';
        case 'checkbox': return '<label class="ui-check"><input type="checkbox" id="' + id + '" data-k="' + f.key + '"' + (v ? ' checked' : '') + dis + '>' + esc(f.placeholder || f.label) + '</label>';
        case 'toggle': return '<label class="ui-switch"><input type="checkbox" id="' + id + '" data-k="' + f.key + '"' + (v ? ' checked' : '') + dis + '>' + esc(f.placeholder || '') + '</label>';
        case 'slider': return '<div class="hz-slider"><input type="range" id="' + id + '" data-k="' + f.key + '" min="' + (f.min || 0) + '" max="' + (f.max == null ? 100 : f.max) + '" step="' + (f.step || 1) + '" value="' + (v == null ? f.min || 0 : v) + '"' + dis + '><output>' + (v == null ? f.min || 0 : v) + (f.unit ? ' ' + esc(f.unit) : '') + '</output></div>';
        case 'range': return '<div class="hz-slider two"><input type="range" data-range="' + f.key + '" data-i="0" min="' + (f.min || 0) + '" max="' + (f.max || 100) + '" step="' + (f.step || 1) + '" value="' + v[0] + '"' + dis + ' aria-label="Minimum"><input type="range" data-range="' + f.key + '" data-i="1" min="' + (f.min || 0) + '" max="' + (f.max || 100) + '" step="' + (f.step || 1) + '" value="' + v[1] + '"' + dis + ' aria-label="Maximum"><output>' + v[0] + ' – ' + v[1] + (f.unit ? ' ' + esc(f.unit) : '') + '</output></div>';
        case 'rating': return '<div class="hz-rating" data-rate="' + f.key + '">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-v="' + n + '"' + dis + ' aria-label="' + n + ' sur 5"><span class="mi">' + (v >= n ? 'star' : 'star_border') + '</span></button>'; }).join('') + '</div>';
        case 'color': return box('<input type="color" id="' + id + '" data-k="' + f.key + '" value="' + (v || '#0f766e') + '"' + dis + ' style="height:32px;padding:0;flex:0 0 48px"><span style="color:var(--text-secondary)">' + esc(v || '#0f766e') + '</span>');
        case 'otp': return '<div class="hz-otp" data-otp="' + f.key + '">' + Array.from({ length: f.length || 6 }, function (_, i) { return '<input maxlength="1" inputmode="numeric" value="' + esc((v || '')[i] || '') + '"' + dis + ' aria-label="Chiffre ' + (i + 1) + '">'; }).join('') + '</div>';
        case 'stepper': return '<div class="hz-stepper-in" data-step="' + f.key + '"><button type="button" data-d="-1"' + dis + ' aria-label="Moins"><span class="mi">remove</span></button><input type="number" data-k="' + f.key + '" value="' + (v == null ? f.min || 0 : v) + '"' + dis + ' aria-label="' + esc(f.label) + '"><button type="button" data-d="1"' + dis + ' aria-label="Plus"><span class="mi">add</span></button></div>';
        case 'currency': return box('<input type="number" id="' + id + '" data-k="' + f.key + '" value="' + val + '"' + ph + dis + '><span class="unit">' + esc(f.currency || 'FCFA') + '</span>', 'payments');
        case 'password': return box('<input type="password" id="' + id + '" data-k="' + f.key + '" value="' + val + '"' + ph + dis + ' autocomplete="new-password">', 'lock');
        case 'copy': return UIComp.copyField(String(v || f.placeholder || ''), f.icon || 'content_copy', f.label);
        case 'signature': return '<div class="hz-sig" data-sig="' + f.key + '"></div>';
        case 'file': return box('<input type="file" id="' + id + '" data-file="' + f.key + '"' + (f.accept ? ' accept="' + esc(f.accept) + '"' : '') + dis + '>', 'attach_file');
        case 'daterange': return '<div class="row-2" data-dr="' + f.key + '">' + box('<input type="date" data-i="0" value="' + esc((v || [])[0] || '') + '"' + dis + ' aria-label="Début">') + box('<input type="date" data-i="1" value="' + esc((v || [])[1] || '') + '"' + dis + ' aria-label="Fin">') + '</div>';
        case 'address': return box('<input id="' + id + '" data-k="' + f.key + '" value="' + val + '"' + ph + dis + '>', 'place');
        default: return box('<input id="' + id + '" data-k="' + f.key + '" type="' + ({ email: 'email', tel: 'tel', url: 'url', search: 'search', number: 'number', date: 'date', time: 'time' }[k] || 'text') + '" value="' + val + '"' + ph + dis + (f.min != null ? ' min="' + f.min + '"' : '') + (f.max != null ? ' max="' + f.max + '"' : '') + '>' + (f.unit ? '<span class="unit">' + esc(f.unit) + '</span>' : ''));
      }
    }
    function draw() {
      body.innerHTML = '<form class="hz-form' + (done ? ' done' : '') + '" novalidate>' + (b.description ? '<p class="hz-form-desc">' + esc(b.description) + '</p>' : '') + '<div class="hz-form-grid">' + b.fields.map(function (f) {
        return '<div class="hz-field' + (f.wide || ['textarea', 'richtext', 'markdown', 'signature', 'chips', 'multiselect', 'transfer', 'tags', 'radio', 'treeselect', 'range'].indexOf(f.kind) >= 0 ? ' wide' : '') + '"><label class="ui-label">' + esc(f.label) + (f.required ? ' <span style="color:var(--error)">*</span>' : '') + '</label>' + input(f) + (f.hint ? '<small class="ui-hint">' + esc(f.hint) + '</small>' : '') + '<small class="hz-err" hidden>Ce champ est requis.</small></div>'; }).join('') + '</div>' +
        (done ? '<div class="hz-form-sent"><span class="mi">check_circle</span>Envoyé</div>' : '<div class="hz-form-foot"><button type="reset" class="ui-btn ui-btn--text">Réinitialiser</button><button type="submit" class="ui-btn"><span class="mi">send</span>' + esc(b.submitLabel || 'Envoyer') + '</button></div>') + '</form>';
      body.querySelectorAll('[data-sig]').forEach(function (el) { ExW.signature(el, { onChange: function (url) { vals[el.dataset.sig] = url ? 'Signature apposée' : null; } }); });
    }
    draw();
    body.addEventListener('input', function (e) { var t = e.target;
      if (t.dataset.k) { var f = b.fields.find(function (x) { return x.key === t.dataset.k; }); vals[t.dataset.k] = t.type === 'checkbox' ? t.checked : t.type === 'number' || t.type === 'range' ? (t.value === '' ? null : +t.value) : t.value;
        if (t.type === 'range') t.nextElementSibling.textContent = t.value + (f.unit ? ' ' + f.unit : ''); if (t.type === 'color') t.nextElementSibling.textContent = t.value; }
      if (t.dataset.range) { var key = t.dataset.range, r = vals[key].slice(); r[+t.dataset.i] = +t.value; if (r[0] > r[1]) r.sort(function (x, y) { return x - y; }); vals[key] = r; t.parentNode.querySelector('output').textContent = r[0] + ' – ' + r[1]; }
      var otp = t.closest('[data-otp]'); if (otp) { vals[otp.dataset.otp] = Array.from(otp.querySelectorAll('input')).map(function (i) { return i.value; }).join(''); if (t.value && t.nextElementSibling) t.nextElementSibling.focus(); }
      var dr = t.closest('[data-dr]'); if (dr) vals[dr.dataset.dr] = Array.from(dr.querySelectorAll('input')).map(function (i) { return i.value; });
      if (t.dataset.file) vals[t.dataset.file] = t.files[0] ? t.files[0].name : null;
    });
    body.addEventListener('click', function (e) {
      if (done) return;
      var c = e.target.closest('[data-v]'), grp = c && c.parentNode;
      if (c && grp.dataset.multi) { var a = vals[grp.dataset.multi], i = a.indexOf(c.dataset.v); i >= 0 ? a.splice(i, 1) : a.push(c.dataset.v); c.classList.toggle('on'); }
      else if (c && grp.dataset.one) { vals[grp.dataset.one] = c.dataset.v; grp.querySelectorAll('[data-v]').forEach(function (x) { x.classList.toggle('on', x === c); }); }
      else if (c && grp.dataset.rate) { vals[grp.dataset.rate] = +c.dataset.v; grp.querySelectorAll('[data-v]').forEach(function (x) { x.firstChild.textContent = +x.dataset.v <= +c.dataset.v ? 'star' : 'star_border'; }); }
      var d = e.target.closest('[data-d]'); if (d && d.parentNode.dataset.step) { var inp = d.parentNode.querySelector('input'), f = b.fields.find(function (x) { return x.key === d.parentNode.dataset.step; }), nv = Math.min(f.max == null ? Infinity : f.max, Math.max(f.min == null ? -Infinity : f.min, (+inp.value || 0) + +d.dataset.d * (f.step || 1))); inp.value = nv; vals[f.key] = nv; }
      var rm = e.target.closest('[data-rm]'); if (rm) { var tg = rm.closest('[data-tags]'); vals[tg.dataset.tags].splice(+rm.dataset.rm, 1); draw(); }
    });
    body.addEventListener('keydown', function (e) { var t = e.target; if (t.classList.contains('hz-tag-in') && e.key === 'Enter') { e.preventDefault(); if (t.value.trim()) { vals[t.parentNode.dataset.tags].push(t.value.trim()); draw(); body.querySelector('.hz-tag-in').focus(); } } });
    body.addEventListener('reset', function (e) { e.preventDefault(); b.fields.forEach(function (f) { vals[f.key] = f.value !== undefined ? f.value : Array.isArray(vals[f.key]) ? [] : null; }); draw(); });
    body.addEventListener('submit', function (e) {
      e.preventDefault(); if (generating()) return;
      var ok = true; b.fields.forEach(function (f, i) { var v = vals[f.key], empty = v == null || v === '' || v === false || (Array.isArray(v) && !v.length); var err = body.querySelectorAll('.hz-field')[i].querySelector('.hz-err'); err.hidden = !(f.required && empty); if (f.required && empty) ok = false; });
      if (ok) store.submitForm(S.id, ctx.msgId, ctx.index, JSON.parse(JSON.stringify(vals)));
    });
  }

  /* ── Panneau droit ──────────────────────────────────────── */
  function renderSide() {
    var p = $('#hz-side-body'), arts = artifacts();
    root.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === S.tab); b.setAttribute('aria-selected', b.dataset.tab === S.tab); });
    if (S.tab === 'artifact') {
      var art = arts.find(function (a) { return a.id === S.artifactId; }) || arts[0];
      if (!art) { p.innerHTML = '<div class="hz-empty"><span class="mi">data_object</span><strong>Aucun artefact</strong><span>Le code et les documents produits apparaîtront ici.</span></div>'; return; }
      p.innerHTML = '<div class="art-bar"><div class="art-id"><span class="art-icon"><span class="mi">' + (art.kind === 'code' ? 'data_object' : 'article') + '</span></span><div class="art-text">' + (arts.length > 1 ? '<select class="art-switch" aria-label="Artefact">' + arts.map(function (a) { return '<option value="' + a.id + '"' + (a === art ? ' selected' : '') + '>' + esc(a.title) + '</option>'; }).join('') + '</select>' : '<span class="art-title">' + esc(art.title) + '</span>') +
        '<span class="art-sub">Version ' + art.version + ' · ' + art.lang + '</span></div></div><div class="hz-seg"><button type="button" data-view="code" class="' + (S.artView === 'code' ? 'on' : '') + '">Code</button><button type="button" data-view="preview" class="' + (S.artView === 'preview' ? 'on' : '') + '">Aperçu</button></div></div>' +
        (S.artView === 'code' ? '<div class="hz-src"><pre><code>' + art.content.split('\n').map(function (l, i) { return '<span class="ln">' + (i + 1) + '</span><span class="lc">' + esc(l) + '</span>'; }).join('\n') + '</code></pre></div>'
          : art.kind === 'code' ? '<div class="hz-preview"><div class="pv-frame"><div class="pv-rail">' + ['dashboard', 'groups', 'local_shipping', 'receipt_long', 'build', 'settings'].map(function (ic, i) { return '<span class="pv-ic' + (i === 4 ? ' on' : '') + '"><span class="mi">' + ic + '</span></span>'; }).join('') + '</div><div class="pv-panel"><div class="pv-head"><span class="pv-box"><span class="mi">build</span></span>Intervention</div><span class="pv-item on">Tableau de bord</span><span class="pv-item">Missions</span><span class="pv-item">Interventions programmées</span><span class="pv-item">Équipe technique</span></div></div><p class="pv-caption">Rendu du Sidecar ouvert sur le module « Intervention ».</p></div>'
          : '<article class="hz-doc">' + esc(art.content) + '</article>') +
        '<div class="art-actions"><button class="ui-btn ui-btn--outlined" data-copy="' + esc(art.content) + '"><span class="mi">content_copy</span>Copier</button><span class="spacer"></span><button class="ui-btn" data-download="' + art.id + '"><span class="mi">download</span>Télécharger</button></div>';
      var sw = p.querySelector('.art-switch'); if (sw) sw.onchange = function () { S.artifactId = sw.value; renderSide(); };
    } else if (S.tab === 'context') {
      var files = D.HARNAIS_CONTEXT, ft = files.reduce(function (s, f) { return s + f.tokens; }, 0), c = active(), chat = c ? c.messages.length * 650 : 0, used = ft + chat, lim = D.HARNAIS_CONTEXT_LIMIT, pct = Math.round(used / lim * 100);
      p.innerHTML = '<section class="hz-sc"><div class="sc-title"><span class="mi">memory</span>Fenêtre de contexte</div><div class="usage"><strong>' + used.toLocaleString('fr-FR') + '</strong><span>/ ' + lim.toLocaleString('fr-FR') + ' tokens</span><span class="pct">' + pct + ' %</span></div><div class="hz-bar"><i style="width:' + (ft / lim * 100) + '%"></i><i class="chat" style="width:' + (chat / lim * 100) + '%"></i></div><div class="legend"><span><i class="dot"></i>Fichiers</span><span><i class="dot chat"></i>Conversation</span></div></section>' +
        '<div class="hz-sl">Fichiers chargés · ' + files.length + '</div><ul class="hz-ctx">' + files.map(function (f) { return '<li><span class="f-icon"><span class="mi">' + KIND_ICONS[f.kind] + '</span></span><span class="f-text"><span class="f-name">' + esc(f.name) + '</span><span class="f-path">' + esc(f.path) + '</span></span><span class="f-tokens">' + (f.tokens / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' k</span></li>'; }).join('') + '</ul>';
    } else {
      var tasks = D.HARNAIS_TASKS, dn = tasks.filter(function (t) { return t.status === 'done'; }).length;
      p.innerHTML = '<section class="hz-sc"><div class="sc-title"><span class="mi">flag</span>Plan de l’agent</div><div class="usage"><strong>' + dn + '</strong><span>/ ' + tasks.length + ' étapes terminées</span></div><div class="hz-bar"><i style="width:' + dn / tasks.length * 100 + '%"></i></div></section>' +
        '<ol class="hz-tasks">' + tasks.map(function (t) { return '<li class="' + t.status + '"><span class="mi">' + { done: 'check_circle', running: 'pending', todo: 'radio_button_unchecked' }[t.status] + '</span><span>' + esc(t.label) + '</span>' + (t.status === 'running' ? '<span class="tag">En cours</span>' : '') + '</li>'; }).join('') + '</ol>';
    }
  }

  /* ── Zone de saisie ─────────────────────────────────────── */
  var composer = (function () {
    var el = html('<div class="hz-composer"><div class="hz-att-chips"></div><textarea class="hz-field" rows="1" aria-label="Message"></textarea><div class="hz-bar-row">' +
      '<div class="hz-menu-wrap"><button type="button" class="hz-icon tool" data-menu="attach" title="Joindre un fichier" aria-label="Joindre un fichier"><span class="mi">add</span></button><div class="hz-menu" data-for="attach" hidden></div></div>' +
      '<div class="hz-menu-wrap"><button type="button" class="hz-icon tool" data-menu="tools" title="Outils" aria-label="Outils"><span class="mi">tune</span></button><div class="hz-menu" data-for="tools" hidden></div></div>' +
      '<span class="hz-pills"></span><span class="spacer"></span><div class="hz-menu-wrap"><button type="button" class="hz-model-btn" data-menu="model"><span></span><span class="mi">expand_more</span></button><div class="hz-menu right" data-for="model" hidden></div></div><button type="button" class="hz-send" aria-label="Envoyer"><span class="mi">arrow_upward</span></button></div></div>');
    var ta = el.querySelector('textarea');
    function model() { var c = active(); return c ? c.model : S.draftModel; }
    function autosize() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 240) + 'px'; }
    function update(ph) {
      if (ph) ta.placeholder = ph;
      var gen = generating(), m = MODELS.find(function (x) { return x.id === model(); }) || MODELS[0];
      el.classList.toggle('busy', gen);
      el.querySelector('.hz-model-btn span').textContent = m.label;
      el.querySelector('.hz-att-chips').innerHTML = S.attachments.map(function (a) { return '<span class="hz-att"><span class="mi kind">' + KIND_ICONS[a.kind] + '</span><span class="name">' + esc(a.name) + '</span><span class="size">' + esc(a.size) + '</span><button type="button" data-detach="' + esc(a.name) + '" aria-label="Retirer"><span class="mi">close</span></button></span>'; }).join('');
      el.querySelector('.hz-pills').innerHTML = (S.thinking ? '<button type="button" class="hz-pill" data-pill="thinking"><span class="mi">psychology</span>Réflexion</button>' : '') + (S.web ? '<button type="button" class="hz-pill" data-pill="web"><span class="mi">travel_explore</span>Web</button>' : '');
      var send = el.querySelector('.hz-send'); send.classList.toggle('stop', gen); send.firstChild.textContent = gen ? 'stop' : 'arrow_upward'; send.setAttribute('aria-label', gen ? 'Arrêter la génération' : 'Envoyer');
      send.disabled = !gen && !ta.value.trim() && !S.attachments.length;
    }
    function menus(which) {
      el.querySelectorAll('.hz-menu').forEach(function (m) { m.hidden = m.dataset.for !== which || !m.hidden; });
      var m = el.querySelector('[data-for="' + which + '"]'); if (m.hidden) return;
      if (which === 'attach') m.innerHTML = '<div class="m-cap">Fichiers récents</div>' + D.HARNAIS_ATTACHABLE.map(function (f) { var on = S.attachments.some(function (a) { return a.name === f.name; }); return '<button type="button" data-attach="' + esc(f.name) + '"' + (on ? ' disabled' : '') + '><span class="mi">' + KIND_ICONS[f.kind] + '</span>' + esc(f.name) + '</button>'; }).join('') + '<hr><button type="button" disabled><span class="mi">upload_file</span>Importer depuis l’ordinateur</button>';
      if (which === 'tools') m.innerHTML = [['thinking', 'psychology', 'Réflexion étendue', 'Raisonne avant de répondre'], ['web', 'travel_explore', 'Recherche web', 'Consulte des sources récentes']].map(function (t) { return '<label class="m-toggle"><span class="mi">' + t[1] + '</span><span class="lbl"><strong>' + t[2] + '</strong><small>' + t[3] + '</small></span><span class="ui-switch"><input type="checkbox" data-opt="' + t[0] + '"' + (S[t[0]] ? ' checked' : '') + ' aria-label="' + t[2] + '"></span></label>'; }).join('');
      if (which === 'model') m.innerHTML = MODELS.map(function (x) { return '<button type="button" class="m-model" data-model="' + x.id + '"><span class="mt"><strong>' + esc(x.label) + (x.badge ? ' <span class="badge">' + esc(x.badge) + '</span>' : '') + '</strong><small>' + esc(x.description) + '</small></span>' + (x.id === model() ? '<span class="mi check">check</span>' : '') + '</button>'; }).join('');
    }
    function submit() {
      var text = ta.value.trim(); if (generating() || (!text && !S.attachments.length)) return;
      var e = { text: text, attachments: S.attachments.slice(), extendedThinking: S.thinking, webSearch: S.web };
      ta.value = ''; S.attachments = []; autosize();
      var c = active(); if (!c) { c = store.create(text, S.draftModel); S.id = c.id; history.pushState(null, '', location.pathname + '?c=' + c.id); }
      store.send(c.id, e); scrollBottom(false);
    }
    ta.addEventListener('input', function () { autosize(); update(); });
    ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); } });
    el.addEventListener('click', function (e) {
      var t = e.target.closest('button, input'); if (!t) { ta.focus(); return; }
      if (t.dataset.menu) { menus(t.dataset.menu); return; }
      if (t.dataset.attach) { S.attachments.push(D.HARNAIS_ATTACHABLE.find(function (f) { return f.name === t.dataset.attach; })); menus('attach'); update(); }
      else if (t.dataset.detach) { S.attachments = S.attachments.filter(function (a) { return a.name !== t.dataset.detach; }); update(); }
      else if (t.dataset.opt) { S[t.dataset.opt] = t.checked; update(); }
      else if (t.dataset.pill) { S[t.dataset.pill] = false; update(); }
      else if (t.dataset.model) { var c = active(); if (c) store.setModel(c.id, t.dataset.model); else S.draftModel = t.dataset.model; menus('model'); update(); }
      else if (t.classList.contains('hz-send')) { if (generating()) store.stop(); else submit(); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.hz-menu-wrap')) el.querySelectorAll('.hz-menu').forEach(function (m) { m.hidden = true; }); });
    return { el: el, update: update, fill: function (t) { ta.value = t; autosize(); update(); ta.focus(); ta.setSelectionRange(t.length, t.length); } };
  })();

  /* ── Divers ─────────────────────────────────────────────── */
  function copy(t) { try { navigator.clipboard.writeText(t); } catch (x) {} UIKit.toast('Copié dans le presse-papiers'); }
  function plain(m) { return m.blocks.map(function (b) { return b.type === 'text' || b.type === 'paragraph' ? b.text : b.type === 'list' ? b.items.map(function (i) { return '• ' + i; }).join('\n') : b.type === 'code' ? b.code : ''; }).filter(Boolean).join('\n\n'); }
  function scrollBottom(onlyIfNear) {
    requestAnimationFrame(function () { var el = $('#hz-thread'); if (!el) return; var near = el.scrollHeight - el.scrollTop - el.clientHeight < 180; if (!onlyIfNear || near) el.scrollTo({ top: el.scrollHeight, behavior: onlyIfNear ? 'smooth' : 'auto' }); });
  }
  var moreMenu;
  function showMore(btn, id) {
    if (moreMenu) moreMenu.remove(); var c = store.find(id), r = btn.getBoundingClientRect();
    moreMenu = html('<div class="hz-menu floating" style="top:' + (r.bottom + 4) + 'px;left:' + Math.max(8, r.right - 200) + 'px"><button type="button" data-pin="' + id + '"><span class="mi">push_pin</span>' + (c.pinned ? 'Désépingler' : 'Épingler') + '</button><button type="button" disabled><span class="mi">edit</span>Renommer</button><hr><button type="button" class="danger" data-del="' + id + '"><span class="mi">delete</span>Supprimer</button></div>');
    document.body.appendChild(moreMenu);
  }

  function init() {
    root = $('#harnais');
    S.id = new URLSearchParams(location.search).get('c');
    if (S.id && !store.find(S.id)) S.id = null;
    S.left = !compact();
    // Les données Angular référencent « assets/… » depuis la racine : on les rend relatives à cette page.
    fixAssets(store.conversations());
    $('#hz-me').innerHTML = '<span class="me-avatar">' + UIComp.initials(user.fullname) + '</span><span class="me-text"><span class="me-name">' + esc(user.fullname) + '</span><span class="me-role">' + esc(user.role || 'Administrateur') + '</span></span>';
    store.conversations.subscribe(function () { render(); scrollBottom(true); });
    store.generatingId.subscribe(function () { render(); });

    root.addEventListener('click', function (e) {
      var t = e.target.closest('button, a, .hz-scrim'); if (!t) return;
      var d = t.dataset;
      if (d.open) go(d.open);
      else if (d.more) { e.stopPropagation(); showMore(t, d.more); }
      else if (d.new != null || t.id === 'hz-new') go(null);
      else if (d.hideLeft != null) { S.left = false; render(); }
      else if (d.showLeft != null) { S.left = true; render(); }
      else if (t.id === 'hz-toggle-right') { S.right = !S.right; render(); }
      else if (d.closeRight != null) { S.right = false; render(); }
      else if (t.classList.contains('hz-scrim')) { if (compact()) S.left = false; if (narrow()) S.right = false; render(); }
      else if (d.tab) { S.tab = d.tab; renderSide(); }
      else if (d.view) { S.artView = d.view; renderSide(); }
      else if (d.download) { var a = D.HARNAIS_ARTIFACTS.find(function (x) { return x.id === d.download; }), u = URL.createObjectURL(new Blob([a.content], { type: 'text/plain' })), l = document.createElement('a'); l.href = u; l.download = a.title.indexOf('.') > 0 ? a.title : a.title + '.md'; l.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000); }
      else if (d.artifact) { S.artifactId = d.artifact; S.tab = 'artifact'; S.right = true; render(); }
      else if (d.suggest) composer.fill(D.HARNAIS_SUGGESTIONS[+d.suggest].prompt);
      else if (d.toggle) { S.open[d.toggle] = !S.open[d.toggle]; var c = active(); msgCache.delete(d.toggle.split(':')[0]); render(); }
      else if (d.copyMsg) { var m = active().messages.find(function (x) { return x.id === d.copyMsg; }); copy(plain(m)); }
      else if (d.fb) store.feedback(S.id, d.msg, d.fb);
      else if (d.retry != null) store.retry(S.id);
      else if (t.id === 'hz-share') copy('https://harnais.example/c/' + S.id);
      else if (t.id === 'hz-mode') { UIKit.setMode(document.documentElement.getAttribute('data-mode') === 'dark' ? 'light' : 'dark'); t.firstChild.textContent = document.documentElement.getAttribute('data-mode') === 'dark' ? 'light_mode' : 'dark_mode'; }
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-pin],[data-del]');
      if (t && t.dataset.pin) store.togglePin(t.dataset.pin);
      if (t && t.dataset.del) { var id = t.dataset.del; store.remove(id); if (S.id === id) go(null, true); UIKit.toast('Conversation supprimée'); }
      if (moreMenu && !e.target.closest('[data-more]')) { moreMenu.remove(); moreMenu = null; }
    });
    $('#hz-search').addEventListener('input', function (e) { S.q = e.target.value; renderList(); });
    document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); go(null); } });
    var lastC = compact(), lastN = narrow();
    window.addEventListener('resize', function () { var c = compact(), n = narrow(); if (c !== lastC) S.left = !c; if (n && !lastN) S.right = false; lastC = c; lastN = n; render(); });
    render(); scrollBottom(false);
  }
  window.HarnaisUI = { init: init };
})();
