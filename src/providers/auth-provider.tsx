import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type UserType = "expert" | "client";

export interface ExpertProfile {
  certifications: string[];
  expertise: string[];
  zones: string[];
  yearsExperience: number;
  completedProjects: number;
}

export interface ClientProfile {
  propertyType: string;
  location: string;
  budget: string;
  rooms: string;
  surface: string;
  maritalStatus: string;
  solvabilityScore?: number;
  borrowingCapacity?: string;
  estimatedRate?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  expertProfile?: ExpertProfile;
  clientProfile?: ClientProfile;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isExpert: boolean;
  isClient: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("journeyCompleted");
  };

  const isExpert = user?.userType === "expert";
  const isClient = user?.userType === "client";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isExpert, isClient, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
