import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';
import useVarsScreenDefault from '@/hooks/useVarsScreenDefault';

/**
 *
 * Words screen in the app
 *
 * @return {TSX.Component}
 */
const WordsScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<'Words'>();

  // Hooks
  const { t } = useVarsScreenDefault();

  return (
    <ScreenWrapper>
      <Text>{t('not_available')}</Text>
    </ScreenWrapper>
  );
};

export default WordsScreen;
