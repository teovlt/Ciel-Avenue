import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { clientSubtypeLabelKeys, expertSubtypeLabelKeys, useAuth } from "@/providers/auth-provider";
import { type ClientSubtype, type ExpertSubtype, type ClientProfile, type ExpertProfile, type UserRole } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Building2,
  MapPin,
  Euro,
  Home,
  User,
  BadgeCheck,
  ArrowRight,
  Briefcase,
  Lock,
  FileText,
  CheckCircle2,
  Edit2,
  Save,
  X,
  Target,
} from "lucide-react";

export default function ProfilPage() {
  const { t } = useTranslation();
  const { user, login, isAuthenticated, isExpert, isLoading, activeRole, setActiveRoleIndex, hasMultipleRoles } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Sync formData with active profile when not editing or when role changes
  useEffect(() => {
    if (activeRole?.profile) {
      setFormData({ ...activeRole.profile });
    }
  }, [activeRole, isEditing]);

  const handleSave = () => {
    if (user && activeRole) {
      const updatedUser = { ...user };
      const roleIndex = user.activeRoleIndex;

      // Update the profile in the roles array
      updatedUser.roles[roleIndex].profile = {
        ...updatedUser.roles[roleIndex].profile,
        ...formData,
      };

      // Update legacy fields for backward compatibility
      if (activeRole.type === "client") {
        updatedUser.clientProfile = updatedUser.roles[roleIndex].profile as ClientProfile;
      } else {
        updatedUser.expertProfile = updatedUser.roles[roleIndex].profile as ExpertProfile;
      }

      login(updatedUser);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (activeRole?.profile) {
      setFormData({ ...activeRole.profile });
    }
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  // Get role subtype label
  const getRoleSubtypeLabel = (role?: UserRole) => {
    const r = role || activeRole;
    if (!r) return "";
    if (r.type === "client") {
      return t(clientSubtypeLabelKeys[r.subtype as ClientSubtype]);
    }
    return t(expertSubtypeLabelKeys[r.subtype as ExpertSubtype]);
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

  // Common Header with Role Switcher
  const renderHeader = () => (
    <div
      className={`border-b border-border relative z-10 ${isExpert ? "bg-gradient-to-r from-accent/10 to-primary/10" : "bg-gradient-to-r from-primary/10 to-secondary/10"}`}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in-up">
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm text-sm font-medium">
                {isExpert ? <Briefcase className="h-4 w-4 text-accent" /> : <BadgeCheck className="h-4 w-4 text-primary" />}
                {getRoleSubtypeLabel()}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {isExpert ? t("profile.expert.title") : t("profile.client.title", { type: getRoleSubtypeLabel() })}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" /> {t("common.cancel")}
                  </Button>
                  <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground">
                    <Save className="h-4 w-4" /> {t("common.confirm")}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                  <Edit2 className="h-4 w-4" /> {t("common.edit") || "Éditer"}
                </Button>
              )}
            </div>
          </div>

          {hasMultipleRoles && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start animate-fade-in-up-delay-1">
              <span className="text-sm font-medium text-muted-foreground self-center mr-2">Vos rôles :</span>
              {user.roles.map((role, idx) => (
                <Button
                  key={idx}
                  variant={idx === user.activeRoleIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`gap-2 ${idx === user.activeRoleIndex ? "" : "opacity-70 hover:opacity-100"}`}
                >
                  {role.type === "expert" ? <Briefcase className="h-3 w-3" /> : <User className="h-3 w-3" />}
                  {getRoleSubtypeLabel(role)}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Helper for rendering input fields
  const renderInput = (label: string, key: string, placeholder: string, type: string = "text", multiline: boolean = false) => {
    if (!isEditing) {
      return (
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="font-semibold text-foreground">{formData[key] || placeholder}</p>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <Label htmlFor={key}>{label}</Label>
        {multiline ? (
          <Textarea
            id={key}
            value={formData[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
            className="min-h-[100px]"
          />
        ) : (
          <Input
            id={key}
            type={type}
            value={formData[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };

  if (isExpert) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="decorative-blob decorative-blob-accent w-96 h-96 -top-48 -right-48 animate-float-slow" />
          <div className="decorative-blob decorative-blob-primary w-64 h-64 bottom-32 -left-32 animate-float-delay" />
        </div>

        {renderHeader()}

        <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-border bg-card card-hover-lift animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput(t("profile.expert.yearsExp"), "yearsExperience", "5", "number")}
                      {renderInput(t("profile.expert.projects"), "completedProjects", "0", "number")}
                      {renderInput("Entreprise", "company", "Votre entreprise")}
                      {renderInput("SIRET", "siret", "Votre SIRET")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Same unchanged sections for documents and stats... */}
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

  // Client Profile View

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {renderHeader()}

      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="border-border bg-card card-hover-lift animate-fade-in-up">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Section - Only Show if not editing and score exists */}
                {!isEditing && formData.solvabilityScore ? (
                  <div className="flex-shrink-0">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary-foreground">{formData.solvabilityScore}</div>
                        <div className="text-xs text-primary-foreground/80">/ 10</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                      {isEditing ? <Edit2 className="h-12 w-12 text-primary" /> : <User className="h-16 w-16 text-primary" />}
                    </div>
                  </div>
                )}

                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Informations Générales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderInput(t("profile.client.info.maritalStatus"), "maritalStatus", "Votre situation")}
                      {/* Role specific additions */}
                      {activeRole?.subtype === "locataire" && renderInput("Biographie", "bio", "Parlez de vous...", "text", true)}
                      {activeRole?.subtype === "locataire" &&
                        renderInput("Description du logement actuel", "description", "Votre logement actuel...", "text", true)}

                      {activeRole?.subtype === "renovateur" &&
                        renderInput("Type de travaux", "workType", "Rénovation complète, cuisine...")}
                      {activeRole?.subtype === "renovateur" &&
                        renderInput("Contraintes", "constraints", "Délais, budget serré...", "text", true)}
                      {activeRole?.subtype === "renovateur" &&
                        renderInput("Objectif du projet", "projectObjective", "Revente, Location...", "text", true)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Criteria Section */}
          <Card className="border-border bg-card animate-fade-in-up-delay-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {t("profile.client.criteria.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 pt-1">
                  {isEditing ? <Building2 className="h-5 w-5 text-primary" /> : <Home className="h-6 w-6 text-primary" />}
                </div>
                <div className="w-full">
                  {renderInput(t("profile.client.criteria.propertyType"), "propertyType", "Appartement, Maison...")}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 pt-1">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="w-full">{renderInput(t("profile.client.criteria.location"), "location", "Ville, Quartier...")}</div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 pt-1">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <div className="w-full">{renderInput(t("profile.client.criteria.budget"), "budget", "Votre budget max")}</div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 pt-1">
                  {isEditing ? <Target className="h-5 w-5 text-primary" /> : <Building2 className="h-6 w-6 text-primary" />}
                </div>
                <div className="w-full">{renderInput(t("profile.client.criteria.surface"), "surface", "Surface min (m²)")}</div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Status - Unchanged */}
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
