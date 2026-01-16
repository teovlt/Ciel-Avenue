// Service pour communiquer avec le LLM (via backend sécurisé ou Ollama local)

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// Configuration Ollama pour le développement local
const OLLAMA_BASE_URL = "http://127.0.0.1:11434";
const OLLAMA_MODEL = "llama3.2:1b";

// Détection automatique du mode
const isProduction = import.meta.env.PROD;

// System prompt - utilisé uniquement en local (le backend a son propre prompt)
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de CIEL AVENUE, une plateforme immobilière française innovante.
Tu connais parfaitement l'application et tu peux guider les utilisateurs dans leur navigation et la création de compte.

## PAGES DE L'APPLICATION

### Page d'accueil (/)
- Slogan: "L'immobilier réinventé pour vous"
- Description: CIEL AVENUE révolutionne la gestion immobilière avec une plateforme qui connecte acheteurs, vendeurs, promoteurs et experts
- Boutons: "Découvrir le parcours" → /journey, "Comment ça marche" → /how-it-works

### Comment ça marche (/how-it-works)
Explique le processus en 4 étapes:
1. Créez votre profil (Acheteur, Vendeur, Locataire, Expert)
2. Déposez vos documents (vérifiés par nos experts)
3. Profil vérifié avec score de solvabilité
4. Mise en relation avec experts/clients qualifiés

### Parcours client (/journey)
Page de création de compte en 3 étapes:
- Étape 1: Informations personnelles (prénom, nom, date naissance, email, CGU)
- Étape 2: Choix du type (Client ou Expert)
- Étape 3: Choix du sous-type et documents

### Dashboard (/dashboard)
Espace personnel après connexion - tableau de bord avec les informations du profil

### Contact (/contact)
Formulaire de contact pour questions

### À propos (/about)
Présente la mission et l'équipe CIEL AVENUE

## TYPES DE PROFILS

### CLIENTS (5 types):
1. **Acheteur** - Cherche un bien à acheter
   - Documents: Pièce d'identité, Justificatif de domicile, Avis d'imposition, Bulletins de salaire, Relevés bancaires

2. **Vendeur** - Souhaite vendre son bien
   - Documents: Pièce d'identité, Titre de propriété, Diagnostics immobiliers, Justificatif de domicile

3. **Bailleur** - Propriétaire souhaitant louer
   - Documents: Pièce d'identité, Titre de propriété, RIB, Avis d'imposition

4. **Locataire** - Cherche un logement en location
   - Documents: Pièce d'identité, Justificatif de domicile, Bulletins de salaire, Avis d'imposition, Contrat de travail

5. **Rénovateur** - Projet de rénovation
   - Documents: Pièce d'identité, Documents du projet, Devis travaux, Justificatif de financement

### EXPERTS (8 types):
Notaire, Diagnostiqueur, Marchand de biens, Maître d'œuvre, Promoteur, Photographe, Courtier, Artisan

## INSTRUCTIONS
- Réponds TOUJOURS en français
- Sois concis et utile
- Propose des liens vers les pages pertinentes
- Aide l'utilisateur à choisir le bon profil selon son projet`;

// Envoyer un message via l'API backend sécurisée (production)
async function sendMessageAPI(userMessage: string, history: Message[]): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage,
      history: history.filter((m) => m.role !== "system"),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content || "Désolé, je n'ai pas pu générer une réponse.";
}

// Envoyer un message via Ollama (développement local)
async function sendMessageOllama(messages: Message[]): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 512,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = await response.json();
  return data.message?.content || "Désolé, je n'ai pas pu générer une réponse.";
}

// Fonction principale - choisit automatiquement le bon backend
export async function sendMessage(userMessage: string, conversationHistory: Message[] = []): Promise<string> {
  try {
    if (isProduction) {
      // En production: utilise l'API backend sécurisée
      console.log("[Chat] Using backend API (production)");
      return await sendMessageAPI(userMessage, conversationHistory);
    } else {
      // En local: utilise Ollama
      console.log("[Chat] Using Ollama (local)");
      const messages: Message[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: "user", content: userMessage },
      ];
      return await sendMessageOllama(messages);
    }
  } catch (error) {
    console.error("Chat service error:", error);

    // Messages d'erreur spécifiques
    if (error instanceof TypeError && error.message.includes("fetch")) {
      if (isProduction) {
        return "Le service d'assistance n'est pas disponible. Veuillez réessayer plus tard.";
      }
      return "Le service d'assistance n'est pas disponible. Assurez-vous qu'Ollama est en cours d'exécution (ollama serve).";
    }

    return "Une erreur s'est produite. Veuillez réessayer.";
  }
}

// Vérifier la disponibilité du service
export async function checkOllamaHealth(): Promise<boolean> {
  try {
    if (isProduction) {
      // En production, on suppose que l'API est disponible
      return true;
    }
    // Pour Ollama local, on fait un ping
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    return response.ok;
  } catch {
    return false;
  }
}
