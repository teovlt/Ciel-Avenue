import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockArtisanPool } from "../data/mockData";
import { Star } from "lucide-react";

export function ArtisanPoolTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Parc Artisans</h2>
        <p className="text-muted-foreground">Des professionnels qualifiés pour vos travaux.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtisanPool.map((artisan) => (
          <Card key={artisan.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
                <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{artisan.name}</h3>
                <p className="text-sm text-muted-foreground">{artisan.details}</p>
                <p className="text-xs text-muted-foreground mt-1">{artisan.location}</p>
              </div>

              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{artisan.rating}</span>
                <span className="text-muted-foreground">({artisan.reviews} avis)</span>
              </div>

              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1">
                  Voir profil
                </Button>
                <Button className="flex-1">Demander devis</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
