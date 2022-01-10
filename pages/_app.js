import "../styles/globals.css";
import GlobalContextAPIProvider from "../src/state-management/globalContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextAPIProvider>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </GlobalContextAPIProvider>
  );
}

export default MyApp;
