import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";
import { bailleurListings } from "../data/mockData";

export function RentalListingsTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Vos locations en cours</h2>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un bien
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bailleurListings.map((listing) => (
          <Card key={listing.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden group">
            <div className="h-48 relative overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">{listing.status}</Badge>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{listing.title}</h3>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3" /> {listing.location}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">Loyer</p>
                  <p className="font-semibold">{listing.price}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">Surface</p>
                  <p className="font-semibold">{listing.surface}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{listing.views}</span> vues
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{listing.contacts}</span> candidats
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Gérer l'annonce
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
