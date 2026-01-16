"use client";

import { useAuth } from "@/providers/auth-provider";
import { useTranslation } from "react-i18next";
import { ExpertDashboard } from "./roles/ExpertDashboard";
import { SellerDashboard } from "./roles/seller/SellerDashboard";
import { BuyerDashboard } from "./roles/buyer/BuyerDashboard";
import { BailleurDashboard } from "./roles/bailleur/BailleurDashboard";
import { LocataireDashboard } from "./roles/locataire/LocataireDashboard";
import { RenovateurDashboard } from "./roles/renovateur/RenovateurDashboard";
import { NotaryDashboard } from "./roles/notary/NotaryDashboard";
import { DiagnosticianDashboard } from "./roles/diagnostician/DiagnosticianDashboard";
import { MarchandDashboard } from "./roles/marchand/MarchandDashboard";
import { ContractorDashboard } from "./roles/contractor/ContractorDashboard";
import { PromoterDashboard } from "./roles/promoter/PromoterDashboard";
import { PhotographerDashboard } from "./roles/photographer/PhotographerDashboard";
import { BrokerDashboard } from "./roles/broker/BrokerDashboard";
import { NotConnectedView } from "./roles/NotConnectedView";
import { ArtisanDashboard } from "./roles/artisan/ArtisanDashboard";

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
