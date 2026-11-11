# UI Kit HTML

Version **HTML / CSS / JavaScript natifs** du UI kit Pinpan : aucun framework, aucune étape de build, aucun appel réseau obligatoire.
Mêmes jetons de design, mêmes 41 thèmes Material 3 et mêmes pages que [`ui-kit`](https://github.com/pinpan-studio/ui-kit) (Angular).

## Démarrer

Ouvrir `index.html` dans un navigateur, ou servir le dossier (recommandé : certaines démos lisent des fichiers locaux) :

```bash
python3 -m http.server 8080
```

Le site est 100 % statique : il se déploie tel quel sur n'importe quel hébergeur (Vercel, Netlify, GitHub Pages…).

## Contenu

| Page | Rôle |
| --- | --- |
| `index.html` | **UI Showcase** : thèmes, couleurs, typographie, espacements, icônes, accès à toutes les galeries |
| `theme-studio.html` | Studio de thème : schéma Material 3 calculé depuis une couleur, export CSS, application au kit |
| `components/*.html` | 13 galeries documentées (démo + extrait de code) : typographie, formulaires, champs avancés, boutons, navigation, data display, feedback, planning, cartes, médias, interactions, Material & CDK, layout |
| `layouts.html` · `pages.html` | Gabarits d'écran et registre de toutes les pages |
| `showcases.html` · `showcase.html` | Aperçus des écrans dans des cadres d'appareils |
| `examples/app/*.html` | 16 écrans d'application dans le shell (tableau de bord, supervision, clients, fiche, messageries, fichiers, planning, blog, documentation, paramètres…) |
| `examples/forms/*.html` · `examples/auth.html?v=…` | 6 formulaires complets et 11 variantes d'authentification |
| `app/main.html` | Shell applicatif (rail, barre d'outils, tiroir compte / notifications) |
| `harnais/index.html` | Interface conversationnelle façon assistant IA, avec ~50 types de widgets |

## Structure

```
css/
  tokens.css        jetons : typo, espacements, rayons, ombres, couleurs, mode clair/sombre, icônes (.mi)
  themes.css        41 thèmes (.theme-<id>), générés depuis ui-kit
  components.css    base + composants (.ui-*, champs, menus, tableaux, cartes, calendrier…)
  fonts-extra.css   Outfit, Inter, Space Mono + échelle .text-*
  doc.css           pages de documentation des galeries
  planning.css · media.css · files.css · chat.css · harnais.css · device-frame.css · pages/*.css
js/
  ui-kit.js         thème, mode, onglets, dialogues (confirm / prompt), toasts
  kit.js · doc.js   shell du catalogue · pages de documentation (hero, sommaire, démos + code)
  forms.js          UIForms : masque, select recherchable, multi-select, autocomplétion, filtre, date, dialogue CRUD
  fields.js         UIFields : OTP, nombre ±, montant, intervalle, notation, couleur, texte riche, Markdown,
                    arborescence, transfert, tags, adresse, mot de passe, copie
  charts.js         graphiques SVG (ligne, barres, aires, mixte, anneau, camembert, polaire, radar, nuage, bulles…)
  data-table.js     table de données (tri, recherche, pagination, sélection, colonnes, totaux, export)
  planning.js       kanban, Gantt, notes, vue groupée, calendrier, agenda
  map.js            cartes Leaflet (vendor/leaflet embarqué)
  media.js          lecteurs vidéo / audio / PDF, YouTube, carrousel, visionneuse
  files.js · ex-chat.js · ex-shell.js · ex-widgets.js · components.js · harnais.js
  data/             données d'exemple et logique reprises de ui-kit (transpilées, exposées sous window.DATA)
  lib/              utilitaires transpilés : Markdown, QR code, diff, typographie française, schémas M3
assets/             polices, logos, images, icônes de fichiers
vendor/leaflet/     Leaflet 1.9.4
```

## Utilisation minimale

```html
<html lang="fr" data-mode="system" class="theme-cyan">
<head>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/themes.css">
  <link rel="stylesheet" href="css/components.css">
  <script src="js/ui-kit.js"></script>
</head>
```

- **Mode** : `data-mode="light|dark|system"` sur `<html>`, `UIKit.setMode('dark')` ou un bouton `data-set-mode="dark"`.
- **Thème** : classe `theme-<id>` sur `<html>`, `UIKit.setTheme('red')` ou `data-set-theme="red"`. Choix mémorisés (localStorage).
- **Dialogues** : `UIKit.confirm({ title, message, type: 'danger' })`, `UIKit.prompt({ … })` → Promise.
- **Toast** : `UIKit.toast('Message')` ou `data-toast="Message"`.
- Les composants enrichis (`UIForms`, `UIFields`, `Charts`, `DataTable`, `Planning`, `UIMap`, `Media`) s'utilisent en
  chargeant le script correspondant ; chaque galerie montre l'appel exact via le bouton « Voir le code ».

## Hors ligne

Tout fonctionne sans réseau, sauf les fonds de carte (tuiles Esri / OpenStreetMap) et la lecture effective des vidéos YouTube
(façade affichée, iframe chargée au clic). Les médias d'exemple (images, audio, PDF, vidéo) sont générés localement.

## Navigateurs

Navigateurs récents (Chrome, Edge, Firefox, Safari 16.4+) : `color-mix()`, `<dialog>`, `:focus-visible`, container queries.

## Licences tierces

Leaflet (BSD-2-Clause), @material/material-color-utilities (Apache-2.0), polices Outfit / Inter / Space Mono (OFL).
