import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Crown, User, Moon, Sun, LogOut, UserCircle } from "lucide-react";
import { ThemeChanger } from "@/components/customs/theme-changer";
import { LanguageChanger } from "@/components/customs/language-changer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider";

import { useAuth } from "@/providers/auth-provider";
import { FR, GB } from "country-flag-icons/react/3x2";
import { getFullNamesOfLocales, listOfLocales } from "@/lib/i18n";
import { toast } from "sonner";
import { RoleSwitcher } from "@/pages/Dashboard/components/RoleSwitcher";
import { pilotMailto } from "@/lib/contact";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { setTheme, theme } = useTheme();

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleChangeLanguage = (l: string) => {
    localStorage.setItem("i18nextLng", l);
    i18n.changeLanguage(l);
    toast.success(t("navbar.languageChanged"));
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("journeyCompleted");
    navigate("/");
    toast.success(t("navbar.loggedOut"));
  };

  const navLinks = [
    { to: "/#methode", label: t("navbar.method") },
    { to: "/particuliers", label: t("navbar.individuals") },
    { to: "/professionnels", label: t("navbar.professionals") },
    { to: "/#passeport", label: t("navbar.passport") },
    { to: "/#faq", label: t("navbar.faq") },
    { to: "/dashboard", label: t("navbar.dashboard") },
    { to: "/contact", label: t("navbar.contact") },
  ];

  const linkClass =
    "inline-flex items-center min-h-11 rounded-md px-1 text-sm font-medium whitespace-nowrap text-foreground hover:text-caramel transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-caramel focus:px-4 focus:py-2 focus:text-caramel-foreground"
      >
        {t("navbar.skipToContent")}
      </a>
      <nav aria-label={t("navbar.mainNav")} className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-h-11 whitespace-nowrap" aria-label={t("navbar.homeAria")}>
            <Crown className="h-6 w-6 text-caramel" aria-hidden="true" />
            <span className="text-xl sm:text-2xl font-bold text-caramel">CIEL AVENUE</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden xl:flex items-center gap-2">
            {!isAuthenticated ? (
              <Button asChild className="bg-caramel text-caramel-foreground hover:bg-caramel/90 h-11 px-5 rounded-xl">
                <a href={pilotMailto()}>{t("navbar.cta")}</a>
              </Button>
            ) : (
              <>
                {/* Role Switcher */}
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2 items-center mr-2">
                      {activeRole?.type === "expert" ? <Briefcase className="h-4 w-4" /> : <UserCircle className="h-4 w-4" />}
                      <span className="font-medium">{getRoleLabel(activeRole)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-max">
                    <DropdownMenuLabel>Vos rôles</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.roles.map((role, idx) => (
                      <DropdownMenuItem key={idx} onClick={() => setActiveRoleIndex(idx)} className="cursor-pointer justify-between">
                        <span className="flex items-center gap-2">
                          {role.type === "expert" ? <Briefcase className="h-3 w-3" /> : <UserCircle className="h-3 w-3" />}
                          {getRoleLabel(role)}
                        </span>
                        {user.activeRoleIndex === idx && <Check className="h-4 w-4 text-primary" />}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/journey" className="flex items-center text-primary font-medium">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter un rôle
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                <RoleSwitcher />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 w-9 rounded-full p-0">
                      <User className="h-4 w-4" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name?.trim() ? user.name : "John Doe"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/profile" className="flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>{t("navbar.profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{t("navbar.theme")}</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        const currentTheme =
                          theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme;
                        setTheme(currentTheme === "light" ? "dark" : "light");
                      }}
                      className="cursor-pointer"
                    >
                      {(() => {
                        const currentTheme =
                          theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme;
                        return currentTheme === "light" ? (
                          <>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>{t("navbar.darkMode")}</span>
                          </>
                        ) : (
                          <>
                            <Sun className="mr-2 h-4 w-4" />
                            <span>{t("navbar.lightMode")}</span>
                          </>
                        );
                      })()}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{t("navbar.language")}</DropdownMenuLabel>
                    {listOfLocales.map((l) => (
                      <DropdownMenuItem
                        key={l}
                        onClick={() => handleChangeLanguage(l)}
                        className={`cursor-pointer flex items-center gap-2 ${i18n.language === l ? "bg-secondary" : ""}`}
                      >
                        <span className="w-5 h-4 flex items-center">
                          {l === "fr" && <FR className="w-full h-full" />}
                          {l === "en" && <GB className="w-full h-full" />}
                        </span>
                        <span>{getFullNamesOfLocales(l)}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("navbar.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="xl:hidden py-4 border-t border-border max-h-[calc(100vh-5rem)] overflow-y-auto">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={`${linkClass} w-full text-base`} onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/about" className={`${linkClass} w-full text-base`} onClick={() => setMobileMenuOpen(false)}>
                  {t("navbar.about")}
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/profile" className={`${linkClass} w-full text-base`} onClick={() => setMobileMenuOpen(false)}>
                    {t("navbar.profile")}
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t("navbar.theme")}</span>
                <ThemeChanger />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t("navbar.language")}</span>
                <LanguageChanger />
              </div>
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="destructive"
                  className="w-full h-11"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("navbar.logout")}
                </Button>
              ) : (
                <Button asChild className="bg-caramel text-caramel-foreground hover:bg-caramel/90 w-full h-11 rounded-xl">
                  <a href={pilotMailto()} onClick={() => setMobileMenuOpen(false)}>
                    {t("navbar.cta")}
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
