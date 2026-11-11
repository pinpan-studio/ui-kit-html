/* ==========================================================================
   Comportements natifs pour le balisage Material (MDC) repris de ui-kit :
   slide-toggle, button-toggle-group, chip-listbox, checkbox.
   Chaque changement émet un CustomEvent 'mat-change' (detail = valeur) sur le composant.
   ========================================================================== */
(function () {
  'use strict';
  function emit(el, v) { el.dispatchEvent(new CustomEvent('mat-change', { bubbles: true, detail: v })); }

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

  document.addEventListener('click', function (e) {
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
