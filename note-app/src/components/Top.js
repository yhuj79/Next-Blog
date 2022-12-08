import React from "react";
import { Header } from "semantic-ui-react";

export default function Top() {
  return (
    <div style={{ display: "flex" }}>
      <img style={{ width: "90px" }} src="/images/logo.png" alt="logo" />
      <Header as="h1">Next Note App</Header>
    </div>
  );
}
