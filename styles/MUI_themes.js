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
  //^ OPTIONAL DARK THEME
  dark: createTheme({
    components: {
      MuiButtonBase: disableRipple,
    },
  }),
};

const red = "#ef4f5f";
const dark = "#1c1c1c";

const grayStar = "#9c9c9c";
const yellowStar = "#e9b501";
const greenStar = "#24963f";

const beigeBackground = "#fffbf7";