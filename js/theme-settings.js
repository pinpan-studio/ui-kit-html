/* Réglages d'apparence (reprise de app-theme-settings) : mode segmenté M3 + pastilles tricolores des 41 thèmes.
   UIThemeSettings.mount(el, { studio: 'chemin/vers/theme-studio.html' | false }) */
(function () {
  'use strict';
  var MODES = [['light', 'Clair', 'light_mode'], ['dark', 'Sombre', 'dark_mode'], ['system', 'Système', 'brightness_auto']];
  function scheme() { return document.documentElement.getAttribute('data-scheme') === 'dark' ? 'dark' : 'light'; }
  function current() { return (document.documentElement.className.match(/theme-([\w-]+)/) || [])[1] || 'cyan'; }
  function mount(el, o) {
    o = o || {}; el.classList.add('ts-host');
    function draw() {
      var mode = document.documentElement.getAttribute('data-mode') || 'system', cur = current(), sc = scheme(), t = (window.UIKIT_THEMES || []).find(function (x) { return x.id === cur; });
      el.innerHTML = '<section class="ts-section"><h3 class="ts-title">Mode</h3><div class="m3-toggle-group full ts-modes" role="radiogroup" aria-label="Mode">' +
        MODES.map(function (m) { return '<button type="button" role="radio" aria-checked="' + (m[0] === mode) + '" data-set-mode="' + m[0] + '"><mat-icon>' + m[2] + '</mat-icon> ' + m[1] + '</button>'; }).join('') + '</div></section>' +
        '<section class="ts-section"><h3 class="ts-title">Couleur <span class="ts-current">' + (cur === 'custom' ? 'Personnalisé' : t ? t.label : '') + '</span></h3><div class="ts-swatches" role="radiogroup" aria-label="Couleur">' +
        (window.UIKIT_THEMES || []).map(function (p) { var s = p.sw ? p.sw[sc] : [p[sc], p[sc], p[sc]], on = p.id === cur;
          return '<button type="button" class="ts-swatch' + (on ? ' selected' : '') + '" role="radio" aria-checked="' + on + '" aria-label="' + p.label + '" title="' + p.label + '" data-set-theme="' + p.id + '"><span class="ts-dot" style="--sw-primary:' + s[0] + ';--sw-secondary:' + s[1] + ';--sw-tertiary:' + s[2] + '">' + (on ? '<mat-icon class="ts-check">check</mat-icon>' : '') + '</span></button>'; }).join('') + '</div></section>' +
        (o.studio !== false ? '<a class="ui-btn ui-btn--tonal ts-studio" href="' + (o.studio || (window.KIT_ROOT || '') + 'theme-studio.html') + '"><mat-icon>tune</mat-icon> Studio de thème : couleurs, styles, nuances</a>' : '');
    }
    el.addEventListener('click', function (e) { if (e.target.closest('[data-set-mode],[data-set-theme]')) setTimeout(draw); });
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-scheme', 'class'] });
    draw();
  }
  window.UIThemeSettings = { mount: mount };
})();
