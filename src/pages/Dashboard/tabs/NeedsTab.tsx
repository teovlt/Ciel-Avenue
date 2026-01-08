import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockNeeds } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function NeedsTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.needs.title")}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockNeeds.map((need) => (
          <Card key={need.id} className="border-border bg-card/80 backdrop-blur-sm">
            <div className="h-40 relative overflow-hidden rounded-t-xl">
              <img src={need.image} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between">
                <Badge>{need.status}</Badge>
                <span className="font-bold text-primary">{need.match}% Match</span>
              </div>
              <h3 className="font-bold">{need.type}</h3>
              <p className="text-sm text-muted-foreground">{need.location}</p>
              <Button className="w-full mt-2" variant="secondary">
                {t("dashboard.needs.viewDetails") || "Voir détails"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
