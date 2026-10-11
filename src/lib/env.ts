/**
 * Environment helpers for CIEL AVENUE
 * Determines if the application runs in production (maintenance mode) or development.
 */

export const getNodeEnv = (): string => {
  const metaEnv = import.meta.env as Record<string, any>;
  const envVal =
    metaEnv.NODE_ENV ||
    metaEnv.node_env ||
    metaEnv.VITE_NODE_ENV ||
    metaEnv.vite_node_env ||
    (typeof __APP_NODE_ENV__ !== "undefined" ? __APP_NODE_ENV__ : "");

  return (envVal || "").toString().trim();
};

/**
 * Returns true if NODE_ENV is "prod" or "production" (case-insensitive).
 */
export const isProductionEnv = (): boolean => {
  const val = getNodeEnv().toLowerCase();
  return val === "prod" || val === "production";
};

/**
 * Returns true if not in production.
 */
export const isDevelopmentEnv = (): boolean => {
  return !isProductionEnv();
};
