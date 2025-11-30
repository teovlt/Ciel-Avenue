import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Crown, User, Moon, Sun, Globe, LogOut, UserCircle } from "lucide-react";
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

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { setTheme, theme } = useTheme();
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if journey is completed and create fake user
  useEffect(() => {
    const journeyCompleted = localStorage.getItem("journeyCompleted");
    if (journeyCompleted === "true" && !isAuthenticated) {
      const fakeUser = {
        id: "1",
        email: "user@example.com",
        name: "John Doe",
      };
      login(fakeUser);
    }
  }, [isAuthenticated, login]);

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
            {!isAuthenticated ? (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/journey">{t("navbar.start")}</Link>
              </Button>
            ) : (
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
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
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
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    {t("navbar.theme")}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      const currentTheme = theme === "system" 
                        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                        : theme;
                      setTheme(currentTheme === "light" ? "dark" : "light");
                    }}
                    className="cursor-pointer"
                  >
                    {(() => {
                      const currentTheme = theme === "system" 
                        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                        : theme;
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
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    {t("navbar.language")}
                  </DropdownMenuLabel>
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
            )}
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
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("navbar.home")}
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("navbar.howItWorks")}
              </Link>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("navbar.dashboard")}
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("navbar.contact")}
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("navbar.about")}
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/profile" 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("navbar.profile")}
                </Link>
              )}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-foreground">{t("navbar.theme")}</span>
                <ThemeChanger />
              </div>
              <div className="flex items-center justify-between pt-2">
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
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("navbar.logout")}
                </Button>
              ) : (
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                  <Link to="/journey" onClick={() => setMobileMenuOpen(false)}>{t("navbar.start")}</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
