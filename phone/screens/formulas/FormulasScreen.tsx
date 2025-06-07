import React from "react";
import { Text } from "react-native";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";

/**
 *
 * Formulas screen in the app
 *
 * @return {TSX.Component}
 */
const FormulasScreen = () => {
  // Obtener acceso a la navegación
  const navigation = useTypedNavigation<"Formulas">();

  return (
    <ScreenWrapper>
      <Text>Proximamente...</Text>
    </ScreenWrapper>
  );
};

export default FormulasScreen;
