import React, { useEffect, useState } from 'react';
import Verb from '@/models/Verb';
import {
  GenerateVerbOptionType,
  GenerateVerbQuestionType,
  globaListVerbsService,
  UseGuestGamingVerbResult,
} from '@/services/ListVerbsService';
import { ColorsAppType } from '@/theme/colors';
import { useTransitionApp } from '@/hooks/useTransitionApp';
import { TFunction } from 'i18next';
import {
  GuestTheVerbGameKeyVerbsType,
  GuestTheVerbGameLevelType,
} from '@/components/games/ScreenGameSelectedLevel';
import { useThemeApp } from '@/hooks/useThemeApp';
import { useTranslation } from 'react-i18next';

// Props returns
interface UseGuestGamingVerbProps {
  colors: ColorsAppType;
  isThemeDark: boolean;
  levels: GuestTheVerbGameLevelType[];
  levelSelected: GuestTheVerbGameLevelType | null;
  selectLevel: (
    level: GuestTheVerbGameLevelType,
    keyVerbs: GuestTheVerbGameKeyVerbsType,
  ) => void;
  registerAttempt: (option: GenerateVerbOptionType) => Promise<void>;
  results: UseGuestGamingVerbResult | null;
  currentQuestion: GenerateVerbQuestionType | null;
  isGeneratingQuestion: boolean;
  startGame: () => void;
  actualyRound: number;
  selectedOption: GenerateVerbOptionType | null;
  t: TFunction<'translation', undefined>;
}

/**
 * Hook para manejar la búsqueda de verbos.
 *
 * @returns {UseGuestGamingVerbProps} Objeto con las propiedades y métodos para manejar la búsqueda de verbos.
 */
const useGuestGamingVerb = (): UseGuestGamingVerbProps => {
  // States
  const [selectedOption, setSelectedOption] =
    React.useState<GenerateVerbOptionType | null>(null);
  const [results, setResults] = useState<UseGuestGamingVerbResult | null>(null);
  const [selectedKeyVerbs, setSelectedKeyVerbs] =
    useState<GuestTheVerbGameKeyVerbsType | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<GenerateVerbQuestionType | null>(null);
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const [failsCount, setFailsCount] = useState(0);
  const [actualyRound, setActualyRound] = useState(0);
  const [levelSelected, setLevelSelected] =
    useState<GuestTheVerbGameLevelType | null>(null);

  // Translations
  const { t } = useTranslation();

  // Theme
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // Load verbs
  const loadVerbs = React.useCallback(() => {
    const list = globaListVerbsService.getAll();
    setVerbs(list);
  }, []);

  // Clear values
  const clearValues = React.useCallback(() => {
    setSelectedOption(null);
    setResults(null);
    loadVerbs();
    setSuccessCount(0);
    setFailsCount(0);
    setActualyRound(0);
    setSelectedKeyVerbs(null);
    setLevelSelected(null);
    setCurrentQuestion(null);
  }, [loadVerbs]);

  // Finalize game
  const finalizeGame = React.useCallback(() => {
    // ? Ya fue finalizado
    if (results) return;

    // ? No hay verbos o nivel seleccionado
    if (verbs.length === 0 || !levelSelected) return;

    // ? Generamos los puntos
    const totalAttempts = successCount + failsCount;
    const accuracy = totalAttempts === 0 ? 0 : successCount / totalAttempts;
    const totalPoints = successCount * 10; // 10 puntos por acierto
    const isWin = accuracy >= 0.7; // 70% de aciertos para ganar

    // ? Generamos el titulo y la descripcion
    const title = isWin ? '¡Ganaste!' : '¡Intenta de nuevo!';
    const description = `Aciertos: ${successCount}, Fallos: ${failsCount}`;

    // ? Generamos el resultado
    setResults({
      failsCount,
      successCount,
      totalPoints,
      isWin,
      title,
      description,
    });
  }, [successCount, failsCount, verbs, levelSelected, results]);

  // Generate next question - Transition hook
  const [isGeneratingQuestion, generateNextQuestion] = useTransitionApp({
    fn: React.useCallback(async () => {
      // ? No hay verbos o nivel seleccionado
      if (verbs.length === 0 || !levelSelected) return;

      // ? No hay key de verbos seleccionado
      if (!selectedKeyVerbs) return;

      // ? Generamos la pregunta
      const question = globaListVerbsService.generateVerbQuestion(
        verbs,
        selectedKeyVerbs.question, // o el campo que desees como pregunta
        selectedKeyVerbs.answers, // o el campo que desees como opciones
        4,
      );

      // ? No hay pregunta
      if (!question) {
        setCurrentQuestion(null);
        return;
      }

      // Eliminar de la lista de verbos el que fue usado como pregunta
      const correctOption = question.options.find((o) => o.isCorrect);
      setVerbs((prev) => prev.filter((v) => v.no !== correctOption?.number));

      // ? Actualizamos la pregunta
      setCurrentQuestion(question);
    }, [levelSelected, selectedKeyVerbs, verbs]),
  });

  // Register attempt
  const registerAttempt = React.useCallback(
    async (option: GenerateVerbOptionType) => {
      // ? No hay nivel seleccionado
      if (!levelSelected) return;

      // Agregamos la opcion seleccionada
      setSelectedOption(option);

      // ? Incrementamos el contador
      if (option.isCorrect) {
        setSuccessCount((prev) => prev + 1);
      } else {
        setFailsCount((prev) => prev + 1);
      }

      // ? Incrementamos el contador
      const newCount = actualyRound + 1;

      // ? Si se supera el contador
      if (newCount >= levelSelected.count) {
        setTimeout(() => finalizeGame(), 1000);
        return;
      }

      // ? Generamos la siguiente pregunta
      const nextQuestion = () => {
        generateNextQuestion();
        setSelectedOption(null);
        setActualyRound(newCount);
      };

      // ? Generamos la siguiente pregunta despues de un delay
      setTimeout(() => nextQuestion(), 1000);
    },
    [levelSelected, actualyRound, generateNextQuestion, finalizeGame],
  );

  // Selected level
  const selectLevel = React.useCallback(
    (
      level: GuestTheVerbGameLevelType,
      keyVerbs: GuestTheVerbGameKeyVerbsType,
    ) => {
      setSelectedKeyVerbs(keyVerbs);
      setLevelSelected(level);
    },
    [],
  );

  // Start game
  const startGame = React.useCallback(() => {
    if (results) clearValues();
    generateNextQuestion();
  }, [generateNextQuestion, clearValues, results]);

  // Effects
  useEffect(() => {
    loadVerbs();
  }, [loadVerbs]);

  // Return
  return {
    colors,
    isThemeDark,
    levels: [
      { name: 'Easy', count: 10, key: 'easy' },
      { name: 'Medium', count: 20, key: 'medium' },
      { name: 'Hard', count: 30, key: 'hard' },
    ],
    levelSelected,
    selectLevel,
    registerAttempt,
    results,
    currentQuestion,
    isGeneratingQuestion,
    startGame,
    actualyRound,
    selectedOption,
    t,
  };
};

export default useGuestGamingVerb;
