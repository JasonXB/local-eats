import { createTheme } from "@mui/material/styles";

export const breakpointValues = {
  xs: 0,
  sm: 700,
  md: 1000,
  lg: 1300,
  xl: 1636,
};

export const customThemes = {
  //^ STANDARD LIGHT THEME
  light: createTheme({
    components: {
      // Disable button ripple- which is controlled as a default prop
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      // Remove Container's default padding
      MuiContainer: {
        defaultProps: { disableGutters: true },
      },
    },
    palette: {
      primary: { main: "#1f3c50" }, // dark color near black
      secondary: { main: "#da3743" }, // near crimson red
      info: { main: "#4285f4" }, // google blue
      grayBackground: { main: "#F5F5F5" },
    },
    breakpoints: {
      values: breakpointValues,
    },
    //^ CHANGE THE HEADER FONT SIZES
    typography: {
      // regular fontSize will stay at 14px
      // Use for the big title on the Homepage
      h1: {
        fontFamily: `"Roboto, "Helvetica, "Arial", sans-serif`,
        fontSize: "3.75rem", // 60px
        fontWeight: 300,
        lineHeight: 2.267,
        letterSpacing: "-0.01562em",
      },
      // Use for section headers on the homepage
      h2: {
        fontFamily: `"Roboto, "Helvetica, "Arial", sans-serif`,
        fontSize: "2.25rem", // 36px
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "-0em",
        marginBottom: "1.875rem",
      },
      // Use for new webpage section headers
      h3: {
        fontFamily: `"Roboto, "Helvetica, "Arial", sans-serif`,
        fontSize: "1.875rem", // 30px
        fontWeight: 400,
        lineHeight: 1.167,
        letterSpacing: "-0em",
      },
      h4: {
        fontFamily: `"Roboto, "Helvetica, "Arial", sans-serif`,
        fontSize: "1.5rem", // 24px
        fontWeight: 400,
        lineHeight: 1.235,
        letterSpacing: "0.00735em",
      },
      // Use for the homepage's expensive/cheap cards
      h5: {
        fontFamily: `"Roboto, "Helvetica, "Arial", sans-serif`,
        fontSize: "1.25rem", // 20px
        fontWeight: 400,
        lineHeight: 1.334,
        letterSpacing: "0em",
      },
      // Use for descriptions underneath new section headers
      h6: {
        fontFamily: `"Roboto, "Helvetica, "Arial", sans-serif`,
        fontSize: "1.125rem", // 18px
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
      },
    },
  }),
};

const red = "#ef4f5f";
const dark = "#1c1c1c";

const grayStar = "#9c9c9c";
const yellowStar = "#e9b501";
const greenStar = "#24963f";

const beigeBackground = "#fffbf7";
