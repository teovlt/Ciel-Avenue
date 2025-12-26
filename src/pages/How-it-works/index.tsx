"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  Scale,
  BadgeCheck,
  Users,
  Building,
  Sparkles,
  ShoppingCart,
  Key,
  Hammer,
  ClipboardCheck,
  MessageSquare,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  Home,
  Euro,
  UserCheck,
  Briefcase,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-20 page-transition">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary animate-bounce-in">
              <Sparkles className="h-4 w-4" />
              Plateforme tout-en-un
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance animate-fade-in-up">
              Comment fonctionne <span className="text-primary">CIEL AVENUE</span> ?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto animate-fade-in-up-delay-1">
              Une plateforme qui connecte clients et experts immobiliers de manière sécurisée. Des documents vérifiés, des profils
              qualifiés, et un accompagnement personnalisé.
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Le processus en 4 étapes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                De la création de votre profil à la concrétisation de votre projet immobilier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    Étape 1
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Créez votre profil</h3>
                  <p className="text-sm text-muted-foreground">
                    Inscrivez-vous et choisissez votre rôle : Acheteur, Vendeur, Locataire, ou Expert immobilier.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    Étape 2
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Déposez vos documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Téléchargez les documents requis pour votre profil. Ils seront vérifiés par nos experts.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <BadgeCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    Étape 3
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Profil vérifié</h3>
                  <p className="text-sm text-muted-foreground">
                    Votre profil est validé et vous obtenez un score de solvabilité ou de confiance.
                  </p>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="border-primary/20 bg-card relative overflow-hidden card-hover-lift">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    Étape 4
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Connectez-vous</h3>
                  <p className="text-sm text-muted-foreground">
                    Échangez avec les experts ou clients qualifiés pour avancer sur votre projet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-medium text-accent mb-4">
                <Building className="h-4 w-4" />
                Cas concrets
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Exemples de parcours utilisateurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez comment différents profils utilisent CIEL AVENUE pour leurs projets immobiliers
              </p>
            </div>

            <div className="space-y-8">
              {/* Case 1: Acheteur */}
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-background overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <ShoppingCart className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Marie, 32 ans - Acheteuse</h3>
                          <p className="text-muted-foreground">Première acquisition immobilière</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          Son parcours sur CIEL AVENUE
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 1 :</strong> Crée son profil "Acheteur" et renseigne son budget (350 000€), sa localisation
                              souhaitée (Paris 15ème) et le type de bien (T3).
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 2 :</strong> Dépose ses documents : bulletins de salaire, avis d'imposition, relevés bancaires.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 3 :</strong> Score de solvabilité calculé : 8.5/10. Capacité d'emprunt validée.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 5 :</strong> Un courtier certifié la contacte pour optimiser son financement.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <Card className="bg-card border-primary/20">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">8.5</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Score de solvabilité</p>
                            <p className="text-xs text-muted-foreground">Profil vérifié et qualifié</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Capacité d'emprunt</span>
                              <span className="font-semibold">350 000 €</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Taux estimé</span>
                              <span className="font-semibold">3.2%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case 2: Rénovateur */}
              <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-background overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                          <Hammer className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Thomas, 45 ans - Rénovateur</h3>
                          <p className="text-muted-foreground">Projet de rénovation maison ancienne</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Clock className="h-5 w-5 text-accent" />
                          Son parcours sur CIEL AVENUE
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 1 :</strong> Crée son profil "Rénovateur" avec son projet : rénovation complète d'une maison de
                              120m² à Villeurbanne.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 2 :</strong> Dépose les devis travaux et les plans du projet. Budget estimé : 80 000€.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 4 :</strong> Un maître d'œuvre certifié analyse son projet et propose un accompagnement.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Jour 7 :</strong> Mise en relation avec des artisans qualifiés pour les différents lots.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <Card className="bg-card border-accent/20">
                        <CardContent className="p-6 space-y-4">
                          <h4 className="font-semibold text-foreground text-center">Experts contactés</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <ClipboardCheck className="h-5 w-5 text-accent" />
                              <div>
                                <p className="text-sm font-medium">Maître d'œuvre</p>
                                <p className="text-xs text-muted-foreground">Coordination projet</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Hammer className="h-5 w-5 text-accent" />
                              <div>
                                <p className="text-sm font-medium">Artisans</p>
                                <p className="text-xs text-muted-foreground">Plomberie, électricité</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Scale className="h-5 w-5 text-accent" />
                              <div>
                                <p className="text-sm font-medium">Diagnostiqueur</p>
                                <p className="text-xs text-muted-foreground">DPE, amiante</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case 3: Expert Diagnostiqueur */}
              <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                          <Briefcase className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Sophie, 38 ans - Diagnostiqueur Expert</h3>
                          <p className="text-muted-foreground">Professionnelle certifiée DPE</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-accent" />
                          Son expérience en tant qu'Expert
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Inscription :</strong> Crée son profil "Expert Diagnostiqueur" et dépose ses certifications DPE,
                              amiante, plomb.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Vérification :</strong> Documents validés par l'équipe CIEL AVENUE. Profil certifié en 48h.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Leads qualifiés :</strong> Reçoit des demandes de clients pré-vérifiés avec dossiers complets.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <p>
                              <strong>Résultat :</strong> 156 missions réalisées via la plateforme en 1 an.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <Card className="bg-card border-accent/20">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-xs font-medium text-accent">
                            <BadgeCheck className="h-4 w-4" />
                            Expert Certifié
                          </div>
                          <h4 className="text-xl font-bold text-foreground">DiagImmo Pro</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Missions réalisées</span>
                              <span className="font-semibold">156</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Zones couvertes</span>
                              <span className="font-semibold">Paris, Lyon</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Note moyenne</span>
                              <span className="font-semibold">4.9/5</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">DPE</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Amiante</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Plomb</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Termites</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why CIEL AVENUE Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir CIEL AVENUE ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Une plateforme pensée pour simplifier et sécuriser chaque étape de votre projet immobilier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card border-border card-hover-lift">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Documents vérifiés</h3>
                  <p className="text-muted-foreground">
                    Tous les documents sont vérifiés par nos experts avant validation. Garantie d'authenticité.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border card-hover-lift">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Profils qualifiés</h3>
                  <p className="text-muted-foreground">
                    Clients pré-qualifiés avec score de solvabilité. Experts certifiés avec références vérifiées.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border card-hover-lift">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Mise en relation directe</h3>
                  <p className="text-muted-foreground">
                    Échangez directement avec les experts ou clients. Messagerie intégrée et notifications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Role Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-medium text-accent">
              <Users className="h-4 w-4" />
              Fonctionnalité unique
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Cumulez plusieurs rôles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vous êtes acheteur ET rénovateur ? Diagnostiqueur ET locataire ? Avec CIEL AVENUE, vous pouvez avoir plusieurs casquettes sur
              un seul compte.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                <ShoppingCart className="h-4 w-4" />
                Acheteur
              </div>
              <span className="text-muted-foreground self-center">+</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                <Hammer className="h-4 w-4" />
                Rénovateur
              </div>
              <span className="text-muted-foreground self-center">+</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-medium text-accent">
                <ClipboardCheck className="h-4 w-4" />
                Expert Diagnostiqueur
              </div>
            </div>

            <p className="text-sm text-muted-foreground">Basculez entre vos différents profils en un clic depuis votre tableau de bord.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">Prêt à démarrer votre projet ?</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Créez votre compte gratuitement et rejoignez des milliers d'utilisateurs qui font confiance à CIEL AVENUE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="card-hover-lift">
                <Link to="/journey">
                  Créer mon compte <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
