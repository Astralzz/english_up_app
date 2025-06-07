import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';

/**
 *
 * Words screen in the app
 *
 * @return {TSX.Component}
 */
const WordsScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<'Words'>();

  return (
    <ScreenWrapper>
      <Text>Proximamente...</Text>
    </ScreenWrapper>
  );
};

export default WordsScreen;
