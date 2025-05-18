import { ScreenNavigationProp } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "@/types/navigation";

/**
 * Hook para las navegaciones
 *
 * @return {ScreenNavigationProp<T>}
 */
export function useTypedNavigation<T extends keyof RootStackParamList>() {
  return useNavigation<ScreenNavigationProp<T>>();
}
