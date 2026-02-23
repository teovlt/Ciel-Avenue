import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Maximize2, Camera } from "lucide-react";

export function PhotographerPortfolioTab() {
  const portfolioItems = [
    {
      id: 1,
      title: "Villa Contemporaine - Aix",
      category: "Immobilier de Luxe",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    },
    {
      id: 2,
      title: "Appartement Haussmannien",
      category: "Prise de vue grand angle",
      image: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=600&q=80",
    },
    {
      id: 3,
      title: "Maison d'Architecte - Cassis",
      category: "Prise de vue Drone",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    },
    {
      id: 4,
      title: "Château Rénové",
      category: "Visite Virtuelle Matterport",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    },
    {
      id: 5,
      title: "Loft Industriel",
      category: "Immobilier",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Votre Portfolio</h2>
          <p className="text-muted-foreground">Vos meilleures réalisations pour inspirer vos futurs clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Copy className="h-4 w-4" />
            Copier votre lien
          </Button>
          <Button className="gap-2">
            <Camera className="h-4 w-4" />
            Ajouter un projet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border-border bg-card/80 backdrop-blur-sm group hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="icon" className="rounded-full shadow-xl">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              <Badge className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 backdrop-blur-md">{item.category}</Badge>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg text-foreground line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                Projet photographique livré au client avec droits d'utilisation web et impression.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
