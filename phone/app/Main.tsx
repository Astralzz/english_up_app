import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// React Navigation
import RouterControl from '../router/RouterControl';

// Theme
import { useThemeApp } from '@/hooks/useThemeApp';
import { useLanguageApp } from '@/hooks/useLanguageApp';
import i18n from '@/i18n';

/**
 *
 * Component Main in the application
 *
 * @return {TSX.Component}
 */
const Main: React.FC = () => {
  // Theme
  const {
    state: { colors },
  } = useThemeApp();

  // Language
  const {
    state: { language },
  } = useLanguageApp();

  // Acción
  React.useEffect(() => {
    i18n.changeLanguage(language || 'en');
  }, [language]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* StatusBar */}
      <StatusBar
        backgroundColor={colors.background.secondary} // Android
        animated
        barStyle='dark-content' // iOS: 'light-content' para texto blanco
        translucent={true}
      />

      {/* Router component */}
      <RouterControl />
    </SafeAreaView>
  );
};

export default Main;
