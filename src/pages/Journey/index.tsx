"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { clientDocuments, expertDocuments, clientSubtypeLabels, expertSubtypeLabels } from "@/providers/auth-provider";
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

// Client subtype descriptions
const clientSubtypeDescriptions: Record<ClientSubtype, string> = {
  acheteur: "Je cherche un bien à acheter",
  vendeur: "Je souhaite vendre mon bien",
  bailleur: "Je loue un bien immobilier",
  locataire: "Je cherche un bien à louer",
  renovateur: "Je rénove un bien immobilier",
};

// Expert subtype descriptions
const expertSubtypeDescriptions: Record<ExpertSubtype, string> = {
  notaire: "Officier public spécialisé en actes authentiques",
  diagnostiqueur: "Expert en diagnostics techniques immobiliers",
  marchand: "Professionnel de la transaction immobilière",
  maitre_oeuvre: "Coordinateur de projets de construction",
  promoteur: "Développeur de programmes immobiliers",
  photographe: "Spécialiste de l'image immobilière",
  courtier: "Expert en financement immobilier",
  artisan: "Professionnel des travaux du bâtiment",
};

export default function Journey() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Current step: 1 = Personal Info, 2 = Type Selection, 3 = Subtype & Documents
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [subtype, setSubtype] = useState<ClientSubtype | ExpertSubtype | null>(null);

  // Step 1 - Personal information
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    dateOfBirth: "",
    email: "",
    termsAccepted: false,
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
    maritalStatus: "",
  });

  // Expert-specific data
  const [expertData, setExpertData] = useState({
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
    // Initialize documents for this subtype
    const docs =
      userType === "client" ? clientDocuments[selectedSubtype as ClientSubtype] : expertDocuments[selectedSubtype as ExpertSubtype];
    setUploadedDocuments([]);
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
            <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">Créer votre compte</h1>
            <p className="text-muted-foreground animate-fade-in-up-delay-1">
              Complétez les étapes pour accéder à la plateforme CIEL AVENUE
            </p>
            <div className="mt-6 animate-fade-in-up-delay-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Étape {step} sur {getTotalSteps()}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span className={step >= 1 ? "text-primary font-medium" : ""}>Informations</span>
                <span className={step >= 2 ? "text-primary font-medium" : ""}>Type de profil</span>
                <span className={step >= 3 ? "text-primary font-medium" : ""}>Finalisation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Step 1 - Personal Information */}
          {step === 1 && (
            <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                    <UserIcon className="h-4 w-4" />
                    Informations générales
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Vos informations personnelles</h2>
                  <p className="text-muted-foreground">Ces informations nous permettent de vérifier votre identité</p>
                </div>

                <div className="space-y-6 stagger-animation">
                  {/* First Name */}
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-base font-semibold">
                      Prénom sur la pièce d'identité *
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
                      Nom sur la pièce d'identité *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Assurez-vous que le nom correspond à celui qui figure sur votre pièce d'identité.
                    </p>
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
                      Prénom d'usage (optionnel)
                    </Label>
                    <p className="text-sm text-muted-foreground">Si vous utilisez un autre prénom, vous pouvez l'ajouter ici.</p>
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
                      Date de naissance *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Vous devez avoir au moins 18 ans pour vous inscrire. Nous n'indiquerons pas la date de votre anniversaire aux autres
                      utilisateurs CIEL AVENUE.
                    </p>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalData.dateOfBirth}
                      onChange={(e) => setPersonalData({ ...personalData, dateOfBirth: e.target.value })}
                      className="h-12"
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                    />
                    {personalData.dateOfBirth && !validateAge(personalData.dateOfBirth) && (
                      <p className="text-sm text-destructive">Vous devez avoir au moins 18 ans pour vous inscrire.</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Adresse email *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nous vous enverrons les confirmations, les reçus et les newsletters par e-mail.
                    </p>
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
                        <span className="font-semibold text-foreground">Conditions d'utilisation</span>
                        <p className="text-xs text-muted-foreground">Veuillez lire et accepter les conditions</p>
                      </div>
                    </div>

                    <div className="space-y-2 pl-2">
                      <p className="text-sm text-muted-foreground">En créant un compte, j'accepte :</p>
                      <ul className="space-y-1.5 text-sm">
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • Les conditions générales d'utilisation
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • Les conditions de service relatives aux paiements
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • La politique de non-discrimination
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                            • La politique de confidentialité
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
                        J'ai lu et j'accepte l'ensemble de ces conditions
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
                    Continuer <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2 - User Type Selection */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Quel est votre profil ?</h2>
                <p className="text-muted-foreground">Choisissez le type de compte qui correspond à vos besoins</p>
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
                      <h3 className="text-xl font-bold text-foreground">Client</h3>
                      <p className="text-sm text-muted-foreground">Acheteur, vendeur, bailleur, locataire ou rénovateur</p>
                    </div>
                    <ul className="text-left space-y-2">
                      {["Recherche personnalisée", "Accompagnement d'experts", "Documents sécurisés"].map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Je suis client <ArrowRight className="ml-2 h-4 w-4" />
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
                      <h3 className="text-xl font-bold text-foreground">Expert</h3>
                      <p className="text-sm text-muted-foreground">Professionnel de l'immobilier certifié</p>
                    </div>
                    <ul className="text-left space-y-2">
                      {["Accès aux clients pré-qualifiés", "Gestion des leads", "Outils de performance"].map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      Je suis expert <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-start pt-4">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Retour
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 - Subtype Selection & Documents */}
          {step === 3 && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Subtype Selection */}
              {!subtype && (
                <>
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary mb-2">
                      {userType === "client" ? <Users className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                      {userType === "client" ? "Profil Client" : "Profil Expert"}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {userType === "client" ? "Quel type de client êtes-vous ?" : "Quel type d'expert êtes-vous ?"}
                    </h2>
                    <p className="text-muted-foreground">Sélectionnez votre profil pour voir les documents requis</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userType === "client"
                      ? // Client subtypes
                        (Object.keys(clientSubtypeLabels) as ClientSubtype[]).map((key) => {
                          const Icon = clientSubtypeIcons[key];
                          return (
                            <Card
                              key={key}
                              className="border-2 border-border hover:border-primary cursor-pointer transition-all card-hover-lift"
                              onClick={() => handleSubtypeSelect(key)}
                            >
                              <CardContent className="p-6 text-center space-y-4">
                                <div className="h-14 w-14 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                                  <Icon className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">{clientSubtypeLabels[key]}</h3>
                                  <p className="text-xs text-muted-foreground mt-1">{clientSubtypeDescriptions[key]}</p>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      : // Expert subtypes
                        (Object.keys(expertSubtypeLabels) as ExpertSubtype[]).map((key) => {
                          const Icon = expertSubtypeIcons[key];
                          return (
                            <Card
                              key={key}
                              className="border-2 border-border hover:border-accent cursor-pointer transition-all card-hover-lift"
                              onClick={() => handleSubtypeSelect(key)}
                            >
                              <CardContent className="p-6 text-center space-y-4">
                                <div className="h-14 w-14 rounded-full bg-accent/10 mx-auto flex items-center justify-center">
                                  <Icon className="h-7 w-7 text-accent" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">{expertSubtypeLabels[key]}</h3>
                                  <p className="text-xs text-muted-foreground mt-1">{expertSubtypeDescriptions[key]}</p>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                  </div>

                  <div className="flex justify-start pt-4">
                    <Button onClick={handleBack} variant="outline">
                      <ArrowLeft className="mr-2 h-5 w-5" /> Retour
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
                          Documents requis
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">
                          Documents pour{" "}
                          {userType === "client"
                            ? clientSubtypeLabels[subtype as ClientSubtype]
                            : expertSubtypeLabels[subtype as ExpertSubtype]}
                        </h2>
                        <p className="text-muted-foreground">
                          Sélectionnez les documents que vous pouvez fournir maintenant. Vous pourrez les télécharger plus tard.
                        </p>
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
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">💡 Conseil :</span> Vous pouvez continuer sans télécharger tous
                          les documents maintenant. Vous pourrez les ajouter plus tard depuis votre profil.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Notaire Card */}
                  <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Scale className="h-8 w-8 text-accent" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-lg font-semibold text-foreground mb-1">Besoin d'aide avec vos documents ?</h3>
                          <p className="text-sm text-muted-foreground">
                            Un notaire partenaire peut vous accompagner dans la préparation et la vérification de vos documents.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                          onClick={() => toast.success("Demande envoyée ! Un notaire vous contactera sous 24h.")}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contacter un notaire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Review Summary */}
                  <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent">
                          <CheckCircle2 className="h-4 w-4" />
                          Récapitulatif
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Vérifiez votre compte</h2>
                        <p className="text-muted-foreground">Voici un résumé des informations de votre compte avant création.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Info */}
                        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-primary" />
                            Informations personnelles
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">Nom :</span>{" "}
                              <span className="font-medium">
                                {personalData.firstName || "Non renseigné"} {personalData.lastName || ""}
                              </span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Email :</span>{" "}
                              <span className="font-medium">{personalData.email || "Non renseigné"}</span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Date de naissance :</span>{" "}
                              <span className="font-medium">{personalData.dateOfBirth || "Non renseignée"}</span>
                            </p>
                          </div>
                        </div>

                        {/* Account Type */}
                        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            {userType === "expert" ? (
                              <Briefcase className="h-4 w-4 text-accent" />
                            ) : (
                              <Users className="h-4 w-4 text-primary" />
                            )}
                            Type de compte
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">Type :</span>{" "}
                              <span className="font-medium capitalize">{userType}</span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Profil :</span>{" "}
                              <span className="font-medium">
                                {userType === "client"
                                  ? clientSubtypeLabels[subtype as ClientSubtype]
                                  : expertSubtypeLabels[subtype as ExpertSubtype]}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Documents */}
                        <div className="p-4 rounded-lg bg-muted/50 space-y-3 md:col-span-2">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            Documents ({uploadedDocuments.length}/{getRequiredDocuments().length} sélectionnés)
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
                          <ArrowLeft className="mr-2 h-5 w-5" /> Retour
                        </Button>
                        <Button
                          onClick={handleComplete}
                          className={`${userType === "expert" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                        >
                          Créer mon compte <ArrowRight className="ml-2 h-5 w-5" />
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
