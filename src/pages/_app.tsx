import "../app/globals.css";
import type { AppProps } from "next/app";
import NextTopLoader from "nextjs-toploader";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextTopLoader color="#D5006C" />
      <Component {...pageProps} />;
    </>
  );
}

export default App;
