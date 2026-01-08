"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import type {
  UserType,
  ClientSubtype,
  ExpertSubtype,
  ExpertProfile,
  ClientProfile,
  UserRole,
  DocumentStatus,
  User,
} from "@/providers/auth-provider";
import { clientDocuments, expertDocuments, clientSubtypeLabelKeys, expertSubtypeLabelKeys } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Briefcase,
  CheckCircle2,
  Upload,
  ShoppingCart,
  Tag,
  Building,
  Key,
  Hammer,
  Scale,
  ClipboardCheck,
  Building2,
  HardHat,
  Camera,
  Landmark,
  Wrench,
  Mail,
  Calendar,
  User as UserIcon,
  FileText,
  Shield,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

// Icon mapping for client subtypes
const clientSubtypeIcons: Record<ClientSubtype, React.ElementType> = {
  acheteur: ShoppingCart,
  vendeur: Tag,
  bailleur: Building,
  locataire: Key,
  renovateur: Hammer,
};

// Icon mapping for expert subtypes
const expertSubtypeIcons: Record<ExpertSubtype, React.ElementType> = {
  notaire: Scale,
  diagnostiqueur: ClipboardCheck,
  marchand: Building2,
  maitre_oeuvre: HardHat,
  promoteur: Building,
  photographe: Camera,
  courtier: Landmark,
  artisan: Wrench,
};

// Client subtype description keys for i18n
const clientSubtypeDescriptionKeys: Record<ClientSubtype, string> = {
  acheteur: "data.clientSubtypes.acheteur.description",
  vendeur: "data.clientSubtypes.vendeur.description",
  bailleur: "data.clientSubtypes.bailleur.description",
  locataire: "data.clientSubtypes.locataire.description",
  renovateur: "data.clientSubtypes.renovateur.description",
};

// Expert subtype description keys for i18n
const expertSubtypeDescriptionKeys: Record<ExpertSubtype, string> = {
  notaire: "data.expertSubtypes.notaire.description",
  diagnostiqueur: "data.expertSubtypes.diagnostiqueur.description",
  marchand: "data.expertSubtypes.marchand.description",
  maitre_oeuvre: "data.expertSubtypes.maitre_oeuvre.description",
  promoteur: "data.expertSubtypes.promoteur.description",
  photographe: "data.expertSubtypes.photographe.description",
  courtier: "data.expertSubtypes.courtier.description",
  artisan: "data.expertSubtypes.artisan.description",
};

