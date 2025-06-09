import React from 'react';
import useGuestGamingVerb from '../../hooks/useGuestGaminVerb';
import ScreenGameSelectedLevel from '@/components/games/ScreenGameSelectedLevel';
import ScreenGameCountdown from '@/components/games/ScreenGameCountdown';
import ScreenGameQuestion from '@/components/games/ScreenGameQuestion';
import ScreenGameResult from '@/components/games/ScreenGameResult';
import { VerbsStackParamGamesList } from '../../VerbsStack';
import { RouteProp, useRoute } from '@react-navigation/native';

// Translation
const PATH_TRANSLATION = 'verbs.games.keys';

/**
 *
 * Guest the verb game screen
 *
 * @return {TSX.Component}
 */
const QuestionGameScreen: React.FC = () => {
  // Obtener ruta con tipo
  const route = useRoute<RouteProp<VerbsStackParamGamesList, 'QuestionGame'>>();

  // Extraer optionsQuestion
  const {
    optionsQuestion = {
      questionKey: 'simple_form',
      answerKey: 'meaning',
    },
  } = route.params;

  // Hooks the game
  const {
    colors,
    isThemeDark,
    levels,
    levelSelected,
    selectLevel,
    registerAttempt,
    results,
    currentQuestion,
    startGame,
    actualyRound,
    selectedOption,
    isGeneratingQuestion,
    t,
  } = useGuestGamingVerb(optionsQuestion, PATH_TRANSLATION);

  // ? Not level selected
  if (!levelSelected) {
    return (
      <ScreenGameSelectedLevel
        title={t(`${PATH_TRANSLATION}.choose_level`)}
        colors={colors}
        isThemeDark={isThemeDark}
        levels={levels}
        selectLevel={selectLevel}
        translation={{
          path: PATH_TRANSLATION,
          t,
        }}
      />
    );
  }

  // Result
  if (results) {
    return (
      <ScreenGameResult
        results={results}
        onRestart={() => startGame()}
        colors={colors}
        isThemeDark={isThemeDark}
        translation={{
          path: PATH_TRANSLATION,
          t,
        }}
      />
    );
  }

  // Countdown
  if (!currentQuestion) {
    return (
      <ScreenGameCountdown
        count={3}
        title={t(`${PATH_TRANSLATION}.get_ready`)}
        onFinish={startGame}
      />
    );
  }

  // Questions
  return (
    <ScreenGameQuestion
      colors={colors}
      isThemeDark={isThemeDark}
      levelSelected={levelSelected}
      actualyRound={actualyRound}
      currentQuestion={currentQuestion}
      registerAttempt={registerAttempt}
      selectedOption={selectedOption}
      isGeneratingQuestion={isGeneratingQuestion}
      translation={{
        path: PATH_TRANSLATION,
        t,
      }}
    />
  );
};

export default QuestionGameScreen;
