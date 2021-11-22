import { useEffect } from "react";
import { useAnalytics } from "../src/config/firebase";
import { GlobalContextProvider } from "../src/context/globalContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    useAnalytics();
  }, []);

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
