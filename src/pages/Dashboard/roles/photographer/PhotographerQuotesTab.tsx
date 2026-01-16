import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPhotographerQuotes } from "../data/mockData";
import { FileText, Link as LinkIcon } from "lucide-react";

export function PhotographerQuotesTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vos Devis</h2>
          <p className="text-muted-foreground">Propositions de forfaits et interventions.</p>
        </div>
        <Button variant="outline">
          <LinkIcon className="mr-2 h-4 w-4" /> Lier logiciel externe
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockPhotographerQuotes.map((quote) => (
          <Card key={quote.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{quote.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    Client: {quote.client} - {quote.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">{quote.amount}</span>
                <Badge variant={quote.status === "Signé" ? "default" : "outline"}>{quote.status}</Badge>
                <Button size="sm" variant="ghost">
                  Voir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
