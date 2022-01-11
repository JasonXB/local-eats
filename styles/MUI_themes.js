import { createTheme } from "@mui/material/styles";

const disableRipple = {
  defaultProps: { disableRipple: true },
};

const newBreakpoints = {
  values: { xs: 0, sm: 700, md: 1000, lg: 1300, xl: 1636 },
}; // good to define them outside, sine you'll likely reuse them in every theme

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
  }),
  //^ OPTIONAL DARK THEME
  dark: createTheme({
    components: {
      MuiButtonBase: disableRipple,
    },
  }),
};
