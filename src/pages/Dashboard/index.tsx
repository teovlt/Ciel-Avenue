"use client";

import { useAuth } from "@/providers/auth-provider";
import { useTranslation } from "react-i18next";
import { ExpertDashboard } from "./views/ExpertDashboard";
import { SellerDashboard } from "./views/SellerDashboard";
import { BuyerDashboard } from "./views/BuyerDashboard";
import { BailleurDashboard } from "./views/BailleurDashboard";
import { LocataireDashboard } from "./views/LocataireDashboard";
import { RenovateurDashboard } from "./views/RenovateurDashboard";
import { NotaryDashboard } from "./views/NotaryDashboard";
import { NotConnectedView } from "./views/NotConnectedView";

export default function Dashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, user, isLoading, activeRole } = useAuth();

  // Show loading while auth state is being restored
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-primary/20 mx-auto" />
          <p className="text-muted-foreground">{t("common.loading") || "Chargement..."}</p>
        </div>
      </div>
    );
  }

  // Not connected
  if (!isAuthenticated || !user) {
    return <NotConnectedView />;
  }

  // NOTAIRE DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "notaire") {
    return <NotaryDashboard />;
  }

  // GENERIC EXPERT DASHBOARD
  if (activeRole?.type === "expert") {
    return <ExpertDashboard />;
  }

  // VENDEUR DASHBOARD
  if (activeRole?.subtype === "vendeur") {
    return <SellerDashboard />;
  }

  // BAILLEUR DASHBOARD
  if (activeRole?.subtype === "bailleur") {
    return <BailleurDashboard />;
  }

  // LOCATAIRE DASHBOARD
  if (activeRole?.subtype === "locataire") {
    return <LocataireDashboard />;
  }

  // RENOVATEUR DASHBOARD
  if (activeRole?.subtype === "renovateur") {
    return <RenovateurDashboard />;
  }

  // BUYER / STANDARD DASHBOARD
  return <BuyerDashboard />;
}
