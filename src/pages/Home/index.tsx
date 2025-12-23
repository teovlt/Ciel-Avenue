import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Users, TrendingUp, Shield, Zap, CheckCircle2, Star, Award, ChevronDown } from "lucide-react";

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen page-transition">
      {/* Hero Section - Full Viewport */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Decorative gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl animate-float-delay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-secondary/10 via-transparent to-primary/10 rounded-full blur-3xl animate-float" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-primary/40 rounded-full animate-float" />
          <div className="absolute top-[25%] right-[15%] w-2 h-2 bg-accent/50 rounded-full animate-float-slow" />
          <div className="absolute bottom-[30%] left-[20%] w-4 h-4 bg-primary/30 rounded-full animate-float-delay" />
          <div className="absolute bottom-[20%] right-[25%] w-2 h-2 bg-secondary/40 rounded-full animate-float" />
          <div className="absolute top-[40%] left-[5%] w-2 h-2 bg-accent/30 rounded-full animate-float-slow" />
          <div className="absolute top-[60%] right-[8%] w-3 h-3 bg-primary/25 rounded-full animate-float-delay" />
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-block animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-sm font-medium text-foreground shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                {t("home.hero.badge")}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight text-balance animate-fade-in-up-delay-1">
              {t("home.hero.titleStart")}{" "}
              <span className="relative">
                <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift">
                  {t("home.hero.titleHighlight")}
                </span>
              </span>{" "}
              {t("home.hero.titleEnd")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty animate-fade-in-up-delay-2">
              {t("home.hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-up-delay-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 h-auto rounded-xl shadow-lg shadow-primary/25 card-hover-lift group"
              >
                <Link to="/journey">
                  {t("home.hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 h-auto rounded-xl backdrop-blur-sm border-border/50 hover:bg-muted/50 card-hover-lift"
              >
                <Link to="/how-it-works">{t("home.hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section - Bottom of Hero */}
        <div className="container mx-auto px-4 lg:px-8 pb-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {/* Stat 1 - Users */}
              <div className="relative group animate-fade-in-up-delay-4">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center card-hover-lift">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">2 500+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.users") || "Utilisateurs actifs"}</div>
                </div>
              </div>

              {/* Stat 2 - Properties */}
              <div className="relative group animate-fade-in-up-delay-5">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center card-hover-lift">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">15 000+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.properties") || "Biens analysés"}</div>
                </div>
              </div>

              {/* Stat 3 - Experts */}
              <div className="relative group animate-fade-in-up-delay-5">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center card-hover-lift">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">350+</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.experts") || "Experts certifiés"}</div>
                </div>
              </div>

              {/* Stat 4 - Satisfaction */}
              <div className="relative group animate-fade-in-up-delay-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center card-hover-lift">
                  <div className="flex justify-center mb-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">{t("home.hero.stats.satisfaction") || "Satisfaction client"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted-foreground/50" />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("home.vision.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("home.vision.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow card-hover-lift animate-fade-in-up-delay-1">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card1.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card1.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow card-hover-lift animate-fade-in-up-delay-2">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card2.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card2.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow card-hover-lift animate-fade-in-up-delay-3">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
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
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("home.mission.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("home.mission.description")}</p>
              <div className="space-y-4 stagger-animation">
                <div className="flex gap-3 animate-fade-in-up">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <span className="font-semibold">{t("home.mission.feature1.title")}</span> {t("home.mission.feature1.description")}
                  </p>
                </div>
                <div className="flex gap-3 animate-fade-in-up">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <span className="font-semibold">{t("home.mission.feature2.title")}</span> {t("home.mission.feature2.description")}
                  </p>
                </div>
                <div className="flex gap-3 animate-fade-in-up">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">
                    <span className="font-semibold">{t("home.mission.feature3.title")}</span> {t("home.mission.feature3.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl animate-slide-in-right card-hover-lift">
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
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("home.value.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("home.value.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-border bg-card card-hover-lift shine-effect animate-scale-in-delay-1">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{t("home.value.buyers.title")}</h3>
                <ul className="space-y-3 stagger-animation">
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

            <Card className="border-border bg-card card-hover-lift shine-effect animate-scale-in-delay-2">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{t("home.value.professionals.title")}</h3>
                <ul className="space-y-3 stagger-animation">
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
      <section className="py-24 bg-primary text-primary-foreground animate-fade-in">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance animate-fade-in-up">{t("home.cta.title")}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty animate-fade-in-up-delay-1">
              {t("home.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up-delay-2">
              <Button asChild size="lg" variant="secondary" className="text-base px-8 card-hover-lift">
                <Link to="/journey">
                  {t("home.cta.ctaPrimary")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 card-hover-lift"
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
