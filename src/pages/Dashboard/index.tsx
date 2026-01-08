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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
      type: t("dashboard.needs.propertyType.apartment"),
      location: "Paris 15ème",
      price: "345 000 €",
      surface: "72 m²",
      rooms: "3 pièces",
      status: t("dashboard.needs.status.inProgress"),
      match: 95,
    },
    {
      id: 2,
      type: t("dashboard.needs.propertyType.apartment"),
      location: "Issy-les-Moulineaux",
      price: "320 000 €",
      surface: "68 m²",
      rooms: "3 pièces",
      status: t("dashboard.needs.status.new"),
      match: 88,
    },
    {
      id: 3,
      type: t("dashboard.needs.propertyType.apartment"),
      location: "Boulogne-Billancourt",
      price: "350 000 €",
      surface: "75 m²",
      rooms: "3 pièces",
      status: t("dashboard.needs.status.inProgress"),
      match: 92,
    },
  ];

  const mockVendors = [
    { id: 1, name: "Jean Dupont", property: "Appartement 75m² - Paris 15ème", status: t("dashboard.vendors.status.available") },
    { id: 2, name: "Marie Martin", property: "Appartement 68m² - Issy", status: t("dashboard.vendors.status.visitScheduled") },
    { id: 3, name: "Pierre Dubois", property: "Appartement 72m² - Boulogne", status: t("dashboard.vendors.status.available") },
  ];

  const mockPromoters = [
    { id: 1, name: "Kaufman & Broad", project: "Résidence Le Parc", units: "12 appartements", location: "Paris 15ème" },
    { id: 2, name: "Nexity", project: "Les Jardins d'Issy", units: "8 appartements", location: "Issy-les-Moulineaux" },
    { id: 3, name: "Bouygues Immobilier", project: "Villa Moderne", units: "15 appartements", location: "Boulogne" },
  ];

  const mockVisits = [
    { id: 1, date: "15 Déc 2025", time: "14:00", property: "Appartement Paris 15ème", expert: "Sophie Durand" },
    { id: 2, date: "18 Déc 2025", time: "10:30", property: "Résidence Le Parc", expert: "Marc Leblanc" },
    { id: 3, date: "20 Déc 2025", time: "16:00", property: "Appartement Issy", expert: "Sophie Durand" },
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

  // Expert mock data
  const expertClients = [
    {
      id: 1,
      name: "Jean Dupont",
      budget: "350 000 €",
      location: "Paris 15ème",
      status: "active",
      solvabilityScore: 8.5,
      lastContact: "Aujourd'hui",
    },
    {
      id: 2,
      name: "Marie Martin",
      budget: "420 000 €",
      location: "Boulogne-Billancourt",
      status: "pending",
      solvabilityScore: 9.2,
      lastContact: "Hier",
    },
    {
      id: 3,
      name: "Pierre Dubois",
      budget: "280 000 €",
      location: "Issy-les-Moulineaux",
      status: "active",
      solvabilityScore: 7.8,
      lastContact: "Il y a 3j",
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
    },
    {
      id: 2,
      client: "Marie Martin",
      type: "Négociation",
      progress: 40,
      status: "in_progress",
      deadline: "15 Jan 2026",
    },
    {
      id: 3,
      client: "Pierre Dubois",
      type: "Visite programmée",
      progress: 20,
      status: "pending",
      deadline: "10 Jan 2026",
    },
  ];

  const expertSchedule = [
    { id: 1, time: "09:00", client: "Jean Dupont", type: "Visite", property: "Appartement Paris 15ème" },
    { id: 2, time: "11:30", client: "Marie Martin", type: "Appel", property: null },
    { id: 3, time: "14:00", client: "Pierre Dubois", type: "Visite", property: "Appartement Issy" },
    { id: 4, time: "16:30", client: "Sophie Laurent", type: "Rendez-vous", property: "Bureau" },
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
                      <div className={`h-1 w-full ${mission.bgColor.replace("/10", "")}`} />
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div
                            className={`h-12 w-12 rounded-xl ${mission.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}
                          >
                            <mission.icon className={`h-6 w-6 ${mission.color}`} />
                          </div>
                          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                            {mission.count} dossiers
                          </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {mission.title}
                        </h3>
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
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                            <span className="text-lg font-bold text-white">{client.name.charAt(0)}</span>
                          </div>
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
                          <p className="text-sm text-muted-foreground">
                            {t("dashboard.expert.missions.client")}: {mission.client}
                          </p>
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
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{item.client}</p>
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
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

  // CLIENT DASHBOARD
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
                <Card key={need.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift shine-effect">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant={need.status === t("dashboard.needs.status.new") ? "default" : "secondary"}
                        className={need.status === t("dashboard.needs.status.new") ? "bg-primary text-primary-foreground" : ""}
                      >
                        {need.status}
                      </Badge>
                      <div className="text-right">
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
                <Card key={vendor.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                <Card key={promoter.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift shine-effect">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Building2 className="h-8 w-8 text-primary" />
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
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("dashboard.visits.confirm")}</Button>
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
