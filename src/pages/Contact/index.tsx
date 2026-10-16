import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Building2,
  Check,
  FileWarning,
  FlaskConical,
  Linkedin,
  MapPin,
  MessageSquare,
  Route,
  SignpostBig,
  User,
  Briefcase,
  ListChecks,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/customs/section-heading";
import { Faq, type FaqItem } from "@/components/customs/faq";
import { LINKEDIN_URL } from "@/lib/contact";
import { SimulatedForm, type FieldDef } from "./components/SimulatedForm";

const individualFields: FieldDef[] = [
  { name: "name", type: "text", required: true, autoComplete: "name" },
  { name: "email", type: "email", required: true, autoComplete: "email" },
  { name: "situation", type: "select", required: true },
  { name: "objective", type: "select", required: true },
  { name: "timeline", type: "select" },
  { name: "question", type: "textarea", required: true },
];

const professionalFields: FieldDef[] = [
  { name: "name", type: "text", required: true, autoComplete: "name" },
  { name: "email", type: "email", required: true, autoComplete: "email" },
  { name: "company", type: "text", required: true, autoComplete: "organization" },
  { name: "role", type: "text", required: true, autoComplete: "organization-title" },
  { name: "area", type: "text", required: true, full: true },
  { name: "needs", type: "textarea", required: true },
];

const organizationFields: FieldDef[] = [
  { name: "name", type: "text", required: true, autoComplete: "name" },
  { name: "email", type: "email", required: true, autoComplete: "email" },
  { name: "organization", type: "text", required: true, autoComplete: "organization", full: true },
  { name: "context", type: "textarea", required: true },
  { name: "useCase", type: "textarea", required: true },
  { name: "stakeholders", type: "text", required: true, full: true },
  { name: "outcome", type: "textarea", required: true },
];

const generalFields: FieldDef[] = [
  { name: "name", type: "text", required: true, autoComplete: "name" },
  { name: "email", type: "email", required: true, autoComplete: "email" },
  { name: "subject", type: "select", required: true, full: true },
  { name: "message", type: "textarea", required: true },
];

function OfferCard({ offerKey }: { offerKey: "discovery" | "expertPro" | "pilotOrganization" }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-bold text-foreground">{t(`contact.offers.${offerKey}.name`)}</h3>
        <p className="text-lg font-semibold text-caramel">{t(`contact.offers.${offerKey}.price`)}</p>
      </div>
      <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
        {t("contact.offers.provisional")}
      </p>
      <p className="text-muted-foreground leading-relaxed">{t(`contact.offers.${offerKey}.description`)}</p>
    </div>
  );
}

function FormCard({ titleId, prefix, fields }: { titleId: string; prefix: string; fields: FieldDef[] }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-8 space-y-5">
      <div className="space-y-2">
        <h3 id={titleId} className="text-xl font-bold text-foreground">
          {t(`${prefix}.title`)}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{t(`${prefix}.intro`)}</p>
      </div>
      <SimulatedForm prefix={prefix} fields={fields} />
    </div>
  );
}

