import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export function NotConnectedView() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("dashboard.notConnected.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("dashboard.notConnected.description")}</p>
          </div>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/journey">{t("dashboard.notConnected.cta")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
