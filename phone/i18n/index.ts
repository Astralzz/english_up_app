import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Importa tus traducciones
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

// Crea objeto de recursos
const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Función para obtener el idioma preferido del dispositivo
const getDeviceLanguage = () => {
  try {
    // 1. Obtener locales usando la nueva API
    const locales = Localization.getLocales();

    // 2. Si no hay locales, usar inglés como fallback
    if (locales.length === 0) return 'en';

    // 3. Obtener el primer locale (el preferido)
    const primaryLocale = locales[0];

    // 4. Extraer el código de idioma base (ej: 'en' de 'en-US')
    const languageCode = primaryLocale.languageCode || 'en';

    // 5. Verificar si tenemos recursos para este idioma
    return Object.keys(resources).includes(languageCode) ? languageCode : 'en';
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en';
  }
};

// Inicializar i18n
i18n.use(initReactI18next).init({
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
