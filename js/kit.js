/* ==========================================================================
   Shell du catalogue (barre latérale + barre d'outils), injecté en JS natif.
   Reproduction du layout « kit » d'origine (kit-layout.component).
   Usage : <body data-kit data-root="../" data-active="components/buttons.html">
             <main id="kit-content">…</main>
   ========================================================================== */
(function () {
  'use strict';
  var body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var ACTIVE = body.getAttribute('data-active') || '';
  window.KIT_ROOT = ROOT;

  // Styles du shell (chargés une fois, avant le premier rendu du shell).
  if (!document.querySelector('link[data-kit-css]')) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = ROOT + 'css/kit.css'; l.setAttribute('data-kit-css', ''); document.head.appendChild(l); }

  var KIT_NAV = {
    top: [
      { label: 'UI Showcase', path: 'index.html', icon: 'auto_awesome_mosaic' },
      { label: 'Studio de thème', path: 'theme-studio.html', icon: 'tune' },
      { label: 'Showcases', path: 'showcases.html', icon: 'devices' }
    ],
    components: [
      { label: 'Typographie', path: 'components/typography.html', icon: 'text_fields' },
      { label: 'Formulaires', path: 'components/forms.html', icon: 'edit_note' },
      { label: 'Champs avancés', path: 'components/fields.html', icon: 'dynamic_form' },
      { label: 'Boutons', path: 'components/buttons.html', icon: 'smart_button' },
      { label: 'Navigation', path: 'components/navigation.html', icon: 'explore' },
      { label: 'Data display', path: 'components/data.html', icon: 'table_chart' },
      { label: 'Feedback', path: 'components/feedback.html', icon: 'notifications_active' },
      { label: 'Planning', path: 'components/planning.html', icon: 'view_timeline' },
      { label: 'Cartes', path: 'components/maps.html', icon: 'map' },
      { label: 'Médias', path: 'components/media.html', icon: 'perm_media' },
      { label: 'Interactions', path: 'components/interactions.html', icon: 'touch_app' },
      { label: 'Material & CDK', path: 'components/material.html', icon: 'extension' },
      { label: 'Layout', path: 'components/layout.html', icon: 'dashboard_customize' }
    ],
    layouts: [{ label: 'Galerie des layouts', path: 'layouts.html', icon: 'view_compact' }]
  };
  window.KIT_NAV = KIT_NAV;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function item(i, cls) {
    return '<a class="menu-item' + (cls ? ' ' + cls : '') + (i.path === ACTIVE ? ' active' : '') + '" href="' + ROOT + i.path + '"' + (i.path === ACTIVE ? ' aria-current="page"' : '') +
      ' data-label="' + esc(i.label.toLowerCase()) + '"><span class="mi item-icon">' + i.icon + '</span><span class="item-label">' + esc(i.label) + '</span></a>';
  }
  function section(title, icon, items) {
    return '<div class="menu-section"><div class="section-header"><span class="mi section-icon">' + icon + '</span><span class="section-title">' + title + '</span></div><div class="section-items">' + items.map(function (i) { return item(i); }).join('') + '</div></div>';
  }
  var pagesOpen = ACTIVE === 'pages.html';
  function pagesSection() {
    var reg = window.PAGE_REGISTRY || [];
    return '<div class="menu-section" id="kit-pages"><button type="button" class="section-header clickable" data-pages-toggle aria-expanded="' + pagesOpen + '"><span class="mi section-icon">view_quilt</span><span class="section-title">Pages</span><span class="spacer"></span><span class="mi chevron' + (pagesOpen ? ' open' : '') + '">expand_more</span></button>' +
      '<div class="section-items"' + (pagesOpen ? '' : ' hidden') + '>' + item({ label: 'Toutes les pages', path: 'pages.html', icon: 'grid_view' }) +
      reg.map(function (g) { return '<button type="button" class="menu-item group-toggle" data-group="' + g.id + '" data-label="' + esc(g.label.toLowerCase()) + '"><span class="mi item-icon">' + g.icon + '</span><span class="item-label">' + esc(g.label) + '</span><span class="count">' + g.pages.length + '</span><span class="mi chevron small">expand_more</span></button>' +
        '<div class="sub-items" data-sub="' + g.id + '" hidden>' + g.pages.map(function (p) { return '<a class="menu-item sub" href="' + ROOT + p.path + '" title="' + esc(p.label) + '" data-label="' + esc((p.label + ' ' + g.label).toLowerCase()) + '"><span class="dot"></span><span class="item-label">' + esc(p.label) + '</span></a>'; }).join('') + '</div>'; }).join('') + '</div></div>';
  }

  var content = document.getElementById('kit-content');
  var shell = document.createElement('div');
  shell.className = 'kit-container kit-shell';
  shell.innerHTML =
    '<aside class="kit-sidenav" aria-label="Navigation du catalogue"><div class="sidenav-inner">' +
      '<div class="sidenav-header"><img src="' + ROOT + 'assets/logo.png" class="brand-logo" alt="UI Kit"><div class="header-text"><span class="app-title">UI Kit</span><span class="app-subtitle">Référentiel statique</span></div>' +
        '<button type="button" class="ui-btn ui-btn--icon close-drawer-btn" data-nav-close aria-label="Fermer le menu"><span class="mi">chevron_left</span></button></div>' +
      '<label class="nav-search"><span class="mi">search</span><input type="text" placeholder="Rechercher une page…" aria-label="Rechercher une page"><button type="button" class="clear" hidden aria-label="Effacer"><span class="mi">close</span></button></label>' +
      '<nav class="sidenav-menu-wrapper"><div class="menu-section">' + KIT_NAV.top.map(function (i) { return item(i, 'top'); }).join('') + '</div>' +
        section('Components', 'widgets', KIT_NAV.components) + section('Layouts', 'dashboard_customize', KIT_NAV.layouts) + '<div id="kit-pages-slot"></div></nav>' +
    '</div></aside>' +
    '<div class="kit-scrim" data-nav-close></div>' +
    '<div class="kit-main">' +
      '<header class="kit-toolbar">' +
        '<button type="button" class="ui-btn ui-btn--icon" data-nav-toggle aria-label="Fermer le menu" aria-expanded="true"><span class="mi">menu_open</span></button>' +
        '<span class="toolbar-title">Catalogue UI</span><span class="spacer"></span>' +
        '<button type="button" class="palette-btn" data-palette aria-label="Rechercher (⌘K)"><span class="mi">search</span><span class="pb-label">Rechercher…</span><span class="pb-kbd"><kbd>' + (/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl') + '</kbd><kbd>K</kbd></span></button>' +
        '<a class="ui-btn ui-btn--outlined app-link" href="' + ROOT + 'harnais/index.html"><span class="mi">auto_awesome</span><span>Harnais</span></a>' +
        '<a class="ui-btn ui-btn--outlined app-link" href="' + ROOT + 'app/main.html"><span class="mi">open_in_new</span><span>Ouvrir l\'application</span></a>' +
        '<button type="button" class="ui-btn ui-btn--icon" data-kit-toggle-mode title="Changer de thème" aria-label="Changer de thème"><span class="mi">dark_mode</span></button>' +
        '<details class="ui-menu kit-theme"><summary class="ui-btn ui-btn--icon" aria-label="Couleur du thème" title="Couleur du thème"><span class="mi">palette</span></summary>' +
          '<div class="kit-theme-pop tp-panel" role="dialog" aria-label="Apparence"></div></details>' +
      '</header>' +
    '</div>';
  body.insertBefore(shell, body.firstChild);
  var main = shell.querySelector('.kit-main');
  main.appendChild(content);
  content.classList.add('kit-content', 'ui-content');
  if (!document.title.includes('UI Kit')) document.title += ' — UI Kit HTML';

  // Section « Pages » (registre chargé à la demande).
  function mountPages() { shell.querySelector('#kit-pages-slot').outerHTML = pagesSection(); bindPages(); }
  function bindPages() {
    var sec = shell.querySelector('#kit-pages'); if (!sec) return;
    sec.addEventListener('click', function (e) {
      var t = e.target.closest('[data-pages-toggle]'); if (t) { pagesOpen = !pagesOpen; t.setAttribute('aria-expanded', pagesOpen); t.querySelector('.chevron').classList.toggle('open', pagesOpen); sec.querySelector('.section-items').hidden = !pagesOpen; }
      var g = e.target.closest('[data-group]'); if (g) { var s = sec.querySelector('[data-sub="' + g.dataset.group + '"]'); s.hidden = !s.hidden; g.querySelector('.chevron').classList.toggle('open', !s.hidden); }
    });
  }
  if (window.PAGE_REGISTRY) mountPages();
  else { var sc = document.createElement('script'); sc.src = ROOT + 'js/pages-registry.js'; sc.onload = mountPages; document.head.appendChild(sc); }

  // Recherche dans la barre latérale
  var input = shell.querySelector('.nav-search input'), clear = shell.querySelector('.nav-search .clear');
  function filter() {
    var q = input.value.trim().toLowerCase(); clear.hidden = !q;
    var sec = shell.querySelector('#kit-pages');
    if (sec && q) { sec.querySelector('.section-items').hidden = false; sec.querySelectorAll('.sub-items').forEach(function (s) { s.hidden = false; }); }
    else if (sec) { sec.querySelector('.section-items').hidden = !pagesOpen; sec.querySelectorAll('.sub-items').forEach(function (s) { s.hidden = true; }); }
    shell.querySelectorAll('.menu-item[data-label]').forEach(function (a) { a.hidden = !!q && a.getAttribute('data-label').indexOf(q) < 0 && !a.classList.contains('group-toggle'); });
    shell.querySelectorAll('.menu-section').forEach(function (s) { var any = Array.prototype.some.call(s.querySelectorAll('.menu-item'), function (a) { return !a.hidden && !a.classList.contains('group-toggle'); }); s.hidden = !!q && !any; });
  }
  input.addEventListener('input', filter);
  clear.addEventListener('click', function () { input.value = ''; filter(); input.focus(); });

  // Ouverture / fermeture de la barre latérale (bureau : repli ; mobile : tiroir)
  var mq = matchMedia('(max-width: 767.98px)');
  function setOpen(open) { shell.classList.toggle('nav-closed', !open); shell.classList.toggle('nav-open', open); var b = shell.querySelector('[data-nav-toggle]'); b.firstChild.textContent = open ? 'menu_open' : 'menu'; b.setAttribute('aria-expanded', open); b.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); }
  setOpen(!mq.matches);
  mq.addEventListener('change', function () { setOpen(!mq.matches); });
  shell.addEventListener('click', function (e) {
    if (e.target.closest('[data-nav-toggle]')) setOpen(shell.classList.contains('nav-closed'));
    else if (e.target.closest('[data-nav-close]') || (mq.matches && e.target.closest('.kit-sidenav a'))) setOpen(false);
  });

  // Mode clair / sombre
  var modeBtn = shell.querySelector('[data-kit-toggle-mode]');
  function isDark() { var m = document.documentElement.getAttribute('data-mode'); return m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches); }
  function syncMode() { modeBtn.firstChild.textContent = isDark() ? 'light_mode' : 'dark_mode'; }
  modeBtn.addEventListener('click', function () { UIKit.setMode(isDark() ? 'light' : 'dark'); syncMode(); });
  syncMode();

  // Réglages d'apparence (mode + couleur) dans le panneau de la palette
  function themes() { var cur = (document.documentElement.className.match(/theme-([\w-]+)/) || [])[1]; if (cur && cur !== 'custom') UIKit.setTheme(cur);
    function go() { UIThemeSettings.mount(shell.querySelector('.kit-theme-pop'), { studio: ROOT + 'theme-studio.html' }); }
    if (window.UIThemeSettings) go(); else { var s2 = document.createElement('script'); s2.src = ROOT + 'js/theme-settings.js'; s2.onload = go; document.head.appendChild(s2); } }
  if (window.UIKIT_THEMES) themes(); else { var ts = document.createElement('script'); ts.src = ROOT + 'js/themes.js'; ts.onload = themes; document.head.appendChild(ts); }
  document.addEventListener('click', function (e) { var d = shell.querySelector('.kit-theme'); if (d.open && !d.contains(e.target)) d.open = false; });

  // Palette de recherche (⌘K) : pages du catalogue + registre des pages
  function entries() {
    var list = [].concat(KIT_NAV.top.map(function (i) { return [i, 'Catalogue']; }), KIT_NAV.components.map(function (i) { return [i, 'Composants']; }), KIT_NAV.layouts.map(function (i) { return [i, 'Layouts']; }), [[{ label: 'Toutes les pages', path: 'pages.html', icon: 'grid_view' }, 'Layouts']]);
    (window.PAGE_REGISTRY || []).forEach(function (g) { g.pages.forEach(function (p) { list.push([{ label: p.label, path: p.path, icon: g.icon }, g.label]); }); });
    return list;
  }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function palette() {
    if (document.querySelector('.kit-cmdk')) return;
    var s = document.createElement('div'); s.className = 'kit-cmdk';
    s.innerHTML = '<div class="kc-box" role="dialog" aria-label="Rechercher"><label class="kc-in"><span class="mi">search</span><input placeholder="Rechercher une page, un composant…" aria-label="Rechercher"><kbd>Échap</kbd></label><div class="kc-list" role="listbox"></div></div>';
    document.body.appendChild(s);
    var inp = s.querySelector('input'), list = s.querySelector('.kc-list'), act = 0, vis = [];
    function draw() { var q = norm(inp.value.trim()); vis = entries().filter(function (e) { return !q || norm(e[0].label + ' ' + e[1]).indexOf(q) >= 0; }).slice(0, 40); act = Math.min(act, Math.max(0, vis.length - 1)); var g = null;
      list.innerHTML = vis.length ? vis.map(function (e, i) { var h = e[1] !== g ? '<div class="kc-grp">' + esc(g = e[1]) + '</div>' : ''; return h + '<a class="kc-it' + (i === act ? ' act' : '') + '" href="' + ROOT + e[0].path + '" role="option"><span class="mi">' + e[0].icon + '</span><span>' + esc(e[0].label) + '</span></a>'; }).join('') : '<div class="kc-empty">Aucun résultat</div>';
      var a = list.querySelector('.act'); a && a.scrollIntoView({ block: 'nearest' }); }
    function close() { s.remove(); }
    inp.addEventListener('input', function () { act = 0; draw(); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { act = Math.min(vis.length - 1, act + 1); draw(); e.preventDefault(); } else if (e.key === 'ArrowUp') { act = Math.max(0, act - 1); draw(); e.preventDefault(); } else if (e.key === 'Enter' && vis[act]) location.href = ROOT + vis[act][0].path; else if (e.key === 'Escape') close(); });
    s.addEventListener('mousedown', function (e) { if (e.target === s) close(); });
    draw(); inp.focus();
  }
  shell.querySelector('[data-palette]').addEventListener('click', palette);
  document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !document.querySelector('.cmdk-scrim')) { if (body.dataset.kitPalette === 'off') return; e.preventDefault(); palette(); } });
})();
