import { RoutesMenuTypeApp } from "@/types/navigation";
import HomeScreen from "@/screens/home/HomeScreen";
import WordsScreen from "@/screens/words/WordsScreen";
import FormulasScreen from "@/screens/formulas/FormulasScreen";
import VerbsStack from "@/screens/verbs/VerbsStack";

// Rutas de la app en general (Menu)
const ROUTES_MENU_APP: Array<RoutesMenuTypeApp> = [
  {
    name: "Home",
    Component: HomeScreen,
    icon: "home-outline", // Icono personalizado
  },
  {
    name: "Verbs",
    Component: VerbsStack,
    icon: "run-fast",
  },
  {
    name: "Words",
    Component: WordsScreen,
    icon: "alphabetical-variant",
  },
  {
    name: "Formulas",
    Component: FormulasScreen,
    icon: "function-variant",
  },
] as const;

export const ROUTES_APP_ALL = [...ROUTES_MENU_APP] as const;
export default ROUTES_MENU_APP;
