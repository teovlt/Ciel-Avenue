import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { sellerTips } from "../data/mockData";

export function TipsTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Guide du vendeur</h2>
        <p className="text-muted-foreground">Les étapes clés pour réussir votre vente.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sellerTips.map((tip, idx) => (
          <Card key={idx} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
            <CardContent className="p-6 space-y-4">
              <div className={`h-12 w-12 rounded-xl ${tip.bg} flex items-center justify-center`}>
                <tip.icon className={`h-6 w-6 ${tip.color}`} />
              </div>
              <h3 className="text-xl font-bold">{tip.title}</h3>
              <p className="text-muted-foreground text-sm">{tip.description}</p>
              <Button variant="link" className={`p-0 h-auto ${tip.color}`}>
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
