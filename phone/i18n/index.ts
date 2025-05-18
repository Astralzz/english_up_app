import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Importa tus traducciones
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

// Crea objeto de recursos
const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Verifica que el idioma detectado exista en tus recursos
const availableLanguages = Object.keys(resources);
const language =
  availableLanguages.find((lang) => Localization.locale.startsWith(lang)) ||
  "en";

i18n.use(initReactI18next).init({
  lng: language, // Usa el idioma detectado
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
