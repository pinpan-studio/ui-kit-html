/* ==========================================================================
   Shell du catalogue (sidebar + barre d'outils), injecté en JS natif.
   Usage : <body data-kit data-root="../" data-active="components/buttons.html">
             <main id="kit-content">…</main>
   ========================================================================== */
(function () {
  'use strict';
  var body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var ACTIVE = body.getAttribute('data-active') || '';
  window.KIT_ROOT = ROOT;

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
    layouts: [
      { label: 'Galerie des layouts', path: 'layouts.html', icon: 'view_compact' },
      { label: 'Toutes les pages', path: 'pages.html', icon: 'grid_view' }
    ]
  };
  window.KIT_NAV = KIT_NAV;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function link(i) {
    return '<a class="kit-nav__item" href="' + ROOT + i.path + '"' + (i.path === ACTIVE ? ' aria-current="page"' : '') +
      ' data-label="' + esc(i.label.toLowerCase()) + '"><span class="mi">' + i.icon + '</span><span>' + esc(i.label) + '</span></a>';
  }
  function section(title, icon, items) {
    return '<div class="kit-nav__section"><div class="kit-nav__head"><span class="mi">' + icon + '</span>' + title + '</div>' + items.map(link).join('') + '</div>';
  }

  var content = document.getElementById('kit-content');
  var shell = document.createElement('div');
  shell.className = 'ui-shell kit-shell';
  shell.innerHTML =
    '<aside class="ui-sidebar kit-sidebar" aria-label="Navigation du catalogue">' +
      '<a class="kit-brand" href="' + ROOT + 'index.html"><img src="' + ROOT + 'assets/logo.png" alt="" width="36" height="36">' +
      '<span><strong>UI Kit</strong><small>Référentiel statique HTML</small></span></a>' +
      '<label class="kit-search"><span class="mi">search</span><input type="search" placeholder="Rechercher une page…" aria-label="Rechercher une page"></label>' +
      '<nav>' + '<div class="kit-nav__section">' + KIT_NAV.top.map(link).join('') + '</div>' +
      section('Components', 'widgets', KIT_NAV.components) + section('Layouts & pages', 'dashboard_customize', KIT_NAV.layouts) + '</nav>' +
    '</aside>' +
    '<div class="ui-scrim" data-nav-toggle></div>' +
    '<div class="ui-main">' +
      '<header class="ui-topbar">' +
        '<button class="ui-btn ui-btn--icon" data-nav-toggle aria-label="Menu"><span class="mi">menu</span></button>' +
        '<span class="ui-topbar__title">Catalogue UI</span>' +
        '<a class="ui-btn ui-btn--outlined ui-btn--sm kit-hide-sm" href="' + ROOT + 'harnais/index.html"><span class="mi">auto_awesome</span>Harnais</a>' +
        '<a class="ui-btn ui-btn--outlined ui-btn--sm kit-hide-sm" href="' + ROOT + 'app/main.html"><span class="mi">open_in_new</span>Ouvrir l\'application</a>' +
        '<button class="ui-btn ui-btn--icon" data-kit-toggle-mode aria-label="Changer de mode"><span class="mi">dark_mode</span></button>' +
        '<details class="ui-menu"><summary class="ui-btn ui-btn--icon" aria-label="Thème de couleur"><span class="mi">palette</span></summary>' +
          '<div class="ui-menu__panel kit-theme-panel"><div class="kit-themes"></div></div></details>' +
      '</header>' +
    '</div>';
  body.insertBefore(shell, body.firstChild);
  shell.querySelector('.ui-main').appendChild(content);
  content.classList.add('ui-content');
  if (!document.title.includes('UI Kit')) document.title += ' — UI Kit HTML';

  // Ouverture par défaut sur bureau, fermée sur mobile (géré par CSS)
  // Recherche dans la sidebar
  shell.querySelector('.kit-search input').addEventListener('input', function (e) {
    var q = e.target.value.trim().toLowerCase();
    shell.querySelectorAll('.kit-nav__item').forEach(function (a) { a.hidden = q && a.getAttribute('data-label').indexOf(q) < 0; });
  });

  // Mode clair / sombre
  var modeBtn = shell.querySelector('[data-kit-toggle-mode]');
  function isDark() {
    var m = document.documentElement.getAttribute('data-mode');
    return m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function syncMode() { modeBtn.firstChild.textContent = isDark() ? 'light_mode' : 'dark_mode'; }
  modeBtn.addEventListener('click', function () { UIKit.setMode(isDark() ? 'light' : 'dark'); syncMode(); });
  syncMode();

  // Pastilles de thèmes
  if (window.UIKIT_THEMES) {
    var box = shell.querySelector('.kit-themes');
    box.innerHTML = UIKIT_THEMES.map(function (t) {
      return '<button type="button" data-set-theme="' + t.id + '" title="' + esc(t.label) + '" aria-label="Thème ' + esc(t.label) + '" style="background:' + t.light + '"></button>';
    }).join('');
    var cur = (document.documentElement.className.match(/theme-([\w-]+)/) || [])[1];
    if (cur) UIKit.setTheme(cur);
  }
})();
