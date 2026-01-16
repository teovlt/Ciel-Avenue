import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { mockExperts } from "../data/mockData";

export function ExpertsTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">Vos experts partenaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockExperts.map((expert) => (
          <Card key={expert.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img src={expert.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{expert.name}</h3>
                <Badge variant="outline" className="mb-2">
                  {expert.role}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{expert.rating}</span>
                  <span className="text-muted-foreground ml-1">({expert.reviews} avis)</span>
                </div>
                <Button size="sm" className="w-full">
                  Contacter
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
