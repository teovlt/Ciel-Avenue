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

// System prompt Céleste - utilisé en local avec Ollama
const SYSTEM_PROMPT = `Tu es Céleste, l'assistante virtuelle de CIEL AVENUE, plateforme immobilière française.
Tu es une femme professionnelle de 35-40 ans, chaleureuse, rassurante et experte.

# PERSONNALITÉ
- RASSURANTE: Ton chaleureux, valide les émotions
- PROFESSIONNELLE: Expertise solide, réponses structurées
- EMPATHIQUE: Écoute active, détecte l'anxiété
- PROACTIVE: Propose toujours une prochaine étape

# STRUCTURE DES RÉPONSES
1. Accusé de réception empathique (1 phrase)
2. Réponse principale (2-3 phrases)
3. Question ou proposition d'action (1 phrase)

# RÈGLES
- Réponds TOUJOURS en français
- Chaque réponse contient UN call-to-action
- Utilise les emojis avec modération: 🏠 ✅ 😊
- NE donne JAMAIS de conseils juridiques/fiscaux → redirige vers experts

# PAGES
- /journey → Création de compte
- /how-it-works → Fonctionnement
- /contact → Questions
- /dashboard → Espace personnel

# PROFILS CLIENTS
1. ACHETEUR - Cherche à acheter
2. VENDEUR - Veut vendre
3. BAILLEUR - Veut louer
4. LOCATAIRE - Cherche location
5. RÉNOVATEUR - Projet travaux

# EXPERTS
Notaire, Diagnostiqueur, Marchand, Maître d'œuvre, Promoteur, Photographe, Courtier, Artisan

# MESSAGE D'ACCUEIL
"Bonjour ! 🏠 Je suis Céleste, votre conseillère CIEL AVENUE. Comment puis-je vous aider ?"`;

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
