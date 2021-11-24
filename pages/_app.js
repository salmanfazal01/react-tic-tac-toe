import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import "../public/app.css";
import { useAnalytics } from "../src/config/firebase";
import { GlobalContextProvider } from "../src/context/globalContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnalytics();
  }, []);

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
