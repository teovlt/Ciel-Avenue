import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockLandlordPool } from "../data/mockData";

export function LandlordPoolTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Parc Bailleur</h2>
        <p className="text-muted-foreground">Propriétaires intéressés par votre dossier.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLandlordPool.map((landlord) => (
          <Card key={landlord.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
                <img src={landlord.image} alt={landlord.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{landlord.name}</h3>
                <p className="text-sm text-muted-foreground">{landlord.details}</p>
              </div>
              <div className="w-full bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Loyer</p>
                  <p className="font-semibold">{landlord.budget}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Match</p>
                  <p className="font-bold text-green-600">{landlord.match}%</p>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <Badge variant={landlord.status === "Visite programmée" ? "default" : "secondary"} className="flex-1 justify-center">
                  {landlord.status}
                </Badge>
              </div>

              <Button className="w-full">Contacter</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
