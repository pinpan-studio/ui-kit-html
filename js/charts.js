/* ==========================================================================
   Graphiques SVG en JavaScript natif (aucune dépendance).
   Charts.render(el, config) — types :
     line   { labels, series:[{label,data,color?,dash?,fill?,step?,width?}], stacked?, yMin? }
     bar    { labels, series:[{label,data,color?,type?:'line',axis?:'y2'}], stacked?, horizontal?, floating? (data:[[a,b]]), colors?:[] }
     pie | doughnut  { labels, data, colors?, cutout? }
     polar  { labels, data, colors? }
     radar  { labels, series:[{label,data,color?}], max? }
     scatter|bubble  { series:[{label,data:[{x,y,r?}],color?}], xLabel?, yLabel? }
     spark  { data, color? }
   Options communes : legend (true|false), format(v) pour les valeurs, yFormat, height.
   Les couleurs par défaut suivent les jetons CSS du thème (re-rendu au changement de thème).
   ========================================================================== */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var registry = [];

  function cssVar(name, el) { return getComputedStyle(el || document.documentElement).getPropertyValue(name).trim(); }
  function palette() {
    return ['--primary', '--info', '--tertiary', '--success', '--warning', '--error', '--secondary'].map(function (v) { return cssVar(v); })
      .concat(['#8b5cf6', '#ec4899', '#14b8a6']);
  }
  function nf(v) { return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(v); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Graduations « propres »
  function niceScale(min, max, ticks) {
    if (min === max) { max = min + 1; }
    var range = max - min, step = Math.pow(10, Math.floor(Math.log10(range / ticks))), err = ticks / (range / step);
    if (err <= 0.15) step *= 10; else if (err <= 0.35) step *= 5; else if (err <= 0.75) step *= 2;
    var lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, out = [];
    for (var v = lo; v <= hi + step / 2; v += step) out.push(+v.toFixed(10));
    return { min: lo, max: hi, ticks: out };
  }
  function smoothPath(pts, tension) {
    if (pts.length < 2) return '';
    var d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2, t = tension === undefined ? 0.35 : tension;
      var c1x = p1[0] + (p2[0] - p0[0]) * t / 2, c1y = p1[1] + (p2[1] - p0[1]) * t / 2;
      var c2x = p2[0] - (p3[0] - p1[0]) * t / 2, c2y = p2[1] - (p3[1] - p1[1]) * t / 2;
      d += ' C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + p2[0] + ',' + p2[1];
    }
    return d;
  }
  function stepPath(pts) { var d = 'M' + pts[0][0] + ',' + pts[0][1]; for (var i = 1; i < pts.length; i++) d += ' H' + pts[i][0] + ' V' + pts[i][1]; return d; }
  function arc(cx, cy, r, a0, a1, r0) {
    var large = a1 - a0 > Math.PI ? 1 : 0;
    var p = function (a, rr) { return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
    var s = p(a0, r), e = p(a1, r);
    if (!r0) return 'M' + cx + ',' + cy + ' L' + s + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + e + ' Z';
    var s0 = p(a1, r0), e0 = p(a0, r0);
    return 'M' + s + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + e + ' L' + s0 + ' A' + r0 + ',' + r0 + ' 0 ' + large + ' 0 ' + e0 + ' Z';
  }

  function legendHtml(items) {
    return '<div class="ch-legend">' + items.map(function (it) {
      return '<span><i style="background:' + it.color + (it.dash ? ';height:2px;border-radius:0' : '') + '"></i>' + esc(it.label) + '</span>';
    }).join('') + '</div>';
  }

  function render(el, cfg) {
    if (!el) return;
    if (!el.__chart) registry.push(el);
    el.__chart = cfg;
    draw(el);
  }

  function draw(el) {
    var cfg = el.__chart, type = cfg.type, pal = cfg.colors || palette();
    var muted = cssVar('--text-muted'), grid = cssVar('--border'), card = cssVar('--card-bg') || '#fff';
    var fmt = cfg.format || nf, yfmt = cfg.yFormat || fmt;
    el.classList.add('ch');
    var W = el.clientWidth || 300, H = cfg.height || el.clientHeight || 220;
    var tip = '<div class="ch-tip" hidden></div>';
    var html = '', legend = cfg.legend !== false;

    if (type === 'spark') {
      var d = cfg.data, mn = Math.min.apply(null, d), mx = Math.max.apply(null, d), c = cfg.color || pal[0];
      var pts = d.map(function (v, i) { return [i / (d.length - 1) * W, 2 + (H - 4) * (1 - (v - mn) / ((mx - mn) || 1))]; });
      var line = smoothPath(pts, 0.4);
      el.innerHTML = '<svg width="' + W + '" height="' + H + '" aria-hidden="true"><path d="' + line + ' L' + W + ',' + H + ' L0,' + H + ' Z" fill="' + c + '" fill-opacity=".12"/><path d="' + line + '" fill="none" stroke="' + c + '" stroke-width="1.5"/></svg>';
      return;
    }

    if (type === 'pie' || type === 'doughnut' || type === 'polar') {
      var data = cfg.data, total = data.reduce(function (a, b) { return a + b; }, 0), size = Math.min(W, H - (legend ? 28 : 0)), r = size / 2 - 4;
      var cx = W / 2, cy = size / 2, a = -Math.PI / 2, max = Math.max.apply(null, data), paths = '';
      var inner = type === 'doughnut' ? r * (cfg.cutout || 0.7) : 0;
      data.forEach(function (v, i) {
        var col = pal[i % pal.length];
        if (type === 'polar') {
          var step = Math.PI * 2 / data.length, rr = r * Math.sqrt(v / max);
          paths += '<path d="' + arc(cx, cy, rr, a, a + step) + '" fill="' + col + '" fill-opacity=".65" stroke="' + card + '" stroke-width="2" data-tip="' + esc(cfg.labels[i]) + ' : ' + fmt(v) + '"/>';
          a += step;
        } else {
          var sweep = v / total * Math.PI * 2;
          paths += '<path d="' + arc(cx, cy, r, a, a + sweep - 0.0001, inner) + '" fill="' + col + '" stroke="' + card + '" stroke-width="2" data-tip="' + esc(cfg.labels[i]) + ' : ' + fmt(v) + ' (' + Math.round(v / total * 100) + ' %)"/>';
          a += sweep;
        }
      });
      if (type === 'polar') [0.25, 0.5, 0.75, 1].forEach(function (k) { paths = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * Math.sqrt(k) + '" fill="none" stroke="' + grid + '"/>' + paths; });
      html = '<svg width="' + W + '" height="' + size + '" role="img">' + paths + '</svg>';
      if (legend) html += legendHtml(cfg.labels.map(function (l, i) { return { label: l, color: pal[i % pal.length] }; }));
      el.innerHTML = html + tip; bindTips(el); return;
    }

    if (type === 'radar') {
      var n = cfg.labels.length, size2 = Math.min(W, H - (legend ? 28 : 0)), R = size2 / 2 - 28, cx2 = W / 2, cy2 = size2 / 2;
      var mx2 = cfg.max || Math.max.apply(null, cfg.series.reduce(function (a, s) { return a.concat(s.data); }, []));
      var pt = function (i, v) { var ang = -Math.PI / 2 + i * Math.PI * 2 / n; return [cx2 + R * v / mx2 * Math.cos(ang), cy2 + R * v / mx2 * Math.sin(ang)]; };
      var g = '';
      [0.25, 0.5, 0.75, 1].forEach(function (k) { g += '<polygon points="' + cfg.labels.map(function (_, i) { return pt(i, mx2 * k).join(','); }).join(' ') + '" fill="none" stroke="' + grid + '"/>'; });
      cfg.labels.forEach(function (l, i) {
        var e = pt(i, mx2), t = pt(i, mx2 * 1.14);
        g += '<line x1="' + cx2 + '" y1="' + cy2 + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="' + grid + '"/><text x="' + t[0] + '" y="' + t[1] + '" fill="' + muted + '" font-size="11" text-anchor="middle" dominant-baseline="middle">' + esc(l) + '</text>';
      });
      cfg.series.forEach(function (s, si) {
        var col = s.color || pal[si % pal.length];
        g += '<polygon points="' + s.data.map(function (v, i) { return pt(i, v).join(','); }).join(' ') + '" fill="' + col + '" fill-opacity=".18" stroke="' + col + '" stroke-width="2"/>';
        s.data.forEach(function (v, i) { var p = pt(i, v); g += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="' + col + '" data-tip="' + esc(s.label) + ' · ' + esc(cfg.labels[i]) + ' : ' + fmt(v) + '"/>'; });
      });
      html = '<svg width="' + W + '" height="' + size2 + '" role="img">' + g + '</svg>';
      if (legend) html += legendHtml(cfg.series.map(function (s, i) { return { label: s.label, color: s.color || pal[i % pal.length] }; }));
      el.innerHTML = html + tip; bindTips(el); return;
    }

    // ── Graphiques à axes : line, bar, scatter, bubble ──
    var series = cfg.series, hasY2 = series.some(function (s) { return s.axis === 'y2'; });
    var legH = legend && (series.length > 1 || cfg.forceLegend) ? 26 : 0;
    var padL = cfg.horizontal ? 110 : 44, padR = hasY2 ? 44 : 12, padT = 8 + legH, padB = 26;
    var pw = W - padL - padR, ph = H - padT - padB, g2 = '';
    var isXY = type === 'scatter' || type === 'bubble';
    var vals = [], vals2 = [];
    if (isXY) {
      var xs = [], ys = [];
      series.forEach(function (s) { s.data.forEach(function (p) { xs.push(p.x); ys.push(p.y); }); });
      var sx = niceScale(Math.min.apply(null, xs.concat(cfg.xMin !== undefined ? [cfg.xMin] : [])), Math.max.apply(null, xs), 5);
      var sy = niceScale(Math.min.apply(null, ys.concat(cfg.yMin !== undefined ? [cfg.yMin] : [])), Math.max.apply(null, ys), 5);
      var X = function (v) { return padL + (v - sx.min) / (sx.max - sx.min) * pw; }, Y = function (v) { return padT + ph - (v - sy.min) / (sy.max - sy.min) * ph; };
      sy.ticks.forEach(function (t) { g2 += '<line x1="' + padL + '" x2="' + (padL + pw) + '" y1="' + Y(t) + '" y2="' + Y(t) + '" stroke="' + grid + '"/><text x="' + (padL - 6) + '" y="' + Y(t) + '" fill="' + muted + '" font-size="11" text-anchor="end" dominant-baseline="middle">' + yfmt(t) + '</text>'; });
      sx.ticks.forEach(function (t) { g2 += '<text x="' + X(t) + '" y="' + (H - 8) + '" fill="' + muted + '" font-size="11" text-anchor="middle">' + (cfg.xFormat || fmt)(t) + '</text>'; });
      series.forEach(function (s, si) {
        var col = s.color || pal[si % pal.length];
        s.data.forEach(function (p) { g2 += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="' + (p.r || 4) + '" fill="' + col + '" fill-opacity="' + (type === 'bubble' ? .55 : .8) + '" stroke="' + col + '" data-tip="' + esc(s.label) + ' : ' + (cfg.xFormat || fmt)(p.x) + ' · ' + yfmt(p.y) + '"/>'; });
      });
      if (cfg.xLabel) g2 += '<text x="' + (padL + pw) + '" y="' + (padT + ph - 6) + '" fill="' + muted + '" font-size="11" text-anchor="end">' + esc(cfg.xLabel) + '</text>';
    } else {
      var L = cfg.labels, N = L.length;
      // Domaine des valeurs
      if (cfg.stacked) {
        L.forEach(function (_, i) { var pos = 0, neg = 0; series.forEach(function (s) { if (s.axis === 'y2') return; var v = s.data[i] || 0; v >= 0 ? pos += v : neg += v; }); vals.push(pos, neg); });
      } else series.forEach(function (s) { (s.axis === 'y2' ? vals2 : vals).push.apply(s.axis === 'y2' ? vals2 : vals, s.data.reduce(function (a, v) { return a.concat(Array.isArray(v) ? v : [v]); }, [])); });
      var lo = cfg.yMin !== undefined ? cfg.yMin : Math.min(0, Math.min.apply(null, vals)), sc = niceScale(lo, Math.max.apply(null, vals), 4);
      var sc2 = vals2.length ? niceScale(Math.min(0, Math.min.apply(null, vals2)), Math.max.apply(null, vals2), 4) : null;
      var horiz = !!cfg.horizontal;
      var band = (horiz ? ph : pw) / N;
      var V = function (v, s2) { var s = s2 || sc; var k = (v - s.min) / (s.max - s.min); return horiz ? padL + k * pw : padT + ph - k * ph; };
      var C = function (i) { return (horiz ? padT : padL) + band * (i + 0.5); };
      // Grille + axes
      sc.ticks.forEach(function (t) {
        if (horiz) g2 += '<line y1="' + padT + '" y2="' + (padT + ph) + '" x1="' + V(t) + '" x2="' + V(t) + '" stroke="' + grid + '"/><text y="' + (H - 8) + '" x="' + V(t) + '" fill="' + muted + '" font-size="11" text-anchor="middle">' + yfmt(t) + '</text>';
        else g2 += '<line x1="' + padL + '" x2="' + (padL + pw) + '" y1="' + V(t) + '" y2="' + V(t) + '" stroke="' + grid + '"/><text x="' + (padL - 6) + '" y="' + V(t) + '" fill="' + muted + '" font-size="11" text-anchor="end" dominant-baseline="middle">' + yfmt(t) + '</text>';
      });
      if (sc2) sc2.ticks.forEach(function (t) { g2 += '<text x="' + (padL + pw + 6) + '" y="' + V(t, sc2) + '" fill="' + muted + '" font-size="11" dominant-baseline="middle">' + (cfg.y2Format || fmt)(t) + '</text>'; });
      var every = Math.ceil(N / Math.max(1, Math.floor((horiz ? ph : pw) / (horiz ? 18 : 42))));
      L.forEach(function (l, i) {
        if (i % every) return;
        if (horiz) g2 += '<text x="' + (padL - 8) + '" y="' + C(i) + '" fill="' + muted + '" font-size="11" text-anchor="end" dominant-baseline="middle">' + esc(l) + '</text>';
        else g2 += '<text x="' + C(i) + '" y="' + (H - 8) + '" fill="' + muted + '" font-size="11" text-anchor="middle">' + esc(l) + '</text>';
      });
      // Séries
      var bars = series.filter(function (s) { return type === 'bar' && s.type !== 'line'; });
      var lines = series.filter(function (s) { return type === 'line' || s.type === 'line'; });
      var bw = band * 0.7 / (cfg.stacked ? 1 : Math.max(1, bars.length));
      var stackPos = L.map(function () { return 0; }), stackNeg = L.map(function () { return 0; });
      bars.forEach(function (s, si) {
        var idx = series.indexOf(s);
        s.data.forEach(function (v, i) {
          var col = (s.colors && s.colors[i]) || s.color || pal[idx % pal.length], a, b;
          if (Array.isArray(v)) { a = v[0]; b = v[1]; }
          else if (cfg.stacked) { if (v >= 0) { a = stackPos[i]; b = stackPos[i] += v; } else { a = stackNeg[i]; b = stackNeg[i] += v; } }
          else { a = 0; b = v; }
          var off = cfg.stacked ? -bw / 2 : -band * 0.35 + si * bw, p1 = V(a, s.axis === 'y2' ? sc2 : null), p2 = V(b, s.axis === 'y2' ? sc2 : null);
          var tipTxt = esc(L[i]) + ' · ' + esc(s.label || '') + ' : ' + fmt(Array.isArray(v) ? v[1] - v[0] : v);
          if (horiz) g2 += '<rect y="' + (C(i) + off) + '" height="' + (bw - 2) + '" x="' + Math.min(p1, p2) + '" width="' + Math.max(1, Math.abs(p2 - p1)) + '" rx="3" fill="' + col + '" data-tip="' + tipTxt + '"/>';
          else g2 += '<rect x="' + (C(i) + off + 1) + '" width="' + (bw - 2) + '" y="' + Math.min(p1, p2) + '" height="' + Math.max(1, Math.abs(p2 - p1)) + '" rx="3" fill="' + col + '" data-tip="' + tipTxt + '"/>';
        });
      });
      var acc = L.map(function () { return 0; });
      lines.forEach(function (s) {
        var idx = series.indexOf(s), col = s.color || pal[idx % pal.length], s2 = s.axis === 'y2' ? sc2 : null;
        var base = acc.slice();
        var pts = s.data.map(function (v, i) { var y = cfg.stacked && type === 'line' ? (acc[i] += v) : v; return [C(i), V(y, s2)]; });
        var d = s.step ? stepPath(pts) : smoothPath(pts, s.tension);
        if (s.fill) {
          var basePts = cfg.stacked && type === 'line' ? base.map(function (v, i) { return [C(i), V(v)]; }).reverse() : [[pts[pts.length - 1][0], V(Math.max(sc.min, 0))], [pts[0][0], V(Math.max(sc.min, 0))]];
          var back = cfg.stacked && type === 'line' ? (s.step ? stepPath(basePts).replace('M', 'L') : smoothPath(basePts, s.tension).replace('M', 'L')) : ' L' + basePts.join(' L');
          g2 += '<path d="' + d + back + ' Z" fill="' + col + '" fill-opacity="' + (s.fillOpacity || (cfg.stacked ? .35 : .1)) + '"/>';
        }
        g2 += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (s.width || 2) + '"' + (s.dash ? ' stroke-dasharray="4 4"' : '') + '/>';
        pts.forEach(function (p, i) { g2 += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (s.points ? 3 : 8) + '" fill="' + (s.points ? col : 'transparent') + '" data-tip="' + esc(L[i]) + ' · ' + esc(s.label || '') + ' : ' + fmt(s.data[i]) + '"/>'; });
      });
    }
    html = '';
    if (legH) html += legendHtml(series.map(function (s, i) { return { label: s.label, color: s.color || pal[i % pal.length], dash: (type === 'line' || s.type === 'line') }; }));
    html += '<svg width="' + W + '" height="' + (H - legH) + '" viewBox="0 ' + legH + ' ' + W + ' ' + (H - legH) + '" role="img">' + g2 + '</svg>';
    el.innerHTML = html + tip; bindTips(el);
  }

  function bindTips(el) {
    if (el.__tips) return; el.__tips = true;
    el.addEventListener('mousemove', function (e) {
      var t = e.target.closest && e.target.closest('[data-tip]'), tip = el.querySelector('.ch-tip');
      if (!tip) return;
      if (!t) { tip.hidden = true; return; }
      var r = el.getBoundingClientRect();
      tip.textContent = t.getAttribute('data-tip'); tip.hidden = false;
      var x = e.clientX - r.left + 12, y = e.clientY - r.top + 12;
      if (x + tip.offsetWidth > r.width) x = e.clientX - r.left - tip.offsetWidth - 12;
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    });
    el.addEventListener('mouseleave', function () { var tip = el.querySelector('.ch-tip'); if (tip) tip.hidden = true; });
  }

  // Re-rendu au redimensionnement et au changement de thème
  var ro = new ResizeObserver(function (entries) { entries.forEach(function (e) { if (e.target.__chart && e.target.__w !== e.contentRect.width) { e.target.__w = e.contentRect.width; draw(e.target); } }); });
  var _render = render;
  render = function (el, cfg) { _render(el, cfg); ro.observe(el); };
  new MutationObserver(function () { setTimeout(function () { registry.forEach(function (el) { if (el.isConnected) draw(el); }); }, 30); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-mode'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { registry.forEach(function (el) { if (el.isConnected) draw(el); }); });

  window.Charts = { render: function (el, cfg) { render(el, cfg); }, palette: palette, cssVar: cssVar };
})();
