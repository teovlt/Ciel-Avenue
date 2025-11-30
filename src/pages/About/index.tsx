import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  const team = [
    { name: "Thomas Bernabé", role: t("about.team.member1.role"), image: "/images/thomas.jpeg" },
    { name: "Timon guillotin", role: t("about.team.member2.role"), image: "/images/timon.jpeg" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
              {t("about.hero.title")} <span className="text-primary">CIEL AVENUE</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t("about.hero.description")}</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <img src="/images/placeholder.svg" alt={t("about.vision.imageAlt")} className="object-cover w-full h-full" />
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                  <Target className="h-4 w-4" />
                  {t("about.vision.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.vision.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.vision.description1")}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.vision.description2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                  <Lightbulb className="h-4 w-4" />
                  {t("about.mission.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.mission.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.mission.description")}</p>
                <div className="space-y-4 pt-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("about.mission.step1.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("about.mission.step1.description")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("about.mission.step2.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("about.mission.step2.description")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("about.mission.step3.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("about.mission.step3.description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden order-1 lg:order-2">
                <img src="/images/placeholder.svg" alt={t("about.mission.imageAlt")} className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.values.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("about.values.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.human.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.human.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.excellence.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.excellence.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.innovation.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.innovation.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.integrity.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.integrity.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.team.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("about.team.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="border-border bg-card hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover object-center w-full h-full" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Mail className="h-16 w-16 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold text-balance">{t("about.cta.title")}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty">{t("about.cta.description")}</p>
            <Button asChild size="lg" variant="secondary" className="text-base px-8">
              <Link to="/contact">{t("about.cta.button")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
