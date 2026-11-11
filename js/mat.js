/* ==========================================================================
   Comportements natifs pour le balisage Material (MDC) repris de ui-kit :
   slide-toggle, button-toggle-group, chip-listbox, checkbox.
   Chaque changement émet un CustomEvent 'mat-change' (detail = valeur) sur le composant.
   ========================================================================== */
(function () {
  'use strict';
  function emit(el, v) { el.dispatchEvent(new CustomEvent('mat-change', { bubbles: true, detail: v })); }

  function setPanel(pn, open) { pn.classList.toggle('mat-expanded', open); var h = pn.querySelector('.mat-expansion-panel-header'); if (h) { h.classList.toggle('mat-expanded', open); h.setAttribute('aria-expanded', String(open)); }
    var w = pn.querySelector('.mat-expansion-panel-content-wrapper'); if (w) { if (open) w.removeAttribute('inert'); else w.setAttribute('inert', ''); }
    var c = pn.querySelector('.mat-expansion-panel-content'); if (c) c.style.visibility = open ? '' : 'hidden'; }
  var M = window.Mat = {
    /** État d'un mat-slide-toggle. */
    setToggle: function (t, on) {
      var b = t.querySelector('.mdc-switch'); if (!b) return;
      b.classList.toggle('mdc-switch--selected', on); b.classList.toggle('mdc-switch--unselected', !on);
      b.classList.toggle('mdc-switch--checked', on); b.setAttribute('aria-checked', String(on));
      t.classList.toggle('mat-mdc-slide-toggle-checked', on);
    },
    isToggle: function (t) { var b = t.querySelector('.mdc-switch'); return !!b && b.getAttribute('aria-checked') === 'true'; },
    /** Sélection d'un mat-button-toggle-group (index ou valeur data-value). */
    setGroup: function (g, i) {
      g.querySelectorAll('mat-button-toggle').forEach(function (t, k) {
        var on = typeof i === 'number' ? k === i : t.dataset.value === String(i);
        t.classList.toggle('mat-button-toggle-checked', on);
        var b = t.querySelector('button'); b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1;
      });
    },
    setChip: function (c, on) {
      c.classList.toggle('mat-mdc-chip-selected', on); c.classList.toggle('mdc-evolution-chip--selected', on);
      var b = c.querySelector('button'); if (b) b.setAttribute('aria-selected', String(on));
    },
    setCheckbox: function (c, on) {
      var i = c.querySelector('input[type=checkbox]'); if (i) i.checked = on;
      c.classList.toggle('mat-mdc-checkbox-checked', on);
    }
  };

  // Onglets : contenus relevés dans .snap-tab-cache (un bloc par onglet, l'onglet 0 est le contenu initial).
  function tabs(g) { return Array.from(g.querySelectorAll(':scope > .mat-mdc-tab-header .mat-mdc-tab')); }
  function selectTab(g, i) {
    var body = g.querySelector(':scope > .mat-mdc-tab-body-wrapper .mat-mdc-tab-body-content'), cache = g.querySelector(':scope > .snap-tab-cache');
    if (!body) return; if (!g._tab0) g._tab0 = body.innerHTML;
    var src = i === 0 ? g._tab0 : (cache && cache.querySelector(':scope > [data-tab="' + i + '"]') || {}).innerHTML;
    if (src == null) return; body.innerHTML = src;
    tabs(g).forEach(function (t, k) { var on = k === i; t.classList.toggle('mdc-tab--active', on); t.classList.toggle('mat-mdc-tab-label-active', on); t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      var ind = t.querySelector('.mdc-tab-indicator'); if (ind) ind.classList.toggle('mdc-tab-indicator--active', on); });
    document.dispatchEvent(new CustomEvent('mat-tab-change', { detail: { group: g, index: i } }));
  }
  M.selectTab = selectTab;
  // Les caches deviennent des <template> (pas de chargement d'images/iframes cachées).
  document.querySelectorAll('.snap-tab-cache').forEach(function (c) { c.querySelectorAll(':scope > [data-tab]').forEach(function (d) { var t = document.createElement('template'); t.dataset.tab = d.dataset.tab; t.innerHTML = d.innerHTML; d.replaceWith(t); }); });
  M._tpl = true;

  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.mat-mdc-tab'); if (tab) { var g = tab.closest('mat-tab-group'); if (g) { selectTab(g, tabs(g).indexOf(tab)); return; } }
    var dbtn = e.target.closest('.demo-btn');
    if (dbtn) { var demo = dbtn.closest('.demo'), code = demo && demo.querySelector('.demo-code'); if (code) { code.hidden = !code.hidden; var ic = dbtn.querySelector('mat-icon'); if (ic) ic.textContent = code.hidden ? 'code' : 'code_off'; } return; }
    var cp = e.target.closest('.demo-code .copy-btn'); if (cp) { var pre = cp.closest('.demo-code').querySelector('pre'); try { navigator.clipboard.writeText(pre.textContent); } catch (x) {} if (window.UIKit) UIKit.toast('Extrait copié dans le presse-papiers'); return; }
    var eh = e.target.closest('.mat-expansion-panel-header');
    if (eh && !eh.matches('[aria-disabled="true"]')) { var pn = eh.closest('mat-expansion-panel'), open = !pn.classList.contains('mat-expanded');
      var acc = pn.closest('mat-accordion'); if (open && acc && !acc.hasAttribute('multi')) acc.querySelectorAll(':scope > mat-expansion-panel.mat-expanded').forEach(function (o) { if (o !== pn) setPanel(o, false); });
      setPanel(pn, open); return; }
    var rb = e.target.closest('mat-radio-button');
    if (rb && e.target.matches('input[type=radio]')) { var grp = rb.closest('mat-radio-group') || document; grp.querySelectorAll('mat-radio-button').forEach(function (r) { r.classList.toggle('mat-mdc-radio-checked', r === rb); }); emit(rb, true); }

    var sw = e.target.closest('mat-slide-toggle');
    if (sw && !sw.querySelector('.mdc-switch:disabled')) { var on = !M.isToggle(sw); M.setToggle(sw, on); emit(sw, on); return; }
    var bt = e.target.closest('mat-button-toggle');
    if (bt) { var g = bt.closest('mat-button-toggle-group'), all = Array.from(g.querySelectorAll('mat-button-toggle')), i = all.indexOf(bt);
      M.setGroup(g, i); emit(g, bt.dataset.value != null ? bt.dataset.value : i); return; }
    var ch = e.target.closest('mat-chip-option');
    if (ch) { var lb = ch.closest('mat-chip-listbox'), opts = Array.from(lb.querySelectorAll('mat-chip-option'));
      opts.forEach(function (o) { M.setChip(o, o === ch); }); emit(lb, ch.dataset.value != null ? ch.dataset.value : opts.indexOf(ch)); return; }
    var cb = e.target.closest('mat-checkbox');
    if (cb && e.target.matches('input[type=checkbox]')) { M.setCheckbox(cb, e.target.checked); emit(cb, e.target.checked); }
  });
})();
