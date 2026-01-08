import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPostPurchase } from "../data/mockData";
import { CheckCircle2, Circle } from "lucide-react";

export function PostPurchaseTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Conseils</h2>
        <p className="text-muted-foreground">Votre check-list pour un emménagement serein.</p>
      </div>
      <div className="space-y-4">
        {mockPostPurchase.map((item) => (
          <Card key={item.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-lg ${item.completed ? "line-through text-muted-foreground" : ""}`}>{item.title}</h3>
                  <Badge variant={item.date === "Urgent" ? "destructive" : item.completed ? "secondary" : "outline"}>{item.date}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              {!item.completed && (
                <Button size="sm" variant="outline">
                  Gérer
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
