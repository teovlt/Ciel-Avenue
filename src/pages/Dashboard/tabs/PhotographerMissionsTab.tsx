import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPhotographerMissions } from "../data/mockData";
import { CheckCircle2 } from "lucide-react";

export function PhotographerMissionsTab() {
  const missions = mockPhotographerMissions;
  const available = missions.filter((m) => m.status === "available");
  const inProgress = missions.filter((m) => m.status === "in_progress");
  const finished = missions.filter((m) => m.status === "finished");
  const refused = missions.filter((m) => m.status === "refused");

  const renderMissionCard = (mission: any, type: string) => (
    <Card key={mission.id} className="border-border bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{mission.type}</h3>
            <p className="text-sm text-muted-foreground">
              {mission.client} - {mission.location}
            </p>
          </div>
          <Badge
            variant={
              type === "available" ? "outline" : type === "in_progress" ? "default" : type === "finished" ? "secondary" : "destructive"
            }
          >
            {type === "available" ? "Disponible" : type === "in_progress" ? "En cours" : type === "finished" ? "Terminé" : "Refusé"}
          </Badge>
        </div>

        {type === "available" && (
          <div className="space-y-2">
            <p className="text-sm">{mission.description}</p>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" size="sm">
                Proposer ({mission.price})
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                Refuser
              </Button>
            </div>
          </div>
        )}

        {type === "in_progress" && (
          <div className="space-y-3">
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${mission.progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progression: {mission.progress}%</span>
              <span>Date: {mission.date}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Livrer photos
            </Button>
          </div>
        )}

        {type === "finished" && (
          <div className="space-y-2 bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Mission terminée le {mission.date}</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Voir galerie
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground">Gestion des Shootings</h2>
        <p className="text-muted-foreground">Organisez vos reportages photos et visites virtuelles.</p>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
          <TabsTrigger value="available">Disponibles ({available.length})</TabsTrigger>
          <TabsTrigger value="in_progress">En cours ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="finished">Terminés ({finished.length})</TabsTrigger>
          <TabsTrigger value="refused">Refusés ({refused.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {available.map((m) => renderMissionCard(m, "available"))}
          {available.length === 0 && <p className="text-center text-muted-foreground col-span-2 py-8">Aucune mission disponible.</p>}
        </TabsContent>
        <TabsContent value="in_progress" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {inProgress.map((m) => renderMissionCard(m, "in_progress"))}
          {inProgress.length === 0 && <p className="text-center text-muted-foreground col-span-2 py-8">Aucune mission en cours.</p>}
        </TabsContent>
        <TabsContent value="finished" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {finished.map((m) => renderMissionCard(m, "finished"))}
          {finished.length === 0 && <p className="text-center text-muted-foreground col-span-2 py-8">Aucune mission terminée.</p>}
        </TabsContent>
        <TabsContent value="refused" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {refused.length === 0 && <p className="text-center text-muted-foreground col-span-2 py-8">Aucune mission refusée.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
