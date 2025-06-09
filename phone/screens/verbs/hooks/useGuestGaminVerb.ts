import React, { useEffect, useState } from 'react';
import Verb from '@/models/Verb';
import { globaListVerbsService } from '@/services/ListVerbsService';
import { ColorsAppType } from '@/theme/colors';
import { useTransitionApp } from '@/hooks/useTransitionApp';
import { TFunction } from 'i18next';
import {
  GuestTheVerbGameKeyVerbsType,
  GuestTheVerbGameLevelType,
} from '@/components/games/ScreenGameSelectedLevel';
import { useThemeApp } from '@/hooks/useThemeApp';
import { useTranslation } from 'react-i18next';
import {
  GameGenerateOptionType,
  GameGenerateQuestionType,
  GameResulDefaultType,
  GameQuestionVerbType,
} from '@/types/games';

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
  registerAttempt: (option: GameGenerateOptionType) => Promise<void>;
  results: GameResulDefaultType | null;
  currentQuestion: GameGenerateQuestionType | null;
  isGeneratingQuestion: boolean;
  startGame: () => void;
  actualyRound: number;
  selectedOption: GameGenerateOptionType | null;
  t: TFunction<'translation', undefined>;
}

/**
 * Hook para manejar la búsqueda de verbos.
 *
 * @returns {UseGuestGamingVerbProps} Objeto con las propiedades y métodos para manejar la búsqueda de verbos.
 */
const useGuestGamingVerb = (
  typeGame: GameQuestionVerbType,
  PATH_TRANSLATION: string,
): UseGuestGamingVerbProps => {
  // States
  const [selectedOption, setSelectedOption] =
    React.useState<GameGenerateOptionType | null>(null);
  const [results, setResults] = useState<GameResulDefaultType | null>(null);
  const [selectedKeyVerbs, setSelectedKeyVerbs] =
    useState<GuestTheVerbGameKeyVerbsType | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<GameGenerateQuestionType | null>(null);
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
    loadVerbs();
    setResults(null);
    setSuccessCount(0);
    setFailsCount(0);
    setActualyRound(0);
    setSelectedKeyVerbs(null);
    setLevelSelected(null);
    setCurrentQuestion(null);
    setSelectedOption(null);
  }, [loadVerbs]);

  // Finalize game
  const finalizeGame = React.useCallback(
    (successCount: number, failsCount: number) => {
      // ? Ya fue finalizado
      if (results) return;

      // ? No hay verbos o nivel seleccionado
      if (verbs.length === 0 || !levelSelected) return;

      // ? Generamos los puntos
      const totalAttempts = successCount + failsCount;
      const accuracy = totalAttempts === 0 ? 0 : successCount / totalAttempts;
      const totalPoints = successCount * 10; // 10 puntos por acierto
      const isWin = accuracy >= 0.7; // 70% de aciertos para ganar

      // ? Generamos el resultado
      setResults({
        failsCount,
        successCount,
        totalPoints,
        isWin,
      });
    },
    [verbs, levelSelected, results],
  );

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
        typeGame.questionKey, // o el campo que desees como pregunta
        typeGame.answerKey, // o el campo que desees como opciones
        4,
        {
          t,
          path: 'verbs.games.game_1',
        },
      );

      // ? No hay pregunta
      if (!question) {
        setCurrentQuestion(null);
        return;
      }

      // Eliminar de la lista de verbos el que fue usado como pregunta
      const correctOption = question.options.find(
        (o: GameGenerateOptionType) => o.isCorrect,
      );
      setVerbs((prev) => prev.filter((v) => v.no !== correctOption?.number));

      // ? Actualizamos la pregunta
      setCurrentQuestion(question);
    }, [levelSelected, selectedKeyVerbs, verbs, typeGame, t]),
  });

  // Register attempt
  const registerAttempt = React.useCallback(
    async (option: GameGenerateOptionType) => {
      // ? No hay nivel seleccionado
      if (!levelSelected) return;

      // Obtener valores actuales
      const isCorrect = option.isCorrect;
      const newSuccessCount = isCorrect ? successCount + 1 : successCount;
      const newFailsCount = isCorrect ? failsCount : failsCount + 1;

      // Agregamos la opcion seleccionada
      setSelectedOption(option);

      // ? Incrementamos el contador
      if (isCorrect) {
        setSuccessCount((prev) => prev + 1);
      } else {
        setFailsCount((prev) => prev + 1);
      }

      // ? Incrementamos el contador
      const newCount = actualyRound + 1;

      // ? Si se supera el contador
      if (newCount >= levelSelected.count) {
        setTimeout(() => finalizeGame(newSuccessCount, newFailsCount), 1000);
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
    [
      levelSelected,
      actualyRound,
      generateNextQuestion,
      finalizeGame,
      successCount,
      failsCount,
    ],
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
    // ? Si hay resultados
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
      { name: t(`${PATH_TRANSLATION}.easy`), count: 10, key: 'easy' },
      { name: t(`${PATH_TRANSLATION}.medium`), count: 20, key: 'medium' },
      { name: t(`${PATH_TRANSLATION}.hard`), count: 30, key: 'hard' },
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
