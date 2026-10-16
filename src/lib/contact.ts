/**
 * Contact destinations used by the homepage CTAs.
 *
 * No sign-up endpoint exists yet: the pilot CTAs open the visitor's mail client
 * with a prefilled subject. Replace `pilotMailto` with a real form/endpoint once
 * one is defined (and update the FAQ / privacy wording accordingly).
 */

export const CONTACT_EMAIL = "contact@ciel-avenue.fr";

export const LINKEDIN_URL = "https://fr.linkedin.com/company/ciel-avenue";

export type PilotAudience = "general" | "individual" | "professional" | "investor" | "exchange";

const subjects: Record<PilotAudience, string> = {
  general: "Être informé du pilote CIEL AVENUE",
  individual: "Pilote CIEL AVENUE – particulier",
  professional: "Pilote CIEL AVENUE – professionnel de l'immobilier",
  investor: "CIEL AVENUE – intérêt pour la prochaine étape",
  exchange: "Échanger avec l'équipe CIEL AVENUE",
};

export const pilotMailto = (audience: PilotAudience = "general") =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjects[audience])}`;
