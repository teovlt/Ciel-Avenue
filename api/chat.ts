import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CELESTE_SYSTEM_PROMPT } from "./celeste-prompt";

// API Endpoint pour le chatbot - Sécurise la clé Groq côté serveur
// La clé GROQ_API_KEY est stockée dans les variables d'environnement Vercel (pas exposée au frontend)

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const GROQ_MODEL = "llama-3.3-70b-versatile";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: Message[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not configured");
    return res.status(500).json({ error: "Chat service not configured" });
  }

  try {
    const { message, history = [] } = req.body as ChatRequest;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages: Message[] = [{ role: "system", content: CELESTE_SYSTEM_PROMPT }, ...history, { role: "user", content: message }];

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
      return res.status(500).json({ error: "Failed to get response from AI" });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";

    return res.status(200).json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
