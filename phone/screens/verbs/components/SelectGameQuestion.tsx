import React, { useState } from 'react';
import { ColorsAppType } from '@/theme/colors';
import ModalDefault from '@/components/modals/ModalDefault';
import { TFunction } from 'i18next';
import { Button, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { GameQuestionVerbType, ValidKeysTypeVerb } from '@/types/games';

// Props
interface SelectGameQuestionProps {
  visible: boolean;
  onClose: () => void;
  colors: ColorsAppType;
  isThemeDark: boolean;
  onAccept: (data: GameQuestionVerbType) => void;
  translation: {
    t: TFunction<'translation', undefined>;
    path: string;
  };
}

/**
 * Componente que muestra una lista de verbos.
 *
 * @param {Object} props - Props del componente.
 * @param {ColorsAppType} props.colors - Colores de la aplicación.
 * @returns {TSX.Element} Componente SelectGameQuestion.
 */
const SelectGameQuestion: React.FC<SelectGameQuestionProps> = ({
  visible,
  onClose,
  colors,
  isThemeDark,
  translation: { t, path },
  onAccept,
}) => {
  // State
  const [selectedQuestion, setSelectedQuestion] =
    useState<ValidKeysTypeVerb | null>(null);
  const [selectedAnswer, setSelectedAnswer] =
    useState<ValidKeysTypeVerb | null>(null);

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // Data
  const getDataPicker = React.useMemo(() => {
    // Options
    const options: { label: string; key: ValidKeysTypeVerb }[] = [
      { label: t(`verbs.keys_verb.simple_form`), key: 'simple_form' },
      { label: t(`verbs.keys_verb.meaning`), key: 'meaning' },
      { label: t(`verbs.keys_verb.past_participle`), key: 'past_participle' },
      { label: t(`verbs.keys_verb.gerund`), key: 'gerund' },
      { label: t(`verbs.keys_verb.third_person`), key: 'third_person' },
      { label: t(`verbs.keys_verb.simple_past`), key: 'simple_past' },
    ];

    return [
      {
        label: t(`${path}.game_1.modal.key_question`),
        value: 'question',
        items: options,
        type: 'question',
      },
      {
        label: t(`${path}.game_1.modal.key_answer`),
        value: 'answer',
        items: options,
        type: 'answer',
      },
    ];
  }, [path, t]);

  // Handle accept
  const handleAccept = React.useCallback(() => {
    if (
      selectedQuestion &&
      selectedAnswer &&
      selectedQuestion !== selectedAnswer
    ) {
      onAccept({
        answerKey: selectedAnswer,
        questionKey: selectedQuestion,
      });
    }
  }, [selectedAnswer, selectedQuestion, onAccept]);

  // Al cambiar visible
  React.useEffect(() => {
    // Reset
    if (!visible) {
      setSelectedQuestion(null);
      setSelectedAnswer(null);
    }
  }, [visible]);

  return (
    <ModalDefault
      visible={visible}
      onClose={onClose}
      title={t(`${path}.game_1.modal.title`)}
    >
      <View style={styles.container}>
        {/* Recorre los datos */}
        {getDataPicker.map(({ label, value, items, type }) => (
          <View key={value}>
            {/* Label */}
            <Text style={styles.label}>{label}:</Text>
            {/* Description Question */}
            {selectedQuestion && type === 'question' && (
              <Text style={styles.description}>
                {t(`verbs.keys_verb.description_${selectedQuestion}`)}
              </Text>
            )}
            {/* Description Answer */}
            {selectedAnswer && type === 'answer' && (
              <Text style={styles.description}>
                {t(`verbs.keys_verb.description_${selectedAnswer}`)}
              </Text>
            )}
            {/* Picker */}
            <Picker
              selectedValue={value}
              onValueChange={(value) =>
                type === 'question'
                  ? setSelectedQuestion(value as ValidKeysTypeVerb)
                  : setSelectedAnswer(value as ValidKeysTypeVerb)
              }
            >
              <Picker.Item label='Selecciona una opción...' value='' />
              {/* Items */}
              {items.map((item) => (
                <Picker.Item
                  key={item.key}
                  label={item.label}
                  value={item.key}
                />
              ))}
            </Picker>
          </View>
        ))}

        {/* Error */}
        {selectedQuestion && selectedQuestion === selectedAnswer && (
          <Text style={styles.error}>
            {t(`${path}.game_1.modal.error_same`)}
          </Text>
        )}

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={t(`${path}.game_1.modal.accept_button`)}
            color={colors.primary[600]}
            onPress={handleAccept}
            disabled={
              !selectedQuestion ||
              !selectedAnswer ||
              selectedQuestion === selectedAnswer
            }
          />
        </View>
      </View>
    </ModalDefault>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 5,
    },
    label: {
      fontSize: 14,
      marginTop: 10,
      color: colors.text.primary,
    },
    description: {
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 6,
    },
    error: {
      marginTop: 10,
      color: colors.alert.error,
      fontSize: 12,
    },
    buttonContainer: {
      marginTop: 20,
      backgroundColor: colors.primary[500],
      color: colors.text.primary,
    },
  });

export default SelectGameQuestion;
