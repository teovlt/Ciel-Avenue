"use client";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  Scale,
  BadgeCheck,
  Users,
  Building,
  Sparkles,
  ShoppingCart,
  Hammer,
  ClipboardCheck,
  MessageSquare,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  UserCheck,
  Briefcase,
} from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20 page-transition">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary animate-bounce-in">
              <Sparkles className="h-4 w-4" />
              {t("howItWorks.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance animate-fade-in-up">
              {t("howItWorks.hero.title")} <span className="text-primary">{t("howItWorks.hero.titleHighlight")}</span> ?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto animate-fade-in-up-delay-1">
              {t("howItWorks.hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.process.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.process.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {t("howItWorks.process.step1.badge")}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.process.step1.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("howItWorks.process.step1.description")}</p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {t("howItWorks.process.step2.badge")}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.process.step2.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("howItWorks.process.step2.description")}</p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <BadgeCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {t("howItWorks.process.step3.badge")}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.process.step3.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("howItWorks.process.step3.description")}</p>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {t("howItWorks.process.step4.badge")}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.process.step4.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("howItWorks.process.step4.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-medium text-accent mb-4">
                <Building className="h-4 w-4" />
                {t("howItWorks.cases.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.cases.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.cases.description")}</p>
            </div>

            <div className="space-y-8">
              {/* Case 1: Acheteur */}
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-background overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <ShoppingCart className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{t("howItWorks.cases.buyer.name")}</h3>
                          <p className="text-muted-foreground">{t("howItWorks.cases.buyer.subtitle")}</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          {t("howItWorks.cases.buyer.journeyTitle")}
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 1 :</strong> {t("howItWorks.cases.buyer.day1")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 2 :</strong> {t("howItWorks.cases.buyer.day2")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 3 :</strong> {t("howItWorks.cases.buyer.day3")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 5 :</strong> {t("howItWorks.cases.buyer.day5")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <Card className="bg-card border-primary/20">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">8.5</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{t("howItWorks.cases.buyer.scoreTitle")}</p>
                            <p className="text-xs text-muted-foreground">{t("howItWorks.cases.buyer.scoreSubtitle")}</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("howItWorks.cases.buyer.borrowingCapacity")}</span>
                              <span className="font-semibold">350 000 €</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("howItWorks.cases.buyer.estimatedRate")}</span>
                              <span className="font-semibold">3.2%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case 2: Rénovateur */}
              <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-background overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                          <Hammer className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{t("howItWorks.cases.renovator.name")}</h3>
                          <p className="text-muted-foreground">{t("howItWorks.cases.renovator.subtitle")}</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Clock className="h-5 w-5 text-accent" />
                          {t("howItWorks.cases.renovator.journeyTitle")}
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 1 :</strong> {t("howItWorks.cases.renovator.day1")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 2 :</strong> {t("howItWorks.cases.renovator.day2")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 4 :</strong> {t("howItWorks.cases.renovator.day4")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 7 :</strong> {t("howItWorks.cases.renovator.day7")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <Card className="bg-card border-accent/20">
                        <CardContent className="p-6 space-y-4">
                          <h4 className="font-semibold text-foreground text-center">{t("howItWorks.cases.renovator.expertsTitle")}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <ClipboardCheck className="h-5 w-5 text-accent" />
                              <div>
                                <p className="text-sm font-medium">{t("howItWorks.cases.renovator.projectManager")}</p>
                                <p className="text-xs text-muted-foreground">{t("howItWorks.cases.renovator.projectManagerDesc")}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Hammer className="h-5 w-5 text-accent" />
                              <div>
                                <p className="text-sm font-medium">{t("howItWorks.cases.renovator.artisans")}</p>
                                <p className="text-xs text-muted-foreground">{t("howItWorks.cases.renovator.artisansDesc")}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Scale className="h-5 w-5 text-accent" />
                              <div>
                                <p className="text-sm font-medium">{t("howItWorks.cases.renovator.surveyor")}</p>
                                <p className="text-xs text-muted-foreground">{t("howItWorks.cases.renovator.surveyorDesc")}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case 3: Expert Diagnostiqueur */}
              <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                          <Briefcase className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{t("howItWorks.cases.expert.name")}</h3>
                          <p className="text-muted-foreground">{t("howItWorks.cases.expert.subtitle")}</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-accent" />
                          {t("howItWorks.cases.expert.journeyTitle")}
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Inscription :</strong> {t("howItWorks.cases.expert.registration")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Vérification :</strong> {t("howItWorks.cases.expert.verification")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Leads qualifiés :</strong> {t("howItWorks.cases.expert.leads")}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Résultat :</strong> {t("howItWorks.cases.expert.result")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <Card className="bg-card border-accent/20">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-xs font-medium text-accent">
                            <BadgeCheck className="h-4 w-4" />
                            {t("howItWorks.cases.expert.certifiedBadge")}
                          </div>
                          <h4 className="text-xl font-bold text-foreground">DiagImmo Pro</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("howItWorks.cases.expert.missionsCompleted")}</span>
                              <span className="font-semibold">156</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("howItWorks.cases.expert.zonesCovered")}</span>
                              <span className="font-semibold">Paris, Lyon</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("howItWorks.cases.expert.averageRating")}</span>
                              <span className="font-semibold">4.9/5</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">DPE</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Amiante</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Plomb</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Termites</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why CIEL AVENUE Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.whyUs.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.whyUs.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card border-border card-hover-lift">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.whyUs.verifiedDocs.title")}</h3>
                  <p className="text-muted-foreground">{t("howItWorks.whyUs.verifiedDocs.description")}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border card-hover-lift">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.whyUs.qualifiedProfiles.title")}</h3>
                  <p className="text-muted-foreground">{t("howItWorks.whyUs.qualifiedProfiles.description")}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border card-hover-lift">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("howItWorks.whyUs.directConnection.title")}</h3>
                  <p className="text-muted-foreground">{t("howItWorks.whyUs.directConnection.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Role Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-medium text-accent">
              <Users className="h-4 w-4" />
              {t("howItWorks.multiRole.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("howItWorks.multiRole.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.multiRole.description")}</p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                <ShoppingCart className="h-4 w-4" />
                {t("howItWorks.multiRole.buyer")}
              </div>
              <span className="text-muted-foreground self-center">+</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                <Hammer className="h-4 w-4" />
                {t("howItWorks.multiRole.renovator")}
              </div>
              <span className="text-muted-foreground self-center">+</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-medium text-accent">
                <ClipboardCheck className="h-4 w-4" />
                {t("howItWorks.multiRole.expertSurveyor")}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{t("howItWorks.multiRole.switchInfo")}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">{t("howItWorks.cta.title")}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">{t("howItWorks.cta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="card-hover-lift">
                <Link to="/journey">
                  {t("howItWorks.cta.createAccount")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/contact">{t("howItWorks.cta.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
