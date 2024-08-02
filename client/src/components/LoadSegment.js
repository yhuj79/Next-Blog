import Head from "next/head";
import { Segment, Loader } from "semantic-ui-react";

const LoadSegment = () => (
  <Segment
    inverted
    style={{
      marginTop: "-1px",
      borderRadius: "7px",
      borderTopLeftRadius: "0",
    }}
  >
    <Head>
      <title>Welcome! | Next-Blog</title>
    </Head>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Loader
        style={{ display: "inline-block" }}
        inline="centered"
        active
        size="large"
      >
        Loading...
      </Loader>
    </div>
  </Segment>
);

export default LoadSegment;
