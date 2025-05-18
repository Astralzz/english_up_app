import { configureStore } from "@reduxjs/toolkit";

// Slices
// import routeSlice from "./slices/routeSlice";
import themeSlice from "./slices/themeSlice";

// TODO - STORE REDUX
export const store = configureStore({
  // Proveedores redux
  reducer: {
    // Estado del tema
    stateTheme: themeSlice,
    // Estado de la ruta
    // stateRoute: routeSlice,
  },
});

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
