/* ==========================================================================
   Pages de documentation du catalogue (galeries de composants).
   Balisage déclaratif, transformé ici :
     <div class="doc-page" data-title="…" data-subtitle="…" data-icon="…" data-eyebrow="…">
       <section class="doc-section" id="…" data-title="…" data-desc="…" data-source="…" data-cols="2">
         <div class="demo" data-label="…" data-hint="…" [data-flush] [data-muted] [data-dense] [data-nocode]>
           … contenu de la démo …
           [<template class="demo-code">extrait affiché à la place du HTML</template>]
         </div>
       </section>
     </div>
   L'extrait de code est, par défaut, le HTML de la démo tel qu'écrit dans la page
   (capturé avant que les scripts de la page ne l'enrichissent).
   Charger ce script juste après le contenu, avant les scripts de démonstration.
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dedent(t) {
    var lines = t.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    var min = Math.min.apply(0, lines.filter(function (l) { return l.trim(); }).map(function (l) { return l.match(/^\s*/)[0].length; }));
    return lines.map(function (l) { return l.slice(min || 0); }).join('\n');
  }

  document.querySelectorAll('.doc-page').forEach(function (page) {
    var d = page.dataset, secs = page.querySelectorAll(':scope > .doc-section, :scope > [data-toc-label]');
    var hero = '<header class="doc-hero"><div class="hero-icon"><mat-icon>' + (d.icon || 'widgets') + '</mat-icon></div><div class="hero-text"><span class="eyebrow">' + esc(d.eyebrow || 'Composants') + '</span><h1>' + esc(d.title) + '</h1>' + (d.subtitle ? '<p>' + esc(d.subtitle) + '</p>' : '') + '</div></header>';
    var toc = secs.length > 1 ? '<nav class="doc-toc" aria-label="Sommaire">' + Array.from(secs).map(function (s) { return '<a class="toc-chip" href="#' + s.id + '">' + esc(s.dataset.toc || s.dataset.tocLabel || s.dataset.title) + '</a>'; }).join('') + '</nav>' : '';
    page.insertAdjacentHTML('afterbegin', hero + toc);
  });

  document.querySelectorAll('.doc-section').forEach(function (s) {
    var d = s.dataset, body = document.createElement('div');
    body.className = 'section-body' + (d.cols ? ' cols-' + d.cols : '');
    while (s.firstChild) body.appendChild(s.firstChild);
    s.innerHTML = '<div class="section-head"><h2>' + esc(d.title) + '</h2>' + (d.source ? '<code class="source" title="Source : ' + esc(d.source) + '">' + esc(d.source) + '</code>' : '') + '</div>' + (d.desc ? '<p class="section-desc">' + d.desc + '</p>' : '');
    s.appendChild(body);
  });

  document.querySelectorAll('.demo').forEach(function (demo) {
    var d = demo.dataset, tpl = demo.querySelector(':scope > template.demo-code'), code = '';
    if (tpl) { code = tpl.innerHTML; tpl.remove(); }
    else if (!('nocode' in d)) code = demo.innerHTML.replace(/<script[\s\S]*?<\/script>/g, '');
    code = code ? dedent(code).replace(/=""/g, '') : '';
    var stage = document.createElement('div');
    stage.className = 'demo-stage' + ('flush' in d ? ' pad-none' : '') + ('muted' in d ? ' stage-muted' : '');
    while (demo.firstChild) stage.appendChild(demo.firstChild);
    if ('dense' in d) demo.classList.add('dense');
    demo.innerHTML = '<div class="demo-head"><span class="demo-label">' + esc(d.label) + '</span>' + (d.hint ? '<span class="demo-hint">' + esc(d.hint) + '</span>' : '') + '<span class="spacer"></span>' +
      (code ? '<button type="button" class="ui-btn ui-btn--icon demo-btn" title="Voir le code" aria-label="Voir le code" aria-expanded="false"><mat-icon>code</mat-icon></button>' : '') + '</div>';
    demo.appendChild(stage);
    if (!code) return;
    var box = document.createElement('div'); box.className = 'demo-code'; box.hidden = true;
    box.innerHTML = '<button type="button" class="ui-btn ui-btn--icon copy-btn" title="Copier" aria-label="Copier"><mat-icon>content_copy</mat-icon></button><pre><code></code></pre>';
    box.querySelector('code').textContent = code;
    demo.appendChild(box);
    var btn = demo.querySelector('.demo-btn');
    btn.addEventListener('click', function () { box.hidden = !box.hidden; btn.firstChild.textContent = box.hidden ? 'code' : 'code_off'; btn.title = box.hidden ? 'Voir le code' : 'Masquer le code'; btn.setAttribute('aria-expanded', String(!box.hidden)); });
    box.querySelector('.copy-btn').addEventListener('click', function () { try { navigator.clipboard.writeText(code); } catch (e) {} if (window.UIKit) UIKit.toast('Extrait copié dans le presse-papiers'); });
  });

  // Ancre initiale (le contenu est enrichi après le chargement).
  if (location.hash) setTimeout(function () { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView({ block: 'start' }); }, 80);
})();
