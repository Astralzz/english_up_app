// Tipo de tema de la app
export type ThemeAppType = 'light' | 'dark';

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
    errorSecondary: string;
    success: string;
    successSecondary: string;
  };
  neutral: Record<number, string>;
  background: {
    primary: string;
    secondary: string;
    overlay: string;
  };
  modal: {
    container: string;
    header: string;
    overlay: string;
    text: string;
    primary: string;
  };
};

// OPaleta de colores
const COLORS_APP: Record<ThemeAppType, ColorsAppType> = {
  light: {
    primary: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107',
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
      950: '#7C4D00',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#424242',
      tertiary: '#616161',
    },
    icons: {
      primary: '#1A1A1A',
      secondary: '#616161',
    },
    alert: {
      error: '#D32F2F',
      errorSecondary: '#FFEBEE',
      success: '#2E7D32',
      successSecondary: '#E8F5E9',
    },
    neutral: {
      100: '#FFFFFF',
      200: '#F5F5F5',
      300: '#EEEEEE',
      400: '#E0E0E0',
      500: '#BDBDBD',
      600: '#9E9E9E',
      700: '#757575',
      800: '#616161',
      900: '#212121',
    },
    background: {
      primary: '#FFF8E1',
      secondary: '#FFECB3',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
      overlay: 'rgba(0, 0, 0, 0.5)',
      container: '#FFF8E1',
      header: '#FFECB3',
      text: '#000000',
      primary: '#FFECB3',
    },
  },
  dark: {
    primary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C',
      950: '#1A237E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#BDBDBD',
      tertiary: '#9E9E9E',
    },
    icons: {
      primary: '#E0E0E0',
      secondary: '#9E9E9E',
    },
    alert: {
      error: '#EF5350',
      errorSecondary: '#2A1A1A',
      success: '#66BB6A',
      successSecondary: '#1B2A1B',
    },
    neutral: {
      100: '#121212',
      200: '#1E1E1E',
      300: '#252525',
      400: '#303030',
      500: '#424242',
      600: '#616161',
      700: '#757575',
      800: '#9E9E9E',
      900: '#BDBDBD',
    },
    background: {
      primary: '#121212',
      secondary: '#1E1E1E',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    modal: {
      overlay: 'rgba(0, 0, 0, 0.8)',
      container: '#121212',
      header: '#1E1E1E',
      text: '#FFFFFF',
      primary: '#1E1E1E',
    },
  },
};

export default COLORS_APP;
