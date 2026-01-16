import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { MessagesTab } from "../shared/MessagesTab";
import { NeedsTab } from "../shared/NeedsTab";
import { VendorsTab } from "../renovateur/VendorsTab";
import { PromotersTab } from "../shared/PromotersTab";
import { VisitsTab } from "../shared/VisitsTab";
import { PatrimonyTab } from "../shared/PatrimonyTab";
import { ExpertsTab } from "../shared/ExpertsTab";
import { PostPurchaseTab } from "./PostPurchaseTab";

export function BuyerDashboard() {
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
              <h1 className="text-3xl font-bold text-foreground">{t("dashboard.welcome")}</h1>
              <p className="text-muted-foreground mt-1">Suivez vos projets et échangez avec vos experts.</p>
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
        <Tabs defaultValue="needs" className="space-y-8">
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <TabsList className="inline-flex min-w-full justify-between h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl gap-1">
              <TabsTrigger value="needs" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                {t("dashboard.tabs.needs")}
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                {t("dashboard.tabs.messages")}
              </TabsTrigger>
              <TabsTrigger value="vendors" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                Parc vendeur
              </TabsTrigger>
              <TabsTrigger value="promoters" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                Parc promoteur
              </TabsTrigger>
              <TabsTrigger value="experts" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                Accompagnements
              </TabsTrigger>
              <TabsTrigger value="visits" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                Mon agenda
              </TabsTrigger>
              <TabsTrigger value="post_purchase" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
                Conseils après achat
              </TabsTrigger>
              <TabsTrigger value="patrimony" className="text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap">
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
          <TabsContent value="vendors">
            <VendorsTab />
          </TabsContent>
          <TabsContent value="promoters">
            <PromotersTab />
          </TabsContent>
          <TabsContent value="experts">
            <ExpertsTab />
          </TabsContent>
          <TabsContent value="visits">
            <VisitsTab />
          </TabsContent>
          <TabsContent value="post_purchase">
            <PostPurchaseTab />
          </TabsContent>
          <TabsContent value="patrimony">
            <PatrimonyTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
