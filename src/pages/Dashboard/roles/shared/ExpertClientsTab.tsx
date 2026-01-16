import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { expertClients } from "../data/mockData";
import { useTranslation } from "react-i18next";
import { MessageSquare, Phone } from "lucide-react";

export function ExpertClientsTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">{t("dashboard.expert.clients.title")}</h2>
        <Button>Ajouter un client</Button>
      </div>
      <div className="space-y-4">
        {expertClients.map((client) => (
          <Card key={client.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-primary/20">
                  <img src={client.image} className="w-full h-full object-cover" />
                </div>
                <Badge variant={client.status === "active" ? "default" : "secondary"}>
                  {client.status === "active" ? "Actif" : "En attente"}
                </Badge>
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div>
                  <h3 className="text-lg font-bold">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Budget : <span className="font-semibold text-foreground">{client.budget}</span> • {client.location}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="outline" className="bg-primary/5 border-primary/20">
                    Solvabilité : {client.solvabilityScore}/10
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">Dernier contact : {client.lastContact}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button size="icon" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button className="flex-1 md:flex-none">Voir dossier</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
