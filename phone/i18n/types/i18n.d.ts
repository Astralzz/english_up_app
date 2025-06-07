import 'i18next';

// Modulo
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof import('../i18n/locales/es/translation.json') &
        typeof import('../i18n/locales/en/translation.json');
    };
  }
}
