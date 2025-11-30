"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Building2, MessageSquare, Users, Calendar, MapPin, Euro, Bed, Square, Send, Search, UserCircle, Lock } from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [messageInput, setMessageInput] = useState("");

  const mockNeeds = [
    {
      id: 1,
      type: t("dashboard.needs.propertyType.apartment"),
      location: "Paris 15ème",
      price: "345 000 €",
      surface: "72 m²",
      rooms: "3 pièces",
      status: t("dashboard.needs.status.inProgress"),
      match: 95,
    },
    {
      id: 2,
      type: t("dashboard.needs.propertyType.apartment"),
      location: "Issy-les-Moulineaux",
      price: "320 000 €",
      surface: "68 m²",
      rooms: "3 pièces",
      status: t("dashboard.needs.status.new"),
      match: 88,
    },
    {
      id: 3,
      type: t("dashboard.needs.propertyType.apartment"),
      location: "Boulogne-Billancourt",
      price: "350 000 €",
      surface: "75 m²",
      rooms: "3 pièces",
      status: t("dashboard.needs.status.inProgress"),
      match: 92,
    },
  ];

  const mockVendors = [
    { id: 1, name: "Jean Dupont", property: "Appartement 75m² - Paris 15ème", status: t("dashboard.vendors.status.available") },
    { id: 2, name: "Marie Martin", property: "Appartement 68m² - Issy", status: t("dashboard.vendors.status.visitScheduled") },
    { id: 3, name: "Pierre Dubois", property: "Appartement 72m² - Boulogne", status: t("dashboard.vendors.status.available") },
  ];

  const mockPromoters = [
    { id: 1, name: "Kaufman & Broad", project: "Résidence Le Parc", units: "12 appartements", location: "Paris 15ème" },
    { id: 2, name: "Nexity", project: "Les Jardins d'Issy", units: "8 appartements", location: "Issy-les-Moulineaux" },
    { id: 3, name: "Bouygues Immobilier", project: "Villa Moderne", units: "15 appartements", location: "Boulogne" },
  ];

  const mockVisits = [
    { id: 1, date: "15 Déc 2025", time: "14:00", property: "Appartement Paris 15ème", expert: "Sophie Durand" },
    { id: 2, date: "18 Déc 2025", time: "10:30", property: "Résidence Le Parc", expert: "Marc Leblanc" },
    { id: 3, date: "20 Déc 2025", time: "16:00", property: "Appartement Issy", expert: "Sophie Durand" },
  ];

  const mockMessages = [
    {
      id: 1,
      from: "Sophie Durand",
      role: t("dashboard.messages.roles.expert"),
      message: "J'ai trouvé 3 biens qui correspondent parfaitement à vos critères.",
      time: "Il y a 2h",
    },
    {
      id: 2,
      from: "Marc Leblanc",
      role: t("dashboard.messages.roles.expert"),
      message: "La visite de demain est confirmée. Rendez-vous à 14h.",
      time: "Il y a 5h",
    },
    {
      id: 3,
      from: t("dashboard.messages.roles.system"),
      role: t("dashboard.messages.roles.notification"),
      message: "Nouveau bien ajouté à votre sélection",
      time: "Il y a 1j",
    },
  ];

  // If not authenticated, show message to create account
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t("dashboard.notConnected.title")}</h1>
              <p className="text-lg text-muted-foreground">{t("dashboard.notConnected.description")}</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/journey">{t("dashboard.notConnected.cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("dashboard.title")}</h1>
              <p className="text-muted-foreground mt-1">{t("dashboard.welcome")}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  {t("dashboard.viewProfile")}
                </Link>
              </Button>
              <Badge className="bg-primary text-primary-foreground">{t("dashboard.activeProfile")}</Badge>
              <Badge variant="outline">3 {t("dashboard.propertiesPending")}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Tabs defaultValue="needs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="needs" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t("dashboard.tabs.needs")}</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t("dashboard.tabs.messages")}</span>
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t("dashboard.tabs.vendors")}</span>
            </TabsTrigger>
            <TabsTrigger value="promoters" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t("dashboard.tabs.promoters")}</span>
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t("dashboard.tabs.visits")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Besoins Tab */}
          <TabsContent value="needs" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground">{t("dashboard.needs.title")}</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t("dashboard.needs.searchPlaceholder")} className="pl-10 w-full sm:w-[300px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockNeeds.map((need) => (
                <Card key={need.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant={need.status === t("dashboard.needs.status.new") ? "default" : "secondary"}
                        className={need.status === t("dashboard.needs.status.new") ? "bg-primary text-primary-foreground" : ""}
                      >
                        {need.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{t("dashboard.needs.match")}</div>
                        <div className="text-lg font-bold text-primary">{need.match}%</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{need.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{need.location}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2 rounded-lg bg-muted">
                        <Euro className="h-4 w-4 mx-auto text-primary mb-1" />
                        <div className="text-xs text-muted-foreground">{t("dashboard.needs.price")}</div>
                        <div className="text-sm font-semibold text-foreground">{need.price}</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted">
                        <Square className="h-4 w-4 mx-auto text-primary mb-1" />
                        <div className="text-xs text-muted-foreground">{t("dashboard.needs.surface")}</div>
                        <div className="text-sm font-semibold text-foreground">{need.surface}</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted">
                        <Bed className="h-4 w-4 mx-auto text-primary mb-1" />
                        <div className="text-xs text-muted-foreground">{t("dashboard.needs.rooms")}</div>
                        <div className="text-sm font-semibold text-foreground">{need.rooms}</div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {t("dashboard.needs.viewDetails")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {t("dashboard.messages.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{msg.from}</p>
                          <p className="text-xs text-muted-foreground">{msg.role}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-foreground">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Input
                    placeholder={t("dashboard.messages.writePlaceholder")}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{t("dashboard.vendors.title")}</h2>
              <p className="text-muted-foreground">{t("dashboard.vendors.description")}</p>
            </div>

            <div className="space-y-4">
              {mockVendors.map((vendor) => (
                <Card key={vendor.id} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{vendor.name}</h3>
                        <p className="text-muted-foreground">{vendor.property}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={vendor.status === t("dashboard.vendors.status.visitScheduled") ? "default" : "secondary"}
                          className={
                            vendor.status === t("dashboard.vendors.status.visitScheduled") ? "bg-primary text-primary-foreground" : ""
                          }
                        >
                          {vendor.status}
                        </Badge>
                        <Button variant="outline">{t("dashboard.vendors.contact")}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Promoters Tab */}
          <TabsContent value="promoters" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{t("dashboard.promoters.title")}</h2>
              <p className="text-muted-foreground">{t("dashboard.promoters.description")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockPromoters.map((promoter) => (
                <Card key={promoter.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Building2 className="h-8 w-8 text-primary" />
                      <Badge variant="outline">{promoter.units}</Badge>
                    </div>
                    <CardTitle className="text-xl">{promoter.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-foreground mb-1">{promoter.project}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{promoter.location}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      {t("dashboard.promoters.learnMore")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Visits Tab */}
          <TabsContent value="visits" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{t("dashboard.visits.title")}</h2>
              <p className="text-muted-foreground">{t("dashboard.visits.description")}</p>
            </div>

            <div className="space-y-4">
              {mockVisits.map((visit) => (
                <Card key={visit.id} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="text-sm font-medium text-primary mb-1">{visit.date}</div>
                        <div className="text-2xl font-bold text-primary">{visit.time}</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{visit.property}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {t("dashboard.visits.expert")} : {visit.expert}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("dashboard.visits.confirm")}</Button>
                        <Button variant="outline">{t("dashboard.visits.cancel")}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
