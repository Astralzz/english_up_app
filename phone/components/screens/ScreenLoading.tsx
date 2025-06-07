import React from 'react';
import { useThemeApp } from '@/hooks/useThemeApp';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import { ColorsAppType } from '@/theme/colors';

// Props
interface ScreenLoadingProps {
  message?: string;
  colorIndicator?: string;
}

/**
 *
 * Component splash screen for the initialization of the app
 *
 * @return {TSX.Component}
 */
const ScreenLoading: React.FC<ScreenLoadingProps> = ({
  message = 'Cargando',
  colorIndicator,
}) => {
  // Hooks
  const {
    state: { colors },
  } = useThemeApp();

  // Styles
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <ScreenWrapper>
      <ActivityIndicator
        size="large"
        color={colorIndicator ?? colors.primary[600]}
      />
      <Text style={styles.text}>{message}</Text>
    </ScreenWrapper>
  );
};

const getStyles = (colors: ColorsAppType) =>
  StyleSheet.create({
    text: {
      marginTop: 20,
      fontSize: 18,
      color: colors.text.primary,
    },
  });

export default ScreenLoading;
