import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import "../public/app.css";
import { useAnalytics } from "../src/config/firebase";
import { GlobalContextProvider } from "../src/context/globalContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
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
