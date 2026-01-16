import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

import { ArtisanOverviewTab } from "./ArtisanOverviewTab";
import { ArtisanMissionsTab } from "./ArtisanMissionsTab";
import { ArtisanQuotesTab } from "./ArtisanQuotesTab";
import { ArtisanDocumentsTab } from "./ArtisanDocumentsTab";
import { ArtisanPaymentsTab } from "./ArtisanPaymentsTab";

export function ArtisanDashboard() {
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
              <h1 className="text-3xl font-bold text-foreground">Espace Artisan</h1>
              <p className="text-muted-foreground mt-1">Gérez vos chantiers et devis travaux.</p>
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
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Accueil
            </TabsTrigger>
            <TabsTrigger value="missions" className="text-xs sm:text-sm">
              Chantiers
            </TabsTrigger>
            <TabsTrigger value="quotes" className="text-xs sm:text-sm">
              Vos devis
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs sm:text-sm">
              Vos documents
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm">
              Paiements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ArtisanOverviewTab />
          </TabsContent>
          <TabsContent value="missions">
            <ArtisanMissionsTab />
          </TabsContent>
          <TabsContent value="quotes">
            <ArtisanQuotesTab />
          </TabsContent>
          <TabsContent value="documents">
            <ArtisanDocumentsTab />
          </TabsContent>
          <TabsContent value="payments">
            <ArtisanPaymentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
