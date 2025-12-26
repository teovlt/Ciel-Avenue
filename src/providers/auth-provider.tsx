import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

// Client subtypes
export type ClientSubtype = "acheteur" | "vendeur" | "bailleur" | "locataire" | "renovateur";

// Expert subtypes
export type ExpertSubtype =
  | "notaire"
  | "diagnostiqueur"
  | "marchand"
  | "maitre_oeuvre"
  | "promoteur"
  | "photographe"
  | "courtier"
  | "artisan";

export type UserType = "expert" | "client";

// Document status
export interface DocumentStatus {
  name: string;
  uploaded: boolean;
  verified: boolean;
}

// Expert profile data
export interface ExpertProfile {
  certifications: string[];
  expertise: string[];
  zones: string[];
  yearsExperience: number;
  completedProjects: number;
  company?: string;
  siret?: string;
}

// Client profile data
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

// User role with subtype and documents
export interface UserRole {
  type: UserType;
  subtype: ClientSubtype | ExpertSubtype;
  documents: DocumentStatus[];
  profile: ClientProfile | ExpertProfile;
  createdAt: string;
}

// Complete user interface
export interface User {
  id: string;
  // Personal information (Step 1)
  firstName: string;
  lastName: string;
  preferredName?: string;
  dateOfBirth: string;
  email: string;
  termsAccepted: boolean;

  // Roles (can have multiple)
  roles: UserRole[];
  activeRoleIndex: number;

  // Legacy fields for backward compatibility
  name: string;
  userType: UserType;
  expertProfile?: ExpertProfile;
  clientProfile?: ClientProfile;
}

// Required documents by client subtype
export const clientDocuments: Record<ClientSubtype, string[]> = {
  acheteur: ["Pièce d'identité", "Justificatif de domicile", "Avis d'imposition", "Bulletins de salaire (3 derniers)", "Relevés bancaires"],
  vendeur: ["Pièce d'identité", "Titre de propriété", "Diagnostics immobiliers", "Justificatif de domicile"],
  bailleur: ["Pièce d'identité", "Titre de propriété", "RIB", "Avis d'imposition"],
  locataire: [
    "Pièce d'identité",
    "Justificatif de domicile",
    "Bulletins de salaire (3 derniers)",
    "Avis d'imposition",
    "Contrat de travail",
  ],
  renovateur: ["Pièce d'identité", "Documents du projet", "Devis travaux", "Justificatif de financement"],
};

// Required documents by expert subtype
export const expertDocuments: Record<ExpertSubtype, string[]> = {
  notaire: ["Pièce d'identité", "Carte professionnelle", "Attestation d'inscription à la Chambre des Notaires"],
  diagnostiqueur: ["Pièce d'identité", "Certifications DPE", "Assurance RC Professionnelle"],
  marchand: ["Pièce d'identité", "Carte professionnelle (Carte T)", "Numéro SIRET", "Assurance RC Professionnelle"],
  maitre_oeuvre: ["Pièce d'identité", "Diplômes / Certifications", "Assurance décennale"],
  promoteur: ["Pièce d'identité", "Numéro SIRET", "Garantie financière d'achèvement", "Références de projets"],
  photographe: ["Pièce d'identité", "Portfolio", "Numéro SIRET"],
  courtier: ["Pièce d'identité", "Numéro ORIAS", "Assurance RC Professionnelle"],
  artisan: ["Pièce d'identité", "Numéro SIRET", "Assurance décennale", "Qualifications professionnelles"],
};

// Labels for client subtypes
export const clientSubtypeLabels: Record<ClientSubtype, string> = {
  acheteur: "Acheteur",
  vendeur: "Vendeur",
  bailleur: "Bailleur",
  locataire: "Locataire",
  renovateur: "Rénovateur",
};

// Labels for expert subtypes
export const expertSubtypeLabels: Record<ExpertSubtype, string> = {
  notaire: "Notaire",
  diagnostiqueur: "Diagnostiqueur Immobilier",
  marchand: "Marchands de biens / Agences",
  maitre_oeuvre: "Maître d'oeuvre",
  promoteur: "Promoteur",
  photographe: "Photographe immobilier",
  courtier: "Courtier bancaire",
  artisan: "Artisan second oeuvre",
};

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isExpert: boolean;
  isClient: boolean;
  isLoading: boolean;
  activeRole: UserRole | null;
  setActiveRoleIndex: (index: number) => void;
  addRole: (role: UserRole) => void;
  hasMultipleRoles: boolean;
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

  const setActiveRoleIndex = useCallback(
    (index: number) => {
      if (user && index >= 0 && index < user.roles.length) {
        const updatedUser = { ...user, activeRoleIndex: index };
        // Update legacy fields for backward compatibility
        const activeRole = updatedUser.roles[index];
        updatedUser.userType = activeRole.type;
        if (activeRole.type === "expert") {
          updatedUser.expertProfile = activeRole.profile as ExpertProfile;
        } else {
          updatedUser.clientProfile = activeRole.profile as ClientProfile;
        }
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
    [user],
  );

  const addRole = useCallback(
    (role: UserRole) => {
      if (user) {
        const updatedUser = {
          ...user,
          roles: [...user.roles, role],
          activeRoleIndex: user.roles.length, // Switch to new role
        };
        // Update legacy fields
        updatedUser.userType = role.type;
        if (role.type === "expert") {
          updatedUser.expertProfile = role.profile as ExpertProfile;
        } else {
          updatedUser.clientProfile = role.profile as ClientProfile;
        }
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
    [user],
  );

  const activeRole = user && user.roles.length > 0 ? user.roles[user.activeRoleIndex] : null;
  const isExpert = activeRole?.type === "expert";
  const isClient = activeRole?.type === "client";
  const hasMultipleRoles = user ? user.roles.length > 1 : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isExpert,
        isClient,
        isLoading,
        activeRole,
        setActiveRoleIndex,
        addRole,
        hasMultipleRoles,
      }}
    >
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
