import React from 'react';
import { StyleSheet } from 'react-native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { useTypedNavigation } from '@/hooks/useTypedNavigation';
import useVarsScreenDefault from '@/hooks/useVarsScreenDefault';
import { ColorsAppType } from '@/theme/colors';
import { Button, Text } from 'react-native-paper';

/**
 *
 * Home screen in the app
 *
 * @return {TSX.Component}
 */
const HomeScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<'Home'>();

  // Hooks
  const { colors, isThemeDark, t } = useVarsScreenDefault();

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  return (
    <ScreenWrapper>
      <Text variant='bodyLarge' style={styles.text}>
        {t('not_available')}
      </Text>
      <Button
        onPress={() => navigation.navigate('Verbs')}
        style={styles.button}
        textColor={colors.text.primary}
      >
        {t('verbs.stack.titles.search')}
      </Button>
    </ScreenWrapper>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) => {
  return StyleSheet.create({
    text: {
      color: colors.text.primary,
      marginVertical: 20,
    },
    button: {
      backgroundColor: colors.primary[isThemeDark ? 800 : 400],
      borderRadius: 12,
      padding: 4,
    },
  });
};

export default HomeScreen;
