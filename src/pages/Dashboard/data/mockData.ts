import {
  FileText,
  Calendar,
  Scale,
  Sparkles,
  CheckCircle2,
  Star,
  Search,
  Bug,
  Flame,
  Zap,
  BarChart3,
  AlertTriangle,
  ShoppingBag,
  Store,
  Key,
  HardHat,
  Building2,
  Camera,
  Aperture,
  Cuboid,
  Video,
  MonitorPlay,
  Image,
} from "lucide-react";

export const mockNeeds = [
  {
    id: 1,
    type: "Appartement T3",
    location: "Paris 15ème",
    budget: "450k€ - 500k€",
    status: "Nouveau",
    match: 95,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: 2,
    type: "Maison de ville",
    location: "Boulogne-Billancourt",
    budget: "850k€ - 950k€",
    price: "920 000 €",
    surface: "110 m²",
    rooms: "5 pièces",
    status: "Offre en cours",
    match: 88,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: 3,
    type: "Appartement T2",
    location: "Levallois-Perret",
    budget: "350k€ - 400k€",
    price: "395 000 €",
    surface: "45 m²",
    rooms: "2 pièces",
    status: "En attente",
    match: 82,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
];

export const mockVendors = [
  {
    id: 1,
    name: "Sophie Martin",
    property: "Appartement 65m² paris 15",
    status: "Visite programmée",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 2,
    name: "Marc Dubois",
    property: "Maison 110m² Boulogne",
    status: "Offre reçue",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    id: 3,
    name: "SCI Les Oliviers",
    property: "T2 Levallois",
    status: "En discussion",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

export const mockPromoters = [
  {
    id: 1,
    name: "Nexity",
    project: "Résidence Ciel",
    location: "Asnières-sur-Seine",
    units: "12 lots disp.",
    delivery: "4T 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: 2,
    name: "Kaufman & Broad",
    project: "Les Jardins de la Seine",
    location: "Puteaux",
    units: "8 lots disp.",
    delivery: "1T 2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
];

export const mockVisits = [
  { id: 1, date: "12 Oct", time: "14:30", property: "Appartement Paris 15", expert: "Jean Dupont (Agent)", status: "confirmed" },
  { id: 2, date: "14 Oct", time: "10:00", property: "Maison Boulogne", expert: "Marie Curie (Chasseur)", status: "pending" },
  { id: 3, date: "18 Oct", time: "11:00", property: "Chantier Résidence Ciel", expert: "Paul Nexity (Promoteur)", status: "confirmed" },
];

export const mockExperts = [
  {
    id: 1,
    name: "Maître Renaud",
    role: "Notaire",
    contact: "01 23 45 67 89",
    email: "etude.renaud@notaires.fr",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Cabinet Fisc",
    role: "Fiscaliste",
    contact: "01 98 76 54 32",
    email: "contact@fisc.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 3,
    name: "Mme Architecte",
    role: "Architecte",
    contact: "06 12 34 56 78",
    email: "archi@design.com",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 4,
    name: "Banque Privee",
    role: "Courtier",
    contact: "01 55 55 55 55",
    email: "pret@banque.com",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
    rating: 4.5,
    reviews: 120,
  },
];

export const mockPostPurchase = [
  { id: 1, title: "Déménagement", description: "Réserver votre déménageur", date: "Avant le 15 Nov", completed: false },
  { id: 2, title: "Assurance Habitation", description: "Souscrire avant la remise des clés", date: "Urgent", completed: false },
  { id: 3, title: "Énergie & Internet", description: "Ouvrir les compteurs", date: "Fait", completed: true },
  { id: 4, title: "Travaux", description: "Valider les devis peinture", date: "En cours", completed: false },
];

export const mockPatrimony = [
  {
    id: 1,
    type: "Résidence Principale",
    name: "Appartement Paris 15",
    value: 485000,
    growth: "+2.5%",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: 2,
    type: "Investissement Locatif",
    name: "Studio Lyon",
    value: 150000,
    growth: "+4.1%",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: 3,
    type: "SCPI",
    name: "Pierre Rendement",
    value: 50000,
    growth: "+5.2%",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
  },
];

export const mockMessages = [
  {
    id: 1,
    from: "Sophie Durand",
    role: "expert",
    message: "J'ai trouvé 3 biens qui correspondent parfaitement à vos critères.",
    time: "Il y a 2h",
  },
  {
    id: 2,
    from: "Marc Leblanc",
    role: "expert",
    message: "La visite de demain est confirmée. Rendez-vous à 14h.",
    time: "Il y a 5h",
  },
  {
    id: 3,
    from: "Système",
    role: "notification",
    message: "Nouveau bien ajouté à votre sélection",
    time: "Il y a 1j",
  },
];

// Seller mock data
export const sellerListings = [
  {
    id: 1,
    title: "Appartement Charmant Paris 15",
    location: "Paris 15ème",
    price: "550 000 €",
    surface: "85m²",
    rooms: "4 pièces",
    views: 124,
    contacts: 5,
    status: "En ligne",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
  },
];

export const sellerBuyerPool = [
  {
    id: 1,
    name: "Famille Martin",
    details: "Couple avec 1 enfant, recherche T4",
    budget: "560 000 €",
    match: 98,
    solvency: "Vérifiée",
    image: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=200&q=80",
  },
  {
    id: 2,
    name: "Lucas D.",
    details: "Primo-accédant, recherche T4",
    budget: "540 000 €",
    match: 92,
    solvency: "En cours",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: 3,
    name: "Sophie & Marc",
    details: "Investisseurs",
    budget: "530 000 €",
    match: 85,
    solvency: "Vérifiée",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
];

export const sellerTips = [
  {
    title: "Diagnostiques obligatoires",
    description: "DPE, Amiante, Plomb... Vérifiez la validité de vos documents.",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Préparer les visites",
    description: "Dépersonnalisez, rangez et aérez pour séduire au premier coup d'œil.",
    icon: Sparkles,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Offre d'achat",
    description: "Comment analyser une offre et vérifier la solidité du financement.",
    icon: Scale,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export const expertClients = [
  {
    id: 1,
    name: "Jean Dupont",
    budget: "350 000 €",
    location: "Paris 15ème",
    status: "active",
    solvabilityScore: 8.5,
    lastContact: "Aujourd'hui",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    id: 2,
    name: "Marie Martin",
    budget: "420 000 €",
    location: "Boulogne-Billancourt",
    status: "pending",
    solvabilityScore: 9.2,
    lastContact: "Hier",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 3,
    name: "Pierre Dubois",
    budget: "280 000 €",
    location: "Issy-les-Moulineaux",
    status: "active",
    solvabilityScore: 7.8,
    lastContact: "Il y a 3j",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

export const expertMissions = [
  {
    id: 1,
    client: "Jean Dupont",
    type: "Recherche appartement",
    progress: 75,
    status: "in_progress",
    deadline: "30 Déc 2025",
    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    id: 2,
    client: "Marie Martin",
    type: "Négociation",
    progress: 40,
    status: "in_progress",
    deadline: "15 Jan 2026",
    clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 3,
    client: "Pierre Dubois",
    type: "Visite programmée",
    progress: 20,
    status: "pending",
    deadline: "10 Jan 2026",
    clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

export const expertSchedule = [
  {
    id: 1,
    time: "09:00",
    client: "Jean Dupont",
    type: "Visite",
    property: "Appartement Paris 15ème",
    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    id: 2,
    time: "11:30",
    client: "Marie Martin",
    type: "Appel",
    property: "Point avancement",
    clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 3,
    time: "14:00",
    client: "Pierre Dubois",
    type: "Signature",
    property: "Compromis de vente",
    clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

export const notaryMissions = [
  {
    id: "missing-docs",
    title: "Documents Manquants",
    description: "Remise de documents obligatoires (juridiques/administratifs)",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    count: 3,
    action: "Voir les dossiers",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80",
  },
  {
    id: "compromis",
    title: "Compromis à rédiger",
    description: "Préparation des avants-contrats pour signature",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    count: 2,
    action: "Rédiger",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    id: "signature",
    title: "Signatures à venir",
    description: "Actes authentiques programmés cette semaine",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    count: 4,
    action: "Consulter l'agenda",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
  },
];

// Bailleur mock data
export const bailleurListings = [
  {
    id: 1,
    title: "Appartement T3 Paris 15",
    location: "Paris 15ème",
    price: "1 850 €/mois",
    surface: "65m²",
    rooms: "3 pièces",
    views: 250,
    contacts: 12,
    status: "En ligne",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  },
  {
    id: 2,
    title: "Studio Meublé Lyon 6",
    location: "Lyon 6ème",
    price: "850 €/mois",
    surface: "28m²",
    rooms: "1 pièce",
    views: 45,
    contacts: 3,
    status: "Brouillon",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
  },
];

export const mockTenantPool = [
  {
    id: 1,
    name: "Thomas B.",
    details: "CDI, Confirmé, Revenus 3x loyer",
    budget: "1 900 €/mois",
    match: 95,
    solvency: "Vérifiée",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
  {
    id: 2,
    name: "Léa & Paul",
    details: "Couple jeunes actifs, Garants solides",
    budget: "1 800 €/mois",
    match: 88,
    solvency: "Vérifiée",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80",
  },
];

export const mockPostRental = [
  { id: 1, title: "État des lieux", description: "Réaliser l'état des lieux d'entrée", date: "À faire", completed: false },
  { id: 2, title: "Contrat de bail", description: "Signer le bail électronique", date: "En attente", completed: false },
  { id: 3, title: "Assurance Loyer Impayé", description: "Souscrire à la GLI", date: "Recommandé", completed: false },
  { id: 4, title: "Diagnostics", description: "Vérifier validité des diagnostics", date: "Fait", completed: true },
];

// Locataire mock data
export const mockLandlordPool = [
  {
    id: 1,
    name: "M. Richard",
    details: "Propriétaire T3 Paris 15",
    budget: "1 850 €/mois",
    match: 95,
    status: "Dossier reçu",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: 2,
    name: "Agence Immo",
    details: "Gestionnaire T3 Boulogne",
    budget: "1 900 €/mois",
    match: 88,
    status: "Visite programmée",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&q=80",
  },
];

export const mockPostMoveIn = [
  { id: 1, title: "État des lieux complet", description: "Vérifiez chaque détail à l'entrée", date: "Urgent", completed: false },
  { id: 2, title: "Assurance Habitation", description: "Obligatoire dès la remise des clés", date: "Fait", completed: true },
  { id: 3, title: "CAF / APL", description: "Faire la demande d'aide au logement", date: "À faire", completed: false },
  { id: 4, title: "Compteurs", description: "Relever les compteurs d'eau et d'électricité", date: "À faire", completed: false },
];

// Renovateur mock data
export const mockArtisanPool = [
  {
    id: 1,
    name: "Elec & Co",
    details: "Électricien - Mise aux normes",
    location: "Paris 15",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=200&q=80",
  },
  {
    id: 2,
    name: "Peinture Pro",
    details: "Peintre - Finitions soignées",
    location: "Paris 14",
    rating: 4.6,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&q=80",
  },
];

export const mockQuotes = [
  {
    id: 1,
    artisan: "Elec & Co",
    title: "Rénovation électrique complète",
    amount: "4 500 €",
    status: "Reçu",
    date: "12 Oct 2024",
  },
  {
    id: 2,
    artisan: "Peinture Pro",
    title: "Peinture Salon +Chambre",
    amount: "2 200 €",
    status: "En attente",
    date: "-",
  },
];

export const mockPostRenovation = [
  { id: 1, title: "Nettoyage fin de chantier", description: "Organiser le ménage complet", date: "À faire", completed: false },
  { id: 2, title: "Levée de réserves", description: "Valider les finitions avec les artisans", date: "Important", completed: false },
  { id: 3, title: "Assurance Dommage-Ouvrage", description: "Vérifier les garanties", date: "Fait", completed: true },
  { id: 4, title: "DPE après travaux", description: "Actualiser la performance énergétique", date: "Recommandé", completed: false },
];

// Notaire Mock Data Extended

export const mockNotaryMissionsOverview = [
  {
    id: 1,
    title: "Documents Manquants",
    description: "Remise de documents obligatoires",
    icon: FileText,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    id: 2,
    title: "Promesse d'Achat",
    description: "Création de la promesse pour l'acheteur",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 3,
    title: "Compromis de Vente",
    description: "Création du compromis pour le vendeur",
    icon: FileText,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    id: 4,
    title: "Vérif. Dossier Acheteur",
    description: "Suivi conformité jusqu'à Acte",
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: 5,
    title: "Vérif. Dossier Vendeur",
    description: "Suivi conformité jusqu'à Acte",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: 6,
    title: "Accompagnement Complet",
    description: "Suivi total du besoin utilisateur",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

export const mockNotaryMissionsExtended = [
  {
    id: 1,
    client: "Jean Dupont",
    type: "Promesse d'Achat",
    status: "available",
    date: "Aujourd'hui",
    location: "Paris 15",
    description: "Besoin d'une promesse pour un T3",
    price: "150 €",
  },
  {
    id: 2,
    client: "Marie Martin",
    type: "Compromis de Vente",
    status: "in_progress",
    date: "Hier",
    location: "Lyon 6",
    description: "Rédaction en cours, attente docs",
    progress: 45,
  },
  {
    id: 3,
    client: "Pierre Durand",
    type: "Vérif. Dossier",
    status: "finished",
    date: "12 Oct 2024",
    location: "Bordeaux",
    rating: 5,
    feedback: "Très efficace, merci !",
  },
  {
    id: 4,
    client: "Sophie Lefebvre",
    type: "Accompagnement",
    status: "refused",
    date: "10 Oct 2024",
    reason: "Planning complet",
  },
  {
    id: 5,
    client: "Julie R.",
    type: "Documents Manquants",
    status: "available",
    date: "Aujourd'hui",
    location: "Paris 12",
    description: "Remise documents pour mise en relation",
    price: "80 €",
  },
  {
    id: 6,
    client: "Paul V.",
    type: "Vérif. Dossier Vendeur",
    status: "in_progress",
    date: "14 Oct 2024",
    location: "Lyon 2",
    description: "Vérification conformité dossier vente",
    progress: 20,
  },
  {
    id: 7,
    client: "Alice M.",
    type: "Accompagnement Complet",
    status: "available",
    date: "Hier",
    location: "Lille",
    description: "Recherche + Achat T2",
    price: "Sur devis",
  },
];

export const mockNotaryPayments = [
  { id: 1, date: "15 Oct 2024", client: "Jean Dupont", description: "Promesse d'Achat", amount: "150,00 €", status: "Paid" },
  { id: 2, date: "14 Oct 2024", client: "Marie Martin", description: "Acompte Compromis", amount: "300,00 €", status: "Pending" },
  { id: 3, date: "10 Oct 2024", client: "Pierre Durand", description: "Solde Dossier", amount: "450,00 €", status: "Paid" },
];

export const mockNotaryDocuments = [
  { id: 1, name: "Attestation RC Pro", status: "Validé", date: "01 Jan 2024" },
  { id: 2, name: "Kbis à jour", status: "À renouveler", date: "15 Nov 2024" },
  { id: 3, name: "Carte Pro", status: "Validé", date: "2023-2026" },
];

export const mockNotaryQuotes = [
  { id: 1, client: "Lucas M.", type: "Promesse d'Achat", date: "15 Oct 2024", status: "Envoyé", amount: "150 €" },
  { id: 2, client: "Claire B.", type: "Accompagnement", date: "12 Oct 2024", status: "Signé", amount: "1 200 €" },
];

// Diagnostician Mock Data

export const mockDiagnosticianOverview = [
  {
    id: 1,
    title: "Diagnostic Amiante",
    description: "Recherche matériaux amiante",
    validity: "Illimitée si négatif, 3 ans si positif",
    mandatory: "Avant 1er juillet 1997",
    icon: Search,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    id: 2,
    title: "Diagnostic Plomb (CREP)",
    description: "Risque Exposition Plomb",
    validity: "1 an vente, 6 ans location",
    mandatory: "Avant 1er janvier 1949",
    icon: Search, // Using Search as generic, import specific later
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: 3,
    title: "Diagnostic Termites",
    description: "Détection parasites bois",
    validity: "6 mois",
    mandatory: "Zones à risque",
    icon: Bug,
    color: "text-amber-700",
    bg: "bg-amber-700/10",
  },
  {
    id: 4,
    title: "Diagnostic Gaz",
    description: "Installation intérieure gaz",
    validity: "3 ans",
    mandatory: "Installations > 15 ans",
    icon: Flame,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    id: 5,
    title: "Diagnostic Électricité",
    description: "Installation intérieure élec",
    validity: "3 ans",
    mandatory: "Installations > 15 ans",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    id: 6,
    title: "Diagnostic DPE",
    description: "Performance Énergétique",
    validity: "10 ans",
    mandatory: "Toute vente/location",
    icon: BarChart3,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: 7,
    title: "État Risques (ERP)",
    description: "Risques naturels/pollutions",
    validity: "6 mois",
    mandatory: "Zones à risques",
    icon: AlertTriangle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export const mockDiagnosticianMissions = [
  {
    id: 1,
    client: "Agence Immobilière Sud",
    type: "Pack Vente Maison",
    status: "available",
    date: "Pour le 20 Oct",
    location: "Marseille 8",
    description: "DPE, Amiante, Elec, ERP",
    price: "450 €",
  },
  {
    id: 2,
    client: "M. Martin",
    type: "DPE Seul",
    status: "in_progress",
    date: "Rdv demain 10h",
    location: "Aubagne",
    description: "Appartement T2",
    progress: 10,
  },
];

export const mockDiagnosticianQuotes = [
  { id: 1, client: "Agence Sud", type: "Pack Complet", date: "15 Oct 2024", status: "Envoyé", amount: "450 €" },
];

export const mockDiagnosticianDocuments = [
  { id: 1, name: "Certification DPE", status: "Validé", date: "2024-2029" },
  { id: 2, name: "Certification Amiante", status: "Validé", date: "2024-2029" },
  { id: 3, name: "Assurance RC Pro", status: "À renouveler", date: "01 Jan 2025" },
];

export const mockDiagnosticianPayments = [
  { id: 1, date: "10 Oct 2024", client: "Mme Dubois", description: "DPE + Elec", amount: "250,00 €", status: "Paid" },
];

// Marchand de Biens Mock Data

export const mockMarchandOverview = [
  {
    id: 1,
    title: "Accompagnement Achat",
    description: "Accompagnement total du besoin utilisateur (achat) jusqu'à obtention",
    icon: ShoppingBag, // Import ShoppingBag
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Accompagnement Vente",
    description: "Accompagnement total du besoin utilisateur (vente) jusqu'à obtention",
    icon: Store, // Import Store
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: 3,
    title: "Mise en location / Gestion",
    description: "Accompagnement total du besoin utilisateur (mise en location/gestion) jusqu'à obtention",
    icon: Key, // Import Key
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 4,
    title: "Recherche locative",
    description: "Accompagnement total du besoin utilisateur (recherche locative) jusqu'à obtention",
    icon: Search,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export const mockMarchandMissions = [
  {
    id: 1,
    client: "Investisseur Paris",
    type: "Accompagnement Achat",
    status: "available",
    date: "Urgent",
    location: "Paris 11",
    description: "Recherche immeuble de rapport",
    price: "Commission 5%",
  },
  {
    id: 2,
    client: "SCI Familiale",
    type: "Mise en location",
    status: "in_progress",
    date: "Hier",
    location: "Lyon 3",
    description: "Gestion de 3 lots",
    progress: 60,
  },
];

export const mockMarchandQuotes = [
  { id: 1, client: "Investisseur Paris", type: "Mandat de recherche", date: "16 Oct 2024", status: "Envoyé", amount: "15 000 €" },
];

export const mockMarchandDocuments = [
  { id: 1, name: "Carte Transaction", status: "Validé", date: "2024-2027" },
  { id: 2, name: "Assurance RC Pro", status: "Validé", date: "2024" },
  { id: 3, name: "Garantie Financière", status: "Validé", date: "2024" },
];

export const mockMarchandPayments = [
  { id: 1, date: "05 Oct 2024", client: "SCI Familiale", description: "Honoraires Achat", amount: "8 500,00 €", status: "Paid" },
];

// Maitre d'Oeuvre Mock Data

export const mockContractorOverview = [
  {
    id: 1,
    title: "Suivi de Chantiers",
    description: "Coordonnez vos projets de rénovation et tenez vos clients informés en temps réel",
    icon: HardHat,
    color: "text-orange-600",
    bg: "bg-orange-600/10",
  },
];

export const mockContractorMissions = [
  {
    id: 1,
    client: "Rénovation Totale",
    type: "Suivi de Chantiers",
    status: "in_progress",
    date: "Livraison 30 Nov",
    location: "Paris 16",
    description: "Appartement 120m2",
    progress: 75,
  },
  {
    id: 2,
    client: "Extension Maison",
    type: "Suivi de Chantiers",
    status: "available",
    date: "Mars 2025",
    location: "Bordeaux",
    description: "Surélévation 40m2",
    price: "Honoraires 8%",
  },
];

export const mockContractorQuotes = [
  { id: 1, client: "Rénovation Totale", type: "Maitrise d'oeuvre", date: "01 Sep 2024", status: "Signé", amount: "12 000 €" },
];

export const mockContractorDocuments = [
  { id: 1, name: "Assurance Décennale", status: "Validé", date: "2024" },
  { id: 2, name: "RC Pro", status: "Validé", date: "2024" },
];

export const mockContractorPayments = [
  { id: 1, date: "10 Oct 2024", client: "Rénovation Totale", description: "Situation n°2", amount: "4 000,00 €", status: "Paid" },
];

// Promoteur Mock Data

export const mockPromoterOverview = [
  {
    id: 1,
    title: "Accompagnement Achat Neuf",
    description: "Accompagnement total du besoin utilisateur (achat d'un bien neuf) jusqu'à obtention",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
  },
];

export const mockPromoterMissions = [
  {
    id: 1,
    client: "Acquéreur Lot A12",
    type: "Achat Neuf",
    status: "in_progress",
    date: "Signé le 15 Sep",
    location: "Résidence Ciel",
    description: "Suivi financement",
    progress: 40,
  },
];

export const mockPromoterPrograms = [
  {
    id: 1,
    title: "Résidence L'Envolée",
    location: "Marseille 8ème",
    description: "Programme de 45 logements de standing avec terrasses et vues dégagées.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
    keyPoints: ["Vue Mer", "Parking Souterrain", "RT 2020"],
    status: "Commercialisation",
    lotsAvailable: 12,
  },
  {
    id: 2,
    title: "Les Jardins de Provence",
    location: "Aix-en-Provence",
    description: "Villas jumelées au coeur d'un parc arboré.",
    image: "https://images.unsplash.com/photo-1600596542815-50e840bd00cf?w=800&auto=format&fit=crop&q=60",
    keyPoints: ["Jardin Privatif", "Piscine", "Calme"],
    status: "Travaux en cours",
    lotsAvailable: 5,
  },
];

export const mockPromoterDocuments = [
  { id: 1, name: "Garantie Financière Achèvement", status: "Validé", date: "2024-2026" },
  { id: 2, name: "Décennale Constructeur", status: "Validé", date: "2024" },
];

export const mockPromoterPayments = [
  { id: 1, date: "02 Oct 2024", client: "Résidence L'Envolée", description: "Appel de fonds n°3", amount: "150 000 €", status: "Paid" },
];

// Photographe Mock Data

export const mockPhotographerOverview = [
  {
    id: 1,
    title: "Photos pour Acheteur",
    description: "Prise de photos de bien immobilier pour utilisateurs souhaitant acheter",
    icon: Camera, // Import Camera
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Photos pour Vendeur",
    description: "Prise de photos de bien immobilier pour utilisateurs souhaitant vendre",
    icon: Aperture, // Import Aperture
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: 3,
    title: "Photos pour Location",
    description: "Prise de photos de bien immobilier pour utilisateurs souhaitant louer",
    icon: Image, // Import Image
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 4,
    title: "Visite Virtuelle Acheteur",
    description: "Visite virtuelle de bien immobilier pour utilisateurs souhaitant acheter",
    icon: Video, // Import Video
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: 5,
    title: "Visite Virtuelle Vendeur",
    description: "Visite virtuelle de bien immobilier pour utilisateurs souhaitant vendre",
    icon: Cuboid, // Import Cuboid (for 3D/Volume)
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    id: 6,
    title: "Visite Virtuelle Location",
    description: "Visite virtuelle de bien immobilier pour utilisateurs souhaitant louer",
    icon: MonitorPlay, // Import MonitorPlay
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

export const mockPhotographerMissions = [
  {
    id: 1,
    client: "Agence Immo Plus",
    type: "Photos Vente T4",
    status: "available",
    date: "Pour Lundi",
    location: "Lyon 6",
    description: "Pack 15 photos HDR",
    price: "150 €",
  },
  {
    id: 2,
    client: "M. Durant",
    type: "Visite Virtuelle",
    status: "in_progress",
    date: "RDV ce matin",
    location: "Villeurbanne",
    description: "Maison 140m2",
    progress: 80,
  },
];

export const mockPhotographerQuotes = [
  { id: 1, client: "Agence Immo Plus", type: "Forfait Mensuel", date: "01 Sep 2024", status: "Signé", amount: "1 500 €" },
];

export const mockPhotographerDocuments = [
  { id: 1, name: "RC Pro Photographe", status: "Validé", date: "2024" },
  { id: 2, name: "Licence Drone", status: "Validé", date: "2024-2026" },
];

export const mockPhotographerPayments = [
  { id: 1, date: "12 Oct 2024", client: "M. Durant", description: "Acompte Visite Virtuelle", amount: "150,00 €", status: "Paid" },
];
// Broker (Courtier) Mock Data

export const mockBrokerOverview = [
  {
    id: 1,
    title: "Bilan / Audit bancaire",
    description: "Analyse solvabilité & solutions",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Suivi financement bancaire",
    description: "Recherche offres & négociation",
    icon: FileText,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export const mockBrokerMissions = [
  {
    id: 1,
    client: "Jean Dupont",
    type: "Suivi financement",
    status: "in_progress",
    date: "15 Oct 2024",
    location: "Paris 15",
    description: "Financement résidence principale",
    progress: 60,
  },
  {
    id: 2,
    client: "Marie Curie",
    type: "Bilan / Audit",
    status: "available",
    date: "Aujourd'hui",
    location: "Boulogne",
    description: "Analyse capacité d'emprunt",
    price: "150 €",
  },
  {
    id: 3,
    client: "Pierre Martin",
    type: "Suivi financement",
    status: "pending",
    date: "Hier",
    location: "Lyon",
    description: "Négociation taux",
    progress: 30,
  },
];

export const mockBrokerQuotes = [
  {
    id: 1,
    client: "Jean Dupont",
    type: "Honoraires Courtage",
    date: "10 Oct 2024",
    status: "Signé",
    amount: "1 500 €",
  },
  {
    id: 2,
    client: "Marie Curie",
    type: "Audit Bancaire",
    date: "16 Oct 2024",
    status: "Envoyé",
    amount: "150 €",
  },
];

export const mockBrokerDocuments = [
  { id: 1, name: "Attestation MCOB", status: "Validé", date: "2024-2025" },
  { id: 2, name: "RC Pro Courtage", status: "À renouveler", date: "01 Jan 2025" },
  { id: 3, name: "Partenariats Banques", status: "Validé", date: "En cours" },
];

export const mockBrokerPayments = [
  { id: 1, date: "05 Oct 2024", client: "Paul V.", description: "Acompte Courtage", amount: "500,00 €", status: "Paid" },
  { id: 2, date: "12 Oct 2024", client: "Sophie L.", description: "Audit Financier", amount: "150,00 €", status: "Pending" },
];
