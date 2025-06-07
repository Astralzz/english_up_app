import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Estado extendido con props opcionales
export interface ListsVerbsSliceType {
  favoriteVerbs: number[];
  learnedVerbs: number[];
  hiddenVerbs: number[];
}

// Estado inicial
const initialState: ListsVerbsSliceType = {
  favoriteVerbs: [],
  learnedVerbs: [],
  hiddenVerbs: [],
};

// Creamos el slice
export const listsVerbsSlice = createSlice({
  name: 'verbs',
  initialState,
  reducers: {
    // Reemplaza todo el estado de listas
    updateAllVerbs: (state, action: PayloadAction<ListsVerbsSliceType>) => {
      state = action.payload;
    },

    // Agrega un verbo a la lista indicada
    addVerbToList: (
      state,
      action: PayloadAction<{
        list: keyof ListsVerbsSliceType;
        verbId: number;
      }>,
    ) => {
      const { list, verbId } = action.payload;
      if (!state[list].includes(verbId)) {
        state[list].push(verbId);
      }
    },

    // Elimina un verbo de la lista indicada
    removeVerbFromList: (
      state,
      action: PayloadAction<{
        list: keyof ListsVerbsSliceType;
        verbId: number;
      }>,
    ) => {
      const { list, verbId } = action.payload;
      state[list] = state[list].filter((id) => id !== verbId);
    },

    // Limpia todos los verbos de una lista
    clearVerbList: (
      state,
      action: PayloadAction<keyof ListsVerbsSliceType>,
    ) => {
      state[action.payload] = [];
    },
  },
});

// Exportamos acciones y reducer
export const {
  updateAllVerbs,
  addVerbToList,
  removeVerbFromList,
  clearVerbList,
} = listsVerbsSlice.actions;

export default listsVerbsSlice.reducer;
