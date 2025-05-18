import React from "react";
import { Text } from "react-native";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";

/**
 *
 * Verbs screen in the app
 *
 * @return {TSX.Component}
 */
const VerbsScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<"Verbs">();

  return (
    <ScreenWrapper>
      <Text>Verbs Screen</Text>
    </ScreenWrapper>
  );
};

export default VerbsScreen;
