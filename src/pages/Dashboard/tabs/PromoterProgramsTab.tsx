import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockPromoterPrograms } from "../data/mockData";
import { Plus, Edit, Image as ImageIcon, Check } from "lucide-react";
import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PromoterProgramsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vos Programmes</h2>
          <p className="text-muted-foreground">Espace dédié à la création et modification de programmes immobiliers.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Créer un programme
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nouveau Programme Immobilier</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" placeholder="Résidence..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loc" className="text-right">
                  Lieu
                </Label>
                <Input id="loc" placeholder="Ville, quartier" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  Desc.
                </Label>
                <Textarea id="desc" placeholder="Description courte..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Image</Label>
                <div className="col-span-3 flex items-center border rounded-md p-2 text-muted-foreground bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                  <ImageIcon className="mr-2 h-4 w-4" /> Ajouter photo
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Créer le programme
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockPromoterPrograms.map((program) => (
          <Card key={program.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col h-full card-hover-lift">
            <div className="relative h-48 w-full">
              <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-4 right-4 bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90">
                {program.status}
              </Badge>
            </div>
            <CardContent className="p-6 flex flex-col flex-grow space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{program.title}</h3>
                  <p className="text-muted-foreground flex items-center gap-1 text-sm pt-1">{program.location}</p>
                </div>
              </div>

              <p className="text-sm line-clamp-3 flex-grow">{program.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {program.keyPoints.map((point, i) => (
                  <Badge key={i} variant="secondary" className="text-xs font-normal">
                    <Check className="mr-1 h-3 w-3 text-primary" /> {point}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" className="w-full">
                  <ImageIcon className="mr-2 h-4 w-4" /> Photos
                </Button>
                <Button size="sm" className="w-full">
                  <Edit className="mr-2 h-4 w-4" /> Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
