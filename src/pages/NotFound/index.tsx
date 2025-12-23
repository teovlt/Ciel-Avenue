import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Home, Compass, MapPin } from "lucide-react";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden page-transition">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MapPin className="absolute top-[15%] left-[10%] h-8 w-8 text-primary/20 animate-float" />
        <Compass className="absolute top-[25%] right-[15%] h-10 w-10 text-primary/15 animate-float-slow" />
        <MapPin className="absolute bottom-[30%] left-[20%] h-6 w-6 text-primary/20 animate-float-delay" />
        <Compass className="absolute bottom-[20%] right-[10%] h-12 w-12 text-primary/10 animate-float-slow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Number */}
          <div className="relative animate-scale-in">
            <span className="text-[12rem] md:text-[16rem] font-bold text-primary/10 leading-none select-none">{t("notFound.code")}</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-border shadow-lg animate-bounce-in">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("notFound.title")}</h1>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 pt-8">
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up-delay-1">{t("notFound.description")}</p>
            <p className="text-lg text-muted-foreground/80 animate-fade-in-up-delay-2">{t("notFound.subtitle")}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up-delay-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 gap-2 card-hover-lift"
            >
              <Link to="/">
                <Home className="h-5 w-5" />
                {t("notFound.backHome")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 gap-2 card-hover-lift">
              <Link to="/journey">
                <Compass className="h-5 w-5" />
                {t("notFound.explore")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
