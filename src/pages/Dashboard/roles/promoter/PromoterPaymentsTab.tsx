import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPromoterPayments } from "../data/mockData";
import { Euro, ArrowUpRight, Clock } from "lucide-react";

export function PromoterPaymentsTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Appels de Fonds</h2>
        <p className="text-muted-foreground">Suivi des encaissements programmes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150 000 €</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320 000 €</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Année</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 250 000 €</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Historique des règlements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPromoterPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${payment.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    <Euro className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.client} - {payment.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{payment.amount}</p>
                  <p className={`text-xs ${payment.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                    {payment.status === "Paid" ? "Payé" : "En attente"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
