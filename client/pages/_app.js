import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Top from "../src/components/Top";
import Bottom from "../src/components/Bottom";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div style={{ width: 950, margin: "0 auto" }}>
        <Top />
        <Component {...pageProps} />
        <Bottom />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
