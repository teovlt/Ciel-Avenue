import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Twitter, Linkedin, Instagram, Crown } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <div className="text-2xl font-bold text-primary">CIEL AVENUE</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Plateforme */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.platform")}</h3>
            <div className="flex flex-col gap-3">
              <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.howItWorks")}
              </Link>
              <Link to="/journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.journey")}
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.dashboard")}
              </Link>
            </div>
          </div>

          {/* Professionnels */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.professionals")}</h3>
            <div className="flex flex-col gap-3">
              <Link to="/expert" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.becomeExpert")}
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.sellerSpace")}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.promoterSpace")}
              </a>
            </div>
          </div>

          {/* À propos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.aboutUs")}</h3>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.ourMission")}
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.contact")}
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("footer.legal")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
            <p className="text-sm text-muted-foreground">
              {t("footer.developedBy")}{" "}
              <a href="https://teovillet.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Téo Villet
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
