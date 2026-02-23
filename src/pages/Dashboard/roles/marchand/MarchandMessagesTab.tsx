import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Reply, Clock } from "lucide-react";

export function MarchandMessagesTab() {
  const mockMessages = [
    {
      id: 1,
      client: "Lucas D.",
      subject: "Visite pour l'appartement Paris 15",
      preview: "Bonjour, seriez-vous disponible pour que je puisse visiter le bien T3 à Paris jeudi prochain vers 18h ?...",
      date: "Aujourd'hui, 10:30",
      unread: true,
    },
    {
      id: 2,
      client: "Maître Renaud (Notaire)",
      subject: "Signature compromis - SCI Les Oliviers",
      preview: "Voici le projet de compromis pour relecture avant notre rendez-vous du 15. Pouvez-vous vérifier les clauses ?",
      date: "Hier, 15:20",
      unread: false,
    },
    {
      id: 3,
      client: "Famille Martin",
      subject: "Offre d'achat Maison Boulogne",
      preview: "Nous venons de recevoir l'accord de principe de la banque pour notre offre. Comment procède-t-on ensuite ?",
      date: "12 Oct 2024",
      unread: false,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Vos Messages</h2>
        <p className="text-muted-foreground">Échangez avec vos clients acheteurs, vendeurs et vos partenaires.</p>
      </div>

      <div className="space-y-4">
        {mockMessages.map((msg) => (
          <Card
            key={msg.id}
            className={`border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all hover:shadow-md ${msg.unread ? "border-l-4 border-l-primary" : ""}`}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div
                  className={`hidden sm:flex h-12 w-12 rounded-full items-center justify-center flex-shrink-0 ${msg.unread ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <MessageSquare className="h-6 w-6" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg leading-none flex items-center gap-2">
                        {msg.client}
                        {msg.unread && <Badge className="h-5 px-1.5 bg-primary hover:bg-primary">Nouveau</Badge>}
                      </h3>
                      <p className="font-medium text-foreground mt-1">{msg.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                      <Clock className="h-3 w-3" /> {msg.date}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{msg.preview}</p>

                  <div className="pt-2 flex justify-end">
                    <Button variant={msg.unread ? "default" : "outline"} size="sm" className="gap-2">
                      <Reply className="h-4 w-4" />
                      Répondre
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