export function Contact() {
  const { t } = useTranslation();

  const list = (key: string) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  const faqItems = t("contact.faq.items", { returnObjects: true }) as FaqItem[];

  const journeys = [
    { href: "#particuliers", key: "individuals", icon: User },
    { href: "#professionnels", key: "professionals", icon: Briefcase },
    { href: "#organisations", key: "organizations", icon: Building2 },
    { href: "#contact-general", key: "general", icon: MessageSquare },
  ];

  const pillars = [
    { key: "rightRequest", icon: SignpostBig },
    { key: "rightLevel", icon: ListChecks },
    { key: "nextSteps", icon: CalendarClock },
  ];

  const trust = [
    { key: "sensitive", icon: FileWarning },
    { key: "routing", icon: Route },
    { key: "simulation", icon: FlaskConical },
  ];

  return (
    <div className="overflow-x-hidden pt-20">
      {/* 1. Hero — living room, intro, "Mon espace" card */}
      <section aria-labelledby="contact-title" className="bg-gradient-to-b from-secondary/50 to-background">
        <img src="/images/contact/living-room.jpg" alt="" className="w-full h-28 sm:h-40 object-cover object-center" />
        <div className="container mx-auto px-4 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                <MapPin className="h-4 w-4 text-caramel" aria-hidden="true" />
                {t("contact.hero.badge")}
              </span>
              <h1 id="contact-title" className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
                {t("contact.hero.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">{t("contact.hero.description")}</p>
              <Button
                asChild
                size="lg"
                className="bg-caramel text-caramel-foreground hover:bg-caramel/90 text-base px-6 h-12 rounded-xl group"
              >
                <a href="#choisir">
                  {t("contact.hero.cta")}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">{t("contact.hero.microtext")}</p>
            </div>

            <figure className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up-delay-2">
              <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                <img src="/images/about/my-space.jpg" alt="" className="w-full h-24 object-cover" />
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("contact.card.label")}</p>
                    <p className="text-lg font-semibold text-foreground">{t("contact.card.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("contact.card.subtitle")}</p>
                  </div>
                  <div className="rounded-xl bg-muted/70 p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">{t("contact.card.startLabel")}</p>
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-foreground">
                      {list("contact.card.start").map((step, i, all) => (
                        <li key={step} className="flex items-center gap-2">
                          {step}
                          {i < all.length - 1 && (
                            <span aria-hidden="true" className="text-caramel">
                              ·
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="inline font-semibold text-foreground">{t("contact.card.specifyLabel")} </dt>
                      <dd className="inline text-muted-foreground">{t("contact.card.specify")}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-foreground">{t("contact.card.avoidLabel")} </dt>
                      <dd className="inline text-muted-foreground">{t("contact.card.avoid")}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground text-center lg:text-left">{t("contact.card.caption")}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Vision */}
      <section aria-labelledby="contact-vision-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="contact-vision-title" title={t("contact.vision.title")} description={t("contact.vision.description")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col gap-4 p-7 rounded-2xl bg-card border border-border">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-6 w-6 text-caramel" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(`contact.vision.${key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`contact.vision.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Journey chooser */}
      <section id="choisir" aria-labelledby="choose-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <SectionHeading id="choose-title" title={t("contact.choose.title")} description={t("contact.choose.description")} />
          <nav aria-label={t("contact.choose.navLabel")}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {journeys.map(({ href, key, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-caramel/60 hover:shadow-md transition-all"
                  >
                    <span className="flex items-center justify-between">
                      <span className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="h-5 w-5 text-caramel" aria-hidden="true" />
                      </span>
                      <ArrowRight className="h-5 w-5 text-caramel group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                    <span className="text-lg font-semibold text-foreground">{t(`contact.choose.${key}.title`)}</span>
                    <span className="text-sm text-muted-foreground">{t(`contact.choose.${key}.description`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 4. Individuals — Découverte */}
      <section id="particuliers" aria-labelledby="individuals-title" className="py-20 md:py-28 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <img src="/images/contact/couple.jpg" alt="" loading="lazy" className="w-full h-32 sm:h-44 rounded-2xl object-cover" />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
            <div className="space-y-6">
              <SectionHeading
                id="individuals-title"
                eyebrow={t("contact.individuals.eyebrow")}
                title={t("contact.individuals.title")}
                description={t("contact.individuals.description")}
              />
              <OfferCard offerKey="discovery" />
            </div>
            <FormCard titleId="form-individual" prefix="contact.forms.individual" fields={individualFields} />
          </div>
        </div>
      </section>

      {/* 5. Professionals — Expert Pro */}
      <section id="professionnels" aria-labelledby="professionals-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <img src="/images/contact/professionals.jpg" alt="" loading="lazy" className="w-full h-32 sm:h-44 rounded-2xl object-cover" />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
            <div className="space-y-6">
              <SectionHeading
                id="professionals-title"
                eyebrow={t("contact.professionals.eyebrow")}
                title={t("contact.professionals.title")}
                description={t("contact.professionals.description")}
              />
              <OfferCard offerKey="expertPro" />
            </div>
            <FormCard titleId="form-professional" prefix="contact.forms.professional" fields={professionalFields} />
          </div>
        </div>
      </section>

      {/* 6. Organizations — Pilote Organisation */}
      <section id="organisations" aria-labelledby="organizations-title" className="py-20 md:py-28 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
            <div className="space-y-6">
              <SectionHeading
                id="organizations-title"
                eyebrow={t("contact.organizations.eyebrow")}
                title={t("contact.organizations.title")}
                description={t("contact.organizations.description")}
              />
              <OfferCard offerKey="pilotOrganization" />
            </div>
            <FormCard titleId="form-organization" prefix="contact.forms.organization" fields={organizationFields} />
          </div>
        </div>
      </section>

      {/* 7. General contact */}
      <section id="contact-general" aria-labelledby="general-title" className="py-20 md:py-28 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
            <div className="space-y-6">
              <SectionHeading id="general-title" title={t("contact.general.title")} description={t("contact.general.description")} />
              <dl className="space-y-4">
                {(["zone", "afterRequest"] as const).map((key) => (
                  <div key={key} className="rounded-2xl border border-border bg-card p-5">
                    <dt className="font-semibold text-foreground">{t(`contact.general.${key}.label`)}</dt>
                    <dd className="text-muted-foreground mt-1">{t(`contact.general.${key}.value`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <FormCard titleId="form-general" prefix="contact.forms.general" fields={generalFields} />
          </div>
        </div>
      </section>

      {/* 8. Trust */}
      <section aria-labelledby="contact-trust-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-12">
          <SectionHeading id="contact-trust-title" title={t("contact.trust.title")} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trust.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4 items-start">
                <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-caramel" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t(`contact.trust.${key}.title`)}</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{t(`contact.trust.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Vision & mission with photos */}
      <section aria-label={t("contact.visionMission.label")} className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <article aria-labelledby="contact-vm-vision" className="rounded-2xl border border-border bg-card overflow-hidden">
            <img src="/images/about/architecture.jpg" alt="" loading="lazy" className="w-full h-44 object-cover" />
            <div className="p-7 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{t("contact.visionMission.vision.eyebrow")}</p>
              <h3 id="contact-vm-vision" className="text-xl font-bold text-foreground">
                {t("contact.visionMission.vision.title")}
              </h3>
              {list("contact.visionMission.vision.paragraphs").map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <article aria-labelledby="contact-vm-mission" className="rounded-2xl border border-border bg-card overflow-hidden">
            <img src="/images/about/interior.jpg" alt="" loading="lazy" className="w-full h-44 object-cover" />
            <div className="p-7 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-caramel">{t("contact.visionMission.mission.eyebrow")}</p>
              <h3 id="contact-vm-mission" className="text-xl font-bold text-foreground">
                {t("contact.visionMission.mission.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t("contact.visionMission.mission.description")}</p>
              <ul className="space-y-2">
                {list("contact.visionMission.mission.points").map((point) => (
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

      {/* 10. Journal */}
      <section aria-labelledby="contact-journal-title" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
          <SectionHeading id="contact-journal-title" title={t("contact.journal.title")} description={t("contact.journal.description")} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list("contact.journal.topics").map((topic, i) => (
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

      {/* 11. FAQ */}
      <section aria-labelledby="contact-faq-title" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-10">
          <SectionHeading id="contact-faq-title" title={t("contact.faq.title")} />
          {Array.isArray(faqItems) && <Faq items={faqItems} />}
        </div>
      </section>

      {/* 12. Caramel banner */}
      <section aria-labelledby="contact-cta-title" className="bg-caramel text-caramel-foreground">
        <img src="/images/contact/interior-strip.jpg" alt="" loading="lazy" className="w-full h-24 sm:h-32 object-cover opacity-90" />
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 id="contact-cta-title" className="text-3xl md:text-4xl font-bold leading-tight">
              {t("contact.cta.title")}
            </h2>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 text-base px-6 h-12 rounded-xl group focus-visible:outline-background"
            >
              <a href="#choisir">
                {t("contact.cta.button")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
            <p className="text-sm opacity-80">{t("contact.cta.note")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
