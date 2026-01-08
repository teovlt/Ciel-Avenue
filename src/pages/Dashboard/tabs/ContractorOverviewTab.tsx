import { Card, CardContent } from "@/components/ui/card";
import { mockContractorOverview } from "../data/mockData";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContractorOverviewTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Types de missions disponibles</h2>
        <p className="text-muted-foreground">1 type de prestation pour accompagner tous les besoins immobiliers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContractorOverview.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift cursor-pointer group">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-xl ${item.bg}`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-foreground">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 hover:bg-transparent text-foreground group-hover:text-primary mt-2"
              >
                Voir détails <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
