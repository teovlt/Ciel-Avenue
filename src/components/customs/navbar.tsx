import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Crown } from "lucide-react";
import { ThemeChanger } from "@/components/customs/theme-changer";
import { LanguageChanger } from "@/components/customs/language-changer";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            <div className="text-2xl font-bold text-primary">CIEL AVENUE</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("navbar.home")}
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("navbar.howItWorks")}
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("navbar.dashboard")}
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("navbar.contact")}
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("navbar.about")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeChanger />
            <LanguageChanger />
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/journey">{t("navbar.start")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("navbar.home")}
              </Link>
              <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("navbar.howItWorks")}
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("navbar.dashboard")}
              </Link>
              <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("navbar.contact")}
              </Link>
              <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t("navbar.about")}
              </Link>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-foreground">{t("navbar.theme")}</span>
                <ThemeChanger />
              </div>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                <Link to="/journey">{t("navbar.start")}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
