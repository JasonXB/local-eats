import "../styles/globals.css";
import GlobalContextAPIProvider from "../src/state-management/globalContext";
import LocationContextProvider from "../src/state-management/locationContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { customThemes } from "../styles/MUI_themes";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextAPIProvider>
      <LocationContextProvider>
        <ThemeProvider theme={customThemes.light}>
          <CssBaseline>
            <Component {...pageProps} />
          </CssBaseline>
        </ThemeProvider>
      </LocationContextProvider>
    </GlobalContextAPIProvider>
  );
}

export default MyApp;
