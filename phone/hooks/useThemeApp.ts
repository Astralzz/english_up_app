import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ThemeSliceType, updateTheme } from "@/redux/slices/themeSlice";

/**
 * Hook para obtener y actualizar el estado del tema
 * @return { state, toggleTheme }
 */
export const useThemeApp = (): {
  state: ThemeSliceType;
  toggleTheme: () => void;
} => {
  // Hooks
  const themeState = useSelector((state: RootState) => state.stateTheme);
  const dispatch = useDispatch<AppDispatch>();

  // Acción
  const toggleTheme = () => {
    dispatch(updateTheme(themeState.theme));
  };

  return {
    state: themeState,
    toggleTheme,
  };
};
