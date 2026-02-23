import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X, Plus, Save, UserPen } from "lucide-react";
import { toast } from "sonner";

export function MarchandOverviewTab() {
  const [tagInput, setTagInput] = useState("");
  const [profileData, setProfileData] = useState({
    title: "Le spécialiste des opérations immobilières complexes",
    keywords: ["Achat Comptant", "Division Parcellaire", "Rénovation Globale", "Succession"],
    description: `J'accompagne les particuliers et professionnels dans la valorisation de leur patrimoine immobilier.
Mon expertise me permet de me positionner sur des biens nécessitant d'importants travaux ou une réorganisation juridique et foncière.

👉 Rachat au comptant et sans condition suspensive de financement.
👉 Prise en charge des encombrants, successions longues et indivisions complexes.
👉 Rénovations énergétiques G et F pour remise sur le marché premium.`,
  });

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!profileData.keywords.includes(tagInput.trim())) {
        setProfileData({ ...profileData, keywords: [...profileData.keywords, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeKeyword = (kwToRemove: string) => {
    setProfileData({
      ...profileData,
      keywords: profileData.keywords.filter((kw) => kw !== kwToRemove),
    });
  };

  const handleSave = () => {
    // In a real app we would call an API here.
    toast.success("Profil mis à jour", {
      description: "Vos textes, mots-clés et descriptions ont bien été enregistrés.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Personnalisation de votre offre</h2>
        <p className="text-muted-foreground">
          Définissez vos mots-clés, votre accroche et le détail de vos prestations pour attirer les bons prospects.
        </p>
      </div>

      <Card className="border-border bg-card/80 backdrop-blur-sm overflow-hidden border-t-4 border-t-primary shadow-lg">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <UserPen className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Profil et Prestations</CardTitle>
              <CardDescription>Informations visibles sur votre espace public Ciel-Avenue</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-8">
          {/* Titre / Accroche */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-semibold">
              Phrase d'accroche (Titre)
            </Label>
            <p className="text-sm text-muted-foreground">Une description courte et percutante de votre proposition de valeur.</p>
            <Input
              id="title"
              className="text-lg py-6 font-medium"
              value={profileData.title}
              onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
              placeholder="Ex: Expert en valorisation de passoires thermiques..."
            />
          </div>

          {/* Mots Clés */}
          <div className="space-y-3">
            <Label htmlFor="keywords" className="text-base font-semibold">
              Mots-clés de votre expertise
            </Label>
            <p className="text-sm text-muted-foreground">
              Saisissez un mot-clé et appuyez sur 'Entrée' pour l'ajouter (Ex: Division immobilière).
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  id="keywords"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddKeyword}
                  placeholder="Ajouter une spécialité..."
                  className="pr-10 bg-background"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary"
                  onClick={() => handleAddKeyword({ key: "Enter", preventDefault: () => {} } as any)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-muted/40 rounded-lg border border-border/50 border-dashed">
                {profileData.keywords.length === 0 && (
                  <span className="text-sm text-muted-foreground italic w-full text-center">Aucun mot-clé renseigné.</span>
                )}
                {profileData.keywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="px-3 py-1.5 text-sm gap-2 hover:bg-secondary/80">
                    {kw}
                    <button onClick={() => removeKeyword(kw)} className="hover:text-destructive focus:outline-none transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Description Détaillée */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold">
              Description détaillée de vos prestations
            </Label>
            <p className="text-sm text-muted-foreground">
              Détaillez vos méthodes de travail, critères de recherche et zones d'intervention.
            </p>
            <Textarea
              id="description"
              rows={8}
              className="resize-y text-base p-4 bg-background leading-relaxed"
              value={profileData.description}
              onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
              placeholder="Je recherche activement des biens sur le secteur de..."
            />
          </div>

          {/* Save Action */}
          <div className="pt-6 border-t border-border flex justify-end">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              Sauvegarder les modifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
