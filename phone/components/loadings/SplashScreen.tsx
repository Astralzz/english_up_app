import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

/**
 *
 * Component splash screen for the initialization of the app
 *
 * @return {TSX.Component}
 */
const SplashScreenComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200ee" />
      <Text style={styles.text}>Cargando...</Text>
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
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#6200ee",
  },
});

export default SplashScreenComponent;
