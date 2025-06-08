import React from 'react';

// Redux
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';

// UI
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return (
    <ReduxProvider store={store}>
      <PersistGate
        loading={
          <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size='large' />
          </SafeAreaView>
        }
        persistor={persistor}
      >
        <PaperProvider>{children}</PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default AppProvider;
