import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait for auth to be loaded from localStorage before deciding to redirect
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-primary/20 mx-auto" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
