import { Router } from "./router/routes";
import { useAuth } from "./providers/auth-provider";
import { LoadingScreen } from "./components/loading-screen";

export const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Router />;
};
