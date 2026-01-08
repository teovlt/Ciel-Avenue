import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockBrokerQuotes } from "../data/mockData"; // Ensure this matches the exported name in mockData.ts
import { FileText, Download, Send } from "lucide-react";

export function BrokerQuotesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vos Devis</h2>
          <p className="text-muted-foreground">Suivez vos propositions commerciales</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Créer un devis
        </Button>
      </div>

      <div className="grid gap-4">
        {mockBrokerQuotes.map((quote) => (
          <Card key={quote.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{quote.type}</CardTitle>
                  <div className="text-sm text-muted-foreground">Client: {quote.client}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{quote.amount}</div>
                <div className="text-xs text-muted-foreground">{quote.date}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-4">
                <Badge variant={quote.status === "Signé" ? "default" : "secondary"}>{quote.status}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Relancer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
