import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Top from "../src/components/Top";
import Bottom from "../src/components/Bottom";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ width: 1000, margin: "0 auto" }}>
      <Top />
      <Component {...pageProps} />
      <Bottom />
    </div>
  );
}

export default MyApp;
