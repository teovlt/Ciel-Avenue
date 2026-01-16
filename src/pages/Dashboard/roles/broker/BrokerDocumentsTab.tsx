import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockBrokerDocuments } from "../data/mockData";
import { FileCheck, Upload, AlertCircle } from "lucide-react";

export function BrokerDocumentsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Documents Administratifs</h2>
          <p className="text-muted-foreground">Gérez vos certifications et assurances</p>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockBrokerDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base font-medium">{doc.name}</CardTitle>
              </div>
              {doc.status === "À renouveler" && <AlertCircle className="h-4 w-4 text-orange-500" />}
            </CardHeader>
            <CardContent>
              <div className="mt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Validité</span>
                  <span className="text-sm font-medium">{doc.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={doc.status === "Validé" ? "default" : "destructive"}>{doc.status}</Badge>
                  <Button variant="ghost" size="sm">
                    Voir
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
