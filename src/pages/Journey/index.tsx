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
  Search,
  Link as LinkIcon,
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
  const [clientData, setClientData] = useState({
    propertyType: "",
    location: "",
    budget: "",
    rooms: "",
    surface: "",
    exterior: "",
    comfort: "",
    environment: "",
    projectType: "",
    buyerProfile: "",
    maritalStatus: "",
    usage: "",
    strategy: "",
    fiscal: "",
    legalStructure: "",
    solvencyStatus: null as "success" | "failure" | null,
  });

  const [buyerStep, setBuyerStep] = useState(1); // 1 = Criteria, 2 = Legal, 3 = Solvency
  const [sellerStep, setSellerStep] = useState(1); // 1 = Criteria/Questions, 2 = Documents

  const [sellerData, setSellerData] = useState({
    location: "",
    price: "",
    type: "",
    details: "", // surface/rooms
    exterior: "", // jardin/balcon
    comfort: "", // ascenseur/dpe
    environment: "", // transport/ecole
    situation: "", // pourquoi vente
  });

  const [landlordStep, setLandlordStep] = useState(1); // 1 = Criteria, 2 = Legal, 3 = Ad
  const [landlordData, setLandlordData] = useState({
    // Module 1: Criteria
    location: "",
    type: "",
    comfort: "",
    state: "",
    rent: "",
    tenantProfile: "",
    leaseType: "",
    management: "",
    // Module 2: Legal
    zone: "",
    nature: "",
    objective: "",
    legalForm: "",
    taxRegime: "",
    leaseEnvisioned: "",
    managementMode: "",
    // Module 3: Ad (Mock)
    adPhotos: false,
    adTitle: "",
    adDescription: "",
    adPrice: "",
  });

  const [tenantStep, setTenantStep] = useState(1); // 1 = Criteria, 2 = Profile
  const [tenantData, setTenantData] = useState({
    // Module 1: Criteria
    location: "",
    budget: "",
    type: "",
    surface: "",
    exterior: "",
    comfort: "",
    environment: "",
    project: "",
    // Module 2: Profile
    bio: "",
    description: "",
    situation: "",
    points: [] as string[],
  });

  const [renovatorStep, setRenovatorStep] = useState(1); // 1 = Criteria, 2 = Docs, 3 = Solvency
  const [renovatorData, setRenovatorData] = useState({
    // Criteria
    location: "", // q1
    budget: "", // q2
    type: "", // q3
    surface: "", // q4
    exterior: "", // q5
    performance: "", // q6
    constraints: "", // q7
    project: "", // q8
    // Solvency
    solvencyStatus: false,
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
      if (subtype === "bailleur") {
        profile = {
          propertyType: landlordData.type || "À définir",
          location: landlordData.location || "À définir",
          budget: landlordData.rent || "À définir",
          rooms: "N/A",
          surface: "N/A",
          maritalStatus: "N/A",
          solvabilityScore: undefined,
          borrowingCapacity: undefined,
          estimatedRate: undefined,
        } as ClientProfile;
      } else if (subtype === "vendeur") {
        profile = {
          propertyType: sellerData.type || "À définir",
          location: sellerData.location || "À définir",
          budget: sellerData.price || "À définir",
          rooms: sellerData.details || "À définir",
          surface: sellerData.details || "À définir",
          maritalStatus: sellerData.situation || "À définir",
          solvabilityScore: undefined,
          borrowingCapacity: undefined,
          estimatedRate: undefined,
        } as ClientProfile;
      } else if (subtype === "locataire") {
        profile = {
          propertyType: tenantData.type || "À définir",
          location: tenantData.location || "À définir",
          budget: tenantData.budget || "À définir",
          rooms: tenantData.surface || "À définir",
          surface: tenantData.surface || "À définir",
          maritalStatus: tenantData.situation || "À définir",
          solvabilityScore: undefined,
          borrowingCapacity: undefined,
          estimatedRate: undefined,
        } as ClientProfile;
      } else if (subtype === "renovateur") {
        profile = {
          propertyType: renovatorData.type || "À définir",
          location: renovatorData.location || "À définir",
          budget: renovatorData.budget || "À définir",
          rooms: renovatorData.surface || "À définir",
          surface: renovatorData.surface || "À définir",
          // Mapping other specific fields to existing profile or ignoring for now
          // Ideally we extend ClientProfile
          maritalStatus: "N/A",
          solvabilityScore: renovatorData.solvencyStatus ? 9.0 : undefined,
          borrowingCapacity: undefined,
          estimatedRate: undefined,
        } as ClientProfile;
      } else {
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
      }
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

              {/* Documents Upload (Standard) OR Buyer/Seller/Landlord Modules (Special) */}
              {subtype && (
                <div className="space-y-6">
                  {/* LANDLORD SPECIAL JOURNEY */}
                  {userType === "client" && subtype === "bailleur" ? (
                    <div className="space-y-6">
                      {/* Module 1: Rental Criteria */}
                      {landlordStep === 1 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Building className="h-4 w-4" />
                                Module 1/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.landlord.module1.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.landlord.module1.description")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q1")}</Label>
                                <Input
                                  value={landlordData.location}
                                  onChange={(e) => setLandlordData({ ...landlordData, location: e.target.value })}
                                  placeholder="Ex: Lyon 3ème"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q2")}</Label>
                                <Input
                                  value={landlordData.type}
                                  onChange={(e) => setLandlordData({ ...landlordData, type: e.target.value })}
                                  placeholder="Ex: T2, 45m², Ancien"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q3")}</Label>
                                <Input
                                  value={landlordData.comfort}
                                  onChange={(e) => setLandlordData({ ...landlordData, comfort: e.target.value })}
                                  placeholder="Ex: Balcon, Ascenseur..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q4")}</Label>
                                <Input
                                  value={landlordData.state}
                                  onChange={(e) => setLandlordData({ ...landlordData, state: e.target.value })}
                                  placeholder="Ex: Bon état, DPE C"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q5")}</Label>
                                <Input
                                  value={landlordData.rent}
                                  onChange={(e) => setLandlordData({ ...landlordData, rent: e.target.value })}
                                  placeholder="Ex: 800€ CC"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q6")}</Label>
                                <Input
                                  value={landlordData.tenantProfile}
                                  onChange={(e) => setLandlordData({ ...landlordData, tenantProfile: e.target.value })}
                                  placeholder="Ex: Étudiant, Couple..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q7")}</Label>
                                <Input
                                  value={landlordData.leaseType}
                                  onChange={(e) => setLandlordData({ ...landlordData, leaseType: e.target.value })}
                                  placeholder="Ex: Meublé 1 an"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module1.q8")}</Label>
                                <Input
                                  value={landlordData.management}
                                  onChange={(e) => setLandlordData({ ...landlordData, management: e.target.value })}
                                  placeholder="Ex: Gestion déléguée"
                                />
                              </div>
                            </div>

                            {/* Documents Module 1 */}
                            <div className="mt-6 p-6 bg-muted/30 rounded-lg border border-border">
                              <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                {t("journey.landlord.module1.docs.title")}
                              </h3>
                              <div className="space-y-3">
                                {[
                                  "journey.landlord.module1.docs.d1",
                                  "journey.landlord.module1.docs.d2",
                                  "journey.landlord.module1.docs.d3",
                                  "journey.landlord.module1.docs.d4",
                                  "journey.landlord.module1.docs.d5",
                                  "journey.landlord.module1.docs.d7",
                                  "journey.landlord.module1.docs.d8",
                                ].map((key) => (
                                  <div key={key} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">• {t(key)}</span>
                                    <Button variant="ghost" size="sm" className="h-6 text-primary">
                                      <Upload className="h-3 w-3 mr-1" /> Importer
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-end pt-4">
                              <Button onClick={() => setLandlordStep(2)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 2: Legal & Fiscal */}
                      {landlordStep === 2 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Scale className="h-4 w-4" />
                                Module 2/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.landlord.module2.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.landlord.module2.description")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module2.q1")}</Label>
                                <Input
                                  value={landlordData.zone}
                                  onChange={(e) => setLandlordData({ ...landlordData, zone: e.target.value })}
                                  placeholder="Ex: Zone tendue"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module2.q2")}</Label>
                                <Input
                                  value={landlordData.nature}
                                  onChange={(e) => setLandlordData({ ...landlordData, nature: e.target.value })}
                                  placeholder="Ex: Meublé"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module2.q3")}</Label>
                                <Input
                                  value={landlordData.objective}
                                  onChange={(e) => setLandlordData({ ...landlordData, objective: e.target.value })}
                                  placeholder="Ex: Complément de revenus"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module2.q4")}</Label>
                                <Input
                                  value={landlordData.legalForm}
                                  onChange={(e) => setLandlordData({ ...landlordData, legalForm: e.target.value })}
                                  placeholder="Ex: LMNP"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module2.q5")}</Label>
                                <Input
                                  value={landlordData.taxRegime}
                                  onChange={(e) => setLandlordData({ ...landlordData, taxRegime: e.target.value })}
                                  placeholder="Ex: Réel"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.landlord.module2.q6")}</Label>
                                <Input
                                  value={landlordData.leaseEnvisioned}
                                  onChange={(e) => setLandlordData({ ...landlordData, leaseEnvisioned: e.target.value })}
                                  placeholder="Ex: Bail étudiant 9 mois"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label>{t("journey.landlord.module2.q7")}</Label>
                                <Input
                                  value={landlordData.managementMode}
                                  onChange={(e) => setLandlordData({ ...landlordData, managementMode: e.target.value })}
                                  placeholder="Ex: Gestion directe"
                                />
                              </div>
                            </div>

                            {/* Documents Module 2 */}
                            <div className="mt-6 p-6 bg-muted/30 rounded-lg border border-border">
                              <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                {t("journey.landlord.module2.docs.title")}
                              </h3>
                              <div className="space-y-3">
                                {[
                                  "journey.landlord.module2.docs.d1",
                                  "journey.landlord.module2.docs.d4",
                                  "journey.landlord.module2.docs.d5",
                                  "journey.landlord.module2.docs.d6",
                                  "journey.landlord.module2.docs.d7",
                                ].map((key) => (
                                  <div key={key} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">• {t(key)}</span>
                                    <Button variant="ghost" size="sm" className="h-6 text-primary">
                                      <Upload className="h-3 w-3 mr-1" /> Importer
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setLandlordStep(1)}>
                                {t("common.back")}
                              </Button>
                              <Button onClick={() => setLandlordStep(3)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 3: Ad Creation */}
                      {landlordStep === 3 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Tag className="h-4 w-4" />
                                Module 3/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.landlord.module3.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.landlord.module3.description")}</p>
                            </div>

                            <div className="space-y-8">
                              {/* Step 1: Photos */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                    1
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{t("journey.landlord.module3.step1")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("journey.landlord.module3.step1Desc")}</p>
                                  </div>
                                </div>
                                <div className="ml-11 border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
                                  <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-sm text-muted-foreground">Glissez vos photos ici</p>
                                </div>
                              </div>

                              {/* Step 2: Title */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                    2
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{t("journey.landlord.module3.step2")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("journey.landlord.module3.step2Desc")}</p>
                                  </div>
                                </div>
                                <Input
                                  className="ml-11 max-w-md"
                                  value={landlordData.adTitle}
                                  onChange={(e) => setLandlordData({ ...landlordData, adTitle: e.target.value })}
                                  placeholder="Ex: Superbe T2 rénové - Lyon 6ème"
                                />
                              </div>

                              {/* Step 3: Description */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                    3
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{t("journey.landlord.module3.step3")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("journey.landlord.module3.step3Desc")}</p>
                                  </div>
                                </div>
                                <textarea
                                  className="ml-11 max-w-md w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                  value={landlordData.adDescription}
                                  onChange={(e) => setLandlordData({ ...landlordData, adDescription: e.target.value })}
                                  placeholder="Décrivez votre bien..."
                                />
                              </div>

                              {/* Step 4: Price */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                    4
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{t("journey.landlord.module3.step4")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("journey.landlord.module3.step4Desc")}</p>
                                  </div>
                                </div>
                                <div className="ml-11 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                    Prix moyen constaté dans votre secteur : <strong>18€/m²</strong>
                                  </p>
                                  <Input
                                    className="max-w-[200px]"
                                    value={landlordData.adPrice}
                                    onChange={(e) => setLandlordData({ ...landlordData, adPrice: e.target.value })}
                                    placeholder="Votre loyer HC"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between pt-8">
                              <Button variant="outline" onClick={() => setLandlordStep(2)}>
                                {t("common.back")}
                              </Button>
                              <Button onClick={handleComplete}>
                                <CheckCircle2 className="mr-2 h-4 w-4" /> {t("journey.landlord.module3.generate")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : userType === "client" && subtype === "acheteur" ? (
                    <div className="space-y-6">
                      {/* Module 1: Criteria */}
                      {buyerStep === 1 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Search className="h-4 w-4" />
                                Module 1/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.buyer.module1.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.buyer.module1.description")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label>{t("journey.buyer.module1.q1")}</Label>
                                <Input
                                  value={clientData.location}
                                  onChange={(e) => setClientData({ ...clientData, location: e.target.value })}
                                  placeholder="Ex: Paris 15ème"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.buyer.module1.q2")}</Label>
                                <Input
                                  value={clientData.budget}
                                  onChange={(e) => setClientData({ ...clientData, budget: e.target.value })}
                                  placeholder="Ex: 450 000 €"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.buyer.module1.q3")}</Label>
                                <Input
                                  value={clientData.propertyType}
                                  onChange={(e) => setClientData({ ...clientData, propertyType: e.target.value })}
                                  placeholder="Ex: Appartement, Maison..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.buyer.module1.q4")}</Label>
                                <Input
                                  value={clientData.surface}
                                  onChange={(e) => setClientData({ ...clientData, surface: e.target.value })}
                                  placeholder="Ex: 60m², 2 chambres"
                                />
                              </div>
                              {/* Add remaining Q5-Q8 placeholders */}
                              <div className="space-y-2 md:col-span-2">
                                <Label>{t("journey.buyer.module1.q8")}</Label>
                                <Input
                                  value={clientData.projectType}
                                  onChange={(e) => setClientData({ ...clientData, projectType: e.target.value })}
                                  placeholder="Ex: Résidence principale"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end pt-4">
                              <Button onClick={() => setBuyerStep(2)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 2: Legal/Docs */}
                      {buyerStep === 2 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Scale className="h-4 w-4" />
                                Module 2/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.buyer.module2.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.buyer.module2.description")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label>{t("journey.buyer.module2.q1")}</Label>
                                <Input
                                  value={clientData.buyerProfile}
                                  onChange={(e) => setClientData({ ...clientData, buyerProfile: e.target.value })}
                                  placeholder="Ex: Couple"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t("journey.buyer.module2.q2")}</Label>
                                <Input
                                  value={clientData.maritalStatus}
                                  onChange={(e) => setClientData({ ...clientData, maritalStatus: e.target.value })}
                                  placeholder="Ex: Mariés"
                                />
                              </div>
                              {/* Docs List Mock */}
                              <div className="md:col-span-2 p-4 bg-muted/50 rounded-lg space-y-3">
                                <h3 className="font-semibold flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  {t("journey.buyer.module2.docs.title")} (Simulation)
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-primary" /> {t("journey.buyer.module2.docs.id")}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-primary" /> {t("journey.buyer.module2.docs.tax")}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Notary Help Mock */}
                            <div className="p-4 rounded-lg border border-accent/20 bg-accent/5 flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-accent">{t("journey.buyer.module2.notary.title")}</h4>
                                <p className="text-sm text-muted-foreground">{t("journey.buyer.module2.notary.description")}</p>
                              </div>
                              <Button size="sm" variant="outline" className="border-accent text-accent">
                                {t("journey.buyer.module2.notary.cta")}
                              </Button>
                            </div>

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setBuyerStep(1)}>
                                {t("common.back")}
                              </Button>
                              <Button onClick={() => setBuyerStep(3)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 3: Solvency */}
                      {buyerStep === 3 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Landmark className="h-4 w-4" />
                                Module 3/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.buyer.module3.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.buyer.module3.description")}</p>
                            </div>

                            {!clientData.solvencyStatus ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                                <Card
                                  className="cursor-pointer hover:border-primary transition-all"
                                  onClick={() => setClientData({ ...clientData, solvencyStatus: "success" })}
                                >
                                  <CardContent className="p-6 text-center space-y-4">
                                    <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                      <LinkIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{t("journey.buyer.module3.directLink")}</h3>
                                    <p className="text-xs text-muted-foreground">Connexion bancaire sécurisée</p>
                                  </CardContent>
                                </Card>
                                <Card
                                  className="cursor-pointer hover:border-primary transition-all"
                                  onClick={() => setClientData({ ...clientData, solvencyStatus: "success" })}
                                >
                                  <CardContent className="p-6 text-center space-y-4">
                                    <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                      <Upload className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{t("journey.buyer.module3.upload")}</h3>
                                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG</p>
                                  </CardContent>
                                </Card>
                              </div>
                            ) : (
                              <div className="py-8 text-center space-y-4 animate-fade-in-up">
                                <div className="h-16 w-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{t("journey.buyer.module3.success")}</h3>
                                <p className="text-muted-foreground">{t("journey.buyer.module3.successDesc")}</p>
                              </div>
                            )}

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setBuyerStep(2)}>
                                {t("common.back")}
                              </Button>
                              <Button
                                onClick={handleComplete}
                                disabled={!clientData.solvencyStatus}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                              >
                                {t("journey.generateProfile")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : userType === "client" && subtype === "vendeur" ? (
                    // SELLER SPECIAL JOURNEY
                    <div className="space-y-6">
                      {/* Module 1: Seller Criteria */}
                      {sellerStep === 1 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Tag className="h-4 w-4" />
                                Module 1/2
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">Critères de vente</h2>
                              <p className="text-muted-foreground">
                                Définissez votre bien pour une estimation précise et un accompagnement sur mesure.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Q1 */}
                              <div className="space-y-2">
                                <Label>1. Adresse et Zone (Localisation)</Label>
                                <Input
                                  placeholder="Ex: 12 Rue de la Paix, Paris 75002 - Quartier Opéra"
                                  value={sellerData.location}
                                  onChange={(e) => setSellerData({ ...sellerData, location: e.target.value })}
                                />
                              </div>
                              {/* Q2 */}
                              <div className="space-y-2">
                                <Label>2. Prix souhaité & Négociation</Label>
                                <Input
                                  placeholder="Ex: 550 000 €, Ouvert à la négo"
                                  value={sellerData.price}
                                  onChange={(e) => setSellerData({ ...sellerData, price: e.target.value })}
                                />
                              </div>
                              {/* Q3 */}
                              <div className="space-y-2">
                                <Label>3. Type de bien & Ancienneté</Label>
                                <Input
                                  placeholder="Ex: Appartement, Ancien (1990)"
                                  value={sellerData.type}
                                  onChange={(e) => setSellerData({ ...sellerData, type: e.target.value })}
                                />
                              </div>
                              {/* Q4 */}
                              <div className="space-y-2">
                                <Label>4. Surface & Pièces</Label>
                                <Input
                                  placeholder="Ex: 85m², 4 pièces"
                                  value={sellerData.details}
                                  onChange={(e) => setSellerData({ ...sellerData, details: e.target.value })}
                                />
                              </div>
                              {/* Q5 */}
                              <div className="space-y-2">
                                <Label>5. Extérieur & Stationnement</Label>
                                <Input
                                  placeholder="Ex: Balcon 5m², Parking sous-sol"
                                  value={sellerData.exterior}
                                  onChange={(e) => setSellerData({ ...sellerData, exterior: e.target.value })}
                                />
                              </div>
                              {/* Q6 */}
                              <div className="space-y-2">
                                <Label>6. Confort & Prestations</Label>
                                <Input
                                  placeholder="Ex: Ascenseur, DPE D, Chauffage gaz"
                                  value={sellerData.comfort}
                                  onChange={(e) => setSellerData({ ...sellerData, comfort: e.target.value })}
                                />
                              </div>
                              {/* Q7 */}
                              <div className="space-y-2">
                                <Label>7. Environnement</Label>
                                <Input
                                  placeholder="Ex: Calme, Métro à 5min"
                                  value={sellerData.environment}
                                  onChange={(e) => setSellerData({ ...sellerData, environment: e.target.value })}
                                />
                              </div>
                              {/* Q8 */}
                              <div className="space-y-2">
                                <Label>8. Situation Vendeur</Label>
                                <Input
                                  placeholder="Ex: Mutation, Vente urgente avant Juillet"
                                  value={sellerData.situation}
                                  onChange={(e) => setSellerData({ ...sellerData, situation: e.target.value })}
                                />
                              </div>
                            </div>

                            <div className="flex justify-end pt-4">
                              <Button onClick={() => setSellerStep(2)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 2: Seller Documents */}
                      {sellerStep === 2 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <FileText className="h-4 w-4" />
                                Module 2/2
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">Remise de documents</h2>
                              <p className="text-muted-foreground">Documents obligatoires pour la visibilité des experts.</p>
                            </div>

                            <div className="space-y-4">
                              {[
                                "Titre de propriété ou acte notarié",
                                "Evaluation récente du bien / Montant crédit restant",
                                "Plan cadastral ou plan du bien",
                                "Plan cadastral extérieur",
                                "DPE / Certificat de conformité",
                                "Documents légaux (Succession/Indivision)",
                              ].map((doc, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <Checkbox
                                      id={`seller-doc-${idx}`}
                                      checked={uploadedDocuments.includes(doc)}
                                      onCheckedChange={() => toggleDocument(doc)}
                                    />
                                    <Label htmlFor={`seller-doc-${idx}`} className="cursor-pointer font-normal">
                                      {doc}
                                    </Label>
                                  </div>
                                  <Button variant="ghost" size="sm" className="text-primary">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Importer
                                  </Button>
                                </div>
                              ))}
                            </div>

                            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 flex gap-4 items-start">
                              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                                <Wrench className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-orange-800 dark:text-orange-200">Documents manquants ?</h4>
                                <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                                  Nos experts (Notaires, Diagnostiqueurs) peuvent vous aider à constituer votre dossier rapidement.
                                </p>
                                <Button size="sm" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-100">
                                  Demander de l'aide
                                </Button>
                              </div>
                            </div>

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setSellerStep(1)}>
                                {t("common.back")}
                              </Button>
                              <Button onClick={handleComplete}>
                                {t("journey.generateProfile")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : userType === "client" && subtype === "renovateur" ? (
                    // RENOVATOR SPECIAL JOURNEY
                    <div className="space-y-6">
                      {/* Module 1: Renovator Criteria */}
                      {renovatorStep === 1 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Wrench className="h-4 w-4" />
                                Module 1/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.renovator.module1.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.renovator.module1.description")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((qNum) => (
                                <div key={qNum} className="space-y-2">
                                  <Label>{t(`journey.renovator.module1.q${qNum}`)}</Label>
                                  <Input
                                    // Mapping qNum to data fields somewhat arbitrarily for this loop, or can be explicit
                                    value={
                                      qNum === 1
                                        ? renovatorData.location
                                        : qNum === 2
                                          ? renovatorData.budget
                                          : qNum === 3
                                            ? renovatorData.type
                                            : qNum === 4
                                              ? renovatorData.surface
                                              : qNum === 5
                                                ? renovatorData.exterior
                                                : qNum === 6
                                                  ? renovatorData.performance
                                                  : qNum === 7
                                                    ? renovatorData.constraints
                                                    : renovatorData.project
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      const key =
                                        qNum === 1
                                          ? "location"
                                          : qNum === 2
                                            ? "budget"
                                            : qNum === 3
                                              ? "type"
                                              : qNum === 4
                                                ? "surface"
                                                : qNum === 5
                                                  ? "exterior"
                                                  : qNum === 6
                                                    ? "performance"
                                                    : qNum === 7
                                                      ? "constraints"
                                                      : "project";
                                      setRenovatorData({ ...renovatorData, [key]: val });
                                    }}
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-end pt-4">
                              <Button onClick={() => setRenovatorStep(2)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 2: Renovator Documents */}
                      {renovatorStep === 2 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <FileText className="h-4 w-4" />
                                Module 2/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.renovator.module2.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.renovator.module2.description")}</p>
                            </div>

                            {/* Documents List */}
                            <div className="space-y-4 pt-4 border-t border-border">
                              <h3 className="font-semibold text-foreground">{t("journey.renovator.module2.docs.title")}</h3>
                              <div className="space-y-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((dNum) => (
                                  <div
                                    key={dNum}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Checkbox id={`renov-doc-${dNum}`} />
                                      <Label htmlFor={`renov-doc-${dNum}`} className="cursor-pointer font-normal">
                                        {t(`journey.renovator.module2.docs.d${dNum}`)}
                                      </Label>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-primary">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Importer
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setRenovatorStep(1)}>
                                {t("common.back")}
                              </Button>
                              <Button onClick={() => setRenovatorStep(3)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 3: Solvency */}
                      {renovatorStep === 3 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Landmark className="h-4 w-4" />
                                Module 3/3
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.renovator.module3.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.renovator.module3.description")}</p>
                            </div>

                            {!renovatorData.solvencyStatus ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                                <Card
                                  className="cursor-pointer hover:border-primary transition-all"
                                  onClick={() => setRenovatorData({ ...renovatorData, solvencyStatus: true })}
                                >
                                  <CardContent className="p-6 text-center space-y-4">
                                    <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                      <LinkIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{t("journey.renovator.module3.checkButton")}</h3>
                                  </CardContent>
                                </Card>
                                <Card
                                  className="cursor-pointer hover:border-primary transition-all"
                                  onClick={() => setRenovatorData({ ...renovatorData, solvencyStatus: true })}
                                >
                                  <CardContent className="p-6 text-center space-y-4">
                                    <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                                      <Upload className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{t("journey.renovator.module3.uploadButton")}</h3>
                                  </CardContent>
                                </Card>
                              </div>
                            ) : (
                              <div className="py-8 text-center space-y-4 animate-fade-in-up">
                                <div className="h-16 w-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{t("journey.renovator.module3.successTitle")}</h3>
                                <p className="text-muted-foreground">{t("journey.renovator.module3.successDesc")}</p>
                              </div>
                            )}

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setRenovatorStep(2)}>
                                {t("common.back")}
                              </Button>
                              <Button
                                onClick={handleComplete}
                                disabled={!renovatorData.solvencyStatus}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> {t("common.finish")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : userType === "client" && subtype === "locataire" ? (
                    // TENANT SPECIAL JOURNEY
                    <div className="space-y-6">
                      {/* Module 1: Tenant Criteria */}
                      {tenantStep === 1 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <Key className="h-4 w-4" />
                                Module 1/2
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.tenant.module1.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.tenant.module1.description")}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Q1 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q1")}</Label>
                                <Input
                                  value={tenantData.location}
                                  onChange={(e) => setTenantData({ ...tenantData, location: e.target.value })}
                                />
                              </div>
                              {/* Q2 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q2")}</Label>
                                <Input
                                  value={tenantData.budget}
                                  onChange={(e) => setTenantData({ ...tenantData, budget: e.target.value })}
                                />
                              </div>
                              {/* Q3 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q3")}</Label>
                                <Input value={tenantData.type} onChange={(e) => setTenantData({ ...tenantData, type: e.target.value })} />
                              </div>
                              {/* Q4 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q4")}</Label>
                                <Input
                                  value={tenantData.surface}
                                  onChange={(e) => setTenantData({ ...tenantData, surface: e.target.value })}
                                />
                              </div>
                              {/* Q5 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q5")}</Label>
                                <Input
                                  value={tenantData.exterior}
                                  onChange={(e) => setTenantData({ ...tenantData, exterior: e.target.value })}
                                />
                              </div>
                              {/* Q6 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q6")}</Label>
                                <Input
                                  value={tenantData.comfort}
                                  onChange={(e) => setTenantData({ ...tenantData, comfort: e.target.value })}
                                />
                              </div>
                              {/* Q7 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q7")}</Label>
                                <Input
                                  value={tenantData.environment}
                                  onChange={(e) => setTenantData({ ...tenantData, environment: e.target.value })}
                                />
                              </div>
                              {/* Q8 */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module1.q8")}</Label>
                                <Input
                                  value={tenantData.project}
                                  onChange={(e) => setTenantData({ ...tenantData, project: e.target.value })}
                                />
                              </div>
                            </div>

                            {/* Documents Checklist for Tenant */}
                            <div className="space-y-4 pt-4 border-t border-border">
                              <h3 className="font-semibold text-foreground">{t("journey.tenant.module1.docs.title")}</h3>
                              <div className="space-y-3">
                                {["tax", "employer", "payslips", "residence", "id", "guarantor"].map((docKey) => (
                                  <div
                                    key={docKey}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Checkbox
                                        id={`tenant-doc-${docKey}`}
                                        // Ideally we should bind this to uploadedDocuments or a tenant-specific doc state
                                        // For now using the local checked state logic or simple toggle if bound
                                      />
                                      <Label htmlFor={`tenant-doc-${docKey}`} className="cursor-pointer font-normal">
                                        {t(`journey.tenant.module1.docs.${docKey}`)}
                                      </Label>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-primary">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Importer
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-end pt-4">
                              <Button onClick={() => setTenantStep(2)}>
                                {t("common.continue")} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Module 2: Tenant Profile */}
                      {tenantStep === 2 && (
                        <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                          <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                                <UserIcon className="h-4 w-4" />
                                Module 2/2
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">{t("journey.tenant.module2.title")}</h2>
                              <p className="text-muted-foreground">{t("journey.tenant.module2.description")}</p>
                            </div>

                            <div className="space-y-6">
                              {/* Bio */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module2.bio")}</Label>
                                <Input
                                  placeholder={t("journey.tenant.module2.bioPlaceholder")}
                                  value={tenantData.bio}
                                  onChange={(e) => setTenantData({ ...tenantData, bio: e.target.value })}
                                />
                              </div>

                              {/* Description */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module2.descriptionDetails")}</Label>
                                <textarea
                                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder={t("journey.tenant.module2.descriptionPlaceholder")}
                                  value={tenantData.description}
                                  onChange={(e) => setTenantData({ ...tenantData, description: e.target.value })}
                                />
                              </div>

                              {/* Situation */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module2.situation")}</Label>
                                <Input
                                  placeholder={t("journey.tenant.module2.situationPlaceholder")}
                                  value={tenantData.situation}
                                  onChange={(e) => setTenantData({ ...tenantData, situation: e.target.value })}
                                />
                              </div>

                              {/* Strong Points */}
                              <div className="space-y-2">
                                <Label>{t("journey.tenant.module2.points")}</Label>
                                <Input
                                  placeholder={t("journey.tenant.module2.pointsPlaceholder")}
                                  // Simple input for now, could be a multi-select
                                />
                              </div>
                            </div>

                            <div className="flex justify-between pt-4">
                              <Button variant="outline" onClick={() => setTenantStep(1)}>
                                {t("common.back")}
                              </Button>
                              <Button onClick={handleComplete}>
                                <CheckCircle2 className="mr-2 h-4 w-4" /> {t("journey.generateProfile")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : (
                    // STANDARD JOURNEY (Documents Upload for other subtypes)
                    <>
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
                                  <Checkbox
                                    id={doc}
                                    checked={uploadedDocuments.includes(doc)}
                                    onCheckedChange={() => toggleDocument(doc)}
                                  />
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
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
