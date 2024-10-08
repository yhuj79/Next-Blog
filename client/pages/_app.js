import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import Top from "../src/components/Top";
import Gnb from "../src/components/Gnb";
import Bottom from "../src/components/Bottom";
import "semantic-ui-css/semantic.min.css";
import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <div style={{ maxWidth: 950, margin: "0 auto", padding: "0 5px" }}>
        {router.pathname !== "/_error" && router.pathname !== "/404" && <Top />}
        {router.pathname !== "/_error" &&
          router.pathname !== "/404" &&
          router.pathname !== "/" && <Gnb />}
        <Component {...pageProps} />
        {router.pathname !== "/_error" && router.pathname !== "/404" && (
          <Bottom />
        )}
      </div>
    </SessionProvider>
  );
}

export default MyApp;
