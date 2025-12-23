import { useTranslation } from "react-i18next";

export function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient-shift" />

      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl animate-float-delay" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo / Brand */}
        <div className="relative">
          {/* Outer ring animation */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" style={{ animationDuration: "2s" }} />

          {/* Main logo container */}
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 animate-pulse">
            <span className="text-3xl font-bold text-primary-foreground">CA</span>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground animate-fade-in-up">CIEL AVENUE</h1>
          <p className="text-muted-foreground animate-fade-in-up-delay-1">{t("common.loading") || "Chargement..."}</p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden animate-fade-in-up-delay-2">
          <div className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-shift rounded-full" />
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2 animate-fade-in-up-delay-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
