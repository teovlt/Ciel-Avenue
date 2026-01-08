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
import { DiagnosticianDashboard } from "./views/DiagnosticianDashboard";
import { MarchandDashboard } from "./views/MarchandDashboard";
import { ContractorDashboard } from "./views/ContractorDashboard";
import { PromoterDashboard } from "./views/PromoterDashboard";
import { PhotographerDashboard } from "./views/PhotographerDashboard";
import { BrokerDashboard } from "./views/BrokerDashboard";
import { NotConnectedView } from "./views/NotConnectedView";
import { ArtisanDashboard } from "./views/ArtisanDashboard";

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

  // DIAGNOSTICIEN DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "diagnostiqueur") {
    return <DiagnosticianDashboard />;
  }

  // MARCHAND DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "marchand") {
    return <MarchandDashboard />;
  }

  // MAITRE D'OEUVRE DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "maitre_oeuvre") {
    return <ContractorDashboard />;
  }

  // PROMOTEUR DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "promoteur") {
    return <PromoterDashboard />;
  }

  // PHOTOGRAPHE DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "photographe") {
    return <PhotographerDashboard />;
  }

  // ARTISAN DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "artisan") {
    return <ArtisanDashboard />;
  }

  // COURTIER DASHBOARD (Specific Expert Subtype)
  if (activeRole?.subtype === "courtier") {
    return <BrokerDashboard />;
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
