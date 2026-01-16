import { Card, CardContent } from "@/components/ui/card";
import { mockPatrimony } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function PatrimonyTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.patrimony.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPatrimony.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-32 relative">
              <img src={item.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">{item.type}</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{t("dashboard.patrimony.value")}</span>
                <span className="font-bold">{item.value.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{ width: item.growth.replace("+", "").replace("%", "").trim() + "%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("dashboard.patrimony.performance") || "Performance"}</span>
                <span className="text-green-600 font-medium">{item.growth}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
