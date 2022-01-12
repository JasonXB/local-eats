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
      // primary: { main: "#3f51b5" }, // dark color
      primary: { main: "#00897b" }, // dark color
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
