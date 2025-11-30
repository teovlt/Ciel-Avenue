"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Building2, MapPin, Euro, Home, FileText, Upload, BadgeCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Journey() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    budget: "",
    rooms: "",
    surface: "",
    maritalStatus: "",
    documents: [] as string[],
  });

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Create fake user account
    const fakeUser = {
      id: "1",
      email: "user@example.com",
      name: "John Doe",
    };

    // Login the user
    login(fakeUser);

    // Mark journey as completed
    localStorage.setItem("journeyCompleted", "true");

    // Show success message
    toast.success(t("journey.completed"));

    // Redirect to profile
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("journey.title")}</h1>
            <p className="text-muted-foreground">{t("journey.description")}</p>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {t("journey.moduleProgress").replace("{{current}}", step.toString()).replace("{{total}}", "3")}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Module 1 - Définition des critères */}
          {step === 1 && (
            <Card className="border-border bg-card">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                    <Building2 className="h-4 w-4" />
                    {t("journey.module1.badge")}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{t("journey.module1.title")}</h2>
                  <p className="text-muted-foreground">{t("journey.module1.description")}</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="propertyType" className="text-base font-semibold">
                      {t("journey.module1.question1")}
                    </Label>
                    <RadioGroup
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
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
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
                        value={formData.rooms}
                        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
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
                      value={formData.surface}
                      onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("journey.continue")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Module 2 - Situation juridique */}
          {step === 2 && (
            <Card className="border-border bg-card">
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
                      value={formData.maritalStatus}
                      onValueChange={(value: string) => setFormData({ ...formData, maritalStatus: value })}
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

                    <div className="space-y-3">
                      {[
                        t("journey.module2.documents.id"),
                        t("journey.module2.documents.address"),
                        t("journey.module2.documents.tax"),
                        t("journey.module2.documents.payslips"),
                        t("journey.module2.documents.bank"),
                        t("journey.module2.documents.professional"),
                      ].map((doc) => (
                        <div key={doc} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={doc}
                              checked={formData.documents.includes(doc)}
                              onCheckedChange={(checked: boolean) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    documents: [...formData.documents, doc],
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    documents: formData.documents.filter((d: string) => d !== doc),
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
            <Card className="border-border bg-card">
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
                  <div className="p-6 rounded-lg bg-muted/50 border border-border text-center space-y-4">
                    <BadgeCheck className="h-12 w-12 text-primary mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{t("journey.module3.analysisTitle")}</h3>
                      <p className="text-sm text-muted-foreground">{t("journey.module3.analysisDescription")}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">{t("journey.module3.evaluationTitle")}</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{t("journey.module3.evaluation1.title")}</p>
                          <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation1.description")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{t("journey.module3.evaluation2.title")}</p>
                          <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation2.description")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{t("journey.module3.evaluation3.title")}</p>
                          <p className="text-sm text-muted-foreground">{t("journey.module3.evaluation3.description")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
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
                      <span className="font-semibold text-foreground">{t("journey.module3.note")} :</span> {t("journey.module3.noteText")}
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
        </div>
      </div>
    </div>
  );
}
