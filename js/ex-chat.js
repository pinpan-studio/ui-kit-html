/* ==========================================================================
   Messagerie d'exemple partagée (page plein écran + panneau latéral du shell) :
   conversations directes, groupes et canaux, pièces jointes, notes vocales,
   réactions, réponses citées, accusés de lecture, « en train d'écrire » et
   réponses simulées. Tout est local.
   ExChat.list(el, o) · ExChat.thread(el, { convId, compact }) · ExChat.mountPanel(el, convId)
   Dépendances chargées à la demande : data/media.js, lib/markdown.js, media.js, files.js (+ CSS).
   ========================================================================== */
(function () {
  'use strict';
  var ROOT = (window.EX && EX.root) || '';
  var ME = 'me', seq = 0, built = false, subs = [];
  var PEOPLE = [
    { id: ME, name: 'Jean Kouassi', color: '#0ea5e9', role: 'Administrateur', online: true }, { id: 'aya', name: 'Aya Koné', color: '#8b5cf6', role: 'Opérations', online: true },
    { id: 'marc', name: 'Marc Yao', color: '#10b981', role: 'Développeur', online: true }, { id: 'grace', name: 'Grace Kouamé', color: '#f59e0b', role: 'Designer', online: false },
    { id: 'ibrahim', name: 'Ibrahim Sanogo', color: '#ef4444', role: 'Produit', online: true }, { id: 'fatou', name: 'Fatou Diabaté', color: '#7c3aed', role: 'Juridique', online: false },
    { id: 'koffi', name: 'Koffi N’Guessan', color: '#0891b2', role: 'Technicien', online: true }, { id: 'sarah', name: 'Sarah Bamba', color: '#db2777', role: 'Formation', online: false }];
  var REPLIES = ['Bien reçu, merci 🙏', 'Je regarde ça tout de suite.', 'Parfait, on fait comme ça !', 'Tu peux me renvoyer le fichier ?', 'Ok pour moi 👍', 'Je te tiens au courant d’ici midi.', 'Super nouvelle !', 'On en parle à la réunion de 15 h ?'];
  var EMOJIS = ['👍', '❤️', '😂', '🎉', '😮', '🙏', '👏', '🔥', '✅', '👀', '😅', '🙌', '💯', '🚀', '😢', '🤝'], QUICK = ['👍', '❤️', '😂', '🎉', '🙏'];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(n) { return n.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase(); }

  // ── Chargement des dépendances ──
  function loadScript(src) { return new Promise(function (r) { var s = document.createElement('script'); s.src = ROOT + src; s.onload = r; s.onerror = r; document.head.appendChild(s); }); }
  function loadCss(href) { if (document.querySelector('link[href$="' + href + '"]')) return; var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = ROOT + href; document.head.appendChild(l); }
  var ready;
  function deps() {
    if (ready) return ready;
    ['css/media.css', 'css/files.css', 'css/chat.css'].forEach(loadCss);
    var chain = Promise.resolve();
    [[!(window.DATA && DATA.buildSampleWav), 'js/data/media.js'], [!(window.UIKitUtils && UIKitUtils.markdownInline), 'js/lib/markdown.js'], [!window.Media, 'js/media.js'], [!window.Files, 'js/files.js']]
      .forEach(function (d) { if (d[0]) chain = chain.then(function () { return loadScript(d[1]); }); });
    return ready = chain;
  }

  var C = { people: PEOPLE, conversations: [], panelConv: null, activePage: null };
  C.on = function (fn) { subs.push(fn); return function () { subs = subs.filter(function (x) { return x !== fn; }); }; };
  function emit() { subs.forEach(function (fn) { fn(); }); var b = document.querySelector('[data-ex-chat] .n'); if (b) { var n = C.totalUnread(); b.textContent = n; b.hidden = !n; } }
  C.person = function (id) { return PEOPLE.find(function (p) { return p.id === id; }) || { id: id, name: id, color: '#64748b', role: '' }; };
  C.conv = function (id) { return id ? C.conversations.find(function (c) { return c.id === id; }) : undefined; };
  C.peer = function (c) { return c.kind === 'direct' ? C.person(c.members.find(function (m) { return m !== ME; })) : undefined; };
  C.title = function (c) { return c.kind === 'direct' ? C.peer(c).name : c.name; };
  C.last = function (c) { return c.messages[c.messages.length - 1]; };
  C.totalUnread = function () { return C.conversations.reduce(function (n, c) { return n + (c.muted ? 0 : c.unread); }, 0); };
  C.preview = function (m) {
    if (!m) return ''; if (m.deleted) return 'Message supprimé'; if (m.voice) return '🎤 Note vocale';
    if (m.attachments && m.attachments.length) return (m.attachments[0].kind === 'image' ? '📷 ' : '📎 ') + (m.text || m.attachments.map(function (a) { return a.name; }).join(', '));
    return m.text || '';
  };
  C.ensure = function () {
    if (built) return; built = true; Files.ensure();
    var all = Files.items, att = function (i) { return { id: i.id, kind: i.kind, name: i.name, size: i.size, url: i.url, mime: i.mime, blob: i.blob }; };
    var photos = all.filter(function (i) { return i.kind === 'image'; }).slice(0, 3).map(att), contract = att(all.find(function (i) { return i.name.indexOf('Contrat cadre') === 0; }));
    var vb = DATA.buildSampleWav(7, 3), voice = { src: URL.createObjectURL(vb), blob: vb, duration: 7 };
    var t = function (min) { return new Date(Date.now() - min * 60000); };
    var m = function (from, min, text, extra) { return Object.assign({ id: 'm' + (++seq), from: from, at: t(min), text: text, status: from === ME ? 'read' : undefined }, extra); };
    var vp = m('aya', 95, 'Les quais 2 et 3 sont prêts 📦', { attachments: photos });
    C.conversations = [
      { id: 'c-aya', kind: 'direct', members: [ME, 'aya'], unread: 2, pinned: true, messages: [
        m('aya', 60 * 26, 'Bonjour Jean, tu as pu valider le planning de jeudi ?'), m(ME, 60 * 25.8, 'Oui, c’est validé. Le camion arrive à 8 h.'),
        m('aya', 120, 'Top. Je préviens l’équipe du quai.'), vp, m('aya', 92, 'On a aussi reçu le bon de livraison signé.', { reactions: [{ emoji: '👍', by: [ME] }] }),
        m(ME, 40, 'Excellent travail, merci à toute l’équipe !', { replyTo: vp.id }), m('aya', 6, 'Merci ! Petite question : on garde le créneau de 8 h pour le lot 15 ?'), m('aya', 5, 'Ou on décale à 9 h à cause de la marée ?')] },
      { id: 'c-ops', kind: 'group', name: 'Équipe opérations', icon: 'local_shipping', color: '#0f766e', members: [ME, 'aya', 'koffi', 'sarah', 'marc'], unread: 5, description: 'Coordination terrain, livraisons et interventions.', messages: [
        m(ME, 60 * 30, 'Jean a créé le groupe « Équipe opérations »', { system: true }), m('koffi', 180, 'Installation terminée chez Transports Yao, 12 balises posées.'),
        m('sarah', 150, 'Formation des chefs de quai : 8 personnes inscrites pour lundi.', { reactions: [{ emoji: '🎉', by: ['aya', 'marc'] }] }), m('koffi', 34, '', { voice: voice }),
        m('aya', 20, 'Koffi, tu peux passer à Vridi après ?'), m('koffi', 18, 'Oui, j’y serai vers 14 h.'), m('marc', 3, 'La connexion API des balises est en recette, retours bienvenus 🙌')] },
      { id: 'c-marc', kind: 'direct', members: [ME, 'marc'], unread: 0, messages: [m('marc', 180, 'Le client a validé la proposition à 12,4 M FCFA.'), m(ME, 174, 'Génial 🎉 On prépare le contrat pour lundi ?'), m('marc', 168, 'Oui, je m’en occupe.')] },
      { id: 'c-general', kind: 'channel', name: 'général', icon: 'tag', color: '#475569', members: PEOPLE.map(function (p) { return p.id; }), unread: 0, muted: true, description: 'Annonces et informations pour toute l’entreprise.', messages: [
        m('ibrahim', 1200, 'La version 2.4 est en production : export PDF corrigé, nouveaux rapports.'), m('grace', 1140, 'Les nouvelles illustrations du site sont en ligne ✨', { reactions: [{ emoji: '❤️', by: ['aya', 'sarah', ME] }] })] },
      { id: 'c-fatou', kind: 'direct', members: [ME, 'fatou'], unread: 0, messages: [m('fatou', 1680, 'Voici la version signée du contrat cadre.', { attachments: [contract] }), m(ME, 1620, 'Merci Fatou, je classe ça dans le dossier Contrats.')] },
      { id: 'c-grace', kind: 'direct', members: [ME, 'grace'], unread: 0, messages: [m('grace', 3000, 'Tu as un moment pour revoir les maquettes du tableau de bord ?'), m(ME, 2940, 'Demain matin si ça te va.')] }];
  };
  function msg(cid, mid) { var c = C.conv(cid); return c && c.messages.find(function (x) { return x.id === mid; }); }
  C.send = function (cid, text, attachments, replyTo, voice) {
    var mm = { id: 'm' + (++seq), from: ME, at: new Date(), text: (text || '').trim() || undefined, attachments: attachments && attachments.length ? attachments : undefined, replyTo: replyTo, voice: voice, status: 'sending' };
    C.conv(cid).messages.push(mm); emit();
    setTimeout(function () { mm.status = 'sent'; emit(); }, 400); setTimeout(function () { mm.status = 'delivered'; emit(); }, 1200);
    var c = C.conv(cid), others = c.members.filter(function (x) { return x !== ME && C.person(x).online; }); if (!others.length) return;
    var who = others[Math.floor(Math.random() * others.length)];
    setTimeout(function () { mm.status = 'read'; c.typing = who; emit(); }, 1800);
    setTimeout(function () {
      c.typing = null; c.messages.push({ id: 'm' + (++seq), from: who, at: new Date(), text: REPLIES[Math.floor(Math.random() * REPLIES.length)] });
      var visible = (C.panelConv === cid && document.querySelector('.ex-shell.with-chat')) || C.activePage === cid; if (!visible) c.unread++; emit();
    }, 4200);
  };
  C.markRead = function (cid) { var c = C.conv(cid); if (c && c.unread) { c.unread = 0; emit(); } };
  C.react = function (cid, mid, e) {
    var mm = msg(cid, mid), l = mm.reactions = mm.reactions || [], r = l.find(function (x) { return x.emoji === e; });
    if (!r) l.push({ emoji: e, by: [ME] }); else { r.by = r.by.indexOf(ME) >= 0 ? r.by.filter(function (x) { return x !== ME; }) : r.by.concat(ME); if (!r.by.length) l.splice(l.indexOf(r), 1); }
    emit();
  };
  C.remove = function (cid, mid) { Object.assign(msg(cid, mid), { deleted: true, text: undefined, attachments: undefined, voice: undefined, reactions: [] }); emit(); };
  C.togglePin = function (cid) { var c = C.conv(cid); c.pinned = !c.pinned; emit(); };
  C.toggleMute = function (cid) { var c = C.conv(cid); c.muted = !c.muted; emit(); };
  C.startDirect = function (pid) {
    var ex = C.conversations.find(function (c) { return c.kind === 'direct' && c.members.indexOf(pid) >= 0; }); if (ex) return ex.id;
    var c = { id: 'c-' + pid + '-' + (++seq), kind: 'direct', members: [ME, pid], unread: 0, messages: [] }; C.conversations.unshift(c); emit(); return c.id;
  };

  function when(d) {
    if (!d) return ''; var today = new Date(); today.setHours(0, 0, 0, 0);
    if (d >= today) return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    var y = new Date(today); y.setDate(y.getDate() - 1); return d >= y ? 'Hier' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
  function dayLabel(d) {
    var today = new Date(); today.setHours(0, 0, 0, 0); var x = new Date(d); x.setHours(0, 0, 0, 0); var diff = Math.round((today - x) / 86400000);
    return diff === 0 ? 'Aujourd’hui' : diff === 1 ? 'Hier' : d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  }
  function avatar(c, size) {
    if (c.kind === 'direct') { var p = C.peer(c); return '<span class="av"><span class="ava" style="background:' + p.color + '">' + initials(p.name) + '</span>' + (p.online ? '<i class="online"></i>' : '') + '</span>'; }
    return '<span class="av"><span class="ava grp" style="background:' + c.color + '"><span class="mi">' + c.icon + '</span></span></span>';
  }

  /* ── Liste des conversations ─────────────────────────────── */
  C.list = function (el, o) {
    var S = { q: '', filter: 'all' };
    el.classList.add('chl'); if (o.compact) el.classList.add('compact');
    function render() {
      var q = S.q.trim().toLowerCase();
      var l = C.conversations.filter(function (c) { return (S.filter !== 'unread' || c.unread) && (S.filter !== 'groups' || c.kind !== 'direct'); })
        .filter(function (c) { return !q || C.title(c).toLowerCase().indexOf(q) >= 0 || c.messages.some(function (m) { return m.text && m.text.toLowerCase().indexOf(q) >= 0; }); })
        .sort(function (a, b) { return ((C.last(b) || {}).at || 0) - ((C.last(a) || {}).at || 0); });
      var groups = [['Épinglées', l.filter(function (c) { return c.pinned; })], ['Conversations', l.filter(function (c) { return !c.pinned; })]];
      var head = el.querySelector('.chl-head');
      if (!head) el.innerHTML = '<div class="chl-head"><label class="searchbox"><span class="mi">search</span><input type="search" placeholder="Rechercher" aria-label="Rechercher une conversation"></label><div class="chl-filters" role="tablist"></div></div><div class="chl-items"></div>';
      el.querySelector('.chl-filters').innerHTML = [['all', 'Tous'], ['unread', 'Non lus'], ['groups', 'Groupes']].map(function (f) {
        return '<button type="button" role="tab" class="' + (S.filter === f[0] ? 'on' : '') + '" aria-selected="' + (S.filter === f[0]) + '" data-f="' + f[0] + '">' + f[1] + (f[0] === 'unread' && C.totalUnread() ? '<b>' + C.totalUnread() + '</b>' : '') + '</button>'; }).join('');
      el.querySelector('.chl-items').innerHTML = groups.map(function (g) {
        return g[1].length ? '<span class="sec">' + g[0] + '</span>' + g[1].map(function (c) {
          var last = C.last(c), pv = c.typing ? '<em>' + C.person(c.typing).name.split(' ')[0] + ' écrit…</em>'
            : '<span class="pv">' + (last && last.from === ME ? '<span class="mi mini' + (last.status === 'read' ? ' read' : '') + '">' + (last.status === 'sent' || last.status === 'sending' ? 'done' : 'done_all') + '</span>' : last && c.kind !== 'direct' && !last.system ? esc(C.person(last.from).name.split(' ')[0]) + ' : ' : '') + esc(C.preview(last)) + '</span>';
          return '<button type="button" class="item' + (c.id === o.selected ? ' on' : '') + (c.unread ? ' unread' : '') + '" data-pick="' + c.id + '">' + avatar(c) +
            '<span class="body"><span class="top"><strong>' + (c.kind === 'channel' ? '# ' : '') + esc(C.title(c)) + '</strong>' + (c.muted ? '<span class="mi mini">notifications_off</span>' : '') + '<time>' + when(last && last.at) + '</time></span>' +
            '<span class="bottom">' + pv + (c.unread ? '<b class="badge' + (c.muted ? ' muted' : '') + '">' + c.unread + '</b>' : c.pinned ? '<span class="mi mini">push_pin</span>' : '') + '</span></span></button>';
        }).join('') : '';
      }).join('') + (l.length ? '' : '<p class="none">Aucune conversation.</p>');
    }
    el.addEventListener('input', function (e) { if (e.target.type === 'search') { S.q = e.target.value; render(); } });
    el.addEventListener('click', function (e) { var f = e.target.closest('[data-f]'), p = e.target.closest('[data-pick]'); if (f) { S.filter = f.dataset.f; render(); } if (p) o.onPick(p.dataset.pick); });
    var off = C.on(render); render();
    return { render: render, select: function (id) { o.selected = id; render(); }, destroy: off };
  };

  /* ── Fil + saisie ────────────────────────────────────────── */
  C.thread = function (el, o) {
    var cid = o.convId, S = { draft: '', pending: [], replyTo: null, rec: 0 }, recT, players = [];
    el.classList.add('cht'); el.classList.toggle('compact', !!o.compact);
    el.innerHTML = '<div class="thread" role="log" aria-live="polite"></div><footer class="composer"></footer>';
    var th = el.querySelector('.thread'), cp = el.querySelector('.composer');
    function images(m) { return (m.attachments || []).filter(function (a) { return a.kind === 'image' && a.url; }); }
    function others(m) { return (m.attachments || []).filter(function (a) { return !(a.kind === 'image' && a.url); }); }
    function near(a, b) { return a && b && a.from === b.from && !a.system && !b.system && Math.abs(a.at - b.at) < 300000 && dayLabel(a.at) === dayLabel(b.at); }
    function renderThread() {
      var c = C.conv(cid); if (!c) return; var stick = th.scrollHeight - th.scrollTop - th.clientHeight < 80 || !th.childElementCount;
      players.forEach(function (p) { p.destroy && p.destroy(); }); players = [];
      var day = '', html = '';
      c.messages.forEach(function (m, i) {
        var d = dayLabel(m.at); if (d !== day) { html += '<div class="day"><span>' + d + '</span></div>'; day = d; }
        if (m.system) { html += '<div class="system">' + esc(m.text) + '</div>'; return; }
        var first = !near(c.messages[i - 1], m), last = !near(m, c.messages[i + 1]), mine = m.from === ME, p = C.person(m.from), im = images(m), ot = others(m);
        var q = m.replyTo && c.messages.find(function (x) { return x.id === m.replyTo; });
        html += '<div class="msg' + (mine ? ' mine' : '') + (first ? ' first' : '') + (last ? ' last' : '') + '">' + (mine ? '' : '<span class="ava-slot">' + (last ? '<span class="ava" style="background:' + p.color + '">' + initials(p.name) + '</span>' : '') + '</span>') +
          '<div class="col">' + (first && !mine && c.kind !== 'direct' ? '<span class="author" style="color:' + p.color + '">' + esc(p.name) + '</span>' : '') + '<div class="bubble-wrap">' +
          '<div class="bubble' + (m.deleted ? ' deleted' : '') + (!m.text && !m.voice && !ot.length && im.length && !m.replyTo ? ' media-only' : '') + '">' +
          (m.deleted ? '<span class="del"><span class="mi">block</span>Message supprimé</span>' :
            (q ? '<div class="quote"><strong>' + (q.from === ME ? 'Vous' : esc(C.person(q.from).name)) + '</strong><span>' + esc(C.preview(q)) + '</span></div>' : '') +
            (im.length ? '<div class="pics" data-n="' + Math.min(3, im.length) + '">' + im.slice(0, 3).map(function (a, k) { return '<button type="button" data-open="' + m.id + '" data-a="' + a.id + '" aria-label="Agrandir ' + esc(a.name) + '"><img src="' + a.url + '" alt="' + esc(a.name) + '" loading="lazy">' + (k === 2 && im.length > 3 ? '<span class="more">+' + (im.length - 3) + '</span>' : '') + '</button>'; }).join('') + '</div>' : '') +
            ot.map(function (a) { return '<button type="button" class="file" data-open="' + m.id + '" data-a="' + a.id + '"' + (a.url ? '' : ' disabled') + '><img src="' + ROOT + 'assets/icons-files/' + Files.KINDS[a.kind].img + '" alt=""><span><strong>' + esc(a.name) + '</strong><small>' + Files.KINDS[a.kind].label + ' · ' + Files.size(a.size) + '</small></span></button>'; }).join('') +
            (m.voice ? '<div class="voice" data-voice="' + m.id + '"></div>' : '') + (m.text ? '<p class="text">' + UIKitUtils.markdownInline(m.text) + '</p>' : '')) +
          '<span class="meta">' + m.at.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + (mine && !m.deleted ? '<span class="mi tick' + (m.status === 'read' ? ' read' : '') + '" title="' + { read: 'Lu', delivered: 'Distribué', sent: 'Envoyé', sending: 'Envoi…' }[m.status] + '">' + (m.status === 'sending' ? 'schedule' : m.status === 'sent' ? 'done' : 'done_all') + '</span>' : '') + '</span></div>' +
          (m.deleted ? '' : '<div class="hover-actions">' + QUICK.slice(0, o.compact ? 3 : 5).map(function (e) { return '<button type="button" class="qe" data-react="' + m.id + '" data-e="' + e + '" aria-label="Réagir ' + e + '">' + e + '</button>'; }).join('') +
            '<button type="button" data-reply="' + m.id + '" title="Répondre" aria-label="Répondre"><span class="mi">reply</span></button>' +
            '<details class="ui-menu"><summary aria-label="Plus d’actions"><span class="mi">more_horiz</span></summary><div class="ui-menu__panel"><button class="ui-menu__item" data-reply="' + m.id + '"><span class="mi">reply</span>Répondre</button>' +
            (m.text ? '<button class="ui-menu__item" data-copy="' + esc(m.text) + '"><span class="mi">content_copy</span>Copier le texte</button>' : '') + '<button class="ui-menu__item"><span class="mi">forward</span>Transférer</button>' +
            (mine ? '<hr><button class="ui-menu__item danger" data-del="' + m.id + '"><span class="mi">delete</span>Supprimer</button>' : '') + '</div></details></div>') + '</div>' +
          (m.reactions && m.reactions.length ? '<div class="reactions">' + m.reactions.map(function (x) { return '<button type="button" class="' + (x.by.indexOf(ME) >= 0 ? 'on' : '') + '" data-react="' + m.id + '" data-e="' + x.emoji + '" title="' + x.by.map(function (b) { return b === ME ? 'Vous' : C.person(b).name.split(' ')[0]; }).join(', ') + '">' + x.emoji + '<b>' + x.by.length + '</b></button>'; }).join('') + '</div>' : '') +
          '</div></div>';
      });
      if (!c.messages.length) html = '<div class="empty"><span class="mi">waving_hand</span><strong>Démarrez la conversation</strong><span>Envoyez un premier message.</span></div>';
      if (c.typing) { var tp = C.person(c.typing); html += '<div class="msg first last"><span class="ava-slot"><span class="ava" style="background:' + tp.color + '">' + initials(tp.name) + '</span></span><div class="col"><div class="bubble typing" aria-label="' + esc(tp.name) + ' écrit…"><i></i><i></i><i></i></div></div></div>'; }
      th.innerHTML = html;
      th.querySelectorAll('[data-voice]').forEach(function (v) { var mm = c.messages.find(function (x) { return x.id === v.dataset.voice; }); players.push(Media.audio(v, { tracks: [{ title: 'Note vocale', src: mm.voice.src, blob: mm.voice.blob }], variant: 'compact' })); });
      if (stick) th.scrollTop = th.scrollHeight;
      C.markRead(cid);
    }
    function renderComposer() {
      var q = S.replyTo && msg(cid, S.replyTo);
      cp.innerHTML = (q ? '<div class="reply-bar"><span class="mi">reply</span><div><strong>Réponse à ' + (q.from === ME ? 'vous-même' : esc(C.person(q.from).name)) + '</strong><span>' + esc(C.preview(q)) + '</span></div><button class="ui-btn ui-btn--icon" data-unreply aria-label="Annuler la réponse"><span class="mi">close</span></button></div>' : '') +
        (S.pending.length ? '<div class="pending">' + S.pending.map(function (a) { return '<span class="pj">' + Files.thumb(a) + '<span class="pj-name">' + esc(a.name) + '</span><button type="button" data-unattach="' + a.id + '" aria-label="Retirer ' + esc(a.name) + '"><span class="mi">close</span></button></span>'; }).join('') + '</div>' : '') +
        (S.rec ? '<div class="rec"><button class="ui-btn ui-btn--icon" data-rec-cancel title="Annuler" aria-label="Annuler l’enregistrement"><span class="mi">delete</span></button><span class="rec-dot"></span><span class="rec-time">' + Math.floor(Math.max(0, S.rec - 1) / 60) + ':' + ('0' + (Math.max(0, S.rec - 1) % 60)).slice(-2) + '</span>' +
          '<span class="rec-wave">' + Array.from({ length: 16 }, function (_, i) { return '<i style="animation-delay:' + (i * 70) + 'ms"></i>'; }).join('') + '</span><button class="ui-btn ui-btn--sm" data-rec><span class="mi">send</span>Envoyer</button></div>'
        : '<div class="box"><details class="ui-menu chat-attach"><summary class="ui-btn ui-btn--icon" title="Joindre" aria-label="Joindre"><span class="mi">add_circle_outline</span></summary><div class="ui-menu__panel">' +
          '<button class="ui-menu__item" data-local><span class="mi">add_photo_alternate</span>Photos et fichiers</button><button class="ui-menu__item" data-drive><span class="mi">folder_open</span>Depuis mes fichiers</button></div></details><input type="file" hidden multiple>' +
          '<textarea rows="1" placeholder="' + (o.compact ? 'Message…' : 'Écrire un message…') + '" title="Entrée pour envoyer · Maj + Entrée pour aller à la ligne" aria-label="Message">' + esc(S.draft) + '</textarea>' +
          '<details class="ui-menu chat-emoji"><summary class="ui-btn ui-btn--icon" title="Emoji" aria-label="Emoji"><span class="mi">sentiment_satisfied</span></summary><div class="ui-menu__panel"><div class="emoji-grid">' + EMOJIS.map(function (e) { return '<button type="button" data-emoji="' + e + '">' + e + '</button>'; }).join('') + '</div></div></details>' +
          '<button class="ui-btn ui-btn--icon send" data-send aria-label="Envoyer"' + (S.draft.trim() || S.pending.length ? '' : ' hidden') + '><span class="mi">send</span></button>' +
          '<button class="ui-btn ui-btn--icon" data-rec title="Note vocale" aria-label="Enregistrer une note vocale"' + (S.draft.trim() || S.pending.length ? ' hidden' : '') + '><span class="mi">mic</span></button></div>');
    }
    function syncSend() { var can = !!(S.draft.trim() || S.pending.length), s = cp.querySelector('[data-send]'), r = cp.querySelector('[data-rec]'); if (s) s.hidden = !can; if (r && !S.rec) r.hidden = can; }
    function send() {
      if (!S.draft.trim() && !S.pending.length) return; C.send(cid, S.draft, S.pending, S.replyTo);
      S.draft = ''; S.pending = []; S.replyTo = null; renderComposer(); var ta = cp.querySelector('textarea'); if (ta) ta.focus(); th.scrollTop = th.scrollHeight;
    }
    function toAtt(i) { return { id: i.id, kind: i.kind, name: i.name, size: i.size, url: i.url, mime: i.mime, blob: i.blob }; }
    el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-open],[data-react],[data-reply],[data-copy],[data-del],[data-unreply],[data-unattach],[data-local],[data-drive],[data-emoji],[data-send],[data-rec],[data-rec-cancel]'); if (!t) return;
      var d = t.closest('details'); if (d && !t.dataset.emoji) d.removeAttribute('open');
      if (t.dataset.open) { var m = msg(cid, t.dataset.open), list = (images(m).indexOf && images(m).some(function (a) { return a.id === t.dataset.a; })) ? images(m) : others(m).filter(function (a) { return a.url; }), a = list.find(function (x) { return x.id === t.dataset.a; }); if (a) Media.viewer(list.map(function (x) { return { name: x.name, url: x.url, type: x.mime, size: x.size, blob: x.blob }; }), list.indexOf(a)); }
      if (t.dataset.react) C.react(cid, t.dataset.react, t.dataset.e);
      if (t.dataset.reply) { S.replyTo = t.dataset.reply; renderComposer(); cp.querySelector('textarea').focus(); }
      if (t.dataset.del) C.remove(cid, t.dataset.del);
      if (t.hasAttribute('data-unreply')) { S.replyTo = null; renderComposer(); }
      if (t.dataset.unattach) { S.pending = S.pending.filter(function (x) { return x.id !== t.dataset.unattach; }); renderComposer(); }
      if (t.hasAttribute('data-local')) cp.querySelector('input[type=file]').click();
      if (t.hasAttribute('data-drive')) Files.pick({ title: 'Envoyer des fichiers', confirmLabel: 'Joindre' }).then(function (items) { if (items) { items.forEach(function (i) { if (!S.pending.some(function (x) { return x.id === i.id; })) S.pending.push(toAtt(i)); }); renderComposer(); } });
      if (t.dataset.emoji) { var ta = cp.querySelector('textarea'), at = ta.selectionStart; S.draft = ta.value.slice(0, at) + t.dataset.emoji + ta.value.slice(ta.selectionEnd); ta.value = S.draft; ta.focus(); ta.setSelectionRange(at + 2, at + 2); syncSend(); }
      if (t.hasAttribute('data-send')) send();
      if (t.hasAttribute('data-rec')) {
        if (!S.rec) { S.rec = 1; recT = setInterval(function () { S.rec++; var tm = cp.querySelector('.rec-time'); if (tm) tm.textContent = Math.floor((S.rec - 1) / 60) + ':' + ('0' + ((S.rec - 1) % 60)).slice(-2); }, 1000); renderComposer(); }
        else { clearInterval(recT); var secs = Math.max(2, S.rec); S.rec = 0; var b = DATA.buildSampleWav(secs, secs); C.send(cid, '', [], S.replyTo, { src: URL.createObjectURL(b), blob: b, duration: secs }); S.replyTo = null; renderComposer(); }
      }
      if (t.hasAttribute('data-rec-cancel')) { clearInterval(recT); S.rec = 0; renderComposer(); }
    });
    el.addEventListener('input', function (e) { if (e.target.tagName === 'TEXTAREA') { S.draft = e.target.value; e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'; syncSend(); } });
    el.addEventListener('keydown', function (e) {
      if (e.target.tagName !== 'TEXTAREA') return;
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); }
      if (e.key === 'Escape' && S.replyTo) { S.replyTo = null; renderComposer(); }
    });
    el.addEventListener('change', function (e) { if (e.target.type === 'file' && e.target.files.length) { S.pending = S.pending.concat(Files.addFiles(e.target.files, null).map(toAtt)); e.target.value = ''; renderComposer(); } });
    var off = C.on(renderThread); renderThread(); renderComposer();
    return { destroy: function () { off(); clearInterval(recT); players.forEach(function (p) { p.destroy && p.destroy(); }); } };
  };

  /* ── Panneau latéral (sidenav droite du shell) ───────────── */
  var panel;
  C.mountPanel = function (el, convId) {
    deps().then(function () {
      C.ensure(); if (convId) C.panelConv = convId;
      if (panel) panel.destroy();
      var sub;
      function render() {
        if (sub && sub.destroy) sub.destroy();
        var c = C.conv(C.panelConv);
        if (c) {
          el.innerHTML = '<header class="ph conv"><button class="ui-btn ui-btn--icon" data-back aria-label="Retour aux conversations"><span class="mi">arrow_back</span></button>' + avatar(c) +
            '<span class="who"><strong>' + (c.kind === 'channel' ? '# ' : '') + esc(C.title(c)) + '</strong><small class="st"></small></span>' +
            '<button class="ui-btn ui-btn--icon" title="Appel" aria-label="Appel"><span class="mi">call</span></button><a class="ui-btn ui-btn--icon" href="' + ROOT + 'examples/app/chat.html?c=' + c.id + '" title="Ouvrir en plein écran" aria-label="Ouvrir en plein écran"><span class="mi">open_in_full</span></a></header><div class="ph-body"></div>';
          sub = C.thread(el.querySelector('.ph-body'), { convId: c.id, compact: true });
          status();
        } else {
          el.innerHTML = '<header class="ph"><strong>Messages</strong><span class="n"></span><span class="spacer"></span>' +
            '<details class="ui-menu"><summary class="ui-btn ui-btn--icon" title="Nouvelle conversation" aria-label="Nouvelle conversation"><span class="mi">edit_square</span></summary><div class="ui-menu__panel">' +
            PEOPLE.filter(function (p) { return p.id !== ME; }).map(function (p) { return '<button class="ui-menu__item" data-new="' + p.id + '"><span class="mi">person</span>' + p.name + '</button>'; }).join('') + '</div></details>' +
            '<a class="ui-btn ui-btn--icon" href="' + ROOT + 'examples/app/chat.html" title="Ouvrir la messagerie" aria-label="Ouvrir la messagerie"><span class="mi">open_in_full</span></a><button class="ui-btn ui-btn--icon" data-close aria-label="Fermer"><span class="mi">close</span></button></header><div class="ph-body"></div>';
          sub = C.list(el.querySelector('.ph-body'), { compact: true, selected: null, onPick: function (id) { C.panelConv = id; render(); } });
          count();
        }
      }
      function count() { var n = el.querySelector('.ph .n'); if (n) { n.textContent = C.totalUnread(); n.hidden = !C.totalUnread(); } }
      function status() { var c = C.conv(C.panelConv), s = el.querySelector('.st'); if (c && s) s.textContent = c.typing ? C.person(c.typing).name.split(' ')[0] + ' écrit…' : c.kind === 'direct' ? (C.peer(c).online ? 'En ligne' : 'Hors ligne') : c.members.length + ' membres'; }
      var off = C.on(function () { count(); status(); });
      el.onclick = function (e) {
        var t = e.target.closest('[data-back],[data-close],[data-new]'); if (!t) return;
        if (t.hasAttribute('data-back')) { C.panelConv = null; render(); }
        if (t.hasAttribute('data-close')) EX.closeChat();
        if (t.dataset.new) { C.panelConv = C.startDirect(t.dataset.new); render(); }
      };
      render(); emit();
      panel = { destroy: function () { off(); if (sub && sub.destroy) sub.destroy(); } };
    });
  };
  C.deps = deps; C.ME = ME; C.initials = initials; C.avatar = avatar;
  window.ExChat = C;
})();
