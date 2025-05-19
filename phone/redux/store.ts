import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice, { ThemeSliceType } from "./slices/themeSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listsVerbsSlice, ListsVerbsSliceType } from "./slices/verbsSlice";

// Configuración persistente
const persistConfig = {
  key: "root-redux-persist",
  storage: AsyncStorage,
  whitelist: ["stateTheme", "stateListVerbs"], // Slices a persistir
};

// Todos los reducers
const rootReducer = combineReducers({
  stateTheme: themeSlice,
  stateListVerbs: listsVerbsSlice,
});

// Reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario por redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// Tipos
export type AppDispatch = typeof store.dispatch;
export type RootState = {
  stateTheme: ThemeSliceType;
  stateListVerbs: ListsVerbsSliceType;
};
