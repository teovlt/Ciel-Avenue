import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { expertMissions } from "../data/mockData";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

export function ExpertMissionsTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.expert.missions.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertMissions.map((mission) => (
          <Card key={mission.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={mission.clientImage} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">{mission.client}</h3>
                    <p className="text-sm text-muted-foreground">{mission.type}</p>
                  </div>
                </div>
                <Badge variant={mission.status === "in_progress" ? "default" : "secondary"}>
                  {mission.status === "in_progress" ? "En cours" : "En attente"}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-bold">{mission.progress}%</span>
                </div>
                <Progress value={mission.progress} className="h-2" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                <Clock className="h-4 w-4" />
                <span>Échéance : {mission.deadline}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
