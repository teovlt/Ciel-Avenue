import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle2 } from "lucide-react";

export function DocumentsTab() {
  const mockDocuments = [
    { name: "Pièce d'identité", status: "validated", date: "12 Oct 2024" },
    { name: "Justificatif de domicile", status: "validated", date: "12 Oct 2024" },
    { name: "Avis d'imposition N-1", status: "review", date: "14 Oct 2024" },
    { name: "Bulletins de salaire", status: "missing", date: "-" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">Mes Documents</h2>
        <Button>Ajouter un document</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDocuments.map((doc, idx) => (
          <Card key={idx} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <Badge variant={doc.status === "validated" ? "default" : doc.status === "missing" ? "destructive" : "secondary"}>
                  {doc.status === "validated" ? "Validé" : doc.status === "missing" ? "Manquant" : "En revue"}
                </Badge>
              </div>
              <div>
                <h3 className="font-bold">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">Mis à jour : {doc.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  Aperçu
                </Button>
                {doc.status === "validated" && (
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {/* Helper Card */}
        <Card className="border-dashed border-2 border-border bg-transparent flex items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Tout est à jour ?</h3>
            <p className="text-sm text-muted-foreground">Demandez une attestation de solvabilité</p>
            <Button variant="link">Demander</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
