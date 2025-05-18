import React from "react";
import { Text } from "react-native";
import ScreenWrapper from "@/components/screens/ScreenWrapper";

/**
 *
 * NoFount screen in the app
 *
 * @return {TSX.Component}
 */
const NoFountScreen = () => {
  const rNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

  return (
    <ScreenWrapper>
      <Text>{`NoFountScreen ${rNumber}`}</Text>
    </ScreenWrapper>
  );
};

export default NoFountScreen;
