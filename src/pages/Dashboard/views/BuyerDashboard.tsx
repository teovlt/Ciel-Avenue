import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { MessagesTab } from "../tabs/MessagesTab";
import { NeedsTab } from "../tabs/NeedsTab";
import { VendorsTab } from "../tabs/VendorsTab";
import { PromotersTab } from "../tabs/PromotersTab";
import { VisitsTab } from "../tabs/VisitsTab";
import { PatrimonyTab } from "../tabs/PatrimonyTab";
import { ExpertsTab } from "../tabs/ExpertsTab";
import { PostPurchaseTab } from "../tabs/PostPurchaseTab";

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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="needs" className="text-xs sm:text-sm">
              {t("dashboard.tabs.needs")}
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm">
              {t("dashboard.tabs.messages")}
            </TabsTrigger>
            <TabsTrigger value="vendors" className="text-xs sm:text-sm">
              Parc vendeur
            </TabsTrigger>
            <TabsTrigger value="promoters" className="text-xs sm:text-sm">
              Parc promoteur
            </TabsTrigger>
            <TabsTrigger value="experts" className="text-xs sm:text-sm">
              Accompagnements
            </TabsTrigger>
            <TabsTrigger value="visits" className="text-xs sm:text-sm">
              Mon agenda
            </TabsTrigger>
            <TabsTrigger value="post_purchase" className="text-xs sm:text-sm">
              Conseils après achat
            </TabsTrigger>
            <TabsTrigger value="patrimony" className="text-xs sm:text-sm">
              {t("dashboard.tabs.patrimony")}
            </TabsTrigger>
          </TabsList>

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
