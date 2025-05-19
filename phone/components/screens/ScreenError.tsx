import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenWrapper from "./ScreenWrapper";
import { useThemeApp } from "@/hooks/useThemeApp";
import { ColorsAppType } from "@/theme/colors";

// Props
interface ScreenErrorProps {
  title?: string;
  message?: string;
  reloadAction?: () => void | Promise<void>;
  iconName?: string;
}

const ScreenError: React.FC<ScreenErrorProps> = ({
  title = "Error",
  message,
  reloadAction,
  iconName = "alert-circle-outline",
}) => {
  const {
    state: { colors },
  } = useThemeApp();

  // Estilos
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Icon */}
        <Icon
          name={iconName}
          size={64}
          color={colors.alert.error}
          style={styles.icon}
        />

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Message */}
        {message && <Text style={styles.message}>{message}</Text>}

        {/* Reload Button */}
        {reloadAction && (
          <Button
            mode="contained"
            onPress={reloadAction}
            labelStyle={styles.buttonText}
            style={styles.button}
          >
            Reintentar
          </Button>
        )}
      </View>
    </ScreenWrapper>
  );
};

/**
 *
 * Error screen in the app
 *
 * @return {TSX.Component}
 */
const getStyles = (colors: ColorsAppType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    icon: {
      marginBottom: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.alert.error,
      textAlign: "center",
    },
    message: {
      marginTop: 8,
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: "center",
    },
    button: {
      marginTop: 18,
      paddingHorizontal: 24,
      backgroundColor: colors.primary[400],
      color: colors.text.primary,
    },
    buttonText: {
      color: colors.text.primary,
    },
  });

export default ScreenError;
