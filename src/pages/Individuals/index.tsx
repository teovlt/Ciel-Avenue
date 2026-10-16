import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  Eye,
  FileSearch,
  FolderOpen,
  GitCompare,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  Signpost,
  Hand,
  CircleHelp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/customs/section-heading";
import { Faq, type FaqItem } from "@/components/customs/faq";
import { ClosingBanner, JournalSection, JourneySteps, VisionMission } from "@/components/customs/page-sections";

// Pilot interest goes to the (demonstration) individual form on the Contact page.
// Point this at the real sign-up destination once it exists.
const PILOT_REQUEST_PATH = "/contact#particuliers";

const primaryCta = "bg-caramel text-caramel-foreground hover:bg-caramel/90 text-base px-6 h-12 rounded-xl group";
const secondaryCta = "text-base px-6 h-12 rounded-xl border-foreground/20 bg-background";

export default function Individuals() {
  const { t } = useTranslation();

  const list = (key: string) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  const faqItems = t("individuals.faq.items", { returnObjects: true }) as FaqItem[];
  const celesteQuestions = t("individuals.celeste.questions", { returnObjects: true }) as FaqItem[];
  const options = t("individuals.method.options.items", { returnObjects: true }) as Array<{ name: string; questions: string[] }>;

  const pillars = [
    { key: "clarity", icon: Eye },
    { key: "prepare", icon: FolderOpen },
    { key: "dialogue", icon: MessagesSquare },
  ];

  const trust = [
    { key: "privacy", icon: ShieldCheck },
    { key: "territory", icon: MapPin },
    { key: "decision", icon: Hand },
  ];

  const PilotButton = ({ label }: { label: string }) => (
    <Button asChild size="lg" className={primaryCta}>
      <Link to={PILOT_REQUEST_PATH}>
        {label}
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
    </Button>
  );

  return (
    <div className="overflow-x-hidden pt-20">
      {/* 1. Hero — warm interior, promise, pilot CTA, "Mon espace" card */}
      <section aria-labelledby="individuals-title" className="bg-gradient-to-b from-secondary/50 to-background">
        <img src="/images/individuals/hero.jpg" alt="" className="w-full h-24 sm:h-36 object-cover object-center" />
        <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                <MapPin className="h-4 w-4 text-caramel" aria-hidden="true" />
                {t("individuals.hero.badge")}
              </span>
              <h1 id="individuals-title" className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
                {t("individuals.hero.titleStart")} <span className="text-caramel">{t("individuals.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">{t("individuals.hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <PilotButton label={t("individuals.hero.ctaPrimary")} />
                <Button asChild size="lg" variant="outline" className={secondaryCta}>
                  <a href="#etapes">{t("individuals.hero.ctaSecondary")}</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t("individuals.hero.microtext")}</p>
            </div>

            <figure className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up-delay-2">
              <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                <img src="/images/about/my-space.jpg" alt="" className="w-full h-24 object-cover" />
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("individuals.card.label")}</p>
                    <p className="text-lg font-semibold text-foreground">{t("individuals.card.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("individuals.card.goal")}</p>
                  </div>
                  <dl className="space-y-3 text-sm">
                    {(["passport", "question", "next"] as const).map((key) => (
                      <div key={key} className={key === "passport" ? "rounded-xl bg-muted/70 p-4" : ""}>
                        <dt className="font-semibold text-foreground">{t(`individuals.card.${key}Label`)}</dt>
                        <dd className="text-muted-foreground">{t(`individuals.card.${key}`)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground text-center lg:text-left">
                {t("individuals.card.caption")}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Vision */}
      <section aria-labelledby="ind-vision-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="ind-vision-title" title={t("individuals.vision.title")} description={t("individuals.vision.description")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-caramel" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`individuals.vision.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`individuals.vision.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Method — documents → options → next action */}
      <section id="methode" aria-labelledby="ind-method-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading
            id="ind-method-title"
            eyebrow={t("individuals.method.eyebrow")}
            title={t("individuals.method.title")}
            description={t("individuals.method.description")}
          />

          {/* Starting point: before / after */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
            <h3 className="text-xl font-bold text-foreground">{t("individuals.method.start.title")}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{t("individuals.method.start.description")}</p>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["before", "after"] as const).map((key) => (
                <div key={key} className={`rounded-xl p-5 ${key === "after" ? "bg-secondary" : "bg-muted"}`}>
                  <dt className="font-semibold text-foreground">{t(`individuals.method.start.${key}.label`)}</dt>
                  <dd className="text-muted-foreground mt-1">{t(`individuals.method.start.${key}.text`)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Documents */}
            <li className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <img src="/images/contact/couple.jpg" alt="" loading="lazy" className="w-full h-32 object-cover" />
              <div className="p-6 space-y-4 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-caramel">
                  <FileSearch className="h-4 w-4" aria-hidden="true" />
                  {t("individuals.method.documents.eyebrow")}
                </p>
                <h3 className="text-lg font-bold text-foreground">{t("individuals.method.documents.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("individuals.method.documents.description")}</p>
                <ul className="space-y-2">
                  {list("individuals.method.documents.items").map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground border-t border-border pt-3">{t("individuals.method.documents.warning")}</p>
              </div>
            </li>

            {/* 2. Options */}
            <li className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-caramel">
                <GitCompare className="h-4 w-4" aria-hidden="true" />
                {t("individuals.method.options.eyebrow")}
              </p>
              <h3 className="text-lg font-bold text-foreground">{t("individuals.method.options.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("individuals.method.options.description")}</p>
              <dl className="space-y-3">
                {Array.isArray(options) &&
                  options.map((option) => (
                    <div key={option.name} className="rounded-xl bg-muted/70 p-4">
                      <dt className="font-semibold text-foreground">{option.name}</dt>
                      {option.questions.map((q) => (
                        <dd key={q} className="text-sm text-muted-foreground mt-1">
                          {q}
                        </dd>
                      ))}
                    </div>
                  ))}
              </dl>
              <p className="text-sm text-muted-foreground">{t("individuals.method.options.warning")}</p>
            </li>

            {/* 3. Next action */}
            <li className="rounded-2xl border border-border bg-card p-6 space-y-4 flex flex-col">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-caramel">
                <Signpost className="h-4 w-4" aria-hidden="true" />
                {t("individuals.method.next.eyebrow")}
              </p>
              <h3 className="text-lg font-bold text-foreground">{t("individuals.method.next.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("individuals.method.next.description")}</p>
              <ul className="space-y-2 flex-1">
                {list("individuals.method.next.items").map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-xl bg-secondary p-4 text-sm font-medium text-secondary-foreground">
                {t("individuals.method.next.example")}
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 4. Seven-step journey */}
      <JourneySteps prefix="individuals.steps" />

      {/* 5. Dark panels — frictions and common thread */}
      <section aria-label={t("individuals.dark.label")} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-espresso text-espresso-foreground p-7 md:p-9 space-y-5">
            <h2 className="text-2xl font-bold">{t("individuals.dark.frictions.title")}</h2>
            <p className="opacity-85">{t("individuals.dark.frictions.intro")}</p>
            <ul className="space-y-3">
              {list("individuals.dark.frictions.items").map((item) => (
                <li key={item} className="flex gap-3">
                  <CircleHelp className="h-5 w-5 mt-0.5 shrink-0 opacity-80" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm opacity-75">{t("individuals.dark.frictions.note")}</p>
          </div>
          <div className="rounded-2xl bg-espresso text-espresso-foreground p-7 md:p-9 space-y-5">
            <h2 className="text-2xl font-bold">{t("individuals.dark.thread.title")}</h2>
            <ol className="flex flex-wrap items-center gap-2">
              {list("individuals.dark.thread.steps").map((step, i, all) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-espresso-foreground/30 px-3 py-1 text-sm font-medium">{step}</span>
                  {i < all.length - 1 && <ArrowRight className="h-4 w-4 opacity-70" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <p className="opacity-85 leading-relaxed">{t("individuals.dark.thread.description")}</p>
          </div>
        </div>
      </section>

      {/* 6. Céleste */}
      <section aria-labelledby="ind-celeste-title" className="py-20 md:py-28 bg-muted/50">
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
                {t("individuals.celeste.badge")}
              </span>
            </div>
            <SectionHeading
              id="ind-celeste-title"
              title={t("individuals.celeste.title")}
              description={t("individuals.celeste.description")}
            />
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["can", "cannot"] as const).map((key) => (
                <div key={key} className="rounded-2xl border border-border bg-card p-5">
                  <dt className="font-semibold text-foreground">{t(`individuals.celeste.${key}.title`)}</dt>
                  {list(`individuals.celeste.${key}.items`).map((item) => (
                    <dd key={item} className="text-sm text-muted-foreground mt-2">
                      {item}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t("individuals.celeste.questionsTitle")}</h3>
            {Array.isArray(celesteQuestions) && <Faq items={celesteQuestions} defaultOpen={null} />}
            <p className="text-sm font-medium text-foreground">{t("individuals.celeste.note")}</p>
          </div>
        </div>
      </section>

      {/* 7. Benefits */}
      <section aria-labelledby="ind-benefits-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="ind-benefits-title" title={t("individuals.benefits.title")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["start", "compare", "meeting"] as const).map((key) => (
              <li key={key} className="p-7 rounded-2xl bg-card border border-border space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{t(`individuals.benefits.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`individuals.benefits.${key}.description`)}</p>
              </li>
            ))}
          </ul>
          <PilotButton label={t("individuals.benefits.cta")} />
        </div>
      </section>

      {/* 8. Trust & availability */}
      <section aria-labelledby="ind-trust-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="ind-trust-title" title={t("individuals.trust.title")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trust.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4 items-start">
                <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-caramel" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t(`individuals.trust.${key}.title`)}</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{t(`individuals.trust.${key}.description`)}</p>
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

      {/* 9–10. Vision & mission, journal */}
      <VisionMission prefix="individuals.visionMission" />
      <JournalSection prefix="individuals.journal" />

      {/* 11. FAQ */}
      <section id="faq" aria-labelledby="ind-faq-title" className="py-20 md:py-28 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-10">
          <SectionHeading id="ind-faq-title" title={t("individuals.faq.title")} />
          {Array.isArray(faqItems) && <Faq items={faqItems} />}
        </div>
      </section>

      {/* 12. Caramel banner */}
      <ClosingBanner prefix="individuals.cta" to={PILOT_REQUEST_PATH} />
    </div>
  );
}
