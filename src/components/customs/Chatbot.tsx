import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, User, Trash2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendMessage, checkServiceHealth, type Message } from "@/lib/ollama-service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

const STORAGE_KEY = "ciel-avenue-chat-history";
const VOICE_ENABLED_KEY = "ciel-avenue-voice-enabled";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Load messages from localStorage
function loadMessages(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load chat history:", e);
  }
  return [];
}

// Save messages to localStorage
function saveMessages(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save chat history:", e);
  }
}

// Céleste avatar path
const CELESTE_AVATAR = "/images/celeste-avatar.png";

// Text-to-Speech Service for Céleste
class CelesteVoice {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private isReady = false;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
  }

  private initVoice() {
    // Try to get a French female voice
    const loadVoices = () => {
      const voices = this.synth.getVoices();

      // Priority order for French female voices
      const preferredVoices = [
        "Microsoft Denise", // Windows French
        "Amélie", // macOS French
        "Thomas", // Alternative French
        "Google français", // Chrome
      ];

      // First try to find a French female voice
      this.voice = voices.find((v) => v.lang.startsWith("fr") && v.name.toLowerCase().includes("female")) || null;

      // If not found, try preferred voices
      if (!this.voice) {
        for (const preferred of preferredVoices) {
          this.voice =
            voices.find((v) => v.name.includes(preferred) || (v.lang.startsWith("fr") && v.name.toLowerCase().includes("denise"))) || null;
          if (this.voice) break;
        }
      }

      // Fallback to any French voice
      if (!this.voice) {
        this.voice = voices.find((v) => v.lang.startsWith("fr")) || null;
      }

      this.isReady = true;
      console.log("[Céleste Voice] Initialized with voice:", this.voice?.name || "default");
    };

    // Voices might not be loaded immediately
    if (this.synth.getVoices().length > 0) {
      loadVoices();
    } else {
      this.synth.addEventListener("voiceschanged", loadVoices);
    }
  }

  speak(text: string): void {
    if (!this.synth || !this.isReady) {
      console.warn("[Céleste Voice] Not ready yet");
      return;
    }

    // Cancel any current speech
    this.synth.cancel();

    // Clean text from emojis and special characters for better pronunciation
    const cleanText = text
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, "") // Remove emojis
      .replace(/[→←↑↓]/g, "") // Remove arrows
      .replace(/\*\*/g, "") // Remove markdown bold
      .replace(/`/g, "") // Remove code backticks
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (this.voice) {
      utterance.voice = this.voice;
    }

    // Customize voice parameters for a warm, professional female tone
    utterance.lang = "fr-FR";
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher for feminine voice
    utterance.volume = 1.0;

    this.synth.speak(utterance);
  }

  stop(): void {
    this.synth?.cancel();
  }

  get isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }
}

// Singleton instance
let celesteVoice: CelesteVoice | null = null;

function getCelesteVoice(): CelesteVoice {
  if (!celesteVoice && typeof window !== "undefined" && "speechSynthesis" in window) {
    celesteVoice = new CelesteVoice();
  }
  return celesteVoice!;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages());
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(VOICE_ENABLED_KEY) !== "false";
    }
    return true;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check Ollama availability on mount
  useEffect(() => {
    checkServiceHealth().then(setIsAvailable);
  }, []);

  // Save voice preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(VOICE_ENABLED_KEY, String(voiceEnabled));
    }
  }, [voiceEnabled]);

  // Update speaking state
  useEffect(() => {
    const interval = setInterval(() => {
      if (celesteVoice) {
        setIsSpeaking(celesteVoice.isSpeaking);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeContent =
        "Bonjour et bienvenue ! Je suis Céleste, votre conseillère CIEL AVENUE. Je suis là pour vous accompagner dans votre projet immobilier. Comment puis-je vous aider aujourd'hui ?";
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: welcomeContent,
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);

      // Speak welcome message if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => {
          getCelesteVoice()?.speak(welcomeContent);
        }, 500);
      }
    }
  }, [isOpen, messages.length, voiceEnabled]);

  // Clear chat history
  const clearHistory = useCallback(() => {
    getCelesteVoice()?.stop();
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
  }, []);

  // Toggle voice
  const toggleVoice = useCallback(() => {
    if (voiceEnabled) {
      getCelesteVoice()?.stop();
    }
    setVoiceEnabled(!voiceEnabled);
  }, [voiceEnabled]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Convert to Message format for API
      const history: Message[] = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await sendMessage(userMessage.content, history);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the response if voice is enabled
      if (voiceEnabled) {
        getCelesteVoice()?.speak(response);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-accent px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/30">
                <img src={CELESTE_AVATAR} alt="Céleste" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold">Céleste</h3>
                <p className="text-xs text-white/80">
                  {isAvailable ? (isSpeaking ? "Je parle..." : "Conseillère CIEL AVENUE") : "Hors ligne"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Voice toggle button */}
              <button
                onClick={toggleVoice}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  voiceEnabled ? "bg-white/20 hover:bg-white/30" : "bg-white/10 hover:bg-white/20"
                }`}
                title={voiceEnabled ? "Désactiver la voix" : "Activer la voix"}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              {messages.length > 1 && (
                <button
                  onClick={clearHistory}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title="Effacer l'historique"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {message.role === "user" ? (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden border border-border">
                    <img src={CELESTE_AVATAR} alt="Céleste" className="h-full w-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div className="text-sm space-y-3 prose-p:leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <Link
                              to={props.href || "#"}
                              className="text-primary underline font-medium hover:text-primary/80 transition-colors"
                              {...props}
                            >
                              {props.children}
                            </Link>
                          ),
                          p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                          li: ({ node, ...props }) => <li className="marker:text-primary/70" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden border border-border">
                  <img src={CELESTE_AVATAR} alt="Céleste" className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Céleste réfléchit...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                disabled={isLoading || !isAvailable}
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading || !isAvailable}
                className="flex h-10 w-10 items-center justify-center rounded-full p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
