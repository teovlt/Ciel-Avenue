import { useTranslation } from "react-i18next";
import { ArrowRight, Check, Compass, Footprints, Linkedin, MapPin, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/customs/section-heading";
import { Faq, type FaqItem } from "@/components/customs/faq";
import { LINKEDIN_URL, pilotMailto } from "@/lib/contact";

const primaryCta = "bg-caramel text-caramel-foreground hover:bg-caramel/90 text-base px-6 h-12 rounded-xl group";

// Names and portraits come from the supplied mockup. Roles, agreements and image rights
// must be confirmed before publication.
const advisors = [
  { key: "aurelien", name: "Aurélien Tardieu", image: "/images/about/aurelien-tardieu.jpg" },
  { key: "wassima", name: "Wassima Dajaens-Guerrouani", image: "/images/about/wassima-dajaens-guerrouani.jpg" },
  { key: "maximilien", name: "Maximilien Nayaradou", image: "/images/about/maximilien-nayaradou.jpg" },
  { key: "denis", name: "Denis Granger-Chancel", image: "/images/about/denis-granger-chancel.jpg" },
  { key: "benoit", name: "Benoît H. Perrin", image: "/images/about/benoit-h-perrin.jpg" },
];

export default function About() {
  const { t } = useTranslation();

  const list = (key: string) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  const faqItems = t("about.faq.items", { returnObjects: true }) as FaqItem[];

  const pillars = [
    { key: "origin", icon: Footprints },
    { key: "method", icon: Route },
    { key: "proof", icon: Compass },
  ];

  return (
    <div className="overflow-x-hidden pt-20">
      {/* 1. Hero — building photo, intro, "Mon espace" card */}
      <section aria-labelledby="about-title" className="bg-gradient-to-b from-secondary/50 to-background">
        <img src="/images/about/building.jpg" alt="" className="w-full h-28 sm:h-40 object-cover object-center" />
        <div className="container mx-auto px-4 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                <MapPin className="h-4 w-4 text-caramel" aria-hidden="true" />
                {t("about.hero.badge")}
              </span>
              <h1 id="about-title" className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
                {t("about.hero.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">{t("about.hero.description")}</p>
              <Button asChild size="lg" variant="outline" className="text-base px-6 h-12 rounded-xl border-foreground/20 bg-background">
                <a href="#histoire">{t("about.hero.cta")}</a>
              </Button>
              <p className="text-sm text-muted-foreground">{t("about.hero.microtext")}</p>
            </div>

            <figure className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up-delay-2">
              <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                <img src="/images/about/my-space.jpg" alt="" className="w-full h-24 object-cover" />
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("about.card.label")}</p>
                    <p className="text-lg font-semibold text-foreground">{t("about.card.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("about.card.subtitle")}</p>
                  </div>
                  <div className="rounded-xl bg-muted/70 p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">{t("about.card.threadLabel")}</p>
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-foreground">
                      {list("about.card.thread").map((step, i, all) => (
                        <li key={step} className="flex items-center gap-2">
                          {step}
                          {i < all.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-caramel" aria-hidden="true" />}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="inline font-semibold text-foreground">{t("about.card.findingLabel")} </dt>
                      <dd className="inline text-muted-foreground">{t("about.card.finding")}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-foreground">{t("about.card.ambitionLabel")} </dt>
                      <dd className="inline text-muted-foreground">{t("about.card.ambition")}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground text-center lg:text-left">{t("about.card.caption")}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Vision */}
      <section aria-labelledby="vision-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="vision-title" title={t("about.vision.title")} description={t("about.vision.description")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-caramel" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`about.vision.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`about.vision.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Story */}
      <section id="histoire" aria-labelledby="story-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-6">
          <SectionHeading id="story-title" eyebrow={t("about.story.eyebrow")} title={t("about.story.title")} />
          {list("about.story.paragraphs").map((paragraph) => (
            <p key={paragraph} className="text-lg text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 4. Founder */}
      <section aria-labelledby="team-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="team-title" title={t("about.team.title")} />
          <article
            aria-labelledby="founder-name"
            className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <img
              src="/images/timon.jpeg"
              alt={t("about.founder.imageAlt")}
              width={220}
              height={220}
              loading="lazy"
              className="w-40 h-40 md:w-[220px] md:h-[220px] rounded-2xl object-cover object-top"
            />
            <div className="space-y-4">
              <div>
                <h3 id="founder-name" className="text-2xl font-bold text-foreground">
                  Timon Guillotin
                </h3>
                <p className="font-medium text-caramel">{t("about.founder.role")}</p>
              </div>
              <p className="text-lg font-semibold text-foreground">{t("about.founder.headline")}</p>
              {list("about.founder.bio").map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* 5. Advisors */}
      <section aria-labelledby="advisors-title" className="pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <SectionHeading id="advisors-title" title={t("about.advisors.title")} description={t("about.advisors.description")} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {advisors.map((advisor) => (
              <li
                key={advisor.key}
                className="flex sm:flex-col items-center sm:text-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <img
                  src={advisor.image}
                  alt={t("about.advisors.portraitAlt", { name: advisor.name })}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{advisor.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t(`about.advisors.expertise.${advisor.key}`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{t("about.advisors.note")}</p>
        </div>
      </section>

      {/* 6. Ecosystem */}
      <section aria-labelledby="ecosystem-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-8">
          <SectionHeading id="ecosystem-title" title={t("about.ecosystem.title")} description={t("about.ecosystem.description")} />
          <ul className="flex flex-wrap gap-3">
            {list("about.ecosystem.items").map((item) => (
              <li key={item} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{t("about.ecosystem.note")}</p>
        </div>
      </section>

      {/* 7. Investor interest */}
      <section aria-labelledby="invest-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeading id="invest-title" title={t("about.invest.title")} description={t("about.invest.description")} />
            <Button asChild size="lg" className={`${primaryCta} self-start lg:self-auto`}>
              <a href={pilotMailto("investor")}>
                {t("about.invest.cta")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["ambition", "proof", "governance"] as const).map((key) => (
              <li key={key} className="p-7 rounded-2xl bg-card border border-border space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{t(`about.invest.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`about.invest.${key}.description`)}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{t("about.invest.note")}</p>
        </div>
      </section>

      {/* 8. Vision & mission with photos */}
      <section aria-label={t("about.visionMission.label")} className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <article aria-labelledby="vm-vision" className="rounded-2xl border border-border bg-card overflow-hidden">
            <img src="/images/about/architecture.jpg" alt="" loading="lazy" className="w-full h-44 object-cover" />
            <div className="p-7 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{t("about.visionMission.vision.eyebrow")}</p>
              <h3 id="vm-vision" className="text-xl font-bold text-foreground">
                {t("about.visionMission.vision.title")}
              </h3>
              {list("about.visionMission.vision.paragraphs").map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <article aria-labelledby="vm-mission" className="rounded-2xl border border-border bg-card overflow-hidden">
            <img src="/images/about/interior.jpg" alt="" loading="lazy" className="w-full h-44 object-cover" />
            <div className="p-7 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{t("about.visionMission.mission.eyebrow")}</p>
              <h3 id="vm-mission" className="text-xl font-bold text-foreground">
                {t("about.visionMission.mission.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t("about.visionMission.mission.description")}</p>
              <ul className="space-y-2">
                {list("about.visionMission.mission.points").map((point) => (
                  <li key={point} className="flex gap-3 text-foreground">
                    <Check className="h-5 w-5 mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* 9. Journal */}
      <section aria-labelledby="journal-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <SectionHeading id="journal-title" title={t("about.journal.title")} description={t("about.journal.description")} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list("about.journal.topics").map((topic, i) => (
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-muted/60 border border-border p-6">
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

      {/* 10. FAQ */}
      <section aria-labelledby="about-faq-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-10">
          <SectionHeading id="about-faq-title" title={t("about.faq.title")} />
          {Array.isArray(faqItems) && <Faq items={faqItems} />}
        </div>
      </section>

      {/* 11. Caramel banner */}
      <section aria-labelledby="about-cta-title" className="py-20 md:py-28 bg-caramel text-caramel-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 id="about-cta-title" className="text-3xl md:text-4xl font-bold leading-tight">
              {t("about.cta.title")}
            </h2>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 text-base px-6 h-12 rounded-xl group focus-visible:outline-background"
            >
              <a href={pilotMailto("exchange")}>
                {t("about.cta.button")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
            <p className="text-sm opacity-80">{t("about.cta.note")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
