import React, { useState } from 'react';
import VerbsLayout from '../layouts/VerbsLayout';
import { Card, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { VerbsStackParamAllList } from '../VerbsStack';
import { globaListVerbsService } from '@/services/ListVerbsService';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeApp } from '@/hooks/useThemeApp';

/**
 *
 * Verbs screen in the app
 *
 * @return {TSX.Component}
 */
const VerbGamesScreen: React.FC = () => {
  // Navigation
  const {
    params: { title },
  } = useRoute<RouteProp<VerbsStackParamAllList, 'VerbGames'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<VerbsStackParamAllList>>();

  // Theme
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  return (
    <VerbsLayout options={{ title }} service={globaListVerbsService}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Selecciona un juego</Text>

        <Card
          style={styles.card}
          onPress={() =>
            navigation.navigate('GuessTheMeaningOfTheVerbGame', {
              colors,
              isThemeDark,
            })
          }
        >
          <Card.Title title="Adivina el significado" />
          <Card.Content>
            <Text style={styles.description}>
              Te mostraremos un verbo en inglés. Elige su significado correcto
              en español.
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.card}
          onPress={() =>
            navigation.navigate('GuessTheMeaningOfTheVerbGame', {
              colors,
              isThemeDark,
            })
          }
        >
          <Card.Title title="Memorama de verbos" />
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  card: {
    elevation: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
});

export default VerbGamesScreen;
