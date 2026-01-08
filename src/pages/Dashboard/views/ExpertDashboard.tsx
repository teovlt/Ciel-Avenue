import { Briefcase, Users, ArrowUpRight, Target, UserCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleSwitcher } from "../components/RoleSwitcher";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import { ExpertClientsTab } from "../tabs/ExpertClientsTab";
import { ExpertMissionsTab } from "../tabs/ExpertMissionsTab";
import { NotaryMissionsTab } from "../tabs/NotaryMissionsTab";
import { ExpertScheduleTab } from "../tabs/ExpertScheduleTab";
import { MessagesTab } from "../tabs/MessagesTab";

export function ExpertDashboard() {
  const { t } = useTranslation();
  const { activeRole } = useAuth();
  const isNotary = activeRole?.subtype === "notaire";

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="decorative-blob decorative-blob-accent w-96 h-96 -top-48 -right-48 animate-float-slow" />
        <div className="decorative-blob decorative-blob-primary w-64 h-64 bottom-32 -left-32 animate-float-delay" />
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                  {t("dashboard.expert.badge")}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{t("dashboard.expert.welcome")}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  {t("dashboard.viewProfile")}
                </Link>
              </Button>
              <RoleSwitcher />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-fade-in-up-delay-1">
            <Card className="border-border bg-card/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.activeClients")}</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.activeMissions")}</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.todayAppointments")}</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.expert.stats.monthlyGrowth")}</p>
                  <div className="flex items-center text-green-500 text-sm font-bold">
                    +15% <ArrowUpRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
        <Tabs defaultValue="missions" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="clients" className="text-xs sm:text-sm">
              {t("dashboard.expert.tabs.clients")}
            </TabsTrigger>
            <TabsTrigger value="missions" className="text-xs sm:text-sm">
              {t("dashboard.expert.tabs.missions")}
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs sm:text-sm">
              {t("dashboard.expert.tabs.schedule")}
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm">
              {t("dashboard.expert.tabs.messages")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <ExpertClientsTab />
          </TabsContent>
          <TabsContent value="missions">{isNotary ? <NotaryMissionsTab /> : <ExpertMissionsTab />}</TabsContent>
          <TabsContent value="schedule">
            <ExpertScheduleTab />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
