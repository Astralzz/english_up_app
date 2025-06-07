import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeApp } from '@/hooks/useThemeApp';
import { ScrollView } from 'react-native-gesture-handler';

// Props
interface ScreenWrapperProps {
  children: ReactNode;
  stylesProps?: {
    justifyContent?: ViewStyle['justifyContent'];
    alignItems?: ViewStyle['alignItems'];
  };
  style?: ViewStyle;
  scrollable?: boolean;
}

/**
 * Screen wrapper for consistent layout
 *
 * @param {ScreenWrapperProps} props
 * @return {TSX.Component}
 */
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  stylesProps = {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollable = false,
  style,
}) => {
  // Tema
  const {
    state: { colors },
  } = useThemeApp();

  // Contenido
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <Wrapper
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
          ...stylesProps,
          ...style,
        },
      ]}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
