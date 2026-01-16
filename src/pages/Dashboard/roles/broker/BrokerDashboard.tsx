import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrokerOverviewTab } from "./BrokerOverviewTab";
import { BrokerMissionsTab } from "./BrokerMissionsTab";
import { BrokerQuotesTab } from "./BrokerQuotesTab";
import { BrokerDocumentsTab } from "./BrokerDocumentsTab";
import { BrokerPaymentsTab } from "./BrokerPaymentsTab";

import { FileText, Briefcase, FileCheck, Euro, LayoutDashboard } from "lucide-react";

export function BrokerDashboard() {
  const { user } = useAuth();
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
              <h1 className="text-3xl font-bold text-foreground">Espace Courtier</h1>
              <p className="text-muted-foreground mt-1">Bonjour {user?.firstName || "Courtier"}, gérez vos financements et vos clients.</p>
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
          <TabsList className="grid w-full grid-cols-2 h-auto md:grid-cols-5 p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="overview">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Vue d'ensemble</span>
              <span className="md:hidden">Aperçu</span>
            </TabsTrigger>
            <TabsTrigger value="missions">
              <Briefcase className="h-4 w-4 mr-2" />
              Missions
            </TabsTrigger>
            <TabsTrigger value="quotes">
              <FileText className="h-4 w-4 mr-2" />
              Devis
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileCheck className="h-4 w-4 mr-2" />
              <span>Docs</span>
            </TabsTrigger>
            <TabsTrigger value="payments">
              <Euro className="h-4 w-4 mr-2" />
              Paiements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BrokerOverviewTab />
          </TabsContent>

          <TabsContent value="missions">
            <BrokerMissionsTab />
          </TabsContent>

          <TabsContent value="quotes">
            <BrokerQuotesTab />
          </TabsContent>

          <TabsContent value="documents">
            <BrokerDocumentsTab />
          </TabsContent>

          <TabsContent value="payments">
            <BrokerPaymentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
