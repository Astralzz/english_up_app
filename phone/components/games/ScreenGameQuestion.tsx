import React from 'react';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ColorsAppType } from '@/theme/colors';
import { Text } from 'react-native-paper';
import { View, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { GuestTheVerbGameLevelType } from './ScreenGameSelectedLevel';
import {
  GameGenerateOptionType,
  GameGenerateQuestionType,
} from '@/types/games';
import { TFunction } from 'i18next';

// Props
interface ScreenGameQuestionProps {
  colors: ColorsAppType;
  isThemeDark: boolean;
  levelSelected: GuestTheVerbGameLevelType;
  actualyRound: number;
  currentQuestion: GameGenerateQuestionType;
  registerAttempt: (option: GameGenerateOptionType) => void;
  selectedOption: GameGenerateOptionType | null;
  isGeneratingQuestion: boolean;
  translation: {
    t: TFunction<'translation', undefined>;
    path: string;
  };
}

/**
 *
 * Screen game question
 *
 * @param {ScreenGameQuestionProps} props
 * @return {TSX.Component}
 */
const ScreenGameQuestion: React.FC<ScreenGameQuestionProps> = ({
  colors,
  isThemeDark,
  levelSelected,
  actualyRound,
  currentQuestion,
  registerAttempt,
  selectedOption,
  isGeneratingQuestion,
  translation: { t, path },
}) => {
  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // 🔒 Bloquear botón de atrás
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        {/* Icon */}
        <Icon name='school' size={20} color={colors.text.primary} />
        {/* Text */}
        <Text style={styles.levelText}>
          {t(`${path}.level`)}: {t(`${path}.${levelSelected.key}`)} |{' '}
          {t(`${path}.round`)}: {actualyRound + 1}
        </Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        {/* Icon */}
        {false && (
          <Icon
            name='help-circle-outline'
            size={24}
            color={colors.text.primary}
          />
        )}
        {/* Text */}
        <Text style={styles.question} numberOfLines={4} ellipsizeMode='tail'>
          {currentQuestion.question}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => {
          // ? Selected option
          const optionColor = selectedOption
            ? option.isCorrect
              ? colors.alert.success // pintar verde la correcta siempre
              : selectedOption.number === option.number
                ? colors.alert.error // rojo solo si es la opción seleccionada y es incorrecta
                : null
            : null;

          return (
            <TouchableOpacity
              key={option.number}
              onPress={() => registerAttempt(option)}
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    optionColor || colors.primary[isThemeDark ? 600 : 400],
                },
              ]}
              disabled={isGeneratingQuestion || selectedOption !== null}
            >
              {/* Icon */}
              <Icon
                name='checkbox-blank-circle-outline'
                size={20}
                color={colors.text.primary}
                style={{ marginRight: 8 }}
              />
              {/* Text */}
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    levelText: {
      fontSize: 16,
      marginLeft: 8,
      color: colors.text.secondary,
      flexShrink: 1,
    },
    questionContainer: {
      marginVertical: 16,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    question: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text.primary,
      textAlign: 'center',
      flexWrap: 'wrap',
    },
    optionsContainer: {
      marginTop: 10,
      paddingHorizontal: 16,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    optionText: {
      color: colors.text.primary,
      fontSize: 16,
      flexShrink: 1,
      flexWrap: 'wrap',
      textAlign: 'left',
    },
  });

export default ScreenGameQuestion;
