import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import useVarsScreenDefault from '@/hooks/useVarsScreenDefault';

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
  const { colors } = useVarsScreenDefault();

  // Contenido
  const Wrapper = scrollable ? ScrollView : View;

  // Styles
  const fullStyles = React.useMemo(
    () => [
      styles.container,
      {
        backgroundColor: colors.background.primary,
        ...stylesProps,
        ...style,
      },
    ],
    [colors.background.primary, stylesProps, style],
  );

  return (
    <Wrapper
      style={!scrollable && fullStyles}
      contentContainerStyle={scrollable && fullStyles}
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
