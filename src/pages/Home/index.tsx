import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Users, TrendingUp, Shield, Zap, CheckCircle2 } from "lucide-react";

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                {t("home.hero.badge")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance">
              {t("home.hero.titleStart")} <span className="text-primary">{t("home.hero.titleHighlight")}</span> {t("home.hero.titleEnd")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              {t("home.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
                <Link to="/journey">
                  {t("home.hero.ctaPrimary")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8">
                <Link to="/how-it-works">{t("home.hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("home.vision.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("home.vision.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card1.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card1.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card2.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card2.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card3.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card3.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("home.mission.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("home.mission.description")}</p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <span className="font-semibold">{t("home.mission.feature1.title")}</span> {t("home.mission.feature1.description")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <span className="font-semibold">{t("home.mission.feature2.title")}</span> {t("home.mission.feature2.description")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <span className="font-semibold">{t("home.mission.feature3.title")}</span> {t("home.mission.feature3.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/images/modern-real-estate-office-with-digital-screens.jpg"
                alt={t("home.mission.imageAlt")}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("home.value.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("home.value.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-border bg-card">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{t("home.value.buyers.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.buyers.feature1")}</span>
                  </li>
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.buyers.feature2")}</span>
                  </li>
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.buyers.feature3")}</span>
                  </li>
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.buyers.feature4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{t("home.value.professionals.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.professionals.feature1")}</span>
                  </li>
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.professionals.feature2")}</span>
                  </li>
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.professionals.feature3")}</span>
                  </li>
                  <li className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t("home.value.professionals.feature4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">{t("home.cta.title")}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty">{t("home.cta.description")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="secondary" className="text-base px-8">
                <Link to="/journey">
                  {t("home.cta.ctaPrimary")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-base px-8"
              >
                <Link to="/contact">{t("home.cta.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
