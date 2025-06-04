import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerbListScreen from "./list/VerbListScreen";
import VerbSearchScreen from "./search/VerbSearchScreen";
import { useTranslation } from "react-i18next";

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
      initialRouteName="VerbsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="VerbsList"
        component={VerbListScreen}
        options={{ title: t("verbs.stack.titles.list") }}
      />
      <Stack.Screen
        name="VerbSearch"
        component={VerbSearchScreen}
        options={{ title: t("verbs.stack.titles.search") }}
      />
      <Stack.Screen
        name="VerbGames"
        component={VerbListScreen}
        options={{ title: t("verbs.stack.titles.games") }}
      />
    </Stack.Navigator>
  );
};

export default VerbsStack;
