import { createTheme } from "@mui/material/styles";

const disableRipple = {
  defaultProps: { disableRipple: true },
};

export const customThemes = {
  //^ STANDARD LIGHT THEME
  light: createTheme({
    components: {
      MuiButtonBase: disableRipple,
    },
    palette: {
      primary: { main: "#1f3c50" }, // dark color
      // primary: { main: "#00897b" }, // green color
      secondary: { main: "#ef4f5f" }, // orangey red
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1000,
        lg: 1300,
        xl: 1636,
      },
    },
  }),
  typography: {
    // regular fontSize will stay at 14px
    // Use for the big title on the Homepage
    h1: {
      fontSize: "3.75rem",
      fontWeight: 300,
      lineHeight: 2.267,
      letterSpacing: "-0.01562em",
    },
    // Use for the tagline beneath the title on the homepage
    h2: {
      fontSize: "2.25rem",
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    // Use for new webpage section headers
    h3: {
      fontSize: "1.875rem",
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: "-0em",
    },
    h4: {
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontSize:"1.25rem",
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    // Use for descriptions underneath new section headers
    h6: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
  },
};

const red = "#ef4f5f";
const dark = "#1c1c1c";

const grayStar = "#9c9c9c";
const yellowStar = "#e9b501";
const greenStar = "#24963f";

const beigeBackground = "#fffbf7";
