import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
