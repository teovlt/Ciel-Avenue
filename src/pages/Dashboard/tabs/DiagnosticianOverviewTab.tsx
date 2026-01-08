import { Card, CardContent } from "@/components/ui/card";
import { mockDiagnosticianOverview } from "../data/mockData";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DiagnosticianOverviewTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Types de diagnostics disponibles</h2>
        <p className="text-muted-foreground">7 diagnostics immobiliers obligatoires pour vendeurs, bailleurs et rénoveurs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDiagnosticianOverview.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm card-hover-lift cursor-pointer group h-full">
            <CardContent className="p-6 space-y-4 h-full flex flex-col">
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-xl ${item.bg}`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-foreground font-medium">{item.description}</p>

                <div className="space-y-1 pt-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Validité:</span> {item.validity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Obligatoire:</span> {item.mandatory}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 hover:bg-transparent text-foreground group-hover:text-primary mt-4"
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
