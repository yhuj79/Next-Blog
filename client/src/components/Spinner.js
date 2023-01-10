import Head from "next/head";
import { Loader } from "semantic-ui-react";

export default function Spinner() {
  return (
    <div style={{ padding: "300px 0" }}>
      <Head>
        <title>{`Loading...`}</title>
      </Head>
      <Loader inline="centered" active>
        Loading...
      </Loader>
    </div>
  );
}
