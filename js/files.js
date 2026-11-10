/* ==========================================================================
   « Disque » d'exemple partagé (gestionnaire de fichiers, sélecteur en modale,
   fil d'équipe, messagerie) + navigateur de fichiers + sélecteur en modale.
   Tous les contenus sont générés localement (canvas, Web Audio, PDF minimal,
   MediaRecorder) : aucun réseau. Dépend de js/data/media.js.
   Files.ensure() · Files.items · Files.on(fn) · Files.addFiles(list, parent) · Files.browser(el, o) · Files.pick(o) → Promise
   ========================================================================== */
(function () {
  'use strict';
  var D = window.DATA;
  var KINDS = {
    folder: { label: 'Dossier', icon: 'folder', img: 'folder.png', color: '#64748b' }, image: { label: 'Image', icon: 'image', img: 'jpg.png', color: '#8b5cf6' },
    video: { label: 'Vidéo', icon: 'movie', img: 'mp4.png', color: '#ec4899' }, audio: { label: 'Audio', icon: 'audiotrack', img: 'mp3.png', color: '#f59e0b' },
    pdf: { label: 'PDF', icon: 'picture_as_pdf', img: 'pdf.png', color: '#ef4444' }, sheet: { label: 'Tableur', icon: 'table_chart', img: 'xls.png', color: '#10b981' },
    slides: { label: 'Présentation', icon: 'slideshow', img: 'ppt.png', color: '#f97316' }, doc: { label: 'Document', icon: 'description', img: 'txt.png', color: '#3b82f6' },
    text: { label: 'Texte', icon: 'article', img: 'csv.png', color: '#0ea5e9' }, archive: { label: 'Archive', icon: 'folder_zip', img: 'rar-file.png', color: '#78716c' }
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function size(n) { return n ? D.formatBytes(n) : '—'; }
  function kindOf(name, mime) {
    mime = mime || ''; var ext = (name.split('.').pop() || '').toLowerCase();
    if (mime.indexOf('image/') === 0) return 'image'; if (mime.indexOf('video/') === 0) return 'video'; if (mime.indexOf('audio/') === 0) return 'audio';
    if (mime === 'application/pdf' || ext === 'pdf') return 'pdf'; if (/^(xlsx?|ods|numbers)$/.test(ext)) return 'sheet'; if (/^(pptx?|odp|key)$/.test(ext)) return 'slides';
    if (/^(docx?|odt|rtf|pages)$/.test(ext)) return 'doc'; if (/^(zip|rar|7z|tar|gz)$/.test(ext)) return 'archive';
    if (mime.indexOf('text/') === 0 || /^(txt|csv|json|md|log)$/.test(ext)) return 'text'; return 'doc';
  }
  var dt = function (days, h) { return new Date(2026, 9, 17 - days, h || 10, (days * 13) % 60); };
  var seq = 0, built = false, subs = [];
  var F = { items: [], quota: 15 * Math.pow(1024, 3), KINDS: KINDS, size: size, kindOf: kindOf, root: '' };
  function id() { return 'f' + (++seq); }
  function emit() { subs.forEach(function (fn) { fn(F.items); }); }
  function dataUrlToBlob(url) {
    var p = url.split(','), mime = (/:(.*?);/.exec(p[0]) || [])[1] || 'image/jpeg', bin = atob(p[1]), arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); return new Blob([arr], { type: mime });
  }

  F.on = function (fn) { subs.push(fn); return function () { subs = subs.filter(function (x) { return x !== fn; }); }; };
  F.ensure = function () {
    if (built) return; built = true;
    var f = function (i, name, parent, color, days, extra) { return Object.assign({ id: i, name: name, kind: 'folder', parent: parent, size: 0, modified: dt(days), owner: 'Jean Kouassi', color: color }, extra); };
    var blobItem = function (name, parent, blob, days, owner, extra) { return Object.assign({ id: id(), name: name, kind: kindOf(name, blob.type), parent: parent, size: blob.size, modified: dt(days), owner: owner, mime: blob.type, blob: blob, url: URL.createObjectURL(blob) }, extra); };
    var ghost = function (name, parent, sz, days, owner, extra) { return Object.assign({ id: id(), name: name, kind: kindOf(name), parent: parent, size: sz, modified: dt(days), owner: owner }, extra); };
    var photos = D.buildSampleImageSet(10);
    var csv = new Blob(['Client;Ville;CA (FCFA)\nSotra Logistique;Abidjan;10000000\nCacao Plus;Yamoussoukro;121250000\nBanque Lagune;San Pedro;43750000\n'], { type: 'text/csv' });
    var notes = new Blob(['Compte rendu — atelier produit du 14 octobre\n\n1. Priorité : planning terrain\n2. Mode hors ligne à cadrer\n3. Revue des jetons de couleur\n'], { type: 'text/plain' });
    F.items = [
      f('docs', 'Documents', null, '#3b82f6', 1), f('contracts', 'Contrats', 'docs', '#3b82f6', 3, { shared: true }), f('invoices', 'Factures 2026', 'docs', '#10b981', 0),
      f('photos', 'Photos terrain', null, '#8b5cf6', 2, { starred: true }), f('media', 'Médias', null, '#ec4899', 4), f('sotra', 'Projet Sotra', null, '#f59e0b', 1, { shared: true, starred: true }),
      blobItem('Contrat cadre 2026.pdf', 'contracts', D.buildSamplePdf('Contrat cadre 2026', 4), 3, 'Fatou Diabaté', { starred: true, shared: true }),
      blobItem('Avenant n°2 — Cacao Plus.pdf', 'contracts', D.buildSamplePdf('Avenant n°2', 2), 12, 'Fatou Diabaté'),
      blobItem('FAC-2026-0981.pdf', 'invoices', D.buildSamplePdf('Facture FAC-2026-0981', 1), 0, 'Jean Kouassi'),
      blobItem('FAC-2026-0974.pdf', 'invoices', D.buildSamplePdf('Facture FAC-2026-0974', 1), 5, 'Jean Kouassi'),
      ghost('Relevé septembre.xlsx', 'invoices', 184320, 9, 'Fatou Diabaté'),
      blobItem('Clients actifs.csv', 'docs', csv, 1, 'Aïcha Diallo'), blobItem('Compte rendu atelier.txt', 'docs', notes, 2, 'Grace Kouamé', { shared: true }),
      ghost('Présentation T4.pptx', 'docs', 4812000, 6, 'Ibrahim Sanogo'), ghost('Procédure d’installation.docx', 'docs', 642000, 20, 'Marc Yao')
    ].concat(photos.slice(0, 7).map(function (p, i) { var it = blobItem(p.name, 'photos', dataUrlToBlob(p.url), i, i % 2 ? 'Aya Koné' : 'Marc Yao'); it.name = p.caption.replace(/[—–]/g, '-') + '.jpg'; return it; }))
      .concat(photos.slice(7, 10).map(function (p, i) { var it = blobItem(p.name, 'sotra', dataUrlToBlob(p.url), i + 1, 'Aya Koné'); it.name = 'Quai ' + (i + 2) + ' - Vridi.jpg'; return it; }))
      .concat([
        blobItem('Message vocal - technicien.wav', 'media', D.buildSampleWav(8, 2), 1, 'Koffi N’Guessan'), blobItem('Appel client - Transports Yao.wav', 'media', D.buildSampleWav(12, 0), 6, 'Support'),
        ghost('Archives 2025.zip', 'media', 412000000, 40, 'Jean Kouassi'),
        blobItem('Planning de déploiement.pdf', 'sotra', D.buildSamplePdf('Planning de déploiement Sotra', 3), 1, 'Jean Kouassi', { shared: true }),
        ghost('Budget Sotra.xlsx', 'sotra', 96256, 2, 'Ibrahim Sanogo', { starred: true }),
        blobItem('Rapport mensuel.pdf', null, D.buildSamplePdf('Rapport mensuel — septembre', 5), 4, 'Jean Kouassi')
      ]);
    // La vidéo s'enregistre en tâche de fond (MediaRecorder) puis rejoint « Médias ».
    try {
      Promise.resolve(D.recordSampleVideo(5, 640, 360, { title: 'Trajet CI-4521-AB' })).then(function (blob) {
        if (!blob) return; F.items.push(blobItem('Trajet CI-4521-AB.webm', 'media', blob, 0, 'Marc Yao', { starred: true })); emit();
      }).catch(function () {});
    } catch (e) {}
  };
  F.addFiles = function (files, parent) {
    var added = Array.prototype.map.call(files, function (file) { return { id: id(), name: file.name, kind: kindOf(file.name, file.type), parent: parent, size: file.size, modified: new Date(), owner: 'Jean Kouassi', mime: file.type, blob: file, url: URL.createObjectURL(file) }; });
    F.items = F.items.concat(added); emit(); return added;
  };
  F.createFolder = function (name, parent) { var x = { id: id(), name: name, kind: 'folder', parent: parent, size: 0, modified: new Date(), owner: 'Jean Kouassi', color: '#64748b' }; F.items.push(x); emit(); return x; };
  F.patch = function (i, p) { var x = F.get(i); if (x) Object.assign(x, p); emit(); };
  F.remove = function (ids) {
    var all = new Set(ids), grew = true;
    while (grew) { grew = false; F.items.forEach(function (i) { if (i.parent && all.has(i.parent) && !all.has(i.id)) { all.add(i.id); grew = true; } }); }
    F.items = F.items.filter(function (i) { return !all.has(i.id); }); emit();
  };
  F.get = function (i) { return i ? F.items.find(function (x) { return x.id === i; }) : undefined; };
  F.children = function (p) { return F.items.filter(function (i) { return i.parent === p; }); };
  F.path = function (i) { var out = []; for (var c = F.get(i); c; c = F.get(c.parent)) out.unshift(c); return out; };
  F.folderStats = function (i) { return F.children(i).reduce(function (a, k) { if (k.kind !== 'folder') return { count: a.count + 1, size: a.size + k.size }; var s = F.folderStats(k.id); return { count: a.count + 1, size: a.size + s.size }; }, { count: 0, size: 0 }); };
  F.used = function () { return F.items.reduce(function (s, i) { return s + i.size; }, 0) + 6.2 * Math.pow(1024, 3); };
  F.usageByKind = function () {
    var by = {}; F.items.forEach(function (i) { if (i.kind !== 'folder') by[i.kind] = (by[i.kind] || 0) + i.size; });
    var base = { image: 2.1, video: 2.6, pdf: 0.9, audio: 0.3, sheet: 0.2, archive: 0.1 };
    return Object.keys(base).map(function (k) { return Object.assign({ kind: k, bytes: base[k] * Math.pow(1024, 3) + (by[k] || 0) }, KINDS[k]); });
  };
  F.toViewer = function (items) { return items.filter(function (i) { return i.kind !== 'folder'; }).map(function (i) { return { name: i.name, url: i.url || '', type: i.mime, size: i.size, blob: i.blob }; }); };
  F.thumb = function (f, cls) {
    return f.kind === 'image' && f.url ? '<img class="' + (cls || '') + '" src="' + f.url + '" alt="" loading="lazy">' : '<img class="' + (cls || '') + ' ic" src="' + (F.root || (window.EX && EX.root) || window.KIT_ROOT || '') + 'assets/icons-files/' + KINDS[f.kind].img + '" alt="">';
  };

  /* ── Navigateur de fichiers ──────────────────────────────── */
  var MENU = [{ id: 'open', label: 'Ouvrir', icon: 'open_in_new' }, { id: 'download', label: 'Télécharger', icon: 'download' }, { id: 'share', label: 'Partager', icon: 'person_add' },
    { id: 'star', label: 'Ajouter / retirer des favoris', icon: 'star_border' }, { id: 'rename', label: 'Renommer', icon: 'drive_file_rename_outline' }, { divider: true }, { id: 'delete', label: 'Supprimer', icon: 'delete', danger: true }];
  F.browser = function (el, o) {
    o = Object.assign({ multiple: true, accept: null, scope: 'drive', folder: null, view: 'card' }, o);
    F.ensure();
    var S = { q: '', sort: { key: 'name', dir: 1 }, sel: [], anchor: null }, mfmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }), yfmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    function accepts(f) { return f.kind === 'folder' || !o.accept || o.accept.indexOf(f.kind) >= 0; }
    function isSel(f) { return S.sel.some(function (s) { return s.id === f.id; }); }
    function rows() {
      var q = S.q.trim().toLowerCase(), all = F.items, list;
      if (q) list = all.filter(function (i) { return i.name.toLowerCase().indexOf(q) >= 0; });
      else if (o.scope === 'recent') return all.filter(function (i) { return i.kind !== 'folder'; }).sort(function (a, b) { return b.modified - a.modified; }).slice(0, 12);
      else if (o.scope === 'starred') list = all.filter(function (i) { return i.starred; });
      else if (o.scope === 'shared') list = all.filter(function (i) { return i.shared; });
      else list = all.filter(function (i) { return i.parent === o.folder; });
      var k = S.sort.key, d = S.sort.dir, v = function (i) { return k === 'name' ? i.name.toLowerCase() : k === 'size' ? i.size : +i.modified; };
      return list.slice().sort(function (a, b) { return (a.kind === 'folder') !== (b.kind === 'folder') ? (a.kind === 'folder' ? -1 : 1) : (v(a) > v(b) ? 1 : v(a) < v(b) ? -1 : 0) * d; });
    }
    // La sélection met à jour les classes sans reconstruire le DOM (sinon le double-clic perd sa cible).
    function paintSel() {
      el.querySelectorAll('[data-id]').forEach(function (n) {
        var on = S.sel.some(function (s) { return s.id === n.dataset.id; }); n.classList.toggle('sel', on);
        var c = n.querySelector('.check'), th = n.querySelector('.thumb');
        if (on && !c && th) { th.insertAdjacentHTML('beforeend', '<span class="check on"><span class="mi">check</span></span>'); }
        else if (c) { if (!on && !o.picker) c.remove(); else c.classList.toggle('on', on); }
      });
    }
    function setSel(l) { S.sel = l; paintSel(); o.onSelection && o.onSelection(l); }
    function sortIcon(k) { return S.sort.key !== k ? '' : S.sort.dir === 1 ? 'arrow_upward' : 'arrow_downward'; }
    function render() {
      var r = rows(), folders = r.filter(function (i) { return i.kind === 'folder'; }), files = r.filter(function (i) { return i.kind !== 'folder'; }), path = F.path(o.folder);
      var crumbs = o.scope === 'drive' && !S.q ? '<button type="button" data-folder=""' + (!o.folder ? ' class="cur"' : '') + '>Mon disque</button>' + path.map(function (p, i) { return '<span class="mi">chevron_right</span><button type="button" data-folder="' + p.id + '"' + (i === path.length - 1 ? ' class="cur"' : '') + '>' + esc(p.name) + '</button>'; }).join('')
        : '<span class="cur">' + (S.q ? 'Résultats pour « ' + esc(S.q) + ' »' : { drive: 'Mon disque', recent: 'Récents', starred: 'Favoris', shared: 'Partagés avec moi' }[o.scope]) + '</span>';
      var html = '<div class="fb' + (o.picker ? ' picker' : '') + '"><div class="fb-bar"><nav class="crumbs" aria-label="Emplacement">' + crumbs + '</nav><span class="spacer"></span>' +
        '<label class="searchbox"><span class="mi">search</span><input type="search" data-fb="q" placeholder="Rechercher un fichier" value="' + esc(S.q) + '" aria-label="Rechercher un fichier"></label>' +
        '<details class="ui-menu"><summary class="ui-btn ui-btn--icon" title="Trier" aria-label="Trier"><span class="mi">sort</span></summary><div class="ui-menu__panel">' +
        [['name', 'Nom'], ['modified', 'Date de modification'], ['size', 'Taille']].map(function (s) { return '<button class="ui-menu__item" data-sort="' + s[0] + '"><span class="mi">' + (S.sort.key === s[0] ? (S.sort.dir === 1 ? 'arrow_upward' : 'arrow_downward') : 'remove') + '</span>' + s[1] + '</button>'; }).join('') + '</div></details>' +
        '<div class="vmode"><button class="' + (o.view === 'card' ? 'on' : '') + '" data-view="card" title="Grille" aria-label="Grille"><span class="mi">grid_view</span></button><button class="' + (o.view === 'list' ? 'on' : '') + '" data-view="list" title="Liste" aria-label="Liste"><span class="mi">view_list</span></button></div></div>';
      if (!r.length) html += '<div class="ui-empty"><span class="mi" style="font-size:40px">' + (S.q ? 'search_off' : 'folder_open') + '</span><p><strong>' + (S.q ? 'Aucun résultat' : 'Dossier vide') + '</strong></p><p class="muted">' + (o.picker ? 'Aucun fichier compatible ici.' : 'Glissez des fichiers ici ou utilisez « Importer ».') + '</p></div>';
      else if (o.view === 'card') {
        if (folders.length) html += '<div class="group-label">Dossiers</div><div class="folders">' + folders.map(function (f) {
          return '<button type="button" class="folder' + (isSel(f) ? ' sel' : '') + '" data-id="' + f.id + '"><span class="mi" style="color:' + f.color + '">folder</span><span class="nm">' + esc(f.name) + '</span>' + (f.shared ? '<span class="mi badge-ic" title="Partagé">group</span>' : '') + '</button>'; }).join('') + '</div>';
        if (files.length) html += '<div class="group-label">Fichiers</div><div class="grid">' + files.map(function (f) {
          var ok = accepts(f);
          return '<button type="button" class="tile' + (isSel(f) ? ' sel' : '') + (ok ? '' : ' off') + '" data-id="' + f.id + '"' + (ok ? '' : ' disabled') + '><span class="thumb">' + F.thumb(f) + (f.kind === 'video' ? '<span class="mi play">play_circle</span>' : '') +
            (o.picker || isSel(f) ? '<span class="check' + (isSel(f) ? ' on' : '') + '"><span class="mi">check</span></span>' : '') + '</span><span class="meta"><span class="nm" title="' + esc(f.name) + '">' + esc(f.name) + '</span><small>' + size(f.size) + ' · ' + mfmt.format(f.modified) + '</small></span>' +
            (f.starred ? '<span class="mi star">star</span>' : '') + '</button>'; }).join('') + '</div>';
      } else html += '<div class="table-wrap"><table class="fb-list"><thead><tr><th class="c-name" data-sort="name">Nom<span class="mi">' + sortIcon('name') + '</span></th><th class="hide-sm">Propriétaire</th><th data-sort="modified">Modifié<span class="mi">' + sortIcon('modified') + '</span></th><th class="r" data-sort="size">Taille<span class="mi">' + sortIcon('size') + '</span></th></tr></thead><tbody>' +
        r.map(function (f) { var ok = accepts(f);
          return '<tr class="' + (isSel(f) ? 'sel ' : '') + (ok ? '' : 'off') + '" data-id="' + f.id + '"><td class="c-name"><span class="nm-cell">' + (f.kind === 'folder' ? '<span class="mi fi" style="color:' + f.color + '">folder</span>' : F.thumb(f, 'th')) +
            '<span class="nm">' + esc(f.name) + '</span>' + (f.starred ? '<span class="mi star">star</span>' : '') + (f.shared ? '<span class="mi shared" title="Partagé">group</span>' : '') + '</span></td>' +
            '<td class="hide-sm muted">' + esc(f.owner) + '</td><td class="muted">' + yfmt.format(f.modified) + '</td><td class="r muted">' + (f.kind === 'folder' ? F.folderStats(f.id).count + ' élément(s)' : size(f.size)) + '</td></tr>'; }).join('') + '</tbody></table></div>';
      html += '<div class="drop" hidden><span class="mi">cloud_upload</span>Déposez pour importer dans « ' + esc((path[path.length - 1] || { name: 'Mon disque' }).name) + ' »</div></div>';
      var focus = document.activeElement && document.activeElement.dataset.fb === 'q' && el.contains(document.activeElement);
      el.innerHTML = html;
      if (focus) { var qi = el.querySelector('[data-fb=q]'); qi.focus(); qi.setSelectionRange(qi.value.length, qi.value.length); }
    }
    function click(f, e) {
      if (o.picker && f.kind === 'folder') return setSel([]);
      if (o.multiple && e.shiftKey && S.anchor) {
        var list = rows().filter(function (x) { return accepts(x) && (x.kind === 'folder') === (f.kind === 'folder'); });
        var a = list.findIndex(function (x) { return x.id === S.anchor.id; }), b = list.findIndex(function (x) { return x.id === f.id; });
        return setSel(list.slice(Math.min(a, b), Math.max(a, b) + 1));
      }
      if (o.multiple && (e.metaKey || e.ctrlKey || o.picker)) setSel(isSel(f) ? S.sel.filter(function (s) { return s.id !== f.id; }) : S.sel.concat(f));
      else setSel([f]);
      S.anchor = f;
    }
    function open(f) { if (f.kind === 'folder') { S.q = ''; nav(f.id); return; } if (accepts(f) && o.onOpen) o.onOpen(f); }
    function nav(folder) { o.folder = folder; S.sel = []; render(); o.onFolder && o.onFolder(folder); o.onSelection && o.onSelection([]); }
    el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-folder],[data-sort],[data-view],[data-id]'); if (!t) return;
      if (t.hasAttribute('data-folder')) return nav(t.dataset.folder || null);
      if (t.dataset.sort) { var k = t.dataset.sort; S.sort = { key: k, dir: S.sort.key === k ? -S.sort.dir : k === 'name' ? 1 : -1 }; return render(); }
      if (t.dataset.view) { o.view = t.dataset.view; o.onView && o.onView(o.view); return render(); }
      var f = F.get(t.dataset.id); if (f && accepts(f)) click(f, e);
    });
    // Le premier clic peut faire bouger la mise en page (panneau de détails) : on retient l'élément cliqué.
    var last = { id: null, t: 0 };
    el.addEventListener('mousedown', function (e) { if (e.detail > 1) return; var t = e.target.closest('[data-id]'); last = { id: t ? t.dataset.id : null, t: Date.now() }; }, true);
    // Écoute au niveau du document : si le DOM a bougé, la cible du double-clic est un ancêtre commun.
    document.addEventListener('dblclick', function (e) {
      if (!el.isConnected || !(el.contains(e.target) || e.target.contains(el))) return;
      var t = el.contains(e.target) && e.target.closest('[data-id]');
      var i = Date.now() - last.t < 800 && last.id ? last.id : t ? t.dataset.id : null;
      if (i && F.get(i)) open(F.get(i));
    });
    el.addEventListener('keydown', function (e) { var t = e.target.closest('[data-id]'); if (t && e.key === 'Enter') { e.preventDefault(); open(F.get(t.dataset.id)); } });
    el.addEventListener('input', function (e) { if (e.target.dataset.fb === 'q') { S.q = e.target.value; S.sel = []; render(); } });
    el.addEventListener('contextmenu', function (e) {
      if (o.picker || !window.ExW) return; var t = e.target.closest('[data-id]'); if (!t) return;
      var f = F.get(t.dataset.id); if (!isSel(f)) { S.sel = [f]; S.anchor = f; render(); o.onSelection && o.onSelection(S.sel); }
      ExW.contextMenu(e, MENU, function (it) { o.onAction && o.onAction(it.id, S.sel.slice()); });
    });
    var depth = 0;
    el.addEventListener('dragenter', function (e) { if (o.picker || !e.dataTransfer.types.includes('Files')) return; depth++; var d = el.querySelector('.drop'); if (d) d.hidden = false; });
    el.addEventListener('dragleave', function () { if (--depth <= 0) { depth = 0; var d = el.querySelector('.drop'); if (d) d.hidden = true; } });
    el.addEventListener('dragover', function (e) { e.preventDefault(); });
    el.addEventListener('drop', function (e) { e.preventDefault(); depth = 0; var d = el.querySelector('.drop'); if (d) d.hidden = true; if (e.dataTransfer.files.length && o.onDrop) o.onDrop(e.dataTransfer.files); });
    var off = F.on(render);
    render();
    return { render: render, nav: nav, clear: function () { setSel([]); }, selectAll: function () { setSel(rows().filter(function (r) { return accepts(r) && (!o.picker || r.kind !== 'folder'); })); },
      selection: function () { return S.sel; }, set: function (p) { Object.assign(o, p); S.sel = []; render(); }, destroy: off };
  };

  /* ── Sélecteur en modale ─────────────────────────────────── */
  var PLACES = [{ id: 'drive', label: 'Mon disque', icon: 'cloud' }, { id: 'recent', label: 'Récents', icon: 'schedule' }, { id: 'starred', label: 'Favoris', icon: 'star_border' }, { id: 'shared', label: 'Partagés', icon: 'group' }];
  var ACC = { image: 'images', video: 'vidéos', audio: 'audio', pdf: 'PDF', sheet: 'tableurs', slides: 'présentations', doc: 'documents', text: 'textes', archive: 'archives', folder: 'dossiers' };
  F.pick = function (o) {
    o = o || {}; F.ensure();
    return new Promise(function (resolve) {
      var d = document.createElement('dialog'); d.className = 'fp-dialog';
      var multiple = o.multiple !== false, scope = 'drive', sel = [], br;
      d.innerHTML = '<div class="fp"><header class="fp-head"><h2>' + esc(o.title || 'Sélectionner des fichiers') + '</h2>' + (o.accept ? '<span class="hint">Types acceptés : ' + o.accept.map(function (k) { return ACC[k]; }).join(', ') + '</span>' : '') +
        '<span class="spacer"></span><button class="ui-btn ui-btn--icon" data-x aria-label="Fermer"><span class="mi">close</span></button></header>' +
        '<div class="fp-body"><nav class="places" aria-label="Emplacements">' + PLACES.map(function (p) { return '<button type="button" data-scope="' + p.id + '" class="' + (p.id === scope ? 'on' : '') + '"><span class="mi">' + p.icon + '</span>' + p.label + '</button>'; }).join('') +
        '<hr><button type="button" data-up><span class="mi">computer</span>Depuis l\'ordinateur</button><input type="file" hidden' + (multiple ? ' multiple' : '') + '></nav><div class="browser"></div></div>' +
        '<footer class="fp-foot"><div class="fp-sum"></div><span class="spacer"></span><button class="ui-btn ui-btn--text" data-x>Annuler</button><button class="ui-btn" data-ok disabled>' + esc(o.confirmLabel || 'Sélectionner') + '</button></footer></div>';
      document.body.appendChild(d);
      function done(v) { d.close(); d.remove(); if (br) br.destroy(); resolve(v); }
      function foot() {
        var ok = d.querySelector('[data-ok]'); ok.disabled = !sel.length; ok.textContent = (o.confirmLabel || 'Sélectionner') + (sel.length > 1 ? ' (' + sel.length + ')' : '');
        d.querySelector('.fp-sum').innerHTML = sel.length ? '<div class="picked">' + sel.slice(0, 4).map(function (f) { return F.thumb(f); }).join('') + '<span><strong>' + sel.length + ' fichier(s)</strong> · ' + size(sel.reduce(function (s, f) { return s + f.size; }, 0)) + '</span><button class="ui-btn ui-btn--text ui-btn--sm" data-clear>Effacer</button></div>'
          : '<span class="none">' + (multiple ? 'Cliquez pour cocher, Maj + clic pour une plage, double-clic pour valider.' : 'Choisissez un fichier.') + '</span>';
      }
      br = F.browser(d.querySelector('.browser'), { picker: true, multiple: multiple, accept: o.accept || null, scope: scope, onSelection: function (l) { sel = l; foot(); }, onOpen: function (f) { done([f]); } });
      d.addEventListener('click', function (e) {
        var t = e.target.closest('[data-x],[data-ok],[data-scope],[data-up],[data-clear]'); if (!t) { if (e.target === d) done(undefined); return; }
        if (t.hasAttribute('data-x')) done(undefined);
        if (t.hasAttribute('data-ok')) done(sel);
        if (t.hasAttribute('data-clear')) br.clear();
        if (t.dataset.scope) { scope = t.dataset.scope; d.querySelectorAll('[data-scope]').forEach(function (b) { b.classList.toggle('on', b === t); }); br.set({ scope: scope, folder: null }); sel = []; foot(); }
        if (t.hasAttribute('data-up')) d.querySelector('input[type=file]').click();
      });
      d.querySelector('input[type=file]').addEventListener('change', function (e) {
        var added = F.addFiles(e.target.files, null).filter(function (f) { return !o.accept || o.accept.indexOf(f.kind) >= 0; });
        if (added.length) done(multiple ? added : added.slice(0, 1));
      });
      d.addEventListener('cancel', function (e) { e.preventDefault(); done(undefined); });
      foot(); d.showModal();
    });
  };

  window.Files = F;
})();
