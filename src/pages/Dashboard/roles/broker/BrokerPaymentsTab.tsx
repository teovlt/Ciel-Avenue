import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBrokerPayments } from "../data/mockData";
import { DollarSign, Calendar } from "lucide-react";

export function BrokerPaymentsTab() {
  // Calculate total revenue
  const totalRevenue = mockBrokerPayments
    .filter((p) => p.status === "Paid")
    .reduce((acc, curr) => acc + parseFloat(curr.amount.replace(" €", "").replace(",", ".").replace(" ", "")), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Paiements</h2>
          <p className="text-muted-foreground">Suivi de votre chiffre d'affaires</p>
        </div>
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 bg-white/20 rounded-full">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm opacity-90">Total encaissé</div>
              <div className="text-2xl font-bold">{totalRevenue.toLocaleString("fr-FR")} €</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <div className="p-4 grid gap-4">
          {mockBrokerPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${payment.status === "Paid" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
                >
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{payment.description}</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {payment.date} • {payment.client}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{payment.amount}</div>
                <Badge variant={payment.status === "Paid" ? "default" : "outline"} className="mt-1">
                  {payment.status === "Paid" ? "Payé" : "En attente"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
