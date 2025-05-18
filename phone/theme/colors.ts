// Tipo de tema de la app
export type ThemeAppType = "light" | "dark";

// Tipo de colores por tema
export type ColorsAppType = {
  primary: Record<number, string>;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  icons: {
    primary: string;
    secondary: string;
  };
  alert: {
    error: string;
    success: string;
  };
  neutral: Record<number, string>;
  background: {
    primary: string;
    secondary: string;
  };
};

// OPaleta de colores
const COLORS_APP: Record<ThemeAppType, ColorsAppType> = {
  light: {
    primary: {
      50: "#fff8e1",
      100: "#ffecb3",
      200: "#ffe082",
      300: "#ffd54f",
      400: "#ffca28",
      500: "#ffc107", // Principal
      600: "#ffb300", // Hover
      700: "#ffa000", // Active
      800: "#ff8f00",
      900: "#ff6f00", // Disabled
      950: "#7c4d00", // Outline
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#5C5C5C",
      tertiary: "#9E9E9E",
    },
    icons: {
      primary: "#1A1A1A",
      secondary: "#757575",
    },
    alert: {
      error: "#D32F2F",
      success: "#388E3C",
    },
    neutral: {
      100: "#FAFAFA",
      200: "#F0F0F0",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    background: {
      primary: "#ffecb3",
      secondary: "#ffe082",
    },
  },

  dark: {
    primary: {
      50: "#f3e8ff",
      100: "#e9d5ff",
      200: "#d8b4fe",
      300: "#c084fc",
      400: "#a855f7",
      500: "#9333ea", // Principal
      600: "#7e22ce", // Hover
      700: "#6b21a8", // Active
      800: "#581c87",
      900: "#3b0764", // Disabled
      950: "#1e0a3f", // Outline
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#D1D5DB",
      tertiary: "#9CA3AF",
    },
    icons: {
      primary: "#FFFFFF",
      secondary: "#9CA3AF",
    },
    alert: {
      error: "#EF5350",
      success: "#81C784",
    },
    neutral: {
      100: "#1E1E2E",
      200: "#2A2A3C",
      300: "#3A3A4C",
      400: "#4B4B5C",
      500: "#6B6B7D",
      600: "#8C8CA1",
      700: "#BDBDD2",
      800: "#E0E0F0",
      900: "#FFFFFF",
    },
    background: {
      primary: "#121212", // Fondo principal oscuro
      secondary: "#1E1E2E", // Fondo tarjetas oscuro
    },
  },
} as const;

export default COLORS_APP;
