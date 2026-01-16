import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPostRental } from "../data/mockData";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

export function PostRentalTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Après la mise en location</h2>
        <p className="text-muted-foreground">Les étapes clés pour sécuriser votre location.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPostRental.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="mt-1">
                {item.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-lg ${item.completed ? "line-through text-muted-foreground" : ""}`}>{item.title}</h3>
                  <Badge variant={item.date === "À faire" ? "default" : "secondary"}>{item.date}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {!item.completed && (
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Commncer <ArrowRight className="ml-2 h-4 w-4" />
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
