import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  CircleHelp,
  ClipboardList,
  FileStack,
  GitCompare,
  Hand,
  ListChecks,
  MapPin,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/customs/section-heading";
import { Faq, type FaqItem } from "@/components/customs/faq";
import { ClosingBanner, JournalSection, JourneySteps, VisionMission } from "@/components/customs/page-sections";

// Pilot applications go to the (demonstration) professional form on the Contact page.
// Point this at the real application destination once it exists.
const PILOT_APPLICATION_PATH = "/contact#professionnels";

const primaryCta = "bg-caramel text-caramel-foreground hover:bg-caramel/90 text-base px-6 h-12 rounded-xl group";
const secondaryCta = "text-base px-6 h-12 rounded-xl border-foreground/20 bg-background";

export default function Professionals() {
  const { t } = useTranslation();

  const list = (key: string) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  const faqItems = t("professionals.faq.items", { returnObjects: true }) as FaqItem[];
  const celesteQuestions = t("professionals.celeste.questions", { returnObjects: true }) as FaqItem[];
  const options = t("professionals.method.options.items", { returnObjects: true }) as Array<{ name: string; scope: string }>;
  const roles = t("professionals.roles.items", { returnObjects: true }) as Array<{ who: string; items: string[] }>;

  const pillars = [
    { key: "context", icon: ClipboardList },
    { key: "nextAction", icon: UserCheck },
    { key: "expertise", icon: Scale },
  ];

  const benefits = [
    { key: "brief", icon: ClipboardList },
    { key: "documents", icon: FileStack },
    { key: "followUp", icon: ListChecks },
  ];

  const trust = [
    { key: "access", icon: ShieldCheck },
    { key: "territory", icon: MapPin },
    { key: "responsibility", icon: Hand },
  ];

  const ApplyButton = ({ label }: { label: string }) => (
    <Button asChild size="lg" className={primaryCta}>
      <Link to={PILOT_APPLICATION_PATH}>
        {label}
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
    </Button>
  );

  return (
    <div className="overflow-x-hidden pt-20">
      {/* 1. Hero — professionals around plans, pilot application CTA, "Mon espace" card */}
      <section aria-labelledby="professionals-title" className="bg-gradient-to-b from-secondary/50 to-background">
        <img src="/images/professionals/hero.jpg" alt="" className="w-full h-24 sm:h-36 object-cover object-center" />
        <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                <MapPin className="h-4 w-4 text-caramel" aria-hidden="true" />
                {t("professionals.hero.badge")}
              </span>
              <h1 id="professionals-title" className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
                {t("professionals.hero.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">{t("professionals.hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ApplyButton label={t("professionals.hero.ctaPrimary")} />
                <Button asChild size="lg" variant="outline" className={secondaryCta}>
                  <a href="#etapes">{t("professionals.hero.ctaSecondary")}</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t("professionals.hero.microtext")}</p>
            </div>

            <figure className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up-delay-2">
              <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                <img src="/images/contact/professionals.jpg" alt="" className="w-full h-24 object-cover" />
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("professionals.card.label")}</p>
                    <p className="text-lg font-semibold text-foreground">{t("professionals.card.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("professionals.card.goal")}</p>
                  </div>
                  <dl className="space-y-3 text-sm">
                    {(["documents", "question", "next"] as const).map((key) => (
                      <div key={key} className={key === "documents" ? "rounded-xl bg-muted/70 p-4" : ""}>
                        <dt className="font-semibold text-foreground">{t(`professionals.card.${key}Label`)}</dt>
                        <dd className="text-muted-foreground">{t(`professionals.card.${key}`)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground text-center lg:text-left">
                {t("professionals.card.caption")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Vision */}
      <section aria-labelledby="pro-vision-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading
            id="pro-vision-title"
            title={t("professionals.vision.title")}
            description={t("professionals.vision.description")}
          />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-caramel" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`professionals.vision.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`professionals.vision.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Three columns — request, options, useful context */}
      <section aria-labelledby="pro-method-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading
            id="pro-method-title"
            eyebrow={t("professionals.method.eyebrow")}
            title={t("professionals.method.title")}
            description={t("professionals.method.description")}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Request */}
            <article aria-labelledby="pro-col-request" className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <img src="/images/contact/professionals.jpg" alt="" loading="lazy" className="w-full h-32 object-cover" />
              <div className="p-6 space-y-4">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-caramel">
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  {t("professionals.method.request.eyebrow")}
                </p>
                <h3 id="pro-col-request" className="text-lg font-bold text-foreground">
                  {t("professionals.method.request.title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t("professionals.method.request.description")}</p>
                <dl className="space-y-3">
                  {(["before", "after"] as const).map((key) => (
                    <div key={key} className={`rounded-xl p-4 ${key === "after" ? "bg-secondary" : "bg-muted"}`}>
                      <dt className="font-semibold text-foreground">{t(`professionals.method.request.${key}.label`)}</dt>
                      <dd className="text-sm text-muted-foreground mt-1">{t(`professionals.method.request.${key}.text`)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>

            {/* Options */}
            <article aria-labelledby="pro-col-options" className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-caramel">
                <GitCompare className="h-4 w-4" aria-hidden="true" />
                {t("professionals.method.options.eyebrow")}
              </p>
              <h3 id="pro-col-options" className="text-lg font-bold text-foreground">
                {t("professionals.method.options.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t("professionals.method.options.description")}</p>
              <dl className="space-y-3">
                {Array.isArray(options) &&
                  options.map((option) => (
                    <div key={option.name} className="rounded-xl bg-muted/70 p-4">
                      <dt className="font-semibold text-foreground">{option.name}</dt>
                      <dd className="text-sm text-muted-foreground mt-1">{option.scope}</dd>
                    </div>
                  ))}
              </dl>
            </article>

            {/* Useful context */}
            <article aria-labelledby="pro-col-context" className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-caramel">
                <FileStack className="h-4 w-4" aria-hidden="true" />
                {t("professionals.method.context.eyebrow")}
              </p>
              <h3 id="pro-col-context" className="text-lg font-bold text-foreground">
                {t("professionals.method.context.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t("professionals.method.context.description")}</p>
              <ul className="space-y-2">
                {list("professionals.method.context.items").map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-xl bg-secondary p-4 text-sm font-medium text-secondary-foreground">
                {t("professionals.method.context.boundary")}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Seven-step journey */}
      <JourneySteps prefix="professionals.steps" />

      {/* 5. Dark panels — continuity and coordination */}
      <section aria-label={t("professionals.dark.label")} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-espresso text-espresso-foreground p-7 md:p-9 space-y-5">
            <h2 className="text-2xl font-bold">{t("professionals.dark.frictions.title")}</h2>
            <p className="opacity-85">{t("professionals.dark.frictions.intro")}</p>
            <ul className="space-y-3">
              {list("professionals.dark.frictions.items").map((item) => (
                <li key={item} className="flex gap-3">
                  <CircleHelp className="h-5 w-5 mt-0.5 shrink-0 opacity-80" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm opacity-75">{t("professionals.dark.frictions.note")}</p>
          </div>
          <div className="rounded-2xl bg-espresso text-espresso-foreground p-7 md:p-9 space-y-5">
            <h2 className="text-2xl font-bold">{t("professionals.dark.thread.title")}</h2>
            <ol className="flex flex-wrap items-center gap-2">
              {list("professionals.dark.thread.steps").map((step, i, all) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-espresso-foreground/30 px-3 py-1 text-sm font-medium">{step}</span>
                  {i < all.length - 1 && <ArrowRight className="h-4 w-4 opacity-70" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <p className="opacity-85 leading-relaxed">{t("professionals.dark.thread.description")}</p>
          </div>
        </div>
      </section>

      {/* 6. Responsibilities, deliverables, document-sharing boundaries */}
      <section aria-labelledby="pro-roles-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <SectionHeading id="pro-roles-title" title={t("professionals.roles.title")} description={t("professionals.roles.description")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(roles) &&
              roles.map((role) => (
                <div key={role.who} className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{role.who}</h3>
                  <ul className="space-y-2">
                    {role.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t("professionals.roles.sharing.title")}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {list("professionals.roles.sharing.items").map((item) => (
                <li key={item} className="flex gap-2 text-sm text-foreground">
                  <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">{t("professionals.roles.sharing.note")}</p>
          </div>
        </div>
      </section>

      {/* 7. Céleste */}
      <section aria-labelledby="pro-celeste-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <img
                src="/images/celeste-avatar.png"
                alt=""
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16 rounded-full object-cover"
              />
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                {t("professionals.celeste.badge")}
              </span>
            </div>
            <SectionHeading
              id="pro-celeste-title"
              title={t("professionals.celeste.title")}
              description={t("professionals.celeste.description")}
            />
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["can", "cannot"] as const).map((key) => (
                <div key={key} className="rounded-2xl border border-border bg-card p-5">
                  <dt className="font-semibold text-foreground">{t(`professionals.celeste.${key}.title`)}</dt>
                  {list(`professionals.celeste.${key}.items`).map((item) => (
                    <dd key={item} className="text-sm text-muted-foreground mt-2">
                      {item}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t("professionals.celeste.questionsTitle")}</h3>
            {Array.isArray(celesteQuestions) && <Faq items={celesteQuestions} defaultOpen={null} />}
            <p className="text-sm font-medium text-foreground">{t("professionals.celeste.note")}</p>
          </div>
        </div>
      </section>

      {/* 8. Benefits with concrete examples */}
      <section aria-labelledby="pro-benefits-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading
            id="pro-benefits-title"
            title={t("professionals.benefits.title")}
            description={t("professionals.benefits.description")}
          />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-caramel" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`professionals.benefits.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`professionals.benefits.${key}.description`)}</p>
                <p className="mt-auto rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
                  {t(`professionals.benefits.${key}.example`)}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{t("professionals.benefits.note")}</p>
          <ApplyButton label={t("professionals.benefits.cta")} />
        </div>
      </section>

      {/* 9. Trust & availability */}
      <section aria-labelledby="pro-trust-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="pro-trust-title" title={t("professionals.trust.title")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trust.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4 items-start">
                <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-caramel" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t(`professionals.trust.${key}.title`)}</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{t(`professionals.trust.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">{t("home.trust.availability.title")}</h3>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(["available", "inProgress", "planned"] as const).map((key) => (
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

      {/* 10–11. Vision & mission, journal */}
      <VisionMission prefix="professionals.visionMission" />
      <JournalSection prefix="professionals.journal" />

      {/* 12. FAQ */}
      <section id="faq" aria-labelledby="pro-faq-title" className="py-20 md:py-28 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-10">
          <SectionHeading id="pro-faq-title" title={t("professionals.faq.title")} />
          {Array.isArray(faqItems) && <Faq items={faqItems} />}
        </div>
      </section>

      {/* 13. Caramel banner */}
      <ClosingBanner prefix="professionals.cta" to={PILOT_APPLICATION_PATH} />
    </div>
  );
}
