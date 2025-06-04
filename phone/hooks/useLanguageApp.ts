import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
    LanguageAppType,
  LanguageSliceType,
  updateLanguage,
} from "@/redux/slices/languageSlice";

/**
 * Hook para obtener y actualizar el estado del idioma
 * @return { state, updateLanguageApp }
 */
export const useLanguageApp = (): {
  state: LanguageSliceType;
  updateLanguageApp: (language: LanguageAppType) => void;
} => {
  // Hooks
  const languageState = useSelector((state: RootState) => state.stateLanguage);
  const dispatch = useDispatch<AppDispatch>();

  // Acción
  const updateLanguageApp = (language: LanguageAppType) => {
    dispatch(updateLanguage(language));
  };

  return {
    state: languageState,
    updateLanguageApp,
  };
};
