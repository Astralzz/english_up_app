import { RoutesMenuTypeApp } from '@/types/navigation';
import HomeScreenDevelop from '@/components/screens/HomeScreenDevelop';
import WordsScreen from '@/screens/words/WordsScreen';
import FormulasScreen from '@/screens/formulas/FormulasScreen';
import VerbsStack from '@/screens/verbs/VerbsStack';

// Rutas de la app en general (Menu)
const ROUTES_MENU_APP: RoutesMenuTypeApp[] = [
  {
    name: 'Home',
    Component: HomeScreenDevelop,
    icon: 'home-outline', // Icono personalizado
  },
  {
    name: 'Verbs',
    Component: VerbsStack,
    icon: 'run-fast',
  },
  {
    name: 'Words',
    Component: WordsScreen,
    icon: 'alphabetical-variant',
  },
  {
    name: 'Formulas',
    Component: FormulasScreen,
    icon: 'function-variant',
  },
] as const;

export const ROUTES_APP_ALL = [...ROUTES_MENU_APP] as const;
export default ROUTES_MENU_APP;
