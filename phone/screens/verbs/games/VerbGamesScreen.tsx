import React from 'react';
import VerbsLayout from '../layouts/VerbsLayout';
import { Card, Text, TouchableRipple } from 'react-native-paper';
import { VerbsStackParamAllList } from '../VerbsStack';
import { globaListVerbsService } from '@/services/ListVerbsService';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ColorsAppType } from '@/theme/colors';
import useVerbScreen from '../../../hooks/useVarsScreenDefault';
import SelectGameQuestion from '../components/SelectGameQuestion';

// Transitions
const PATH_TRASNSITION = 'verbs.games';

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

  // Hooks
  const { colors, isThemeDark, t } = useVerbScreen();

  // State
  const [modalVisible, setModalVisible] = React.useState(false);

  // Close modal
  const handleClose = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  // Style
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // List of games
  const games: {
    action: () => void;
    title: string;
    description: string;
  }[] = React.useMemo(
    () => [
      {
        action: () => setModalVisible(true),
        title: t(`${PATH_TRASNSITION}.game_1.title`),
        description: t(`${PATH_TRASNSITION}.game_1.description`),
      },
      {
        action: () => alert('Proximamente'),
        title: t(`${PATH_TRASNSITION}.game_2.title`),
        description: t(`${PATH_TRASNSITION}.game_2.description`),
      },
    ],
    [t],
  );

  return (
    <VerbsLayout service={globaListVerbsService} t={t}>
      {/* List of games */}
      <ScrollView contentContainerStyle={styles.container}>
        {games.map(({ action, title, description }, index) => (
          <TouchableRipple key={index} onPress={action}>
            <Card style={styles.card} onPress={action}>
              <Card.Title title={title} titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text style={styles.description}>{description}</Text>
              </Card.Content>
            </Card>
          </TouchableRipple>
        ))}
      </ScrollView>

      {/* Modal */}
      <SelectGameQuestion
        colors={colors}
        isThemeDark={isThemeDark}
        translation={{ t, path: PATH_TRASNSITION }}
        visible={modalVisible}
        onClose={handleClose}
        onAccept={(data) =>
          navigation.navigate('QuestionGame', {
            optionsQuestion: data,
          })
        }
      />
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
