/* ==========================================================================
   UI Kit HTML — comportements en JavaScript natif (aucune dépendance).
   Tout est piloté par des attributs data-* ; API publique : window.UIKit.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_MODE = 'uikit-mode';
  var STORE_THEME = 'uikit-theme';

  function read(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* stockage indisponible */ }
  }

  /* ---------- Thème : mode clair / sombre / système + palette ---------- */
  function setMode(mode) {
    root.setAttribute('data-mode', mode);
    write(STORE_MODE, mode);
    document.querySelectorAll('[data-set-mode]').forEach(function (el) {
      el.setAttribute('aria-pressed', String(el.getAttribute('data-set-mode') === mode));
    });
  }
  function setTheme(id) {
    root.className = root.className.replace(/\btheme-[\w-]+\b/g, '').trim();
    root.classList.add('theme-' + id);
    write(STORE_THEME, id);
    document.querySelectorAll('[data-set-theme]').forEach(function (el) {
      el.setAttribute('aria-pressed', String(el.getAttribute('data-set-theme') === id));
    });
  }

  /* ---------- Onglets : [data-tabs] > [role=tablist] > [role=tab][aria-controls] ---------- */
  function initTabs(scope) {
    scope.querySelectorAll('[data-tabs]').forEach(function (tabs) {
      var list = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
      function select(tab) {
        list.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
      }
      list.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t); });
        t.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          var next = list[(i + d + list.length) % list.length];
          next.focus(); select(next);
        });
      });
      select(list.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || list[0]);
    });
  }

  /* ---------- Toasts ---------- */
  function toast(message, duration) {
    var box = document.querySelector('.ui-toasts');
    if (!box) {
      box = document.createElement('div');
      box.className = 'ui-toasts';
      box.setAttribute('role', 'status');
      box.setAttribute('aria-live', 'polite');
      document.body.appendChild(box);
    }
    var el = document.createElement('div');
    el.className = 'ui-toast';
    el.textContent = message;
    box.appendChild(el);
    setTimeout(function () { el.remove(); }, duration || 3000);
  }

  /* ---------- Dialogues : UIKit.confirm({title,message,confirmLabel,type}) / UIKit.prompt({title,label,value,confirm,icon}) → Promise ---------- */
  function escH(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function modal(html, onOk) {
    return new Promise(function (resolve) {
      var d = document.createElement('dialog'); d.className = 'ui-dialog'; d.innerHTML = html; document.body.appendChild(d);
      function done(v) { d.close(); d.remove(); resolve(v); }
      d.addEventListener('click', function (e) {
        if (e.target === d) return done(undefined);
        var b = e.target.closest('[data-res]'); if (!b) return;
        done(b.dataset.res === 'ok' ? onOk(d) : undefined);
      });
      d.addEventListener('submit', function (e) { e.preventDefault(); done(onOk(d)); });
      d.addEventListener('cancel', function (e) { e.preventDefault(); done(undefined); });
      d.showModal(); var i = d.querySelector('input'); if (i) { i.focus(); i.select(); }
    });
  }
  function confirmDlg(o) {
    o = o || {};
    return modal('<div class="ui-dialog__body"><div class="ui-row" style="align-items:flex-start;gap:16px">' + (o.type === 'danger' ? '<span class="ic-tile tone-error" style="width:40px;height:40px;border-radius:50%"><span class="mi">warning</span></span>' : '') +
      '<div><h3 style="margin:0 0 8px">' + escH(o.title || 'Confirmer') + '</h3><p class="ui-muted" style="margin:0">' + escH(o.message || '') + '</p></div></div></div>' +
      '<div class="ui-dialog__actions"><button class="ui-btn ui-btn--text" data-res="cancel">' + escH(o.cancelLabel || 'Annuler') + '</button><button class="ui-btn' + (o.type === 'danger' ? ' ui-btn--danger' : '') + '" data-res="ok">' + escH(o.confirmLabel || 'Confirmer') + '</button></div>',
      function () { return true; }).then(function (v) { return !!v; });
  }
  function promptDlg(o) {
    o = o || {};
    return modal('<form><div class="ui-dialog__body"><h3 style="margin:0 0 16px;display:flex;align-items:center;gap:8px">' + (o.icon ? '<span class="mi" style="color:var(--primary)">' + o.icon + '</span>' : '') + escH(o.title || '') + '</h3>' +
      '<label class="ui-field"><span class="ui-label">' + escH(o.label || '') + '</span><input class="ui-input" value="' + escH(o.value || '') + '" required></label></div>' +
      '<div class="ui-dialog__actions"><button type="button" class="ui-btn ui-btn--text" data-res="cancel">Annuler</button><button class="ui-btn">' + escH(o.confirm || 'OK') + '</button></div></form>',
      function (d) { var v = d.querySelector('input').value.trim(); return v || undefined; });
  }

  /* ---------- Délégation d'événements ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-set-mode],[data-set-theme],[data-dialog-open],[data-dialog-close],[data-toast],[data-nav-toggle]');
    if (t) {
      if (t.hasAttribute('data-set-mode')) setMode(t.getAttribute('data-set-mode'));
      if (t.hasAttribute('data-set-theme')) setTheme(t.getAttribute('data-set-theme'));
      if (t.hasAttribute('data-dialog-open')) {
        var d = document.getElementById(t.getAttribute('data-dialog-open'));
        if (d && d.showModal) d.showModal();
      }
      if (t.hasAttribute('data-dialog-close')) {
        var dlg = t.closest('dialog');
        if (dlg) dlg.close(t.getAttribute('data-dialog-close') || '');
      }
      if (t.hasAttribute('data-toast')) toast(t.getAttribute('data-toast'));
      if (t.hasAttribute('data-nav-toggle')) {
        var shell = t.closest('.ui-shell') || document.querySelector('.ui-shell');
        if (shell) shell.toggleAttribute('data-nav-open');
      }
    }
    // Ferme les menus <details class="ui-menu"> au clic extérieur
    document.querySelectorAll('details.ui-menu[open]').forEach(function (m) {
      if (!m.contains(e.target)) m.removeAttribute('open');
    });
  });

  // Clic sur le fond d'un <dialog> = fermeture
  document.addEventListener('click', function (e) {
    if (e.target.tagName === 'DIALOG' && e.target.classList.contains('ui-dialog')) {
      var r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('details.ui-menu[open]').forEach(function (m) { m.removeAttribute('open'); });
      var s = document.querySelector('.ui-shell[data-nav-open]');
      if (s) s.removeAttribute('data-nav-open');
    }
  });

  /* ---------- Démarrage ---------- */
  setMode(read(STORE_MODE, 'system'));
  setTheme(read(STORE_THEME, 'cyan'));
  document.addEventListener('DOMContentLoaded', function () {
    setMode(root.getAttribute('data-mode'));
    setTheme(read(STORE_THEME, 'cyan'));
    initTabs(document);
  });

  window.UIKit = { setMode: setMode, setTheme: setTheme, toast: toast, initTabs: initTabs, confirm: confirmDlg, prompt: promptDlg };
})();
