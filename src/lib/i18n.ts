import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "../locales/en.json";
import * as fr from "../locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  // French by default; English only when the visitor picked it in the language menu
  lng: localStorage.getItem("i18nextLng") || "fr",
  fallbackLng: "fr",
});

export const listOfLocales = ["en", "fr"];

const localeNames: { [key: string]: string } = {
  en: "English",
  fr: "Français",
  // ...
};

export const getFullNamesOfLocales = (locale: string) => {
  return localeNames[locale] || "";
};

// Keep <html lang> in sync with the active language (screen readers, hyphenation)
document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});
