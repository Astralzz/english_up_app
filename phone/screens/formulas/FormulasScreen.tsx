import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';
import useVarsScreenDefault from '@/hooks/useVarsScreenDefault';

/**
 *
 * Formulas screen in the app
 *
 * @return {TSX.Component}
 */
const FormulasScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<'Formulas'>();

  // Hooks
  const { t } = useVarsScreenDefault();

  return (
    <ScreenWrapper>
      <Text>{t('not_available')}</Text>
    </ScreenWrapper>
  );
};

export default FormulasScreen;
