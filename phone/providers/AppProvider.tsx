import React from "react";

// React redux
import { Provider as ReduxProvider } from "react-redux";

// UI
import { PaperProvider } from "react-native-paper";

// Components
import SplashScreenComponent from "@/components/loadings/SplashScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import { store } from "@/redux/store";

// Props
interface AppProviderProps {
  children: React.ReactNode;
}

/**
 *
 * Provider for config before initialization of the App
 *
 * @return {TSX.Component}
 */
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // ? Not store
  if (!store) return <SplashScreenComponent />;

  return (
    <ReduxProvider store={store}>
      <PaperProvider>{children}</PaperProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
