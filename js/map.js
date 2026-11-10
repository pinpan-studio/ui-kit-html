/* ==========================================================================
   Cartes : fine surcouche à Leaflet 1.9 (embarqué, chargé à la demande).
   Seules les tuiles sont téléchargées depuis des serveurs publics sans clé d'API.
   UIMap.create(el, { center:[lat,lng], zoom, height, basemap, markers:[{lat,lng,title,lines:[],tone,icon}],
                      fitBounds, polylines:[{points,color}], polygons:[{points,color}] }) -> Promise<L.Map>
   ========================================================================== */
(function () {
  'use strict';
  // Leaflet 1.9.4 embarqué dans vendor/leaflet (chemin relatif à ce script)
  var LEAFLET = (document.currentScript && document.currentScript.src || '').replace(/js\/map\.js.*$/, 'vendor/leaflet/');
  var BASEMAPS = {
    light: { label: 'Gris clair', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', attr: 'Tuiles © Esri' },
    dark: { label: 'Gris foncé', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', attr: 'Tuiles © Esri' },
    streets: { label: 'Rues', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', attr: 'Tuiles © Esri' },
    topo: { label: 'Topographique', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', attr: 'Tuiles © Esri' },
    satellite: { label: 'Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attr: 'Tuiles © Esri' },
    osm: { label: 'OpenStreetMap', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attr: '© contributeurs OpenStreetMap' }
  };
  var loading;
  function load() {
    if (window.L) return Promise.resolve(window.L);
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = LEAFLET + 'leaflet.css'; document.head.appendChild(css);
      var s = document.createElement('script'); s.src = LEAFLET + 'leaflet.js'; s.onload = function () { res(window.L); }; s.onerror = rej; document.head.appendChild(s);
    });
    return loading;
  }
  function isDark() { var m = document.documentElement.getAttribute('data-mode'); return m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches); }
  function pin(L, m) {
    var tone = m.tone || 'primary';
    return L.divIcon({ className: 'um-pin', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28],
      html: '<span class="um-pin__in" style="--tone:var(--' + tone + ')"><span class="mi">' + (m.icon || 'place') + '</span></span>' });
  }

  function create(el, o) {
    o = Object.assign({ center: [5.345, -4.024], zoom: 11, height: '320px' }, o);
    el.style.height = el.style.height || o.height;
    el.classList.add('um');
    el.innerHTML = '<div class="um-loading">Chargement de la carte…</div>';
    return load().then(function (L) {
      el.innerHTML = '';
      var map = L.map(el, { zoomControl: true, attributionControl: true, scrollWheelZoom: o.scrollWheelZoom !== false }).setView(o.center, o.zoom);
      var bm = o.basemap || (isDark() ? 'dark' : 'light'), layer = L.tileLayer(BASEMAPS[bm].url, { attribution: BASEMAPS[bm].attr, maxZoom: 19 }).addTo(map);
      map.setBasemap = function (id) { map.removeLayer(layer); layer = L.tileLayer(BASEMAPS[id].url, { attribution: BASEMAPS[id].attr, maxZoom: 19 }).addTo(map); };
      if (!o.basemap) new MutationObserver(function () { map.setBasemap(isDark() ? 'dark' : 'light'); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
      var group = L.featureGroup().addTo(map); map.markerRefs = [];
      (o.markers || []).forEach(function (m) {
        var mk = L.marker([m.lat, m.lng], { icon: pin(L, m), title: m.title }).addTo(group);
        mk.bindPopup('<strong>' + m.title + '</strong>' + (m.lines || []).map(function (l) { return '<br>' + l; }).join(''));
        if (m.onClick) mk.on('click', function () { m.onClick(m); });
        map.markerRefs.push(mk);
      });
      (o.polylines || []).forEach(function (p) { L.polyline(p.points, { color: p.color || getComputedStyle(document.documentElement).getPropertyValue('--primary'), weight: p.weight || 4, opacity: .85, dashArray: p.dash }).addTo(group); });
      (o.polygons || []).forEach(function (p) { var c = p.color || getComputedStyle(document.documentElement).getPropertyValue('--primary'); L.polygon(p.points, { color: c, fillColor: c, fillOpacity: .15, weight: 2 }).bindTooltip(p.title || '').addTo(group); });
      (o.circles || []).forEach(function (p) { var c = p.color || getComputedStyle(document.documentElement).getPropertyValue('--primary'); L.circle(p.center, { radius: p.radius, color: c, fillColor: c, fillOpacity: .12, weight: 2 }).bindTooltip(p.title || '').addTo(group); });
      if (o.fitBounds && group.getLayers().length) map.fitBounds(group.getBounds(), { padding: [24, 24] });
      new ResizeObserver(function () { map.invalidateSize(); }).observe(el);
      map.group = group;
      return map;
    }).catch(function () { el.innerHTML = '<div class="um-loading">Carte indisponible (hors ligne).</div>'; });
  }

  window.UIMap = { create: create, load: load, BASEMAPS: BASEMAPS };
})();
