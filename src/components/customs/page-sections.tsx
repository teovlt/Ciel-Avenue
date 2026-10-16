import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/customs/section-heading";
import { LINKEDIN_URL } from "@/lib/contact";

/** Section blocks shared by the audience pages (Particuliers, Professionnels). */

const toId = (prefix: string) => prefix.replace(/\./g, "-");

const useList = () => {
  const { t } = useTranslation();
  return (key: string) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };
};

interface Step {
  title: string;
  description: string;
  todo: string[];
}

/** Seven-step journey: real text per step, prototype screen as an illustrative thumbnail. */
export function JourneySteps({ prefix, className = "" }: { prefix: string; className?: string }) {
  const { t } = useTranslation();
  const steps = t(`${prefix}.items`, { returnObjects: true }) as Step[];

  return (
    <section id="etapes" aria-labelledby={`${toId(prefix)}-title`} className={`py-20 md:py-28 bg-secondary/60 scroll-mt-20 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
        <SectionHeading
          id={`${toId(prefix)}-title`}
          eyebrow={t(`${prefix}.eyebrow`)}
          title={t(`${prefix}.title`)}
          description={t(`${prefix}.description`)}
        />
        <ol className="space-y-5">
          {Array.isArray(steps) &&
            steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_120px] gap-x-5 gap-y-3 rounded-2xl border border-border bg-card p-5 md:p-6"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel text-caramel-foreground font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="space-y-3 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    <span className="sr-only">{t(`${prefix}.stepLabel`, { n: i + 1 })} </span>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t(`${prefix}.todoLabel`)}</p>
                    <ul className="mt-1 space-y-1">
                      {step.todo.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <img
                  src={`/images/steps/step-${i + 1}.jpg`}
                  alt=""
                  width={120}
                  height={186}
                  loading="lazy"
                  className="hidden md:block w-[120px] rounded-lg border border-border object-cover object-top self-start"
                />
              </li>
            ))}
        </ol>
        <p className="text-sm text-muted-foreground">{t(`${prefix}.caption`)}</p>
      </div>
    </section>
  );
}

/** Vision and mission cards with the architecture and interior photos. */
export function VisionMission({ prefix }: { prefix: string }) {
  const { t } = useTranslation();
  const list = useList();

  return (
    <section aria-label={t(`${prefix}.label`)} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {(["vision", "mission"] as const).map((key) => (
          <article
            key={key}
            aria-labelledby={`${toId(prefix)}-${key}`}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <img
              src={key === "vision" ? "/images/about/architecture.jpg" : "/images/about/interior.jpg"}
              alt=""
              loading="lazy"
              className="w-full h-44 object-cover"
            />
            <div className="p-7 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{t(`${prefix}.${key}.eyebrow`)}</p>
              <h3 id={`${toId(prefix)}-${key}`} className="text-xl font-bold text-foreground">
                {t(`${prefix}.${key}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t(`${prefix}.${key}.description`)}</p>
              <ul className="space-y-2 empty:hidden">
                {list(`${prefix}.${key}.points`).map((point) => (
                  <li key={point} className="flex gap-3 text-foreground">
                    <Check className="h-5 w-5 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Journal topics plus the LinkedIn follow link. */
export function JournalSection({ prefix }: { prefix: string }) {
  const { t } = useTranslation();
  const list = useList();

  return (
    <section aria-labelledby={`${toId(prefix)}-title`} className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
        <SectionHeading id={`${toId(prefix)}-title`} title={t(`${prefix}.title`)} description={t(`${prefix}.description`)} />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list(`${prefix}.topics`).map((topic, i) => (
            <li key={topic} className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-caramel"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="font-semibold text-foreground">{topic}</h3>
            </li>
          ))}
        </ol>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-background border border-border p-6">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{t("about.journal.followTitle")}</h3>
            <p className="text-sm text-muted-foreground">{t("about.journal.followDescription")}</p>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-11 px-4 rounded-xl border border-foreground/20 bg-background font-medium text-foreground hover:bg-muted self-start sm:self-auto"
          >
            <Linkedin className="h-5 w-5 text-caramel" aria-hidden="true" />
            {t("about.journal.linkedin")}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Caramel closing banner with the interior strip photo and one internal CTA. */
export function ClosingBanner({ prefix, to }: { prefix: string; to: string }) {
  const { t } = useTranslation();

  return (
    <section aria-labelledby={`${toId(prefix)}-title`} className="bg-caramel text-caramel-foreground">
      <img src="/images/contact/interior-strip.jpg" alt="" loading="lazy" className="w-full h-24 sm:h-32 object-cover opacity-90" />
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 id={`${toId(prefix)}-title`} className="text-3xl md:text-4xl font-bold leading-tight">
            {t(`${prefix}.title`)}
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 text-base px-6 h-12 rounded-xl group focus-visible:outline-background"
          >
            <Link to={to}>
              {t(`${prefix}.button`)}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-sm opacity-80">{t(`${prefix}.note`)}</p>
        </div>
      </div>
    </section>
  );
}
