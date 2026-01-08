import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockBrokerMissions } from "../data/mockData";
import { Calendar, MapPin, ArrowRight, FileText } from "lucide-react";

export function BrokerMissionsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Missions</h2>
          <p className="text-muted-foreground">Gérez vos dossiers de financement et audits bancaires</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Nouveau dossier
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockBrokerMissions.map((mission) => (
          <Card key={mission.id} className="hover:shadow-lg transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium">{mission.client}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {mission.location}
                </div>
              </div>
              <Badge
                variant={mission.status === "available" ? "default" : mission.status === "in_progress" ? "secondary" : "outline"}
                className={mission.status === "available" ? "bg-primary" : ""}
              >
                {mission.status === "available" ? "Disponible" : mission.status === "in_progress" ? "En cours" : "En attente"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">{mission.type}</div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{mission.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {mission.date}
                  </div>
                  {mission.price && <div className="font-bold text-primary">{mission.price}</div>}
                  {mission.progress !== undefined && <div className="text-xs font-medium">{mission.progress}%</div>}
                </div>

                <div className="pt-2">
                  <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 group-hover:text-primary">
                    Voir le dossier
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
