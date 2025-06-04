import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipos
export type LanguageAppType = "en" | "es";

// Estado
export type LanguageSliceType = {
  language: LanguageAppType;
};

// Estado inicial
const initialState: LanguageSliceType = {
  language: "en",
};

// Creamos un slice
export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // Actualizar idioma
    updateLanguage: (state, action: PayloadAction<LanguageAppType>) => {
      // Cambiamos idioma
      state.language = action.payload;
    },
  },
});

// Exportamos acciones y reducer
export const { updateLanguage } = languageSlice.actions;
export default languageSlice.reducer;
