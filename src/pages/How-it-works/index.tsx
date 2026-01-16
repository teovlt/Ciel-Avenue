import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  BadgeCheck,
  Users,
  CheckCircle2,
  Shield,
  UserCheck,
  MessageSquare,
  Briefcase,
  Home,
  Hammer,
} from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserCheck,
      badge: t("howItWorks.process.step1.badge"),
      title: t("howItWorks.process.step1.title"),
      desc: t("howItWorks.process.step1.description"),
    },
    {
      icon: FileText,
      badge: t("howItWorks.process.step2.badge"),
      title: t("howItWorks.process.step2.title"),
      desc: t("howItWorks.process.step2.description"),
    },
    {
      icon: BadgeCheck,
      badge: t("howItWorks.process.step3.badge"),
      title: t("howItWorks.process.step3.title"),
      desc: t("howItWorks.process.step3.description"),
    },
    {
      icon: Users,
      badge: t("howItWorks.process.step4.badge"),
      title: t("howItWorks.process.step4.title"),
      desc: t("howItWorks.process.step4.description"),
    },
  ];

  const whyUs = [
    { icon: Shield, title: t("howItWorks.whyUs.verifiedDocs.title"), desc: t("howItWorks.whyUs.verifiedDocs.description") },
    { icon: UserCheck, title: t("howItWorks.whyUs.qualifiedProfiles.title"), desc: t("howItWorks.whyUs.qualifiedProfiles.description") },
    { icon: MessageSquare, title: t("howItWorks.whyUs.directConnection.title"), desc: t("howItWorks.whyUs.directConnection.description") },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight animate-fade-in-up">
              {t("howItWorks.hero.title")} <span className="text-primary">{t("howItWorks.hero.titleHighlight")}</span> ?
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay-1">
              {t("howItWorks.hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.process.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.process.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <Card className="border-0 shadow-lg h-full">
                    <div className="h-1.5 bg-primary rounded-t-lg" />
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center">
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {step.badge}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </CardContent>
                  </Card>
                  {/* Connector line */}
                  {index < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.cases.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.cases.description")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Buyer Case */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-blue-500" />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{t("howItWorks.cases.buyer.name")}</h3>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.cases.buyer.subtitle")}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>J1:</strong> {t("howItWorks.cases.buyer.day1")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>J3:</strong> {t("howItWorks.cases.buyer.day3")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>J5:</strong> {t("howItWorks.cases.buyer.day5")}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("howItWorks.cases.buyer.scoreTitle")}</span>
                      <span className="font-bold text-blue-600">8.5/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Renovator Case */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-amber-500" />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                      <Hammer className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{t("howItWorks.cases.renovator.name")}</h3>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.cases.renovator.subtitle")}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>J1:</strong> {t("howItWorks.cases.renovator.day1")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>J4:</strong> {t("howItWorks.cases.renovator.day4")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>J7:</strong> {t("howItWorks.cases.renovator.day7")}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("howItWorks.cases.renovator.expertsTitle")}</span>
                      <span className="font-bold text-amber-600">3 experts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Case */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-emerald-500" />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{t("howItWorks.cases.expert.name")}</h3>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.cases.expert.subtitle")}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p>{t("howItWorks.cases.expert.registration")}</p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p>{t("howItWorks.cases.expert.verification")}</p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p>{t("howItWorks.cases.expert.result")}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("howItWorks.cases.expert.missionsCompleted")}</span>
                      <span className="font-bold text-emerald-600">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.whyUs.title")}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.whyUs.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyUs.map((item) => (
                <Card key={item.title} className="border-0 shadow-lg text-center">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Role Feature */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
              {t("howItWorks.multiRole.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("howItWorks.multiRole.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.multiRole.description")}</p>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium">
                {t("howItWorks.multiRole.buyer")}
              </span>
              <span className="text-muted-foreground self-center">+</span>
              <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-sm font-medium">
                {t("howItWorks.multiRole.renovator")}
              </span>
              <span className="text-muted-foreground self-center">+</span>
              <span className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                {t("howItWorks.multiRole.expertSurveyor")}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">{t("howItWorks.multiRole.switchInfo")}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">{t("howItWorks.cta.title")}</h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">{t("howItWorks.cta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 h-auto rounded-xl group"
              >
                <Link to="/journey">
                  {t("howItWorks.cta.createAccount")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 h-auto rounded-xl"
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
