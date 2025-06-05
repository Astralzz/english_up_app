import { ViewStyle } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";


/**
 * Props for icon component
 */
export type IconPropsApp = {
  icon: IconSource;
  onPress?: () => void;
  style?: ViewStyle;
  color?: string;
  size?: number;
}