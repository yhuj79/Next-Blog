import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Top from "../src/components/Top";
import Gnb from "../src/components/Gnb";
import Bottom from "../src/components/Bottom";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <div style={{ width: 950, margin: "0 auto" }}>
        {router.pathname !== "/_error" && router.pathname !== "/404" && <Top />}
        {router.pathname !== "/_error" && router.pathname !== "/404" && <Gnb />}
        <Component {...pageProps} />
        {router.pathname !== "/_error" && router.pathname !== "/404" && <Bottom />}
      </div>
    </SessionProvider>
  );
}

export default MyApp;
