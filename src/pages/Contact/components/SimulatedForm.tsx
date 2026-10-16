import { useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertCircle, FlaskConical, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FieldDef {
  name: string;
  type: "text" | "email" | "select" | "textarea";
  required?: boolean;
  autoComplete?: string;
  /** Spans both columns on desktop */
  full?: boolean;
}

interface SimulatedFormProps {
  /** i18n prefix holding title, intro, submit and fields.<name>.{label,placeholder,hint,options} */
  prefix: string;
  fields: FieldDef[];
}

const ACK = "acknowledged";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const controlClass = "h-12 rounded-xl bg-background px-4 text-base md:text-base";

/**
 * Demonstration form: values live in React state only and are cleared on "submit".
 * Nothing is sent, stored or logged. Replace the submit handler once a real
 * recipient, privacy notice and retention policy are defined.
 */
export function SimulatedForm({ prefix, fields }: SimulatedFormProps) {
  const { t } = useTranslation();
  const formId = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [acknowledged, setAcknowledged] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${formId}-${name}`;
  const label = (name: string) => t(`${prefix}.fields.${name}.label`);

  const validate = (nextValues: Record<string, string>, nextAck: boolean) => {
    const found: Record<string, string> = {};
    for (const field of fields) {
      const value = (nextValues[field.name] ?? "").trim();
      if (field.required && !value) found[field.name] = t("contact.formCommon.errors.required", { field: label(field.name) });
      else if (field.type === "email" && value && !EMAIL_PATTERN.test(value)) found[field.name] = t("contact.formCommon.errors.email");
    }
    if (!nextAck) found[ACK] = t("contact.formCommon.errors.acknowledge");
    return found;
  };

  const update = (name: string, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validate(next, acknowledged));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values, acknowledged);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Simulation only: discard everything that was typed
    setValues({});
    setAcknowledged(false);
    setSubmitted(false);
    setSimulated(true);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const restart = () => {
    setSimulated(false);
    setErrors({});
  };

  const errorEntries = Object.entries(errors);

  if (simulated) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border-2 border-dashed border-caramel/60 bg-secondary/60 p-6 md:p-8 space-y-4 outline-none"
      >
        <div className="flex items-start gap-3">
          <FlaskConical className="h-6 w-6 shrink-0 text-caramel mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-foreground">{t("contact.formCommon.simulated.title")}</h4>
            <p className="text-muted-foreground leading-relaxed">{t("contact.formCommon.simulated.body")}</p>
          </div>
        </div>
        <Button type="button" variant="outline" onClick={restart} className="h-11 rounded-xl border-foreground/20 bg-background">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t("contact.formCommon.simulated.restart")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={`${formId}-legend`} className="space-y-6">
      <p id={`${formId}-legend`} className="flex items-start gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-sm text-secondary-foreground">
        <FlaskConical className="h-4 w-4 shrink-0 mt-0.5 text-caramel" aria-hidden="true" />
        <span>
          {t("contact.formCommon.demoNotice")} {t("contact.formCommon.requiredLegend")}
        </span>
      </p>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-destructive/40"
        >
          <p className="flex items-center gap-2 font-semibold text-destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {t("contact.formCommon.errors.summary", { count: errorEntries.length })}
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            {errorEntries.map(([name, message]) => (
              <li key={name}>
                <a
                  href={`#${fieldId(name)}`}
                  onClick={(e) => {
                    // Move focus to the field without touching the router hash
                    e.preventDefault();
                    document.getElementById(fieldId(name))?.focus();
                  }}
                  className="text-destructive underline underline-offset-2"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => {
          const id = fieldId(field.name);
          const error = errors[field.name];
          const hintKey = `${prefix}.fields.${field.name}.hint`;
          const hint = t(hintKey, { defaultValue: "" });
          const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
          const common = {
            id,
            name: field.name,
            value: values[field.name] ?? "",
            required: field.required,
            "aria-required": field.required,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": describedBy,
            autoComplete: field.autoComplete ?? "off",
          };

          return (
            <div key={field.name} className={cn("space-y-2", (field.full || field.type === "textarea") && "md:col-span-2")}>
              <Label htmlFor={id} className="text-sm font-medium text-foreground">
                {label(field.name)}
                {field.required ? (
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                ) : (
                  <span className="font-normal text-muted-foreground">{t("contact.formCommon.optional")}</span>
                )}
              </Label>
              {hint && (
                <p id={`${id}-hint`} className="text-sm text-muted-foreground">
                  {hint}
                </p>
              )}

              {field.type === "select" ? (
                <select
                  {...common}
                  onChange={(e) => update(field.name, e.target.value)}
                  className={cn(
                    controlClass,
                    "w-full border border-input shadow-xs text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none aria-invalid:border-destructive",
                  )}
                >
                  <option value="">{t("contact.formCommon.choose")}</option>
                  {(t(`${prefix}.fields.${field.name}.options`, { returnObjects: true }) as string[]).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <Textarea
                  {...common}
                  rows={4}
                  placeholder={t(`${prefix}.fields.${field.name}.placeholder`)}
                  onChange={(e) => update(field.name, e.target.value)}
                  className="min-h-28 rounded-xl bg-background px-4 py-3 text-base md:text-base"
                />
              ) : (
                <Input
                  {...common}
                  type={field.type}
                  inputMode={field.type === "email" ? "email" : undefined}
                  placeholder={t(`${prefix}.fields.${field.name}.placeholder`)}
                  onChange={(e) => update(field.name, e.target.value)}
                  className={controlClass}
                />
              )}

              {error && (
                <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        <label htmlFor={fieldId(ACK)} className="flex items-start gap-3 min-h-11 cursor-pointer text-sm text-foreground">
          <input
            id={fieldId(ACK)}
            type="checkbox"
            checked={acknowledged}
            required
            aria-invalid={errors[ACK] ? true : undefined}
            aria-describedby={errors[ACK] ? `${fieldId(ACK)}-error` : undefined}
            onChange={(e) => {
              setAcknowledged(e.target.checked);
              if (submitted) setErrors(validate(values, e.target.checked));
            }}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--caramel)]"
          />
          <span>
            {t("contact.formCommon.acknowledge")}
            <span className="text-destructive" aria-hidden="true">
              {" "}
              *
            </span>
          </span>
        </label>
        {errors[ACK] && (
          <p id={`${fieldId(ACK)}-error`} className="flex items-center gap-1.5 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errors[ACK]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto bg-caramel text-caramel-foreground hover:bg-caramel/90 text-base px-6 h-12 rounded-xl"
      >
        {t(`${prefix}.submit`)}
      </Button>
    </form>
  );
}
