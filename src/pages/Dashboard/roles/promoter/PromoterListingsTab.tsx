import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileEdit, MapPin, Search, Trash2, Home, Euro, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";

export function PromoterListingsTab() {
  const [listings, setListings] = useState([
    {
      id: "PROG-1024",
      title: "Résidence L'Horizon Sud",
      location: "Marseille, 8ème arr.",
      price: "À partir de 320 000 €",
      type: "Programme Neuf",
      status: "En commercialisation",
      date: "12/10/2024",
      lots: 24,
      availableLots: 8,
    },
    {
      id: "PROG-1025",
      title: "Les Jardins de l'Aqueduc",
      location: "Aix-en-Provence",
      price: "À partir de 450 000 €",
      type: "Programme Neuf",
      status: "Travaux en cours",
      date: "05/10/2024",
      lots: 12,
      availableLots: 2,
    },
    {
      id: "PROG-1026",
      title: "Domaine des Oliviers",
      location: "Cassis",
      price: "À partir de 890 000 €",
      type: "Lotissement Premium",
      status: "Lancement",
      date: "28/09/2024",
      lots: 5,
      availableLots: 5,
    },
  ]);

  const [newListing, setNewListing] = useState({
    title: "",
    location: "",
    price: "",
    type: "Programme Neuf",
    lots: "",
  });

  const handleAddListing = () => {
    if (!newListing.title || !newListing.location) return;

    const newProg = {
      id: `PROG-${1027 + listings.length}`,
      title: newListing.title,
      location: newListing.location,
      price: newListing.price || "Sur demande",
      type: newListing.type,
      status: "Nouveau",
      date: new Date().toLocaleDateString("fr-FR"),
      lots: parseInt(newListing.lots) || 1,
      availableLots: parseInt(newListing.lots) || 1,
    };

    setListings([newProg, ...listings]);
    setNewListing({ title: "", location: "", price: "", type: "Programme Neuf", lots: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Programmes et Annonces</h2>
          <p className="text-muted-foreground">Gérez vos programmes immobiliers neufs et vos lots disponibles.</p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Nouveau Programme
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Ajouter un programme</SheetTitle>
              <SheetDescription>
                Créez une nouvelle annonce pour votre programme immobilier. (Données temporaires pour la session).
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Nom du programme</Label>
                <Input
                  id="title"
                  placeholder="Ex: Résidence Les Lavandes"
                  value={newListing.title}
                  onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  placeholder="Ex: Aix-en-Provence"
                  value={newListing.location}
                  onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Prix à partir de (Optionnel)</Label>
                <Input
                  id="price"
                  placeholder="Ex: À partir de 300 000 €"
                  value={newListing.price}
                  onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type de projet</Label>
                <Input
                  id="type"
                  placeholder="Ex: Programme Neuf, Lotissement..."
                  value={newListing.type}
                  onChange={(e) => setNewListing({ ...newListing, type: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lots">Nombre total de lots</Label>
                <Input
                  id="lots"
                  placeholder="Ex: 24"
                  type="number"
                  value={newListing.lots}
                  onChange={(e) => setNewListing({ ...newListing, lots: e.target.value })}
                />
              </div>
            </div>
            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <Button onClick={handleAddListing} className="w-full">
                  Publier le programme
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un programme, une référence..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filtres</Button>
          <Button variant="outline">Trier par</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm group overflow-hidden transition-all hover:shadow-md">
            <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
              <Badge variant="outline" className="bg-background">
                Ref: {item.id}
              </Badge>
              <Badge
                variant={item.status === "Travaux en cours" ? "default" : item.status === "Nouveau" ? "secondary" : "outline"}
                className={
                  item.status === "Nouveau"
                    ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                    : item.status === "En commercialisation"
                      ? "bg-green-500/10 text-green-600 border-green-500/20"
                      : item.status === "Lancement"
                        ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                        : ""
                }
              >
                {item.status}
              </Badge>
            </div>
            <CardContent className="p-5 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-foreground line-clamp-1">{item.title}</h3>
                <p className="text-sm font-medium text-primary mt-1">{item.type}</p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  {item.price}
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  {item.availableLots} / {item.lots} lots disponibles
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <Button variant="outline" className="flex-1" size="sm">
                  <FileEdit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
