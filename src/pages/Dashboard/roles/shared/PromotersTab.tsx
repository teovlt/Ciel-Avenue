import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { mockPromoters } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function PromotersTab() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.promoters.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPromoters.map((promoter) => (
          <Card key={promoter.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-48 relative overflow-hidden">
              <img src={promoter.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-xl">{promoter.project}</h3>
                  <p className="text-white/80 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" /> {promoter.location}
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm">
                  <p className="text-muted-foreground">Promoteur</p>
                  <p className="font-semibold">{promoter.name}</p>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  {promoter.units}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>Livraison prév.</span>
                <span className="font-medium text-foreground">{promoter.delivery}</span>
              </div>
              <Button className="w-full">{t("dashboard.promoters.learnMore")}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
