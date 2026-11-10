// Registre des showcases (repris de ui-kit/showcases.data.ts). Chemins relatifs à la racine du kit.
window.SHOWCASE_GROUPS = [
 {
  "id": "modules",
  "label": "Modules",
  "icon": "apps",
  "description": "Les sous-modules du kit, tels qu’ils s’affichent dans l’application."
 },
 {
  "id": "auth",
  "label": "Authentification",
  "icon": "lock",
  "description": "Connexion, inscription, récupération et vérification, sous plusieurs dispositions de formulaire."
 },
 {
  "id": "forms",
  "label": "Formulaires",
  "icon": "dynamic_form",
  "description": "Formulaires complets : contact, commande, assistant, questionnaire, réservation, candidature."
 },
 {
  "id": "content",
  "label": "Contenu éditorial",
  "icon": "auto_stories",
  "description": "Typographie de lecture et discussions : blog, article, documentation, fil d’équipe avec commentaires."
 },
 {
  "id": "layouts",
  "label": "Dispositions d’application",
  "icon": "space_dashboard",
  "description": "Gabarits complets : navigation, modules, listes de données, détail, tableaux de bord."
 }
];
window.SHOWCASES = [
 {
  "id": "main",
  "group": "modules",
  "label": "Main",
  "icon": "space_dashboard",
  "tags": [
   "shell",
   "rail",
   "drawer"
  ],
  "description": "Shell applicatif : rail de modules, barre d’outils, drawer droit (compte, notifications).",
  "path": "app/main.html"
 },
 {
  "id": "harnais",
  "group": "modules",
  "label": "Harnais · accueil",
  "icon": "auto_awesome",
  "tags": [
   "IA",
   "chat"
  ],
  "description": "Assistant conversationnel : salutation, saisie centrée et suggestions.",
  "path": "harnais/index.html"
 },
 {
  "id": "harnais-conversation",
  "group": "modules",
  "label": "Harnais · conversation",
  "icon": "forum",
  "tags": [
   "IA",
   "artefact"
  ],
  "description": "Fil complet avec réflexion, outils, code et panneau d’artefacts.",
  "path": "harnais/index.html?c=c-sidecar"
 },
 {
  "id": "auth-centered",
  "group": "auth",
  "label": "Connexion · centrée",
  "icon": "login",
  "tags": [
   "carte",
   "fond dégradé"
  ],
  "description": "Carte au centre d’un fond décoratif ; 6 fournisseurs en icônes rondes (Google, Apple, Microsoft…).",
  "path": "examples/auth.html?v=centered"
 },
 {
  "id": "auth-split-right",
  "group": "auth",
  "label": "Connexion · formulaire à droite",
  "icon": "vertical_split",
  "tags": [
   "split",
   "visuel"
  ],
  "description": "Visuel de marque à gauche, formulaire à droite ; Google et Microsoft en grille. Le visuel disparaît sur mobile.",
  "path": "examples/auth.html?v=split-right"
 },
 {
  "id": "auth-split-left",
  "group": "auth",
  "label": "Connexion · formulaire à gauche",
  "icon": "vertical_split",
  "tags": [
   "split",
   "témoignage"
  ],
  "description": "Formulaire à gauche, témoignage à droite ; « Continuer avec Google / Apple / Microsoft » avant l’e-mail.",
  "path": "examples/auth.html?v=split-left"
 },
 {
  "id": "auth-image",
  "group": "auth",
  "label": "Connexion · sur image",
  "icon": "image",
  "tags": [
   "verre dépoli",
   "photo"
  ],
  "description": "Verre dépoli sur photo plein écran ; boutons Google et Apple aux couleurs des marques.",
  "path": "examples/auth.html?v=image"
 },
 {
  "id": "auth-minimal",
  "group": "auth",
  "label": "Connexion · minimale",
  "icon": "crop_square",
  "tags": [
   "sans carte",
   "SSO"
  ],
  "description": "Page épurée, sans carte : Google, Microsoft et GitHub en premier, e-mail ensuite.",
  "path": "examples/auth.html?v=minimal"
 },
 {
  "id": "auth-social",
  "group": "auth",
  "label": "Connexion sociale",
  "icon": "groups",
  "tags": [
   "Google",
   "Apple",
   "Facebook",
   "GitHub",
   "LinkedIn"
  ],
  "description": "Uniquement des fournisseurs d’identité, boutons aux couleurs des marques ; e-mail en option.",
  "path": "examples/auth.html?v=social"
 },
 {
  "id": "auth-accounts",
  "group": "auth",
  "label": "Choix du compte Google",
  "icon": "switch_account",
  "tags": [
   "Google",
   "OAuth"
  ],
  "description": "Sélecteur de compte après « Continuer avec Google » : comptes mémorisés, autre compte.",
  "path": "examples/auth.html?v=accounts"
 },
 {
  "id": "auth-register",
  "group": "auth",
  "label": "Inscription en étapes",
  "icon": "person_add",
  "tags": [
   "stepper",
   "mot de passe"
  ],
  "description": "Inscription avec Google ou LinkedIn, ou en 3 étapes avec jauge de robustesse du mot de passe.",
  "path": "examples/auth.html?v=register"
 },
 {
  "id": "auth-forgot",
  "group": "auth",
  "label": "Mot de passe oublié",
  "icon": "key",
  "tags": [
   "récupération"
  ],
  "description": "Demande de lien de réinitialisation, puis confirmation d’envoi.",
  "path": "examples/auth.html?v=forgot"
 },
 {
  "id": "auth-otp",
  "group": "auth",
  "label": "Vérification en 2 étapes",
  "icon": "pin",
  "tags": [
   "OTP",
   "2FA"
  ],
  "description": "Saisie d’un code à 6 chiffres reçu par SMS, avec renvoi temporisé.",
  "path": "examples/auth.html?v=otp"
 },
 {
  "id": "auth-lock",
  "group": "auth",
  "label": "Session verrouillée",
  "icon": "lock_clock",
  "tags": [
   "avatar",
   "déverrouillage"
  ],
  "description": "Écran de verrouillage : avatar de l’utilisateur et mot de passe seul.",
  "path": "examples/auth.html?v=lock"
 },
 {
  "id": "form-contact",
  "group": "forms",
  "label": "Contact",
  "icon": "contact_mail",
  "tags": [
   "validation",
   "FAQ",
   "pièce jointe"
  ],
  "description": "Coordonnées et FAQ à gauche, formulaire validé à la soumission (erreurs en ligne, compteur, consentement).",
  "path": "examples/forms/contact.html"
 },
 {
  "id": "form-checkout",
  "group": "forms",
  "label": "Commande & paiement",
  "icon": "shopping_cart_checkout",
  "tags": [
   "Mobile Money",
   "carte",
   "récapitulatif"
  ],
  "description": "Tunnel en une page : livraison en cartes, Orange Money / MTN / Wave / carte, code promo, récapitulatif collant.",
  "path": "examples/forms/checkout.html"
 },
 {
  "id": "form-onboarding",
  "group": "forms",
  "label": "Assistant d’accueil",
  "icon": "rocket_launch",
  "tags": [
   "wizard",
   "plein écran",
   "invitations"
  ],
  "description": "Étapes verticales, une intention par écran : profil, organisation, modules, invitations par e-mail.",
  "path": "examples/forms/onboarding.html"
 },
 {
  "id": "form-survey",
  "group": "forms",
  "label": "Questionnaire",
  "icon": "quiz",
  "tags": [
   "NPS",
   "notation",
   "clavier"
  ],
  "description": "Une question par écran : NPS, notes en étoiles, choix uniques et multiples, réponse libre, navigation au clavier.",
  "path": "examples/forms/survey.html"
 },
 {
  "id": "form-booking",
  "group": "forms",
  "label": "Réservation",
  "icon": "event_available",
  "tags": [
   "calendrier",
   "créneaux"
  ],
  "description": "Prestation, calendrier, créneaux (complets barrés), participants et récapitulatif.",
  "path": "examples/forms/booking.html"
 },
 {
  "id": "form-application",
  "group": "forms",
  "label": "Candidature",
  "icon": "assignment_ind",
  "tags": [
   "formulaire long",
   "signature",
   "upload"
  ],
  "description": "Formulaire long à sections : complétion par section, postes répétables, dépôt de fichiers, salaire en lettres, signature.",
  "path": "examples/forms/application.html"
 },
 {
  "id": "content-article",
  "group": "content",
  "label": "Article & commentaires",
  "icon": "article",
  "tags": [
   "typographie",
   "commentaires",
   "sommaire"
  ],
  "description": "Lecture longue : progression, sommaire suivi, réglages taille / police, exergue, code, tableau ; fil de commentaires complet.",
  "path": "examples/app/article.html?slug=design-system-langage-commun"
 },
 {
  "id": "content-blog",
  "group": "content",
  "label": "Blog magazine",
  "icon": "auto_stories",
  "tags": [
   "à la une",
   "newsletter"
  ],
  "description": "Article à la une, catégories, grille de cartes, newsletter, les plus lus.",
  "path": "examples/app/blog.html"
 },
 {
  "id": "content-docs",
  "group": "content",
  "label": "Documentation",
  "icon": "menu_book",
  "tags": [
   "3 colonnes",
   "avis"
  ],
  "description": "Arborescence recherchable, page technique, sommaire de page, « Cette page vous a aidé ? », pages précédente / suivante.",
  "path": "examples/app/docs.html"
 },
 {
  "id": "content-feed",
  "group": "content",
  "label": "Fil d’équipe",
  "icon": "dynamic_feed",
  "tags": [
   "publications",
   "sondage",
   "commentaires"
  ],
  "description": "Tous types de médias : photos, album, vidéo, YouTube, note vocale, podcast, PDF, pièces jointes, lien, lieu, sondage ; pièces jointes depuis l’ordinateur ou le sélecteur de fichiers.",
  "path": "examples/app/feed.html"
 },
 {
  "id": "app-dashboard",
  "group": "layouts",
  "label": "Tableau de bord",
  "icon": "dashboard",
  "tags": [
   "sidenav",
   "KPI",
   "graphiques"
  ],
  "description": "Sidenav du catalogue, alerte, indicateurs animés et tendances, graphiques, classement, objectifs, table de suivi.",
  "path": "examples/app/dashboard.html"
 },
 {
  "id": "app-list",
  "group": "layouts",
  "label": "Liste de données",
  "icon": "table_rows",
  "tags": [
   "table",
   "filtres",
   "pagination"
  ],
  "description": "Onglets de statut, filtres déroulants, table avancée (colonnes, densité, sélection et actions groupées, export, ligne dépliable) ou cartes paginées.",
  "path": "examples/app/clients.html"
 },
 {
  "id": "app-detail",
  "group": "layouts",
  "label": "Fiche détail",
  "icon": "article",
  "tags": [
   "onglets",
   "KPI",
   "timeline"
  ],
  "description": "En-tête d’entité, indicateurs, onglets (aperçu, factures, historique d’audit, notes) et colonne latérale (contact copiable, informations).",
  "path": "examples/app/client.html?id=c-104"
 },
 {
  "id": "app-inbox",
  "group": "layouts",
  "label": "Maître / détail",
  "icon": "mark_email_unread",
  "tags": [
   "split",
   "messagerie"
  ],
  "description": "Dossiers, liste avec menu contextuel, lecture et réponse ; raccourcis J / K / E / S ; une seule colonne à la fois sur mobile.",
  "path": "examples/app/inbox.html"
 },
 {
  "id": "app-catalog",
  "group": "layouts",
  "label": "Catalogue en grille",
  "icon": "grid_view",
  "tags": [
   "cartes",
   "facettes"
  ],
  "description": "Facettes (catégories, prix avec histogramme, note, stock), filtres actifs en puces, grille produits notée, panier relié au tunnel de commande.",
  "path": "examples/app/catalog.html"
 },
 {
  "id": "app-kanban",
  "group": "layouts",
  "label": "Tableau kanban",
  "icon": "view_kanban",
  "tags": [
   "kanban",
   "gantt",
   "calendrier"
  ],
  "description": "Un projet en quatre vues : kanban, chronologie (Gantt), calendrier et liste par responsable.",
  "path": "examples/app/board.html"
 },
 {
  "id": "app-modules",
  "group": "layouts",
  "label": "Lanceur de modules",
  "icon": "apps",
  "tags": [
   "accueil",
   "tuiles"
  ],
  "description": "Accueil : recherche, raccourcis, chiffres du jour, tuiles de modules, récents et activité.",
  "path": "examples/app/modules.html"
 },
 {
  "id": "app-files",
  "group": "layouts",
  "label": "Gestionnaire de fichiers",
  "icon": "folder_open",
  "tags": [
   "grille / liste",
   "aperçu",
   "sélecteur en modale"
  ],
  "description": "Emplacements, jauge de stockage, navigation par dossiers, sélection multiple, glisser-déposer, menu contextuel, détails, aperçu plein écran et sélecteur de fichiers en modale.",
  "path": "examples/app/files.html"
 },
 {
  "id": "app-files-columns",
  "group": "layouts",
  "label": "Fichiers en colonnes",
  "icon": "view_week",
  "tags": [
   "Finder",
   "aperçu",
   "clavier"
  ],
  "description": "Autre disposition du gestionnaire : une colonne par niveau de dossier, panneau d’aperçu (image, vidéo, audio, PDF, texte), navigation au clavier et barre d’état.",
  "path": "examples/app/files-columns.html"
 },
 {
  "id": "app-monitoring",
  "group": "layouts",
  "label": "Supervision",
  "icon": "monitor_heart",
  "tags": [
   "temps réel",
   "incidents",
   "journaux"
  ],
  "description": "Console de monitoring : santé globale, services et disponibilité 90 jours, serveurs, métriques en direct, flotte GPS, incidents, alertes et journaux.",
  "path": "examples/app/monitoring.html"
 },
 {
  "id": "app-chat",
  "group": "layouts",
  "label": "Messagerie instantanée",
  "icon": "chat",
  "tags": [
   "plein écran",
   "temps réel",
   "pièces jointes"
  ],
  "description": "Conversations, groupes et canaux ; bulles groupées, réponses, réactions, photos, fichiers, notes vocales, accusés de lecture, « en train d’écrire » ; panneau de détails.",
  "path": "examples/app/chat.html"
 },
 {
  "id": "app-chat-panel",
  "group": "layouts",
  "label": "Messagerie en panneau latéral",
  "icon": "right_panel_open",
  "tags": [
   "sidenav droite",
   "accessible partout"
  ],
  "description": "La même messagerie dans une sidenav droite ouverte depuis la barre d’outils de n’importe quel écran : liste, conversation, passage en plein écran.",
  "path": "examples/app/dashboard.html?chat=c-aya"
 },
 {
  "id": "app-file-picker",
  "group": "layouts",
  "label": "Sélecteur de fichiers (modale)",
  "icon": "file_open",
  "tags": [
   "modale",
   "sélection multiple",
   "import"
  ],
  "description": "Emplacements, grille ou liste, cases à cocher, Maj + clic, filtre de types, import depuis l’ordinateur et récapitulatif de la sélection.",
  "path": "examples/app/files.html?picker=1"
 },
 {
  "id": "app-settings",
  "group": "layouts",
  "label": "Paramètres",
  "icon": "settings",
  "tags": [
   "sous-navigation",
   "formulaires"
  ],
  "description": "Sous-navigation, réglages « libellé / contrôle », mot de passe, clés d’API, thème réel, zone sensible confirmée.",
  "path": "examples/app/settings.html"
 }
];
