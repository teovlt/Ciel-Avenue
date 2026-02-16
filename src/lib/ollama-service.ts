// Service pour communiquer avec le LLM (Groq)
// En local: appelle Groq directement depuis le frontend (dev only)
// En production: utilise l'API backend sécurisée

import { CELESTE_SYSTEM_PROMPT } from "./celeste-prompt";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// Configuration Groq
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// Détection automatique du mode
const isProduction = import.meta.env.PROD;

// Clé API Groq pour le développement local (depuis .env.local)
// ATTENTION: En production, la clé est stockée côté serveur uniquement
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Envoyer un message via Groq directement (développement local)
async function sendMessageGroqDirect(userMessage: string, history: Message[]): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("VITE_GROQ_API_KEY n'est pas configurée dans .env.local");
  }

  const messages: Message[] = [{ role: "system", content: CELESTE_SYSTEM_PROMPT }, ...history, { role: "user", content: userMessage }];

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Groq API error:", error);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";
}

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

// Fonction principale - choisit automatiquement le bon backend
export async function sendMessage(userMessage: string, conversationHistory: Message[] = []): Promise<string> {
  try {
    if (isProduction) {
      // En production: utilise l'API backend sécurisée
      console.log("[Chat] Using backend API (production)");
      return await sendMessageAPI(userMessage, conversationHistory);
    } else {
      // En local: appelle Groq directement
      console.log("[Chat] Using Groq API directly (local dev)");
      return await sendMessageGroqDirect(userMessage, conversationHistory);
    }
  } catch (error) {
    console.error("Chat service error:", error);

    if (error instanceof Error && error.message.includes("VITE_GROQ_API_KEY")) {
      return "⚠️ Clé API Groq non configurée. Ajoutez VITE_GROQ_API_KEY dans votre fichier .env.local";
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return "Le service d'assistance n'est pas disponible. Veuillez réessayer plus tard.";
    }

    return "Une erreur s'est produite. Veuillez réessayer.";
  }
}

// Vérifier la disponibilité du service
export async function checkServiceHealth(): Promise<boolean> {
  try {
    if (isProduction) {
      return true;
    }
    // En local, on vérifie juste que la clé API est présente
    return !!GROQ_API_KEY;
  } catch {
    return false;
  }
}
