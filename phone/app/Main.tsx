import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

// React Navigation
import RouterControl from "../router/RouterControl";

// Theme
import { useThemeApp } from "@/hooks/useThemeApp";

/**
 *
 * Component Main in the application
 *
 * @return {TSX.Component}
 */
const Main: React.FC = () => {
  // Theme
  const {
    state: { colors },
  } = useThemeApp();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* StatusBar */}
      {/* <StatusBar
        backgroundColor={colors.background.primary} // Android
        barStyle="dark-content" // iOS: 'light-content' para texto blanco
        translucent={true}
      /> */}

      {/* Router component */}
      <RouterControl />
    </SafeAreaView>
  );
};

export default Main;
