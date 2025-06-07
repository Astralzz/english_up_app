import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationOptions } from '@react-navigation/stack';

// Types router interface screens
export type RootStackParamList = {
  // Screens (sin parámetros)
  Home: undefined;
  Verbs: undefined;
  Words: undefined;
  Formulas: undefined;

  // Pilas
  Profile: undefined; //{ idUser?: number }; // id of the profile
};

// Tipos para las rutas
export interface RouteType<T> {
  name: keyof RootStackParamList;
  label?: string;
  Component: React.ComponentType<any>;
  subNavigation?: Array<RouteType<StackNavigationOptions>>;
  props?: Record<string, unknown>;
  icon?: string;
  options?: T;
}

// Tipo de rutas
export type RoutesMenuTypeApp = RouteType<DrawerNavigationOptions>;

// Utilidad genérica para las screens
export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Extiende los tipos globales de React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
