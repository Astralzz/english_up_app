import React from 'react';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ColorsAppType } from '@/theme/colors';
import { Text } from 'react-native-paper';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GuestTheVerbGameLevelType } from './ScreenGameSelectedLevel';
import {
  GenerateVerbOptionType,
  GenerateVerbQuestionType,
} from '@/services/ListVerbsService';
import { TFunction } from 'i18next';

// Props
interface ScreenGameQuestionProps {
  colors: ColorsAppType;
  isThemeDark: boolean;
  levelSelected: GuestTheVerbGameLevelType;
  actualyRound: number;
  currentQuestion: GenerateVerbQuestionType;
  registerAttempt: (option: GenerateVerbOptionType) => void;
  selectedOption: GenerateVerbOptionType | null;
  isGeneratingQuestion: boolean;
  t: TFunction<'translation', undefined>;
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
  t,
}) => {
  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        {/* Icon */}
        <Icon name='school' size={20} color={colors.text.primary} />
        {/* Text */}
        <Text style={styles.levelText}>
          {t('Level')}: {levelSelected.name} | {t('Round')}: {actualyRound + 1}
        </Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        {/* Icon */}
        <Icon
          name='help-circle-outline'
          size={24}
          color={colors.text.primary}
        />
        {/* Text */}
        <Text style={styles.question}>{currentQuestion.question}</Text>
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
              disabled={isGeneratingQuestion}
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
    },
    levelText: {
      fontSize: 16,
      marginLeft: 8,
      color: colors.text.secondary,
    },
    questionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    question: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 8,
      color: colors.text.primary,
      flexShrink: 1,
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
    },
  });

export default ScreenGameQuestion;
