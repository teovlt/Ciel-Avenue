import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { MapPin, Eye, Users, TrendingUp, MoreHorizontal, Plus } from "lucide-react";
import { sellerListings } from "../data/mockData";

export function MarchandListingsTab() {
  const [listings, setListings] = useState([
    ...sellerListings,
    {
      id: 2,
      title: "Maison Bourgeoise",
      location: "Boulogne-Billancourt",
      price: "1 200 000 €",
      surface: "180m²",
      rooms: "7 pièces",
      views: 540,
      contacts: 12,
      status: "Sous compromis",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
    },
    {
      id: 3,
      title: "Studio Étudiant",
      location: "Paris 5ème",
      price: "280 000 €",
      surface: "22m²",
      rooms: "1 pièce",
      views: 89,
      contacts: 0,
      status: "Brouillon",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
    },
  ]);

  const [newListing, setNewListing] = useState({ title: "", price: "", surface: "", location: "" });

  const handleAddListing = () => {
    if (!newListing.title) return;

    setListings([
      {
        ...newListing,
        id: Date.now(),
        rooms: "Non précisé",
        views: 0,
        contacts: 0,
        status: "En ligne",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
      },
      ...listings,
    ]);
    setNewListing({ title: "", price: "", surface: "", location: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vos Annonces</h2>
          <p className="text-muted-foreground">Gérez votre portefeuille de biens immobiliers.</p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle Annonce
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Ajouter une annonce</SheetTitle>
              <SheetDescription>
                Créez rapidement une nouvelle annonce. (Aperçu visuel uniquement, réinitialisé au rafraîchissement)
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre de l'annonce</Label>
                <Input
                  id="title"
                  value={newListing.title}
                  onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                  placeholder="ex: Appartement T4 Lumineux"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Prix</Label>
                <Input
                  id="price"
                  value={newListing.price}
                  onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                  placeholder="ex: 450 000 €"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="surface">Surface</Label>
                  <Input
                    id="surface"
                    value={newListing.surface}
                    onChange={(e) => setNewListing({ ...newListing, surface: e.target.value })}
                    placeholder="ex: 85m²"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Ville</Label>
                  <Input
                    id="location"
                    value={newListing.location}
                    onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                    placeholder="ex: Lyon"
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handleAddListing}>Publier l'annonce</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden border-border bg-card/80 backdrop-blur-sm group hover:shadow-lg transition-all">
            <div className="relative aspect-video">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className={`backdrop-blur-md border border-white/20 shadow-sm ${
                    listing.status === "En ligne"
                      ? "bg-green-500/80 text-white"
                      : listing.status === "Sous compromis"
                        ? "bg-amber-500/80 text-white"
                        : "bg-black/50 text-white"
                  }`}
                >
                  {listing.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{listing.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    {listing.location}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">{listing.price}</span>
                </div>
              </div>

              <div className="flex gap-3 text-sm text-muted-foreground mb-4 font-medium">
                <span>{listing.surface}</span>
                <span>•</span>
                <span>{listing.rooms}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                  <Eye className="h-4 w-4 text-primary mb-1" />
                  <span className="text-lg font-bold">{listing.views}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Vues</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                  <Users className="h-4 w-4 text-primary mb-1" />
                  <span className="text-lg font-bold">{listing.contacts}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Contacts</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                  <TrendingUp className="h-4 w-4 text-primary mb-1" />
                  <span className="text-lg font-bold">-{listing.status === "En ligne" ? "Oui" : "Non"}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Actif</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
