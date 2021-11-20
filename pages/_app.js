import { useEffect } from "react";
import { useAnalytics } from "../src/config/firebase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    useAnalytics();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
