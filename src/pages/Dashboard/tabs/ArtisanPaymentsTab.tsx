import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockArtisanPayments } from "../data/mockData";
import { DollarSign, Calendar } from "lucide-react";

export function ArtisanPaymentsTab() {
  // Calculate total revenue
  const totalRevenue = mockArtisanPayments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[^0-9,]/g, "").replace(",", ".")), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/20 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chiffre d'affaires (Mois)</p>
                <h3 className="text-2xl font-bold">{totalRevenue.toLocaleString("fr-FR")} €</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Historique des paiements</h3>
        <div className="grid gap-4">
          {mockArtisanPayments.map((payment) => (
            <Card key={payment.id} className="card-hover-lift">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-xl">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{payment.description}</h4>
                    <p className="text-sm text-muted-foreground">
                      {payment.client} • {payment.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">{payment.amount}</span>
                  <Badge variant={payment.status === "Paid" ? "secondary" : "outline"}>
                    {payment.status === "Paid" ? "Payé" : "En attente"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
