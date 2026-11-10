/* ==========================================================================
   Composants partagés en JS natif : fil de commentaires, historique (audit log),
   liste descriptive, champ copiable. Dépend de js/lib/markdown.js (facultatif).
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(n) { return String(n).split(/\s+/).map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase(); }
  function md(t) {
    var h = window.UIKitUtils && UIKitUtils.markdownToHtml ? UIKitUtils.markdownToHtml(t) : '<p>' + esc(t) + '</p>';
    return h.replace(/(^|[\s>(])@([\p{L}][\p{L}-]*)/gu, '$1<span class="mention">@$2</span>');
  }

  /* ── Champ copiable ──────────────────────────────────────── */
  function copyField(value, icon, label) {
    return '<div class="cf"><span class="mi">' + (icon || 'content_copy') + '</span><span class="cf__v">' + esc(value) + '</span>' +
      '<button type="button" class="ui-btn ui-btn--icon" data-copy="' + esc(value) + '" aria-label="Copier ' + esc(label || '') + '" title="Copier ' + esc(label || '') + '"><span class="mi">content_copy</span></button></div>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    try { navigator.clipboard.writeText(b.dataset.copy); } catch (x) {}
    var i = b.querySelector('.mi'); if (i) { i.textContent = 'check'; setTimeout(function () { i.textContent = 'content_copy'; }, 1400); }
    UIKit.toast('Copié dans le presse-papiers');
  });

  /* ── Liste descriptive ───────────────────────────────────── */
  function descList(items, columns, layout) {
    return '<dl class="dl dl--' + (layout || 'vertical') + '" style="--cols:' + (columns || 2) + '">' + items.map(function (it) {
      var v = it.type === 'mono' ? '<code>' + esc(it.value) + '</code>' : it.type === 'badge' ? '<span class="ui-badge" style="color:var(--' + it.tone + ');background:color-mix(in srgb,var(--' + it.tone + ') 14%,transparent)">' + esc(it.value) + '</span>' : esc(it.value);
      return '<div><dt>' + esc(it.label) + '</dt><dd>' + v + (it.copy ? ' <button type="button" class="dl__copy" data-copy="' + esc(it.value) + '" aria-label="Copier"><span class="mi">content_copy</span></button>' : '') +
        (it.hint ? '<small>' + esc(it.hint) + '</small>' : '') + '</dd></div>';
    }).join('') + '</dl>';
  }

  /* ── Historique (audit log) ──────────────────────────────── */
  var ACTIONS = {
    create: { label: 'a créé', name: 'Création', icon: 'add_circle', tone: 'success' }, update: { label: 'a modifié', name: 'Modification', icon: 'edit', tone: 'info' },
    delete: { label: 'a supprimé', name: 'Suppression', icon: 'delete', tone: 'error' }, status: { label: 'a changé le statut de', name: 'Statut', icon: 'swap_horiz', tone: 'warning' },
    comment: { label: 'a commenté', name: 'Commentaire', icon: 'chat', tone: 'purple' }, login: { label: 's\'est connecté', name: 'Connexion', icon: 'login', tone: 'primary' },
    export: { label: 'a exporté', name: 'Export', icon: 'download', tone: 'primary' }
  };
  function auditLog(el, entries) {
    var S = { action: null, user: null, open: new Set() };
    var users = entries.map(function (e) { return e.user; }).filter(function (u, i, a) { return a.findIndex(function (x) { return x.name === u.name; }) === i; });
    var used = Object.keys(ACTIONS).filter(function (a) { return entries.some(function (e) { return e.action === a; }); });
    var dayFmt = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }), hm = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });
    function none(v) { return v === null || v === undefined || v === ''; }
    function render() {
      var list = entries.filter(function (e) { return (!S.action || e.action === S.action) && (!S.user || e.user.name === S.user); });
      var groups = {};
      list.forEach(function (e) { var d = new Date(e.at), k = d.toDateString(); (groups[k] = groups[k] || { d: d, items: [] }).items.push(e); });
      var today = new Date(2026, 9, 17).toDateString(), yest = new Date(2026, 9, 16).toDateString();
      el.innerHTML = '<div class="al-filters"><button type="button" class="ui-chip' + (!S.action ? ' active' : '') + '" data-al-a="">Tout <em>' + entries.length + '</em></button>' +
        used.map(function (a) { return '<button type="button" class="ui-chip' + (S.action === a ? ' active' : '') + '" data-al-a="' + a + '"><span class="mi" style="color:var(--' + ACTIONS[a].tone + ')">' + ACTIONS[a].icon + '</span>' + ACTIONS[a].name +
          '<em>' + entries.filter(function (e) { return e.action === a; }).length + '</em></button>'; }).join('') +
        '<span class="spacer"></span><div class="al-users">' + users.map(function (u) {
          return '<button type="button" class="av' + (S.user && S.user !== u.name ? ' off' : '') + '" style="background:' + (u.color || 'var(--primary)') + '" data-al-u="' + esc(u.name) + '" title="' + esc(u.name) + '">' + (u.initials || initials(u.name)) + '</button>'; }).join('') + '</div></div>' +
        Object.keys(groups).map(function (k) {
          var g = groups[k];
          return '<div class="al-day">' + (k === today ? 'Aujourd\'hui' : k === yest ? 'Hier' : dayFmt.format(g.d)) + '</div><ol class="al-list">' + g.items.map(function (e) {
            var m = ACTIONS[e.action], open = S.open.has(e.id);
            return '<li class="al-item"><span class="al-dot" style="--tone:var(--' + m.tone + ')"><span class="mi">' + m.icon + '</span></span><div class="al-main">' +
              '<div class="al-line"><span class="av sm" style="background:' + (e.user.color || 'var(--primary)') + '">' + (e.user.initials || initials(e.user.name)) + '</span>' +
              '<span><strong>' + esc(e.user.name) + '</strong> ' + m.label + (e.target ? ' <strong class="tgt">' + esc(e.target) + '</strong>' : '') + '</span><span class="spacer"></span>' +
              '<time title="' + new Date(e.at).toLocaleString('fr-FR') + '">' + hm.format(new Date(e.at)) + '</time></div>' +
              (e.comment ? '<blockquote>' + esc(e.comment) + '</blockquote>' : '') +
              (e.changes && e.changes.length ? '<button type="button" class="al-toggle" data-al-t="' + e.id + '"><span class="mi' + (open ? ' open' : '') + '">chevron_right</span>' + e.changes.length + ' champ(s) modifié(s)' +
                (open ? '' : ' <span class="muted">· ' + e.changes.map(function (c) { return c.label || c.field; }).join(', ') + '</span>') + '</button>' +
                (open ? '<table class="al-changes"><thead><tr><th>Champ</th><th>Avant</th><th></th><th>Après</th></tr></thead><tbody>' + e.changes.map(function (c) {
                  return '<tr><td class="f">' + esc(c.label || c.field) + '</td><td><span class="old' + (none(c.before) ? ' none' : '') + '">' + (none(c.before) ? 'vide' : esc(c.before)) + '</span></td>' +
                    '<td class="arrow"><span class="mi">arrow_forward</span></td><td><span class="new' + (none(c.after) ? ' none' : '') + '">' + (none(c.after) ? 'vide' : esc(c.after)) + '</span></td></tr>'; }).join('') + '</tbody></table>' : '') : '') +
              (e.meta ? '<span class="al-meta"><span class="mi">devices</span>' + esc(e.meta) + '</span>' : '') + '</div></li>';
          }).join('') + '</ol>';
        }).join('') + (list.length ? '' : '<p class="muted" style="text-align:center;padding:24px">Aucune entrée.</p>');
    }
    el.addEventListener('click', function (e) {
      var a = e.target.closest('[data-al-a]'), u = e.target.closest('[data-al-u]'), t = e.target.closest('[data-al-t]');
      if (a) S.action = a.dataset.alA || null;
      if (u) S.user = S.user === u.dataset.alU ? null : u.dataset.alU;
      if (t) S.open.has(t.dataset.alT) ? S.open.delete(t.dataset.alT) : S.open.add(t.dataset.alT);
      if (a || u || t) render();
    });
    render();
  }

  /* ── Fil de commentaires ─────────────────────────────────── */
  var EMOJIS = ['👍', '❤️', '🎉', '😄', '🤔', '👀'], SORTS = { top: 'Les plus pertinents', new: 'Plus récents', old: 'Plus anciens' };
  function commentThread(el, o) {
    o = Object.assign({ title: 'Commentaires', visibleReplies: 2, mentionables: [] }, o);
    var list = JSON.parse(JSON.stringify(o.comments || [])), S = { sort: 'top', replyTo: null, replyPrefix: '', editing: null, expanded: new Set(), flash: null }, seq = 0;
    function count(l) { return l.reduce(function (s, c) { return s + 1 + count(c.replies || []); }, 0); }
    function find(id, l) { l = l || list; for (var i = 0; i < l.length; i++) { if (l[i].id === id) return l[i]; var r = find(id, l[i].replies || []); if (r) return r; } return null; }
    function mine(c) { return o.me && c.author.name === o.me.name; }
    function sorted() {
      var idx = list.map(function (c) { return c.id; });
      return list.slice().sort(function (a, b) {
        var p = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0); if (p) return p;
        if (S.sort === 'top') return b.likes + (b.replies || []).length * 2 - (a.likes + (a.replies || []).length * 2);
        return (S.sort === 'new' ? -1 : 1) * (idx.indexOf(a.id) - idx.indexOf(b.id));
      });
    }
    function composer(id, initial, ph, label, cancel) {
      return '<form class="cc" data-cc="' + id + '"><span class="ava" style="background:' + (o.me && o.me.color || 'var(--primary)') + '">' + (o.me ? initials(o.me.name) : '') + '</span>' +
        '<div class="cc__box"><textarea rows="' + (cancel ? 2 : 1) + '" placeholder="' + (ph || 'Ajouter un commentaire…') + '" aria-label="' + (ph || 'Commentaire') + '">' + esc(initial || '') + '</textarea>' +
        '<div class="cc__bar"><span class="help">**gras**, _italique_, @mention · Ctrl+Entrée</span><span class="spacer"></span>' +
        (cancel ? '<button type="button" class="ui-btn ui-btn--text ui-btn--sm" data-cancel>Annuler</button>' : '') + '<button class="ui-btn ui-btn--sm">' + (label || 'Publier') + '</button></div></div></form>';
    }
    function item(c, root, depth) {
      var body;
      if (c.deleted) body = '<p class="deleted"><span class="mi">block</span>Ce commentaire a été supprimé.</p>';
      else body = '<header><strong>' + esc(c.author.name) + '</strong>' + (c.byAuthor ? '<span class="badge author">Auteur</span>' : '') + (c.author.role ? '<span class="role">' + esc(c.author.role) + '</span>' : '') +
        (c.pinned ? '<span class="badge pin"><span class="mi">push_pin</span>Épinglé</span>' : '') + '<span class="dot">·</span><time>' + esc(c.at) + '</time>' + (c.edited ? '<span class="edited">(modifié)</span>' : '') +
        '<details class="ui-menu ct-menu"><summary class="ui-btn ui-btn--icon" aria-label="Actions"><span class="mi">more_horiz</span></summary><div class="ui-menu__panel">' +
          (mine(c) ? '<button class="ui-menu__item" data-ct="edit" data-id="' + c.id + '"><span class="mi">edit</span>Modifier</button><button class="ui-menu__item danger" data-ct="del" data-id="' + c.id + '"><span class="mi">delete</span>Supprimer</button>' : '') +
          (o.moderator && depth === 0 ? '<button class="ui-menu__item" data-ct="pin" data-id="' + c.id + '"><span class="mi">push_pin</span>' + (c.pinned ? 'Désépingler' : 'Épingler en haut') + '</button>' : '') +
          '<button class="ui-menu__item" data-ct="link" data-id="' + c.id + '"><span class="mi">link</span>Copier le lien</button>' + (mine(c) ? '' : '<button class="ui-menu__item"><span class="mi">flag</span>Signaler</button>') + '</div></details></header>' +
        (S.editing === c.id ? composer('edit:' + c.id, c.text, 'Modifier…', 'Enregistrer', true) : '<div class="text">' + md(c.text) + '</div>') +
        (c.reactions && c.reactions.length ? '<div class="reactions">' + c.reactions.map(function (r) { return '<button type="button" class="' + (r.mine ? 'mine' : '') + '" data-ct="react" data-id="' + c.id + '" data-e="' + r.emoji + '" aria-pressed="' + !!r.mine + '">' + r.emoji + ' <b>' + r.count + '</b></button>'; }).join('') + '</div>' : '') +
        '<footer><button type="button" class="act' + (c.liked ? ' on' : '') + '" data-ct="like" data-id="' + c.id + '" aria-pressed="' + !!c.liked + '"><span class="mi">' + (c.liked ? 'favorite' : 'favorite_border') + '</span>' + (c.likes || 'J\'aime') + '</button>' +
          '<button type="button" class="act" data-ct="reply" data-id="' + c.id + '" data-root="' + root.id + '"><span class="mi">chat_bubble_outline</span>Répondre</button>' +
          '<details class="ui-menu"><summary class="act icon" aria-label="Ajouter une réaction"><span class="mi">add_reaction</span></summary><div class="ui-menu__panel emoji-row">' +
          EMOJIS.map(function (em) { return '<button type="button" data-ct="react" data-id="' + c.id + '" data-e="' + em + '">' + em + '</button>'; }).join('') + '</div></details></footer>';
      return '<article class="comment' + (S.flash === c.id ? ' flash' : '') + (c.pinned ? ' pinned' : '') + (depth ? ' reply' : '') + '" id="comment-' + c.id + '">' +
        '<span class="ava" style="background:' + (c.deleted ? 'var(--text-muted)' : (c.author.color || 'var(--primary)')) + '">' + (c.deleted ? '–' : initials(c.author.name)) + '</span><div class="body">' + body + '</div></article>';
    }
    function render() {
      var s = sorted();
      el.innerHTML = '<section class="thread' + (o.compact ? ' compact' : '') + '" aria-label="Commentaires">' +
        (o.compact ? '' : '<header class="head"><h2>' + esc(o.title) + ' <span class="n">' + count(list) + '</span></h2><details class="ui-menu"><summary class="ui-btn ui-btn--text ui-btn--sm"><span class="mi">sort</span>' + SORTS[S.sort] + '</summary><div class="ui-menu__panel">' +
          Object.keys(SORTS).map(function (k) { return '<button class="ui-menu__item" data-sort="' + k + '"><span class="mi">' + (S.sort === k ? 'check' : '') + '</span>' + SORTS[k] + '</button>'; }).join('') + '</div></details></header>' + composer('new')) +
        '<ol class="list">' + (s.length ? s.map(function (c) {
          var reps = c.replies || [], shown = S.expanded.has(c.id) ? reps : reps.slice(0, o.visibleReplies);
          return '<li class="root">' + item(c, c, 0) + (reps.length ? '<ol class="replies">' + shown.map(function (r) { return '<li>' + item(r, c, 1) + '</li>'; }).join('') + '</ol>' +
            (reps.length > o.visibleReplies ? '<button type="button" class="more" data-ct="more" data-id="' + c.id + '"><span class="mi">' + (S.expanded.has(c.id) ? 'expand_less' : 'subdirectory_arrow_right') + '</span>' +
              (S.expanded.has(c.id) ? 'Masquer les réponses' : 'Afficher ' + (reps.length - o.visibleReplies) + ' autre(s) réponse(s)') + '</button>' : '') : '') +
            (S.replyTo === c.id ? '<div class="reply-box">' + composer('reply:' + c.id, S.replyPrefix, 'Votre réponse…', 'Répondre', true) + '</div>' : '') + '</li>';
        }).join('') : '<li class="empty"><span class="mi">forum</span><strong>Aucun commentaire pour l\'instant</strong><span>Lancez la discussion !</span></li>') + '</ol>' +
        (o.compact ? composer('new', '', 'Écrire un commentaire…') : '') + '</section>';
      var f = el.querySelector('[data-cc^="reply"] textarea, [data-cc^="edit"] textarea'); if (f) { f.focus(); f.setSelectionRange(f.value.length, f.value.length); }
      if (S.flash) setTimeout(function () { S.flash = null; var x = el.querySelector('.flash'); if (x) x.classList.remove('flash'); }, 1200);
    }
    function create(text) { return { id: 'n' + (++seq) + Date.now(), author: o.me, at: 'à l\'instant', likes: 0, text: text }; }
    el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ct],[data-sort],[data-cancel]'); if (!t) return;
      var d = t.closest('details'); if (d) d.removeAttribute('open');
      if (t.dataset.sort) { S.sort = t.dataset.sort; return render(); }
      if (t.hasAttribute('data-cancel')) { S.replyTo = S.editing = null; return render(); }
      var c = find(t.dataset.id);
      switch (t.dataset.ct) {
        case 'like': c.liked = !c.liked; c.likes += c.liked ? 1 : -1; break;
        case 'react': var rs = c.reactions = c.reactions || [], r = rs.find(function (x) { return x.emoji === t.dataset.e; });
          if (!r) rs.push({ emoji: t.dataset.e, count: 1, mine: true }); else { r.count += r.mine ? -1 : 1; r.mine = !r.mine; if (!r.count) rs.splice(rs.indexOf(r), 1); } break;
        case 'reply': S.replyTo = t.dataset.root; S.replyPrefix = t.dataset.id === t.dataset.root || mine(c) ? '' : '@' + c.author.name.replace(/\s+/g, '-') + ' '; break;
        case 'more': S.expanded.has(c.id) ? S.expanded.delete(c.id) : S.expanded.add(c.id); break;
        case 'edit': S.editing = c.id; break;
        case 'pin': c.pinned = !c.pinned; break;
        case 'link': try { navigator.clipboard.writeText(location.href.split('#')[0] + '#comment-' + c.id); } catch (x) {} UIKit.toast('Lien copié'); return;
        case 'del':
          (function drop(l) { for (var i = 0; i < l.length; i++) { if (l[i].id === c.id) { if (l[i].replies && l[i].replies.length) { l[i].deleted = true; l[i].text = ''; } else l.splice(i, 1); return true; } if (drop(l[i].replies || [])) return true; } })(list); break;
      }
      render();
    });
    function submit(form) {
      var text = form.querySelector('textarea').value.trim(); if (!text) return;
      var k = form.dataset.cc;
      if (k === 'new') { var c = create(text); list.unshift(c); if (S.sort === 'old') S.sort = 'new'; S.flash = c.id; }
      else if (k.indexOf('reply:') === 0) { var p = find(k.slice(6)), r = create(text); (p.replies = p.replies || []).push(r); S.expanded.add(p.id); S.replyTo = null; S.flash = r.id; }
      else { var x = find(k.slice(5)); x.text = text; x.edited = true; S.editing = null; }
      render(); o.onChange && o.onChange(list);
    }
    el.addEventListener('submit', function (e) { e.preventDefault(); submit(e.target); });
    el.addEventListener('keydown', function (e) { if (e.target.matches('.cc textarea') && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submit(e.target.closest('form')); } });
    el.addEventListener('input', function (e) { if (e.target.matches('.cc textarea')) { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; } });
    render();
    return { list: function () { return list; } };
  }

  /* ── Note en étoiles (lecture seule, demi-étoiles) ──────── */
  function stars(v, size) {
    var h = '<span class="stars-ro' + (size ? ' ' + size : '') + '" role="img" aria-label="' + String(v).replace('.', ',') + ' sur 5">';
    for (var i = 1; i <= 5; i++) h += '<span class="mi">' + (v >= i ? 'star' : v >= i - 0.5 ? 'star_half' : 'star_outline') + '</span>';
    return h + '</span>';
  }

  /* ── Curseur d'intervalle (deux poignées, histogramme facultatif) ── */
  function rangeSlider(el, o) {
    var v = o.value.slice(), max = Math.max.apply(null, o.histogram || [1]);
    el.innerHTML = '<div class="rs">' + (o.histogram ? '<div class="rs__hist">' + o.histogram.map(function (n, i) {
        return '<i data-i="' + i + '" style="height:' + Math.max(6, n / max * 100) + '%"></i>'; }).join('') + '</div>' : '') +
      '<div class="rs__track"><span class="rs__fill"></span><input type="range" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) + '" value="' + v[0] + '" aria-label="Minimum">' +
      '<input type="range" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) + '" value="' + v[1] + '" aria-label="Maximum"></div></div>';
    var ins = el.querySelectorAll('input'), fill = el.querySelector('.rs__fill'), bars = el.querySelectorAll('.rs__hist i');
    function paint() {
      var a = (v[0] - o.min) / (o.max - o.min) * 100, b = (v[1] - o.min) / (o.max - o.min) * 100;
      fill.style.left = a + '%'; fill.style.right = (100 - b) + '%';
      bars.forEach(function (bar, i) { var c = (i + 0.5) / bars.length * 100; bar.classList.toggle('on', c >= a && c <= b); });
    }
    ins.forEach(function (inp, k) {
      inp.addEventListener('input', function () {
        var n = +inp.value; if (k === 0) v[0] = Math.min(n, v[1]); else v[1] = Math.max(n, v[0]); inp.value = v[k]; paint(); o.onChange && o.onChange(v.slice());
      });
    });
    paint();
    return { set: function (nv) { v = nv.slice(); ins[0].value = v[0]; ins[1].value = v[1]; paint(); } };
  }

  /* ── Corps d'article (typographie éditoriale) ────────────── */
  function slugify(t) { return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function inl(t) { return window.UIKitUtils && UIKitUtils.markdownInline ? UIKitUtils.markdownInline(t) : esc(t); }
  var CALLOUT = { info: 'info', success: 'check_circle', warning: 'warning', error: 'error', neutral: 'lightbulb' };
  function articleToc(blocks) { return blocks.filter(function (b) { return b.type === 'h2' || b.type === 'h3'; }).map(function (b) { return { id: b.id || slugify(b.text), text: b.text, level: b.type === 'h2' ? 2 : 3 }; }); }
  function articleBody(blocks, o) {
    o = o || {};
    return '<div class="prose size-' + (o.size || 'lg') + (o.serif ? ' serif' : '') + '">' + blocks.map(function (b, i) {
      switch (b.type) {
        case 'lead': return '<p class="lead">' + inl(b.text) + '</p>';
        case 'p': return '<p' + (b.dropcap ? ' class="dropcap"' : '') + '>' + inl(b.text) + '</p>';
        case 'h2': case 'h3': var id = b.id || slugify(b.text);
          return '<' + b.type + ' id="' + id + '">' + esc(b.text) + (o.anchors !== false ? '<a class="anchor" href="#' + id + '" aria-label="Lien vers cette section">#</a>' : '') + '</' + b.type + '>';
        case 'quote': return '<blockquote><p>' + inl(b.text) + '</p>' + (b.cite ? '<cite>— ' + esc(b.cite) + '</cite>' : '') + '</blockquote>';
        case 'pullquote': return '<aside class="pullquote"><p>' + esc(b.text) + '</p></aside>';
        case 'list': var tag = b.ordered ? 'ol' : 'ul'; return '<' + tag + '>' + b.items.map(function (it) { return '<li>' + inl(it) + '</li>'; }).join('') + '</' + tag + '>';
        case 'code': return '<figure class="code"><figcaption><span class="dots"><i></i><i></i><i></i></span><span class="fname">' + esc(b.filename || b.lang || 'code') + '</span>' + (b.lang ? '<span class="lang">' + esc(b.lang) + '</span>' : '') +
          '<button type="button" data-copy="' + esc(b.code) + '" aria-label="Copier le code" title="Copier"><span class="mi">content_copy</span></button></figcaption><pre><code>' + esc(b.code) + '</code></pre></figure>';
        case 'figure': return '<figure class="figure' + (b.wide ? ' wide' : '') + '"><div class="art" style="--h:' + (b.hue || 190) + '"><span class="mi">' + b.icon + '</span></div>' + (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
        case 'callout': return '<div class="callout ' + b.tone + '" role="note"><span class="mi">' + CALLOUT[b.tone] + '</span><div>' + (b.title ? '<strong>' + esc(b.title) + '</strong>' : '') + '<p>' + inl(b.text) + '</p></div></div>';
        case 'table': return '<div class="table-wrap"><table>' + (b.caption ? '<caption>' + esc(b.caption) + '</caption>' : '') + '<thead><tr>' + b.head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inl(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
        case 'divider': return '<hr>';
      }
      return '';
    }).join('') + '</div>';
  }

  window.UIComp = { articleBody: articleBody, articleToc: articleToc, slugify: slugify, stars: stars, rangeSlider: rangeSlider, esc: esc, initials: initials, md: md, copyField: copyField, descList: descList, auditLog: auditLog, commentThread: commentThread };
})();
