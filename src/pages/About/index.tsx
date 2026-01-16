import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const team = [
    { name: "Timon Guillotin", role: t("about.team.member2.role"), image: "/images/timon.jpeg" },
    { name: "Thomas Bernabé", role: t("about.team.member1.role"), image: "/images/thomas.jpeg" },
  ];

  const values = [
    { icon: Users, key: "human", color: "bg-blue-100 dark:bg-blue-950", iconColor: "text-blue-600" },
    { icon: Target, key: "excellence", color: "bg-purple-100 dark:bg-purple-950", iconColor: "text-purple-600" },
    { icon: Lightbulb, key: "innovation", color: "bg-amber-100 dark:bg-amber-950", iconColor: "text-amber-600" },
    { icon: Award, key: "integrity", color: "bg-emerald-100 dark:bg-emerald-950", iconColor: "text-emerald-600" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight animate-fade-in-up">
              {t("about.hero.title")} <span className="text-primary">CIEL AVENUE</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay-1">
              {t("about.hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                    alt={t("about.vision.imageAlt")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                  {t("about.vision.badge")}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{t("about.vision.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.vision.description1")}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.vision.description2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                  {t("about.mission.badge")}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{t("about.mission.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("about.mission.description")}</p>

                <div className="space-y-4 pt-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold">{num}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{t(`about.mission.step${num}.title`)}</h4>
                        <p className="text-muted-foreground text-sm">{t(`about.mission.step${num}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                    alt={t("about.mission.imageAlt")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("about.values.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("about.values.description")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <Card key={value.key} className="border-0 shadow-lg text-center">
                <CardContent className="p-8 space-y-4">
                  <div className={`mx-auto h-14 w-14 rounded-2xl ${value.color} flex items-center justify-center`}>
                    <value.icon className={`h-7 w-7 ${value.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t(`about.values.${value.key}.title`)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(`about.values.${value.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("about.team.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("about.team.description")}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="flex-1 max-w-xs mx-auto">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-white/80">{member.role}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-background/10 mx-auto">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">{t("about.cta.title")}</h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">{t("about.cta.description")}</p>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 h-auto rounded-xl group"
            >
              <Link to="/contact">
                {t("about.cta.button")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
