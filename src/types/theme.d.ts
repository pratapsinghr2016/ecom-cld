// Styled Components Theme Types
import "styled-components";

interface Theme {
  colors: {
    primary: {
      readonly cyan: "#00D9FF";
      readonly dark: "#0A0E27";
      readonly darker: "#000000";
    };
    text: {
      readonly primary: "#FFFFFF";
      readonly secondary: "#B8B8B8";
      readonly muted: "#808080";
    };
    background: {
      readonly primary: "#000000";
      readonly secondary: "#0A0E27";
      readonly tertiary: "#1A1A1A";
    };
    border: {
      readonly primary: "#2A2A2A";
      readonly secondary: "#3A3A3A";
    };
    button: {
      readonly primary: "#00D9FF";
      readonly primaryHover: "#00B8DC";
      readonly secondary: "transparent";
      readonly secondaryHover: "rgba(255, 255, 255, 0.1)";
    };
  };
  fonts: {
    readonly primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    readonly heading: "'Montserrat', sans-serif";
  };
  fontSizes: {
    readonly xs: "0.75rem";
    readonly sm: "0.875rem";
    readonly md: "1rem";
    readonly lg: "1.125rem";
    readonly xl: "1.25rem";
    readonly "2xl": "1.5rem";
  };
  fontWeights: {
    readonly regular: "400";
    readonly medium: "500";
    readonly semibold: "600";
    readonly bold: "700";
  };
  spacing: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
    readonly "2xl": "3rem";
  };
  breakpoints: {
    readonly mobile: "480px";
    readonly tablet: "768px";
    readonly desktop: "1024px";
    readonly wide: "1280px";
  };
  transitions: {
    readonly fast: "0.15s ease";
    readonly normal: "0.3s ease";
    readonly slow: "0.5s ease";
  };
  shadows: {
    readonly sm: "0 1px 2px rgba(0, 0, 0, 0.05)";
    readonly md: "0 4px 6px rgba(0, 0, 0, 0.1)";
    readonly lg: "0 10px 15px rgba(0, 0, 0, 0.2)";
  };
  zIndex: {
    readonly dropdown: 1000;
    readonly sticky: 1020;
    readonly fixed: 1030;
    readonly modalBackdrop: 1040;
    readonly modal: 1050;
    readonly popover: 1060;
    readonly tooltip: 1070;
  };
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
