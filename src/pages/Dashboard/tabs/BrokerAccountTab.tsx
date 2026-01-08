import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";
import { Switch } from "@/components/ui/switch";

export function BrokerAccountTab() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Mon Compte Courtier</h2>
        <p className="text-muted-foreground">Gérez vos informations de contact et vos préférences.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations Professionnelles</CardTitle>
            <CardDescription>Vos coordonnées visibles par les clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue={user?.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue={user?.lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <Input id="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Cabinet de Courtage</Label>
              <Input id="company" defaultValue="Meilleur Taux & Co" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orias">Numéro ORIAS</Label>
              <Input id="orias" defaultValue="12345678" />
            </div>
            <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préférences de Notification</CardTitle>
            <CardDescription>Gérez vos alertes dossiers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Nouveau dossier de financement</Label>
                <p className="text-sm text-muted-foreground">Notification dès qu'un client dépose un dossier.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mises à jour des taux</Label>
                <p className="text-sm text-muted-foreground">Recevoir les alertes de taux du marché.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