export default function Journey() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, addRole, user, isAuthenticated } = useAuth();

  // Check if we're adding a role to an existing account
  const isAddingRole = isAuthenticated && location.state?.addingRole === true;

  // Mode: "register" or "login" or "addRole"
  const [mode, setMode] = useState<"register" | "login" | "addRole">(isAddingRole ? "addRole" : "register");

  // Current step: 1 = Personal Info, 2 = Type Selection, 3 = Subtype & Documents
  // If adding role, start at step 2
  const [step, setStep] = useState(isAddingRole ? 2 : 1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [subtype, setSubtype] = useState<ClientSubtype | ExpertSubtype | null>(null);

  // Step 1 - Personal information (pre-filled if adding role)
  const [personalData, setPersonalData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    preferredName: user?.preferredName || "",
    dateOfBirth: user?.dateOfBirth || "",
    email: user?.email || "",
    termsAccepted: user?.termsAccepted || false,
  });

  // Step 3 - Documents
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  // Client-specific data (for acheteur)
  const [clientData] = useState({
    propertyType: "",
    location: "",
    budget: "",
    rooms: "",
    surface: "",
    maritalStatus: "",
  });

  // Expert-specific data
  const [expertData] = useState({
    company: "",
    siret: "",
    yearsExperience: "",
    expertise: [] as string[],
    zones: [] as string[],
    certifications: [] as string[],
  });

  const getTotalSteps = () => 3;
  const progress = (step / getTotalSteps()) * 100;

  // Validate age (must be 18+)
  const validateAge = (dateString: string): boolean => {
    if (!dateString) return false;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  // Check if step 1 is valid (disabled for demo - all fields optional)
  const isStep1Valid = (): boolean => {
    return true; // Demo mode: always valid
  };

  const handleNext = () => {
    // Demo mode: no validation required
    if (step < getTotalSteps()) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 3) {
        setSubtype(null);
      }
      if (step === 2) {
        setUserType(null);
      }
      setStep(step - 1);
    }
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(3);
  };

  const handleSubtypeSelect = (selectedSubtype: ClientSubtype | ExpertSubtype) => {
    setSubtype(selectedSubtype);
  };

  const toggleDocument = (doc: string) => {
    if (uploadedDocuments.includes(doc)) {
      setUploadedDocuments(uploadedDocuments.filter((d) => d !== doc));
    } else {
      setUploadedDocuments([...uploadedDocuments, doc]);
    }
  };

  const getRequiredDocuments = (): string[] => {
    if (!userType || !subtype) return [];
    return userType === "client" ? clientDocuments[subtype as ClientSubtype] : expertDocuments[subtype as ExpertSubtype];
  };

  const handleComplete = () => {
    if (!userType || !subtype) return;

    const documents: DocumentStatus[] = getRequiredDocuments().map((doc) => ({
      name: doc,
      uploaded: uploadedDocuments.includes(doc),
      verified: false,
    }));

    let profile: ClientProfile | ExpertProfile;

    if (userType === "client") {
      profile = {
        propertyType: clientData.propertyType || "À définir",
        location: clientData.location || "À définir",
        budget: clientData.budget || "À définir",
        rooms: clientData.rooms || "À définir",
        surface: clientData.surface || "À définir",
        maritalStatus: clientData.maritalStatus || "À définir",
        solvabilityScore: 8.5,
        borrowingCapacity: "350 000 €",
        estimatedRate: "3.2%",
      } as ClientProfile;
    } else {
      profile = {
        certifications: expertData.certifications,
        expertise: expertData.expertise,
        zones: expertData.zones,
        yearsExperience: parseInt(expertData.yearsExperience) || 5,
        completedProjects: 0,
        company: expertData.company,
        siret: expertData.siret,
      } as ExpertProfile;
    }

    const role: UserRole = {
      type: userType,
      subtype: subtype,
      documents: documents,
      profile: profile,
      createdAt: new Date().toISOString(),
    };

    // If adding role to existing user, use addRole
    if (isAddingRole && user) {
      addRole(role);
      toast.success(
        t("journey.step3.summary.roleAddedSuccess", {
          role: t(
            userType === "client" ? clientSubtypeLabelKeys[subtype as ClientSubtype] : expertSubtypeLabelKeys[subtype as ExpertSubtype],
          ),
        }),
      );
      navigate("/dashboard");
      return;
    }

    // Otherwise create new user
    const newUser: User = {
      id: Date.now().toString(),
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      preferredName: personalData.preferredName || undefined,
      dateOfBirth: personalData.dateOfBirth,
      email: personalData.email,
      termsAccepted: personalData.termsAccepted,
      roles: [role],
      activeRoleIndex: 0,
      // Legacy fields
      name: `${personalData.firstName} ${personalData.lastName}`,
      userType: userType,
      ...(userType === "expert" ? { expertProfile: profile as ExpertProfile } : { clientProfile: profile as ClientProfile }),
    };

    login(newUser);
    localStorage.setItem("journeyCompleted", "true");
    toast.success("Profil créé avec succès !");
    navigate("/profile");
  };

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
          <div className="max-w-3xl mx-auto">
            {/* Mode Toggle - Hide if adding role */}
            {!isAddingRole && (
              <div className="flex justify-center mb-6 animate-fade-in-up">
                <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
                  <button
                    onClick={() => setMode("register")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      mode === "register" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t("journey.modeToggle.createAccount")}
                  </button>
                  <button
                    onClick={() => setMode("login")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      mode === "login" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t("journey.modeToggle.login")}
                  </button>
                </div>
              </div>
            )}

            {/* Add Role Mode */}
            {mode === "addRole" && user && (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent mb-4">
                  <Users className="h-4 w-4" />
                  {user.firstName} {user.lastName}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">{t("journey.addRole.title")}</h1>
                <p className="text-muted-foreground animate-fade-in-up-delay-1">{t("journey.addRole.description")}</p>
                <div className="mt-6 animate-fade-in-up-delay-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("journey.addRole.step", { current: step - 1, total: 2 })}
                    </span>
                    <span className="text-sm text-muted-foreground">{Math.round(((step - 1) / 2) * 100)}%</span>
                  </div>
                  <Progress value={((step - 1) / 2) * 100} className="h-2" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span className={step >= 2 ? "text-accent font-medium" : ""}>{t("journey.addRole.profileType")}</span>
                    <span className={step >= 3 ? "text-accent font-medium" : ""}>{t("journey.addRole.finalization")}</span>
                  </div>
                </div>
              </>
            )}

            {/* Register Mode */}
            {mode === "register" && (
              <>
                <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">{t("journey.register.title")}</h1>
                <p className="text-muted-foreground animate-fade-in-up-delay-1">{t("journey.register.description")}</p>
                <div className="mt-6 animate-fade-in-up-delay-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("journey.register.step", { current: step, total: getTotalSteps() })}
                    </span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span className={step >= 1 ? "text-primary font-medium" : ""}>{t("journey.register.information")}</span>
                    <span className={step >= 2 ? "text-primary font-medium" : ""}>{t("journey.register.profileType")}</span>
                    <span className={step >= 3 ? "text-primary font-medium" : ""}>{t("journey.register.finalization")}</span>
                  </div>
                </div>
              </>
            )}

            {/* Login Mode */}
            {mode === "login" && (
              <>
                <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">{t("journey.login.title")}</h1>
                <p className="text-muted-foreground animate-fade-in-up-delay-1">{t("journey.login.description")}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* LOGIN MODE */}
          {mode === "login" && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Demo Login Card */}
              <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent">
                      <Briefcase className="h-4 w-4" />
                      {t("journey.login.demoBadge")}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Sophie Martin</h2>
                    <p className="text-muted-foreground">sophie.martin@demo.fr</p>
                  </div>

                  {/* Demo Profile Roles */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground text-center">{t("journey.login.demoRoles")} :</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
                        <ClipboardCheck className="h-8 w-8 text-accent mx-auto mb-2" />
                        <p className="font-semibold text-foreground">{t("data.expertSubtypes.diagnostiqueur.label")}</p>
                        <p className="text-xs text-muted-foreground">{t("journey.login.demoRole.expert")}</p>
                        <p className="text-xs text-accent mt-1">{t("journey.login.demoRole.projects", { count: 156 })}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                        <Key className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold text-foreground">{t("data.clientSubtypes.locataire.label")}</p>
                        <p className="text-xs text-muted-foreground">{t("journey.login.demoRole.client")} - Lyon 6ème</p>
                        <p className="text-xs text-primary mt-1">1 200 €/{t("journey.login.demoRole.perMonth")}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                        <Hammer className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold text-foreground">{t("data.clientSubtypes.renovateur.label")}</p>
                        <p className="text-xs text-muted-foreground">{t("journey.login.demoRole.client")} - Villeurbanne</p>
                        <p className="text-xs text-primary mt-1">80 000 € {t("journey.login.demoRole.works")}</p>
                      </div>
                    </div>
                  </div>

                  {/* What you can test */}
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <p className="text-sm font-semibold text-foreground">{t("journey.login.testFeatures")} :</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {t("journey.login.testFeature1")}</li>
                      <li>• {t("journey.login.testFeature2")}</li>
                      <li>• {t("journey.login.testFeature3")}</li>
                      <li>• {t("journey.login.testFeature4")}</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => {
                      loginDemo();
                      toast.success(t("journey.login.successMessage"));
                      navigate("/dashboard");
                    }}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-lg"
                  >
                    {t("journey.login.loginAs")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Alternative: create account */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("journey.login.noAccount")}{" "}
                  <button onClick={() => setMode("register")} className="text-primary font-medium hover:underline">
                    {t("journey.modeToggle.createAccount")}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* REGISTER MODE - Step 1 - Personal Information */}
          {mode === "register" && step === 1 && (
            <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                    <UserIcon className="h-4 w-4" />
                    {t("journey.step1.badge")}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{t("journey.step1.title")}</h2>
                  <p className="text-muted-foreground">{t("journey.step1.description")}</p>
                </div>

                <div className="space-y-6 stagger-animation">
                  {/* First Name */}
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-base font-semibold">
                      {t("journey.step1.firstName")} *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Jean"
                      value={personalData.firstName}
                      onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-base font-semibold">
                      {t("journey.step1.lastName")} *
                    </Label>
                    <p className="text-sm text-muted-foreground">{t("journey.step1.lastNameHint")}</p>
                    <Input
                      id="lastName"
                      placeholder="Dupont"
                      value={personalData.lastName}
                      onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  {/* Preferred Name (Optional) */}
                  <div className="space-y-3">
                    <Label htmlFor="preferredName" className="text-base font-semibold">
                      {t("journey.step1.preferredName")}
                    </Label>
                    <p className="text-sm text-muted-foreground">{t("journey.step1.preferredNameHint")}</p>
                    <Input
                      id="preferredName"
                      placeholder="Johnny"
                      value={personalData.preferredName}
                      onChange={(e) => setPersonalData({ ...personalData, preferredName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-3">
                    <Label htmlFor="dateOfBirth" className="text-base font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {t("journey.step1.dateOfBirth")} *
                    </Label>
                    <p className="text-sm text-muted-foreground">{t("journey.step1.dateOfBirthHint")}</p>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalData.dateOfBirth}
                      onChange={(e) => setPersonalData({ ...personalData, dateOfBirth: e.target.value })}
                      className="h-12"
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                    />
                    {personalData.dateOfBirth && !validateAge(personalData.dateOfBirth) && (
                      <p className="text-sm text-destructive">{t("journey.step1.ageError")}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t("journey.step1.email")} *
                    </Label>
                    <p className="text-sm text-muted-foreground">{t("journey.step1.emailHint")}</p>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean.dupont@exemple.fr"
                      value={personalData.email}
                      onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4 p-6 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">{t("journey.step1.terms.title")}</span>
                        <p className="text-xs text-muted-foreground">{t("journey.step1.terms.hint")}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pl-2">
                      <p className="text-sm text-muted-foreground">{t("journey.step1.terms.intro")}</p>
                      <ul className="space-y-1.5 text-sm">
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • {t("journey.step1.terms.generalTerms")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • {t("journey.step1.terms.paymentTerms")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • {t("journey.step1.terms.nonDiscrimination")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • {t("journey.step1.terms.privacy")}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                      <Checkbox
                        id="terms"
                        checked={personalData.termsAccepted}
                        onCheckedChange={(checked: boolean) => setPersonalData({ ...personalData, termsAccepted: checked })}
                      />
                      <Label htmlFor="terms" className="text-sm font-medium text-foreground cursor-pointer">
                        {t("journey.step1.terms.accept")}
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleNext}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!isStep1Valid()}
                  >
                    {t("common.continue")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2 - User Type Selection */}
          {(mode === "register" || mode === "addRole") && step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{t("journey.step2.title")}</h2>
                <p className="text-muted-foreground">{t("journey.step2.description")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Card */}
                <Card
                  className="border-2 border-border hover:border-primary cursor-pointer transition-all card-hover-lift shine-effect"
                  onClick={() => handleUserTypeSelect("client")}
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">{t("journey.step2.client.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("journey.step2.client.description")}</p>
                    </div>
                    <ul className="text-left space-y-2">
                      {[t("journey.step2.client.feature1"), t("journey.step2.client.feature2"), t("journey.step2.client.feature3")].map(
                        (feature, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {t("journey.step2.client.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Expert Card */}
                <Card
                  className="border-2 border-border hover:border-accent cursor-pointer transition-all card-hover-lift shine-effect"
                  onClick={() => handleUserTypeSelect("expert")}
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-accent to-primary mx-auto flex items-center justify-center">
                      <Briefcase className="h-10 w-10 text-accent-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">{t("journey.step2.expert.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("journey.step2.expert.description")}</p>
                    </div>
                    <ul className="text-left space-y-2">
                      {[t("journey.step2.expert.feature1"), t("journey.step2.expert.feature2"), t("journey.step2.expert.feature3")].map(
                        (feature, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      {t("journey.step2.expert.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-start pt-4">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-5 w-5" /> {t("common.back")}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 - Subtype Selection & Documents */}
          {(mode === "register" || mode === "addRole") && step === 3 && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Subtype Selection */}
              {!subtype && (
                <>
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary mb-2">
                      {userType === "client" ? <Users className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                      {userType === "client" ? t("journey.step3.clientTitle") : t("journey.step3.expertTitle")}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {userType === "client" ? t("journey.step3.clientQuestion") : t("journey.step3.expertQuestion")}
                    </h2>
                    <p className="text-muted-foreground">{t("journey.step3.selectProfile")}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userType === "client"
                      ? // Client subtypes
                        (Object.keys(clientSubtypeLabelKeys) as ClientSubtype[]).map((key) => {
                          const Icon = clientSubtypeIcons[key];
                          const alreadyHasRole = user?.roles.some((r) => r.subtype === key) ?? false;
                          return (
                            <Card
                              key={key}
                              className={`border-2 transition-all ${
                                alreadyHasRole
                                  ? "border-muted bg-muted/30 opacity-60 cursor-not-allowed"
                                  : "border-border hover:border-primary cursor-pointer card-hover-lift"
                              }`}
                              onClick={() => !alreadyHasRole && handleSubtypeSelect(key)}
                            >
                              <CardContent className="p-6 text-center space-y-4">
                                <div
                                  className={`h-14 w-14 rounded-full mx-auto flex items-center justify-center ${alreadyHasRole ? "bg-muted" : "bg-primary/10"}`}
                                >
                                  <Icon className={`h-7 w-7 ${alreadyHasRole ? "text-muted-foreground" : "text-primary"}`} />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground flex items-center justify-center gap-2">
                                    {t(clientSubtypeLabelKeys[key])}
                                    {alreadyHasRole && (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted-foreground/20 text-muted-foreground">
                                        {t("journey.step3.alreadyAdded")}
                                      </span>
                                    )}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1">{t(clientSubtypeDescriptionKeys[key])}</p>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      : // Expert subtypes
                        (Object.keys(expertSubtypeLabelKeys) as ExpertSubtype[]).map((key) => {
                          const Icon = expertSubtypeIcons[key];
                          const alreadyHasRole = user?.roles.some((r) => r.subtype === key) ?? false;
                          return (
                            <Card
                              key={key}
                              className={`border-2 transition-all ${
                                alreadyHasRole
                                  ? "border-muted bg-muted/30 opacity-60 cursor-not-allowed"
                                  : "border-border hover:border-accent cursor-pointer card-hover-lift"
                              }`}
                              onClick={() => !alreadyHasRole && handleSubtypeSelect(key)}
                            >
                              <CardContent className="p-6 text-center space-y-4">
                                <div
                                  className={`h-14 w-14 rounded-full mx-auto flex items-center justify-center ${alreadyHasRole ? "bg-muted" : "bg-accent/10"}`}
                                >
                                  <Icon className={`h-7 w-7 ${alreadyHasRole ? "text-muted-foreground" : "text-accent"}`} />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground flex items-center justify-center gap-2">
                                    {t(expertSubtypeLabelKeys[key])}
                                    {alreadyHasRole && (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted-foreground/20 text-muted-foreground">
                                        {t("journey.step3.alreadyAdded")}
                                      </span>
                                    )}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1">{t(expertSubtypeDescriptionKeys[key])}</p>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                  </div>

                  <div className="flex justify-start pt-4">
                    <Button onClick={handleBack} variant="outline">
                      <ArrowLeft className="mr-2 h-5 w-5" /> {t("common.back")}
                    </Button>
                  </div>
                </>
              )}

              {/* Documents Upload */}
              {subtype && (
                <div className="space-y-6">
                  <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
                    <CardContent className="p-8 space-y-8">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                          <FileText className="h-4 w-4" />
                          {t("journey.step3.documents.badge")}
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {t("journey.step3.documents.title")}{" "}
                          {userType === "client"
                            ? t(clientSubtypeLabelKeys[subtype as ClientSubtype])
                            : t(expertSubtypeLabelKeys[subtype as ExpertSubtype])}
                        </h2>
                        <p className="text-muted-foreground">{t("journey.step3.documents.description")}</p>
                      </div>

                      <div className="space-y-3 stagger-animation">
                        {getRequiredDocuments().map((doc) => (
                          <div
                            key={doc}
                            className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox id={doc} checked={uploadedDocuments.includes(doc)} onCheckedChange={() => toggleDocument(doc)} />
                              <Label htmlFor={doc} className="cursor-pointer font-normal">
                                {doc}
                              </Label>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">
                              <Upload className="h-4 w-4 mr-2" />
                              {t("journey.step3.documents.upload")}
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">💡 {t("journey.step3.documents.tipTitle")} :</span>{" "}
                          {t("journey.step3.documents.tipText")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {subtype !== "notaire" && (
                    <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Scale className="h-8 w-8 text-accent" />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg font-semibold text-foreground mb-1">{t("journey.step3.notaryHelp.title")}</h3>
                            <p className="text-sm text-muted-foreground">{t("journey.step3.notaryHelp.description")}</p>
                          </div>
                          <Button
                            variant="outline"
                            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                            onClick={() => toast.success(t("journey.step3.notaryHelp.successMessage"))}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {t("journey.step3.notaryHelp.cta")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Account Review Summary */}
                  <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent">
                          <CheckCircle2 className="h-4 w-4" />
                          {t("journey.step3.summary.badge")}
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">{t("journey.step3.summary.title")}</h2>
                        <p className="text-muted-foreground">{t("journey.step3.summary.description")}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Info */}
                        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-primary" />
                            {t("journey.step3.summary.personalInfo")}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">{t("journey.step3.summary.name")} :</span>{" "}
                              <span className="font-medium">
                                {personalData.firstName || t("journey.step3.summary.notProvided")} {personalData.lastName || ""}
                              </span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Email :</span>{" "}
                              <span className="font-medium">{personalData.email || t("journey.step3.summary.notProvided")}</span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">{t("journey.step3.summary.dateOfBirth")} :</span>{" "}
                              <span className="font-medium">{personalData.dateOfBirth || t("journey.step3.summary.notProvided")}</span>
                            </p>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            {userType === "expert" ? (
                              <Briefcase className="h-4 w-4 text-accent" />
                            ) : (
                              <Users className="h-4 w-4 text-primary" />
                            )}
                            {t("journey.step3.summary.accountType")}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">{t("journey.step3.summary.type")} :</span>{" "}
                              <span className="font-medium capitalize">{userType}</span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">{t("journey.step3.summary.profile")} :</span>{" "}
                              <span className="font-medium">
                                {userType === "client"
                                  ? t(clientSubtypeLabelKeys[subtype as ClientSubtype])
                                  : t(expertSubtypeLabelKeys[subtype as ExpertSubtype])}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Documents */}
                        <div className="p-4 rounded-lg bg-muted/50 space-y-3 md:col-span-2">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {t("journey.step3.summary.documents")} ({uploadedDocuments.length}/{getRequiredDocuments().length}{" "}
                            {t("journey.step3.summary.selected")})
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {getRequiredDocuments().map((doc) => (
                              <span
                                key={doc}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  uploadedDocuments.includes(doc) ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {uploadedDocuments.includes(doc) ? "✓ " : ""}
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-border">
                        <Button onClick={() => setSubtype(null)} variant="outline">
                          <ArrowLeft className="mr-2 h-5 w-5" /> {t("common.back")}
                        </Button>
                        <Button
                          onClick={handleComplete}
                          className={`${userType === "expert" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                        >
                          {isAddingRole ? t("journey.step3.summary.addRole") : t("journey.step3.summary.createAccount")}{" "}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
