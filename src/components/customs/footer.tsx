import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Linkedin, Crown } from "lucide-react";
import { CONTACT_EMAIL, LINKEDIN_URL, pilotMailto } from "@/lib/contact";

export function Footer() {
  const { t } = useTranslation();

  const linkClass = "inline-flex items-center min-h-11 text-sm text-muted-foreground hover:text-caramel transition-colors";

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-caramel" aria-hidden="true" />
              <div className="text-2xl font-bold text-caramel">CIEL AVENUE</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
            <a
              href={LINKEDIN_URL}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-caramel transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.linkedin")}
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          {/* Plateforme */}
          <nav aria-label={t("footer.platform")} className="space-y-2">
            <h2 className="font-semibold text-foreground">{t("footer.platform")}</h2>
            <ul className="flex flex-col">
              <li>
                <Link to="/#methode" className={linkClass}>
                  {t("footer.method")}
                </Link>
              </li>
              <li>
                <Link to="/particuliers" className={linkClass}>
                  {t("footer.individuals")}
                </Link>
              </li>
              <li>
                <Link to="/professionnels" className={linkClass}>
                  {t("footer.professionalsPage")}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className={linkClass}>
                  {t("footer.howItWorks")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className={linkClass}>
                  {t("footer.dashboard")}
                </Link>
              </li>
              <li>
                <Link to="/#faq" className={linkClass}>
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Pilote */}
          <nav aria-label={t("footer.pilot")} className="space-y-2">
            <h2 className="font-semibold text-foreground">{t("footer.pilot")}</h2>
            <ul className="flex flex-col">
              <li>
                <a href={pilotMailto("individual")} className={linkClass}>
                  {t("footer.pilotIndividual")}
                </a>
              </li>
              <li>
                <a href={pilotMailto("professional")} className={linkClass}>
                  {t("footer.pilotProfessional")}
                </a>
              </li>
            </ul>
          </nav>

          {/* À propos */}
          <nav aria-label={t("footer.aboutUs")} className="space-y-2">
            <h2 className="font-semibold text-foreground">{t("footer.aboutUs")}</h2>
            <ul className="flex flex-col">
              <li>
                <Link to="/about" className={linkClass}>
                  {t("footer.ourMission")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} break-all`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground">{t("footer.rights", { year: new Date().getFullYear() })}</p>
            <p className="text-sm text-muted-foreground">
              {t("footer.developedBy")}{" "}
              <a
                href="https://teovillet.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caramel underline-offset-4 hover:underline font-medium"
              >
                Téo Villet
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
