import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Euro, Home, User, BadgeCheck, TrendingUp, Calendar, ArrowRight } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-sm font-medium text-primary">
              <BadgeCheck className="h-4 w-4" />
              Profil validé
            </div>
            <h1 className="text-4xl font-bold text-foreground">Votre Profil Acheteur</h1>
            <p className="text-lg text-muted-foreground">Profil complet et préqualifié - Prêt pour le matching</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Score de solvabilité */}
          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary-foreground">8.5</div>
                      <div className="text-xs text-primary-foreground/80">/ 10</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Excellent profil</h2>
                    <p className="text-muted-foreground">Score de solvabilité</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Solvable
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Documents validés
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <User className="h-3 w-3 mr-1" />
                      Profil complet
                    </Badge>
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-2">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-1">Capacité d'emprunt</p>
                    <p className="text-2xl font-bold text-foreground">350 000 €</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-1">Taux estimé</p>
                    <p className="text-2xl font-bold text-foreground">3.2%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critères de recherche */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Vos critères de recherche
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type de bien</p>
                  <p className="font-semibold text-foreground">Appartement</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Localisation</p>
                  <p className="font-semibold text-foreground">Paris et proche banlieue</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget maximum</p>
                  <p className="font-semibold text-foreground">350 000 €</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Surface / Pièces</p>
                  <p className="font-semibold text-foreground">75 m² minimum - 3 pièces</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents fournis */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Documents validés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Pièce d'identité",
                  "Justificatif de domicile",
                  "Avis d'imposition",
                  "Bulletins de salaire",
                  "Relevés bancaires",
                  "Justificatif professionnel",
                ].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informations complémentaires */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informations complémentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Situation familiale</p>
                <p className="font-semibold text-foreground">Marié(e)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date de création</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Statut</p>
                <Badge className="bg-primary text-primary-foreground">Actif</Badge>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Votre profil est prêt !</h3>
                <p className="text-muted-foreground">Accédez à votre dashboard pour découvrir les biens qui correspondent à vos critères</p>
              </div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/dashboard">
                  Accéder au dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
