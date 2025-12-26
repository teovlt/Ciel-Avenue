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

// Common documents for ALL experts
export const commonExpertDocuments: string[] = [
  "Extrait K-BIS (ou attestation INSEE) de moins de 3 mois",
  "Pièce d'identité du représentant légal",
  "Justificatif de pouvoir si le signataire ≠ représentant légal",
  "RIB professionnel",
  "Justificatif d'adresse du siège social (facture, bail, attestation)",
];

// Specific documents by expert subtype (in addition to common documents)
export const expertSpecificDocuments: Record<ExpertSubtype, string[]> = {
  notaire: [
    "Carte professionnelle",
    "Attestation d'inscription à la Chambre des Notaires",
    "Copie de l'assurance RC professionnelle obligatoire du notaire",
    "Numéro et nom de la compagnie d'assurance",
    "RCS / SIRET de l'étude notariale",
    "Adresse professionnelle de l'étude",
  ],
  diagnostiqueur: [
    "Attestation RC Pro et/ou décennale valide couvrant les diagnostics",
    "Nom de la compagnie d'assurance",
    "Liste des certifications (DPE, termites, amiante, etc.)",
  ],
  marchand: [
    "Carte professionnelle (Carte T)",
    "Attestation RC Pro valide",
    "Objet social conforme à l'activité (achat/revente/promotion immobilière)",
    "Description des activités immobilières pratiquées",
  ],
  maitre_oeuvre: [
    "Assurance RC Pro / décennale spécifique à la maîtrise d'œuvre",
    "Coordonnées de l'assureur",
    "Justificatif de qualifications techniques (si requis)",
  ],
  promoteur: [
    "Attestation RC Pro couvrant l'activité de promotion / construction",
    "Objet social conforme (promotion / construction immobilière)",
    "Description du ou des programmes immobiliers en cours ou prévus",
  ],
  photographe: [
    "Autorisation d'exploitation de drones (si utilisation de drone)",
    "Assurance Responsabilité Civile Professionnelle (RC Pro)",
    "Certificats ou diplômes (optionnels)",
  ],
  courtier: [
    "Attestation RC Pro spécifique au courtage en financement / crédit immobilier",
    "N° ORIAS (obligatoire pour les intermédiaires financiers)",
    "Nom de la compagnie d'assurance",
    "Conformité avec la réglementation ACPR / ORIAS",
  ],
  artisan: ["Assurance décennale", "Spécialité métier (à sélectionner)", "Qualifications professionnelles spécifiques au métier"],
};

// Artisan specialties list
export const artisanSpecialties: string[] = [
  "Plombier / Chauffagiste",
  "Électricien",
  "Plâtrier / Plaquiste",
  "Cuisiniste / Agenceur",
  "Serrurier / Métallier",
  "Parqueteur",
  "Domoticien",
  "Décorateur / Architecte d'intérieur",
  "Menuisier",
  "Peintre / Solier",
  "Vitrier / Miroitier",
  "Climaticien / Frigoriste",
  "Staffeur / Stucateur",
  "Étancheur d'intérieur",
];

