import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerbListScreen from './list/VerbListScreen';
import VerbSearchScreen from './search/VerbSearchScreen';
import VerbGamesScreen from './games/VerbGamesScreen';
import QuestionGameScreen from './games/gaming/QuestionGameScreen';
import { GameQuestionVerbType } from '@/types/games';

// Routes
export type VerbsStackParamList = {
  VerbsList: undefined;
  VerbGames: undefined;
  VerbSearch: undefined;
};

// Games
export type VerbsStackParamGamesList = {
  QuestionGame: {
    optionsQuestion: GameQuestionVerbType;
  };
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
  return (
    <Stack.Navigator
      initialRouteName='VerbSearch'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='VerbsList' component={VerbListScreen} />
      <Stack.Screen name='VerbSearch' component={VerbSearchScreen} />
      <Stack.Screen name='VerbGames' component={VerbGamesScreen} />

      {/* Games */}
      <Stack.Screen name='QuestionGame' component={QuestionGameScreen} />
    </Stack.Navigator>
  );
};

export default VerbsStack;
