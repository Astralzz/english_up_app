import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
// Props
interface ErrorScreenProps {
  title: string;
  message?: React.ReactNode;
  reloadAction?: () => void | Promise<void>;
}

/**
 *
 * Error screen in the app
 *
 * @return {TSX.Component}
 */
const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title,
  message,
  reloadAction,
}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Message */}
      {message && <Text>{message}</Text>}

      {/* Button to reload */}
      {reloadAction && <Button title="Recargar" onPress={reloadAction} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Fondo de la cortinilla
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    color: "#C74A4AFF",
  },
});

export default ErrorScreen;