// Required documents by expert subtype (common + specific)
export const expertDocuments: Record<ExpertSubtype, string[]> = {
  notaire: [...commonExpertDocuments, ...expertSpecificDocuments.notaire],
  diagnostiqueur: [...commonExpertDocuments, ...expertSpecificDocuments.diagnostiqueur],
  marchand: [...commonExpertDocuments, ...expertSpecificDocuments.marchand],
  maitre_oeuvre: [...commonExpertDocuments, ...expertSpecificDocuments.maitre_oeuvre],
  promoteur: [...commonExpertDocuments, ...expertSpecificDocuments.promoteur],
  photographe: [...commonExpertDocuments, ...expertSpecificDocuments.photographe],
  courtier: [...commonExpertDocuments, ...expertSpecificDocuments.courtier],
  artisan: [...commonExpertDocuments, ...expertSpecificDocuments.artisan],
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
  loginDemo: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isExpert: boolean;
  isClient: boolean;
  isLoading: boolean;
  activeRole: UserRole | null;
  setActiveRoleIndex: (index: number) => void;
  addRole: (role: UserRole) => void;
  hasMultipleRoles: boolean;
  getAllRoleLabels: () => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user with multiple roles
function createDemoUser(): User {
  const now = new Date().toISOString();

  const expertRole: UserRole = {
    type: "expert",
    subtype: "diagnostiqueur",
    documents: [
      { name: "Extrait K-BIS (ou attestation INSEE) de moins de 3 mois", uploaded: true, verified: true },
      { name: "Pièce d'identité du représentant légal", uploaded: true, verified: true },
      { name: "Justificatif de pouvoir si le signataire ≠ représentant légal", uploaded: false, verified: false },
      { name: "RIB professionnel", uploaded: true, verified: true },
      { name: "Justificatif d'adresse du siège social (facture, bail, attestation)", uploaded: true, verified: false },
      { name: "Attestation RC Pro et/ou décennale valide couvrant les diagnostics", uploaded: true, verified: true },
      { name: "Nom de la compagnie d'assurance", uploaded: true, verified: true },
      { name: "Liste des certifications (DPE, termites, amiante, etc.)", uploaded: true, verified: false },
    ],
    profile: {
      certifications: ["DPE", "Amiante", "Plomb", "Termites"],
      expertise: ["residential", "commercial"],
      zones: ["paris", "lyon"],
      yearsExperience: 8,
      completedProjects: 156,
      company: "DiagImmo Pro",
      siret: "123 456 789 00012",
    } as ExpertProfile,
    createdAt: now,
  };

  const locataireRole: UserRole = {
    type: "client",
    subtype: "locataire",
    documents: [
      { name: "Pièce d'identité", uploaded: true, verified: true },
      { name: "Justificatif de domicile", uploaded: true, verified: true },
      { name: "Bulletins de salaire (3 derniers)", uploaded: true, verified: false },
      { name: "Avis d'imposition", uploaded: false, verified: false },
      { name: "Contrat de travail", uploaded: true, verified: true },
    ],
    profile: {
      propertyType: "Appartement T3",
      location: "Lyon 6ème",
      budget: "1 200 €/mois",
      rooms: "3",
      surface: "65",
      maritalStatus: "Célibataire",
      solvabilityScore: 7.8,
      borrowingCapacity: "N/A",
      estimatedRate: "N/A",
    } as ClientProfile,
    createdAt: now,
  };

  const renovateurRole: UserRole = {
    type: "client",
    subtype: "renovateur",
    documents: [
      { name: "Pièce d'identité", uploaded: true, verified: true },
      { name: "Documents du projet", uploaded: true, verified: false },
      { name: "Devis travaux", uploaded: false, verified: false },
      { name: "Justificatif de financement", uploaded: false, verified: false },
    ],
    profile: {
      propertyType: "Maison ancienne",
      location: "Villeurbanne",
      budget: "80 000 € travaux",
      rooms: "5",
      surface: "120",
      maritalStatus: "Célibataire",
      solvabilityScore: 8.2,
      borrowingCapacity: "120 000 €",
      estimatedRate: "3.5%",
    } as ClientProfile,
    createdAt: now,
  };

  return {
    id: "demo-user-123",
    firstName: "Sophie",
    lastName: "Martin",
    preferredName: "Sophie",
    dateOfBirth: "1988-05-15",
    email: "sophie.martin@demo.fr",
    termsAccepted: true,
    roles: [expertRole, locataireRole, renovateurRole],
    activeRoleIndex: 0,
    name: "Sophie Martin",
    userType: "expert",
    expertProfile: expertRole.profile as ExpertProfile,
  };
}

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

  const loginDemo = () => {
    const demoUser = createDemoUser();
    setUser(demoUser);
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("journeyCompleted", "true");
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

  const getAllRoleLabels = useCallback(() => {
    if (!user) return [];
    return user.roles.map((role) => {
      if (role.type === "client") {
        return clientSubtypeLabels[role.subtype as ClientSubtype];
      }
      return expertSubtypeLabels[role.subtype as ExpertSubtype];
    });
  }, [user]);

  const activeRole = user && user.roles.length > 0 ? user.roles[user.activeRoleIndex] : null;
  const isExpert = activeRole?.type === "expert";
  const isClient = activeRole?.type === "client";
  const hasMultipleRoles = user ? user.roles.length > 1 : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginDemo,
        logout,
        isAuthenticated: !!user,
        isExpert,
        isClient,
        isLoading,
        activeRole,
        setActiveRoleIndex,
        addRole,
        hasMultipleRoles,
        getAllRoleLabels,
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
