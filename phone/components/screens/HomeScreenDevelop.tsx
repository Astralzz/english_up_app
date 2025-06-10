import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';
import useVarsScreenDefault from '@/hooks/useVarsScreenDefault';
import { ColorsAppType } from '@/theme/colors';
import { Divider, Text } from 'react-native-paper';
import { useThemeApp } from '@/hooks/useThemeApp';
import { useLanguageApp } from '@/hooks/useLanguageApp';

// Translations
const PATH_TRANSLATIONS = 'home_develop';

/**
 * Home screen for development
 *
 * @return {TSX.Element}
 */
const HomeScreenDevelop = () => {
  // Navigation
  const navigation = useTypedNavigation<'Home'>();

  // Theme
  const { colors, isThemeDark, t } = useVarsScreenDefault();

  // Hooks
  const { toggleTheme } = useThemeApp();
  const {
    updateLanguageApp,
    state: { language },
  } = useLanguageApp();

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // List of features
  const featureList = React.useMemo(
    () => [
      {
        label: t(`${PATH_TRANSLATIONS}.features.theme.title`),
        description: t(`${PATH_TRANSLATIONS}.features.theme.description`),
        onPress: toggleTheme,
      },
      {
        label: t(`${PATH_TRANSLATIONS}.features.language.title`),
        description: t(`${PATH_TRANSLATIONS}.features.language.description`),
        onPress: () => updateLanguageApp(language === 'en' ? 'es' : 'en'),
      },
      {
        label: t(`${PATH_TRANSLATIONS}.features.verbs_section.title`),
        description: t(
          `${PATH_TRANSLATIONS}.features.verbs_section.description`,
        ),
        onPress: () => navigation.navigate('Verbs'),
      },
      {
        label: t(`${PATH_TRANSLATIONS}.features.verbs_game.title`),
        description: t(`${PATH_TRANSLATIONS}.features.verbs_game.description`),
        onPress: () => navigation.navigate('Verbs'),
      },
    ],
    [navigation, toggleTheme, updateLanguageApp, language, t],
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant='titleLarge' style={styles.title}>
            {t(`${PATH_TRANSLATIONS}.title`)}
          </Text>
          <Text variant='bodyMedium' style={styles.subtitle}>
            {t(`${PATH_TRANSLATIONS}.subtitle`)}
          </Text>
          <Text variant='bodyMedium' style={styles.description}>
            {t(`${PATH_TRANSLATIONS}.description`)}
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Section Title */}
        <Text variant='titleMedium' style={styles.sectionTitle}>
          {t(`${PATH_TRANSLATIONS}.features_title`)}
        </Text>

        {/* Feature Cards */}
        <View style={styles.featureList}>
          {featureList.map(({ label, description, onPress }, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={onPress}>
              <Text style={styles.featureText}>{label}</Text>
              <Text style={styles.featureDescription}>{description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

/**
 * Get styles for HomeScreenDevelop
 *
 * @param {ColorsAppType} colors
 * @param {boolean} isThemeDark
 * @return {StyleSheet.NamedStyles<any>}
 */
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      gap: 24,
    },
    header: {
      gap: 10,
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      color: colors.primary[isThemeDark ? 400 : 900],
    },
    subtitle: {
      textAlign: 'center',
      color: colors.text.primary,
      fontWeight: 'semibold',
    },
    description: {
      textAlign: 'center',
      color: colors.text.tertiary,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.primary[isThemeDark ? 400 : 800],
    },
    divider: {
      height: 1,
      marginVertical: 4,
      backgroundColor: colors.primary[isThemeDark ? 400 : 500],
    },
    featureList: {
      gap: 16,
    },
    card: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      borderRadius: 16,
      shadowColor: colors.primary[isThemeDark ? 300 : 100],
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.primary[isThemeDark ? 300 : 100],
    },
    featureText: {
      flex: 1,
      fontSize: 15,
      color: colors.text.primary,
    },
    featureDescription: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
  });

export default HomeScreenDevelop;
