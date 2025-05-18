// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import ScreenWrapper from "@/components/screens/ScreenWrapper";

// Props correctamente
interface ProfileScreenProps {
  route: RouteProp<RootStackParamList, "Profile">;
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
}

/**
 *
 * profile screen in the user
 *
 * @return {TSX.Component}
 */
const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
  // Extrae idUser de los parámetros de la ruta
  // const { idUser } = route.params;

  return (
    <ScreenWrapper>
      <Text>Profile Screen and id is {2}</Text>
      <Button title="Volver a Home" onPress={() => navigation.goBack()} />
    </ScreenWrapper>
  );
};

export default ProfileScreen;
