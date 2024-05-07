import "../app/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#D5006C" height={4} />
      <Component {...pageProps} />;
    </>
  );
}

export default App;
