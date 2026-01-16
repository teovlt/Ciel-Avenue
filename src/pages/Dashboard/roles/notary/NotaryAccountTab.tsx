import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";
import { Switch } from "@radix-ui/react-switch";

export function NotaryAccountTab() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Mon Compte</h2>
        <p className="text-muted-foreground">Gérez vos informations personnelles et préférences.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
            <CardDescription>Modifiez vos coordonnées de contact.</CardDescription>
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
              <Label htmlFor="company">Étude / Cabinet</Label>
              {/* Casting specifically for ExpertProfile if needed, but for now simple display */}
              <Input id="company" defaultValue="Étude Maître Durand" />
            </div>
            <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préférences de Notification</CardTitle>
            <CardDescription>Gérez comment vous souhaitez être contacté.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Nouvelle mission</Label>
                <p className="text-sm text-muted-foreground">Recevoir un email quand une nouvelle mission est disponible.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Rappel de dossier</Label>
                <p className="text-sm text-muted-foreground">Notifications pour les échéances importantes.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Paiements</Label>
                <p className="text-sm text-muted-foreground">Alertes lors de la réception d'un paiement.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
