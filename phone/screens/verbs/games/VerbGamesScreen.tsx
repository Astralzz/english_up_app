import React from 'react';
import VerbsLayout from '../layouts/VerbsLayout';
import { Card, Text } from 'react-native-paper';
import { VerbsStackParamAllList } from '../VerbsStack';
import { globaListVerbsService } from '@/services/ListVerbsService';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeApp } from '@/hooks/useThemeApp';
import { ColorsAppType } from '@/theme/colors';
import { useTranslation } from 'react-i18next';

/**
 *
 * Verbs screen in the app
 *
 * @return {TSX.Component}
 */
const VerbGamesScreen: React.FC = () => {
  // Navigation
  const navigation =
    useNavigation<NativeStackNavigationProp<VerbsStackParamAllList>>();

  // Theme
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // Style
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // Translation
  const { t } = useTranslation();

  return (
    <VerbsLayout routeName='VerbGames' service={globaListVerbsService}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card
          style={styles.card}
          onPress={() => navigation.navigate('GuessTheMeaningOfTheVerbGame')}
        >
          <Card.Title
            title='Adivina el significado'
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.description}>
              Te mostraremos un verbo en inglés. Elige su significado correcto
              en español.
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.card}
          onPress={() => navigation.navigate('GuessTheMeaningOfTheVerbGame')}
        >
          <Card.Title
            title='Memorama de verbos'
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.description}>
              Encuentra los pares de verbos relacionando su forma y significado.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </VerbsLayout>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) =>
  StyleSheet.create({
    container: {
      padding: 26,
      gap: 20,
    },
    card: {
      elevation: 2,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.primary[isThemeDark ? 800 : 200],
    },
    cardTitle: {
      color: colors.text.primary,
      fontWeight: 'bold',
      fontSize: 18,
    },
    description: {
      fontSize: 14,
      color: colors.text.primary,
    },
  });

export default VerbGamesScreen;
