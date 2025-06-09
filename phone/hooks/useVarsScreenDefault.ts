import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useThemeApp } from '@/hooks/useThemeApp';
import { ColorsAppType } from '@/theme/colors';

// Props returns
interface UseVarsScreenDefaultProps {
  t: TFunction<'translation', undefined>;
  colors: ColorsAppType;
  isThemeDark: boolean;
}

/**
 * Hook para manejar variables default de los screens.
 *
 * @returns {UseVarsScreenDefaultProps} Objeto con las propiedades y métodos para manejar variables default de los screens.
 */
const useVarsScreenDefault = (): UseVarsScreenDefaultProps => {
  // States
  const { t } = useTranslation();

  // Hooks
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // Return
  return {
    t,
    colors,
    isThemeDark,
  };
};

export default useVarsScreenDefault;
