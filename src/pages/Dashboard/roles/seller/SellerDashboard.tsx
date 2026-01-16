import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { MessagesTab } from "../shared/MessagesTab";
import { NeedsTab } from "../shared/NeedsTab";
import { ListingsTab } from "./ListingsTab";
import { BuyerPoolTab } from "../buyer/BuyerPoolTab";
import { ExpertsTab } from "../shared/ExpertsTab";
import { TipsTab } from "../shared/TipsTab";
import { PatrimonyTab } from "../shared/PatrimonyTab";

export function SellerDashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-primary w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-accent w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tableau de bord Vendeur</h1>
              <p className="text-muted-foreground mt-1">Gérez la vente de vos biens et suivez les acquéreurs potentiels.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  {t("dashboard.viewProfile")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
        <Tabs defaultValue="listings" className="space-y-8">
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <TabsList className="inline-flex min-w-full justify-between h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl gap-1">
            <TabsTrigger value="needs" className="text-xs sm:text-sm">
              {t("dashboard.tabs.needs")}
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm">
              {t("dashboard.tabs.messages")}
            </TabsTrigger>
            <TabsTrigger value="buyers" className="text-xs sm:text-sm">
              Parc acheteur
            </TabsTrigger>
            <TabsTrigger value="experts" className="text-xs sm:text-sm">
              Experts
            </TabsTrigger>
            <TabsTrigger value="listings" className="text-xs sm:text-sm">
              Mes annonces
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-xs sm:text-sm">
              Conseils
            </TabsTrigger>
            <TabsTrigger value="patrimony" className="text-xs sm:text-sm">
              {t("dashboard.tabs.patrimony")}
            </TabsTrigger>
          </TabsList>
          </div>

          <TabsContent value="needs">
            <NeedsTab />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
          <TabsContent value="buyers">
            <BuyerPoolTab />
          </TabsContent>
          <TabsContent value="experts">
            <ExpertsTab />
          </TabsContent>
          <TabsContent value="listings">
            <ListingsTab />
          </TabsContent>
          <TabsContent value="tips">
            <TipsTab />
          </TabsContent>
          <TabsContent value="patrimony">
            <PatrimonyTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
