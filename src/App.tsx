import { Router } from "./router/routes";
import { useAuth } from "./providers/auth-provider";
import { LoadingScreen } from "./components/loading-screen";
import { MaintenancePage } from "./pages/Maintenance";
import { isProductionEnv } from "./lib/env";

export const App = () => {
  // If NODE_ENV is "prod" or "production", only the maintenance page is accessible
  if (isProductionEnv()) {
    return <MaintenancePage />;
  }

  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Router />;
};

