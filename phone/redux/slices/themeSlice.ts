import COLORS_APP, { ColorsAppType, ThemeAppType } from '@/theme/colors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Estado
export type ThemeSliceType = {
  theme: ThemeAppType;
  isThemeDark: boolean;
  colors: ColorsAppType;
};

// Estado inicial
const initialState: ThemeSliceType = {
  theme: 'light',
  isThemeDark: false,
  colors: COLORS_APP.light,
};

// Creamos un slice
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Actualizar tema
    updateTheme: (state, action: PayloadAction<ThemeAppType>) => {
      // Cambiamos temas
      const newTheme = action.payload === 'light' ? 'dark' : 'light';

      // Actualizamos tema
      state.theme = newTheme;
      state.isThemeDark = newTheme === 'dark';
      state.colors = COLORS_APP[newTheme];
    },
  },
});

// Exportamos acciones y reducer
export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
