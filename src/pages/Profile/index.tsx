import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import { clientSubtypeLabels, expertSubtypeLabels, type ClientSubtype, type ExpertSubtype } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Euro,
  Home,
  User,
  BadgeCheck,
  TrendingUp,
  Calendar,
  ArrowRight,
  Briefcase,
  Award,
  Globe,
  Users,
  Star,
  Phone,
  Mail,
  Lock,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function ProfilPage() {
  const { t } = useTranslation();
  const { user, isAuthenticated, isExpert, isLoading, activeRole, hasMultipleRoles } = useAuth();

  // Get the display name for the user
  const getUserDisplayName = () => {
    if (user?.preferredName) return user.preferredName;
    return user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name || "Utilisateur";
  };

  // Get role subtype label
  const getRoleSubtypeLabel = () => {
    if (!activeRole) return "";
    if (activeRole.type === "client") {
      return clientSubtypeLabels[activeRole.subtype as ClientSubtype];
    }
    return expertSubtypeLabels[activeRole.subtype as ExpertSubtype];
  };

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
  if (!isAuthenticated || !user) {
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("profile.notConnected.title")}</h1>
              <p className="text-lg text-muted-foreground">{t("profile.notConnected.description")}</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/journey">{t("profile.notConnected.cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Expert Profile View
  if (isExpert) {
    const expertProfile = user.expertProfile;

    return (
      <div className="min-h-screen bg-background pt-20">
        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="decorative-blob decorative-blob-accent w-96 h-96 -top-48 -right-48 animate-float-slow" />
          <div className="decorative-blob decorative-blob-primary w-64 h-64 bottom-32 -left-32 animate-float-delay" />
        </div>

        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-accent/10 to-primary/10 relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="max-w-5xl mx-auto text-center space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-sm font-medium text-accent">
                <Briefcase className="h-4 w-4" />
                {getRoleSubtypeLabel()}
              </div>
              <h1 className="text-4xl font-bold text-foreground">{t("profile.expert.title")}</h1>
              <p className="text-lg text-muted-foreground">{t("profile.expert.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Personal Info Card */}
            <Card className="border-border bg-card card-hover-lift animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-3">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{getUserDisplayName()}</h2>
                      <p className="text-muted-foreground">{getRoleSubtypeLabel()}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                        <Award className="h-3 w-3 mr-1" />
                        {t("profile.expert.certified")}
                      </Badge>
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                        <Star className="h-3 w-3 mr-1" />
                        {expertProfile?.yearsExperience || 5} {t("profile.expert.yearsExp")}
                      </Badge>
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                        <Users className="h-3 w-3 mr-1" />
                        {expertProfile?.completedProjects || 0} {t("profile.expert.projects")}
                      </Badge>
                      {hasMultipleRoles && (
                        <Badge variant="outline" className="text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          Multi-rôles
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Phone className="h-4 w-4" />
                      +33 1 23 45 67 89
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Status */}
            {activeRole && activeRole.documents && activeRole.documents.length > 0 && (
              <Card className="border-border bg-card animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Documents fournis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeRole.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        {doc.uploaded ? (
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`text-sm font-medium ${doc.uploaded ? "text-foreground" : "text-muted-foreground"}`}>
                          {doc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger-animation">
              <Card className="border-border bg-card card-hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{expertProfile?.completedProjects || 0}</div>
                  <p className="text-sm text-muted-foreground">{t("profile.expert.stats.projects")}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card card-hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">4.9</div>
                  <p className="text-sm text-muted-foreground">{t("profile.expert.stats.rating")}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card card-hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">12</div>
                  <p className="text-sm text-muted-foreground">{t("profile.expert.stats.activeClients")}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card card-hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">98%</div>
                  <p className="text-sm text-muted-foreground">{t("profile.expert.stats.satisfaction")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Expertise & Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-border bg-card animate-fade-in-up-delay-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    {t("profile.expert.expertise.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(expertProfile?.expertise || ["residential", "commercial", "investment"]).map((exp) => (
                    <div key={exp} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        {exp === "residential" && <Home className="h-5 w-5 text-accent" />}
                        {exp === "commercial" && <Building2 className="h-5 w-5 text-accent" />}
                        {exp === "investment" && <Euro className="h-5 w-5 text-accent" />}
                        {exp === "luxury" && <Award className="h-5 w-5 text-accent" />}
                      </div>
                      <span className="font-medium text-foreground">{t(`profile.expert.expertise.${exp}`)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border bg-card animate-fade-in-up-delay-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    {t("profile.expert.zones.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(expertProfile?.zones || ["paris", "lyon"]).map((zone) => (
                    <div key={zone} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-5 w-5 text-accent" />
                      <span className="font-medium text-foreground">
                        {zone === "paris" && "Paris et Île-de-France"}
                        {zone === "lyon" && "Lyon et Rhône-Alpes"}
                        {zone === "marseille" && "Marseille et PACA"}
                        {zone === "bordeaux" && "Bordeaux et Nouvelle-Aquitaine"}
                        {zone === "nantes" && "Nantes et Pays de la Loire"}
                        {zone === "toulouse" && "Toulouse et Occitanie"}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Certifications */}
            <Card className="border-border bg-card animate-fade-in-up-delay-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-accent" />
                  {t("profile.expert.certifications.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(expertProfile?.certifications || ["Agent immobilier (carte T)", "Négociateur immobilier"]).map((cert) => (
                    <div key={cert} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <BadgeCheck className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
              <CardContent className="p-8 text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{t("profile.expert.cta.title")}</h3>
                  <p className="text-muted-foreground">{t("profile.expert.cta.description")}</p>
                </div>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/dashboard">
                    {t("profile.expert.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Client Profile View (default)
  const clientProfile = user.clientProfile;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto text-center space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-sm font-medium text-primary">
              <BadgeCheck className="h-4 w-4" />
              {getRoleSubtypeLabel()}
            </div>
            <h1 className="text-4xl font-bold text-foreground">{t("profile.client.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("profile.client.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Personal Info & Score */}
          <Card className="border-border bg-card card-hover-lift animate-fade-in-up">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary-foreground">{clientProfile?.solvabilityScore || 8.5}</div>
                      <div className="text-xs text-primary-foreground/80">/ 10</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{getUserDisplayName()}</h2>
                    <p className="text-muted-foreground">
                      {getRoleSubtypeLabel()} • {t("profile.client.solvabilityScore")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {t("profile.client.solvable")}
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      {t("profile.client.documentsValidated")}
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <User className="h-3 w-3 mr-1" />
                      {t("profile.client.profileComplete")}
                    </Badge>
                    {hasMultipleRoles && (
                      <Badge variant="outline" className="text-muted-foreground">
                        <Briefcase className="h-3 w-3 mr-1" />
                        Multi-rôles
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-2">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-1">{t("profile.client.borrowingCapacity")}</p>
                    <p className="text-2xl font-bold text-foreground">{clientProfile?.borrowingCapacity || "350 000 €"}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-1">{t("profile.client.estimatedRate")}</p>
                    <p className="text-2xl font-bold text-foreground">{clientProfile?.estimatedRate || "3.2%"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Status */}
          {activeRole && activeRole.documents && activeRole.documents.length > 0 && (
            <Card className="border-border bg-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documents fournis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeRole.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      {doc.uploaded ? (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm font-medium ${doc.uploaded ? "text-foreground" : "text-muted-foreground"}`}>
                        {doc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Critères de recherche */}
          <Card className="border-border bg-card animate-fade-in-up-delay-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {t("profile.client.criteria.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("profile.client.criteria.propertyType")}</p>
                  <p className="font-semibold text-foreground capitalize">{clientProfile?.propertyType || "Appartement"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("profile.client.criteria.location")}</p>
                  <p className="font-semibold text-foreground">{clientProfile?.location || "Paris et proche banlieue"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("profile.client.criteria.budget")}</p>
                  <p className="font-semibold text-foreground">{clientProfile?.budget ? `${clientProfile.budget} €` : "350 000 €"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("profile.client.criteria.surface")}</p>
                  <p className="font-semibold text-foreground">
                    {clientProfile?.surface ? `${clientProfile.surface} m² minimum` : "75 m² minimum"} - {clientProfile?.rooms || "3"}{" "}
                    pièces
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations complémentaires */}
          <Card className="border-border bg-card animate-fade-in-up-delay-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {t("profile.client.info.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("profile.client.info.maritalStatus")}</p>
                <p className="font-semibold text-foreground capitalize">{clientProfile?.maritalStatus || "Non spécifié"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("profile.client.info.createdAt")}</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("profile.client.info.status")}</p>
                <Badge className="bg-primary text-primary-foreground">{t("profile.client.info.active")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{t("profile.client.cta.title")}</h3>
                <p className="text-muted-foreground">{t("profile.client.cta.description")}</p>
              </div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/dashboard">
                  {t("profile.client.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
