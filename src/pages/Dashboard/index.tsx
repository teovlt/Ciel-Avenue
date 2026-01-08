"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import { clientSubtypeLabelKeys, expertSubtypeLabelKeys, type ClientSubtype, type ExpertSubtype } from "@/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MessageSquare,
  Users,
  Calendar,
  MapPin,
  Euro,
  Bed,
  Square,
  Send,
  Search,
  UserCircle,
  Lock,
  Briefcase,
  TrendingUp,
  Clock,
  Phone,
  ArrowRight,
  Plus,
  ChevronDown,
  Check,
  FileText,
  FileCheck,
  Handshake,
  ShieldCheck,
  FileSearch,
  Sparkles,
  Scale,
  PenTool,
  CheckCircle2,
  PiggyBank,
  LineChart,
  ArrowUpRight,
  Target,
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

// Role Switcher Component
function RoleSwitcher({ t }: { t: (key: string) => string }) {
  const { user, activeRole, setActiveRoleIndex, hasMultipleRoles } = useAuth();
  const navigate = useNavigate();

  if (!user || !activeRole) return null;

  const getActiveRoleLabel = () => {
    if (activeRole.type === "client") {
      return t(clientSubtypeLabelKeys[activeRole.subtype as ClientSubtype]);
    }
    return t(expertSubtypeLabelKeys[activeRole.subtype as ExpertSubtype]);
  };

  const canAddRole = () => {
    // Users can always add more roles (multiple subtypes allowed)
    return true;
  };

  const handleAddRole = () => {
    // Navigate to journey with state indicating we're adding a role
    navigate("/journey", { state: { addingRole: true } });
  };

  if (!hasMultipleRoles && !canAddRole()) {
    return (
      <Badge className={activeRole.type === "expert" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}>
        {getActiveRoleLabel()}
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            {activeRole.type === "expert" ? <Briefcase className="h-4 w-4" /> : <Users className="h-4 w-4" />}
            {getActiveRoleLabel()}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {user.roles.map((role, index) => {
            const label =
              role.type === "client"
                ? t(clientSubtypeLabelKeys[role.subtype as ClientSubtype])
                : t(expertSubtypeLabelKeys[role.subtype as ExpertSubtype]);
            const isActive = index === user.activeRoleIndex;

            return (
              <DropdownMenuItem key={index} onClick={() => setActiveRoleIndex(index)} className="flex items-center gap-2 cursor-pointer">
                {role.type === "expert" ? <Briefcase className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                <span className="flex-1">{label}</span>
                {isActive && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}

          {canAddRole() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleAddRole} className="cursor-pointer text-primary">
                <Plus className="h-4 w-4 mr-2" />
                {t("dashboard.roleSwitcher.addRole")}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, isExpert, user, isLoading, activeRole } = useAuth();
  const [messageInput, setMessageInput] = useState("");

  // Client mock data
  const mockNeeds = [
    {
      id: 1,
      type: "Appartement T3",
      location: "Paris 15ème",
      budget: "450k€ - 500k€",
      price: "485 000 €",
      surface: "65 m²",
      rooms: "3 pièces",
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

  const mockVendors = [
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

  const mockPromoters = [
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

  const mockVisits = [
    { id: 1, date: "12 Oct", time: "14:30", property: "Appartement Paris 15", expert: "Jean Dupont (Agent)", status: "confirmed" },
    { id: 2, date: "14 Oct", time: "10:00", property: "Maison Boulogne", expert: "Marie Curie (Chasseur)", status: "pending" },
    { id: 3, date: "18 Oct", time: "11:00", property: "Chantier Résidence Ciel", expert: "Paul Nexity (Promoteur)", status: "confirmed" },
  ];

  const mockExperts = [
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

  const mockPostPurchase = [
    { id: 1, title: "Déménagement", description: "Réserver votre déménageur", date: "Avant le 15 Nov", completed: false },
    { id: 2, title: "Assurance Habitation", description: "Souscrire avant la remise des clés", date: "Urgent", completed: false },
    { id: 3, title: "Énergie & Internet", description: "Ouvrir les compteurs", date: "Fait", completed: true },
    { id: 4, title: "Travaux", description: "Valider les devis peinture", date: "En cours", completed: false },
  ];

  const mockPatrimony = [
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
      name: "Pierre Papier",
      value: 50000,
      growth: "+5.0%",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    },
  ];

  const mockMessages = [
    {
      id: 1,
      from: "Sophie Durand",
      role: t("dashboard.messages.roles.expert"),
      message: "J'ai trouvé 3 biens qui correspondent parfaitement à vos critères.",
      time: "Il y a 2h",
    },
    {
      id: 2,
      from: "Marc Leblanc",
      role: t("dashboard.messages.roles.expert"),
      message: "La visite de demain est confirmée. Rendez-vous à 14h.",
      time: "Il y a 5h",
    },
    {
      id: 3,
      from: t("dashboard.messages.roles.system"),
      role: t("dashboard.messages.roles.notification"),
      message: "Nouveau bien ajouté à votre sélection",
      time: "Il y a 1j",
    },
  ];

  // Seller mock data
  const sellerListings = [
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

  const sellerBuyerPool = [
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

  const sellerTips = [
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
  const expertClients = [
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

  const expertMissions = [
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

  const expertSchedule = [
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
      property: null,
      clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    {
      id: 3,
      time: "14:00",
      client: "Pierre Dubois",
      type: "Visite",
      property: "Appartement Issy",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    {
      id: 4,
      time: "16:30",
      client: "Sophie Laurent",
      type: "Rendez-vous",
      property: "Bureau",
      clientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    },
  ];

  // Show loading while auth state is being restored
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-primary/20 mx-auto" />
          <p className="text-muted-foreground">{t("common.loading") || "Chargement..."}</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show message to create account
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("dashboard.notConnected.title")}</h1>
              <p className="text-lg text-muted-foreground">{t("dashboard.notConnected.description")}</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/journey">{t("dashboard.notConnected.cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get the display name for the user
  const getUserDisplayName = () => {
    if (user?.preferredName) return user.preferredName;
    return user?.firstName || user?.name || "Utilisateur";
  };

  // EXPERT DASHBOARD
  if (isExpert) {
    // NOTAIRE SPECIFIC DASHBOARD
    if (activeRole?.subtype === "notaire") {
      const notaryMissions = [
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
          id: "purchase-promise",
          title: "Promesse d'Achat",
          description: "Création de la promesse d'achat pour l'acheteur",
          icon: FileCheck,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          count: 2,
          action: "Créer une promesse",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
        },
        {
          id: "sales-agreement",
          title: "Compromis de Vente",
          description: "Création du compromis de vente pour le vendeur",
          icon: Handshake,
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
          count: 1,
          action: "Rédiger l'acte",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80",
        },
        {
          id: "buyer-check",
          title: "Vérification Dossier Acheteur + Acte",
          description: "Suivi conformité dossier jusqu'à signature Acte Authentique",
          icon: ShieldCheck,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          count: 5,
          action: "Vérifier",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
        },
        {
          id: "seller-check",
          title: "Vérification Dossier Vendeur",
          description: "Suivi conformité dossier jusqu'à signature Acte Authentique",
          icon: FileSearch,
          color: "text-teal-500",
          bgColor: "bg-teal-500/10",
          count: 4,
          action: "Vérifier",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
        },
        {
          id: "full-support",
          title: "Accompagnement Complet",
          description: "Accompagnement total du besoin utilisateur jusqu'à obtention",
          icon: Sparkles,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          count: 2,
          action: "Gérer",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
        },
      ];

      return (
        <div className="min-h-screen bg-background pt-20">
          {/* Decorative elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="decorative-blob decorative-blob-accent w-96 h-96 -top-48 -right-48 animate-float-slow" />
            <div className="decorative-blob decorative-blob-primary w-64 h-64 bottom-32 -left-32 animate-float-delay" />
          </div>

          {/* Header */}
          <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent mb-2">
                    <Scale className="h-4 w-4" />
                    Office Notarial
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">Tableau de bord Notaire</h1>
                  <p className="text-muted-foreground mt-1">Bienvenue Maître {user?.lastName}, voici vos dossiers en cours.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/profile" className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      {t("dashboard.viewProfile")}
                    </Link>
                  </Button>
                  <RoleSwitcher t={t} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 stagger-animation">
              <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">17</p>
                      <p className="text-sm text-muted-foreground">Dossiers actifs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <PenTool className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">3</p>
                      <p className="text-sm text-muted-foreground">Signatures semaine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-sm text-muted-foreground">Actes finalisés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12h</p>
                      <p className="text-sm text-muted-foreground">Temps moyen/dossier</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Missions Grid */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-accent" />
                  Vos missions prioritaires
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-animation">
                  {notaryMissions.map((mission) => (
                    <Card key={mission.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift overflow-hidden group">
                      <div className="h-28 w-full relative overflow-hidden">
                        <img
                          src={mission.image}
                          alt={mission.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 opacity-90 ${mission.bgColor.replace("/10", "/80")} mix-blend-multiply`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                          <div className="flex items-center gap-2 text-white">
                            <mission.icon className="h-5 w-5" />
                            <span className="font-bold text-sm tracking-wide">{mission.title}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                            {mission.count} dossiers
                          </Badge>
                        </div>

                        {/* Note: Title moved to header image */}
                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{mission.description}</p>

                        <Button
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                          variant="outline"
                        >
                          {mission.action} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar / Agenda */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-accent" />
                  Agenda du jour
                </h2>

                <Card className="border-border bg-card/80 backdrop-blur-sm h-fit">
                  <CardHeader>
                    <CardTitle className="text-lg">Prochains rendez-vous</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {[
                        { time: "09:30", title: "Signature Compromis - Mr Dupont", type: "Signature" },
                        { time: "11:00", title: "Vérification dossier - Mme Martin", type: "Vérification" },
                        { time: "14:30", title: "Appel client - Projet SCI", type: "Tel" },
                        { time: "16:00", title: "Signature Acte de Vente - Famille Leroy", type: "Signature" },
                      ].map((evt, i) => (
                        <div key={i} className="p-4 hover:bg-muted/50 transition-colors flex gap-4 items-center">
                          <div className="flex-shrink-0 w-14 text-center">
                            <span className="block font-bold text-lg text-foreground">{evt.time}</span>
                          </div>
                          <div className="w-1 h-10 bg-accent/20 rounded-full" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">{evt.title}</p>
                            <Badge variant="secondary" className="mt-1 text-xs scale-90 origin-left">
                              {evt.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-border">
                      <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
                        Voir tout l'agenda <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Besoin d'aide ?</h3>
                    <p className="text-sm text-muted-foreground">Contacter le support technique dédié aux notaires.</p>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      <Phone className="mr-2 h-4 w-4" /> Support Pro
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background pt-20">
        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="decorative-blob decorative-blob-accent w-96 h-96 -top-48 -right-48 animate-float-slow" />
          <div className="decorative-blob decorative-blob-primary w-64 h-64 bottom-32 -left-32 animate-float-delay" />
        </div>

        {/* Header */}
        <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{t("dashboard.expert.title")}</h1>
                <p className="text-muted-foreground mt-1">
                  {t("dashboard.expert.welcome")}, {getUserDisplayName()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    {t("dashboard.viewProfile")}
                  </Link>
                </Button>
                <RoleSwitcher t={t} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 stagger-animation">
            <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.activeClients")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.activeMissions")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">4</p>
                    <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.todayAppointments")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">+15%</p>
                    <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.monthlyGrowth")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="clients" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="clients" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.expert.tabs.clients")}</span>
              </TabsTrigger>
              <TabsTrigger value="missions" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.expert.tabs.missions")}</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.expert.tabs.schedule")}</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.expert.tabs.messages")}</span>
              </TabsTrigger>
            </TabsList>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">{t("dashboard.expert.clients.title")}</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder={t("dashboard.expert.clients.search")} className="pl-10 w-full sm:w-[300px]" />
                </div>
              </div>

              <div className="space-y-4 stagger-animation">
                {expertClients.map((client) => (
                  <Card key={client.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={client.image}
                            alt={client.name}
                            className="h-12 w-12 rounded-full object-cover border-2 border-accent/20"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {client.location}
                              <span className="mx-1">•</span>
                              <Euro className="h-3 w-3" />
                              {client.budget}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-accent">{client.solvabilityScore}</div>
                            <div className="text-xs text-muted-foreground">{t("dashboard.expert.clients.score")}</div>
                          </div>
                          <Badge
                            variant={client.status === "active" ? "default" : "secondary"}
                            className={client.status === "active" ? "bg-accent text-accent-foreground" : ""}
                          >
                            {client.status === "active" ? t("dashboard.expert.clients.active") : t("dashboard.expert.clients.pending")}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            {t("dashboard.expert.clients.contact")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Missions Tab */}
            <TabsContent value="missions" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground">{t("dashboard.expert.missions.title")}</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-animation">
                {expertMissions.map((mission) => (
                  <Card key={mission.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground">{mission.type}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <img src={mission.clientImage} alt={mission.client} className="h-6 w-6 rounded-full object-cover" />
                            <p className="text-sm text-muted-foreground">{mission.client}</p>
                          </div>
                        </div>
                        <Badge
                          variant={mission.status === "in_progress" ? "default" : "secondary"}
                          className={mission.status === "in_progress" ? "bg-accent text-accent-foreground" : ""}
                        >
                          {mission.status === "in_progress"
                            ? t("dashboard.expert.missions.inProgress")
                            : t("dashboard.expert.missions.pending")}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("dashboard.expert.missions.progress")}</span>
                          <span className="font-medium text-foreground">{mission.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${mission.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {t("dashboard.expert.missions.deadline")}: {mission.deadline}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">{t("dashboard.expert.schedule.title")}</h2>
                <Badge variant="outline">{t("dashboard.expert.schedule.today")}</Badge>
              </div>

              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 stagger-animation">
                    {expertSchedule.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                        <div className="text-center min-w-[60px]">
                          <p className="text-lg font-bold text-accent">{item.time}</p>
                        </div>
                        <div className="h-12 w-1 rounded-full bg-accent" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <img src={item.clientImage} alt={item.client} className="h-8 w-8 rounded-full object-cover" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-foreground leading-none">{item.client}</p>
                                <Badge variant="outline" className="text-[10px] h-5 px-1.5">
                                  {item.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {item.property && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Building2 className="h-3 w-3" />
                              {item.property}
                            </p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6 animate-fade-in-up">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    {t("dashboard.messages.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className="p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{msg.from}</p>
                            <p className="text-xs text-muted-foreground">{msg.role}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-foreground">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Input
                      placeholder={t("dashboard.messages.writePlaceholder")}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // VENDEUR DASHBOARD
  if (activeRole?.subtype === "vendeur") {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
          <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
        </div>

        {/* Header */}
        <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tableau de bord Vendeur</h1>
                <p className="text-muted-foreground mt-1">Gérez la vente de vos biens et suivez les acquéreurs potentiels.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    {t("dashboard.viewProfile")}
                  </Link>
                </Button>
                <RoleSwitcher t={t} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
          <Tabs defaultValue="listings" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
              <TabsTrigger value="needs" className="text-xs sm:text-sm">
                {t("dashboard.tabs.needs")}
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-xs sm:text-sm">
                {t("dashboard.tabs.messages")}
              </TabsTrigger>
              <TabsTrigger value="buyers" className="text-xs sm:text-sm">
                Parc acheteur
              </TabsTrigger>
              <TabsTrigger value="experts" className="text-xs sm:text-sm">
                Experts
              </TabsTrigger>
              <TabsTrigger value="listings" className="text-xs sm:text-sm">
                Mes annonces
              </TabsTrigger>
              <TabsTrigger value="tips" className="text-xs sm:text-sm">
                Conseils
              </TabsTrigger>
              <TabsTrigger value="patrimony" className="text-xs sm:text-sm">
                {t("dashboard.tabs.patrimony")}
              </TabsTrigger>
            </TabsList>

            {/* Mes Annonces */}
            <TabsContent value="listings" className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Vos ventes en cours</h2>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" /> Ajouter un bien
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellerListings.map((listing) => (
                  <Card key={listing.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">{listing.status}</Badge>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{listing.title}</h3>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" /> {listing.location}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <p className="text-muted-foreground text-xs">Prix</p>
                          <p className="font-semibold">{listing.price}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <p className="text-muted-foreground text-xs">Surface</p>
                          <p className="font-semibold">{listing.surface}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-bold text-foreground">{listing.views}</span> vues
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-bold text-foreground">{listing.contacts}</span> contacts
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Gérer l'annonce
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Parc Acheteur */}
            <TabsContent value="buyers" className="space-y-6 animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Acquéreurs potentiels</h2>
                <p className="text-muted-foreground">Ces profils matchent avec vos biens en vente.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellerBuyerPool.map((buyer) => (
                  <Card key={buyer.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
                        <img src={buyer.image} alt={buyer.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{buyer.name}</h3>
                        <p className="text-sm text-muted-foreground">{buyer.details}</p>
                      </div>
                      <div className="w-full bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Budget</p>
                          <p className="font-semibold">{buyer.budget}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Match</p>
                          <p className="font-bold text-green-600">{buyer.match}%</p>
                        </div>
                      </div>

                      <Button className="w-full">Proposer une visite</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Conseils */}
            <TabsContent value="tips" className="space-y-6 animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Guide du vendeur</h2>
                <p className="text-muted-foreground">Les étapes clés pour réussir votre vente.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sellerTips.map((tip, idx) => (
                  <Card key={idx} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                    <CardContent className="p-6 space-y-4">
                      <div className={`h-12 w-12 rounded-xl ${tip.bg} flex items-center justify-center`}>
                        <tip.icon className={`h-6 w-6 ${tip.color}`} />
                      </div>
                      <h3 className="text-xl font-bold">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm">{tip.description}</p>
                      <Button variant="link" className={`p-0 h-auto ${tip.color}`}>
                        En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Needs */}
            <TabsContent value="needs" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.needs.title")}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockNeeds.map((need) => (
                  <Card key={need.id} className="border-border bg-card/80 backdrop-blur-sm">
                    <div className="h-40 relative overflow-hidden rounded-t-xl">
                      <img src={need.image} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <Badge>{need.status}</Badge>
                        <span className="font-bold text-primary">{need.match}% Match</span>
                      </div>
                      <h3 className="font-bold">{need.type}</h3>
                      <p className="text-sm text-muted-foreground">{need.location}</p>
                      <Button className="w-full mt-2" variant="secondary">
                        Voir détails
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Experts */}
            <TabsContent value="experts" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-4">Vos experts partenaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockExperts.map((expert) => (
                  <Card key={expert.id} className="border-border bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden">
                        <img src={expert.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{expert.name}</h3>
                        <Badge variant="outline" className="mb-2">
                          {expert.role}
                        </Badge>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">{expert.rating}</span>
                          <span className="text-muted-foreground ml-1">({expert.reviews} avis)</span>
                        </div>
                        <Button size="sm" className="w-full">
                          Contacter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Messages */}
            <TabsContent value="messages" className="space-y-6 animate-fade-in-up">
              <Card className="border-border bg-card/80 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {t("dashboard.messages.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className="flex gap-4 p-4 rounded-xl bg-muted/50 max-w-[80%]">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <UserCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold">{msg.from}</span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <Input placeholder="Écrivez votre message..." />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Patrimony */}
            <TabsContent value="patrimony" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.patrimony.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPatrimony.map((item) => (
                  <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden">
                    <div className="h-32 relative">
                      <img src={item.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="text-white font-bold text-xl">{item.type}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">{t("dashboard.patrimony.value")}</span>
                        <span className="font-bold">{item.value.toLocaleString("fr-FR")} €</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
                        <div
                          className="bg-green-500 h-full rounded-full"
                          style={{ width: item.growth.replace("+", "").replace("%", "").trim() + "%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{t("dashboard.patrimony.performance") || "Performance"}</span>
                        <span className="text-green-600 font-medium">{item.growth}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // CLIENT DASHBOARD (Fallback)
  if (activeRole?.type === "client" && activeRole?.subtype !== "acheteur") {
    return (
      <div className="min-h-screen bg-background pt-20">
        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
          <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
        </div>

        {/* Header */}
        <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{t("dashboard.title")}</h1>
                <p className="text-muted-foreground mt-1">Bienvenue, {getUserDisplayName()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    {t("dashboard.viewProfile")}
                  </Link>
                </Button>
                <RoleSwitcher t={t} />
                <Badge variant="outline">3 {t("dashboard.propertiesPending")}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
          {/* Welcome Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-in-up">
            <Card className="overflow-hidden border-border bg-card/80 backdrop-blur-sm relative min-h-[200px] flex items-center p-8 group">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                  alt="Interior"
                  className="w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50"></div>
              </div>
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-foreground">Suivi de vos projets</h2>
                <p className="text-muted-foreground mb-4">Suivez l'avancement de vos ventes et recherches en temps réel.</p>
                <Button variant="secondary" className="shadow-sm">
                  Voir mes alertes
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden border-border bg-card/80 backdrop-blur-sm relative min-h-[200px] flex items-center p-8 group">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80"
                  alt="Office"
                  className="w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50"></div>
              </div>
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-foreground">Contacter mon expert</h2>
                <p className="text-muted-foreground mb-4">Une question sur votre contrat ? Votre notaire est disponible.</p>
                <Button className="shadow-sm">Messagerie</Button>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="needs" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
              <TabsTrigger value="needs" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.needs")}</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.messages")}</span>
              </TabsTrigger>
              <TabsTrigger value="vendors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.vendors")}</span>
              </TabsTrigger>
              <TabsTrigger value="promoters" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.promoters")}</span>
              </TabsTrigger>
              <TabsTrigger value="visits" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.visits")}</span>
              </TabsTrigger>
            </TabsList>

            {/* Besoins Tab */}
            <TabsContent value="needs" className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">{t("dashboard.needs.title")}</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder={t("dashboard.needs.searchPlaceholder")} className="pl-10 w-full sm:w-[300px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 stagger-animation">
                {mockNeeds.map((need) => (
                  <Card
                    key={need.id}
                    className="border-border bg-card/80 backdrop-blur-sm card-hover-lift shine-effect overflow-hidden group"
                  >
                    <div className="h-48 w-full overflow-hidden relative">
                      <img
                        src={need.image}
                        alt={need.type}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant={need.status === t("dashboard.needs.status.new") ? "default" : "secondary"}
                          className={
                            need.status === t("dashboard.needs.status.new")
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-background/80 backdrop-blur-md shadow-sm"
                          }
                        >
                          {need.status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-4 pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-right ml-auto">
                          <div className="text-xs text-muted-foreground">{t("dashboard.needs.match")}</div>
                          <div className="text-lg font-bold text-primary">{need.match}%</div>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{need.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{need.location}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-2 rounded-lg bg-muted">
                          <Euro className="h-4 w-4 mx-auto text-primary mb-1" />
                          <div className="text-xs text-muted-foreground">{t("dashboard.needs.price")}</div>
                          <div className="text-sm font-semibold text-foreground">{need.price}</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted">
                          <Square className="h-4 w-4 mx-auto text-primary mb-1" />
                          <div className="text-xs text-muted-foreground">{t("dashboard.needs.surface")}</div>
                          <div className="text-sm font-semibold text-foreground">{need.surface}</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted">
                          <Bed className="h-4 w-4 mx-auto text-primary mb-1" />
                          <div className="text-xs text-muted-foreground">{t("dashboard.needs.rooms")}</div>
                          <div className="text-sm font-semibold text-foreground">{need.rooms}</div>
                        </div>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        {t("dashboard.needs.viewDetails")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6 animate-fade-in-up">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {t("dashboard.messages.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-[500px] overflow-y-auto stagger-animation">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className="p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{msg.from}</p>
                            <p className="text-xs text-muted-foreground">{msg.role}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-foreground">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Input
                      placeholder={t("dashboard.messages.writePlaceholder")}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent value="vendors" className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{t("dashboard.vendors.title")}</h2>
                <p className="text-muted-foreground">{t("dashboard.vendors.description")}</p>
              </div>

              <div className="space-y-4 stagger-animation">
                {mockVendors.map((vendor) => (
                  <Card key={vendor.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                      <div className="md:w-32 h-32 md:h-auto relative flex-shrink-0">
                        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-1">{vendor.name}</h3>
                          <p className="text-muted-foreground">{vendor.property}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={vendor.status === t("dashboard.vendors.status.visitScheduled") ? "default" : "secondary"}
                            className={
                              vendor.status === t("dashboard.vendors.status.visitScheduled") ? "bg-primary text-primary-foreground" : ""
                            }
                          >
                            {vendor.status}
                          </Badge>
                          <Button variant="outline">{t("dashboard.vendors.contact")}</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Promoters Tab */}
            <TabsContent value="promoters" className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{t("dashboard.promoters.title")}</h2>
                <p className="text-muted-foreground">{t("dashboard.promoters.description")}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-animation">
                {mockPromoters.map((promoter) => (
                  <Card
                    key={promoter.id}
                    className="border-border bg-card/80 backdrop-blur-sm card-hover-lift shine-effect overflow-hidden group"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={promoter.image}
                        alt={promoter.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="flex items-center gap-2 text-white">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">{promoter.location}</span>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{promoter.units}</Badge>
                      </div>
                      <CardTitle className="text-xl">{promoter.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold text-foreground mb-1">{promoter.project}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{promoter.location}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        {t("dashboard.promoters.learnMore")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Visits Tab */}
            <TabsContent value="visits" className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{t("dashboard.visits.title")}</h2>
                <p className="text-muted-foreground">{t("dashboard.visits.description")}</p>
              </div>

              <div className="space-y-4 stagger-animation">
                {mockVisits.map((visit) => (
                  <Card key={visit.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="text-sm font-medium text-primary mb-1">{visit.date}</div>
                          <div className="text-2xl font-bold text-primary">{visit.time}</div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">{visit.property}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {t("dashboard.visits.expert")} : {visit.expert}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {t("dashboard.visits.confirm")}
                          </Button>
                          <Button variant="outline">{t("dashboard.visits.cancel")}</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
  // ACHETEUR DASHBOARD
  if (activeRole?.subtype === "acheteur") {
    return (
      <div className="min-h-screen bg-background pt-20">
        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
          <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
        </div>

        {/* Header */}
        <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tableau de bord Acheteur</h1>
                <p className="text-muted-foreground mt-1">Bienvenue, {getUserDisplayName()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    Profil
                  </Link>
                </Button>
                <RoleSwitcher t={t} />
                <Badge variant="outline">3 dossiers en cours</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
          <Tabs defaultValue="needs" className="space-y-8">
            <TabsList className="flex w-full h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              <TabsTrigger
                value="needs"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <Target className="h-4 w-4 mr-2" />
                Besoin en cours
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messagerie
              </TabsTrigger>
              <TabsTrigger
                value="vendors"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <Users className="h-4 w-4 mr-2" />
                Parc Vendeur
              </TabsTrigger>
              <TabsTrigger
                value="promoters"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Parc Promoteur
              </TabsTrigger>
              <TabsTrigger
                value="experts"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Accompagnement
              </TabsTrigger>
              <TabsTrigger
                value="agenda"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Mon Agenda
              </TabsTrigger>
              <TabsTrigger
                value="post-purchase"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Quoi faire après l'achat ?
              </TabsTrigger>
              <TabsTrigger
                value="patrimony"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border bg-card hover:bg-muted/50 transition-all rounded-full px-4"
              >
                <PiggyBank className="h-4 w-4 mr-2" />
                Patrimoine
              </TabsTrigger>
            </TabsList>

            {/* Besoins Tab */}
            <TabsContent value="needs" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground">Vos recherches actives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
                {mockNeeds.map((need) => (
                  <Card key={need.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift overflow-hidden group">
                    <div className="h-48 w-full overflow-hidden relative">
                      <img
                        src={need.image}
                        alt={need.type}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-primary backdrop-blur-sm hover:bg-white">{need.status}</Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex justify-between items-end">
                          <div className="text-white">
                            <span className="text-sm font-medium opacity-90">Match</span>
                            <div className="text-xl font-bold">{need.match}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{need.type}</CardTitle>
                        <span className="text-lg font-bold text-primary">{need.price}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-accent" /> {need.location}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-3 rounded-lg">
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Budget</span>
                          <span className="font-medium text-foreground">{need.budget}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Surface</span>
                          <span className="font-medium text-foreground">{need.surface}</span>
                        </div>
                      </div>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Voir 12 résultats <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6 animate-fade-in-up">
              <Card className="border-border bg-card/80 backdrop-blur-sm h-[600px] flex flex-col overflow-hidden">
                <div className="flex h-full">
                  {/* Sidebar (Conversations) */}
                  <div className="w-1/3 border-r border-border bg-muted/30 p-4 hidden md:block">
                    <h3 className="font-semibold mb-4 text-foreground">Conversations</h3>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${i === 1 ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"}`}
                        >
                          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <UserCircle className="h-6 w-6 text-accent" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="font-medium truncate">Maître Renaud</div>
                            <div className="text-xs text-muted-foreground truncate">Concernant votre dossier...</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Chat */}
                  <div className="flex-1 flex flex-col">
                    <CardHeader className="border-b border-border py-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        Messagerie sécurisée
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto space-y-4 p-4 bg-muted/10">
                      {mockMessages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col max-w-[80%] ${m.role === "Expert" ? "self-start" : "self-end items-end"}`}
                        >
                          <div
                            className={`p-4 rounded-2xl shadow-sm ${m.role === "Expert" ? "bg-card border border-border rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"}`}
                          >
                            <p className="text-sm">{m.message}</p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 px-2">
                            {m.time} • {m.from}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                    <div className="p-4 border-t border-border bg-card flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <Input
                        placeholder="Écrivez votre message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="bg-muted/50 border-0 focus-visible:ring-1"
                      />
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent value="vendors" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground">Parc Vendeur</h2>
              <div className="space-y-4">
                {mockVendors.map((vendor) => (
                  <Card key={vendor.id} className="card-hover-lift overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                      <div className="md:w-32 h-32 md:h-auto relative">
                        <img
                          src={vendor.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"}
                          alt={vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{vendor.name}</h3>
                            <div className="flex text-yellow-500 text-xs">{"★".repeat(Math.floor(vendor.rating))}</div>
                          </div>
                          <p className="text-sm text-foreground/80 font-medium mb-2">{vendor.property}</p>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              Vendeur vérifié
                            </Badge>
                            <Badge variant="outline">{vendor.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="outline" className="gap-2">
                            <Phone className="h-4 w-4" /> Appeler
                          </Button>
                          <Button className="gap-2">
                            <MessageSquare className="h-4 w-4" /> Contacter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Promoters Tab */}
            <TabsContent value="promoters" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground">Parc Promoteur</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPromoters.map((promoter) => (
                  <Card key={promoter.id} className="card-hover-lift overflow-hidden group border-0 shadow-lg">
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={promoter.image}
                        alt={promoter.project}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <h3 className="font-bold text-xl text-white mb-1">{promoter.project}</h3>
                        <p className="text-white/80 text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {promoter.location}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-6 bg-card relative z-10">
                      <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                        <div className="text-center">
                          <span className="block text-xs text-muted-foreground uppercase">Disponibilité</span>
                          <span className="font-bold text-primary">{promoter.units}</span>
                        </div>
                        <div className="h-8 w-px bg-border"></div>
                        <div className="text-center">
                          <span className="block text-xs text-muted-foreground uppercase">Livraison</span>
                          <span className="font-bold text-foreground">{promoter.delivery}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-muted-foreground">Promoteur</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                            {promoter.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium">{promoter.name}</span>
                        </div>
                      </div>

                      <Button className="w-full" variant="secondary">
                        Voir les plans et lots
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Experts Tab */}
            <TabsContent value="experts" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground">Votre Équipe d'Experts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockExperts.map((expert) => (
                  <Card key={expert.id} className="card-hover-lift text-center overflow-hidden border-t-4 border-t-primary">
                    <CardContent className="p-6 pt-10 space-y-4 relative">
                      <div className="absolute top-0 right-0 p-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div className="h-24 w-24 mx-auto rounded-full p-1 bg-gradient-to-br from-primary to-accent">
                        <img
                          src={expert.image}
                          alt={expert.name}
                          className="w-full h-full rounded-full object-cover border-4 border-card"
                        />
                      </div>

                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {expert.role}
                        </Badge>
                        <h3 className="font-bold text-lg">{expert.name}</h3>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
                        <p className="font-medium text-foreground">{expert.contact}</p>
                        <p className="text-xs truncate">{expert.email}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full hover:bg-primary hover:text-primary-foreground group">
                        Prendre RDV <ArrowUpRight className="h-3 w-3 ml-1 group-hover:rotate-45 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Agenda Tab */}
            <TabsContent value="agenda" className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Mon Agenda</h2>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Ajouter un événement
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Widget Placeholder */}
                <Card className="lg:col-span-1 bg-primary/5 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="text-8xl font-black text-primary/20 mb-4">24</div>
                    <h3 className="text-xl font-bold mb-2">Octobre 2024</h3>
                    <p className="text-sm text-muted-foreground">3 événements prévus ce mois-ci</p>
                  </CardContent>
                </Card>

                {/* Events List */}
                <Card className="lg:col-span-2">
                  <CardContent className="p-0">
                    {mockVisits.map((visit) => (
                      <div
                        key={visit.id}
                        className="flex items-center p-6 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group"
                      >
                        <div className="flex flex-col items-center justify-center h-16 w-16 bg-card border-2 border-primary/20 rounded-2xl text-primary mr-6 shadow-sm group-hover:border-primary transition-colors">
                          <span className="text-xs font-bold uppercase">{visit.date.split(" ")[1]}</span>
                          <span className="text-xl font-black">{visit.date.split(" ")[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                            {visit.property}
                          </h4>
                          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-2">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-accent" /> {visit.time}
                            </span>
                            <span className="flex items-center">
                              <UserCircle className="h-4 w-4 mr-2 text-accent" /> {visit.expert}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={`${visit.status === "confirmed" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}
                        >
                          {visit.status === "confirmed" ? "Confirmé" : "En attente"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Post Purchase Tab */}
            <TabsContent value="post-purchase" className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground">Quoi faire après l'achat ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Checklist Emménagement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockPostPurchase.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow group"
                      >
                        <Checkbox checked={task.completed} className="mt-1" />
                        <div className="flex-1">
                          <h4 className={`font-semibold ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {task.date}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 flex flex-col justify-center items-center text-center p-8">
                  <div className="h-20 w-20 rounded-full bg-background shadow-lg flex items-center justify-center mb-6 animate-bounce-in">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Conciergerie Premium</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm">
                    Besoin d'aide pour vos démarches ? Notre conciergerie s'occupe de tout : électricité, internet, assurance, et plus
                    encore.
                  </p>
                  <Button className="w-full max-w-xs shadow-lg shadow-primary/20">Contacter la Conciergerie</Button>
                </Card>
              </div>
            </TabsContent>

            {/* Patrimony Tab */}
            <TabsContent value="patrimony" className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Mon Patrimoine Immobilier</h2>
                  <p className="text-muted-foreground">Vue d'ensemble de vos actifs</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block font-medium">Estimation Totale</span>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    685 000 €
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockPatrimony.map((asset) => (
                  <Card key={asset.id} className="card-hover-lift overflow-hidden group">
                    <div className="h-32 relative">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-xs font-medium opacity-80 mb-1">{asset.type}</div>
                        <h3 className="font-bold text-lg leading-tight">{asset.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-green-600 bg-green-100 flex items-center px-2 py-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" /> {asset.growth}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Depuis l'achat</span>
                      </div>
                      <div className="pt-4 border-t border-border flex justify-between items-end">
                        <span className="text-muted-foreground text-sm">Valeur estimée</span>
                        <span className="text-2xl font-bold">{asset.value.toLocaleString()} €</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="bg-muted/30 border-dashed border-2">
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                    <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center shadow-sm">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Outils d'analyse</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">Simulez votre rentabilité et optimisez votre fiscalité.</p>
                    <Button variant="outline" className="mt-2">
                      Accéder au simulateur
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground overflow-hidden relative">
                  <div className="absolute -right-10 -top-10 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-8 flex flex-col justify-center h-full relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Besoin d'une nouvelle estimation ?</h3>
                    <p className="mb-6 opacity-90">Nos experts locaux peuvent estimer votre bien gratuitement en 48h.</p>
                    <Button variant="secondary" className="w-fit">
                      Demander une estimation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // STANDARD CLIENT DASHBOARD (Non-Buyer)
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
      </div>

      <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
              <p className="text-muted-foreground mt-1">Bienvenue, {getUserDisplayName()}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Profil
                </Button>
              </Link>
              <RoleSwitcher t={t} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
        {/* Welcome Cards with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-in-up">
          <Card className="overflow-hidden border-border bg-card/80 backdrop-blur-sm relative min-h-[220px] flex items-center p-8 group">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                alt="Interior"
                className="w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50"></div>
            </div>
            <div className="relative z-10 max-w-md">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Bienvenue sur votre espace</h2>
              <p className="text-muted-foreground mb-4">Retrouvez l'ensemble de vos documents et échanges en un seul endroit sécurisé.</p>
              <Button variant="secondary" className="shadow-sm">
                Compléter mon profil
              </Button>
            </div>
          </Card>

          <Card className="overflow-hidden border-border bg-card/80 backdrop-blur-sm relative min-h-[220px] flex items-center p-8 group">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80"
                alt="Office"
                className="w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50"></div>
            </div>
            <div className="relative z-10 max-w-md">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Besoin d'accompagnement ?</h2>
              <p className="text-muted-foreground mb-4">Nos experts partenaires sont à votre disposition pour vos projets immobiliers.</p>
              <Button className="shadow-sm">Trouver un expert</Button>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messagerie
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <Card className="min-h-[400px] flex flex-col justify-center items-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
              <p>Votre messagerie est vide pour le moment.</p>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="min-h-[400px] flex flex-col justify-center items-center text-muted-foreground">
              <FileText className="h-12 w-12 mb-4 opacity-50" />
              <p>Aucun document disponible.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
