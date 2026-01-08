import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockArtisanQuotes } from "../data/mockData";
import { FileText, Download, Send } from "lucide-react";

export function ArtisanQuotesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mes Devis</h2>
          <p className="text-muted-foreground">Gestion des devis envoyés et signés.</p>
        </div>
        <Button>Créer un devis</Button>
      </div>

      <div className="grid gap-4">
        {mockArtisanQuotes.map((quote) => (
          <Card key={quote.id} className="card-hover-lift">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{quote.type}</h3>
                    <p className="text-sm text-muted-foreground">Client: {quote.client}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{quote.date}</span>
                      <Badge variant="secondary" className="text-xs">
                        {quote.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{quote.amount}</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Send className="h-4 w-4" />
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
