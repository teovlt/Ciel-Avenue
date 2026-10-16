import { useTranslation } from "react-i18next";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";

type StepState = "done" | "current" | "todo";

/**
 * Illustrative product preview for the hero: a fictitious project overview,
 * built in HTML (no screenshot) so it stays readable and translatable.
 */
export function ProjectPreview() {
  const { t } = useTranslation();

  const steps: Array<{ key: string; state: StepState }> = [
    { key: "step1", state: "done" },
    { key: "step2", state: "current" },
    { key: "step3", state: "todo" },
  ];

  return (
    <figure className="w-full max-w-md mx-auto lg:mx-0">
      <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-muted/60">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("home.preview.label")}</p>
            <p className="font-semibold text-foreground truncate">{t("home.preview.project")}</p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {t("home.preview.status")}
          </span>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-sm font-medium text-foreground">{t("home.preview.goalLabel")}</p>
            <p className="text-sm text-muted-foreground">{t("home.preview.goal")}</p>
          </div>

          <ol className="space-y-3">
            {steps.map(({ key, state }) => {
              const Icon = state === "done" ? CheckCircle2 : state === "current" ? CircleDot : Circle;
              return (
                <li key={key} className="flex items-start gap-3">
                  <Icon
                    className={`h-5 w-5 mt-0.5 shrink-0 ${state === "todo" ? "text-muted-foreground" : "text-caramel"}`}
                    aria-hidden="true"
                  />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">{t(`home.preview.${key}`)}</span>
                    <span className="sr-only"> — {t(`home.preview.state.${state}`)}</span>
                    {state === "current" && <p className="text-muted-foreground">{t("home.preview.step2Detail")}</p>}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="rounded-xl bg-muted/70 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{t("home.preview.documents")}</span>
              <span className="text-muted-foreground">{t("home.preview.documentsCount")}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-border" aria-hidden="true">
              <div className="h-2 w-3/5 rounded-full bg-caramel" />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground text-center lg:text-left">{t("home.preview.caption")}</figcaption>
    </figure>
  );
}
