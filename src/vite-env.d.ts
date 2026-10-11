/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV?: string;
  readonly VITE_NODE_ENV?: string;
  readonly VITE_GROQ_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_NODE_ENV__: string;
