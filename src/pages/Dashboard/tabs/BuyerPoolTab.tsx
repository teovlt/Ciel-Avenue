import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sellerBuyerPool } from "../data/mockData";

export function BuyerPoolTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Acquéreurs potentiels</h2>
        <p className="text-muted-foreground">Ces profils matchent avec vos biens en vente.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellerBuyerPool.map((buyer) => (
          <Card key={buyer.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
                <img src={buyer.image} alt={buyer.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{buyer.name}</h3>
                <p className="text-sm text-muted-foreground">{buyer.details}</p>
              </div>
              <div className="w-full bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Budget</p>
                  <p className="font-semibold">{buyer.budget}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Match</p>
                  <p className="font-bold text-green-600">{buyer.match}%</p>
                </div>
              </div>

              <Button className="w-full">Proposer une visite</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
