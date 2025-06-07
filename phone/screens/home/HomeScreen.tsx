import React from 'react';
import { Text, Button } from 'react-native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';

/**
 *
 * Home screen in the app
 *
 * @return {TSX.Component}
 */
const HomeScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<'Home'>();

  return (
    <ScreenWrapper>
      <Text>Proximamente...</Text>
      <Button
        title="Ir a Verbos"
        onPress={() =>
          // navigation.navigate("Profile", { idUser: Math.random() * 100 })
          navigation.navigate('Verbs')
        }
      />
    </ScreenWrapper>
  );
};

export default HomeScreen;
