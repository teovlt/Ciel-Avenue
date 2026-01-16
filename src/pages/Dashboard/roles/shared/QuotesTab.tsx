import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockQuotes } from "../data/mockData";
import { FileText, Download, Eye } from "lucide-react";

export function QuotesTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Mes Devis</h2>
        <p className="text-muted-foreground">Suivi de vos demandes de travaux.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockQuotes.map((quote) => (
          <Card key={quote.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{quote.title}</h3>
                    <p className="text-sm text-muted-foreground">{quote.artisan}</p>
                  </div>
                </div>
                <Badge variant={quote.status === "Reçu" ? "default" : "secondary"}>{quote.status}</Badge>
              </div>

              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-muted-foreground">Montant estimé</span>
                <span className="font-bold text-lg">{quote.amount}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Détails
                </Button>
                {quote.status === "Reçu" && (
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
