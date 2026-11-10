/* ==========================================================================
   Cadre d'appareil autour d'une iframe : ordinateur (écran + navigateur),
   tablette (iPad) ou téléphone (iPhone). Le cadre garde ses dimensions réelles
   et est mis à l'échelle pour tenir dans son conteneur : les media queries de
   la page affichée réagissent donc à la vraie largeur de l'appareil.

   const f = DeviceFrame.mount(el, { src, device, landscape, zoom: 'fit'|number, thumbnail, title, onUrl });
   f.update({ device: 'phone' }); f.reload(); f.destroy();
   ========================================================================== */
(function () {
  'use strict';

  var SPECS = {
    desktop: { label: 'Ordinateur', icon: 'desktop_windows', width: 1440, height: 860, model: 'Écran 1440 × 860' },
    tablet: { label: 'Tablette', icon: 'tablet_mac', width: 820, height: 1180, model: 'iPad Air · 820 × 1180' },
    phone: { label: 'Mobile', icon: 'phone_iphone', width: 393, height: 852, model: 'iPhone 15 Pro · 393 × 852' }
  };
  var BEZEL = { desktop: { x: 14, top: 14 + 84, bottom: 26 + 96 }, tablet: { x: 22, top: 22, bottom: 22 }, phone: { x: 13, top: 13, bottom: 13 } };
  var STATUS_BAR = { desktop: 0, tablet: 24, phone: 54 };

  var SIGNAL = '<svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
  var WIFI = '<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 2.6c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .8 10.4 10.4 0 0 0 .8 3.7L2 5a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4.4c-1.8 0-3.4.7-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5c-.6 0-1.1.2-1.5.6L8 12l1.5-1.7c-.4-.4-.9-.6-1.5-.6Z"/></svg>';

  function mount(host, opts) {
    var o = Object.assign({ device: 'desktop', landscape: false, zoom: 'fit', thumbnail: false, title: 'Aperçu' }, opts);
    host.classList.add('df-host');
    var iframe, frameEl, sizer, timer, lastPath = '';

    function screen() {
      var s = SPECS[o.device];
      return o.landscape && o.device !== 'desktop' ? { w: s.height, h: s.width } : { w: s.width, h: s.height };
    }
    function statusBar() { return o.device === 'phone' && o.landscape ? 0 : STATUS_BAR[o.device]; }
    function frameSize() { var b = BEZEL[o.device], sc = screen(); return { w: sc.w + b.x * 2, h: sc.h + b.top + b.bottom }; }

    function render() {
      var src = lastPath && !o.thumbnail ? lastPath : o.src;
      var d = o.device, f = frameSize(), sb = statusBar();
      var viewport = '<div class="df-loader"><span></span></div><iframe title="' + o.title + '"' + (o.thumbnail ? ' loading="lazy" tabindex="-1"' : '') + '></iframe>';
      var inner;
      if (d === 'desktop') {
        inner = '<div class="df-monitor"><div class="df-browser">' +
          '<div class="df-tabbar"><div class="df-lights"><i></i><i></i><i></i></div><div class="df-tab"><img src="' + (window.KIT_ROOT || '') + 'assets/logo.png" alt=""><span class="df-title">' + o.title + '</span><span class="mi">close</span></div><span class="mi df-newtab">add</span></div>' +
          '<div class="df-toolbar"><button type="button" data-df="back" aria-label="Précédent"><span class="mi">arrow_back</span></button>' +
          '<button type="button" data-df="forward" aria-label="Suivant"><span class="mi">arrow_forward</span></button>' +
          '<button type="button" data-df="reload" aria-label="Recharger"><span class="mi">refresh</span></button>' +
          '<label class="df-omnibox"><span class="mi">lock</span><span class="df-hostname">' + (location.host || 'ui-kit.local') + '/</span><input type="text" spellcheck="false" aria-label="Adresse"' + (o.thumbnail ? ' readonly' : '') + '><span class="mi">star_outline</span></label>' +
          '<span class="df-avatar">JK</span><span class="mi">more_vert</span></div>' +
          '<div class="df-screen">' + viewport + '</div></div>' +
          '<div class="df-chin"><b>UI KIT</b><i></i></div></div><div class="df-stand"><div></div><div></div></div>';
      } else {
        inner = '<span class="df-btn power"></span>' + (d === 'phone' ? '<span class="df-btn action"></span>' : '') + '<span class="df-btn vol-up"></span><span class="df-btn vol-down"></span>' +
          '<div class="df-glass">' +
          (sb ? '<div class="df-statusbar" style="height:' + sb + 'px"><span class="df-time">9:41</span>' + (d === 'tablet' ? '<span>ven. 17 oct.</span>' : '') +
            '<span style="flex:1"></span><span class="df-icons">' + SIGNAL + WIFI + '<span class="df-battery"><i></i></span></span></div>' : '') +
          (d === 'phone' ? '<span class="df-island"></span>' : '<span class="df-camera"></span>') +
          '<div class="df-screen" style="top:' + sb + 'px">' + viewport + '</div>' +
          (d === 'phone' ? '<span class="df-home"></span>' : '') + '</div>';
      }
      host.innerHTML = '<div class="df-sizer"><div class="df-device ' + d + (o.landscape ? ' landscape' : '') + '" style="width:' + f.w + 'px;height:' + f.h + 'px">' + inner + '</div></div>';
      sizer = host.firstChild; frameEl = sizer.firstChild;
      iframe = host.querySelector('iframe');
      iframe.addEventListener('load', function () { host.querySelector('.df-loader').hidden = true; track(); });
      iframe.src = src;
      var input = host.querySelector('.df-omnibox input');
      if (input) {
        input.value = src;
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { go(input.value); input.blur(); } });
      }
      host.querySelectorAll('[data-df]').forEach(function (b) {
        b.addEventListener('click', function () { var a = b.getAttribute('data-df'); a === 'reload' ? reload() : win() && win().history[a](); });
      });
      fit();
    }

    function fit() {
      var f = frameSize(), sc;
      if (o.zoom !== 'fit') sc = o.zoom;
      else {
        var w = host.clientWidth, h = host.clientHeight, pad = o.thumbnail ? 0 : 32;
        if (!w || !h) return;
        sc = Math.min(1, (w - pad) / f.w, (h - pad) / f.h);
      }
      sizer.style.width = f.w * sc + 'px';
      sizer.style.height = f.h * sc + 'px';
      frameEl.style.transform = 'scale(' + sc + ')';
      host.classList.toggle('df-scroll', o.zoom !== 'fit');
    }

    function win() { try { return iframe && iframe.contentWindow; } catch (e) { return null; } }
    function reload() { host.querySelector('.df-loader').hidden = false; try { win().location.reload(); } catch (e) { iframe.src = iframe.src; } }
    function go(v) { host.querySelector('.df-loader').hidden = false; iframe.src = v.trim(); }

    // Suit la navigation interne de l'iframe (même origine uniquement)
    function track() {
      if (o.thumbnail) return;
      try {
        var w = win(); if (!w || w.location.href === 'about:blank') return;
        var base = new URL(window.KIT_ROOT || './', location.href).href;
        var href = w.location.href;
        var path = href.indexOf(base) === 0 ? href.slice(base.length) : href;
        if (path !== lastPath) {
          lastPath = path;
          var input = host.querySelector('.df-omnibox input'); if (input && document.activeElement !== input) input.value = path;
          if (o.onUrl) o.onUrl(path);
        }
        var t = host.querySelector('.df-title'); if (t && w.document.title) t.textContent = w.document.title;
      } catch (e) { /* autre origine (file://) : rien à suivre */ }
    }

    var ro = new ResizeObserver(fit); ro.observe(host);
    timer = setInterval(track, 600);
    render();

    return {
      update: function (patch) {
        var rebuild = ('device' in patch && patch.device !== o.device) || ('landscape' in patch && patch.landscape !== o.landscape) || ('src' in patch && patch.src !== o.src);
        if ('src' in patch && patch.src !== o.src) lastPath = '';
        Object.assign(o, patch);
        rebuild ? render() : fit();
      },
      reload: reload,
      destroy: function () { ro.disconnect(); clearInterval(timer); host.innerHTML = ''; }
    };
  }

  window.DeviceFrame = { SPECS: SPECS, mount: mount };
})();
