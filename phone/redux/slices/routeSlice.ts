import NoFountScreen from "@/components/screens/NoFountScreen";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RouteType } from "@/types/router";
// import { ROUTES_APP_ALL } from "@/router/routerlist";

// // Estado extendido con props opcionales
// export interface RouteSliceType {
//   routeActually?: RouteType;
//   routeBefore?: RouteType;
// }

// // Estado inicial: primera ruta por defecto
// const initialState: RouteSliceType = {
//   routeActually: ROUTES_APP_ALL[0],
//   routeBefore: undefined,
// };

// // Creamos un slice
// export const routeSlice = createSlice({
//   name: "route",
//   initialState,
//   reducers: {
//     /**
//      * Actualiza la ruta actual del estado
//      * @param {RouteSliceType} state - Estado actual
//      * @param {PayloadAction<{ name: string; props?: Record<string, unknown> }>} action - Nueva ruta con props
//      */
//     updateRoute: (
//       state,
//       action: PayloadAction<{ name: string; props?: Record<string, unknown> }>
//     ) => {
//       console.log("la ruta cambio a " + action.payload.name);

//       // Ruta pasada
//       const routeBefore = state.routeActually;

//       // Buscamos la ruta
//       const newRoute = ROUTES_APP_ALL.find(
//         (route) => route.name === action.payload.name
//       );

//       // Actualizamos la ruta actual
//       state.routeBefore = routeBefore;
//       state.routeActually = newRoute || {
//         name: "NoFount",
//         Component: NoFountScreen,
//         props: {},
//       };
//     },
//   },
// });

// // Exportamos acciones y reducer
// export const { updateRoute } = routeSlice.actions;

// export default routeSlice.reducer;
