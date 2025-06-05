import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerbListScreen from "./list/VerbListScreen";
import VerbSearchScreen from "./search/VerbSearchScreen";
import { useTranslation } from "react-i18next";

// Transitions
const PATH_TRASNSITION = "verbs.stack.titles";

// Routes
export type VerbsStackParamList = {
  VerbsList: undefined;
  VerbGames: undefined;
  VerbSearch: undefined;
};

// Stack
const Stack = createNativeStackNavigator<VerbsStackParamList>();

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
      <Stack.Screen
        name="VerbsList"
        component={VerbListScreen}
        options={{ title: t(`${PATH_TRASNSITION}.list`) }}
      />
      <Stack.Screen
        name="VerbSearch"
        component={VerbSearchScreen}
        options={{ title: t(`${PATH_TRASNSITION}.search`) }}
      />
      <Stack.Screen
        name="VerbGames"
        component={VerbListScreen}
        options={{ title: t(`${PATH_TRASNSITION}.games`) }}
      />
    </Stack.Navigator>
  );
};

export default VerbsStack;
