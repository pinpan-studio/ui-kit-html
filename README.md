# UI Kit HTML

Version **HTML / CSS / JavaScript natifs** du UI kit Pinpan : aucun framework, aucune dépendance, aucune étape de build.
Mêmes jetons de design et mêmes 41 thèmes de couleur Material 3 que [`ui-kit`](https://github.com/pinpan-studio/ui-kit) (Angular).

## Démarrer

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8080
```

## Structure

```
css/
  tokens.css      jetons : typo, espacements, rayons, ombres, couleurs, mode clair/sombre, polices
  themes.css      41 thèmes (.theme-<id>), généré depuis ui-kit
  components.css  base + composants (.ui-*) + shell applicatif
js/
  ui-kit.js       comportements natifs (thème, onglets, dialogues, menus, toasts, menu mobile)
  themes.js       liste des thèmes (id, libellé, couleurs) pour les sélecteurs
assets/           polices TT Wellingtons, logos
examples/         écrans complets (connexion)
index.html        catalogue de tous les composants
```

## Utilisation

```html
<html lang="fr" data-mode="system" class="theme-cyan">
<head>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/themes.css">
  <link rel="stylesheet" href="css/components.css">
  <script src="js/ui-kit.js"></script>
</head>
```

- **Mode** : `data-mode="light|dark|system"` sur `<html>`, ou `UIKit.setMode('dark')`, ou un bouton `data-set-mode="dark"`.
- **Thème** : classe `theme-<id>` sur `<html>`, ou `UIKit.setTheme('red')`, ou `data-set-theme="red"`. Choix mémorisés (localStorage).
- **Dialogue** : `<dialog class="ui-dialog" id="x">` + `data-dialog-open="x"` / `data-dialog-close`.
- **Onglets** : conteneur `data-tabs`, boutons `role="tab" aria-controls="…"`, panneaux `role="tabpanel"`.
- **Menu** : `<details class="ui-menu"><summary>…</summary><div class="ui-menu__panel">…</div></details>`.
- **Toast** : `data-toast="Message"` ou `UIKit.toast('Message')`.

## Composants

Boutons (principal, tonal, contour, texte, danger, icône, tailles), champs, select, textarea, case à cocher, radio,
interrupteur, carte, badge, alerte, tableau, onglets, dialogue, menu, toast, avatar, progression, état vide,
squelette, shell (sidebar + barre supérieure, responsive).

## Navigateurs

Navigateurs récents (Chrome, Edge, Firefox, Safari 16.4+) : `color-mix()`, `<dialog>`, `:focus-visible`.
