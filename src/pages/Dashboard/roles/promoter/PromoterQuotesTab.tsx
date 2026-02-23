import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, Clock } from "lucide-react";

export function PromoterQuotesTab() {
  const mockQuotes = [
    {
      id: 1,
      date: "15 Oct 2024",
      client: "M. et Mme Dupont",
      description: "Proposition VEFA Lot A12",
      amount: "320 000,00 €",
      status: "Accepted",
    },
    {
      id: 2,
      date: "10 Oct 2024",
      client: "Investissement Sud",
      description: "Proposition Lots B01 & B02",
      amount: "615 000,00 €",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Vos Devis & Propositions</h2>
        <p className="text-muted-foreground">Suivez vos propositions commerciales et réservations en cours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockQuotes.map((quote) => (
          <Card key={quote.id} className="border-border bg-card/80 backdrop-blur-sm overflow-hidden group">
            <div className={`h-1 w-full ${quote.status === "Accepted" ? "bg-green-500" : "bg-amber-500"}`} />
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <Badge
                  variant={quote.status === "Accepted" ? "default" : "secondary"}
                  className={
                    quote.status === "Accepted"
                      ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                      : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                  }
                >
                  {quote.status === "Accepted" ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Accepté
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> En attente
                    </span>
                  )}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground">{quote.client}</h3>
                <p className="text-sm text-muted-foreground">{quote.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Proposition du {quote.date}</span>
                  <span className="font-bold text-lg text-primary">{quote.amount}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border/50">
                <Button variant="outline" className="flex-1" size="sm">
                  Voir en détail
                </Button>
                <Button variant="ghost" size="icon" title="Télécharger">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
