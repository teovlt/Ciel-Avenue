import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notaryMissions } from "../data/mockData";
import { ArrowRight } from "lucide-react";

export function NotaryMissionsTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">Dossiers en cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notaryMissions.map((mission) => (
          <Card key={mission.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${mission.bgColor}`}>
                  <mission.icon className={`h-6 w-6 ${mission.color}`} />
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">{mission.count}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{mission.title}</h3>
                <p className="text-sm text-muted-foreground">{mission.description}</p>
              </div>
              <Button className="w-full justify-between group" variant="outline">
                {mission.action}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
