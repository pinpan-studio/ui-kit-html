/* ==========================================================================
   Shell des écrans d'exemple (examples/app/**, examples/forms/**) en JS natif :
   sidenav (recherche, sections, section repliable), barre d'outils (fil d'Ariane,
   palette ⌘K, mode, thème, messages, notifications, compte), panneau de messagerie.

   <body data-ex data-root="../../" data-title="Contact" data-crumb="" data-flush data-no-chat>
     <main id="ex-content">…</main>
   API : window.EX = { root, openChat(convId?), closeChat(), toast, palette }
   ========================================================================== */
(function () {
  'use strict';
  var body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var TITLE = body.getAttribute('data-title') || document.title;
  var CRUMB = body.getAttribute('data-crumb') || '';
  var here = location.pathname.replace(/\/+$/, '');

  var TOP = [
    { label: 'Tableau de bord', icon: 'space_dashboard', path: 'examples/app/dashboard.html' },
    { label: 'Supervision', icon: 'monitor_heart', path: 'examples/app/monitoring.html' },
    { label: 'Modules', icon: 'apps', path: 'examples/app/modules.html' }
  ];
  var GROUPS = [
    { label: 'Pilotage', icon: 'insights', items: [
      { label: 'Clients', icon: 'group', path: 'examples/app/clients.html' },
      { label: 'Catalogue', icon: 'inventory_2', path: 'examples/app/catalog.html' },
      { label: 'Planning', icon: 'view_kanban', path: 'examples/app/board.html' }] },
    { label: 'Communication', icon: 'forum', items: [
      { label: 'Messagerie', icon: 'inbox', path: 'examples/app/inbox.html', badge: 2 },
      { label: 'Messagerie instantanée', icon: 'chat', path: 'examples/app/chat.html' },
      { label: 'Fil d’équipe', icon: 'dynamic_feed', path: 'examples/app/feed.html' }] },
    { label: 'Ressources', icon: 'local_library', items: [
      { label: 'Blog', icon: 'newspaper', path: 'examples/app/blog.html' },
      { label: 'Documentation', icon: 'menu_book', path: 'examples/app/docs.html' },
      { label: 'Fichiers', icon: 'folder', path: 'examples/app/files.html' }] },
    { label: 'Formulaires', icon: 'dynamic_form', collapsible: true, items: [
      { label: 'Contact', icon: 'contact_mail', path: 'examples/forms/contact.html' },
      { label: 'Commande', icon: 'shopping_cart_checkout', path: 'examples/forms/checkout.html' },
      { label: 'Réservation', icon: 'event_available', path: 'examples/forms/booking.html' },
      { label: 'Candidature', icon: 'assignment_ind', path: 'examples/forms/application.html' },
      { label: 'Assistant d’accueil', icon: 'rocket_launch', path: 'examples/forms/onboarding.html' },
      { label: 'Questionnaire', icon: 'quiz', path: 'examples/forms/survey.html' }] },
    { label: 'Compte', icon: 'manage_accounts', items: [
      { label: 'Paramètres', icon: 'settings', path: 'examples/app/settings.html' }] }
  ];
  var NOTIFS = [
    { title: 'Paiement reçu', message: 'Cacao Plus a réglé la facture FAC-2026-0981 (4,2 M FCFA).', at: 'il y a 12 min', icon: 'payments', tone: 'success' },
    { title: 'Aya Koné vous a mentionné', message: '« @Jean peux-tu valider le créneau de jeudi ? »', at: 'il y a 2 h', avatar: 'AK', actions: ['Répondre', 'Plus tard'] },
    { title: '3 factures en retard', message: 'Relance automatique programmée demain à 9 h.', at: 'il y a 5 h', icon: 'schedule', tone: 'warning' },
    { title: 'Version 2.4 disponible', message: 'Export PDF corrigé, nouveaux rapports.', at: 'hier', icon: 'new_releases', tone: 'info', read: true }
  ];

  function isHere(p) { return here.slice(-p.length) === p; }
  function link(n) {
    return '<a class="ex-link" href="' + ROOT + n.path + '" data-label="' + n.label.toLowerCase() + '"' + (isHere(n.path) ? ' aria-current="page"' : '') + '>' +
      '<span class="mi">' + n.icon + '</span><span>' + n.label + '</span>' + (n.badge ? '<span class="count">' + n.badge + '</span>' : '') + '</a>';
  }
  var navHtml = '<div class="ex-sec">' + TOP.map(link).join('') + '</div>' + GROUPS.map(function (g) {
    var open = g.items.some(function (n) { return isHere(n.path); });
    var head = g.collapsible
      ? '<button type="button" class="ex-sec__head" data-ex-toggle aria-expanded="' + open + '"><span class="mi">' + g.icon + '</span>' + g.label + '<span class="mi chev">expand_more</span></button>'
      : '<div class="ex-sec__head"><span class="mi">' + g.icon + '</span>' + g.label + '</div>';
    return '<div class="ex-sec' + (open || !g.collapsible ? ' open' : '') + '" data-group="' + g.label.toLowerCase() + '">' + head +
      '<div class="ex-sec__items' + (g.collapsible ? ' collapsible' : '') + '">' + g.items.map(link).join('') + '</div></div>';
  }).join('');

  var unread = NOTIFS.filter(function (n) { return !n.read; }).length;
  var notifHtml = '<header><strong>Notifications</strong><button class="ui-btn ui-btn--text ui-btn--sm" data-ex-readall>Tout marquer comme lu</button></header>' +
    NOTIFS.map(function (n) {
      return '<div class="ex-notif' + (n.read ? '' : ' unread') + '">' +
        (n.avatar ? '<span class="ava sm" style="width:36px;height:36px">' + n.avatar + '</span>' : '<span class="ic tone-' + n.tone + '"><span class="mi" style="font-size:18px">' + n.icon + '</span></span>') +
        '<div><strong>' + n.title + '</strong><p>' + n.message + '</p><small>' + n.at + '</small>' +
        (n.actions ? '<div class="acts">' + n.actions.map(function (a, i) { return '<button class="ui-btn ui-btn--sm ' + (i ? 'ui-btn--text' : 'ui-btn--tonal') + '">' + a + '</button>'; }).join('') + '</div>' : '') +
        '</div></div>';
    }).join('');

  var content = document.getElementById('ex-content');
  var shell = document.createElement('div');
  shell.className = 'ex-shell';
  shell.innerHTML =
    '<aside class="ex-side" aria-label="Navigation"><div class="ex-side__inner">' +
      '<div class="ex-side__head"><img src="' + ROOT + 'assets/logo.png" alt="SC Storage"><span><strong>SC Storage</strong><small>Espace de travail</small></span>' +
      '<button class="ui-btn ui-btn--icon ex-close-nav" data-ex-nav aria-label="Fermer le menu"><span class="mi">chevron_left</span></button></div>' +
      '<label class="kit-search"><span class="mi">search</span><input type="search" placeholder="Rechercher une page…" aria-label="Rechercher une page"></label>' +
      '<nav>' + navHtml + '</nav></div></aside>' +
    '<div class="ex-scrim" data-ex-nav></div>' +
    '<div class="ex-main">' +
      '<header class="ex-bar">' +
        '<button class="ui-btn ui-btn--icon" data-ex-nav aria-label="Afficher / masquer le menu"><span class="mi">menu</span></button>' +
        '<span class="ex-bar__title">' + (CRUMB ? '<span class="crumb">' + CRUMB + '</span><span class="mi sep">chevron_right</span>' : '') + '<span class="cur">' + TITLE + '</span></span>' +
        '<span class="spacer"></span>' +
        '<button type="button" class="ex-palette-btn" data-ex-palette aria-label="Rechercher (Ctrl+K)"><span class="mi">search</span><span>Rechercher…</span><span class="kbd">⌘K</span></button>' +
        '<button class="ui-btn ui-btn--icon hide-sm" data-ex-mode aria-label="Changer de mode"><span class="mi">dark_mode</span></button>' +
        '<details class="ui-menu hide-sm"><summary class="ui-btn ui-btn--icon" aria-label="Thème de couleur"><span class="mi">palette</span></summary><div class="ui-menu__panel kit-theme-panel"><div class="kit-themes"></div></div></details>' +
        (body.hasAttribute('data-no-chat') ? '' : '<button class="ui-btn ui-btn--icon ex-badge-btn" data-ex-chat aria-label="Messages"><span class="mi">chat_bubble_outline</span><span class="n">3</span></button>') +
        '<details class="ui-menu"><summary class="ui-btn ui-btn--icon ex-badge-btn" aria-label="Notifications"><span class="mi">notifications</span>' + (unread ? '<span class="n" id="ex-notif-n">' + unread + '</span>' : '') + '</summary>' +
          '<div class="ui-menu__panel ex-notifs">' + notifHtml + '</div></details>' +
        '<details class="ui-menu"><summary aria-label="Mon compte" style="cursor:pointer"><span class="ex-avatar">JK</span></summary><div class="ui-menu__panel">' +
          '<div class="ex-menu-me"><strong>Jean Kouassi</strong><small>jean.kouassi@example.com</small></div><hr>' +
          '<a class="ui-menu__item" href="' + ROOT + 'examples/app/settings.html"><span class="mi">person</span>Mon profil</a>' +
          '<a class="ui-menu__item" href="' + ROOT + 'examples/app/settings.html"><span class="mi">settings</span>Paramètres</a>' +
          '<button class="ui-menu__item" data-ex-palette><span class="mi">keyboard_command_key</span>Commandes<span class="kbd" style="margin-left:auto">⌘K</span></button><hr>' +
          '<a class="ui-menu__item" href="' + ROOT + 'examples/auth.html?v=lock"><span class="mi">lock</span>Verrouiller</a>' +
          '<a class="ui-menu__item" href="' + ROOT + 'examples/auth.html?v=centered"><span class="mi">logout</span>Se déconnecter</a></div></details>' +
      '</header>' +
    '</div>' +
    '<aside class="ex-chat" hidden aria-label="Messagerie"><div class="ex-chat__inner" id="ex-chat-panel"></div></aside>';
  body.classList.add('ex-body');
  body.insertBefore(shell, body.firstChild);
  shell.querySelector('.ex-main').appendChild(content);
  content.classList.add('ex-content');
  if (body.hasAttribute('data-flush')) content.classList.add('flush');
  document.title = TITLE + ' — SC Storage';

  var mq = matchMedia('(max-width: 959px)');
  function toggleNav() {
    if (mq.matches) shell.classList.toggle('nav-open');
    else shell.classList.toggle('nav-closed');
  }
  shell.querySelector('.ex-close-nav').hidden = !mq.matches;
  mq.addEventListener('change', function () { shell.querySelector('.ex-close-nav').hidden = !mq.matches; shell.classList.remove('nav-open'); });

  // Recherche dans la navigation
  shell.querySelector('.kit-search input').addEventListener('input', function (e) {
    var q = e.target.value.trim().toLowerCase();
    shell.querySelectorAll('.ex-sec').forEach(function (s) {
      var gm = q && (s.getAttribute('data-group') || '').indexOf(q) >= 0, any = false;
      s.querySelectorAll('.ex-link').forEach(function (a) { var ok = !q || gm || a.getAttribute('data-label').indexOf(q) >= 0; a.hidden = !ok; any = any || ok; });
      s.hidden = !any;
      if (q) s.classList.add('open');
    });
  });

  // Mode & thèmes
  var modeBtn = shell.querySelector('[data-ex-mode]');
  function isDark() { var m = document.documentElement.getAttribute('data-mode'); return m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches); }
  function syncMode() { modeBtn.firstChild.textContent = isDark() ? 'light_mode' : 'dark_mode'; }
  syncMode();
  var themes = shell.querySelector('.kit-themes');
  function loadThemes() {
    if (!window.UIKIT_THEMES || themes.childElementCount) return;
    themes.innerHTML = UIKIT_THEMES.map(function (t) { return '<button type="button" data-set-theme="' + t.id + '" title="' + t.label + '" aria-label="Thème ' + t.label + '" style="background:' + t.light + '"></button>'; }).join('');
    var cur = (document.documentElement.className.match(/theme-([\w-]+)/) || [])[1]; if (cur) UIKit.setTheme(cur);
  }
  if (!window.UIKIT_THEMES) { var sc = document.createElement('script'); sc.src = ROOT + 'js/themes.js'; sc.onload = loadThemes; document.head.appendChild(sc); } else loadThemes();

  // Panneau de messagerie (rempli par js/ex-chat.js s'il est chargé)
  var chatAside = shell.querySelector('.ex-chat');
  function openChat(conv) {
    chatAside.hidden = false; shell.classList.add('with-chat');
    var b = shell.querySelector('[data-ex-chat] .mi'); if (b) b.textContent = 'chat_bubble';
    if (window.ExChat) window.ExChat.mountPanel(document.getElementById('ex-chat-panel'), conv);
    else {
      var s = document.createElement('script'); s.src = ROOT + 'js/ex-chat.js';
      s.onload = function () { window.ExChat.mountPanel(document.getElementById('ex-chat-panel'), conv); };
      document.head.appendChild(s);
    }
  }
  function closeChat() { chatAside.hidden = true; shell.classList.remove('with-chat'); var b = shell.querySelector('[data-ex-chat] .mi'); if (b) b.textContent = 'chat_bubble_outline'; }

  // Palette de commandes ⌘K
  var CMDS = TOP.concat.apply(TOP, GROUPS.map(function (g) { return g.items; })).map(function (n) { return { group: 'Aller à', label: n.label, icon: n.icon, href: ROOT + n.path }; }).concat([
    { group: 'Actions', label: 'Nouveau client', icon: 'person_add', hint: 'CRM', href: ROOT + 'examples/app/clients.html' },
    { group: 'Actions', label: 'Nouvelle tâche', icon: 'add_task', hint: 'Planning', href: ROOT + 'examples/app/board.html' },
    { group: 'Actions', label: 'Rédiger un message', icon: 'edit', hint: 'Messagerie', href: ROOT + 'examples/app/inbox.html' },
    { group: 'Actions', label: 'Basculer clair / sombre', icon: 'contrast', run: function () { modeBtn.click(); } },
    { group: 'Compte', label: 'Verrouiller la session', icon: 'lock', href: ROOT + 'examples/auth.html?v=lock' },
    { group: 'Compte', label: 'Se déconnecter', icon: 'logout', href: ROOT + 'examples/auth.html?v=centered' },
    { group: 'Catalogue', label: 'Retour au catalogue UI', icon: 'widgets', href: ROOT + 'index.html' }
  ]);
  var dlg = document.createElement('dialog');
  dlg.className = 'cmdk';
  dlg.innerHTML = '<div class="cmdk__input"><span class="mi">search</span><input placeholder="Rechercher une page ou une action…" aria-label="Commande"><span class="kbd">Échap</span></div><div class="cmdk__list" role="listbox"></div>';
  body.appendChild(dlg);
  var cIn = dlg.querySelector('input'), cList = dlg.querySelector('.cmdk__list'), sel = 0, shown = [];
  function renderCmds() {
    var q = cIn.value.trim().toLowerCase(), last = '';
    shown = CMDS.filter(function (c) { return !q || c.label.toLowerCase().indexOf(q) >= 0 || c.group.toLowerCase().indexOf(q) >= 0; });
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    cList.innerHTML = shown.length ? shown.map(function (c, i) {
      var h = c.group !== last ? '<div class="cmdk__group">' + c.group + '</div>' : ''; last = c.group;
      return h + '<button class="cmdk__item" role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span class="mi">' + c.icon + '</span>' + c.label + (c.hint ? '<small>' + c.hint + '</small>' : '') + '</button>';
    }).join('') : '<div class="cmdk__empty">Aucun résultat</div>';
    var s = cList.querySelector('[aria-selected=true]'); if (s) s.scrollIntoView({ block: 'nearest' });
  }
  function runCmd(c) { dlg.close(); if (!c) return; if (c.run) c.run(); else location.href = c.href; }
  function openPalette() { cIn.value = ''; sel = 0; renderCmds(); dlg.showModal(); cIn.focus(); }
  cIn.addEventListener('input', function () { sel = 0; renderCmds(); });
  cIn.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); renderCmds(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); renderCmds(); e.preventDefault(); }
    else if (e.key === 'Enter') runCmd(shown[sel]);
  });
  cList.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) runCmd(shown[+b.dataset.i]); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.open ? dlg.close() : openPalette(); } });

  shell.addEventListener('click', function (e) {
    var t = e.target.closest('[data-ex-nav],[data-ex-toggle],[data-ex-mode],[data-ex-palette],[data-ex-chat],[data-ex-readall],.ex-link');
    if (!t) return;
    if (t.matches('.ex-link') && mq.matches) shell.classList.remove('nav-open');
    if (t.hasAttribute('data-ex-nav')) toggleNav();
    if (t.hasAttribute('data-ex-toggle')) { var s = t.parentNode; s.classList.toggle('open'); t.setAttribute('aria-expanded', s.classList.contains('open')); }
    if (t.hasAttribute('data-ex-mode')) { UIKit.setMode(isDark() ? 'light' : 'dark'); syncMode(); }
    if (t.hasAttribute('data-ex-palette')) { var d = t.closest('details'); if (d) d.removeAttribute('open'); openPalette(); }
    if (t.hasAttribute('data-ex-chat')) chatAside.hidden ? openChat() : closeChat();
    if (t.hasAttribute('data-ex-readall')) { shell.querySelectorAll('.ex-notif.unread').forEach(function (n) { n.classList.remove('unread'); }); var n = document.getElementById('ex-notif-n'); if (n) n.remove(); }
  });

  window.EX = { root: ROOT, openChat: openChat, closeChat: closeChat, toast: function (m) { UIKit.toast(m); }, palette: openPalette };

  var q = new URLSearchParams(location.search).get('chat');
  if (q && !body.hasAttribute('data-no-chat')) openChat(q === '1' ? null : q);
})();
