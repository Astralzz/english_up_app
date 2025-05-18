// components/ScreenWrapper.tsx
import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useThemeApp } from "@/hooks/useThemeApp";

// Props
interface ScreenWrapperProps {
  children: ReactNode;
  stylesProps?: {
    justifyContent?: ViewStyle["justifyContent"];
    alignItems?: ViewStyle["alignItems"];
  };
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
    justifyContent: "center",
    alignItems: "center",
  },
}) => {
  // Tema
  const {
    state: { colors },
  } = useThemeApp();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
          ...stylesProps,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
