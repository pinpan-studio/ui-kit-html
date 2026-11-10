/* ==========================================================================
   Composants médias en JS natif : lecteur audio (forme d'onde), lecteur vidéo
   (contrôles maison), YouTube (façade + iframe), carrousel, visionneuse PDF,
   visionneuse de fichiers plein écran.
   Media.audio(el, { tracks:[{src,title,artist,blob,icon}], variant:'default'|'compact'|'playlist' })
   Media.video(el, { src, poster, title })      Media.youtube(el, { id, title, duration })
   Media.carousel(el, { items:[{url,title,caption}], indicators:'dots'|'thumbs', aspectRatio })
   Media.viewer(files:[{name,url,type,size,blob}], index)
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(s) { if (!isFinite(s) || s < 0) s = 0; var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = Math.floor(s % 60); return h ? h + ':' + ('0' + m).slice(-2) + ':' + ('0' + x).slice(-2) : m + ':' + ('0' + x).slice(-2); }
  function kind(name, mime) {
    name = name || ''; mime = mime || ''; var ext = (name.split('.').pop() || '').toLowerCase();
    if (mime.indexOf('image/') === 0 || /^(png|jpe?g|gif|webp|svg|avif|bmp)$/.test(ext)) return 'image';
    if (mime === 'application/pdf' || ext === 'pdf') return 'pdf';
    if (mime.indexOf('video/') === 0 || /^(mp4|webm|ogv|mov|m4v)$/.test(ext)) return 'video';
    if (mime.indexOf('audio/') === 0 || /^(mp3|wav|ogg|oga|m4a|aac|flac|opus)$/.test(ext)) return 'audio';
    if (mime.indexOf('text/') === 0 || /^(txt|csv|json|md|log|xml)$/.test(ext)) return 'text';
    return 'other';
  }
  var ICON = { image: 'image', pdf: 'picture_as_pdf', video: 'movie', audio: 'audiotrack', text: 'description', other: 'insert_drive_file' };
  var LABEL = { image: 'Image', pdf: 'Document PDF', video: 'Vidéo', audio: 'Audio', text: 'Texte', other: 'Fichier' };
  function pseudoPeaks(seed, bars) {
    var h = 2166136261; for (var i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    return Array.from({ length: bars }, function (_, i) { h = Math.imul(h ^ (h >>> 13), 1274126177); var r = ((h >>> 0) % 1000) / 1000; return 0.2 + 0.8 * Math.abs(Math.sin(i / 5 + r)) * (0.55 + r * 0.45); });
  }
  function peaks(blob, bars) {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!blob || !Ctx) return Promise.resolve(pseudoPeaks(String(blob ? blob.size : Math.random()), bars));
    var ctx = new Ctx();
    return blob.arrayBuffer().then(function (b) { return ctx.decodeAudioData(b); }).then(function (buf) {
      var ch = buf.getChannelData(0), step = Math.floor(ch.length / bars) || 1;
      var p = Array.from({ length: bars }, function (_, i) { var mx = 0; for (var j = i * step; j < Math.min(ch.length, (i + 1) * step); j += 8) mx = Math.max(mx, Math.abs(ch[j])); return mx; });
      var top = Math.max.apply(null, p) || 1; return p.map(function (x) { return Math.max(0.08, x / top); });
    }).catch(function () { return pseudoPeaks(String(blob.size), bars); }).finally(function () { ctx.close && ctx.close(); });
  }

  /* ── Lecteur audio ─────────────────────────────────────── */
  function audio(el, o) {
    var tracks = o.tracks || [], v = o.variant || 'default', idx = 0, rate = 1, P = [];
    var a = new Audio(); a.preload = 'metadata';
    function t() { return tracks[idx]; }
    function render() {
      var tr = t(), bars = v === 'compact' ? 36 : 64;
      el.innerHTML = '<div class="ap ap--' + v + '">' +
        (v !== 'compact' ? '<div class="ap-head"><div class="ap-cover"><span class="mi">' + (tr && tr.icon || 'graphic_eq') + '</span></div><div class="ap-meta"><strong>' + esc(tr ? tr.title : 'Aucune piste') + '</strong>' + (tr && tr.artist ? '<span>' + esc(tr.artist) + '</span>' : '') + '</div></div>' : '') +
        '<div class="ap-main">' + (v === 'playlist' ? '<button type="button" class="ap-btn" data-a="prev" title="Précédente" aria-label="Piste précédente"' + (idx === 0 ? ' disabled' : '') + '><span class="mi">skip_previous</span></button>' : v === 'default' ? '<button type="button" class="ap-btn" data-a="back" title="−15 s" aria-label="Reculer de 15 secondes"><span class="mi">replay</span></button>' : '') +
        '<button type="button" class="ap-play" data-a="play" aria-label="Lire"><span class="mi">play_arrow</span></button>' +
        (v === 'playlist' ? '<button type="button" class="ap-btn" data-a="next" title="Suivante" aria-label="Piste suivante"' + (idx >= tracks.length - 1 ? ' disabled' : '') + '><span class="mi">skip_next</span></button>' : v === 'default' ? '<button type="button" class="ap-btn" data-a="fwd" title="+15 s" aria-label="Avancer de 15 secondes"><span class="mi">forward_media</span></button>' : '') +
        '<div class="ap-wave" role="slider" tabindex="0" aria-label="Position de lecture">' + Array.from({ length: bars }, function () { return '<span></span>'; }).join('') + '</div>' +
        '<span class="ap-time" data-t="cur">0:00</span>' + (v !== 'compact' ? '<span class="ap-time muted" data-t="dur">/ 0:00</span>' : '') +
        '<button type="button" class="ap-rate" data-a="rate" title="Vitesse">' + String(rate).replace('.', ',') + '×</button>' +
        (v !== 'compact' ? '<button type="button" class="ap-btn" data-a="mute" title="Couper le son" aria-label="Couper le son"><span class="mi">volume_up</span></button>' : '') + '</div>' +
        (v === 'playlist' ? '<ol class="ap-list">' + tracks.map(function (x, i) { return '<li class="' + (i === idx ? 'active' : '') + '" data-i="' + i + '"><span class="num">' + (i + 1) + '</span><span class="t">' + esc(x.title) + '</span><span class="a">' + esc(x.artist || '') + '</span></li>'; }).join('') + '</ol>' : '') + '</div>';
      if (tr) { a.src = tr.src; a.playbackRate = rate; peaks(tr.blob, bars).then(function (p) { P = p; paint(); }); }
    }
    function paint() {
      var spans = el.querySelectorAll('.ap-wave span'), r = a.duration ? a.currentTime / a.duration : 0;
      spans.forEach(function (s, i) { if (P[i]) s.style.height = P[i] * 100 + '%'; s.classList.toggle('done', i / spans.length < r); });
      var cur = el.querySelector('[data-t=cur]'), dur = el.querySelector('[data-t=dur]');
      if (cur) cur.textContent = v === 'compact' && a.paused && !a.currentTime ? fmt(a.duration) : fmt(a.currentTime);
      if (dur) dur.textContent = '/ ' + fmt(a.duration);
      var pb = el.querySelector('[data-a=play] .mi'); if (pb) pb.textContent = a.paused ? 'play_arrow' : 'pause';
      el.querySelector('.ap-cover') && el.querySelector('.ap-cover').classList.toggle('spin', !a.paused);
      el.querySelectorAll('.ap-list li').forEach(function (li, i) { li.querySelector('.num').innerHTML = i === idx && !a.paused ? '<span class="mi">equalizer</span>' : i + 1; });
    }
    ['timeupdate', 'loadedmetadata', 'durationchange', 'play', 'pause'].forEach(function (e) { a.addEventListener(e, paint); });
    a.addEventListener('ended', function () { if (v === 'playlist' && idx < tracks.length - 1) { idx++; render(); a.play(); } else paint(); });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a],[data-i]'); if (!b) return;
      var k = b.dataset.a;
      if (k === 'play') { document.querySelectorAll('audio,video').forEach(function () {}); a.paused ? a.play() : a.pause(); }
      if (k === 'back') a.currentTime = Math.max(0, a.currentTime - 15);
      if (k === 'fwd') a.currentTime = Math.min(a.duration || 0, a.currentTime + 15);
      if (k === 'rate') { rate = rate === 1 ? 1.5 : rate === 1.5 ? 2 : 1; a.playbackRate = rate; b.textContent = String(rate).replace('.', ',') + '×'; }
      if (k === 'mute') { a.muted = !a.muted; b.firstChild.textContent = a.muted ? 'volume_off' : 'volume_up'; }
      if (k === 'prev' || k === 'next') { idx += k === 'next' ? 1 : -1; render(); a.play(); }
      if (b.dataset.i) { idx = +b.dataset.i; render(); a.play(); }
    });
    el.addEventListener('pointerdown', function (e) {
      var w = e.target.closest('.ap-wave'); if (!w || !a.duration) return;
      var r = w.getBoundingClientRect(); a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * a.duration;
    });
    el.addEventListener('keydown', function (e) {
      if (!e.target.closest('.ap-wave')) return;
      if (e.key === 'ArrowRight') a.currentTime += 5; if (e.key === 'ArrowLeft') a.currentTime -= 5; if (e.key === ' ') { e.preventDefault(); a.paused ? a.play() : a.pause(); }
    });
    render();
    return { audio: a, destroy: function () { a.pause(); } };
  }

  /* ── Lecteur vidéo ─────────────────────────────────────── */
  var RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];
  function video(el, o) {
    if (!o.src) { el.innerHTML = '<div class="vp"><div class="vp-state"><span class="mi">movie</span><strong>Aucune vidéo</strong><span>' + esc(o.emptyLabel || 'Aucune source.') + '</span></div></div>'; return {}; }
    el.innerHTML = '<div class="vp" tabindex="0"' + (o.aspectRatio ? ' style="aspect-ratio:' + o.aspectRatio + '"' : '') + '><video playsinline preload="metadata" src="' + esc(o.src) + '"' + (o.poster ? ' poster="' + esc(o.poster) + '"' : '') + '></video>' +
      '<div class="vp-center" hidden><span class="vp-spin"></span></div><button type="button" class="vp-big-play" aria-label="Lire"><span class="mi">play_arrow</span></button>' +
      (o.title ? '<div class="vp-title">' + esc(o.title) + '</div>' : '') +
      '<div class="vp-controls"><div class="vp-progress"><div class="vp-buffer"></div><div class="vp-played"></div><div class="vp-thumb"></div><div class="vp-tip" hidden></div></div>' +
      '<div class="vp-row"><button type="button" class="vp-btn" data-v="play" title="Lire (K)" aria-label="Lire"><span class="mi">play_arrow</span></button>' +
      '<button type="button" class="vp-btn hide-xs" data-v="back" title="Reculer de 10 s (J)" aria-label="Reculer de 10 secondes"><span class="mi">replay_10</span></button>' +
      '<button type="button" class="vp-btn hide-xs" data-v="fwd" title="Avancer de 10 s (L)" aria-label="Avancer de 10 secondes"><span class="mi">forward_10</span></button>' +
      '<div class="vp-volume"><button type="button" class="vp-btn" data-v="mute" title="Couper le son (M)" aria-label="Couper le son"><span class="mi">volume_up</span></button><input type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume"></div>' +
      '<span class="vp-time">0:00 / 0:00</span><span class="spacer"></span>' +
      '<details class="ui-menu vp-rate"><summary class="vp-btn rate" title="Vitesse de lecture">1×</summary><div class="ui-menu__panel">' + RATES.map(function (r) { return '<button class="ui-menu__item" data-rate="' + r + '"><span class="mi">' + (r === 1 ? 'check' : '') + '</span>' + (r === 1 ? 'Normale' : String(r).replace('.', ',') + '×') + '</button>'; }).join('') + '</div></details>' +
      (document.pictureInPictureEnabled ? '<button type="button" class="vp-btn hide-xs" data-v="pip" title="Image dans l\'image" aria-label="Image dans l\'image"><span class="mi">picture_in_picture_alt</span></button>' : '') +
      '<button type="button" class="vp-btn" data-v="fs" title="Plein écran (F)" aria-label="Plein écran"><span class="mi">fullscreen</span></button></div></div></div>';
    var shell = el.firstChild, v = shell.querySelector('video'), bar = shell.querySelector('.vp-progress'), hideT;
    function q(s) { return shell.querySelector(s); }
    function paint() {
      var d = v.duration || 0, p = d ? v.currentTime / d * 100 : 0, b = v.buffered.length && d ? v.buffered.end(v.buffered.length - 1) / d * 100 : 0;
      q('.vp-played').style.width = p + '%'; q('.vp-thumb').style.left = p + '%'; q('.vp-buffer').style.width = b + '%';
      q('.vp-time').textContent = fmt(v.currentTime) + ' / ' + fmt(d);
      q('[data-v=play] .mi').textContent = v.paused ? 'play_arrow' : 'pause';
      q('.vp-big-play').hidden = !v.paused; shell.classList.toggle('is-playing', !v.paused); shell.classList.toggle('show-ui', v.paused);
      q('[data-v=mute] .mi').textContent = v.muted || v.volume === 0 ? 'volume_off' : v.volume < .5 ? 'volume_down' : 'volume_up';
      q('[data-v=fs] .mi').textContent = document.fullscreenElement === shell ? 'fullscreen_exit' : 'fullscreen';
    }
    function toggle() { v.paused ? v.play() : v.pause(); }
    function fs() { document.fullscreenElement ? document.exitFullscreen() : shell.requestFullscreen && shell.requestFullscreen(); }
    ['timeupdate', 'loadedmetadata', 'progress', 'play', 'pause', 'volumechange', 'ended'].forEach(function (e) { v.addEventListener(e, paint); });
    document.addEventListener('fullscreenchange', paint);
    v.addEventListener('waiting', function () { q('.vp-center').hidden = v.paused; });
    v.addEventListener('playing', function () { q('.vp-center').hidden = true; });
    v.addEventListener('error', function () { shell.innerHTML = '<div class="vp-state"><span class="mi">videocam_off</span><strong>Lecture impossible</strong><span>Le format de ce fichier n\'est pas pris en charge par le navigateur.</span></div>'; });
    v.addEventListener('click', toggle); v.addEventListener('dblclick', fs);
    shell.addEventListener('mousemove', function () { shell.classList.add('show-ui'); clearTimeout(hideT); hideT = setTimeout(function () { if (!v.paused) shell.classList.remove('show-ui'); }, 2200); });
    shell.addEventListener('click', function (e) {
      var b = e.target.closest('[data-v],[data-rate],.vp-big-play'); if (!b) return;
      if (b.classList.contains('vp-big-play') || b.dataset.v === 'play') toggle();
      if (b.dataset.v === 'back') v.currentTime -= 10; if (b.dataset.v === 'fwd') v.currentTime += 10;
      if (b.dataset.v === 'mute') v.muted = !v.muted; if (b.dataset.v === 'fs') fs();
      if (b.dataset.v === 'pip') (document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture()).catch(function () {});
      if (b.dataset.rate) { v.playbackRate = +b.dataset.rate; q('.vp-rate summary').textContent = (+b.dataset.rate === 1 ? '1' : String(b.dataset.rate).replace('.', ',')) + '×'; q('.vp-rate').removeAttribute('open');
        shell.querySelectorAll('[data-rate] .mi').forEach(function (m) { m.textContent = m.parentNode.dataset.rate === b.dataset.rate ? 'check' : ''; }); }
    });
    q('.vp-volume input').addEventListener('input', function (e) { v.volume = +e.target.value; v.muted = v.volume === 0; });
    function seekAt(x) { var r = bar.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)) * (v.duration || 0); }
    bar.addEventListener('pointerdown', function (e) { bar.setPointerCapture(e.pointerId); v.currentTime = seekAt(e.clientX); function mv(ev) { v.currentTime = seekAt(ev.clientX); } bar.addEventListener('pointermove', mv); bar.addEventListener('pointerup', function () { bar.removeEventListener('pointermove', mv); }, { once: true }); });
    bar.addEventListener('pointermove', function (e) { var tip = q('.vp-tip'), r = bar.getBoundingClientRect(); tip.hidden = false; tip.style.left = (e.clientX - r.left) + 'px'; tip.textContent = fmt(seekAt(e.clientX)); });
    bar.addEventListener('pointerleave', function () { q('.vp-tip').hidden = true; });
    shell.addEventListener('keydown', function (e) {
      if (e.target.closest('input, .ui-menu')) return; var k = e.key.toLowerCase(), done = true;
      if (k === ' ' || k === 'k') toggle(); else if (k === 'j' || k === 'arrowleft') v.currentTime -= k === 'j' ? 10 : 5; else if (k === 'l' || k === 'arrowright') v.currentTime += k === 'l' ? 10 : 5;
      else if (k === 'arrowup') v.volume = Math.min(1, v.volume + .1); else if (k === 'arrowdown') v.volume = Math.max(0, v.volume - .1); else if (k === 'm') v.muted = !v.muted; else if (k === 'f') fs(); else done = false;
      if (done) e.preventDefault();
    });
    paint();
    return { video: v };
  }

  /* ── YouTube (façade : aucune requête avant le clic) ───── */
  function youtube(el, o) {
    el.innerHTML = '<div class="yt"><button type="button" class="yt-facade" aria-label="Lire « ' + esc(o.title) + ' » sur YouTube"><span class="yt-bg"></span><span class="yt-title">' + esc(o.title) + '</span>' +
      '<span class="yt-play"><svg viewBox="0 0 68 48" aria-hidden="true"><path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.3.3 34 .3 34 .3s-21.3 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00"/><path d="M45 24 27 14v20" fill="#fff"/></svg></span>' +
      (o.duration ? '<span class="yt-dur">' + esc(o.duration) + '</span>' : '') + '<span class="yt-note">La lecture charge la vidéo depuis youtube-nocookie.com</span></button></div>';
    el.querySelector('.yt-facade').addEventListener('click', function () {
      el.firstChild.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(o.id) + '?autoplay=1&rel=0" title="' + esc(o.title) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
  }

  /* ── Carrousel ─────────────────────────────────────────── */
  function carousel(el, o) {
    var items = o.items || [], i = 0, timer;
    el.innerHTML = '<div class="crs" tabindex="0" aria-roledescription="carrousel"><div class="crs-view" style="aspect-ratio:' + (o.aspectRatio || '16 / 9') + '"><div class="crs-track">' +
      items.map(function (s, k) { return '<figure class="crs-slide" aria-label="' + (k + 1) + ' sur ' + items.length + '"><img src="' + esc(s.url) + '" alt="' + esc(s.title || '') + '" loading="lazy" draggable="false">' + (s.title || s.caption ? '<figcaption><strong>' + esc(s.title || '') + '</strong><span>' + esc(s.caption || '') + '</span></figcaption>' : '') + '</figure>'; }).join('') +
      '</div><button type="button" class="crs-nav prev" aria-label="Précédente"><span class="mi">chevron_left</span></button><button type="button" class="crs-nav next" aria-label="Suivante"><span class="mi">chevron_right</span></button></div>' +
      (o.indicators === 'thumbs' ? '<div class="crs-thumbs">' + items.map(function (s, k) { return '<button type="button" data-k="' + k + '" aria-label="Photo ' + (k + 1) + '"><img src="' + esc(s.url) + '" alt=""></button>'; }).join('') + '</div>'
        : '<div class="crs-dots">' + items.map(function (_, k) { return '<button type="button" data-k="' + k + '" aria-label="Diapositive ' + (k + 1) + '"></button>'; }).join('') + '</div>') + '</div>';
    var track = el.querySelector('.crs-track');
    function go(k) { i = (k + items.length) % items.length; track.style.transform = 'translateX(' + (-i * 100) + '%)'; el.querySelectorAll('[data-k]').forEach(function (b) { b.classList.toggle('on', +b.dataset.k === i); }); }
    el.querySelector('.prev').onclick = function () { go(i - 1); }; el.querySelector('.next').onclick = function () { go(i + 1); };
    el.addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b) go(+b.dataset.k); });
    el.firstChild.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1); });
    var x0 = null; track.addEventListener('pointerdown', function (e) { x0 = e.clientX; }); track.addEventListener('pointerup', function (e) { if (x0 !== null && Math.abs(e.clientX - x0) > 40) go(i + (e.clientX < x0 ? 1 : -1)); x0 = null; });
    if (o.autoplay) { timer = setInterval(function () { go(i + 1); }, o.autoplay); el.addEventListener('pointerenter', function () { clearInterval(timer); }); }
    go(0); return { go: go };
  }

  /* ── Visionneuse PDF (lecteur natif du navigateur) ─────── */
  function pdf(el, o) {
    el.innerHTML = '<div class="pdfv" style="height:' + (o.height || '520px') + '"><div class="pdfv-bar"><span class="mi">picture_as_pdf</span><strong>' + esc(o.name || 'Document.pdf') + '</strong><span class="spacer"></span>' +
      '<a class="ui-btn ui-btn--icon" href="' + esc(o.src) + '" target="_blank" rel="noopener" title="Ouvrir dans un onglet" aria-label="Ouvrir dans un onglet"><span class="mi">open_in_new</span></a>' +
      '<a class="ui-btn ui-btn--icon" href="' + esc(o.src) + '" download="' + esc(o.name || 'document.pdf') + '" title="Télécharger" aria-label="Télécharger"><span class="mi">download</span></a></div>' +
      '<object data="' + esc(o.src) + '#view=FitH" type="application/pdf" aria-label="' + esc(o.name || 'PDF') + '"><div class="pdfv-none"><span class="mi">picture_as_pdf</span><p>Le lecteur PDF du navigateur n\'est pas disponible ici.</p><a class="ui-btn ui-btn--tonal" href="' + esc(o.src) + '" target="_blank" rel="noopener">Ouvrir le PDF</a></div></object></div>';
  }

  /* ── Visionneuse de fichiers plein écran ───────────────── */
  function viewer(files, index) {
    files = [].concat(files); var i = Math.max(0, Math.min(index || 0, files.length - 1)), zoom = 1, rot = 0, pan = { x: 0, y: 0 }, player;
    var d = document.createElement('dialog'); d.className = 'fv'; document.body.appendChild(d);
    function size(b) { return b > 1e6 ? (b / 1048576).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' Mo' : Math.max(1, Math.round(b / 1024)) + ' Ko'; }
    function render() {
      if (player && player.destroy) player.destroy();
      d.querySelectorAll('video').forEach(function (v) { v.pause(); });
      var f = files[i], k = kind(f.name, f.type);
      d.innerHTML = '<header class="fv-head"><span class="mi fv-kind k-' + k + '">' + ICON[k] + '</span><div class="fv-title"><strong title="' + esc(f.name) + '">' + esc(f.name) + '</strong><span>' + LABEL[k] + (f.size ? ' · ' + size(f.size) : '') + (files.length > 1 ? ' · ' + (i + 1) + ' / ' + files.length : '') + '</span></div><span class="spacer"></span>' +
        (k === 'image' ? '<button type="button" class="fv-btn" data-f="zout" title="Zoom arrière" aria-label="Zoom arrière"><span class="mi">zoom_out</span></button><span class="fv-zoom">' + Math.round(zoom * 100) + ' %</span><button type="button" class="fv-btn" data-f="zin" title="Zoom avant" aria-label="Zoom avant"><span class="mi">zoom_in</span></button>' +
          '<button type="button" class="fv-btn" data-f="rot" title="Pivoter" aria-label="Pivoter"><span class="mi">rotate_right</span></button><button type="button" class="fv-btn" data-f="fit" title="Ajuster" aria-label="Ajuster"><span class="mi">fit_screen</span></button>' : '') +
        (f.url ? '<a class="fv-btn" href="' + esc(f.url) + '" download="' + esc(f.name) + '" title="Télécharger" aria-label="Télécharger"><span class="mi">download</span></a>' : '') +
        '<button type="button" class="fv-btn" data-f="close" title="Fermer (Échap)" aria-label="Fermer"><span class="mi">close</span></button></header>' +
        '<div class="fv-stage' + (k === 'image' || k === 'video' ? ' dark' : '') + '">' + (files.length > 1 ? '<button type="button" class="fv-nav prev" data-f="prev"' + (i === 0 ? ' disabled' : '') + ' aria-label="Précédent"><span class="mi">chevron_left</span></button><button type="button" class="fv-nav next" data-f="next"' + (i === files.length - 1 ? ' disabled' : '') + ' aria-label="Suivant"><span class="mi">chevron_right</span></button>' : '') +
        (!f.url ? '<div class="fv-none"><span class="mi">' + ICON[k] + '</span><strong>Aperçu indisponible</strong><span>Ce fichier n\'est disponible qu\'en téléchargement.</span></div>'
          : k === 'image' ? '<div class="fv-image"><img src="' + esc(f.url) + '" alt="' + esc(f.name) + '" draggable="false" style="transform:translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ') rotate(' + rot + 'deg)"></div>'
          : k === 'pdf' ? '<div class="fv-fill" id="fv-pdf"></div>' : k === 'video' ? '<div class="fv-center"><div class="fv-video" id="fv-video"></div></div>'
          : k === 'audio' ? '<div class="fv-center"><div class="fv-audio" id="fv-audio"></div></div>' : k === 'text' ? '<pre class="fv-text">Chargement…</pre>'
          : '<div class="fv-none"><span class="mi">' + ICON[k] + '</span><strong>Aperçu indisponible</strong><span>Ce type de fichier ne peut pas être affiché dans le navigateur.</span><a href="' + esc(f.url) + '" download="' + esc(f.name) + '"><span class="mi">download</span>Télécharger le fichier</a></div>') + '</div>' +
        (files.length > 1 ? '<div class="fv-strip">' + files.map(function (x, j) { var kk = kind(x.name, x.type); return '<button type="button" class="fv-thumb' + (j === i ? ' active' : '') + '" data-j="' + j + '" title="' + esc(x.name) + '">' + (kk === 'image' && x.url ? '<img src="' + esc(x.url) + '" alt="">' : '<span class="mi">' + ICON[kk] + '</span>') + '</button>'; }).join('') + '</div>' : '');
      if (f.url && k === 'pdf') pdf(d.querySelector('#fv-pdf'), { src: f.url, name: f.name, height: '100%' });
      if (f.url && k === 'video') player = video(d.querySelector('#fv-video'), { src: f.url, title: f.name });
      if (f.url && k === 'audio') player = audio(d.querySelector('#fv-audio'), { tracks: [{ src: f.url, title: f.name, blob: f.blob }] });
      if (f.url && k === 'text') (f.blob ? f.blob.text() : fetch(f.url).then(function (r) { return r.text(); })).then(function (t) { var p = d.querySelector('.fv-text'); if (p) p.textContent = t.slice(0, 200000); }).catch(function () {});
      var th = d.querySelector('.fv-thumb.active'); if (th) th.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    function img() { var m = d.querySelector('.fv-image img'); if (m) m.style.transform = 'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ') rotate(' + rot + 'deg)'; var z = d.querySelector('.fv-zoom'); if (z) z.textContent = Math.round(zoom * 100) + ' %'; }
    function zb(x) { zoom = Math.max(.25, Math.min(6, zoom + x)); if (zoom <= 1) pan = { x: 0, y: 0 }; img(); }
    function sel(j) { i = j; zoom = 1; rot = 0; pan = { x: 0, y: 0 }; render(); }
    function close() { d.querySelectorAll('video,audio').forEach(function (m) { m.pause(); }); if (player && player.destroy) player.destroy(); d.close(); d.remove(); document.removeEventListener('keydown', key); }
    function key(e) { if (e.target.closest && e.target.closest('input, textarea, .vp')) return; if (e.key === 'ArrowLeft' && i > 0) sel(i - 1); else if (e.key === 'ArrowRight' && i < files.length - 1) sel(i + 1); else if (e.key === '+' || e.key === '=') zb(.25); else if (e.key === '-') zb(-.25); }
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-f],[data-j]'); if (!b) return;
      if (b.dataset.j) return sel(+b.dataset.j);
      ({ close: close, prev: function () { sel(i - 1); }, next: function () { sel(i + 1); }, zin: function () { zb(.25); }, zout: function () { zb(-.25); }, rot: function () { rot += 90; img(); }, fit: function () { zoom = 1; rot = 0; pan = { x: 0, y: 0 }; img(); } })[b.dataset.f]();
    });
    d.addEventListener('wheel', function (e) { if (e.target.closest('.fv-image')) { e.preventDefault(); zb(e.deltaY < 0 ? .2 : -.2); } }, { passive: false });
    d.addEventListener('dblclick', function (e) { if (e.target.closest('.fv-image')) zoom > 1 ? (zoom = 1, pan = { x: 0, y: 0 }, img()) : zb(1); });
    d.addEventListener('pointerdown', function (e) {
      var s = e.target.closest('.fv-image'); if (!s || zoom <= 1) return; s.setPointerCapture(e.pointerId); var o0 = { x: pan.x, y: pan.y }, sx = e.clientX, sy = e.clientY;
      function mv(ev) { pan = { x: o0.x + ev.clientX - sx, y: o0.y + ev.clientY - sy }; img(); } s.addEventListener('pointermove', mv); s.addEventListener('pointerup', function () { s.removeEventListener('pointermove', mv); }, { once: true });
    });
    d.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    document.addEventListener('keydown', key);
    render(); d.showModal();
    return { close: close };
  }

  window.Media = { audio: audio, video: video, youtube: youtube, carousel: carousel, pdf: pdf, viewer: viewer, kind: kind, fmt: fmt, ICON: ICON };
})();
