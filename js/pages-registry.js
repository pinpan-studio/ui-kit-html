/* Registre des pages statiques du kit (galerie « Pages » et accueil UI Showcase). Chemins relatifs à la racine. */
window.PAGE_REGISTRY = [
  { id: 'app', label: 'Application', icon: 'space_dashboard', description: 'Écrans d’exemple dans le shell applicatif (navigation, ⌘K, notifications, messagerie).', pages: [
    { label: 'Tableau de bord', path: 'examples/app/dashboard.html', kind: 'dashboard', description: 'KPI, graphiques, activité et tâches.' },
    { label: 'Supervision', path: 'examples/app/monitoring.html', kind: 'dashboard', description: 'Console temps réel : services, serveurs, flotte, capteurs, journaux.' },
    { label: 'Modules', path: 'examples/app/modules.html', kind: 'other', description: 'Lanceur de modules de l’espace de travail.' },
    { label: 'Clients', path: 'examples/app/clients.html', kind: 'list', description: 'Liste triable, filtres, actions groupées.' },
    { label: 'Fiche client', path: 'examples/app/client.html', kind: 'detail', description: 'Onglets, factures, historique, contacts.' },
    { label: 'Catalogue', path: 'examples/app/catalog.html', kind: 'list', description: 'Produits en grille et panier.' },
    { label: 'Planning projet', path: 'examples/app/board.html', kind: 'kanban', description: 'Kanban, Gantt, calendrier, liste.' },
    { label: 'Messagerie', path: 'examples/app/inbox.html', kind: 'other', description: 'Boîte de réception trois volets.' },
    { label: 'Messagerie instantanée', path: 'examples/app/chat.html', kind: 'other', description: 'Conversations, pièces jointes, réactions.' },
    { label: 'Fil d’équipe', path: 'examples/app/feed.html', kind: 'other', description: 'Publications, médias, commentaires.' },
    { label: 'Blog', path: 'examples/app/blog.html', kind: 'list', description: 'Liste d’articles.' },
    { label: 'Article', path: 'examples/app/article.html', kind: 'detail', description: 'Lecture longue avec sommaire.' },
    { label: 'Documentation', path: 'examples/app/docs.html', kind: 'detail', description: 'Documentation à trois colonnes.' },
    { label: 'Fichiers', path: 'examples/app/files.html', kind: 'list', description: 'Gestionnaire de fichiers (grille / liste).' },
    { label: 'Fichiers — colonnes', path: 'examples/app/files-columns.html', kind: 'list', description: 'Navigation en colonnes (Finder).' },
    { label: 'Paramètres', path: 'examples/app/settings.html', kind: 'settings', description: 'Profil, sécurité, API, notifications, apparence.' }] },
  { id: 'forms', label: 'Formulaires', icon: 'edit_note', description: 'Formulaires complets mono et multi-étapes.', pages: [
    { label: 'Contact', path: 'examples/forms/contact.html', kind: 'form' }, { label: 'Commande', path: 'examples/forms/checkout.html', kind: 'form' },
    { label: 'Bienvenue (onboarding)', path: 'examples/forms/onboarding.html', kind: 'wizard' }, { label: 'Questionnaire', path: 'examples/forms/survey.html', kind: 'wizard' },
    { label: 'Réservation', path: 'examples/forms/booking.html', kind: 'calendar' }, { label: 'Candidature', path: 'examples/forms/application.html', kind: 'form' }] },
  { id: 'auth', label: 'Authentification', icon: 'lock', description: 'Une page, onze variantes (paramètre ?v=).', pages: [
    { label: 'Connexion centrée', path: 'examples/auth.html?v=centered', kind: 'auth', variants: [
      { label: 'Minimal', path: 'examples/auth.html?v=minimal' }, { label: 'Image', path: 'examples/auth.html?v=image' }, { label: 'Split gauche', path: 'examples/auth.html?v=split-left' }, { label: 'Split droite', path: 'examples/auth.html?v=split-right' },
      { label: 'Réseaux sociaux', path: 'examples/auth.html?v=social' }, { label: 'Comptes', path: 'examples/auth.html?v=accounts' }] },
    { label: 'Inscription', path: 'examples/auth.html?v=register', kind: 'auth' }, { label: 'Mot de passe oublié', path: 'examples/auth.html?v=forgot', kind: 'auth' },
    { label: 'Code OTP', path: 'examples/auth.html?v=otp', kind: 'auth' }, { label: 'Écran verrouillé', path: 'examples/auth.html?v=lock', kind: 'auth' }] },
  { id: 'shells', label: 'Shells & modules', icon: 'dashboard_customize', description: 'Gabarits autonomes.', pages: [
    { label: 'Shell applicatif (/main)', path: 'app/main.html', kind: 'other', description: 'Rail, barre d’outils, tiroir compte et notifications.' },
    { label: 'Harnais', path: 'harnais/index.html', kind: 'other', description: 'Interface conversationnelle façon assistant IA.', variants: [
      { label: 'Démo widgets', path: 'harnais/index.html?c=c-demo' }, { label: 'Boîte à outils', path: 'harnais/index.html?c=c-outils' }, { label: 'Champs & médias', path: 'harnais/index.html?c=c-kit' }, { label: 'Sidecar', path: 'harnais/index.html?c=c-sidecar' }] },
    { label: 'Showcases', path: 'showcases.html', kind: 'other', description: 'Aperçus dans des cadres d’appareils.' }] }
];
