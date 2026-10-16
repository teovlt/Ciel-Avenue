import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FolderOpen,
  GitCompare,
  MessagesSquare,
  MapPin,
  FlaskConical,
  ShieldCheck,
  User,
  Briefcase,
  Check,
} from "lucide-react";
import { pilotMailto } from "@/lib/contact";
import { SectionHeading } from "@/components/customs/section-heading";
import { Faq, type FaqItem } from "@/components/customs/faq";
import { ProjectPreview } from "./components/ProjectPreview";
import { PassportMockup } from "./components/PassportMockup";

const primaryCta = "bg-caramel text-caramel-foreground hover:bg-caramel/90 text-base px-6 h-12 rounded-xl group";
const secondaryCta = "text-base px-6 h-12 rounded-xl border-foreground/20 bg-background";

export function Home() {
  const { t } = useTranslation();

  const list = (key: string) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  const faqItems = t("home.faq.items", { returnObjects: true }) as FaqItem[];

  const benefits = [
    { key: "b1", icon: FolderOpen },
    { key: "b2", icon: GitCompare },
    { key: "b3", icon: MessagesSquare },
  ];

  const journeys = [
    { key: "individuals", icon: User, audience: "individual" as const },
    { key: "professionals", icon: Briefcase, audience: "professional" as const },
  ];

  const trustItems = [
    { key: "territory", icon: MapPin },
    { key: "status", icon: FlaskConical },
    { key: "sharing", icon: ShieldCheck },
  ];

  const availability = ["available", "inProgress", "planned"] as const;

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero */}
      <section
        aria-labelledby="hero-title"
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-secondary/50 to-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-7 animate-fade-in-up">
              <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.08]">
                {t("home.hero.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">{t("home.hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className={primaryCta}>
                  <a href={pilotMailto()}>
                    {t("home.hero.ctaPrimary")}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className={secondaryCta}>
                  <a href="#methode">{t("home.hero.ctaSecondary")}</a>
                </Button>
              </div>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <FlaskConical className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                {t("home.hero.microtext")}
              </p>
            </div>
            <div className="animate-fade-in-up-delay-2">
              <ProjectPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three benefits */}
      <section aria-labelledby="benefits-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="benefits-title" title={t("home.benefits.title")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-caramel" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`home.benefits.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`home.benefits.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Three-step method */}
      <section id="methode" aria-labelledby="method-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading
            id="method-title"
            eyebrow={t("home.method.eyebrow")}
            title={t("home.method.title")}
            description={t("home.method.description")}
          />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["step1", "step2", "step3"] as const).map((key, i) => (
              <li key={key} className="relative p-7 rounded-2xl bg-card border border-border space-y-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel text-caramel-foreground font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  <span className="sr-only">{t("home.method.stepLabel", { n: i + 1 })} </span>
                  {t(`home.method.${key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t(`home.method.${key}.description`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Two journeys */}
      <section id="parcours" aria-labelledby="journeys-title" className="py-20 md:py-28 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="journeys-title" eyebrow={t("home.journeys.eyebrow")} title={t("home.journeys.title")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journeys.map(({ key, icon: Icon, audience }) => (
              <article
                key={key}
                aria-labelledby={`journey-${key}`}
                className="flex flex-col gap-6 p-7 md:p-8 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="h-5 w-5 text-caramel" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{t(`home.journeys.${key}.label`)}</p>
                </div>
                <h3 id={`journey-${key}`} className="text-2xl font-bold text-foreground">
                  {t(`home.journeys.${key}.title`)}
                </h3>
                <ul className="space-y-3 flex-1">
                  {list(`home.journeys.${key}.benefits`).map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-foreground">
                      <Check className="h-5 w-5 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className={`${primaryCta} w-full sm:w-auto sm:self-start`}>
                    <a href={pilotMailto(audience)}>
                      {t(`home.journeys.${key}.cta`)}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  </Button>
                  {(key === "individuals" || key === "professionals") && (
                    <Link
                      to={key === "individuals" ? "/particuliers" : "/professionnels"}
                      className="inline-flex items-center min-h-11 text-sm font-medium text-caramel underline underline-offset-4 hover:no-underline self-start"
                    >
                      {t(`home.journeys.${key}.pageLink`)}
                    </Link>
                  )}
                  <Link
                    to="/journey"
                    className="inline-flex items-center min-h-11 text-sm font-medium text-caramel underline underline-offset-4 hover:no-underline self-start"
                  >
                    {t("home.journeys.demoLink")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Passeport du bien */}
      <section id="passeport" aria-labelledby="passport-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeading
                id="passport-title"
                eyebrow={t("home.passport.eyebrow")}
                title={t("home.passport.title")}
                description={t("home.passport.description")}
              />
              <ul className="space-y-3">
                {list("home.passport.points").map((point) => (
                  <li key={point} className="flex gap-3 text-foreground">
                    <Check className="h-5 w-5 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{t("home.passport.status")}</p>
            </div>
            <PassportMockup />
          </div>
        </div>
      </section>

      {/* 6. Trust & local focus */}
      <section aria-labelledby="trust-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="trust-title" title={t("home.trust.title")} description={t("home.trust.description")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustItems.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4 items-start">
                <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-caramel" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t(`home.trust.${key}.title`)}</h3>
                  <p className="text-muted-foreground mt-1">{t(`home.trust.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">{t("home.trust.availability.title")}</h3>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availability.map((key) => (
                <div key={key} className="space-y-2">
                  <dt className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {t(`home.trust.availability.${key}.label`)}
                  </dt>
                  <dd className="text-muted-foreground">{t(`home.trust.availability.${key}.description`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 7. Céleste — secondary, planned */}
      <section aria-labelledby="celeste-title" className="pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row gap-6 items-start rounded-2xl bg-muted/60 border border-border p-6 md:p-8">
            <img
              src="/images/celeste-avatar.png"
              alt=""
              width={64}
              height={64}
              loading="lazy"
              className="h-16 w-16 rounded-full object-cover shrink-0"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="celeste-title" className="text-xl font-bold text-foreground">
                  {t("home.celeste.title")}
                </h2>
                <span className="rounded-full border border-border bg-background px-3 py-0.5 text-xs font-semibold text-muted-foreground">
                  {t("home.celeste.badge")}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">{t("home.celeste.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-10">
          <SectionHeading id="faq-title" title={t("home.faq.title")} />
          {Array.isArray(faqItems) && <Faq items={faqItems} />}
        </div>
      </section>

      {/* 9. Final CTA */}
      <section aria-labelledby="cta-title" className="py-20 md:py-28 bg-caramel text-caramel-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 id="cta-title" className="text-3xl md:text-4xl font-bold leading-tight">
              {t("home.cta.title")}
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">{t("home.cta.description")}</p>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 text-base px-6 h-12 rounded-xl group focus-visible:outline-background"
            >
              <a href={pilotMailto()}>
                {t("home.cta.button")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
            <p className="text-sm opacity-80">{t("home.cta.note")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
