import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { mockVendors } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function VendorsTab() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.vendors.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVendors.map((vendor) => (
          <Card key={vendor.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
                <img src={vendor.image} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{vendor.name}</h3>
                <p className="text-sm text-muted-foreground">{vendor.property}</p>
              </div>
              <Badge variant={vendor.status === "Visite programmée" ? "default" : "secondary"}>{vendor.status}</Badge>
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{vendor.rating}</span>
              </div>
              <Button className="w-full" variant="outline">
                {t("dashboard.vendors.contact") || "Contacter"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
