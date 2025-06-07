import React, { useEffect, useState } from 'react';
import Verb from '@/models/Verb';
import ListVerbsService, {
  GenerateVerbQuestionType,
  globaListVerbsService,
} from '@/services/ListVerbsService';
import { VerbsStackParamGamesList } from '../VerbsStack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ColorsAppType } from '@/theme/colors';
import { useTransitionApp } from '@/hooks/useTransitionApp';

// Levels type
type GuestTheVerbGameLevelType = {
  name: string;
  count: number;
  key: string;
};

// Key verbs type
type GuestTheVerbGameKeyVerbsType = {
  question: keyof Verb;
  answers: keyof Verb;
};

// Type resoults
interface UseGuestGamingVerbResult {
  failsCount: number;
  successCount: number;
  totalPoints: number;
  isWin: boolean;
  title?: string;
  description?: string;
}

// Params
interface UseGuestGamingVerbParams {
  routeName: keyof VerbsStackParamGamesList;
}

// Props returns
interface UseGuestGamingVerbProps {
  verbs: Verb[];
  service: ListVerbsService;
  colors: ColorsAppType;
  isThemeDark: boolean;
  levels: GuestTheVerbGameLevelType[];
  levelSelected: GuestTheVerbGameLevelType | null;
  selectLevel: (
    level: GuestTheVerbGameLevelType,
    keyVerbs: GuestTheVerbGameKeyVerbsType
  ) => void;
  registerAttempt: (isCorrect: boolean) => void;
  results: UseGuestGamingVerbResult | null;
  currentQuestion: GenerateVerbQuestionType | null;
  isGeneratingQuestion: boolean;
  restartGame: () => void;
}

/**
 * Hook para manejar la búsqueda de verbos.
 *
 * @returns {UseGuestGamingVerbProps} Objeto con las propiedades y métodos para manejar la búsqueda de verbos.
 */
const useGuestGamingVerb = (
  p: UseGuestGamingVerbParams
): UseGuestGamingVerbProps => {
  // States
  const [results, setResults] = useState<UseGuestGamingVerbResult | null>(null);
  const [selectedKeyVerbs, setSelectedKeyVerbs] =
    useState<GuestTheVerbGameKeyVerbsType | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<GenerateVerbQuestionType | null>(null);
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const [failsCount, setFailsCount] = useState(0);
  const [count, setCount] = useState(0);
  const [levelSelected, setLevelSelected] =
    useState<GuestTheVerbGameLevelType | null>(null);

  // Params
  const { routeName } = p;

  // Props
  const {
    params: { colors, isThemeDark },
  } = useRoute<RouteProp<VerbsStackParamGamesList, typeof routeName>>();

  // Finalize game
  const finalizeGame = React.useCallback(() => {
    // ? Ya fue finalizado
    if (results) return;

    // ? No hay verbos o nivel seleccionado
    if (verbs.length === 0 || !levelSelected) return;

    // ? Generamos los puntos
    const totalAttempts = successCount + failsCount;
    const accuracy = totalAttempts === 0 ? 0 : successCount / totalAttempts;
    const totalPoints = successCount * 10; // ajusta según tus reglas
    const isWin = accuracy >= 0.7; // por ejemplo, 70% de aciertos para ganar

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
        4
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
    }, [verbs, levelSelected, selectedKeyVerbs]),
  });

  // Register attempt
  const registerAttempt = React.useCallback(
    (isCorrect: boolean) => {
      // ? No hay nivel seleccionado
      if (!levelSelected) return;

      // ? Incrementamos el contador
      if (isCorrect) {
        setSuccessCount((prev) => prev + 1);
      } else {
        setFailsCount((prev) => prev + 1);
      }

      setCount((prevCount) => {
        // ? Incrementamos el contador
        const newCount = prevCount + 1;

        // ? Si se supera el contador
        if (newCount >= levelSelected.count) {
          finalizeGame();
        } else {
          generateNextQuestion();
        }

        return newCount;
      });
    },
    [generateNextQuestion, levelSelected, finalizeGame]
  );

  // Selected level
  const selectLevel = React.useCallback(
    (
      level: GuestTheVerbGameLevelType,
      keyVerbs: GuestTheVerbGameKeyVerbsType
    ) => {
      setSelectedKeyVerbs(keyVerbs);
      setLevelSelected(level);
      generateNextQuestion();
    },
    [generateNextQuestion]
  );

  // Load verbs
  const loadVerbs = React.useCallback(() => {
    const list = globaListVerbsService.getAll();
    setVerbs(list);
  }, []);

  // Restart game
  const restartGame = React.useCallback(() => {
    setResults(null);
    loadVerbs();
    setSuccessCount(0);
    setFailsCount(0);
    setCount(0);
    setSelectedKeyVerbs(null);
    setLevelSelected(null);
    setCurrentQuestion(null);
  }, []);

  // Effects
  useEffect(() => {
    loadVerbs();
  }, []);

  // Return
  return {
    verbs,
    service: globaListVerbsService,
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
    restartGame,
  };
};

export default useGuestGamingVerb;
