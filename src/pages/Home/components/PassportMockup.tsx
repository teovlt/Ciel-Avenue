import { useTranslation } from "react-i18next";
import { CheckCircle2, AlertCircle, HelpCircle, Home as HomeIcon } from "lucide-react";

type DocState = "available" | "missing" | "toCheck";

const docStyles: Record<DocState, { icon: typeof CheckCircle2; className: string }> = {
  available: { icon: CheckCircle2, className: "text-emerald-700 dark:text-emerald-400" },
  missing: { icon: AlertCircle, className: "text-red-700 dark:text-red-400" },
  toCheck: { icon: HelpCircle, className: "text-amber-800 dark:text-amber-300" },
};

/**
 * Illustrative "Passeport du bien" built in HTML with fictitious data.
 */
export function PassportMockup() {
  const { t } = useTranslation();

  const documents: Array<{ key: string; state: DocState }> = [
    { key: "deed", state: "available" },
    { key: "dpe", state: "available" },
    { key: "tax", state: "missing" },
    { key: "works", state: "toCheck" },
  ];

  const options = ["renovate", "rent", "sell"] as const;

  return (
    <figure className="w-full">
      <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/60">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-caramel text-caramel-foreground flex items-center justify-center">
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("home.passport.mockup.label")}</p>
            <p className="font-semibold text-foreground">{t("home.passport.mockup.property")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <section className="p-5 space-y-3" aria-labelledby="passport-docs">
            <h3 id="passport-docs" className="text-sm font-semibold text-foreground">
              {t("home.passport.mockup.documentsTitle")}
            </h3>
            <ul className="space-y-2">
              {documents.map(({ key, state }) => {
                const { icon: Icon, className } = docStyles[state];
                return (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${className}`} aria-hidden="true" />
                    <span className="text-foreground">
                      {t(`home.passport.mockup.docs.${key}`)}
                      <span className={`block text-xs font-medium ${className}`}>{t(`home.passport.mockup.state.${state}`)}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="p-5 space-y-5">
            <section className="space-y-3" aria-labelledby="passport-options">
              <h3 id="passport-options" className="text-sm font-semibold text-foreground">
                {t("home.passport.mockup.optionsTitle")}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {options.map((key) => (
                  <li key={key} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                    {t(`home.passport.mockup.options.${key}`)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2" aria-labelledby="passport-next">
              <h3 id="passport-next" className="text-sm font-semibold text-foreground">
                {t("home.passport.mockup.nextTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">{t("home.passport.mockup.next")}</p>
            </section>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">{t("home.passport.mockup.caption")}</figcaption>
    </figure>
  );
}
