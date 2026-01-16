import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center space-y-8">
          {/* 404 Number */}
          <div className="space-y-4">
            <span className="text-8xl md:text-9xl font-bold text-primary/20 leading-none block">{t("notFound.code")}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("notFound.title")}</h1>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground leading-relaxed">{t("notFound.description")}</p>
            <p className="text-muted-foreground">{t("notFound.subtitle")}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-5 w-5" />
                {t("notFound.backHome")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/journey">
                <ArrowLeft className="h-5 w-5" />
                {t("notFound.explore")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
