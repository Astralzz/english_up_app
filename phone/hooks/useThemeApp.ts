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
  // Usos
  const dispatch = useDispatch<AppDispatch>();
  const themeState = useSelector((state: RootState) => state.stateTheme);

  // Acción
  const toggleTheme = () => {
    dispatch(updateTheme(themeState.theme));
  };

  return {
    state: themeState,
    toggleTheme,
  };
};
