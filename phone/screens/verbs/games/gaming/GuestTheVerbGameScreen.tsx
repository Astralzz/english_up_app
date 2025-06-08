import React from 'react';
import useGuestGamingVerb from '../../hooks/useGuestGaminVerb';
import ScreenGameSelectedLevel from '@/components/games/ScreenGameSelectedLevel';
import ScreenGameCountdown from '@/components/games/ScreenGameCountdown';
import ScreenGameQuestion from '@/components/games/ScreenGameQuestion';
import ScreenGameResult from '@/components/games/ScreenGameResult';

/**
 *
 * Guest the verb game screen
 *
 * @return {TSX.Component}
 */
const GuestTheVerbGameScreen: React.FC = () => {
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
  } = useGuestGamingVerb();

  // ? Not level selected
  if (!levelSelected) {
    return (
      <ScreenGameSelectedLevel
        title={t('Choose your level')}
        colors={colors}
        isThemeDark={isThemeDark}
        levels={levels}
        selectLevel={selectLevel}
        t={t}
      />
    );
  }

  // Countdown
  if (!currentQuestion) {
    return (
      <ScreenGameCountdown
        count={3}
        title={t('Get ready')}
        onFinish={() => startGame()}
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
        t={t}
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
      t={t}
    />
  );
};

export default GuestTheVerbGameScreen;
