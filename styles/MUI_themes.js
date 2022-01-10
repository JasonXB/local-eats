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
  }),
  //^ OPTIONAL DARK THEME
  dark: createTheme({
    components: {
      MuiButtonBase: disableRipple,
    },
  }),
};
