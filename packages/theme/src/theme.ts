import { DefaultTheme } from "styled-components";

export interface ThemeType {
    colors: {
      primary: string;
      primaryLight: string;
      primaryLighter: string;
      primaryMedium: string;
      secondary: string;
      accent: string;
      text: string;
      textLight: string;
      background: string;
      white: string;
      black: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      error: string;
      warning: string;
      success: string;
      mutedText: string;
      hoverSurface: string;
      primaryText: string;
      primaryLightText: string;
      secondaryText: string;
      secondaryLightText: string; 
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontFamily: string;
      fontWeight: {
        regular: number;
        medium: number;
        bold: number;
      };
      headings: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
      };
    };
    transitions: {
      fast: string;
      medium: string;
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    }
  }

export const theme: ThemeType & DefaultTheme  = {
    colors: {
      primary: "#4a69bd",
      primaryLight: "#F6F7FC",
      primaryLighter: "#F6F7FC",
      primaryMedium: "#DBE1F2",
      secondary: "#1e3799",
      accent: "#fa8231",
      text: "#2c3e50",
      textLight: "#7f8c8d",
      background: "#f9f9f9",
      white: "#ffffff",
      black: "#000000",
      gray100: "#f7f7f7",
      gray200: "#e6e6e6",
      gray300: "#d1d1d1",
      gray400: "#bfbfbf",
      gray500: "#a6a6a6",
      gray600: "#8c8c8c",
      error: "#e74c3c",
      warning: "#f39c12",
      success: "#2ecc71",

      mutedText: '#666',
      hoverSurface: '#f5f5f5',
      primaryText: '#333',
      primaryLightText: '#555',
      secondaryText: '#777',
      secondaryLightText: '#999',
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      xxl: "3rem",
    },
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
    },
    shadows: {
      sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      md: "0 4px 6px rgba(0,0,0,0.1)",
      lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    },
    typography: {
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
      // Si quisieras, podrías extraer aquí también los tamaños de encabezados:
      headings: {
        h1: "2.5rem",
        h2: "2rem",
        h3: "1.75rem",
        h4: "1.5rem",
        h5: "1.25rem",
        h6: "1rem",
      },
    },
    transitions: {
      fast: "0.2s ease",
      medium: "0.3s ease",
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      modal: 1030,
      popover: 1040,
      tooltip: 1050,
    },
    breakpoints: {
      xs: "480px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1600px",
      xxl: "1920px",
    }
  };
