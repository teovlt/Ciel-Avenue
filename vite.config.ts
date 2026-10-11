import tailwindcss from "@tailwindcss/vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const targetNodeEnv = (
    env.NODE_ENV ||
    env.node_env ||
    env.VITE_NODE_ENV ||
    env.vite_node_env ||
    process.env.NODE_ENV ||
    process.env.node_env ||
    ""
  ).trim();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "import.meta.env.NODE_ENV": JSON.stringify(targetNodeEnv),
      "import.meta.env.VITE_NODE_ENV": JSON.stringify(targetNodeEnv),
      __APP_NODE_ENV__: JSON.stringify(targetNodeEnv),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

