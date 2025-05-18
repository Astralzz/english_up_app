import { RoutesMenuTypeApp } from "@/types/navigation";
import HomeScreen from "@/screens/home/HomeScreen";
import VerbsScreen from "@/screens/verbs/VerbsScreen";
import WordsScreen from "@/screens/words/WordsScreen";
import FormulasScreen from "@/screens/formulas/FormulasScreen";

// Rutas de la app en general (Menu)
const ROUTES_MENU_APP: Array<RoutesMenuTypeApp> = [
  {
    name: "Home",
    Component: HomeScreen,
    icon: "home-outline", // Icono personalizado
    options: {
      drawerLabel: "Inicio",
    },
  },
  {
    name: "Verbs",
    Component: VerbsScreen,
    icon: "run-fast",
    options: {
      drawerLabel: "Verbos",
    },
  },
  {
    name: "Words",
    Component: WordsScreen,
    icon: "alphabetical-variant",
    options: {
      drawerLabel: "Palabras",
    },
  },
  {
    name: "Formulas",
    Component: FormulasScreen,
    icon: "function-variant",
    options: {
      drawerLabel: "Fórmulas",
    },
  },
] as const;

export const ROUTES_APP_ALL = [...ROUTES_MENU_APP] as const;
export default ROUTES_MENU_APP;
