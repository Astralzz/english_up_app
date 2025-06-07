import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerbListScreen from './list/VerbListScreen';
import VerbSearchScreen from './search/VerbSearchScreen';
import { useTranslation } from 'react-i18next';
import VerbGamesScreen from './games/VerbGamesScreen';
import GuestTheVerbGameScreen from './games/gaming/GuestTheVerbGameScreen';
import { ColorsAppType } from '@/theme/colors';

// Transitions
const PATH_TRASNSITION = 'verbs.stack.titles';

// Routes
export type VerbsStackParamList = {
  VerbsList: { title?: string };
  VerbGames: { title?: string };
  VerbSearch: { title?: string };
};

// Games
export type VerbsStackParamGamesList = {
  GuessTheMeaningOfTheVerbGame: {
    colors: ColorsAppType;
    isThemeDark: boolean;
  }; // Guess the meaning of the verb
};

// All routes verbs
export type VerbsStackParamAllList = VerbsStackParamList &
  VerbsStackParamGamesList;

// Stack
const Stack = createNativeStackNavigator<VerbsStackParamAllList>();

/**
 *
 * Verbs screen stack
 *
 * @return {TSX.Component}
 */
const VerbsStack: React.FC = () => {
  // Hooks
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="VerbSearch"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="VerbsList" component={VerbListScreen} />
      <Stack.Screen name="VerbSearch" component={VerbSearchScreen} />
      <Stack.Screen
        name="VerbGames"
        component={VerbGamesScreen}
        initialParams={{ title: t(`${PATH_TRASNSITION}.games`) }}
      />

      {/* Games */}
      <Stack.Screen
        name="GuessTheMeaningOfTheVerbGame"
        component={GuestTheVerbGameScreen}
      />
    </Stack.Navigator>
  );
};

export default VerbsStack;
