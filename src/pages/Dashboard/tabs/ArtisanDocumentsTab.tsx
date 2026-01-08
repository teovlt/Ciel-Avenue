import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockArtisanDocuments } from "../data/mockData";
import { FileCheck, Upload, AlertCircle } from "lucide-react";

export function ArtisanDocumentsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Documents Administratifs</h2>
          <p className="text-muted-foreground">Gérez vos assurances et certifications.</p>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockArtisanDocuments.map((doc) => (
          <Card key={doc.id} className="card-hover-lift">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <FileCheck className="h-6 w-6 text-blue-500" />
                </div>
                <Badge variant={doc.status === "Validé" ? "default" : "destructive"}>{doc.status}</Badge>
              </div>
              <h3 className="font-semibold mb-1">{doc.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Validité: {doc.date}</p>

              {doc.status !== "Validé" && (
                <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 p-2 rounded-lg mb-4">
                  <AlertCircle className="h-4 w-4" />
                  Action requise
                </div>
              )}

              <Button variant="outline" className="w-full">
                Mettre à jour
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
