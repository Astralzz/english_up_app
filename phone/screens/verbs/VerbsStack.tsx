import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerbListScreen from "./list/VerbListScreen";
import VerbSearchScreen from "./search/VerbSearchScreen";

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
  return (
    <Stack.Navigator
      initialRouteName="VerbsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="VerbsList"
        component={VerbListScreen}
        options={{ title: "Lista de Verbos" }}
      />
      <Stack.Screen
        name="VerbSearch"
        component={VerbSearchScreen}
        options={{ title: "Buscar verbos" }}
      />
      <Stack.Screen
        name="VerbGames"
        component={VerbListScreen}
        options={{ title: "Juegos con Verbos" }}
      />
    </Stack.Navigator>
  );
};

export default VerbsStack;
