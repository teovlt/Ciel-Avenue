import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockArtisanMissions } from "../data/mockData";
import { Calendar, MapPin, HardHat, ArrowRight } from "lucide-react";

export function ArtisanMissionsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mes Chantiers</h2>
          <p className="text-muted-foreground">Suivez vos chantiers actifs et demandes.</p>
        </div>
        <Button>Nouveau chantier</Button>
      </div>

      <div className="grid gap-4">
        {mockArtisanMissions.map((mission) => (
          <Card key={mission.id} className="card-hover-lift">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{mission.type}</h3>
                    <Badge
                      variant="outline"
                      className={
                        mission.status === "available"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : mission.status === "in_progress"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-gray-500/10 text-gray-500"
                      }
                    >
                      {mission.status === "available" ? "Nouveau" : mission.status === "in_progress" ? "En cours" : "En attente"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HardHat className="h-4 w-4" /> {mission.client}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {mission.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {mission.date}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{mission.description}</p>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  {mission.price && <span className="font-bold text-lg">{mission.price}</span>}
                  {mission.progress !== undefined && (
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progression</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${mission.progress}%` }} />
                      </div>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    Voir <ArrowRight className="ml-2 h-4 w-4" />
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
