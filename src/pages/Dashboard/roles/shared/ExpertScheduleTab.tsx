import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { expertSchedule } from "../data/mockData";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

export function ExpertScheduleTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.expert.schedule.title")}</h2>
      <div className="space-y-4">
        {expertSchedule.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-center min-w-[80px] p-2 bg-muted rounded-lg">
                <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
                <span className="font-bold">{item.time}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{item.type}</h3>
                  <Badge variant="outline">{item.client}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.property}</p>
              </div>
              <Button size="sm" variant="ghost">
                Détails
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
