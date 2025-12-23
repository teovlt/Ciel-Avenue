"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import type { UserType, ExpertProfile, ClientProfile } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  MapPin,
  Euro,
  Home,
  FileText,
  Upload,
  BadgeCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Award,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

export default function Journey() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(0); // Start at step 0 for user type selection
  const [userType, setUserType] = useState<UserType | null>(null);

  // Client form data
  const [clientData, setClientData] = useState({
    propertyType: "",
    location: "",
    budget: "",
    rooms: "",
    surface: "",
    maritalStatus: "",
    documents: [] as string[],
  });

  // Expert form data
  const [expertData, setExpertData] = useState({
    expertise: [] as string[],
    zones: [] as string[],
    yearsExperience: "",
    certifications: [] as string[],
    company: "",
    siret: "",
  });

  const getTotalSteps = () => (userType === "expert" ? 3 : 4);
  const progress = userType ? (step / getTotalSteps()) * 100 : 0;

  const handleNext = () => {
    if (step < getTotalSteps()) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else if (step === 1 && userType) {
      setStep(0);
      setUserType(null);
    }
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(1);
  };

  const handleComplete = () => {
    if (userType === "client") {
      const clientProfile: ClientProfile = {
        propertyType: clientData.propertyType,
        location: clientData.location,
        budget: clientData.budget,
        rooms: clientData.rooms,
        surface: clientData.surface,
        maritalStatus: clientData.maritalStatus,
        solvabilityScore: 8.5,
        borrowingCapacity: "350 000 €",
        estimatedRate: "3.2%",
      };

      login({
        id: "1",
        email: "client@example.com",
        name: "Jean Dupont",
        userType: "client",
        clientProfile,
      });
    } else {
      const expertProfile: ExpertProfile = {
        certifications: expertData.certifications,
        expertise: expertData.expertise,
        zones: expertData.zones,
        yearsExperience: parseInt(expertData.yearsExperience) || 5,
        completedProjects: 127,
      };

      login({
        id: "2",
        email: "expert@example.com",
        name: "Marie Martin",
        userType: "expert",
        expertProfile,
      });
    }

    localStorage.setItem("journeyCompleted", "true");
    toast.success(t("journey.completed"));
    navigate("/profile");
  };

  const expertiseOptions = [
    { id: "residential", label: t("journey.expert.expertise.residential"), icon: Home },
    { id: "commercial", label: t("journey.expert.expertise.commercial"), icon: Building2 },
    { id: "investment", label: t("journey.expert.expertise.investment"), icon: Euro },
    { id: "luxury", label: t("journey.expert.expertise.luxury"), icon: Award },
  ];

  const certificationOptions = [
    t("journey.expert.certifications.agent"),
    t("journey.expert.certifications.negotiator"),
    t("journey.expert.certifications.manager"),
    t("journey.expert.certifications.evaluator"),
  ];

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
            <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">{t("journey.title")}</h1>
            <p className="text-muted-foreground animate-fade-in-up-delay-1">{t("journey.description")}</p>
            {userType && (
              <div className="mt-6 animate-fade-in-up-delay-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {t("journey.moduleProgress").replace("{{current}}", step.toString()).replace("{{total}}", getTotalSteps().toString())}
                  </span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Step 0 - User Type Selection */}
          {step === 0 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{t("journey.userType.title")}</h2>
                <p className="text-muted-foreground">{t("journey.userType.description")}</p>
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
                      <h3 className="text-xl font-bold text-foreground">{t("journey.userType.client.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("journey.userType.client.description")}</p>
                    </div>
                    <ul className="text-left space-y-2">
                      {[
                        t("journey.userType.client.feature1"),
                        t("journey.userType.client.feature2"),
                        t("journey.userType.client.feature3"),
                      ].map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {t("journey.userType.client.cta")} <ArrowRight className="ml-2 h-4 w-4" />
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
                      <h3 className="text-xl font-bold text-foreground">{t("journey.userType.expert.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("journey.userType.expert.description")}</p>
                    </div>
                    <ul className="text-left space-y-2">
                      {[
                        t("journey.userType.expert.feature1"),
                        t("journey.userType.expert.feature2"),
                        t("journey.userType.expert.feature3"),
                      ].map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      {t("journey.userType.expert.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* CLIENT JOURNEY */}
          {userType === "client" && (
            <>
              {/* Module 1 - Définition des critères */}
              {step === 1 && (
                <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                        <Building2 className="h-4 w-4" />
                        {t("journey.module1.badge")}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{t("journey.module1.title")}</h2>
                      <p className="text-muted-foreground">{t("journey.module1.description")}</p>
                    </div>

                    <div className="space-y-6 stagger-animation">
                      <div className="space-y-3">
                        <Label htmlFor="propertyType" className="text-base font-semibold">
                          {t("journey.module1.question1")}
                        </Label>
                        <RadioGroup
                          value={clientData.propertyType}
                          onValueChange={(value) => setClientData({ ...clientData, propertyType: value })}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors">
                            <RadioGroupItem value="appartement" id="appartement" />
                            <Label htmlFor="appartement" className="flex-1 cursor-pointer font-normal">
                              <div className="flex items-center gap-3">
                                <Building2 className="h-5 w-5 text-primary" />
                                <span>{t("journey.module1.propertyType.apartment")}</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors">
                            <RadioGroupItem value="maison" id="maison" />
                            <Label htmlFor="maison" className="flex-1 cursor-pointer font-normal">
                              <div className="flex items-center gap-3">
                                <Home className="h-5 w-5 text-primary" />
                                <span>{t("journey.module1.propertyType.house")}</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors">
                            <RadioGroupItem value="terrain" id="terrain" />
                            <Label htmlFor="terrain" className="flex-1 cursor-pointer font-normal">
                              <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>{t("journey.module1.propertyType.land")}</span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="location" className="text-base font-semibold">
                          {t("journey.module1.question2")}
                        </Label>
                        <Input
                          id="location"
                          placeholder={t("journey.module1.locationPlaceholder")}
                          value={clientData.location}
                          onChange={(e) => setClientData({ ...clientData, location: e.target.value })}
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="budget" className="text-base font-semibold">
                            {t("journey.module1.budget")}
                          </Label>
                          <div className="relative">
                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="budget"
                              type="number"
                              placeholder="350000"
                              value={clientData.budget}
                              onChange={(e) => setClientData({ ...clientData, budget: e.target.value })}
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="rooms" className="text-base font-semibold">
                            {t("journey.module1.rooms")}
                          </Label>
                          <Input
                            id="rooms"
                            type="number"
                            placeholder="3"
                            value={clientData.rooms}
                            onChange={(e) => setClientData({ ...clientData, rooms: e.target.value })}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="surface" className="text-base font-semibold">
                          {t("journey.module1.surface")}
                        </Label>
                        <Input
                          id="surface"
                          type="number"
                          placeholder="75"
                          value={clientData.surface}
                          onChange={(e) => setClientData({ ...clientData, surface: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handleBack} variant="outline">
                        <ArrowLeft className="mr-2 h-5 w-5" /> {t("journey.back")}
                      </Button>
                      <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {t("journey.continue")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Module 2 - Situation juridique */}
              {step === 2 && (
                <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                        <FileText className="h-4 w-4" />
                        {t("journey.module2.badge")}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{t("journey.module2.title")}</h2>
                      <p className="text-muted-foreground">{t("journey.module2.description")}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t("journey.module2.maritalStatus")}</Label>
                        <RadioGroup
                          value={clientData.maritalStatus}
                          onValueChange={(value: string) => setClientData({ ...clientData, maritalStatus: value })}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors">
                            <RadioGroupItem value="celibataire" id="celibataire" />
                            <Label htmlFor="celibataire" className="flex-1 cursor-pointer font-normal">
                              {t("journey.module2.maritalStatusOptions.single")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors">
                            <RadioGroupItem value="marie" id="marie" />
                            <Label htmlFor="marie" className="flex-1 cursor-pointer font-normal">
                              {t("journey.module2.maritalStatusOptions.married")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-colors">
                            <RadioGroupItem value="divorce" id="divorce" />
                            <Label htmlFor="divorce" className="flex-1 cursor-pointer font-normal">
                              {t("journey.module2.maritalStatusOptions.divorced")}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-base font-semibold">{t("journey.module2.documentsTitle")}</Label>
                        <p className="text-sm text-muted-foreground">{t("journey.module2.documentsDescription")}</p>

                        <div className="space-y-3 stagger-animation">
                          {[
                            t("journey.module2.documents.id"),
                            t("journey.module2.documents.address"),
                            t("journey.module2.documents.tax"),
                            t("journey.module2.documents.payslips"),
                            t("journey.module2.documents.bank"),
                            t("journey.module2.documents.professional"),
                          ].map((doc) => (
                            <div
                              key={doc}
                              className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  id={doc}
                                  checked={clientData.documents.includes(doc)}
                                  onCheckedChange={(checked: boolean) => {
                                    if (checked) {
                                      setClientData({
                                        ...clientData,
                                        documents: [...clientData.documents, doc],
                                      });
                                    } else {
                                      setClientData({
                                        ...clientData,
                                        documents: clientData.documents.filter((d: string) => d !== doc),
                                      });
                                    }
                                  }}
                                />
                                <Label htmlFor={doc} className="cursor-pointer font-normal">
                                  {doc}
                                </Label>
                              </div>
                              <Button variant="ghost" size="sm" className="text-primary">
                                <Upload className="h-4 w-4 mr-2" />
                                {t("journey.module2.upload")}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handleBack} variant="outline">
                        <ArrowLeft className="mr-2 h-5 w-5" /> {t("journey.back")}
                      </Button>
                      <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {t("journey.continue")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Module 3 - Solvabilité */}
              {step === 3 && (
                <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                        <BadgeCheck className="h-4 w-4" />
                        {t("journey.module3.badge")}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{t("journey.module3.title")}</h2>
                      <p className="text-muted-foreground">{t("journey.module3.description")}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto animate-pulse-glow">
                          <BadgeCheck className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">{t("journey.module3.analysisTitle")}</h3>
                          <p className="text-sm text-muted-foreground">{t("journey.module3.analysisDescription")}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">{t("journey.module3.evaluationTitle")}</h4>
                        <div className="space-y-3 stagger-animation">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{t("journey.module3.evaluation1.title")}</p>
                              <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation1.description")}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{t("journey.module3.evaluation2.title")}</p>
                              <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation2.description")}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{t("journey.module3.evaluation3.title")}</p>
                              <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation3.description")}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{t("journey.module3.evaluation4.title")}</p>
                              <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation4.description")}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">{t("journey.module3.note")} :</span>{" "}
                          {t("journey.module3.noteText")}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handleBack} variant="outline">
                        <ArrowLeft className="mr-2 h-5 w-5" /> {t("journey.back")}
                      </Button>
                      <Button onClick={handleComplete} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {t("journey.generateProfile")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* EXPERT JOURNEY */}
          {userType === "expert" && (
            <>
              {/* Module 1 - Informations professionnelles */}
              {step === 1 && (
                <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent">
                        <Briefcase className="h-4 w-4" />
                        {t("journey.expert.module1.badge")}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{t("journey.expert.module1.title")}</h2>
                      <p className="text-muted-foreground">{t("journey.expert.module1.description")}</p>
                    </div>

                    <div className="space-y-6 stagger-animation">
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-base font-semibold">
                          {t("journey.expert.module1.company")}
                        </Label>
                        <Input
                          id="company"
                          placeholder={t("journey.expert.module1.companyPlaceholder")}
                          value={expertData.company}
                          onChange={(e) => setExpertData({ ...expertData, company: e.target.value })}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="siret" className="text-base font-semibold">
                          {t("journey.expert.module1.siret")}
                        </Label>
                        <Input
                          id="siret"
                          placeholder="123 456 789 00012"
                          value={expertData.siret}
                          onChange={(e) => setExpertData({ ...expertData, siret: e.target.value })}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="yearsExperience" className="text-base font-semibold">
                          {t("journey.expert.module1.experience")}
                        </Label>
                        <Input
                          id="yearsExperience"
                          type="number"
                          placeholder="5"
                          value={expertData.yearsExperience}
                          onChange={(e) => setExpertData({ ...expertData, yearsExperience: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handleBack} variant="outline">
                        <ArrowLeft className="mr-2 h-5 w-5" /> {t("journey.back")}
                      </Button>
                      <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        {t("journey.continue")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Module 2 - Expertise et Certifications */}
              {step === 2 && (
                <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent">
                        <Award className="h-4 w-4" />
                        {t("journey.expert.module2.badge")}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{t("journey.expert.module2.title")}</h2>
                      <p className="text-muted-foreground">{t("journey.expert.module2.description")}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t("journey.expert.module2.expertiseTitle")}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {expertiseOptions.map((option) => (
                            <div
                              key={option.id}
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                expertData.expertise.includes(option.id)
                                  ? "border-accent bg-accent/10"
                                  : "border-border hover:border-accent/50"
                              }`}
                              onClick={() => {
                                if (expertData.expertise.includes(option.id)) {
                                  setExpertData({
                                    ...expertData,
                                    expertise: expertData.expertise.filter((e) => e !== option.id),
                                  });
                                } else {
                                  setExpertData({
                                    ...expertData,
                                    expertise: [...expertData.expertise, option.id],
                                  });
                                }
                              }}
                            >
                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                  expertData.expertise.includes(option.id) ? "bg-accent" : "bg-muted"
                                }`}
                              >
                                <option.icon
                                  className={`h-5 w-5 ${
                                    expertData.expertise.includes(option.id) ? "text-accent-foreground" : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <span className="font-medium">{option.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-base font-semibold">{t("journey.expert.module2.certTitle")}</Label>
                        <div className="space-y-3 stagger-animation">
                          {certificationOptions.map((cert) => (
                            <div
                              key={cert}
                              className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  id={cert}
                                  checked={expertData.certifications.includes(cert)}
                                  onCheckedChange={(checked: boolean) => {
                                    if (checked) {
                                      setExpertData({
                                        ...expertData,
                                        certifications: [...expertData.certifications, cert],
                                      });
                                    } else {
                                      setExpertData({
                                        ...expertData,
                                        certifications: expertData.certifications.filter((c) => c !== cert),
                                      });
                                    }
                                  }}
                                />
                                <Label htmlFor={cert} className="cursor-pointer font-normal">
                                  {cert}
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handleBack} variant="outline">
                        <ArrowLeft className="mr-2 h-5 w-5" /> {t("journey.back")}
                      </Button>
                      <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        {t("journey.continue")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Module 3 - Zones d'intervention */}
              {step === 3 && (
                <Card className="border-border bg-card/80 backdrop-blur-sm card-hover-lift animate-fade-in-up">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent">
                        <Globe className="h-4 w-4" />
                        {t("journey.expert.module3.badge")}
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{t("journey.expert.module3.title")}</h2>
                      <p className="text-muted-foreground">{t("journey.expert.module3.description")}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t("journey.expert.module3.zonesTitle")}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { id: "paris", label: "Paris et Île-de-France" },
                            { id: "lyon", label: "Lyon et Rhône-Alpes" },
                            { id: "marseille", label: "Marseille et PACA" },
                            { id: "bordeaux", label: "Bordeaux et Nouvelle-Aquitaine" },
                            { id: "nantes", label: "Nantes et Pays de la Loire" },
                            { id: "toulouse", label: "Toulouse et Occitanie" },
                          ].map((zone) => (
                            <div
                              key={zone.id}
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                expertData.zones.includes(zone.id) ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                              }`}
                              onClick={() => {
                                if (expertData.zones.includes(zone.id)) {
                                  setExpertData({
                                    ...expertData,
                                    zones: expertData.zones.filter((z) => z !== zone.id),
                                  });
                                } else {
                                  setExpertData({
                                    ...expertData,
                                    zones: [...expertData.zones, zone.id],
                                  });
                                }
                              }}
                            >
                              <MapPin
                                className={`h-5 w-5 ${expertData.zones.includes(zone.id) ? "text-accent" : "text-muted-foreground"}`}
                              />
                              <span className="font-medium">{zone.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <BadgeCheck className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{t("journey.expert.module3.readyTitle")}</h4>
                            <p className="text-sm text-muted-foreground">{t("journey.expert.module3.readyDescription")}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handleBack} variant="outline">
                        <ArrowLeft className="mr-2 h-5 w-5" /> {t("journey.back")}
                      </Button>
                      <Button onClick={handleComplete} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        {t("journey.expert.createProfile")} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
