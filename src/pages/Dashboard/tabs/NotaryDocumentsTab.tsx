import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockNotaryDocuments } from "../data/mockData";
import { FileText, Download, AlertCircle } from "lucide-react";

export function NotaryDocumentsTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Vos Documents</h2>
        <p className="text-muted-foreground">Documents administratifs et légaux liés à votre activité.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNotaryDocuments.map((doc) => (
          <Card key={doc.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <Badge variant={doc.status === "Validé" ? "default" : "destructive"}>{doc.status}</Badge>
              </div>
              <div>
                <h3 className="font-bold text-lg">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">Status: {doc.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  Aperçu
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              {doc.status !== "Validé" && (
                <div className="flex items-center gap-2 text-xs text-destructive mt-2">
                  <AlertCircle className="h-3 w-3" />
                  Action requise rapidement
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
