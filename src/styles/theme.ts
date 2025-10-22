export const theme = {
  colors: {
    primary: {
      cyan: "#00D9FF",
      dark: "#0A0E27",
      darker: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B8B8B8",
      muted: "#808080",
    },
    background: {
      primary: "#000000",
      secondary: "#0A0E27",
      tertiary: "#1A1A1A",
    },
    border: {
      primary: "#2A2A2A",
      secondary: "#3A3A3A",
    },
    button: {
      primary: "#00D9FF",
      primaryHover: "#00B8DC",
      secondary: "transparent",
      secondaryHover: "rgba(255, 255, 255, 0.1)",
    },
  },

  fonts: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Montserrat', sans-serif",
  },

  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
  },

  fontWeights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },

  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },

  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.2)",
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type Theme = typeof theme;
