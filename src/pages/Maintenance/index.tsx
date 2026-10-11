import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Crown, HardHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageChanger } from "@/components/customs/language-changer";
import { ThemeChanger } from "@/components/customs/theme-changer";

export function MaintenancePage() {
  const { t } = useTranslation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "CIEL AVENUE — Site en travaux";

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Le site CIEL AVENUE est actuellement en travaux. Nous serons de retour très prochainement."
    );

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary overflow-hidden">
      {/* Background Architectural Visual with Subtle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Architecture CIEL AVENUE"
          className="w-full h-full object-cover opacity-15 dark:opacity-10 filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo CIEL AVENUE */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary shadow-sm">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary block leading-none">
                CIEL AVENUE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                L'immobilier d'exception
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <LanguageChanger />
            <ThemeChanger />
          </div>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="relative z-10 flex-1 container mx-auto px-4 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl">
          <Card className="border border-border/70 bg-card/75 backdrop-blur-xl shadow-2xl rounded-2xl text-center overflow-hidden">
            <CardContent className="p-8 sm:p-12 space-y-6">
              {/* Construction Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-inner">
                <HardHat className="h-10 w-10 sm:h-12 sm:w-12 animate-pulse" />
              </div>

              {/* Status Badge */}
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  {t("maintenance.badge")}
                </span>
              </div>

              {/* Title (Single H1) */}
              <h1
                id="maintenance-main-title"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
              >
                {t("maintenance.title")}
              </h1>

              {/* Description */}
              <div className="space-y-2 max-w-md mx-auto">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("maintenance.description")}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                  {t("maintenance.subtext")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-border/40 bg-background/80 backdrop-blur-md py-6 text-center text-xs text-muted-foreground">
        <p>{t("maintenance.footer")}</p>
      </footer>
    </div>
  );
}

export default MaintenancePage;
