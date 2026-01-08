import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const team = [
    { name: "Thomas Bernabé", role: t("about.team.member1.role"), image: "/images/thomas.jpeg" },
    { name: "Timon guillotin", role: t("about.team.member2.role"), image: "/images/timon.jpeg" },
  ];

  return (
    <div className="min-h-screen pt-20 page-transition">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance animate-fade-in-up">
              {t("about.hero.title")} <span className="text-gradient">CIEL AVENUE</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty animate-fade-in-up-delay-1">
              {t("about.hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden animate-slide-in-left card-hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  alt={t("about.vision.imageAlt")}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-6 animate-slide-in-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary animate-bounce-in">
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
              <div className="space-y-6 order-2 lg:order-1 animate-slide-in-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary animate-bounce-in">
                  <Lightbulb className="h-4 w-4" />
                  {t("about.mission.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.mission.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.mission.description")}</p>
                <div className="space-y-4 pt-4 stagger-animation">
                  <div className="flex gap-3 animate-fade-in-up">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("about.mission.step1.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("about.mission.step1.description")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 animate-fade-in-up">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{t("about.mission.step2.title")}</h4>
                      <p className="text-sm text-muted-foreground">{t("about.mission.step2.description")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 animate-fade-in-up">
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

              <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden order-1 lg:order-2 animate-slide-in-right card-hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1542596594-649edbc13630?w=1200&q=80"
                  alt={t("about.mission.imageAlt")}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.values.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("about.values.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow card-hover-lift animate-scale-in">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.human.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.human.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow card-hover-lift animate-scale-in-delay-1">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.excellence.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.excellence.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow card-hover-lift animate-scale-in-delay-2">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
                  <Lightbulb className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("about.values.innovation.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("about.values.innovation.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center hover:shadow-lg transition-shadow card-hover-lift animate-scale-in-delay-3">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center animate-bounce-in">
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
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">{t("about.team.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("about.team.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className={`border-border bg-card hover:shadow-lg transition-shadow overflow-hidden card-hover-lift animate-fade-in-up-delay-${index + 1}`}
              >
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
      <section className="py-24 bg-primary text-primary-foreground animate-fade-in">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Mail className="h-16 w-16 mx-auto animate-bounce-in" />
            <h2 className="text-3xl md:text-5xl font-bold text-balance animate-fade-in-up">{t("about.cta.title")}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty animate-fade-in-up-delay-1">
              {t("about.cta.description")}
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base px-8 card-hover-lift animate-fade-in-up-delay-2">
              <Link to="/contact">{t("about.cta.button")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
