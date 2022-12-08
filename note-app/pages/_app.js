import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Top from "../src/components/Top";
import Bottom from "../src/components/Bottom";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Top />
      <Component {...pageProps} />
      <Bottom />
    </div>
  );
}

export default MyApp;
