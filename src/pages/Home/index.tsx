import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Users, Shield, Zap, CheckCircle2, Award, ChevronDown } from "lucide-react";

export function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: "2 500+", label: t("home.hero.stats.users"), icon: Users },
    { value: "15 000+", label: t("home.hero.stats.properties"), icon: Building2 },
    { value: "350+", label: t("home.hero.stats.experts"), icon: Award },
    { value: "98%", label: t("home.hero.stats.satisfaction"), icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean & Professional */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80"
            alt="Architecture moderne"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="max-w-3xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("home.hero.badge")}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight leading-[1.1] animate-fade-in-up-delay-1">
              {t("home.hero.titleStart")} <span className="text-primary">{t("home.hero.titleHighlight")}</span> {t("home.hero.titleEnd")}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up-delay-2">
              {t("home.hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up-delay-3">
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto rounded-xl group">
                <Link to="/journey">
                  {t("home.hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 h-auto rounded-xl">
                <Link to="/how-it-works">{t("home.hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="py-6 sm:py-8 px-2 sm:px-4 md:px-8 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => document.getElementById("vision-section")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground/50" />
        </button>
      </section>

      {/* Vision Section */}
      <section id="vision-section" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{t("home.vision.title")}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">{t("home.vision.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card1.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card1.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
                  <Zap className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card2.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card2.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                  <Users className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("home.vision.card3.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.vision.card3.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">{t("home.mission.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("home.mission.description")}</p>

                <div className="space-y-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">{t(`home.mission.feature${num}.title`)}</span>
                        <span className="text-muted-foreground"> {t(`home.mission.feature${num}.description`)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                    alt={t("home.mission.imageAlt")}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/5 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{t("home.value.title")}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">{t("home.value.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* For Clients */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
              <CardContent className="pt-8 pb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{t("home.value.clients.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("home.value.clients.subtitle")}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{t(`home.value.clients.feature${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* For Experts */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-600" />
              <CardContent className="pt-8 pb-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{t("home.value.experts.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("home.value.experts.subtitle")}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{t(`home.value.experts.feature${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">{t("home.cta.title")}</h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">{t("home.cta.description")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 h-auto rounded-xl group"
              >
                <Link to="/journey">
                  {t("home.cta.ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 h-auto rounded-xl"
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
