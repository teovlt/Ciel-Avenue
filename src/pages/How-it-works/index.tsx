import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Scale, BadgeCheck, Users, Building, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">{t("howItWorks.hero.title")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t("howItWorks.hero.description")}</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border bg-card text-center">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t("howItWorks.overview.module1.title")}</h3>
                  <p className="text-muted-foreground">{t("howItWorks.overview.module1.description")}</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card text-center">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t("howItWorks.overview.module2.title")}</h3>
                  <p className="text-muted-foreground">{t("howItWorks.overview.module2.description")}</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card text-center">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t("howItWorks.overview.module3.title")}</h3>
                  <p className="text-muted-foreground">{t("howItWorks.overview.module3.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1 - Définition des critères */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                  <FileText className="h-4 w-4" />
                  {t("howItWorks.module1.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("howItWorks.module1.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("howItWorks.module1.description")}</p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module1.feature1.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module1.feature1.description")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module1.feature2.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module1.feature2.description")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module1.feature3.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module1.feature3.description")}</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                  <Link to="/journey">
                    {t("howItWorks.module1.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted">
                        <p className="font-medium text-foreground mb-2">{t("howItWorks.module1.demo.question1")}</p>
                        <div className="space-y-2">
                          <div className="p-3 rounded bg-background border-2 border-primary text-sm font-medium">
                            {t("howItWorks.module1.demo.option1")}
                          </div>
                          <div className="p-3 rounded bg-background text-sm">{t("howItWorks.module1.demo.option2")}</div>
                          <div className="p-3 rounded bg-background text-sm">{t("howItWorks.module1.demo.option3")}</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="font-medium text-foreground mb-2">{t("howItWorks.module1.demo.question2")}</p>
                        <div className="p-3 rounded bg-background text-sm text-muted-foreground">
                          {t("howItWorks.module1.demo.placeholder2")}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="font-medium text-muted-foreground mb-2">{t("howItWorks.module1.demo.question3")}</p>
                        <div className="p-3 rounded bg-muted text-sm text-muted-foreground">
                          {t("howItWorks.module1.demo.placeholder3")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2 - Situation juridique */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">{t("howItWorks.module2.doc1")}</span>
                        </div>
                        <BadgeCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">{t("howItWorks.module2.doc2")}</span>
                        </div>
                        <BadgeCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium text-muted-foreground">{t("howItWorks.module2.doc3")}</span>
                        </div>
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium text-muted-foreground">{t("howItWorks.module2.doc4")}</span>
                        </div>
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{t("howItWorks.module2.progress")}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                  <Scale className="h-4 w-4" />
                  {t("howItWorks.module2.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("howItWorks.module2.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("howItWorks.module2.description")}</p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module2.feature1.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module2.feature1.description")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module2.feature2.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module2.feature2.description")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module2.feature3.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module2.feature3.description")}</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                  <Link to="/journey">
                    {t("howItWorks.module2.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 3 - Solvabilité */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                  <BadgeCheck className="h-4 w-4" />
                  {t("howItWorks.module3.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("howItWorks.module3.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("howItWorks.module3.description")}</p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module3.feature1.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module3.feature1.description")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module3.feature2.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module3.feature2.description")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("howItWorks.module3.feature3.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("howItWorks.module3.feature3.description")}</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                  <Link to="/journey">
                    {t("howItWorks.module3.button")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center space-y-4">
                      <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <div className="text-4xl font-bold text-primary-foreground">8.5</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{t("howItWorks.module3.demo.profile")}</h3>
                        <p className="text-muted-foreground">{t("howItWorks.module3.demo.score")}</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t("howItWorks.module3.demo.borrowing")}</span>
                        <span className="font-semibold text-foreground">350 000 €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t("howItWorks.module3.demo.rate")}</span>
                        <span className="font-semibold text-foreground">3.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t("howItWorks.module3.demo.duration")}</span>
                        <span className="font-semibold text-foreground">25 ans</span>
                      </div>
                    </div>

                    <div className="pt-4 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                        <BadgeCheck className="h-4 w-4" />
                        {t("howItWorks.module3.demo.validated")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">{t("howItWorks.cta.title")}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty">{t("howItWorks.cta.description")}</p>
            <Button asChild size="lg" variant="secondary" className="text-base px-8">
              <Link to="/journey">
                {t("howItWorks.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
